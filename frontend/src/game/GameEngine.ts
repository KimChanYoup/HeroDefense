import type { GameState, GameHero, GameMonster, GameSummon, SummonConfig, DamageNumber, Explosion, Position, SynergyBonus, ProjectileType, WaveConfig, HeroMeterEntry } from './types';
import {
  CANVAS_WIDTH,
  TOWER_X, WALL_AGGRO_RANGE, HERO_MIN_X, HERO_MAX_X,
  MONSTER_SPAWN_X, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX,
  TOWER_HP,
  WAVE_PREP_TIME, HERO_SIZE, MONSTER_SIZE, BOSS_SIZE, ELITE_SIZE,
  COLORS,
} from './constants';
import { generateWave } from './WaveData';
import { WALL_TALENTS, SECOND_WALL_TALENTS } from './wallTalents';
import { processHeroSkills as processHeroSkillsExtracted } from './skills/HeroSkills';
import { DEFAULT_HEROES, DIFFICULTY_SCALE, getMonsterGold, getMonsterScore } from './data/constants';
import { getWallEffects, getMeleeTankBonuses } from './systems/WallSystem';
import { calcSynergies, applySynergyToHero } from './systems/SynergySystem';
import { SKILL_COOLDOWNS } from './data/SkillCooldowns';

// Default party if no backend data
export interface GameOptions {
  difficulty?: 'easy' | 'normal' | 'hard';
  maxWave?: number;
  /** 파티 빌더에서 선택한 커스텀 영웅 목록. 미제공 시 DEFAULT_HEROES 사용 */
  customHeroes?: Omit<GameHero, 'id' | 'position'>[];
  onStateSync?: (state: GameState, damageNumbers: DamageNumber[]) => void;
  /** 멀티플레이어 인원 수 (1=솔로, 2=파티, 3=레이드). 몬스터 수 스케일에 사용 */
  playerCount?: number;
  /** 게임 시작 시 영웅 초기 위치 (드래그앤드롭 포지셔닝용). customHeroes와 동일 길이여야 함 */
  initialPositions?: Position[];
  /**
   * 커스텀 웨이브 생성기 (튜토리얼 등). 미제공 시 generateWave(WaveData.ts) 사용.
   */
  waveGenerator?: (waveNumber: number) => WaveConfig;
  /** 벽 특성 정보 (id -> rank) */
  wallTalents?: Record<string, number>;
  /**
   * 게임 모드: 'defense'(기본) — 몬스터 막기 / 'offense' — 적 던전 공격 / 'raid' — 레이드
   */
  mode?: 'defense' | 'offense' | 'raid';
  /**
   * 벽(타워) X 좌표 오버라이드. offense 모드에서 OFFENSE_WALL_X(985) 사용.
   */
  towerX?: number;
  /**
   * offense 스테이지 기믹.
   * 'hidden_ranged': 벽 뒤에 은신한 수비대 존재. 벽 파괴 후 등장, 모두 처치해야 승리.
   */
  gimmick?: 'hidden_ranged';
  /**
   * 시작 웨이브/층 번호 (체크포인트 재개용). 기본 1.
   * defense: 웨이브 N부터 시작. offense: 층 N부터 시작 (generateInfiniteDungeon(N)에서 사용).
   */
  startFromWave?: number;
  /**
   * 벽(타워)을 완전히 제거. 몬스터가 벽을 무시하고 영웅을 직접 공략.
   * AI 레이드 모드처럼 벽 없이 영웅 전투력으로만 싸우는 모드용.
   */
  noWall?: boolean;
  /**
   * 망혼구(亡魂球) 스탯. 던전 공격 & AI 레이드 전용. 영웅 전체에 적용.
   * atk/def/hp/atkSpeed/spd 각각의 rank값.
   */
  manghongu?: import('./manghonguData').ManghonguSave;
  /**
   * 벽 초기 HP 오버라이드 (튜토리얼 전용). 미제공 시 기본값 사용.
   */
  wallHpOverride?: number;
  /**
   * 메카닉 포탑 사용자 지정 위치. 제공 시 각 인덱스의 포탑이 해당 위치에 배치됨.
   */
  customTurretPositions?: { x: number; y: number }[];
}

export class GameEngine {
  state: GameState;
  damageNumbers: DamageNumber[] = [];
  explosions: Explosion[] = [];
  private animationId: number | null = null;
  private lastTime: number = 0;
  private onStateChange: () => void;
  private options: GameOptions;
  private syncTimer: number = 0;
  private auraTimer: number = 0;
  private isAuraTick: boolean = false;
  private lifeAuraTimer: number = 0;
  private reviveUsed: boolean = false;
  private static SYNC_INTERVAL = 1 / 15; // 15 FPS sync rate for multiplayer
  private static AURA_INTERVAL = 1.0;    // 1초마다 오라 데미지
  // 소환수 재소환 타이머: `${heroId}:${skillId}` → 남은 초
  private summonRespawnTimers = new Map<string, number>();

  constructor(onStateChange: () => void, options: GameOptions = {}) {
    this.onStateChange = onStateChange;
    this.options = options;
    this.state = this.createInitialState();
    this.initializeSummons();
  }

  private createInitialState(): GameState {
    const heroBase = this.options.customHeroes?.length ? this.options.customHeroes : DEFAULT_HEROES;
    const initPos = this.options.initialPositions;
    const positions = (initPos && initPos.length === heroBase.length)
      ? initPos
      : this.assignHeroPositions(heroBase);
    const rawHeroes: GameHero[] = heroBase.map((h, i) => ({
      ...h,
      id: i + 1,
      position: { ...positions[i] },
    }));

    // Calculate synergies
    const synergies = calcSynergies(rawHeroes);
    const wallEffects = getWallEffects(this.options.wallTalents);
    const heroDefBns     = wallEffects.heroDefBonus        || 0;
    const heroSpdBns     = wallEffects.heroSpdBonusPct     || 0;
    const heroAtkSpdBns  = wallEffects.heroAtkSpeedBonusPct || 0;
    const meleeTankBonuses = getMeleeTankBonuses(this.options.wallTalents ?? {});

    const heroes = rawHeroes.map(h => {
      const hero = applySynergyToHero(h, synergies);
      if (heroDefBns    > 0) hero.def            += heroDefBns;
      if (heroSpdBns    > 0) hero.speed          *= (1 + heroSpdBns / 100);
      if (heroAtkSpdBns > 0) hero.attackCooldown *= Math.max(0.1, 1 - heroAtkSpdBns / 100);

      // ── 벽 특성 근딜·탱커 정적 보너스 ──
      if (hero.role === 'melee_dps' || hero.role === 'tank') {
        if (meleeTankBonuses.atkPct > 0)
          hero.atk = Math.round(hero.atk * (1 + meleeTankBonuses.atkPct / 100));
        if (meleeTankBonuses.defFlat > 0)
          hero.def += meleeTankBonuses.defFlat;
        if (meleeTankBonuses.hpPct > 0) {
          hero.maxHp = Math.round(hero.maxHp * (1 + meleeTankBonuses.hpPct / 100));
          hero.hp = hero.maxHp;
        }
        if (meleeTankBonuses.atkSpdPct > 0)
          hero.attackCooldown = Math.max(0.1, parseFloat(
            (hero.attackCooldown * (1 - meleeTankBonuses.atkSpdPct / 100)).toFixed(3)
          ));
      }
      return hero;
    });

    // ── 망혼구 스탯 적용 (오펜스 & AI 레이드 전용) ──
    const mg = this.options.manghongu;
    if (mg) {
      for (const hero of heroes) {
        if (mg.atk > 0)      hero.atk = Math.round(hero.atk * (1 + mg.atk * 0.02));
        if (mg.def > 0)      hero.def += mg.def * 5;
        if (mg.hp > 0)       { hero.maxHp = Math.round(hero.maxHp * (1 + mg.hp * 0.02)); hero.hp = hero.maxHp; }
        if (mg.atkSpeed > 0) hero.attackCooldown = Math.max(0.1, parseFloat((hero.attackCooldown * (1 - mg.atkSpeed * 0.01)).toFixed(3)));
        if (mg.spd > 0)      hero.speed = parseFloat((hero.speed * (1 + mg.spd * 0.01)).toFixed(2));
      }
    }

    let aiAuraMultiplier = 1.0;
    let aiAuraBonusPct = 0;
    for (const h of heroes) {
      if (this.hasSkill(h.equippedSkillIds, 'unique_protagonist_ai_all')) {
        aiAuraBonusPct += (h.uniqueSkillValue ?? 50);
      }
    }
    aiAuraMultiplier = 1 + (aiAuraBonusPct / 100);
    if (aiAuraMultiplier > 1.0) {
      for (const hero of heroes) {
        hero.atk = Math.round(hero.atk * aiAuraMultiplier);
        hero.def = Math.round(hero.def * aiAuraMultiplier);
        hero.maxHp = Math.round(hero.maxHp * aiAuraMultiplier);
        hero.hp = hero.maxHp;
        hero.speed = parseFloat((hero.speed * aiAuraMultiplier).toFixed(2));
        // 공속 보너스는 쿨다운 감소 (1.5배 빨라지려면 쿨다운을 1.5로 나눔)
        hero.attackCooldown = Math.max(0.1, parseFloat((hero.attackCooldown / aiAuraMultiplier).toFixed(3)));
      }
    }

    const maxTowerHp = this.options.wallHpOverride ?? (TOWER_HP + (wallEffects.hpBonus || 0) + (wallEffects.earthHpBonus || 0));

    const firstWallMaxed = WALL_TALENTS.length > 0 && WALL_TALENTS.every(t => (this.options.wallTalents?.[t.id] ?? 0) >= t.maxRank);
    const secondWallMaxed = firstWallMaxed && SECOND_WALL_TALENTS.length > 0 && SECOND_WALL_TALENTS.every(t => (this.options.wallTalents?.[t.id] ?? 0) >= t.maxRank);
    const baseTowerX = this.options.towerX ?? TOWER_X;

    const tower = {
      hp: maxTowerHp,
      maxHp: maxTowerHp,
      level: 1,
      position: { x: baseTowerX, y: FIELD_Y_CENTER },
      talents: wallEffects,
    };

    const secondTower = firstWallMaxed ? {
      hp: maxTowerHp,
      maxHp: maxTowerHp,
      level: 1,
      position: { x: baseTowerX + 80, y: FIELD_Y_CENTER }, // 1의 벽보다 앞칸
      talents: wallEffects,
    } : undefined;

    const thirdTower = secondWallMaxed ? {
      hp: maxTowerHp,
      maxHp: maxTowerHp,
      level: 1,
      position: { x: baseTowerX + 160, y: FIELD_Y_CENTER }, // 2의 벽보다 앞칸
      talents: wallEffects,
    } : undefined;

    // walls: 가장 바깥쪽 벽이 [0], 가장 안쪽(wall1)이 at(-1)
    const walls: import('./types').Tower[] = [tower];
    if (secondTower) walls.unshift(secondTower);
    if (thirdTower) walls.unshift(thirdTower);

    return {
      phase: 'prep',
      currentWave: Math.max(0, (this.options.startFromWave ?? 1) - 1),
      maxWave: this.options.maxWave || 30,
      heroes,
      monsters: [],
      walls,
      meleeTankBonuses,
      score: 0,
      goldEarned: 0,
      nextMonsterId: 1,
      waveTimer: WAVE_PREP_TIME,
      isPaused: false,
      gameSpeed: 1,
      synergies,
      bossAbilityLog: [],
      projectiles: [],
      nextProjectileId: 1,
      summons: [],
      nextSummonId: 1,
      meter: [],
      hots: [],
      shields: [],
      healerEffects: [],
      healingFlashes: [],
      aiAuraBonus: aiAuraMultiplier,
      waveElapsedTime: 0,
    };
  }

  getDifficultyScale() {
    return DIFFICULTY_SCALE[this.options.difficulty || 'normal'];
  }

  getSynergies(): SynergyBonus[] {
    return this.state.synergies;
  }

  /**
   * 영웅 배열을 받아 역할(role)별로 그룹화한 뒤,
   * 각 그룹 내에서 Y좌표를 균등 분배한 Position 배열을 반환.
   * 5명~15명 모두 지원.
   */
  private assignHeroPositions(heroes: Omit<GameHero, 'id' | 'position'>[]): Position[] {
    // 역할별 X 위치 (전선 → 후방)
    const isOffense = this.options.mode === 'offense';
    const roleXMap: Record<string, number> = isOffense ? {
      // offense: 영웅이 왼쪽에서 오른쪽으로 전진 — 탱·근딜이 앞, 원딜·힐러가 뒤
      tank:       200,  // 앞줄, 가장 먼저 전진
      melee_dps:  185,
      cc:         160,
      ranged_dps: 150,  // 후방 원거리
      healer:     130,  // 최후방
    } : {
      // defense: 방어선(벽) = TOWER_X(215) 기준: 원딜·힐러는 벽 왼쪽(후방 보호)
      tank:       HERO_MAX_X - 50,   // 450 – 최전선
      melee_dps:  HERO_MAX_X - 95,   // 405 – 근접딜
      cc:         HERO_MIN_X + 160,  // 280 – CC (벽 오른쪽)
      ranged_dps: TOWER_X - 50,      // 165 – 원딜 (벽 왼쪽 후방)
      healer:     HERO_MIN_X + 15,   // 135 – 힐러 (벽 왼쪽 후방)
    };

    // 역할별 인덱스 그룹 생성
    const roleGroups: Record<string, number[]> = {};
    heroes.forEach((h, i) => {
      if (!roleGroups[h.role]) roleGroups[h.role] = [];
      roleGroups[h.role].push(i);
    });

    const yMin = FIELD_Y_MIN + 25;
    const yMax = FIELD_Y_MAX - 25;
    const positions: Position[] = new Array(heroes.length);

    for (const [role, indices] of Object.entries(roleGroups)) {
      const x = roleXMap[role] ?? (HERO_MIN_X + 60);
      const count = indices.length;
      indices.forEach((heroIdx, localIdx) => {
        const y = count === 1
          ? FIELD_Y_CENTER
          : yMin + (yMax - yMin) * localIdx / (count - 1);
        positions[heroIdx] = { x, y };
      });
    }

    return positions;
  }

