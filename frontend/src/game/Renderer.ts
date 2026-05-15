import type { GameState, GameHero, GameMonster, GameSummon, DamageNumber, Explosion, Tower, Projectile } from './types';
import {
  CANVAS_WIDTH, CANVAS_HEIGHT,
  TOWER_X, WALL_AGGRO_RANGE,
  HERO_MIN_X, HERO_MAX_X,
  FIELD_Y_MIN, FIELD_Y_MAX,
  COLORS,
} from './constants';

export class Renderer {
  public t_i18n?: any;
  public monsterNameMap: Record<string, string> = {};
  public defenderNameFn?: (name: string, displayName: string) => string;
  public heroNameFn?: (hero: GameHero) => string;
  private ctx: CanvasRenderingContext2D;
  private imageCache: Map<string, HTMLImageElement> = new Map();
  private mapBg: HTMLImageElement;
  isOffenseMode = false;
  showNormalMonsterNames = false;
  noWall = false;
  wallLabel = '방어선';
  wall2Label = '제 2방어선';
  wall3Label = '제 3방어선';
  affixEnrageLabel = '[광폭화]';
  affixHealAuraLabel = '[치유오라]';
  affixSummonLabel = '[소환]';
  affixAoeSlamLabel = '[지면강타]';

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    this.mapBg = new Image();
    this.mapBg.src = '/map/MAP1.png';
  }

  private loadImage(src: string): HTMLImageElement | null {
    if (this.imageCache.has(src)) return this.imageCache.get(src)!;
    const img = new Image();
    img.src = `/graphic/${src}`;
    this.imageCache.set(src, img);
    return img;
  }

  /** 절대 경로 이미지 로드 (GIF 스프라이트 전용 — /graphic/ prefix 없음) */
  private loadImageAbsolute(url: string): HTMLImageElement | null {
    const key = `abs:${url}`;
    if (this.imageCache.has(key)) return this.imageCache.get(key)!;
    const img = new Image();
    img.src = url;
    this.imageCache.set(key, img);
    return img;
  }

  render(state: GameState, damageNumbers: DamageNumber[], explosions: Explosion[] = []) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.drawBackground();
    // walls[0]=최외곽, walls.at(-1)=최내곽(wall1). 안쪽부터 번호 1,2,3...으로 표시
    if (!this.noWall) {
      state.walls.forEach((w, i) => this.drawTower(w, state.walls.length - i));
    }
    this.drawZones();

    // Draw entities
    for (const hero of state.heroes) {
      if (hero.isAlive) this.drawHero(hero);
    }
    // Draw summons (small circles, between heroes and monsters in z-order)
    for (const summon of state.summons) {
      if (summon.isAlive) this.drawSummon(summon);
    }

    // 보호막 링 (영웅/소환수 위에)
    this.drawShieldRings(state);

    for (const monster of state.monsters) {
      if (monster.isAlive) this.drawMonster(monster);
    }

    // Draw projectiles (on top of heroes/monsters)
    for (const proj of state.projectiles) {
      this.drawProjectile(proj);
    }

    // Draw explosions
    for (const exp of explosions) {
      this.drawExplosion(exp);
    }

    // Draw damage numbers
    for (const dn of damageNumbers) {
      this.drawDamageNumber(dn);
    }

    // Draw healing flashes
    this.drawHealingFlashes(state.healingFlashes);

    // Draw wave info overlay
    this.drawHUD(state);
  }

  private drawHealingFlashes(flashes: any[]) {
    const ctx = this.ctx;
    if (!flashes) return;

    for (const flash of flashes) {
      const alpha = flash.timer / 0.4;
      ctx.save();
      ctx.globalAlpha = alpha;
      
      // 1. 빛의 기둥 (수직)
      const grad = ctx.createLinearGradient(flash.x - 15, 0, flash.x + 15, 0);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.5, flash.color);
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = grad;
      ctx.fillRect(flash.x - 15, 0, 30, CANVAS_HEIGHT);

      // 2. 대상 발밑 원형 빛
      const radGrad = ctx.createRadialGradient(flash.x, flash.y, 0, flash.x, flash.y, 40);
      radGrad.addColorStop(0, '#FFFFFF');
      radGrad.addColorStop(0.4, flash.color);
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(flash.x, flash.y, 40, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  private drawBackground() {
    const ctx = this.ctx;
    if (this.mapBg.complete && this.mapBg.naturalWidth > 0) {
      ctx.drawImage(this.mapBg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    } else {
      // fallback: dark background
      ctx.fillStyle = COLORS.ground;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  }

  private drawZones() {
    const ctx = this.ctx;
    const fieldH = FIELD_Y_MAX - FIELD_Y_MIN;

    if (this.noWall) {
      // noWall 모드: 전장 전체가 전투 구역
      ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.font = '11px sans-serif';
      ctx.fillText('HEROES', HERO_MIN_X, FIELD_Y_MIN - 8);
      ctx.fillText('BATTLEFIELD', HERO_MAX_X + 80, FIELD_Y_MIN - 8);
      return;
    }

    if (this.isOffenseMode) {
      // Offense 모드: 좌측 = 아군 집결 구역, 우측 = 적 영역
      ctx.fillStyle = 'rgba(59, 130, 246, 0.06)'; // 파랑 — 아군 영역
      ctx.fillRect(0, FIELD_Y_MIN, 300, fieldH);
      ctx.fillStyle = 'rgba(239, 68, 68, 0.06)';  // 빨강 — 적 영역
      ctx.fillRect(700, FIELD_Y_MIN, 500, fieldH);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.font = '11px sans-serif';
      ctx.fillText('아군 구역', 8, FIELD_Y_MIN - 8);
      ctx.fillText('적 수비 구역', 720, FIELD_Y_MIN - 8);
      ctx.fillText('적 던전', 1000, FIELD_Y_MIN - 8);
      return;
    }

    // 원딜·힐러 안전 구역 (벽 왼쪽)
    ctx.fillStyle = 'rgba(249, 115, 22, 0.06)';
    ctx.fillRect(0, FIELD_Y_MIN, TOWER_X, fieldH);

    // 벽 어그로 존 (벽 오른쪽 WALL_AGGRO_RANGE)
    ctx.fillStyle = 'rgba(239, 68, 68, 0.05)';
    ctx.fillRect(TOWER_X, FIELD_Y_MIN, WALL_AGGRO_RANGE, fieldH);

    // 영웅 배치 구역 외곽선
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(HERO_MIN_X, FIELD_Y_MIN, HERO_MAX_X - HERO_MIN_X, fieldH);
    ctx.setLineDash([]);

    // 존 레이블
    ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.font = '11px sans-serif';
    ctx.fillText('원딜/힐', 8, FIELD_Y_MIN - 8);
    ctx.fillText('벽 어그로', TOWER_X + 4, FIELD_Y_MIN - 8);
    ctx.fillText('HEROES', TOWER_X + WALL_AGGRO_RANGE + 10, FIELD_Y_MIN - 8);
    ctx.fillText('BATTLEFIELD', HERO_MAX_X + 80, FIELD_Y_MIN - 8);
  }

  private drawTower(tower: Tower, wallNumber: number = 1) {
    const ctx = this.ctx;
    const x = tower.position.x;
    const wallTop = FIELD_Y_MIN;
    const wallH = FIELD_Y_MAX - FIELD_Y_MIN;
    const wallW = 14;
    const hpRatio = tower.hp / tower.maxHp;
    const talents = tower.talents;

    // ── 벽 강화 오라 시각화 ──
    if (talents) {
      if ((talents.auraDamage || 0) > 0) {
        // 화염 오라 (주황색 글로우)
        ctx.save();
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#f97316';
        ctx.fillStyle = 'rgba(249, 115, 22, 0.08)';
        ctx.fillRect(x - 20, wallTop, 40, wallH);
        ctx.restore();
      }
      if (talents.naturePoisonAura && talents.naturePoisonAura > 0) {
        // 독 오라 (초록색 글로우)
        ctx.save();
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#84cc16';
        ctx.fillStyle = 'rgba(132, 204, 22, 0.08)';
        ctx.fillRect(x - 25, wallTop, 50, wallH);
        ctx.restore();
      }
      if (talents.bloodVampireAura && talents.bloodVampireAura > 0) {
        // 피 오라 (빨간색 글로우)
        ctx.save();
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#ef4444';
        ctx.fillStyle = 'rgba(239, 68, 68, 0.08)';
        ctx.fillRect(x - 20, wallTop, 40, wallH);
        ctx.restore();
      }
      if ((talents.auraSlowPct || 0) > 0) {
        // 냉기 오라 (하늘색 글로우)
        ctx.save();
        ctx.shadowBlur = 25;
        ctx.shadowColor = '#06b6d4';
        ctx.fillStyle = 'rgba(6, 182, 212, 0.08)';
        ctx.fillRect(x - 15, wallTop, 30, wallH);
        ctx.restore();
      }
    }

    // 벽 본체 (돌 느낌 그래디언트)
    const grad = ctx.createLinearGradient(x - wallW / 2, 0, x + wallW / 2, 0);
    
    // 특성 계열에 따른 기본 색상 조정
    let c1 = '#374151', c2 = '#9CA3AF'; // 기본 회색
    if (talents) {
      if ((talents.auraDamage || 0) > (talents.auraSlowPct || 0) * 100) {
        c1 = '#7c2d12'; c2 = '#f97316'; // 화염 테마
      } else if ((talents.auraSlowPct || 0) > 0) {
        c1 = '#164e63'; c2 = '#06b6d4'; // 냉기 테마
      } else if ((talents.defBonus || 0) > 20) {
        c1 = '#1f2937'; c2 = '#4b5563'; // 강철 테마 (진회색)
      }
    }

    grad.addColorStop(0, c1);
    grad.addColorStop(0.4, c2);
    grad.addColorStop(0.6, c2);
    grad.addColorStop(1, c1);
    ctx.fillStyle = grad;
    ctx.fillRect(x - wallW / 2, wallTop, wallW, wallH);

    // 벽 테두리
    ctx.strokeStyle = hpRatio > 0.3 ? '#D1D5DB' : '#EF4444';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x - wallW / 2, wallTop, wallW, wallH);

    // 벽돌 패턴 (가로줄)
    ctx.strokeStyle = 'rgba(55, 65, 81, 0.6)';
    ctx.lineWidth = 1;
    for (let by = wallTop + 20; by < wallTop + wallH; by += 20) {
      ctx.beginPath();
      ctx.moveTo(x - wallW / 2, by);
      ctx.lineTo(x + wallW / 2, by);
      ctx.stroke();
    }

    // HP에 따른 균열 이펙트
    if (hpRatio < 0.5) {
      ctx.strokeStyle = `rgba(239, 68, 68, ${0.3 + (0.5 - hpRatio)})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x - 3, wallTop + wallH * 0.2);
      ctx.lineTo(x + 2, wallTop + wallH * 0.4);
      ctx.lineTo(x - 1, wallTop + wallH * 0.6);
      ctx.stroke();
    }

    // HP 바 (벽 위)
    const barW = 70;
    const barX = x - barW / 2;
    const barY = wallTop - 22;
    ctx.fillStyle = COLORS.hp_bar_bg;
    ctx.fillRect(barX, barY, barW, 8);
    ctx.fillStyle = hpRatio > 0.5 ? '#22C55E' : hpRatio > 0.25 ? '#F59E0B' : COLORS.hp_bar_low;
    ctx.fillRect(barX, barY, barW * hpRatio, 8);

    // 레이블
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    const wallLabel = wallNumber === 3 ? this.wall3Label : wallNumber === 2 ? this.wall2Label : this.wallLabel;
    ctx.fillText(`${wallLabel} ${tower.hp}/${tower.maxHp}`, x, barY - 3);
    ctx.textAlign = 'left';
  }

  private drawHero(hero: GameHero) {
    const ctx = this.ctx;
    const { x, y } = hero.position;

    // Aggro range (tank only)
    if (hero.role === 'tank' && hero.aggroRadius > 0) {
      ctx.beginPath();
      ctx.arc(x, y, hero.aggroRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(59, 130, 246, 0.06)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // 영혼석 무적 링 (골드 글로우)
    if (hero.isInvincible) {
      ctx.beginPath();
      ctx.arc(x, y, hero.size + 6, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.7)';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, hero.size + 10, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Hero visual (GIF Sprite > Sprite Sheet > Placeholder)
    if (hero.gifSprite) {
      // GIF 스프라이트: 브라우저가 자체 애니메이션 — drawImage 호출마다 현재 프레임 표시
      const img = this.loadImageAbsolute(hero.gifSprite);
      if (img && img.complete && img.naturalWidth > 0) {
        const drawW = hero.size * 2.4 * 2.5;
        const drawH = img.naturalWidth > 0 ? drawW * (img.naturalHeight / img.naturalWidth) : drawW;
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, x - drawW / 2, y - drawH / 2, drawW, drawH);
      } else {
        this.drawHeroPlaceholder(hero);
      }
    } else {
      const spritePath = hero.sprite || `${hero.name}.png`;
      const img = this.loadImage(spritePath);
      if (img && img.complete && img.naturalWidth > 0) {
        if (img.naturalWidth > img.naturalHeight) {
          // 스프라이트 레이아웃: 좌측 정사각형(이미지높이×이미지높이) 초상화 + 우측 스프라이트 2×2 그리드
          const portraitSize = img.naturalHeight;
          const cellW = (img.naturalWidth - portraitSize) / 2;
          const cellH = img.naturalHeight / 2;
          const frameIdx = Math.floor(performance.now() / 200) % 4;
          const fx = portraitSize + (frameIdx % 2) * cellW;
          const fy = Math.floor(frameIdx / 2) * cellH;

          const drawW = hero.size * 2.4;
          const drawH = drawW * (cellH / cellW);
          ctx.drawImage(img, fx, fy, cellW, cellH, x - drawW / 2, y - drawH / 2, drawW, drawH);
        } else {
          // 단일 초상화/스프라이트 (1:1 또는 세로형)
          const drawW = hero.size * 2.0;
          const drawH = img.naturalWidth > 0 ? drawW * (img.naturalHeight / img.naturalWidth) : drawW;
          ctx.drawImage(img, 0, 0, img.naturalWidth || drawW, img.naturalHeight || drawH, x - drawW / 2, y - drawH / 2, drawW, drawH);
        }
      } else {
        this.drawHeroPlaceholder(hero);
      }
    }

    // HP bar
    const hpRatio = hero.hp / hero.maxHp;
    const barWidth = hero.size * 2.5;
    const barX = x - barWidth / 2;
    const barY = y + hero.size + 8;

    // Role icon next to HP bar (small)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    const roleIcons: Record<string, string> = {
      tank: '🛡',
      melee_dps: '⚔',
      ranged_dps: '🔥',
      healer: '➕',
      cc: '❄',
    };
    ctx.fillText(roleIcons[hero.role] || '?', barX - 4, barY + 2);

    ctx.fillStyle = COLORS.hp_bar_bg;
    ctx.fillRect(barX, barY, barWidth, 4);
    ctx.fillStyle = hpRatio > 0.3 ? COLORS.hp_bar_fill : COLORS.hp_bar_low;
    ctx.fillRect(barX, barY, barWidth * hpRatio, 4);

    // Name
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    const heroDisplayName = this.heroNameFn
      ? this.heroNameFn(hero)
      : (this.t_i18n && hero.nameKey ? this.t_i18n(hero.nameKey) : hero.name);
    ctx.fillText(heroDisplayName, x, y - hero.size - 6);
  }

  private drawHeroPlaceholder(hero: GameHero) {
    const ctx = this.ctx;
    const { x, y } = hero.position;

    // Hero circle
    ctx.beginPath();
    ctx.arc(x, y, hero.size, 0, Math.PI * 2);
    ctx.fillStyle = hero.color;
    ctx.fill();
    ctx.strokeStyle = hero.isInvincible ? '#FFD700' : '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  private drawMonster(monster: GameMonster) {
    const ctx = this.ctx;
    const { x, y } = monster.position;

    // ── 고통의 오라 시각화 (Aura Circle) ──
    if (monster.auraDamage && monster.auraDamage > 0) {
      const radius = monster.auraRadius || 150;
      const pulse = Math.sin(performance.now() / 400) * 10 + 10;
      const grad = ctx.createRadialGradient(x, y, radius - 20, x, y, radius + pulse);
      grad.addColorStop(0, 'rgba(239, 68, 68, 0)');
      grad.addColorStop(0.5, 'rgba(239, 68, 68, 0.15)');
      grad.addColorStop(1, 'rgba(239, 68, 68, 0)');
      
      ctx.beginPath();
      ctx.arc(x, y, radius + pulse, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // 테두리 선
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
      ctx.setLineDash([5, 10]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // ── 자폭병: 맥동하는 빨간 글로우 ──
    if (monster.isSuicideBomber) {
      const pulse = Math.sin(performance.now() / 180) * 0.5 + 0.5;
      ctx.save();
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 18 + pulse * 14;
      ctx.strokeStyle = `rgba(239,68,68,${0.5 + pulse * 0.4})`;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(x, y, monster.size + 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // CC indicators
    if (monster.isStunned) {
      ctx.beginPath();
      ctx.arc(x, y, monster.size + 5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (monster.isSlowed) {
      ctx.beginPath();
      ctx.arc(x, y, monster.size + 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // 정령/원소 계열: 글로우 이펙트 + 원형
    const n = monster.name;
    const isSpirit = n.includes('spirit') || n.includes('elemental') || n.includes('wraith') ||
                     n.includes('shadow') || n.includes('void') || n.includes('lava') || n.includes('frost_el');
    if (isSpirit && monster.monsterType !== 'boss') {
      const pulse = Math.sin(performance.now() / 300 + x) * 0.15 + 0.85;
      ctx.save();
      ctx.shadowColor = monster.color;
      ctx.shadowBlur = 14 * pulse;
      ctx.fillStyle = monster.color;
      ctx.beginPath();
      ctx.arc(x, y, monster.size * 0.65, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      // 빛나는 테두리
      ctx.strokeStyle = monster.monsterType === 'elite' ? '#FDE68A' : monster.color;
      ctx.lineWidth = monster.monsterType === 'elite' ? 2 : 1.5;
      ctx.beginPath();
      ctx.arc(x, y, monster.size * 0.65, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      // Monster shape (square for normal, diamond for elite, hexagon for boss)
      ctx.fillStyle = monster.color;
      if (monster.monsterType === 'boss') {
        this.drawHexagon(x, y, monster.size);
      } else if (monster.monsterType === 'elite') {
        this.drawDiamond(x, y, monster.size);
      } else {
        ctx.fillRect(x - monster.size / 2, y - monster.size / 2, monster.size, monster.size);
      }

      // Border
      ctx.strokeStyle = monster.monsterType === 'boss' ? '#FCD34D' :
                        monster.monsterType === 'elite' ? '#F59E0B' : '#6B7280';
      ctx.lineWidth = monster.monsterType === 'boss' ? 3 : 1.5;
      if (monster.monsterType === 'boss') {
        this.drawHexagon(x, y, monster.size, true);
      } else if (monster.monsterType === 'elite') {
        this.drawDiamond(x, y, monster.size, true);
      } else {
        ctx.strokeRect(x - monster.size / 2, y - monster.size / 2, monster.size, monster.size);
      }
    }

    // 자폭병 경고 아이콘 (💥) + 강제 이름 표시
    if (monster.isSuicideBomber) {
      const pulse = Math.sin(performance.now() / 180) * 0.5 + 0.5;
      ctx.font = `bold ${10 + Math.round(pulse * 2)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillStyle = `rgba(239,68,68,${0.8 + pulse * 0.2})`;
      ctx.fillText('💥', x, y - monster.size - 14);
    }

    // 원거리 몬스터 표시: 우상단에 작은 화살표 아이콘
    if (monster.isRanged && monster.monsterType !== 'boss') {
      ctx.fillStyle = 'rgba(255, 220, 100, 0.9)';
      ctx.font = '8px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('◈', x + monster.size * 0.6, y - monster.size * 0.5);
    }

    // HP bar
    const hpRatio = monster.hp / monster.maxHp;
    const barWidth = monster.size * 2;
    const barX = x - barWidth / 2;
    const barY = y - monster.size - 8;

    ctx.fillStyle = COLORS.hp_bar_bg;
    ctx.fillRect(barX, barY, barWidth, 4);
    ctx.fillStyle = COLORS.hp_bar_low;
    ctx.fillRect(barX, barY, barWidth * hpRatio, 4);

    // Name for elites/bosses (자폭병은 항상 표시)
    if (monster.monsterType !== 'normal' || this.showNormalMonsterNames || monster.isSuicideBomber) {
      ctx.fillStyle = monster.monsterType === 'boss' ? '#FCD34D' : 
                      monster.monsterType === 'elite' ? '#F59E0B' : '#D1D5DB';
      ctx.font = monster.monsterType === 'boss' ? 'bold 11px sans-serif' : '10px sans-serif';
      ctx.textAlign = 'center';
      const mName = (monster.displayNameKey && this.t_i18n)
        ? this.t_i18n(monster.displayNameKey)
        : (this.defenderNameFn
            ? (this.defenderNameFn(monster.name, monster.displayName) || monster.displayName)
            : ((this.monsterNameMap[monster.name] as any)?.displayName || monster.displayName));
      const displayLabel = monster.isEnraged
        ? `${mName} 🔥`
        : mName;
      ctx.fillText(displayLabel, x, barY - 4);

      // Affix indicator
      if (monster.affix && monster.affix !== 'none' && monster.monsterType === 'boss') {
        const affixLabels: Record<string, string> = {
          enrage: this.affixEnrageLabel, heal_aura: this.affixHealAuraLabel, summon: this.affixSummonLabel, aoe_slam: this.affixAoeSlamLabel,
        };
        ctx.fillStyle = '#FF6B35';
        ctx.font = '9px sans-serif';
        ctx.fillText(affixLabels[monster.affix] || '', x, barY - 16);
      }
    }

    // Enraged glow effect
    if (monster.isEnraged) {
      ctx.save();
      ctx.shadowColor = '#FF4500';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(x, y, monster.size + 3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 69, 0, 0.6)';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();
    }
  }

  private drawHexagon(x: number, y: number, size: number, strokeOnly = false) {
    const ctx = this.ctx;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const px = x + size * Math.cos(angle);
      const py = y + size * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    if (strokeOnly) ctx.stroke();
    else ctx.fill();
  }

  private drawDiamond(x: number, y: number, size: number, strokeOnly = false) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x - size, y);
    ctx.closePath();
    if (strokeOnly) ctx.stroke();
    else ctx.fill();
  }

  private drawProjectile(proj: Projectile) {
    const ctx = this.ctx;
    const { x, y } = proj.position;

    ctx.save();

    if (proj.type === 'fireball') {
      // Orange/red glow
      ctx.shadowColor = '#FF6B1A';
      ctx.shadowBlur = 16;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, proj.size);
      grad.addColorStop(0, '#FFDD44');
      grad.addColorStop(0.5, '#FF6B1A');
      grad.addColorStop(1, 'rgba(255, 40, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, proj.size, 0, Math.PI * 2);
      ctx.fill();
    } else if (proj.type === 'frostbolt') {
      // Cyan icy glow
      ctx.shadowColor = '#67E8F9';
      ctx.shadowBlur = 14;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, proj.size);
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.4, '#67E8F9');
      grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, proj.size, 0, Math.PI * 2);
      ctx.fill();
      // Ice shard lines
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.8)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        const angle = (Math.PI / 4) * i;
        ctx.beginPath();
        ctx.moveTo(x + Math.cos(angle) * 3, y + Math.sin(angle) * 3);
        ctx.lineTo(x + Math.cos(angle) * (proj.size + 4), y + Math.sin(angle) * (proj.size + 4));
        ctx.stroke();
      }
    } else if (proj.type === 'heal_orb') {
      // Green healing orb
      ctx.shadowColor = '#22C55E';
      ctx.shadowBlur = 14;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, proj.size);
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.5, '#4ADE80');
      grad.addColorStop(1, 'rgba(34, 197, 94, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, proj.size, 0, Math.PI * 2);
      ctx.fill();
      // Cross symbol
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y - 4);
      ctx.lineTo(x, y + 4);
      ctx.moveTo(x - 4, y);
      ctx.lineTo(x + 4, y);
      ctx.stroke();
    } else if (proj.type === 'shadow_bolt') {
      // Purple shadow bolt for summons
      ctx.shadowColor = '#A855F7';
      ctx.shadowBlur = 10;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, proj.size);
      grad.addColorStop(0, '#E9D5FF');
      grad.addColorStop(0.6, '#A855F7');
      grad.addColorStop(1, 'rgba(168, 85, 247, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, proj.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Small core
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(x, y, proj.size * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  /** 보호막 황금 링 (활성 Shield를 가진 영웅/소환수에 표시) */
  private drawShieldRings(state: GameState) {
    const ctx = this.ctx;
    const now = performance.now();
    for (const shield of state.shields) {
      let pos: { x: number; y: number } | null = null;
      let size = 18;
      if (shield.targetType === 'hero') {
        const e = state.heroes.find(h => h.id === shield.targetId && h.isAlive);
        if (e) { pos = e.position; size = e.size; }
      } else {
        const e = state.summons.find(s => s.id === shield.targetId && s.isAlive);
        if (e) { pos = e.position; size = e.size; }
      }
      if (!pos) continue;

      const ratio = shield.maxAmount > 0 ? shield.amount / shield.maxAmount : 0;
      const pulse = Math.sin(now / 280) * 0.25 + 0.75; // 0.5 ~ 1.0
      const alpha = (0.5 + 0.5 * pulse).toFixed(2);

      ctx.save();
      ctx.shadowColor = '#FBBF24';
      ctx.shadowBlur = 10 * pulse;
      ctx.strokeStyle = `rgba(251, 191, 36, ${alpha})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      // 잔여 비율만큼 호(arc) 그리기
      ctx.arc(pos.x, pos.y, size + 6, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ratio);
      ctx.stroke();
      // 가득 찬 옅은 베이스 링
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.18)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, size + 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  /** 소환수 — 작은 오각형 모양 + 이름 */
  private drawSummon(summon: GameSummon) {
    const ctx = this.ctx;
    const { x, y } = summon.position;
    const r = summon.size; // 12px

    // 펜타곤 모양으로 소환수 표시 (원과 구별)
    ctx.save();
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const px = x + r * Math.cos(angle);
      const py = y + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = summon.color;
    ctx.fill();
    ctx.strokeStyle = '#ffffff88';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 역할 아이콘 (작게)
    const icons: Record<string, string> = { tank: '🔰', melee_dps: '⚔', ranged_dps: '✦', healer: '✚', cc: '❄' };
    ctx.fillStyle = '#fff';
    ctx.font = `${r - 2}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(icons[summon.role] ?? '●', x, y);

    // HP 바 (위)
    const barW = r * 2.5;
    const barH = 3;
    const barX = x - barW / 2;
    const barY = y - r - 7;
    const hpRatio = Math.max(0, summon.hp / summon.maxHp);
    ctx.fillStyle = '#333';
    ctx.fillRect(barX, barY, barW, barH);
    ctx.fillStyle = hpRatio > 0.5 ? '#22c55e' : hpRatio > 0.25 ? '#f59e0b' : '#ef4444';
    ctx.fillRect(barX, barY, barW * hpRatio, barH);
    ctx.strokeStyle = '#ffffff44';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(barX, barY, barW, barH);

    // 이름 (아래)
    ctx.fillStyle = `${summon.color}cc`;
    ctx.font = '7px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(summon.displayName, x, y + r + 9);
    ctx.restore();
  }

  private drawExplosion(exp: Explosion) {
    const ctx = this.ctx;
    const progress = 1 - exp.timer / exp.maxTimer; // 0→1
    const radius = exp.maxRadius * Math.sin(progress * Math.PI); // 아치형 확대-축소
    const alpha = exp.timer / exp.maxTimer;
    if (radius <= 0) return;

    ctx.save();
    ctx.globalAlpha = alpha;

    // 외부 링
    const gradient = ctx.createRadialGradient(exp.x, exp.y, 0, exp.x, exp.y, radius);
    gradient.addColorStop(0, '#FFFFFF');
    gradient.addColorStop(0.4, exp.color);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(exp.x, exp.y, radius, 0, Math.PI * 2);
    ctx.fill();

    // 밝은 외곽선
    ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.8})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }

  private drawDamageNumber(dn: DamageNumber) {
    const ctx = this.ctx;
    const alpha = Math.min(1, dn.timer * 2);
    ctx.fillStyle = dn.isHeal
      ? `rgba(34, 197, 94, ${alpha})`
      : dn.color.startsWith('#')
        ? this.hexToRgba(dn.color, alpha)
        : `rgba(255, 255, 255, ${alpha})`;
    ctx.font = `bold ${dn.isHeal ? 14 : 13}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(`${dn.isHeal ? '+' : '-'}${dn.value}`, dn.x, dn.y);
  }

  private drawHUD(state: GameState) {
    const ctx = this.ctx;

    // Phase overlay
    if (state.phase === 'prep' || state.phase === 'wave_clear') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(CANVAS_WIDTH / 2 - 120, 5, 240, 45);
      ctx.fillStyle = '#FBBF24';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      if (state.phase === 'prep') {
        ctx.fillText(`Wave ${state.currentWave + 1} in ${Math.ceil(state.waveTimer)}s`, CANVAS_WIDTH / 2, 25);
      } else {
        ctx.fillText(`Wave ${state.currentWave} Clear!`, CANVAS_WIDTH / 2, 25);
      }
      ctx.fillStyle = '#9CA3AF';
      ctx.font = '12px sans-serif';
      ctx.fillText(`Score: ${state.score} | Gold: ${state.goldEarned}`, CANVAS_WIDTH / 2, 42);
    }

    if (state.phase === 'wave') {
      // Wave counter top-right
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(CANVAS_WIDTH - 160, 5, 155, 30);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'right';
      const maxWaveDisplay = state.maxWave >= 999 ? '∞' : state.maxWave;
      ctx.fillText(`Wave ${state.currentWave}/${maxWaveDisplay}`, CANVAS_WIDTH - 10, 25);

      // Monster count
      const aliveMonsters = state.monsters.filter(m => m.isAlive).length;
      ctx.fillStyle = '#9CA3AF';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Monsters: ${aliveMonsters}`, CANVAS_WIDTH - 10, 45);
    }

    // Victory/Defeat
    if (state.phase === 'victory') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = '#FBBF24';
      ctx.font = 'bold 48px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('VICTORY!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);
      ctx.fillStyle = '#9CA3AF';
      ctx.font = '20px sans-serif';
      ctx.fillText(`Score: ${state.score} | Gold: ${state.goldEarned}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
    }

    if (state.phase === 'defeat') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = '#EF4444';
      ctx.font = 'bold 48px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('DEFEAT', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);
      ctx.fillStyle = '#9CA3AF';
      ctx.font = '20px sans-serif';
      ctx.fillText(`Wave ${state.currentWave} | Score: ${state.score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
    }

    ctx.textAlign = 'left';
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
