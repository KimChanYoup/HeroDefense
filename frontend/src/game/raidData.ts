/**
 * raidData.ts — 레이드 전용 보스 데이터 & 웨이브 스케줄
 *
 * 레이드 모드: 플레이어 파티(5) + AI 3팀(각 5명) = 20명
 * 보스 전용 + 소수 호위대. 잡몹 없음.
 * 보스를 직접 추가/수정하려면 RAID_BOSSES 배열에 항목 추가 후
 * RAID_WAVE_SCHEDULE에 원하는 웨이브에 boss id를 배치하면 됩니다.
 */

import type { BossAffix, WaveConfig } from './types';

// ─── 인터페이스 ──────────────────────────────────────────────────────────────

export interface RaidBossDefinition {
  id: string;
  displayName: string;
  lore: string;              // 보스 배경/컨셉 설명
  hp: number;
  atk: number;
  def: number;
  speed: number;
  isRanged: boolean;
  color: string;
  attackCooldown?: number;
  affixCooldown?: number;
  hasCleave?: boolean;
  auraDamage?: number;
  auraRadius?: number;
  affix?: BossAffix;
  immuneToCc?: boolean;      // true: 슬로우/기절 완전 면역
  ironSkin?: boolean;        // true: 모든 공격 1 데미지 고정 (연타형 필요)
  wallCrash?: boolean;       // true: 특정 X 도달 시 전 영웅 즉사 (DPS 체크)
  vulnerability?: 'melee' | 'ranged'; // 특정 직업군에게만 데미지를 입음
  twinId?: string;           // 쌍둥이 보스 식별자
  invincibleTimer?: number;  // 초기 무적 시간 (초)
  hasSplitDamage?: boolean;  // 피해 분산 로직 활성화
  onlyVulnerableToSummons?: boolean; // 소환수 피해만 허용
  rolePriority?: boolean;    // 역할군 우선순위 타겟팅
  // 호위대 (보스마다 소수 정예 수행자) — 없으면 undefined
  escort?: {
    name: string;
    displayName: string;
    count: number;           // 2~4
    hp: number;
    atk: number;
    def: number;
    speed: number;
    isRanged: boolean;
    color: string;
  };
}

// ─── 웨이브 스케줄 ──────────────────────────────────────────────────────────
// 각 항목: 해당 wave부터 다음 항목 전까지 이 보스 구성이 반복됨
// bosses 배열에 RAID_BOSSES의 id를 넣으면 됨

