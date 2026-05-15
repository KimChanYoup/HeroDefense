import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

export interface GameResult {
  wave: number;
  score: number;
  cleared: boolean;
  mode: string;
  difficulty?: string;
  ownedHeroCount?: number;
  partySize?: number;
  stageId?: number;
  tutorial?: boolean;
  elementCounts?: Record<string, number>;
  raceCounts?: Record<string, number>;
  roleCounts?: Record<string, number>;
}

const ACHIEVEMENTS: {
  name: string;
  displayName: string;
  description: string;
  rewardGold: number;
  rewardCrystals?: number;
  rewardHeroName?: string;
  rewardHeroId?: string;
  check: (r: GameResult) => boolean;
}[] = [
  // ── 웨이브 & 점수 ───────────────────────────────────────────────────────
  { name: 'wave_5', displayName: 'achievements.wave_5.displayName', description: 'achievements.wave_5.description', rewardGold: 500, check: (r) => r.cleared && r.wave >= 5 },
  { name: 'wave_30', displayName: 'achievements.wave_30.displayName', description: 'achievements.wave_30.description', rewardGold: 5000, check: (r) => r.cleared && r.wave >= 30 },
  { name: 'wave_50', displayName: 'achievements.wave_50.displayName', description: 'achievements.wave_50.description', rewardGold: 10000, rewardCrystals: 500, check: (r) => r.cleared && r.wave >= 50 },
  { name: 'wave_100', displayName: 'achievements.wave_100.displayName', description: 'achievements.wave_100.description', rewardGold: 30000, rewardCrystals: 1500, check: (r) => r.cleared && r.wave >= 100 },
  { name: 'wave_150', displayName: 'achievements.wave_150.displayName', description: 'achievements.wave_150.description', rewardGold: 50000, rewardCrystals: 3000, check: (r) => r.cleared && r.wave >= 150 },
  { name: 'score_10000', displayName: 'achievements.score_10000.displayName', description: 'achievements.score_10000.description', rewardGold: 5000, check: (r) => r.score >= 10000 },
  { name: 'hard_clear', displayName: 'achievements.hard_clear.displayName', description: 'achievements.hard_clear.description', rewardGold: 6000, check: (r) => r.cleared && r.difficulty === 'hard' },

  // ── 튜토리얼 ───────────────────────────────────────────────────────────
  { name: 'tutorial_master', displayName: 'achievements.tutorial_master.displayName', description: 'achievements.tutorial_master.description', rewardGold: 1000, check: (r) => r.tutorial === true },

  // ── 랜드 클리어 (오펜스 모드 - 보상: LR 영웅) ───────────────────────────
  { name: 'land_goblin', displayName: 'achievements.land_goblin.displayName', description: 'achievements.land_goblin.description', rewardGold: 5000, rewardCrystals: 100, rewardHeroName: '고블린 워치프', rewardHeroId: 'ssr_goblin_warchief', check: (r) => r.cleared && r.stageId === 5 },
  { name: 'land_orc', displayName: 'achievements.land_orc.displayName', description: 'achievements.land_orc.description', rewardGold: 6000, rewardCrystals: 100, rewardHeroName: '오크 검귀', rewardHeroId: 'ssr_orc_blademaster', check: (r) => r.cleared && r.stageId === 11 },
  { name: 'land_tauren', displayName: 'achievements.land_tauren.displayName', description: 'achievements.land_tauren.description', rewardGold: 7000, rewardCrystals: 100, rewardHeroName: '붉은갈기 족장', rewardHeroId: 'ssr_tauren_chieftain', check: (r) => r.cleared && r.stageId === 16 },
  { name: 'land_darkelf', displayName: 'achievements.land_darkelf.displayName', description: 'achievements.land_darkelf.description', rewardGold: 8000, rewardCrystals: 200, rewardHeroName: '그림자 군주', rewardHeroId: 'ssr_darkelf_lord', check: (r) => r.cleared && r.stageId === 22 },
  { name: 'land_fire', displayName: 'achievements.land_fire.displayName', description: 'achievements.land_fire.description', rewardGold: 9000, rewardCrystals: 200, rewardHeroName: '불꽃의 잿더미', rewardHeroId: 'ssr_fire_ash', check: (r) => r.cleared && r.stageId === 29 },
  { name: 'land_ice', displayName: 'achievements.land_ice.displayName', description: 'achievements.land_ice.description', rewardGold: 10000, rewardCrystals: 200, rewardHeroName: '서리눈송이 여왕', rewardHeroId: 'ssr_ice_queen', check: (r) => r.cleared && r.stageId === 36 },
  { name: 'land_undead', displayName: 'achievements.land_undead.displayName', description: 'achievements.land_undead.description', rewardGold: 12000, rewardCrystals: 300, rewardHeroName: '죽음의 기사', rewardHeroId: 'ssr_death_knight', check: (r) => r.cleared && r.stageId === 44 },
  { name: 'land_poison', displayName: 'achievements.land_poison.displayName', description: 'achievements.land_poison.description', rewardGold: 14000, rewardCrystals: 300, rewardHeroName: '맹독술사', rewardHeroId: 'ssr_poison_mancer', check: (r) => r.cleared && r.stageId === 52 },
  { name: 'land_merc', displayName: 'achievements.land_merc.displayName', description: 'achievements.land_merc.description', rewardGold: 16000, rewardCrystals: 300, rewardHeroName: '용병왕', rewardHeroId: 'ssr_merc_king', check: (r) => r.cleared && r.stageId === 61 },
  { name: 'land_ele', displayName: 'achievements.land_ele.displayName', description: 'achievements.land_ele.description', rewardGold: 18000, rewardCrystals: 500, rewardHeroName: '정령학자', rewardHeroId: 'ssr_ele_scholar', check: (r) => r.cleared && r.stageId === 70 },
  { name: 'land_sea', displayName: 'achievements.land_sea.displayName', description: 'achievements.land_sea.description', rewardGold: 20000, rewardCrystals: 500, rewardHeroName: '심해의 지배자', rewardHeroId: 'ssr_sea_ruler', check: (r) => r.cleared && r.stageId === 80 },
  { name: 'land_sky', displayName: 'achievements.land_sky.displayName', description: 'achievements.land_sky.description', rewardGold: 25000, rewardCrystals: 500, rewardHeroName: '대천사', rewardHeroId: 'ssr_arch_angel', check: (r) => r.cleared && r.stageId === 90 },
  { name: 'land_demon', displayName: 'achievements.land_demon.displayName', description: 'achievements.land_demon.description', rewardGold: 30000, rewardCrystals: 1000, rewardHeroName: '파멸의 악마군주', rewardHeroId: 'ssr_demon_lord', check: (r) => r.cleared && r.stageId === 102 },
  { name: 'land_dragon', displayName: 'achievements.land_dragon.displayName', description: 'achievements.land_dragon.description', rewardGold: 50000, rewardCrystals: 2000, rewardHeroName: '고대 드래곤 위상', rewardHeroId: 'ssr_dragon_aspect', check: (r) => r.cleared && r.stageId === 116 },

  // ── 섹터 정복 (구역 올 클리어 - 보상: 대량 크리스탈) ────────────────────
  { name: 'sector_1_master', displayName: 'achievements.sector_1_master.displayName', description: 'achievements.sector_1_master.description', rewardGold: 20000, rewardCrystals: 500, check: (r) => r.cleared && r.stageId === 16 },
  { name: 'sector_2_master', displayName: 'achievements.sector_2_master.displayName', description: 'achievements.sector_2_master.description', rewardGold: 40000, rewardCrystals: 1000, check: (r) => r.cleared && r.stageId === 36 },
  { name: 'sector_3_master', displayName: 'achievements.sector_3_master.displayName', description: 'achievements.sector_3_master.description', rewardGold: 70000, rewardCrystals: 1500, check: (r) => r.cleared && r.stageId === 61 },
  { name: 'sector_4_master', displayName: 'achievements.sector_4_master.displayName', description: 'achievements.sector_4_master.description', rewardGold: 120000, rewardCrystals: 2500, check: (r) => r.cleared && r.stageId === 90 },
  { name: 'sector_5_master', displayName: 'achievements.sector_5_master.displayName', description: 'achievements.sector_5_master.description', rewardGold: 250000, rewardCrystals: 5000, check: (r) => r.cleared && r.stageId === 116 },

  // ── 특별 도전 ──────────────────────────────────────────────────────────
  { name: 'elite_master', displayName: 'achievements.elite_master.displayName', description: 'achievements.elite_master.description', rewardGold: 500000, rewardCrystals: 10000, check: (r) => r.cleared && r.stageId === 116 && r.difficulty === 'hard' },

  // ── 역할 전문화 업적 (AR 영웅 보상) ────────────────────────────────────
  {
    name: 'role_5_tank', displayName: 'achievements.role_5_tank.displayName', description: 'achievements.role_5_tank.description', rewardGold: 30000, rewardCrystals: 500, rewardHeroName: '아이언가더', rewardHeroId: 'ssr_iron_guardian',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.roleCounts?.['tank'] ?? 0) >= 5,
  },
  {
    name: 'role_5_melee', displayName: 'achievements.role_5_melee.displayName', description: 'achievements.role_5_melee.description', rewardGold: 30000, rewardCrystals: 500, rewardHeroName: '블레이드로드', rewardHeroId: 'ssr_blade_lord',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.roleCounts?.['melee_dps'] ?? 0) >= 5,
  },
  {
    name: 'role_5_ranged', displayName: 'achievements.role_5_ranged.displayName', description: 'achievements.role_5_ranged.description', rewardGold: 30000, rewardCrystals: 500, rewardHeroName: '황금 사수', rewardHeroId: 'ssr_golden_archer',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.roleCounts?.['ranged_dps'] ?? 0) >= 5,
  },
  {
    name: 'role_5_healer', displayName: 'achievements.role_5_healer.displayName', description: 'achievements.role_5_healer.description', rewardGold: 30000, rewardCrystals: 500, rewardHeroName: '빛의 대사제', rewardHeroId: 'ssr_arch_priest',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.roleCounts?.['healer'] ?? 0) >= 5,
  },
  {
    name: 'role_3_cc', displayName: 'achievements.role_3_cc.displayName', description: 'achievements.role_3_cc.description', rewardGold: 25000, rewardCrystals: 500, rewardHeroName: '봉인의 술사', rewardHeroId: 'ssr_seal_mage',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.roleCounts?.['cc'] ?? 0) >= 3,
  },
  {
    name: 'role_all_5', displayName: 'achievements.role_all_5.displayName', description: 'achievements.role_all_5.description', rewardGold: 40000, rewardCrystals: 800, rewardHeroName: '전장의 지휘관', rewardHeroId: 'ssr_field_commander',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.roleCounts?.['tank'] ?? 0) >= 1 && (r.roleCounts?.['melee_dps'] ?? 0) >= 1 && (r.roleCounts?.['ranged_dps'] ?? 0) >= 1 && (r.roleCounts?.['healer'] ?? 0) >= 1 && (r.roleCounts?.['cc'] ?? 0) >= 1,
  },

  // ── 원소 전문화 업적 (AR 영웅 보상) ────────────────────────────────────
  {
    name: 'elem_shadow_5', displayName: 'achievements.elem_shadow_5.displayName', description: 'achievements.elem_shadow_5.description', rewardGold: 30000, rewardCrystals: 600, rewardHeroName: '어둠의 군주', rewardHeroId: 'ssr_shadow_lord',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.elementCounts?.['암흑'] ?? 0) >= 5,
  },
  {
    name: 'elem_holy_4', displayName: 'achievements.elem_holy_4.displayName', description: 'achievements.elem_holy_4.description', rewardGold: 30000, rewardCrystals: 600, rewardHeroName: '빛의 교황', rewardHeroId: 'ssr_light_pope',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.elementCounts?.['신성'] ?? 0) >= 4,
  },
  {
    name: 'elem_fire_4', displayName: 'achievements.elem_fire_4.displayName', description: 'achievements.elem_fire_4.description', rewardGold: 30000, rewardCrystals: 600, rewardHeroName: '화염의 선견자', rewardHeroId: 'ssr_fire_seer',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.elementCounts?.['화염'] ?? 0) >= 4,
  },
  {
    name: 'elem_nature_4', displayName: 'achievements.elem_nature_4.displayName', description: 'achievements.elem_nature_4.description', rewardGold: 30000, rewardCrystals: 600, rewardHeroName: '숲의 정령왕', rewardHeroId: 'ssr_forest_king',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.elementCounts?.['자연'] ?? 0) >= 4,
  },
  {
    name: 'elem_frost_3', displayName: 'achievements.elem_frost_3.displayName', description: 'achievements.elem_frost_3.description', rewardGold: 25000, rewardCrystals: 500, rewardHeroName: '빙하의 지배자', rewardHeroId: 'ssr_glacier_overlord',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && ((r.elementCounts?.['서리'] ?? 0) + (r.elementCounts?.['냉기'] ?? 0)) >= 3,
  },
  {
    name: 'elem_dragon', displayName: 'achievements.elem_dragon.displayName', description: 'achievements.elem_dragon.description', rewardGold: 20000, rewardCrystals: 400, rewardHeroName: '드래곤 조련사', rewardHeroId: 'ssr_dragon_tamer',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.elementCounts?.['용'] ?? 0) >= 1,
  },
  {
    name: 'elem_thunder_2', displayName: 'achievements.elem_thunder_2.displayName', description: 'achievements.elem_thunder_2.description', rewardGold: 20000, rewardCrystals: 400, rewardHeroName: '천둥신', rewardHeroId: 'ssr_thunder_god',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.elementCounts?.['번개'] ?? 0) >= 2,
  },
  {
    name: 'elem_wind_2', displayName: 'achievements.elem_wind_2.displayName', description: 'achievements.elem_wind_2.description', rewardGold: 20000, rewardCrystals: 400, rewardHeroName: '폭풍의 화신', rewardHeroId: 'ssr_storm_avatar',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.elementCounts?.['바람'] ?? 0) >= 2,
  },
  {
    name: 'elem_poison_3', displayName: 'achievements.elem_poison_3.displayName', description: 'achievements.elem_poison_3.description', rewardGold: 25000, rewardCrystals: 500, rewardHeroName: '역병의 지배자', rewardHeroId: 'ssr_plague_lord',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.elementCounts?.['독'] ?? 0) >= 3,
  },

  // ── 종족 전문화 업적 (AR 영웅 보상) ────────────────────────────────────
  {
    name: 'race_undead_5', displayName: 'achievements.race_undead_5.displayName', description: 'achievements.race_undead_5.description', rewardGold: 50000, rewardCrystals: 1000, rewardHeroName: '자렌텐', rewardHeroId: 'ar_jarlten',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.raceCounts?.['언데드'] ?? 0) >= 5,
  },
  {
    name: 'race_tauren_4', displayName: 'achievements.race_tauren_4.displayName', description: 'achievements.race_tauren_4.description', rewardGold: 50000, rewardCrystals: 1000, rewardHeroName: '마하루크', rewardHeroId: 'ar_maharuuk',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.raceCounts?.['타우렌'] ?? 0) >= 4,
  },
  {
    name: 'race_orc_4', displayName: 'achievements.race_orc_4.displayName', description: 'achievements.race_orc_4.description', rewardGold: 50000, rewardCrystals: 1000, rewardHeroName: '고르그 굳주먹', rewardHeroId: 'ar_gorg',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.raceCounts?.['오크'] ?? 0) >= 4,
  },
  {
    name: 'race_bloodelf_3', displayName: 'achievements.race_bloodelf_3.displayName', description: 'achievements.race_bloodelf_3.description', rewardGold: 25000, rewardCrystals: 500, rewardHeroName: '리안', rewardHeroId: 'ar_lian',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.raceCounts?.['블러드엘프'] ?? 0) >= 3,
  },
  {
    name: 'race_orc_3', displayName: 'achievements.race_orc_3.displayName', description: 'achievements.race_orc_3.description', rewardGold: 25000, rewardCrystals: 500, rewardHeroName: '카르가스', rewardHeroId: 'ar_kargath',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.raceCounts?.['오크'] ?? 0) >= 3,
  },
  {
    name: 'race_bloodelf_5', displayName: 'achievements.race_bloodelf_5.displayName', description: 'achievements.race_bloodelf_5.description', rewardGold: 50000, rewardCrystals: 1000, rewardHeroName: '발라노스', rewardHeroId: 'ar_valanos',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.raceCounts?.['블러드엘프'] ?? 0) >= 5,
  },
  {
    name: 'race_goblin_4', displayName: 'achievements.race_goblin_4.displayName', description: 'achievements.race_goblin_4.description', rewardGold: 30000, rewardCrystals: 600, rewardHeroName: '고블린 황제', rewardHeroId: 'ssr_goblin_emperor',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.raceCounts?.['고블린'] ?? 0) >= 4,
  },
  {
    name: 'race_human_4', displayName: 'achievements.race_human_4.displayName', description: 'achievements.race_human_4.description', rewardGold: 30000, rewardCrystals: 600, rewardHeroName: '왕실 기사단장', rewardHeroId: 'ssr_royal_captain',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.raceCounts?.['인간'] ?? 0) >= 4,
  },
  {
    name: 'race_troll_3', displayName: 'achievements.race_troll_3.displayName', description: 'achievements.race_troll_3.description', rewardGold: 25000, rewardCrystals: 500, rewardHeroName: '부두술왕', rewardHeroId: 'ssr_witch_king',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && ((r.raceCounts?.['트롤'] ?? 0) + (r.raceCounts?.['잔달라 트롤'] ?? 0)) >= 3,
  },
  {
    name: 'race_pandaren_3', displayName: 'achievements.race_pandaren_3.displayName', description: 'achievements.race_pandaren_3.description', rewardGold: 25000, rewardCrystals: 500, rewardHeroName: '황금빛 판다', rewardHeroId: 'ssr_golden_panda',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.raceCounts?.['판다렌'] ?? 0) >= 3,
  },
  {
    name: 'race_dracthyr_2', displayName: 'achievements.race_dracthyr_2.displayName', description: 'achievements.race_dracthyr_2.description', rewardGold: 20000, rewardCrystals: 400, rewardHeroName: '고룡의 후예', rewardHeroId: 'ssr_primordial_dragon_heir',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && (r.raceCounts?.['드렉티르'] ?? 0) >= 2,
  },
  {
    name: 'race_elf_4', displayName: 'achievements.race_elf_4.displayName', description: 'achievements.race_elf_4.description', rewardGold: 30000, rewardCrystals: 600, rewardHeroName: '영원의 엘프 왕', rewardHeroId: 'ssr_eternal_elf_king',
    check: (r) => r.cleared && r.difficulty === 'hard' && r.wave >= 30 && ((r.raceCounts?.['블러드엘프'] ?? 0) + (r.raceCounts?.['공허엘프'] ?? 0) + (r.raceCounts?.['나이트본'] ?? 0) + (r.raceCounts?.['밤엘프'] ?? 0)) >= 4,
  },
];

