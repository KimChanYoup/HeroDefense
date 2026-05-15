import { SKILL_COOLDOWNS } from '../data/SkillCooldowns';
import type { GameHero, GameMonster } from '../types';
import type { GameEngine } from '../GameEngine';

export type SkillContext = { engine: GameEngine; hero: GameHero; dt: number; validTargets: GameMonster[]; healMult: number; skillId: string; };
export type SkillHandler = (ctx: SkillContext) => boolean;

import { handlers as ssrHandlers } from './handlers/SsrSkills';
import { handlers as feldahHandlers } from './handlers/FeldahSkills';
import { handlers as daulgardHandlers } from './handlers/DaulgardSkills';
import { handlers as nostHandlers } from './handlers/NostSkills';
import { handlers as quinchaiHandlers } from './handlers/QuinchaiSkills';
import { handlers as lombHandlers } from './handlers/LombSkills';
import { handlers as muyeongHandlers } from './handlers/MuyeongSkills';
import { handlers as ultHandlers } from './handlers/UltSkills';
import { handlers as dizgarHandlers } from './handlers/DizgarSkills';
import { handlers as ireneHandlers } from './handlers/IreneSkills';
import { handlers as iskierHandlers } from './handlers/IskierSkills';
import { handlers as grelcalHandlers } from './handlers/GrelcalSkills';
import { handlers as zedahHandlers } from './handlers/ZedahSkills';
import { handlers as kaernHandlers } from './handlers/KaernSkills';
import { handlers as helnHandlers } from './handlers/HelnSkills';
import { handlers as seoriHandlers } from './handlers/SeoriSkills';
import { handlers as piljiHandlers } from './handlers/PiljiSkills';
import { handlers as cheondungHandlers } from './handlers/CheondungSkills';
import { handlers as yeshHandlers } from './handlers/YeshSkills';
import { handlers as arthurHandlers } from './handlers/ArthurSkills';
import { handlers as anubHandlers } from './handlers/AnubSkills';
import { handlers as yrelHandlers } from './handlers/YrelSkills';
import { handlers as chenHandlers } from './handlers/ChenSkills';
import { handlers as larisianHandlers } from './handlers/LarisianSkills';
import { handlers as tutanHandlers } from './handlers/TutanSkills';
import { handlers as trontumHandlers } from './handlers/TrontumSkills';
import { handlers as garduHandlers } from './handlers/GarduSkills';
import { handlers as sylvaHandlers } from './handlers/SylvaSkills';
import { handlers as baineHandlers } from './handlers/BaineSkills';
import { handlers as maievHandlers } from './handlers/MaievSkills';
import { handlers as tyranHandlers } from './handlers/TyranSkills';
import { handlers as voljinHandlers } from './handlers/VoljinSkills';
import { handlers as nogHandlers } from './handlers/NogSkills';
import { handlers as maraadHandlers } from './handlers/MaraadSkills';
import { handlers as taranHandlers } from './handlers/TaranSkills';
import { handlers as grayHandlers } from './handlers/GraySkills';
import { handlers as crowHandlers } from './handlers/CrowSkills';
import { handlers as howlHandlers } from './handlers/HowlSkills';
import { handlers as limuHandlers } from './handlers/LimuSkills';
import { handlers as aeinaHandlers } from './handlers/AeinaSkills';
import { handlers as kaliHandlers } from './handlers/KaliSkills';
import { handlers as keltuHandlers } from './handlers/KeltuSkills';
import { handlers as mokraHandlers } from './handlers/MokraSkills';
import { handlers as durgaHandlers } from './handlers/DurgaSkills';
import { handlers as jainaroHandlers } from './handlers/JainaroSkills';
import { handlers as malfuHandlers } from './handlers/MalfuSkills';
import { handlers as magathaHandlers } from './handlers/MagathaSkills';
import { handlers as rakanHandlers } from './handlers/RakanSkills';
import { handlers as zuljinHandlers } from './handlers/ZuljinSkills';
import { handlers as gazroHandlers } from './handlers/GazroSkills';
import { handlers as rixHandlers } from './handlers/RixSkills';
import { handlers as iyenaHandlers } from './handlers/IyenaSkills';
import { handlers as benedictHandlers } from './handlers/BenedictSkills';
import { handlers as hamulHandlers } from './handlers/HamulSkills';
import { handlers as liliHandlers } from './handlers/LiliSkills';
import { handlers as velenHandlers } from './handlers/VelenSkills';
import { handlers as xianghuaHandlers } from './handlers/XianghuaSkills';
import { handlers as arHandlers } from './handlers/ArSkills';
import { handlers as scrapbomHandlers } from './handlers/ScrapbomSkills';
import { handlers as igHandlers } from './handlers/IgSkills';
import { handlers as blHandlers } from './handlers/BlSkills';
import { handlers as gaHandlers } from './handlers/GaSkills';
import { handlers as apHandlers } from './handlers/ApSkills';
import { handlers as smHandlers } from './handlers/SmSkills';
import { handlers as fcHandlers } from './handlers/FcSkills';
import { handlers as slHandlers } from './handlers/SlSkills';
import { handlers as lpHandlers } from './handlers/LpSkills';
import { handlers as fsHandlers } from './handlers/FsSkills';
import { handlers as fkHandlers } from './handlers/FkSkills';
import { handlers as goHandlers } from './handlers/GoSkills';
import { handlers as dtHandlers } from './handlers/DtSkills';
import { handlers as tgHandlers } from './handlers/TgSkills';
import { handlers as saHandlers } from './handlers/SaSkills';
import { handlers as plHandlers } from './handlers/PlSkills';
import { handlers as lkHandlers } from './handlers/LkSkills';
import { handlers as hcHandlers } from './handlers/HcSkills';
import { handlers as geHandlers } from './handlers/GeSkills';
import { handlers as bpHandlers } from './handlers/BpSkills';
import { handlers as rcHandlers } from './handlers/RcSkills';
import { handlers as ogcHandlers } from './handlers/OgcSkills';
import { handlers as wkHandlers } from './handlers/WkSkills';
import { handlers as gpHandlers } from './handlers/GpSkills';
import { handlers as pdhHandlers } from './handlers/PdhSkills';
import { handlers as eekHandlers } from './handlers/EekSkills';