export const RAID_WAVE_SCHEDULE: Array<{ wave: number; bosses: string[] }> = [
  // ═══ Phase 1: 입문 (W1-9) — 1마리씩 차례대로 ═══
  { wave: 1,  bosses: ['void_colossus'] },         // 공허 거인 — 철갑 피부
  { wave: 2,  bosses: ['stone_titan'] },           // 대지 거인 — DPS 체크
  { wave: 3,  bosses: ['bomb_master_jack'] },      // 폭발의 지배자 잭 — 자폭병 군단 (CC 필수)
  { wave: 4,  bosses: ['sun_priest', 'moon_warrior'] }, // 쌍둥이 태양과 달 — 상성/동시 처치
  { wave: 5,  bosses: ['broodmother_zagg'] },      // 군단 지도자 자그 — 물량 공세 (광역기 필수)
  { wave: 6,  bosses: ['chunsal_magisa'] },        // 천살 마기사 제천 — 전술형 (분산/점멸/Wipe)
  { wave: 7,  bosses: ['soul_guide_gardu'] },      // 영혼의 인도자 가르두 — 소환수 전용
  { wave: 8,  bosses: ['commander_lombardo'] },    // 군단장 롬바르도 — 탱커 전용 (도발 필수)
  { wave: 9,  bosses: ['molten_overlord'] },       // 용암 지배자 — 화염 오라+클리브

  // ═══ Phase 2: 첫 듀오 (W10-17) ═══
  { wave: 10, bosses: ['molten_overlord', 'broodmother_zagg'] },     // 화염 + 물량 지옥
  { wave: 11, bosses: ['sun_priest', 'moon_warrior', 'stone_titan'] }, // 쌍둥이 + 돌진 거인
  { wave: 12, bosses: ['void_ancient', 'chunsal_magisa'] },          // 원거리 면역 + 전술형 보스
  { wave: 13, bosses: ['soul_guide_gardu', 'bomb_master_jack'] },    // 소환수 전용 + 자폭병
  { wave: 14, bosses: ['commander_lombardo', 'bomb_master_jack'] },  // 암살자 + 자폭병
  { wave: 15, bosses: ['frost_titan', 'broodmother_zagg'] },          // 얼음 + 물량 지옥

  { wave: 16, bosses: ['plague_giant', 'earth_crusher'] },
  { wave: 17, bosses: ['abyssal_dragon'] },

  // ═══ Phase 3: 트리오 시작 (W18-24) ═══
  { wave: 18, bosses: ['molten_overlord', 'flame_drake', 'storm_god'] },           // 첫 3마리!
  { wave: 19, bosses: ['void_ancient', 'void_sovereign'] },                         // 공허 지배자 첫 등장
  { wave: 20, bosses: ['death_harbinger', 'plague_giant', 'earth_crusher'] },
  { wave: 21, bosses: ['abyssal_dragon', 'void_sovereign'] },                       // 최강 듀오
  { wave: 22, bosses: ['frost_titan', 'glacial_queen', 'earth_crusher'] },
  { wave: 23, bosses: ['molten_overlord', 'flame_drake', 'storm_god', 'thunder_overlord'] }, // 4마리!
  { wave: 24, bosses: ['abyssal_dragon', 'void_ancient', 'void_sovereign'] },

  // ═══ Phase 4: 최대 5마리 (W25+) ═══
  { wave: 25, bosses: ['molten_overlord', 'frost_titan', 'void_ancient', 'storm_god', 'death_harbinger'] },
  { wave: 26, bosses: ['abyssal_dragon', 'void_sovereign', 'plague_giant'] },
  { wave: 27, bosses: ['molten_overlord', 'flame_drake', 'abyssal_dragon', 'void_sovereign'] },
  { wave: 28, bosses: ['frost_titan', 'glacial_queen', 'earth_crusher', 'void_sovereign', 'abyssal_dragon'] },
  { wave: 29, bosses: ['plague_giant', 'earth_crusher', 'thunder_overlord', 'flame_drake', 'abyssal_dragon'] },
  { wave: 30, bosses: ['molten_overlord', 'flame_drake', 'abyssal_dragon', 'void_sovereign', 'storm_god'] },
  // W30 초과: 위 마지막 항목 반복 + 스탯 추가 스케일링
];

// ─── 보스 정의 ──────────────────────────────────────────────────────────────