  start() {
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  stop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  reset() {
    this.stop();
    this.state = this.createInitialState();
    this.damageNumbers = [];
    this.explosions = [];
    this.onStateChange();
  }

  togglePause() {
    this.state.isPaused = !this.state.isPaused;
    if (!this.state.isPaused) {
      this.lastTime = performance.now();
    }
    this.onStateChange();
  }

  setSpeed(speed: number) {
    this.state.gameSpeed = speed;
    this.onStateChange();
  }

  private loop = (now: number) => {
    this.animationId = requestAnimationFrame(this.loop);

    if (this.state.isPaused) return;

    const rawDt = (now - this.lastTime) / 1000;
    const dt = Math.min(rawDt, 0.1) * this.state.gameSpeed;
    this.lastTime = now;

    this.update(dt);
    this.onStateChange();
  };

  private update(dt: number) {
    // 폭발 이펙트는 defeat/victory 후에도 계속 업데이트
    for (let i = this.explosions.length - 1; i >= 0; i--) {
      this.explosions[i].timer -= dt;
      if (this.explosions[i].timer <= 0) this.explosions.splice(i, 1);
    }

    if (this.state.phase === 'victory' || this.state.phase === 'defeat') return;

    // Offense 모드: 적 벽 파괴 + 살아있는 수비대 전원 처치 시 승리
    if (this.options.mode === 'offense' && this.state.walls.at(-1)!.hp <= 0 && this.state.phase === 'wave') {
      if (!this.state.monsters.some(m => m.isAlive)) {
        this.state.phase = 'victory';
        return;
      }
    }

    // Multiplayer sync
    if (this.options.onStateSync) {
      this.syncTimer += dt;
      if (this.syncTimer >= GameEngine.SYNC_INTERVAL) {
        this.syncTimer = 0;
        this.options.onStateSync(this.state, this.damageNumbers);
      }
    }

    // Update damage numbers
    this.damageNumbers = this.damageNumbers
      .map(d => ({ ...d, timer: d.timer - dt, y: d.y - 30 * dt }))
      .filter(d => d.timer > 0);

    if (this.state.phase === 'prep') {
      this.state.waveTimer -= dt;
      if (this.state.waveTimer <= 0) {
        this.startNextWave();
      }
      return;
    }

    if (this.state.phase === 'wave_clear') {
      this.state.waveTimer -= dt;
      if (this.state.waveTimer <= 0) {
        if (this.state.currentWave >= this.state.maxWave) {
          this.state.phase = 'victory';
        } else {
          // 영웅 회복 / 부활 / 소환수 재소환 (무한·일반 공통)
          this.state.heroes.forEach(h => {
            if (h.isAlive) h.hp = Math.min(h.maxHp, h.hp + h.maxHp * 0.3);
          });
          const revivePct = this.state.walls.at(-1)!.talents?.reviveAllPct ?? 0;
          if (revivePct > 0) {
            let revived = false;
            this.state.heroes.forEach(h => {
              if (!h.isAlive) {
                h.isAlive = true;
                h.hp = Math.round(h.maxHp * revivePct);
                revived = true;
              }
            });
            if (revived) this.reviveUsed = false;
          }
          this.reinitializeSummons();

          if (this.state.maxWave >= 1000) {
            // 무한모드: prep 단계 없이 즉시 다음 웨이브 시작 (흐름 유지)
            this.startNextWave();
          } else {
            this.state.phase = 'prep';
            this.state.waveTimer = WAVE_PREP_TIME;
          }
        }
      }
      return;
    }

    // Wave phase - update all entities
    this.updateTowerEffects(dt);
    this.updateProjectiles(dt);
    this.updateMonsters(dt);
    this.updateHeroes(dt);
    this.updateSummons(dt);
    this.updateHealingEffects(dt);
    this.checkWaveComplete();

    // 웨이브 제한시간: 레이드(noWall), 무한모드(maxWave>=1000) 제외, 60초 초과 시 강제 게임오버
    if (!this.options.noWall && this.state.maxWave < 1000 && this.state.phase === 'wave') {
      this.state.waveElapsedTime += dt;
      if (this.state.waveElapsedTime >= 60) {
        this.state.phase = 'defeat';
      }
    }
  }

  private updateHealingEffects(dt: number) {
    // 1. 지속 치유 (HoT)
    this.state.hots = this.state.hots.filter(hot => {
      const target = hot.targetType === 'hero' 
        ? this.state.heroes.find(h => h.id === hot.targetId && h.isAlive)
        : this.state.summons.find(s => s.id === hot.targetId && s.isAlive);
      
      if (!target) return false;

      hot.timer -= dt;
      if (hot.timer <= 0) {
        // 틱 발생
        this.applyDirectHeal(null, target, hot.amountPerTick, hot.targetType, hot.color, false);
        hot.currentTick++;
        hot.timer = hot.interval;
      }
      return hot.currentTick < hot.totalTicks;
    });

    // 2. 보호막
    this.state.shields = this.state.shields.filter(s => {
      s.duration -= dt;
      return s.duration > 0 && s.amount > 0;
    });

    // 3. 플래시 이펙트
    this.state.healingFlashes = this.state.healingFlashes
      .map(f => ({ ...f, timer: f.timer - dt }))
      .filter(f => f.timer > 0);
  }

  private updateTowerEffects(dt: number) {
    const tower = this.state.walls.at(-1)!;
    const talents = tower.talents;
    if (!talents) return;

    this.auraTimer += dt;
    this.isAuraTick = this.auraTimer >= GameEngine.AURA_INTERVAL;
    if (this.isAuraTick) this.auraTimer = 0;
    const isAuraTick = this.isAuraTick;

    const wallX = tower.position.x;
    const wallAggroRadius = WALL_AGGRO_RANGE + 50; // 기본 오라 범위

    // 서리왕의 성벽 (Tier 6): 벽 HP 30% 이하 시 전맵 슬로우
    const isGlobalSlow = talents.globalSlowLowHp && (tower.hp / tower.maxHp <= 0.3);

    for (const monster of this.state.monsters) {
      if (!monster.isAlive) continue;

      let applySlow = false;
      const distToWall = Math.abs(monster.position.x - wallX);

      if (isGlobalSlow) {
        applySlow = true;
      } else if ((talents.auraSlowPct || 0) > 0) {
        // 거리 체크: 기본은 벽 근처, 'heroes'면 영웅 존(전방) 전체
        if (talents.slowZone === 'heroes') {
          // 영웅 존: TOWER_X(215) ~ HERO_MAX_X(500) + @
          if (monster.position.x <= HERO_MAX_X + 50) {
            applySlow = true;
          }
        } else {
          // 기본 벽 오라 범위
          if (distToWall <= wallAggroRadius) {
            applySlow = true;
          }
        }
      }

      // 1. 냉기 오라: 상시 슬로우
      if (applySlow && !monster.immuneToCc) {
        monster.isSlowed = true;
        monster.slowTimer = Math.max(monster.slowTimer, 1.0); // 상시 유지
      }

      // 2. 화염 오라: 주기적 피해 (벽 근처만)
      if (distToWall <= wallAggroRadius && isAuraTick && (talents.auraDamage || 0) > 0) {
        monster.hp -= talents.auraDamage!;
        this.addDamageNumber(monster.position.x, monster.position.y - 15, talents.auraDamage!, '#f97316');
        this.addWallMeterDamage(talents.auraDamage!);
      }
      
      // 2-1. 독 오라 (제 2의 벽)
      if (distToWall <= wallAggroRadius && isAuraTick && (talents.naturePoisonAura || 0) > 0) {
        monster.hp -= talents.naturePoisonAura!;
        this.addDamageNumber(monster.position.x, monster.position.y - 5, talents.naturePoisonAura!, '#84cc16');
        this.addWallMeterDamage(talents.naturePoisonAura!);
      }

      // 2-2. 처형 오라 (제 2의 벽)
      if (distToWall <= wallAggroRadius && isAuraTick && (talents.shadowExecute || 0) > 0) {
        if (monster.hp / monster.maxHp <= (talents.shadowExecute! / 100)) {
          monster.hp = 0;
          this.addDamageNumber(monster.position.x, monster.position.y - 25, 9999, '#a855f7');
        }
      }

      // 2-3. 폭풍 오라: 주기적 피해 + 연쇄 번개 (제 3의 벽)
      if (distToWall <= wallAggroRadius && isAuraTick && (talents.stormAuraDmg || 0) > 0) {
        const stormDmg = talents.stormAuraDmg!;
        monster.hp -= stormDmg;
        this.addDamageNumber(monster.position.x, monster.position.y - 10, stormDmg, '#818cf8');
        this.addWallMeterDamage(stormDmg);

        const chainCount = Math.round(talents.stormChainCount || 0);
        if (chainCount > 0) {
          const chainDmg = Math.round(stormDmg * 0.5);
          const chainTargets = this.state.monsters
            .filter(m => m.isAlive && m.id !== monster.id && Math.abs(m.position.x - wallX) <= wallAggroRadius)
            .sort((a, b) => this.distance(monster.position, a.position) - this.distance(monster.position, b.position))
            .slice(0, chainCount);
          for (const ct of chainTargets) {
            ct.hp -= chainDmg;
            this.addDamageNumber(ct.position.x, ct.position.y - 10, chainDmg, '#818cf8');
            this.addWallMeterDamage(chainDmg);
          }
        }
      }

      if (monster.hp <= 0) {
        monster.hp = 0;
        monster.isAlive = false;
        this.addScore(getMonsterScore(monster, 1));
        this.addGold(getMonsterGold(monster, 1));
        this.applyThirdWallOnKill(monster);
      }
    }

    // 3. 생명 오라: 15초마다 전 아군 힐
    const lifeHeal = talents.healAlliesAura || 0;
    if (lifeHeal > 0) {
      this.lifeAuraTimer += dt;
      if (this.lifeAuraTimer >= 15.0) {
        this.lifeAuraTimer = 0;
        for (const hero of this.state.heroes) {
          if (hero.isAlive) {
            const prevHp = hero.hp;
            hero.hp = Math.min(hero.maxHp, hero.hp + lifeHeal);
            const actualHeal = hero.hp - prevHp;
            this.addDamageNumber(hero.position.x, hero.position.y - 22, lifeHeal, '#22C55E', true);
            if (actualHeal > 0) this.addWallMeterHeal(actualHeal);
          }
        }
      }
    } else {
      this.lifeAuraTimer = 0;
    }
  }

  private startNextWave() {
    this.state.currentWave++;
    this.state.phase = 'wave';
    this.state.waveElapsedTime = 0;

    // 웨이브 시작: 고통의 저주 스택 리셋 (몬스터 교체됨)
    for (const hero of this.state.heroes) {
      if (hero.skillTimers?.['feldah_agony_stacks'] !== undefined) {
        hero.skillTimers['feldah_agony_stacks'] = 0;
      }
    }

    const waveConfig = this.options.waveGenerator
      ? this.options.waveGenerator(this.state.currentWave)
      : generateWave(this.state.currentWave);
    const newMonsters: GameMonster[] = [];

    // 플레이어 수에 따라 몬스터 수 스케일 (보스는 유지)
    const playerCount = this.options.playerCount ?? 1;
    const monsterScale = playerCount >= 3 ? 4.0 : playerCount >= 2 ? 2.5 : 1.0;

    for (const group of waveConfig.monsters) {
      const actualCount = group.type === 'boss'
        ? group.count
        : Math.max(1, Math.round(group.count * monsterScale));
      for (let i = 0; i < actualCount; i++) {
        const yOffset = (Math.random() - 0.5) * (FIELD_Y_MAX - FIELD_Y_MIN - 40);
        const xOffset = Math.random() * 150;

        let size = MONSTER_SIZE;
        if (group.type === 'boss') size = BOSS_SIZE;
        else if (group.type === 'elite') size = ELITE_SIZE;

        const scale = this.getDifficultyScale();
        const scaledHp = Math.round(group.hp * scale.hp);
        const scaledAtk = Math.round(group.atk * scale.atk);

        newMonsters.push({
          id: this.state.nextMonsterId++,
          name: group.name,
          displayName: group.displayName,
          displayNameKey: group.displayNameKey,
          monsterType: group.type,
          maxHp: scaledHp,
          hp: scaledHp,
          atk: scaledAtk,
          def: group.def,
          speed: group.speed,
          isRanged: group.isRanged,
          position: {
            x: group.startX !== undefined ? group.startX : MONSTER_SPAWN_X + xOffset,
            y: group.startY !== undefined ? group.startY : FIELD_Y_CENTER + yOffset,
          },
          isAlive: true,
          aggroTable: {},
          targetId: null,
          targetType: null,
          isSlowed: false,
          slowTimer: 0,
          isStunned: false,
          stunTimer: 0,
          attackCooldown: group.attackCooldown ?? 1.0,
          attackTimer: 0,
          affix: group.affix,
          affixCooldown: 8.0,
          affixTimer: 0,
          isEnraged: false,
          color: group.color,
          size,
          defenderRole: group.defenderRole,
          enemyHealTimer: group.defenderRole === 'healer' ? 3.0 : undefined,
          hidesBehindWall: group.hidesBehindWall,
          hasCleave: group.hasCleave,
          auraDamage: group.auraDamage,
          auraRadius: group.auraRadius,
          immuneToCc: group.immuneToCc ?? false,
          isSuicideBomber: group.isSuicideBomber ?? false,
          ironSkin: group.ironSkin ?? false,
          wallCrash: group.wallCrash ?? false,
          wallCrashTriggered: false,
        });
      }
    }

    this.state.monsters = newMonsters;
    // Keep only last 5 boss ability logs
    if (this.state.bossAbilityLog.length > 5) {
      this.state.bossAbilityLog = this.state.bossAbilityLog.slice(-5);
    }

    // ── 생명 계열: 웨이브 시작 시 아군 보호막 부여 ──
    const shieldPct = this.state.walls.at(-1)!.talents?.shieldOnWaveStartPct || 0;
    if (shieldPct > 0) {
      for (const hero of this.state.heroes) {
        if (hero.isAlive) {
          const shieldAmt = Math.round(hero.maxHp * shieldPct);
          this.applyShield(hero, shieldAmt, 'hero', 120, GameEngine.WALL_METER_ID);
        }
      }
    }

    // ── 번개 계열: 웨이브 시작 번개 폭풍 ──
    const lightning = this.state.walls.at(-1)!.talents?.lightningReflect || 0;
    if (this.state.walls.at(-1)!.talents?.waveStartLightning && lightning > 0) {
      const stormDmg = Math.round(lightning * 2);
      const doStun = !!this.state.walls.at(-1)!.talents.waveStartStun;
      for (const monster of newMonsters) {
        const prevHp = monster.hp;
        monster.hp = Math.max(1, monster.hp - stormDmg);
        this.addDamageNumber(monster.position.x, monster.position.y - 20, stormDmg, '#EAB308');
        this.addWallMeterDamage(prevHp - monster.hp);
        if (doStun && !monster.immuneToCc) {
          monster.isStunned = true;
          monster.stunTimer = 1.5;
        }
      }
    }

    // ── 대지 계열: 웨이브 시작 지진 광역 피해 + 스턴 ──
    const earthquake = this.state.walls.at(-1)!.talents?.massEarthquake || 0;
    if (earthquake > 0) {
      for (const monster of newMonsters) {
        const prevHp = monster.hp;
        monster.hp = Math.max(1, monster.hp - earthquake);
        this.addDamageNumber(monster.position.x, monster.position.y - 25, earthquake, '#d97706');
        this.addWallMeterDamage(prevHp - monster.hp);
        if (!monster.immuneToCc) {
          monster.isStunned = true;
          monster.stunTimer = 1.0;
        }
      }
    }
  }

  private updateMonsters(dt: number) {
    const aliveAllies = [...this.state.heroes.filter(h => h.isAlive), ...this.state.summons.filter(s => s.isAlive)];
    for (const monster of this.state.monsters) {
      if (!monster.isAlive) continue;

      // ── 보스/특수 몹 고통의 오라 (근딜 피해) ──
      if (monster.auraDamage && monster.auraDamage > 0) {
        const auraTick = Math.floor(this.state.waveTimer) !== Math.floor(this.state.waveTimer - dt);
        if (auraTick) {
          const radius = monster.auraRadius || 150;
          const allies = aliveAllies;
          for (const ally of allies) {
            if (this.distance(monster.position, ally.position) <= radius) {
              const isMeleeTank = ally.role === 'tank' || ally.role === 'melee_dps';
              const baseAuraDmg = Math.round(monster.auraDamage * (this.options.difficulty === 'hard' ? 1.5 : 1.0));
              
              // 오라 데미지도 방어력의 영향을 받도록 수정 (단, 최소 10%는 입힘)
              const defEffect = isMeleeTank ? ally.def * 1.2 : ally.def * 0.5;
              let dmg = Math.max(Math.round(baseAuraDmg * 0.1), baseAuraDmg - Math.round(defEffect * 0.5));

              // ── Phase 144: 근딜 광역 피해 50% 감소 (특성 합연산 가능 구조) ──
              let aoeReduction = 0;
              if (ally.role === 'melee_dps') {
                aoeReduction += 0.50;
              }
              if (aoeReduction > 0) {
                dmg = Math.round(dmg * (1 - Math.min(0.95, aoeReduction)));
              }

              ally.hp -= dmg;
              this.addDamageNumber(ally.position.x, ally.position.y - 30, dmg, '#FF4500'); // 오라는 주황색

              // 무적 및 사망 처리
              const isHero = 'isInvincible' in ally;
              if (isHero && (ally as GameHero).isInvincible && ally.hp <= 0) ally.hp = 1;
              else if (ally.hp <= 0) {
                if (isHero) {
                  if (!this.tryReviveHero(ally as GameHero)) {
                    ally.hp = 0;
                    (ally as GameHero).isAlive = false;
                    this.checkGameOver();
                  }
                } else {
                  ally.hp = 0;
                  (ally as GameSummon).isAlive = false;
                }
              }
            }
          }
        }
      }

      // Boss enrage check (HP < 30%)
      if (monster.monsterType === 'boss' && !monster.isEnraged && monster.hp / monster.maxHp < 0.3) {
        monster.isEnraged = true;
        monster.atk = Math.round(monster.atk * 1.5);
        monster.speed *= 1.3;
        this.addBossLog(`${monster.displayName} 광폭화! 공격력 50% 증가!`);
        this.addDamageNumber(monster.position.x, monster.position.y - 40, 0, '#FF4500');
      }

      // Boss ability (affix)
      if (monster.monsterType === 'boss' && monster.affix && monster.affix !== 'none') {
        monster.affixTimer -= dt;
        if (monster.affixTimer <= 0) {
          this.executeBossAffix(monster);
          monster.affixTimer = monster.affixCooldown;
        }
      }

      // Update CC timers
      if (monster.isStunned) {
        monster.stunTimer -= dt;
        if (monster.stunTimer <= 0) {
          monster.isStunned = false;
        }
        continue;
      }

      // ── 천살 마기사 점멸 폭발 지속 피해 로직 ──
      if (monster.burstTimer && monster.burstTimer > 0) {
        monster.burstTimer -= dt;
        const burstTick = Math.floor((monster.burstTimer + dt) * 5) !== Math.floor(monster.burstTimer * 5); // 0.2초마다 틱
        if (burstTick) {
          const allies = aliveAllies;
          const radius = 250;
          for (const ally of allies) {
            if (this.distance(monster.position, ally.position) <= radius) {
              const dmg = Math.round(monster.atk * 0.4);
              ally.hp -= dmg;
              this.addDamageNumber(ally.position.x, ally.position.y - 20, dmg, '#9333EA');
              if (ally.hp <= 0) { ally.hp = 0; ally.isAlive = false; }
            }
          }
        }
        if (monster.burstTimer <= 0) {
          monster.isBlinking = false;
          this.addBossLog(`${monster.displayName}의 마력 폭발이 멈췄습니다.`);
        }
      }

      if (monster.isSlowed) {
        monster.slowTimer -= dt;
        if (monster.slowTimer <= 0) {
          monster.isSlowed = false;
        }
      }

      // ── 출혈 DoT (kaern_rake 등) ──
      if (monster.isBleed && monster.bleedTimer !== undefined && monster.bleedDmg !== undefined) {
        monster.bleedTimer -= dt;
        const bleedTick = Math.floor(monster.bleedTimer + dt) !== Math.floor(monster.bleedTimer);
        if (bleedTick && monster.bleedDmg > 0) {
          monster.hp -= monster.bleedDmg;
          this.addDamageNumber(monster.position.x, monster.position.y - 20, monster.bleedDmg, '#dc2626');
          if (monster.hp <= 0) { monster.hp = 0; monster.isAlive = false; this.addScore(getMonsterScore(monster, 1)); this.addGold(getMonsterGold(monster, 1)); }
        }
        if (monster.bleedTimer <= 0) { monster.isBleed = false; }
      }

      // ── Offense 모드: 수비대 전용 AI (벽 차단 없음) ──
      if (this.options.mode === 'offense') {
        this.updateDefenderAI(monster, dt);
        continue;
      }

      // ── 자폭병 전용 AI: 어그로/전투 없이 오직 벽으로 돌진 ──
      if (monster.isSuicideBomber) {
        const activeWall = this.getActiveWall();
        const wallAlive = (activeWall.hp > 0) && !this.options.noWall;
        const wallX = activeWall.position.x;
        const spd = monster.isSlowed ? monster.speed * 0.5 : monster.speed;
        monster.position.x -= spd * 60 * dt;

        // 자폭 판정: 벽이 살아있으면 벽에 도달, 없으면 영웅 사거리(200px) 내 도달
        const explodeTrigger = wallAlive
          ? monster.position.x <= wallX + 10
          : monster.position.x <= HERO_MAX_X + 50;

        if (explodeTrigger) {
          this.spawnExplosion(monster.position.x, monster.position.y, '#f97316', 200);
          monster.hp = 0;
          monster.isAlive = false;

          if (wallAlive) {
            // ── 벽이 살아있을 때: 고정 1500 피해 ──
            const damage = 1500;
            activeWall.hp = Math.max(0, activeWall.hp - damage);
            this.addDamageNumber(activeWall.position.x, activeWall.position.y - 50, damage, '#ef4444', true);
            this.state.bossAbilityLog.push(`💥 자폭병 폭발! 벽 ${damage.toLocaleString()} 피해!`);
          } else {
            // ── 벽 파괴 후: 반경 200px 내 영웅/소환수의 현재 HP 50% 감소 ──
            const BLAST_RADIUS = 200;
            let hitCount = 0;
            for (const ally of [...this.state.heroes, ...this.state.summons]) {
              if (!ally.isAlive) continue;
              if (this.distance(monster.position, ally.position) > BLAST_RADIUS) continue;
              const dmg = Math.max(1, Math.floor(ally.hp * 0.5));
              ally.hp = Math.max(1, ally.hp - dmg);
              this.addDamageNumber(ally.position.x, ally.position.y - 30, dmg, '#f97316', false);
              hitCount++;
            }
            if (hitCount > 0) {
              this.state.bossAbilityLog.push(`💥 자폭병 폭발! ${hitCount}명의 현재 HP 50% 감소!`);
            }
          }
        }
        continue;
      }

      // ── 벽 붕괴(wallCrash): 특정 X 도달 시 전 영웅 즉사 광역기 ──
      if (monster.wallCrash && !monster.wallCrashTriggered) {
        const WALL_CRASH_TRIGGER_X = TOWER_X + 80; // 벽 앞 80px 위치에서 발동
        if (monster.position.x <= WALL_CRASH_TRIGGER_X) {
          monster.wallCrashTriggered = true;
          // 전 영웅 즉사
          for (const hero of this.state.heroes) {
            if (!hero.isAlive) continue;
            const dmg = hero.hp;
            hero.hp = 0;
            this.addDamageNumber(hero.position.x, hero.position.y - 30, dmg, '#DC2626', true);
          }
          // 전 소환수도 제거
          for (const s of this.state.summons) {
            s.hp = 0;
            s.isAlive = false;
          }
          this.state.bossAbilityLog.push(`💀 ${monster.displayName ?? monster.name}의 대지 진동! 모두가 쓰러졌다!`);
          this.spawnExplosion(monster.position.x, monster.position.y, '#92400E', 400);
        }
      }

      // ── 어그로 로직 & 벽(방어선) 상호작용 ──
      const activeWall = this.getActiveWall();
      const wallPos = activeWall.position;
      const wallAlive = (activeWall.hp > 0) && !this.options.noWall;

      // 위협 수준 1위 개체 찾기
      const top = this.getTopThreatTarget(monster);
      monster.targetId = top?.id ?? null;
      monster.targetType = top?.type ?? null;

      // 타겟 개체 정보 가져오기
      let targetEntity: GameHero | GameSummon | null = null;
      if (monster.targetType === 'hero') {
        targetEntity = this.state.heroes.find(h => h.id === monster.targetId && h.isAlive) ?? null;
      } else if (monster.targetType === 'summon') {
        targetEntity = this.state.summons.find(s => s.id === monster.targetId && s.isAlive) ?? null;
      }

      // 벽에 의한 차단 여부 확인 (벽 오른쪽에 있는 몬스터가 벽 왼쪽의 개체를 노릴 때)
      let isBlockedByWall = false;
      if (wallAlive && monster.position.x > wallPos.x + 20) {
        if (targetEntity && targetEntity.position.x < wallPos.x - 20) {
          isBlockedByWall = true;
        }
      }

      // 포탑 차단: 벽 파괴 후 메카닉 포탑이 2순위 방어선 역할 (근접 몬스터만)
      let turretBlock: GameSummon | null = null;
      if (!wallAlive && !monster.isRanged) {
        const aliveTurrets = this.state.summons.filter(
          s => s.isAlive && s.skillId?.startsWith('mechanic_turret_')
        );
        turretBlock = aliveTurrets.find(t =>
          monster.position.x > t.position.x + 20 &&
          (!targetEntity || targetEntity.position.x < t.position.x - 20)
        ) ?? null;
      }

      // 최종 행동 결정
      if (monster.isRanged && !monster.defenderRole) {
        // ── 디펜스 모드 원거리 몬스터: 맵 중앙(CANVAS_WIDTH/2)까지 전진 후 교전 ──
        const RANGED_CENTER_X = CANVAS_WIDTH / 2; // 600px
        if (monster.position.x > RANGED_CENTER_X) {
          // 아직 중앙 미도달 → 전진
          const spd = monster.isSlowed ? monster.speed * 0.5 : monster.speed;
          monster.position.x = Math.max(RANGED_CENTER_X, monster.position.x - spd * 60 * dt);
        } else {
          // 중앙 도달 → 벽이 살아있으면 항상 벽 공격 (영웅 어그로 무시)
          // 벽 파괴 후에만 사거리 내 영웅 공격
          monster.attackTimer -= dt;
          if (monster.attackTimer <= 0) {
            if (wallAlive) {
              // 벽 우선 공격 — 영웅 어그로와 무관하게 항상 벽 타겟
              this.spawnWallProjectile(monster, activeWall);
              // attackTimer reset은 spawnWallProjectile 내부에서 처리
            } else {
              // 벽 파괴 후: 사거리 내 타겟 공격
              const inRangeTarget = targetEntity &&
                this.distance(monster.position, targetEntity.position) <= 450;
              if (inRangeTarget && targetEntity) {
                const dmg = this.calculateDamage(monster.atk, targetEntity.def);
                this.spawnMonsterProjectile(monster, targetEntity, dmg, monster.targetType as 'hero' | 'summon');
                monster.attackTimer = monster.attackCooldown;
              } else {
                monster.attackTimer = monster.attackCooldown;
                // 타겟 없음: 가장 가까운 영웅 초기 어그로 등록
                const aliveHeroes = this.state.heroes.filter(h => h.isAlive);
                if (aliveHeroes.length > 0) {
                  const closest = aliveHeroes.reduce((best, h) =>
                    this.distance(monster.position, h.position) < this.distance(monster.position, best.position) ? h : best
                  );
                  if (Object.keys(monster.aggroTable).length === 0) {
                    monster.aggroTable[`hero:${closest.id}`] = 1;
                  }
                }
              }
            }
          }
        }
      } else if (isBlockedByWall) {
        // ── 차단됨: 벽 공격 (근접 몬스터 or 오펜스 수비대) ──
        const wallAttackRange = monster.isRanged ? 450 : 45;
        const distToWall = monster.position.x - wallPos.x;

        if (distToWall > wallAttackRange) {
          const spd = monster.isSlowed ? monster.speed * 0.5 : monster.speed;
          monster.position.x = Math.max(wallPos.x + (monster.isRanged ? 1 : 40), monster.position.x - spd * 60 * dt);
        }
        if (distToWall <= wallAttackRange) {
          monster.attackTimer -= dt;
          if (monster.attackTimer <= 0) {
            if (monster.isRanged) {
              this.spawnWallProjectile(monster, activeWall);
            } else {
              this.attackWallDirect(monster, activeWall);
            }
          }
        }
      } else if (turretBlock) {
        // ── 포탑 차단: 벽 파괴 후 메카닉 포탑을 2순위 방어선으로 공격 ──
        const distToTurret = this.distance(monster.position, turretBlock.position);
        if (distToTurret > 40) {
          this.moveToward(monster, turretBlock.position, dt);
        } else {
          monster.attackTimer -= dt;
          if (monster.attackTimer <= 0) {
            this.monsterAttack(monster, turretBlock, 'summon');
            monster.attackTimer = monster.attackCooldown;
          }
        }
      } else if (targetEntity) {
        // ── 타겟 있음: 추적/공격 ──
        const dist = this.distance(monster.position, targetEntity.position);
        const attackDist = monster.isRanged ? 450 : 35;

        if (dist > attackDist) {
          this.moveToward(monster, targetEntity.position, dt);
        } else {
          monster.attackTimer -= dt;
          if (monster.attackTimer <= 0) {
            if (monster.isRanged && !monster.defenderRole) {
              // (여기 도달 안 함 — 위의 ranged 블록에서 처리됨)
              const dmg = this.calculateDamage(monster.atk, targetEntity.def);
              this.spawnMonsterProjectile(monster, targetEntity, dmg, monster.targetType as 'hero' | 'summon');
            } else {
              this.monsterAttack(monster, targetEntity, monster.targetType as 'hero' | 'summon');
            }
            monster.attackTimer = monster.attackCooldown;
          }
        }
      } else {
        // ── 타겟 없음: 벽(목표지점)으로 무조건 전진 (근접 몬스터 or 오펜스 수비대) ──
        const wallAttackRange2 = monster.isRanged ? 450 : 45;
        const wallAggroTrigger = monster.isRanged ? 450 : WALL_AGGRO_RANGE;
        if (wallAlive && monster.position.x <= wallPos.x + wallAggroTrigger) {
          if (!monster.isRanged && monster.position.x > wallPos.x + 40) {
            const spd = monster.isSlowed ? monster.speed * 0.5 : monster.speed;
            monster.position.x -= spd * 60 * dt;
          }
          if (monster.position.x <= wallPos.x + wallAttackRange2) {
            monster.attackTimer -= dt;
            if (monster.attackTimer <= 0) {
              if (monster.isRanged) {
                this.spawnWallProjectile(monster, activeWall);
              } else {
                this.attackWallDirect(monster, activeWall);
              }
            }
          }
        } else if (wallAlive) {
          this.moveToward(monster, wallPos, dt);
        } else {
          // 벽 파괴됨 + 타겟 없음: 메카닉 포탑 우선(2순위), 없으면 가장 가까운 영웅
          if (Object.keys(monster.aggroTable).length === 0) {
            const aliveTurrets = this.state.summons.filter(
              s => s.isAlive && s.skillId?.startsWith('mechanic_turret_')
            );
            const closestTurret = aliveTurrets
              .filter(t => monster.position.x > t.position.x + 20)
              .sort((a, b) => this.distance(monster.position, a.position) - this.distance(monster.position, b.position))[0];
            if (closestTurret) {
              monster.aggroTable[`summon:${closestTurret.id}`] = 100;
            } else {
              const aliveHeroes = this.state.heroes.filter(h => h.isAlive);
              if (aliveHeroes.length > 0) {
                const closest = aliveHeroes.reduce((best, h) =>
                  this.distance(monster.position, h.position) < this.distance(monster.position, best.position) ? h : best
                );
                monster.aggroTable[`hero:${closest.id}`] = 1;
              }
            }
          }
        }
      }
    }
  }

  private executeBossAffix(boss: GameMonster) {
    switch (boss.affix) {
      case 'aoe_slam': {
        // 천살 마기사 전용: 전체 광역기 (Thousand-Kill Blossom)
        const isChunsal = boss.name === 'chunsal_magisa';
        const radius = isChunsal ? 2000 : 250;
        let hit = 0;
        const allies = [...this.state.heroes.filter(h => h.isAlive), ...this.state.summons.filter(s => s.isAlive)];
        for (const ally of allies) {
          if (isChunsal || this.distance(boss.position, ally.position) <= radius) {
            // 근딜/탱커는 방어력 효율을 더 높게 적용 (보스 광역기에 잘 버티게)
            const isMeleeTank = ally.role === 'tank' || ally.role === 'melee_dps';
            const rawDmg = Math.round(boss.atk * (isChunsal ? 1.0 : 0.6));
            const defEffect = isMeleeTank ? ally.def * 1.5 : ally.def;
            let dmg = Math.max(Math.round(rawDmg * 0.1), rawDmg - Math.round(defEffect * 0.8));

            // ── Phase 144: 근딜 광역 피해 50% 감소 ──
            let aoeReduction = 0;
            if (ally.role === 'melee_dps') aoeReduction += 0.50;
            if (aoeReduction > 0) dmg = Math.round(dmg * (1 - Math.min(0.95, aoeReduction)));

            // ── 고유 피해 감소 패시브 적용 (영웅 전용) ──
            const isHero = 'isInvincible' in ally;
            if (isHero) {
              const heroAlly = ally as GameHero;
              const skills = heroAlly.equippedSkillIds ?? [];
              if (this.hasSkill(skills, 'unique_arthur_protection') && boss.isRanged === false) {
                dmg = Math.round(dmg * (1 - (heroAlly.uniqueSkillValue ?? 15) / 100));
              }
              if (this.hasSkill(skills, 'unique_yrel_protection')) {
                dmg = Math.round(dmg * (1 - (heroAlly.uniqueSkillValue ?? 15) / 100));
              }
              if (heroAlly.dmgReducePct && heroAlly.dmgReduceTimer && heroAlly.dmgReduceTimer > 0) {
                dmg = Math.round(dmg * (1 - heroAlly.dmgReducePct));
              }
            }

            ally.hp -= dmg;
            this.addDamageNumber(ally.position.x, ally.position.y - 20, dmg, isChunsal ? '#9333EA' : '#FF6B35');

            // 사망 처리
            if (isHero) {
              const heroAlly = ally as GameHero;
              if (heroAlly.isInvincible && heroAlly.hp <= 0) {
                heroAlly.hp = 1;
                this.addDamageNumber(heroAlly.position.x, heroAlly.position.y - 40, 0, '#FFD700', true);
              } else if (heroAlly.hp <= 0) {
                if (!this.tryReviveHero(heroAlly)) {
                  heroAlly.hp = 0;
                  heroAlly.isAlive = false;
                  this.checkGameOver();
                }
              }
            } else {
              if (ally.hp <= 0) {
                ally.hp = 0;
                (ally as GameSummon).isAlive = false;
              }
            }
            hit++;
          }
        }
        if (hit > 0) {
          if (isChunsal) {
            this.addBossLog(`${boss.displayName} 천살 만개! 전 화면 피해!`);
            this.spawnExplosion(600, 450, '#7C3AED', 1200);
          } else {
            this.addBossLog(`${boss.displayName} 대지 강타! ${hit}명 적중!`);
          }
        }
        break;
      }
      case 'summon': { // 천살 마기사 점멸 기믹 수동 호출 (affix가 summon인 경우 분기)
        if (boss.name === 'chunsal_magisa') {
          boss.isBlinking = true;
          boss.position.x = 600;
          boss.position.y = FIELD_Y_CENTER;
          boss.burstTimer = 3.0;
          this.addBossLog(`${boss.displayName} 허공 점멸! 중앙 마력 폭발!`);
          this.spawnExplosion(boss.position.x, boss.position.y, '#9333EA', 300);
          break;
        }
        // 기존: 보스 하수인 소환 로직 (zagg 등)
        const escort = boss.name === 'broodmother_zagg' 
          ? this.options.mode === 'raid' ? 60 : 30 // 레이드는 60마리, 일반은 30마리
          : 2;
        const escortName = boss.name === 'broodmother_zagg' ? 'shadow_swarmer' : 'skeleton_minion';
        const escortDisplay = boss.name === 'broodmother_zagg' ? '그림자 벌레' : '해골 하수인';
        const escortDisplayKey = boss.name === 'broodmother_zagg' ? 'game.bosses.broodmother_zagg.escort' : undefined;
        
        for (let i = 0; i < escort; i++) {
          const offsetX = 40 + Math.random() * 100;
          const offsetY = (Math.random() - 0.5) * 200;
          this.state.monsters.push({
            id: this.state.nextMonsterId++,
            name: escortName,
            displayName: escortDisplay,
            displayNameKey: escortDisplayKey,
            monsterType: 'normal',
            maxHp: boss.name === 'broodmother_zagg' ? 1500 : 200,
            hp: boss.name === 'broodmother_zagg' ? 1500 : 200,
            atk: boss.name === 'broodmother_zagg' ? 150 : 20,
            def: 5,
            speed: boss.name === 'broodmother_zagg' ? 2.5 : 3.0,
            isRanged: false,
            position: { x: boss.position.x + offsetX, y: boss.position.y + offsetY },
            isAlive: true,
            aggroTable: {},
            targetId: null,
            targetType: null,
            isSlowed: false,
            slowTimer: 0,
            isStunned: false,
            stunTimer: 0,
            attackCooldown: 1.0,
            attackTimer: 0,
            affixCooldown: 0,
            affixTimer: 0,
            isEnraged: false,
            color: boss.name === 'broodmother_zagg' ? '#064E3B' : '#9CA3AF',
            size: boss.name === 'broodmother_zagg' ? 12 : 24, // 벌레는 작게 소환
          });
        }
        this.addBossLog(`${boss.displayName} 군단 소환! ${escort}마리의 ${escortDisplay} 등장!`);
        break;
      }
      case 'enrage':
      default:
        break;
    }
  }

  public addBossLog(msg: string) {
    this.state.bossAbilityLog.push(msg);
    if (this.state.bossAbilityLog.length > 5) {
      this.state.bossAbilityLog.shift();
    }
  }

  // ────────────────────────────────────────────────
  // 투사체 이동 + 명중 처리
  // ────────────────────────────────────────────────
  private updateProjectiles(dt: number) {
    const toRemove: number[] = [];

    for (const proj of this.state.projectiles) {
      // ── 메카닉 벽 수리 오브: 영웅 → 벽 힐 ──
      if (proj.isHeal && proj.targetType === 'wall' && proj.wallTarget) {
        const wallTarget = proj.wallTarget;
        const targetWallObj = this.getWallByTargetId(proj.targetId ?? -1);
        if (!targetWallObj) {
          toRemove.push(proj.id);
          continue;
        }

        const dist = this.distance(proj.position, wallTarget);
        const move = proj.speed * 60 * dt;
        if (dist <= move + 5) {
          const healAmount = proj.healAmount ?? 0;
          const prevHp = targetWallObj.hp;
          targetWallObj.hp = Math.min(targetWallObj.maxHp, targetWallObj.hp + healAmount);
          const actual = targetWallObj.hp - prevHp;
          if (actual > 0) {
            this.addDamageNumber(wallTarget.x, wallTarget.y - 25, actual, '#22C55E', true);
            this.state.healingFlashes.push({ x: wallTarget.x, y: wallTarget.y - 20, timer: 0.4, color: '#22C55E' });
            if (proj.heroId !== undefined) this.addMeterHeal(proj.heroId, actual);
          }
          toRemove.push(proj.id);
        } else {
          proj.position.x += ((wallTarget.x - proj.position.x) / dist) * move;
          proj.position.y += ((wallTarget.y - proj.position.y) / dist) * move;
        }
        continue;
      }

      // ── 적 힐 오브: 몬스터 → 몬스터 힐 (오펜스 수비대 힐러) ──
      if (proj.isHeal && proj.targetType === 'monster') {
        const healTarget = this.state.monsters.find(m => m.id === proj.targetId && m.isAlive);
        if (!healTarget) { toRemove.push(proj.id); continue; }
        const dist = this.distance(proj.position, healTarget.position);
        const move = proj.speed * 60 * dt;
        if (dist <= move + 5) {
          const healAmount = proj.healAmount || 0;
          healTarget.hp = Math.min(healTarget.maxHp, healTarget.hp + healAmount);
          this.addDamageNumber(healTarget.position.x, healTarget.position.y - 20, healAmount, '#22C55E', true);
          toRemove.push(proj.id);
        } else {
          proj.position.x += ((healTarget.position.x - proj.position.x) / dist) * move;
          proj.position.y += ((healTarget.position.y - proj.position.y) / dist) * move;
        }
        continue;
      }

      // ── 몬스터 공격 투사체: 몬스터 → 영웅 또는 소환수 (방어 모드 원거리 + 오펜스 수비대) ──
      if (proj.monsterId !== undefined && (proj.targetType === 'hero' || proj.targetType === 'summon')) {
        const target = proj.targetType === 'hero'
          ? this.state.heroes.find(h => h.id === proj.targetId && h.isAlive)
          : this.state.summons.find(s => s.id === proj.targetId && s.isAlive);
        if (!target) { toRemove.push(proj.id); continue; }
        const dist = this.distance(proj.position, target.position);
        const move = proj.speed * 60 * dt;
        if (dist <= move + 5) {
          // 뇌전 방어막: 영웅 대상 투사체 차단 확률
          if (proj.targetType === 'hero') {
            const blockChance = this.state.walls.at(-1)!.talents?.projectileBlockPct || 0;
            if (blockChance > 0 && Math.random() < blockChance) {
              this.addDamageNumber(proj.position.x, proj.position.y - 10, 0, '#EAB308', true);
              toRemove.push(proj.id);
              continue;
            }
          }
          const dmg = proj.damage;
          target.hp -= dmg;
          this.addDamageNumber(target.position.x, target.position.y - 20, dmg, proj.color);
          if (proj.targetType === 'hero') {
            const hero = target as GameHero;
            this.addMeterDamageTaken(hero.id, dmg);
            if (hero.isInvincible && hero.hp <= 0) {
              hero.hp = 1;
              this.addDamageNumber(hero.position.x, hero.position.y - 40, 0, '#FFD700', true);
            } else if (hero.hp <= 0) {
              if (!this.tryReviveHero(hero)) { hero.hp = 0; hero.isAlive = false; this.checkGameOver(); }
            }
          } else if (target.hp <= 0) {
            target.hp = 0;
            target.isAlive = false;
          }
          toRemove.push(proj.id);
        } else {
          proj.position.x += ((target.position.x - proj.position.x) / dist) * move;
          proj.position.y += ((target.position.y - proj.position.y) / dist) * move;
        }
        continue;
      }

      // ── 벽 공격 투사체: 방어 모드 원거리 몬스터 → 벽 ──
      if (proj.targetType === 'wall' && proj.wallTarget) {
        const wallTarget = proj.wallTarget;
        const dist = this.distance(proj.position, wallTarget);
        const move = proj.speed * 60 * dt;
        if (dist <= move + 5) {
          // targetId에 따라 올바른 벽 오브젝트 선택 (-3=3벽, -2=2벽, -1=1벽)
          const hitWall = this.getWallByTargetId(proj.targetId ?? -1);
          if (!hitWall) { toRemove.push(proj.id); continue; }
          let dmg = proj.damage;
          // 불굴의 방어선: HP 20% 이하 시 피해 감소
          const lowHpBonus = hitWall.talents?.lowHpDefBonus || 0;
          if (lowHpBonus > 0 && hitWall.hp / hitWall.maxHp <= 0.2) {
            dmg = Math.max(1, Math.round(dmg * (1 - lowHpBonus)));
          }
          hitWall.hp = Math.max(0, hitWall.hp - dmg);
          this.addDamageNumber(wallTarget.x, wallTarget.y - 30, dmg, '#EF4444');
          this.addWallMeterDamageTaken(dmg);
          // 반사 피해
          const reflectPct = hitWall.talents?.reflectPct || 0;
          if (reflectPct > 0) {
            const attacker = this.state.monsters.find(m => m.id === proj.monsterId && m.isAlive);
            if (attacker) {
              const reflectDmg = Math.round(dmg * reflectPct);
              if (reflectDmg > 0) {
                attacker.hp -= reflectDmg;
                this.addDamageNumber(attacker.position.x, attacker.position.y - 15, reflectDmg, '#A855F7');
                this.addWallMeterDamage(reflectDmg);
                if (attacker.hp <= 0) {
                  attacker.hp = 0;
                  attacker.isAlive = false;
                  this.addScore(getMonsterScore(attacker, 1));
                  this.addGold(5);
                }
              }
            }
          }
          // 번개 반격
          const attacker = this.state.monsters.find(m => m.id === proj.monsterId && m.isAlive);
          if (attacker) this.applyLightningReflect(attacker);
          if (hitWall.hp <= 0) {
            this.spawnExplosion(wallTarget.x, wallTarget.y, '#8B5CF6', 80);
          }
          toRemove.push(proj.id);
        } else {
          proj.position.x += ((wallTarget.x - proj.position.x) / dist) * move;
          proj.position.y += ((wallTarget.y - proj.position.y) / dist) * move;
        }
        continue;
      }

      // 힐 오브: 타겟이 영웅 또는 소환수
      if (proj.isHeal) {
        const healTarget = proj.targetType === 'hero'
          ? this.state.heroes.find(h => h.id === proj.targetId && h.isAlive)
          : this.state.summons.find(s => s.id === proj.targetId && s.isAlive);

        if (!healTarget) { toRemove.push(proj.id); continue; }

        const dist = this.distance(proj.position, healTarget.position);
        const move = proj.speed * 60 * dt;

        if (dist <= move + 5) {
          // 명중 - 힐 적용
          const healAmount = proj.healAmount || 0;
          healTarget.hp = Math.min(healTarget.maxHp, healTarget.hp + healAmount);
          this.addDamageNumber(healTarget.position.x, healTarget.position.y - 20, healAmount, '#22C55E', true);

          // 힐 위협: 힐량만큼 모든 살아있는 몬스터에 위협 생성
          if (healAmount > 0) {
            const healer = this.state.heroes.find(h => h.id === proj.heroId);
            if (healer) {
              for (const m of this.state.monsters.filter(m => m.isAlive)) {
                this.addThreat(healer, m, healAmount, 'hero');
              }
              this.addMeterHeal(healer.id, healAmount);
            }
          }
          toRemove.push(proj.id);
        } else {
          proj.position.x += ((healTarget.position.x - proj.position.x) / dist) * move;
          proj.position.y += ((healTarget.position.y - proj.position.y) / dist) * move;
        }
        continue;
      }

      // 공격 투사체: 타겟이 몬스터
      const monster = this.state.monsters.find(m => m.id === proj.targetId && m.isAlive);
      if (!monster) { toRemove.push(proj.id); continue; }

      const dist = this.distance(proj.position, monster.position);
      const move = proj.speed * 60 * dt;

      if (dist <= move + 5) {
        // 명중 - 비전 증폭 + 데미지 적용
        const arcaneAmp = this.state.walls.at(-1)!.talents?.arcaneAmpPct || 0;
        let finalDmg = arcaneAmp > 0 && proj.heroId
          ? Math.round(proj.damage * (1 + arcaneAmp / 100))
          : proj.damage;

        // ── 쌍둥이 보스 취약점 체크 ──
        if (monster.vulnerability) {
          let attackerRole: string | undefined;
          if (proj.heroId) {
            attackerRole = this.state.heroes.find(h => h.id === proj.heroId)?.role;
          } else if (proj.summonId) {
            attackerRole = this.state.summons.find(s => s.id === proj.summonId)?.role;
          }
          if (attackerRole) {
            const isMeleeRole = attackerRole === 'melee_dps' || attackerRole === 'tank';
            const isRangedRole = attackerRole === 'ranged_dps' || attackerRole === 'cc' || attackerRole === 'healer';
            if (monster.vulnerability === 'melee' && !isMeleeRole) finalDmg = 0;
            if (monster.vulnerability === 'ranged' && !isRangedRole) finalDmg = 0;
          }
        }

        // ── 가르두 소환수 전용 취약점 체크 ──
        if (monster.onlyVulnerableToSummons && proj.heroId !== undefined) {
          finalDmg = 0; // 영웅이 쏜 투사체는 피해 0
        }

        // ── 철갑 피부: 투사체도 1 데미지 고정 ──
        if (monster.ironSkin && finalDmg > 0) finalDmg = 1;
        monster.hp -= finalDmg;
        if (finalDmg > 0) {
          this.addDamageNumber(monster.position.x, monster.position.y - 15, finalDmg, proj.color);
        }

        // ── 원거리 영웅 명중 시 패시브 효과 (Splash, Shadow dmg 등) ──
        if (proj.heroId) {
          const hero = this.state.heroes.find(h => h.id === proj.heroId && h.isAlive);
          if (hero) {
            const skills = hero.equippedSkillIds ?? [];
            // 에이나 공허 파열 (Splash)
            if (this.hasSkill(skills, 'unique_aeina_void') && Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
              const splashDmg = Math.round(finalDmg * 0.5);
              const radius = 100;
              const inRange = this.state.monsters.filter(m => m.isAlive && m.id !== monster.id && this.distance(monster.position, m.position) <= radius);
              for (const m of inRange) {
                m.hp -= splashDmg;
                this.addDamageNumber(m.position.x, m.position.y - 15, splashDmg, '#7c3aed');
                this.addMeterDamage(hero.id, null, splashDmg);
              }
              this.spawnExplosion(monster.position.x, monster.position.y, '#7c3aed', radius);
            }
            // 칼리샨 공허 화살 (Shadow dmg)
            if (this.hasSkill(skills, 'unique_kalishan_marksmanship') && Math.random() < (hero.uniqueSkillValue ?? 20) / 100) {
              const shadowDmg = Math.round(hero.atk * 1.5);
              monster.hp -= shadowDmg;
              this.addDamageNumber(monster.position.x, monster.position.y - 25, shadowDmg, '#4c1d95');
              this.addMeterDamage(hero.id, null, shadowDmg);
            }
          }
        }

        // 투사체 위협 생성 + 미터 기록
        if (proj.heroId) {
          const attacker = this.state.heroes.find(h => h.id === proj.heroId);
          if (attacker) {
            this.addThreat(attacker, monster, finalDmg, 'hero');
            this.addMeterDamage(attacker.id, null, finalDmg);
          }
        } else if (proj.summonId) {
          const summon = this.state.summons.find(s => s.id === proj.summonId);
          if (summon) {
            this.addThreat(summon, monster, finalDmg, 'summon');
            this.addMeterDamage(summon.summonerId, summon.skillId, finalDmg);
          }
        }

        // 냉기: 슬로우 적용 (CC 면역 보스 제외)
        if (proj.type === 'frostbolt' && proj.slowDuration && !monster.immuneToCc) {
          monster.isSlowed = true;
          monster.slowTimer = Math.max(monster.slowTimer, proj.slowDuration);
        }

        if (monster.hp <= 0) {
          monster.hp = 0;
          monster.isAlive = false;
          this.addScore(getMonsterScore(monster, 1));
          this.addGold(getMonsterGold(monster, 1));
          this.applyThirdWallOnKill(monster);
        }
        toRemove.push(proj.id);
      } else {
        // 투사체 이동
        proj.position.x += ((monster.position.x - proj.position.x) / dist) * move;
        proj.position.y += ((monster.position.y - proj.position.y) / dist) * move;
      }
    }

    this.state.projectiles = this.state.projectiles.filter(p => !toRemove.includes(p.id));
  }

  public spawnProjectile(
    hero: GameHero,
    targetId: number,
    type: ProjectileType,
    damage: number,
    slowDurationOrColor?: number | string,
    colorOverride?: string,
  ) {
    const slowDuration = typeof slowDurationOrColor === 'number' ? slowDurationOrColor : undefined;
    const colorArg = typeof slowDurationOrColor === 'string' ? slowDurationOrColor : colorOverride;
    const colors: Record<ProjectileType, string> = {
      fireball: '#FF6B1A',
      frostbolt: '#67E8F9',
      heal_orb: '#22C55E',
      shadow_bolt: '#A855F7',
    };
    const speeds: Record<ProjectileType, number> = {
      fireball: 6,
      frostbolt: 5,
      heal_orb: 4,
      shadow_bolt: 5.5,
    };
    this.state.projectiles.push({
      id: this.state.nextProjectileId++,
      heroId: hero.id,
      targetId,
      targetType: 'monster',
      position: { x: hero.position.x, y: hero.position.y },
      damage,
      speed: speeds[type],
      type,
      color: colorArg ?? colors[type],
      size: type === 'fireball' ? 8 : type === 'frostbolt' ? 7 : 9,
      slowDuration,
    });
  }

  /** 원거리 소환수(메카닉 포탑 등) → 적 벽 투사체 발사 (offense 모드) */
  public spawnSummonWallProjectile(summon: GameSummon): void {
    const wall = this.state.walls.at(-1)!;
    const wallPos = wall.position;
    const dmg = Math.max(1, Math.round(summon.atk * 0.5));
    this.state.projectiles.push({
      id: this.state.nextProjectileId++,
      summonId: summon.id,
      targetId: this.getWallTargetId(wall),
      targetType: 'wall',
      wallTarget: { x: wallPos.x, y: wallPos.y },
      position: { x: summon.position.x, y: summon.position.y },
      damage: dmg,
      speed: 7.0,
      type: 'shadow_bolt',
      color: summon.color,
      size: 8,
    });
  }

  public spawnSummonProjectile(
    summon: GameSummon,
    targetId: number,
    damage: number,
  ) {
    this.state.projectiles.push({
      id: this.state.nextProjectileId++,
      summonId: summon.id,
      targetId,
      targetType: 'monster',
      position: { x: summon.position.x, y: summon.position.y },
      damage,
      speed: 5.5,
      type: 'shadow_bolt',
      color: '#A855F7',
      size: 6,
    });
  }

  /** 오펜스 수비대 원딜/CC → 아군 영웅으로 적 투사체 발사 */
  private spawnEnemyProjectile(monster: GameMonster, targetId: number, damage: number) {
    const isCC = monster.defenderRole === 'cc';
    this.state.projectiles.push({
      id: this.state.nextProjectileId++,
      monsterId: monster.id,
      targetId,
      targetType: 'hero',
      position: { x: monster.position.x, y: monster.position.y },
      damage,
      speed: 4.5,
      type: isCC ? 'frostbolt' : 'fireball',
      color: isCC ? '#67E8F9' : '#FF6B1A',
      size: 7,
    });
  }

  /** 방어 모드 원거리 몬스터 → 영웅 또는 소환수로 투사체 발사 */
  private spawnMonsterProjectile(monster: GameMonster, target: GameHero | GameSummon, damage: number, targetType: 'hero' | 'summon') {
    const n = monster.name;
    let type: ProjectileType;
    if (n.includes('fire') || n.includes('magma') || n.includes('lava') || n.includes('goblin') || n.includes('orc') || n.includes('troll') || n.includes('rock') || n.includes('poison') || n.includes('venom') || n.includes('plague')) {
      type = 'fireball';
    } else if (n.includes('ice') || n.includes('frost') || n.includes('crystal') || n.includes('bone') || n.includes('wind')) {
      type = 'frostbolt';
    } else {
      type = 'shadow_bolt';
    }
    this.state.projectiles.push({
      id: this.state.nextProjectileId++,
      monsterId: monster.id,
      targetId: target.id,
      targetType,
      position: { x: monster.position.x, y: monster.position.y },
      damage,
      speed: 5.5,
      type,
      color: type === 'fireball' ? '#FF6B1A' : type === 'frostbolt' ? '#67E8F9' : '#A855F7',
      size: 6,
    });
  }

  /** 오펜스 힐러 수비대 → 부상 몬스터로 heal_orb 발사 */
  private spawnEnemyHealOrb(healer: GameMonster, targetId: number, healAmount: number) {
    this.state.projectiles.push({
      id: this.state.nextProjectileId++,
      monsterId: healer.id,
      targetId,
      targetType: 'monster',
      position: { x: healer.position.x, y: healer.position.y },
      damage: 0,
      speed: 4,
      type: 'heal_orb',
      color: '#22C55E',
      size: 9,
      isHeal: true,
      healAmount,
    });
  }
  // 공유 스킬 중복 장착 카운트 헬퍼 (compound key routeId__skillId 지원)
  private countSkill(equippedSkillIds: string[] | undefined, baseSkillId: string): number {
    if (!equippedSkillIds) return 0;
    return equippedSkillIds.filter(k => k === baseSkillId || k.endsWith('__' + baseSkillId)).length;
  }

  public hasSkill(equippedSkillIds: string[] | undefined, baseSkillId: string): boolean {
    if (!equippedSkillIds) return false;
    return equippedSkillIds.some(k => k === baseSkillId || k.endsWith('__' + baseSkillId));
  }

  public hasSkillPrefix(equippedSkillIds: string[] | undefined, prefix: string): boolean {
    if (!equippedSkillIds) return false;
    return equippedSkillIds.some(k => k.startsWith(prefix) || k.includes('__' + prefix));
  }

  // 스킬 기본 쿨타임 (초)
  

  public processHeroSkills(hero: GameHero, dt: number, validTargets: GameMonster[]) {
    processHeroSkillsExtracted(this, hero, dt, validTargets);
  }

  private updateHeroes(dt: number) {
    const talents = this.state.walls.at(-1)!.talents;
    const actualDt = dt * (1 + (talents.timeCooldownReduction || 0) / 100);

    const synergies = this.state.synergies;
    const ccMult = synergies.reduce((acc, s) => s.bonuses.ccDurationMult ? acc * s.bonuses.ccDurationMult : acc, 1.0);
    const lifestealMult = synergies.reduce((acc, s) => s.bonuses.lifestealMult ? acc + s.bonuses.lifestealMult : acc, 0);
    const execThreshold = 0.20 + synergies.reduce((acc, s) => s.bonuses.executeThresholdBonus ? acc + s.bonuses.executeThresholdBonus : acc, 0);
    const healMult = synergies.reduce((acc, s) => s.bonuses.healMult ? acc * s.bonuses.healMult : acc, 1.0);

    // ── 노스훼라투 보호 루트: 신성한 대지 (10초 쿨, 8초 지속 오라) ──
    if (this.isAuraTick) {
      for (const h of this.state.heroes.filter(h => h.isAlive && this.hasSkill(h.equippedSkillIds, 'nost_prot_holy_ground'))) {
        const timer = h.skillTimers?.['nost_prot_holy_ground'] ?? 0;
        const cooldown = SKILL_COOLDOWNS['nost_prot_holy_ground'] || 10;
        const auraDuration = 8;
        if (timer > cooldown - auraDuration) {
          const auraRadius = 150;
          const allies = this.state.heroes.filter(a => a.isAlive && this.distance(h.position, a.position) <= auraRadius);
          for (const a of allies) {
            const healAmt = Math.round(a.maxHp * 0.02 * healMult);
            this.applyDirectHeal(h, a, healAmt, 'hero', '#fbbf24', false);
          }
        }
      }
    }

    // ── 울트리온 증강: 강화의 정수 (unique_ultrion_augmentation) 오라 체크 ──
    const augSources = this.state.heroes.filter(h => h.isAlive && this.hasSkill(h.equippedSkillIds, 'unique_ultrion_augmentation'));

    const aliveMonsters = this.state.monsters.filter(m => m.isAlive);

    for (const hero of this.state.heroes) {
      if (!hero.isAlive) continue;

      // 증강 오라 적용 여부 확인
      let augSpeedBonus = 0;
      for (const src of augSources) {
        if (hero.id !== src.id && this.distance(hero.position, src.position) <= 250) {
          augSpeedBonus = Math.max(augSpeedBonus, (src.uniqueSkillValue ?? 15) / 100);
        }
      }
      let heroDt = actualDt * (1 + augSpeedBonus);

      // ── 광전사 (unique_zuljin_combat): 저체력 시 공격속도 {value}% 증가 ──
      if (this.hasSkill(hero.equippedSkillIds, 'unique_zuljin_combat')) {
        const hpPct = hero.hp / hero.maxHp;
        if (hpPct < 0.5) {
          const speedInc = (hero.uniqueSkillValue ?? 20) / 100;
          heroDt *= (1 + speedInc);
        }
      }

      // ── 피해 감소 타이머 (spirit_link 등) ──
      if (hero.dmgReduceTimer && hero.dmgReduceTimer > 0) {
        hero.dmgReduceTimer -= actualDt;
        if (hero.dmgReduceTimer <= 0) { hero.dmgReducePct = 0; hero.dmgReduceTimer = 0; }
      }

      // ── 보조 힐 역할 (secondaryRole: 'healer') — 즉시 자동 힐 (생명석 등) ──
      if (hero.secondaryRole === 'healer' && typeof hero.healTimer === 'number') {
        hero.healTimer -= actualDt;
        if (hero.healTimer <= 0) {
          const cooldown = hero.healCooldown ?? 4.0;
          
          // 영웅 + 소환수 중 부상자 검색 (75% 이하)
          const injuredHeroes = this.state.heroes
            .filter(h => h.isAlive && h.hp / h.maxHp < 0.75)
            .map(h => ({ target: h, type: 'hero' as const, ratio: h.hp / h.maxHp }));
          const injuredSummons = this.state.summons
            .filter(s => s.isAlive && s.hp / s.maxHp < 0.75)
            .map(s => ({ target: s, type: 'summon' as const, ratio: s.hp / s.maxHp }));
          
          const allInjured = [...injuredHeroes, ...injuredSummons]
            .sort((a, b) => a.ratio - b.ratio);

          if (allInjured.length > 0) {
            const { target, type } = allInjured[0];
            // 생명석: ATK × 2.0 회복 (즉시 적용)
            const healAmount = Math.round(hero.atk * 2.0 * healMult);
            
            // 즉시 힐 및 녹색 이펙트 적용
            this.applyDirectHeal(hero, target, healAmount, type, '#22C55E', true);
            
            hero.healTimer = cooldown;
          } else {
            hero.healTimer = 1.0; 
          }
        }
      }

      // ── Offense 모드: 은신 수비대는 벽 파괴 전 타겟 불가 ──
      const validOffenseTargets = this.options.mode === 'offense'
        ? aliveMonsters.filter(m => !m.hidesBehindWall || this.state.walls.at(-1)!.hp <= 0)
        : aliveMonsters;

      this.processHeroSkills(hero, heroDt, validOffenseTargets);

      // ── Offense 모드: 유효 수비대 전멸 시 적 벽 공격 ──
      if (this.options.mode === 'offense' && validOffenseTargets.length === 0 && this.state.walls.at(-1)!.hp > 0) {
        hero.attackTimer -= heroDt;
        this.heroAttackEnemyWall(hero, heroDt);
        continue;
      }

      // 탱커·근딜: 이동이 있으므로 매 프레임 처리 (attackTimer는 내부에서 관리)
      if (hero.role === 'tank' || hero.role === 'melee_dps') {
        hero.attackTimer -= heroDt;
        if (validOffenseTargets.length > 0) {
          if (hero.role === 'tank') this.tankAction(hero, validOffenseTargets, heroDt);
          else this.meleeDpsAction(hero, validOffenseTargets, lifestealMult, execThreshold, heroDt);
        }
        continue;
      }

      // 메카닉: 벽 수리 + 포탑 소환 AI (독립 healTimer, turretRespawnTimer 사용)
      if (hero.role === 'mechanic') {
        hero.attackTimer -= heroDt;
        if (hero.healTimer === undefined) hero.healTimer = 0;
        hero.healTimer -= heroDt;
        hero.turretRespawnTimer = Math.max(0, (hero.turretRespawnTimer ?? 0) - heroDt);
        this.mechanicAction(hero, validOffenseTargets);
        continue;
      }

      hero.attackTimer -= heroDt;
      if (hero.attackTimer > 0) continue;
      if (validOffenseTargets.length === 0) continue;

      switch (hero.role) {
        case 'healer':
          this.healerAction(hero, healMult);
          break;
        case 'cc':
          this.ccAction(hero, validOffenseTargets, ccMult);
          break;
        case 'ranged_dps':
          this.dpsAction(hero, validOffenseTargets, lifestealMult, execThreshold, heroDt);
          break;
      }
    }
  }

  /**
   * 탱커 행동 AI
   * Phase 1 - 어그로 수집: 자신이 위협 1위가 아닌 몬스터에게 접근해 공격
   * Phase 2 - 딜링존 집결: 모든 어그로 획득 후 중앙(FIELD_Y_CENTER)으로 이동,
   *           몬스터들을 딜러들이 공격하기 좋은 위치로 끌어옴
   */
  private tankAction(hero: GameHero, monsters: GameMonster[], dt: number) {
    // 0순위: 취약점이 melee인 몬스터 (쌍둥이 보스 등) — 탱커가 반드시 마크해야 함
    const vulnerableMelee = monsters.filter(m => m.isAlive && m.vulnerability === 'melee');
    
    // 아직 탱커가 어그로 1위가 아닌 살아있는 몬스터 목록
    const notAggrod = monsters.filter(m => {
      const top = this.getTopThreatTarget(m);
      return !top || top.type !== 'hero' || top.id !== hero.id;
    });

    if (vulnerableMelee.length > 0 || notAggrod.length > 0) {
      // === Phase 1: 어그로 수집 ===
      let moveTarget: GameMonster | null = null;
      
      if (vulnerableMelee.length > 0) {
        // 취약점 보스 우선 마킹
        moveTarget = vulnerableMelee.sort((a, b) => this.distance(hero.position, a.position) - this.distance(hero.position, b.position))[0];
      } else {
        // 기존: 왼쪽 탈출 몬스터 우선 추격
        const leftEscaped = monsters.filter(m => m.position.x < hero.position.x - hero.attackRange);
        moveTarget = leftEscaped.length > 0
          ? this.findClosestMonster(hero, leftEscaped)
          : this.findClosestMonster(hero, notAggrod);
      }
      if (!moveTarget) return;

      const dist = this.distance(hero.position, moveTarget.position);
      if (dist > hero.attackRange + 40) {
        const moveAmount = hero.speed * 60 * dt;
        const dx = moveTarget.position.x - hero.position.x;
        const dy = moveTarget.position.y - hero.position.y;
        hero.position.x += (dx / dist) * Math.min(moveAmount, dist - hero.attackRange * 0.8);
        hero.position.y += (dy / dist) * Math.min(moveAmount, dist - hero.attackRange * 0.8);
      }

      // 공격 타이머 완료 시: aggroRadius 광역 or 단타
      if (hero.attackTimer <= 0) {
        const inRange = monsters.filter(m =>
          this.distance(hero.position, m.position) <= hero.aggroRadius
        );
        if (inRange.length > 0) {
          for (const t of inRange) this.dealDamage(hero, t, 0, 0.20);
          hero.attackTimer = hero.attackCooldown;
        } else if (dist <= hero.attackRange + 50) {
          this.dealDamage(hero, moveTarget, 0, 0.20);
          hero.attackTimer = hero.attackCooldown;
        }
      }
    } else {
      // === Phase 2: 어그로 유지 — 가장 가까운 몬스터로 이동하며 공격 ===
      const closest2 = this.findClosestMonster(hero, monsters);
      if (!closest2) return;

      const dist2 = this.distance(hero.position, closest2.position);
      if (dist2 > hero.attackRange + 40) {
        const moveAmount = hero.speed * 60 * dt;
        const dx2 = closest2.position.x - hero.position.x;
        const dy2 = closest2.position.y - hero.position.y;
        hero.position.x += (dx2 / dist2) * Math.min(moveAmount, dist2 - hero.attackRange * 0.8);
        hero.position.y += (dy2 / dist2) * Math.min(moveAmount, dist2 - hero.attackRange * 0.8);
      }

      if (hero.attackTimer <= 0) {
        const inRange = monsters.filter(m =>
          this.distance(hero.position, m.position) <= hero.aggroRadius
        );
        if (inRange.length > 0) {
          for (const t of inRange) this.dealDamage(hero, t, 0, 0.20);
          hero.attackTimer = hero.attackCooldown;
        } else if (dist2 <= hero.attackRange + 50) {
          this.dealDamage(hero, closest2, 0, 0.20);
          hero.attackTimer = hero.attackCooldown;
        }
      }
    }
  }

  private healerAction(hero: GameHero, healMult: number) {
    const heroes = this.state.heroes.filter(h => h.isAlive);
    const summons = this.state.summons.filter(s => s.isAlive);
    const allAllies = [...heroes.map(h => ({t: h, type: 'hero' as const})), ...summons.map(s => ({t: s, type: 'summon' as const}))];
    const spec = hero.specName;

    // 항상 타겟 선정: HP% 낮은 순 정렬 → 주 타겟은 가장 낮은 아군
    const allSorted = [...allAllies].sort((a, b) => (a.t.hp / a.t.maxHp) - (b.t.hp / b.t.maxHp));
    const mainTarget = allSorted[0];
    if (!mainTarget) { hero.attackTimer = hero.attackCooldown; return; }

    const isDiscipline = hero.activeSpecNames?.some(s => s.includes('수양')) || hero.specName.includes('수양');

    // ── 수양사제: 보호막 + 직접 힐 병행 ──────────────────────────────
    if (isDiscipline) {
      const hasBarrier   = this.hasSkill(hero.equippedSkillIds, 'iyena_barrier') ?? false;
      const hasBigShield = (this.hasSkill(hero.equippedSkillIds, 'dizgar_holy_shield') ?? false)
                        || (this.hasSkill(hero.equippedSkillIds, 'iyena_power_word_shield') ?? false);
      const baseShield = Math.round(hero.atk * 5 * healMult);
      const shieldAmt  = hasBigShield ? Math.round(baseShield * 1.4) : baseShield;

      if (hasBarrier) {
        allAllies.forEach(a => {
          this.applyShield(a.t, Math.round(shieldAmt * 0.5), a.type, 10, hero.id);
          this.state.healingFlashes.push({ x: a.t.position.x, y: a.t.position.y, timer: 0.3, color: '#fbbf24' });
        });
      } else {
        const shieldTargets = allSorted.slice(0, hasBigShield ? 1 : 2);
        shieldTargets.forEach(st => {
          this.applyShield(st.t, shieldAmt, st.type, 12, hero.id);
          this.state.healingFlashes.push({ x: st.t.position.x, y: st.t.position.y, timer: 0.4, color: '#FBBF24' });
        });
      }

      // 항상 가장 낮은 아군 직접 힐 (방어막만으로는 잃은 HP가 안 차오름)
      const healAmt = mainTarget.t.hp / mainTarget.t.maxHp < 0.4
        ? Math.round(hero.atk * 3.5 * healMult)   // 위급 강힐
        : Math.round(hero.atk * 1.5 * healMult);  // 평상시 소힐
      this.applyDirectHeal(hero, mainTarget.t, healAmt, mainTarget.type, '#fde68a');

    // ── 성기사: 단일 집중힐 + 부상자 보조힐 ─────────────────────────
    } else if (spec.includes('기사') || spec.includes('성기사')) {
      const healAmt = Math.round(hero.atk * 4.5 * healMult);
      this.applyDirectHeal(hero, mainTarget.t, healAmt, mainTarget.type, '#fbbf24');

      // 노스훼라투 신성 루트: 빛의 봉화 (nost_holy_beacon_1, nost_holy_beacon_2)
      const hasBeacon1 = this.hasSkill(hero.equippedSkillIds, 'nost_holy_beacon_1');
      const hasBeacon2 = this.hasSkill(hero.equippedSkillIds, 'nost_holy_beacon_2');

      if (hasBeacon1 || hasBeacon2) {
        // 봉화 1개면 +1명(총 2명), 봉화 2개면 +2명(총 3명) 동시 힐
        const extraCount = (hasBeacon1 ? 1 : 0) + (hasBeacon2 ? 1 : 0);
        allSorted.slice(1, 1 + extraCount).forEach(st => {
          this.applyDirectHeal(hero, st.t, healAmt, st.type, '#fbbf24', true);
        });
        
        // 기존 부상자 보조힐은 봉화 대상 제외하고 적용
        allSorted.slice(1 + extraCount, 3 + extraCount).filter(a => a.t.hp < a.t.maxHp).forEach(st => {
          this.applyDirectHeal(hero, st.t, Math.round(healAmt * 0.4), st.type, '#fef3c7', false);
        });
      } else {
        // 기존 부상자 보조힐
        allSorted.slice(1, 3).filter(a => a.t.hp < a.t.maxHp).forEach(st => {
          this.applyDirectHeal(hero, st.t, Math.round(healAmt * 0.4), st.type, '#fef3c7', false);
        });
      }

      if (this.hasSkill(hero.equippedSkillIds, 'yesh_sacred_shield')) {
        this.applyShield(mainTarget.t, Math.round(mainTarget.t.maxHp * 0.15), mainTarget.type, 8, hero.id);
        this.state.healingFlashes.push({ x: mainTarget.t.position.x, y: mainTarget.t.position.y, timer: 0.3, color: '#FBBF24' });
      }

    // ── 드루이드 (헬른/하뮬): 직접힐 + HoT 다중 적용 ────────────
    } else if (spec.includes('드루이드') || this.hasSkillPrefix(hero.equippedSkillIds, 'hamul_')) {
      // 자연의 우기 / 생명의 나무: HoT 효과 {value}% 강화
      const hotMult = (this.hasSkill(hero.equippedSkillIds, 'unique_heln_restoration') || this.hasSkill(hero.equippedSkillIds, 'unique_hamul_restoration'))
        ? 1 + (hero.uniqueSkillValue ?? 20) / 100 : 1.0;
      this.applyDirectHeal(hero, mainTarget.t, Math.round(hero.atk * 1.5 * healMult), mainTarget.type, '#4ade80');
      // 주 타겟 강 HoT
      this.applyHoT(mainTarget.t, Math.round(hero.atk * 0.8 * healMult * hotMult), 6, mainTarget.type, '#22c55e');
      // HP 낮은 순 2~3명 약 HoT
      allSorted.slice(1, 3).forEach(a => {
        this.applyHoT(a.t, Math.round(hero.atk * 0.3 * healMult * hotMult), 4, a.type, '#86efac');
      });

      if (this.hasSkill(hero.equippedSkillIds, 'heln_ironbark')) {
        this.applyShield(mainTarget.t, Math.round(hero.atk * 2.5 * healMult), mainTarget.type, 8, hero.id);
        this.state.healingFlashes.push({ x: mainTarget.t.position.x, y: mainTarget.t.position.y, timer: 0.3, color: '#FBBF24' });
      }

    // ── 천둥가람 복원술사: 직접힐 + 조류의 역류 전파 ────────────────────
    } else if (spec.includes('복원') && this.hasSkillPrefix(hero.equippedSkillIds, 'cheondung_')) {
      const healAmt = Math.round(hero.atk * 3.5 * healMult);
      this.applyDirectHeal(hero, mainTarget.t, healAmt, mainTarget.type, '#4ade80');
      // 부상자 2명 소힐
      allSorted.slice(1, 3).forEach(a => {
        this.applyDirectHeal(hero, a.t, Math.round(hero.atk * 1.0 * healMult), a.type, '#86efac', false);
      });
      // 조류의 역류 (unique_cheondung_restoration): {value}% 확률로 주변 소량 힐 전파
      if (this.hasSkill(hero.equippedSkillIds, 'unique_cheondung_restoration') && Math.random() < (hero.uniqueSkillValue ?? 20) / 100) {
        const spreadAmt = Math.round(hero.atk * 0.8 * healMult);
        allAllies.forEach(a => {
          if (a.t !== mainTarget.t) this.applyDirectHeal(hero, a.t, spreadAmt, a.type, '#22c55e', false);
        });
      }
      // 대지 방패 장착 시 주 타겟 HoT 추가
      if (this.hasSkill(hero.equippedSkillIds, 'cheondung_earth_shield')) {
        this.applyHoT(mainTarget.t, Math.round(hero.atk * 0.5 * healMult), 4, mainTarget.type, '#4ade80');
      }

    // ── 케른 회복: HoT + CD 스킬 기반 힐 ─────────────────────────────
    } else if (spec.includes('회복') && this.hasSkillPrefix(hero.equippedSkillIds, 'kaern_')) {
      // 자연의 우기: HoT 효과 {value}% 강화
      const hotMult = 1 + (hero.uniqueSkillValue ?? 15) / 100;
      // 주 타겟 강 HoT (회춘)
      const hotAmt = Math.round(hero.atk * 0.8 * healMult * hotMult);
      this.applyDirectHeal(hero, mainTarget.t, Math.round(hero.atk * 2.0 * healMult), mainTarget.type, '#4ade80');
      this.applyHoT(mainTarget.t, hotAmt, 6, mainTarget.type, '#22c55e');
      // 2~3명 약 HoT
      allSorted.slice(1, 3).forEach(a => {
        this.applyHoT(a.t, Math.round(hero.atk * 0.4 * healMult * hotMult), 4, a.type, '#86efac');
      });

    // ── 주술사: 연쇄 힐 (HP 낮은 순 최대 3인) ───────────────────────
    } else if (spec.includes('술사') || spec.includes('주술사')) {
      const initialHeal = Math.round(hero.atk * 3.5 * healMult);
      this.applyChainHeal(hero, allSorted.slice(0, 3), initialHeal, 3);

      // 회복의 물결 (unique_seori_restoration): {value}% 확률로 주변 아군 소량 힐 전파
      if (this.hasSkill(hero.equippedSkillIds, 'unique_seori_restoration') &&
          Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const spreadAmt = Math.round(hero.atk * 1.0 * healMult);
        allAllies.forEach(a => {
          if (a.t !== mainTarget.t) this.applyDirectHeal(hero, a.t, spreadAmt, a.type, '#06b6d4', false);
        });
      }

      if (Math.random() < 0.3) {
        this.applyShield(mainTarget.t, Math.round(hero.atk * 2), mainTarget.type, 8, hero.id);
      }

    // ── 디즈가르도 신성: 단일 강힐 + unique_dizgar_holy 전파 ────────
    } else if (spec.includes('신성') && this.hasSkillPrefix(hero.equippedSkillIds, 'dizgar_')) {
      const healAmt = Math.round(hero.atk * 4.0 * healMult);
      this.applyDirectHeal(hero, mainTarget.t, healAmt, mainTarget.type, '#fef08a');
      // unique_dizgar_holy: {value}% 확률로 전체 소량 힐 전파
      if (this.hasSkill(hero.equippedSkillIds, 'unique_dizgar_holy') && Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const spreadAmt = Math.round(hero.atk * 1.0 * healMult);
        allAllies.forEach(a => {
          if (a.t !== mainTarget.t) this.applyDirectHeal(hero, a.t, spreadAmt, a.type, '#fbbf24', false);
        });
      }

    // ── 기원사: 단일 힐 + 주변 적 피해 ─────────────────────────────
    } else if (spec.includes('기원사')) {
      this.applyDirectHeal(hero, mainTarget.t, Math.round(hero.atk * 2.5 * healMult), mainTarget.type, '#22d3ee');

      const nearbyEnemies = this.state.monsters.filter(m => m.isAlive && this.distance(hero.position, m.position) < 300);
      nearbyEnemies.forEach(m => {
        const dmg = Math.round(hero.atk * 1.2);
        m.hp -= dmg;
        this.addDamageNumber(m.position.x, m.position.y - 15, dmg, '#22d3ee');
      });

    // ── 베네딕트/벨렌 신성 사제: 단일 힐 + 부상자 보조힐 ──────────
    } else if ((this.hasSkillPrefix(hero.equippedSkillIds, 'benedict_') || this.hasSkillPrefix(hero.equippedSkillIds, 'velen_'))) {
      const uniqueMult = this.hasSkill(hero.equippedSkillIds, 'unique_benedict_holy')
        ? 1 + (hero.uniqueSkillValue ?? 10) / 100 : 1.0;
      const healAmt = Math.round(hero.atk * 3.5 * healMult * uniqueMult);
      this.applyDirectHeal(hero, mainTarget.t, healAmt, mainTarget.type, '#fde047');
      allSorted.slice(1, 3).filter(a => a.t.hp < a.t.maxHp).forEach(st => {
        this.applyDirectHeal(hero, st.t, Math.round(healAmt * 0.35), st.type, '#fef9c3', false);
      });

    // ── 리리/샹화 운무수도사: 빠른 힐 + HoT ─────────────────────────
    } else if ((this.hasSkillPrefix(hero.equippedSkillIds, 'lili_') || this.hasSkillPrefix(hero.equippedSkillIds, 'xianghua_'))) {
      this.applyDirectHeal(hero, mainTarget.t, Math.round(hero.atk * 2.5 * healMult), mainTarget.type, '#22c55e');
      this.applyHoT(mainTarget.t, Math.round(hero.atk * 0.5 * healMult), 4, mainTarget.type, '#16a34a');
      if (allSorted[1]) {
        this.applyDirectHeal(hero, allSorted[1].t, Math.round(hero.atk * 1.2 * healMult), allSorted[1].type, '#4ade80', false);
      }

    // ── 기본 사제: 주 타겟 힐 + 전체 소량 힐 ────────────────────────
    } else {
      const healAmt = Math.round(hero.atk * 3.0 * healMult);
      this.applyDirectHeal(hero, mainTarget.t, healAmt, mainTarget.type, '#fde68a');
      allSorted.slice(1).forEach(a => {
        this.applyDirectHeal(hero, a.t, Math.round(hero.atk * 0.5 * healMult), a.type, '#fffbeb', false);
      });
    }

    // 항상 쿨타임 리셋
    hero.attackTimer = hero.attackCooldown;
  }

  /** 즉시 치유 적용 및 이펙트 생성 */
  public applyDirectHeal(source: GameHero | null, target: any, amount: number, _type: 'hero' | 'summon', color: string, showNumber = true) {
    if (!target.isAlive) return;
    // 실제 회복량 계산 (오버힐 제외)
    const actualHeal = Math.min(target.maxHp - target.hp, amount);
    target.hp = Math.min(target.maxHp, target.hp + amount);

    // ── 퀸차이 운무: 안개 돌풍 (unique_quinchai_mistweaver) ──
    if (source && this.hasSkill(source.equippedSkillIds, 'unique_quinchai_mistweaver')) {
      if (Math.random() < (source.uniqueSkillValue ?? 15) / 100) {
        const extraHeal = Math.round(amount * 0.5);
        target.hp = Math.min(target.maxHp, target.hp + extraHeal);
        this.addDamageNumber(target.position.x + 10, target.position.y - 30, extraHeal, '#06b6d4', true);
      }
    }

    // ── 울트리온 복원: 생명의 숨결 (unique_ultrion_preservation) ──
    if (source && this.hasSkill(source.equippedSkillIds, 'unique_ultrion_preservation')) {
      if (Math.random() < (source.uniqueSkillValue ?? 15) / 100) {
        const extraTargets = this.state.heroes.filter(h => h.isAlive && h.id !== target.id && h.hp < h.maxHp && this.distance(target.position, h.position) <= 150).slice(0, 2);
        for (const et of extraTargets) {
          this.applyDirectHeal(null, et, amount, 'hero', '#22c55e', true);
        }
      }
    }

    // ── 이에나 고통의 방어막 (unique_iyena_discipline): 힐 시 HP {value}% 방어막 ──
    if (source && this.hasSkill(source.equippedSkillIds, 'unique_iyena_discipline')) {
      const shieldAmt = Math.round(target.maxHp * (source.uniqueSkillValue ?? 20) / 100);
      this.applyShield(target, shieldAmt, 'hero', 8, source.id);
    }

    // ── 리리 안개 돌풍 (unique_lili_mistweaver): 힐 시 {value}% 추가 힐 ──
    if (source && this.hasSkill(source.equippedSkillIds, 'unique_lili_mistweaver')) {
      const bonus = Math.round(amount * (source.uniqueSkillValue ?? 10) / 100);
      if (bonus > 0) {
        target.hp = Math.min(target.maxHp, target.hp + bonus);
        this.addDamageNumber(target.position.x + 12, target.position.y - 30, bonus, '#22c55e', true);
      }
    }

    // ── 벨렌 구원의 빛 (unique_velen_holy): 힐 시 velen 스킬 쿨타임 {value}% 감소 ──
    if (source && this.hasSkill(source.equippedSkillIds, 'unique_velen_holy') && source.skillTimers) {
      const reduction = (source.uniqueSkillValue ?? 15) / 100;
      for (const k of ['velen_flash_heal', 'velen_circle_of_healing', 'velen_holy_word_salvation']) {
        if ((source.skillTimers[k] ?? 0) > 0) {
          source.skillTimers[k] = Math.max(0, source.skillTimers[k] - 1.0 * reduction);
        }
      }
    }

    // ── 예슈탈키온 신성한 빛 (unique_yesh_holy): 힐 시 {value}% 확률 연계 힐 ──
    if (source && this.hasSkill(source.equippedSkillIds, 'unique_yesh_holy')) {
      if (Math.random() < (source.uniqueSkillValue ?? 20) / 100) {
        const chainTarget = this.state.heroes
          .filter(h => h.isAlive && h.id !== target.id && h.hp < h.maxHp)
          .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp))[0];
        if (chainTarget) {
          const chainHeal = Math.round(amount * 0.6);
          chainTarget.hp = Math.min(chainTarget.maxHp, chainTarget.hp + chainHeal);
          this.addDamageNumber(chainTarget.position.x + 10, chainTarget.position.y - 30, chainHeal, '#fde68a', true);
          this.state.healingFlashes.push({ x: chainTarget.position.x, y: chainTarget.position.y, timer: 0.3, color: '#fbbf24' });
        }
      }
    }