const mergedHandlers: Record<string, SkillHandler> = {
  ...ssrHandlers,
  ...feldahHandlers,
  ...daulgardHandlers,
  ...nostHandlers,
  ...quinchaiHandlers,
  ...lombHandlers,
  ...muyeongHandlers,
  ...ultHandlers,
  ...dizgarHandlers,
  ...ireneHandlers,
  ...iskierHandlers,
  ...grelcalHandlers,
  ...zedahHandlers,
  ...kaernHandlers,
  ...helnHandlers,
  ...seoriHandlers,
  ...piljiHandlers,
  ...cheondungHandlers,
  ...yeshHandlers,
  ...arthurHandlers,
  ...anubHandlers,
  ...yrelHandlers,
  ...chenHandlers,
  ...larisianHandlers,
  ...tutanHandlers,
  ...trontumHandlers,
  ...garduHandlers,
  ...sylvaHandlers,
  ...baineHandlers,
  ...maievHandlers,
  ...tyranHandlers,
  ...voljinHandlers,
  ...nogHandlers,
  ...maraadHandlers,
  ...taranHandlers,
  ...grayHandlers,
  ...crowHandlers,
  ...howlHandlers,
  ...limuHandlers,
  ...aeinaHandlers,
  ...kaliHandlers,
  ...keltuHandlers,
  ...mokraHandlers,
  ...durgaHandlers,
  ...jainaroHandlers,
  ...malfuHandlers,
  ...magathaHandlers,
  ...rakanHandlers,
  ...zuljinHandlers,
  ...gazroHandlers,
  ...rixHandlers,
  ...iyenaHandlers,
  ...benedictHandlers,
  ...hamulHandlers,
  ...liliHandlers,
  ...velenHandlers,
  ...xianghuaHandlers,
  ...arHandlers,
  ...scrapbomHandlers,
  ...igHandlers,
  ...blHandlers,
  ...gaHandlers,
  ...apHandlers,
  ...smHandlers,
  ...fcHandlers,
  ...slHandlers,
  ...lpHandlers,
  ...fsHandlers,
  ...fkHandlers,
  ...goHandlers,
  ...dtHandlers,
  ...tgHandlers,
  ...saHandlers,
  ...plHandlers,
  ...lkHandlers,
  ...hcHandlers,
  ...geHandlers,
  ...bpHandlers,
  ...rcHandlers,
  ...ogcHandlers,
  ...wkHandlers,
  ...gpHandlers,
  ...pdhHandlers,
  ...eekHandlers,
};

export function processHeroSkills(engine: GameEngine, hero: GameHero, dt: number, validTargets: GameMonster[]) {
    if (!hero.equippedSkillIds || hero.equippedSkillIds.length === 0) return;
    if (!hero.skillTimers) hero.skillTimers = {};
    if ((hero.skillTimers['yesh_ret_buff'] ?? 0) > 0) hero.skillTimers['yesh_ret_buff'] -= dt;
    if ((hero.skillTimers['hamul_incarnation_buff'] ?? 0) > 0) hero.skillTimers['hamul_incarnation_buff'] -= dt;
    if ((hero.skillTimers['anub_carapace_buff'] ?? 0) > 0) hero.skillTimers['anub_carapace_buff'] -= dt;
    if ((hero.skillTimers['chen_stagger_buff'] ?? 0) > 0) hero.skillTimers['chen_stagger_buff'] -= dt;
    if ((hero.skillTimers['chen_niuzao_buff'] ?? 0) > 0) hero.skillTimers['chen_niuzao_buff'] -= dt;
    if ((hero.skillTimers['yrel_guardian_buff'] ?? 0) > 0) hero.skillTimers['yrel_guardian_buff'] -= dt;

    let healMult = engine.state.synergies.reduce((acc, s) => s.bonuses.healMult ? acc * s.bonuses.healMult : acc, 1.0);
    if ((hero.skillTimers['hamul_incarnation_buff'] ?? 0) > 0) healMult *= 1.50;

    for (const skillId of hero.equippedSkillIds) {
      if (hero.skillTimers[skillId] === undefined) hero.skillTimers[skillId] = 0;
      if (hero.skillTimers[skillId] > 0) hero.skillTimers[skillId] -= dt;

      if (hero.skillTimers[skillId] <= 0 && validTargets.length > 0) {
        const baseSkillId = skillId.includes('__') ? skillId.split('__')[1] : skillId;
        const handler = mergedHandlers[baseSkillId];
        if (handler) {
          const success = handler({ engine, hero, dt, validTargets, healMult, skillId });
          if (success) {
            if (hero.skillTimers[skillId] <= 0) {
              hero.skillTimers[skillId] = SKILL_COOLDOWNS[baseSkillId] ?? 10;
            }
          }
        }
      }
    }
}