export const RAID_BOSSES: RaidBossDefinition[] = [
  // ────────────────────────────────────────────────────────
  // 0. 공허 거인 (Void Colossus) — W1 전용 입문 보스
  // 철갑 피부: 모든 공격이 1 데미지만 입힘. 연타형 영웅(CC 없음, 빠른 공격)으로만 공략 가능.
  // 한 방은 치명적이지만 공격 텀이 매우 느림 → 한 타 버티고 힐로 풀피 회복하면 클리어.
  // CC 통함 (immuneToCc: false) — 힐러+CC+연타딜러 조합이 정석.
  // ────────────────────────────────────────────────────────
  {
    id: 'void_colossus',
    displayName: '공허 거인',
    lore: '공허의 균열에서 걸어나온 불멸의 거인. 온몸이 공허 결정으로 뒤덮여 있어 어떤 일격도 1의 피해밖에 입히지 못한다. 하지만 느린 대신 수천 번의 작은 상처가 쌓이면 쓰러진다.',
    hp: 30_000, atk: 800, def: 99999, speed: 0.7, isRanged: false,
    color: '#6D28D9',
    attackCooldown: 4.0,   // 4초마다 한 번 — 한 방이 치명적이지만 그 사이에 힐 가능
    hasCleave: true,        // 전방 광역 — 탱커 뒤 딜러까지 위험
    affix: 'enrage',        // HP 30% 미만 광폭화 (공격 속도 ↑)
    immuneToCc: false,      // CC 통함 — CC 슬로우로 공격 텀 더 벌릴 수 있음
    ironSkin: true,         // 핵심 메커니즘: 모든 공격 1 데미지
    escort: {
      name: 'void_fragment',
      displayName: '공허 파편',
      count: 4,
      hp: 3000, atk: 80, def: 10, speed: 1.8, isRanged: true,
      color: '#7C3AED',
    },
  },

  // ────────────────────────────────────────────────────────
  // 1. 대지 거인 (Stone Titan) — W2 DPS 체크 보스
  // 10만 HP, 방어력 0, 극저속. 호위대 없음. 벽 근처 도달 시 전 영웅 즉사 광역기.
  // 시간 내 처치 못하면 전멸 → 충분한 딜러 구성 필수.
  // ────────────────────────────────────────────────────────
  {
    id: 'stone_titan',
    displayName: '대지 거인',
    lore: '대지의 심장에서 깨어난 원시 거인. 방어는 없지만 한 번의 발구름으로 세상이 무너진다. 그가 벽에 닿기 전에 쓰러뜨려야 한다.',
    hp: 100_000, atk: 0, def: 0, speed: 0.22, isRanged: false,
    color: '#92400E',
    attackCooldown: 999,    // 일반 공격 없음 — 벽 붕괴로만 위협
    hasCleave: false,
    affix: undefined,
    immuneToCc: false,
    wallCrash: true,        // 벽 붕괴: 특정 X 도달 시 전 영웅 즉사
    // escort 없음 — 혼자 등장
  },

  // ────────────────────────────────────────────────────────
  // 3. 폭발의 지배자 잭 (Jack, the Bomber) — W3 CC 필수 보스
  // 끊임없이 '정예 자폭병'을 소환. 자폭병은 벽에 닿으면 벽 전체 체력의 25%를 날려버림.
  // 자폭병의 체력이 매우 높아(9000), CC로 묶지 않으면 벽이 순식간에 파괴됨.
  // 보스 자신은 원거리에서 화염구를 던지며 저항.
  // ────────────────────────────────────────────────────────
  {
    id: 'bomb_master_jack',
    displayName: '폭발의 지배자 잭',
    lore: '고블린 기술의 정점에 달한 미치광이 폭파 전문가. 수천 개의 폭탄을 짊어진 자폭병들을 지휘하며 세상을 불바다로 만들려 한다.',
    hp: 80_000, atk: 150, def: 50, speed: 0.6, isRanged: true,
    color: '#F97316',
    attackCooldown: 1.0,
    affix: 'summon',        // 메커니즘: 호위대(자폭병) 주기적 재소환
    immuneToCc: false,
    escort: {
      name: 'elite_sapper',
      displayName: '정예 자폭병',
      count: 4,              // 한 번에 4마리씩 사출
      hp: 12_000,            // 딜로만 잡기엔 매우 높은 체력 (CC 연계 필수)
      atk: 5000,             // 벽 도달 시 치명적 피해
      def: 20,
      speed: 1.4,            // 빠른 속도
      isRanged: false,
      color: '#EF4444',
    },
  },

  // ────────────────────────────────────────────────────────
  // 4. 쌍둥이 태양과 달 (The Twin Celestials) — W4 상성/동시 처치
  // 태양의 사제: 원거리 취약(ranged), 달의 전사: 근접 취약(melee).
  // 한 명이 죽으면 10초 내에 다른 한 명을 죽여야 함 (아니면 둘 다 부활).
  // ────────────────────────────────────────────────────────
  {
    id: 'sun_priest',
    displayName: '태양의 사제',
    lore: '찬란한 태양의 마력을 다루는 고대 사제. 신성한 빛의 장벽으로 근접 공격을 모두 튕겨낸다.',
    hp: 120_000, atk: 250, def: 60, speed: 0.5, isRanged: true,
    color: '#FDE047',
    attackCooldown: 1.2,
    affix: 'aoe_slam',      // 광역 빛의 파동
    vulnerability: 'ranged',
    twinId: 'celestials',
    invincibleTimer: 5.0,   // 자리 잡기 전까지 무적
  },
  {
    id: 'moon_warrior',
    displayName: '달의 전사',
    lore: '차가운 달빛 아래 단련된 무사. 원거리 투사체를 무시하는 달빛의 가호를 두르고 있다.',
    hp: 120_000, atk: 350, def: 80, speed: 0.8, isRanged: false,
    color: '#A78BFA',
    attackCooldown: 1.5,
    hasCleave: true,        // 전방 휩쓸기
    vulnerability: 'melee',
    twinId: 'celestials',
    invincibleTimer: 5.0,
  },

  // ────────────────────────────────────────────────────────
  // 5. 군단 지도자 자그 (Zagg, the Broodmother) — W5 광역기(AoE) 필수
  // 보스 자체는 거대하고 느리지만, 0.5초마다 수십 마리의 '그림자 벌레'를 사출.
  // 단일 딜러로는 절대 감당 불가능한 물량. 화면 전체를 뒤덮는 대포쇼 유도.
  // ────────────────────────────────────────────────────────
  {
    id: 'broodmother_zagg',
    displayName: '군단 지도자 자그',
    lore: '심연에서 기어 나온 거대한 어미 벌레. 그녀의 날갯짓 한 번에 수만 마리의 새끼들이 쏟아져 나와 모든 생명력을 갉아먹는다.',
    hp: 200_000, atk: 100, def: 100, speed: 0.3, isRanged: false,
    color: '#10B981', // 에메랄드색 (독/곤충 느낌)
    attackCooldown: 2.0,
    affix: 'summon',
    immuneToCc: true,
    escort: {
      name: 'shadow_swarmer',
      displayName: '그림자 벌레',
      count: 40,             // 한 번에 소환되는 기본 수 (엔진 스케일링 전)
      hp: 1500,              // 광역기 한두 번에 녹을 정도지만 물량이 압도적
      atk: 150,              // 물량이 모이면 벽/탱커가 순식간에 녹음
      def: 0,
      speed: 2.5,            // 매우 빠름
      isRanged: false,
      color: '#064E3B',
    },
  },

  // ────────────────────────────────────────────────────────
  // 6. 천살 마기사 제천 (Jecheon, the Sage of Death) — W6 전술형 보스
  // 1. 천살 만개 (aoe_slam): 전 화면 모든 아군 피해 (10초 쿨)
  // 2. 운명의 공유 (hasSplitDamage): 강력한 평타를 100px 내 아군과 나눠맞음 (3탱 필수)
  // 3. 허공 점멸 (summon): 중앙 이동 후 3초간 주변 폭발 피해
  // ────────────────────────────────────────────────────────
  {
    id: 'chunsal_magisa',
    displayName: '천살 마기사 제천',
    lore: '생과 사의 경계를 허무는 금단의 마법사. 그의 공격은 한 명에겐 죽음을, 여럿에겐 고통을 선사한다.',
    hp: 300_000, atk: 800, def: 120, speed: 0.4, isRanged: false,
    color: '#9333EA', // 보라색
    attackCooldown: 1.5,
    affix: 'aoe_slam',      // 메인 어픽스는 Wipe기
    affixCooldown: 10.0,
    hasSplitDamage: true,   // 패시브: 데미지 분산
    immuneToCc: true,
  },

  // ────────────────────────────────────────────────────────
  // 7. 영혼의 인도자 가르두 (Gardu, the Soul Guide) — W7 소환수 전용 보스
  // 영혼의 결계: 영웅 본체의 직접 공격은 모두 무효화(데미지 0).
  // 오직 소환수(포탑, 하수인, 정령 등)의 공격만 실질적인 피해를 입힘.
  // ────────────────────────────────────────────────────────
  {
    id: 'soul_guide_gardu',
    displayName: '영혼의 인도자 가르두',
    lore: '이승과 저승의 경계에 서 있는 유령 개체. 산 자의 무기로는 결코 그의 영혼에 닿을 수 없다.',
    hp: 150_000, atk: 250, def: 50, speed: 0.6, isRanged: true,
    color: '#6EE7B7', // 청록색 (영혼 느낌)
    attackCooldown: 1.0,
    affix: 'summon',
    onlyVulnerableToSummons: true,
    immuneToCc: false,
    escort: {
      name: 'soul_fragment',
      displayName: '길 잃은 영혼',
      count: 3,
      hp: 8000, atk: 120, def: 20, speed: 1.8, isRanged: false, color: '#A7F3D0'
    },
  },

  // ────────────────────────────────────────────────────────
  // 8. 군단장 롬바르도 (Commander Lombardo) — W8 탱커 전용 보스
  // 침투 작전: 일반 어그로를 무시하고 [힐러 > 메카닉 > 딜러 > 탱커] 순으로 타겟팅.
  // 오직 탱커의 '도발(Taunt)'만이 이들의 타겟을 강제로 고정시킬 수 있음.
  // 다수의 탱커가 도발을 돌려가며 힐러진을 보호해야 함.
  // ────────────────────────────────────────────────────────
  {
    id: 'commander_lombardo',
    displayName: '군단장 롬바르도',
    lore: '적의 후방을 유린하는 그림자 군단의 사령관. 그는 가장 약한 자부터 찾아내어 숨통을 끊는다.',
    hp: 250_000, atk: 400, def: 100, speed: 1.2, isRanged: false,
    color: '#374151', // 어두운 회색 (그림자 느낌)
    attackCooldown: 1.2,
    rolePriority: true,
    immuneToCc: true,
    escort: {
      name: 'shadow_assassin',
      displayName: '그림자 암살자',
      count: 4,
      hp: 10000, atk: 200, def: 30, speed: 2.0, isRanged: false, color: '#1F2937'
    },
  },

  // ────────────────────────────────────────────────────────
  // 9. 용암 지배자 (Molten Overlord)
  // 끝없이 타오르는 화염의 지배자. 근접 클리브+화염 오라로 앞줄을 녹인다.
  // CC 면역 — 슬로우/기절 불가.
  // ────────────────────────────────────────────────────────
  {
    id: 'molten_overlord',
    displayName: '용암 지배자',
    lore: '화산 심부에서 소환된 불의 화신. 그의 주변은 항상 용암이 흐른다.',
    hp: 60_000, atk: 280, def: 80, speed: 1.2, isRanged: false,
    color: '#EF4444',
    attackCooldown: 1.5,
    hasCleave: true,
    auraDamage: 20, auraRadius: 120,
    affix: 'enrage',
    immuneToCc: true,
    escort: { name: 'fire_spirit', displayName: '화염 정령', count: 3, hp: 8000, atk: 120, def: 20, speed: 2.0, isRanged: true, color: '#F97316' },
  },

  // ────────────────────────────────────────────────────────
  // 2. 서리 거인 (Frost Titan)
  // 고방어 + 광역 클리브. 느리지만 한 방이 치명적. CC는 통함.
  // ────────────────────────────────────────────────────────
  {
    id: 'frost_titan',
    displayName: '서리 거인',
    lore: '영원한 빙하 속에 잠들어 있던 거인. 발걸음마다 대지가 얼어붙는다.',
    hp: 80_000, atk: 320, def: 150, speed: 0.8, isRanged: false,
    color: '#93C5FD',
    attackCooldown: 2.5,
    hasCleave: true,
    affix: 'enrage',
    immuneToCc: false,
    escort: { name: 'ice_spirit', displayName: '얼음 정령', count: 3, hp: 7000, atk: 100, def: 30, speed: 1.5, isRanged: false, color: '#BAE6FD' },
  },

  // ────────────────────────────────────────────────────────
  // 3. 공허 고대자 (Void Ancient)
  // 원거리 + CC 면역. AOE 어픽스로 전방 영웅 전체에 피해.
  // ────────────────────────────────────────────────────────
  {
    id: 'void_ancient',
    displayName: '공허 고대자',
    lore: '공허 차원에서 수억 년을 잠든 고대 존재. 그의 눈길이 닿는 곳은 존재 자체가 지워진다.',
    hp: 90_000, atk: 220, def: 60, speed: 1.0, isRanged: true,
    color: '#A855F7',
    attackCooldown: 1.2,
    affix: 'aoe_slam',
    immuneToCc: true,
    escort: { name: 'void_spirit', displayName: '공허 정령', count: 4, hp: 9000, atk: 110, def: 15, speed: 1.8, isRanged: true, color: '#7C3AED' },
  },

  // ────────────────────────────────────────────────────────
  // 4. 폭풍의 신 (Storm God)
  // 극속 원거리. 빠른 공격 + enrage로 HP 저하 시 폭주.
  // ────────────────────────────────────────────────────────
  {
    id: 'storm_god',
    displayName: '폭풍의 신',
    lore: '천공을 지배하는 번개와 폭풍의 신. 그가 노하면 하늘이 갈라진다.',
    hp: 75_000, atk: 350, def: 40, speed: 2.5, isRanged: true,
    color: '#FBBF24',
    attackCooldown: 0.5,
    affix: 'enrage',
    immuneToCc: false,
    escort: { name: 'lightning_spirit', displayName: '번개 정령', count: 3, hp: 6000, atk: 140, def: 10, speed: 2.2, isRanged: true, color: '#EAB308' },
  },

  // ────────────────────────────────────────────────────────
  // 5. 죽음의 전령 (Death Harbinger)
  // 소환 어픽스 + 독 오라. CC 면역.
  // ────────────────────────────────────────────────────────
  {
    id: 'death_harbinger',
    displayName: '죽음의 전령',
    lore: '죽음의 신이 보낸 전령. 그가 지나간 자리엔 시체만 남는다.',
    hp: 100_000, atk: 200, def: 90, speed: 1.5, isRanged: false,
    color: '#6B7280',
    attackCooldown: 1.3,
    auraDamage: 15, auraRadius: 150,
    affix: 'summon',
    immuneToCc: true,
    escort: { name: 'skeleton_archer', displayName: '해골 궁수', count: 4, hp: 5000, atk: 90, def: 20, speed: 1.6, isRanged: true, color: '#D1D5DB' },
  },

  // ────────────────────────────────────────────────────────
  // 6. 역병 거인 (Plague Giant)
  // 광역 독 오라 + 클리브. 힐 오라 어픽스로 지속적으로 체력 회복.
  // ────────────────────────────────────────────────────────
  {
    id: 'plague_giant',
    displayName: '역병 거인',
    lore: '역병의 땅에서 태어난 타락한 거인. 그의 숨결만으로 생명이 시들어간다.',
    hp: 120_000, atk: 250, def: 70, speed: 1.0, isRanged: false,
    color: '#65A30D',
    attackCooldown: 1.8,
    hasCleave: true,
    auraDamage: 25, auraRadius: 200,
    affix: 'heal_aura',
    immuneToCc: false,
    escort: { name: 'plague_mage', displayName: '역병 마법사', count: 3, hp: 7500, atk: 95, def: 25, speed: 1.4, isRanged: true, color: '#84CC16' },
  },

  // ────────────────────────────────────────────────────────
  // 7. 얼음 여왕 (Glacial Queen)
  // 원거리 + 극고방어 + CC 면역. 단순히 방어력이 높아 근딜/물리 상성 최악.
  // ────────────────────────────────────────────────────────
  {
    id: 'glacial_queen',
    displayName: '얼음 여왕',
    lore: '절대 영도를 다스리는 여왕. 그녀의 갑옷은 어떤 무기도 뚫지 못한다.',
    hp: 110_000, atk: 260, def: 200, speed: 1.2, isRanged: true,
    color: '#BAE6FD',
    attackCooldown: 1.2,
    affix: 'enrage',
    immuneToCc: true,
    escort: { name: 'frost_elemental', displayName: '서리 정령', count: 3, hp: 8500, atk: 105, def: 40, speed: 1.3, isRanged: false, color: '#7DD3FC' },
  },

  // ────────────────────────────────────────────────────────
  // 8. 대지 파괴자 (Earth Crusher)
  // 극고체력 + 클리브 + AOE. 느리지만 광역 피해가 압도적.
  // ────────────────────────────────────────────────────────
  {
    id: 'earth_crusher',
    displayName: '대지 파괴자',
    lore: '살아있는 산. 그의 주먹이 떨어지는 곳엔 크레이터가 생긴다.',
    hp: 200_000, atk: 180, def: 120, speed: 0.6, isRanged: false,
    color: '#92400E',
    attackCooldown: 3.0,
    hasCleave: true,
    affix: 'aoe_slam',
    immuneToCc: false,
    escort: { name: 'stone_golem', displayName: '돌 골렘', count: 3, hp: 12000, atk: 80, def: 80, speed: 0.9, isRanged: false, color: '#A8A29E' },
  },

  // ────────────────────────────────────────────────────────
  // 9. 번개 폭군 (Thunder Overlord)
  // 극속 원거리. 공격속도 0.4s, enrage 시 더욱 빨라짐.
  // ────────────────────────────────────────────────────────
  {
    id: 'thunder_overlord',
    displayName: '번개 폭군',
    lore: '번개를 손아귀에 쥔 폭군. 눈에 보이기 전에 이미 쓰러져 있다.',
    hp: 130_000, atk: 300, def: 50, speed: 2.0, isRanged: true,
    color: '#FDE047',
    attackCooldown: 0.4,
    affix: 'enrage',
    immuneToCc: false,
    escort: { name: 'storm_elemental', displayName: '폭풍 정령', count: 3, hp: 7000, atk: 125, def: 15, speed: 2.0, isRanged: true, color: '#FEF08A' },
  },

  // ────────────────────────────────────────────────────────
  // 10. 불꽃 드래곤 (Flame Drake)
  // 화염 오라 + 클리브 + CC 면역. 폭발적 근접 공격.
  // ────────────────────────────────────────────────────────
  {
    id: 'flame_drake',
    displayName: '불꽃 드래곤',
    lore: '용족 중에서도 가장 폭력적인 화염 드래곤. 브레스 한 번으로 전열이 녹아내린다.',
    hp: 150_000, atk: 380, def: 80, speed: 1.8, isRanged: false,
    color: '#F97316',
    attackCooldown: 1.0,
    hasCleave: true,
    auraDamage: 30, auraRadius: 180,
    affix: 'enrage',
    immuneToCc: true,
    escort: { name: 'lava_elemental', displayName: '용암 정령', count: 3, hp: 9000, atk: 130, def: 30, speed: 1.6, isRanged: false, color: '#DC2626' },
  },

  // ────────────────────────────────────────────────────────
  // 11. 심연의 용 (Abyssal Dragon)
  // 모든 능력을 갖춘 최강 드래곤. 원거리+클리브+오라+CC면역+AOE.
  // ────────────────────────────────────────────────────────
  {
    id: 'abyssal_dragon',
    displayName: '심연의 용',
    lore: '심연의 끝에서 소환된 용족의 시조. 그 존재만으로 공간이 뒤틀린다.',
    hp: 180_000, atk: 400, def: 100, speed: 1.5, isRanged: true,
    color: '#312E81',
    attackCooldown: 1.0,
    hasCleave: true,
    auraDamage: 35, auraRadius: 200,
    affix: 'aoe_slam',
    immuneToCc: true,
    escort: { name: 'void_crawler', displayName: '공허 추적자', count: 4, hp: 11000, atk: 150, def: 35, speed: 1.9, isRanged: false, color: '#4C1D95' },
  },

  // ────────────────────────────────────────────────────────
  // 12. 공허 지배자 (Void Sovereign)
  // 힐 오라 + 소환 + CC 면역. 끝없이 체력이 회복되고 부하를 소환한다.
  // ────────────────────────────────────────────────────────
  {
    id: 'void_sovereign',
    displayName: '공허 지배자',
    lore: '공허 차원의 절대 지배자. 죽이지 않으면 영원히 되살아난다.',
    hp: 250_000, atk: 350, def: 120, speed: 1.3, isRanged: false,
    color: '#4C1D95',
    attackCooldown: 1.4,
    auraDamage: 40, auraRadius: 220,
    affix: 'heal_aura',
    immuneToCc: true,
    escort: { name: 'abyss_horror', displayName: '심연의 공포', count: 4, hp: 13000, atk: 160, def: 40, speed: 1.4, isRanged: false, color: '#6D28D9' },
  },
];