    if (showNumber) {
      this.addDamageNumber(target.position.x, target.position.y - 20, amount, color, true);
      this.state.healingFlashes.push({ x: target.position.x, y: target.position.y, timer: 0.4, color });
    }

    if (source && actualHeal > 0) {
      this.addMeterHeal(source.id, actualHeal);
      // 힐 위협 생성 (실제 회복량 기준, 오버힐 제외)
      for (const m of this.state.monsters.filter(m => m.isAlive)) {
        this.addThreat(source, m, actualHeal * 0.5, 'hero');
      }
    }
  }

  /** 지속 치유(HoT) 적용 */
  public applyHoT(target: any, amount: number, ticks: number, type: 'hero' | 'summon', color: string) {
    this.state.hots.push({
      id: Math.random(), targetId: target.id, targetType: type,
      amountPerTick: amount, totalTicks: ticks, currentTick: 0,
      interval: 1.0, timer: 1.0, color
    });
  }

  /** 연쇄 치유 (Chain Heal) */
  private applyChainHeal(source: GameHero, targets: any[], amount: number, remainingJumps: number) {
    if (remainingJumps <= 0 || targets.length === 0) return;
    
    const target = targets[0];
    this.applyDirectHeal(source, target.t, amount, target.type, '#06b6d4');
    
    // 다음 연쇄 (감쇄 30%)
    if (targets.length > 1) {
      this.applyChainHeal(source, targets.slice(1), Math.round(amount * 0.7), remainingJumps - 1);
    }
  }

  /** 보호막 적용 */
  public applyShield(target: any, amount: number, type: 'hero' | 'summon', duration: number, casterId?: number) {
    const existing = this.state.shields.find(s => s.targetId === target.id && s.targetType === type);
    if (existing) {
      existing.amount = Math.min(existing.maxAmount, existing.amount + amount);
      existing.duration = duration;
      if (casterId !== undefined) existing.casterId = casterId;
    } else {
      this.state.shields.push({ targetId: target.id, targetType: type, amount, maxAmount: amount * 2, duration, casterId });
    }
  }
  private ccAction(hero: GameHero, monsters: GameMonster[], ccMult: number) {
    // ── 자폭병 최우선 타겟팅: CC 안 걸린 자폭병 → 슬로우만 걸린 자폭병 → 일반 스마트 타겟 ──
    const aliveBombers = monsters.filter(m => m.isAlive && m.isSuicideBomber);
    const unstunnedBombers = aliveBombers.filter(m => !m.isStunned && !m.immuneToCc);
    const freeBombers = unstunnedBombers.filter(m => !m.isSlowed);

    let target: GameMonster | undefined;

    // 0순위: 취약점이 ranged인 몬스터 (쌍둥이 보스 등) — 자폭병보다 우선할지 선택 필요
    // 일단 자폭병 방어가 더 급하므로, 자폭병이 없을 때만 보스 점사
    const vulnerableRanged = monsters.filter(m => m.isAlive && m.vulnerability === 'ranged');

    if (freeBombers.length > 0) {
      // 완전히 CC 없는 자폭병 중 벽에 가장 가까운 것
      target = freeBombers.sort((a, b) => a.position.x - b.position.x)[0];
    } else if (unstunnedBombers.length > 0) {
      // 슬로우만 걸린 자폭병 (스턴은 이미 처리됨)
      target = unstunnedBombers.sort((a, b) => a.position.x - b.position.x)[0];
    } else if (vulnerableRanged.length > 0) {
      // 자폭병 없으면 원딜 취약 보스 우선
      target = vulnerableRanged.sort((a, b) => this.distance(hero.position, a.position) - this.distance(hero.position, b.position))[0];
    } else {
      // 일반 스마트 타겟팅 (CC 안 걸린 적 우선)
      const notCCd = monsters.filter(m => m.isAlive && !m.isSlowed && !m.isStunned && !m.immuneToCc);
      target = (notCCd.length > 0 ? notCCd : monsters.filter(m => m.isAlive))
        .sort((a, b) => a.position.x - b.position.x)[0];
    }

    if (target) {
      let dmg = this.calculateDamage(hero.atk, target.def);
      if (this.options.mode !== 'offense' && target.position.x > HERO_MAX_X) {
        dmg = Math.round(dmg * 0.7);
      }
      this.spawnProjectile(hero, target.id, 'frostbolt', dmg, 3 * ccMult);

      // ── 무력화 효과: 자폭병은 100% 확률, 일반은 30% ──
      if ((target.isSuicideBomber ? true : Math.random() < 0.30) && !target.immuneToCc) {
        const r = Math.random();
        if (r < 0.33) {
          // 1. 스턴 (5초)
          target.isStunned = true;
          target.stunTimer = Math.max(target.stunTimer || 0, 5.0);
          this.addDamageNumber(target.position.x, target.position.y - 40, 0, '#fbbf24', false);
        } else if (r < 0.66) {
          // 2. 결빙 (5초 슬로우)
          target.isSlowed = true;
          target.slowTimer = Math.max(target.slowTimer || 0, 5.0);
          this.state.healingFlashes.push({ x: target.position.x, y: target.position.y, timer: 0.5, color: '#60a5fa' });
        } else {
          // 3. 광역 슬로우 (5초, 반경 150px)
          const radius = 150;
          this.spawnExplosion(target.position.x, target.position.y, '#a855f7', radius);
          monsters.forEach(m => {
            if (m.isAlive && !m.immuneToCc && this.distance(target.position, m.position) <= radius) {
              m.isSlowed = true;
              m.slowTimer = Math.max(m.slowTimer || 0, 5.0);
            }
          });
        }
      }

      hero.attackTimer = hero.attackCooldown;
    }
  }

  /**
   * 메카닉 전용: 직접 공격 없음.
   * 포탑을 벽 위에 상시 유지하고, 포탑/벽을 수리한다.
   * 포탑이 모든 딜을 담당.
   */
  private mechanicAction(hero: GameHero, _validTargets: GameMonster[]): void {
    // ── 포탑 최대 유지 수 결정 ──────────────────────────────────────────────
    let maxTurrets = 1;
    if (this.hasSkill(hero.equippedSkillIds, 'scrapbom_multi_turret')) maxTurrets = 2;
    if (this.hasSkill(hero.equippedSkillIds, 'coilzak_triple_turret')) maxTurrets = 3;

    // ── 살아있는 내 포탑 목록 ──────────────────────────────────────────────
    const myTurrets = this.state.summons.filter(
      s => s.summonerId === hero.id && s.skillId.startsWith('mechanic_turret_') && s.isAlive
    );

    // ── 포탑 사망 감지 → 재소환 쿨타임 5초 ───────────────────────────────
    const prevCount = hero.turretPrevCount ?? myTurrets.length; // 첫 호출: 사망 없음
    if (myTurrets.length < prevCount && (hero.turretRespawnTimer ?? 0) <= 0) {
      hero.turretRespawnTimer = 5.0; // 5초 쿨타임 시작
    }

    // ── 부족한 포탑 소환 (쿨타임이 끝났을 때만) ─────────────────────────
    if (myTurrets.length < maxTurrets && (hero.turretRespawnTimer ?? 0) <= 0) {
      this.spawnMechanicTurret(hero, myTurrets.length);
      hero.turretPrevCount = myTurrets.length + 1; // 소환 직후 카운트 갱신
    } else {
      // 포탑 수 정상이거나 쿨타임 중: 현재 살아있는 포탑 수 기록
      hero.turretPrevCount = Math.max(myTurrets.length, hero.turretPrevCount ?? 0);
    }

    // ── 힐 쿨다운이 남아있으면 대기 ──────────────────────────────────────
    if ((hero.healTimer ?? 0) > 0) return;

    // ── 수리 쿨다운 계산 ──────────────────────────────────────────────────
    let healCooldown = 3.0;
    if (this.hasSkill(hero.equippedSkillIds, 'scrapbom_fast_repair')) healCooldown -= 1.0;
    if (this.hasSkill(hero.equippedSkillIds, 'coilzak_auto_rebuild')) healCooldown -= 2.0;
    healCooldown = Math.max(0.5, healCooldown);

    // ── 수리량 계산 ───────────────────────────────────────────────────────
    const hasAmp = this.hasSkill(hero.equippedSkillIds, 'scrapbom_repair_amp') ||
                   this.hasSkill(hero.equippedSkillIds, 'coilzak_mastery');
    const baseHeal = Math.round(hero.atk * 2.5);
    const repairAmount = hasAmp ? Math.round(baseHeal * 1.4) : baseHeal;

    // ── 우선순위 1: 포탑 HP < 100% → 포탑 수리 ───────────────────────────
    const damagedTurret = myTurrets
      .filter(t => t.hp < t.maxHp)
      .sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp)[0];

    if (damagedTurret) {
      const emergencyMult =
        (this.hasSkill(hero.equippedSkillIds, 'scrapbom_emergency_repair') ||
         this.hasSkill(hero.equippedSkillIds, 'coilzak_auto_rebuild')) &&
        damagedTurret.hp / damagedTurret.maxHp < 0.30 ? 2 : 1;
      const healAmt = repairAmount * emergencyMult;
      damagedTurret.hp = Math.min(damagedTurret.maxHp, damagedTurret.hp + healAmt);
      this.addDamageNumber(damagedTurret.position.x, damagedTurret.position.y - 30, healAmt, '#22c55e', false);
      hero.healTimer = healCooldown;
      return;
    }

    // ── 우선순위 2: 아군 영웅 HP < 100% → 아군 힐 ───────────────────────
    const damagedHero = this.state.heroes
      .filter(h => h.isAlive && h.hp < h.maxHp)
      .sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp)[0];

    if (damagedHero) {
      const emergencyMult =
        (this.hasSkill(hero.equippedSkillIds, 'scrapbom_emergency_repair') ||
         this.hasSkill(hero.equippedSkillIds, 'coilzak_auto_rebuild')) &&
        damagedHero.hp / damagedHero.maxHp < 0.30 ? 2 : 1;
      const healAmt = repairAmount * emergencyMult;
      damagedHero.hp = Math.min(damagedHero.maxHp, damagedHero.hp + healAmt);
      this.addDamageNumber(damagedHero.position.x, damagedHero.position.y - 30, healAmt, '#22c55e', false);
      hero.healTimer = healCooldown;
      return;
    }

    // ── 우선순위 3: 벽 HP < 100% → 벽 수리 ──────────────────────────────
    const anyWallDamaged = this.options.mode !== 'offense' &&
      this.state.walls.some(w => w.hp < w.maxHp);
    if (anyWallDamaged) {
      const lightHealBonus = this.state.walls.at(-1)!.talents.lightHealBothWalls || 0;
      const wallHeal = repairAmount + lightHealBonus;
      for (const w of this.state.walls) {
        this.spawnWallHealOrb(hero, wallHeal, w);
      }
      hero.healTimer = healCooldown;
    }
    // 포탑·벽 모두 정상 → 메카닉 대기 (직접 공격 없음)
  }

  /** 파티 내 선행 메카닉들의 maxTurrets 합산 → 포지션 배열 글로벌 오프셋 */
  private getMechanicTurretOffset(hero: GameHero): number {
    let offset = 0;
    for (const h of this.state.heroes) {
      if (h.id === hero.id) break;
      if (h.role !== 'mechanic') continue;
      let mt = 1;
      if (this.hasSkill(h.equippedSkillIds, 'scrapbom_multi_turret')) mt = 2;
      if (this.hasSkill(h.equippedSkillIds, 'coilzak_triple_turret')) mt = 3;
      offset += mt;
    }
    return offset;
  }

  /** 메카닉 포탑을 벽 위(앞)에 소환 (정적, speed=0) */
  private spawnMechanicTurret(hero: GameHero, index: number = 0): void {
    const wall = this.state.walls[0];
    if (!wall) return;

    // ── 포탑 공격력: 영웅 ATK의 3배 + 고유기술 보너스 + 스킬 보너스 ──────
    let turretAtk = Math.round(hero.atk * 3.0);
    if (hero.uniqueSkillValue) {
      turretAtk = Math.round(turretAtk * (1 + hero.uniqueSkillValue / 100));
    }
    const hasTurretAtk = this.hasSkill(hero.equippedSkillIds, 'scrapbom_overcharge') ||
                         this.hasSkill(hero.equippedSkillIds, 'coilzak_overvolt');
    if (hasTurretAtk) turretAtk = Math.round(turretAtk * 1.3);

    // ── 포탑 내구도 ───────────────────────────────────────────────────────
    let turretHp = 450;
    let turretDef = 30;
    if (this.hasSkill(hero.equippedSkillIds, 'scrapbom_turret_armor')) {
      turretHp = Math.round(turretHp * 1.3);
      turretDef += 40;
    }

    // ── 사거리 ────────────────────────────────────────────────────────────
    let turretRange = 700;
    if (this.hasSkill(hero.equippedSkillIds, 'coilzak_range_amp')) turretRange += 250;

    const skillId = `mechanic_turret_${index}`;
    const turretColor = hero.color === '#f97316' ? '#f97316' : '#06b6d4';

    const config = {
      skillId,
      displayName: index === 0 ? '자동 포탑' : `자동 포탑 ${index + 1}`,
      displayNameKey: 'game.autoTurret',
      hp: turretHp,
      atk: turretAtk,
      def: turretDef,
      spd: 0,
      role: 'ranged_dps',
      attackRange: turretRange,
      duration: 0,
      color: turretColor,
    };

    const summon = this.spawnSummon(hero, config);

    // ── 포탑 위치 결정 ──────────────────────────────────────────────────
    const globalIndex = this.getMechanicTurretOffset(hero) + index;
    const customPos = this.options.customTurretPositions?.[globalIndex];
    if (customPos) {
      // 플레이어가 직접 지정한 위치
      summon.position = { x: customPos.x, y: customPos.y };
    } else {
      // 기본 위치: offense 모드는 아군 방어 위치, defense 모드는 벽 앞
      const yOffsets = [30, -30, 0];
      const turretX = this.options.mode === 'offense' ? TOWER_X + 25 : wall.position.x + 25;
      summon.position = {
        x: turretX,
        y: FIELD_Y_CENTER + (yOffsets[index] ?? 0),
      };
    }
  }

  /** 메카닉 → 벽 방향으로 수리 오브 발사 */
  private spawnWallHealOrb(hero: GameHero, healAmount: number, targetWall: import('./types').Tower): void {
    const wallPos = targetWall.position;
    this.state.projectiles.push({
      id: this.state.nextProjectileId++,
      heroId: hero.id,
      targetId: this.getWallTargetId(targetWall),
      targetType: 'wall',
      wallTarget: { x: wallPos.x, y: wallPos.y },
      position: { x: hero.position.x, y: hero.position.y },
      damage: 0,
      speed: 5,
      type: 'heal_orb',
      color: '#22C55E',
      size: 8,
      isHeal: true,
      healAmount,
    });
  }

  private dpsAction(
    hero: GameHero,
    monsters: GameMonster[],
    lifestealMult: number,
    execThreshold: number,
    dt: number,
  ) {
    if (hero.role === 'melee_dps') {
      this.meleeDpsAction(hero, monsters, lifestealMult, execThreshold, dt);
    } else {
      this.rangedDpsAction(hero, monsters, lifestealMult, execThreshold);
    }
  }

  // 근딜: 탱커 어그로 몬스터 → 최근접 순으로 공격
  //        원거리 몬스터는 이제 맵 중앙까지 전진하므로 별도 우선순위 불필요
  private meleeDpsAction(
    hero: GameHero,
    monsters: GameMonster[],
    lifestealMult: number,
    execThreshold: number,
    dt: number,
  ) {
    let target: GameMonster | null = null;

    // 0순위: 취약점이 melee인 몬스터 (쌍둥이 보스 등)
    const vulnerableMelee = monsters.filter(m => m.vulnerability === 'melee');
    if (vulnerableMelee.length > 0) {
      target = vulnerableMelee.sort((a, b) => this.distance(hero.position, a.position) - this.distance(hero.position, b.position))[0];
    }

    // 1순위: 탱커가 잡고 있는 몬스터
    if (!target) {
      const tank = this.state.heroes.find(h => h.isAlive && h.role === 'tank');
      if (tank) {
        target = monsters
          .filter(m => m.targetId === tank.id)
          .sort((a, b) => this.distance(hero.position, a.position) - this.distance(hero.position, b.position))[0] ?? null;
      }
    }

    // 2순위: 가장 가까운 몬스터
    if (!target) target = this.findClosestMonster(hero, monsters);
    if (!target) return;

    // ── 배후 강타 (Flank) 시스템 ──
    // 몬스터가 이 영웅을 타겟 중이면 "바라보는" 상태 → 플랭크 불가, 정면 전투.
    // 몬스터가 다른 것(탱커·벽·다른 영웅)을 타겟 중이면 등/옆을 보여주는 중 → 뒤를 노림.
    const monsterTargetsMe = target.targetType === 'hero' && target.targetId === hero.id;

    const FLANK_OFFSET = 70; // 몬스터 뒤 목표 거리 (px)
    const destX = !monsterTargetsMe
      ? Math.min(target.position.x + FLANK_OFFSET, CANVAS_WIDTH - 40)
      : target.position.x;
    const destY = target.position.y;

    const dist = this.distance(hero.position, target.position);
    const dxDest = destX - hero.position.x;
    const dyDest = destY - hero.position.y;
    const distDest = Math.sqrt(dxDest * dxDest + dyDest * dyDest);

    // 공격 범위 밖: 목표 위치(플랭크 or 정면)를 향해 이동
    if (dist > hero.attackRange + 40) {
      const moveAmount = hero.speed * 60 * dt;
      if (distDest > 1) {
        hero.position.x += (dxDest / distDest) * Math.min(moveAmount, distDest);
        hero.position.y += (dyDest / distDest) * Math.min(moveAmount, distDest);
        hero.position.y = Math.max(FIELD_Y_MIN + 20, Math.min(FIELD_Y_MAX - 20, hero.position.y));
      }
      return;
    }

    // 공격 범위 내 + 쿨다운 대기 중: 플랭크 가능 상황이면 천천히 계속 이동
    if (hero.attackTimer > 0 && !monsterTargetsMe && distDest > 25) {
      const slideAmount = hero.speed * 60 * dt * 0.45;
      hero.position.x += (dxDest / distDest) * Math.min(slideAmount, distDest);
      hero.position.y += (dyDest / distDest) * Math.min(slideAmount, distDest);
      hero.position.y = Math.max(FIELD_Y_MIN + 20, Math.min(FIELD_Y_MAX - 20, hero.position.y));
    }

    if (dist <= hero.attackRange + 50 && hero.attackTimer <= 0) {
      // ── 배후 판정: 몬스터가 나를 타겟하지 않고, 내가 몬스터 오른쪽(뒤)에 있을 때 ──
      const isFlanking = !monsterTargetsMe && hero.position.x > target.position.x;
      // 배후 보너스: 50% 추가 피해. ironSkin 보스는 어차피 1로 캡되므로 의미 없음.
      const flankBonus = isFlanking ? 1.5 : 1.0;

      // ── 전투의 리듬 (Phase 144): 근딜 3타 로테이션 ──
      hero.battleRhythmCount = (hero.battleRhythmCount ?? 0) + 1;
      const rhythm = hero.battleRhythmCount % 3; // 1, 2, 0 (0 is 3rd attack)

      if (rhythm === 2) {
        // 2타: 공격력 3배 (+ 배후 보너스)
        this.dealDamage(hero, target, lifestealMult, execThreshold, 3.0 * flankBonus);
      } else if (rhythm === 0) {
        // 3타: 광역 피해 (1.0배 + 배후 보너스, 반경 150px)
        this.dealDamage(hero, target, lifestealMult, execThreshold, 1.0 * flankBonus, true);
      } else {
        // 1타: 일반 공격 (+ 배후 보너스)
        this.dealDamage(hero, target, lifestealMult, execThreshold, flankBonus);
      }

      // ── shared_multi_strike: 25% 확률 2연타 (중복 장착 시 각 독립 발동) ──
      const multiStrikeCount = this.countSkill(hero.equippedSkillIds, 'shared_multi_strike');
      for (let _i = 0; _i < multiStrikeCount; _i++) {
        if (Math.random() < 0.25) this.dealDamage(hero, target, lifestealMult, execThreshold, flankBonus);
      }
      // ── 가시 본능 (unique_zedah_fury): {uniqueSkillValue}% 확률 3연타 ──
      if (this.hasSkill(hero.equippedSkillIds, 'unique_zedah_fury')) {
        const prob = (hero.uniqueSkillValue ?? 20) / 100;
        if (Math.random() < prob) {
          this.dealDamage(hero, target, lifestealMult, execThreshold, flankBonus);
          if (target.isAlive) this.dealDamage(hero, target, lifestealMult, execThreshold, flankBonus);
        }
      }
      hero.attackTimer = hero.attackCooldown;
    }
  }

  // 원딜: 파이어볼 발사 (사거리 무제한)
  private rangedDpsAction(
    hero: GameHero,
    monsters: GameMonster[],
    lifestealMult: number,
    _execThreshold: number,
  ) {
    // 0순위: 취약점이 ranged인 몬스터 (쌍둥이 보스 등)
    let target = monsters.find(m => m.vulnerability === 'ranged');

    if (!target) {
      // 기존 타겟팅 로직: 보스 > 엘리트 > 일반
      target = monsters.sort((a, b) => {
        const typePriority = { boss: 0, elite: 1, normal: 2 };
        const diff = typePriority[a.monsterType] - typePriority[b.monsterType];
        if (diff !== 0) return diff;
        return this.distance(hero.position, a.position) - this.distance(hero.position, b.position);
      })[0];
    }

    if (!target) return;

    let dmg = this.calculateDamage(hero.atk, target.def);
    // Hero존 밖 몬스터: 데미지 70% (defense 모드만 적용)
    if (this.options.mode !== 'offense' && target.position.x > HERO_MAX_X) {
      dmg = Math.round(dmg * 0.7);
    }

    const skills = hero.equippedSkillIds ?? [];
    // ── 켈투 사자의 한기 (unique_keltu_frost): 냉기 피해 {value}% 증가 ──
    if (this.hasSkill(skills, 'unique_keltu_frost') && hero.elementName === '서리') {
      dmg = Math.round(dmg * (1 + (hero.uniqueSkillValue ?? 20) / 100));
    }
    // ── 말퓨 월식 (unique_malfu_balance): 비전 피해 {value}% 증가 ──
    if (this.hasSkill(skills, 'unique_malfu_balance') && hero.elementName === '비전') {
      dmg = Math.round(dmg * (1 + (hero.uniqueSkillValue ?? 20) / 100));
    }
    // ── 마가타 용암 격류 (unique_magatha_elemental): 화염 피해 {value}% 증가 ──
    if (this.hasSkill(skills, 'unique_magatha_elemental') && hero.elementName === '화염') {
      dmg = Math.round(dmg * (1 + (hero.uniqueSkillValue ?? 20) / 100));
    }
    // ── 릭스 발화 (unique_rix_fire): 화염 피해 {value}% 증가 ──
    if (this.hasSkill(skills, 'unique_rix_fire') && hero.elementName === '화염') {
      dmg = Math.round(dmg * (1 + (hero.uniqueSkillValue ?? 20) / 100));
    }

    // ── 파멸의 일격 (feldah_crit_triple): 30% 확률로 3배 치명타 ──
    const hasCritTriple = this.hasSkill(hero.equippedSkillIds, 'feldah_crit_triple') ?? false;
    // ── 리뮤 에임 다운 (unique_limu_precision): {value}% 확률 치명타 ──
    const limuCritProb = this.hasSkill(hero.equippedSkillIds, 'unique_limu_precision') ? (hero.uniqueSkillValue ?? 20) / 100 : 0;

    let isCrit = false;
    if (hasCritTriple && Math.random() < 0.30) {
      dmg = Math.round(dmg * 3);
      isCrit = true;
    } else if (limuCritProb > 0 && Math.random() < limuCritProb) {
      dmg = Math.round(dmg * 2.0); // R급 기본 크리 2배
      isCrit = true;
    }

    // 라이프스틸 (즉시 적용, 파이어볼 명중 시에도 동일하게)
    if (lifestealMult > 0) {
      hero.hp = Math.min(hero.maxHp, hero.hp + Math.round(dmg * lifestealMult));
    }
    const projType = hero.elementName === '암흑' ? 'shadow_bolt' : 'fireball';
    this.spawnProjectile(hero, target.id, projType, dmg);

    // ── 얼어붙은 구슬 (iskier_frozen_orb): 5초마다 대상 주변 150px ATK×3 광역 피해 ──
    if (this.hasSkill(skills, 'iskier_frozen_orb')) {
      const timerKey = 'iskier_frozen_orb';
      if (!hero.skillTimers) hero.skillTimers = {};
      if ((hero.skillTimers[timerKey] ?? 0) <= 0) {
        const aoeDmg = Math.round(hero.atk * 3);
        const radius = 150;
        this.spawnExplosion(target.position.x, target.position.y, '#60a5fa', radius);
        const aoeTargets = this.state.monsters.filter(m => m.isAlive && this.distance(target.position, m.position) <= radius);
        for (const m of aoeTargets) {
          m.hp -= aoeDmg;
          this.addMeterDamage(hero.id, 'iskier_frozen_orb', aoeDmg);
          this.addDamageNumber(m.position.x, m.position.y - 20, aoeDmg, '#60a5fa', true);
          if (m.hp <= 0) { m.hp = 0; m.isAlive = false; this.addScore(getMonsterScore(m, 1)); this.addGold(getMonsterGold(m, 1)); }
        }
        hero.skillTimers[timerKey] = 5.0; // 5초 쿨다운
      }
    }

    // ── 혼돈의 불꽃 (unique_feldah_destro): 치명타 시 스킬 쿨감 ──
    if (isCrit && this.hasSkill(hero.equippedSkillIds, 'unique_feldah_destro') && hero.skillTimers) {
      const redPct = (hero.uniqueSkillValue ?? 10) / 100;
      for (const key of Object.keys(hero.skillTimers)) {
        if (key !== 'feldah_agony_stacks') {
          hero.skillTimers[key] = Math.max(0, hero.skillTimers[key] * (1 - redPct));
        }
      }
    }

    // ── 쌍 투사체 (feldah_double_bolt): 두 번째 투사체 ──
    if (this.hasSkill(hero.equippedSkillIds, 'feldah_double_bolt')) {
      const secondTarget = monsters.find(m => m.id !== target.id) ?? target;
      const dmg2 = this.calculateDamage(hero.atk, secondTarget.def);
      this.spawnProjectile(hero, secondTarget.id, projType, dmg2);
    }

    // ── 저주받은 영혼 (unique_feldah_afflict): 피격 적 이속 감소 ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_feldah_afflict') && !target.immuneToCc) {
      target.isSlowed = true;
      target.slowTimer = Math.max(target.slowTimer, (hero.uniqueSkillValue ?? 10) * 0.15);
    }

    // ── 어둠의 갈망 (unique_dizgar_shadow): {value}% 확률로 피해량 50%만큼 체력 최저 아군 힐 ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_dizgar_shadow')) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const healTarget = this.state.heroes.filter(h => h.isAlive).sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp))[0];
        if (healTarget) {
          const healAmt = Math.round(dmg * 0.5);
          this.applyDirectHeal(hero, healTarget, healAmt, 'hero', '#a855f7');
        }
      }
    }

    // ── 생명 흡수 (dizgar_life_drain): 공격 시 피해량 50% 자가회복 ──
    if (this.hasSkill(hero.equippedSkillIds, 'dizgar_life_drain')) {
      const drainAmt = Math.round(dmg * 0.5);
      hero.hp = Math.min(hero.maxHp, hero.hp + drainAmt);
    }

    // ── 비전 공명 (unique_irene_arcane): {value}% 확률로 동일 피해 추가 투사체 발사 (2배 효과) ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_irene_arcane')) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        this.spawnProjectile(hero, target.id, 'fireball', dmg);
      }
    }

    // ── 마법 결빙 (unique_iskier_frost): {value}% 확률로 2초 빙결 ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_iskier_frost') && !target.immuneToCc) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        target.isStunned = true;
        target.stunTimer = Math.max(target.stunTimer, 2.0);
      }
    }

    // ── 마법 점화 (unique_iskier_fire): {value}% 확률로 ATK×2 즉발 화상 피해 ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_iskier_fire') && target.isAlive) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const burnDmg = Math.round(hero.atk * 2);
        target.hp -= burnDmg;
        this.addMeterDamage(hero.id, null, burnDmg);
        this.addDamageNumber(target.position.x, target.position.y - 25, burnDmg, '#f97316');
        if (target.hp <= 0) { target.hp = 0; target.isAlive = false; this.addScore(getMonsterScore(target, 1)); this.addGold(getMonsterGold(target, 1)); }
      }
    }

    // ── 비전 공명 (unique_iskier_arcane): {value}% 확률로 추가 투사체 발사 ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_iskier_arcane') && target.isAlive) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const extraTarget = monsters.find(m => m.isAlive && m.id !== target.id) ?? target;
        this.spawnProjectile(hero, extraTarget.id, 'fireball', dmg);
      }
    }

    // ── 차가운 심장 (shared_cold_heart): 슬로우 대상 피해 40% 증폭 ──
    // (평타 투사체 발사 전 dmg에 적용됨 → 이미 spawnProjectile로 넘겨졌으나, 효과는 추가 직접 피해로 처리)
    // → projectile 명중 시 처리 불가, 대신 rangedDpsAction에서 슬로우된 적이면 직접 추가 피해
    const coldHeartCount = this.countSkill(hero.equippedSkillIds, 'shared_cold_heart');
    if (coldHeartCount > 0 && target.isSlowed && target.isAlive) {
      const coldBonus = Math.round(dmg * 0.40 * coldHeartCount);
      target.hp -= coldBonus;
      this.addMeterDamage(hero.id, null, coldBonus);
      this.addDamageNumber(target.position.x, target.position.y - 20, coldBonus, '#0284c7');
      if (target.hp <= 0) { target.hp = 0; target.isAlive = false; this.addScore(getMonsterScore(target, 1)); this.addGold(getMonsterGold(target, 1)); }
    }

    // ── 점화 (iskier_ignite): 화상 상태 대상(슬로우·스턴) 피해 30% 증폭 ──
    if (this.hasSkill(hero.equippedSkillIds, 'iskier_ignite') && (target.isSlowed || target.isStunned) && target.isAlive) {
      const igniteDmg = Math.round(dmg * 0.30);
      target.hp -= igniteDmg;
      this.addMeterDamage(hero.id, null, igniteDmg);
      this.addDamageNumber(target.position.x, target.position.y - 30, igniteDmg, '#ea580c');
      if (target.hp <= 0) { target.hp = 0; target.isAlive = false; this.addScore(getMonsterScore(target, 1)); this.addGold(getMonsterGold(target, 1)); }
    }

    // ── 달빛 불꽃 (kaern_moonfire): 공격마다 ATK 30% 추가 자연 피해 ──
    if (this.hasSkill(hero.equippedSkillIds, 'kaern_moonfire') && target.isAlive) {
      const moonDmg = Math.round(hero.atk * 0.30);
      target.hp -= moonDmg;
      this.addMeterDamage(hero.id, null, moonDmg);
      this.addDamageNumber(target.position.x, target.position.y - 25, moonDmg, '#a78bfa');
      if (target.hp <= 0) { target.hp = 0; target.isAlive = false; this.addScore(getMonsterScore(target, 1)); this.addGold(getMonsterGold(target, 1)); }
    }

    // ── 조준 사격 (pilji_aimed_shot): 공격마다 ATK 60% 추가 피해 ──
    if (this.hasSkill(hero.equippedSkillIds, 'pilji_aimed_shot') && target.isAlive) {
      const aimDmg = Math.round(hero.atk * 0.60);
      target.hp -= aimDmg;
      this.addMeterDamage(hero.id, null, aimDmg);
      this.addDamageNumber(target.position.x, target.position.y - 30, aimDmg, '#fbbf24');
      if (target.hp <= 0) { target.hp = 0; target.isAlive = false; this.addScore(getMonsterScore(target, 1)); this.addGold(getMonsterGold(target, 1)); }
    }

    // ── 저격수의 집중 (unique_pilji_marksmanship): {value}% 확률로 ATK×3 관통 추가 피해 ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_pilji_marksmanship') && target.isAlive) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const penDmg = Math.round(hero.atk * 3);
        target.hp -= penDmg;
        this.addMeterDamage(hero.id, null, penDmg);
        this.addDamageNumber(target.position.x, target.position.y - 40, penDmg, '#fcd34d');
        if (target.hp <= 0) { target.hp = 0; target.isAlive = false; this.addScore(getMonsterScore(target, 1)); this.addGold(getMonsterGold(target, 1)); }
      }
    }

    // ── 폭발 화살 (pilji_explosive_arrow): 명중 시 주변 70px ATK×1.5 광역 폭발 ──
    if (this.hasSkill(hero.equippedSkillIds, 'pilji_explosive_arrow') && target.isAlive) {
      const aoeTargets = monsters.filter(m => m.isAlive && this.distance(target.position, m.position) <= 70);
      const aoeDmg = Math.round(hero.atk * 1.5);
      this.spawnExplosion(target.position.x, target.position.y, '#d97706', 70);
      for (const m of aoeTargets) {
        m.hp -= aoeDmg;
        this.addMeterDamage(hero.id, null, aoeDmg);
        this.addDamageNumber(m.position.x, m.position.y - 18, aoeDmg, '#fbbf24');
        if (m.hp <= 0) { m.hp = 0; m.isAlive = false; this.addScore(getMonsterScore(m, 1)); this.addGold(getMonsterGold(m, 1)); }
      }
    }

    // ── 연사 (pilji_rapid_fire): 30% 확률로 추가 투사체 발사 ──
    if (this.hasSkill(hero.equippedSkillIds, 'pilji_rapid_fire')) {
      if (Math.random() < 0.30) {
        const rfTarget = monsters.find(m => m.isAlive && m.id !== target.id) ?? target;
        this.spawnProjectile(hero, rfTarget.id, 'fireball', Math.round(dmg * 0.7));
      }
    }

    // ── 번개 화살 (cheondung_lightning_bolt): 공격 시 2연쇄 번개 추가 투사체 ──
    if (this.hasSkill(hero.equippedSkillIds, 'cheondung_lightning_bolt') && target.isAlive) {
      const chainTarget = monsters.find(m => m.isAlive && m.id !== target.id);
      const chainDmg = Math.round(hero.atk * 0.7);
      this.spawnProjectile(hero, (chainTarget ?? target).id, 'fireball', chainDmg);
    }

    // ── 달빛 폭발 (unique_kaern_balance): {value}% 확률로 주변 80px ATK×2 광역 폭발 ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_kaern_balance') && target.isAlive) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const aoeTargets = monsters.filter(m => m.isAlive && this.distance(target.position, m.position) <= 80);
        const aoeDmg = Math.round(hero.atk * 2);
        this.spawnExplosion(target.position.x, target.position.y, '#7c3aed', 80);
        for (const m of aoeTargets) {
          m.hp -= aoeDmg;
          this.addMeterDamage(hero.id, null, aoeDmg);
          this.addDamageNumber(m.position.x, m.position.y - 20, aoeDmg, '#a78bfa');
          if (m.hp <= 0) { m.hp = 0; m.isAlive = false; this.addScore(getMonsterScore(m, 1)); this.addGold(getMonsterGold(m, 1)); }
        }
      }
    }

    hero.attackTimer = hero.attackCooldown;
  }

  public dealDamage(
    hero: GameHero,
    monster: GameMonster,
    lifestealMult: number,
    execThreshold: number,
    damageMult: number = 1.0,
    isAoE: boolean = false
  ) {
    const mtb = this.state.meleeTankBonuses;
    const isMeleeTank = hero.role === 'melee_dps' || hero.role === 'tank';
    // 공허 스택: 방어 무시
    const effDef = isMeleeTank && mtb.armorPenPct > 0
      ? Math.max(0, Math.round(monster.def * (1 - mtb.armorPenPct / 100)))
      : monster.def;
    let dmg = this.calculateDamage(hero.atk, effDef);

    // ── 쌍둥이 보스 취약점 체크 ──
    if (monster.vulnerability) {
      const isMeleeRole = hero.role === 'melee_dps' || hero.role === 'tank';
      const isRangedRole = hero.role === 'ranged_dps' || hero.role === 'cc' || hero.role === 'healer';
      if (monster.vulnerability === 'melee' && !isMeleeRole) dmg = 0;
      if (monster.vulnerability === 'ranged' && !isRangedRole) dmg = 0;
    }

    // ── 가르두 소환수 전용 취약점 체크 ──
    if (monster.onlyVulnerableToSummons) {
      dmg = 0; // 영웅 본체의 공격(평타/스킬 직접 피해)은 무조건 0
    }

    // ── 배율 적용 (전투의 리듬 등) ──
    dmg = Math.round(dmg * damageMult);

    // ── 탱커: 어그로가 탱커 역할군이 아닐 때 (벽 공격 중 등) 5배 피해 ──
    if (hero.role === 'tank' && !this.isTargetingTank(monster)) {
      dmg *= 5;
    }

    // ── 광역 피해 처리 (Phase 144 전투의 리듬 3타) ──
    if (isAoE) {
      const radius = 150;
      const aoeTargets = this.state.monsters.filter(
        m => m.isAlive && m.id !== monster.id && this.distance(monster.position, m.position) <= radius
      );
      this.spawnExplosion(monster.position.x, monster.position.y, COLORS.melee_dps, radius);
      for (const m of aoeTargets) {
        let mDmg = this.calculateDamage(hero.atk, m.def);
        mDmg = Math.round(mDmg * damageMult);
        m.hp -= mDmg;
        this.addDamageNumber(m.position.x, m.position.y - 15, mDmg, COLORS.melee_dps);
        this.addMeterDamage(hero.id, null, mDmg);
        this.addThreat(hero, m, mDmg, 'hero');
        if (m.hp <= 0) {
          m.hp = 0;
          m.isAlive = false;
          this.addScore(getMonsterScore(m, 1));
          this.addGold(getMonsterGold(m, 1));
        }
      }
    }

    // ── 벽 속성 시너지 (화염/냉기 캐릭터 공격력 증폭) ──
    const wallBuff = this.state.walls.at(-1)!.talents?.elementBuffPct || 0;
    if (wallBuff > 0 && (hero.elementName === '화염' || hero.elementName === '냉기')) {
      dmg = Math.round(dmg * (1 + wallBuff));
    }

    const skills = hero.equippedSkillIds ?? [];
    // ── 켈투 사자의 한기 (unique_keltu_frost): 냉기 피해 {value}% 증가 ──
    if (this.hasSkill(skills, 'unique_keltu_frost') && hero.elementName === '서리') {
      dmg = Math.round(dmg * (1 + (hero.uniqueSkillValue ?? 20) / 100));
    }
    // ── 모크라 정령의 분노 (unique_mokra_elemental): 스킬 피해 {value}% 증가 ──
    if (this.hasSkill(skills, 'unique_mokra_elemental')) {
      dmg = Math.round(dmg * (1 + (hero.uniqueSkillValue ?? 25) / 100));
    }
    // ── 말퓨 월식 (unique_malfu_balance): 비전 피해 {value}% 증가 ──
    if (this.hasSkill(skills, 'unique_malfu_balance') && hero.elementName === '비전') {
      dmg = Math.round(dmg * (1 + (hero.uniqueSkillValue ?? 20) / 100));
    }
    // ── 마가타 용암 격류 (unique_magatha_elemental): 화염 피해 {value}% 증가 ──
    if (this.hasSkill(skills, 'unique_magatha_elemental') && hero.elementName === '화염') {
      dmg = Math.round(dmg * (1 + (hero.uniqueSkillValue ?? 20) / 100));
    }
    // ── 릭스 발화 (unique_rix_fire): 화염 피해 {value}% 증가 ──
    if (this.hasSkill(skills, 'unique_rix_fire') && hero.elementName === '화염') {
      dmg = Math.round(dmg * (1 + (hero.uniqueSkillValue ?? 20) / 100));
    }
    // ── 에이나 공허 파열 (unique_aeina_void): 공격 시 {value}% 확률 광역 전파 ──
    if (this.hasSkill(skills, 'unique_aeina_void') && monster.isAlive) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const splashDmg = Math.round(dmg * 0.5);
        const radius = 100;
        const inRange = this.state.monsters.filter(m => m.isAlive && m.id !== monster.id && this.distance(monster.position, m.position) <= radius);
        for (const m of inRange) {
          m.hp -= splashDmg;
          this.addDamageNumber(m.position.x, m.position.y - 15, splashDmg, '#7c3aed');
          this.addMeterDamage(hero.id, null, splashDmg);
        }
        this.spawnExplosion(monster.position.x, monster.position.y, '#7c3aed', radius);
      }
    }
    // ── 칼리샨 공허 화살 (unique_kali_marksmanship): 공격 시 {value}% 확률로 암흑 추가 피해 ──
    if (this.hasSkill(skills, 'unique_kali_marksmanship') && monster.isAlive) {
      if (Math.random() < (hero.uniqueSkillValue ?? 20) / 100) {
        const shadowDmg = Math.round(hero.atk * 1.5);
        monster.hp -= shadowDmg;
        this.addDamageNumber(monster.position.x, monster.position.y - 25, shadowDmg, '#4c1d95');
        this.addMeterDamage(hero.id, null, shadowDmg);
      }
    }
    // ── 성스러운 복수 (unique_lian_retri): 공격 시 {value}% 확률로 신성 추가 피해 ──
    if (this.hasSkill(skills, 'unique_lian_retri') && monster.isAlive) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const holyDmg = Math.round(hero.atk * 4.0);
        monster.hp -= holyDmg;
        this.addDamageNumber(monster.position.x, monster.position.y - 25, holyDmg, '#fbbf24');
        this.addMeterDamage(hero.id, null, holyDmg);
      }
    }
    // ── 부러진 손의 칼날 (unique_kargath_blade): 공격 시 {value}% 확률로 방어 0 무시 ──
    if (this.hasSkill(skills, 'unique_kargath_blade')) {
      if (Math.random() < (hero.uniqueSkillValue ?? 20) / 100) {
        dmg = hero.atk; // 방어 무시 (raw atk)
      }
    }
    // ── 가차없는 힘 (unique_kargath_berserk): 공격 시 {value}% 확률로 주변 적 전이 피해 ──
    if (this.hasSkill(skills, 'unique_kargath_berserk') && monster.isAlive) {
      if (Math.random() < (hero.uniqueSkillValue ?? 20) / 100) {
        const splashDmg = Math.round(dmg * 0.5);
        const radius = 100;
        for (const m of this.state.monsters.filter(m => m.isAlive && m.id !== monster.id && this.distance(monster.position, m.position) <= radius)) {
          m.hp -= splashDmg;
          this.addDamageNumber(m.position.x, m.position.y - 15, splashDmg, '#ef4444');
          this.addMeterDamage(hero.id, null, splashDmg);
        }
        this.spawnExplosion(monster.position.x, monster.position.y, '#ef4444', radius);
      }
    }

    // ── 제다 무기 루트: 무기 연마 (ATK +25%) ──
    if (this.hasSkill(hero.equippedSkillIds, 'zedah_weapon_mastery')) {
      dmg = Math.round(dmg * 1.25);
    }

    // ── 그렉칼 방어 루트: 방패 타격 (DEF의 50%만큼 추가 공격력) ──
    if (this.hasSkill(hero.equippedSkillIds, 'grelcal_shield_bash')) {
      dmg += Math.round(hero.def * 0.5);
    }

    // ── 케른 야성 루트: 피의 분노 (출혈 대상 피해 20% 증가) ──
    if (this.hasSkill(hero.equippedSkillIds, 'kaern_blood_frenzy') && monster.isBleed) {
      dmg = Math.round(dmg * 1.20);
    }
    // ── 야성의 심판 (unique_kaern_feral): 출혈 대상 ATK×{value}% 추가 피해 ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_kaern_feral') && monster.isBleed) {
      dmg += Math.round(hero.atk * (hero.uniqueSkillValue ?? 15) / 100);
    }

    // ── 다울가르 냉기 타격 (daulgard_frost_strike): {value}% 확률로 ATK×2 추가 냉기 피해 ──
    if (this.hasSkill(hero.equippedSkillIds, 'daulgard_frost_strike')) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const frostDmg = Math.round(hero.atk * 2);
        dmg += frostDmg;
        this.addDamageNumber(monster.position.x, monster.position.y - 30, frostDmg, '#0ea5e9');
      }
    }

    // ── 다울가르 죽음의 일격 (daulgard_blood_death_strike): {value}% 확률로 ATK×4 흡혈 공격 ──
    if (this.hasSkill(hero.equippedSkillIds, 'daulgard_blood_death_strike')) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const dsDmg = Math.round(hero.atk * 4);
        dmg += dsDmg;
        this.addDamageNumber(monster.position.x, monster.position.y - 25, dsDmg, '#b91c1c');
        const dsHeal = Math.round(dsDmg * 0.5); // 50% 흡혈
        this.applyDirectHeal(hero, hero, dsHeal, 'hero', '#b91c1c', false);
      }
    }

    // ── 다울가르 냉기의 가피 (unique_daulgard_frost): 냉기 공격 시 {value}% 확률로 2초 빙결 ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_daulgard_frost') && hero.elementName === '서리' && !monster.immuneToCc) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        monster.isStunned = true;
        monster.stunTimer = Math.max(monster.stunTimer, 2.0);
      }
    }

    // ── 다울가르 피의 결속 (unique_daulgard_blood): 피해량 {value}% 흡혈 ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_daulgard_blood')) {
      const bloodHeal = Math.round(dmg * (hero.uniqueSkillValue ?? 15) / 100);
      if (bloodHeal > 0) {
        this.applyDirectHeal(hero, hero, bloodHeal, 'hero', '#ef4444', false);
      }
    }

    // ── 노스훼라투 심판의 칼날 (nost_ret_blade_of_justice): {value}% 확률로 ATK×3 강력한 일격 ──
    if (this.hasSkill(hero.equippedSkillIds, 'nost_ret_blade_of_justice')) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const critDmg = Math.round(hero.atk * 3);
        dmg += critDmg;
        this.addDamageNumber(monster.position.x, monster.position.y - 25, critDmg, '#d97706');
      }
    }

    // ── 노스훼라투 신성 질타 (unique_nost_retribution): {value}% 확률로 ATK×2 추가 신성 피해 ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_nost_retribution')) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const holyDmg = Math.round(hero.atk * 2);
        dmg += holyDmg;
        this.addDamageNumber(monster.position.x, monster.position.y - 30, holyDmg, '#fbbf24');
      }
    }

    // ── 샹화 운무 직조 (unique_xianghua_mistweaver): 공격 시 {value}% 스마트 힐 ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_xianghua_mistweaver')) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const smartTarget = this.state.heroes.filter(h => h.isAlive && h.hp < h.maxHp)
          .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp))[0];
        if (smartTarget) {
          const smartHeal = Math.round(hero.atk * 1.5);
          this.applyDirectHeal(hero, smartTarget, smartHeal, 'hero', '#06b6d4', true);
        }
      }
    }

    // ── 예슈탈키온 신성 응보 (unique_yesh_retribution): 최후의 심판 후 5초간 {value}% 추뎀 ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_yesh_retribution')) {
      if ((hero.skillTimers?.['yesh_ret_buff'] ?? 0) > 0) {
        const bonusDmg = Math.round(dmg * (hero.uniqueSkillValue ?? 20) / 100);
        dmg += bonusDmg;
        this.addDamageNumber(monster.position.x, monster.position.y - 35, bonusDmg, '#fbbf24');
      }
    }

    // ── 퀸차이 해오름차기 (quinchai_ww_kick): {value}% 확률로 ATK×2.5 피해 ──
    if (this.hasSkill(hero.equippedSkillIds, 'quinchai_ww_kick')) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const kickDmg = Math.round(hero.atk * 2.5);
        dmg += kickDmg;
        this.addDamageNumber(monster.position.x, monster.position.y - 35, kickDmg, '#0ea5e9');
      }
    }

    // ── 퀸차이 취호의 가피 (unique_quinchai_windwalker): {value}% 확률로 2연타 ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_quinchai_windwalker')) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const extraHit = this.calculateDamage(hero.atk, effDef);
        monster.hp -= extraHit;
        this.addMeterDamage(hero.id, null, extraHit);
        this.addDamageNumber(monster.position.x + 15, monster.position.y - 10, extraHit, hero.color);
      }
    }

    // ── 롬바르도 혼돈의 일격 (lomb_havoc_chaos_strike): {value}% 확률로 ATK×3 피해 ──
    if (this.hasSkill(hero.equippedSkillIds, 'lomb_havoc_chaos_strike')) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const chaosDmg = Math.round(hero.atk * 3);
        dmg += chaosDmg;
        this.addDamageNumber(monster.position.x, monster.position.y - 30, chaosDmg, '#a855f7');
      }
    }

    // ── 롬바르도 혼돈의 가피 (unique_lomb_havoc): {value}% 확률로 ATK×2 추가 혼돈 피해 ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_lomb_havoc')) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const extraChaos = Math.round(hero.atk * 2);
        dmg += extraChaos;
        this.addDamageNumber(monster.position.x, monster.position.y - 35, extraChaos, '#7e22ce');
      }
    }

    // ── 무영삵 칼날 난무 (muyeong_outlaw_flurry): {value}% 확률로 주변 50% 복제 피해 ──
    if (this.hasSkill(hero.equippedSkillIds, 'muyeong_outlaw_flurry')) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const splashDmg = Math.round(dmg * 0.5);
        const splashTargets = this.state.monsters.filter(m => m.isAlive && m.id !== monster.id && this.distance(monster.position, m.position) <= 120);
        for (const st of splashTargets) {
          st.hp -= splashDmg;
          this.addMeterDamage(hero.id, null, splashDmg);
          this.addDamageNumber(st.position.x, st.position.y - 15, splashDmg, '#fb923c');
        }
      }
    }

    // ── 무영삵 절단 (muyeong_ass_mutilate): {value}% 확률로 ATK×3 피해 ──
    if (this.hasSkill(hero.equippedSkillIds, 'muyeong_ass_mutilate')) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const mutiDmg = Math.round(hero.atk * 3);
        dmg += mutiDmg;
        this.addDamageNumber(monster.position.x, monster.position.y - 30, mutiDmg, '#4ade80');
      }
    }

    // ── 무영삵 절개 (muyeong_sub_eviscerate): {value}% 확률로 ATK×5 피해 ──
    if (this.hasSkill(hero.equippedSkillIds, 'muyeong_sub_eviscerate')) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const evisDmg = Math.round(hero.atk * 5);
        dmg += evisDmg;
        this.addDamageNumber(monster.position.x, monster.position.y - 35, evisDmg, '#8b5cf6');
      }
    }

    // ── 무영삵 뼈 굴리기 (unique_muyeong_outlaw): {value}% 확률로 10초간 피해 30% 증가 ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_muyeong_outlaw')) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        // 단순하게 즉발 딜 증가로 처리하거나 버프 스택 (생략)
        dmg = Math.round(dmg * 1.3);
      }
    }

    // ── 무영삵 암살 (unique_muyeong_assassination): {value}% 확률로 강력한 독 (3초간 ATK×1.0) ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_muyeong_assassination')) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        monster.isBleed = true;
        monster.bleedTimer = 3.0;
        monster.bleedDmg = Math.round(hero.atk * 1.0);
      }
    }

    // ── 울트리온 파열: 파멸의 기운 (unique_ultrion_devastation) ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_ultrion_devastation')) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const aoeTargets = this.state.monsters.filter(m => m.isAlive && m.id !== monster.id && this.distance(monster.position, m.position) <= 100);
        const aoeDmg = Math.round(hero.atk * 2);
        this.spawnExplosion(monster.position.x, monster.position.y, '#dc2626', 100);
        for (const m of aoeTargets) {
          m.hp -= aoeDmg;
          this.addMeterDamage(hero.id, null, aoeDmg);
          this.addDamageNumber(m.position.x, m.position.y - 20, aoeDmg, '#ef4444');
        }
      }
    }

    // ── 그렉칼 무기 루트: 전사의 공세 (3타마다 {value}% 추가 피해) ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_grelcal_weapon')) {
      if (!hero.skillTimers) hero.skillTimers = {};
      const count = (hero.skillTimers['grelcal_combo_count'] ?? 0) + 1;
      hero.skillTimers['grelcal_combo_count'] = count % 3;
      if (count % 3 === 0) {
        dmg = Math.round(dmg * (1 + (hero.uniqueSkillValue ?? 30) / 100));
      }
    }

    // ── shared_berserk: HP 50% 이하 시 피해 10% 증가 (중복 장착 시 합연산) ──
    const berserkCount = this.countSkill(hero.equippedSkillIds, 'shared_berserk');
    if (berserkCount > 0 && hero.hp / hero.maxHp < 0.50) {
      dmg = Math.round(dmg * (1 + 0.10 * berserkCount));
    }

    // ── ar_gorg_avatar_ar: HP 40% 이하 시 ATK +50% ──
    if (this.hasSkill(hero.equippedSkillIds, 'ar_gorg_avatar_ar') && hero.hp / hero.maxHp < 0.40) {
      dmg = Math.round(dmg * 1.50);
    }

    // ── ar_mah_living_seed_ar: 피격 시 HP 8% 회복 (dealDamage 후 호출되는 시점에서 처리) ──
    if (this.hasSkill(hero.equippedSkillIds, 'ar_mah_living_seed_ar')) {
      const seedHeal = Math.round(hero.maxHp * 0.08);
      hero.hp = Math.min(hero.maxHp, hero.hp + seedHeal);
    }

    // ── 영혼 흡수 (Drain Soul) 처형 메카닉 ──
    const hasDrainSoul = this.hasSkill(hero.equippedSkillIds, 'feldah_drain_soul') ?? false;
    if (hasDrainSoul && monster.monsterType !== 'boss' && (monster.hp / monster.maxHp) < 0.35) {
      dmg = monster.hp; // 즉사
    } else if (this.hasSkill(hero.equippedSkillIds, 'zedah_execute_instinct') && monster.hp / monster.maxHp < 0.30) {
      // 집행자: HP 30% 이하 적에게 공격력 2배
      dmg *= 2;
    } else if (hero.role === 'melee_dps' && monster.hp / monster.maxHp < (execThreshold + mtb.executePct / 100)) {
      // 일반 근딜 처형 (기존 + 그림자 스택 보너스)
      dmg *= 3;
    }

    // ── 제 2의 벽: 흡혈 오라 (Blood Vampire Aura) ──
    const bloodVampPct = this.state.walls.at(-1)!.talents?.bloodVampireAura || 0;
    if (bloodVampPct > 0) {
      const distToWall = Math.min(
        ...this.state.walls.map(w => Math.abs(monster.position.x - w.position.x))
      );
      if (distToWall <= (WALL_AGGRO_RANGE + 50)) {
        const vampHeal = Math.round(dmg * (bloodVampPct / 100));
        if (vampHeal > 0) {
          for (const w of this.state.walls) {
            w.hp = Math.min(w.maxHp, w.hp + vampHeal);
          }
        }
      }
    }

    // ── 철갑 피부: 모든 공격 1 데미지 고정 ──
    if (monster.ironSkin) dmg = 1;

    monster.hp -= dmg;
    const color = hero.role === 'melee_dps' ? COLORS.melee_dps :
                  hero.role === 'ranged_dps' ? COLORS.ranged_dps : '#FFFFFF';
    this.addDamageNumber(monster.position.x, monster.position.y - 15, dmg, color);
    this.addMeterDamage(hero.id, null, dmg);

    // 위협 생성: 딜량 × threatMult
    this.addThreat(hero, monster, dmg, 'hero');

    // Lifesteal (시너지 기반)
    if (lifestealMult > 0) {
      const healAmt = Math.round(dmg * lifestealMult);
      if (healAmt > 0) {
        hero.hp = Math.min(hero.maxHp, hero.hp + healAmt);
      }
    }

    // ── shared_lifesteal: 스킬 기반 흡혈 15% (중복 장착 시 합연산) ──
    const lifestealCount = this.countSkill(hero.equippedSkillIds, 'shared_lifesteal');
    if (lifestealCount > 0) {
      const healAmt = Math.round(dmg * 0.15 * lifestealCount);
      if (healAmt > 0) hero.hp = Math.min(hero.maxHp, hero.hp + healAmt);
    }

    // ── 롬바르도 파멸 루트: 탈태 흡혈 (25%) ──
    if (this.hasSkill(hero.equippedSkillIds, 'lomb_havoc_metamorphosis')) {
      const timer = hero.skillTimers?.['lomb_havoc_metamorphosis'] ?? 0;
      const cooldown = SKILL_COOLDOWNS['lomb_havoc_metamorphosis'] || 20;
      if (timer > cooldown - 10) {
        const metaHeal = Math.round(dmg * 0.25);
        if (metaHeal > 0) this.applyDirectHeal(hero, hero, metaHeal, 'hero', '#a855f7', false);
      }
    }

    // ── 전투의 토템 (unique_seori_enhancement): {value}% 확률로 ATK×2 추가 자연 피해 ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_seori_enhancement') && monster.isAlive) {
      if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
        const natureDmg = Math.round(hero.atk * 2);
        monster.hp -= natureDmg;
        this.addMeterDamage(hero.id, null, natureDmg);
        this.addDamageNumber(monster.position.x, monster.position.y - 28, natureDmg, '#22c55e');
        if (monster.hp <= 0) { monster.hp = 0; monster.isAlive = false; this.addScore(getMonsterScore(monster, 1)); this.addGold(getMonsterGold(monster, 1)); }
      }
    }

    // ── 용암 채찍 (seori_lava_lash): 공격마다 ATK 30% 화염 추가 피해 ──
    if (this.hasSkill(hero.equippedSkillIds, 'seori_lava_lash') && monster.isAlive) {
      const lavaDmg = Math.round(hero.atk * 0.30);
      monster.hp -= lavaDmg;
      this.addMeterDamage(hero.id, null, lavaDmg);
      this.addDamageNumber(monster.position.x, monster.position.y - 22, lavaDmg, '#ea580c');
      if (monster.hp <= 0) { monster.hp = 0; monster.isAlive = false; this.addScore(getMonsterScore(monster, 1)); this.addGold(getMonsterGold(monster, 1)); }
    }

    // ── 갈퀴 발톱 (kaern_rake): 공격마다 3초 출혈 DoT 부여 ──
    if (this.hasSkill(hero.equippedSkillIds, 'kaern_rake') && monster.isAlive) {
      monster.isBleed = true;
      monster.bleedTimer = 3.0;
      monster.bleedDmg = Math.round(hero.atk * 0.5);
    }

    // ── 독 칼날 (pilji_serpent_sting): 공격마다 3초 독 DoT 부여 ──
    if (this.hasSkill(hero.equippedSkillIds, 'pilji_serpent_sting') && monster.isAlive) {
      monster.isBleed = true;
      monster.bleedTimer = 3.0;
      monster.bleedDmg = Math.round(hero.atk * 0.5);
    }

    // ── 독화살 (pilji_poison_arrow): 공격마다 3초 독 DoT 부여 ──
    if (this.hasSkill(hero.equippedSkillIds, 'pilji_poison_arrow') && monster.isAlive) {
      if (!monster.isBleed || (monster.bleedTimer ?? 0) < 3.0) {
        monster.isBleed = true;
        monster.bleedTimer = 3.0;
        monster.bleedDmg = Math.round(hero.atk * 0.4);
      }
    }

    // ── 생존술사 (unique_pilji_survival): 근접 공격 시 {value}% 추가 자연 피해 ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_pilji_survival') && monster.isAlive) {
      const natureDmg = Math.round(hero.atk * (hero.uniqueSkillValue ?? 15) / 100);
      monster.hp -= natureDmg;
      this.addMeterDamage(hero.id, null, natureDmg);
      this.addDamageNumber(monster.position.x, monster.position.y - 28, natureDmg, '#4ade80');
      if (monster.hp <= 0) { monster.hp = 0; monster.isAlive = false; this.addScore(getMonsterScore(monster, 1)); this.addGold(getMonsterGold(monster, 1)); }
    }

    // ── 열화 도검 (zedah_heat_blade): 공격 시 ATK 20% 추가 화염 피해 ──
    if (this.hasSkill(hero.equippedSkillIds, 'zedah_heat_blade') && monster.isAlive) {
      const fireDmg = Math.round(hero.atk * 0.20);
      monster.hp -= fireDmg;
      this.addDamageNumber(monster.position.x, monster.position.y - 25, fireDmg, '#f97316');
      this.addMeterDamage(hero.id, null, fireDmg);
    }

    // ── 지옥불 도검 (unique_zedah_weapon): 3타마다 ATK×uniqueSkillValue% 추가 화염 피해 ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_zedah_weapon')) {
      if (!hero.skillTimers) hero.skillTimers = {};
      const count = (hero.skillTimers['zedah_combo_count'] ?? 0) + 1;
      hero.skillTimers['zedah_combo_count'] = count % 3;
      if (count % 3 === 0 && monster.isAlive) {
        const comboDmg = Math.round(hero.atk * (hero.uniqueSkillValue ?? 50) / 100);
        monster.hp -= comboDmg;
        this.addDamageNumber(monster.position.x, monster.position.y - 30, comboDmg, '#ea580c');
        this.addMeterDamage(hero.id, null, comboDmg);
      }
    }

    // ── 벽 특성 런타임 효과 (근딜·탱커 전용) ──
    if (isMeleeTank) {
      // 혈액 스택: 흡혈
      if (mtb.lifestealPct > 0) {
        const wallLS = Math.round(dmg * mtb.lifestealPct / 100);
        if (wallLS > 0) hero.hp = Math.min(hero.maxHp, hero.hp + wallLS);
      }
      // 자연 스택: 독 추가 피해
      if (mtb.poisonOnHit > 0 && monster.isAlive) {
        monster.hp -= mtb.poisonOnHit;
        this.addDamageNumber(monster.position.x, monster.position.y - 25, mtb.poisonOnHit, '#84CC16');
        this.addMeterDamage(hero.id, null, mtb.poisonOnHit);
      }
    }

    if (monster.hp <= 0) {
      monster.hp = 0;
      monster.isAlive = false;
      this.addScore(getMonsterScore(monster, 1));
      this.addGold(getMonsterGold(monster, 1));
      // 생명 스택: 처치 시 HP 회복
      if (isMeleeTank && mtb.healOnKill > 0) {
        hero.hp = Math.min(hero.maxHp, hero.hp + mtb.healOnKill);
        this.addDamageNumber(hero.position.x, hero.position.y - 20, mtb.healOnKill, '#22C55E', true);
      }

      // ── 리아시안/라리시안 피의 포식 (unique_liasian_feast / unique_larisian_feast): 처치 시 HP {value}% 회복 ──
      const feastSkill = skills.find(s => s === 'unique_liasian_feast' || s === 'unique_larisian_feast');
      if (feastSkill) {
        const healAmt = Math.round(hero.maxHp * (hero.uniqueSkillValue ?? 15) / 100);
        hero.hp = Math.min(hero.maxHp, hero.hp + healAmt);
        this.addDamageNumber(hero.position.x, hero.position.y - 25, healAmt, '#22c55e', true);
      }
    }

    // 폭풍 스택: 근딜 광역 공격 (타겟 주변 AoE 50% 피해)
    if (hero.role === 'melee_dps' && mtb.meleeCleaveRadius > 0) {
      const cleaveDmg = Math.round(dmg * 0.5);
      if (cleaveDmg > 0) {
        for (const m of this.state.monsters) {
          if (!m.isAlive || m.id === monster.id) continue;
          if (this.distance(monster.position, m.position) <= mtb.meleeCleaveRadius) {
            m.hp -= cleaveDmg;
            this.addDamageNumber(m.position.x, m.position.y - 10, cleaveDmg, '#F97316');
            this.addMeterDamage(hero.id, null, cleaveDmg);
            if (m.hp <= 0) {
              m.hp = 0;
              m.isAlive = false;
              this.addScore(getMonsterScore(m, 1));
              this.addGold(getMonsterGold(m, 1));
              if (mtb.healOnKill > 0) {
                hero.hp = Math.min(hero.maxHp, hero.hp + mtb.healOnKill);
              }
            }
          }
        }
      }
    }
  }

  private checkGameOver() {
    if (!this.state.heroes.some(h => h.isAlive)) {
      this.spawnExplosion(this.state.walls.at(-1)!.position.x, this.state.walls.at(-1)!.position.y, '#8B5CF6', 70);
      this.state.phase = 'defeat';
    }
  }

  private monsterAttack(monster: GameMonster, target: GameHero | GameSummon, type: 'hero' | 'summon') {
    const voidWeaken = this.state.walls.at(-1)!.talents?.voidWeaken || 0;
    const effAtk = voidWeaken > 0 ? Math.round(monster.atk * (1 - voidWeaken / 100)) : monster.atk;
    
    // ── 분산 피해 (Split Damage) 로직 ──
    if (monster.hasSplitDamage) {
      const RADIUS = 100;
      const allies = [...this.state.heroes.filter(h => h.isAlive), ...this.state.summons.filter(s => s.isAlive)];
      const targetsInRange = allies.filter(a => this.distance(target.position, a.position) <= RADIUS);
      const targetCount = Math.max(1, targetsInRange.length);
      
      const sharedAtk = effAtk / targetCount;
      for (const t of targetsInRange) {
        let dmg = this.calculateDamage(sharedAtk, t.def);
        // 피감 스킬 적용 (단순화)
        if ('equippedSkillIds' in t && this.hasSkill((t as GameHero).equippedSkillIds, 'unique_arthur_protection')) {
          dmg = Math.round(dmg * 0.8);
        }
        t.hp -= dmg;
        this.addDamageNumber(t.position.x, t.position.y - 20, dmg, '#F97316');
        if (t.hp <= 0) {
          if ('isProtagonist' in t) {
            if (!this.tryReviveHero(t as GameHero)) { (t as GameHero).hp = 0; (t as GameHero).isAlive = false; this.checkGameOver(); }
          } else { t.hp = 0; (t as GameSummon).isAlive = false; }
        }
      }
      if (targetCount >= 3) {
        this.addBossLog(`${monster.displayName}의 강력한 공격을 ${targetCount}명이 분산해서 막아냈습니다!`);
      } else {
        this.addBossLog(`${monster.displayName}의 공격이 집중되어 치명적인 피해를 입었습니다! (현재 ${targetCount}명)`);
      }
      return; // 분산 피해 처리 시 일반 공격 로직 스킵
    }

    const rawDmg = this.calculateDamage(effAtk, target.def);

    // ── 노스훼라투 보호 루트: 고대 왕의 수호자 (25초 쿨, 10초 지속 효과) ──
    // ── 퀸차이 양조 루트: 철벽주 (15초 쿨, 8초 지속 효과) ──
    let finalDmgMult = 1.0;
    if (type === 'hero') {
      const h = target as GameHero;
      const skills = h.equippedSkillIds ?? [];
      // 고대 왕의 수호자 (팔라딘)
      if (this.hasSkill(skills, 'nost_prot_guardian_king')) {
        const timer = h.skillTimers?.['nost_prot_guardian_king'] ?? 0;
        const cooldown = SKILL_COOLDOWNS['nost_prot_guardian_king'] || 25;
        if (timer > cooldown - 10) finalDmgMult *= 0.5;
      }
      // 철벽주 (수도사)
      if (this.hasSkill(skills, 'quinchai_bm_iron_skin')) {
        const timer = h.skillTimers?.['quinchai_bm_iron_skin'] ?? 0;
        const cooldown = SKILL_COOLDOWNS['quinchai_bm_iron_skin'] || 15;
        if (timer > cooldown - 8) finalDmgMult *= 0.7; // 30% 피감
      }
      // 탈태 (악마사냥꾼 - 파멸)
      if (this.hasSkill(skills, 'lomb_havoc_metamorphosis')) {
        const timer = h.skillTimers?.['lomb_havoc_metamorphosis'] ?? 0;
        const cooldown = SKILL_COOLDOWNS['lomb_havoc_metamorphosis'] || 20;
        if (timer > cooldown - 10) finalDmgMult *= 0.8; // 20% 피감
      }
      // 악마의 쐐기 (악마사냥꾼 - 복수)
      if (this.hasSkill(skills, 'lomb_ven_demon_spikes')) {
        const timer = h.skillTimers?.['lomb_ven_demon_spikes'] ?? 0;
        const cooldown = SKILL_COOLDOWNS['lomb_ven_demon_spikes'] || 15;
        if (timer > cooldown - 6) finalDmgMult *= 0.8; // 20% 피감
      }
      // 칼날의 춤 (회피)
      if (this.hasSkill(skills, 'lomb_havoc_blade_dance')) {
        const timer = h.skillTimers?.['lomb_havoc_blade_dance'] ?? 0;
        const cooldown = SKILL_COOLDOWNS['lomb_havoc_blade_dance'] || 8;
        if (timer > cooldown - 1.0) finalDmgMult = 0; // 100% 회피
      }
    }

    const finalRawDmg = Math.round(rawDmg * finalDmgMult);

    // ── 보호막 흡수 ──
    let dmg = finalRawDmg;
    const shield = this.state.shields.find(s => s.targetId === target.id && s.targetType === type);
    if (shield && shield.amount > 0) {
      const absorbed = Math.min(shield.amount, dmg);
      shield.amount -= absorbed;
      dmg -= absorbed;
      if (absorbed > 0) {
        this.addDamageNumber(target.position.x, target.position.y - 32, absorbed, '#FBBF24', false);
        if (shield.casterId !== undefined) this.addMeterShield(shield.casterId, absorbed);
      }
    }

    // ── 노스훼라투 보호 루트: 빛의 수호 (피격 시 {value}% 확률 보호막) ──
    if (type === 'hero') {
      const h = target as GameHero;
      if (this.hasSkill(h.equippedSkillIds, 'unique_nost_protection') && Math.random() < (h.uniqueSkillValue ?? 15) / 100) {
        this.applyShield(h, Math.round(h.maxHp * 0.15), 'hero', 3, h.id);
        this.state.healingFlashes.push({ x: h.position.x, y: h.position.y, timer: 0.3, color: '#fbbf24' });
      }
    }

    // ── 롬바르도 복수 루트: 영혼 흡수 (피격 시 {value}% 확률 파편/회복) ──
    if (type === 'hero') {
      const h = target as GameHero;
      if (this.hasSkill(h.equippedSkillIds, 'unique_lomb_vengeance') && Math.random() < (h.uniqueSkillValue ?? 15) / 100) {
        const recover = Math.round(h.maxHp * 0.05);
        this.applyDirectHeal(h, h, recover, 'hero', '#22c55e', false);
        this.addDamageNumber(h.position.x, h.position.y - 30, recover, '#22c55e', true);
      }
    }

    // ── 퀸차이 양조 루트: 시간차 (unique_quinchai_brewmaster) ──
    if (type === 'hero' && dmg > 0) {
      const h = target as GameHero;
      if (this.hasSkill(h.equippedSkillIds, 'unique_quinchai_brewmaster')) {
        const staggerPct = (h.uniqueSkillValue ?? 15);
        const staggeredDmg = Math.round(dmg * staggerPct / 100);
        dmg -= staggeredDmg;
        // 10초간 도트로 나누어 받음 (applyHoT는 힐용이므로, 음수 값을 주면 도트 데미지가 됨)
        // 1초마다 틱, 총 10틱
        this.applyHoT(h, -Math.round(staggeredDmg / 10), 10, 'hero', '#d97706');
      }
    }

    if (dmg > 0) target.hp -= dmg;
    if (dmg > 0) this.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#EF4444');
    if (type === 'hero') this.addMeterDamageTaken((target as GameHero).id, dmg);

    // ── 전방 광역 공격 (Cleave) ──
    if (monster.hasCleave) {
      const cleaveRadius = 80;
      const cleaveRatio = 0.6; // 메인 타겟 피해의 60%
      for (const h of this.state.heroes) {
        if (h.isAlive && h.id !== (type === 'hero' ? target.id : -1)) {
          if (this.distance(target.position, h.position) <= cleaveRadius) {
            const cleaveDmg = Math.round(dmg * cleaveRatio);
            h.hp -= cleaveDmg;
            this.addDamageNumber(h.position.x, h.position.y - 15, cleaveDmg, '#F87171');
            if (h.hp <= 0) { if (!this.tryReviveHero(h)) { h.hp = 0; h.isAlive = false; this.checkGameOver(); } }
          }
        }
      }
    }

    // ── 영혼석 무적: 이 영웅은 HP가 1 미만으로 내려가지 않음 ──
    if (type === 'hero' && (target as GameHero).isInvincible && target.hp <= 0) {
      target.hp = 1;
      this.addDamageNumber(target.position.x, target.position.y - 40, 0, '#FFD700', true);
      return;
    }

    if (target.hp <= 0) {
      // 부활의 빛: 영웅 최초 사망 시 부활
      if (type === 'hero' && this.tryReviveHero(target as GameHero)) return;

      target.hp = 0;
      target.isAlive = false;

      // 폭발 이펙트
      this.spawnExplosion(target.position.x, target.position.y, target.color, target.size * 3.5);
      
      // 어그로 테이블 정리
      const targetKey = `${type}:${target.id}`;
      for (const m of this.state.monsters) {
        delete m.aggroTable[targetKey];
        if (m.targetId === target.id && m.targetType === type) {
          const next = this.getTopThreatTarget(m);
          m.targetId = next?.id ?? null;
          m.targetType = next?.type ?? null;
        }
      }

      if (type === 'hero') {
        // 전멸 패배 조건: 살아있는 영웅이 없으면 게임 오버
        if (!this.state.heroes.some(h => h.isAlive)) {
          this.spawnExplosion(this.state.walls.at(-1)!.position.x, this.state.walls.at(-1)!.position.y, '#8B5CF6', 70);
          this.state.phase = 'defeat';
        }
      } else {
        // 소환수 재소환 스케줄
        const summon = target as GameSummon;
        const key = `${summon.summonerId}:${summon.skillId}`;
        if (!this.summonRespawnTimers.has(key)) {
          this.summonRespawnTimers.set(key, 10);
        }
      }
    } else {
      // ── 반사(Reflect) 로직 (영웅 전용) ──
      if (type === 'hero') {
        const hero = target as GameHero;
        const skills = hero.equippedSkillIds ?? [];
        let reflectPct = 0;
        // ── 신성한 방호 (unique_dizgar_discipline): HP 30% 이하 {value}% 확률로 최대HP 15% 즉시 회복 ──
        if (this.hasSkill(skills, 'unique_dizgar_discipline')) {
          const postHp = hero.hp - dmg;
          if (postHp / hero.maxHp < 0.30 && Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
            const recovery = Math.round(hero.maxHp * 0.15);
            hero.hp = Math.min(hero.maxHp, hero.hp + recovery);
            this.addDamageNumber(hero.position.x, hero.position.y - 30, recovery, '#fbbf24', true);
            this.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 0.4, color: '#fbbf24' });
          }
        }

        // ── 전사의 의지 (unique_grelcal_defense): {value}% 확률로 피해 50% 무효화 ──
        if (this.hasSkill(skills, 'unique_grelcal_defense')) {
          const blockProb = (hero.uniqueSkillValue ?? 20) / 100;
          if (Math.random() < blockProb) {
            dmg = Math.round(dmg * 0.5);
          }
        }
        // ── 철벽 (grelcal_iron_wall): 받는 피해 15% 감소 ──
        if (this.hasSkill(skills, 'grelcal_iron_wall')) {
          dmg = Math.round(dmg * 0.85);
        }

        if (this.hasSkill(skills, 'unique_zedah_defense')) {
          reflectPct += (hero.uniqueSkillValue ?? 20) / 100;
          if (this.hasSkill(skills, 'zedah_thorn_edge')) reflectPct += 0.15;
        }
        if (this.hasSkill(skills, 'unique_anub_protection')) reflectPct += 0.25;

        // ── 아서 방패 막기 (unique_arthur_protection): 받는 물리 피해 {value}% 감소 ──
        if (this.hasSkill(skills, 'unique_arthur_protection')) {
          dmg = Math.round(dmg * (1 - (hero.uniqueSkillValue ?? 15) / 100));
        }
        // ── 이렐 헌신적인 수호자 (unique_yrel_protection): 받는 피해 {value}% 감소 ──
        if (this.hasSkill(skills, 'unique_yrel_protection')) {
          dmg = Math.round(dmg * (1 - (hero.uniqueSkillValue ?? 15) / 100));
        }
        // ── 첸 교묘한 투사 (unique_chen_brewmaster): 피해 {value}% 확률 무효화 ──
        if (this.hasSkill(skills, 'unique_chen_brewmaster')) {
          if (Math.random() < (hero.uniqueSkillValue ?? 20) / 100) {
            dmg = 0;
            this.addDamageNumber(hero.position.x, hero.position.y - 20, 0, '#60a5fa', false); // Miss 표시 대체
          }
        }

        // ── 가시덩굴 (kaern_thorns): 피격 시 ATK 25% 반사 ──
        if (this.hasSkill(skills, 'kaern_thorns')) reflectPct += 0.25;
        // ── 생존 본능 (kaern_survival_instincts): HP 40% 이하 시 피해 30% 감소 ──
        if (this.hasSkill(skills, 'kaern_survival_instincts') && hero.hp / hero.maxHp < 0.40) {
          dmg = Math.round(dmg * 0.70);
        }
        // ── 번개 보호막 (seori_lightning_shield): 피격 시 ATK 20% 번개 반사 ──
        if (this.hasSkill(skills, 'seori_lightning_shield')) {
          reflectPct += 0.20;
        }
        // ── 대지 방패 (cheondung_earth_shield): 피격 시 50% 확률로 HoT 부여 ──
        if (this.hasSkill(skills, 'cheondung_earth_shield') && Math.random() < 0.5) {
          this.applyHoT(hero, Math.round(hero.atk * 0.3), 3, 'hero', '#4ade80');
        }
        // ── 물의 방패 (seori_water_shield): 피격 시 ATK 15% 자가 치유 ──
        if (this.hasSkill(skills, 'seori_water_shield')) {
          const waterHeal = Math.round(hero.atk * 0.15);
          if (waterHeal > 0) {
            hero.hp = Math.min(hero.maxHp, hero.hp + waterHeal);
            this.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 0.2, color: '#06b6d4' });
          }
        }
        // ── 정령 연결 (seori_spirit_link): 피해 감소 타이머 ──
        if (hero.dmgReducePct && hero.dmgReduceTimer && hero.dmgReduceTimer > 0) {
          dmg = Math.round(dmg * (1 - hero.dmgReducePct));
        }
        // 전기 스택: 근딜·탱커 반사 (벽 특성)
        // ── 부두 인형 (unique_rakan_shadow): 받는 피해 {value}% 반사 ──
      if (this.hasSkill(skills, 'unique_rakan_shadow')) {
        reflectPct += (hero.uniqueSkillValue ?? 15) / 100;
      }
      // ── 붉은 갈증 (unique_lian_blood): 피격 시 {value}% 확률로 잃은 체력 10% 회복 ──
      if (this.hasSkill(skills, 'unique_lian_blood')) {
        if (Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
          const healAmt = Math.round((hero.maxHp - hero.hp) * 0.1);
          if (healAmt > 0) {
            hero.hp = Math.min(hero.maxHp, hero.hp + healAmt);
            this.addDamageNumber(hero.position.x, hero.position.y - 25, healAmt, '#22c55e', true);
          }
        }
      }

      if ((hero.role === 'melee_dps' || hero.role === 'tank') && this.state.meleeTankBonuses.reflectPct > 0) {
          reflectPct += this.state.meleeTankBonuses.reflectPct / 100;
        }

        if (reflectPct > 0) {
          const reflectDmg = Math.round(dmg * reflectPct);
          if (reflectDmg > 0) {
            monster.hp -= reflectDmg;
            this.addDamageNumber(monster.position.x, monster.position.y - 15, reflectDmg, '#A855F7');
            this.addMeterDamage(hero.id, null, reflectDmg);
            if (monster.hp <= 0) {
               monster.hp = 0;
               monster.isAlive = false;
               this.addScore(getMonsterScore(monster, 1));
               this.addGold(getMonsterGold(monster, 1));
            }
          }
        }

        // ── 용암 갑옷 (zedah_lava_armor): 피격 시 적에게 ATK 30% 화염 피해 ──
        if (this.hasSkill(skills, 'zedah_lava_armor')) {
          const lavaDmg = Math.round(hero.atk * 0.30);
          if (lavaDmg > 0) {
            monster.hp -= lavaDmg;
            this.addDamageNumber(monster.position.x, monster.position.y - 20, lavaDmg, '#f97316');
            this.addMeterDamage(hero.id, null, lavaDmg);
            if (monster.hp <= 0) {
              monster.hp = 0;
              monster.isAlive = false;
              this.addScore(getMonsterScore(monster, 1));
              this.addGold(getMonsterGold(monster, 1));
            }
          }
        }

      }
      // ── 반사(Reflect) 로직 (소환수: 근딜·탱커 전기 스택) ──
      if (type === 'summon') {
        const summon = target as GameSummon;
        const reflectPct = (summon.role === 'melee_dps' || summon.role === 'tank')
          ? this.state.meleeTankBonuses.reflectPct / 100
          : 0;
        if (reflectPct > 0) {
          const reflectDmg = Math.round(dmg * reflectPct);
          if (reflectDmg > 0) {
            monster.hp -= reflectDmg;
            this.addDamageNumber(monster.position.x, monster.position.y - 15, reflectDmg, '#A855F7');
            this.addMeterDamage(summon.summonerId, summon.skillId, reflectDmg);
            if (monster.hp <= 0) {
              monster.hp = 0;
              monster.isAlive = false;
              this.addScore(getMonsterScore(monster, 1));
              this.addGold(getMonsterGold(monster, 1));
            }
          }
        }
      }
    }
  }
  // ── 데미지 미터 헬퍼 ──────────────────────────────────────────
  public static readonly WALL_METER_ID = -1;
  private static readonly WALL_METER_COLOR = '#8B5CF6';

  private getMeterEntry(heroId: number): HeroMeterEntry | undefined {
    return this.state.meter.find(e => e.heroId === heroId);
  }

  private getOrCreateWallEntry(): HeroMeterEntry {
    let entry = this.getMeterEntry(GameEngine.WALL_METER_ID);
    if (!entry) {
      entry = { heroId: GameEngine.WALL_METER_ID, heroName: 'The Wall', color: GameEngine.WALL_METER_COLOR, damage: 0, healing: 0, shieldAbsorbed: 0, damageTaken: 0, summons: [] };
      this.state.meter.push(entry);
    }
    return entry;
  }

  private addWallMeterDamage(amount: number) {
    this.getOrCreateWallEntry().damage += amount;
  }

  private addWallMeterHeal(amount: number) {
    this.getOrCreateWallEntry().healing += amount;
  }

  private addWallMeterDamageTaken(amount: number) {
    this.getOrCreateWallEntry().damageTaken += amount;
  }

  public addMeterDamage(heroId: number, skillId: string | null, amount: number) {
    const hero = this.state.heroes.find(h => h.id === heroId);
    if (!hero) return;
    let entry = this.getMeterEntry(heroId);
    if (!entry) {
      entry = { heroId, heroName: hero.name, color: hero.color, damage: 0, healing: 0, shieldAbsorbed: 0, damageTaken: 0, summons: [] };
      this.state.meter.push(entry);
    }
    if (skillId) {
      // 소환수 데미지
      const summon = this.state.summons.find(s => s.summonerId === heroId && s.skillId === skillId);
      let summonEntry = entry.summons.find(s => s.skillId === skillId);
      if (!summonEntry) {
        summonEntry = { skillId, displayName: summon?.displayName ?? skillId, color: summon?.color ?? '#FFFFFF', damage: 0 };
        entry.summons.push(summonEntry);
      }
      summonEntry.damage += amount;
    } else {
      entry.damage += amount;
    }
  }

  public addMeterHeal(heroId: number, amount: number) {
    const hero = this.state.heroes.find(h => h.id === heroId);
    if (!hero) return;
    let entry = this.getMeterEntry(heroId);
    if (!entry) {
      entry = { heroId, heroName: hero.name, color: hero.color, damage: 0, healing: 0, shieldAbsorbed: 0, damageTaken: 0, summons: [] };
      this.state.meter.push(entry);
    }
    entry.healing += amount;
  }

  private addMeterShield(heroId: number, amount: number) {
    if (heroId === GameEngine.WALL_METER_ID) {
      this.getOrCreateWallEntry().shieldAbsorbed += amount;
      return;
    }
    const hero = this.state.heroes.find(h => h.id === heroId);
    if (!hero) return;
    let entry = this.getMeterEntry(heroId);
    if (!entry) {
      entry = { heroId, heroName: hero.name, color: hero.color, damage: 0, healing: 0, shieldAbsorbed: 0, damageTaken: 0, summons: [] };
      this.state.meter.push(entry);
    }
    entry.shieldAbsorbed += amount;
  }

  public addMeterDamageTaken(heroId: number, amount: number) {
    const hero = this.state.heroes.find(h => h.id === heroId);
    if (!hero) return;
    let entry = this.getMeterEntry(heroId);
    if (!entry) {
      entry = { heroId, heroName: hero.name, color: hero.color, damage: 0, healing: 0, shieldAbsorbed: 0, damageTaken: 0, summons: [] };
      this.state.meter.push(entry);
    }
    entry.damageTaken += amount;
  }
  // ─────────────────────────────────────────────────────────────

  private calculateDamage(atk: number, def: number): number {
    const raw = Math.max(1, atk - def);
    const variance = 0.9 + Math.random() * 0.2;
    return Math.max(1, Math.round(raw * variance));
  }

  /**
   * 위협 생성: target이 monster에 baseAmount × target.threatMult 만큼 위협 추가
   */
  private addThreat(target: GameHero | GameSummon, monster: GameMonster, baseAmount: number, type: 'hero' | 'summon') {
    const threat = Math.round(baseAmount * target.threatMult);
    if (threat <= 0) return;
    
    const key = `${type}:${target.id}`;
    monster.aggroTable[key] = (monster.aggroTable[key] || 0) + threat;
    
    // 위협 추가 후 즉시 타겟 재평가
    const top = this.getTopThreatTarget(monster);
    if (top) {
      monster.targetId = top.id;
      monster.targetType = top.type;
    }
  }

  /**
   * 어그로 테이블에서 살아있는 영웅/소환수 중 위협치 1위 반환
   */
  private getTopThreatTarget(monster: GameMonster): { id: number; type: 'hero' | 'summon' } | null {
    // ── 8번 레이드: 역할 기반 우선순위 타겟팅 (암살 로직) ──
    if (monster.rolePriority) {
      const TAUNT_THREAT = 5000; // 도발 시 생성되는 최소 위협치 기준
      let taunter: { id: number; type: 'hero' | 'summon'; threat: number } | null = null;

      // 1. 도발 중인 대상이 있는지 먼저 확인
      for (const [key, threat] of Object.entries(monster.aggroTable)) {
        if (threat < TAUNT_THREAT) continue;
        const [type, idStr] = key.split(':');
        const id = parseInt(idStr);
        let alive = false;
        if (type === 'hero') alive = !!this.state.heroes.find(h => h.id === id && h.isAlive);
        else if (type === 'summon') alive = !!this.state.summons.find(s => s.id === id && s.isAlive);
        
        if (alive && (!taunter || threat > taunter.threat)) {
          taunter = { id, type: type as 'hero' | 'summon', threat };
        }
      }
      if (taunter) return { id: taunter.id, type: taunter.type };

      // 2. 도발자가 없으면 우선순위에 따라 타겟 선정 [힐러 > 메카닉 > 딜러 > 탱커]
      const allies = [
        ...this.state.heroes.filter(h => h.isAlive).map(h => ({ id: h.id, type: 'hero' as const, role: h.role, spec: h.specName, pos: h.position })),
        ...this.state.summons.filter(s => s.isAlive).map(s => ({ id: s.id, type: 'summon' as const, role: s.role || 'melee_dps', spec: s.skillId, pos: s.position }))
      ];

      // 우선순위 정의
      const getPriority = (a: any) => {
        if (a.role === 'healer') return 0;
        if (a.spec?.includes('mechanic') || a.spec?.startsWith('mechanic_')) return 1;
        if (a.role === 'ranged_dps' || a.role === 'cc' || a.role === 'melee_dps') return 2;
        return 3; // 탱커가 최하위
      };

      const sorted = allies.sort((a, b) => {
        const pA = getPriority(a);
        const pB = getPriority(b);
        if (pA !== pB) return pA - pB;
        return this.distance(monster.position, a.pos) - this.distance(monster.position, b.pos);
      });

      if (sorted.length > 0) return { id: sorted[0].id, type: sorted[0].type };
    }

    // ── 일반 타겟팅 로직 (기존 유지) ──
    let topId: number | null = null;
    let topType: 'hero' | 'summon' | null = null;
    let topThreat = 0;

    for (const [key, threat] of Object.entries(monster.aggroTable)) {
      if (threat <= 0) continue;
      const [type, idStr] = key.split(':');
      const id = parseInt(idStr);
      
      let alive = false;
      if (type === 'hero') alive = !!this.state.heroes.find(h => h.id === id && h.isAlive);
      else if (type === 'summon') alive = !!this.state.summons.find(s => s.id === id && s.isAlive);
      
      if (alive && threat > topThreat) {
        topThreat = threat;
        topId = id;
        topType = type as 'hero' | 'summon';
      }
    }
    return (topId && topType) ? { id: topId, type: topType } : null;
  }

  /**
   * 해당 몬스터의 현재 타겟이 '탱커' 역할군인지 확인
   */
  private isTargetingTank(monster: GameMonster): boolean {
    const top = this.getTopThreatTarget(monster);
    if (!top) return false;
    if (top.type === 'hero') {
      return this.state.heroes.find(h => h.id === top.id)?.role === 'tank';
    }
    if (top.type === 'summon') {
      return this.state.summons.find(s => s.id === top.id)?.role === 'tank';
    }
    return false;
  }

  // ───────────────────────────────────────────────────────
  // 벽 배열 헬퍼 (walls[0]=최외곽, walls.at(-1)=최내곽)
  // ───────────────────────────────────────────────────────

  /** 현재 살아있는 가장 바깥쪽 벽 반환 (모두 파괴 시 안쪽 벽) */
  private getActiveWall(): import('./types').Tower {
    return this.state.walls.find(w => w.hp > 0) ?? this.state.walls.at(-1)!;
  }

  /** targetId(음수) → 벽 오브젝트: walls[walls.length + id] */
  private getWallByTargetId(id: number): import('./types').Tower | undefined {
    return this.state.walls[this.state.walls.length + id];
  }

  /** 벽 오브젝트 → targetId(음수): indexOf - length */
  private getWallTargetId(wall: import('./types').Tower): number {
    return this.state.walls.indexOf(wall) - this.state.walls.length;
  }

  // ───────────────────────────────────────────────────────
  // 벽 특성 헬퍼
  // ───────────────────────────────────────────────────────

  /** 제 3의 벽 처치 시 효과 (공허 힐 + 비전 폭발) */
  private applyThirdWallOnKill(dead: GameMonster): void {
    const talents = this.state.walls.at(-1)!.talents;

    // 공허: 처치 시 벽 체력 회복
    const voidHeal = talents?.voidHealOnKill || 0;
    if (voidHeal > 0) {
      let totalHealed = 0;
      for (const w of this.state.walls) {
        const heal = Math.min(voidHeal, w.maxHp - w.hp);
        w.hp += heal;
        totalHealed += heal;
      }
      if (totalHealed > 0) {
        this.addDamageNumber(dead.position.x, dead.position.y - 30, voidHeal, '#2dd4bf', true);
        this.addWallMeterHeal(voidHeal);
      }
    }

    // 비전: 사망 시 인접 적 마법 폭발
    const arcaneExp = talents?.arcaneExplosion || 0;
    if (arcaneExp > 0) {
      const radius = 90;
      for (const m of this.state.monsters) {
        if (!m.isAlive) continue;
        if (this.distance(dead.position, m.position) <= radius) {
          m.hp -= arcaneExp;
          this.addDamageNumber(m.position.x, m.position.y - 15, arcaneExp, '#a78bfa');
          this.addWallMeterDamage(arcaneExp);
          if (m.hp <= 0) {
            m.hp = 0;
            m.isAlive = false;
            this.addGold(getMonsterGold(m, 1));            this.addScore(getMonsterScore(m, 1));
          }
        }
      }
    }
  }

  /** 스코어 획득 */
  private addScore(amount: number): void {
    this.state.score += amount;
  }

  /** 골드 획득 (goldBonusPct 적용) */
  private addGold(amount: number): void {
    const bonus = this.state.walls.at(-1)!.talents?.goldBonusPct || 0;
    this.state.goldEarned += bonus > 0 ? Math.round(amount * (1 + bonus)) : amount;
  }

  /** 영웅 사망 시 부활 가능 여부 확인. 부활했으면 true 반환 */
  private tryReviveHero(hero: GameHero): boolean {
    if (this.state.walls.at(-1)!.talents?.reviveOnce && !this.reviveUsed) {
      this.reviveUsed = true;
      hero.isAlive = true;
      hero.hp = Math.round(hero.maxHp * 0.3);
      this.addDamageNumber(hero.position.x, hero.position.y - 45, hero.hp, '#FFD700', true);
      return true;
    }
    return false;
  }

  /** 번개 반격 + 연쇄 번개 처리 */
  private applyLightningReflect(attacker: GameMonster): void {
    const talents = this.state.walls.at(-1)!.talents;
    const lightning = talents?.lightningReflect || 0;
    if (lightning <= 0) return;

    attacker.hp -= lightning;
    this.addDamageNumber(attacker.position.x, attacker.position.y - 18, lightning, '#EAB308');
    this.addWallMeterDamage(lightning);
    if (attacker.hp <= 0 && attacker.isAlive) {
      attacker.hp = 0;
      attacker.isAlive = false;
      this.addGold(getMonsterGold(attacker, 1));      this.addScore(getMonsterScore(attacker, 1));
    }

    const chains = Math.round(talents?.chainLightningCount || 0);
    if (chains <= 0) return;
    const chainDmg = Math.round(lightning * 0.6);
    const targets = this.state.monsters
      .filter(m => m.isAlive && m.id !== attacker.id)
      .sort((a, b) => this.distance(attacker.position, a.position) - this.distance(attacker.position, b.position))
      .slice(0, chains);
    for (const t of targets) {
      t.hp -= chainDmg;
      this.addDamageNumber(t.position.x, t.position.y - 15, chainDmg, '#EAB308');
      this.addWallMeterDamage(chainDmg);
      if (t.hp <= 0 && t.isAlive) {
        t.hp = 0;
        t.isAlive = false;
        this.addGold(getMonsterGold(t, 1));        this.addScore(getMonsterScore(t, 1));
      }
    }
  }

  /** 방어 모드 원거리 몬스터 → 벽으로 투사체 발사 */
  private spawnWallProjectile(monster: GameMonster, activeWall: import('./types').Tower): void {
    const wallPos = activeWall.position;
    const n = monster.name.toLowerCase();
    let type: ProjectileType;
    if (n.includes('fire') || n.includes('magma') || n.includes('lava') || n.includes('goblin') || n.includes('orc') || n.includes('troll') || n.includes('rock') || n.includes('poison') || n.includes('venom') || n.includes('plague')) {
      type = 'fireball';
    } else if (n.includes('ice') || n.includes('frost') || n.includes('crystal') || n.includes('bone') || n.includes('wind')) {
      type = 'frostbolt';
    } else {
      type = 'shadow_bolt';
    }
    const talents = activeWall.talents;
    const defBonus   = talents?.defBonus || 0;
    const voidWeaken = talents?.voidWeaken || 0;
    const effAtk = voidWeaken > 0 ? Math.round(monster.atk * (1 - voidWeaken / 100)) : monster.atk;
    // 무한모드 30웨이브 이후: 벽에 대한 추가 복리 배율
    const wallProjWave = this.state.currentWave;
    const wallProjInfMult = wallProjWave > 30 ? Math.pow(1.005, wallProjWave - 30) : 1;
    const dmg = Math.max(1, Math.round(effAtk * wallProjInfMult) - (5 + defBonus));
    this.state.projectiles.push({
      id: this.state.nextProjectileId++,
      monsterId: monster.id,
      targetId: this.getWallTargetId(activeWall),
      targetType: 'wall',
      wallTarget: { x: wallPos.x, y: wallPos.y },
      position: { x: monster.position.x, y: monster.position.y },
      damage: dmg,
      speed: 5.5,
      type,
      color: type === 'fireball' ? '#FF6B1A' : type === 'frostbolt' ? '#67E8F9' : '#A855F7',
      size: 6,
    });
    monster.attackTimer = monster.attackCooldown;
  }

  /** 근접 몬스터 → 벽 직접 피해 */
  private attackWallDirect(monster: GameMonster, activeWall: import('./types').Tower): void {
    const wallPos = activeWall.position;
    const talents  = activeWall.talents;
    const defBonus   = talents?.defBonus || 0;
    const voidWeaken = talents?.voidWeaken || 0;
    const effAtk = voidWeaken > 0 ? Math.round(monster.atk * (1 - voidWeaken / 100)) : monster.atk;
    // 무한모드 30웨이브 이후: 벽에 대한 추가 복리 배율 (영웅 교전 ATK와 별도)
    const wallWave = this.state.currentWave;
    const wallInfMult = wallWave > 30 ? Math.pow(1.005, wallWave - 30) : 1;
    let dmg = Math.max(1, Math.round(effAtk * wallInfMult) - (5 + defBonus));
    // 불굴의 방어선: HP 20% 이하 시 피해 감소
    const lowHpBonus = talents?.lowHpDefBonus || 0;
    if (lowHpBonus > 0 && activeWall.hp / activeWall.maxHp <= 0.2) {
      dmg = Math.max(1, Math.round(dmg * (1 - lowHpBonus)));
    }
    activeWall.hp = Math.max(0, activeWall.hp - dmg);
    this.addDamageNumber(wallPos.x, wallPos.y - 30, dmg, '#EF4444');
    this.addWallMeterDamageTaken(dmg);
    monster.attackTimer = monster.attackCooldown;
    if (activeWall.hp <= 0) {
      this.spawnExplosion(wallPos.x, wallPos.y, '#8B5CF6', 80);
    }

    const reflectPct = talents?.reflectPct || 0;
    if (reflectPct > 0) {
      const reflectDmg = Math.round(dmg * reflectPct);
      if (reflectDmg > 0) {
        monster.hp -= reflectDmg;
        this.addDamageNumber(monster.position.x, monster.position.y - 15, reflectDmg, '#A855F7');
        this.addWallMeterDamage(reflectDmg);
        if (monster.hp <= 0) {
          monster.hp = 0;
          monster.isAlive = false;
          this.addScore(getMonsterScore(monster, 1));
          this.addGold(5);
        }
      }
    }
    // 번개 반격
    const lightningReflect = talents?.lightningReflect || 0;
    if (lightningReflect > 0 && monster.isAlive) {
      this.applyLightningReflect(monster);
    }
  }

  private findClosestMonster(hero: GameHero, monsters: GameMonster[]): GameMonster | null {
    return monsters
      .sort((a, b) => this.distance(hero.position, a.position) - this.distance(hero.position, b.position))[0] || null;
  }

  private moveToward(monster: GameMonster, target: Position, dt: number) {
    const dx = target.x - monster.position.x;
    const dy = target.y - monster.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 1) return;

    const speed = monster.isSlowed ? monster.speed * 0.5 : monster.speed;
    const moveAmount = speed * 60 * dt;

    monster.position.x += (dx / dist) * moveAmount;
    monster.position.y += (dy / dist) * moveAmount;

    // (자폭병 처리는 updateMonsters 상단의 isSuicideBomber 블록에서 처리됨)
  }

  public distance(a: Position, b: Position): number {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  }

  public addDamageNumber(x: number, y: number, value: number, color: string, isHeal = false) {
    this.damageNumbers.push({
      x: x + (Math.random() - 0.5) * 20,
      y,
      value,
      color,
      timer: 1.0,
      isHeal,
    });
  }

  public spawnExplosion(x: number, y: number, color: string, maxRadius = 40) {
    this.explosions.push({ x, y, color, timer: 0.65, maxTimer: 0.65, maxRadius });
  }

  private checkWaveComplete() {
    // Offense 모드: 수비대 전멸은 웨이브 클리어 아님 — 영웅이 벽 공격으로 넘어감
    if (this.options.mode === 'offense') return;
    const allDead = this.state.monsters.every(m => !m.isAlive);
    if (allDead && this.state.phase === 'wave') {
      this.state.phase = 'wave_clear';
      // 무한모드: 1초만 클리어 텍스트 표시 후 즉시 다음 웨이브. 일반: WAVE_PREP_TIME(3s) 후 prep
      this.state.waveTimer = this.state.maxWave >= 1000 ? 1.0 : WAVE_PREP_TIME;

      // ── 벽 강화: 웨이브 종료 시 회복 로직 ──
      const recovery = this.state.walls.at(-1)!.talents?.recoveryPerWave || 0;
      if (recovery > 0 && this.state.walls.at(-1)!.hp < this.state.walls.at(-1)!.maxHp) {
        const healAmt = Math.round(this.state.walls.at(-1)!.maxHp * recovery);
        this.state.walls.at(-1)!.hp = Math.min(this.state.walls.at(-1)!.maxHp, this.state.walls.at(-1)!.hp + healAmt);
        this.addDamageNumber(this.state.walls.at(-1)!.position.x, this.state.walls.at(-1)!.position.y - 30, healAmt, '#22C55E', true);
      }
      // ── 생명 계열: 웨이브 종료 시 아군 회복 ──
      const allyHealPct = this.state.walls.at(-1)!.talents?.healAlliesPerWave || 0;
      if (allyHealPct > 0) {
        for (const hero of this.state.heroes) {
          if (hero.isAlive) {
            const healAmt = Math.round(hero.maxHp * allyHealPct);
            const prevHp = hero.hp;
            hero.hp = Math.min(hero.maxHp, hero.hp + healAmt);
            const actualHeal = hero.hp - prevHp;
            this.addDamageNumber(hero.position.x, hero.position.y - 20, healAmt, '#22C55E', true);
            if (actualHeal > 0) this.addWallMeterHeal(actualHeal);
          }
        }
      }
    }
  }

  // ========================
  // Offense Mode — Defender AI
  // ========================

  /**
   * 수비대 개별 AI (offense 모드 전용).
   * - healer: 제자리에서 아군 힐
   * - ranged/cc: 사정거리 내 영웅 원거리 공격, 이동 최소화
   * - tank/melee: 우리 영웅 쪽으로 전진 후 근접 공격
   */
  private updateDefenderAI(monster: GameMonster, dt: number) {
    // 벽 뒤 수비대: 이동 제한, 역할별 제자리 행동
    if (monster.hidesBehindWall) {
      if (this.state.walls.at(-1)!.hp > 0) {
        // 벽이 살아있는 동안: 이동 불가, 역할에 따라 제자리 행동
        if (monster.isStunned) {
          monster.stunTimer -= dt;
          if (monster.stunTimer <= 0) monster.isStunned = false;
          return;
        }
        // 힐러: 아래 healer 블록으로 fall-through
        if (monster.defenderRole === 'healer') {
          // 아래 healer 처리 블록에서 처리
        } else if (monster.defenderRole === 'ranged_dps' || monster.defenderRole === 'cc') {
          // 원딜/CC: 메카닉 포탑 우선 타겟 (포탑이 살아있으면), 없으면 영웅 공격
          const aliveTurrets = this.state.summons.filter(
            s => s.isAlive && s.skillId?.startsWith('mechanic_turret_')
          );
          const turretTarget = aliveTurrets.sort((a, b) =>
            this.distance(monster.position, a.position) - this.distance(monster.position, b.position)
          )[0] ?? null;
          if (turretTarget && this.distance(monster.position, turretTarget.position) <= 950) {
            // 포탑 공격: 메카닉 포탑이 아군 후방에서 적 벽을 공격 중이므로 우선 제거
            monster.attackTimer -= dt;
            if (monster.attackTimer <= 0) {
              const dmg = this.calculateDamage(monster.atk, turretTarget.def);
              this.spawnMonsterProjectile(monster, turretTarget, dmg, 'summon');
              monster.attackTimer = monster.attackCooldown;
            }
          } else {
            // 포탑 없음: 기존대로 영웅 공격 (650px 범위)
            const targetHero = this.state.heroes
              .filter(h => h.isAlive)
              .sort((a, b) => this.distance(monster.position, a.position) - this.distance(monster.position, b.position))[0];
            if (targetHero && this.distance(monster.position, targetHero.position) <= 650) {
              monster.attackTimer -= dt;
              if (monster.attackTimer <= 0) {
                const dmg = this.calculateDamage(monster.atk, targetHero.def);
                this.spawnEnemyProjectile(monster, targetHero.id, dmg);
                monster.attackTimer = monster.attackCooldown;
              }
            }
          }
          return;
        } else {
          return; // 탱크/근딜: 벽 뒤에 있으면 동작 없음 (설계상 앞에 배치되어야 함)
        }
      } else {
        // 벽 파괴됨 → 은신 해제 + 가장 가까운 영웅에 초기 어그로
        monster.hidesBehindWall = false;
        const aliveHeroes = this.state.heroes.filter(h => h.isAlive);
        if (aliveHeroes.length > 0 && Object.keys(monster.aggroTable).length === 0) {
          const closest = aliveHeroes.reduce((a, b) => {
            const da = Math.hypot(a.position.x - monster.position.x, a.position.y - monster.position.y);
            const db = Math.hypot(b.position.x - monster.position.x, b.position.y - monster.position.y);
            return da < db ? a : b;
          });
          monster.aggroTable[`hero:${closest.id}`] = 10;
        }
      }
    }

    // CC 처리
    if (monster.isStunned) {
      monster.stunTimer -= dt;
      if (monster.stunTimer <= 0) monster.isStunned = false;
      return;
    }
    if (monster.isSlowed) {
      monster.slowTimer -= dt;
      if (monster.slowTimer <= 0) monster.isSlowed = false;
    }

    // 힐러 수비대: 제자리에서 팀 힐 (heal_orb 투사체 발사)
    if (monster.defenderRole === 'healer') {
      monster.enemyHealTimer = (monster.enemyHealTimer ?? 0) - dt;
      if ((monster.enemyHealTimer ?? 0) <= 0) {
        monster.enemyHealTimer = 3.5;
        const wounded = this.state.monsters
          .filter(m => m.isAlive && m.id !== monster.id && m.hp < m.maxHp)
          .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp))[0];
        if (wounded) {
          const heal = Math.round(monster.atk * 2.5);
          this.spawnEnemyHealOrb(monster, wounded.id, heal);
        }
      }
      return; // 힐러는 이동·공격 없음
    }

    // 초기 어그로 생성 (aggroTable이 비어 있을 때)
    if (Object.keys(monster.aggroTable).length === 0) {
      const closestHero = this.state.heroes
        .filter(h => h.isAlive)
        .sort((a, b) => this.distance(monster.position, a.position) - this.distance(monster.position, b.position))[0];
      if (closestHero) {
        // 메카닉 포탑이 영웅과 수비대 사이에 있으면 포탑 우선 (2순위 방어선)
        const aliveTurrets = this.state.summons.filter(
          s => s.isAlive && s.skillId?.startsWith('mechanic_turret_')
        );
        const blockingTurret = aliveTurrets.find(t =>
          monster.position.x > t.position.x + 20 &&
          closestHero.position.x < t.position.x - 20
        ) ?? null;
        if (blockingTurret) {
          monster.aggroTable[`summon:${blockingTurret.id}`] = 100;
          monster.targetId = blockingTurret.id;
          monster.targetType = 'summon';
        } else {
          monster.aggroTable[`hero:${closestHero.id}`] = 1;
          monster.targetId = closestHero.id;
          monster.targetType = 'hero';
        }
      }
    }

    // 어그로 1위 타겟 찾기 (영웅 or 소환수)
    const top = this.getTopThreatTarget(monster);
    monster.targetId = top?.id ?? null;
    monster.targetType = top?.type ?? null;

    let defTargetEntity: GameHero | GameSummon | null = null;
    if (top?.type === 'hero') {
      defTargetEntity = this.state.heroes.find(h => h.id === top.id && h.isAlive) ?? null;
    } else if (top?.type === 'summon') {
      defTargetEntity = this.state.summons.find(s => s.id === top.id && s.isAlive) ?? null;
    }

    // 포탑 차단 재검사: 타겟이 있어도 포탑이 앞을 가로막으면 포탑 우선
    if (defTargetEntity) {
      const aliveTurrets = this.state.summons.filter(
        s => s.isAlive && s.skillId?.startsWith('mechanic_turret_')
      );
      const blockingTurret = aliveTurrets.find(t =>
        monster.position.x > t.position.x + 20 &&
        defTargetEntity!.position.x < t.position.x - 20
      ) ?? null;
      if (blockingTurret) {
        defTargetEntity = blockingTurret;
        monster.targetId = blockingTurret.id;
        monster.targetType = 'summon';
      }
    }

    if (!defTargetEntity) return;

    const dist = this.distance(monster.position, defTargetEntity.position);
    const isRangedDefender = monster.defenderRole === 'ranged_dps' || monster.defenderRole === 'cc';
    const attackDist = isRangedDefender ? 180 : 40;

    if (dist > attackDist) {
      this.moveToward(monster, defTargetEntity.position, dt);
    } else {
      monster.attackTimer -= dt;
      if (monster.attackTimer <= 0) {
        if (isRangedDefender && monster.targetType === 'hero') {
          // 원딜/CC: 영웅 투사체 발사
          const dmg = this.calculateDamage(monster.atk, defTargetEntity.def);
          this.spawnEnemyProjectile(monster, defTargetEntity.id, dmg);
        } else {
          // 근접 or 포탑 공격
          this.monsterAttack(monster, defTargetEntity, monster.targetType as 'hero' | 'summon');
        }
        monster.attackTimer = monster.attackCooldown;
      }
    }
  }

  /**
   * offense 모드: 수비대 전멸 후 영웅이 적 벽을 공격
   */
  private heroAttackEnemyWall(hero: GameHero, dt: number) {
    const wallPos = this.state.walls.at(-1)!.position;
    const dist = this.distance(hero.position, wallPos);
    const meleeOrRanged = hero.role === 'tank' || hero.role === 'melee_dps';

    if (meleeOrRanged) {
      // 근접: 벽으로 이동 후 공격
      if (dist > 60) {
        const moveAmount = hero.speed * 60 * dt;
        const dx = wallPos.x - hero.position.x;
        const dy = wallPos.y - hero.position.y;
        hero.position.x += (dx / dist) * Math.min(moveAmount, dist - 50);
        hero.position.y += (dy / dist) * Math.min(moveAmount, dist - 50);
      } else if (hero.attackTimer <= 0) {
        let dmg = Math.max(1, hero.atk - 8);
        // 탱커: 적 벽 공격 시 5배 피해
        if (hero.role === 'tank') {
          dmg *= 5;
        }
        this.state.walls.at(-1)!.hp -= dmg;
        this.addDamageNumber(wallPos.x, wallPos.y - 30, dmg, hero.color);
        hero.attackTimer = hero.attackCooldown;
        if (this.state.walls.at(-1)!.hp <= 0) {
          this.state.walls.at(-1)!.hp = 0;
          this.spawnExplosion(wallPos.x, wallPos.y, '#EF4444', 90);
        }
      }
    } else {
      // 원거리: 제자리에서 벽 공격
      if (hero.attackTimer <= 0) {
        const dmg = Math.max(1, Math.round(hero.atk * 0.6));
        this.state.walls.at(-1)!.hp -= dmg;
        this.addDamageNumber(wallPos.x, wallPos.y - 30, dmg, hero.color);
        hero.attackTimer = hero.attackCooldown * 1.5;
        if (this.state.walls.at(-1)!.hp <= 0) {
          this.state.walls.at(-1)!.hp = 0;
          this.spawnExplosion(wallPos.x, wallPos.y, '#EF4444', 90);
        }
      }
    }
  }

  // ========================
  // Summon System
  // ========================

  /** 게임 시작 시 모든 영웅의 소환 스킬로 소환수 초기 소환 */
  private initializeSummons() {
    for (const hero of this.state.heroes) {
      if (!hero.summonConfigs?.length) continue;
      for (const config of hero.summonConfigs) {
        this.spawnSummon(hero, config);
      }
    }
  }

  /** 웨이브 시작/종료 시 죽은 소환수 전원 재소환 (살아있는 영웅 한정) */
  private reinitializeSummons() {
    this.summonRespawnTimers.clear();
    // 죽은 소환수 제거
    this.state.summons = this.state.summons.filter(s => s.isAlive);
    // 살아있는 영웅의 누락 소환수 생성
    for (const hero of this.state.heroes) {
      if (!hero.isAlive || !hero.summonConfigs?.length) continue;
      for (const config of hero.summonConfigs) {
        const hasAlive = this.state.summons.some(
          s => s.summonerId === hero.id && s.skillId === config.skillId && s.isAlive
        );
        if (!hasAlive) this.spawnSummon(hero, config);
      }
    }
  }

  /** 영웅 주변에 소환수 생성 */
  public spawnSummon(hero: GameHero, config: SummonConfig): import('./types').GameSummon {
    let baseAttackCooldown =
      config.role === 'tank' ? 1.2 :
      config.role === 'ranged_dps' ? 1.5 : 0.8;

    // ── 시너지 보너스 적용 ──
    let hpMult = 1.0, atkMult = 1.0, defBonus = 0, spdMult = 1.0, atkSpeedMult = 1.0;
    for (const s of this.state.synergies) {
      if (s.bonuses.hpMult)       hpMult       *= s.bonuses.hpMult;
      if (s.bonuses.atkMult)      atkMult      *= s.bonuses.atkMult;
      if (s.bonuses.defBonus)     defBonus     += s.bonuses.defBonus;
      if (s.bonuses.spdMult)      spdMult      *= s.bonuses.spdMult;
      if (s.bonuses.atkSpeedMult) atkSpeedMult *= s.bonuses.atkSpeedMult;
    }

    // ── 벽 특성 보너스 적용 ──
    const talents = this.state.walls.at(-1)!.talents;
    defBonus += talents.heroDefBonus || 0;
    const heroSpdBns    = (talents.heroSpdBonusPct    || 0);
    const heroAtkSpdBns = (talents.heroAtkSpeedBonusPct || 0);
    if (heroSpdBns    > 0) spdMult      *= (1 + heroSpdBns / 100);
    if (heroAtkSpdBns > 0) atkSpeedMult *= (1 + heroAtkSpdBns / 100);

    // ── 근딜·탱커 벽 보너스 (정적) ──
    const mtb = this.state.meleeTankBonuses;
    const isMeleeTank = config.role === 'melee_dps' || config.role === 'tank';

    let summonHp  = Math.round(config.hp  * hpMult);
    let summonAtk = Math.round(config.atk * atkMult);
    let summonDef = Math.round(config.def + defBonus);

    // ── 악마 군주 (unique_feldah_demon): 소환수 능력치 증가 ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_feldah_demon') && hero.uniqueSkillValue) {
      const demonBonus = hero.uniqueSkillValue / 100;
      summonHp  = Math.round(summonHp  * (1 + demonBonus));
      summonAtk = Math.round(summonAtk * (1 + demonBonus));
      summonDef = Math.round(summonDef * (1 + demonBonus));
    }
    // ── 정령의 공명 (unique_seori_elemental): 소환수 능력치 증가 ──
    if (this.hasSkill(hero.equippedSkillIds, 'unique_seori_elemental') && hero.uniqueSkillValue) {
      const elemBonus = hero.uniqueSkillValue / 100;
      summonHp  = Math.round(summonHp  * (1 + elemBonus));
      summonAtk = Math.round(summonAtk * (1 + elemBonus));
      summonDef = Math.round(summonDef * (1 + elemBonus));
    }
    let summonSpd = parseFloat((config.spd * spdMult).toFixed(2));
    let finalCooldown = atkSpeedMult > 1.0
      ? Math.max(0.1, parseFloat((baseAttackCooldown / atkSpeedMult).toFixed(3)))
      : baseAttackCooldown;

    if (isMeleeTank) {
      if (mtb.atkPct    > 0) summonAtk = Math.round(summonAtk * (1 + mtb.atkPct / 100));
      if (mtb.defFlat   > 0) summonDef += mtb.defFlat;
      if (mtb.hpPct     > 0) summonHp  = Math.round(summonHp  * (1 + mtb.hpPct / 100));
      if (mtb.atkSpdPct > 0) finalCooldown = Math.max(0.1, parseFloat((finalCooldown * (1 - mtb.atkSpdPct / 100)).toFixed(3)));
    }

    // ── AI 용사 전술 지휘 오오라 적용 (최종 합산 후 곱연산 중첩) ──
    const aura = this.state.aiAuraBonus ?? 1.0;
    if (aura > 1.0) {
      summonHp = Math.round(summonHp * aura);
      summonAtk = Math.round(summonAtk * aura);
      summonDef = Math.round(summonDef * aura);
      summonSpd = parseFloat((summonSpd * aura).toFixed(2));
      finalCooldown = Math.max(0.1, parseFloat((finalCooldown / aura).toFixed(3)));
    }

    // 소환수는 벽 업그레이드/시너지 등 게임 내 요소로만 강화 — 웨이브 자동 스케일 없음

    // 시전자 주변 랜덤 오프셋
    const ox = (Math.random() - 0.5) * 35;
    const oy = (Math.random() - 0.5) * 40;
    const px = Math.max(HERO_MIN_X - 20, Math.min(HERO_MAX_X, hero.position.x + ox));
    const py = Math.max(FIELD_Y_MIN + 20, Math.min(FIELD_Y_MAX - 20, hero.position.y + oy));

    const newSummon: import('./types').GameSummon = {
      id: this.state.nextSummonId++,
      summonerId: hero.id,
      skillId: config.skillId,
      displayName: config.displayName,
      role: config.role,
      maxHp: summonHp,
      hp: summonHp,
      atk: summonAtk,
      def: summonDef,
      speed: summonSpd,
      attackRange: config.attackRange,
      maxDuration: 0,   // 영구 지속 — 사망 시에만 소멸
      duration: 0,
      position: { x: px, y: py },
      isAlive: true,
      attackCooldown: finalCooldown,
      attackTimer: Math.random() * finalCooldown, // 공격 타이밍 분산
      targetId: null,
      color: config.color,
      size: HERO_SIZE - 2,
      threatMult: config.role === 'tank' || config.skillId?.startsWith('mechanic_turret_') ? 2.0 : 1.0,
      battleRhythmCount: config.role === 'melee_dps' ? 0 : undefined,
    };

    this.state.summons = [...this.state.summons, newSummon];
    return newSummon;
  }

  /** 소환수 업데이트 (영구 AI + 재소환 + 탱커 AoE) */
  private updateSummons(dt: number) {
    const aliveMonsters = this.state.monsters.filter(m => m.isAlive);
    let summonsChanged = false;

    for (const summon of this.state.summons) {
      if (!summon.isAlive) continue;

      // 시전자 사망 시 소환수 즉시 소멸
      const summoner = this.state.heroes.find(h => h.id === summon.summonerId);
      if (!summoner?.isAlive) {
        summon.isAlive = false;
        summonsChanged = true;
        // 어그로 테이블 정리
        const targetKey = `summon:${summon.id}`;
        for (const m of this.state.monsters) {
          delete m.aggroTable[targetKey];
          if (m.targetId === summon.id && m.targetType === 'summon') {
            const next = this.getTopThreatTarget(m);
            m.targetId = next?.id ?? null;
            m.targetType = next?.type ?? null;
          }
        }
        continue;
      }

      // ── 힐러 소환수 (빛의 봉화 등): 이동 없이 가장 체력 낮은 아군 주기적 힐 ──
      if (summon.role === 'healer') {
        summon.attackTimer -= dt;
        if (summon.attackTimer <= 0) {
          const healTarget = this.state.heroes.filter(h => h.isAlive && h.hp < h.maxHp)
            .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp))[0];
          if (healTarget) {
            const healAmt = summon.atk;
            healTarget.hp = Math.min(healTarget.maxHp, healTarget.hp + healAmt);
            this.addDamageNumber(healTarget.position.x, healTarget.position.y - 20, healAmt, '#fcd34d', true);
            this.state.healingFlashes.push({ x: healTarget.position.x, y: healTarget.position.y, timer: 0.4, color: '#fcd34d' });
            // 미터 기록 (힐량을 소환수 시전자 기준으로)
            const summoner = this.state.heroes.find(h => h.id === summon.summonerId);
            if (summoner) this.addMeterHeal(summoner.id, healAmt);
          }
          summon.attackTimer = summon.attackCooldown;
        }
        continue;
      }

      if (aliveMonsters.length === 0) continue;

      // 오펜스 모드: 벽이 살아있으면 벽 앞에 있는 몬스터만 타겟
      const wallAliveInOffense = this.options.mode === 'offense' && this.state.walls.at(-1)!.hp > 0;
      const wallX = this.state.walls.at(-1)!.position.x;
      const targetableMonsters = wallAliveInOffense
        ? aliveMonsters.filter(m => m.position.x <= wallX + 20) // 벽 앞 수비대만
        : aliveMonsters;

      // 타겟 탐색: 가장 가까운 몬스터 (원거리 몬스터는 이제 맵 중앙까지 와서 교전)
      const isMeleeTankSummon = summon.role === 'tank' || summon.role === 'melee_dps';

      let nearest: GameMonster | null = null;
      let nearestDist = Infinity;
      for (const m of targetableMonsters) {
        const d = this.distance(summon.position, m.position);
        if (d < nearestDist) { nearestDist = d; nearest = m; }
      }

      // 오펜스 모드: 벽 앞 수비대가 없으면 탱크/근딜/포탑 소환수는 벽 공격
      if (!nearest && wallAliveInOffense && (isMeleeTankSummon || summon.role === 'ranged_dps')) {
        const wallPos = this.state.walls.at(-1)!.position;
        const wallDist = this.distance(summon.position, wallPos);
        if (isMeleeTankSummon) {
          // 근접: 벽까지 이동 후 직접 공격
          if (wallDist > summon.attackRange + 10) {
            const moveAmount = summon.speed * 60 * dt;
            const dx = wallPos.x - summon.position.x;
            const dy = wallPos.y - summon.position.y;
            summon.position.x += (dx / wallDist) * Math.min(moveAmount, wallDist - summon.attackRange);
            summon.position.y += (dy / wallDist) * Math.min(moveAmount, wallDist - summon.attackRange);
          } else {
            summon.attackTimer -= dt;
            if (summon.attackTimer <= 0) {
              let dmg = Math.max(1, summon.atk - 5);
              if (summon.role === 'tank') dmg *= 5;
              this.state.walls.at(-1)!.hp = Math.max(0, this.state.walls.at(-1)!.hp - dmg);
              this.addDamageNumber(wallPos.x, wallPos.y - 30, dmg, '#F97316');
              summon.attackTimer = summon.attackCooldown;
            }
          }
        } else {
          // 원거리 소환수 (메카닉 포탑): 사거리 내이면 투사체 발사
          if (wallDist <= summon.attackRange + 10) {
            summon.attackTimer -= dt;
            if (summon.attackTimer <= 0) {
              this.spawnSummonWallProjectile(summon);
              summon.attackTimer = summon.attackCooldown;
            }
          }
        }
        continue;
      }

      if (!nearest) continue;
      summon.targetId = nearest.id;

      // 이동 (탱커/근딜: 몬스터로 이동, 원딜: 제자리)
      if (isMeleeTankSummon) {
        if (nearestDist > summon.attackRange + 10) {
          const moveAmount = summon.speed * 60 * dt;
          const dx = nearest.position.x - summon.position.x;
          const dy = nearest.position.y - summon.position.y;
          // 오펜스 모드: 벽이 살아있으면 벽을 넘어가지 않도록 제한
          const maxX = wallAliveInOffense ? wallX - 10 : CANVAS_WIDTH - 20;
          summon.position.x += (dx / nearestDist) * Math.min(moveAmount, nearestDist - summon.attackRange);
          summon.position.y += (dy / nearestDist) * Math.min(moveAmount, nearestDist - summon.attackRange);
          summon.position.x = Math.max(HERO_MIN_X - 80, Math.min(maxX, summon.position.x));
          summon.position.y = Math.max(FIELD_Y_MIN + 5, Math.min(FIELD_Y_MAX - 5, summon.position.y));
        }
      }

      // 공격 타이머
      summon.attackTimer -= dt;
      if (summon.attackTimer <= 0) {
        if (summon.role === 'tank') {
          // 탱커 소환수: 공격범위 내 모든 몬스터 광역 공격 (근접 사거리 체크 유지)
          if (nearestDist <= summon.attackRange + 15) {
            const inRange = aliveMonsters.filter(m =>
              this.distance(summon.position, m.position) <= summon.attackRange + 15
            );
            for (const m of inRange) this.dealSummonDamage(summon, m);
            summon.attackTimer = summon.attackCooldown;
          }
        } else if (summon.role === 'ranged_dps') {
          // 원거리 소환수: 사정거리 무제한으로 투사체 발사
          this.dealSummonDamage(summon, nearest);
          summon.attackTimer = summon.attackCooldown;
        } else if (nearestDist <= summon.attackRange + 15) {
          // 근딜: 기존처럼 사거리 내에서 공격
          this.dealSummonDamage(summon, nearest);
          summon.attackTimer = summon.attackCooldown;
        }
      }

      // ── 메카닉 포탑 전용: 벽 접근 적 광역 근딜 (독립 타이머) ─────────────
      if (summon.skillId.startsWith('mechanic_turret_')) {
        if (summon.wallAoETimer === undefined) summon.wallAoETimer = 0;
        summon.wallAoETimer -= dt;

        if (summon.wallAoETimer <= 0) {
          const defWallX = this.options.mode !== 'offense'
            ? (this.state.walls[0]?.position.x ?? TOWER_X)
            : TOWER_X;
          const wallProximity = 100; // 벽으로부터 이 범위 내 적 = 벽 접근 판정
          const aoeRadius     = 120;

          const wallMonsters = aliveMonsters.filter(
            m => m.position.x <= defWallX + wallProximity
          );

          if (wallMonsters.length > 0) {
            // 포탑 위치 기준 폭발
            const aoeX = summon.position.x;
            const aoeY = summon.position.y;
            this.spawnExplosion(aoeX, aoeY, summon.color ?? '#06b6d4', aoeRadius);

            for (const m of wallMonsters) {
              if (!m.isAlive) continue;
              if (this.distance({ x: aoeX, y: aoeY }, m.position) > aoeRadius) continue;

              const aoeDmg = Math.max(1, Math.round(summon.atk * 0.70) - m.def);
              m.hp -= aoeDmg;
              this.addDamageNumber(
                m.position.x + (Math.random() - 0.5) * 20,
                m.position.y - m.size - 5,
                aoeDmg, '#fbbf24',
              );
              this.addMeterDamage(summon.summonerId, summon.skillId, aoeDmg);
              if (m.hp <= 0 && m.isAlive) {
                m.hp = 0; m.isAlive = false;
                this.addScore(getMonsterScore(m, 1));
                this.addGold(getMonsterGold(m, 1));
                this.spawnExplosion(m.position.x, m.position.y, m.color, 25);
              }
            }
            // AoE 발동 시 쿨다운 2.0초
            summon.wallAoETimer = 2.0;
          } else {
            // 벽 근접 적 없음 → 0.3초 후 재점검
            summon.wallAoETimer = 0.3;
          }
        }
      }
    }

    // 재소환 타이머 업데이트
    for (const [key, timer] of this.summonRespawnTimers.entries()) {
      const remaining = timer - dt;
      if (remaining <= 0) {
        this.summonRespawnTimers.delete(key);
        const colonIdx = key.indexOf(':');
        const heroId = parseInt(key.substring(0, colonIdx));
        const skillId = key.substring(colonIdx + 1);
        const hero = this.state.heroes.find(h => h.id === heroId && h.isAlive);
        if (hero?.summonConfigs) {
          const config = hero.summonConfigs.find(c => c.skillId === skillId);
          if (config) this.spawnSummon(hero, config);
        }
      } else {
        this.summonRespawnTimers.set(key, remaining);
      }
    }

    // 죽은 소환수 제거 (과거 소환수 객체 정리, 최대 100개 유지)
    if (this.state.summons.length > 100 || summonsChanged) {
      this.state.summons = this.state.summons.filter((s, idx) => s.isAlive || (idx > this.state.summons.length - 20));
    }

    // 살아있는 영웅의 소환수 누락 감지 → 자동 재소환 스케줄
    // (영웅 부활, 시전자 사망 후 재소환 타이머 미등록 케이스 처리)
    for (const hero of this.state.heroes) {
      if (!hero.isAlive || !hero.summonConfigs?.length) continue;
      for (const config of hero.summonConfigs) {
        const key = `${hero.id}:${config.skillId}`;
        if (this.summonRespawnTimers.has(key)) continue;
        const hasAlive = this.state.summons.some(
          s => s.summonerId === hero.id && s.skillId === config.skillId && s.isAlive
        );
        if (!hasAlive && !this.summonRespawnTimers.has(key)) {
          this.summonRespawnTimers.set(key, 10);
        }
      }
    }
  }

  /** 소환수의 몬스터 공격 */
  private dealSummonDamage(summon: GameSummon, monster: GameMonster) {
    const mtb = this.state.meleeTankBonuses;
    const isMeleeTank = summon.role === 'melee_dps' || summon.role === 'tank';

    // 공허 스택: 방어 무시 (근딜·탱커 소환수)
    const effDef = isMeleeTank && mtb.armorPenPct > 0
      ? Math.max(0, Math.round(monster.def * (1 - mtb.armorPenPct / 100)))
      : monster.def;
    let rawDmg = Math.max(1, summon.atk - effDef);

    // ── 탱커 소환수: 어그로가 탱커 역할군이 아닐 때 5배 피해 ──
    if (summon.role === 'tank' && !this.isTargetingTank(monster)) {
      rawDmg *= 5;
    }

    // ── 벽 속성 시너지 (소환수도 시전자의 속성을 따름) ──
    const summoner = this.state.heroes.find(h => h.id === summon.summonerId);
    const wallBuff = this.state.walls.at(-1)!.talents?.elementBuffPct || 0;
    if (summoner && wallBuff > 0 && (summoner.elementName === '화염' || summoner.elementName === '냉기')) {
      rawDmg = Math.round(rawDmg * (1 + wallBuff));
    }

    if (summon.role === 'ranged_dps') {
      // 원거리 소환수: 투사체 발사
      this.spawnSummonProjectile(summon, monster.id, rawDmg);
      // ── 마귀 소환수: 공격 시 피해의 50%만큼 체력 최저 아군 힐 ──
      if (summon.skillId === 'dizgar_demon_summon') {
        const healAmt = Math.round(rawDmg * 0.5);
        const healTarget = this.state.heroes.filter(h => h.isAlive).sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp))[0];
        if (healTarget && healAmt > 0) {
          healTarget.hp = Math.min(healTarget.maxHp, healTarget.hp + healAmt);
          this.addDamageNumber(healTarget.position.x, healTarget.position.y - 20, healAmt, '#a855f7', true);
          this.state.healingFlashes.push({ x: healTarget.position.x, y: healTarget.position.y, timer: 0.3, color: '#a855f7' });
        }
      }
      // ── 냉기의 정령: 공격 시 2초 슬로우 ──
      if (summon.skillId === 'iskier_frost_elemental' && !monster.immuneToCc) {
        monster.isSlowed = true;
        monster.slowTimer = Math.max(monster.slowTimer, 2.0);
      }
      // ── 화염 정령: 공격 시 ATK 30% 추가 화염 피해 ──
      if (summon.skillId === 'seori_fire_elemental' && monster.isAlive) {
        const fireDmg = Math.round(summon.atk * 0.30);
        monster.hp -= fireDmg;
        this.addMeterDamage(summon.summonerId, summon.skillId, fireDmg);
        this.addDamageNumber(monster.position.x, monster.position.y - 20, fireDmg, '#ef4444');
        if (monster.hp <= 0) { monster.hp = 0; monster.isAlive = false; this.addScore(getMonsterScore(monster, 1)); this.addGold(getMonsterGold(monster, 1)); }
      }
    } else {
      // 근접 소환수: 즉시 피해
      // ── 전투의 리듬 (Phase 144): 근딜 3타 로테이션 ──
      let dmgMult = 1.0;
      let isAoE = false;
      if (summon.role === 'melee_dps') {
        summon.battleRhythmCount = (summon.battleRhythmCount ?? 0) + 1;
        const rhythm = summon.battleRhythmCount % 3;
        if (rhythm === 2) dmgMult = 3.0;
        else if (rhythm === 0) isAoE = true;
      }

      let dmg = Math.round(rawDmg * dmgMult);

      if (isAoE) {
        const radius = 150;
        const aoeTargets = this.state.monsters.filter(
          m => m.isAlive && m.id !== monster.id && this.distance(summon.position, m.position) <= radius
        );
        this.spawnExplosion(summon.position.x, summon.position.y, COLORS.melee_dps, radius);
        for (const m of aoeTargets) {
          const mDmg = Math.round(this.calculateDamage(summon.atk, m.def) * dmgMult);
          m.hp -= mDmg;
          this.addDamageNumber(m.position.x, m.position.y - 15, mDmg, COLORS.melee_dps);
          this.addMeterDamage(summon.summonerId, summon.skillId, mDmg);
          if (m.hp <= 0) {
            m.hp = 0;
            m.isAlive = false;
            this.addScore(getMonsterScore(m, 1));
            this.addGold(getMonsterGold(monster, 1));
            this.spawnExplosion(m.position.x, m.position.y, m.color, 25);
          }
        }
      }

      // ── 철갑 피부: 소환수 근접 피해도 1 고정 ──
      if (monster.ironSkin) dmg = 1;
      monster.hp -= dmg;
      this.addDamageNumber(
        monster.position.x + (Math.random() - 0.5) * 15,
        monster.position.y - monster.size - 5,
        dmg,
        summon.color,
      );
      this.addMeterDamage(summon.summonerId, summon.skillId, dmg);

      // ── 근딜·탱커 소환수 런타임 효과 ──
      if (isMeleeTank) {
        // 혈액 스택: 흡혈
        if (mtb.lifestealPct > 0) {
          const wallLS = Math.round(dmg * mtb.lifestealPct / 100);
          if (wallLS > 0) summon.hp = Math.min(summon.maxHp, summon.hp + wallLS);
        }
        // 자연 스택: 독 추가 피해
        if (mtb.poisonOnHit > 0 && monster.isAlive) {
          monster.hp -= mtb.poisonOnHit;
          this.addDamageNumber(monster.position.x, monster.position.y - 25, mtb.poisonOnHit, '#84CC16');
          this.addMeterDamage(summon.summonerId, summon.skillId, mtb.poisonOnHit);
        }
      }

      if (monster.hp <= 0) {
        monster.hp = 0;
        monster.isAlive = false;
        this.addScore(getMonsterScore(monster, 1));
        this.addGold(getMonsterGold(monster, 1));
        this.spawnExplosion(monster.position.x, monster.position.y, monster.color, 25);
        // 생명 스택: 처치 시 소환수 HP 회복
        if (isMeleeTank && mtb.healOnKill > 0) {
          summon.hp = Math.min(summon.maxHp, summon.hp + mtb.healOnKill);
          this.addDamageNumber(summon.position.x, summon.position.y - 20, mtb.healOnKill, '#22C55E', true);
        }
      }

      // 폭풍 스택: 근딜·탱커 소환수 광역 공격 (타겟 주변 AoE 50% 피해)
      if (isMeleeTank && mtb.meleeCleaveRadius > 0) {
        const cleaveDmg = Math.round(rawDmg * 0.5);
        if (cleaveDmg > 0) {
          for (const m of this.state.monsters) {
            if (!m.isAlive || m.id === monster.id) continue;
            if (this.distance(monster.position, m.position) <= mtb.meleeCleaveRadius) {
              m.hp -= cleaveDmg;
              this.addDamageNumber(m.position.x, m.position.y - 10, cleaveDmg, '#F97316');
              this.addMeterDamage(summon.summonerId, summon.skillId, cleaveDmg);
              if (m.hp <= 0) {
                m.hp = 0;
                m.isAlive = false;
                this.addScore(getMonsterScore(m, 1));
                this.addGold(getMonsterGold(m, 1));
                if (mtb.healOnKill > 0) {
                  summon.hp = Math.min(summon.maxHp, summon.hp + mtb.healOnKill);
                }
              }
            }
          }
        }
      }

      // 위협 생성: 소환수 본인에게 누적
      this.addThreat(summon, monster, rawDmg, 'summon');
    }
  }
}