@Injectable()
export class AchievementService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async getAll(userId: number) {
    for (const ach of ACHIEVEMENTS) {
      await this.prisma.achievement.upsert({
        where: { name: ach.name },
        create: {
          name: ach.name,
          displayName: ach.displayName,
          description: ach.description,
          conditionJson: {},
          rewardGold: ach.rewardGold,
          rewardCrystals: ach.rewardCrystals || 0,
        },
        update: { 
          displayName: ach.displayName, 
          description: ach.description,
          rewardGold: ach.rewardGold,
          rewardCrystals: ach.rewardCrystals || 0,
        },
      });
    }

    const allAchievements = await this.prisma.achievement.findMany();
    const userAchievements = await this.prisma.userAchievement.findMany({
      where: { userId },
      include: { achievement: true },
    });

    const unlockedIds = new Set(userAchievements.map((ua) => ua.achievementId));

    return allAchievements.map((ach) => {
      const meta = ACHIEVEMENTS.find(a => a.name === ach.name);
      return {
        ...ach,
        displayName: meta?.displayName || ach.displayName,
        description: meta?.description || ach.description,
        rewardHeroName: meta?.rewardHeroName,
        rewardHeroId: meta?.rewardHeroId,
        unlocked: unlockedIds.has(ach.id),
        achievedAt: userAchievements.find((ua) => ua.achievementId === ach.id)?.achievedAt || null,
      };
    });
  }

  async checkAndUnlock(userId: number, result: GameResult) {
    const newlyUnlocked: string[] = [];

    const userAchievements = await this.prisma.userAchievement.findMany({
      where: { userId },
      include: { achievement: true },
    });
    const unlockedNames = new Set(userAchievements.map((ua) => ua.achievement.name));

    for (const ach of ACHIEVEMENTS) {
      if (unlockedNames.has(ach.name)) continue;
      if (!ach.check(result)) continue;

      try {
        await this.prisma.$transaction(async (tx) => {
          // 트랜잭션 내에서 재확인 — 동시 요청으로 인한 중복 해금 방지
          const alreadyUnlocked = await tx.userAchievement.findFirst({
            where: { userId, achievement: { name: ach.name } },
          });
          if (alreadyUnlocked) return;

          const dbAch = await tx.achievement.upsert({
            where: { name: ach.name },
            create: {
              name: ach.name,
              displayName: ach.displayName,
              description: ach.description,
              conditionJson: {},
              rewardGold: ach.rewardGold,
              rewardCrystals: ach.rewardCrystals || 0,
            },
            update: {
              displayName: ach.displayName,
              description: ach.description,
              rewardGold: ach.rewardGold,
              rewardCrystals: ach.rewardCrystals || 0,
            },
          });

          await tx.userAchievement.create({
            data: { userId, achievementId: dbAch.id },
          });

          const updateData: any = {};
          if (ach.rewardGold > 0) updateData.gold = { increment: ach.rewardGold };
          if (ach.rewardCrystals && ach.rewardCrystals > 0) updateData.crystals = { increment: ach.rewardCrystals };

          if (Object.keys(updateData).length > 0) {
            await tx.user.update({ where: { id: userId }, data: updateData });
          }
        });
      } catch {
        // 중복 키 등 트랜잭션 충돌은 무시 (이미 다른 요청이 처리함)
        continue;
      }

      if (ach.rewardHeroId) {
        try {
          await this.userService.grantHero(userId, ach.rewardHeroId);
        } catch (err) {
          console.error(`Failed to grant hero reward: ${ach.rewardHeroId}`, err);
        }
      }

      newlyUnlocked.push(ach.displayName);
    }

    return { newlyUnlocked };
  }
}