// ─── 웨이브 제너레이터 ────────────────────────────────────────────────────────

export function makeRaidWaveGenerator(difficulty: 'easy' | 'normal' | 'hard') {
  return (waveNumber: number): WaveConfig => {
    // 1. 현재 웨이브에 맞는 스케줄 항목 찾기 (가장 마지막으로 waveNumber 이하인 것)
    const schedule = [...RAID_WAVE_SCHEDULE]
      .reverse()
      .find(s => waveNumber >= s.wave) ?? RAID_WAVE_SCHEDULE[0];

    const bossIds = schedule.bosses;
    const bossDefs = bossIds
      .map(id => RAID_BOSSES.find(b => b.id === id))
      .filter((b): b is RaidBossDefinition => !!b);

    // 2. 스탯 스케일링
    const diffMult = difficulty === 'hard' ? 1.5 : difficulty === 'easy' ? 0.65 : 1.0;
    const waveMult = 1 + (waveNumber - 1) * 0.10; // 웨이브당 10% 증가
    // W30 초과 시 지수 스케일 추가 (무한 모드)
    const overflowMult = waveNumber > 30 ? Math.pow(1.15, waveNumber - 30) : 1.0;
    const totalMult = diffMult * waveMult * overflowMult;

    const monsters: WaveConfig['monsters'] = [];

    // 3. 보스 추가 (playerCount=4 이므로 GameEngine이 보스 count 스케일 안 함)
    for (const boss of bossDefs) {
      monsters.push({
        type: 'boss',
        name: boss.id,
        displayName: boss.displayName, displayNameKey: `game.bosses.${boss.id}.name`,
        count: 1,
        hp: Math.round(boss.hp * totalMult),
        atk: Math.round(boss.atk * totalMult),
        def: Math.round(boss.def * Math.sqrt(totalMult)), // 방어는 제곱근 스케일 (너무 커지지 않게)
        speed: boss.speed,
        isRanged: boss.isRanged,
        color: boss.color,
        affix: boss.affix,
        attackCooldown: boss.attackCooldown,
        hasCleave: boss.hasCleave,
        auraDamage: boss.auraDamage
          ? Math.round(boss.auraDamage * totalMult * 0.4) // 오라는 완화 스케일
          : undefined,
        auraRadius: boss.auraRadius,
        immuneToCc: boss.immuneToCc,
        ironSkin: boss.ironSkin,
        wallCrash: boss.wallCrash,
        vulnerability: boss.vulnerability,
        twinId: boss.twinId,
        invincibleTimer: boss.invincibleTimer,
        hasSplitDamage: boss.hasSplitDamage,
        onlyVulnerableToSummons: boss.onlyVulnerableToSummons,
        rolePriority: boss.rolePriority,
      });
    }

    // 4. 호위대 추가 (첫 번째 보스 기준)
    const primaryBoss = bossDefs[0];
    if (primaryBoss && primaryBoss.escort && primaryBoss.escort.count > 0) {
      const e = primaryBoss.escort;
      monsters.push({
        type: 'elite',
        name: e.name,
        displayName: e.displayName, displayNameKey: `game.bosses.${primaryBoss.id}.escort`,
        count: e.count,
        hp: Math.round(e.hp * totalMult * 0.35), // 호위대는 스케일 완화
        atk: Math.round(e.atk * totalMult * 0.35),
        def: e.def,
        speed: e.speed,
        isRanged: e.isRanged,
        color: e.color,
        // 자폭병 여부: 이름 기반 판정
        isSuicideBomber: e.name === 'elite_sapper' || e.name === 'raid_sapper',
        // 8번 레이드 호위대: 보스가 rolePriority면 호위대도 따라감
        rolePriority: primaryBoss.rolePriority,
      });
    }

    return { waveNumber, monsters };
  };
}
