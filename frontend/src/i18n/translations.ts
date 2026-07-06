export type Language = 'ko' | 'en' | 'ja';

export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
];

const translations = {
  "ko": {
    "shop": {
      "subtitle": "영웅을 영입하거나 방어선을 강화하고, 크리스탈 상품을 구매하세요.",
      "tab": {
        "gold": "영웅 영입 (Gold)",
        "wall": "벽 강화 상점 (Talents)",
        "crystal": "크리스탈 상점 (Crystal)",
        "manghongu": "🔮 망혼구 (亡魂球)"
      },
      "searchPlaceholder": "영웅 이름, 종족(오크), 원소(화염) 검색...",
      "filter": {
        "allRoles": "전체 역할",
        "allGrades": "전체 등급"
      },
      "currency": {
        "owned": "보유 재화"
      },
      "summon": {
        "title": "⚡ 영웅 소환",
        "desc": "랜덤한 영웅을 획득합니다. 이미 보유 중이면 골드로 반환됩니다.",
        "r": "R 등급 영웅 소환",
        "sr": "SR 등급 영웅 소환",
        "ssr": "SSR 등급 영웅 소환",
        "rDesc": "일반 등급 영웅 중 1명을 무작위로 소환합니다.",
        "srDesc": "희귀 등급 영웅 중 1명을 무작위로 소환합니다.",
        "ssrDesc": "전설 등급 영웅 중 1명을 무작위로 소환합니다.",
        "action": "소환"
      },
      "exchange": {
        "title": "💰 골드 교환",
        "desc": "크리스탈을 골드로 환전합니다. 대량 구매일수록 보너스가 늘어납니다.",
        "s": "골드 꾸러미 (소)",
        "m": "골드 꾸러미 (중)",
        "l": "골드 꾸러미 (대)",
        "xl": "골드 꾸러미 (특대)",
        "xxl": "골드 꾸러미 (거대)",
        "bestValue": "최고 효율"
      },
      "charge": {
        "title": "💳 크리스탈 충전",
        "testNotice": "(테스트용 기능입니다. 실제 결제되지 않습니다.)",
        "amount": "크리스탈 {{count}}개",
        "buy": "구매하기"
      },
      "title": "영웅 상점",
      "gold": "골드:",
      "all": "전체",
      "buy": "구매",
      "owned": "보유 중",
      "buying": "구매 중...",
      "notEnoughGold": "골드가 부족합니다!",
      "notEnoughCrystals": "크리스탈이 부족합니다!",
      "purchaseFailed": "구매 실패",
      "chargeSuccess": "💎 {{count}} 크리스탈 충전 완료!",
      "goldBuySuccess": "💰 {{gold}}G 구매 완료!",
      "summonSuccess": "✨ [{{grade}}] {{name}} 소환 성공!",
      "summonDuplicate": "[중복] {{name}} (소울) → 💰 {{gold}}G 반환됨",
      "recruitSuccess": "{{name}} 영입 완료!",
      "buyFailed": "구매에 실패했습니다.",
      "noHeroesFilter": "해당 필터에 영웅이 없습니다",
      "expandSkills": "스킬 목록 보기 ▼",
      "collapseSkills": "스킬 접기 ▲"
    },
    "wall": {
      "tab1": "제 1의 벽",
      "tab2Locked": "🔒 제 2의 벽",
      "tab2Unlocked": "제 2의 벽 (성소)",
      "tab3Locked": "🔒 제 3의 벽",
      "tab3Unlocked": "제 3의 벽 (심연)",
      "bulkAll": "⚡ 전체 일괄 강화",
      "notUpgraded": "아직 강화되지 않았습니다.",
      "notUpgradedHint": "아래 버튼으로 첫 번째 강화를 시작하세요.",
      "currentEffect": "현재 효과",
      "currentEffectRange": "(Rank 1 ~ {{rank}} 전체)",
      "nextEffect": "다음 단계 효과",
      "nextEffectLabel": "(Rank {{rank}})",
      "upgradeBtn": "Rank {{rank}} 강화",
      "maxRank": "✓ 최대 Rank 달성",
      "bulkUpgrade": "⚡ 일괄 강화 ({{count}}단계 · 💰 {{cost}}G 소모)",
      "bulkUpgradeLow": "⚡ 일괄 강화 (골드 부족)",
      "goldLabel": "보유 골드:",
      "seriesLabel": "{{cat}} 계열",
      "upgradeDefault": "{{cat}} 강화",
      "toastGoldShort": "골드가 부족합니다.",
      "toastError": "구매 중 오류가 발생했습니다.",
      "toastRankAchieved": "{{cat}} Rank {{rank}} 달성!",
      "toastBulkAchieved": "일괄 강화: {{cat}} Rank {{rank}} 달성! ({{count}}단계 · {{cost}}G 소모)",
      "toastBulkAll": "전체 일괄: {{count}}단계 강화 완료! ({{cost}}G 소모)",
      "toastLockWall2": "제 1의 벽의 모든 특성을 마스터해야 해금됩니다.",
      "toastLockWall3": "제 2의 벽의 모든 특성을 마스터해야 해금됩니다.",
      "categories": {
        "steel": "강철",
        "fire": "화염",
        "frost": "냉기",
        "life": "생명",
        "thunder": "전기",
        "light": "빛",
        "shadow": "그림자",
        "nature": "자연",
        "blood": "혈액",
        "time": "시간",
        "wind": "바람",
        "earth": "대지",
        "arcane": "비전",
        "void": "공허",
        "storm": "폭풍"
      },
      "talent": {
        "steel": {
          "regularName": "강철의 의지 {{tier}}단계",
          "specialName": "가시 갑옷 {{star}}성",
          "regularDesc": "벽 체력 +{{hp}}, 방어력 +{{def}}",
          "specialDesc": "벽 체력 +{{hp}}, 방어력 +{{def}}, 반사 데미지 +{{reflect}}%"
        },
        "fire": {
          "name": "화염의 숨결 {{tier}}단계",
          "desc": "접근한 적에게 매초 {{dmg}} 화염 피해"
        },
        "frost": {
          "name": "얼어붙은 성벽 {{tier}}단계",
          "desc": "접근한 적 공속/이속 {{slow}}% 감소"
        },
        "life": {
          "regularName": "생명의 맥박 {{tier}}단계",
          "specialName": "수호자의 은혜 {{star}}성",
          "regularDesc": "매 웨이브 종료 시 벽 체력 {{hp}} 회복",
          "specialDesc": "매 웨이브 종료 시 벽 체력 {{hp}} 회복, 아군 전체 방어력 +{{def}}, 웨이브 종료 시 사망 아군 전원 HP {{revive}}%로 부활"
        },
        "thunder": {
          "regularName": "정전기장 {{tier}}단계",
          "specialName": "벼락 반격 {{star}}성",
          "regularDesc": "적 투사체 차단 확률 {{pct}}%",
          "specialDesc": "적 투사체 차단 확률 {{pct}}%, 반격 시 {{dmg}} 번개 피해"
        },
        "light": {
          "name": "성역의 빛 {{tier}}단계",
          "desc": "제 1·2 벽 동시 지속 회복량 +{{val}}"
        },
        "shadow": {
          "name": "공허의 심연 {{tier}}단계",
          "desc": "주변 체력 {{pct}}% 이하 몬스터 즉사"
        },
        "nature": {
          "name": "맹독 가시 덩굴 {{tier}}단계",
          "desc": "주변 적에게 초당 {{dmg}} 독 피해"
        },
        "blood": {
          "name": "흡혈의 벽 {{tier}}단계",
          "desc": "주변 적이 입는 피해의 {{pct}}%를 벽 체력으로 흡수"
        },
        "time": {
          "name": "시간 왜곡 {{tier}}단계",
          "desc": "모든 아군의 스킬 쿨타임 {{pct}}% 감소"
        },
        "wind": {
          "regularName": "질풍의 가호 {{tier}}단계",
          "specialName": "폭풍 질주 {{star}}성",
          "regularDesc": "아군 이동속도 +{{spd}}%, 공격 쿨타임 -{{atkspd}}%",
          "specialDesc": "아군 이동속도가 극대화됩니다"
        },
        "earth": {
          "regularName": "대지의 요새 {{tier}}단계",
          "specialName": "지각 분쇄 {{star}}성",
          "regularDesc": "벽 체력 +{{hp}}, 웨이브 시작 시 전방 {{dmg}} 지진 피해",
          "specialDesc": "벽 체력 +{{hp}}, 웨이브 시작 시 전방 {{dmg}} 지진 피해, 추가 방어력 +{{def}}"
        },
        "arcane": {
          "regularName": "비전 증폭 {{tier}}단계",
          "specialName": "마력 공명 {{star}}성",
          "regularDesc": "아군 투사체·스킬 피해 +{{amp}}%, 적 사망 시 {{explosion}} 마법 폭발",
          "specialDesc": "마법 피해가 폭발적으로 증폭됩니다"
        },
        "void": {
          "regularName": "공허 약화 {{tier}}단계",
          "specialName": "심연의 공포 {{star}}성",
          "regularDesc": "적 공격력 -{{weak}}%, 적 처치 시 벽 체력 {{heal}} 회복",
          "specialDesc": "적 공격력 -{{weak}}%, 적 처치 시 벽 체력 {{heal}} 회복 — 공허의 힘이 적을 압도합니다"
        },
        "storm": {
          "regularName": "폭풍 연속격 {{tier}}단계",
          "specialName": "천공 폭풍 {{star}}성",
          "regularDesc": "주변 적에게 초당 {{dmg}} 폭풍 피해, {{chain}}개 적에게 연쇄",
          "special10Desc": "주변 적에게 초당 {{dmg}} 폭풍 피해, {{chain}}개 적에게 연쇄 — 근딜 영웅이 공격 시 반경 {{radius}}px 광역 50% 추가 피해!",
          "special5Desc": "주변 적에게 초당 {{dmg}} 폭풍 피해, {{chain}}개 적에게 연쇄 — 번개와 바람이 전장을 휩쓸습니다"
        }
      }
    },
    "manghongu": {
      "title": "망혼구 (亡魂球)",
      "desc": "던전 공격 & AI 레이드에만 적용되는 영웅 강화",
      "warning": "⚠ 망혼구는 이론적으로 무한 강화가 가능한 엔드 컨텐츠입니다. 강화할수록 비용이 기하급수적으로 증가합니다.",
      "totalUpgrades": "총 업그레이드",
      "currentBonus": "현재 +{{val}}{{unit}}",
      "nextRank": "다음 Rank {{rank}}: 💰 {{cost}}G",
      "goldLabel": "보유 골드:",
      "toastGoldShort": "골드가 부족합니다.",
      "toastError": "구매 중 오류가 발생했습니다.",
      "toastAchieved": "{{label}} Rank {{rank}} 달성! (+{{bonus}}{{unit}})",
      "stats": {
        "atk": "공격력",
        "def": "방어력",
        "hp": "체력",
        "atkSpeed": "공격속도",
        "spd": "이동속도"
      }
    },
    "achievements": {
      "progress": "달성 진행도: {unlocked}/{total}",
      "reward": {
        "ssr": "SSR 영웅 보상",
        "ar": "AR 영웅 보상",
        "lr": "LR 영웅 보상"
      },
      "title": "업적",
      "unlocked": "달성",
      "failedToLoad": "업적을 불러오지 못했습니다",
      "playToEarn": "게임을 플레이하여 업적을 달성하세요!",
      "exportJson": "JSON 내보내기",
      "gold": "골드",
      "crystal": "크리스탈",
      "land_goblin": {
        "description": "제 1구역: 고블린 영지를 격파했습니다.",
        "displayName": "고블린 영지 정복"
      },
      "wave_30": {
        "description": "웨이브 30을 모두 클리어하세요.",
        "displayName": "전설의 수호자"
      },
      "wave_5": {
        "description": "웨이브 5를 클리어하세요.",
        "displayName": "첫 관문"
      },
      "wave_50": {
        "displayName": "불굴의 수호자",
        "description": "웨이브 50을 모두 클리어하세요."
      },
      "wave_100": {
        "displayName": "전설의 벽",
        "description": "웨이브 100을 클리어하세요."
      },
      "wave_150": {
        "displayName": "신화의 방어자",
        "description": "웨이브 150을 클리어하세요."
      },
      "score_10000": {
        "displayName": "점수의 달인",
        "description": "총 점수 10000점을 달성하세요."
      },
      "hard_clear": {
        "displayName": "어려움의 정복자",
        "description": "어려움 난이도로 클리어하세요."
      },
      "tutorial_master": {
        "displayName": "튜토리얼 마스터",
        "description": "튜토리얼을 완료하세요."
      },
      "land_orc": {
        "displayName": "오크 영지 정복",
        "description": "제 1구역: 오크 영지를 격파했습니다."
      },
      "land_tauren": {
        "displayName": "타우렌 봉우리 정복",
        "description": "제 1구역: 타우렌 봉우리를 격파했습니다."
      },
      "land_darkelf": {
        "displayName": "다크엘프 숲 정복",
        "description": "제 2구역: 다크엘프 숲을 격파했습니다."
      },
      "land_fire": {
        "displayName": "화염의 땅 정복",
        "description": "제 2구역: 화염의 땅을 격파했습니다."
      },
      "land_ice": {
        "displayName": "얼음 나라 정복",
        "description": "제 2구역: 얼음 나라를 격파했습니다."
      },
      "land_undead": {
        "displayName": "버림받은 도시 정복",
        "description": "제 3구역: 언데드 도시를 격파했습니다."
      },
      "land_poison": {
        "displayName": "맹독 늪지대 정복",
        "description": "제 3구역: 맹독 늪지대를 격파했습니다."
      },
      "land_merc": {
        "displayName": "용병 주둔지 정복",
        "description": "제 3구역: 용병 주둔지를 격파했습니다."
      },
      "land_ele": {
        "displayName": "정령의 안식처 정복",
        "description": "제 4구역: 정령의 안식처를 격파했습니다."
      },
      "land_sea": {
        "displayName": "심해의 신전 정복",
        "description": "제 4구역: 심해의 신전을 격파했습니다."
      },
      "land_sky": {
        "displayName": "천공의 성채 정복",
        "description": "제 4구역: 천공의 성채를 격파했습니다."
      },
      "land_demon": {
        "displayName": "악마의 균열 정복",
        "description": "제 5구역: 악마의 균열을 격파했습니다."
      },
      "land_dragon": {
        "displayName": "용의 탑 정복",
        "description": "제 5구역: 용의 탑을 격파했습니다."
      },
      "sector_1_master": {
        "displayName": "야성과 명예 정복자",
        "description": "제 1구역의 모든 랜드(고블린, 오크, 타우렌)를 클리어하세요."
      },
      "sector_2_master": {
        "displayName": "마력의 지배자",
        "description": "제 2구역의 모든 랜드(다크엘프, 화염, 얼음)를 클리어하세요."
      },
      "sector_3_master": {
        "displayName": "죽음을 넘은 자",
        "description": "제 3구역의 모든 랜드(언데드, 맹독, 용병)를 클리어하세요."
      },
      "sector_4_master": {
        "displayName": "원소의 대가",
        "description": "제 4구역의 모든 랜드(정령, 심해, 천공)를 클리어하세요."
      },
      "sector_5_master": {
        "displayName": "신화의 정복자",
        "description": "제 5구역의 모든 랜드(악마, 드래곤)를 클리어하세요."
      },
      "elite_master": {
        "displayName": "정예 난이도 정복자",
        "description": "모든 랜드의 정예(Elite) 난이도를 정복하세요."
      },
      "role_5_tank": {
        "displayName": "철벽의 파티",
        "description": "탱커 5명으로 어려움 난이도 웨이브 30을 클리어하세요."
      },
      "role_5_melee": {
        "displayName": "칼날의 집결",
        "description": "근딜 5명으로 어려움 난이도 웨이브 30을 클리어하세요."
      },
      "role_5_ranged": {
        "displayName": "원거리 지배",
        "description": "원딜 5명으로 어려움 난이도 웨이브 30을 클리어하세요."
      },
      "role_5_healer": {
        "displayName": "완전 치유 파티",
        "description": "힐러 5명으로 어려움 난이도 웨이브 30을 클리어하세요."
      },
      "role_3_cc": {
        "displayName": "봉인의 파티",
        "description": "CC 3명 이상으로 어려움 난이도 웨이브 30을 클리어하세요."
      },
      "role_all_5": {
        "displayName": "완벽한 편성",
        "description": "탱/근딜/원딜/힐러/CC 모두 1명씩 포함하여 어려움 웨이브 30을 클리어하세요."
      },
      "elem_shadow_5": {
        "displayName": "어둠의 군단",
        "description": "암흑 속성 영웅 5명 이상으로 어려움 웨이브 30을 클리어하세요."
      },
      "elem_holy_4": {
        "displayName": "신성한 파티",
        "description": "신성 속성 영웅 4명 이상으로 어려움 웨이브 30을 클리어하세요."
      },
      "elem_fire_4": {
        "displayName": "화염의 군단",
        "description": "화염 속성 영웅 4명 이상으로 어려움 웨이브 30을 클리어하세요."
      },
      "elem_nature_4": {
        "displayName": "자연의 수호대",
        "description": "자연 속성 영웅 4명 이상으로 어려움 웨이브 30을 클리어하세요."
      },
      "elem_frost_3": {
        "displayName": "얼음의 파티",
        "description": "서리+냉기 속성 합산 3명 이상으로 어려움 웨이브 30을 클리어하세요."
      },
      "elem_dragon": {
        "displayName": "용의 축복",
        "description": "용 속성 영웅 1명 이상을 포함하여 어려움 웨이브 30을 클리어하세요."
      },
      "elem_thunder_2": {
        "displayName": "천둥의 파티",
        "description": "번개 속성 영웅 2명 이상으로 어려움 웨이브 30을 클리어하세요."
      },
      "elem_wind_2": {
        "displayName": "폭풍의 파티",
        "description": "바람 속성 영웅 2명 이상으로 어려움 웨이브 30을 클리어하세요."
      },
      "elem_poison_3": {
        "displayName": "역병의 파티",
        "description": "독 속성 영웅 3명 이상으로 어려움 웨이브 30을 클리어하세요."
      },
      "race_undead_5": {
        "displayName": "죽음의 군단 지휘관",
        "description": "언데드 영웅 5명으로 어려움 웨이브 30을 클리어하세요."
      },
      "race_tauren_4": {
        "displayName": "대지의 어머니",
        "description": "타우렌 영웅 4명으로 어려움 웨이브 30을 클리어하세요."
      },
      "race_orc_4": {
        "displayName": "오크의 메아리",
        "description": "오크 영웅 4명으로 어려움 웨이브 30을 클리어하세요."
      },
      "race_bloodelf_3": {
        "displayName": "선혈의 집결",
        "description": "블러드엘프 영웅 3명으로 어려움 웨이브 30을 클리어하세요."
      },
      "race_orc_3": {
        "displayName": "오크 부족의 통일",
        "description": "오크 영웅 3명으로 어려움 웨이브 30을 클리어하세요."
      },
      "race_bloodelf_5": {
        "displayName": "마력의 정점",
        "description": "블러드엘프 영웅 5명으로 어려움 웨이브 30을 클리어하세요."
      },
      "race_goblin_4": {
        "displayName": "고블린 황제군",
        "description": "고블린 종족 영웅 4명 이상으로 어려움 웨이브 30을 클리어하세요."
      },
      "race_human_4": {
        "displayName": "왕국의 기사단",
        "description": "인간 종족 영웅 4명 이상으로 어려움 웨이브 30을 클리어하세요."
      },
      "race_troll_3": {
        "displayName": "트롤 주술 의식",
        "description": "트롤/잔달라 트롤 합산 3명 이상으로 어려움 웨이브 30을 클리어하세요."
      },
      "race_pandaren_3": {
        "displayName": "판다렌의 축복",
        "description": "판다렌 종족 영웅 3명 이상으로 어려움 웨이브 30을 클리어하세요."
      },
      "race_dracthyr_2": {
        "displayName": "드렉티르 각성",
        "description": "드렉티르 종족 영웅 2명 이상으로 어려움 웨이브 30을 클리어하세요."
      },
      "race_elf_4": {
        "displayName": "엘프의 각성",
        "description": "엘프 계열(블러드엘프/공허엘프/나이트본/밤엘프) 합산 4명 이상으로 어려움 웨이브 30을 클리어하세요."
      }
    },
    "roles": {
      "tank": "탱커",
      "melee_dps": "근접 딜러",
      "ranged_dps": "원거리 딜러",
      "healer": "힐러",
      "cc": "군중제어",
      "mechanic": "메카닉",
      "all": "전체"
    },
    "---": "",
    "Key": "KO",
    "nav": {
      "heroDefense": "Hero Defense",
      "dashboard": "대시보드",
      "play": "플레이",
      "tutorial": "튜토리얼",
      "lobby": "로비",
      "aiMatch": "AI 대전",
      "heroes": "영웅",
      "shop": "상점",
      "synergy": "시너지",
      "friends": "친구",
      "achievements": "업적",
      "tournament": "토너먼트",
      "leaderboard": "리더보드",
      "profile": "프로필",
      "guide": "가이드북",
      "login": "로그인",
      "register": "회원가입",
      "logout": "로그아웃"
    },
    "footer": {
      "privacyPolicy": "개인정보 처리방침",
      "termsOfService": "이용약관"
    },
    "privacy": {
      "title": "개인정보 처리방침",
      "lastUpdated": "최종 업데이트: {{date}}",
      "s1Title": "1. 수집하는 정보",
      "s1Intro": "Hero Defense에 계정을 생성하면 다음 개인정보를 수집합니다:",
      "s1Item1Label": "계정 정보:",
      "s1Item1Text": "이메일 주소, 사용자명, 비밀번호(안전한 해시로 저장).",
      "s1Item2Label": "게임 데이터:",
      "s1Item2Text": "게임 통계, 영웅 컬렉션, 업적, 게임 내 진행 상황.",
      "s1Item3Label": "채팅 메시지:",
      "s1Item3Text": "게임 내 채팅 시스템을 통해 전송된 메시지.",
      "s1Item4Label": "기술 데이터:",
      "s1Item4Text": "세션 관리를 위한 로그인 타임스탬프 및 온라인 상태.",
      "s2Title": "2. 정보 이용 방법",
      "s2Item1": "계정 생성 및 관리, 신원 인증.",
      "s2Item2": "멀티플레이어 기능 및 리더보드를 포함한 게임 경험 제공.",
      "s2Item3": "친구 목록 및 게임 내 채팅 같은 소셜 기능 활성화.",
      "s2Item4": "게임 진행 상황 추적 및 영웅 컬렉션 유지.",
      "s3Title": "3. 데이터 저장 및 보안",
      "s3Text": "데이터는 PostgreSQL 데이터베이스에 저장됩니다. 비밀번호는 salt factor 10의 bcrypt로 해싱됩니다. 인증은 JSON Web Token(JWT)을 통해 처리됩니다. 클라이언트와 서버 간의 모든 통신은 HTTPS/WSS로 암호화됩니다.",
      "s4Title": "4. 데이터 공유",
      "s4Text": "개인정보를 제3자에게 판매, 거래, 공유하지 않습니다. 사용자명과 게임 통계는 리더보드 및 멀티플레이어 세션을 통해 다른 플레이어에게 표시될 수 있습니다. 채팅 메시지는 수신자에게만 표시됩니다.",
      "s5Title": "5. 귀하의 권리",
      "s5Intro": "귀하는 다음의 권리를 가집니다:",
      "s5Item1": "프로필 페이지를 통한 개인 데이터 열람.",
      "s5Item2": "언제든지 사용자명 및 프로필 정보 업데이트.",
      "s5Item3": "계정 및 관련 데이터 삭제 요청.",
      "s6Title": "6. 쿠키 및 로컬 스토리지",
      "s6Text": "인증 세션 유지(JWT 토큰 및 기본 사용자 정보)를 위해 브라우저 로컬 스토리지를 사용합니다. 제3자 추적 쿠키는 사용하지 않습니다. 이 데이터는 로그아웃 시 삭제됩니다.",
      "s7Title": "7. 문의",
      "s7Text": "이 애플리케이션은 42 school ft_transcendence 프로젝트의 일환으로 개발되었습니다. 이 개인정보 처리방침에 관한 문의는 42 school 인트라넷을 통해 개발팀에 연락해주세요."
    },
    "terms": {
      "title": "이용약관",
      "lastUpdated": "최종 업데이트: {{date}}",
      "s1Title": "1. 약관 동의",
      "s1Text": "Hero Defense(\"서비스\")에 접근하고 사용함으로써 본 이용약관에 동의하는 것으로 간주됩니다. 이 약관에 동의하지 않으시면 서비스를 이용하지 마십시오.",
      "s2Title": "2. 서비스 설명",
      "s2Text": "Hero Defense는 World of Warcraft 직업 시스템에서 영감을 받은 웹 기반 멀티플레이어 타워 디펜스 게임입니다. 서비스에는 사용자 계정, 실시간 멀티플레이어 게임플레이, 게임 내 채팅, 영웅 컬렉션 및 관련 기능이 포함됩니다. 이 프로젝트는 42 school 커리큘럼(ft_transcendence)의 일환으로 개발되었습니다.",
      "s3Title": "3. 사용자 계정",
      "s3Item1": "등록하려면 유효한 이메일 주소와 고유한 사용자명을 제공해야 합니다.",
      "s3Item2": "계정 자격증명의 보안 유지는 사용자의 책임입니다.",
      "s3Item3": "자동화된 방법으로 계정을 생성하거나 타인을 사칭해서는 안 됩니다.",
      "s3Item4": "1인 1계정만 허용됩니다.",
      "s4Title": "4. 적절한 사용",
      "s4Intro": "서비스 이용 시 다음을 하지 않기로 동의합니다:",
      "s4Item1": "부정한 이점을 얻기 위해 치트, 익스플로잇, 봇 또는 자동화 도구 사용.",
      "s4Item2": "채팅이나 기타 수단을 통해 다른 사용자를 괴롭히거나 위협하거나 학대.",
      "s4Item3": "다른 사용자의 계정이나 개인 데이터에 접근 시도.",
      "s4Item4": "서비스 거부 공격이나 유사한 활동을 통한 서비스 방해.",
      "s4Item5": "채팅 시스템을 통한 스팸, 악성코드 또는 부적절한 콘텐츠 배포.",
      "s5Title": "5. 게임 콘텐츠",
      "s5Text": "모든 게임 내 아이템, 영웅, 재화 및 진행 상황은 가상의 것으로 실제 금전적 가치가 없습니다. 서비스 개선을 위해 언제든지 게임 밸런스, 콘텐츠 및 기능을 수정할 권리를 보유합니다.",
      "s6Title": "6. 지적 재산권",
      "s6Text": "Hero Defense는 교육 프로젝트입니다. 게임 메커닉은 인기 게임에서 영감을 받았지만 모든 코드, 에셋 및 콘텐츠는 ft_transcendence 프로젝트를 위해 제작된 독창적인 작품입니다. World of Warcraft 및 관련 용어는 Blizzard Entertainment의 상표이며 여기서는 설명 목적으로만 사용됩니다.",
      "s7Title": "7. 계정 종료",
      "s7Text": "본 약관을 위반한 계정은 정지 또는 종료될 수 있습니다. 사용자는 언제든지 계정을 삭제할 수 있습니다. 종료 시 관련된 모든 게임 데이터가 영구적으로 삭제됩니다.",
      "s8Title": "8. 면책 조항",
      "s8Text": "서비스는 어떠한 종류의 보증 없이 \"있는 그대로\" 제공됩니다. 교육 프로젝트로서 서비스 가용성과 연속성은 보장되지 않습니다. 데이터 손실이나 서비스 중단에 대해 책임지지 않습니다.",
      "s9Title": "9. 약관 변경",
      "s9Text": "이용약관은 언제든지 업데이트될 수 있습니다. 변경 후 서비스를 계속 이용하면 업데이트된 약관에 동의한 것으로 간주됩니다. 페이지 상단에 최종 업데이트 날짜를 표시합니다."
    },
    "common": {
      "loading": "로딩 중...",
      "save": "저장",
      "cancel": "취소",
      "edit": "[수정]",
      "level": "레벨",
      "experience": "경험치",
      "gold": "골드",
      "online": "온라인",
      "offline": "오프라인",
      "status": "상태",
      "hp": "HP",
      "atk": "공격",
      "def": "방어",
      "spd": "속도",
      "second": "초"
    },
    "login": {
      "title": "로그인",
      "email": "이메일",
      "password": "비밀번호",
      "loginBtn": "로그인",
      "loggingIn": "로그인 중...",
      "noAccount": "계정이 없으신가요?",
      "registerLink": "회원가입",
      "loginFailed": "로그인 실패",
      "emailPlaceholder": "your@email.com",
      "passwordPlaceholder": "비밀번호 입력"
    },
    "register": {
      "title": "계정 만들기",
      "email": "이메일",
      "username": "사용자명",
      "password": "비밀번호",
      "confirmPassword": "비밀번호 확인",
      "registerBtn": "회원가입",
      "creatingAccount": "계정 생성 중...",
      "alreadyHaveAccount": "이미 계정이 있으신가요?",
      "loginLink": "로그인",
      "passwordMismatch": "비밀번호가 일치하지 않습니다",
      "passwordTooShort": "비밀번호는 최소 8자 이상이어야 합니다",
      "usernameLengthError": "사용자명은 3~20자여야 합니다",
      "registrationFailed": "회원가입 실패",
      "emailAlreadyInUse": "이미 사용 중인 이메일입니다.",
      "usernameAlreadyTaken": "이미 사용 중인 닉네임입니다.",
      "loginFailed": "이메일 또는 비밀번호가 올바르지 않습니다.",
      "emailPlaceholder": "your@email.com",
      "usernamePlaceholder": "영웅 이름 (3~20자)",
      "passwordPlaceholder": "최소 8자 이상",
      "confirmPlaceholder": "비밀번호 재입력"
    },
    "dashboard": {
      "welcome": "환영합니다,",
      "level": "레벨",
      "exp": "경험치",
      "gold": "골드",
      "heroes": "영웅",
      "playSolo": "솔로 플레이",
      "playSoloDesc": "솔로 방어 게임 시작",
      "multiplayer": "멀티플레이",
      "multiplayerDesc": "로비 참가 또는 생성",
      "aiMatch": "AI 대전",
      "aiMatchDesc": "AI와 대결하기",
      "tournament": "토너먼트",
      "tournamentDesc": "토너먼트 참가",
      "shop": "상점",
      "shopDesc": "새 영웅 구매",
      "achievements": "업적",
      "achievementsDesc": "진행도 확인",
      "friends": "친구",
      "friendsDesc": "친구 관리",
      "myHeroes": "내 영웅",
      "noHeroes": "영웅이 없습니다",
      "noHeroesDesc": "곧 상점에서 영웅을 구매할 수 있습니다!",
      "leaderboard": "리더보드",
      "leaderboardDesc": "랭킹 확인",
      "tutorialTitle": "튜토리얼",
      "tutorialDesc": "처음 오셨나요? 주인공과 함께 기초를 배워보세요.",
      "tutorialStage1": "Stage 1 — 홀로 맞서다 (5 웨이브)",
      "tutorialHint1": "노스킬 순수 체급으로 생존",
      "tutorialHint2": "5번째 웨이브 보스와의 조우",
      "tutorialStart": "튜토리얼 시작",
      "tutorialSkip": "건너뛰기",
      "shopDesc2": "영웅 영입 & 벽 강화",
      "heroesManageTitle": "내 영웅 관리",
      "heroesManageDesc": "전직 및 스킬 세팅",
      "synergyTitle": "시너지 가이드",
      "synergyDesc": "종족 및 원소 효과 확인"
    },
    "leaderboard": {
      "title": "리더보드",
      "wave": "최고 웨이브",
      "score": "최고 점수",
      "gold": "총 골드 획득",
      "clears": "클리어 수",
      "rank": "순위",
      "player": "플레이어",
      "value": "기록",
      "noData": "아직 기록이 없습니다. 게임을 플레이해보세요!",
      "myRank": "내 순위",
      "waveUnit": "웨이브",
      "clearsUnit": "회",
      "me": "ME",
      "top100": "Top 100",
      "exportCsv": "CSV 내보내기"
    },
    "synergy": {
      "title": "시너지",
      "subtitle": "영웅 시너지",
      "raceTab": "종족",
      "elementTab": "원소",
      "activeLabel": "활성 시너지",
      "activeDesc": "현재 팀에서 발동 중인 시너지",
      "pendingLabel": "준비 중",
      "pendingDesc": "영웅을 더 모으면 발동됩니다",
      "ruleTitle": "시너지 규칙",
      "ruleSummary": "같은 종족/원소 영웅을 일정 수 이상 보유하면 강력한 효과가 발동됩니다.",
      "dragonNote": "(드래곤은 별도 규칙 적용)",
      "activeTag": "활성",
      "pendingTag": "준비중",
      "memberUnit": "명",
      "notImplEffect": "미구현",
      "noHeroes": "영웅 없음",
      "race": {
        "orc": {
          "name": "오크",
          "t1": "전체 체력 +10%",
          "t2": "전체 체력 +20% · 방어 +8",
          "t3": "전체 체력 +30% · 방어 +15"
        },
        "human": {
          "name": "인간",
          "t1": "전체 공격력 +10%",
          "t2": "전체 공격력 +15% · 공격속도 +10%",
          "t3": "전체 공격력 +25% · 공격속도 +15%"
        },
        "elf": {
          "name": "엘프",
          "t1": "CC 지속시간 +30%",
          "t2": "CC 지속시간 +50% · 스킬 범위 +20%",
          "t3": "CC 지속시간 +80% · 스킬 범위 +30%"
        },
        "undead": {
          "name": "언데드",
          "t1": "힐량 +20%",
          "t2": "힐량 +35%",
          "t3": "힐량 +50% · 생명 흡수 10%"
        },
        "tauren": {
          "name": "타우렌",
          "t1": "체력 +15%, 방어력 +5",
          "t2": "체력 +25%, 방어력 +12",
          "t3": "체력 +40%, 방어력 +20"
        },
        "troll": {
          "name": "트롤",
          "t1": "공격속도 +15%",
          "t2": "공격속도 +25%, 힐량 +10%",
          "t3": "공격속도 +35%, 힐량 +20%"
        },
        "pandaren": {
          "name": "판다렌",
          "t1": "방어력 +8, 이동속도 +10%",
          "t2": "방어력 +15, 이동속도 +15%",
          "t3": "방어력 +25, 이동속도 +20%, 체력 +10%"
        },
        "beast": {
          "name": "야수족",
          "t1": "공격력 +12%",
          "t2": "공격력 +20%, 공격속도 +15%, 흡혈 5%"
        },
        "nightelf": {
          "name": "밤엘프",
          "t1": "이동속도 +15%",
          "t2": "이동속도 +25%, 공격력 +12%"
        },
        "goblin": {
          "name": "고블린",
          "t1": "공격속도 +15%",
          "t2": "공격속도 +25%, 공격력 +10%",
          "t3": "공격속도 +35%, 공격력 +15%"
        },
        "draenei": {
          "name": "드레나이",
          "t1": "힐량 +15%",
          "t2": "힐량 +25%, 체력 +10%",
          "t3": "힐량 +40%, 체력 +15%, 방어력 +8"
        },
        "bloodelf": {
          "name": "블러드엘프",
          "t1": "공격력 +12%",
          "t2": "공격력 +20%, 흡혈 5%",
          "t3": "공격력 +30%, 흡혈 10%"
        },
        "voidelf": {
          "name": "공허엘프",
          "t1": "공격력 +10%, 처형 임계값 +5%"
        },
        "lightforged": {
          "name": "빛벼림 드레나이",
          "t1": "힐량 +15%, 공격력 +10%"
        },
        "gnome": {
          "name": "노움",
          "t1": "공격력 +10%",
          "t2": "공격력 +15%, 방어력 +8",
          "t3": "공격력 +20%, 방어력 +15, 체력 +10%"
        },
        "dracthyr": {
          "name": "드렉티르"
        },
        "maghar": {
          "name": "마그하르 오크",
          "t1": "공격력 +12%, 방어력 +5",
          "t2": "공격력 +20%, 방어력 +10%"
        },
        "nightborne": {
          "name": "나이트본",
          "t1": "마법 피해 +15%",
          "t2": "마법 피해 +25%, CC 지속 +20%"
        },
        "dark_iron": {
          "name": "검은무쇠 드워프",
          "t1": "방어력 +10, 체력 +10%",
          "t2": "방어력 +18, 체력 +18%"
        },
        "zandalari": {
          "name": "잔달라 트롤",
          "t1": "공격속도 +15%, 힐량 +10%",
          "t2": "공격속도 +25%, 힐량 +20%"
        },
        "elemental": {
          "name": "정령",
          "t1": "원소 피해 +15%",
          "t2": "원소 피해 +25%, 체력 +10%"
        },
        "demon": {
          "name": "악마",
          "t1": "공격력 +15%, 처형 임계값 +5%",
          "t2": "공격력 +25%, 처형 임계값 +10%"
        },
        "mechanical": {
          "name": "기계",
          "t1": "공격속도 +15%, 방어력 +5"
        },
        "vulpera": {
          "name": "볼페라",
          "t1": "이동속도 +15%, 공격력 +10%"
        }
      },
      "element": {
        "fire": {
          "name": "화염",
          "t1": "전체 공격력 +15%",
          "t2": "전체 공격력 +25%",
          "t3": "전체 공격력 +35% · 화상 효과 부여"
        },
        "frost": {
          "name": "냉기",
          "t1": "적 둔화 +30%",
          "t2": "적 둔화 +60%",
          "t3": "적 둔화 +100% · 빙결 확률 30%"
        },
        "holy": {
          "name": "신성",
          "t1": "힐량 +20%",
          "t2": "힐량 +35%",
          "t3": "힐량 +50% · 최대 체력 +20%"
        },
        "dark": {
          "name": "암흑",
          "t1": "처형 확률 +5% (체력 30% 이하)",
          "t2": "처형 확률 +10%",
          "t3": "처형 확률 +15% · 생명 흡수 15%"
        },
        "nature": {
          "name": "자연",
          "t1": "힐량 +15%",
          "t2": "힐량 +25%, 체력 +10%",
          "t3": "힐량 +40%, 체력 +15%"
        },
        "water": {
          "name": "물",
          "t1": "힐량 +15%, 이동속도 +10%",
          "t2": "힐량 +25%, 이동속도 +15%",
          "t3": "힐량 +35%, 이동속도 +20%, 체력 +10%"
        },
        "thunder": {
          "name": "번개",
          "t1": "공격속도 +20%",
          "t2": "공격속도 +35%, 공격력 +10%",
          "t3": "공격속도 +50%, 공격력 +15%"
        },
        "ice": {
          "name": "서리",
          "t1": "방어력 +10, CC 지속 +20%",
          "t2": "방어력 +20, CC 지속 +40%",
          "t3": "방어력 +30, CC 지속 +60%, 체력 +10%"
        },
        "wind": {
          "name": "바람",
          "t1": "이동속도 +15%, 공격속도 +10%",
          "t2": "이동속도 +20%, 공격속도 +20%",
          "t3": "이동속도 +25%, 공격속도 +30%, 공격력 +10%"
        },
        "poison": {
          "name": "독",
          "t1": "처형 임계값 +5%",
          "t2": "처형 임계값 +10%, 공격력 +10%",
          "t3": "처형 임계값 +15%, 공격력 +15%, 흡혈 5%"
        },
        "flame": {
          "name": "불꽃",
          "t1": "공격력 +18%",
          "t2": "공격력 +28%",
          "t3": "공격력 +40%"
        },
        "dragon": {
          "name": "용 ★",
          "t1": "용의 은총 — 전체 공격력 +20%, 체력 +15% (1명 단독 발동!)"
        },
        "light": {
          "name": "빛"
        },
        "arcane": {
          "name": "비전",
          "t1": "마법 피해 +15%",
          "t2": "마법 피해 +25%, CC 지속 +15%"
        }
      },
      "heroCount": "{count}명"
    },
    "guide": {
      "coreMechanics": "핵심 메커니즘",
      "strategyTip": "기본 전략",
      "strategyDesc": "탱커가 전방을 지키고, 딜러는 빠르게 처치하며, 힐러는 아군을 회복시키고, CC와 메카닉이 상황을 제어합니다. 팀 조화가 생존의 열쇠입니다.",
      "roles": {
        "tank": {
          "title": "탱커 (Tank)",
          "desc": "높은 방어력과 체력을 바탕으로 아군의 최전방을 책임집니다. 몬스터들의 어그로를 끌어 대신 피해를 입으며 적들을 한곳으로 모으는 역할을 합니다."
        },
        "melee_dps": {
          "title": "근접 딜러 (Melee DPS)",
          "desc": "강력한 근접 공격으로 적을 파괴합니다. 탱커 옆에서 보조하거나 강력한 단일 딜링을 담당합니다."
        },
        "ranged_dps": {
          "title": "원거리 딜러 (Ranged DPS)",
          "desc": "안전한 거리에서 적에게 치명적인 피해를 입힙니다. 가장 높은 단일 타겟 파괴력을 자랑합니다."
        },
        "healer": {
          "title": "힐러 (Healer)",
          "desc": "아군의 체력을 회복시키고 보호막을 부여하여 생존을 돕습니다."
        },
        "cc": {
          "title": "군중제어 (CC)",
          "desc": "적의 이동을 방해하거나 기절시켜 전투의 흐름을 제어합니다."
        },
        "mechanic": {
          "title": "메카닉 (Mechanic)",
          "desc": "벽을 수리하거나 기계 장치를 소환하여 아군을 지원하는 하이브리드 직업군입니다."
        }
      },
      "title": "영웅 가이드북",
      "subtitle": "직업군별 역할과 핵심 메커니즘을 알아보세요."
    },
    "friends": {
      "title": "친구",
      "addFriend": "친구 추가",
      "searchPlaceholder": "사용자명으로 검색 (최소 2자)...",
      "pendingRequests": "친구 요청",
      "myFriends": "내 친구",
      "noFriends": "친구가 없습니다. 위에서 검색해보세요!",
      "add": "추가",
      "accept": "수락",
      "reject": "거절",
      "remove": "삭제",
      "online": "온라인",
      "offline": "오프라인",
      "failedToSend": "요청 전송 실패",
      "failedToAccept": "수락 실패",
      "failedToReject": "거절 실패",
      "failedToRemove": "삭제 실패",
      "requestSent": "{username}님에게 친구 요청을 보냈습니다.",
      "removeConfirm": "{username}님을 친구 목록에서 삭제하시겠습니까?",
      "removed": "{username}님을 친구 목록에서 삭제했습니다.",
      "requestAccepted": "친구 요청을 수락했습니다.",
      "requestRejected": "친구 요청을 거절했습니다.",
      "message": "메시지",
      "chatWith": "{username}님과 대화",
      "chatPlaceholder": "메시지 입력...",
      "send": "전송",
      "noMessages": "아직 메시지가 없습니다. 대화를 시작해보세요!",
      "failedToLoad": "메시지를 불러오지 못했습니다.",
      "failedToSend2": "메시지 전송 실패"
    },
    "profile": {
      "title": "내 프로필",
      "username": "사용자명",
      "email": "이메일",
      "level": "레벨",
      "experience": "경험치",
      "ownedHeroes": "영웅 보유 수",
      "crystals": "보유 크리스탈",
      "gold": "골드",
      "status": "상태",
      "memberSince": "가입일:",
      "lastLogin": "마지막 로그인:",
      "save": "저장",
      "cancel": "취소",
      "edit": "[수정]",
      "profileUpdated": "프로필이 업데이트되었습니다!",
      "updateFailed": "업데이트 실패",
      "failedToLoad": "프로필을 불러오지 못했습니다",
      "online": "온라인",
      "offline": "오프라인",
      "usernameLengthError": "사용자명은 3~20자여야 합니다",
      "imageOnly": "이미지 파일만 업로드 가능합니다.",
      "avatarUpdated": "아바타가 업데이트되었습니다.",
      "avatarFailed": "아바타 업로드에 실패했습니다.",
      "changeAvatar": "클릭하여 아바타 변경",
      "changeBtn": "변경",
      "gdprTitle": "개인정보 관리 (GDPR)",
      "gdprDesc": "내 데이터를 내보내거나 계정을 완전히 삭제할 수 있습니다.",
      "gdprExport": "내 데이터 다운로드 (JSON)",
      "gdprDelete": "계정 영구 삭제",
      "gdprExportFailed": "데이터 내보내기에 실패했습니다.",
      "gdprDeleteFailed": "계정 삭제에 실패했습니다.",
      "gdprDeleteTitle": "계정 영구 삭제",
      "gdprDeleteDesc": "모든 데이터(영웅, 업적, 골드, 크리스탈)가 영구적으로 삭제됩니다.\n이 작업은 취소할 수 없습니다.",
      "gdprDeleteConfirm": "영구 삭제 확인",
      "gdprDeleting": "삭제 중..."
    },
    "tournament": {
      "title": "토너먼트",
      "createTournament": "토너먼트 만들기",
      "openTournaments": "참가 가능한 토너먼트",
      "noOpenTournaments": "참가 가능한 토너먼트 없음",
      "creating": "생성 중...",
      "create": "만들기",
      "players": "명",
      "waiting": "대기 중",
      "inProgress": "진행 중",
      "completed": "완료",
      "waitingForPlayers": "플레이어 대기 중",
      "host": "주최자:",
      "maxPlayers": "최대",
      "join": "참가",
      "leave": "나가기",
      "start": "시작",
      "bracket": "대진표",
      "round": "라운드",
      "submitResult": "결과 제출",
      "submit": "제출",
      "cancel": "취소",
      "winner": "승자:",
      "dismiss": "닫기",
      "yourMatch": "내 경기!",
      "playThenSubmit": "게임 후 결과를 제출하세요.",
      "selectOrCreate": "토너먼트를 선택하거나 만들어보세요",
      "failedToLoad": "토너먼트 불러오기 실패",
      "failedToCreate": "토너먼트 생성 실패",
      "failedToJoin": "참가 실패",
      "failedToLeave": "나가기 실패",
      "failedToStart": "시작 실패",
      "failedToSubmit": "결과 제출 실패",
      "namePlaceholder": "토너먼트 이름",
      "score": "점수",
      "done": "✓ 완료"
    },
    "lobby": {
      "title": "멀티플레이 로비",
      "createLobby": "로비 만들기",
      "cancelCreate": "취소",
      "createNewLobby": "새 로비 만들기",
      "lobbyName": "로비 이름",
      "mode": "모드",
      "party": "파티 (2인)",
      "raid": "레이드 (3인)",
      "noLobbies": "참가 가능한 로비가 없습니다",
      "noLobbiesDesc": "로비를 만들어 게임을 시작하세요!",
      "players": "명",
      "host": "호스트",
      "ready": "준비 완료",
      "notReady": "준비 안됨",
      "cancelReady": "준비 취소",
      "startGame": "게임 시작",
      "leaveLobby": "로비 나가기",
      "chat": "채팅",
      "typeMessage": "메시지 입력...",
      "send": "전송",
      "full": "가득 참",
      "join": "참가",
      "lobbyNamePlaceholder": "내 로비"
    },
    "game": {
      "title": "Hero Defense",
      "achievementUnlocked": "업적 달성!",
      "multiplayer": "멀티플레이",
      "host": "(호스트)",
      "guest": "(게스트)",
      "players": "플레이어:",
      "startGame": "게임 시작",
      "resume": "재개",
      "pause": "일시정지",
      "reset": "초기화",
      "playAgain": "다시 플레이",
      "difficulty": "난이도",
      "waves": "웨이브",
      "easy": "쉬움",
      "normal": "보통",
      "hard": "어려움",
      "easyDesc": "몬스터 HP/ATK x0.7",
      "normalDesc": "기본 난이도",
      "hardDesc": "몬스터 HP x1.5, ATK x1.4",
      "activeSynergies": "활성 시너지",
      "bossAbilities": "보스 기술",
      "victory": "승리",
      "defeat": "패배",
      "fighting": "전투 중...",
      "preparing": "준비 중...",
      "range": "사거리",
      "activeSynergyPreview": "✨ 활성 시너지",
      "heroSearchPlaceholder": "이름 · 종족 · 원소 · 역할로 검색...",
      "hostLeft": "호스트가 게임을 떠났습니다.",
      "hostLeftDesc": "{n}초 후 게임이 종료됩니다.",
      "tabDungeonDefense": "🛡 던전 방어",
      "tabDungeonAttack": "⚔ 던전 공격",
      "tabRaid": "🐉 레이드",
      "infiniteFloor": "1천층 디펜스",
      "partySetup": "⚔ 파티 편성",
      "partySelectHint": "카드 클릭으로 선택/해제",
      "partySearchPlaceholder": "이름, 종족, 원소, 역할로 검색... (예: 화염, 해골, 탱커)",
      "dragHint": "✋ 영웅을 드래그해 시작 위치를 조정하세요",
      "wallLabel": "방어선",
      "autoTurret": "자동 포탑",
      "wall2Label": "제 2방어선",
      "wall3Label": "제 3방어선",
      "showNormalMonsterNames": "일반 몬스터 이름 표시",
      "damage": "딜량",
      "healing": "힐량",
      "damageTaken": "받은피해",
      "shieldLabel": "방어막",
      "gameClear": "🏆 게임 클리어!",
      "gameOver": "💀 게임 오버",
      "backToMain": "메인화면",
      "backToMainHint": "후 메인화면으로 자동 이동합니다...",
      "waveLabel": "웨이브",
      "score": "점수",
      "goldEarned": "획득 골드",
      "bossExplosion": "💥 자폭병 폭발! 벽 {{damage}} 피해!",
      "bossSapperHit": "💥 자폭병 폭발! {{count}}명의 현재 HP 50% 감소!",
      "bossSlam": "💀 {{name}}의 대지 진동! 모두가 쓰러졌다!",
      "bossEnrage": "{{name}} 광폭화! 공격력 50% 증가!",
      "bossArcaneEnd": "{{name}}의 마력 폭발이 멈췄습니다.",
      "bossThousandBloom": "{{name}} 천살 만개! 전 화면 피해!",
      "bossGroundSlam": "{{name}} 대지 강타! {{count}}명 적중!",
      "bossVoidBlink": "{{name}} 허공 점멸! 중앙 마력 폭발!",
      "bossLegionSummon": "{{name}} 군단 소환! {{count}}마리의 {{type}} 등장!",
      "bossDefenseDistributed": "{{name}}의 강력한 공격을 {{count}}명이 분산해서 막아냈습니다!",
      "bossAttackConcentrated": "{{name}}의 공격이 집중되어 치명적인 피해를 입었습니다! (현재 {{count}}명)",
      "goldSavedTitle": "골드 저장 완료!",
      "goldSavedApplied": "계정에 반영됐습니다",
      "turret": {
        "title": "🔧 메카닉 확인! 포탑 위치를 설정합니다.",
        "allPlaced": "모든 포탑 위치 지정 완료! 전투 시작 버튼을 눌러주세요.",
        "placing": "포탑 {{n}} / {{max}} — 아래 필드의 왼쪽 영역(하이라이트)을 클릭하세요.",
        "wallLabel": "벽",
        "zone": "포탑 배치 가능 영역",
        "clickPrompt": "← 왼쪽 영역 클릭",
        "undo": "↩ 되돌리기",
        "placed": "{{n}} / {{max}} 배치",
        "start": "전투 시작 ⚡"
      },
      "challengeEnd": "💀 {{n}}웨이브에서 도전 종료",
      "checkpointStart": "체크포인트에서 이어하기",
      "waveN": "{{n}}웨이브",
      "reward1000Title": "무한 던전 1000층 완주!",
      "legendaryGuardian": "전설의 수호자",
      "defenseHero": "디펜스 용사",
      "defenseHeroDesc": "모든 스킬 장착 가능 + 모든 직업 선택 가능\\n+ 다른 영웅의 고유 특성 최대 3개 흡수",
      "heroJoinMsg": "1000층의 파도를 모두 막아낸 당신에게\\n[{{name}}]이 합류했습니다!",
      "exitConfirmTitle": "게임 진행 중",
      "exitConfirmDescInfinite": "현재 {{wave}}웨이브까지 진행했습니다.\\n진척도와 골드 (+{{gold}})를\\n저장하고 나가시겠습니까?",
      "exitConfirmDescNormal": "지금 나가시면 이번 게임에서\\n얻은 골드를 모두 잃습니다.\\n정말 나가시겠습니까?",
      "continuePlay": "계속 플레이",
      "saveAndExit": "💾 진척도 저장 후 나가기",
      "justExit": "그냥 나가기",
      "exitGame": "나가기",
      "exitConfirmDescInfiniteFloor": "현재 {{floor}}층 진행 중.\n진척도와 골드 (+{{gold}})를\n저장하고 나가시겠습니까?",
      "exitConfirmDescInfiniteNav": "무한모드 진행 중입니다.\n진척도와 골드를 저장하고 나가시겠습니까?",
      "exitConfirmDescTabSwitch": "탭을 전환하면 진행 중인 게임이 종료되고\n얻은 골드를 잃습니다.",
      "switchTab": "탭 전환",
      "exitConfirmNavBlocked": "게임 진행 중에는 이동할 수 없습니다",
      "exitConfirmTabBlocked": "게임 진행 중에는 탭을 전환할 수 없습니다",
      "startWave": "시작 웨이브",
      "fromStart": "처음부터",
      "waveUnit": "웨이브",
      "bestRecord": "최고 기록: {{n}}웨이브",
      "heroSelected": "✓ 선택",
      "moreNeeded": "{n}명 더 선택 필요",
      "raidStart": "레이드 시작 ({cur}/{max})",
      "startFromWave": "{n}웨이브부터 시작",
      "raidModeTitle": "🐉 레이드 모드",
      "raidStageModeShort": "📋 스테이지",
      "raidInfiniteModeShort": "♾ 무한",
      "raidStageInfo": "스테이지 {n} — {boss}",
      "raidIronSkinLabel": "[철갑 피부: 모든 피해 1]",
      "raidCleaveLabel": "[광역]",
      "raidCcImmuneLabel": "[CC면역]",
      "raidEnrageLabel": "[격노: 30%]",
      "raidInfiniteSimpleDesc": "레이드 보스가 순서대로 등장하는 무한 모드입니다. 웨이브 수와 난이도를 아래에서 설정하세요.",
      "raidStageMode": "⚔️ 스테이지",
      "raidInfiniteMode": "♾️ 무한 모드",
      "raidInfiniteDesc": "♾️ {bold}무한 모드{/bold}: 아래 웨이브 수 선택 후 시작하면 레이드 전체 스케줄로 진행됩니다.",
      "raidBestWave": "최고 기록: {n}웨이브",
      "raidSimultaneous": "{n}마리 동시",
      "raidClearBadge": "✓ 클리어 완료",
      "raidStageClear": "🏆 스테이지 {{n}} 클리어! {{boss}}",
      "raidAttackCycle": "주기",
      "raidEscort": "호위대: {name} ×{count}",
      "raidNoEscort": "호위대: 없음",
      "raidIronSkinBad": "강타형 영웅 — 큰 피해도 1로 제한",
      "raidIronSkinGood1": "연타형 (원거리·CC) — 1×N 누적",
      "raidIronSkinGood2": "힐러 필수 — {n}s마다 강타 회복",
      "raidMyParty": "내 영웅 편성",
      "raidPartyHint": "클릭으로 선택/해제 · 최대 5명",
      "raidPartyCount": "파티: 내 영웅 {me}명 + AI 파티 5명 = 총 {total}명",
      "raidPartyCountRaid": "레이드: 내 영웅 {me}명 + AI 파티 15명 = 총 {total}명",
      "affixIronSkin": "철갑 피부",
      "affixCcImmune": "CC 면역",
      "affixCleave": "전방 클리브",
      "affixEnrage": "광폭화",
      "affixHealAura": "자가 회복",
      "affixSummon": "소환",
      "affixAoeSlam": "광역 강타",
      "bosses": {
        "void_colossus": {
          "name": "공허 거인",
          "escort": "공허 파편"
        },
        "stone_titan": {
          "name": "대지 거인"
        },
        "bomb_master_jack": {
          "name": "폭발의 지배자 잭",
          "escort": "정예 자폭병"
        },
        "sun_priest": {
          "name": "태양의 사제"
        },
        "moon_warrior": {
          "name": "달의 전사"
        },
        "broodmother_zagg": {
          "name": "군단 지도자 자그",
          "escort": "그림자 벌레"
        },
        "chunsal_magisa": {
          "name": "천살 마기사 제천"
        },
        "soul_guide_gardu": {
          "name": "영혼의 인도자 가르두",
          "escort": "길 잃은 영혼"
        },
        "commander_lombardo": {
          "name": "군단장 롬바르도",
          "escort": "그림자 암살자"
        },
        "molten_overlord": {
          "name": "용암 지배자",
          "escort": "화염 정령"
        },
        "frost_titan": {
          "name": "서리 거인",
          "escort": "얼음 정령"
        },
        "void_ancient": {
          "name": "공허 고대자",
          "escort": "공허 정령"
        },
        "storm_god": {
          "name": "폭풍의 신",
          "escort": "번개 정령"
        },
        "death_harbinger": {
          "name": "죽음의 전령",
          "escort": "해골 궁수"
        },
        "plague_giant": {
          "name": "역병 거인",
          "escort": "역병 마법사"
        },
        "glacial_queen": {
          "name": "얼음 여왕",
          "escort": "서리 정령"
        },
        "earth_crusher": {
          "name": "대지 파괴자",
          "escort": "돌 골렘"
        },
        "thunder_overlord": {
          "name": "번개 폭군",
          "escort": "폭풍 정령"
        },
        "flame_drake": {
          "name": "불꽃 드래곤",
          "escort": "용암 정령"
        },
        "abyssal_dragon": {
          "name": "심연의 용",
          "escort": "공허 추적자"
        },
        "void_sovereign": {
          "name": "공허 지배자",
          "escort": "심연의 공포"
        }
      }
    },
    "aiGame": {
      "title": "AI 대전 모드",
      "subtitle": "AI 최적화 파티에 도전하세요!",
      "tabAiParty": "👥 AI 파티 (10인)",
      "tabAiRaid": "⚔️ AI 레이드 (20인)",
      "tabMercenary": "🛡️ 용병단",
      "tabPvp": "🏆 PvP (준비 중)",
      "startBoth": "모두 시작",
      "yourScore": "내 점수",
      "aiScore": "내 점수",
      "wave": "웨이브",
      "youWin": "승리!",
      "aiWins": "AI 승리!",
      "yourParty": "내 파티",
      "aiParty": "AI 파티",
      "aiStrategy": "AI 전략",
      "upgradeConfirm": "{name}을(를) {star}성으로 강화하시겠습니까?\\n소모 골드: {cost}G",
      "ownedGold": "보유 골드",
      "tabDescParty": "10인 협동",
      "tabDescRaid": "20인 협동",
      "tabDescFactions": "AI 육성",
      "tabDescPvp": "AI 대전",
      "mercenaryTitle": "🛡️ AI 용병단 시스템",
      "mercenaryDesc": "오펜스 모드에서 해당 지역을 완전히 정복하면 용병단이 해금됩니다. 골드를 투자해 용병단의 성급을 올리면 AI 동료들이 더욱 강력해집니다!",
      "factionRace": "종족: {race}",
      "factionUnlockTitle": "해금 조건",
      "factionUnlockDesc": "오펜스 모드 [{region}] 일반 올클리어",
      "factionStatMult": "능력치 배율",
      "factionBonusDef": "보너스 방어",
      "factionUpgrade": "{star}성 → {star2}성 강화",
      "factionUpgradeLocked": "🔐 정예 클리어 시 강화 가능",
      "factionMaxed": "✨ 최대 강화 달성 ✨",
      "ai1000Title": "AI 협동 1000층 완주!",
      "ai1000Subtitle": "전략의 신",
      "ai1000HeroName": "AI 용사",
      "ai1000HeroRace": "기계 · 번개",
      "ai1000Skills": "모든 스킬 장착 가능 + 모든 직업 선택 가능",
      "ai1000Buff": "+ 파티 전체 공격속도 최대 30% 향상",
      "ai1000Flavor": "AI와 함께 1000층의 파도를 극복한 당신에게",
      "ai1000Joined": "[AI 용사]가 합류했습니다!",
      "raid1000Title": "AI 레이드 무한 1000층 완주!",
      "raid1000Subtitle": "전설의 레이더",
      "raid1000HeroName": "레이드 용사",
      "raid1000HeroRace": "엘프 · 신성",
      "raid1000Buff": "+ 보스/엘리트에게 최대 80% 추가 피해",
      "raid1000Flavor": "레이드 무한 1000층을 정복한 당신에게",
      "raid1000Joined": "[레이드 용사]가 합류했습니다!",
      "pvpTitle": "PvP AI 대전",
      "pvpDesc": "AI와 동일한 웨이브에서 맞붙어 점수를 겨루는 대전 모드입니다.\\n현재 준비 중입니다.",
      "partyScaleParty": "(2인 협동 규모)",
      "partyScaleRaid": "(4인 협동, 보스 전용 레이드)",
      "infinitePartyLabel": "∞ AI 파티",
      "infiniteRaidLabel": "∞ AI 레이드",
      "infinitePartyWarning": "⚠ AI 파티 무한: 적이 일반 무한의 2.5배 강합니다",
      "infiniteRaidWarning": "⚠ AI 레이드 무한: 벽 없이 보스와 직접 대결. 2.5배 강한 적",
      "resumeHint": "({n}웨이브부터 재개 가능)",
      "companionSelect": "AI 동료 선택",
      "companionSelectParty": "AI 동료 선택 (파티 {n})",
      "startPartyBtn": "⚔️ AI 파티 시작",
      "startRaidBtn": "🐉 AI 레이드 시작",
      "scoreLabel": "점수",
      "goldLabel": "골드",
      "deathMsg": "💀 {n}웨이브에서 도전 종료",
      "waveN": "{{n}}웨이브",
      "saveProgress": "💾 진척도 저장",
      "confirm": "확인",
      "factions": {
        "goblin": "고블린 무역사단",
        "orc": "호드 군단",
        "tauren": "타우렌 부족",
        "elf": "그림자 엘프",
        "undead": "언데드 스컬지",
        "troll": "트롤 부두단",
        "human": "인간 용병단"
      },
      "strategies": {
        "orcBlaze": "오크 화염 (HP + 공격 시너지)",
        "humanElite": "인간 정예 (공격 시너지)"
      },
      "roleTitle": {
        "tank": "수호병",
        "healer": "치유사",
        "other": "용사"
      }
    },
    "offense": {
      "title": "던전 공격",
      "desc": "적 던전의 수비대를 격파하고 벽을 부수세요!",
      "defenseTab": "🛡 던전 방어",
      "offenseTab": "⚔ 던전 공격",
      "startBtn": "공격 시작!",
      "selectStage": "스테이지 선택",
      "normal": "노멀",
      "elite": "정예",
      "eliteDesc": "인원 증가 · 능력치 강화",
      "partyTitle": "⚔ 공격 파티 편성",
      "searchPlaceholder": "이름",
      "enemyWall": "🏰 적 던전 벽",
      "defeat": "전멸...",
      "defeatDesc": "수비대를 돌파하지 못했습니다.",
      "stageInfo": "스테이지 {id} — {name}",
      "stageClear": "스테이지 {id} 클리어!",
      "retryHint": "파티를 강화해 다시 도전하세요!",
      "autoReturn": "{n}초 후 메인화면으로 자동 이동합니다...",
      "landClearMsg": "축하합니다! 랜드의 모든 수비대를 격파하고 [{name}]을(를) 영입했습니다.",
      "rewardTitle": "새로운 영웅 합류",
      "confirm": "확인",
      "tabNormal": "📍 랜드 공략",
      "tabInfinite": "⚔️ 100층 공략",
      "mastered": "완전 정복",
      "sectorReward": "구역 보상: {gold}G + {crystals}💎",
      "sectorProgress": "진행도: {n} / {total} 랜드",
      "unknownRegion": "미확인 지역",
      "infiniteTitle": "⚔️ 무한 던전",
      "milestone": "⭐ 마일스톤",
      "bestFloor": "최고 기록: {n}층",
      "bestFloorShort": "최고 {n}층",
      "infiniteDesc": "끝없는 던전을 공략하세요. 층을 클리어할수록 수비대가 강해집니다. 전멸하면 도전이 종료됩니다.",
      "startFloor": "시작 층수:",
      "floorSuffix": "층",
      "maxFloorHint": "최대 {n}층부터 시작 가능",
      "autoNextStage": "자동 다음 스테이지 공략",
      "infiniteChallenge": "⚔️ {n}층 도전!",
      "offenseDragHint": "✋ 영웅을 드래그해 시작 위치를 조정하세요 — 적 수비대가 오른쪽 끝에 배치되어 있습니다",
      "floorClear": "{n}층 클리어!",
      "infiniteAutoNext": "{n}초 후 {next}층 자동 진행...",
      "continueNow": "즉시 진행",
      "quit": "그만하기",
      "floorGameOver": "{n}층에서 도전 종료",
      "checkpointContinue": "체크포인트에서 이어하기",
      "fromFloor1": "1층부터",
      "nextStage": "⚔️ 다음 스테이지",
      "nextLand": "🗺️ 다음 랜드 선택",
      "retry": "다시 도전",
      "toMain": "메인화면",
      "partySelectHint": "카드 클릭으로 선택/해제",
      "stageOutskirts": "외곽 {n}구역",
      "stageInner": "최심부",
      "stageNormalDesc": "{region}의 수비대가 진을 치고 있습니다.",
      "stageBossDesc": "이 랜드의 우두머리가 버티고 있습니다. 최후의 전투를 준비하세요!",
      "hiddenRangedGimmick": "🔮 원거리 은신 기믹",
      "hiddenRangedDesc": "⚠️ 벽을 파괴하면 🔮 표시된 수비대가 나타납니다. 모두 처치해야 승리!",
      "eliteLeader": "우두머리",
      "eliteSoldier": "정예병",
      "defenderCount": "{n}인 수비대",
      "infiniteFloorName": "{n}층",
      "infiniteMilestoneName": "심층 {n}층",
      "infiniteNormalDesc": "{region}의 어둠 속 깊은 곳. 수비대가 강화되었다.",
      "infiniteMilestoneDesc": "{region}의 강력한 수호자들이 지키는 심층 던전!",
      "offense1000Badge": "던전 공격 1000층 완주!",
      "offense1000Title": "불굴의 공격자",
      "offense1000HeroDesc": "최강의 공격력 보유 + 독단의 창 패시브",
      "offense1000HeroDescBold": "아군이 쓰러질수록 공격력 최대 30% 증가",
      "offense1000JoinMsg": "무한 던전 1000층을 모두 정복한 당신에게 {name}가 합류했습니다!",
      "offense1000Confirm": "확인",
      "sectors": {
        "sector_1": {
          "name": "제 1구역: 야성과 명예의 땅",
          "description": "거친 야생에서 살아남은 전사들의 영토입니다."
        },
        "sector_2": {
          "name": "제 2구역: 뒤틀린 마력의 근원",
          "description": "강력하고 위험한 마법의 힘이 소용돌이치는 곳입니다."
        },
        "sector_3": {
          "name": "제 3구역: 죽음과 부패의 유산",
          "description": "한때 번영했으나 이제는 죽음만이 남은 도시들입니다."
        },
        "sector_4": {
          "name": "제 4구역: 초월적인 원소의 성소",
          "description": "필멸자의 발길이 닿기 힘든 신비로운 자연의 영역입니다."
        },
        "sector_5": {
          "name": "제 5구역: 최후의 균열과 위상",
          "description": "세상의 끝, 가장 강력한 존재들이 버티고 있는 마지막 관문입니다."
        }
      },
      "regions": {
        "goblin": {
          "name": "고블린 영지",
          "desc": "탐욕스러운 고블린들이 숨어있는 숲과 광산.",
          "reward": "LR 영웅: 고블린 워치프"
        },
        "orc": {
          "name": "오크의 메마른 황야",
          "desc": "척박한 대지를 뚫고 살아남은 오크 전사들의 땅.",
          "reward": "LR 영웅: 오크 검귀"
        },
        "tauren": {
          "name": "타우렌의 붉은 봉우리",
          "desc": "거대한 타우렌들이 자연을 수호하는 험준한 산맥.",
          "reward": "LR 영웅: 붉은갈기 족장"
        },
        "darkelf": {
          "name": "다크엘프의 그림자 숲",
          "desc": "은신과 기습에 능한 다크엘프들의 어두운 영토.",
          "reward": "LR 영웅: 그림자 군주"
        },
        "fire": {
          "name": "화염의 땅",
          "desc": "끓어오르는 용암과 불길의 정령들이 지배하는 곳.",
          "reward": "LR 영웅: 불꽃의 잿더미"
        },
        "ice": {
          "name": "얼음 나라",
          "desc": "모든 것이 얼어붙은 극한의 땅. 얼음 마법사들의 본거지.",
          "reward": "LR 영웅: 서리눈송이 여왕"
        },
        "undead": {
          "name": "언데드의 버림받은 도시",
          "desc": "역병과 죽음이 도사리는 파멸된 고대 도시.",
          "reward": "LR 영웅: 죽음의 기사"
        },
        "poison": {
          "name": "맹독의 늪지대",
          "desc": "치명적인 독기를 품은 괴수들이 우글거리는 늪.",
          "reward": "LR 영웅: 맹독술사"
        },
        "mercenary": {
          "name": "혼돈의 용병 주둔지",
          "desc": "수많은 종족이 모인 최정예 무법자들의 집결지.",
          "reward": "LR 영웅: 용병왕"
        },
        "elemental": {
          "name": "정령의 안식처",
          "desc": "세상의 근원을 이루는 4대 정령들이 모인 성소.",
          "reward": "LR 영웅: 정령학자"
        },
        "sea": {
          "name": "심해의 신전",
          "desc": "해저 깊은 곳에 잠든 고대 수호자들의 신전.",
          "reward": "LR 영웅: 심해의 지배자"
        },
        "sky": {
          "name": "천공의 성채",
          "desc": "구름 위를 떠다니는 신성한 천사들의 요새.",
          "reward": "LR 영웅: 대천사"
        },
        "demon": {
          "name": "악마의 균열",
          "desc": "차원이 찢어지며 악마 군단이 쏟아져 나오는 균열.",
          "reward": "LR 영웅: 파멸의 악마군주"
        },
        "dragon": {
          "name": "용의 탑",
          "desc": "모든 생명체의 정점, 드래곤들이 둥지를 튼 거대한 탑.",
          "reward": "LR 영웅: 고대 드래곤 위상"
        }
      }
    },
    "monsterTiers": {
      "초급": "초급",
      "중급": "중급",
      "고급": "고급",
      "최강": "최강"
    },
    "monsterTypes": {
      "normal": "일반",
      "elite": "정예",
      "boss": "보스"
    },
    "monsterBook": {
      "title": "몬스터 도감",
      "subtitle": "몬스터를 처치하면 도감이 해금됩니다",
      "discovered": "발견한 몬스터",
      "searchPlaceholder": "해금된 몬스터 이름 검색...",
      "emptyTitle": "아직 발견한 몬스터가 없습니다.",
      "emptyDesc": "게임에서 몬스터를 처치하면 도감이 해금됩니다!",
      "unlocked": "해금",
      "wavePrefix": "웨이브",
      "attackType": "타입",
      "ranged": "원거리",
      "melee": "근거리",
      "tacticalTip": "전술 팁"
    },
    "monsterCategories": {
      "all": "전체",
      "goblin": "고블린 계열",
      "boss": "보스",
      "beast": "야수 계열",
      "orc": "오크/트롤 계열",
      "elemental": "정령 계열",
      "dark": "암흑/공허 계열",
      "giant": "언데드 거인 계열",
      "skeleton": "해골/언데드 계열",
      "golem": "골렘 계열"
    },
    "heroesPage": {
      "tabHeroes": "⚔️ 영웅 세팅",
      "tabMonsterBook": "📖 몬스터 도감",
      "goldLabel": "보유 골드:",
      "goldLoading": "로딩 중...",
      "bulkUpgrade": "⚡ 전체 일괄 강화",
      "heroList": "영웅 목록",
      "heroCount": "{{n}}명",
      "heroSubtitle": "전직루트 선택 · 고유스킬 변형 · 스킬 조합 · 주인공은 성급=슬롯 수",
      "defaultHeroName": "용사",
      "searchPlaceholder": "영웅, 종족(오크)...",
      "filterAll": "전체",
      "noHeroFound": "해당 영웅 없음",
      "recruitHint": "상점에서 영웅을 영입하세요!",
      "starLabel": "성급",
      "starN": "{{n}}성",
      "slot": "슬롯",
      "unique": "고유",
      "passive": "패시브",
      "routeLabel": "{{name}} 루트",
      "routeActive": "활성",
      "activateRoute": "루트 활성화",
      "uniqueLabel": "고유: {{name}}",
      "uniquePreview": "활성화 시 고유스킬 →",
      "otherRoute": "다른 루트 활성화 시:",
      "unsealedTitle": "전설적 통합 고유 스킬",
      "unsealedSub": "모든 전문화의 고유 효과가 동시에 활성화됩니다.",
      "passiveSub": "루트 변경 시 자동 변형 · 수치는 성급 연동",
      "maxStar": "★★★★★ 최대 성급 달성!",
      "maxUniquePassive": "고유 패시브 최대치",
      "baseStats": "기본 능력치",
      "maxStatBonus": "기본 능력치 +25%",
      "starBonusLabel": "성급 보너스",
      "starUpgradeTitle": "성급 업그레이드",
      "starCostLabels": [
        "1→2성",
        "2→3성",
        "3→4성",
        "4→5성"
      ],
      "upgradeBtn": "업그레이드",
      "goldShort": "골드 부족",
      "goldShortWithAmount": "골드 부족 ({{amount}}G)",
      "upgradeEffect": "업그레이드 효과:",
      "statBonus": "기본 능력치 +{{delta}}%",
      "uniquePassiveUp": "고유 패시브 수치 상승",
      "summonStats": "소환수 스탯",
      "duration": "지속 {{n}}초",
      "range": "사거리 {{n}}px",
      "sharedBadge": "공유",
      "finalBadge": "최종",
      "summonBadge": "소환",
      "equippedBadge": "장착",
      "ownedBadge": "보유",
      "skillSharedIcon": "공",
      "skillUniqueIcon": "전",
      "finalLocked": "⚠ 이 루트의 다른 3개 스킬을 모두 구매해야 해금됩니다.",
      "purchased": "✓ 구매됨",
      "buyBtn": "구매",
      "unequipBtn": "해제",
      "equipBtn": "장착",
      "equippedSkills": "장착된 스킬",
      "clickToUnequip": "클릭하여 해제",
      "emptySlot": "빈 슬롯",
      "slotsCount": "{{n}} / {{max}} 슬롯",
      "availableSkills": "사용 가능한 스킬",
      "unlockedCount": "{{n}}개 해금됨",
      "autoAddHint": "영웅 스킬 해금 시 자동 추가",
      "noSkillsYet": "아직 해금된 스킬이 없습니다.",
      "noSkillsDesc": "영웅 창에서 다른 영웅의 스킬을 구매하면 이 곳에 자동으로 나타나 주인공이 사용할 수 있게 됩니다.",
      "heroesUnlocked": "{{n}}개 해금",
      "protagonistBadge": "주인공",
      "allrounderBadge": "올라운더",
      "inGameRole": "게임 내 역할",
      "unlockRoleHint": "300G로 해금",
      "lockedRoleHint": "잠긴 역할은 골드로 해금 가능",
      "containerTitle": "영웅의 그릇",
      "containerDesc": "기본: 성급 ({{base}}) + 추가: 영웅 보유 ({{bonus}})",
      "containerBody": "다른 영웅들이 해금한 스킬이 주인공의 슬롯에 자동으로 등록됩니다. 성급이 오를수록, 그리고 보유 영웅 수가 10명 늘어날 때마다 장착 가능한 슬롯이 증가합니다.",
      "protagonistHelp": "💡 영웅의 그릇 — 성급이 올라갈수록 스킬 슬롯이 증가합니다 (1성=1슬롯 ~ 5성=5슬롯). 영웅 창에서 다른 영웅의 스킬을 구매하면 주인공도 그 스킬을 사용할 수 있습니다. 게임 내 역할은 위의 역할 선택에서 직접 고르세요.",
      "aiBadge": "AI 용사",
      "aiReward": "AI 협동 1000층 보상",
      "aiAura": "전술 지휘 오오라",
      "aiAuraDesc": "모든 능력치 +{{n}}% 향상",
      "roleSelect": "역할 선택",
      "equipSkillTitle": "스킬 장착",
      "equipSkillHint": "구매한 영웅 스킬 장착 가능",
      "buySkillHint": "영웅 스킬을 구매하면 여기에 표시됩니다.",
      "offenseBadge": "어택 용사",
      "offenseReward": "던전 공격 1000층 보상",
      "offenseAura": "독단의 창",
      "offenseAuraDesc": "공격력 +{{n}}% 향상",
      "raidBadge": "레이드 용사",
      "raidReward": "AI 레이드 1000층 보상",
      "raidAura": "보스 사냥꾼",
      "raidAuraDesc": "보스 피해 +{{n}}% 향상",
      "defenseBadge": "디펜스 용사",
      "defenseReward": "무한 던전 1000층 보상",
      "traitAbsorb": "특성 흡수",
      "traitMaxHint": "현재 성급에서 최대 {{n}}개 선택 가능",
      "traitBuyHint": "다른 영웅의 스킬을 구매하면 고유 특성이 표시됩니다.",
      "defenseHelp": "💡 특성 흡수 — 다른 영웅의 고유 특성을 흡수하여 강력한 패시브를 얻습니다. 성급이 높을수록 더 많은 특성을 흡수할 수 있습니다 (1~2성=1개, 3~4성=2개, 5성=3개). 스킬 장착은 일반 용사와 동일하게 다른 영웅의 스킬을 사용할 수 있습니다.",
      "arHeroBanner": "업적 영웅 (Achievement Hero)",
      "arHeroDesc": "{{race}} 5명 편성 시 5티어 종족 시너지 활성화. 이 영웅이 없으면 5티어 시너지가 발동되지 않습니다.",
      "unsealBtn": "🔓 봉인 해제",
      "unsealEffect": "스킬 슬롯 확장",
      "unsealEffectDual": "모든 특성 패시브 동시 적용 및 스킬 슬롯 확장",
      "unsealEffectSlots": "+{{n}}칸 (총 {{total}}칸)",
      "unsealCost": "{{n}}G로 해제",
      "unsealDone": "✨ 영웅 봉인 해제됨 ✨",
      "unsealDoneDesc": "모든 특성(루트)의 패시브가 동시 적용되며 스킬 장착 칸이 확장되었습니다.",
      "heroHelp": "💡 루트 활성화 → 고유스킬이 자동 변형됩니다. 스킬은 양 루트에서 자유롭게 선택 (최대 {{max}}개). 🔒 최종 스킬은 같은 루트의 나머지 3개 스킬을 먼저 구매해야 해금됩니다. ⚡ 시너지는 고유스킬과의 상호작용입니다. 골드는 게임 플레이 후 자동 저장됩니다.",
      "toastLoadFail": "데이터를 불러오지 못했습니다.",
      "toastGoldShort": "골드가 부족합니다!",
      "toastGoldFail": "골드 차감 실패. 다시 시도해주세요.",
      "toastGoldFailShort": "골드 차감 실패.",
      "toastStarUp": "{{name}} {{n}}성 달성! ({{cost}}G 소모)",
      "toastProtoStarUp": "{{name}} {{n}}성 달성! 슬롯 {{n}}개 해금! ({{cost}}G 소모)",
      "toastSkillBuy": "[{{name}}] 구매 완료! ({{cost}}G 소모)",
      "toastSkillMax": "스킬은 최대 {{max}}개만 장착할 수 있습니다.",
      "toastSlotShort": "슬롯이 부족합니다! 성급과 보유 영웅을 늘리면 슬롯이 늘어납니다.",
      "toastSlotShort2": "슬롯이 부족합니다.",
      "toastEquipShort": "장착 슬롯이 부족합니다.",
      "toastRoleUnlock": "{{role}} 역할 해금 완료!",
      "toastUnseal": "✨ 영웅 봉인 해제 완료! 모든 패시브 획득 및 슬롯 확장! ✨",
      "toastBulkDone": "전체 일괄 강화 완료! ({{cost}}G 소모)",
      "toastBulkFail": "강화할 내용이 없거나 골드가 부족합니다.",
      "toastTraitMax": "최대 {{max}}개까지만 선택 가능합니다."
    },
    "heroes": {
      "protagonist": {
        "lore": "예언서에 기록된 전설의 용사. 다른 영웅들의 힘을 흡수하여 무한히 성장한다.",
        "name": "용사",
        "routes": {
          "protagonist_all": {
            "name": "올라운더",
            "variantDesc": "다른 영웅이 해금한 스킬을 최대 {value}슬롯까지 장착합니다.",
            "variantName": "영웅의 그릇"
          }
        }
      },
      "anub": {
        "lore": "지하 군주.",
        "name": "아눕",
        "routes": {
          "protection": {
            "name": "방어",
            "variantDesc": "피격 시 {value}% 반사.",
            "variantName": "가시 껍질"
          }
        },
        "skills": {
          "carrion_beetles": {
            "desc": "벌레 소환+회복",
            "name": "송장 벌레"
          },
          "impale": {
            "desc": "스턴",
            "name": "꿰뚫기"
          },
          "iron_carapace": {
            "desc": "받는 피해 25% 감소",
            "name": "강철 껍질"
          },
          "locust_swarm": {
            "desc": "광역 흡혈",
            "name": "메뚜기 떼"
          },
          "underground_assault": {
            "desc": "광역 ATK×5 피해+기절",
            "name": "지하 강습"
          }
        }
      },
      "ar_gorg": {
        "lore": "전설의 오크 전쟁족장. 오크 부족 전체가 그의 이름 아래 뭉친다. 그의 포효 하나에 전장이 뒤흔들린다.",
        "name": "고르그 굳주먹",
        "routes": {
          "farseer": {
            "name": "정령전사",
            "variantDesc": "치유 시 {value}% 확률로 치유량 2배.",
            "variantName": "대지의 정령"
          },
          "tank": {
            "name": "강철방패",
            "variantDesc": "받는 피해 {value}% 감소.",
            "variantName": "불굴의 오크"
          },
          "warchief": {
            "name": "전쟁족장",
            "variantDesc": "처치 시 {value}% 확률로 즉시 재공격.",
            "variantName": "전쟁족장의 의지"
          }
        },
        "skills": {
          "avatar": {
            "desc": "패시브: HP 40% 이하 시 공격력 +50%, 흡혈 +20%",
            "name": "아바타"
          },
          "bladestorm": {
            "desc": "주변 130px 모든 적 ATK×6 회전베기",
            "name": "블레이드스톰"
          },
          "chain_lightning": {
            "desc": "적 최대 3명에게 ATK×4 연쇄 피해",
            "name": "연쇄 번개"
          },
          "deathwish": {
            "desc": "오크 아군 모두에게 공격력 +25% 오라 [패시브]",
            "name": "죽음의 소원"
          },
          "demoralizing_shout": {
            "desc": "주변 적 공격력 30% 감소",
            "name": "사기 저하의 외침"
          },
          "earthquake": {
            "desc": "모든 적 4초 슬로우 + ATK×3 광역 피해",
            "name": "대지진"
          },
          "healing_rain": {
            "desc": "전체 아군 ATK×4 치유",
            "name": "치유의 비"
          },
          "intervene": {
            "desc": "아군 대신 피해를 받음",
            "name": "가로막기"
          },
          "last_stand": {
            "desc": "최대 HP 50% 증가 15초",
            "name": "최후의 저항"
          },
          "lava_burst": {
            "desc": "단일 대상 ATK×8 화염 피해",
            "name": "용암 폭발"
          },
          "mortal_strike": {
            "desc": "강력한 내려치기 ATK×10 피해 + 흡혈 20%",
            "name": "거인의 타격"
          },
          "shield_slam": {
            "desc": "적 넉백 + 2초 기절",
            "name": "방패 밀쳐내기"
          },
          "shield_wall": {
            "desc": "10초간 무적에 가까운 방어력 증가",
            "name": "방패 벽"
          },
          "spirit_walk": {
            "desc": "위험한 아군에게 순간이동하여 보호막 부여",
            "name": "정령의 이동"
          },
          "war_stomp": {
            "desc": "주변 150px 기절 2.5초 + ATK×4 피해",
            "name": "전투 발구르기"
          }
        }
      },
      "ar_jarlten": {
        "lore": "고대의 영웅이 죽음 이후 언데드 군주로 부활했다. 아군 언데드 전군을 지휘하는 존재로서, 그의 존재만으로 언데드 군단이 각성한다.",
        "name": "자렌텐",
        "routes": {
          "fearlord": {
            "name": "공포군주",
            "variantDesc": "공격 시 {value}% 확률로 2초 공포(이동불가).",
            "variantName": "공포의 군주"
          },
          "necromancy": {
            "name": "강령술",
            "variantDesc": "공격 시 {value}% 확률로 대상의 영혼을 흡수하여 공격력 강화.",
            "variantName": "영혼 포식"
          },
          "overlord": {
            "name": "군주",
            "variantDesc": "피격 시 {value}% 확률로 피해 완전 무효화.",
            "variantName": "죽음의 의지"
          }
        },
        "skills": {
          "am_shell": {
            "desc": "5초간 모든 마법 피해 무효화",
            "name": "대마법 보호막"
          },
          "army_of_dead": {
            "desc": "군단 언데드 소환 (강화형)",
            "name": "사자의 군단"
          },
          "banshee_wail": {
            "desc": "주변 180px 적 3초 기절",
            "name": "밴시의 울부짖음"
          },
          "corpse_nova": {
            "desc": "타겟 주위 120px ATK×5 폭발 피해",
            "name": "시체 폭발"
          },
          "corruption": {
            "desc": "10초간 적에게 지속 암흑 피해",
            "name": "부패"
          },
          "death_and_decay": {
            "desc": "지정 위치에 장판을 깔아 광역 지속 피해",
            "name": "죽음과 부패"
          },
          "death_coil": {
            "desc": "단일 ATK×6 암흑 + 50% 흡혈",
            "name": "죽음의 고리"
          },
          "deathmark": {
            "desc": "모든 적 받는 피해 20% 증가 10초",
            "name": "죽음의 낙인"
          },
          "raise_dead": {
            "desc": "쓰러진 아군 1명을 HP 50%로 즉시 부활",
            "name": "죽은 자 소생"
          },
          "raise_skeleton": {
            "desc": "해골 전사 2명 소환",
            "name": "해골 소환"
          },
          "shadow_bolt": {
            "desc": "단일 ATK×4 암흑 피해",
            "name": "어둠의 화살"
          },
          "sleep": {
            "desc": "적 1명을 8초간 잠재움",
            "name": "수면"
          },
          "soulfire": {
            "desc": "적의 영혼을 불태워 강력한 암흑 피해",
            "name": "영혼 불꽃"
          },
          "spectral_summon": {
            "desc": "망령 소환 (20초, ATK×0.8, CC)",
            "name": "망령 소환"
          },
          "undead_aura": {
            "desc": "패시브: 자신 ATK +25%, HP +20% 영구 증가",
            "name": "군주의 오라"
          }
        },
        "summons": {
          "army": {
            "name": "군단 언데드"
          },
          "skeleton": {
            "name": "해골 전사"
          },
          "spectral": {
            "name": "공포의 망령"
          }
        }
      },
      "ar_kargath": {
        "lore": "부러진 손 부족의 전설적인 지도자. 스스로 손을 자르고 칼날을 달아 전장을 피로 물들인다.",
        "name": "카르가스",
        "routes": {
          "berserk": {
            "name": "광전사",
            "variantDesc": "공격 시 {value}% 확률로 주변 적들에게 전이 피해를 입힙니다.",
            "variantName": "가차없는 힘"
          },
          "blade": {
            "name": "칼날손",
            "variantDesc": "공격 시 {value}% 확률로 적에게 치명적인 상처(방어 0)를 입힙니다.",
            "variantName": "부러진 손의 칼날"
          }
        },
        "skills": {
          "avatar": {
            "desc": "20초간 거대화: 공격력 3배, 무적",
            "name": "투신"
          },
          "blade_sweep": {
            "desc": "전방 부채꼴 모든 적 ATK×5 피해",
            "name": "칼날 휩쓸기"
          },
          "bloodthirst": {
            "desc": "적 처치 시 공격력 10% 증가 (무제한 중첩)",
            "name": "피의 굶주림"
          },
          "furious_attack": {
            "desc": "10초간 공격속도 200% 증가",
            "name": "맹렬한 공격"
          },
          "impale": {
            "desc": "단일 ATK×8 피해 및 3초 기절",
            "name": "꿰뚫기"
          },
          "massacre": {
            "desc": "전장 전체 적 ATK×15 피해 및 HP 30% 이하 적 즉사",
            "name": "대학살"
          },
          "mortal_strike": {
            "desc": "대상 적 방어력 영구 50% 감소 및 ATK×12 피해",
            "name": "거인의 타격"
          },
          "recklessness": {
            "desc": "받는 피해 20% 증가, 주는 피해 100% 증가",
            "name": "무모한 희생"
          },
          "slam": {
            "desc": "단일 ATK×10 강력한 한방",
            "name": "격돌"
          },
          "whirlwind": {
            "desc": "주변 모든 적에게 매초 ATK×3 피해 (5초 지속)",
            "name": "소용돌이"
          }
        }
      },
      "ar_lian": {
        "lore": "태양샘의 힘을 혈기로 전환한 최초의 혈기사. 아군을 위해 자신의 피를 불태우며 전선을 사수한다.",
        "name": "리안",
        "routes": {
          "blood": {
            "name": "혈기",
            "variantDesc": "피격 시 {value}% 확률로 잃은 체력의 10%를 즉시 회복합니다.",
            "variantName": "붉은 갈증"
          },
          "retri": {
            "name": "징벌",
            "variantDesc": "공격 시 {value}% 확률로 대상에게 ATK×4 신성 추가 피해.",
            "variantName": "성스러운 복수"
          }
        },
        "skills": {
          "avenging_wrath": {
            "desc": "20초간 무적 + 모든 공격이 광역 신성 폭발로 변경",
            "name": "응징의 격노"
          },
          "blade_justice": {
            "desc": "적 3명에게 신성 칼날 ATK×5",
            "name": "심판의 칼날"
          },
          "blood_boil": {
            "desc": "주변 모든 적 ATK×4 피해 및 5초간 출혈",
            "name": "피의 소용돌이"
          },
          "blood_strike": {
            "desc": "단일 ATK×5 피해 및 20% 흡혈",
            "name": "피의 일격"
          },
          "crusader_strike": {
            "desc": "단일 ATK×6 신성 피해",
            "name": "성전사의 일격"
          },
          "dancing_weapon": {
            "desc": "룬 무기 소환: 아군 전체 방어력 50% 증가 및 무적 5초",
            "name": "춤추는 룬 무기"
          },
          "death_bond": {
            "desc": "아군 1명과 결속하여 피해를 50% 나누어 받음",
            "name": "죽음의 결속"
          },
          "divine_storm": {
            "desc": "주변 광역 ATK×5 피해 및 아군 힐",
            "name": "신성한 폭풍"
          },
          "fanaticism": {
            "desc": "15초간 공격력 50% 증가 및 모든 공격 속도 2배",
            "name": "광신"
          },
          "rune_tap": {
            "desc": "최대 HP 20% 보호막 생성 및 DEF +40",
            "name": "룬 전환"
          }
        }
      },
      "ar_maharuuk": {
        "lore": "대지모신의 직계 후계자. 타우렌 부족의 대지 마법으로 방어선을 강화하고 아군을 치유한다.",
        "name": "마하루크",
        "routes": {
          "earthguard": {
            "name": "대지수호자",
            "variantDesc": "피격 시 {value}% 확률로 주변 아군 방어력 +20 (5초).",
            "variantName": "대지의 방패"
          },
          "stormcaller": {
            "name": "폭풍주술사",
            "variantDesc": "치유 시 {value}% 만큼 추가 보호막 부여.",
            "variantName": "정령의 가르침"
          },
          "sunwalker": {
            "name": "태양길잡이",
            "variantDesc": "공격 시 {value}% 확률로 대상 주위에 화염 피해.",
            "variantName": "태양의 광휘"
          }
        },
        "skills": {
          "ancestral_spirit": {
            "desc": "쓰러진 아군 1명 HP 50% 부활",
            "name": "조상의 정령"
          },
          "avatar_earth": {
            "desc": "15초간 피해감소 40% + 주변 피해 반사",
            "name": "대지화신"
          },
          "avenging_wrath": {
            "desc": "20초간 공격력 50% 증가 및 모든 공격 광역화",
            "name": "응징의 격노"
          },
          "bloodlust": {
            "desc": "15초간 전체 아군 공격속도 +60%",
            "name": "영웅심"
          },
          "chain_heal": {
            "desc": "HP 최저 아군 ATK×5 치유 + 연쇄 ATK×2",
            "name": "연쇄 치유"
          },
          "crusader_strike": {
            "desc": "단일 ATK×4 신성 피해",
            "name": "성전사의 일격"
          },
          "earth_stomp": {
            "desc": "전방 130px 기절 2초 + ATK×4",
            "name": "대지 발구르기"
          },
          "healing_rain": {
            "desc": "전체 아군 ATK×3 광역 치유",
            "name": "치유의 비"
          },
          "holy_light": {
            "desc": "자신 주위 아군 ATK×3 치유",
            "name": "신성한 빛"
          },
          "judgment": {
            "desc": "대상에게 ATK×5 피해 및 받는 피해 증가",
            "name": "심판"
          },
          "living_seed": {
            "desc": "패시브: 피격 시 자신 HP 8% 즉시 회복",
            "name": "살아있는 씨앗"
          },
          "riptide": {
            "desc": "대상에게 즉시 힐 + 지속 힐 부여",
            "name": "성난 해일"
          },
          "stone_bulwark": {
            "desc": "전체 아군 방어력 +30, HP 10% 회복",
            "name": "돌의 보루"
          },
          "thorns": {
            "desc": "아군 전체에게 피해 반사 20% 부여",
            "name": "가시나무"
          },
          "wrath": {
            "desc": "전방 모든 적에게 강력한 빛의 일격",
            "name": "천벌"
          }
        }
      },
      "ar_valanos": {
        "lore": "태양샘이 타락하기 전의 힘을 기억하는 마지막 피의 마법사. 마력 흡수로 아군을 강화하고 적을 소멸시킨다.",
        "name": "발라노스",
        "routes": {
          "bloodmage": {
            "name": "피의 마법사",
            "variantDesc": "공격 시 {value}% 확률로 ATK×3 비전 추가 피해.",
            "variantName": "마력 공명"
          },
          "destro": {
            "name": "파괴",
            "variantDesc": "공격 시 {value}% 확률로 대상 폭발.",
            "variantName": "점화"
          },
          "manavampire": {
            "name": "마나흡혈귀",
            "variantDesc": "공격 시 {value}% 확률로 대상 2초 침묵.",
            "variantName": "피의 갈망"
          }
        },
        "skills": {
          "arcane_nova": {
            "desc": "모든 적에게 ATK×5 비전 폭발",
            "name": "비전 대폭발"
          },
          "arcane_torrent": {
            "desc": "전체 적 3초 침묵 + ATK×3 피해",
            "name": "비전 급류"
          },
          "blood_tap": {
            "desc": "패시브: 자신 ATK +40%, HP -15%",
            "name": "피의 탭"
          },
          "chaos_bolt": {
            "desc": "방어 무시 강력한 한방 ATK×15",
            "name": "혼돈의 화살"
          },
          "conflagrate": {
            "desc": "제물 대상을 폭발시켜 ATK×6 피해",
            "name": "점화 폭발"
          },
          "flame_pillar": {
            "desc": "지정 위치에 거대 불기둥 생성 ATK×8",
            "name": "불기둥"
          },
          "flame_strike": {
            "desc": "타겟 주위 100px ATK×6 화염 폭발",
            "name": "화염 강타"
          },
          "immolate": {
            "desc": "대상에게 15초간 지속 화염 피해",
            "name": "제물"
          },
          "incinerate": {
            "desc": "화염 화살 발사 ATK×3.5",
            "name": "소각"
          },
          "mana_burn": {
            "desc": "단일 ATK×5 비전 + 50% 흡혈",
            "name": "마나 소각"
          },
          "phoenix": {
            "desc": "불사조 소환 (30초, 원딜, 공격 시 화상)",
            "name": "불사조 소환"
          },
          "polymorph": {
            "desc": "적 1명을 8초간 양으로 변이",
            "name": "변이"
          },
          "rain_of_fire": {
            "desc": "지정 위치에 화염 우박 투하",
            "name": "불의 비"
          },
          "sunwell_surge": {
            "desc": "모든 적 ATK×8 + 전체 아군 ATK×3 힐",
            "name": "태양샘 분출"
          },
          "void_bolt": {
            "desc": "단일 ATK×4 + 2초 공격속도 -50%",
            "name": "공허 화살"
          }
        },
        "summons": {
          "phoenix": {
            "name": "불사조"
          }
        }
      },
      "arthur": {
        "lore": "왕실 근위대 방패 전사.",
        "name": "아서",
        "routes": {
          "protection": {
            "name": "방어",
            "variantDesc": "받는 물리 피해 {value}% 감소.",
            "variantName": "방패 막기"
          }
        },
        "skills": {
          "knights_oath": {
            "desc": "주변 아군 방어력 +15",
            "name": "기사의 맹세"
          },
          "last_stand": {
            "desc": "자신 대형 방어막+주변 아군 소형 방어막",
            "name": "최후의 저항"
          },
          "shield_slam": {
            "desc": "방패 강타",
            "name": "방패 밀쳐내기"
          },
          "shield_wall": {
            "desc": "전체 아군 방어막+자신 강화",
            "name": "방어막 장벽"
          }
        }
      },
      "baine": {
        "lore": "대지모신의 가호를 받는 전사.",
        "name": "바인",
        "routes": {
          "arms": {
            "name": "무기",
            "variantDesc": "공격력 {value}% 증가.",
            "variantName": "대지의 힘"
          }
        },
        "skills": {
          "avatar": {
            "desc": "거대화 버프",
            "name": "투신"
          },
          "slam": {
            "desc": "강력한 강타",
            "name": "격돌"
          },
          "war_stomp": {
            "desc": "광역 기절",
            "name": "전투 발구르기"
          }
        }
      },
      "benedict": {
        "lore": "신실한 믿음의 인간 사제.",
        "name": "베네딕트",
        "routes": {
          "holy": {
            "name": "신성",
            "variantDesc": "힐량 {value}% 증가.",
            "variantName": "신성한 치유"
          }
        },
        "skills": {
          "guardian_spirit": {
            "desc": "아군 10초 HoT+힐증폭",
            "name": "수호 정령"
          },
          "heal": {
            "desc": "단일 힐",
            "name": "치유"
          },
          "holy_word_serenity": {
            "desc": "대량 힐",
            "name": "빛의 평온"
          },
          "renew": {
            "desc": "단일 HoT",
            "name": "소생"
          }
        }
      },
      "chen": {
        "lore": "전설적인 양조사.",
        "name": "첸",
        "routes": {
          "brewmaster": {
            "name": "양조",
            "variantDesc": "회피율 {value}% 증가.",
            "variantName": "교묘한 투사"
          }
        },
        "skills": {
          "beer_waterfall": {
            "desc": "주변 적 이동속도 40% 감소",
            "name": "맥주 폭포"
          },
          "breath_of_fire": {
            "desc": "화염 피해",
            "name": "불의 숨결"
          },
          "invoke_niuzao": {
            "desc": "전체 아군 방어막+자신 피감",
            "name": "우요 소환"
          },
          "stagger": {
            "desc": "받는 피해의 50%를 10초에 걸쳐 나눔",
            "name": "시간차"
          },
          "storm_earth_fire": {
            "desc": "3방향 동시 폭발 ATK×4",
            "name": "폭풍, 대지, 불"
          }
        }
      },
      "cheondung_garam": {
        "lore": "황금 도시의 고위 주술사. 폭풍을 부른다.",
        "name": "천둥가람",
        "routes": {
          "elemental": {
            "name": "정기술사",
            "variantDesc": "번개 스킬 {value}% 확률 2회 발동.",
            "variantName": "번개 과부하"
          },
          "restoration": {
            "name": "복원술사",
            "variantDesc": "힐 시 {value}% 확률로 주변 소량 힐.",
            "variantName": "조류의 역류"
          }
        },
        "skills": {
          "chain_heal": {
            "desc": "연쇄 힐",
            "name": "연쇄 치유"
          },
          "earth_elemental": {
            "desc": "탱커 정령 소환",
            "name": "대지 정령"
          },
          "earth_shield": {
            "desc": "피격 힐 버프",
            "name": "대지 방패"
          },
          "earthquake": {
            "desc": "광역 슬로우+피해",
            "name": "지진"
          },
          "healing_wave": {
            "desc": "강력 단일 힐",
            "name": "치유의 파동"
          },
          "lightning_bolt": {
            "desc": "연쇄 번개 공격",
            "name": "번개 화살"
          },
          "lightning_storm": {
            "desc": "전체 광역 폭격",
            "name": "번개 폭풍"
          },
          "thunderstorm": {
            "desc": "부채꼴 광역",
            "name": "천둥 폭풍"
          }
        },
        "summons": {
          "earth_elemental": {
            "name": "대지 정령"
          }
        }
      },
      "crow": {
        "lore": "그림자 속의 늑대 암살자.",
        "name": "크로우",
        "routes": {
          "combat": {
            "name": "전투",
            "variantDesc": "기력 회복 {value}% 증가.",
            "variantName": "아드레날린"
          }
        },
        "skills": {
          "eviscerate": {
            "desc": "마무리",
            "name": "절개"
          },
          "killing_spree": {
            "desc": "연속 공격",
            "name": "살육의 희열"
          },
          "sinister_strike": {
            "desc": "연계 점수",
            "name": "사악한 일격"
          }
        }
      },
      "daulgard": {
        "lore": "타락했다가 명예를 되찾은 오크 죽음의 기사. 칠흑의 기사단의 힘을 빌려 언데드 군단을 부리거나, 냉기와 피의 마력을 다룬다.",
        "name": "다울가르",
        "routes": {
          "blood": {
            "name": "혈기",
            "variantDesc": "피해량 {value}%만큼 자신의 HP를 흡수합니다.",
            "variantName": "피의 결속"
          },
          "frost": {
            "name": "냉기",
            "variantDesc": "냉기 공격 시 {value}% 확률로 대상 2초 빙결.",
            "variantName": "냉기의 가피"
          },
          "unholy": {
            "name": "부정",
            "variantDesc": "소환수 능력치 {value}% 증가.",
            "variantName": "언데드 군단"
          }
        },
        "skills": {
          "army": {
            "desc": "25초마다 9마리의 군단 구울을 즉시 소환합니다.",
            "name": "사자의 군대"
          },
          "blood_boil": {
            "desc": "8초마다 주변 모든 적 ATK×3 피해 및 입힌 피해만큼 자가 회복",
            "name": "피의 소용돌이"
          },
          "dancing_weapon": {
            "desc": "30초마다 자신의 복사본인 룬 무기를 소환하여 함께 공격 (20초)",
            "name": "춤추는 룬 무기"
          },
          "death_coil": {
            "desc": "8초마다 단일 대상에게 ATK×8 강력한 한방 피해",
            "name": "죽음의 고리"
          },
          "death_strike": {
            "desc": "공격 시 {value}% 확률로 ATK×4 강력한 흡혈 공격",
            "name": "죽음의 일격"
          },
          "disease": {
            "desc": "4초마다 전장의 모든 적에게 ATK×1.0 지속 피해 (10초)",
            "name": "질병"
          },
          "frost_chains": {
            "desc": "6초마다 단일 대상 ATK×3 피해 및 5초 슬로우",
            "name": "얼음의 손길"
          },
          "frost_strike": {
            "desc": "공격 시 {value}% 확률로 ATK×2 추가 냉기 피해",
            "name": "냉기 타격"
          },
          "ghoul": {
            "desc": "근접 구울 1마리와 해골 궁수 1마리를 소환합니다.",
            "name": "구울 소환"
          },
          "howling_blast": {
            "desc": "10초마다 타겟 주변 150px 적 ATK×4 광역 피해 및 슬로우",
            "name": "울부짖는 한파"
          },
          "remorseless_winter": {
            "desc": "20초마다 10초간 주변 모든 적에게 매초 ATK×1.5 피해 및 50% 슬로우",
            "name": "절멸의 겨울"
          },
          "vampiric_blood": {
            "desc": "15초마다 10초간 최대 HP 30% 증가 및 받는 치유량 50% 증가",
            "name": "흡혈귀의 피"
          }
        },
        "summons": {
          "army": {
            "name": "군단 구울"
          },
          "ghoul": {
            "name": "구울"
          },
          "rune_weapon": {
            "name": "룬 무기"
          }
        }
      },
      "dizgarldo": {
        "lore": "잊혀진 그림자의 교단 사제. 빛과 어둠을 오가며 아군을 치유한다.",
        "name": "디즈가르도",
        "routes": {
          "discipline": {
            "name": "수양",
            "variantDesc": "피격 시 HP 30% 이하면 {value}% 확률로 최대HP 15% 즉시 회복.",
            "variantName": "신성한 방호"
          },
          "holy": {
            "name": "신성",
            "variantDesc": "힐 시 {value}% 확률로 전체 아군 소량 힐 전파.",
            "variantName": "신성한 자비"
          },
          "shadow": {
            "name": "암흑",
            "variantDesc": "공격 시 {value}% 확률로 피해량 50% 체력 최저 아군 힐.",
            "variantName": "어둠의 갈망"
          }
        },
        "skills": {
          "blood_ritual": {
            "desc": "20초마다 자신 HP 30% 소모 → 전체 아군 ATK×3 힐",
            "name": "피의 의식"
          },
          "dark_feast": {
            "desc": "6초마다 자신 최대HP 10% 회복",
            "name": "암흑 포식"
          },
          "demon_summon": {
            "desc": "마귀 소환 (20초, 공격 시 피해의 50%만큼 체력 최저 아군 힐)",
            "name": "마귀 소환"
          },
          "divine_hymn": {
            "desc": "15초마다 전체 아군 ATK×5 강힐 + 보호막",
            "name": "신성한 찬가"
          },
          "divine_intervention": {
            "desc": "30초마다 전체 아군 ATK×4 힐 + 보호막",
            "name": "신성 개입"
          },
          "holy_beacon": {
            "desc": "빛의 봉화 소환 (25초, 2초마다 HP 최저 아군 힐)",
            "name": "빛의 봉화"
          },
          "holy_light": {
            "desc": "8초마다 HP 최저 아군 완전 회복 (ATK×8)",
            "name": "신성한 빛"
          },
          "holy_shield": {
            "desc": "12초마다 HP 최저 아군 보호막 (최대HP 20%)",
            "name": "신성한 보호막"
          },
          "life_drain": {
            "desc": "공격 시 피해량 50% 자가회복 패시브",
            "name": "생명 흡수"
          },
          "light_wave": {
            "desc": "8초마다 전체 아군 ATK×1.5 힐",
            "name": "빛의 파동"
          },
          "prayer_healing": {
            "desc": "10초마다 전체 아군 ATK×2 힐",
            "name": "치유의 기도"
          },
          "resurrection": {
            "desc": "45초마다 쓰러진 아군 1명 HP 30% 부활",
            "name": "부활"
          }
        },
        "summons": {
          "demon": {
            "name": "마귀"
          },
          "holy_beacon": {
            "name": "빛의 봉화"
          }
        }
      },
      "durga": {
        "lore": "백발백중의 오크 사냥꾼.",
        "name": "두르가",
        "routes": {
          "marksmanship": {
            "name": "사격",
            "variantDesc": "사거리 {value} 증가.",
            "variantName": "매의 눈"
          }
        },
        "skills": {
          "aimed_shot": {
            "desc": "강력한 한방",
            "name": "조준 사격"
          },
          "arcane_shot": {
            "desc": "기본 사격",
            "name": "신비한 사격"
          },
          "concussive_shot": {
            "desc": "적에게 피해를 주고 이속 50% 감소",
            "name": "충격포"
          }
        }
      },
      "feldah": {
        "lore": "강력한 흑마법사. 죽음을 초월한 육신으로 악마 군단을 부린다.",
        "name": "펠다",
        "routes": {
          "afflict": {
            "name": "고흑",
            "variantDesc": "피격 적 이속 {value}% 감소.",
            "variantName": "저주받은 영혼"
          },
          "demon": {
            "name": "악흑",
            "variantDesc": "소환수 능력치 {value}% 증가.",
            "variantName": "악마 군주"
          },
          "destro": {
            "name": "파흑",
            "variantDesc": "치명타 시 {value}% 쿨타임 단축.",
            "variantName": "혼돈의 불꽃"
          }
        },
        "skills": {
          "agony": {
            "desc": "점증하는 지속 피해",
            "name": "고통의 저주"
          },
          "chaos_bolt": {
            "desc": "방어 무시 강력한 한방",
            "name": "혼돈의 화살"
          },
          "corruption": {
            "desc": "전체 지속 피해",
            "name": "광역 부패"
          },
          "crit_triple": {
            "desc": "치명타 피해 3배",
            "name": "파멸의 일격"
          },
          "curse_fatigue": {
            "desc": "전체 이속 감소",
            "name": "광역 피로"
          },
          "double_bolt": {
            "desc": "2발 발사",
            "name": "쌍 투사체"
          },
          "drain_soul": {
            "desc": "HP 35% 미만 일반몹 즉사",
            "name": "영혼 흡수"
          },
          "felguard": {
            "desc": "강력한 탱커 악마 소환",
            "name": "펠가드"
          },
          "felhunter": {
            "desc": "근접 악마 소환",
            "name": "마법사냥개"
          },
          "healthstone": {
            "desc": "위기 시 아군 회복",
            "name": "생명석"
          },
          "imp": {
            "desc": "원거리 임프 소환",
            "name": "임프 소환"
          },
          "sacrifice": {
            "desc": "전체 틱 데미지",
            "name": "제물"
          }
        },
        "summons": {
          "felguard": {
            "name": "펠가드"
          },
          "felhunter": {
            "name": "마법사냥개"
          },
          "imp": {
            "name": "임프"
          }
        }
      },
      "gardu": {
        "lore": "거대 도끼를 휘두르는 오크 전사.",
        "name": "가르두",
        "routes": {
          "arms": {
            "name": "무기",
            "variantDesc": "치명타율 {value}% 증가.",
            "variantName": "치명적 일격"
          }
        },
        "skills": {
          "bladestorm": {
            "desc": "광역 휠윈드",
            "name": "칼날폭풍"
          },
          "mortal_strike": {
            "desc": "적에게 피해를 주고 치유 50% 감소",
            "name": "필사의 일격"
          }
        }
      },
      "gazro": {
        "lore": "고블린 공학자. 그의 기계는 성급이 오를수록 쉴 새 없이 발사된다.",
        "name": "가즈로",
        "routes": {
          "marksmanship": {
            "name": "사격",
            "variantDesc": "쿨타임 {value}% 감소.",
            "variantName": "고블린 공학"
          }
        },
        "skills": {
          "deth_lazor": {
            "desc": "충전 레이저",
            "name": "죽음의 광선"
          },
          "grav_o_bomb": {
            "desc": "블랙홀 폭탄",
            "name": "중력 폭탄"
          },
          "rock_it_turret": {
            "desc": "포탑 설치",
            "name": "잘나가 포탑"
          },
          "xplodium_charge": {
            "desc": "스턴 폭탄",
            "name": "폭탄 투하"
          }
        },
        "summons": {
          "turret": {
            "name": "잘나가 포탑"
          }
        }
      },
      "gray": {
        "lore": "길니াসের 늑대인간 전사.",
        "name": "그레이",
        "routes": {
          "fury": {
            "name": "분노",
            "variantDesc": "공격 시 {value}% 회복.",
            "variantName": "피의 갈증"
          }
        },
        "skills": {
          "bloodthirst": {
            "desc": "피해+회복",
            "name": "피의 갈증"
          },
          "rampage": {
            "desc": "4연타",
            "name": "광란"
          },
          "recklessness": {
            "desc": "치명타 100%",
            "name": "무모한 희생"
          }
        }
      },
      "grelcal": {
        "lore": "드레노어의 야성을 간직한 마그하르 전사. 무자비한 힘으로 적을 분쇄한다.",
        "name": "그렉칼",
        "routes": {
          "defense": {
            "name": "방어",
            "variantDesc": "피격 시 {value}% 확률로 피해 50% 무효화.",
            "variantName": "전사의 의지"
          },
          "weapon": {
            "name": "무기",
            "variantDesc": "3타마다 {value}% 추가 피해.",
            "variantName": "전사의 공세"
          }
        },
        "skills": {
          "iron_wall": {
            "desc": "받는 피해 15% 감소",
            "name": "철벽"
          },
          "lacerate": {
            "desc": "자신의 방어력이 25% 감소하지만 공격력이 50% 증가",
            "name": "열상"
          },
          "rend": {
            "desc": "15초 출혈, 치사 시 즉사",
            "name": "찢어발기기"
          },
          "shield_bash": {
            "desc": "방어력의 50%만큼 추가 공격력",
            "name": "방패 타격"
          },
          "shockwave": {
            "desc": "주변 적 1.5초 기절",
            "name": "충격파"
          },
          "weapon_mastery": {
            "desc": "공격력 +20%, 공속 +10%",
            "name": "무기 연마"
          }
        }
      },
      "hamul": {
        "lore": "자연의 조화를 중시하는 드루이드.",
        "name": "하뮬",
        "routes": {
          "restoration": {
            "name": "회복",
            "variantDesc": "HoT 효과 {value}% 증가.",
            "variantName": "생명의 나무"
          }
        },
        "skills": {
          "incarnation": {
            "desc": "치유 강화 변신",
            "name": "화신: 생명의 나무"
          },
          "regrowth": {
            "desc": "즉발+HoT",
            "name": "재생"
          },
          "tranquility": {
            "desc": "광역 지속 힐",
            "name": "평온"
          },
          "wild_growth": {
            "desc": "전체 아군 HoT",
            "name": "야생 성장"
          }
        }
      },
      "heln_dinohouf": {
        "lore": "달과 태양의 힘을 다루는 타우렌 드루이드.",
        "name": "헬른 다이노후프",
        "routes": {
          "balance": {
            "name": "조화드루",
            "variantDesc": "공격 시 {value}% 확률 광역 폭발.",
            "variantName": "달빛 쐐기"
          },
          "restoration": {
            "name": "회복드루",
            "variantDesc": "HoT 효과 {value}% 강화.",
            "variantName": "자연의 우기"
          }
        },
        "skills": {
          "ironbark": {
            "desc": "힐 대상에게 보호막 부여 (최대HP 12%, 8초)",
            "name": "아이언바크"
          },
          "moonfire": {
            "desc": "광역 DoT",
            "name": "달빛 불꽃"
          },
          "natures_swiftness": {
            "desc": "주기적 전체 힐",
            "name": "자연의 의지"
          },
          "rejuvenation": {
            "desc": "단일 HoT",
            "name": "회춘"
          },
          "starfall": {
            "desc": "전체 광역 폭격",
            "name": "별비"
          },
          "starsurge": {
            "desc": "단일 강타",
            "name": "별 급류"
          },
          "wild_growth": {
            "desc": "광역 HoT",
            "name": "야생 성장"
          }
        }
      },
      "howl": {
        "lore": "야수의 본성을 받아들인 드루이드.",
        "name": "하울",
        "routes": {
          "feral": {
            "name": "야성",
            "variantDesc": "공격 시 {value}% 확률로 쿨타임 즉시 초기화.",
            "variantName": "청명의 전조"
          }
        },
        "skills": {
          "berserk": {
            "desc": "쿨타임 단축 + 공격속도 증가",
            "name": "광폭화"
          },
          "rip": {
            "desc": "출혈 DoT",
            "name": "도려내기"
          },
          "shred": {
            "desc": "연계 점수",
            "name": "칼날 발톱"
          }
        }
      },
      "ireneerpiria": {
        "lore": "수라마르에서 온 비전술사. 고대 마력으로 적을 제압한다.",
        "name": "이레네에르피리아",
        "routes": {
          "arcane": {
            "name": "비전",
            "variantDesc": "마법 공격 시 {value}% 확률로 피해 2배.",
            "variantName": "비전 공명"
          }
        },
        "skills": {
          "arcane_blast": {
            "desc": "ATK 200% 단일 피해",
            "name": "비전 폭발"
          },
          "mana_burn": {
            "desc": "버프 제거 + 추가 피해",
            "name": "마법 파쇄"
          },
          "resonance_burst": {
            "desc": "공명 발동 시 주변 50% 피해 전파",
            "name": "공명 폭발"
          }
        }
      },
      "iskierpyria": {
        "lore": "태양샘의 마력을 받아들인 고위 마법사. 냉기·화염·비전의 세 가지 흐름을 자유로이 다룬다.",
        "name": "이스키에르피리아",
        "routes": {
          "arcane": {
            "name": "비전",
            "variantDesc": "공격 시 {value}% 확률로 비전 투사체 추가 발사.",
            "variantName": "비전 공명"
          },
          "fire": {
            "name": "화염",
            "variantDesc": "공격 시 {value}% 확률로 ATK×2 즉발 화상 피해.",
            "variantName": "마법 점화"
          },
          "frost": {
            "name": "냉기",
            "variantDesc": "냉기 공격 시 {value}% 확률로 2초 빙결.",
            "variantName": "마법 결빙"
          }
        },
        "skills": {
          "arcane_barrage": {
            "desc": "8초마다 ATK×3 투사체 3발 발사",
            "name": "비전 집중포격"
          },
          "arcane_missiles": {
            "desc": "5초마다 ATK×1.5 투사체 5발 연속 발사",
            "name": "비전 미사일"
          },
          "arcane_surge": {
            "desc": "15초마다 전체 적에게 ATK×4 비전 폭격",
            "name": "비전 쇄도"
          },
          "fireball": {
            "desc": "6초마다 타겟 주변 80px ATK×5 폭발",
            "name": "화염구"
          },
          "frost_elemental": {
            "desc": "냉기 정령 소환 (30초, 원딜, 공격 시 슬로우)",
            "name": "냉기의 정령"
          },
          "frost_nova": {
            "desc": "8초마다 주변 120px 적 3초 슬로우",
            "name": "프로스트 노바"
          },
          "ignite": {
            "desc": "화염 속성 공격 피해 30% 증폭 패시브",
            "name": "점화"
          },
          "meteor": {
            "desc": "15초마다 단일 ATK×12 + 주변 50% 피해",
            "name": "운석 낙하"
          }
        },
        "summons": {
          "frost_elemental": {
            "name": "냉기의 정령"
          }
        }
      },
      "iyena": {
        "lore": "에이나의 자매. 빛벼림 드레나이 수양 사제.",
        "name": "이에나",
        "routes": {
          "discipline": {
            "name": "수양",
            "variantDesc": "힐 시 HP {value}% 방어막.",
            "variantName": "고통의 방어막"
          }
        },
        "skills": {
          "atonement": {
            "desc": "딜→힐 전환 (12초)",
            "name": "속죄"
          },
          "barrier": {
            "desc": "전체 아군 보호막 (최대HP 10%, 8초)",
            "name": "빛의 홍수"
          },
          "desperate_prayer": {
            "desc": "자신 ATK×10 즉시 힐 (8초)",
            "name": "절박한 기도"
          },
          "penance": {
            "desc": "공격/치유 연타 (12초)",
            "name": "참회"
          },
          "power_word_shield": {
            "desc": "단일 보호막 부여 (최대HP 25%, 12초)",
            "name": "장막"
          }
        }
      },
      "jainaro": {
        "lore": "달라란의 전투 마법사.",
        "name": "제이나로",
        "routes": {
          "arcane": {
            "name": "비전",
            "variantDesc": "쿨타임 {value}% 감소.",
            "variantName": "신비 집중"
          }
        },
        "skills": {
          "arcane_missiles": {
            "desc": "3연발",
            "name": "신비한 화살"
          },
          "arcane_power": {
            "desc": "공격력 증가",
            "name": "신비의 마법 강화"
          },
          "polymorph": {
            "desc": "적 1명을 5초간 무력화",
            "name": "변이"
          }
        }
      },
      "kaern_dinohouf": {
        "lore": "대지모신을 섬기는 타우렌 대족장. 야성과 자연의 힘을 자유자재로 다룬다.",
        "name": "케른 다이노후프",
        "routes": {
          "balance": {
            "name": "조화",
            "variantDesc": "공격 시 {value}% 확률로 주변 80px ATK×2 광역 폭발.",
            "variantName": "달빛 폭발"
          },
          "feral": {
            "name": "야성",
            "variantDesc": "출혈 대상 공격 시 ATK×{value}% 추가 피해.",
            "variantName": "야성의 심판"
          },
          "guardian": {
            "name": "수호",
            "variantDesc": "방어력 {value}% 증가.",
            "variantName": "격곰 변신"
          },
          "restoration": {
            "name": "회복",
            "variantDesc": "HoT 효과 {value}% 강화.",
            "variantName": "자연의 우기"
          }
        },
        "skills": {
          "bear_hug": {
            "desc": "20초마다 단일 ATK×5 + 5초 속박",
            "name": "격곰 포획"
          },
          "blood_frenzy": {
            "desc": "출혈 대상에게 피해 20% 증가 패시브",
            "name": "피의 분노"
          },
          "mangle": {
            "desc": "8초마다 전방 120px ATK×3 + 2초 기절",
            "name": "분쇄"
          },
          "moonfire": {
            "desc": "공격마다 ATK 30% 추가 자연 피해",
            "name": "달빛 불꽃"
          },
          "nourish": {
            "desc": "10초마다 체력 최저 아군 ATK×5 강화 힐",
            "name": "영양"
          },
          "pounce": {
            "desc": "10초마다 단일 ATK×6 + 2초 기절",
            "name": "표범 도약"
          },
          "rake": {
            "desc": "공격마다 3초 출혈 DoT 부여 (ATK×50%/tick)",
            "name": "갈퀴 발톱"
          },
          "rejuvenation": {
            "desc": "체력 최저 아군 지속 힐 (HoT)",
            "name": "회춘"
          },
          "starfall": {
            "desc": "20초마다 전체 적 ATK×2 별빛 폭격",
            "name": "별비"
          },
          "starsurge": {
            "desc": "8초마다 단일 ATK×6 자연 강타",
            "name": "별 급류"
          },
          "survival_instincts": {
            "desc": "HP 40% 이하 시 받는 피해 30% 감소 패시브",
            "name": "생존 본능"
          },
          "thorns": {
            "desc": "피격 시 ATK 25% 반사 패시브",
            "name": "가시덩굴"
          },
          "tranquility": {
            "desc": "30초마다 전체 아군 ATK×3 힐",
            "name": "평온"
          },
          "wild_growth": {
            "desc": "8초마다 전체 아군 ATK×1.5 힐",
            "name": "야생 성장"
          }
        }
      },
      "kalishan": {
        "lore": "공허의 힘을 화살에 실어 쏘는 사냥꾼.",
        "name": "칼리샨",
        "routes": {
          "marksmanship": {
            "name": "사격",
            "variantDesc": "공격 시 {value}% 확률로 암흑 추가 피해.",
            "variantName": "공허 화살"
          }
        },
        "skills": {
          "aimed_shot": {
            "desc": "강력한 사격",
            "name": "조준 사격"
          },
          "arcane_shot": {
            "desc": "즉시 시전 사격",
            "name": "신비한 사격"
          },
          "rapid_fire": {
            "desc": "공격 속도 증가",
            "name": "속사"
          },
          "void_volley": {
            "desc": "광역 암흑 피해",
            "name": "공허의 화살비"
          }
        }
      },
      "keltu": {
        "lore": "스컬지의 강령술사.",
        "name": "켈투",
        "routes": {
          "frost": {
            "name": "냉기",
            "variantDesc": "냉기 피해 {value}% 증가.",
            "variantName": "사자의 한기"
          }
        },
        "skills": {
          "cone_of_cold": {
            "desc": "부채꼴 얼음",
            "name": "냉기 돌풍"
          },
          "frostbolt": {
            "desc": "냉기 피해+슬로우",
            "name": "얼음 화살"
          }
        }
      },
      "larisian": {
        "lore": "먹이를 노리는 포식자. 블러드엘프 악마사냥꾼.",
        "name": "라리시안",
        "routes": {
          "feast": {
            "name": "포식",
            "variantDesc": "처치 시 HP {value}% 회복.",
            "variantName": "피의 포식"
          }
        },
        "skills": {
          "consume": {
            "desc": "피해+흡혈",
            "name": "악마의 물어뜯기"
          },
          "immolation_aura": {
            "desc": "주변 지속 피해",
            "name": "포식의 오라"
          },
          "massacre": {
            "desc": "처형+쿨초기화",
            "name": "대학살"
          },
          "soul_rend": {
            "desc": "HP 직접 흡수",
            "name": "영혼 갈취"
          }
        }
      },
      "liasian": {
        "lore": "공허에 물든 엘프 악마사냥꾼. 적의 생명력을 포식한다.",
        "name": "리아시안",
        "routes": {
          "feast": {
            "name": "포식",
            "variantDesc": "처치 시 HP {value}% 회복.",
            "variantName": "피의 포식"
          }
        },
        "skills": {
          "consume": {
            "desc": "피해+흡혈",
            "name": "악마의 물어뜯기"
          },
          "immolation_aura": {
            "desc": "주변 지속 피해",
            "name": "포식의 오라"
          },
          "massacre": {
            "desc": "처형+쿨초기화",
            "name": "대학살"
          },
          "soul_rend": {
            "desc": "HP 직접 흡수",
            "name": "영혼 갈취"
          }
        }
      },
      "lili": {
        "lore": "모험을 좋아하는 수도사.",
        "name": "리리",
        "routes": {
          "mistweaver": {
            "name": "운무",
            "variantDesc": "힐 시 {value}% 추가 힐.",
            "variantName": "안개 돌풍"
          }
        },
        "skills": {
          "chi_burst": {
            "desc": "전방 직선 피해+힐",
            "name": "기 폭발"
          },
          "effuse": {
            "desc": "빠른 힐",
            "name": "발산"
          },
          "life_cocoon": {
            "desc": "보호막",
            "name": "기의 고치"
          },
          "renewing_mist": {
            "desc": "전이 HoT",
            "name": "소생의 안개"
          }
        }
      },
      "limu": {
        "lore": "사막의 여우 사냥꾼. 성급이 오를수록 압도적인 속사 능력을 보여준다.",
        "name": "리뮤",
        "routes": {
          "precision": {
            "name": "사격",
            "variantDesc": "공격 시 {value}% 확률 치명타.",
            "variantName": "에임 다운"
          }
        },
        "skills": {
          "aimed_shot": {
            "desc": "강력한 한발",
            "name": "조준 사격"
          },
          "marked_for_death": {
            "desc": "확정 치명타",
            "name": "목표 지정"
          },
          "piercing_arrow": {
            "desc": "직선 관통",
            "name": "관통 화살"
          },
          "trueshot": {
            "desc": "피해 2배",
            "name": "진실의 한 발"
          }
        }
      },
      "lombardo": {
        "lore": "일리다리를 따르는 악마사냥꾼. 지옥불과 혼돈의 마력으로 적을 파괴하거나, 고통을 견디며 아군을 보호한다.",
        "name": "롬바르도",
        "routes": {
          "havoc": {
            "name": "파멸",
            "variantDesc": "공격 시 {value}% 확률로 ATK×2 추가 혼돈 피해.",
            "variantName": "혼돈의 가피"
          },
          "vengeance": {
            "name": "복수",
            "variantDesc": "피격 시 {value}% 확률로 영혼 파편 생성 (HP 5% 회복).",
            "variantName": "영혼 흡수"
          }
        },
        "skills": {
          "blade_dance": {
            "desc": "8초마다 주변 모든 적 ATK×4 피해 및 1초간 모든 공격 회피",
            "name": "칼날의 춤"
          },
          "chaos_strike": {
            "desc": "공격 시 {value}% 확률로 ATK×3 피해 및 소모 기력 반환(쿨타임 감소)",
            "name": "혼돈의 일격"
          },
          "demon_spikes": {
            "desc": "15초마다 6초간 방어력 50% 증가 및 무기 막기 확률(피감) 20% 증가",
            "name": "악마의 쐐기"
          },
          "elysian_decree": {
            "desc": "30초마다 지정 위치에 광역 ATK×12 비전 피해 및 파편 3개 생성",
            "name": "천상의 종"
          },
          "eye_beam": {
            "desc": "12초마다 전방 모든 적에게 2초간 매초 ATK×4 피해 및 확정 치명타",
            "name": "안광"
          },
          "fel_rush": {
            "desc": "5초마다 전방 250px 돌진하며 경로 상의 모든 적 ATK×3.5 피해",
            "name": "지옥 돌진"
          },
          "metamorphosis": {
            "desc": "20초마다 10초간 악마로 변신하여 가속 40% 및 유연성(피감) 20% 증가",
            "name": "탈태"
          },
          "shear": {
            "desc": "6초마다 대상 ATK×3.5 피해 및 확정적으로 영혼 파편 1개 생성",
            "name": "절단"
          },
          "sigil_flame": {
            "desc": "10초마다 6초간 반경 180px 바닥 생성, 매초 ATK×1.5 화염 피해",
            "name": "불꽃의 인장"
          },
          "soul_carving": {
            "desc": "20초마다 대상에게 ATK×8 피해 및 영혼 파편 3개 즉시 생성",
            "name": "영혼 베기"
          },
          "soul_cleave": {
            "desc": "8초마다 전방 광역 ATK×3 피해 및 소모한 파편 당 HP 8% 회복",
            "name": "영혼 분쇄"
          },
          "the_hunt": {
            "desc": "30초마다 대상에게 돌진하여 ATK×15 피해 및 6초간 지속 피해",
            "name": "사냥"
          }
        }
      },
      "magatha": {
        "lore": "불의 정령을 부리는 주술사.",
        "name": "마가타",
        "routes": {
          "elemental": {
            "name": "정기",
            "variantDesc": "화염 피해 {value}% 증가.",
            "variantName": "용암 격류"
          }
        },
        "skills": {
          "ascendance": {
            "desc": "불의 승천자 변신",
            "name": "승천"
          },
          "flame_shock": {
            "desc": "화염 DoT",
            "name": "화염 충격"
          },
          "lava_burst": {
            "desc": "확정 치명타",
            "name": "용암 폭발"
          }
        }
      },
      "maiev": {
        "lore": "그림자 속 감시자.",
        "name": "마이에브",
        "routes": {
          "subtlety": {
            "name": "잠행",
            "variantDesc": "은신 공격 {value}% 추뎀.",
            "variantName": "그림자 일격"
          }
        },
        "skills": {
          "backstab": {
            "desc": "후방 공격",
            "name": "기습"
          },
          "shadow_dance": {
            "desc": "은신 돌입",
            "name": "어둠의 춤"
          },
          "shadowstep": {
            "desc": "순간이동",
            "name": "그림자 밟기"
          }
        }
      },
      "malfu": {
        "lore": "자연의 균형을 수호하는 드루이드.",
        "name": "말퓨",
        "routes": {
          "balance": {
            "name": "조화",
            "variantDesc": "비전 피해 {value}% 증가.",
            "variantName": "월식"
          }
        },
        "skills": {
          "entangling_roots": {
            "desc": "속박",
            "name": "휘감는 뿌리"
          },
          "moonfire": {
            "desc": "비전 DoT",
            "name": "달빛 섬광"
          },
          "starfall": {
            "desc": "광역 폭격",
            "name": "별똥별"
          },
          "wrath": {
            "desc": "자연 피해",
            "name": "천벌"
          }
        }
      },
      "maraad": {
        "lore": "복수의 성기사.",
        "name": "마라드",
        "routes": {
          "retribution": {
            "name": "징벌",
            "variantDesc": "공격 시 {value}% 신성 추뎀.",
            "variantName": "정의의 문장"
          }
        },
        "skills": {
          "avenging_wrath": {
            "desc": "날개 변신",
            "name": "응징의 격노"
          },
          "blade_of_justice": {
            "desc": "신성 칼날",
            "name": "심판의 칼날"
          },
          "crusader_strike": {
            "desc": "신성 타격",
            "name": "성전사의 일격"
          }
        }
      },
      "mokra": {
        "lore": "대지의 정령과 소통하는 오크 주술사.",
        "name": "모크라",
        "routes": {
          "elemental": {
            "name": "정기",
            "variantDesc": "스킬 피해 {value}% 증가.",
            "variantName": "정령의 분노"
          }
        },
        "skills": {
          "chain_lightning": {
            "desc": "3인 연쇄",
            "name": "연쇄 번개"
          },
          "lightning_bolt": {
            "desc": "번개 피해",
            "name": "번개 화살"
          },
          "thunder_shock": {
            "desc": "밀쳐내기+피해",
            "name": "천둥 충격"
          }
        }
      },
      "muyeong_salk": {
        "lore": "생전의 기억을 잃은 언데드 도적. 이제 무법지대의 지배자나 어둠 속의 암살자로서 전장을 누빈다.",
        "name": "무영삵",
        "routes": {
          "assassination": {
            "name": "암살",
            "variantDesc": "공격 시 {value}% 확률로 대상에게 강력한 맹독 DoT 부여.",
            "variantName": "치명적인 독"
          },
          "outlaw": {
            "name": "무법",
            "variantDesc": "공격 시 {value}% 확률로 10초간 무작위 전투 강화 버프 획득.",
            "variantName": "뼈 굴리기"
          },
          "subtlety": {
            "name": "잠행",
            "variantDesc": "스킬 사용 시 {value}% 확률로 5초간 공격력 30% 증가.",
            "variantName": "어둠의 춤"
          }
        },
        "skills": {
          "between_eyes": {
            "desc": "10초마다 단일 대상 ATK×6 피해 및 2초 기절",
            "name": "미간 적중"
          },
          "dreadblades": {
            "desc": "20초마다 10초간 공격속도 50% 증가 및 모든 공격에 {value}% 추가 피해",
            "name": "공포의 검"
          },
          "envenom": {
            "desc": "12초마다 독에 걸린 대상에게 ATK×10의 폭발적 피해",
            "name": "독살"
          },
          "eviscerate": {
            "desc": "공격 시 {value}% 확률로 약점을 찔러 ATK×5 피해",
            "name": "절개"
          },
          "flurry": {
            "desc": "공격 시 {value}% 확률로 주변 적에게 50%의 복제 피해",
            "name": "칼날 난무"
          },
          "garrote": {
            "desc": "8초마다 단일 대상 6초 침묵 및 ATK×4 지속 피해",
            "name": "목조르기"
          },
          "kingsbane": {
            "desc": "30초마다 대상에게 강력한 독을 주입하여 14초간 매초 ATK×2 피해 (피해량 점증)",
            "name": "왕의 살해자"
          },
          "mutilate": {
            "desc": "공격 시 {value}% 확률로 ATK×3 피해 및 독 효과 2배 증폭",
            "name": "절단"
          },
          "pistol": {
            "desc": "6초마다 단일 대상 ATK×3.5 피해 및 3초 슬로우",
            "name": "권총 사격"
          },
          "secret_tech": {
            "desc": "25초마다 환영을 소환하여 전방 광역 ATK×12 피해",
            "name": "비밀 기법"
          },
          "shadowstrike": {
            "desc": "5초마다 타겟 뒤로 순간이동하여 ATK×4 피해 및 1초 기절",
            "name": "그림자 일격"
          },
          "symbols": {
            "desc": "15초마다 8초간 다음 3회의 공격 확정 치명타 및 공격력 20% 증가",
            "name": "죽음의 상징"
          }
        }
      },
      "nog": {
        "lore": "치명적인 독 암살자.",
        "name": "노즈",
        "routes": {
          "assassination": {
            "name": "암살",
            "variantDesc": "독 지속시간 {value}% 증가.",
            "variantName": "연금술"
          }
        },
        "skills": {
          "mutilate": {
            "desc": "쌍수 공격",
            "name": "절단"
          },
          "poison_bomb": {
            "desc": "독 구름 생성",
            "name": "독 폭탄"
          },
          "poison_knife": {
            "desc": "독 찌르기",
            "name": "독칼"
          },
          "vendetta": {
            "desc": "피해 증폭",
            "name": "원한"
          }
        }
      },
      "nostferatu": {
        "lore": "태양샘의 타락과 정화를 모두 지켜본 블러드 나이트. 이제 신성한 빛의 심판관으로서 전장에 선다.",
        "name": "노스훼라투",
        "routes": {
          "holy": {
            "name": "신성",
            "variantDesc": "치유 시 {value}% 확률로 대상의 해로운 효과 제거.",
            "variantName": "빛의 가피"
          },
          "protection": {
            "name": "보호",
            "variantDesc": "피격 시 {value}% 확률로 3초간 최대 HP 15% 보호막.",
            "variantName": "빛의 수호"
          },
          "retribution": {
            "name": "징벌",
            "variantDesc": "공격 시 {value}% 확률로 ATK×2 추가 신성 피해.",
            "variantName": "신성 질타"
          }
        },
        "skills": {
          "avengers_shield": {
            "desc": "8초마다 적 3명에게 ATK×3 피해 및 2초 침묵",
            "name": "응징의 방패"
          },
          "blade_of_justice": {
            "desc": "공격 시 {value}% 확률로 ATK×3 강력한 일격",
            "name": "심판의 칼날"
          },
          "divine_revelation": {
            "desc": "15초마다 10초간 모든 치유량 50% 증가 및 마나 소모 없음",
            "name": "신성한 계시"
          },
          "divine_storm": {
            "desc": "8초마다 주변 모든 적 ATK×3.5 피해 및 입힌 피해 20% 회복",
            "name": "신성 폭풍"
          },
          "guardian_king": {
            "desc": "25초마다 10초간 받는 피해 50% 감소 및 반사량 100% 증가",
            "name": "고대 왕의 수호자"
          },
          "holy_beacon_1": {
            "desc": "치유 시 가장 생명력이 낮은 추가 아군 1명을 함께 치유합니다.",
            "name": "빛의 봉화"
          },
          "holy_beacon_2": {
            "desc": "치유 시 추가로 아군 1명을 더 치유합니다. (총 3명 동시 치유)",
            "name": "두 번째 봉화"
          },
          "holy_flash": {
            "desc": "5초마다 단일 대상 ATK×4 즉시 치유",
            "name": "빛의 섬광"
          },
          "holy_ground": {
            "desc": "10초마다 8초간 주변 아군 방어력 +20 및 매초 2% 회복",
            "name": "신성한 대지"
          },
          "judgment": {
            "desc": "6초마다 단일 대상 ATK×4 피해 및 5초간 받는 피해 15% 증가",
            "name": "심판"
          },
          "wake_of_ashes": {
            "desc": "20초마다 전방 모든 적 ATK×10 피해. 언데드는 즉시 소멸(즉사).",
            "name": "파멸의 재"
          }
        }
      },
      "pilji_bangkril": {
        "lore": "이익을 위해서라면 야수도 길들이는 고블린 사냥꾼.",
        "name": "필지뱅크릴",
        "routes": {
          "beast_mastery": {
            "name": "야수냥꾼",
            "variantDesc": "소환수 능력치 {value}% 증가.",
            "variantName": "야수의 분노"
          },
          "marksmanship": {
            "name": "사격냥꾼",
            "variantDesc": "공격마다 {value}% 확률로 ATK×3 추가 관통 피해.",
            "variantName": "저격수의 집중"
          },
          "survival": {
            "name": "생존냥꾼",
            "variantDesc": "근접 공격 시 {value}% 추가 자연 피해.",
            "variantName": "생존술사"
          }
        },
        "skills": {
          "aimed_shot": {
            "desc": "공격마다 ATK 60% 추가 피해 패시브",
            "name": "조준 사격"
          },
          "bestial_wrath": {
            "desc": "20초마다 소환수 공격력 2배 + 광폭화 30초",
            "name": "야수 폭주"
          },
          "binding_shot": {
            "desc": "8초마다 단일 3초 속박",
            "name": "올가미"
          },
          "call_pet": {
            "desc": "반려 늑대 소환 (20초, 근딜)",
            "name": "반려동물"
          },
          "explosive_arrow": {
            "desc": "명중 시 주변 70px ATK×1.5 광역 폭발",
            "name": "폭발 화살"
          },
          "explosive_trap": {
            "desc": "12초마다 주변 150px ATK×3 폭발 + 3초 슬로우",
            "name": "폭발 함정"
          },
          "kill_shot": {
            "desc": "15초마다 HP 40% 이하 적 즉사 or ATK×12",
            "name": "처형 사격"
          },
          "mongoose_bite": {
            "desc": "20초마다 단일 ATK×6 강타 + 2초 기절",
            "name": "몽구스 한입"
          },
          "piercing_shot": {
            "desc": "8초마다 단일 ATK×8 방어 무시 강타",
            "name": "관통 사격"
          },
          "poison_arrow": {
            "desc": "공격마다 3초 독 DoT (ATK×40%/tick) 부여",
            "name": "독화살"
          },
          "rapid_fire": {
            "desc": "30% 확률로 추가 투사체 발사",
            "name": "연사"
          },
          "serpent_sting": {
            "desc": "공격마다 3초 독 DoT (ATK×50%/tick) 부여",
            "name": "독 칼날"
          }
        },
        "summons": {
          "pet": {
            "name": "반려 늑대"
          }
        }
      },
      "protagonist_defense": {
        "lore": "무한 던전 1000층을 돌파한 전설의 수호자. 수많은 영웅들의 고유 특성을 자신의 것으로 만들어 최강의 방어선을 구축한다.",
        "name": "디펜스 용사",
        "routes": {
          "protagonist_defense_all": {
            "name": "올라운더",
            "variantDesc": "다른 영웅의 고유 특성을 최대 {value}개 흡수하여 강력한 패시브를 얻습니다.",
            "variantName": "특성 흡수"
          }
        }
      },
      "quinchai": {
        "lore": "취권을 구사하는 판다렌 수도사. 백호",
        "name": "퀸차이",
        "routes": {
          "brewmaster": {
            "name": "양조",
            "variantDesc": "받는 피해의 {value}%를 10초에 걸쳐 나누어 받습니다.",
            "variantName": "시간차"
          },
          "mistweaver": {
            "name": "운무",
            "variantDesc": "치유 시 {value}% 확률로 추가 안개 치유.",
            "variantName": "안개 돌풍"
          },
          "windwalker": {
            "name": "풍운",
            "variantDesc": "공격 시 {value}% 확률로 2연타.",
            "variantName": "취호의 가피"
          }
        },
        "skills": {
          "bm_iron_skin": {
            "desc": "15초마다 8초간 받는 피해 30% 감소",
            "name": "철벽주"
          },
          "bm_keg": {
            "desc": "8초마다 적 5명 ATK×3 피해 및 4초간 40% 슬로우",
            "name": "술통 강타"
          },
          "chi_ji": {
            "desc": "주학을 소환하여 부상당한 아군을 매우 빠르게 치유합니다.",
            "name": "주학 츠지 소환"
          },
          "fists": {
            "desc": "6초마다 전방 150px 적 ATK×4 광역 피해 및 1초 기절",
            "name": "분노의 권법"
          },
          "flying_kick": {
            "desc": "8초마다 주변 모든 적 3초간 이동속도 50% 감소",
            "name": "불능의 결계"
          },
          "kick": {
            "desc": "공격 시 {value}% 확률로 ATK×2.5 피해",
            "name": "해오름차기"
          },
          "niuzao": {
            "desc": "자신의 능력치 90%를 가진 흑우를 소환하여 부탱커로 활용합니다.",
            "name": "흑우 니우자오 소환"
          },
          "revival": {
            "desc": "25초마다 모든 아군 즉시 ATK×3 치유 및 모든 해로운 효과 제거",
            "name": "재활"
          },
          "vivify": {
            "desc": "5초마다 최저 체력 아군 ATK×4 치유",
            "name": "생충"
          },
          "xuen": {
            "desc": "20초간 강력한 백호 쉬엔을 소환하여 함께 싸웁니다.",
            "name": "백호 쉬엔 소환"
          },
          "yu_lon": {
            "desc": "옥룡을 소환하여 20초간 주변 모든 아군을 주기적으로 치유합니다.",
            "name": "옥룡 위론 소환"
          }
        },
        "summons": {
          "chi_ji": {
            "name": "츠지"
          },
          "niuzao": {
            "name": "니우자오"
          },
          "xuen": {
            "name": "쉬엔"
          },
          "yu_lon": {
            "name": "위론"
          }
        }
      },
      "rakan": {
        "lore": "저주와 독의 부두술사.",
        "name": "라칸",
        "routes": {
          "shadow": {
            "name": "암흑",
            "variantDesc": "받는 피해 {value}% 반사.",
            "variantName": "부두 인형"
          }
        },
        "skills": {
          "shadow_word_pain": {
            "desc": "지속 암흑 피해",
            "name": "고통"
          },
          "vampiric_touch": {
            "desc": "피해+회복",
            "name": "흡혈의 손길"
          },
          "void_eruption": {
            "desc": "공허 개방",
            "name": "공허의 형상"
          }
        }
      },
      "rix": {
        "lore": "불장난을 좋아하는 마법사.",
        "name": "릭스",
        "routes": {
          "fire": {
            "name": "화염",
            "variantDesc": "화염 DoT {value}% 증가.",
            "variantName": "발화"
          }
        },
        "skills": {
          "fire_blast": {
            "desc": "즉시 시전",
            "name": "화염 작렬"
          },
          "fireball": {
            "desc": "화염 피해",
            "name": "화염구"
          },
          "pyroblast": {
            "desc": "거대 화염구",
            "name": "불덩이 작렬"
          }
        }
      },
      "seori_garam": {
        "lore": "정령과 소통하는 트롤 대주술사. 야성의 힘과 정령",
        "name": "서리가람",
        "routes": {
          "elemental": {
            "name": "정기술사",
            "variantDesc": "소환수 능력치 {value}% 증가.",
            "variantName": "정령의 공명"
          },
          "enhancement": {
            "name": "고양술사",
            "variantDesc": "공격 시 {value}% 확률로 ATK×2 추가 자연 피해.",
            "variantName": "전투의 토템"
          },
          "restoration": {
            "name": "복원술사",
            "variantDesc": "힐 시 {value}% 확률로 주변 아군 소량 힐 전파.",
            "variantName": "회복의 물결"
          }
        },
        "skills": {
          "chain_heal": {
            "desc": "8초마다 체력 낮은 순 3인 연쇄 힐 (ATK×3→2→1)",
            "name": "연쇄 치유"
          },
          "chain_lightning": {
            "desc": "6초마다 3연쇄 ATK×1.5 번개 타격",
            "name": "연쇄 번개"
          },
          "earth_elemental": {
            "desc": "대지 정령 소환 (20초, 탱커, 높은 HP/방어)",
            "name": "대지 정령 소환"
          },
          "feral_spirit": {
            "desc": "늑대 정령 소환 (20초, 근딜)",
            "name": "정령 각성"
          },
          "fire_elemental": {
            "desc": "화염 정령 소환 (20초, 원딜, 공격 시 ATK 30% 화염 추가 피해)",
            "name": "화염 정령 소환"
          },
          "healing_rain": {
            "desc": "12초마다 전체 아군 ATK×2 힐",
            "name": "치유의 비"
          },
          "lava_lash": {
            "desc": "공격마다 ATK 30% 추가 화염 피해 패시브",
            "name": "용암 채찍"
          },
          "lightning_shield": {
            "desc": "피격 시 ATK 20% 번개 반사 패시브",
            "name": "번개 보호막"
          },
          "spirit_link": {
            "desc": "30초마다 전체 아군 체력 균등화 + 5초 피해 20% 감소",
            "name": "정령 연결"
          },
          "stormstrike": {
            "desc": "6초마다 단일 ATK×4 + 2초 슬로우",
            "name": "폭풍 강타"
          },
          "totemic_wrath": {
            "desc": "20초마다 전체 적 ATK×3 번개 폭격",
            "name": "토템의 분노"
          },
          "water_shield": {
            "desc": "피격 시 ATK 15% 자가 회복 패시브",
            "name": "물의 방패"
          }
        },
        "summons": {
          "earth_elemental": {
            "name": "대지 정령"
          },
          "feral_spirit": {
            "name": "정령 늑대"
          },
          "fire_elemental": {
            "name": "화염 정령"
          }
        }
      },
      "sylva": {
        "lore": "죽음에서 돌아온 어둠의 순찰자.",
        "name": "실바",
        "routes": {
          "survival": {
            "name": "생존",
            "variantDesc": "공격 시 {value}% 암흑 추뎀.",
            "variantName": "어둠의 화살"
          }
        },
        "skills": {
          "black_arrow": {
            "desc": "암흑 DoT",
            "name": "검은 화살"
          },
          "explosive_shot": {
            "desc": "광역 폭발",
            "name": "폭발 사격"
          },
          "raptor_strike": {
            "desc": "근접 강타",
            "name": "랩터의 일격"
          }
        }
      },
      "taran": {
        "lore": "음영파의 수장.",
        "name": "타란",
        "routes": {
          "subtlety": {
            "name": "잠행",
            "variantDesc": "방어 관통 {value}%.",
            "variantName": "약점 포착"
          }
        },
        "skills": {
          "eviscerate": {
            "desc": "마무리 일격",
            "name": "절개"
          },
          "secret_technique": {
            "desc": "분신 공격",
            "name": "비기"
          },
          "shadowstrike": {
            "desc": "은신 공격",
            "name": "그림자 일격"
          }
        }
      },
      "trontum": {
        "lore": "불타는 산 깊은 곳에서 온 검은무쇠 드워프 죽음의 기사.",
        "name": "트론튬",
        "routes": {
          "frost": {
            "name": "냉기",
            "variantDesc": "공격 시 {value}% 추가 냉기 피해.",
            "variantName": "서리칼날"
          }
        },
        "skills": {
          "frost_strike": {
            "desc": "냉기 피해+슬로우",
            "name": "냉기 강타"
          },
          "howling_blast": {
            "desc": "광역 냉기",
            "name": "얼음 포효"
          },
          "obliterate": {
            "desc": "강력한 2연타",
            "name": "오블리터레이트"
          },
          "pillar_of_frost": {
            "desc": "공격력 증가",
            "name": "냉기 형상"
          }
        }
      },
      "tutankaton": {
        "lore": "살아있는 돌",
        "name": "투탕카톤",
        "routes": {
          "assassination": {
            "name": "암살",
            "variantDesc": "독 피해 {value}% 증가.",
            "variantName": "맹독 전문가"
          }
        },
        "skills": {
          "envenom": {
            "desc": "독 폭발 피해",
            "name": "부식"
          },
          "garrote": {
            "desc": "출혈+독",
            "name": "교살"
          },
          "rupture": {
            "desc": "독 DoT",
            "name": "파열"
          },
          "venom_burst": {
            "desc": "광역 독 폭발",
            "name": "맹독 폭발"
          }
        }
      },
      "tyran": {
        "lore": "지옥불을 다루는 악마사냥꾼.",
        "name": "티란",
        "routes": {
          "havoc": {
            "name": "황폐",
            "variantDesc": "치명타 피해 {value}% 증가.",
            "variantName": "혼돈의 일격"
          }
        },
        "skills": {
          "chaos_strike": {
            "desc": "화염 타격",
            "name": "혼돈의 일격"
          },
          "immolation_aura": {
            "desc": "주변 화염",
            "name": "지옥불 오라"
          },
          "metamorphosis": {
            "desc": "능력치 강화",
            "name": "악마 변신"
          }
        }
      },
      "ultrion": {
        "lore": "용의 섬에서 깨어난 고대 드렉티르. 오색 용의 힘을 다루며 아군을 치유하거나 강화하고",
        "name": "울트리온",
        "routes": {
          "augmentation": {
            "name": "증강",
            "variantDesc": "오라: 주변 250px 내 모든 아군의 공격 속도가 {value}% 증가합니다.",
            "variantName": "강화의 정수"
          },
          "devastation": {
            "name": "파열",
            "variantDesc": "공격 시 {value}% 확률로 타겟 주변 100px 적에게 ATK×2 추가 피해.",
            "variantName": "파멸의 기운"
          },
          "preservation": {
            "name": "복원",
            "variantDesc": "힐 시 {value}% 확률로 주변 아군 2명을 추가로 치유합니다.",
            "variantName": "생명의 숨결"
          }
        },
        "skills": {
          "blistering_scales": {
            "desc": "12초마다 탱커 아군 방어력 +40 및 피격 시 ATK 30% 반사 (10초)",
            "name": "작열의 비늘"
          },
          "breath_of_eons": {
            "desc": "30초마다 전장 모든 적 3초 기절 및 10초간 아군 전체 피해량 20% 증가",
            "name": "무한의 숨결"
          },
          "disintegrate": {
            "desc": "12초마다 단일 대상에게 3초간 매초 ATK×4 피해 및 50% 슬로우",
            "name": "분열"
          },
          "dragonrage": {
            "desc": "20초마다 10초간 공격력 50% 및 공격 속도 50% 증가",
            "name": "용의 격노"
          },
          "ebon_might": {
            "desc": "10초마다 8초간 가장 공격력이 높은 아군 2명의 ATK 30% 증가",
            "name": "흑요의 힘"
          },
          "eternity_surge": {
            "desc": "공격 시 {value}% 확률로 주변 적 3명에게 ATK×3 피해",
            "name": "영겁의 해일"
          },
          "fire_breath": {
            "desc": "8초마다 전방 모든 적 ATK×5 피해 및 5초간 지속 화염 피해",
            "name": "불꽃 숨결"
          },
          "reversion": {
            "desc": "6초마다 대상에게 8초간 ATK×0.5 지속 회복 부여",
            "name": "소생"
          },
          "spiritbloom": {
            "desc": "8초마다 체력이 낮은 아군 3명에게 ATK×4 즉시 치유",
            "name": "정신꽃"
          },
          "stasis": {
            "desc": "25초마다 모든 아군 즉시 ATK×5 치유 및 2초간 모든 피해 면역",
            "name": "정지"
          },
          "temporal_anomaly": {
            "desc": "12초마다 아군 전체에게 6초간 최대 HP 15% 보호막 부여",
            "name": "시간의 변칙"
          },
          "upheaval": {
            "desc": "15초마다 타겟 주변 적 ATK×5 피해 및 2초간 기절",
            "name": "지각 변동"
          }
        }
      },
      "velen": {
        "lore": "드레나이 예언자.",
        "name": "벨렌",
        "routes": {
          "holy": {
            "name": "신성",
            "variantDesc": "힐 시 {value}% 쿨타임 단축.",
            "variantName": "구원의 빛"
          }
        },
        "skills": {
          "circle_of_healing": {
            "desc": "광역 힐",
            "name": "치유의 마법진"
          },
          "divine_hymn": {
            "desc": "전체 아군 반복 힐(4초)",
            "name": "신성한 찬송"
          },
          "flash_heal": {
            "desc": "빠른 힐",
            "name": "순간 치유"
          },
          "holy_word_salvation": {
            "desc": "전체 대량 힐",
            "name": "빛의 권능: 구원"
          }
        }
      },
      "voljin": {
        "lore": "어둠사냥꾼.",
        "name": "볼진",
        "routes": {
          "enhancement": {
            "name": "고양",
            "variantDesc": "공속 {value}% 증가.",
            "variantName": "그림자 사냥꾼"
          }
        },
        "skills": {
          "big_bad_voodoo": {
            "desc": "광역 무적",
            "name": "대규모 부두"
          },
          "hex": {
            "desc": "변이",
            "name": "주술"
          },
          "shadow_strike": {
            "desc": "암흑 무기 공격",
            "name": "그림자 일격"
          }
        }
      },
      "xianghua": {
        "lore": "치유의 안개를 다루는 판다렌 수도사.",
        "name": "샹화",
        "routes": {
          "mistweaver": {
            "name": "운무수도사",
            "variantDesc": "공격 시 {value}% 확률 스마트 힐.",
            "variantName": "운무 직조"
          }
        },
        "skills": {
          "enveloping_mist": {
            "desc": "강력 힐+HoT",
            "name": "감싸는 안개"
          },
          "invoke_chi_ji": {
            "desc": "8초간 전체 주기 힐",
            "name": "기지 소환"
          },
          "life_cocoon": {
            "desc": "보호막+HoT",
            "name": "생명의 누에고치"
          },
          "revival": {
            "desc": "전체 회복",
            "name": "부활의 의식"
          },
          "soothing_mist": {
            "desc": "채널 힐",
            "name": "안식의 안개"
          }
        }
      },
      "yeshtalktion": {
        "lore": "빛으로 벼려진 드레나이 성기사. 순수한 빛의 힘을 다룬다.",
        "name": "예슈탈키온",
        "routes": {
          "holy": {
            "name": "신성기사",
            "variantDesc": "힐 시 {value}% 확률 연계 힐.",
            "variantName": "신성한 빛"
          },
          "retribution": {
            "name": "징벌기사",
            "variantDesc": "힐 후 공격 {value}% 추뎀.",
            "variantName": "신성 응보"
          }
        },
        "skills": {
          "crusader_strike": {
            "desc": "신성 타격",
            "name": "성기사의 뇌격"
          },
          "divine_favor": {
            "desc": "힐 2배+쿨초",
            "name": "빛의 은혜"
          },
          "divine_purpose": {
            "desc": "쿨감 가속",
            "name": "성전사의 검"
          },
          "final_reckoning": {
            "desc": "광역 피해+힐",
            "name": "최후의 심판"
          },
          "hammer_of_wrath": {
            "desc": "마무리 일격",
            "name": "진노의 해머"
          },
          "holy_light": {
            "desc": "강력 단일 힐",
            "name": "신성 빛"
          },
          "sacred_shield": {
            "desc": "힐 대상에게 보호막 (최대HP 15%, 8초)",
            "name": "신성한 방패"
          },
          "sanctified_ground": {
            "desc": "장판 힐+피감",
            "name": "지성소"
          }
        }
      },
      "yrel": {
        "lore": "빛의 용사.",
        "name": "이렐",
        "routes": {
          "protection": {
            "name": "보호",
            "variantDesc": "피해 {value}% 감소.",
            "variantName": "헌신적인 수호자"
          }
        },
        "skills": {
          "divine_storm": {
            "desc": "광역 ATK×5 신성+자힐",
            "name": "신성한 폭풍"
          },
          "guardian_of_kings": {
            "desc": "전체 아군 10초 피감 15%",
            "name": "고대 왕의 수호자"
          },
          "hammer_of_righteous": {
            "desc": "광역 신성",
            "name": "정의의 망치"
          },
          "light_protection": {
            "desc": "가장 낮은 HP 아군에게 5초간 보호막(HP 15%)",
            "name": "빛의 가호"
          }
        }
      },
      "zedah": {
        "lore": "죽음에서 돌아온 수호자. 지옥불로 단련된 방패로 아군을 지킨다.",
        "name": "제다",
        "routes": {
          "defense": {
            "name": "방어",
            "variantDesc": "피격 시 피해의 {value}% 반사.",
            "variantName": "가시 갑옷"
          },
          "fury": {
            "name": "분노",
            "variantDesc": "공격 시 {value}% 확률로 3연타.",
            "variantName": "가시 본능"
          },
          "weapon": {
            "name": "무기",
            "variantDesc": "3타마다 ATK×{value}% 추가 화염 피해.",
            "variantName": "지옥불 도검"
          }
        },
        "skills": {
          "execute_instinct": {
            "desc": "HP 30% 이하 적에게 공격력 2배",
            "name": "집행자"
          },
          "heat_blade": {
            "desc": "공격 시 ATK 20% 추가 화염 피해",
            "name": "열화 도검"
          },
          "hellfire_slash": {
            "desc": "8초마다 전방 160px 내 모든 적에게 ATK×4 화염 피해",
            "name": "지옥불 베기"
          },
          "lava_armor": {
            "desc": "피격 시 적에게 ATK 30% 화염 피해",
            "name": "용암 갑옷"
          },
          "steel_shield": {
            "desc": "방어력 +25 패시브",
            "name": "강철 방패"
          },
          "thorn_edge": {
            "desc": "반사량 +15%",
            "name": "가시날의 각인"
          },
          "weapon_mastery": {
            "desc": "ATK +25% 패시브",
            "name": "무기 연마"
          }
        }
      },
      "zuljin": {
        "lore": "전설적인 도끼 투척병.",
        "name": "줄진",
        "routes": {
          "combat": {
            "name": "전투",
            "variantDesc": "저체력 시 공속 {value}% 증가.",
            "variantName": "광전사"
          }
        },
        "skills": {
          "guillotine": {
            "desc": "거대 도끼 낙하",
            "name": "길로틴"
          },
          "throw_axe": {
            "desc": "원거리 물리 피해",
            "name": "도끼 투척"
          },
          "twin_cleave": {
            "desc": "전방 범위 피해",
            "name": "쌍도끼 베기"
          }
        }
      },
      "aeina": {
        "name": "에이나",
        "lore": "어둠을 받아들인 드레나이 사제.",
        "routes": {
          "void": {
            "name": "공허",
            "variantName": "공허 파열",
            "variantDesc": "공격 시 {{value}}% 확률 광역 전파."
          }
        },
        "skills": {
          "mind_flay": {
            "name": "정신 채찍",
            "desc": "채널 피해+슬로우"
          },
          "mind_blast": {
            "name": "공허 폭탄",
            "desc": "단일 강타"
          },
          "devouring_plague": {
            "name": "황폐",
            "desc": "DoT+흡혈"
          },
          "void_form": {
            "name": "공허화",
            "desc": "변신 강화"
          }
        }
      },
      "ssr_goblin_warchief": {
        "summons": {
          "gold_turret": {
            "name": "황금 포탑"
          }
        },
        "name": "고블린 워치프",
        "lore": "돈과 기술로 무장한 고블린들의 우두머리. 거대한 기계 슈트와 황금의 힘으로 적을 압도한다.",
        "routes": {
          "goblin_chief_shredder": {
            "name": "기계 슈트",
            "variantName": "황금 갑옷",
            "variantDesc": "받는 피해 {value}% 감소 및 피격 시 번개 반격."
          },
          "goblin_chief_merchant": {
            "name": "거상",
            "variantName": "자본의 힘",
            "variantDesc": "공격 시 {value}% 확률로 획득 골드 영구 1% 증가 (최대 50%)."
          }
        },
        "skills": {
          "gold_toss": {
            "name": "골드 투척",
            "desc": "적 1명에게 ATK×5 피해 및 2초 기절"
          },
          "repair": {
            "name": "기계 수리",
            "desc": "패시브: 매초 자신의 HP 2.5% 회복"
          },
          "turret": {
            "name": "강화 포탑",
            "desc": "황금 포탑 소환 (상시 유지)"
          },
          "shield": {
            "name": "기술력의 장벽",
            "desc": "전체 아군에게 HP 30% 보호막 부여"
          },
          "beam": {
            "name": "황금 광선",
            "desc": "전방 모든 적에게 ATK×12 신성 피해"
          },
          "rocket": {
            "name": "로켓 발사",
            "desc": "적 3명에게 ATK×4 폭발 피해"
          },
          "mine": {
            "name": "지뢰 매설",
            "desc": "전장에 지뢰 설치: 밟은 적 ATK×6 피해"
          },
          "bribe": {
            "name": "매수",
            "desc": "적 1명을 10초간 아군으로 만듬 (보스 기절)"
          },
          "investment": {
            "name": "투자",
            "desc": "10초간 아군 전체 공격력 50% 증가"
          },
          "bombardment": {
            "name": "공중 폭격",
            "desc": "화면 전체 무차별 로켓 폭격 ATK×15"
          }
        }
      },
      "ssr_orc_blademaster": {
        "summons": {
          "mirror_image": {
            "name": "환영"
          },
          "ghost": {
            "name": "원혼"
          }
        },
        "name": "오크 검귀",
        "lore": "전설적인 불타는 칼날 부족의 검객. 바람보다 빠르고 불길보다 뜨거운 검술을 구사한다.",
        "routes": {
          "blademaster_sword": {
            "name": "검도",
            "variantName": "환영 분신",
            "variantDesc": "공격 시 {value}% 확률로 환영 생성 및 치명타 확률 증가."
          },
          "blademaster_ghost": {
            "name": "귀도",
            "variantName": "유령 보폭",
            "variantDesc": "공격 시 {value}% 확률로 적을 관통하여 뒤로 이동하며 베기."
          }
        },
        "skills": {
          "windwalk": {
            "name": "윈드워크",
            "desc": "5초간 이속 50% 증가 및 은신, 다음 공격 3배 피해"
          },
          "mirror_image": {
            "name": "미러 이미지",
            "desc": "자신과 동일한 분신 3개 생성"
          },
          "critical_strike": {
            "name": "치명적 일격",
            "desc": "패시브: 25% 확률로 4배 피해"
          },
          "burning_blade": {
            "name": "불타는 칼날",
            "desc": "공격 시 추가 화염 피해 및 5초간 공격력 50% 증가"
          },
          "bladestorm": {
            "name": "칼날폭풍",
            "desc": "10초간 무적 및 주변 광역 ATK×5 지속 피해"
          },
          "ghost_strike": {
            "name": "유령 베기",
            "desc": "단일 ATK×8 암흑 피해 + 3초 공포"
          },
          "spirit_link": {
            "name": "영혼 결속",
            "desc": "적 3명을 연결하여 받는 피해 공유"
          },
          "haunt": {
            "name": "원혼",
            "desc": "쓰러진 적을 10초간 유령병사로 소환"
          },
          "night_terror": {
            "name": "밤의 공포",
            "desc": "전체 적 실명 및 매초 지속 피해"
          },
          "ghost_army": {
            "name": "만령의 진혼곡",
            "desc": "전장 전체 유령 군단 소환 폭격 ATK×20"
          }
        }
      },
      "ssr_tauren_chieftain": {
        "summons": {
          "ancestor": {
            "name": "선조의 영혼"
          }
        },
        "name": "붉은갈기 족장",
        "lore": "붉은 봉우리의 수호자이자 대지모신의 목소리. 그의 발구르기는 대지를 가르고, 그의 의지는 죽음을 초월한다.",
        "routes": {
          "tauren_chieftain_guardian": {
            "name": "윤회",
            "variantName": "윤회",
            "variantDesc": "사망 시 {value}% 체력으로 즉시 부활 (쿨타임 60초)."
          },
          "tauren_chieftain_spirit": {
            "name": "정령",
            "variantName": "정령의 인도",
            "variantDesc": "공격 시 {value}% 확률로 자연 추가 피해 및 힐."
          }
        },
        "skills": {
          "shockwave": {
            "name": "충격파",
            "desc": "전방 원뿔형 적들에게 ATK×5 피해 및 2초 기절"
          },
          "war_stomp": {
            "name": "전투 발구르기",
            "desc": "주변 적 3초 기절 및 ATK×4 피해"
          },
          "endurance_aura": {
            "name": "인내의 오라",
            "desc": "패시브: 아군 전체 공격속도/이동속도 20% 증가"
          },
          "earth_shield": {
            "name": "대지의 보호막",
            "desc": "피격 시 HP를 회복하는 보호막을 아군에게 부여"
          },
          "reincarnation": {
            "name": "대지의 축복",
            "desc": "부활 시 15초간 공격력 3배 및 무적"
          },
          "nature_fury": {
            "name": "자연의 분노",
            "desc": "단일 ATK×8 자연 피해"
          },
          "spirit_link": {
            "name": "영혼 연결",
            "desc": "아군 3명을 연결하여 받는 피해 30% 감소 및 분산"
          },
          "totem_mastery": {
            "name": "토템의 숙련",
            "desc": "4가지 토템(공격/방어/치유/가속)을 동시에 소환"
          },
          "ancestral_call": {
            "name": "선조의 부름",
            "desc": "선조의 영혼 2명을 소환하여 함께 전투 (상시)"
          },
          "world_stomp": {
            "name": "천지개벽 발구르기",
            "desc": "전장 전체 적 ATK×15 피해 및 5초 기절"
          }
        }
      },
      "ssr_ice_queen": {
        "summons": {
          "frost_elemental": {
            "name": "냉기 정령"
          }
        },
        "name": "서리눈송이 여왕",
        "lore": "얼음 나라의 냉혹한 통치자. 그녀의 숨결 한 번에 전장은 영원한 겨울로 뒤덮인다.",
        "routes": {
          "ice_queen_frost": {
            "name": "빙결",
            "variantName": "절대 영도",
            "variantDesc": "슬로우 효과 {value}% 강화 및 빙결 시간 증가."
          },
          "ice_queen_shard": {
            "name": "빙편",
            "variantName": "얼음 파편",
            "variantDesc": "공격 시 {value}% 확률로 3개의 얼음 화살 추가 발사."
          }
        },
        "skills": {
          "frost_nova": {
            "name": "동결 파동",
            "desc": "화면 전체 적 3초 빙결 및 ATK×4 피해"
          },
          "barrier": {
            "name": "얼음 보호막",
            "desc": "아군 전체에게 HP 25% 보호막 + 피격 적 슬로우"
          },
          "blizzard": {
            "name": "광역 눈보라",
            "desc": "15초간 전장 눈보라: 매초 20% 슬로우 중첩 및 지속 피해"
          },
          "frozen_statue": {
            "name": "얼음 조각상",
            "desc": "가장 강한 적 1명을 10초간 완전 봉쇄"
          },
          "frozen_orb": {
            "name": "서리의 폭풍",
            "desc": "거대 얼음 구슬이 폭발하며 전장 전체 적 즉사 (보스 ATK×20)"
          },
          "shard_barrage": {
            "name": "얼음 조각 세례",
            "desc": "적에게 무수한 파편 발사 ATK×1.5 × 8연타"
          },
          "cold_snap": {
            "name": "매서운 추위",
            "desc": "패시브: 자신의 모든 냉기 피해 40% 증가"
          },
          "glacier_spike": {
            "name": "빙하 창",
            "desc": "거대 빙하 창을 투척하여 경로의 모든 적 관통 피해"
          },
          "water_elemental": {
            "name": "냉기 정령 군단",
            "desc": "냉기 정령 3마리 소환 (원딜, 슬로우 공격)"
          },
          "absolute_zero": {
            "name": "심연의 결빙",
            "desc": "전장의 모든 존재를 정지시키고 ATK×15 피해"
          }
        }
      },
      "ssr_death_knight": {
        "summons": {
          "abomination": {
            "name": "누더기골렘"
          },
          "undead": {
            "name": "망자"
          }
        },
        "name": "죽음의 기사",
        "lore": "버림받은 도시를 지키는 불멸의 기사. 죽음은 그에게 끝이 아닌 새로운 시작일 뿐이다.",
        "routes": {
          "death_knight_blood": {
            "name": "혈기",
            "variantName": "사후 경직",
            "variantDesc": "받는 피해의 {value}%를 HP 회복으로 전환합니다."
          },
          "death_knight_unholy": {
            "name": "부정",
            "variantName": "부패의 손길",
            "variantDesc": "공격 시 {value}% 확률로 적에게 영구적인 방어력 10% 감소 부여(최대 5중첩)."
          }
        },
        "skills": {
          "death_strike": {
            "name": "죽음의 일격",
            "desc": "단일 ATK×6 피해 및 입힌 피해 50% 회복"
          },
          "blood_boil": {
            "name": "피의 소용돌이",
            "desc": "주변 모든 적 ATK×4 피해 및 출혈 부여"
          },
          "vampiric_blood": {
            "name": "흡혈귀의 피",
            "desc": "10초간 최대 HP 50% 증가 및 치유량 2배"
          },
          "rune_weapon": {
            "name": "춤추는 룬 무기",
            "desc": "공격력을 보조하고 피해를 막아주는 룬 무기 소환"
          },
          "purgatory": {
            "name": "연옥",
            "desc": "사망 시 무적으로 부활하며 15초간 입힌 피해만큼 HP 회복"
          },
          "death_grip": {
            "name": "죽음의 손아귀",
            "desc": "가장 먼 적을 앞으로 당겨오고 3초 기절"
          },
          "anti_magic_shell": {
            "name": "대마법 보호막",
            "desc": "아군 전체 5초간 모든 마법 피해 무효화"
          },
          "outbreak": {
            "name": "돌발 열병",
            "desc": "모든 적에게 즉시 강력한 질병(DoT) 전파"
          },
          "summon_abom": {
            "name": "누더기골렘 소환",
            "desc": "거대한 누더기골렘 1명 소환 (상시 탱커)"
          },
          "army_of_dead": {
            "name": "사멸의 군단",
            "desc": "구울 15마리를 소환하여 전장 초토화"
          }
        }
      },
      "ssr_poison_mancer": {
        "summons": {
          "zombie": {
            "name": "좀비"
          }
        },
        "name": "맹독술사",
        "lore": "맹독의 늪지대에서 금지된 술법을 익힌 자. 그의 역병은 생명이 있는 모든 것을 썩게 만든다.",
        "routes": {
          "venomancer_plague": {
            "name": "역병",
            "variantName": "맹독 확산",
            "variantDesc": "독 피해 시 {value}% 확률로 대상에게 추가 맹독 폭발 발생."
          },
          "venomancer_voodoo": {
            "name": "부두",
            "variantName": "어둠의 저주",
            "variantDesc": "공격 시 {value}% 확률로 대상을 5초간 개구리로 변이시킵니다."
          }
        },
        "skills": {
          "plague_cloud": {
            "name": "역병 구름",
            "desc": "넓은 범위 지속 독 피해 및 방어력 30% 감소"
          },
          "venomous_gale": {
            "name": "독성 돌풍",
            "desc": "직선 적들에게 ATK×5 피해 및 3초 속박"
          },
          "contagion": {
            "name": "전염",
            "desc": "중독된 적이 죽으면 주변 적에게 강력한 독 전이"
          },
          "toxic_injection": {
            "name": "독극물 주입",
            "desc": "패시브: 자신의 모든 공격에 강력한 지속 독 피해 추가"
          },
          "epidemic": {
            "name": "대역병",
            "desc": "전장의 모든 적 즉시 중독 및 HP 50% 피해 (보스 ATK×15)"
          },
          "hex_totem": {
            "name": "주술 토템",
            "desc": "주변 적들을 주기적으로 변이시키는 토템 소환"
          },
          "voodoo_curse": {
            "name": "부두의 저주",
            "desc": "적 3명에게 받는 피해 50% 증가 디버프 부여"
          },
          "shadow_voodoo": {
            "name": "그림자 부두",
            "desc": "아군 전체에게 공격 시 20% 흡혈 효과 부여 10초"
          },
          "zombie_army": {
            "name": "좀비 군단",
            "desc": "느리지만 강력한 좀비 10마리 소환"
          },
          "death_ritual": {
            "name": "죽음의 의식",
            "desc": "가장 강력한 적 1명을 즉사시킴 (보스 최대HP 30% 피해)"
          }
        }
      },
      "ssr_merc_king": {
        "summons": {
          "elite_merc": {
            "name": "강화 용병"
          },
          "veteran_merc": {
            "name": "정예 용병"
          }
        },
        "name": "용병왕",
        "lore": "모든 용병들이 경외하는 전장의 지배자. 돈과 전략만 있다면 어떤 전쟁도 승리로 이끈다.",
        "routes": {
          "merc_king_tactics": {
            "name": "전술",
            "variantName": "전투 지휘",
            "variantDesc": "아군 전체 공격속도 {value}% 증가."
          },
          "merc_king_assassin": {
            "name": "암살",
            "variantName": "비정한 거래",
            "variantDesc": "공격 시 {value}% 확률로 대상의 방어력 50% 무시."
          }
        },
        "skills": {
          "war_cry": {
            "name": "승리의 함성",
            "desc": "10초간 아군 전체 공격력 30% 증가"
          },
          "bounty_hunt": {
            "name": "현상금 사냥",
            "desc": "적 처치 시 획득 골드 2배 증가 (영구)"
          },
          "tactical_strike": {
            "name": "전술적 일격",
            "desc": "강적 단일 ATK×10 물리 피해"
          },
          "recruit": {
            "name": "용병 고용",
            "desc": "강화 용병 2명 추가 소환 (상시 유지)"
          },
          "kings_army": {
            "name": "용병단 소환",
            "desc": "정예 용병 5명을 소환하여 20초간 함께 전투"
          },
          "poison_blade": {
            "name": "독 묻은 칼날",
            "desc": "단일 ATK×4 + 강력한 독 DoT"
          },
          "shadow_step": {
            "name": "그림자 추적",
            "desc": "대상 뒤로 이동 후 ATK×6 피해"
          },
          "blood_money": {
            "name": "피의 대가",
            "desc": "패시브: 공격 시 피해량의 20% 골드 획득"
          },
          "execution": {
            "name": "단두대",
            "desc": "HP 30% 이하 적 즉사 (보스 대량 피해)"
          },
          "contract_kill": {
            "name": "살인 계약",
            "desc": "모든 적에게 계약 표식: 10초 후 ATK×20 피해"
          }
        }
      },
      "ssr_ele_scholar": {
        "summons": {
          "mage_clone": {
            "name": "마법사 분신"
          }
        },
        "name": "정령학자",
        "lore": "모든 정령의 힘을 학술적으로 완성한 대마법사. 속성의 상성을 이용하여 전장을 지배한다.",
        "routes": {
          "ele_master_theory": {
            "name": "원소학",
            "variantName": "정령의 공명",
            "variantDesc": "모든 시너지 효과 {value}% 강화."
          },
          "ele_master_battle": {
            "name": "전투마법",
            "variantName": "마력 폭주",
            "variantDesc": "공격 시 {value}% 확률로 쿨타임 중인 스킬 하나 초기화."
          }
        },
        "skills": {
          "elemental_shift": {
            "name": "원소 치환",
            "desc": "자신의 공격 속성 무작위 변경 및 피해 20% 증가"
          },
          "prismatic_beam": {
            "name": "프리즘 빔",
            "desc": "적 3명에게 3가지 속성 피해 동시 적용 ATK×4"
          },
          "catalyst": {
            "name": "촉매 반응",
            "desc": "적의 해로운 효과 지속시간 2배 증가"
          },
          "arcane_intellect": {
            "name": "신비한 지능",
            "desc": "아군 전체 스킬 피해 30% 증가 [패시브]"
          },
          "elemental_overload": {
            "name": "원소 과부하",
            "desc": "화면 전체에 4대 원소 대폭발 발생 ATK×12"
          },
          "arcane_blast": {
            "name": "비전 작렬",
            "desc": "단일 ATK×6 피해 + 다음 작렬 강화"
          },
          "frost_fire_bolt": {
            "name": "냉기화염 화살",
            "desc": "냉기+화염 복합 피해 및 슬로우"
          },
          "mirror_image": {
            "name": "환영 분신",
            "desc": "자신과 동일한 공격력을 가진 분신 2개 소환"
          },
          "focus_magic": {
            "name": "마력 집중",
            "desc": "10초간 자신의 공격속도 100% 증가"
          },
          "greater_pyro": {
            "name": "대지옥불 작렬",
            "desc": "대상 적 전체 최대HP 35% 피해"
          }
        }
      },
      "ssr_sea_ruler": {
        "summons": {
          "tentacle": {
            "name": "심연의 촉수"
          }
        },
        "name": "심해의 지배자",
        "lore": "가라앉은 신전의 영원한 수호신. 바다의 생명력과 파괴적인 해일을 동시에 다스린다.",
        "routes": {
          "sea_ruler_tide": {
            "name": "해일",
            "variantName": "생명의 파도",
            "variantDesc": "힐 시 {value}% 확률로 아군 전체에게 추가 힐."
          },
          "sea_ruler_abyss": {
            "name": "심연",
            "variantName": "심연의 공포",
            "variantDesc": "공격 시 {value}% 확률로 대상을 3초간 공포(이동불가) 상태로 만듭니다."
          }
        },
        "skills": {
          "tsunami": {
            "name": "거대 해일",
            "desc": "적들을 멀리 밀쳐내고 ATK×5 물 피해"
          },
          "healing_tide": {
            "name": "치유의 조물",
            "desc": "15초간 아군 전체 매초 3% 회복 토템 소환"
          },
          "water_shield": {
            "name": "심해의 가호",
            "desc": "아군 전체 방어력 40% 증가 및 보호막 부여"
          },
          "cleanse": {
            "name": "정화의 물결",
            "desc": "아군 전체 디버프 제거 및 ATK×6 치유"
          },
          "blessing_of_abyss": {
            "name": "심해의 축복",
            "desc": "아군 전체 10초간 무적 및 완전 회복"
          },
          "abyss_bolt": {
            "name": "심연의 화살",
            "desc": "단일 ATK×7 암흑+물 복합 피해"
          },
          "crushing_depths": {
            "name": "압착",
            "desc": "대상의 이동속도를 90% 감소시키고 지속 피해"
          },
          "summon_kraken": {
            "name": "크라켄의 촉수",
            "desc": "심연의 촉수 3개를 소환하여 무작위 적 공격"
          },
          "maelstrom": {
            "name": "대소용돌이",
            "desc": "모든 적을 중앙으로 끌어당기며 ATK×5 피해"
          },
          "eye_of_storm": {
            "name": "심연의 눈",
            "desc": "심연의 눈 소환: 20초간 전장 전체 적 지속 피해 및 침묵"
          }
        }
      },
      "ssr_demon_lord": {
        "summons": {
          "infernal": {
            "name": "지옥불 정령"
          },
          "imp": {
            "name": "지옥 임프"
          },
          "guardian": {
            "name": "지옥수호병"
          },
          "elite_demon": {
            "name": "정예 악마병"
          }
        },
        "name": "파멸의 악마군주",
        "lore": "균열을 넘어온 지옥의 사령관. 불타는 군단을 지휘하며 적의 영혼을 파괴한다.",
        "routes": {
          "demon_lord_chaos": {
            "name": "파멸",
            "variantName": "혼돈의 일격",
            "variantDesc": "공격 시 {value}% 확률로 대상에게 3배 피해."
          },
          "demon_lord_summon": {
            "name": "군주",
            "variantName": "악마의 권능",
            "variantDesc": "소환수가 소환된 동안 자신의 공격속도 {value}% 증가."
          }
        },
        "skills": {
          "fel_strike": {
            "name": "지옥 베기",
            "desc": "전방 모든 적에게 ATK×5 화염 피해"
          },
          "summon_infernal": {
            "name": "지옥불 정령 소환",
            "desc": "지옥불 정령 소환 (25초, 탱커)"
          },
          "chaos_aura": {
            "name": "혼돈의 오라",
            "desc": "패시브: 주변 적 이동속도 30% 감소 및 지속 피해"
          },
          "soul_rend": {
            "name": "영혼 분쇄",
            "desc": "단일 대상 ATK×10 암흑 피해 + 5초간 받는 피해 증가"
          },
          "world_ender": {
            "name": "세계의 종말",
            "desc": "전장 전체 거대 폭발 ATK×15 피해"
          },
          "summon_imp": {
            "name": "임프 무리",
            "desc": "임프 5마리 즉시 소환 (원딜)"
          },
          "fel_guard": {
            "name": "지옥수호병",
            "desc": "강력한 지옥수호병 1명 소환 (상시)"
          },
          "demonic_empowerment": {
            "name": "악마 강화",
            "desc": "15초간 소환수들의 공격력 2배 증가"
          },
          "portal": {
            "name": "관문 개방",
            "desc": "무작위 악마들이 쏟아져 나오는 관문 소환"
          },
          "legion_commander": {
            "name": "군단의 지휘관",
            "desc": "10명의 정예 악마 병사 소환 및 전격 돌격"
          }
        }
      },
      "ssr_blade_lord": {
        "summons": {
          "blade_wraith": {
            "name": "칼날 망령"
          }
        },
        "name": "블레이드로드",
        "lore": "죽음에서 태어난 무한 칼날의 군주. 그의 검무가 시작되면 적의 숨소리조차 멈춘다.",
        "routes": {
          "blade_lord_annihilation": {
            "name": "절멸",
            "variantName": "암흑 연격",
            "variantDesc": "공격 시 {value}% 확률로 5연타 피해를 입힙니다."
          },
          "blade_lord_reaper": {
            "name": "사신",
            "variantName": "영혼 수확",
            "variantDesc": "적 처치 시 {value}% 확률로 공격력 영구 +1 (최대 200)."
          }
        },
        "skills": {
          "shadow_barrage": {
            "name": "그림자 연격",
            "desc": "적에게 ATK×2 피해 5회 연속 적용"
          },
          "execution_blade": {
            "name": "처형의 날",
            "desc": "HP 30% 이하 적 즉사, 보스는 ATK×10 피해"
          },
          "blood_aura": {
            "name": "혈오라",
            "desc": "패시브: 주변 모든 아군 피해의 20% 흡혈"
          },
          "blade_dance": {
            "name": "무한의 검무",
            "desc": "적 사이를 빠르게 이동하며 ATK×6 피해"
          },
          "endless_slash": {
            "name": "무한 베기",
            "desc": "10초간 공격 쿨다운 0, 모든 피해 2.5배"
          },
          "soul_reap": {
            "name": "영혼 수확",
            "desc": "단일 ATK×12 암흑 피해"
          },
          "death_grip": {
            "name": "죽음의 손길",
            "desc": "적 1명을 끌어당겨 3초간 속박"
          },
          "fear_shout": {
            "name": "공포의 포효",
            "desc": "주변 모든 적 4초간 공포 상태"
          },
          "summon_specter": {
            "name": "망령의 부름",
            "desc": "자신의 그림자를 망령으로 소환 (상시)"
          },
          "reapers_toll": {
            "name": "사신의 종소리",
            "desc": "전장 전체 적에게 ATK×20 암흑 피해"
          }
        }
      },
      "ssr_golden_archer": {
        "summons": {
          "griffin": {
            "name": "황금 그리핀"
          }
        },
        "name": "황금 사수",
        "lore": "빗나가지 않는 황금 화살의 전설적인 궁수. 그의 화살은 하늘조차 꿰뚫는다.",
        "routes": {
          "golden_archer_marksman": {
            "name": "황금사격",
            "variantName": "황금 화살",
            "variantDesc": "공격이 빗나가지 않으며 피해 {value}% 증가."
          },
          "golden_archer_beast": {
            "name": "야수",
            "variantName": "황금 유대",
            "variantDesc": "소환된 야수의 공격력이 자신의 공격력의 {value}% 만큼 증가."
          }
        },
        "skills": {
          "golden_arrow": {
            "name": "황금 화살",
            "desc": "단일 ATK×10 빛 피해 및 3초 기절"
          },
          "rapid_fire": {
            "name": "황금 연사",
            "desc": "10초간 공격속도 3배 증가"
          },
          "eagle_eye": {
            "name": "독수리의 눈",
            "desc": "패시브: 사거리 무한, 관통 투사체 3발 발사"
          },
          "star_shot": {
            "name": "별빛 사격",
            "desc": "타겟 주위 모든 적에게 ATK×6 폭발 피해"
          },
          "golden_shower": {
            "name": "황금 소나기",
            "desc": "전장 전체에 황금 화살 100발 난사 ATK×15"
          },
          "summon_griffin": {
            "name": "황금 그리핀",
            "desc": "그리핀 소환 (상시 원딜)"
          },
          "beast_wrath": {
            "name": "야수의 격노",
            "desc": "15초간 소환수 공격력 2배 및 공속 증가"
          },
          "serpent_sting": {
            "name": "황금 독사",
            "desc": "적 전체 중독 및 10초간 지속 피해"
          },
          "multi_shot": {
            "name": "멀티 샷",
            "desc": "한 번에 5발의 화살을 발사하여 무작위 적 공격"
          },
          "stampede": {
            "name": "야수 무리",
            "desc": "무수한 야수들이 전장을 휩쓸며 ATK×12 피해"
          }
        }
      },
      "ssr_shadow_lord": {
        "summons": {
          "shadow_image": {
            "name": "심연의 환영"
          }
        },
        "name": "어둠의 군주",
        "lore": "모든 그림자를 지배하는 어둠의 절대자. 그의 눈길이 머무는 곳엔 오직 공포와 파멸뿐이다.",
        "routes": {
          "shadow_lord_absolute": {
            "name": "절대 암흑",
            "variantName": "암흑의 지배",
            "variantDesc": "암흑 피해 {value}% 증가."
          },
          "shadow_lord_terror": {
            "name": "공포",
            "variantName": "공포의 지배",
            "variantDesc": "공격 시 {value}% 확률로 적을 2초간 공포 상태로 만듭니다."
          }
        },
        "skills": {
          "dark_spread": {
            "name": "어둠 확산",
            "desc": "모든 적에게 10초간 암흑 DoT 적용 (ATK 100%/초)"
          },
          "shadow_burst": {
            "name": "그림자 폭발",
            "desc": "타겟 주변 150px 모든 적 ATK×6 암흑 피해"
          },
          "soul_drain": {
            "name": "영혼 흡수",
            "desc": "패시브: 모든 피해의 30%를 자신에게 흡혈"
          },
          "curse_of_doom": {
            "name": "파멸의 저주",
            "desc": "적 1명에게 15초 후 ATK×30 피해"
          },
          "dark_dominion": {
            "name": "암흑의 지배",
            "desc": "전장 암흑화: 모든 적 DEF 0, ATK 0이 되어 10초간 일방적 학살"
          },
          "fear_wave": {
            "name": "공포의 파동",
            "desc": "전방 모든 적에게 공포 3초 + ATK×4 피해"
          },
          "nightmare": {
            "name": "악몽",
            "desc": "가장 강력한 적 1명을 8초간 수면 상태로 만듬"
          },
          "mind_shatter": {
            "name": "정신 붕괴",
            "desc": "대상 적 전체 ATK×8 피해 및 침묵 5초"
          },
          "summon_horror": {
            "name": "공포의 환영",
            "desc": "적의 공포를 실체화한 환영 소환 (CC)"
          },
          "world_of_fear": {
            "name": "공포의 세계",
            "desc": "전장 전체 적을 10초간 조종 불능 상태로 만듬"
          }
        }
      },
      "ssr_fire_seer": {
        "summons": {
          "fire_elemental": {
            "name": "불의 정령"
          }
        },
        "name": "화염의 선견자",
        "lore": "미래의 불꽃을 보는 화염 예언자. 전장의 모든 흐름을 화염의 예언으로 뒤바꾼다.",
        "routes": {
          "fire_seer_prophecy": {
            "name": "예언",
            "variantName": "화염 예언",
            "variantDesc": "스킬 피해 {value}% 증가."
          },
          "fire_seer_elemental": {
            "name": "정령",
            "variantName": "정령의 격노",
            "variantDesc": "공격 시 {value}% 확률로 타겟 주변에 화염 정령 폭발 발생."
          }
        },
        "skills": {
          "prophecy_flame": {
            "name": "불꽃 예언",
            "desc": "다음 10초간 적의 이동을 방해하는 불꽃 함정 설치"
          },
          "holy_flame": {
            "name": "화염 선포",
            "desc": "전체 적에게 화상 부여: 10초간 ATK 100%/초"
          },
          "purifying_fire": {
            "name": "정화의 불꽃",
            "desc": "가장 강력한 적 1명에게 ATK×15 정화 화염 피해"
          },
          "flame_vision": {
            "name": "불꽃의 통찰",
            "desc": "패시브: 아군 전체 치명타 확률 +20%"
          },
          "solar_burst": {
            "name": "태양 폭발",
            "desc": "태양 에너지 집중 폭발: 전장 전체 ATK×15 화염 피해"
          },
          "lava_burst": {
            "name": "용암 폭발",
            "desc": "단일 ATK×8 확정 치명타 피해"
          },
          "flame_shield": {
            "name": "불타는 갑옷",
            "desc": "아군 전체 방어력 +40 및 근접 공격 반사"
          },
          "summon_fire_ele": {
            "name": "불의 정령 소환",
            "desc": "강력한 불의 정령 2마리 소환 (상시)"
          },
          "fire_tempest": {
            "name": "화염의 태풍",
            "desc": "전장에 거대한 불의 회오리 소환: 적을 끌어당기고 불태움"
          },
          "cataclysm_seer": {
            "name": "대격변의 예언",
            "desc": "세상의 종말을 부르는 화염 폭격: 모든 적 소멸"
          }
        }
      },
      "ssr_forest_king": {
        "summons": {
          "ancient_spirit": {
            "name": "고대 정령"
          }
        },
        "name": "숲의 정령왕",
        "lore": "숲 전체를 몸으로 삼는 자연의 수호신. 그의 뿌리가 닿는 곳은 곧 그의 영토다.",
        "routes": {
          "forest_king_nature": {
            "name": "자연 수호",
            "variantName": "고대 수호",
            "variantDesc": "받는 피해 {value}% 감소 및 매초 HP 1% 회복."
          },
          "forest_king_wild": {
            "name": "야생",
            "variantName": "야생의 힘",
            "variantDesc": "공격 시 {value}% 확률로 2초간 공격속도가 200% 증가합니다."
          }
        },
        "skills": {
          "nature_barrier": {
            "name": "자연의 장벽",
            "desc": "15초간 모든 아군에게 HP 30% 보호막 + 속박 면역"
          },
          "vine_entangle": {
            "name": "덩굴 속박",
            "desc": "모든 적 10초 속박 + ATK×1/초 자연 피해"
          },
          "world_tree": {
            "name": "생명의 나무",
            "desc": "20초간 아군 전체 매초 HP 5% 회복 + DEF +50"
          },
          "ironbark": {
            "name": "무쇠껍질",
            "desc": "아군 전체 10초간 피해 50% 감소"
          },
          "forest_wrath": {
            "name": "숲의 분노",
            "desc": "전장 전체 나무 괴수 소환: ATK×10 광역 피해 + 5초 기절"
          },
          "feral_strike": {
            "name": "야생의 타격",
            "desc": "단일 ATK×12 물리 피해 + 출혈"
          },
          "roar_of_beast": {
            "name": "맹수의 포효",
            "desc": "아군 전체 공격력 +50% 및 이동속도 증가"
          },
          "summon_ancient": {
            "name": "고대 정령 소환",
            "desc": "강력한 고대 정령 1명 소환 (상시 탱커)"
          },
          "wild_growth_atk": {
            "name": "야생 성장(공격)",
            "desc": "패시브: 아군 공격 시 {value}% 확률로 추가 자연 피해"
          },
          "wrath_of_nature": {
            "name": "자연의 격노",
            "desc": "전장 전체 태풍 소환: 적들을 띄워 올리고 ATK×15 피해"
          }
        }
      },
      "ssr_dragon_tamer": {
        "summons": {
          "ancient_dragon": {
            "name": "고대 드래곤"
          },
          "whelp": {
            "name": "새끼 용"
          },
          "aspect": {
            "name": "용의 위상"
          }
        },
        "name": "드래곤 조련사",
        "lore": "용과 하나가 된 전설의 드래곤 기사. 그의 명령 한 번에 고대의 용들이 움직인다.",
        "routes": {
          "dragon_tamer_knight": {
            "name": "용기사",
            "variantName": "용의 힘",
            "variantDesc": "공격력 {value}% 증가 및 모든 공격에 화염 폭발 추가."
          },
          "dragon_tamer_tamer": {
            "name": "조련사",
            "variantName": "용의 결속",
            "variantDesc": "소환수가 입히는 피해의 {value}% 만큼 자신의 공격력이 영구 증가합니다 (최대 300%)."
          }
        },
        "skills": {
          "dragon_command": {
            "name": "용 명령",
            "desc": "동료 용에게 공격 명령: 화염 브레스 ATK×8 광역"
          },
          "fire_whip": {
            "name": "화염 채찍",
            "desc": "전방 직선 적 전체 ATK×6 화염 피해 + 화상"
          },
          "dragon_aura": {
            "name": "용의 오라",
            "desc": "패시브: 아군 전체 공격력 40% 증가, 피해 20% 감소"
          },
          "dragon_flight": {
            "name": "용의 비상",
            "desc": "10초간 무적 및 공격력 2배 증가"
          },
          "ancient_dragon_summon": {
            "name": "고대 용 소환",
            "desc": "고대 드래곤 소환 (상시 원딜, 강력한 브레스)"
          },
          "spawn_dragonling": {
            "name": "새끼 용 군단",
            "desc": "새끼 용 5마리 소환 (20초, 원딜)"
          },
          "taming_beast": {
            "name": "야수 길들이기",
            "desc": "적 1명을 길들여 15초간 아군으로 만듬"
          },
          "nature_blessing": {
            "name": "자연의 축복",
            "desc": "아군 소환수 전원 완전 회복 및 10초간 강화"
          },
          "dragon_nest": {
            "name": "용의 둥지",
            "desc": "전장에 둥지 소환: 매 3초마다 새끼 용 1마리 자동 생성"
          },
          "summon_dragon_aspect": {
            "name": "용의 군주 소환",
            "desc": "전설의 용의 위상 소환: 전장 전체 초토화"
          }
        }
      },
      "ssr_plague_lord": {
        "summons": {
          "elite_ghoul": {
            "name": "강화 구울"
          },
          "abomination": {
            "name": "누더기골렘"
          },
          "undead": {
            "name": "망자"
          }
        },
        "name": "역병의 지배자",
        "lore": "세상 모든 생명을 독으로 지배하는 역병의 군주. 그의 숨결 한 번에 제국이 무너졌다.",
        "routes": {
          "plague_lord_absolute": {
            "name": "역병 지배",
            "variantName": "역병 지배",
            "variantDesc": "독 피해 {value}% 증가 및 모든 공격에 치명적 역병 부여."
          },
          "plague_lord_undead": {
            "name": "강령",
            "variantName": "죽음의 군주",
            "variantDesc": "소환수가 입힌 피해의 {value}% 만큼 자신의 HP가 회복됩니다."
          }
        },
        "skills": {
          "plague_spread": {
            "name": "역병 전파",
            "desc": "모든 적에게 역병 부여: 15초간 ATK 120%/초 독 피해"
          },
          "toxic_cloud": {
            "name": "독기 구름",
            "desc": "전장 전체에 독기 구름: 20초간 적 HP 8%/초 감소"
          },
          "corpse_burst": {
            "name": "시체 폭발",
            "desc": "죽은 적 시체 폭발: 주변 ATK×6 + 독 전파"
          },
          "epidemic_passive": {
            "name": "대역병의 인도자",
            "desc": "패시브: 중독된 적이 죽을 때마다 아군 전체 5% 힐"
          },
          "plague_dominion": {
            "name": "역병의 지배자",
            "desc": "전장 역병화: 모든 적 즉시 HP 1로 감소 및 기절 10초"
          },
          "summon_ghoul": {
            "name": "구울 소환",
            "desc": "강화 구울 3마리 소환 (상시 근딜)"
          },
          "raise_abom": {
            "name": "누더기골렘 소환",
            "desc": "거대한 누더기골렘 소환 (25초, 탱커)"
          },
          "death_pact": {
            "name": "죽음의 서약",
            "desc": "소환수 하나를 희생하여 자신의 HP 완전 회복"
          },
          "unholy_frenzy": {
            "name": "부정의 광기",
            "desc": "15초간 소환수 및 자신의 공격속도 150% 증가"
          },
          "army_of_undead": {
            "name": "언데드 대군세",
            "desc": "전장에 무수한 망자 소환 (30마리) 및 총공격"
          }
        }
      },
      "ssr_lich_king": {
        "summons": {
          "elite_ghoul": {
            "name": "강화 구울"
          },
          "gargoyle": {
            "name": "가고일"
          },
          "army": {
            "name": "군단 망자"
          }
        },
        "name": "리치왕",
        "lore": "모든 언데드의 왕. 그가 지나간 곳엔 영원한 겨울이 남는다.",
        "routes": {
          "lich_king_frost": {
            "name": "냉기",
            "variantName": "리치왕의 의지",
            "variantDesc": "받는 피해 {value}% 반사 및 서리 피해 증가."
          },
          "lich_king_unholy": {
            "name": "부정",
            "variantName": "사멸의 인도자",
            "variantDesc": "소환수의 공격력 {value}% 증가."
          }
        },
        "skills": {
          "frost_aura": {
            "name": "빙결의 오라",
            "desc": "주변 200px 적 이동속도 70% 감소"
          },
          "death_touch": {
            "name": "죽음의 손길",
            "desc": "단일 ATK×8 피해, 5초 완전 기절"
          },
          "obliterate": {
            "name": "절멸",
            "desc": "방어 무시 강력한 2연타 ATK×6"
          },
          "remorseless_winter": {
            "name": "냉혈한의 겨울",
            "desc": "10초간 주변 적 지속 피해 및 빙결"
          },
          "lich_wrath": {
            "name": "리치왕의 진노",
            "desc": "전장 전체 ATK 1500% 서리 피해 + 영구 슬로우"
          },
          "agony": {
            "name": "고통의 저주",
            "desc": "점증하는 강력한 지속 암흑 피해"
          },
          "ghoul_army": {
            "name": "구울 소환",
            "desc": "강화 구울 4마리 즉시 소환"
          },
          "corpse_explosion": {
            "name": "시체 폭발",
            "desc": "죽은 적 시체 폭발 ATK×10 피해"
          },
          "gargoyle": {
            "name": "가고일 소환",
            "desc": "하늘에서 지원 사격하는 가고일 소환"
          },
          "army_of_dead": {
            "name": "사멸의 군단",
            "desc": "언데드 군단 20마리 소환 및 전장 초토화"
          }
        }
      },
      "ssr_goblin_emperor": {
        "summons": {
          "mech_soldier": {
            "name": "기계 병사"
          },
          "elite_merc": {
            "name": "정예 용병"
          }
        },
        "name": "고블린 황제",
        "lore": "무수한 기계와 골드를 거느린 고블린들의 황제. 그의 부귀영화는 곧 그의 무력이 된다.",
        "routes": {
          "goblin_emperor_dominion": {
            "name": "황제 지배",
            "variantName": "황제의 갑옷",
            "variantDesc": "받는 피해 {value}% 감소 및 피격 시 골드 획득."
          },
          "goblin_emperor_wealth": {
            "name": "부귀",
            "variantName": "황금의 힘",
            "variantDesc": "공격 시 {value}% 확률로 적을 황금 동상으로 만듭니다 (기절 3초)."
          }
        },
        "skills": {
          "golden_army": {
            "name": "황금 군단",
            "desc": "기계 병사 5명 소환 (상시 근딜)"
          },
          "rocket_armor": {
            "name": "로켓 갑옷",
            "desc": "10초간 자신 무적 및 피격 시 로켓 반격"
          },
          "goblin_empire": {
            "name": "고블린 제국",
            "desc": "전장 전체 기계 함정: 적 밟으면 ATK×8 폭발"
          },
          "repair_bots": {
            "name": "수리 로봇",
            "desc": "아군 전체의 소환수 및 벽을 즉시 50% 수리"
          },
          "emperor_decree": {
            "name": "황제의 칙령",
            "desc": "모든 적 강제 소환 후 ATK×15 전방위 폭격"
          },
          "gold_blast": {
            "name": "황금 폭발",
            "desc": "단일 ATK×8 신성 피해 + 골드 드랍"
          },
          "tax_collection": {
            "name": "세금 징수",
            "desc": "모든 적에게 피해를 입히고 총 피해량의 10% 골드 획득"
          },
          "mercenary_contract": {
            "name": "용병 계약",
            "desc": "강력한 정예 용병 2명 소환 (상시 원딜)"
          },
          "stock_market": {
            "name": "주식 폭등",
            "desc": "15초간 아군 전체 모든 능력치 50% 증가"
          },
          "golden_rain": {
            "name": "황금의 비",
            "desc": "하늘에서 거대 금괴 투하: 모든 적 즉사 확률"
          }
        }
      },
      "ssr_witch_king": {
        "summons": {
          "voodoo_spirit": {
            "name": "부두 정령"
          }
        },
        "name": "부두술왕",
        "lore": "수천 년 부두 의식의 결정체. 그의 저주는 죽음보다 깊은 고통을 선사한다.",
        "routes": {
          "witch_king_curse": {
            "name": "저주",
            "variantName": "대부두 저주",
            "variantDesc": "저주 지속시간 {value}% 증가 및 감염 효과."
          },
          "witch_king_shadow": {
            "name": "어둠",
            "variantName": "그림자 습격",
            "variantDesc": "공격 시 {value}% 확률로 대상에게 암흑 까마귀 떼를 보내 지속 피해를 입힙니다."
          }
        },
        "skills": {
          "voodoo_doll": {
            "name": "대부두 인형",
            "desc": "적 1명 받는 피해 3배 증가 15초"
          },
          "spirit_raise": {
            "name": "정령 강령",
            "desc": "죽은 적을 정령으로 소환 (상시 유지)"
          },
          "toxic_ritual": {
            "name": "독성 의식",
            "desc": "전체 적 중독 + 15초간 회복 불가"
          },
          "voodoo_hex": {
            "name": "광역 주술",
            "desc": "모든 적 8초간 개구리로 변이"
          },
          "death_dance": {
            "name": "죽음의 춤",
            "desc": "전장 전체 부두 의식: 모든 적 소멸 확률"
          },
          "shadow_bolt": {
            "name": "그림자 화살",
            "desc": "단일 ATK×8 암흑 피해"
          },
          "dark_totem": {
            "name": "어둠의 토템",
            "desc": "주변 적 공격력 50% 감소 토템 소환"
          },
          "soul_harvest": {
            "name": "영혼 수확",
            "desc": "적 처치 시마다 아군 전체 공격력 +5% 영구 (최대 50%)"
          },
          "night_fall": {
            "name": "황혼의 부름",
            "desc": "모든 적 실명 10초 및 지속 암흑 피해"
          },
          "abyss_ritual": {
            "name": "심연의 의식",
            "desc": "전장을 심연으로 뒤덮어 적들 즉사 및 아군 완전 회복"
          }
        }
      },
      "ssr_golden_panda": {
        "summons": {
          "golden_clone": {
            "name": "황금 분신"
          }
        },
        "name": "황금빛 판다",
        "lore": "황금 축복을 받은 전설의 판다. 싸울수록 강해지며 그 끝은 아무도 모른다.",
        "routes": {
          "golden_panda_brew": {
            "name": "황금 양조",
            "variantName": "황금 술법",
            "variantDesc": "피격 시 {value}% 확률로 피해 반사 및 자신 힐."
          },
          "golden_panda_zen": {
            "name": "명상",
            "variantName": "선(Zen)의 경지",
            "variantDesc": "모든 아군에게 해로운 효과 면역 및 방어력 {value} 증가."
          }
        },
        "skills": {
          "golden_brew": {
            "name": "황금 양조",
            "desc": "황금 술을 마셔 20초간 무적 및 HP 완전 회복"
          },
          "stagger_gold": {
            "name": "황금 시간차",
            "desc": "받는 피해 80%를 20초간 나누어 입음"
          },
          "storm_earth_fire": {
            "name": "폭풍 대지 불",
            "desc": "분신 3개 소환 (각 80% 스탯, 상시)"
          },
          "breath_of_fire_gold": {
            "name": "황금 불의 숨결",
            "desc": "전방 거대 화염 방사: 적 격파 및 지속 피해"
          },
          "golden_wave": {
            "name": "황금 판다의 파동",
            "desc": "황금 에너지 폭발: 모든 적 즉사 확률 및 아군 완전 부활"
          },
          "zen_meditation": {
            "name": "명상",
            "desc": "10초간 아군 전체 받는 피해 80% 감소"
          },
          "mist_barrier": {
            "name": "안개 장벽",
            "desc": "전장에 안개를 깔아 적 명중률 90% 감소 15초"
          },
          "chi_surge": {
            "name": "기 파동",
            "desc": "적들을 밀쳐내고 아군 전체 마나(스킬쿨) 회복"
          },
          "peace_ring": {
            "name": "평화의 고리",
            "desc": "적들을 고리 밖으로 쫓아내고 진입 불가 10초"
          },
          "transcendence": {
            "name": "해탈",
            "desc": "전장의 모든 적을 15초간 정지시키고 정화"
          }
        }
      },
      "ssr_primordial_dragon_heir": {
        "summons": {
          "primordial_dragon": {
            "name": "원시 드래곤"
          }
        },
        "name": "고룡의 후예",
        "lore": "태초의 드래곤 혈통이 깨어난 자. 그의 몸 안엔 다섯 위상의 힘이 소용돌이친다.",
        "routes": {
          "primordial_dragon_awakening": {
            "name": "고룡 각성",
            "variantName": "고룡의 피",
            "variantDesc": "스킬 피해 {value}% 증가 및 모든 원소 시너지 활성화."
          },
          "primordial_dragon_aspect": {
            "name": "위상",
            "variantName": "위상의 권능",
            "variantDesc": "공격 시 {value}% 확률로 대상에게 무작위 위상의 저주를 겁니다."
          }
        },
        "skills": {
          "ancient_breath": {
            "name": "원시 용의 숨결",
            "desc": "5속성 복합 브레스: 전방 모든 적 ATK×10 피해"
          },
          "ancient_summon": {
            "name": "고룡의 소환",
            "desc": "원시 드래곤 2마리 소환 (상시 원딜)"
          },
          "primordial_flame": {
            "name": "태고의 불꽃",
            "desc": "전장 전체 ATK×15 복합 속성 피해"
          },
          "dragon_form": {
            "name": "용 형상",
            "desc": "패시브: 자신의 모든 능력치 50% 영구 증가"
          },
          "great_awakening": {
            "name": "대각성",
            "desc": "30초간 모든 능력 5배 + 무적 + 전장 초토화"
          },
          "time_stop": {
            "name": "시간 정지",
            "desc": "모든 적 5초간 완전 정지"
          },
          "nature_binding": {
            "name": "자연의 결속",
            "desc": "적 전체 8초간 속박 및 독 피해"
          },
          "frost_prison": {
            "name": "서리 감옥",
            "desc": "가장 강한 적 3명을 10초간 빙결"
          },
          "arcane_surge": {
            "name": "비전 급류",
            "desc": "모든 적 침묵 8초 및 스킬 쿨타임 증가"
          },
          "aspect_union": {
            "name": "위상의 결집",
            "desc": "다섯 위상의 힘을 하나로: 전장 모든 적 즉사 확률 50%"
          }
        }
      },
      "ssr_eternal_elf_king": {
        "summons": {
          "night_warden": {
            "name": "밤의 파수꾼"
          }
        },
        "name": "영원의 엘프 왕",
        "lore": "모든 엘프 혈통을 초월한 영원한 왕. 비전의 정수 그 자체인 존재다.",
        "routes": {
          "eternal_elf_arcane": {
            "name": "영원의 비전",
            "variantName": "비전의 왕",
            "variantDesc": "비전 피해 {value}% 증가 및 모든 투사체 관통 부여."
          },
          "eternal_elf_night": {
            "name": "밤의 지배",
            "variantName": "달빛의 가호",
            "variantDesc": "아군 전체 초당 {value}% 회복 및 회피율 20% 증가."
          }
        },
        "skills": {
          "eternal_arrow": {
            "name": "영원의 화살",
            "desc": "전장 전체 관통하는 비전 화살 ATK×10"
          },
          "elf_essence": {
            "name": "엘프의 정수",
            "desc": "엘프 아군 전체 모든 능력 100% 증폭 20초"
          },
          "starfall_barrage": {
            "name": "별빛 소나기",
            "desc": "하늘에서 비전 별빛 50발 폭격 ATK×4"
          },
          "arcane_mastery": {
            "name": "비전의 통달",
            "desc": "패시브: 자신의 모든 스킬 쿨타임 50% 감소"
          },
          "eternal_verdict": {
            "name": "만년의 선고",
            "desc": "모든 적 즉시 HP 1로 감소 및 영구 슬로우 90%"
          },
          "moonlight": {
            "name": "달빛 섬광",
            "desc": "전장 전체 적 침묵 5초 및 지속 피해"
          },
          "night_embrace": {
            "name": "밤의 포옹",
            "desc": "아군 전체 10초간 무적 및 모든 디버프 면역"
          },
          "summon_sentinel": {
            "name": "밤의 파수꾼 소환",
            "desc": "파수꾼 3명 소환 (상시 원딜, 스턴 공격)"
          },
          "falling_star": {
            "name": "추락하는 별",
            "desc": "거대 운석 소환: 적 전체 10초 기절 및 ATK×12 피해"
          },
          "eternal_night": {
            "name": "영원한 밤",
            "desc": "전장을 암흑으로 뒤덮어 모든 적 소멸 및 아군 부활"
          }
        }
      },
      "scrapbom": {
        "name": "스크랩봄",
        "lore": "고철과 화약으로 빚은 화염 포탑을 벽 위에 고정하는 고블린 엔지니어. 포탑이 전선을 지키는 동안 자신은 포탑과 벽 수리에만 집중한다.",
        "routes": {
          "turret": {
            "name": "포탑강화",
            "variantName": "화염 포탑 마스터",
            "variantDesc": "포탑 공격력 성급당 {{value}}% 추가 증가."
          },
          "heal": {
            "name": "힐강화",
            "variantName": "긴급 수리 시스템",
            "variantDesc": "포탑/벽 수리량 성급당 {{value}}% 추가 증가."
          }
        },
        "skills": {
          "overcharge": {
            "name": "과부하 탄약",
            "desc": "포탑 공격력 +30%"
          },
          "turret_armor": {
            "name": "중장갑 코팅",
            "desc": "포탑 방어력 +40, HP +30%"
          },
          "splash": {
            "name": "폭발 확산탄",
            "desc": "포탑 공격이 반경 80px 광역 화염 피해 적용"
          },
          "multi_turret": {
            "name": "다중 포탑",
            "desc": "화염 포탑 1기 추가 소환 (총 2기 상시 유지)"
          },
          "fast_repair": {
            "name": "급속 수리",
            "desc": "수리 쿨다운 1초 단축 (3초→2초)"
          },
          "repair_amp": {
            "name": "수리 증폭",
            "desc": "포탑/벽 수리량 +40%"
          },
          "emergency_repair": {
            "name": "긴급 재건",
            "desc": "HP 30% 이하 포탑/벽 수리 시 2배 수리"
          },
          "fortress": {
            "name": "요새화",
            "desc": "수리 후 5초간 포탑·벽 방어력 +60"
          }
        }
      },
      "coilzak": {
        "name": "코일젝",
        "lore": "번개 코일을 달아 만든 전격 포탑을 벽에 고정하는 노움 발명가. 포탑이 전장을 지배하는 동안 자신은 포탑과 벽을 끊임없이 수리한다.",
        "routes": {
          "turret": {
            "name": "포탑강화",
            "variantName": "전격 포탑 마스터",
            "variantDesc": "포탑 공격력 성급당 {{value}}% 추가 증가."
          },
          "heal": {
            "name": "힐강화",
            "variantName": "엔지니어링 마스터리",
            "variantDesc": "포탑/벽 수리량 성급당 {{value}}% 추가 증가."
          }
        },
        "skills": {
          "overvolt": {
            "name": "과전압 코일",
            "desc": "포탑 공격력 +30%"
          },
          "range_amp": {
            "name": "사거리 확장",
            "desc": "포탑 사거리 +250px"
          },
          "chain_lightning": {
            "name": "연쇄 전격",
            "desc": "포탑 공격이 2명 추가 적에게 연쇄 피해"
          },
          "triple_turret": {
            "name": "다중 포탑 폭풍",
            "desc": "번개 포탑 2기 추가 소환 (총 3기 상시 유지)"
          },
          "drone": {
            "name": "수리 드론",
            "desc": "패시브: 4초마다 벽 자동 소량 수리"
          },
          "barrier_charge": {
            "name": "방어막 충전",
            "desc": "수리 시 포탑에 소형 보호막 부여"
          },
          "mastery": {
            "name": "엔지니어링 마스터리",
            "desc": "포탑/벽 수리량 +40%"
          },
          "auto_rebuild": {
            "name": "자동 재건 시스템",
            "desc": "포탑 파괴 즉시 재건, 수리 쿨타임 -2초"
          }
        }
      },
      "ssr_darkelf_lord": {
        "name": "그림자 군주",
        "lore": "그림자 숲의 절대 지배자. 빛조차 닿지 않는 어둠의 힘으로 적의 정신과 육체를 붕괴시킨다.",
        "routes": {
          "darkelf_lord_shadow": {
            "name": "그림자술",
            "variantName": "그림자 침식",
            "variantDesc": "공격 시 {value}% 확률로 적 방어력을 0으로 무시하고 피해를 입힙니다."
          },
          "darkelf_lord_void": {
            "name": "공허",
            "variantName": "공허의 갈망",
            "variantDesc": "공격 시 {value}% 확률로 대상의 공격력을 50% 흡수합니다."
          }
        },
        "skills": {
          "shadow_bolt": {
            "name": "그림자 화살",
            "desc": "단일 대상 ATK×6 어둠 피해"
          },
          "curse_of_agony": {
            "name": "고통의 저주",
            "desc": "15초간 적에게 매초 점증하는 암흑 지속 피해"
          },
          "nightfall": {
            "name": "밤의 도래",
            "desc": "전체 적 5초간 실명(명중률 -90%) 및 공포"
          },
          "shadow_form": {
            "name": "그림자 형상",
            "desc": "패시브: 자신의 모든 암흑 피해 50% 증가"
          },
          "doom": {
            "name": "파멸",
            "desc": "30초 후 적 즉사 (보스는 현재 체력의 50% 피해)"
          },
          "void_zone": {
            "name": "공허 지대",
            "desc": "반경 150px 적 지속 피해 및 침묵"
          },
          "mind_blast": {
            "name": "정신 폭발",
            "desc": "단일 ATK×10 암흑 피해 + 3초 기절"
          },
          "soul_leech": {
            "name": "영혼 흡수",
            "desc": "적 1명에게 ATK×8 피해 및 아군 전체 힐"
          },
          "void_singularity": {
            "name": "공허 특이점",
            "desc": "모든 적을 한 점으로 끌어당김"
          },
          "oblivion": {
            "name": "망각",
            "desc": "전장 전체를 공허로 뒤덮어 모든 적 무력화 10초"
          }
        }
      },
      "ssr_fire_ash": {
        "name": "불꽃의 잿더미",
        "lore": "화염의 땅에서 태어난 파괴의 화신. 그가 걷는 모든 땅은 잿더미로 변하며, 공기조차 불타오른다.",
        "routes": {
          "fire_ash_inferno": {
            "name": "지옥불",
            "variantName": "작열",
            "variantDesc": "모든 공격이 주변에 {value}% 피해를 전파하며 화상을 입힙니다."
          },
          "fire_ash_ember": {
            "name": "잔불",
            "variantName": "잿더미의 복수",
            "variantDesc": "피격 시 {value}% 확률로 공격자에게 강력한 화염 폭발 반격."
          }
        },
        "skills": {
          "immolation": {
            "name": "제물",
            "desc": "지속적인 화염 피해 및 받는 화염 피해 증가"
          },
          "meteor": {
            "name": "운석 낙하",
            "desc": "타겟 위치에 거대 메테오 투하 ATK×8 피해"
          },
          "conflagrate": {
            "name": "점화",
            "desc": "화상 입은 적을 즉시 폭발시켜 ATK×10 피해"
          },
          "living_bomb": {
            "name": "살아있는 폭탄",
            "desc": "적 1명을 폭탄으로 만듬: 5초 후 거대 폭발"
          },
          "supernova": {
            "name": "초신성",
            "desc": "자신을 중심으로 화면 전체 ATK×20 화염 피해"
          },
          "ember_strike": {
            "name": "잿더미 휘두르기",
            "desc": "주변 모든 적 ATK×5 화염 피해"
          },
          "lava_shield": {
            "name": "용암 보호막",
            "desc": "10초간 피해감소 30% 및 근접 적 화상"
          },
          "volcano": {
            "name": "발끝의 화산",
            "desc": "자신 위치에 화산 생성: 15초간 주변 지속 폭발"
          },
          "fire_dash": {
            "name": "화염 돌진",
            "desc": "경로의 모든 적을 불태우며 이동 ATK×6"
          },
          "avatar_of_ash": {
            "name": "잿더미의 화신",
            "desc": "20초간 무적 및 주변 모든 적 매초 ATK×3 피해"
          }
        }
      },
      "ssr_arch_angel": {
        "name": "대천사",
        "lore": "천공의 성채에서 내려온 신성한 존재.",
        "routes": {
          "arch_angel_holy": {
            "name": "신성",
            "variantName": "성스러운 가호",
            "variantDesc": "아군 사망 시 {value}% 확률로 즉시 부활 및 치유량 증가."
          },
          "arch_angel_judgement": {
            "name": "심판",
            "variantName": "빛의 심판",
            "variantDesc": "공격 시 {value}% 확률로 대상에게 신성 폭발 발생."
          }
        },
        "skills": {
          "holy_light": {
            "name": "천상의 빛",
            "desc": "가장 낮은 HP 아군 즉시 완전 회복"
          },
          "hymn": {
            "name": "신성한 찬가",
            "desc": "15초간 매초 아군 전체 HP 5% 회복"
          },
          "salvation": {
            "name": "구원",
            "desc": "사망 아군 전원 HP 100% 부활 (판당 1회)"
          },
          "shield": {
            "name": "신의 권능: 보호막",
            "desc": "아군 전체에게 거대 보호막 부여"
          },
          "absolute_salvation": {
            "name": "신성한 구원",
            "desc": "30초간 아군 전체 무적 + 완전 회복"
          },
          "arrow": {
            "name": "천상의 화살",
            "desc": "단일 대상 ATK×6 신성 피해"
          },
          "blade": {
            "name": "심판의 칼날",
            "desc": "적 3명에게 신성 칼날 투척 ATK×4"
          },
          "burst": {
            "name": "빛의 분출",
            "desc": "타겟 주위 광역 ATK×5 신성 피해"
          },
          "wings": {
            "name": "응징의 날개",
            "desc": "20초간 공격력 2배 및 모든 공격 광역화"
          },
          "judgement_day": {
            "name": "심판의 날",
            "desc": "모든 적에게 ATK 1500% 신성 피해 및 정화"
          }
        }
      },
      "ssr_dragon_aspect": {
        "name": "고대 드래곤 위상",
        "lore": "용의 탑 정점에 군림하는 태초의 용.",
        "routes": {
          "dragon_god_time": {
            "name": "시간",
            "variantName": "시간의 지배자",
            "variantDesc": "스킬 사용 시 {value}% 확률로 적들의 시간을 정지시킵니다."
          },
          "dragon_god_fire": {
            "name": "파괴",
            "variantName": "대격변",
            "variantDesc": "공격 시 {value}% 확률로 추가 화염 폭발 발생."
          }
        },
        "skills": {
          "breath_time": {
            "name": "오색 숨결",
            "desc": "5가지 속성의 복합 브레스 발사 (광역)"
          },
          "time_warp": {
            "name": "시간 왜곡",
            "desc": "전장의 적들을 10초간 80% 슬로우"
          },
          "sand_trap": {
            "name": "모래 늪",
            "desc": "지정 위치 적들을 끌어당기고 속박"
          },
          "rewind": {
            "name": "시간 역행",
            "desc": "아군 전체 스킬 쿨타임 50% 단축"
          },
          "time_stop": {
            "name": "시간 정지",
            "desc": "모든 적 8초간 완전 정지"
          },
          "fire_breath": {
            "name": "불타는 숨결",
            "desc": "전방 넓은 범위 ATK×10 화염 피해"
          },
          "magic_spark": {
            "name": "마력의 불꽃",
            "desc": "적 5명에게 전이되는 불꽃 탄환 발사"
          },
          "aspect_rage": {
            "name": "용의 분노",
            "desc": "15초간 자신의 공격력 2배 증가"
          },
          "upheaval": {
            "name": "지각 변동",
            "desc": "지면을 들어올려 전장 전체 ATK×8 피해+기절"
          },
          "cataclysm": {
            "name": "대격변",
            "desc": "전장을 완전히 불태워 모든 적 소멸 (보스 피해 2000%)"
          }
        }
      },
      "ssr_iron_guardian": {
        "name": "아이언가더",
        "lore": "전장에서 결코 쓰러지지 않는 불멸의 수호자. 그의 방패는 아군을 지키는 가장 견고한 성벽이다.",
        "routes": {
          "iron_guardian_bulwark": {
            "name": "철벽",
            "variantName": "불굴",
            "variantDesc": "받는 피해 {value}% 감소 및 방어력 증가."
          },
          "iron_guardian_justice": {
            "name": "응징",
            "variantName": "징벌의 방패",
            "variantDesc": "방어력의 {value}% 만큼 공격력이 추가로 증가합니다."
          }
        },
        "skills": {
          "shield_blast": {
            "name": "방패 폭발",
            "desc": "주변 120px 적 ATK×4 피해 및 2초 기절"
          },
          "iron_skin": {
            "name": "철벽 갑옷",
            "desc": "10초간 받는 피해 50% 감소 및 DEF +50"
          },
          "taunt_cry": {
            "name": "도전의 함성",
            "desc": "모든 적 어그로 집중 + 5초간 무적"
          },
          "guardian_aura": {
            "name": "수호의 오라",
            "desc": "패시브: 주변 아군 방어력 +30"
          },
          "indomitable": {
            "name": "불굴의 수호자",
            "desc": "HP 1 이하로 내려가지 않음 10초 + 전장 광역 격파"
          },
          "justice_strike": {
            "name": "정의의 일격",
            "desc": "단일 ATK×8 신성 피해"
          },
          "holy_shield_throw": {
            "name": "성스러운 방패",
            "desc": "적 3명에게 튕기는 방패 투척 ATK×5"
          },
          "retribution_aura": {
            "name": "응징의 오라",
            "desc": "아군 피격 시 공격자에게 ATK 50% 반격"
          },
          "consecration": {
            "name": "신성한 대지",
            "desc": "바닥에 신성한 지대를 깔아 지속 피해"
          },
          "avenging_wrath": {
            "name": "응징의 격노",
            "desc": "20초간 공격력 2배 및 모든 공격이 폭발"
          }
        }
      },
      "ssr_arch_priest": {
        "name": "빛의 대사제",
        "lore": "신의 목소리를 직접 전달하는 최고위 사제. 그의 축복 아래 죽음조차 힘을 잃는다.",
        "routes": {
          "arch_priest_holy": {
            "name": "신성",
            "variantName": "성스러운 기적",
            "variantDesc": "힐 시 {value}% 확률로 아군 전체에게 보호막 부여."
          },
          "arch_priest_shadow": {
            "name": "그림자",
            "variantName": "어둠의 권능",
            "variantDesc": "공격 시 입힌 피해의 {value}% 만큼 아군 전체를 치유합니다."
          }
        },
        "skills": {
          "miracle_heal": {
            "name": "기적의 치유",
            "desc": "모든 아군 즉시 HP 50% 회복"
          },
          "divine_hymn": {
            "name": "신성한 찬가",
            "desc": "20초간 매초 아군 전체 HP 5% 회복"
          },
          "resurrection_light": {
            "name": "부활의 빛",
            "desc": "사망 아군 전원 HP 100% 즉시 부활 (판당 1회)"
          },
          "guardian_spirit": {
            "name": "수호 영혼",
            "desc": "가장 낮은 HP 아군을 10초간 무적으로 만듬"
          },
          "salvation": {
            "name": "신성한 구원",
            "desc": "30초간 아군 전체 무적 + 모든 디버프 제거 + 완전 회복"
          },
          "shadow_word_pain": {
            "name": "고통",
            "desc": "강력한 암흑 DoT 및 5초간 받는 피해 30% 증가"
          },
          "mind_blast": {
            "name": "정신 폭발",
            "desc": "단일 ATK×10 암흑 피해 + 쿨타임 초기화 확률"
          },
          "vampiric_touch": {
            "name": "흡혈의 손길",
            "desc": "패시브: 자신의 모든 공격에 30% 흡혈 효과 추가"
          },
          "void_eruption": {
            "name": "공허 분출",
            "desc": "타겟 주변 광역 ATK×8 암흑 피해"
          },
          "dark_ascension": {
            "name": "공허 승천",
            "desc": "20초간 공격력 3배 및 모든 공격이 3개로 분산"
          }
        }
      },
      "ssr_seal_mage": {
        "name": "봉인의 술사",
        "lore": "고대 봉인술의 계승자. 그 앞에선 어떤 강력한 적이라도 한낱 허수아비일 뿐이다.",
        "routes": {
          "seal_mage_seal": {
            "name": "봉인",
            "variantName": "완전 봉인",
            "variantDesc": "기절 및 무력화 상태인 적에게 입히는 피해가 {value}% 증가합니다."
          },
          "seal_mage_arcane": {
            "name": "비전",
            "variantName": "비전 증폭",
            "variantDesc": "공격 시 {value}% 확률로 쿨타임이 50% 이상 감소합니다."
          }
        },
        "skills": {
          "void_seal": {
            "name": "공허 봉인",
            "desc": "전체 적 5초 완전 봉인(이동/공격 불가)"
          },
          "time_warp": {
            "name": "시간 왜곡",
            "desc": "적 이동속도/공격속도 90% 감소 10초"
          },
          "arcane_shackle": {
            "name": "비전 속박",
            "desc": "타겟 주변 200px 모든 적 8초 속박"
          },
          "mass_polymorph": {
            "name": "대규모 변이",
            "desc": "모든 적을 10초간 양으로 변이"
          },
          "absolute_seal": {
            "name": "무결의 봉인",
            "desc": "가장 강한 적 1명을 영구 봉인 (보스는 60초)"
          },
          "arcane_blast": {
            "name": "비전 작렬",
            "desc": "단일 ATK×8 비전 피해"
          },
          "arcane_missiles": {
            "name": "비전 화살",
            "desc": "적 1명에게 10연발 화살 발사 각 ATK×1.5"
          },
          "arcane_power": {
            "name": "신비의 마력",
            "desc": "15초간 자신의 스킬 피해 2배 증가"
          },
          "blink_strike": {
            "name": "점멸 타격",
            "desc": "순간이동하며 5명의 적에게 각각 ATK×6 피해"
          },
          "arcane_barrage": {
            "name": "비전의 홍수",
            "desc": "전장 전체 무수한 비전 화살 폭격 ATK×20"
          }
        }
      },
      "ssr_field_commander": {
        "name": "전장의 지휘관",
        "lore": "다섯 직종을 완벽히 이해하는 전설적인 지휘관. 그의 깃발 아래 아군은 무적의 군단이 된다.",
        "routes": {
          "field_commander_tactic": {
            "name": "지휘",
            "variantName": "완벽한 편성",
            "variantDesc": "아군 전체 모든 능력치 {value}% 증가."
          },
          "field_commander_bravery": {
            "name": "용맹",
            "variantName": "지휘관의 용기",
            "variantDesc": "자신의 공격력 {value}% 만큼 주변 아군의 공격력이 증가합니다."
          }
        },
        "skills": {
          "tactical_order": {
            "name": "전술 지시",
            "desc": "15초간 아군 전체 공격력/방어력 50% 증가"
          },
          "rally": {
            "name": "방어 집결",
            "desc": "아군 전체 즉시 HP 50% 회복 및 5초 무적"
          },
          "combined_assault": {
            "name": "연합 공격",
            "desc": "아군 전체 다음 3회 공격 ATK 5배 보장 치명타"
          },
          "banner_of_victory": {
            "name": "승리의 기치",
            "desc": "전장에 깃발 소환: 주변 아군 공속 100% 증가"
          },
          "heroic_charge": {
            "name": "영웅적 돌격",
            "desc": "전군 돌격: 모든 적 ATK×15 피해 및 20초간 아군 광분"
          },
          "brave_strike": {
            "name": "용맹한 일격",
            "desc": "단일 ATK×12 피해 및 3초 기절"
          },
          "battle_shout": {
            "name": "전투의 외침",
            "desc": "아군 전체 공격력 +100 영구 증가 (중첩 가능)"
          },
          "blade_of_honor": {
            "name": "명예의 검",
            "desc": "패시브: 자신의 모든 물리 피해 50% 증가"
          },
          "vanguard": {
            "name": "선봉장",
            "desc": "가장 앞에서 싸우며 10초간 받는 피해 80% 반사"
          },
          "war_lord_wrath": {
            "name": "지휘관의 진노",
            "desc": "전장 전체 적 ATK×25 피해 및 아군 전체 힐"
          }
        }
      },
      "ssr_light_pope": {
        "name": "빛의 교황",
        "lore": "빛의 교단 최고 수장. 그의 신성은 전장을 정화하고 아군을 무적의 군단으로 만든다.",
        "routes": {
          "light_pope_sanctity": {
            "name": "신성",
            "variantName": "교황의 강복",
            "variantDesc": "힐량 {value}% 증가 및 모든 힐 전파."
          },
          "light_pope_inquisition": {
            "name": "이단심문",
            "variantName": "이단의 불꽃",
            "variantDesc": "공격 시 {value}% 확률로 대상을 정화하여 ATK×5 추가 피해."
          }
        },
        "skills": {
          "holy_hope": {
            "name": "성스러운 희망",
            "desc": "모든 아군 HP 완전 회복 + 10초간 피해 30% 감소"
          },
          "celestial_hymn": {
            "name": "천상의 찬가",
            "desc": "20초간 매초 아군 전체 최대HP의 5% 회복"
          },
          "miracle": {
            "name": "기적",
            "desc": "사망 아군 전원 HP 100% 부활 + 5초 무적 (판당 1회)"
          },
          "divine_judgement": {
            "name": "신의 심판",
            "desc": "모든 적 기절 3초 + 전체 아군 치유"
          },
          "holy_avatar": {
            "name": "신성의 화신",
            "desc": "자신이 완전한 신성 화신 변신: 모든 능력 3배, 30초 지속"
          },
          "purge": {
            "name": "정화",
            "desc": "대상 적 모든 버프 해제 및 ATK×8 신성 피해"
          },
          "holy_fire": {
            "name": "신성한 불꽃",
            "desc": "지속적인 신성 피해 및 아군 힐"
          },
          "inquisition_seal": {
            "name": "심문의 인장",
            "desc": "대상에게 인장을 부여하여 받는 모든 피해 2배 증가"
          },
          "light_lance": {
            "name": "빛의 창",
            "desc": "관통하는 거대 빛의 창 투척 ATK×12"
          },
          "divine_wrath": {
            "name": "신의 진노",
            "desc": "전장 전체에 빛의 소나기 투하: 모든 적 50% 즉사"
          }
        }
      },
      "ssr_glacier_overlord": {
        "name": "빙하의 지배자",
        "lore": "세상을 얼려버릴 수 있는 빙하의 절대 지배자. 그의 숨결 아래 시간조차 얼어붙는다.",
        "routes": {
          "glacier_overlord_absolute": {
            "name": "절대 빙결",
            "variantName": "절대 영도",
            "variantDesc": "슬로우 효과 {value}% 강화 및 빙결 상태 적 추가 피해."
          },
          "glacier_overlord_shatter": {
            "name": "파쇄",
            "variantName": "빙결 파쇄",
            "variantDesc": "냉기 피해 시 {value}% 확률로 대상에게 최대 HP의 10% 추가 피해."
          }
        },
        "skills": {
          "absolute_freeze": {
            "name": "절대 빙결",
            "desc": "모든 적 10초 완전 동결 (완전 정지)"
          },
          "glacier_move": {
            "name": "빙하 이동",
            "desc": "빙하를 생성하며 이동, 경로의 모든 적 즉시 빙결"
          },
          "permafrost": {
            "name": "영구 결빙",
            "desc": "적들에게 영구 40% 슬로우 부여 (해제 불가)"
          },
          "frost_armor_aura": {
            "name": "한기 갑옷 오라",
            "desc": "패시브: 아군 전체 방어력 +50 및 피격 적 슬로우"
          },
          "ice_age": {
            "name": "빙하기",
            "desc": "전장 전체 빙하기 도래: 모든 적 즉사 (보스는 ATK×30 피해)"
          },
          "ice_spear": {
            "name": "얼음 창",
            "desc": "빙결된 적에게 3배의 피해를 입히는 창 투척"
          },
          "shatter_burst": {
            "name": "산산조각",
            "desc": "대상 적 전체 빙결 해제 및 폭발 피해 ATK×12"
          },
          "cold_heart": {
            "name": "냉정한 심장",
            "desc": "패시브: 자신의 모든 냉기 피해 60% 증가"
          },
          "hailstorm": {
            "name": "우박 폭풍",
            "desc": "전장에 거대 우박 투하: 적 기절 및 지속 피해"
          },
          "absolute_zero_burst": {
            "name": "절대영도 폭발",
            "desc": "전장 전체를 즉시 파쇄: 모든 적 ATK×25 피해"
          }
        }
      },
      "ssr_thunder_god": {
        "name": "천둥신",
        "lore": "하늘을 지배하는 폭풍의 신. 그의 번개는 적의 심장을 꿰뚫고 전장을 마비시킨다.",
        "routes": {
          "thunder_god_storm": {
            "name": "폭풍 지배",
            "variantName": "천둥의 지배",
            "variantDesc": "번개 피해 {value}% 증가 및 모든 공격에 감전 효과 추가."
          },
          "thunder_god_thunder": {
            "name": "뇌신",
            "variantName": "감전사",
            "variantDesc": "감전된 적이 공격할 때마다 {value}% 확률로 자신에게 ATK×3 피해를 입힙니다."
          }
        },
        "skills": {
          "divine_lightning": {
            "name": "신성한 번개",
            "desc": "적 1명에게 ATK×10 번개 피해 + 주변 5명 연쇄"
          },
          "thunder_storm": {
            "name": "번개 폭풍",
            "desc": "15초간 전장 전체에 무차별 낙뢰 (ATK 300%/초)"
          },
          "lightning_shield": {
            "name": "번개 보호막",
            "desc": "아군 전체 피격 시 적에게 ATK 100% 번개 반격"
          },
          "static_charge": {
            "name": "정전기 집중",
            "desc": "패시브: 자신의 모든 공격속도 50% 증가"
          },
          "world_thunder": {
            "name": "천지개벽",
            "desc": "하늘을 열어 전장 전체 번개 폭우: 모든 적 5초 기절 및 격파"
          },
          "thunder_clap": {
            "name": "천둥 벼락",
            "desc": "주변 모든 적 4초 기절 + ATK×6 피해"
          },
          "overload": {
            "name": "과부하",
            "desc": "적 3명을 연결하여 매초 기절 및 피해 중첩"
          },
          "storm_cloud": {
            "name": "폭풍 구름",
            "desc": "지정 위치 적들의 이동/공격속도 80% 감소"
          },
          "lightning_rod": {
            "name": "피뢰침",
            "desc": "가장 강한 적 1명에게 낙뢰 집중: 10초간 지속 기절"
          },
          "god_of_thunder": {
            "name": "뇌신의 강림",
            "desc": "자신이 번개 거인으로 변신: 20초간 주변 모든 적 자동 감전 소멸"
          }
        }
      },
      "ssr_storm_avatar": {
        "name": "폭풍의 화신",
        "lore": "폭풍 그 자체가 된 전사. 그의 검날은 바람보다 빠르고 태풍보다 강력하다.",
        "routes": {
          "storm_avatar_incarnate": {
            "name": "폭풍 화신",
            "variantName": "폭풍의 분노",
            "variantDesc": "이동속도 {value}% 및 공격력 동일 비율 증가."
          },
          "storm_avatar_cyclone": {
            "name": "싸이클론",
            "variantName": "바람의 장난",
            "variantDesc": "공격 시 {value}% 확률로 대상을 3초간 공중으로 띄워 올립니다."
          }
        },
        "skills": {
          "whirlwind_slash": {
            "name": "회오리 베기",
            "desc": "주변 전체 회전 공격 ATK×5 + 5초 슬로우"
          },
          "storm_strike": {
            "name": "폭풍 강타",
            "desc": "초고속 돌진 후 ATK×10 단일 공격"
          },
          "wind_blessing": {
            "name": "바람의 축복",
            "desc": "아군 전체 이속/공속 60% 증가 15초"
          },
          "eye_of_tempest": {
            "name": "태풍의 눈",
            "desc": "주변 모든 적을 자신에게 끌어당기며 ATK×8 피해"
          },
          "storm_incarnate": {
            "name": "진정한 폭풍 화신",
            "desc": "15초간 폭풍 변신: 무적 + 매 0.2초 주변 모든 적 격파"
          },
          "cyclone": {
            "name": "싸이클론",
            "desc": "적 3명을 6초간 공중으로 띄워 무력화"
          },
          "gust": {
            "name": "강풍",
            "desc": "전방의 모든 적을 화면 끝까지 밀쳐냄"
          },
          "wind_wall": {
            "name": "바람의 벽",
            "desc": "아군 앞에 바람 장벽 소환: 모든 투사체 무효화 10초"
          },
          "tornado": {
            "name": "거대 토네이도",
            "desc": "전장을 휩쓰는 토네이도 소환: 적들을 무작위 위치로 비산"
          },
          "hurricane": {
            "name": "절대 허리케인",
            "desc": "전장 전체를 초토화하는 허리케인: 모든 적 소멸"
          }
        }
      },
      "ssr_high_chieftain": {
        "name": "고위 족장",
        "lore": "모든 타우렌 부족을 통합한 최고위 족장. 그의 포효는 아군에게 용기를, 적에게는 공포를 선사한다.",
        "routes": {
          "high_chieftain_rally": {
            "name": "결집",
            "variantName": "대지의 군주",
            "variantDesc": "아군 전체 최대 HP {value}% 증가."
          },
          "high_chieftain_warrior": {
            "name": "투사",
            "variantName": "족장의 분노",
            "variantDesc": "공격 시 {value}% 확률로 대상에게 ATK×5 추가 물리 피해."
          }
        },
        "skills": {
          "earth_burst": {
            "name": "대지의 폭발",
            "desc": "주변 200px 적 ATK×5 피해 및 4초 기절"
          },
          "stomp": {
            "name": "발구르기 충격",
            "desc": "전장 전체 적 2초 기절 및 넉백"
          },
          "chieftain_will": {
            "name": "족장의 의지",
            "desc": "아군 전체 HP 50% 즉시 회복 및 20초간 DEF +60"
          },
          "ancestral_protection": {
            "name": "선조의 가호",
            "desc": "사망한 아군 1명을 HP 100%로 즉시 부활"
          },
          "tauren_rally": {
            "name": "타우렌 결집",
            "desc": "타우렌 계열 영웅 전원 15초간 무적 및 공격력 2배"
          },
          "brutal_strike": {
            "name": "무자비한 타격",
            "desc": "단일 ATK×10 피해 및 방어력 무시"
          },
          "war_cry": {
            "name": "전쟁의 외침",
            "desc": "15초간 아군 전체 공격력 50% 증가"
          },
          "blood_thirst": {
            "name": "피의 갈증",
            "desc": "패시브: 자신의 모든 공격에 20% 흡혈 부여"
          },
          "heroic_leap": {
            "name": "영웅의 도약",
            "desc": "타겟 위치로 도약하여 ATK×8 광역 피해 및 기절"
          },
          "avatar_of_war": {
            "name": "전쟁의 화신",
            "desc": "20초간 거대화: 공격력 3배, 모든 공격 광역화"
          }
        }
      },
      "ssr_blood_prince": {
        "name": "선혈의 왕자",
        "lore": "불타는 피의 힘을 완전히 해방한 선혈의 왕자. 그의 분노는 아군조차 두렵게 만든다.",
        "routes": {
          "blood_prince_liberation": {
            "name": "선혈 해방",
            "variantName": "선혈의 광기",
            "variantDesc": "잃은 체력 1%당 공격력 {value}% 증가."
          },
          "blood_prince_vampire": {
            "name": "흡혈",
            "variantName": "흡혈의 정수",
            "variantDesc": "공격 시 {value}% 확률로 대상의 최대 HP 5%를 흡수합니다."
          }
        },
        "skills": {
          "blood_slash": {
            "name": "혈화 베기",
            "desc": "자신 HP 10% 소모, ATK×10 혈화 피해"
          },
          "crimson_thirst": {
            "name": "선혈의 갈증",
            "desc": "15초간 모든 피해 100% 흡혈 + 공속 2배"
          },
          "flame_blade": {
            "name": "불꽃 피의 칼날",
            "desc": "전방 직선 모든 적 ATK×8 화염 피해"
          },
          "blood_boil": {
            "name": "피의 끓음",
            "desc": "모든 적에게 지속 출혈 피해 및 50% 슬로우"
          },
          "blood_lord": {
            "name": "피의 군주",
            "desc": "혈액 변신: 20초간 무적 + 흡혈 + 공격력 3배"
          },
          "vampiric_bite": {
            "name": "흡혈의 물어뜯기",
            "desc": "단일 ATK×12 피해 및 HP 30% 회복"
          },
          "swarming_bats": {
            "name": "박쥐 떼 소환",
            "desc": "박쥐 떼를 소환하여 전장 전체 적 지속 피해"
          },
          "essence_drain": {
            "name": "정수 흡수",
            "desc": "적 3명에게 빨대를 꽂아 HP를 지속적으로 갈취"
          },
          "mist_form": {
            "name": "안개 형상",
            "desc": "10초간 모든 공격 회피 및 주변 적 지속 피해"
          },
          "night_ritual": {
            "name": "한밤의 의식",
            "desc": "전장 전체 적 구속 및 ATK×20 암흑 피해"
          }
        }
      },
      "ssr_royal_captain": {
        "name": "왕실 기사단장",
        "lore": "왕국 최강의 기사. 기사단을 이끄는 신성한 수호자이며 충성심의 상징이다.",
        "routes": {
          "royal_captain_order": {
            "name": "기사단",
            "variantName": "기사단의 맹세",
            "variantDesc": "아군 전체 방어력 {value}% 증가."
          },
          "royal_captain_honor": {
            "name": "명예",
            "variantName": "명예의 결투",
            "variantDesc": "보스에게 입히는 피해 {value}% 증가."
          }
        },
        "skills": {
          "knights_oath": {
            "name": "기사단의 결속",
            "desc": "아군 전체 HP 30% 신성 보호막 부여 (15초)"
          },
          "royal_shield": {
            "name": "왕실의 방패",
            "desc": "20초간 아군 전체 받는 피해 50% 차단"
          },
          "rally_horn": {
            "name": "집결의 나팔",
            "desc": "아군 전체 부활 및 30초간 모든 능력치 강화"
          },
          "holy_charge": {
            "name": "신성한 돌격",
            "desc": "적진을 돌파하여 모든 적 3초 기절 + ATK×6 피해"
          },
          "paladin_fury": {
            "name": "성기사의 분노",
            "desc": "15초간 무적 + ATK 5배 + 모든 공격 광역화"
          },
          "duel_challenge": {
            "name": "결투 신청",
            "desc": "가장 강한 적 1명과 1:1 결투 (적 약화, 자신 강화)"
          },
          "sword_of_light": {
            "name": "빛의 검",
            "desc": "단일 ATK×12 신성 피해 + 5초간 침묵"
          },
          "victory_shout": {
            "name": "승리의 외침",
            "desc": "적 처치 시 아군 전체 공격력 +10% (무제한 중첩)"
          },
          "divine_storm": {
            "name": "신성한 폭풍",
            "desc": "주변 광역 ATK×8 피해 및 아군 힐"
          },
          "kings_justice": {
            "name": "국왕의 심판",
            "desc": "모든 적 즉시 HP 30% 감소 (보스 ATK×20)"
          }
        }
      },
      "ssr_orc_great_chief": {
        "name": "오크 대족장",
        "lore": "오크 전 부족을 통일한 전쟁의 화신. 그의 도끼가 닿는 곳엔 승리만이 남는다.",
        "routes": {
          "orc_great_chief_war": {
            "name": "전쟁의 신",
            "variantName": "대족장의 검",
            "variantDesc": "공격 시 {value}% 확률로 대상에게 4배 피해."
          },
          "orc_great_chief_honor": {
            "name": "명예",
            "variantName": "오크의 자부심",
            "variantDesc": "아군 전체 방어력 {value}% 증가 및 모든 디버프 면역."
          }
        },
        "skills": {
          "chief_blade": {
            "name": "대족장의 검",
            "desc": "전방 부채꼴 광역 ATK×8 화염 피해"
          },
          "war_charge": {
            "name": "살육의 돌격",
            "desc": "전방 직선 돌격: 충돌 적 ATK×10 + 3초 기절"
          },
          "chiefs_will": {
            "name": "족장의 의지",
            "desc": "20초간 공격력 2.5배 + 피해 면역 50%"
          },
          "executioner": {
            "name": "집행자",
            "desc": "패시브: HP 50% 이하 적에게 입히는 피해 2배"
          },
          "war_cry": {
            "name": "전쟁의 포효",
            "desc": "전장 전체 적 ATK×15 피해 + 아군 전체 공속 100%"
          },
          "iron_skin": {
            "name": "무쇠 피부",
            "desc": "패시브: 자신의 방어력 +100 증가"
          },
          "ancestral_shield": {
            "name": "선조의 방패",
            "desc": "아군 전체에게 거대 보호막 및 힐"
          },
          "taunt_master": {
            "name": "황야의 도발",
            "desc": "모든 적을 자신에게 집중 + 8초간 무적"
          },
          "earth_breaker": {
            "name": "대지 파괴",
            "desc": "전방 넓은 범위 기절 5초 + 넉백"
          },
          "horde_unity": {
            "name": "호드의 단결",
            "desc": "전체 아군 공격력/방어력 3배 증가 20초"
          }
        }
      },
      "protagonist_ai": {
        "name": "AI 용사",
        "lore": "AI 협동 무한 던전 1000층을 돌파한 전략 인공지능. 방대한 전투 데이터로 파티 전체의 효율을 극대화한다.",
        "routes": {
          "protagonist_ai_all": {
            "name": "올라운더",
            "variantName": "전술 지휘 오오라",
            "variantDesc": "파티 전체의 모든 능력치(공속/체력/공격력/방어력)를 {value}% 향상시킵니다."
          }
        }
      },
      "protagonist_offense": {
        "name": "어택 용사",
        "lore": "무한 던전 1000층 공략을 완수한 최강의 공격자. 그 누구도 막을 수 없는 파괴적인 공격력으로 적의 심장을 파고든다.",
        "routes": {
          "protagonist_offense_all": {
            "name": "올라운더",
            "variantName": "독단의 창",
            "variantDesc": "전투 중 아군이 쓰러질수록 공격력이 {value}% 증가합니다."
          }
        }
      },
      "protagonist_raid": {
        "name": "레이드 용사",
        "lore": "수없이 쏟아지는 레이드 보스들을 홀로 격파한 전설의 레이더. 보스를 사냥하기 위해 최적화된 몸과 마음을 지닌다.",
        "routes": {
          "protagonist_raid_all": {
            "name": "올라운더",
            "variantName": "보스 사냥꾼",
            "variantDesc": "보스/엘리트에게 가하는 피해가 {value}% 증가합니다."
          }
        }
      }
    },
    "skills": {
      "shared_bastion": {
        "description": "아군 전체의 방어력이 12 증가합니다.",
        "name": "보루의 기세"
      },
      "shared_berserk": {
        "description": "HP가 50% 이하로 떨어지면 공격속도 40% 증가, 받는 피해 10% 증가.",
        "name": "광폭화"
      },
      "shared_blizzard": {
        "description": "CC (슬로우/빙결) 지속시간이 50% 증가합니다.",
        "name": "눈보라"
      },
      "shared_cold_heart": {
        "description": "슬로우 상태의 적에게 입히는 모든 피해가 40% 증가합니다.",
        "name": "차가운 심장"
      },
      "shared_curse": {
        "description": "대상의 공격력을 10초간 25% 감소시킵니다.",
        "name": "저주"
      },
      "shared_frost_nova": {
        "description": "주변 반경 120px의 적에게 3초간 슬로우를 적용합니다.",
        "name": "프로스트 노바"
      },
      "shared_lifesteal": {
        "description": "공격 시 입힌 피해의 15%를 자신의 HP로 흡수합니다.",
        "name": "피의 갈증"
      },
      "shared_magic_amp": {
        "description": "공격력이 30% 증가합니다. 마법 공격의 크기도 커집니다.",
        "name": "마력 증폭"
      },
      "shared_multi_strike": {
        "description": "25% 확률로 같은 대상에게 2회 공격합니다.",
        "name": "연속 일격"
      },
      "shared_purify": {
        "description": "아군 1명의 디버프 1개를 즉시 제거합니다.",
        "name": "정화"
      },
      "shared_shield_wall": {
        "description": "받는 모든 피해가 20% 감소합니다.",
        "name": "방패 벽"
      }
    },
    "monsters": {
      "abomination": {
        "description": "수백 개의 시체 조각이 뒤엉킨 거대한 혐오 존재. HP 1500, 역병 냄새가 주변을 오염시킨다.",
        "displayName": "누더기 골렘",
        "tip": "체력 1500에 방어력 5. 강한 한 방 딜러와 힐러를 함께 운용해야 한다. 혼자 두면 타워까지 뚫는다."
      },
      "abyss_horror": {
        "description": "현실의 경계를 찢고 나온 공허의 현현. 체력 700에 무자비한 공격으로 방어선을 붕괴시킨다.",
        "displayName": "심연의 공포",
        "tip": "체력 700, 방어력 25의 최고급 근접 적. 탱커 2명 + 힐러 지원 없이는 무너진다. 보스 웨이브 전 만반의 준비를."
      },
      "bone_sniper": {
        "description": "저격을 특기로 하던 해골. 놀라운 사거리로 힐러와 원딜을 우선 노린다.",
        "displayName": "뼈 저격수",
        "tip": "사거리가 매우 길다. 힐러를 먼저 조준하니 방어선 뒤에 힐러를 숨기거나 빠르게 처치하라."
      },
      "cave_spider": {
        "description": "어두운 동굴에서 기어 나온 거대 거미. 속도 4.5로 방어선을 순식간에 뚫는다.",
        "displayName": "동굴 거미",
        "tip": "매우 빠른 이동 속도. CC 스킬로 발을 묶지 않으면 탱커를 뛰어넘어 타워로 돌진한다."
      },
      "crystal_golem": {
        "description": "순수한 마법 수정으로 형성된 골렘. 원거리에서 마력빔을 발사하고 방어력도 엄청나다.",
        "displayName": "수정 골렘",
        "tip": "방어력 120의 원거리 골렘. 소환수로 물량 어그로를 분산시키고 다단 히트 딜러로 집중 공략하라."
      },
      "dark_archer": {
        "description": "어둠의 기운을 화살에 담아 쏘는 언데드. 빠른 이동 속도로 기회를 노린다.",
        "displayName": "암흑 궁수",
        "tip": "빠른 원거리 적. 방어력이 낮아 처치는 쉽지만 원딜 영웅에 접근하기 전 CC로 막아야 한다."
      },
      "dark_mage": {
        "description": "어둠의 마력을 능숙하게 다루는 마법사. 저주와 어둠의 화염으로 아군 전체를 위협한다.",
        "displayName": "암흑 마법사",
        "tip": "원거리 마법 공격으로 방어력을 어느 정도 무시한다. 즉시 처치를 목표로 하라."
      },
      "death_knight": {
        "description": "어둠의 힘에 굴복한 성기사. 일격에 아군을 쓰러뜨릴 만큼 강하고, 죽음의 오라를 두르고 있다.",
        "displayName": "죽음의 기사",
        "tip": "강력한 공격과 높은 방어력. 소환 스킬이 있는 영웅이나 CC를 조합해 대응하라."
      },
      "deathly_marksman": {
        "description": "죽어서도 활시위를 당기는 정예 저격수. 살아있을 때보다 정확도가 더 높다고 한다.",
        "displayName": "죽음의 사수",
        "tip": "높은 공격력의 원거리 정예. 이동 속도가 느려 CC로 묶기 쉽다. 즉시 처치가 최선."
      },
      "diamond_golem": {
        "description": "완벽한 다이아몬드 격자 구조로 이루어진 골렘. 방어력 250으로 사실상 무적에 가깝다.",
        "displayName": "다이아 골렘",
        "tip": "방어력 250! 다단 히트 전문 영웅 없이는 처치 불가능에 가깝다. 다이아 골렘 전용 파티 구성을 고려하라."
      },
      "dire_wolf": {
        "description": "고대 마법에 의해 강화된 늑대. 속도 5.5로 전장에서 가장 빠른 지상 유닛 중 하나다.",
        "displayName": "다이어 울프",
        "tip": "전장에서 가장 빠른 적. CC 없이는 방어선이 무너진다. 빙결/기절 스킬이 필수다."
      },
      "fire_lord": {
        "description": "화염의 군주. 어픽스: AOE 강타 — 주기적으로 아군 전체에 폭발 피해를 가한다.",
        "displayName": "화염 군주",
        "tip": "Wave 15 보스. AOE 강타 판정이 매우 넓다. 힐러가 없으면 불가능에 가까운 전투. CC로 강타를 방해하라."
      },
      "fire_spirit": {
        "description": "불꽃에서 태어난 정령. 방어력이 없고 체력도 낮지만 빠른 속도와 화염 공격이 위협적이다.",
        "displayName": "화염 정령",
        "tip": "방어력 0이라 처치는 쉽지만 수가 많으면 타워를 빠르게 위협한다. 광역기로 쓸어내라."
      },
      "flesh_giant": {
        "description": "수천 개의 시체를 뭉쳐 만든 거대한 언데드. HP 15000의 역대 최고 체력. 분노 상태에선 멈출 수 없다.",
        "displayName": "거대 살덩이",
        "tip": "Wave 40 보스. 체력 15000!! 방어력은 낮지만 체력이 압도적. 힐러 + 처형 스킬이 필수. 지구전 준비를."
      },
      "flesh_hulk": {
        "description": "여러 시체를 꿰매어 만든 거대한 괴물. HP 800에 방어력은 없어 강한 한 방에 취약하다.",
        "displayName": "살덩이 헐크",
        "tip": "체력이 매우 높지만 방어력은 0. 단일 강타 딜러나 처형 스킬로 순식간에 쓰러뜨릴 수 있다."
      },
      "frost_elemental": {
        "description": "극한의 냉기를 품은 정령. 공격마다 광역 슬로우를 부여하며 방어도 철저하다.",
        "displayName": "서리 정령",
        "tip": "체력 450, 방어력 35의 고급 정령. 광역 슬로우로 아군 전체가 느려진다. CC 영웅으로 역슬로우하라."
      },
      "frost_king": {
        "description": "영원한 겨울을 지배하는 냉기의 왕. 어픽스: 분노 — 방어력 80으로 물리 공격을 거의 흡수한다.",
        "displayName": "냉기 왕",
        "tip": "Wave 20 보스. 방어력 80! 마법 딜러나 다단 히트 영웅이 없으면 처치 불가. 분노 전 집중 공략."
      },
      "giant_spider": {
        "description": "성인 남성보다 큰 독거미. 속도는 약간 느려졌지만 강인한 외골격이 피해를 줄여준다.",
        "displayName": "거대 거미",
        "tip": "동굴 거미의 강화형. 높은 체력에 빠른 속도가 위협적이다. CC 우선 후 집중 딜로 처리하라."
      },
      "goblin": {
        "description": "숲 속 쓰레기 더미에서 태어난 듯한 작은 야만족. 개별 위협은 낮지만 무리 지어 방어선을 흐트러뜨린다.",
        "displayName": "고블린",
        "tip": "초반에 등장하는 가장 기본적인 적. 근거리 영웅 1~2명만 있어도 무난히 처리된다. 물량으로 밀어붙이니 광역기를 아끼지 마라."
      },
      "goblin_crossbow": {
        "description": "장거리 석궁으로 치명적인 볼트를 날린다. 전선 후방에 위치해 아군 원딜을 괴롭힌다.",
        "displayName": "고블린 석궁병",
        "tip": "원거리 공격력이 상당히 높다. CC 스킬로 묶거나 빠른 원딜 영웅으로 우선 제거하라."
      },
      "goblin_mutant": {
        "description": "알 수 없는 약물로 인해 몸이 비정상적으로 커진 고블린. 빠르고 난폭하며 눈빛이 흐릿하다.",
        "displayName": "돌연변이 고블린",
        "tip": "빠른 이동 속도와 높은 체력이 특징. 방어선을 뚫기 전 CC로 발을 묶어야 한다."
      },
      "goblin_sapper": {
        "description": "폭발물을 가득 안고 미친 듯이 벽을 향해 돌진하는 자폭 특공대. 영웅은 안중에도 없다. 오직 벽이 목표.",
        "displayName": "고블린 자폭병",
        "tip": "절대 방치하면 안 된다. 벽에 닿는 순간 최대 체력의 50%를 날려버린다. CC 캐릭터가 최우선으로 스턴을 걸어야 한다."
      },
      "goblin_shaman": {
        "description": "원시적인 독 마법을 사용하는 부족 주술사. 독 안개를 뿜어 아군을 서서히 약화시킨다.",
        "displayName": "고블린 주술사",
        "tip": "원거리 주술 공격으로 힐러에게 부담을 준다. 아군 뒤에서 안전하게 딜하니 우선 처치 대상으로 지정하라."
      },
      "goblin_slinger": {
        "description": "돌을 던져 원거리 공격을 하는 고블린. 가냘프지만 집단으로 원딜 영웅을 노린다.",
        "displayName": "고블린 돌팔매병",
        "tip": "원거리 적. 탱커를 뛰어넘어 후방 영웅을 노리는 패턴에 주의. CC 영웅으로 이동을 막으면 효과적이다."
      },
      "gold_golem": {
        "description": "황금으로 빚어진 골렘. 방어력 150으로 전장에서 가장 단단한 존재 중 하나다.",
        "displayName": "금 골렘",
        "tip": "방어력 150! 집중 다단 히트와 방어 무시 시너지가 필수. 시간이 걸려도 꼭 처치하라."
      },
      "hobgoblin": {
        "description": "고블린보다 덩치가 크고 지능도 높다. 몽둥이 한 방에 웬만한 영웅이 비틀거린다.",
        "displayName": "홉고블린",
        "tip": "고블린의 강화형. 체력과 공격력이 올라갔다. 탱커를 전면에 배치해 어그로를 집중시켜라."
      },
      "ice_spirit": {
        "description": "얼음 결정으로 이루어진 정령. 공격마다 명중한 영웅의 이동 속도를 저하시킨다.",
        "displayName": "냉기 정령",
        "tip": "냉기 공격으로 아군 영웅을 슬로우시킨다. 힐러가 슬로우에 걸리면 치료가 늦어지니 주의."
      },
      "iron_golem": {
        "description": "용광로에서 직접 주조된 철제 골렘. 방어력 100으로 대부분의 물리 공격을 무효화한다.",
        "displayName": "철 골렘",
        "tip": "방어력 100. 일반 물리 딜은 거의 의미 없다. 마법 피해 스킬이나 다단 히트 전문 영웅이 필요하다."
      },
      "lava_elemental": {
        "description": "용암이 의지를 얻은 존재. 체력 500에 강력한 화염 타격을 날린다. 근처에만 있어도 뜨겁다.",
        "displayName": "용암 정령",
        "tip": "체력 500의 고급 정령. 강한 공격력으로 탱커도 빠르게 무너뜨린다. 힐 지원 필수."
      },
      "lich": {
        "description": "불사의 마법으로 스스로를 언데드로 만든 강대한 마법사. 강력한 주문으로 전장 전체를 위협한다.",
        "displayName": "리치",
        "tip": "매우 높은 체력과 방어력. CC로 이동을 막고 집중 딜로 빠르게 제거하라. 자칫 방치하면 파티가 무너진다."
      },
      "lich_king": {
        "description": "언데드의 왕. 어픽스: 소환 — 주기적으로 언데드 병사를 소환하고 아군 어그로를 빼앗는다.",
        "displayName": "리치 군주",
        "tip": "Wave 10 보스. 소환된 언데드가 탱커 어그로를 분산시킨다. 광역기로 소환수를 빠르게 제거하라."
      },
      "lightning_spirit": {
        "description": "전기 에너지가 응집된 정령. 빠른 속도로 접근해 번개로 공격하며 근처 아군에게도 감전 피해를 준다.",
        "displayName": "번개 정령",
        "tip": "원거리 번개 공격. 방어력 0으로 처치는 쉽다. 빠른 속도로 원딜 영웅을 노리는 패턴을 주의."
      },
      "magma_hurler": {
        "description": "내부에 용암이 흐르는 골렘. 던지는 용암 덩어리가 땅에 닿으면 화염 웅덩이를 만든다.",
        "displayName": "용암 투척 골렘",
        "tip": "방어력 80의 원거리 골렘. 용암 투척은 주변 영웅에게도 피해를 줄 수 있다. 다단 히트가 핵심."
      },
      "necromancer": {
        "description": "죽은 자를 소환하는 강력한 마법사. 배후에서 지원하며 언데드 군세를 불린다.",
        "displayName": "네크로맨서",
        "tip": "방치하면 주변에 언데드가 계속 소환된다. 원거리 딜러로 최우선 제거하라."
      },
      "orc_grunt": {
        "description": "전쟁에 길들여진 오크 보병. 체력과 방어력을 겸비한 균형 잡힌 강적.",
        "displayName": "오크 돌격병",
        "tip": "체력 400, 방어력 25의 균형형. 탱커 1명이 막기엔 벅차다. 소환수로 어그로를 분산하라."
      },
      "orc_shaman": {
        "description": "부족의 주술사. 번개 주문과 독 안개로 아군을 지원하며 원거리에서 안전하게 활동한다.",
        "displayName": "오크 주술사",
        "tip": "오크 돌격병 뒤에 숨어 안전하게 딜한다. 주술사부터 처치해야 아군 피해를 줄일 수 있다."
      },
      "orc_warrior": {
        "description": "수십 번의 전투에서 살아남은 오크 정예 전사. 체력 700에 강력한 일격은 탱커도 금방 쓰러뜨린다.",
        "displayName": "오크 전사",
        "tip": "체력 700, 방어력 40의 강력한 근접 적. 탱커 2명이 필요할 수 있다. 힐러 지원을 아끼지 마라."
      },
      "plague_beast": {
        "description": "역병으로 인해 변이된 거대 언데드. HP 2500, 접근 시 역병 구름으로 아군 HP를 갉아먹는다.",
        "displayName": "역병 괴수",
        "tip": "체력 2500! 아군 전체 화력을 집중하라. 힐러가 없으면 역병 피해로 파티 전체가 쓰러진다."
      },
      "plague_mage": {
        "description": "역병을 마법으로 조율하는 어둠의 마법사. 원거리에서 역병을 퍼뜨려 아군을 서서히 죽게 만든다.",
        "displayName": "역병 마법사",
        "tip": "역병 공격으로 지속 피해를 준다. 힐러 부담이 극도로 증가하니 다른 적보다 우선 처치하라."
      },
      "poison_spirit": {
        "description": "독기가 응집된 정령. 접촉만으로도 중독을 유발하며 천천히 모든 아군 영웅의 체력을 갉아먹는다.",
        "displayName": "독 정령",
        "tip": "독 오라로 근처 아군이 지속 피해를 받는다. 힐러의 부담이 급증하니 빠르게 처치하라."
      },
      "rock_hurler": {
        "description": "바위를 집어 던지는 골렘. 원거리에서 돌을 투척해 방어선 뒤쪽까지 피해를 준다.",
        "displayName": "바위 투척 골렘",
        "tip": "원거리 고방어 골렘. 다중 타격 스킬이 필수. 이동이 느려 방어선 형성에 여유가 있다."
      },
      "sapper_commander": {
        "description": "자폭 부대를 이끄는 광기 넘치는 지휘관. 자신도 폭탄을 짊어지고 돌진하며 부하들을 소환한다.",
        "displayName": "자폭 지휘관",
        "tip": "보스 자신도 자폭병이라 벽에 닿으면 대량의 피해를 준다. 광폭화 전에 CC를 집중시키고 빠르게 제거하라."
      },
      "shadow_stalker": {
        "description": "어둠 속에서 은신하다 기습하는 암살자. 속도 4.0으로 아군 뒤쪽 원딜·힐러를 노린다.",
        "displayName": "그림자 침략자",
        "tip": "빠른 속도로 취약한 영웅을 노린다. CC 영웅이 필수. 암살당하기 전에 먼저 눈으로 추적하라."
      },
      "skeleton": {
        "description": "마법으로 소환된 최하급 언데드. 뼈만 남은 몸이지만 검을 휘두르는 본능은 살아있다.",
        "displayName": "해골 병사",
        "tip": "고블린과 함께 초반에 등장하는 기본 근접 적. 어떤 영웅이든 무난히 처리 가능하다."
      },
      "skeleton_archer": {
        "description": "활 솜씨를 기억하는 해골 병사. 수풀 너머에서 날아오는 화살에 아군이 속수무책으로 쓰러진다.",
        "displayName": "해골 궁수",
        "tip": "원거리 초반 적. CC 또는 원딜 영웅으로 전열 영웅 뒤의 해골 궁수를 노려라."
      },
      "skull_knight": {
        "description": "기사의 기억과 투지를 간직한 고급 언데드. 중장 갑옷 파편 위로 이상한 기운이 맴돈다.",
        "displayName": "스컬 나이트",
        "tip": "방어력과 체력을 겸비한 중급 근접 적. 탱커로 어그로를 유지하면서 딜러로 꾸준히 공략하라."
      },
      "sniper": {
        "description": "사망의 세계에서 더욱 예리해진 저격의 달인. 단 한 발로 아군 핵심 영웅을 쓰러뜨린다.",
        "displayName": "정예 저격수",
        "tip": "빠른 속도와 높은 딜 조합이 위협적이다. 탱커로 어그로를 잡아 원딜·힐러를 보호하라."
      },
      "stone_golem": {
        "description": "산에서 깎아낸 거대한 돌로 만들어진 골렘. 일반 무기로는 거의 흠집도 내지 못한다.",
        "displayName": "돌 골렘",
        "tip": "방어력 60! 단순 공격은 최소 피해만 입힌다. 다단 히트 스킬 또는 방어 무시 시너지를 활용하라."
      },
      "storm_elemental": {
        "description": "폭풍과 번개를 지휘하는 정령. 원거리에서 연쇄 번개로 여러 아군에게 동시 피해를 준다.",
        "displayName": "폭풍 정령",
        "tip": "연쇄 번개로 여러 영웅에게 동시 피해. 파티 내 방어력 높은 영웅이 앞에 서야 피해를 분산할 수 있다."
      },
      "thunder_tyrant": {
        "description": "번개와 폭풍을 지배하는 압도적인 존재. 어픽스: AOE 강타 — 번개 폭풍을 일으켜 전장을 초토화.",
        "displayName": "폭풍 폭군",
        "tip": "Wave 35 보스. 빠른 속도와 원거리 공격 조합. AOE 강타의 범위가 매우 넓다. 힐러 2명 이상을 준비하라."
      },
      "titanium_golem": {
        "description": "전장 역사상 가장 단단한 존재. HP 1500에 방어력 400. 어픽스: AOE 강타로 지진을 일으킨다.",
        "displayName": "티타늄 골렘",
        "tip": "Wave 25 보스. 방어력 400!!! 다단 히트 전문 영웅 없이는 처치 불가. 파티 전체에 다단 히트 스킬이 필요하다."
      },
      "troll_shaman": {
        "description": "고대 주술로 아군 트롤을 치유하고 강화하는 주술사. 전장 후방에서 전투를 조율한다.",
        "displayName": "트롤 주술사",
        "tip": "원거리에서 아군 트롤을 힐하고 강화한다. 즉시 처치가 최선. CC로 묶고 집중 딜하라."
      },
      "troll_warlord": {
        "description": "트롤 부족의 최고 지도자. 어픽스: 분노 — HP가 30% 이하가 되면 공격력이 2배로 증가한다.",
        "displayName": "트롤 전쟁군주",
        "tip": "Wave 5 보스. 분노 전환 전에 빠르게 HP를 낮춰야 한다. 힐러와 CC가 없으면 분노 상태에서 탱커도 순식간에 쓰러진다."
      },
      "troll_warrior": {
        "description": "재생 능력을 가진 트롤 전사. 체력 900에 방어력 35, 죽이는 데 집중적인 화력이 필요하다.",
        "displayName": "트롤 전사",
        "tip": "체력 900! 재생력이 있어 딜이 끊기면 회복될 수 있다. 집중 화력으로 끊임없이 공격하라."
      },
      "venom_spider": {
        "description": "독낭이 부풀어 오른 거미. 원거리에서 독 실을 뱉어 아군을 독에 중독시킨다.",
        "displayName": "독 거미",
        "tip": "원거리 독 공격으로 힐러 부담을 증가시킨다. 야수 계열은 원딜보다 근딜로 처리가 빠르다."
      },
      "void_crawler": {
        "description": "공허 차원에서 기어 나온 거미 형태의 존재. 체력 400에 빠른 속도로 탱커를 뚫고 들어온다.",
        "displayName": "공허 추적자",
        "tip": "체력 400의 고속 근접 적. 탱커가 어그로를 유지하기 어렵다. CC와 소환수를 함께 활용하라."
      },
      "void_dragon": {
        "description": "공허에서 깨어난 드래곤. HP 10000에 방어력 80, 원거리 공허 브레스와 AOE 강타를 함께 사용한다.",
        "displayName": "공허 드래곤",
        "tip": "Wave 45+ 보스. 공허 드래곤은 모든 전략이 필요한 최종 보스. 탱커-힐러-딜러 완벽한 균형 파티만이 상대할 수 있다."
      },
      "void_spirit": {
        "description": "현실 너머 공허에서 온 존재. 원거리 공허 광선으로 방어력을 무시하는 순수 마법 피해를 준다.",
        "displayName": "공허 정령",
        "tip": "공허 공격은 방어력을 무시한다. 체력이 많은 탱커를 전면에 세우고 힐러를 항상 대기시켜라."
      },
      "void_walker": {
        "description": "공허 차원과 현실 세계를 넘나드는 존재. 어픽스: 분노 — HP 5000에 방어력 무시 공격.",
        "displayName": "공허의 보행자",
        "tip": "Wave 30 보스. 체력 5000! 분노 전환이 빠르다. 고딜 원거리 파티로 최단 시간 내 처치가 최선."
      },
      "war_skeleton": {
        "description": "전쟁터에서 쓰러진 병사의 혼이 갑옷 채 깨어났다. 실력은 살아있던 때와 다름없다.",
        "displayName": "전쟁 해골",
        "tip": "기본 해골보다 체력과 공격력이 높다. 일반 해골 물량 사이에 섞여 탱커를 지치게 하니 우선 제거하라."
      },
      "wind_spirit": {
        "description": "바람 자체가 의지를 가진 존재. 속도 6.0으로 전장에서 가장 빠른 적이다.",
        "displayName": "바람 정령",
        "tip": "속도 6.0! 탱커를 무시하고 타워로 직행할 수 있다. CC 필수. 빙결 스킬이 없으면 막기 어렵다."
      },
      "wolf": {
        "description": "무리 지어 달리는 야생 늑대. 속도 5.0의 맹수. 무리가 합쳐지면 어떤 방어선도 뚫는다.",
        "displayName": "늑대",
        "tip": "빠른 속도와 물량. CC + 광역기로 초반에 집단을 쓸어내라. 개별 처리는 느리다."
      },
      "wood_golem": {
        "description": "나무가 마법으로 깨어난 원시적인 골렘. 체력은 낮지만 단단한 외피가 일격의 피해를 막아낸다.",
        "displayName": "나무 골렘",
        "tip": "골렘 계열의 핵심: 체력은 낮고 방어력은 매우 높다. 다중 타격 스킬이나 방어 무시 스킬로 공략하라."
      }
    },
    "tutorial": {
      "sel": {
        "title": "훈련소",
        "subtitle": "전투의 기초와 각 직업의 핵심 메커니즘을 익히세요.",
        "basicTitle": "기본 튜토리얼",
        "basicDesc1": "게임의 기본적인 조작법과 흐름을 배웁니다.",
        "basicDesc2": "모든 스테이지를 완료하면",
        "basicDesc2Key": "전용 업적",
        "basicDesc2Suf": "을 획득합니다.",
        "stage1Done": "✅ Stage 1: 홀로 맞서다 (완료)",
        "stage1": "▶ Stage 1: 홀로 맞서다",
        "stage2Done": "✅ Stage 2: 악마와의 계약 (완료)",
        "stage2": "▶ Stage 2: 악마와의 계약",
        "classTitle": "직업 익히기",
        "classSub": "각 직업군만의 고유한 시스템을 심화 학습합니다.",
        "locked": "잠겨 있음",
        "lockedDesc": "기본 튜토리얼(Stage 2까지)을 모두 클리어 해야 입장할 수 있습니다.",
        "lockedHint": "기초를 먼저 익혀보세요!",
        "classHint": "실제 전투 상황과 유사한 환경에서 직업별 전용 시스템(예: 근딜의 전투의 리듬)을 연습하세요.",
        "roles": {
          "tank": {
            "name": "탱커",
            "desc": "어그로 관리와 생존"
          },
          "melee_dps": {
            "name": "근접 딜러",
            "desc": "강력한 근접 화력"
          },
          "ranged_dps": {
            "name": "원거리 딜러",
            "desc": "안전한 거리의 저격"
          },
          "healer": {
            "name": "힐러",
            "desc": "아군 치유와 보호"
          },
          "cc": {
            "name": "군중 제어",
            "desc": "적 무력화와 방해"
          },
          "mechanic": {
            "name": "메카닉",
            "desc": "벽 수리와 기계 지원"
          }
        }
      },
      "common": {
        "start": "▶  시작하기",
        "skip": "튜토리얼 건너뛰기",
        "next": "다음 [Space]",
        "fight": "맞서 싸우다",
        "backDash": "대시보드로 돌아가기",
        "toList": "훈련소 목록으로",
        "damage": "딜량",
        "healing": "힐량",
        "taken": "받은피해",
        "meterTitle": "데미지 미터",
        "shield": "방어막",
        "timerSuffix": "초",
        "wallHp": "방어벽 (HP)"
      },
      "s1": {
        "title": "홀로 맞서다",
        "label": "Tutorial · Stage 1",
        "intro": [
          "어둠이 세상을 뒤덮기 시작했다.",
          "",
          "평화로운 마을에 몬스터들이 몰려오고...",
          "당신은 홀로 마을을 지키기 위해 나섰다.",
          "",
          "아직 아무 스킬도, 동료도 없이.",
          "오직 타고난 체급과 의지만으로."
        ],
        "wave1": [
          "첫 번째 파도를 막아냈다."
        ],
        "wave2": [
          "아직 더 올 것 같다..."
        ],
        "wave3": [
          "상처를 입었지만, 물러설 수 없다."
        ],
        "wave4": [
          "...",
          "이상한 기운이 느껴진다.",
          "저 멀리에서 무언가가 다가오고 있다."
        ],
        "bossIntro": [
          "...",
          "땅이 울린다.",
          "어둠 속에서 거대한 형체가 나타났다.",
          "",
          "━━  암흑 기사단장  ━━",
          "",
          "이 자를... 혼자서 상대할 수 있을까?"
        ],
        "death": [
          "...",
          "이것이... 나의 한계인가.",
          "혼자서는... 당해낼 수 없었다.",
          "하지만...",
          "동료가 있다면..."
        ],
        "complete": "Stage 1 Complete",
        "defeatSub": "패배하였으나 멈추지 않는다",
        "defeatBy": "암흑 기사단장",
        "defeatText1": "에 의해 쓰러졌다.",
        "defeatText2": "스킬도, 동료도 없이 홀로 맞섰지만 역부족이었다.",
        "defeatText3a": "하지만 이제 알았다.",
        "defeatText3b": "함께라면",
        "defeatText3c": "다를 것이다.",
        "goldBonus": "몬스터 처치 골드 + 스테이지 완료 보너스(300G)",
        "nextHint": "다음 단계",
        "next1": "상점에서 영웅을 영입하자",
        "next2": "영웅 화면에서 스킬을 구매하고 파티를 구성하자",
        "next3": "강해져서 돌아오자",
        "btnNext": "▶  Stage 2 — 악마와의 계약"
      },
      "s2": {
        "title": "악마와의 계약",
        "label": "Tutorial · Stage 2",
        "intro": [
          "쓰러진 그대 앞에 누군가가 나타났다.",
          "",
          "\"...일어나. 아직 끝나지 않았어.\"",
          "",
          "암흑의 마력이 응축된 눈동자.",
          "어둠 속에서 악마들이 그 주위를 맴돈다.",
          "",
          "━━  펠다  ━━",
          "",
          "\"내가 함께라면 이야기가 달라지지.\""
        ],
        "wave1": [
          "워밍업이 끝났다.",
          "펠다의 마력이 짙어진다."
        ],
        "wave2": [
          "적들이 더 강해지고 있다.",
          "하지만 펠다는 여유롭다."
        ],
        "wave3": [
          "지옥수호병이 날뛴다."
        ],
        "wave4": [
          "...무언가 강한 것이 온다.",
          "땅이 흔들린다."
        ],
        "wave5": [
          "암흑 기사단장을 쓰러뜨렸다!",
          "Feldah: \"이 정도는 준비운동이지.\""
        ],
        "wave6": [
          "어둠의 군대가 집결하고 있다."
        ],
        "wave7": [
          "마법사들이 쏟아져 나온다.",
          "Feldah의 저주가 그들을 묶는다."
        ],
        "wave8": [
          "골렘의 껍데기도 고통은 막지 못한다."
        ],
        "wave9": [
          "최후의 보루가 무너지고 있다.",
          "...곧 그 자가 온다."
        ],
        "boss5Intro": [
          "...익숙한 기운이다.",
          "",
          "━━  암흑 기사단장  ━━",
          "",
          "\"다시 왔느냐. 이번엔 둘이 왔구나.\"",
          "",
          "Feldah: \"시끄럽게 구네. 지옥수호병아, 가!\""
        ],
        "boss10Intro": [
          "빛이 사라지고 냉기가 밀려든다.",
          "",
          "━━  리치 왕  ━━",
          "",
          "\"필멸자들이여... 어둠으로 돌아오라.\"",
          "",
          "Feldah: \"내가 더 오래 어둠 속에 있었어.\"",
          "\"함께라면 다르다.\""
        ],
        "victory": [
          "...끝났다.",
          "",
          "리치 왕이 쓰러졌다.",
          "",
          "Feldah: \"잘했어. 이게 바로 같이 싸우는 맛이지.\"",
          "",
          "혼자였다면 불가능했을 싸움.",
          "함께였기에 가능했다."
        ],
        "boss5Cleared": "암흑 기사단장 처치 ✓",
        "complete": "Stage 2 Complete",
        "winTitle": "승리!",
        "winTitle2": "악마와의 계약",
        "winSub": "함께라면 불가능은 없다",
        "winText1a": "리치 왕",
        "winText1b": "펠다",
        "winText1c": "와 함께 격파했다.",
        "winText2": "스킬과 동료의 힘이 얼마나 중요한지 배웠다.",
        "winText3a": "이제 진짜 전쟁이 시작된다.",
        "winText3b": "더 강해져라.",
        "partyTitle": "이번 전투 파티",
        "heroPrev": "탱커, 영혼석의 수호 (무적)",
        "feldahPrev": "혼돈의 화살(딜) · 생명석(힐) · 펠가드 소환",
        "felgardPrev": "악마 전사 소환수, 전선 수호",
        "felgardName": "펠가드",
        "feldahName": "펠다",
        "summoning": "소환 중",
        "goldBonus": "몬스터 처치 골드 + 승리 보너스(500G)",
        "btnPlay": "게임 시작하기 (영웅 모집 + 스킬 구매)"
      },
      "tank": {
        "pageTitle": "탱커: 전사의 길",
        "trainingLabel": "탱커 훈련소",
        "masterTitle": "탱커 마스터",
        "masterSub": "이제 당신은 전장의 가장 튼튼한 방패입니다.",
        "startBtn": "준비됐다! 시작하자!",
        "myName": "나 (제다)",
        "weakHealer": "연약한 힐러",
        "jedahName": "Jedah",
        "intro": [
          "여어! 거기 비실비실해 보이는 녀석, 내가 바로 언데드 전사 제다다!",
          "전투의 정석, 그중에서도 가장 뜨겁고 화끈한 \"탱커\"에 대해 가르쳐주지.",
          "전사는 단순한 고기 방패가 아냐. 불타는 투지와 가시 같은 복수심으로 싸우는 자들이지.",
          "잘 봐라. 저 뒤에 있는 녀석은 우리 힐러다. 체력이 1밖에 안 되는 아주 연약한 녀석이지.",
          "그리고 저 벽! 우리가 지켜야 할 최후의 보루다.",
          "네 임무는 간단해. 몬스터들이 힐러와 벽에 손도 못 대게 네가 다 쳐맞는 거다! 알겠나?!",
          "우리 탱커들은 단단한 \"높은 방어력\"으로 버티며 적들의 시선을 끄는 전장의 주인공이지!",
          "자, 몸풀기부터 시작하지. 도끼를 꽉 잡아라!"
        ],
        "wave1": [
          "나쁘지 않군! 하지만 이건 시작일 뿐이다.",
          "탱커의 기본 공격은 한 번에 여러 놈을 패버리는 \"광역기\"라는 걸 명심해!"
        ],
        "wave2": [
          "크하하! 속이 다 시원하군!",
          "내 기술 중에는 \"가시 반사\"라는 게 있지. 5성급 내 실력을 보여주마. 나를 때리는 놈들은 100% 피해를 되돌려 받을 거다!"
        ],
        "wave3": [
          "이제 슬슬 중요한 걸 가르쳐주지. \"도발의 일격\"이다!",
          "몬스터가 너 말고 다른 놈(벽이나 힐러)을 보고 있을 때 네가 공격하면, 공격력이 무려 5배로 뻥튀기된다!",
          "그 한 방으로 몬스터의 시선을 강제로 너에게 고정시키는 거다. 그게 탱커의 품격이지!"
        ],
        "wave4": [
          "좋아, 아주 잘 버텼다! 이제 마지막 시험이다.",
          "강력한 쌍둥이 보스 두 마리가 동시에 몰려올 거다. 정신 똑바로 차려라!",
          "두 놈 모두 네가 상대해야 한다. 힐러에게 털끝 하나 건드리지 못하게 막아내란 말이다!"
        ],
        "victory": [
          "완벽해! 이게 바로 진정한 탱커다!",
          "동료를 위해 모든 고통을 짊어지는 그 모습, 아주 불꽃 터지게 멋지구만!",
          "잊지 마라. 네가 무너지면 팀이 무너진다. 항상 가장 앞줄에서 당당하게 버텨라!"
        ],
        "mastery": [
          {
            "title": "도발의 일격",
            "desc": "타겟이 아닐 때 5배 피해 & 어그로 강탈"
          },
          {
            "title": "광역 기본 공격",
            "desc": "다수의 적을 동시에 타격"
          },
          {
            "title": "높은 방어력",
            "desc": "다른 직업보다 효율적인 피해 감소"
          }
        ]
      },
      "melee": {
        "pageTitle": "근접 딜러: 야성의 발톱",
        "trainingLabel": "근접 딜러 훈련소",
        "masterTitle": "근접 딜러 마스터",
        "masterSub": "당신의 발톱은 이제 적들의 공포입니다.",
        "startBtn": "사냥을 시작한다!",
        "cairneName": "Cairne",
        "jedahName": "Jedah",
        "myName": "나 (케른)",
        "jedahLabel": "제다 (탱커)",
        "intro": [
          "Cairne: \"안녕하신가, 친구! 대자연의 기운이 자네와 함께하기를.\"",
          "Jedah: \"이봐 케른! 인사나 할 때가 아냐. 저 앞에 단단해 보이는 놈들 안 보여?\"",
          "Cairne: \"허허, 제다. 성급하긴. 자네 방패는 든든하지만, 가끔은 날카로운 발톱이 필요한 법이라네.\"",
          "Cairne: \"이번엔 \\\"근접 딜러\\\"의 정수를 보여주지. 우리는 적의 빈틈을 파고들어 순식간에 분쇄하는 역할이라네.\"",
          "Cairne: \"가장 중요한 건 \\\"전투의 리듬\\\"이지. 1타, 2타(300% 피해!), 그리고 3타(광역 피해!)로 이어지는 순환을 느껴보게.\"",
          "Cairne: \"그리고 하나 더! 우리 근딜은 본능적으로 적의 \\\"등 뒤\\\"를 노린다네. 적이 제다처럼 다른 누군가를 바라보는 순간, 나는 그 틈에 뒤로 돌아서지. 배후에서 치는 한 방은 평소보다 50%나 강하다네!\"",
          "Jedah: \"뒤에서 쑤시는 건 좀 비겁하지 않나?\"",
          "Cairne: \"전장에서 비겁함이 어디 있겠나. 단, 적이 나를 노리고 있을 때는 배후를 잡을 수 없다네. 탱커의 진짜 가치가 바로 여기 있지 — 적의 시선을 끌어서 내가 뒤를 노릴 틈을 만들어 주는 거라네!\"",
          "Jedah: \"흥, 내 방패 뒤에서 춤이나 추지 말라고!\"",
          "Cairne: \"자, 부드럽게 시작해볼까?\""
        ],
        "wave1": [
          "Cairne: \"보게나! 제다가 어그로를 끄는 사이, 나는 자연스럽게 적의 등 뒤를 돌아 들어갔지. 배후 공격은 피해가 50% 더 강하다네!\"",
          "Jedah: \"칫... 내가 고생하는 사이에 뒤에서 쑤시는 건가.\""
        ],
        "wave2": [
          "Cairne: \"적들이 몰려올 땐 리듬의 3타를 이용하게나. 주변 모두에게 대자연의 매운맛을 보여줄 수 있지!\"",
          "Cairne: \"여럿이 몰릴수록 제다에게 어그로를 맡기고, 나는 뒤를 맡는다네. 탱커와 근딜이 맞물릴 때 진짜 위력이 나오지!\""
        ],
        "wave3": [
          "Cairne: \"멀리 있는 적들도 문제없네. 우리는 발이 아주 빠르거든. 보게나, 벌써 코앞이라네!\"",
          "Jedah: \"그 속도로 도망갈 때 쓰는 건 아니겠지?\""
        ],
        "wave4": [
          "Cairne: \"보스의 광역 공격이 무섭나? 걱정 말게. 우리 근접 딜러들은 본능적으로 그런 피해를 50%나 줄여서 받는다네.\"",
          "Jedah: \"맷집은 인정해주지. 하지만 내 방패보단 못하다고!\""
        ],
        "victory": [
          "Cairne: \"폭풍이 지나갔군. 친구, 자네의 발톱은 아주 날카로웠네.\"",
          "Jedah: \"뭐... 나쁘지 않았어. 아주 조금은 쓸만하군. 뒤를 잡아준 덕도 있고.\"",
          "Cairne: \"허허허, 제다. 자네도 참 솔직하지 못하군. 이제 진짜 전장으로 나갈 준비가 된 것 같네!\""
        ],
        "mastery": [
          {
            "title": "전투의 리듬",
            "desc": "1-2(3배)-3(광역)타의 강력한 연쇄 공격"
          },
          {
            "title": "광역 피해 감소",
            "desc": "보스의 광역 공격 피해 50% 상시 감소"
          },
          {
            "title": "우월한 기동성",
            "desc": "빠른 속도로 적을 추격하고 제거"
          },
          {
            "title": "배후 강타",
            "desc": "탱커가 어그로를 끄는 동안 적 뒤를 노려 50% 추가 피해"
          }
        ]
      },
      "ranged": {
        "pageTitle": "원거리 딜러: 마법의 우아함",
        "trainingLabel": "원거리 딜러 훈련소",
        "masterTitle": "원거리 딜러 마스터",
        "masterSub": "당신의 마법은 적들이 닿을 수 없는 곳에서 빛납니다.",
        "startBtn": "마법을 시작한다!",
        "iskierName": "Iskier",
        "myName": "나 (이스키)",
        "wallLabel": "방어벽 (철옹성)",
        "wave2Action": "Iskier: \"지금이에요! 얼어붙은 구슬, 폭발하세요!!\"",
        "intro": [
          "Iskier: \"어머, 반가워요. 우아한 마법의 세계에 오신 걸 환영해요.\"",
          "Iskier: \"저기 보이는 튼튼한 벽이 보이나요? 저게 바로 우리의 가장 친한 친구랍니다.\"",
          "Iskier: \"원거리 딜러는 저렇게 든든한 벽 뒤에서 적들을 일방적으로 요리하는 역할이죠.\"",
          "Iskier: \"우리에겐 긴 사거리와 강력한 광역 마법이 있거든요. 적들이 벽에 닿기도 전에 얼려버릴 거예요.\"",
          "Iskier: \"특히 제 \\\"얼어붙은 구슬\\\"은 몰려오는 적들을 한꺼번에 쓸어버리기에 아주 제격이랍니다.\"",
          "Iskier: \"자, 교양 있게 시작해볼까요? 지팡이를 가볍게 쥐어보세요.\""
        ],
        "wave1": [
          "Iskier: \"훗, 적들이 다가오지도 못했네요. 이게 바로 긴 사거리의 우아함이죠.\""
        ],
        "wave2": [
          "Iskier: \"보셨나요? 제 광역 마법 한 번에 적들이 사라지는 모습... 정말 아름답지 않나요?\""
        ],
        "wave3": [
          "Iskier: \"단단한 적이라도 상관없어요. 벽 뒤에서 안정적으로 마력을 쏟아부으면 결국 무너질 수밖에요.\""
        ],
        "wave4": [
          "Iskier: \"적들이 투사체를 던진다고 당황하지 마세요. 우리 벽은 아주 튼튼해서 다 막아줄 거니까요.\""
        ],
        "victory": [
          "Iskier: \"완벽해요. 당신의 마법 운용 능력, 꽤 소질이 있어 보이는데요?\"",
          "Iskier: \"항상 기억하세요. 거리를 유지하는 것, 그것이 원거리 딜러의 생명이자 예술이랍니다.\"",
          "Iskier: \"자, 이제 당신의 진정한 실력을 전장에서 보여주세요. 응원할게요?\""
        ],
        "mastery": [
          {
            "title": "사거리의 이점",
            "desc": "화면 끝까지 닿는 긴 사거리로 선제 타격"
          },
          {
            "title": "압도적 광역 화력",
            "desc": "다수의 적을 한 번에 제압하는 스킬 운용"
          },
          {
            "title": "안전한 포지셔닝",
            "desc": "방어벽 뒤에서 안정적으로 지속 딜링 수행"
          }
        ]
      },
      "healer": {
        "pageTitle": "힐러: 구원의 손길",
        "trainingLabel": "힐러 훈련소",
        "masterTitle": "힐러 마스터",
        "masterSub": "당신의 치유는 전장의 유일한 희망입니다.",
        "startBtn": "치유 시작",
        "dizName": "Dizgardo",
        "jedahName": "Jedah",
        "cairneName": "Cairne",
        "myName": "나 (디즈)",
        "jedahLabel": "제다 (탱)",
        "cairneLabel": "케른 (딜)",
        "intro": [
          "Dizgardo: \"왔나. 긴말은 않지. 뒤에서 생명줄만 잡아라.\"",
          "Jedah: \"이봐, 디즈가르도! 말투가 그게 뭐야? 나 제다가 앞에서 다 막아줄 테니 팍팍 밀어달라고!\"",
          "Cairne: \"허허, 제다. 친구가 좀 쑥스러움이 많은 것뿐이라네. 디즈, 오늘도 잘 부탁하네.\"",
          "Dizgardo: \"...시끄럽군. 힐러는 \\\"스마트 힐\\\"로 체력이 낮은 자부터 살린다. 내 \\\"보호막\\\"이 감기면 피해가 상쇄되지.\"",
          "Dizgardo: \"난 멍하니 서있지 않아. 틈틈이 적들을 공격해 팀의 화력을 보탤 거다. 약 30% 정도는 내 몫이지.\"",
          "Jedah: \"오오! 공격하는 사제라니, 역시 화끈하구만!\"",
          "Dizgardo: \"전투 시작한다. 죽지 마라.\""
        ],
        "wave1": [
          "Dizgardo: \"기초적인 치유다. 체력 바를 주시해.\""
        ],
        "wave2": [
          "Jedah: \"윽, 방금 놈들은 좀 아픈데? 디즈, 보호막 좀 팍팍 감아줘!\"",
          "Dizgardo: \"...이미 감았다. 엄살 부리지 마.\""
        ],
        "wave3": [
          "Cairne: \"도트 힐 덕분에 발톱이 가볍군. 고맙네, 친구.\"",
          "Dizgardo: \"별거 아냐. 할 일을 할 뿐.\""
        ],
        "wave4": [
          "Dizgardo: \"슬슬 아플 거다. 집중해. 놓치면 바로 끝이다.\"",
          "Jedah: \"걱정 마! 네 힐만 믿고 돌진한다!\""
        ],
        "victory": [
          "Dizgardo: \"...살아남았군. 소질은 있다.\"",
          "Cairne: \"역시 자네의 치유가 없었다면 불가능했을 싸움이었네.\"",
          "Jedah: \"크하하! 역시 우리 사제가 최고야! 이제 진짜 전쟁터로 가보자고!\"",
          "Dizgardo: \"가라. 뒤는 내가 책임지지.\""
        ],
        "mastery": [
          {
            "title": "스마트 힐 시스템",
            "desc": "체력이 가장 낮은 아군을 최우선으로 치유"
          },
          {
            "title": "선제 보호막",
            "desc": "피해가 들어오기 전 흡수막을 씌워 생존력 극대화"
          },
          {
            "title": "공격형 서포팅",
            "desc": "아군을 치유하며 적에게도 마법 피해를 입힘"
          }
        ]
      },
      "cc": {
        "pageTitle": "군중 제어: 구속의 미학",
        "trainingLabel": "CC 훈련소",
        "masterTitle": "CC 마스터",
        "masterSub": "적들을 멈추는 당신의 능력은 가장 강력한 무기입니다.",
        "startBtn": "발을 묶어버리자고요!",
        "helnName": "Heln",
        "iskierName": "Iskier",
        "myName": "나 (헬른)",
        "intro": [
          "Iskier: \"저기... 저 몬스터들, 뭔가 좀 이상하지 않나요? 눈에 살기가 가득해요.\"",
          "Iskier: \"꺄악! 저 고블린들, 몸에 폭탄을 두르고 벽으로 달려오고 있어요! 제 마법으론 역부족이에요!\"",
          "Heln: \"허허, 이스키 아가씨! 당황하지 마세요. 형님만큼은 아니지만 이 헬른님이 도와드리러 왔으니까요!\"",
          "Heln: \"군중 제어(CC)의 묘미를 보여주죠. 제 공격은 30% 확률로 적을 멈추거나, 얼리거나, 혹은 광역 슬로우를 건답니다.\"",
          "Heln: \"자폭병들은 벽에 닿기 전에 멈춰 세우는 게 핵심이에요. 제 \\\"뿌리 묶기\\\"와 \\\"기절\\\"이 아주 유용할 겁니다.\"",
          "Iskier: \"정말 믿음직스럽네요, 헬른! 그럼 제가 뒤에서 화력을 보탤게요!\"",
          "Heln: \"자, 다 같이 춤춰볼까요? 발을 묶어버리자고요!\""
        ],
        "wave1": [
          "Iskier: \"휴... 벽이 하마터면 무너질 뻔했어요. 헬른의 도움이 없었다면 정말 끔찍했을 거예요.\""
        ],
        "wave2": [
          "Heln: \"보셨나요? 자폭병이 멍하니 서 있을 때 마법을 꽂아넣으면 아주 쉽답니다!\""
        ],
        "wave3": [
          "Heln: \"빠른 녀석들은 광역 슬로우로 발을 묶으면 돼요. 대자연의 속박은 누구도 피할 수 없죠!\""
        ],
        "wave4": [
          "Iskier: \"저 거대한 폭탄 수레는 정말 무섭네요... 하지만 헬른이 계속 멈춰주니 안심이에요.\""
        ],
        "victory": [
          "Heln: \"허허허! 아주 완벽한 협동이었어요. 이스키 아가씨의 마법도 오늘따라 더 빛나는군요!\"",
          "Iskier: \"고마워요, 헬른. 적의 발을 묶는 게 얼마나 중요한지 오늘 확실히 배웠어요.\"",
          "Heln: \"자, 이제 진짜 전장에서 적들을 꼼짝 못 하게 만들어보자고요!\""
        ],
        "mastery": [
          {
            "title": "상시 무력화 확률",
            "desc": "공격 시 30% 확률로 스턴, 결빙, 광역 슬로우 발생"
          },
          {
            "title": "자폭병 저지",
            "desc": "위험한 자폭 유닛을 벽에 닿기 전에 멈춰 세움"
          },
          {
            "title": "전략적 시간 벌기",
            "desc": "강력한 적의 속도를 늦춰 딜러가 처리할 시간 확보"
          }
        ]
      },
      "mechanic": {
        "pageTitle": "메카닉: 기계의 지배자",
        "trainingLabel": "메카닉 훈련소",
        "masterTitle": "메카닉 마스터",
        "masterSub": "기계와 수리의 힘으로 전선을 지탱하는 진정한 엔지니어.",
        "startBtn": "포탑을 전개한다!",
        "coilzekName": "Coilzek",
        "iskierName": "Iskier",
        "myName": "나 (코일젝)",
        "intro": [
          "Iskier: \"코일젝, 저 많은 적들을 어떻게 막죠?! 제 마법만으론 한계가 있어요!\"",
          "Coilzek: \"이스키! 걱정 마세요. 저는 직접 싸우지 않아요. 대신 저 벽 위의 포탑이 싸워줍니다!\"",
          "Iskier: \"포탑이요? 그냥 멀리서 쏘는 기계인가요?\"",
          "Coilzek: \"그것만이 아니에요! 포탑은 원거리 공격도 하지만... 적이 벽에 붙으면 근접 광역 폭발도 터뜨려요!\"",
          "Coilzek: \"멀리서는 투사체로 저격하고, 벽에 붙은 적들은 폭발로 한꺼번에 날려버리는 거죠!\"",
          "Coilzek: \"제 역할은 포탑이 손상되면 수리하고, 벽이 부서지면 복구하는 거예요.\"",
          "Coilzek: \"궁극기를 쓰면 포탑 여러 기를 동시에 배치할 수도 있어요!\"",
          "Iskier: \"와, 원거리·근거리 모두 커버하는 포탑이라니! 믿음직스럽네요!\"",
          "Coilzek: \"자, 시작합시다! 포탑이 알아서 싸울 테니, 저는 수리에만 집중하면 돼요!\""
        ],
        "wave1": [
          "Coilzek: \"보셨나요? 포탑의 원거리 사격으로 깔끔하게 처리했어요!\""
        ],
        "wave2": [
          "Coilzek: \"벽에 붙자마자 포탑의 광역 폭발이 터졌죠? 그리고 벽도 바로 수리했고요!\""
        ],
        "wave3": [
          "Iskier: \"저 많은 적들을 포탑 하나가?! 원거리 사격 + 근접 폭발 조합이 정말 강하네요!\""
        ],
        "wave4": [
          "Coilzek: \"포탑 수리, 벽 수리... 저는 바빠도 좋아요! 포탑이 맹활약하니까요!\""
        ],
        "victory": [
          "Coilzek: \"해냈어요! 포탑의 원거리·근거리 이중 화력이 완벽하게 작동했습니다!\"",
          "Iskier: \"원거리 저격과 벽 근처 광역 폭발이 이렇게 잘 어울리다니... 정말 대단해요!\"",
          "Coilzek: \"메카닉의 진정한 힘은 포탑에 있어요. 언젠가 포탑 3기로 완벽한 방어진을 보여드릴게요!\""
        ],
        "mastery": [
          {
            "title": "자동 포탑 (벽 위 고정)",
            "desc": "메카닉은 직접 공격하지 않음. 포탑이 모든 딜 담당, 파괴 시 즉시 재소환"
          },
          {
            "title": "포탑 이중 공격",
            "desc": "원거리 투사체 사격 + 벽 100px 이내 적에게 2초마다 광역 근딜 폭발 (ATK×70%)"
          },
          {
            "title": "포탑/벽 수리",
            "desc": "포탑 HP 70% 미만 → 포탑 수리 우선, 벽 HP 80% 미만 → 벽 수리"
          }
        ]
      },
      "monsters": {
        "goblin": "고블린",
        "skeleton": "해골 병사",
        "wolf": "늑대",
        "orc_grunt": "오크 돌격병",
        "goblin_archer": "고블린 궁수",
        "dark_knight": "암흑 기사",
        "dark_sorcerer": "암흑 마법사",
        "orc_warchief": "오크 전쟁추장",
        "wild_beast": "들짐승",
        "skeleton_mage": "해골 마법사",
        "golem": "스톤 골렘",
        "dark_knight_commander": "암흑 기사단장",
        "lich_king": "리치 왕",
        "twin_boss_a": "쌍둥이 보스 A",
        "twin_boss_b": "쌍둥이 보스 B",
        "world_eater": "거대 공포괴물",
        "ancient_behemoth": "고대 베헤모스",
        "aoe_destroyer": "파괴의 심판자",
        "sapper_commander": "자폭 지휘관",
        "goblin_sapper_escort": "호위 자폭병",
        "iron_juggernaut": "철의 파괴자",
        "wall_basher_escort": "호위 파괴병",
        "target_dummy_weak": "훈련용 몹 (약함)",
        "target_dummy": "훈련용 몹",
        "target_dummy_fast": "날쌘 훈련용 몹",
        "tank_test_elite": "강인한 정예병",
        "high_hp_dummy": "단단한 훈련용 몹",
        "swarm_dummy": "훈련용 몹 무리",
        "ranged_dummy": "도망가는 궁수",
        "aoe_stomper": "발구르기 숙련자",
        "slow_dummy": "느릿한 골렘",
        "mass_dummy": "소환된 환영들",
        "tough_shield": "무거운 방패병",
        "ranged_enemy": "적군 마법사",
        "healer_test_1": "공격적인 훈련병",
        "healer_test_2": "강력한 타격병",
        "healer_test_3": "그림자 살수",
        "healer_test_elite": "학살자 정예병",
        "goblin_sapper": "고블린 자폭병",
        "elite_sapper": "정예 자폭병",
        "swift_sapper": "쾌속 자폭병",
        "bomb_cart": "폭탄 수레",
        "mech_infantry": "기갑 보병",
        "wall_basher": "벽 파괴병",
        "goblin_squad": "고블린 돌격대",
        "turret_hunter": "포탑 사냥꾼"
      }
    },
    "status": {
      "title": "서버 상태",
      "subtitle": "자동 갱신: 30초마다",
      "overallStatus": "전체 상태",
      "lastChecked": "마지막 확인:",
      "checking": "확인 중...",
      "apiServer": "API 서버",
      "database": "데이터베이스",
      "backup": "자동 백업",
      "apiDesc": "NestJS REST API",
      "dbDesc": "PostgreSQL (Prisma ORM)",
      "backupDesc": "일일 pg_dump · 7일 보존",
      "backupDetails": "백업 상세",
      "lastBackup": "마지막 백업",
      "backupCount": "저장된 백업",
      "backupSchedule": "스케줄",
      "backupRetention": "보존 기간",
      "serverTime": "서버 응답 시각:",
      "refresh": "새로 고침"
    },
    "notification": {
      "title": "알림 — 최근 업적",
      "empty": "알림이 없습니다."
    },
    "browser": {
      "warning": "{{browser}} 브라우저는 지원되지 않습니다. Chrome, Firefox, Safari, Edge(최신)를 사용하세요."
    }
  },
  "en": {
    "shop": {
      "subtitle": "Recruit heroes, strengthen defenses, and purchase crystal items.",
      "tab": {
        "gold": "Recruit Heroes (Gold)",
        "wall": "Wall Upgrade (Talents)",
        "crystal": "Crystal Shop (Crystal)",
        "manghongu": "🔮 Soul Orb (亡魂球)"
      },
      "searchPlaceholder": "Search name, race(orc), element(fire)...",
      "filter": {
        "allRoles": "All Roles",
        "allGrades": "All Grades"
      },
      "currency": {
        "owned": "Owned Currency"
      },
      "summon": {
        "title": "⚡ Summon Hero",
        "desc": "Obtain a random hero. Refunded in gold if already owned.",
        "r": "Summon R Grade Hero",
        "sr": "Summon SR Grade Hero",
        "ssr": "Summon SSR Grade Hero",
        "rDesc": "Summons 1 random Normal grade hero.",
        "srDesc": "Summons 1 random Rare grade hero.",
        "ssrDesc": "Summons 1 random Legendary grade hero.",
        "action": "Summon"
      },
      "exchange": {
        "title": "💰 Exchange Gold",
        "desc": "Exchange crystals for gold. Bulk purchases grant more bonuses.",
        "s": "Small Gold Pouch",
        "m": "Medium Gold Pouch",
        "l": "Large Gold Pouch",
        "xl": "Extra Large Gold Pouch",
        "xxl": "Giant Gold Pouch",
        "bestValue": "Best Value"
      },
      "charge": {
        "title": "💳 Charge Crystals",
        "testNotice": "(Test feature. No actual payment.)",
        "amount": "{{count}} Crystals",
        "buy": "Purchase"
      },
      "title": "Hero Shop",
      "gold": "Gold:",
      "all": "All",
      "buy": "Buy",
      "owned": "Owned",
      "buying": "Buying...",
      "notEnoughGold": "Not enough gold!",
      "notEnoughCrystals": "Not enough crystals!",
      "purchaseFailed": "Purchase failed",
      "chargeSuccess": "💎 {{count}} crystals charged!",
      "goldBuySuccess": "💰 {{gold}}G purchased!",
      "summonSuccess": "✨ [{{grade}}] {{name}} summoned!",
      "summonDuplicate": "[Duplicate] {{name}} (Soul) → 💰 {{gold}}G refunded",
      "recruitSuccess": "{{name}} recruited!",
      "buyFailed": "Purchase failed.",
      "noHeroesFilter": "No heroes found for this filter",
      "expandSkills": "View Skills ▼",
      "collapseSkills": "Hide Skills ▲"
    },
    "wall": {
      "tab1": "The 1st Wall",
      "tab2Locked": "🔒 The 2nd Wall",
      "tab2Unlocked": "The 2nd Wall (Sanctuary)",
      "tab3Locked": "🔒 The 3rd Wall",
      "tab3Unlocked": "The 3rd Wall (Abyss)",
      "bulkAll": "⚡ Upgrade All",
      "notUpgraded": "Not upgraded yet.",
      "notUpgradedHint": "Use the button below to begin the first upgrade.",
      "currentEffect": "Current Effect",
      "currentEffectRange": "(Rank 1 ~ {{rank}} total)",
      "nextEffect": "Next Tier Effect",
      "nextEffectLabel": "(Rank {{rank}})",
      "upgradeBtn": "Rank {{rank}} Upgrade",
      "maxRank": "✓ Max Rank Achieved",
      "bulkUpgrade": "⚡ Bulk Upgrade ({{count}} tiers · 💰 {{cost}}G)",
      "bulkUpgradeLow": "⚡ Bulk Upgrade (Insufficient Gold)",
      "goldLabel": "Gold:",
      "seriesLabel": "{{cat}} Series",
      "upgradeDefault": "{{cat}} Upgrade",
      "toastGoldShort": "Insufficient gold.",
      "toastError": "An error occurred during purchase.",
      "toastRankAchieved": "{{cat}} Rank {{rank}} achieved!",
      "toastBulkAchieved": "Bulk upgrade: {{cat}} Rank {{rank}} achieved! ({{count}} tiers · {{cost}}G spent)",
      "toastBulkAll": "All bulk: {{count}} tiers upgraded! ({{cost}}G spent)",
      "toastLockWall2": "Master all traits of the 1st Wall to unlock.",
      "toastLockWall3": "Master all traits of the 2nd Wall to unlock.",
      "categories": {
        "steel": "Steel",
        "fire": "Fire",
        "frost": "Frost",
        "life": "Life",
        "thunder": "Thunder",
        "light": "Light",
        "shadow": "Shadow",
        "nature": "Nature",
        "blood": "Blood",
        "time": "Time",
        "wind": "Wind",
        "earth": "Earth",
        "arcane": "Arcane",
        "void": "Void",
        "storm": "Storm"
      },
      "talent": {
        "steel": {
          "regularName": "Iron Will Stage {{tier}}",
          "specialName": "Spiked Armor {{star}}★",
          "regularDesc": "Wall HP +{{hp}}, Defense +{{def}}",
          "specialDesc": "Wall HP +{{hp}}, Defense +{{def}}, Reflect Damage +{{reflect}}%"
        },
        "fire": {
          "name": "Breath of Flame Stage {{tier}}",
          "desc": "Deals {{dmg}} fire damage per second to nearby enemies"
        },
        "frost": {
          "name": "Frozen Rampart Stage {{tier}}",
          "desc": "Reduces nearby enemies' attack/move speed by {{slow}}%"
        },
        "life": {
          "regularName": "Pulse of Life Stage {{tier}}",
          "specialName": "Guardian's Grace {{star}}★",
          "regularDesc": "Restores {{hp}} wall HP at the end of each wave",
          "specialDesc": "Restores {{hp}} wall HP at wave end, all allies Defense +{{def}}, revive fallen allies at {{revive}}% HP"
        },
        "thunder": {
          "regularName": "Static Field Stage {{tier}}",
          "specialName": "Lightning Counter {{star}}★",
          "regularDesc": "{{pct}}% chance to block enemy projectiles",
          "specialDesc": "{{pct}}% chance to block, deal {{dmg}} lightning damage on counter"
        },
        "light": {
          "name": "Sacred Light Stage {{tier}}",
          "desc": "Both walls simultaneous regen +{{val}}"
        },
        "shadow": {
          "name": "Void Abyss Stage {{tier}}",
          "desc": "Instantly kills nearby monsters below {{pct}}% HP"
        },
        "nature": {
          "name": "Toxic Thorns Stage {{tier}}",
          "desc": "Deals {{dmg}} poison damage per second to nearby enemies"
        },
        "blood": {
          "name": "Vampiric Wall Stage {{tier}}",
          "desc": "Absorbs {{pct}}% of damage dealt to nearby enemies as wall HP"
        },
        "time": {
          "name": "Time Warp Stage {{tier}}",
          "desc": "Reduces all ally skill cooldowns by {{pct}}%"
        },
        "wind": {
          "regularName": "Gale Blessing Stage {{tier}}",
          "specialName": "Storm Rush {{star}}★",
          "regularDesc": "Ally move speed +{{spd}}%, attack cooldown -{{atkspd}}%",
          "specialDesc": "Ally move speed is maximized"
        },
        "earth": {
          "regularName": "Fortress of Earth Stage {{tier}}",
          "specialName": "Tectonic Crush {{star}}★",
          "regularDesc": "Wall HP +{{hp}}, earthquake dealing {{dmg}} at wave start",
          "specialDesc": "Wall HP +{{hp}}, earthquake dealing {{dmg}} at wave start, Defense +{{def}}"
        },
        "arcane": {
          "regularName": "Arcane Amplification Stage {{tier}}",
          "specialName": "Mana Resonance {{star}}★",
          "regularDesc": "Ally projectile/skill damage +{{amp}}%, {{explosion}} magic explosion on enemy death",
          "specialDesc": "Magic damage is explosively amplified"
        },
        "void": {
          "regularName": "Void Weakening Stage {{tier}}",
          "specialName": "Abyss Dread {{star}}★",
          "regularDesc": "Enemy ATK -{{weak}}%, restores {{heal}} wall HP on kill",
          "specialDesc": "Enemy ATK -{{weak}}%, restores {{heal}} wall HP on kill — void's power overwhelms enemies"
        },
        "storm": {
          "regularName": "Storm Barrage Stage {{tier}}",
          "specialName": "Sky Storm {{star}}★",
          "regularDesc": "Deals {{dmg}} storm damage/sec to nearby enemies, chains to {{chain}} targets",
          "special10Desc": "Deals {{dmg}} storm damage/sec, chains to {{chain}} targets — melee heroes deal AoE {{radius}}px 50% bonus!",
          "special5Desc": "Deals {{dmg}} storm damage/sec, chains to {{chain}} targets — lightning and wind sweep the battlefield"
        }
      }
    },
    "manghongu": {
      "title": "Soul Orb (亡魂球)",
      "desc": "Hero enhancement applied only to Dungeon Assault & AI Raids",
      "warning": "⚠ The Soul Orb is end-game content with theoretically infinite upgrades. Costs increase exponentially.",
      "totalUpgrades": "Total Upgrades",
      "currentBonus": "Current +{{val}}{{unit}}",
      "nextRank": "Next Rank {{rank}}: 💰 {{cost}}G",
      "goldLabel": "Gold:",
      "toastGoldShort": "Insufficient gold.",
      "toastError": "An error occurred during purchase.",
      "toastAchieved": "{{label}} Rank {{rank}} achieved! (+{{bonus}}{{unit}})",
      "stats": {
        "atk": "Attack Power",
        "def": "Defense",
        "hp": "HP",
        "atkSpeed": "Attack Speed",
        "spd": "Move Speed"
      }
    },
    "achievements": {
      "progress": "Progress: {unlocked}/{total}",
      "reward": {
        "ssr": "SSR Hero Reward",
        "ar": "AR Hero Reward",
        "lr": "LR Hero Reward"
      },
      "title": "Achievements",
      "unlocked": "Unlocked",
      "failedToLoad": "Failed to load achievements",
      "playToEarn": "Play a game to start earning achievements!",
      "exportJson": "Export JSON",
      "gold": "Gold",
      "crystal": "Crystal",
      "land_goblin": {
        "description": "Sector 1: Defeated the Goblin Territory.",
        "displayName": "Conquer Goblin Territory"
      },
      "wave_30": {
        "description": "Clear all of Wave 30.",
        "displayName": "Legendary Guardian"
      },
      "wave_5": {
        "description": "Clear Wave 5.",
        "displayName": "First Gate"
      },
      "wave_50": {
        "displayName": "Indomitable Guardian",
        "description": "Clear all of Wave 50."
      },
      "wave_100": {
        "displayName": "Wall of Legend",
        "description": "Clear Wave 100."
      },
      "wave_150": {
        "displayName": "Mythic Defender",
        "description": "Clear Wave 150."
      },
      "score_10000": {
        "displayName": "Score Master",
        "description": "Achieve a total score of 10000."
      },
      "hard_clear": {
        "displayName": "Hard Mode Conqueror",
        "description": "Clear on Hard difficulty."
      },
      "tutorial_master": {
        "displayName": "Tutorial Master",
        "description": "Complete the tutorial."
      },
      "land_orc": {
        "displayName": "Conquer Orc Territory",
        "description": "Sector 1: Defeated the Orc Territory."
      },
      "land_tauren": {
        "displayName": "Conquer Tauren Peaks",
        "description": "Sector 1: Defeated the Tauren Peaks."
      },
      "land_darkelf": {
        "displayName": "Conquer Dark Elf Forest",
        "description": "Sector 2: Defeated the Dark Elf Forest."
      },
      "land_fire": {
        "displayName": "Conquer Firelands",
        "description": "Sector 2: Defeated the Firelands."
      },
      "land_ice": {
        "displayName": "Conquer Ice Kingdom",
        "description": "Sector 2: Defeated the Ice Kingdom."
      },
      "land_undead": {
        "displayName": "Conquer Forsaken City",
        "description": "Sector 3: Defeated the Undead City."
      },
      "land_poison": {
        "displayName": "Conquer Venomous Swamp",
        "description": "Sector 3: Defeated the Venomous Swamp."
      },
      "land_merc": {
        "displayName": "Conquer Mercenary Camp",
        "description": "Sector 3: Defeated the Mercenary Camp."
      },
      "land_ele": {
        "displayName": "Conquer Elemental Haven",
        "description": "Sector 4: Defeated the Elemental Haven."
      },
      "land_sea": {
        "displayName": "Conquer Deep Sea Temple",
        "description": "Sector 4: Defeated the Deep Sea Temple."
      },
      "land_sky": {
        "displayName": "Conquer Sky Fortress",
        "description": "Sector 4: Defeated the Sky Fortress."
      },
      "land_demon": {
        "displayName": "Conquer Demonic Rift",
        "description": "Sector 5: Defeated the Demonic Rift."
      },
      "land_dragon": {
        "displayName": "Conquer Dragon Tower",
        "description": "Sector 5: Defeated the Dragon Tower."
      },
      "sector_1_master": {
        "displayName": "Wilderness & Honor Conqueror",
        "description": "Clear all lands in Sector 1 (Goblin, Orc, Tauren)."
      },
      "sector_2_master": {
        "displayName": "Master of Magic",
        "description": "Clear all lands in Sector 2 (Dark Elf, Fire, Ice)."
      },
      "sector_3_master": {
        "displayName": "Beyond Death",
        "description": "Clear all lands in Sector 3 (Undead, Venom, Mercenary)."
      },
      "sector_4_master": {
        "displayName": "Master of Elements",
        "description": "Clear all lands in Sector 4 (Elemental, Deep Sea, Sky)."
      },
      "sector_5_master": {
        "displayName": "Mythic Conqueror",
        "description": "Clear all lands in Sector 5 (Demon, Dragon)."
      },
      "elite_master": {
        "displayName": "Elite Difficulty Conqueror",
        "description": "Conquer the Elite difficulty of all lands."
      },
      "role_5_tank": {
        "displayName": "Ironclad Party",
        "description": "Clear Wave 30 on Hard difficulty with 5 Tanks."
      },
      "role_5_melee": {
        "displayName": "Gathering of Blades",
        "description": "Clear Wave 30 on Hard difficulty with 5 Melee DPS."
      },
      "role_5_ranged": {
        "displayName": "Ranged Dominance",
        "description": "Clear Wave 30 on Hard difficulty with 5 Ranged DPS."
      },
      "role_5_healer": {
        "displayName": "Perfect Healing Party",
        "description": "Clear Wave 30 on Hard difficulty with 5 Healers."
      },
      "role_3_cc": {
        "displayName": "Seal Party",
        "description": "Clear Wave 30 on Hard difficulty with 3 or more CC heroes."
      },
      "role_all_5": {
        "displayName": "Perfect Composition",
        "description": "Clear Wave 30 on Hard with 1 each of Tank, Melee, Ranged, Healer, and CC."
      },
      "elem_shadow_5": {
        "displayName": "Legion of Darkness",
        "description": "Clear Wave 30 on Hard difficulty with 5 or more Shadow element heroes."
      },
      "elem_holy_4": {
        "displayName": "Holy Party",
        "description": "Clear Wave 30 on Hard difficulty with 4 or more Holy element heroes."
      },
      "elem_fire_4": {
        "displayName": "Legion of Fire",
        "description": "Clear Wave 30 on Hard difficulty with 4 or more Fire element heroes."
      },
      "elem_nature_4": {
        "displayName": "Guardians of Nature",
        "description": "Clear Wave 30 on Hard difficulty with 4 or more Nature element heroes."
      },
      "elem_frost_3": {
        "displayName": "Ice Party",
        "description": "Clear Wave 30 on Hard with 3 or more total Frost + Cold element heroes."
      },
      "elem_dragon": {
        "displayName": "Dragon's Blessing",
        "description": "Clear Wave 30 on Hard difficulty including 1 or more Dragon element heroes."
      },
      "elem_thunder_2": {
        "displayName": "Thunder Party",
        "description": "Clear Wave 30 on Hard difficulty with 2 or more Thunder element heroes."
      },
      "elem_wind_2": {
        "displayName": "Storm Party",
        "description": "Clear Wave 30 on Hard difficulty with 2 or more Wind element heroes."
      },
      "elem_poison_3": {
        "displayName": "Plague Party",
        "description": "Clear Wave 30 on Hard difficulty with 3 or more Poison element heroes."
      },
      "race_undead_5": {
        "displayName": "Undead Legion Commander",
        "description": "Clear Wave 30 on Hard difficulty with 5 Undead heroes."
      },
      "race_tauren_4": {
        "displayName": "Earth Mother",
        "description": "Clear Wave 30 on Hard difficulty with 4 Tauren heroes."
      },
      "race_orc_4": {
        "displayName": "Echo of Orcs",
        "description": "Clear Wave 30 on Hard difficulty with 4 Orc heroes."
      },
      "race_bloodelf_3": {
        "displayName": "Gathering of Blood",
        "description": "Clear Wave 30 on Hard difficulty with 3 Blood Elf heroes."
      },
      "race_orc_3": {
        "displayName": "Unification of Orc Tribes",
        "description": "Clear Wave 30 on Hard difficulty with 3 Orc heroes."
      },
      "race_bloodelf_5": {
        "displayName": "Apex of Magic",
        "description": "Clear Wave 30 on Hard difficulty with 5 Blood Elf heroes."
      },
      "race_goblin_4": {
        "displayName": "Goblin Emperor's Army",
        "description": "Clear Wave 30 on Hard difficulty with 4 or more Goblin heroes."
      },
      "race_human_4": {
        "displayName": "Kingdom Knights",
        "description": "Clear Wave 30 on Hard difficulty with 4 or more Human heroes."
      },
      "race_troll_3": {
        "displayName": "Troll Shamanic Ritual",
        "description": "Clear Wave 30 on Hard with 3 or more total Troll + Zandalari Troll heroes."
      },
      "race_pandaren_3": {
        "displayName": "Pandaren Blessing",
        "description": "Clear Wave 30 on Hard difficulty with 3 or more Pandaren heroes."
      },
      "race_dracthyr_2": {
        "displayName": "Dracthyr Awakening",
        "description": "Clear Wave 30 on Hard difficulty with 2 or more Dracthyr heroes."
      },
      "race_elf_4": {
        "displayName": "Elven Awakening",
        "description": "Clear Wave 30 on Hard with 4 or more total Elven (Blood/Void/Nightborne/Night) heroes."
      }
    },
    "roles": {
      "tank": "Tank",
      "melee_dps": "Melee DPS",
      "ranged_dps": "Ranged DPS",
      "healer": "Healer",
      "cc": "CC",
      "mechanic": "Mechanic",
      "all": "All"
    },
    "---": "",
    "Key": "EN",
    "nav": {
      "heroDefense": "Hero Defense",
      "dashboard": "Dashboard",
      "play": "Play",
      "tutorial": "Tutorial",
      "lobby": "Lobby",
      "aiMatch": "AI Match",
      "heroes": "Heroes",
      "shop": "Shop",
      "synergy": "Synergy",
      "friends": "Friends",
      "achievements": "Achievements",
      "tournament": "Tournament",
      "leaderboard": "Leaderboard",
      "profile": "Profile",
      "guide": "Guide",
      "login": "Login",
      "register": "Register",
      "logout": "Logout"
    },
    "footer": {
      "privacyPolicy": "Privacy Policy",
      "termsOfService": "Terms of Service"
    },
    "privacy": {
      "title": "Privacy Policy",
      "lastUpdated": "Last updated: {{date}}",
      "s1Title": "1. Information We Collect",
      "s1Intro": "When you create an account on Hero Defense, we collect the following personal information:",
      "s1Item1Label": "Account information:",
      "s1Item1Text": "email address, username, and password (stored as a secure hash).",
      "s1Item2Label": "Game data:",
      "s1Item2Text": "gameplay statistics, hero collection, achievements, and in-game progress.",
      "s1Item3Label": "Chat messages:",
      "s1Item3Text": "messages sent through the in-game chat system.",
      "s1Item4Label": "Technical data:",
      "s1Item4Text": "login timestamps and online status for session management.",
      "s2Title": "2. How We Use Your Information",
      "s2Item1": "To create and manage your account and authenticate your identity.",
      "s2Item2": "To provide the game experience, including multiplayer features and leaderboards.",
      "s2Item3": "To enable social features such as friend lists and in-game chat.",
      "s2Item4": "To track your game progress and maintain your hero collection.",
      "s3Title": "3. Data Storage and Security",
      "s3Text": "Your data is stored in a PostgreSQL database. Passwords are hashed using bcrypt with a salt factor of 10. Authentication is handled via JSON Web Tokens (JWT). All communication between the client and server is encrypted via HTTPS/WSS.",
      "s4Title": "4. Data Sharing",
      "s4Text": "We do not sell, trade, or share your personal information with third parties. Your username and game statistics may be visible to other players through leaderboards and multiplayer sessions. Chat messages are only visible to intended recipients.",
      "s5Title": "5. Your Rights",
      "s5Intro": "You have the right to:",
      "s5Item1": "Access your personal data through your profile page.",
      "s5Item2": "Update your username and profile information at any time.",
      "s5Item3": "Request deletion of your account and associated data.",
      "s6Title": "6. Cookies and Local Storage",
      "s6Text": "We use browser local storage to maintain your authentication session (JWT token and basic user info). No third-party tracking cookies are used. This data is removed when you log out.",
      "s7Title": "7. Contact",
      "s7Text": "This application is developed as part of the 42 school ft_transcendence project. For questions about this privacy policy, please contact the development team through the 42 school intranet."
    },
    "terms": {
      "title": "Terms of Service",
      "lastUpdated": "Last updated: {{date}}",
      "s1Title": "1. Acceptance of Terms",
      "s1Text": "By accessing and using Hero Defense (\"the Service\"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.",
      "s2Title": "2. Description of Service",
      "s2Text": "Hero Defense is a web-based multiplayer tower defense game inspired by World of Warcraft class systems. The Service includes user accounts, real-time multiplayer gameplay, in-game chat, hero collection, and related features. This project is developed as part of the 42 school curriculum (ft_transcendence).",
      "s3Title": "3. User Accounts",
      "s3Item1": "You must provide a valid email address and choose a unique username to register.",
      "s3Item2": "You are responsible for maintaining the security of your account credentials.",
      "s3Item3": "You must not create accounts using automated methods or impersonate others.",
      "s3Item4": "One account per person is permitted.",
      "s4Title": "4. Acceptable Use",
      "s4Intro": "When using the Service, you agree not to:",
      "s4Item1": "Use cheats, exploits, bots, or automation tools to gain unfair advantages.",
      "s4Item2": "Harass, threaten, or abuse other users through chat or any other means.",
      "s4Item3": "Attempt to access other users' accounts or personal data.",
      "s4Item4": "Disrupt the Service through denial-of-service attacks or similar activities.",
      "s4Item5": "Use the chat system to distribute spam, malware, or inappropriate content.",
      "s5Title": "5. Game Content",
      "s5Text": "All in-game items, heroes, currencies, and progress are virtual and have no real-world monetary value. We reserve the right to modify game balance, content, and features at any time for the improvement of the Service.",
      "s6Title": "6. Intellectual Property",
      "s6Text": "Hero Defense is an educational project. Game mechanics are inspired by popular games but all code, assets, and content are original work created for the ft_transcendence project. World of Warcraft and related terms are trademarks of Blizzard Entertainment and are used here for descriptive purposes only.",
      "s7Title": "7. Termination",
      "s7Text": "We reserve the right to suspend or terminate accounts that violate these terms. Users may delete their accounts at any time. Upon termination, all associated game data will be permanently removed.",
      "s8Title": "8. Disclaimer",
      "s8Text": "The Service is provided \"as is\" without warranties of any kind. As an educational project, service availability and continuity are not guaranteed. We are not liable for any loss of data or interruption of service.",
      "s9Title": "9. Changes to Terms",
      "s9Text": "We may update these Terms of Service at any time. Continued use of the Service after changes constitutes acceptance of the updated terms. We will indicate the date of last update at the top of this page."
    },
    "common": {
      "loading": "Loading...",
      "save": "Save",
      "cancel": "Cancel",
      "edit": "[Edit]",
      "level": "Level",
      "experience": "Experience",
      "gold": "Gold",
      "online": "Online",
      "offline": "Offline",
      "status": "Status",
      "hp": "HP",
      "atk": "ATK",
      "def": "DEF",
      "spd": "SPD",
      "second": "s"
    },
    "login": {
      "title": "Login",
      "email": "Email",
      "password": "Password",
      "loginBtn": "Login",
      "loggingIn": "Logging in...",
      "noAccount": "Don't have an account?",
      "registerLink": "Register",
      "loginFailed": "Login failed",
      "emailPlaceholder": "your@email.com",
      "passwordPlaceholder": "Enter password"
    },
    "register": {
      "title": "Create Account",
      "email": "Email",
      "username": "Username",
      "password": "Password",
      "confirmPassword": "Confirm Password",
      "registerBtn": "Register",
      "creatingAccount": "Creating account...",
      "alreadyHaveAccount": "Already have an account?",
      "loginLink": "Login",
      "passwordMismatch": "Passwords do not match",
      "passwordTooShort": "Password must be at least 8 characters",
      "usernameLengthError": "Username must be 3-20 characters",
      "registrationFailed": "Registration failed",
      "emailAlreadyInUse": "This email is already in use.",
      "usernameAlreadyTaken": "This username is already taken.",
      "loginFailed": "Incorrect email or password.",
      "emailPlaceholder": "your@email.com",
      "usernamePlaceholder": "Hero name (3-20 chars)",
      "passwordPlaceholder": "At least 8 characters",
      "confirmPlaceholder": "Re-enter password"
    },
    "dashboard": {
      "welcome": "Welcome,",
      "level": "Level",
      "exp": "EXP",
      "gold": "Gold",
      "heroes": "Heroes",
      "playSolo": "Play Solo",
      "playSoloDesc": "Start a solo defense game",
      "multiplayer": "Multiplayer",
      "multiplayerDesc": "Join or create a lobby",
      "aiMatch": "AI Match",
      "aiMatchDesc": "Challenge the AI",
      "tournament": "Tournament",
      "tournamentDesc": "Compete in brackets",
      "shop": "Shop",
      "shopDesc": "Buy new heroes",
      "achievements": "Achievements",
      "achievementsDesc": "Track your progress",
      "friends": "Friends",
      "friendsDesc": "Manage your friends",
      "myHeroes": "My Heroes",
      "noHeroes": "No heroes yet",
      "noHeroesDesc": "Heroes will be available in the shop soon!",
      "leaderboard": "Leaderboard",
      "leaderboardDesc": "Check rankings",
      "tutorialTitle": "Tutorial",
      "tutorialDesc": "First time here? Learn the basics with the main hero.",
      "tutorialStage1": "Stage 1 — Stand Alone (5 Waves)",
      "tutorialHint1": "Survive with raw stats — no skills",
      "tutorialHint2": "Face the Wave 5 boss",
      "tutorialStart": "Start Tutorial",
      "tutorialSkip": "Skip",
      "shopDesc2": "Recruit & Fortify",
      "heroesManageTitle": "Manage Heroes",
      "heroesManageDesc": "Class Change & Skills",
      "synergyTitle": "Synergy Guide",
      "synergyDesc": "Race & Element effects"
    },
    "leaderboard": {
      "title": "Leaderboard",
      "wave": "Best Wave",
      "score": "Best Score",
      "gold": "Total Gold Earned",
      "clears": "Clear Count",
      "rank": "Rank",
      "player": "Player",
      "value": "Record",
      "noData": "No records yet. Play a game!",
      "myRank": "My Rank",
      "waveUnit": "Wave",
      "clearsUnit": "×",
      "me": "ME",
      "top100": "Top 100",
      "exportCsv": "Export CSV"
    },
    "synergy": {
      "title": "Synergy",
      "subtitle": "Hero Synergies",
      "raceTab": "Race",
      "elementTab": "Element",
      "activeLabel": "Active Synergies",
      "activeDesc": "Currently active in your team",
      "pendingLabel": "Pending",
      "pendingDesc": "Collect more heroes to activate",
      "ruleTitle": "Synergy Rules",
      "ruleSummary": "Owning enough heroes of the same race or element triggers powerful effects.",
      "dragonNote": "(Dragons follow separate rules)",
      "activeTag": "Active",
      "pendingTag": "Pending",
      "memberUnit": "Units",
      "notImplEffect": "Not yet implemented.",
      "noHeroes": "No heroes",
      "race": {
        "orc": {
          "name": "Orc",
          "t1": "All HP +10%",
          "t2": "All HP +20% · DEF +8",
          "t3": "All HP +30% · DEF +15"
        },
        "human": {
          "name": "Human",
          "t1": "All ATK +10%",
          "t2": "All ATK +15% · ATK SPD +10%",
          "t3": "All ATK +25% · ATK SPD +15%"
        },
        "elf": {
          "name": "Elf",
          "t1": "CC Duration +30%",
          "t2": "CC Duration +50% · Skill Range +20%",
          "t3": "CC Duration +80% · Skill Range +30%"
        },
        "undead": {
          "name": "Undead",
          "t1": "Heal +20%",
          "t2": "Heal +35%",
          "t3": "Heal +50% · Life Steal 10%"
        },
        "tauren": {
          "name": "Tauren",
          "t1": "HP +15%, DEF +5",
          "t2": "HP +25%, DEF +12",
          "t3": "HP +40%, DEF +20"
        },
        "troll": {
          "name": "Troll",
          "t1": "ATK SPD +15%",
          "t2": "ATK SPD +25%, Heal +10%",
          "t3": "ATK SPD +35%, Heal +20%"
        },
        "pandaren": {
          "name": "Pandaren",
          "t1": "DEF +8, Move SPD +10%",
          "t2": "DEF +15, Move SPD +15%",
          "t3": "DEF +25, Move SPD +20%, HP +10%"
        },
        "beast": {
          "name": "Beastkin",
          "t1": "ATK +12%",
          "t2": "ATK +20%, ATK SPD +15%, Life Steal 5%"
        },
        "nightelf": {
          "name": "Night Elf",
          "t1": "Move SPD +15%",
          "t2": "Move SPD +25%, ATK +12%"
        },
        "goblin": {
          "name": "Goblin",
          "t1": "ATK SPD +15%",
          "t2": "ATK SPD +25%, ATK +10%",
          "t3": "ATK SPD +35%, ATK +15%"
        },
        "draenei": {
          "name": "Draenei",
          "t1": "Heal +15%",
          "t2": "Heal +25%, HP +10%",
          "t3": "Heal +40%, HP +15%, DEF +8"
        },
        "bloodelf": {
          "name": "Blood Elf",
          "t1": "ATK +12%",
          "t2": "ATK +20%, Life Steal 5%",
          "t3": "ATK +30%, Life Steal 10%"
        },
        "voidelf": {
          "name": "Void Elf",
          "t1": "ATK +10%, Execute Threshold +5%"
        },
        "lightforged": {
          "name": "Lightforged Draenei",
          "t1": "Heal +15%, ATK +10%"
        },
        "gnome": {
          "name": "Gnome",
          "t1": "ATK +10%",
          "t2": "ATK +15%, DEF +8",
          "t3": "ATK +20%, DEF +15, HP +10%"
        },
        "dracthyr": {
          "name": "Dracthyr"
        },
        "maghar": {
          "name": "Mag'har Orc",
          "t1": "ATK +12%, DEF +5",
          "t2": "ATK +20%, DEF +10%"
        },
        "nightborne": {
          "name": "Nightborne",
          "t1": "Magic DMG +15%",
          "t2": "Magic DMG +25%, CC Duration +20%"
        },
        "dark_iron": {
          "name": "Dark Iron Dwarf",
          "t1": "DEF +10, HP +10%",
          "t2": "DEF +18, HP +18%"
        },
        "zandalari": {
          "name": "Zandalari Troll",
          "t1": "ATK SPD +15%, Heal +10%",
          "t2": "ATK SPD +25%, Heal +20%"
        },
        "elemental": {
          "name": "Elemental",
          "t1": "Elemental DMG +15%",
          "t2": "Elemental DMG +25%, HP +10%"
        },
        "demon": {
          "name": "Demon",
          "t1": "ATK +15%, Execute Threshold +5%",
          "t2": "ATK +25%, Execute Threshold +10%"
        },
        "mechanical": {
          "name": "Mechanical",
          "t1": "ATK SPD +15%, DEF +5"
        },
        "vulpera": {
          "name": "Vulpera",
          "t1": "Move SPD +15%, ATK +10%"
        }
      },
      "element": {
        "fire": {
          "name": "Fire",
          "t1": "All ATK +15%",
          "t2": "All ATK +25%",
          "t3": "All ATK +35% · Apply Burn"
        },
        "frost": {
          "name": "Frost",
          "t1": "Enemy Slow +30%",
          "t2": "Enemy Slow +60%",
          "t3": "Enemy Slow +100% · Freeze Chance 30%"
        },
        "holy": {
          "name": "Holy",
          "t1": "Heal +20%",
          "t2": "Heal +35%",
          "t3": "Heal +50% · Max HP +20%"
        },
        "dark": {
          "name": "Dark",
          "t1": "Execute Chance +5% (below 30% HP)",
          "t2": "Execute Chance +10%",
          "t3": "Execute Chance +15% · Life Steal 15%"
        },
        "nature": {
          "name": "Nature",
          "t1": "Heal +15%",
          "t2": "Heal +25%, HP +10%",
          "t3": "Heal +40%, HP +15%"
        },
        "water": {
          "name": "Water",
          "t1": "Heal +15%, Move SPD +10%",
          "t2": "Heal +25%, Move SPD +15%",
          "t3": "Heal +35%, Move SPD +20%, HP +10%"
        },
        "thunder": {
          "name": "Thunder",
          "t1": "ATK SPD +20%",
          "t2": "ATK SPD +35%, ATK +10%",
          "t3": "ATK SPD +50%, ATK +15%"
        },
        "ice": {
          "name": "Ice",
          "t1": "DEF +10, CC Duration +20%",
          "t2": "DEF +20, CC Duration +40%",
          "t3": "DEF +30, CC Duration +60%, HP +10%"
        },
        "wind": {
          "name": "Wind",
          "t1": "Move SPD +15%, ATK SPD +10%",
          "t2": "Move SPD +20%, ATK SPD +20%",
          "t3": "Move SPD +25%, ATK SPD +30%, ATK +10%"
        },
        "poison": {
          "name": "Poison",
          "t1": "Execute Threshold +5%",
          "t2": "Execute Threshold +10%, ATK +10%",
          "t3": "Execute Threshold +15%, ATK +15%, Lifesteal 5%"
        },
        "flame": {
          "name": "Flame",
          "t1": "ATK +18%",
          "t2": "ATK +28%",
          "t3": "ATK +40%"
        },
        "dragon": {
          "name": "Dragon ★",
          "t1": "Dragon's Grace — All ATK +20%, HP +15% (activates with 1!)"
        },
        "light": {
          "name": "Light"
        },
        "arcane": {
          "name": "Arcane",
          "t1": "Magic DMG +15%",
          "t2": "Magic DMG +25%, CC Duration +15%"
        }
      },
      "heroCount": "{count} heroes"
    },
    "guide": {
      "coreMechanics": "Core Mechanics",
      "strategyTip": "Basic Strategy",
      "strategyDesc": "Tanks hold the front line, DPS deals damage fast, healers keep allies alive, and CC/Mechanic control the situation. Team synergy is the key to survival.",
      "roles": {
        "tank": {
          "title": "Tank",
          "desc": "Responsible for the front line with high DEF and HP. They draw monster aggro to take damage and cluster enemies together."
        },
        "melee_dps": {
          "title": "Melee DPS",
          "desc": "Destroys enemies with powerful close-range attacks. Supports tanks or focuses on high single-target damage."
        },
        "ranged_dps": {
          "title": "Ranged DPS",
          "desc": "Deals lethal damage from a safe distance. Boasts the highest single-target destruction power."
        },
        "healer": {
          "title": "Healer",
          "desc": "Helps allies survive by restoring health and providing shields."
        },
        "cc": {
          "title": "Crowd Control (CC)",
          "desc": "Controls the flow of battle by slowing or stunning enemies."
        },
        "mechanic": {
          "title": "Mechanic",
          "desc": "A hybrid role that supports allies by repairing walls or summoning mechanical devices."
        }
      },
      "title": "Hero Guidebook",
      "subtitle": "Learn about roles and core game mechanics."
    },
    "friends": {
      "title": "Friends",
      "addFriend": "Add Friend",
      "searchPlaceholder": "Search by username (min 2 chars)...",
      "pendingRequests": "Pending Requests",
      "myFriends": "My Friends",
      "noFriends": "No friends yet. Search for users above!",
      "add": "Add",
      "accept": "Accept",
      "reject": "Reject",
      "remove": "Remove",
      "online": "Online",
      "offline": "Offline",
      "failedToSend": "Failed to send request",
      "failedToAccept": "Failed to accept",
      "failedToReject": "Failed to reject",
      "failedToRemove": "Failed to remove",
      "requestSent": "Friend request sent to {username}.",
      "removeConfirm": "Remove {username} from friends?",
      "removed": "{username} removed from friends.",
      "requestAccepted": "Friend request accepted.",
      "requestRejected": "Friend request rejected.",
      "message": "Message",
      "chatWith": "Chat with {username}",
      "chatPlaceholder": "Type a message...",
      "send": "Send",
      "noMessages": "No messages yet. Say hello!",
      "failedToLoad": "Failed to load messages.",
      "failedToSend2": "Failed to send message"
    },
    "profile": {
      "title": "My Profile",
      "username": "Username",
      "email": "Email",
      "level": "Level",
      "experience": "Experience",
      "ownedHeroes": "Owned Heroes",
      "crystals": "Crystals",
      "gold": "Gold",
      "status": "Status",
      "memberSince": "Member since:",
      "lastLogin": "Last login:",
      "save": "Save",
      "cancel": "Cancel",
      "edit": "[Edit]",
      "profileUpdated": "Profile updated!",
      "updateFailed": "Update failed",
      "failedToLoad": "Failed to load profile",
      "online": "Online",
      "offline": "Offline",
      "usernameLengthError": "Username must be 3-20 characters",
      "imageOnly": "Only image files can be uploaded.",
      "avatarUpdated": "Avatar updated.",
      "avatarFailed": "Failed to upload avatar.",
      "changeAvatar": "Click to change avatar",
      "changeBtn": "Change",
      "gdprTitle": "Privacy Management (GDPR)",
      "gdprDesc": "Download your data or permanently delete your account.",
      "gdprExport": "Download My Data (JSON)",
      "gdprDelete": "Delete Account",
      "gdprExportFailed": "Failed to export data.",
      "gdprDeleteFailed": "Failed to delete account.",
      "gdprDeleteTitle": "Delete Account",
      "gdprDeleteDesc": "All data (heroes, achievements, gold, crystals) will be permanently deleted.\nThis action cannot be undone.",
      "gdprDeleteConfirm": "Confirm Permanent Deletion",
      "gdprDeleting": "Deleting..."
    },
    "tournament": {
      "title": "Tournament",
      "createTournament": "Create Tournament",
      "openTournaments": "Open Tournaments",
      "noOpenTournaments": "No open tournaments",
      "creating": "Creating...",
      "create": "Create",
      "players": "players",
      "waiting": "Waiting",
      "inProgress": "In Progress",
      "completed": "Completed",
      "waitingForPlayers": "Waiting for players",
      "host": "Host:",
      "maxPlayers": "Max",
      "join": "Join",
      "leave": "Leave",
      "start": "Start",
      "bracket": "Bracket",
      "round": "Round",
      "submitResult": "Submit Result",
      "submit": "Submit",
      "cancel": "Cancel",
      "winner": "Winner:",
      "dismiss": "Dismiss",
      "yourMatch": "Your Match!",
      "playThenSubmit": "Play the game",
      "selectOrCreate": "Select or create a tournament to view details",
      "failedToLoad": "Failed to load tournaments",
      "failedToCreate": "Failed to create tournament",
      "failedToJoin": "Failed to join",
      "failedToLeave": "Failed to leave",
      "failedToStart": "Failed to start",
      "failedToSubmit": "Failed to submit result",
      "namePlaceholder": "Tournament name",
      "score": "score",
      "done": "✓ Done"
    },
    "lobby": {
      "title": "Multiplayer Lobby",
      "createLobby": "Create Lobby",
      "cancelCreate": "Cancel",
      "createNewLobby": "Create New Lobby",
      "lobbyName": "Lobby Name",
      "mode": "Mode",
      "party": "Party (2P)",
      "raid": "Raid (3P)",
      "noLobbies": "No lobbies available",
      "noLobbiesDesc": "Create one to start playing!",
      "players": "players",
      "host": "Host",
      "ready": "Ready",
      "notReady": "Not Ready",
      "cancelReady": "Cancel Ready",
      "startGame": "Start Game",
      "leaveLobby": "Leave Lobby",
      "chat": "Chat",
      "typeMessage": "Type a message...",
      "send": "Send",
      "full": "Full",
      "join": "Join",
      "lobbyNamePlaceholder": "My Lobby"
    },
    "game": {
      "title": "Hero Defense",
      "achievementUnlocked": "Achievement Unlocked!",
      "multiplayer": "Multiplayer",
      "host": "(Host)",
      "guest": "(Guest)",
      "players": "Players:",
      "startGame": "Start Game",
      "resume": "Resume",
      "pause": "Pause",
      "reset": "Reset",
      "playAgain": "Play Again",
      "difficulty": "Difficulty",
      "waves": "Waves",
      "easy": "Easy",
      "normal": "Normal",
      "hard": "Hard",
      "easyDesc": "Monster HP/ATK x0.7",
      "normalDesc": "Standard difficulty",
      "hardDesc": "Monster HP x1.5, ATK x1.4",
      "activeSynergies": "Active Synergies",
      "bossAbilities": "Boss Abilities",
      "backToMain": "Main Menu",
      "backToMainHint": "· Auto-redirecting to main menu...",
      "gameClear": "🏆 Game Clear!",
      "gameOver": "💀 Game Over",
      "waveLabel": "Wave",
      "score": "Score",
      "bossExplosion": "💥 Sapper Explosion! Wall takes {{damage}} damage!",
      "bossSapperHit": "💥 Sapper Explosion! {{count}} heroes lose 50% current HP!",
      "bossSlam": "💀 {{name}}'s Ground Slam! Everyone knocked down!",
      "bossEnrage": "{{name}} Enraged! ATK +50%!",
      "bossArcaneEnd": "{{name}}'s Arcane Explosion stopped.",
      "bossThousandBloom": "{{name}} Thousand Slayer Bloom! Full-screen damage!",
      "bossGroundSlam": "{{name}} Ground Slam! Hit {{count}} heroes!",
      "bossVoidBlink": "{{name}} Void Blink! Central Arcane Explosion!",
      "bossLegionSummon": "{{name}} Legion Summon! {{count}} {{type}} appear!",
      "bossDefenseDistributed": "{{name}}'s attack distributed among {{count}} heroes!",
      "bossAttackConcentrated": "{{name}}'s attack concentrated! Lethal damage! ({{count}} heroes)",
      "goldSavedTitle": "Gold Saved!",
      "goldSavedApplied": "applied to account",
      "turret": {
        "title": "🔧 Mechanic Ready! Set turret positions.",
        "allPlaced": "All turrets placed! Press the battle start button.",
        "placing": "Turret {{n}} / {{max}} — Click the highlighted left area on the field.",
        "wallLabel": "Wall",
        "zone": "Turret Placement Zone",
        "clickPrompt": "← Click left area",
        "undo": "↩ Undo",
        "placed": "{{n}} / {{max}} placed",
        "start": "Battle Start ⚡"
      },
      "victory": "VICTORY",
      "defeat": "DEFEATED",
      "fighting": "Fighting...",
      "preparing": "Preparing...",
      "range": "RNG",
      "activeSynergyPreview": "✨ Active Synergies",
      "heroSearchPlaceholder": "Search name · race · element · role...",
      "hostLeft": "Host has left the game.",
      "hostLeftDesc": "Game ends in {n} seconds.",
      "tabDungeonDefense": "🛡 Dungeon Defense",
      "tabDungeonAttack": "⚔ Dungeon Attack",
      "tabRaid": "🐉 Raid",
      "infiniteFloor": "Infinite Floor (1000)",
      "partySetup": "⚔ Party Setup",
      "partySelectHint": "Click card to select/deselect",
      "partySearchPlaceholder": "Search by name, race, element, role... (e.g. Fire, Skeleton, Tank)",
      "dragHint": "✋ Drag heroes to adjust starting positions",
      "wallLabel": "Defense Wall",
      "autoTurret": "Auto Turret",
      "wall2Label": "2nd Defense Wall",
      "wall3Label": "3rd Defense Wall",
      "showNormalMonsterNames": "Show Normal Monster Names",
      "damage": "Damage",
      "healing": "Healing",
      "damageTaken": "Dmg Taken",
      "shieldLabel": "Shield",
      "exitConfirmTitle": "Game In Progress",
      "exitConfirmDescInfinite": "You've reached Wave {{wave}}.\nSave progress and gold (+{{gold}}) before leaving?",
      "exitConfirmDescNormal": "Leaving now will cause you to lose\nall gold earned this game.\nAre you sure?",
      "continuePlay": "Continue Playing",
      "saveAndExit": "💾 Save & Exit",
      "justExit": "Just Exit",
      "exitGame": "Exit",
      "exitConfirmDescInfiniteFloor": "Currently on Floor {{floor}}.\nSave progress and gold (+{{gold}}) before leaving?",
      "exitConfirmDescInfiniteNav": "Infinite mode in progress.\nSave progress and gold before leaving?",
      "exitConfirmDescTabSwitch": "Switching tabs will end the current game\nand you'll lose all earned gold.",
      "switchTab": "Switch Tab",
      "exitConfirmNavBlocked": "Cannot navigate while game is in progress",
      "exitConfirmTabBlocked": "Cannot switch tabs while game is in progress",
      "startWave": "Start Wave",
      "fromStart": "From Start",
      "waveUnit": "Wave",
      "bestRecord": "Best: Wave {{n}}",
      "heroSelected": "✓ Selected",
      "moreNeeded": "{n} more needed",
      "raidStart": "Raid Start ({cur}/{max})",
      "startFromWave": "Start from Wave {n}",
      "raidModeTitle": "🐉 Raid Mode",
      "raidStageModeShort": "📋 Stage",
      "raidInfiniteModeShort": "♾ Infinite",
      "raidStageInfo": "Stage {n} — {boss}",
      "raidIronSkinLabel": "[Iron Skin: all dmg → 1]",
      "raidCleaveLabel": "[Cleave]",
      "raidCcImmuneLabel": "[CC Immune]",
      "raidEnrageLabel": "[Enrage: 30%]",
      "raidInfiniteSimpleDesc": "Raid bosses appear in sequence in infinite mode. Set wave count and difficulty below.",
      "raidStageMode": "⚔️ Stage",
      "raidInfiniteMode": "♾️ Infinite Mode",
      "raidInfiniteDesc": "♾️ {bold}Infinite Mode{/bold}: Select a wave count below and start to run the full raid schedule endlessly.",
      "raidBestWave": "Best Record: Wave {n}",
      "raidSimultaneous": "{n} simultaneous",
      "raidClearBadge": "✓ Cleared",
      "raidStageClear": "🏆 Stage {{n}} Clear! {{boss}}",
      "raidAttackCycle": "Cycle",
      "raidEscort": "Escort: {name} ×{count}",
      "raidNoEscort": "Escort: None",
      "raidIronSkinBad": "Heavy-hit heroes — large damage capped at 1",
      "raidIronSkinGood1": "Multi-hit (Ranged·CC) — 1×N stacks",
      "raidIronSkinGood2": "Healer required — heavy hit recovered every {n}s",
      "raidMyParty": "My Hero Lineup",
      "raidPartyHint": "Click to select/deselect · Max 5",
      "raidPartyCount": "Party: {me} my heroes + 5 AI heroes = {total} total",
      "raidPartyCountRaid": "Raid: {me} my heroes + 15 AI heroes = {total} total",
      "affixIronSkin": "Iron Skin",
      "affixCcImmune": "CC Immune",
      "affixCleave": "Frontal Cleave",
      "affixEnrage": "Enrage",
      "affixHealAura": "Self-Heal",
      "affixSummon": "Summon",
      "affixAoeSlam": "AoE Slam",
      "bosses": {
        "void_colossus": {
          "name": "Void Colossus",
          "escort": "Void Shard"
        },
        "stone_titan": {
          "name": "Stone Titan"
        },
        "bomb_master_jack": {
          "name": "Bomb Master Jack",
          "escort": "Elite Bomber"
        },
        "sun_priest": {
          "name": "Sun Priest"
        },
        "moon_warrior": {
          "name": "Moon Warrior"
        },
        "broodmother_zagg": {
          "name": "Legion Leader Zagg",
          "escort": "Shadow Larva"
        },
        "chunsal_magisa": {
          "name": "Magisa the Thousand Slayer"
        },
        "soul_guide_gardu": {
          "name": "Soul Guide Gardu",
          "escort": "Lost Soul"
        },
        "commander_lombardo": {
          "name": "Commander Lombardo",
          "escort": "Shadow Assassin"
        },
        "molten_overlord": {
          "name": "Molten Overlord",
          "escort": "Flame Elemental"
        },
        "frost_titan": {
          "name": "Frost Titan",
          "escort": "Ice Elemental"
        },
        "void_ancient": {
          "name": "Void Ancient",
          "escort": "Void Elemental"
        },
        "storm_god": {
          "name": "Storm God",
          "escort": "Lightning Elemental"
        },
        "death_harbinger": {
          "name": "Death Harbinger",
          "escort": "Skeletal Archer"
        },
        "plague_giant": {
          "name": "Plague Giant",
          "escort": "Plague Mage"
        },
        "glacial_queen": {
          "name": "Glacial Queen",
          "escort": "Frost Elemental"
        },
        "earth_crusher": {
          "name": "Earth Crusher",
          "escort": "Stone Golem"
        },
        "thunder_overlord": {
          "name": "Thunder Overlord",
          "escort": "Storm Elemental"
        },
        "flame_drake": {
          "name": "Flame Drake",
          "escort": "Lava Elemental"
        },
        "abyssal_dragon": {
          "name": "Abyssal Dragon",
          "escort": "Void Stalker"
        },
        "void_sovereign": {
          "name": "Void Sovereign",
          "escort": "Abyssal Horror"
        }
      }
    },
    "aiGame": {
      "title": "AI Opponent Mode",
      "subtitle": "Compete against an AI-optimized party!",
      "tabAiParty": "👥 AI Party (10P)",
      "tabAiRaid": "⚔️ AI Raid (20P)",
      "tabMercenary": "🛡️ Mercenaries",
      "tabPvp": "🏆 PvP (Coming Soon)",
      "startBoth": "Start Both",
      "yourScore": "YOUR SCORE",
      "aiScore": "AI SCORE",
      "wave": "Wave",
      "youWin": "YOU WIN!",
      "aiWins": "AI WINS!",
      "yourParty": "Your Party",
      "aiParty": "AI Party",
      "aiStrategy": "AI Strategy",
      "upgradeConfirm": "Upgrade {name} to {star}★?\\nCost: {cost}G",
      "ownedGold": "Owned Gold",
      "tabDescParty": "10P Co-op",
      "tabDescRaid": "20P Co-op",
      "tabDescFactions": "AI Training",
      "tabDescPvp": "AI Battle",
      "mercenaryTitle": "🛡️ AI Mercenary System",
      "mercenaryDesc": "Fully conquer a region in Offense mode to unlock its mercenary company. Invest gold to raise the star rating and make your AI companions stronger!",
      "factionRace": "Race: {race}",
      "factionUnlockTitle": "Unlock Condition",
      "factionUnlockDesc": "Clear all Normal stages in [{region}]",
      "factionStatMult": "Stat Multiplier",
      "factionBonusDef": "Bonus Defense",
      "factionUpgrade": "Upgrade {star}★ → {star2}★",
      "factionUpgradeLocked": "🔐 Unlocks after Elite clear",
      "factionMaxed": "✨ Max Upgrade Reached ✨",
      "ai1000Title": "AI Co-op 1000F Complete!",
      "ai1000Subtitle": "God of Strategy",
      "ai1000HeroName": "AI Hero",
      "ai1000HeroRace": "Mechanical · Lightning",
      "ai1000Skills": "All skills equippable + all classes selectable",
      "ai1000Buff": "+ Party-wide attack speed up to +30%",
      "ai1000Flavor": "For conquering 1000 floors of waves alongside AI,",
      "ai1000Joined": "[AI Hero] has joined your party!",
      "raid1000Title": "AI Raid Infinite 1000F Complete!",
      "raid1000Subtitle": "Legendary Raider",
      "raid1000HeroName": "Raid Hero",
      "raid1000HeroRace": "Elf · Holy",
      "raid1000Buff": "+ Up to 80% bonus damage to bosses/elites",
      "raid1000Flavor": "For conquering 1000 floors of the infinite raid,",
      "raid1000Joined": "[Raid Hero] has joined your party!",
      "pvpTitle": "PvP AI Battle",
      "pvpDesc": "Compete against an AI party on the same waves for the highest score.\\nComing soon.",
      "partyScaleParty": "(2P Co-op scale)",
      "partyScaleRaid": "(4P Co-op, boss-only raid)",
      "infinitePartyLabel": "∞ AI Party",
      "infiniteRaidLabel": "∞ AI Raid",
      "infinitePartyWarning": "⚠ AI Party Infinite: enemies are 2.5× stronger than normal infinite",
      "infiniteRaidWarning": "⚠ AI Raid Infinite: face bosses directly, no wall. 2.5× stronger enemies",
      "resumeHint": "(Can resume from Wave {n})",
      "companionSelect": "AI Companion",
      "companionSelectParty": "AI Companion (Party {n})",
      "startPartyBtn": "⚔️ Start AI Party",
      "startRaidBtn": "🐉 Start AI Raid",
      "scoreLabel": "Score",
      "goldLabel": "Gold",
      "deathMsg": "💀 Challenge ended at Wave {n}",
      "waveN": "Wave {{n}}",
      "saveProgress": "💾 Save Progress",
      "confirm": "Confirm",
      "factions": {
        "goblin": "Goblin Trade Consortium",
        "orc": "Horde Legion",
        "tauren": "Tauren Tribe",
        "elf": "Shadow Elves",
        "undead": "Undead Scourge",
        "troll": "Troll Voodoo Band",
        "human": "Human Mercenaries"
      },
      "strategies": {
        "orcBlaze": "Orc Blaze (HP + ATK Synergy)",
        "humanElite": "Human Elite (ATK Synergy)"
      },
      "roleTitle": {
        "tank": "Guardian",
        "healer": "Healer",
        "other": "Hero"
      }
    },
    "offense": {
      "title": "Dungeon Offense",
      "desc": "Defeat the defenders and break the enemy wall!",
      "defenseTab": "🛡 Defense",
      "offenseTab": "⚔ Offense",
      "startBtn": "Start Attack!",
      "selectStage": "Select Stage",
      "normal": "Normal",
      "elite": "Elite",
      "eliteDesc": "More defenders · Buffed stats",
      "partyTitle": "⚔ Attack Party Setup",
      "searchPlaceholder": "Name",
      "enemyWall": "🏰 Enemy Dungeon Wall",
      "defeat": "Defeated...",
      "defeatDesc": "Failed to break through the defenders.",
      "stageInfo": "Stage {id} — {name}",
      "stageClear": "Stage {id} Clear!",
      "retryHint": "Strengthen your party and try again!",
      "autoReturn": "Returning to main screen in {n} seconds...",
      "landClearMsg": "Congratulations! You defeated all defenders in the land and recruited [{name}].",
      "rewardTitle": "New Hero Joins",
      "confirm": "Confirm",
      "tabNormal": "📍 Land Attack",
      "tabInfinite": "⚔️ 100F Challenge",
      "mastered": "Mastered",
      "sectorReward": "Sector Reward: {gold}G + {crystals}💎",
      "sectorProgress": "Progress: {n} / {total} Lands",
      "unknownRegion": "Unknown Region",
      "infiniteTitle": "⚔️ Infinite Dungeon",
      "milestone": "⭐ Milestone",
      "bestFloor": "Best: Floor {n}",
      "bestFloorShort": "Best {n}F",
      "infiniteDesc": "Conquer the endless dungeon. Defenders grow stronger each floor. Defeat ends the run.",
      "startFloor": "Start Floor:",
      "floorSuffix": "F",
      "maxFloorHint": "Up to Floor {n} available",
      "autoNextStage": "Auto Next Stage",
      "infiniteChallenge": "⚔️ Floor {n} Challenge!",
      "offenseDragHint": "✋ Drag heroes to set start positions — Enemy defenders are on the right side",
      "floorClear": "Floor {n} Clear!",
      "infiniteAutoNext": "Auto-advancing to Floor {next} in {n}s...",
      "continueNow": "Continue Now",
      "quit": "Quit",
      "floorGameOver": "Challenge Ended at Floor {n}",
      "checkpointContinue": "Continue from Checkpoint",
      "fromFloor1": "From Floor 1",
      "nextStage": "⚔️ Next Stage",
      "nextLand": "🗺️ Select Next Land",
      "retry": "Retry",
      "toMain": "Main Menu",
      "partySelectHint": "Click to select/deselect",
      "stageOutskirts": "Outskirts Zone {n}",
      "stageInner": "Inner Sanctum",
      "stageNormalDesc": "{region}'s defenders have taken position.",
      "stageBossDesc": "The boss of this land stands firm. Prepare for the final battle!",
      "hiddenRangedGimmick": "🔮 Ranged Stealth Gimmick",
      "hiddenRangedDesc": "⚠️ Destroying the wall reveals 🔮 hidden defenders. Defeat them all to win!",
      "eliteLeader": "Leader",
      "eliteSoldier": "Elite Soldier",
      "defenderCount": "{n} Defenders",
      "infiniteFloorName": "Floor {n}",
      "infiniteMilestoneName": "Deep Floor {n}",
      "infiniteNormalDesc": "Deep in the darkness of {region}. The defenders have been reinforced.",
      "infiniteMilestoneDesc": "The powerful guardians of {region} protect this deep dungeon!",
      "offense1000Badge": "Dungeon Assault: Floor 1000 Clear!",
      "offense1000Title": "Indomitable Attacker",
      "offense1000HeroDesc": "Maximum Attack Power + Spear of Independence Passive",
      "offense1000HeroDescBold": "ATK increases by up to 30% as allies fall",
      "offense1000JoinMsg": "For conquering all 1000 floors of the Infinite Dungeon, {name} has joined your side!",
      "offense1000Confirm": "Confirm",
      "sectors": {
        "sector_1": {
          "name": "Zone 1: Land of Savagery and Honor",
          "description": "Territory of warriors who survived the harsh wilderness."
        },
        "sector_2": {
          "name": "Zone 2: Source of Twisted Arcane Power",
          "description": "A place where powerful and dangerous magical forces swirl."
        },
        "sector_3": {
          "name": "Zone 3: Legacy of Death and Decay",
          "description": "Cities that once thrived, now left with nothing but death."
        },
        "sector_4": {
          "name": "Zone 4: Sanctuary of Transcendent Elements",
          "description": "A mysterious natural realm unreachable by mortal feet."
        },
        "sector_5": {
          "name": "Zone 5: The Final Rift and Aspects",
          "description": "The end of the world, the last gate guarded by the mightiest beings."
        }
      },
      "regions": {
        "goblin": {
          "name": "Goblin Territory",
          "desc": "Forests and mines hiding greedy goblins.",
          "reward": "LR Hero: Goblin Warchief"
        },
        "orc": {
          "name": "Orc Barren Wastelands",
          "desc": "Lands of orc warriors who survived the harsh terrain.",
          "reward": "LR Hero: Orc Blademaster"
        },
        "tauren": {
          "name": "Tauren Red Peaks",
          "desc": "Rugged mountain ranges where giant tauren protect nature.",
          "reward": "LR Hero: Bloodmane Chieftain"
        },
        "darkelf": {
          "name": "Dark Elf Shadow Forest",
          "desc": "Dark territory of dark elves skilled in stealth and ambush.",
          "reward": "LR Hero: Shadow Lord"
        },
        "fire": {
          "name": "Land of Flame",
          "desc": "A place dominated by boiling lava and fire elementals.",
          "reward": "LR Hero: Flame Ashborn"
        },
        "ice": {
          "name": "Ice Kingdom",
          "desc": "A frozen land at its extreme. Stronghold of ice mages.",
          "reward": "LR Hero: Frostflake Queen"
        },
        "undead": {
          "name": "Undead Forsaken City",
          "desc": "An ancient ruined city plagued by disease and death.",
          "reward": "LR Hero: Death Knight"
        },
        "poison": {
          "name": "Venomous Swamplands",
          "desc": "A swamp crawling with beasts carrying lethal poison.",
          "reward": "LR Hero: Venommancer"
        },
        "mercenary": {
          "name": "Chaotic Mercenary Camp",
          "desc": "Gathering place of elite outlaws from countless races.",
          "reward": "LR Hero: Merc King"
        },
        "elemental": {
          "name": "Elemental Sanctuary",
          "desc": "A sacred ground where the four great elementals converge.",
          "reward": "LR Hero: Elemental Scholar"
        },
        "sea": {
          "name": "Deep Sea Temple",
          "desc": "Temple of ancient guardians slumbering in the ocean depths.",
          "reward": "LR Hero: Deep Sea Ruler"
        },
        "sky": {
          "name": "Celestial Fortress",
          "desc": "A sacred fortress of angels floating above the clouds.",
          "reward": "LR Hero: Archangel"
        },
        "demon": {
          "name": "Demonic Rift",
          "desc": "A rift where demon legions pour out as dimensions tear apart.",
          "reward": "LR Hero: Demon Lord of Ruin"
        },
        "dragon": {
          "name": "Dragon Tower",
          "desc": "A towering structure where dragons, the apex of all life, nest.",
          "reward": "LR Hero: Ancient Dragon Aspect"
        }
      }
    },
    "monsterTiers": {
      "초급": "Basic",
      "중급": "Intermediate",
      "고급": "Advanced",
      "최강": "Legendary"
    },
    "monsterTypes": {
      "normal": "Normal",
      "elite": "Elite",
      "boss": "Boss"
    },
    "monsterBook": {
      "title": "Monster Codex",
      "subtitle": "Defeat monsters to unlock their entries",
      "discovered": "Monsters Discovered",
      "searchPlaceholder": "Search unlocked monsters...",
      "emptyTitle": "No monsters discovered yet.",
      "emptyDesc": "Defeat monsters in-game to unlock the codex!",
      "unlocked": "Unlocked",
      "wavePrefix": "Wave",
      "attackType": "Type",
      "ranged": "Ranged",
      "melee": "Melee",
      "tacticalTip": "Tactical Tip"
    },
    "monsterCategories": {
      "all": "All",
      "goblin": "Goblin",
      "boss": "Boss",
      "beast": "Beast",
      "orc": "Orc/Troll",
      "elemental": "Elemental",
      "dark": "Dark/Void",
      "giant": "Undead Giant",
      "skeleton": "Skeleton/Undead",
      "golem": "Golem"
    },
    "heroesPage": {
      "tabHeroes": "⚔️ Hero Setup",
      "tabMonsterBook": "📖 Monster Codex",
      "goldLabel": "Gold:",
      "goldLoading": "Loading...",
      "bulkUpgrade": "⚡ Bulk Upgrade All",
      "heroList": "Hero List",
      "heroCount": "{{n}}",
      "heroSubtitle": "Choose Routes · Evolving Skills · Skill Combos · Protagonist Slots = Stars",
      "defaultHeroName": "Hero",
      "searchPlaceholder": "Hero, Race (Orc)...",
      "filterAll": "All",
      "noHeroFound": "No hero found",
      "recruitHint": "Recruit heroes from the shop!",
      "starLabel": "Star",
      "starN": "★{{n}}",
      "slot": "Slot",
      "unique": "UNQ",
      "passive": "Passive",
      "routeLabel": "{{name}} Route",
      "routeActive": "Active",
      "activateRoute": "Activate Route",
      "uniqueLabel": "Unique: {{name}}",
      "uniquePreview": "Unique skill on activation →",
      "otherRoute": "On other route:",
      "unsealedTitle": "Legendary Unified Unique Skill",
      "unsealedSub": "All specialization unique effects are active simultaneously.",
      "passiveSub": "Auto-transforms on route change · Value scales with star rating",
      "maxStar": "★★★★★ Max Star Reached!",
      "maxUniquePassive": "Unique Passive Maxed",
      "baseStats": "Base Stats",
      "maxStatBonus": "Base Stats +25%",
      "starBonusLabel": "Star Bonus",
      "starUpgradeTitle": "Star Upgrade",
      "starCostLabels": [
        "1→2★",
        "2→3★",
        "3→4★",
        "4→5★"
      ],
      "upgradeBtn": "Upgrade",
      "goldShort": "Not Enough Gold",
      "upgradeEffect": "Upgrade Effect:",
      "statBonus": "Base Stats +{{delta}}%",
      "uniquePassiveUp": "Unique Passive Value Increases",
      "summonStats": "Summon Stats",
      "duration": "Duration {{n}}s",
      "range": "Range {{n}}px",
      "sharedBadge": "Shared",
      "finalBadge": "Final",
      "summonBadge": "Summon",
      "equippedBadge": "Equipped",
      "ownedBadge": "Owned",
      "skillSharedIcon": "S",
      "skillUniqueIcon": "U",
      "finalLocked": "⚠ You must purchase the other 3 skills in this route first.",
      "purchased": "✓ Purchased",
      "buyBtn": "Buy",
      "unequipBtn": "Remove",
      "equipBtn": "Equip",
      "equippedSkills": "Equipped Skills",
      "clickToUnequip": "Click to remove",
      "emptySlot": "Empty Slot",
      "slotsCount": "{{n}} / {{max}} Slots",
      "availableSkills": "Available Skills",
      "unlockedCount": "{{n}} unlocked",
      "autoAddHint": "Auto-added when hero skills are unlocked",
      "noSkillsYet": "No skills unlocked yet.",
      "noSkillsDesc": "Purchase skills from other heroes to make them available here for your protagonist.",
      "heroesUnlocked": "{{n}} unlocked",
      "protagonistBadge": "Protagonist",
      "allrounderBadge": "All-rounder",
      "inGameRole": "In-Game Role",
      "unlockRoleHint": "Unlock for 300G",
      "lockedRoleHint": "Locked roles can be unlocked with gold",
      "containerTitle": "Hero's Vessel",
      "containerDesc": "Base: Star Rating ({{base}}) + Bonus: Heroes Owned ({{bonus}})",
      "containerBody": "Skills unlocked from other heroes are automatically registered in the protagonist's slots. The higher the star rating, and every 10 heroes owned, the more skill slots increase.",
      "protagonistHelp": "💡 Hero's Vessel — Skill slots increase as star rating rises (1★=1 slot ~ 5★=5 slots). Purchase skills from other heroes to make them usable by the protagonist. Set the in-game role from the Role Selection above.",
      "aiBadge": "AI Hero",
      "aiReward": "AI Co-op Floor 1000 Reward",
      "aiAura": "Tactical Command Aura",
      "aiAuraDesc": "All stats +{{n}}% boost",
      "roleSelect": "Role Select",
      "equipSkillTitle": "Equip Skills",
      "equipSkillHint": "Can equip purchased hero skills",
      "buySkillHint": "Purchase hero skills to display them here.",
      "offenseBadge": "Attack Hero",
      "offenseReward": "Dungeon Attack Floor 1000 Reward",
      "offenseAura": "Spear of Resolve",
      "offenseAuraDesc": "ATK +{{n}}% boost",
      "raidBadge": "Raid Hero",
      "raidReward": "AI Raid Floor 1000 Reward",
      "raidAura": "Boss Hunter",
      "raidAuraDesc": "Boss damage +{{n}}% boost",
      "defenseBadge": "Defense Hero",
      "defenseReward": "Infinite Dungeon Floor 1000 Reward",
      "traitAbsorb": "Trait Absorption",
      "traitMaxHint": "Max {{n}} selections at current star rating",
      "traitBuyHint": "Purchase skills from other heroes to display unique traits.",
      "defenseHelp": "💡 Trait Absorption — Absorb unique traits from other heroes to gain powerful passives. The higher the star rating, the more traits can be absorbed (1~2★=1, 3~4★=2, 5★=3). Skill equipping works the same as the regular protagonist.",
      "arHeroBanner": "Achievement Hero",
      "arHeroDesc": "Equipping 5 {{race}} heroes activates the Tier 5 racial synergy. Without this hero, the Tier 5 synergy cannot activate.",
      "unsealBtn": "🔓 Unseal",
      "unsealEffect": "Skill Slot Expansion",
      "unsealEffectDual": "All passive traits applied simultaneously + Skill slot expansion",
      "unsealCost": "Unseal for {{n}}G",
      "unsealDone": "✨ Hero Unsealed ✨",
      "unsealDoneDesc": "All route passives are now active simultaneously and skill slots have been expanded.",
      "heroHelp": "💡 Activate Route → Unique skill transforms automatically. Choose skills freely from both routes (max {{max}}). 🔒 Final skills require purchasing the other 3 skills in the same route. ⚡ Synergy notes show interactions with unique skills. Gold is auto-saved after gameplay.",
      "toastLoadFail": "Failed to load data.",
      "toastGoldShort": "Not enough gold!",
      "toastGoldFail": "Gold deduction failed. Please try again.",
      "toastGoldFailShort": "Gold deduction failed.",
      "toastStarUp": "{{name}} reached ★{{n}}! ({{cost}}G spent)",
      "toastProtoStarUp": "{{name}} reached ★{{n}}! {{n}} slots unlocked! ({{cost}}G spent)",
      "toastSkillBuy": "[{{name}}] purchased! ({{cost}}G spent)",
      "toastSkillMax": "You can only equip up to {{max}} skills.",
      "toastSlotShort": "Not enough slots! Increase star rating or own more heroes.",
      "toastSlotShort2": "Not enough slots.",
      "toastEquipShort": "Not enough equip slots.",
      "toastRoleUnlock": "{{role}} role unlocked!",
      "toastUnseal": "✨ Hero Unseal Complete! All passives acquired and slots expanded! ✨",
      "toastBulkDone": "Bulk upgrade complete! ({{cost}}G spent)",
      "toastBulkFail": "Nothing to upgrade or not enough gold.",
      "toastTraitMax": "You can only select up to {{max}} traits."
    },
    "heroes": {
      "protagonist": {
        "lore": "The legendary hero recorded in the prophecy. Absorbs the powers of other heroes to grow infinitely.",
        "name": "Hero",
        "routes": {
          "protagonist_all": {
            "name": "All-rounder",
            "variantDesc": "Equip up to {value} slots of skills unlocked by other heroes.",
            "variantName": "Hero's Vessel"
          }
        }
      },
      "anub": {
        "lore": "The Crypt Lord.",
        "name": "Anub",
        "routes": {
          "protection": {
            "name": "Protection",
            "variantDesc": "Reflects {value}% of damage when hit.",
            "variantName": "Spiked Carapace"
          }
        },
        "skills": {
          "carrion_beetles": {
            "desc": "Summons beetles and restores health.",
            "name": "Carrion Beetles"
          },
          "impale": {
            "desc": "Stun",
            "name": "Impale"
          },
          "iron_carapace": {
            "desc": "Reduces damage taken by 25%.",
            "name": "Iron Carapace"
          },
          "locust_swarm": {
            "desc": "AoE Life Steal.",
            "name": "Locust Swarm"
          },
          "underground_assault": {
            "desc": "Deals ATK×5 AoE damage and stuns.",
            "name": "Underground Assault"
          }
        }
      },
      "ar_gorg": {
        "lore": "The legendary Orc Warchief. All Orc clans unite under his name. A single roar shakes the battlefield.",
        "name": "Gorg Ironfist",
        "routes": {
          "farseer": {
            "name": "Spirit Warrior",
            "variantDesc": "When healing",
            "variantName": "Earth Spirit"
          },
          "tank": {
            "name": "Iron Shield",
            "variantDesc": "Reduces damage taken by {value}%.",
            "variantName": "Indomitable Orc"
          },
          "warchief": {
            "name": "Warchief",
            "variantDesc": "When killing an enemy",
            "variantName": "Will of the Warchief"
          }
        },
        "skills": {
          "avatar": {
            "desc": "Passive: Increases ATK by 50% and Life Steal by 20% when HP is below 40%.",
            "name": "Avatar"
          },
          "bladestorm": {
            "desc": "Deals ATK×6 damage to all enemies within 130px with a whirlwind attack.",
            "name": "Bladestorm"
          },
          "chain_lightning": {
            "desc": "Deals ATK×4 chain damage to up to 3 enemies.",
            "name": "Chain Lightning"
          },
          "deathwish": {
            "desc": "Passive: Grants a +25% ATK aura to all Orc allies.",
            "name": "Death Wish"
          },
          "demoralizing_shout": {
            "desc": "Reduces the ATK of nearby enemies by 30%.",
            "name": "Demoralizing Shout"
          },
          "earthquake": {
            "desc": "Slows all enemies for 4s and deals ATK×3 AoE damage.",
            "name": "Earthquake"
          },
          "healing_rain": {
            "desc": "Heals all allies for ATK×4.",
            "name": "Healing Rain"
          },
          "intervene": {
            "desc": "Takes damage on behalf of an ally.",
            "name": "Intervene"
          },
          "last_stand": {
            "desc": "Increases Max HP by 50% for 15s.",
            "name": "Last Stand"
          },
          "lava_burst": {
            "desc": "Deals ATK×8 fire damage to a single target.",
            "name": "Lava Burst"
          },
          "mortal_strike": {
            "desc": "A powerful strike dealing ATK×10 damage + 20% Life Steal.",
            "name": "Colossus Smash"
          },
          "shield_slam": {
            "desc": "Knocks back the enemy and stuns for 2s.",
            "name": "Shield Slam"
          },
          "shield_wall": {
            "desc": "Increases Defense to near-invincibility for 10s.",
            "name": "Shield Wall"
          },
          "spirit_walk": {
            "desc": "Teleports to an ally in danger and grants a shield.",
            "name": "Spirit Walk"
          },
          "war_stomp": {
            "desc": "Stuns nearby enemies within 150px for 2.5s and deals ATK×4 damage.",
            "name": "War Stomp"
          }
        }
      },
      "ar_jarlten": {
        "lore": "An ancient hero resurrected as an undead overlord after death. As the commander of all undead allies, his mere presence awakens the undead legion.",
        "name": "Jarlten",
        "routes": {
          "fearlord": {
            "name": "Dreadlord",
            "variantDesc": "When attacking",
            "variantName": "Lord of Terror"
          },
          "necromancy": {
            "name": "Necromancy",
            "variantDesc": "When attacking",
            "variantName": "Soul Devour"
          },
          "overlord": {
            "name": "Overlord",
            "variantDesc": "When hit",
            "variantName": "Will of Death"
          }
        },
        "skills": {
          "am_shell": {
            "desc": "Nullifies all magic damage for 5s.",
            "name": "Anti-Magic Shell"
          },
          "army_of_dead": {
            "desc": "Summons an enhanced undead army.",
            "name": "Army of the Dead"
          },
          "banshee_wail": {
            "desc": "Stuns nearby enemies within 180px for 3s.",
            "name": "Banshee's Wail"
          },
          "corpse_nova": {
            "desc": "Deals ATK×5 explosion damage within 120px around the target.",
            "name": "Corpse Explosion"
          },
          "corruption": {
            "desc": "Deals continuous shadow damage for 10s.",
            "name": "Corruption"
          },
          "death_and_decay": {
            "desc": "Creates an area at the target location that deals continuous AoE damage.",
            "name": "Death and Decay"
          },
          "death_coil": {
            "desc": "Deals ATK×6 shadow damage + 50% Life Steal to a single target.",
            "name": "Death Coil"
          },
          "deathmark": {
            "desc": "Increases damage taken by all enemies by 20% for 10s.",
            "name": "Death Mark"
          },
          "raise_dead": {
            "desc": "Immediately resurrects one fallen ally with 50% HP.",
            "name": "Raise Dead"
          },
          "raise_skeleton": {
            "desc": "Summons 2 Skeleton Warriors.",
            "name": "Raise Skeleton"
          },
          "shadow_bolt": {
            "desc": "Deals ATK×4 shadow damage to a single target.",
            "name": "Shadow Bolt"
          },
          "sleep": {
            "desc": "Puts one enemy to sleep for 8s.",
            "name": "Sleep"
          },
          "soulfire": {
            "desc": "Burns the enemy's soul to deal powerful shadow damage.",
            "name": "Soulfire"
          },
          "spectral_summon": {
            "desc": "Summons a specter (20s",
            "name": "Spectral Summon"
          },
          "undead_aura": {
            "desc": "Passive: Permanently increases ATK by 25% and HP by 20%.",
            "name": "Overlord's Aura"
          }
        },
        "summons": {
          "army": {
            "name": "Undead Legion"
          },
          "skeleton": {
            "name": "Skeleton Warrior"
          },
          "spectral": {
            "name": "Dread Specter"
          }
        }
      },
      "ar_kargath": {
        "lore": "Legendary leader of the Shattered Hand clan. He cut off his own hand and attached a blade to stain the battlefield with blood.",
        "name": "Kargath",
        "routes": {
          "berserk": {
            "name": "Berserker",
            "variantDesc": "When attacking",
            "variantName": "Relentless Force"
          },
          "blade": {
            "name": "Bladehand",
            "variantDesc": "When attacking",
            "variantName": "Blade of the Shattered Hand"
          }
        },
        "skills": {
          "avatar": {
            "desc": "Giant Form for 20s: 3x Attack Power",
            "name": "Avatar"
          },
          "blade_sweep": {
            "desc": "Deals ATK x 5 damage to all enemies in a frontal cone.",
            "name": "Blade Sweep"
          },
          "bloodthirst": {
            "desc": "Attack Power Increase 10% on kill (infinite stacks).",
            "name": "Bloodthirst"
          },
          "furious_attack": {
            "desc": "Attack Speed Increase 200% for 10s.",
            "name": "Furious Attack"
          },
          "impale": {
            "desc": "Deals ATK x 8 damage and stuns for 3s.",
            "name": "Impale"
          },
          "massacre": {
            "desc": "Deals ATK x 15 damage to all enemies and Instant Kill for enemies below 30% HP.",
            "name": "Massacre"
          },
          "mortal_strike": {
            "desc": "Permanently reduces enemy Defense by 50% and deals ATK x 12 damage.",
            "name": "Mortal Strike"
          },
          "recklessness": {
            "desc": "Damage taken Increase 20% Increase",
            "name": "Recklessness"
          },
          "slam": {
            "desc": "A powerful single strike dealing ATK x 10 damage.",
            "name": "Slam"
          },
          "whirlwind": {
            "desc": "Deals ATK x 3 damage every second to all nearby enemies (5s).",
            "name": "Whirlwind"
          }
        }
      },
      "ar_lian": {
        "lore": "The first blood knight who converted the power of the Sunwell into vitality. Burns her own blood to hold the front line for her allies.",
        "name": "Lian",
        "routes": {
          "blood": {
            "name": "Blood",
            "variantDesc": "When hit",
            "variantName": "Red Thirst"
          },
          "retri": {
            "name": "Retribution",
            "variantDesc": "When attacking",
            "variantName": "Holy Vengeance"
          }
        },
        "skills": {
          "avenging_wrath": {
            "desc": "Invincible for 20s + all attacks become AoE Holy explosions.",
            "name": "Avenging Wrath"
          },
          "blade_justice": {
            "desc": "Deals ATK x 5 Holy damage to 3 enemies.",
            "name": "Blade of Justice"
          },
          "blood_boil": {
            "desc": "Deals ATK x 4 damage to all nearby enemies and causes Bleed for 5s.",
            "name": "Blood Boil"
          },
          "blood_strike": {
            "desc": "Deals ATK x 5 damage and 20% Life Steal to a single target.",
            "name": "Blood Strike"
          },
          "crusader_strike": {
            "desc": "Deals ATK x 6 Holy damage to a single target.",
            "name": "Crusader Strike"
          },
          "dancing_weapon": {
            "desc": "Summons a Rune Weapon: All allies gain 50% Defense Increase and Invincible for 5s.",
            "name": "Dancing Rune Weapon"
          },
          "death_bond": {
            "desc": "Binds with an ally to share 50% of incoming damage.",
            "name": "Death Bond"
          },
          "divine_storm": {
            "desc": "Deals ATK x 5 AoE damage and heals allies.",
            "name": "Divine Storm"
          },
          "fanaticism": {
            "desc": "Attack Power Increase 50% and doubles Attack Speed for 15s.",
            "name": "Fanaticism"
          },
          "rune_tap": {
            "desc": "Generates a 20% Max HP Shield and adds +40 Defense.",
            "name": "Rune Tap"
          }
        }
      },
      "ar_maharuuk": {
        "lore": "Direct successor to the Earthmother. Strengthens the defense line and heals allies with the earth magic of the Tauren tribe.",
        "name": "Maharuuk",
        "routes": {
          "earthguard": {
            "name": "Earthguardian",
            "variantDesc": "When hit",
            "variantName": "Earth Shield"
          },
          "stormcaller": {
            "name": "Stormcaller",
            "variantDesc": "When healing",
            "variantName": "Spirit Teachings"
          },
          "sunwalker": {
            "name": "Sunwalker",
            "variantDesc": "When attacking",
            "variantName": "Sun's Radiance"
          }
        },
        "skills": {
          "ancestral_spirit": {
            "desc": "Resurrects one fallen ally with 50% HP.",
            "name": "Ancestral Spirit"
          },
          "avatar_earth": {
            "desc": "40% Damage reduction and Reflects damage for 15s.",
            "name": "Earth Avatar"
          },
          "avenging_wrath": {
            "desc": "Attack Power Increase 50% and makes all attacks AoE for 20s.",
            "name": "Avenging Wrath"
          },
          "bloodlust": {
            "desc": "Attack Speed Increase 60% for all allies for 15s.",
            "name": "Heroism"
          },
          "chain_heal": {
            "desc": "Heals the lowest HP ally for ATK x 5 and Chain heals for ATK x 2.",
            "name": "Chain Heal"
          },
          "crusader_strike": {
            "desc": "Deals ATK x 4 Holy damage to a single target.",
            "name": "Crusader Strike"
          },
          "earth_stomp": {
            "desc": "Stuns frontal 130px for 2s + deals ATK x 4 damage.",
            "name": "Earth Stomp"
          },
          "healing_rain": {
            "desc": "Heals all allies for ATK x 3 AoE.",
            "name": "Healing Rain"
          },
          "holy_light": {
            "desc": "Heals nearby allies for ATK x 3.",
            "name": "Holy Light"
          },
          "judgment": {
            "desc": "Deals ATK x 5 damage and Increases damage taken for the target.",
            "name": "Judgment"
          },
          "living_seed": {
            "desc": "Passive: Immediately restores 8% of own HP when hit.",
            "name": "Living Seed"
          },
          "riptide": {
            "desc": "Grants immediate heal + Continuous healing to the target.",
            "name": "Riptide"
          },
          "stone_bulwark": {
            "desc": "Adds +30 Defense to all allies and restores 10% HP.",
            "name": "Stone Bulwark"
          },
          "thorns": {
            "desc": "Grants 20% damage reflection to all allies.",
            "name": "Thorns"
          },
          "wrath": {
            "desc": "A powerful strike of light to all enemies in front.",
            "name": "Wrath"
          }
        }
      },
      "ar_valanos": {
        "lore": "The last blood mage who remembers the power of the Sunwell before its corruption. Strengthens allies by absorbing mana and annihilates enemies.",
        "name": "Valanos",
        "routes": {
          "bloodmage": {
            "name": "Blood Mage",
            "variantDesc": "When attacking",
            "variantName": "Mana Resonance"
          },
          "destro": {
            "name": "Destruction",
            "variantDesc": "When attacking",
            "variantName": "Ignite"
          },
          "manavampire": {
            "name": "Mana Vampire",
            "variantDesc": "When attacking",
            "variantName": "Mana Thirst"
          }
        },
        "skills": {
          "arcane_nova": {
            "desc": "Deals ATK x 5 Arcane explosion to all enemies.",
            "name": "Arcane Nova"
          },
          "arcane_torrent": {
            "desc": "Silences all enemies for 3s + deals ATK x 3 damage.",
            "name": "Arcane Torrent"
          },
          "blood_tap": {
            "desc": "Passive: Own Attack Power +40%",
            "name": "Blood Tap"
          },
          "chaos_bolt": {
            "desc": "A powerful ATK x 15 strike that ignores Defense.",
            "name": "Chaos Bolt"
          },
          "conflagrate": {
            "desc": "Explodes an immolated target for ATK x 6 damage.",
            "name": "Conflagrate"
          },
          "flame_pillar": {
            "desc": "Creates a massive Pillar of Fire at the target location for ATK x 8 damage.",
            "name": "Flame Pillar"
          },
          "flame_strike": {
            "desc": "ATK x 6 Fire explosion within 100px of target.",
            "name": "Flamestrike"
          },
          "immolate": {
            "desc": "Deals Continuous fire damage to the target for 15s.",
            "name": "Immolate"
          },
          "incinerate": {
            "desc": "Fires a flame arrow for ATK x 3.5 damage.",
            "name": "Incinerate"
          },
          "mana_burn": {
            "desc": "Deals ATK x 5 Arcane damage + 50% Life Steal to a single target.",
            "name": "Mana Burn"
          },
          "phoenix": {
            "desc": "Summon a Phoenix (30s",
            "name": "Summon Phoenix"
          },
          "polymorph": {
            "desc": "Polymorphs one enemy into a sheep for 8s.",
            "name": "Polymorph"
          },
          "rain_of_fire": {
            "desc": "Rains down fire at the target location.",
            "name": "Rain of Fire"
          },
          "sunwell_surge": {
            "desc": "Deals ATK x 8 damage to all enemies and heals all allies for ATK x 3.",
            "name": "Sunwell Surge"
          },
          "void_bolt": {
            "desc": "Deals ATK x 4 damage and reduces Attack Speed by 50% for 2s.",
            "name": "Void Bolt"
          }
        },
        "summons": {
          "phoenix": {
            "name": "Phoenix"
          }
        }
      },
      "arthur": {
        "lore": "Shield warrior of the Royal Guard.",
        "name": "Arthur",
        "routes": {
          "protection": {
            "name": "Protection",
            "variantDesc": "Reduces incoming physical damage by {value}%.",
            "variantName": "Shield Block"
          }
        },
        "skills": {
          "knights_oath": {
            "desc": "Adds +15 Defense to nearby allies.",
            "name": "Knight's Oath"
          },
          "last_stand": {
            "desc": "Large Shield for self + Small Shield for nearby allies.",
            "name": "Last Stand"
          },
          "shield_slam": {
            "desc": "Shield Slam.",
            "name": "Shield Slam"
          },
          "shield_wall": {
            "desc": "Shields for all allies + self Strengthening.",
            "name": "Shield Wall"
          }
        }
      },
      "baine": {
        "lore": "A warrior who receives the protection of the Earthmother.",
        "name": "Baine",
        "routes": {
          "arms": {
            "name": "Arms",
            "variantDesc": "Attack Power Increase {value}%.",
            "variantName": "Earth's Strength"
          }
        },
        "skills": {
          "avatar": {
            "desc": "Giant Form buff.",
            "name": "Avatar"
          },
          "slam": {
            "desc": "A powerful strike.",
            "name": "Slam"
          },
          "war_stomp": {
            "desc": "AoE Stun.",
            "name": "War Stomp"
          }
        }
      },
      "benedict": {
        "lore": "A human priest of faithful belief.",
        "name": "Benedict",
        "routes": {
          "holy": {
            "name": "Holy",
            "variantDesc": "Heal amount Increase {value}%.",
            "variantName": "Holy Healing"
          }
        },
        "skills": {
          "guardian_spirit": {
            "desc": "10s Continuous healing + Heal amplification for an ally.",
            "name": "Guardian Spirit"
          },
          "heal": {
            "desc": "Single target Heal.",
            "name": "Heal"
          },
          "holy_word_serenity": {
            "desc": "Massive Heal.",
            "name": "Holy Word: Serenity"
          },
          "renew": {
            "desc": "Single target Continuous healing.",
            "name": "Renew"
          }
        }
      },
      "chen": {
        "lore": "A legendary brewmaster.",
        "name": "Chen",
        "routes": {
          "brewmaster": {
            "name": "Brewmaster",
            "variantDesc": "Evasion rate Increase {value}%.",
            "variantName": "Elusive Brawler"
          }
        },
        "skills": {
          "beer_waterfall": {
            "desc": "Reduces nearby enemies' Movement Speed by 40%.",
            "name": "Beer Waterfall"
          },
          "breath_of_fire": {
            "desc": "Fire Damage.",
            "name": "Breath of Fire"
          },
          "invoke_niuzao": {
            "desc": "Shields for all allies + Damage reduction for self.",
            "name": "Invoke Niuzao"
          },
          "stagger": {
            "desc": "Splits 50% of incoming damage over 10s.",
            "name": "Stagger"
          },
          "storm_earth_fire": {
            "desc": "Explosion in 3 directions for ATK x 4.",
            "name": "Storm"
          }
        }
      },
      "cheondung_garam": {
        "lore": "High shaman of the Golden City. Calls upon the storm.",
        "name": "Cheondung Garam",
        "routes": {
          "elemental": {
            "name": "Elemental",
            "variantDesc": "Lightning skills have a {value}% chance to trigger twice.",
            "variantName": "Lightning Overload"
          },
          "restoration": {
            "name": "Restoration",
            "variantDesc": "When healing",
            "variantName": "Tidal Waves"
          }
        },
        "skills": {
          "chain_heal": {
            "desc": "Chain Heal.",
            "name": "Chain Heal"
          },
          "earth_elemental": {
            "desc": "Summons a Tank Elemental.",
            "name": "Earth Elemental"
          },
          "earth_shield": {
            "desc": "Buff that Heals when hit.",
            "name": "Earth Shield"
          },
          "earthquake": {
            "desc": "AoE Slow + Damage.",
            "name": "Earthquake"
          },
          "healing_wave": {
            "desc": "Powerful single target Heal.",
            "name": "Healing Wave"
          },
          "lightning_bolt": {
            "desc": "Chain Lightning attack.",
            "name": "Lightning Bolt"
          },
          "lightning_storm": {
            "desc": "AoE bombardment to all enemies.",
            "name": "Lightning Storm"
          },
          "thunderstorm": {
            "desc": "Frontal cone AoE.",
            "name": "Thunderstorm"
          }
        },
        "summons": {
          "earth_elemental": {
            "name": "Earth Elemental"
          }
        }
      },
      "crow": {
        "lore": "A wolf assassin in the shadows.",
        "name": "Crow",
        "routes": {
          "combat": {
            "name": "Combat",
            "variantDesc": "Energy Restore Increase {value}%.",
            "variantName": "Adrenaline Rush"
          }
        },
        "skills": {
          "eviscerate": {
            "desc": "Finishing move.",
            "name": "Eviscerate"
          },
          "killing_spree": {
            "desc": "Successive attacks.",
            "name": "Killing Spree"
          },
          "sinister_strike": {
            "desc": "Generates Combo points.",
            "name": "Sinister Strike"
          }
        }
      },
      "daulgard": {
        "lore": "An Orc Death Knight who was corrupted but regained his honor. Commands the undead legion with the power of the Ebon Blade or handles frost and blood magic.",
        "name": "Daulgard",
        "routes": {
          "blood": {
            "name": "Blood",
            "variantDesc": "Absorbs HP equal to {value}% of damage dealt.",
            "variantName": "Blood Bond"
          },
          "frost": {
            "name": "Frost",
            "variantDesc": "Frost attacks have a {value}% chance to freeze the target for 2s.",
            "variantName": "Frost's Grace"
          },
          "unholy": {
            "name": "Unholy",
            "variantDesc": "Increase summon stats by {value}%.",
            "variantName": "Undead Legion"
          }
        },
        "skills": {
          "army": {
            "desc": "Immediately summons 9 Legion Ghouls every 25s.",
            "name": "Army of the Dead"
          },
          "blood_boil": {
            "desc": "Deals ATK x 3 damage to all nearby enemies every 8s and restores HP equal to damage dealt.",
            "name": "Blood Boil"
          },
          "dancing_weapon": {
            "desc": "Summons a Rune Weapon copy of self every 30s to fight together for 20s.",
            "name": "Dancing Rune Weapon"
          },
          "death_coil": {
            "desc": "Deals ATK x 8 powerful damage to a single target every 8s.",
            "name": "Death Coil"
          },
          "death_strike": {
            "desc": "Attack has a {value}% chance to deal ATK x 4 powerful life steal damage.",
            "name": "Death Strike"
          },
          "disease": {
            "desc": "Deals ATK x 1.0 continuous damage to all enemies for 10s every 4s.",
            "name": "Disease"
          },
          "frost_chains": {
            "desc": "Deals ATK x 3 damage and 5s Slow to a single target every 6s.",
            "name": "Icy Touch"
          },
          "frost_strike": {
            "desc": "Attack has a {value}% chance to deal ATK x 2 bonus Frost damage.",
            "name": "Frost Strike"
          },
          "ghoul": {
            "desc": "Summons 1 Melee Ghoul and 1 Skeleton Archer.",
            "name": "Summon Ghoul"
          },
          "howling_blast": {
            "desc": "Deals ATK x 4 AoE damage and Slow to enemies within 150px of target every 10s.",
            "name": "Howling Blast"
          },
          "remorseless_winter": {
            "desc": "Deals ATK x 1.5 damage per second and 50% Slow to all nearby enemies for 10s every 20s.",
            "name": "Remorseless Winter"
          },
          "vampiric_blood": {
            "desc": "Increases Max HP by 30% and healing received by 50% for 10s every 15s.",
            "name": "Vampiric Blood"
          }
        },
        "summons": {
          "army": {
            "name": "Legion Ghoul"
          },
          "ghoul": {
            "name": "Ghoul"
          },
          "rune_weapon": {
            "name": "Rune Weapon"
          }
        }
      },
      "dizgarldo": {
        "lore": "A priest of the Cult of Forgotten Shadows. Heals allies by moving between light and darkness.",
        "name": "Dizgarldo",
        "routes": {
          "discipline": {
            "name": "Discipline",
            "variantDesc": "When hit",
            "variantName": "Divine Protection"
          },
          "holy": {
            "name": "Holy",
            "variantDesc": "When healing",
            "variantName": "Holy Mercy"
          },
          "shadow": {
            "name": "Shadow",
            "variantDesc": "When attacking",
            "variantName": "Shadow's Thirst"
          }
        },
        "skills": {
          "blood_ritual": {
            "desc": "Consumes 30% of self HP every 20s to heal all allies for ATK x 3.",
            "name": "Blood Ritual"
          },
          "dark_feast": {
            "desc": "Restores 10% of Max HP every 6s.",
            "name": "Dark Feast"
          },
          "demon_summon": {
            "desc": "Summon Fiend (20s; heals lowest HP ally for 50% of damage dealt).",
            "name": "Summon Fiend"
          },
          "divine_hymn": {
            "desc": "Heals all allies for ATK x 5 + grants a Shield every 15s.",
            "name": "Divine Hymn"
          },
          "divine_intervention": {
            "desc": "Heals all allies for ATK x 4 + grants a Shield every 30s.",
            "name": "Divine Intervention"
          },
          "holy_beacon": {
            "desc": "Summon Beacon of Light (25s; heals lowest HP ally every 2s).",
            "name": "Beacon of Light"
          },
          "holy_light": {
            "desc": "Fully restores the lowest HP ally (ATK x 8) every 8s.",
            "name": "Holy Light"
          },
          "holy_shield": {
            "desc": "Grants a 20% Max HP Shield to the lowest HP ally every 12s.",
            "name": "Holy Shield"
          },
          "life_drain": {
            "desc": "Passive: Restores own HP by 50% of damage dealt.",
            "name": "Life Drain"
          },
          "light_wave": {
            "desc": "Heals all allies for ATK x 1.5 every 8s.",
            "name": "Light Wave"
          },
          "prayer_healing": {
            "desc": "Heals all allies for ATK x 2 every 10s.",
            "name": "Prayer of Healing"
          },
          "resurrection": {
            "desc": "Resurrects one fallen ally with 30% HP every 45s.",
            "name": "Resurrection"
          }
        },
        "summons": {
          "demon": {
            "name": "Fiend"
          },
          "holy_beacon": {
            "name": "Beacon of Light"
          }
        }
      },
      "durga": {
        "lore": "An Orc hunter with perfect aim.",
        "name": "Durga",
        "routes": {
          "marksmanship": {
            "name": "Marksmanship",
            "variantDesc": "Increases attack range by {value}.",
            "variantName": "Eagle Eye"
          }
        },
        "skills": {
          "aimed_shot": {
            "desc": "A powerful single shot.",
            "name": "Aimed Shot"
          },
          "arcane_shot": {
            "desc": "Standard shot.",
            "name": "Arcane Shot"
          },
          "concussive_shot": {
            "desc": "Deals damage and reduces Movement Speed by 50%.",
            "name": "Concussive Shot"
          }
        }
      },
      "feldah": {
        "lore": "A powerful warlock. Commands the demon legion with a body that transcends death.",
        "name": "Feldah",
        "routes": {
          "afflict": {
            "name": "Affliction",
            "variantDesc": "Reduces hit enemy's Movement Speed by {value}%.",
            "variantName": "Cursed Souls"
          },
          "demon": {
            "name": "Demonology",
            "variantDesc": "Increase summon stats by {value}%.",
            "variantName": "Demon Overlord"
          },
          "destro": {
            "name": "Destruction",
            "variantDesc": "Reduces Cooldowns by {value}% on Critical Hit.",
            "variantName": "Chaos Flame"
          }
        },
        "skills": {
          "agony": {
            "desc": "Increasing periodic damage.",
            "name": "Curse of Agony"
          },
          "chaos_bolt": {
            "desc": "A powerful strike that ignores Defense.",
            "name": "Chaos Bolt"
          },
          "corruption": {
            "desc": "Periodic damage to all enemies.",
            "name": "AoE Corruption"
          },
          "crit_triple": {
            "desc": "3x damage on Critical Hit.",
            "name": "Doom Strike"
          },
          "curse_fatigue": {
            "desc": "Reduces Movement Speed of all enemies.",
            "name": "AoE Fatigue"
          },
          "double_bolt": {
            "desc": "Fires 2 bolts.",
            "name": "Double Bolts"
          },
          "drain_soul": {
            "desc": "Instantly kills normal monsters below 35% HP.",
            "name": "Drain Soul"
          },
          "felguard": {
            "desc": "Summons a powerful Tank Demon.",
            "name": "Felguard"
          },
          "felhunter": {
            "desc": "Summons a melee demon.",
            "name": "Felhunter"
          },
          "healthstone": {
            "desc": "Restores ally health during a crisis.",
            "name": "Healthstone"
          },
          "imp": {
            "desc": "Summons a ranged Imp.",
            "name": "Summon Imp"
          },
          "sacrifice": {
            "desc": "Periodic damage to all.",
            "name": "Sacrifice"
          }
        },
        "summons": {
          "felguard": {
            "name": "Felguard"
          },
          "felhunter": {
            "name": "Felhunter"
          },
          "imp": {
            "name": "Imp"
          }
        }
      },
      "gardu": {
        "lore": "An Orc warrior wielding a giant axe.",
        "name": "Gardu",
        "routes": {
          "arms": {
            "name": "Arms",
            "variantDesc": "Increase Critical Hit rate by {value}%.",
            "variantName": "Mortal Strike"
          }
        },
        "skills": {
          "bladestorm": {
            "desc": "AoE Whirlwind.",
            "name": "Bladestorm"
          },
          "mortal_strike": {
            "desc": "Deals damage and reduces target's healing by 50%.",
            "name": "Mortal Strike"
          }
        }
      },
      "gazro": {
        "lore": "A goblin engineer. His machines fire relentlessly as his star level increases.",
        "name": "Gazro",
        "routes": {
          "marksmanship": {
            "name": "Marksmanship",
            "variantDesc": "Reduces Cooldowns by {value}%.",
            "variantName": "Goblin Engineering"
          }
        },
        "skills": {
          "deth_lazor": {
            "desc": "Charging laser.",
            "name": "Deth Lazor"
          },
          "grav_o_bomb": {
            "desc": "Black hole bomb.",
            "name": "Grav-O-Bomb"
          },
          "rock_it_turret": {
            "desc": "Places a turret.",
            "name": "Rock-It! Turret"
          },
          "xplodium_charge": {
            "desc": "Stunning bomb.",
            "name": "Xplodium Charge"
          }
        },
        "summons": {
          "turret": {
            "name": "Rock-It! Turret"
          }
        }
      },
      "gray": {
        "lore": "A Gilnean worgen warrior.",
        "name": "Gray",
        "routes": {
          "fury": {
            "name": "Fury",
            "variantDesc": "Restores HP by {value}% on Attack.",
            "variantName": "Bloodthirst"
          }
        },
        "skills": {
          "bloodthirst": {
            "desc": "Damage + Restoration.",
            "name": "Bloodthirst"
          },
          "rampage": {
            "desc": "4 successive strikes.",
            "name": "Rampage"
          },
          "recklessness": {
            "desc": "Guaranteed Critical Hit.",
            "name": "Recklessness"
          }
        }
      },
      "grelcal": {
        "lore": "A Mag'har warrior who retains the wildness of Draenor. Crushes enemies with ruthless power.",
        "name": "Grelcal",
        "routes": {
          "defense": {
            "name": "Defense",
            "variantDesc": "When hit",
            "variantName": "Warrior's Will"
          },
          "weapon": {
            "name": "Weapon",
            "variantDesc": "Every 3rd hit deals {value}% bonus damage.",
            "variantName": "Warrior's Offensive"
          }
        },
        "skills": {
          "iron_wall": {
            "desc": "Reduces damage taken by 15%.",
            "name": "Iron Wall"
          },
          "lacerate": {
            "desc": "Attack Power Increase 50% but Defense Decrease 25%.",
            "name": "Lacerate"
          },
          "rend": {
            "desc": "15s Bleed; kills instantly if damage is lethal.",
            "name": "Rend"
          },
          "shield_bash": {
            "desc": "Bonus Attack Power equal to 50% of Defense.",
            "name": "Shield Bash"
          },
          "shockwave": {
            "desc": "Stuns nearby enemies for 1.5s.",
            "name": "Shockwave"
          },
          "weapon_mastery": {
            "desc": "Attack Power +20%",
            "name": "Weapon Mastery"
          }
        }
      },
      "hamul": {
        "lore": "A druid who values the harmony of nature.",
        "name": "Hamul",
        "routes": {
          "restoration": {
            "name": "Restoration",
            "variantDesc": "Increases Continuous healing effects by {value}%.",
            "variantName": "Tree of Life"
          }
        },
        "skills": {
          "incarnation": {
            "desc": "Transforms to enhance healing.",
            "name": "Incarnation: Tree of Life"
          },
          "regrowth": {
            "desc": "Immediate heal + Continuous healing.",
            "name": "Regrowth"
          },
          "tranquility": {
            "desc": "AoE periodic healing.",
            "name": "Tranquility"
          },
          "wild_growth": {
            "desc": "Continuous healing for all allies.",
            "name": "Wild Growth"
          }
        }
      },
      "heln_dinohouf": {
        "lore": "A Tauren druid who wields the power of the moon and sun.",
        "name": "Heln Dinohouf",
        "routes": {
          "balance": {
            "name": "Balance",
            "variantDesc": "When attacking",
            "variantName": "Moonlit Spike"
          },
          "restoration": {
            "name": "Restoration",
            "variantDesc": "Increases Continuous healing effects by {value}%.",
            "variantName": "Nature's Rain"
          }
        },
        "skills": {
          "ironbark": {
            "desc": "Grants a Shield (12% Max HP",
            "name": "Ironbark"
          },
          "moonfire": {
            "desc": "AoE Continuous damage.",
            "name": "Moonfire"
          },
          "natures_swiftness": {
            "desc": "Periodic healing for all allies.",
            "name": "Nature's Will"
          },
          "rejuvenation": {
            "desc": "Single target Continuous healing.",
            "name": "Rejuvenation"
          },
          "starfall": {
            "desc": "AoE bombardment to all enemies.",
            "name": "Starfall"
          },
          "starsurge": {
            "desc": "Powerful single target hit.",
            "name": "Starsurge"
          },
          "wild_growth": {
            "desc": "AoE Continuous healing.",
            "name": "Wild Growth"
          }
        }
      },
      "howl": {
        "lore": "A druid who has accepted his feral nature.",
        "name": "Howl",
        "routes": {
          "feral": {
            "name": "Feral",
            "variantDesc": "When attacking",
            "variantName": "Omen of Clarity"
          }
        },
        "skills": {
          "berserk": {
            "desc": "Cooldown Reduction + Attack Speed Increase.",
            "name": "Berserk"
          },
          "rip": {
            "desc": "Bleeding Continuous damage.",
            "name": "Rip"
          },
          "shred": {
            "desc": "Generates Combo points.",
            "name": "Shred"
          }
        }
      },
      "ireneerpiria": {
        "lore": "An arcanist from Suramar. Subdues enemies with ancient mana.",
        "name": "Ireneerpiria",
        "routes": {
          "arcane": {
            "name": "Arcane",
            "variantDesc": "When using magic attacks",
            "variantName": "Arcane Resonance"
          }
        },
        "skills": {
          "arcane_blast": {
            "desc": "Deals 200% Attack Power damage to a single target.",
            "name": "Arcane Blast"
          },
          "mana_burn": {
            "desc": "Removes buffs + Bonus damage.",
            "name": "Mana Burn"
          },
          "resonance_burst": {
            "desc": "Spreads 50% damage to nearby enemies when Resonance triggers.",
            "name": "Resonance Burst"
          }
        }
      },
      "iskierpyria": {
        "lore": "A high mage who accepted the mana of the Sunwell. Freely handles the three flows of Frost, Fire, and Arcane.",
        "name": "Iskierpyria",
        "routes": {
          "arcane": {
            "name": "Arcane",
            "variantDesc": "When attacking",
            "variantName": "Arcane Resonance"
          },
          "fire": {
            "name": "Fire",
            "variantDesc": "When attacking",
            "variantName": "Arcane Ignition"
          },
          "frost": {
            "name": "Frost",
            "variantDesc": "When using Frost attacks",
            "variantName": "Arcane Freeze"
          }
        },
        "skills": {
          "arcane_barrage": {
            "desc": "Fires 3 projectiles for ATK x 3 every 8s.",
            "name": "Arcane Barrage"
          },
          "arcane_missiles": {
            "desc": "Fires 5 successive projectiles for ATK x 1.5 every 5s.",
            "name": "Arcane Missiles"
          },
          "arcane_surge": {
            "desc": "Bombards all enemies for ATK x 4 Arcane damage every 15s.",
            "name": "Arcane Surge"
          },
          "fireball": {
            "desc": "ATK x 5 Explosion within 80px of Target every 6s.",
            "name": "Fireball"
          },
          "frost_elemental": {
            "desc": "Summon Frost Elemental (30s",
            "name": "Frost Elemental"
          },
          "frost_nova": {
            "desc": "Slows enemies within 120px for 3s every 8s.",
            "name": "Frost Nova"
          },
          "ignite": {
            "desc": "Passive: Increases Fire damage by 30%.",
            "name": "Ignite"
          },
          "meteor": {
            "desc": "Deals ATK x 12 damage to a Target and 50% splash damage every 15s.",
            "name": "Meteor"
          }
        },
        "summons": {
          "frost_elemental": {
            "name": "Frost Elemental"
          }
        }
      },
      "iyena": {
        "lore": "Sister of Aeina. Lightforged Draenei Discipline Priest.",
        "name": "Iyena",
        "routes": {
          "discipline": {
            "name": "Discipline",
            "variantDesc": "Grants a shield equal to {value}% of HP when healing.",
            "variantName": "Shield of Pain"
          }
        },
        "skills": {
          "atonement": {
            "desc": "Converts damage to healing (12s)",
            "name": "Atonement"
          },
          "barrier": {
            "desc": "Shield for all allies (10% of Max HP, 8s)",
            "name": "Flood of Light"
          },
          "desperate_prayer": {
            "desc": "Instant self-heal for ATKx10 (8s)",
            "name": "Desperate Prayer"
          },
          "penance": {
            "desc": "Continuous attack/heal (12s)",
            "name": "Penance"
          },
          "power_word_shield": {
            "desc": "Shield for a single target (25% of Max HP, 12s)",
            "name": "Power Word: Shield"
          }
        }
      },
      "jainaro": {
        "lore": "Battle Mage of Dalaran.",
        "name": "Jainaro",
        "routes": {
          "arcane": {
            "name": "Arcane",
            "variantDesc": "Cooldown reduced by {value}%.",
            "variantName": "Arcane Focus"
          }
        },
        "skills": {
          "arcane_missiles": {
            "desc": "3 shots",
            "name": "Arcane Missiles"
          },
          "arcane_power": {
            "desc": "Increases attack power",
            "name": "Arcane Power"
          },
          "polymorph": {
            "desc": "Neutralizes 1 enemy for 5s",
            "name": "Polymorph"
          }
        }
      },
      "kaern_dinohouf": {
        "lore": "The Tauren High Chieftain who serves the Earthmother. Masterfully handles feral and natural powers.",
        "name": "Kaern Dinohouf",
        "routes": {
          "balance": {
            "name": "Balance",
            "variantDesc": "When attacking, {value}% chance for a 80px ATKx2 AoE explosion.",
            "variantName": "Lunar Burst"
          },
          "feral": {
            "name": "Feral",
            "variantDesc": "Attacking bleeding targets deals ATKx{value}% bonus damage.",
            "variantName": "Feral Judgment"
          },
          "guardian": {
            "name": "Guardian",
            "variantDesc": "Defense increased by {value}%.",
            "variantName": "Bear Form"
          },
          "restoration": {
            "name": "Restoration",
            "variantDesc": "Increases HoT effects by {value}%.",
            "variantName": "Nature's Rain"
          }
        },
        "skills": {
          "bear_hug": {
            "desc": "Deals ATKx5 damage and roots for 5s every 20s.",
            "name": "Bear Hug"
          },
          "blood_frenzy": {
            "desc": "Passive: Increases damage to bleeding targets by 20%.",
            "name": "Blood Frenzy"
          },
          "mangle": {
            "desc": "Deals ATKx3 damage and stuns for 2s in front every 8s.",
            "name": "Mangle"
          },
          "moonfire": {
            "desc": "Deals ATK 30% bonus nature damage on every attack.",
            "name": "Moonfire"
          },
          "nourish": {
            "desc": "Heals the lowest health ally for ATKx5 every 10s.",
            "name": "Nourish"
          },
          "pounce": {
            "desc": "Deals ATKx6 damage and stuns for 2s every 10s.",
            "name": "Pounce"
          },
          "rake": {
            "desc": "Inflicts a 3s Bleed DoT (ATKx50%/tick) on every attack.",
            "name": "Rake"
          },
          "rejuvenation": {
            "desc": "Heals the lowest health ally over time (HoT).",
            "name": "Rejuvenation"
          },
          "starfall": {
            "desc": "Deals ATKx2 damage to all enemies every 20s.",
            "name": "Starfall"
          },
          "starsurge": {
            "desc": "Deals ATKx6 nature damage every 8s.",
            "name": "Starsurge"
          },
          "survival_instincts": {
            "desc": "Passive: Reduces damage taken by 30% when below 40% HP.",
            "name": "Survival Instincts"
          },
          "thorns": {
            "desc": "Passive: Reflects 25% of ATK when hit.",
            "name": "Thorns"
          },
          "tranquility": {
            "desc": "Heals all allies for ATKx3 every 30s.",
            "name": "Tranquility"
          },
          "wild_growth": {
            "desc": "Heals all allies for ATKx1.5 every 8s.",
            "name": "Wild Growth"
          }
        }
      },
      "kalishan": {
        "lore": "A hunter who shoots arrows infused with the power of the void.",
        "name": "Kalishan",
        "routes": {
          "marksmanship": {
            "name": "Marksmanship",
            "variantDesc": "When attacking, {value}% chance for bonus Shadow damage.",
            "variantName": "Void Arrow"
          }
        },
        "skills": {
          "aimed_shot": {
            "desc": "A powerful shot.",
            "name": "Aimed Shot"
          },
          "arcane_shot": {
            "desc": "An immediate shot.",
            "name": "Arcane Shot"
          },
          "rapid_fire": {
            "desc": "Increases attack speed.",
            "name": "Rapid Fire"
          },
          "void_volley": {
            "desc": "Shadow AoE damage.",
            "name": "Void Volley"
          }
        }
      },
      "keltu": {
        "lore": "A necromancer of the Scourge.",
        "name": "Keltu",
        "routes": {
          "frost": {
            "name": "Frost",
            "variantDesc": "Increases Frost damage by {value}%.",
            "variantName": "Chill of the Dead"
          }
        },
        "skills": {
          "cone_of_cold": {
            "desc": "Frontal cone of ice.",
            "name": "Cone of Cold"
          },
          "frostbolt": {
            "desc": "Frost damage and slow.",
            "name": "Frostbolt"
          }
        }
      },
      "larisian": {
        "lore": "A predator eyeing its prey. A Blood Elf Demon Hunter.",
        "name": "Larisian",
        "routes": {
          "feast": {
            "name": "Feast",
            "variantDesc": "Restores {value}% HP on kill.",
            "variantName": "Blood Feast"
          }
        },
        "skills": {
          "consume": {
            "desc": "Damage and life steal.",
            "name": "Demon Bite"
          },
          "immolation_aura": {
            "desc": "Continuous nearby damage.",
            "name": "Immolation Aura"
          },
          "massacre": {
            "desc": "Execution and cooldown reset.",
            "name": "Massacre"
          },
          "soul_rend": {
            "desc": "Direct HP absorption.",
            "name": "Soul Rend"
          }
        }
      },
      "liasian": {
        "lore": "A void-touched Elf Demon Hunter. Feasts on the life force of enemies.",
        "name": "Liasian",
        "routes": {
          "feast": {
            "name": "Feast",
            "variantDesc": "Restores {value}% HP on kill.",
            "variantName": "Blood Feast"
          }
        },
        "skills": {
          "consume": {
            "desc": "Damage and life steal.",
            "name": "Demon Bite"
          },
          "immolation_aura": {
            "desc": "Continuous nearby damage.",
            "name": "Immolation Aura"
          },
          "massacre": {
            "desc": "Execution and cooldown reset.",
            "name": "Massacre"
          },
          "soul_rend": {
            "desc": "Direct HP absorption.",
            "name": "Soul Rend"
          }
        }
      },
      "lili": {
        "lore": "A monk who loves adventure.",
        "name": "Lili",
        "routes": {
          "mistweaver": {
            "name": "Mistweaver",
            "variantDesc": "Gives {value}% bonus healing when healing.",
            "variantName": "Gust of Mists"
          }
        },
        "skills": {
          "chi_burst": {
            "desc": "Damage and healing in a straight line.",
            "name": "Chi Burst"
          },
          "effuse": {
            "desc": "A quick heal.",
            "name": "Effuse"
          },
          "life_cocoon": {
            "desc": "A protective shield.",
            "name": "Life Cocoon"
          },
          "renewing_mist": {
            "desc": "A spreading heal over time.",
            "name": "Renewing Mist"
          }
        }
      },
      "limu": {
        "lore": "A desert fox hunter. Demonstrates overwhelming rapid-fire as her stars increase.",
        "name": "Limu",
        "routes": {
          "precision": {
            "name": "Marksmanship",
            "variantDesc": "{value}% chance to deal a critical hit.",
            "variantName": "Aim Down"
          }
        },
        "skills": {
          "aimed_shot": {
            "desc": "A powerful shot.",
            "name": "Aimed Shot"
          },
          "marked_for_death": {
            "desc": "Guaranteed critical hit.",
            "name": "Marked for Death"
          },
          "piercing_arrow": {
            "desc": "Pierces in a straight line.",
            "name": "Piercing Arrow"
          },
          "trueshot": {
            "desc": "Double damage.",
            "name": "Trueshot"
          }
        }
      },
      "lombardo": {
        "lore": "A Demon Hunter following the Illidari. Destroys enemies with fel fire and chaos magic, or protects allies by enduring pain.",
        "name": "Lombardo",
        "routes": {
          "havoc": {
            "name": "Havoc",
            "variantDesc": "When attacking, {value}% chance for ATKx2 bonus Chaos damage.",
            "variantName": "Chaos Blessing"
          },
          "vengeance": {
            "name": "Vengeance",
            "variantDesc": "When hit, {value}% chance to create a soul fragment (Restores 5% HP).",
            "variantName": "Soul Absorption"
          }
        },
        "skills": {
          "blade_dance": {
            "desc": "Deals ATKx4 damage to all nearby enemies and evades for 1s every 8s.",
            "name": "Blade Dance"
          },
          "chaos_strike": {
            "desc": "When attacking, {value}% chance to deal ATKx3 damage and return energy.",
            "name": "Chaos Strike"
          },
          "demon_spikes": {
            "desc": "Increases Defense by 50% and Parry by 20% for 6s every 15s.",
            "name": "Demon Spikes"
          },
          "elysian_decree": {
            "desc": "Deals ATKx12 Arcane AoE and creates 3 soul fragments every 30s.",
            "name": "Elysian Decree"
          },
          "eye_beam": {
            "desc": "Deals ATKx4/s frontal damage and crits for 2s every 12s.",
            "name": "Eye Beam"
          },
          "fel_rush": {
            "desc": "Rushes forward 250px dealing ATKx3.5 damage to all in path every 5s.",
            "name": "Fel Rush"
          },
          "metamorphosis": {
            "desc": "Transforms for 10s increasing haste by 40% and versatility by 20% every 20s.",
            "name": "Metamorphosis"
          },
          "shear": {
            "desc": "Deals ATKx3.5 damage and creates 1 soul fragment every 6s.",
            "name": "Shear"
          },
          "sigil_flame": {
            "desc": "Creates a sigil dealing ATKx1.5 fire damage/s for 6s every 10s.",
            "name": "Sigil of Flame"
          },
          "soul_carving": {
            "desc": "Deals ATKx8 damage and creates 3 soul fragments every 20s.",
            "name": "Soul Carving"
          },
          "soul_cleave": {
            "desc": "Deals ATKx3 frontal damage and restores 8% HP per fragment every 8s.",
            "name": "Soul Cleave"
          },
          "the_hunt": {
            "desc": "Charges target dealing ATKx15 damage and continuous damage for 6s every 30s.",
            "name": "The Hunt"
          }
        }
      },
      "magatha": {
        "lore": "A Shaman who commands fire spirits.",
        "name": "Magatha",
        "routes": {
          "elemental": {
            "name": "Elemental",
            "variantDesc": "Increases Fire damage by {value}%.",
            "variantName": "Lava Torrent"
          }
        },
        "skills": {
          "ascendance": {
            "desc": "Transform into a Fire Ascendant.",
            "name": "Ascendance"
          },
          "flame_shock": {
            "desc": "Applies a Fire damage over time effect.",
            "name": "Flame Shock"
          },
          "lava_burst": {
            "desc": "Guaranteed critical strike.",
            "name": "Lava Burst"
          }
        }
      },
      "maiev": {
        "lore": "A watcher lurking in the shadows.",
        "name": "Maiev",
        "routes": {
          "subtlety": {
            "name": "Subtlety",
            "variantDesc": "Stealth attacks deal {value}% bonus damage.",
            "variantName": "Shadow Strike"
          }
        },
        "skills": {
          "backstab": {
            "desc": "Attacks from behind for bonus damage.",
            "name": "Backstab"
          },
          "shadow_dance": {
            "desc": "Enter stealth and unleash rapid attacks.",
            "name": "Shadow Dance"
          },
          "shadowstep": {
            "desc": "Teleport to the target instantly.",
            "name": "Shadowstep"
          }
        }
      },
      "malfu": {
        "lore": "A Druid who guards the balance of Nature.",
        "name": "Malfu",
        "routes": {
          "balance": {
            "name": "Balance",
            "variantDesc": "Increases Arcane damage by {value}%.",
            "variantName": "Lunar Eclipse"
          }
        },
        "skills": {
          "entangling_roots": {
            "desc": "Roots the enemy in place.",
            "name": "Entangling Roots"
          },
          "moonfire": {
            "desc": "Arcane damage over time.",
            "name": "Moonfire"
          },
          "starfall": {
            "desc": "AoE starfall bombardment.",
            "name": "Starfall"
          },
          "wrath": {
            "desc": "Deals Nature damage.",
            "name": "Wrath"
          }
        }
      },
      "maraad": {
        "lore": "A paladin sworn to vengeance.",
        "name": "Maraad",
        "routes": {
          "retribution": {
            "name": "Retribution",
            "variantDesc": "On attack, deal {value}% bonus Holy damage.",
            "variantName": "Seal of Justice"
          }
        },
        "skills": {
          "avenging_wrath": {
            "desc": "Transform with wings of vengeance.",
            "name": "Avenging Wrath"
          },
          "blade_of_justice": {
            "desc": "Holy blade strike.",
            "name": "Blade of Justice"
          },
          "crusader_strike": {
            "desc": "A powerful Holy melee strike.",
            "name": "Crusader Strike"
          }
        }
      },
      "mokra": {
        "lore": "An Orc Shaman who communes with earth spirits.",
        "name": "Mokra",
        "routes": {
          "elemental": {
            "name": "Elemental",
            "variantDesc": "Increases skill damage by {value}%.",
            "variantName": "Elemental Fury"
          }
        },
        "skills": {
          "chain_lightning": {
            "desc": "Chains to up to 3 enemies.",
            "name": "Chain Lightning"
          },
          "lightning_bolt": {
            "desc": "Deals lightning damage.",
            "name": "Lightning Bolt"
          },
          "thunder_shock": {
            "desc": "Knockback + damage.",
            "name": "Thunder Shock"
          }
        }
      },
      "muyeong_salk": {
        "lore": "An Undead rogue who lost all memories of life. Now roams the battlefield as an outlaw overlord or shadow assassin.",
        "name": "Muyeong Salk",
        "routes": {
          "assassination": {
            "name": "Assassination",
            "variantDesc": "On attack, {value}% chance to apply a potent poison DoT.",
            "variantName": "Lethal Poison"
          },
          "outlaw": {
            "name": "Outlaw",
            "variantDesc": "On attack, {value}% chance to gain a random 10s combat buff.",
            "variantName": "Roll the Bones"
          },
          "subtlety": {
            "name": "Subtlety",
            "variantDesc": "Skill use: {value}% chance to increase ATK by 30% for 5s.",
            "variantName": "Shadow Dance"
          }
        },
        "skills": {
          "between_eyes": {
            "desc": "Every 10s: single-target ATK×6 + 2s stun.",
            "name": "Between the Eyes"
          },
          "dreadblades": {
            "desc": "Every 20s: +50% attack speed for 10s, +{value}% bonus damage on all attacks.",
            "name": "Dreadblades"
          },
          "envenom": {
            "desc": "Every 12s: deal ATK×10 explosive damage to a poisoned target.",
            "name": "Envenom"
          },
          "eviscerate": {
            "desc": "On attack, {value}% chance to strike a weak point for ATK×5.",
            "name": "Eviscerate"
          },
          "flurry": {
            "desc": "On attack, {value}% chance to mirror 50% of damage to nearby enemies.",
            "name": "Flurry"
          },
          "garrote": {
            "desc": "Every 8s: silence 1 enemy for 6s + ATK×4 DoT.",
            "name": "Garrote"
          },
          "kingsbane": {
            "desc": "Every 30s: inject a powerful poison for 14s (ATK×2/s, escalating).",
            "name": "Kingsbane"
          },
          "mutilate": {
            "desc": "On attack, {value}% chance to deal ATK×3 and double poison effects.",
            "name": "Mutilate"
          },
          "pistol": {
            "desc": "Every 6s: single-target ATK×3.5 + 3s slow.",
            "name": "Pistol Shot"
          },
          "secret_tech": {
            "desc": "Every 25s: summon a phantom for ATK×12 frontal AoE.",
            "name": "Secret Technique"
          },
          "shadowstrike": {
            "desc": "Every 5s: teleport behind target for ATK×4 + 1s stun.",
            "name": "Shadow Strike"
          },
          "symbols": {
            "desc": "Every 15s: next 3 attacks are guaranteed crits + ATK +20% for 8s.",
            "name": "Symbols of Death"
          }
        }
      },
      "nog": {
        "lore": "A deadly poison assassin.",
        "name": "Nog",
        "routes": {
          "assassination": {
            "name": "Assassination",
            "variantDesc": "Increases poison duration by {value}%.",
            "variantName": "Alchemy"
          }
        },
        "skills": {
          "mutilate": {
            "desc": "Dual wield strike.",
            "name": "Mutilate"
          },
          "poison_bomb": {
            "desc": "Creates a poison cloud.",
            "name": "Poison Bomb"
          },
          "poison_knife": {
            "desc": "Poisoned stab.",
            "name": "Poison Knife"
          },
          "vendetta": {
            "desc": "Amplifies damage dealt.",
            "name": "Vendetta"
          }
        }
      },
      "nostferatu": {
        "lore": "A Blood Knight who witnessed both the corruption and purification of the Sunwell. Now stands as a judge of holy light on the battlefield.",
        "name": "Nostferatu",
        "routes": {
          "holy": {
            "name": "Holy",
            "variantDesc": "On heal, {value}% chance to remove debuffs from target.",
            "variantName": "Light's Grace"
          },
          "protection": {
            "name": "Protection",
            "variantDesc": "On hit, {value}% chance to gain a shield worth 15% max HP for 3s.",
            "variantName": "Light's Guard"
          },
          "retribution": {
            "name": "Retribution",
            "variantDesc": "On attack, {value}% chance to deal ATK×2 bonus Holy damage.",
            "variantName": "Holy Rebuke"
          }
        },
        "skills": {
          "avengers_shield": {
            "desc": "Every 8s: hit 3 enemies for ATK×3 + 2s silence.",
            "name": "Avenger's Shield"
          },
          "blade_of_justice": {
            "desc": "On attack, {value}% chance to deal a powerful ATK×3 strike.",
            "name": "Blade of Justice"
          },
          "divine_revelation": {
            "desc": "Every 15s: all healing +50% for 10s, no mana cost.",
            "name": "Divine Revelation"
          },
          "divine_storm": {
            "desc": "Every 8s: AoE ATK×3.5 + heal for 20% of damage dealt.",
            "name": "Divine Storm"
          },
          "guardian_king": {
            "desc": "Every 25s: -50% damage taken + reflect ×2 for 10s.",
            "name": "Ancient King's Guardian"
          },
          "holy_beacon_1": {
            "desc": "On heal, also heals the lowest-HP ally.",
            "name": "Holy Beacon"
          },
          "holy_beacon_2": {
            "desc": "On heal, also heals one more ally (total 3 healed at once).",
            "name": "Holy Beacon II"
          },
          "holy_flash": {
            "desc": "Every 5s: instantly heal 1 ally for ATK×4.",
            "name": "Holy Flash"
          },
          "holy_ground": {
            "desc": "Every 10s: nearby allies +20 DEF + 2% HP/s for 8s.",
            "name": "Consecration"
          },
          "judgment": {
            "desc": "Every 6s: ATK×4 + target takes 15% more damage for 5s.",
            "name": "Judgment"
          },
          "wake_of_ashes": {
            "desc": "Every 20s: ATK×10 to all frontal enemies. Undead instantly perish.",
            "name": "Wake of Ashes"
          }
        }
      },
      "pilji_bangkril": {
        "lore": "A Goblin hunter who tames beasts for profit.",
        "name": "Pilji Bangkril",
        "routes": {
          "beast_mastery": {
            "name": "Beast Mastery",
            "variantDesc": "Increases summon stats by {value}%.",
            "variantName": "Beast's Fury"
          },
          "marksmanship": {
            "name": "Marksmanship",
            "variantDesc": "Each attack has {value}% chance to deal ATK×3 bonus piercing damage.",
            "variantName": "Sniper's Focus"
          },
          "survival": {
            "name": "Survival",
            "variantDesc": "Melee attacks deal {value}% bonus Nature damage.",
            "variantName": "Survivalist"
          }
        },
        "skills": {
          "aimed_shot": {
            "desc": "Passive: Each attack deals 60% bonus ATK damage.",
            "name": "Aimed Shot"
          },
          "bestial_wrath": {
            "desc": "Every 20s: summon ATK ×2 + 30s frenzy (melee DPS).",
            "name": "Bestial Wrath"
          },
          "binding_shot": {
            "desc": "Every 8s: root 1 enemy for 3s.",
            "name": "Binding Shot"
          },
          "call_pet": {
            "desc": "Summons a companion wolf (20s, melee DPS).",
            "name": "Call Pet"
          },
          "explosive_arrow": {
            "desc": "On hit: 70px AoE explosion for ATK×1.5.",
            "name": "Explosive Arrow"
          },
          "explosive_trap": {
            "desc": "Every 12s: 150px AoE ATK×3 explosion + 3s slow.",
            "name": "Explosive Trap"
          },
          "kill_shot": {
            "desc": "Every 15s: instantly kill enemy below 40% HP, or deal ATK×12.",
            "name": "Kill Shot"
          },
          "mongoose_bite": {
            "desc": "Every 20s: single-target ATK×6 + 2s stun.",
            "name": "Mongoose Bite"
          },
          "piercing_shot": {
            "desc": "Every 8s: single-target ATK×8 armor-piercing.",
            "name": "Piercing Shot"
          },
          "poison_arrow": {
            "desc": "Each attack applies 3s poison DoT (ATK×40%/tick).",
            "name": "Poison Arrow"
          },
          "rapid_fire": {
            "desc": "30% chance to fire an additional projectile.",
            "name": "Rapid Fire"
          },
          "serpent_sting": {
            "desc": "Each attack applies 3s poison DoT (ATK×50%/tick).",
            "name": "Serpent Sting"
          }
        },
        "summons": {
          "pet": {
            "name": "Companion Wolf"
          }
        }
      },
      "protagonist_defense": {
        "lore": "The legendary guardian who cleared the 1000th floor of the Infinite Dungeon. Builds the ultimate defense line by making the unique traits of many heroes their own.",
        "name": "Defense Hero",
        "routes": {
          "protagonist_defense_all": {
            "name": "All-rounder",
            "variantDesc": "Absorb up to {value} unique traits of other heroes to gain powerful passives.",
            "variantName": "Trait Absorption"
          }
        }
      },
      "quinchai": {
        "lore": "A Pandaren monk who uses Drunken Fist. Sweeps the battlefield with the spirits of the White Tiger, Black Ox, Jade Serpent, and Red Crane.",
        "name": "Quinchai",
        "routes": {
          "brewmaster": {
            "name": "Brewmaster",
            "variantDesc": "Distributes {value}% of damage taken over 10 seconds.",
            "variantName": "Stagger"
          },
          "mistweaver": {
            "name": "Mistweaver",
            "variantDesc": "When healing, {value}% chance to trigger bonus Mist Heal.",
            "variantName": "Mist Gust"
          },
          "windwalker": {
            "name": "Windwalker",
            "variantDesc": "{value}% chance on attack to strike twice.",
            "variantName": "Drunken Tiger's Blessing"
          }
        },
        "skills": {
          "bm_iron_skin": {
            "desc": "Every 15s: reduce damage taken by 30% for 8s.",
            "name": "Iron Skin Brew"
          },
          "bm_keg": {
            "desc": "Every 8s: deal ATK×3 damage to 5 enemies and slow by 40% for 4s.",
            "name": "Keg Smash"
          },
          "chi_ji": {
            "desc": "Summons Chi-Ji the Red Crane to rapidly heal wounded allies.",
            "name": "Summon Chi-Ji"
          },
          "fists": {
            "desc": "Every 6s: deal ATK×4 AoE damage to enemies within 150px ahead and stun for 1s.",
            "name": "Fists of Fury"
          },
          "flying_kick": {
            "desc": "Every 8s: reduce all nearby enemies' movement speed by 50% for 3s.",
            "name": "Disable"
          },
          "kick": {
            "desc": "{value}% chance on attack to deal ATK×2.5 damage.",
            "name": "Rising Sun Kick"
          },
          "niuzao": {
            "desc": "Summons Niuzao the Black Ox with 90% of self stats as an off-tank.",
            "name": "Summon Niuzao"
          },
          "revival": {
            "desc": "Every 25s: instantly heal all allies for ATK×3 and remove all debuffs.",
            "name": "Revival"
          },
          "vivify": {
            "desc": "Every 5s: heal the lowest HP ally for ATK×4.",
            "name": "Vivify"
          },
          "xuen": {
            "desc": "Summons Xuen the White Tiger to fight alongside for 20s.",
            "name": "Summon Xuen"
          },
          "yu_lon": {
            "desc": "Summons Yu'lon the Jade Serpent to periodically heal all nearby allies for 20s.",
            "name": "Summon Yu'lon"
          }
        },
        "summons": {
          "chi_ji": {
            "name": "Chi-Ji"
          },
          "niuzao": {
            "name": "Niuzao"
          },
          "xuen": {
            "name": "Xuen"
          },
          "yu_lon": {
            "name": "Yu'lon"
          }
        }
      },
      "rakan": {
        "lore": "A witch doctor of curses and poisons.",
        "name": "Rakan",
        "routes": {
          "shadow": {
            "name": "Shadow",
            "variantDesc": "Reflects {value}% of damage taken.",
            "variantName": "Voodoo Doll"
          }
        },
        "skills": {
          "shadow_word_pain": {
            "desc": "Applies continuous Shadow damage.",
            "name": "Shadow Word: Pain"
          },
          "vampiric_touch": {
            "desc": "Deals damage and restores HP.",
            "name": "Vampiric Touch"
          },
          "void_eruption": {
            "desc": "Unleashes void energy.",
            "name": "Void Form"
          }
        }
      },
      "rix": {
        "lore": "A mage who loves playing with fire.",
        "name": "Rix",
        "routes": {
          "fire": {
            "name": "Fire",
            "variantDesc": "Increases Fire DoT by {value}%.",
            "variantName": "Ignition"
          }
        },
        "skills": {
          "fire_blast": {
            "desc": "Instant cast",
            "name": "Fire Blast"
          },
          "fireball": {
            "desc": "Fire damage",
            "name": "Fireball"
          },
          "pyroblast": {
            "desc": "Giant fireball",
            "name": "Pyroblast"
          }
        }
      },
      "seori_garam": {
        "lore": "A Troll High Shaman who communicates with spirits. Wields feral power, elementals, and nature's healing simultaneously.",
        "name": "Seori Garam",
        "routes": {
          "elemental": {
            "name": "Elemental Shaman",
            "variantDesc": "Increases summon stats by {value}%.",
            "variantName": "Elemental Resonance"
          },
          "enhancement": {
            "name": "Enhancement Shaman",
            "variantDesc": "{value}% chance to deal ATK x 2 bonus Nature damage on attack.",
            "variantName": "Totem of Battle"
          },
          "restoration": {
            "name": "Restoration Shaman",
            "variantDesc": "{value}% chance to spread a small heal to nearby allies when healing.",
            "variantName": "Healing Surge"
          }
        },
        "skills": {
          "chain_heal": {
            "desc": "Chain heals 3 allies with lowest HP every 8s (ATK x 3→2→1).",
            "name": "Chain Heal"
          },
          "chain_lightning": {
            "desc": "3-chain lightning strike dealing ATK x 1.5 every 6s.",
            "name": "Chain Lightning"
          },
          "earth_elemental": {
            "desc": "Summons an Earth Elemental (20s, Tank, high HP/DEF).",
            "name": "Summon Earth Elemental"
          },
          "feral_spirit": {
            "desc": "Summons Feral Spirits (20s",
            "name": "Feral Spirit"
          },
          "fire_elemental": {
            "desc": "Summons a Fire Elemental (20s, Ranged DPS, 30% ATK bonus fire damage on attack).",
            "name": "Summon Fire Elemental"
          },
          "healing_rain": {
            "desc": "Heals all allies for ATK x 2 every 12s.",
            "name": "Healing Rain"
          },
          "lava_lash": {
            "desc": "Passive: Deals 30% ATK bonus fire damage on each attack.",
            "name": "Lava Lash"
          },
          "lightning_shield": {
            "desc": "Passive: Reflects 20% ATK as lightning damage when hit.",
            "name": "Lightning Shield"
          },
          "spirit_link": {
            "desc": "Equalizes all allies' HP and reduces damage taken by 20% for 5s every 30s.",
            "name": "Spirit Link"
          },
          "stormstrike": {
            "desc": "Deals ATK x 4 to a single target and applies 2s Slow every 6s.",
            "name": "Stormstrike"
          },
          "totemic_wrath": {
            "desc": "Strikes all enemies with lightning for ATK x 3 every 20s.",
            "name": "Totemic Wrath"
          },
          "water_shield": {
            "desc": "Passive: Restores 15% ATK HP when hit.",
            "name": "Water Shield"
          }
        },
        "summons": {
          "earth_elemental": {
            "name": "Earth Elemental"
          },
          "feral_spirit": {
            "name": "Spirit Wolf"
          },
          "fire_elemental": {
            "name": "Fire Elemental"
          }
        }
      },
      "sylva": {
        "lore": "A Dark Ranger returned from death.",
        "name": "Sylva",
        "routes": {
          "survival": {
            "name": "Survival",
            "variantDesc": "Deals {value}% bonus Shadow damage on attack.",
            "variantName": "Shadow Arrow"
          }
        },
        "skills": {
          "black_arrow": {
            "desc": "Shadow DoT",
            "name": "Black Arrow"
          },
          "explosive_shot": {
            "desc": "AoE Explosion",
            "name": "Explosive Shot"
          },
          "raptor_strike": {
            "desc": "Melee strike",
            "name": "Raptor Strike"
          }
        }
      },
      "taran": {
        "lore": "Leader of the Shado-Pan.",
        "name": "Taran",
        "routes": {
          "subtlety": {
            "name": "Subtlety",
            "variantDesc": "Armor penetration {value}%.",
            "variantName": "Find Weakness"
          }
        },
        "skills": {
          "eviscerate": {
            "desc": "Finishing move",
            "name": "Eviscerate"
          },
          "secret_technique": {
            "desc": "Cloned attack",
            "name": "Secret Technique"
          },
          "shadowstrike": {
            "desc": "Stealth attack",
            "name": "Shadowstrike"
          }
        }
      },
      "trontum": {
        "lore": "A Dark Iron Dwarf Death Knight from the depths of the Burning Mountain.",
        "name": "Trontum",
        "routes": {
          "frost": {
            "name": "Frost",
            "variantDesc": "Deals {value}% bonus Frost damage on attack.",
            "variantName": "Frostblade"
          }
        },
        "skills": {
          "frost_strike": {
            "desc": "Frost damage + Slow",
            "name": "Frost Strike"
          },
          "howling_blast": {
            "desc": "AoE Frost",
            "name": "Howling Blast"
          },
          "obliterate": {
            "desc": "Powerful 2-hit strike",
            "name": "Obliterate"
          },
          "pillar_of_frost": {
            "desc": "Increases Attack Power",
            "name": "Pillar of Frost"
          }
        }
      },
      "tutankaton": {
        "lore": "An Earthen rogue made of living stone. Approaches stealthily with a sturdy body.",
        "name": "Tutankaton",
        "routes": {
          "assassination": {
            "name": "Assassination",
            "variantDesc": "Increases Poison damage by {value}%.",
            "variantName": "Toxic Expert"
          }
        },
        "skills": {
          "envenom": {
            "desc": "Poison explosion damage",
            "name": "Envenom"
          },
          "garrote": {
            "desc": "Bleed + Poison",
            "name": "Garrote"
          },
          "rupture": {
            "desc": "Poison DoT",
            "name": "Rupture"
          },
          "venom_burst": {
            "desc": "AoE Poison explosion",
            "name": "Venom Burst"
          }
        }
      },
      "tyran": {
        "lore": "A Demon Hunter who wields hellfire.",
        "name": "Tyran",
        "routes": {
          "havoc": {
            "name": "Havoc",
            "variantDesc": "Increases Critical Strike damage by {value}%.",
            "variantName": "Chaos Strike"
          }
        },
        "skills": {
          "chaos_strike": {
            "desc": "Fire strike",
            "name": "Chaos Strike"
          },
          "immolation_aura": {
            "desc": "Surrounding fire",
            "name": "Immolation Aura"
          },
          "metamorphosis": {
            "desc": "Stats enhancement",
            "name": "Metamorphosis"
          }
        }
      },
      "ultrion": {
        "lore": "An ancient Dracthyr awakened on the Dragon Isles. Wields the power of the chromatic dragons to heal, buff allies, or destroy enemies.",
        "name": "Ultrion",
        "routes": {
          "augmentation": {
            "name": "Augmentation",
            "variantDesc": "Aura: Increases Attack Speed of all allies within 250px by {value}%.",
            "variantName": "Essence of Empowerment"
          },
          "devastation": {
            "name": "Devastation",
            "variantDesc": "{value}% chance to deal ATK x 2 bonus damage to enemies within 100px of target on attack.",
            "variantName": "Aura of Ruin"
          },
          "preservation": {
            "name": "Preservation",
            "variantDesc": "{value}% chance to heal 2 additional nearby allies when healing.",
            "variantName": "Breath of Life"
          }
        },
        "skills": {
          "blistering_scales": {
            "desc": "Grants +40 DEF and 30% ATK reflection to a tank ally for 10s every 12s.",
            "name": "Blistering Scales"
          },
          "breath_of_eons": {
            "desc": "Stuns all enemies for 3s and increases all allies' damage by 20% for 10s every 30s.",
            "name": "Breath of Eons"
          },
          "disintegrate": {
            "desc": "Deals ATK x 4 damage per second for 3s and applies 50% Slow to a single target every 12s.",
            "name": "Disintegrate"
          },
          "dragonrage": {
            "desc": "Increases Attack Power and Attack Speed by 50% for 10s every 20s.",
            "name": "Dragonrage"
          },
          "ebon_might": {
            "desc": "Increases ATK of the 2 allies with highest Attack Power by 30% for 8s every 10s.",
            "name": "Ebon Might"
          },
          "eternity_surge": {
            "desc": "{value}% chance to deal ATK x 3 damage to 3 nearby enemies on attack.",
            "name": "Eternity Surge"
          },
          "fire_breath": {
            "desc": "Deals ATK x 5 damage to all frontal enemies and applies Fire DoT for 5s every 8s.",
            "name": "Fire Breath"
          },
          "reversion": {
            "desc": "Grants ATK x 0.5 periodic healing for 8s to a target every 6s.",
            "name": "Reversion"
          },
          "spiritbloom": {
            "desc": "Instantly heals 3 allies with lowest HP for ATK x 4 every 8s.",
            "name": "Spiritbloom"
          },
          "stasis": {
            "desc": "Instantly heals all allies for ATK x 5 and grants damage immunity for 2s every 25s.",
            "name": "Stasis"
          },
          "temporal_anomaly": {
            "desc": "Grants a shield equal to 15% of Max HP to all allies for 6s every 12s.",
            "name": "Temporal Anomaly"
          },
          "upheaval": {
            "desc": "Deals ATK x 5 damage and stuns enemies near the target for 2s every 15s.",
            "name": "Upheaval"
          }
        }
      },
      "velen": {
        "lore": "A Draenei Prophet.",
        "name": "Velen",
        "routes": {
          "holy": {
            "name": "Holy",
            "variantDesc": "Reduces cooldown by {value}% when healing.",
            "variantName": "Light of Salvation"
          }
        },
        "skills": {
          "circle_of_healing": {
            "desc": "AoE Heal",
            "name": "Circle of Healing"
          },
          "divine_hymn": {
            "desc": "Periodic healing to all allies for 4s.",
            "name": "Divine Hymn"
          },
          "flash_heal": {
            "desc": "Fast heal",
            "name": "Flash Heal"
          },
          "holy_word_salvation": {
            "desc": "Large-scale healing for all allies.",
            "name": "Holy Word: Salvation"
          }
        }
      },
      "voljin": {
        "lore": "A Shadow Hunter.",
        "name": "Voljin",
        "routes": {
          "enhancement": {
            "name": "Enhancement",
            "variantDesc": "Increases Attack Speed by {value}%.",
            "variantName": "Shadow Hunter"
          }
        },
        "skills": {
          "big_bad_voodoo": {
            "desc": "AoE Invulnerability",
            "name": "Big Bad Voodoo"
          },
          "hex": {
            "desc": "Polymorph",
            "name": "Hex"
          },
          "shadow_strike": {
            "desc": "Shadow weapon attack",
            "name": "Shadow Strike"
          }
        }
      },
      "xianghua": {
        "lore": "A Pandaren monk who wields healing mists.",
        "name": "Xianghua",
        "routes": {
          "mistweaver": {
            "name": "Mistweaver",
            "variantDesc": "{value}% chance for smart heal on attack.",
            "variantName": "Mistweaving"
          }
        },
        "skills": {
          "enveloping_mist": {
            "desc": "Strong heal + HoT",
            "name": "Enveloping Mist"
          },
          "invoke_chi_ji": {
            "desc": "Periodic healing to all allies for 8s.",
            "name": "Invoke Chi-Ji"
          },
          "life_cocoon": {
            "desc": "Shield + HoT",
            "name": "Life Cocoon"
          },
          "revival": {
            "desc": "Mass recovery",
            "name": "Revival"
          },
          "soothing_mist": {
            "desc": "Channeling heal",
            "name": "Soothing Mist"
          }
        }
      },
      "yeshtalktion": {
        "lore": "A Lightforged Draenei Paladin who wields the power of pure light.",
        "name": "Yeshtalktion",
        "routes": {
          "holy": {
            "name": "Holy Paladin",
            "variantDesc": "{value}% chance to trigger linked heal when healing.",
            "variantName": "Holy Light"
          },
          "retribution": {
            "name": "Retribution Paladin",
            "variantDesc": "{value}% bonus damage on next attack after healing.",
            "variantName": "Holy Retribution"
          }
        },
        "skills": {
          "crusader_strike": {
            "desc": "Holy strike",
            "name": "Crusader Strike"
          },
          "divine_favor": {
            "desc": "Double heal + Cooldown reset",
            "name": "Divine Favor"
          },
          "divine_purpose": {
            "desc": "Cooldown reduction acceleration",
            "name": "Divine Purpose"
          },
          "final_reckoning": {
            "desc": "AoE Damage + Heal",
            "name": "Final Reckoning"
          },
          "hammer_of_wrath": {
            "desc": "Finishing move",
            "name": "Hammer of Wrath"
          },
          "holy_light": {
            "desc": "Powerful single-target heal",
            "name": "Holy Light"
          },
          "sacred_shield": {
            "desc": "Grants a shield (15% Max HP, 8s) to the heal target.",
            "name": "Sacred Shield"
          },
          "sanctified_ground": {
            "desc": "Area healing + Damage reduction",
            "name": "Sanctified Ground"
          }
        }
      },
      "yrel": {
        "lore": "A Champion of the Light.",
        "name": "Yrel",
        "routes": {
          "protection": {
            "name": "Protection",
            "variantDesc": "Reduces damage taken by {value}%.",
            "variantName": "Devoted Guardian"
          }
        },
        "skills": {
          "divine_storm": {
            "desc": "AoE ATK x 5 Holy damage + Self-heal",
            "name": "Divine Storm"
          },
          "guardian_of_kings": {
            "desc": "15% damage reduction for all allies for 10s.",
            "name": "Guardian of Kings"
          },
          "hammer_of_righteous": {
            "desc": "AoE Holy damage",
            "name": "Hammer of the Righteous"
          },
          "light_protection": {
            "desc": "Grants a shield (15% HP) to the ally with lowest HP for 5s.",
            "name": "Light of Protection"
          }
        }
      },
      "zedah": {
        "lore": "A guardian returned from death. Protects allies with a shield tempered by hellfire.",
        "name": "Zedah",
        "routes": {
          "defense": {
            "name": "Defense",
            "variantDesc": "Reflects {value}% of damage when hit.",
            "variantName": "Thorn Armor"
          },
          "fury": {
            "name": "Fury",
            "variantDesc": "{value}% chance for a 3-hit combo on attack.",
            "variantName": "Thorn Instinct"
          },
          "weapon": {
            "name": "Weapon",
            "variantDesc": "Every 3rd hit deals ATK x {value}% bonus fire damage.",
            "variantName": "Hellfire Blade"
          }
        },
        "skills": {
          "execute_instinct": {
            "desc": "2x ATK against enemies below 30% HP.",
            "name": "Executioner"
          },
          "heat_blade": {
            "desc": "Each attack deals 20% ATK bonus fire damage.",
            "name": "Heat Blade"
          },
          "hellfire_slash": {
            "desc": "Deals ATK x 4 fire damage to frontal 160px enemies every 8s.",
            "name": "Hellfire Slash"
          },
          "lava_armor": {
            "desc": "Deals 30% ATK fire damage to attackers when hit.",
            "name": "Lava Armor"
          },
          "steel_shield": {
            "desc": "Passive: +25 Defense.",
            "name": "Steel Shield"
          },
          "thorn_edge": {
            "desc": "Reflection amount +15%.",
            "name": "Engraving of Thorn Edge"
          },
          "weapon_mastery": {
            "desc": "Passive: +25% Attack Power.",
            "name": "Weapon Mastery"
          }
        }
      },
      "zuljin": {
        "lore": "A legendary axe thrower.",
        "name": "Zuljin",
        "routes": {
          "combat": {
            "name": "Combat",
            "variantDesc": "Increases Attack Speed by {value}% when HP is low.",
            "variantName": "Berserker"
          }
        },
        "skills": {
          "guillotine": {
            "desc": "Drops a massive axe from above.",
            "name": "Guillotine"
          },
          "throw_axe": {
            "desc": "Deals ranged physical damage.",
            "name": "Throw Axe"
          },
          "twin_cleave": {
            "desc": "Deals AoE damage in a forward arc.",
            "name": "Twin Cleave"
          }
        }
      },
      "aeina": {
        "name": "Aeina",
        "lore": "A Draenei priestess who has embraced the void.",
        "routes": {
          "void": {
            "name": "Void",
            "variantName": "Void Eruption",
            "variantDesc": "{{value}}% chance on attack to spread AoE damage."
          }
        },
        "skills": {
          "mind_flay": {
            "name": "Mind Flay",
            "desc": "Channel damage + slow"
          },
          "mind_blast": {
            "name": "Void Bomb",
            "desc": "Single-target heavy hit"
          },
          "devouring_plague": {
            "name": "Devouring Plague",
            "desc": "DoT + lifesteal"
          },
          "void_form": {
            "name": "Void Form",
            "desc": "Transform enhancement"
          }
        }
      },
      "ssr_goblin_warchief": {
        "summons": {
          "gold_turret": {
            "name": "Golden Turret"
          }
        },
        "name": "Goblin Warchief",
        "lore": "The leader of goblins armed with money and technology. Overwhelms enemies with a massive mech suit and the power of gold.",
        "routes": {
          "goblin_chief_shredder": {
            "name": "Mech Suit",
            "variantName": "Golden Armor",
            "variantDesc": "Reduces damage taken by {value}% and counters with lightning when hit."
          },
          "goblin_chief_merchant": {
            "name": "Magnate",
            "variantName": "Power of Capital",
            "variantDesc": "When attacking, {value}% chance to permanently increase gold earned by 1% (max 50%)."
          }
        },
        "skills": {
          "gold_toss": {
            "name": "Gold Toss",
            "desc": "Deals ATK×5 damage to 1 enemy and stuns for 2s."
          },
          "repair": {
            "name": "Mechanical Repair",
            "desc": "Passive: Recovers 2.5% HP per second."
          },
          "turret": {
            "name": "Enhanced Turret",
            "desc": "Summons a Golden Turret (permanent)."
          },
          "shield": {
            "name": "Tech Barrier",
            "desc": "Grants all allies a shield worth 30% of their HP."
          },
          "beam": {
            "name": "Golden Beam",
            "desc": "Deals ATK×12 holy damage to all enemies ahead."
          },
          "rocket": {
            "name": "Rocket Launch",
            "desc": "Deals ATK×4 explosion damage to 3 enemies."
          },
          "mine": {
            "name": "Mine Placement",
            "desc": "Plants mines on the battlefield: Enemies who step on them take ATK×6 damage."
          },
          "bribe": {
            "name": "Bribe",
            "desc": "Turns 1 enemy into an ally for 10s (stuns bosses)."
          },
          "investment": {
            "name": "Investment",
            "desc": "Increases ATK of all allies by 50% for 10s."
          },
          "bombardment": {
            "name": "Aerial Bombardment",
            "desc": "Indiscriminate rocket bombardment across the entire screen for ATK×15."
          }
        }
      },
      "ssr_orc_blademaster": {
        "summons": {
          "mirror_image": {
            "name": "Image"
          },
          "ghost": {
            "name": "Haunt"
          }
        },
        "name": "Orc Blademaster",
        "lore": "Legendary blademaster of the Burning Blade clan. Wields swordsmanship faster than wind and hotter than flames.",
        "routes": {
          "blademaster_sword": {
            "name": "Sword Way",
            "variantName": "Mirror Image",
            "variantDesc": "When Attack, {value}% Chance to Summon Mirror Image and Increase Critical Chance."
          },
          "blademaster_ghost": {
            "name": "Ghost Way",
            "variantName": "Ghost Step",
            "variantDesc": "When Attack, {value}% Chance to Pierce Enemy, Move Behind, and Slash."
          }
        },
        "skills": {
          "windwalk": {
            "name": "Wind Walk",
            "desc": "Increase Move Speed by 50% and Stealth for 5s, Next Attack deals 3x Damage."
          },
          "mirror_image": {
            "name": "Mirror Image",
            "desc": "Summon 3 Clones identical to self."
          },
          "critical_strike": {
            "name": "Critical Strike",
            "desc": "Passive: 25% Chance to deal 4x Damage."
          },
          "burning_blade": {
            "name": "Burning Blade",
            "desc": "When Attack, deal additional Fire Damage and Increase ATK by 50% for 5s."
          },
          "bladestorm": {
            "name": "Bladestorm",
            "desc": "Invincible for 10s and deals continuous AoE ATK x5 Damage to nearby enemies."
          },
          "ghost_strike": {
            "name": "Ghost Strike",
            "desc": "Deals Single ATK x8 Shadow Damage + 3s Fear."
          },
          "spirit_link": {
            "name": "Spirit Link",
            "desc": "Links 3 Enemies to share damage taken."
          },
          "haunt": {
            "name": "Haunt",
            "desc": "Summon fallen enemies as Ghost Soldiers for 10s."
          },
          "night_terror": {
            "name": "Night Terror",
            "desc": "All Enemies Blinded and deals continuous damage every second."
          },
          "ghost_army": {
            "name": "Ghost Army Requiem",
            "desc": "Summon Ghost Army to Bomb the entire Battlefield for ATK x20 Damage."
          }
        }
      },
      "ssr_tauren_chieftain": {
        "summons": {
          "ancestor": {
            "name": "Ancestral Spirit"
          }
        },
        "name": "Redmane Chieftain",
        "lore": "Guardian of the Red Peaks and Voice of the Earthmother. His stomp splits the earth, and his will transcends death.",
        "routes": {
          "tauren_chieftain_guardian": {
            "name": "Reincarnation",
            "variantName": "Reincarnation",
            "variantDesc": "Immediately Resurrect with {value}% HP upon death (Cooldown 60s)."
          },
          "tauren_chieftain_spirit": {
            "name": "Spirit",
            "variantName": "Spirit Guidance",
            "variantDesc": "When Attack, {value}% Chance to deal additional Nature Damage and Heal."
          }
        },
        "skills": {
          "shockwave": {
            "name": "Shockwave",
            "desc": "Deals ATK x5 Damage to enemies in a forward cone and stuns for 2s."
          },
          "war_stomp": {
            "name": "War Stomp",
            "desc": "Stuns Nearby Enemies for 3s and deals ATK x4 Damage."
          },
          "endurance_aura": {
            "name": "Endurance Aura",
            "desc": "Passive: Increases All Allies' Attack Speed and Move Speed by 20%."
          },
          "earth_shield": {
            "name": "Earth Shield",
            "desc": "Grants a shield to allies that restores HP when hit."
          },
          "reincarnation": {
            "name": "Earth Blessing",
            "desc": "When Resurrected, 3x ATK and Invincible for 15s."
          },
          "nature_fury": {
            "name": "Nature Fury",
            "desc": "Deals Single ATK x8 Nature Damage."
          },
          "spirit_link": {
            "name": "Spirit Link",
            "desc": "Links 3 Allies to reduce damage taken by 30% and distribute it."
          },
          "totem_mastery": {
            "name": "Totem Mastery",
            "desc": "Summons 4 types of totems (Attack/Defense/Heal/Speed) simultaneously."
          },
          "ancestral_call": {
            "name": "Ancestral Call",
            "desc": "Summons 2 Ancestral Spirits to fight together (Permanent)."
          },
          "world_stomp": {
            "name": "World Stomp",
            "desc": "Deals ATK x15 Damage to All Enemies on the Battlefield and stuns for 5s."
          }
        }
      },
      "ssr_ice_queen": {
        "summons": {
          "frost_elemental": {
            "name": "Frost Elemental"
          }
        },
        "name": "Frost Queen",
        "lore": "Cold ruler of the ice country. With a single breath, the battlefield is covered in eternal winter.",
        "routes": {
          "ice_queen_frost": {
            "name": "Frost",
            "variantName": "Absolute Zero",
            "variantDesc": "Enhances Slow effect by {value}% and increases Freeze duration."
          },
          "ice_queen_shard": {
            "name": "Ice Shard",
            "variantName": "Frost Shards",
            "variantDesc": "When Attack, {value}% Chance to fire 3 additional ice arrows."
          }
        },
        "skills": {
          "frost_nova": {
            "name": "Frost Nova",
            "desc": "Freezes all enemies on screen for 3s and deals ATK x4 Damage."
          },
          "barrier": {
            "name": "Ice Barrier",
            "desc": "Grants all allies a 25% HP Shield + slows enemies that hit."
          },
          "blizzard": {
            "name": "Blizzard",
            "desc": "Blizzard for 15s: 20% Slow stacks every second and deals continuous damage."
          },
          "frozen_statue": {
            "name": "Frozen Statue",
            "desc": "Completely seals the strongest enemy for 10s."
          },
          "frozen_orb": {
            "name": "Frost Storm",
            "desc": "Giant ice orb explodes, Instant Killing all enemies on battlefield (Bosses take ATK x20)."
          },
          "shard_barrage": {
            "name": "Shard Barrage",
            "desc": "Fires countless shards at the enemy for ATK x1.5 x 8 hits."
          },
          "cold_snap": {
            "name": "Cold Snap",
            "desc": "Passive: Increases self Frost Damage by 40%."
          },
          "glacier_spike": {
            "name": "Glacial Spike",
            "desc": "Throws a giant glacial spike to deal piercing damage to all enemies in the path."
          },
          "water_elemental": {
            "name": "Frost Elemental Legion",
            "desc": "Summons 3 Frost Elementals (Ranged"
          },
          "absolute_zero": {
            "name": "Absolute Zero",
            "desc": "Stops everything on the battlefield and deals ATK x15 Damage."
          }
        }
      },
      "ssr_death_knight": {
        "summons": {
          "abomination": {
            "name": "Abomination"
          },
          "undead": {
            "name": "Undead"
          }
        },
        "name": "Death Knight",
        "lore": "Immortal knight guarding the forsaken city. Death is not an end but just a new beginning for him.",
        "routes": {
          "death_knight_blood": {
            "name": "Blood",
            "variantName": "Rigor Mortis",
            "variantDesc": "Converts {value}% of damage taken into HP Restore."
          },
          "death_knight_unholy": {
            "name": "Unholy",
            "variantName": "Touch of Corruption",
            "variantDesc": "When Attack, {value}% Chance to permanently reduce enemy DEF by 10% (Max 5 stacks)."
          }
        },
        "skills": {
          "death_strike": {
            "name": "Death Strike",
            "desc": "Deals Single ATK x6 Damage and restores 50% of damage dealt."
          },
          "blood_boil": {
            "name": "Blood Boil",
            "desc": "Deals ATK x4 Damage to all nearby enemies and causes Bleeding."
          },
          "vampiric_blood": {
            "name": "Vampiric Blood",
            "desc": "Increases Max HP by 50% and doubles healing for 10s."
          },
          "rune_weapon": {
            "name": "Dancing Rune Weapon",
            "desc": "Summons a Rune Weapon that assists attack and blocks damage."
          },
          "purgatory": {
            "name": "Purgatory",
            "desc": "Resurrects with Invincibility upon death, restoring HP equal to damage dealt for 15s."
          },
          "death_grip": {
            "name": "Death Grip",
            "desc": "Pulls the farthest enemy forward and stuns for 3s."
          },
          "anti_magic_shell": {
            "name": "Anti-Magic Shell",
            "desc": "Nullifies all magic damage for all allies for 5s."
          },
          "outbreak": {
            "name": "Outbreak",
            "desc": "Immediately spreads powerful disease (DoT) to all enemies."
          },
          "summon_abom": {
            "name": "Summon Abomination",
            "desc": "Summons 1 giant Abomination (Permanent Tank)."
          },
          "army_of_dead": {
            "name": "Army of the Dead",
            "desc": "Summons 15 Ghouls to devastate the battlefield."
          }
        }
      },
      "ssr_poison_mancer": {
        "summons": {
          "zombie": {
            "name": "Zombie"
          }
        },
        "name": "Venomancer",
        "lore": "One who learned forbidden arts in the venomous swamps. His plague rots everything that has life.",
        "routes": {
          "venomancer_plague": {
            "name": "Plague",
            "variantName": "Venom Spread",
            "variantDesc": "When Poison damage dealt, {value}% Chance for additional venom explosion."
          },
          "venomancer_voodoo": {
            "name": "Voodoo",
            "variantName": "Shadow Curse",
            "variantDesc": "When Attack, {value}% Chance to polymorph target into a frog for 5s."
          }
        },
        "skills": {
          "plague_cloud": {
            "name": "Plague Cloud",
            "desc": "Wide area continuous Poison damage and reduces DEF by 30%."
          },
          "venomous_gale": {
            "name": "Venomous Gale",
            "desc": "Deals ATK x5 Damage to enemies in a line and roots for 3s."
          },
          "contagion": {
            "name": "Contagion",
            "desc": "When a poisoned enemy dies, transfers powerful poison to nearby enemies."
          },
          "toxic_injection": {
            "name": "Toxic Injection",
            "desc": "Passive: Adds powerful continuous Poison damage to all self attacks."
          },
          "epidemic": {
            "name": "Epidemic",
            "desc": "Immediately poisons all enemies and deals 50% HP Damage (Bosses take ATK x15)."
          },
          "hex_totem": {
            "name": "Hex Totem",
            "desc": "Summons a totem that periodically polymorphs nearby enemies."
          },
          "voodoo_curse": {
            "name": "Voodoo Curse",
            "desc": "Grants 50% Damage Taken increase debuff to 3 enemies."
          },
          "shadow_voodoo": {
            "name": "Shadow Voodoo",
            "desc": "Grants 20% Life Steal effect to all allies for 10s."
          },
          "zombie_army": {
            "name": "Zombie Army",
            "desc": "Summons 10 slow but powerful zombies."
          },
          "death_ritual": {
            "name": "Death Ritual",
            "desc": "Instant Kill the strongest enemy (Bosses take 30% of Max HP)."
          }
        }
      },
      "ssr_merc_king": {
        "summons": {
          "elite_merc": {
            "name": "Enhanced Mercenary"
          },
          "veteran_merc": {
            "name": "Veteran Mercenary"
          }
        },
        "name": "Mercenary King",
        "lore": "Ruler of the battlefield respected by all mercenaries. Leads any war to victory with money and strategy.",
        "routes": {
          "merc_king_tactics": {
            "name": "Tactics",
            "variantName": "Battle Command",
            "variantDesc": "Increases All Allies' Attack Speed by {value}%."
          },
          "merc_king_assassin": {
            "name": "Assassin",
            "variantName": "Ruthless Deal",
            "variantDesc": "When Attack, {value}% Chance to ignore 50% of the target's DEF."
          }
        },
        "skills": {
          "war_cry": {
            "name": "Victory Shout",
            "desc": "Increases All Allies' ATK by 30% for 10s."
          },
          "bounty_hunt": {
            "name": "Bounty Hunt",
            "desc": "Doubles gold acquired upon killing enemies (Permanent)."
          },
          "tactical_strike": {
            "name": "Tactical Strike",
            "desc": "Deals Single ATK x10 Physical Damage to a powerful enemy."
          },
          "recruit": {
            "name": "Recruit Mercenaries",
            "desc": "Summons 2 additional Enhanced Mercenaries (Permanent)."
          },
          "kings_army": {
            "name": "Summon Mercenary Group",
            "desc": "Summons 5 Veteran Mercenaries to fight together for 20s."
          },
          "poison_blade": {
            "name": "Poisoned Blade",
            "desc": "Deals Single ATK x4 + powerful Poison DoT."
          },
          "shadow_step": {
            "name": "Shadow Step",
            "desc": "Moves behind the target and deals ATK x6 Damage."
          },
          "blood_money": {
            "name": "Blood Money",
            "desc": "Passive: Acquires gold equal to 20% of damage dealt upon attack."
          },
          "execution": {
            "name": "Execution",
            "desc": "Instant Kill enemies with HP below 30% (Massive damage to Bosses)."
          },
          "contract_kill": {
            "name": "Contract Kill",
            "desc": "Marks all enemies: ATK x20 Damage after 10s."
          }
        }
      },
      "ssr_ele_scholar": {
        "summons": {
          "mage_clone": {
            "name": "Mage Clone"
          }
        },
        "name": "Elemental Scholar",
        "lore": "Archmage who academically perfected the power of all elementals. Rules the battlefield using elemental affinities.",
        "routes": {
          "ele_master_theory": {
            "name": "Elementalism",
            "variantName": "Elemental Resonance",
            "variantDesc": "Enhances all synergy effects by {value}%."
          },
          "ele_master_battle": {
            "name": "Battle Magic",
            "variantName": "Mana Surge",
            "variantDesc": "When Attack, {value}% Chance to reset one skill on cooldown."
          }
        },
        "skills": {
          "elemental_shift": {
            "name": "Elemental Shift",
            "desc": "Randomly changes self attack element and increases damage by 20%."
          },
          "prismatic_beam": {
            "name": "Prismatic Beam",
            "desc": "Simultaneously deals 3 types of elemental damage for ATK x4 to 3 enemies."
          },
          "catalyst": {
            "name": "Catalyst Reaction",
            "desc": "Doubles the duration of harmful effects on enemies."
          },
          "arcane_intellect": {
            "name": "Arcane Intellect",
            "desc": "Passive: Increases All Allies' Skill Damage by 30%."
          },
          "elemental_overload": {
            "name": "Elemental Overload",
            "desc": "Causes a massive 4-element explosion across the screen for ATK x12."
          },
          "arcane_blast": {
            "name": "Arcane Blast",
            "desc": "Deals ATK x6 Damage + strengthens next Blast."
          },
          "frost_fire_bolt": {
            "name": "Frostfire Bolt",
            "desc": "Deals combined Frost + Fire Damage and Slow."
          },
          "mirror_image": {
            "name": "Mirror Image",
            "desc": "Summons 2 Clones with same ATK as self."
          },
          "focus_magic": {
            "name": "Focus Magic",
            "desc": "Increases self Attack Speed by 100% for 10s."
          },
          "greater_pyro": {
            "name": "Greater Pyroblast",
            "desc": "Deals 35% Max HP Damage to all target enemies."
          }
        }
      },
      "ssr_sea_ruler": {
        "summons": {
          "tentacle": {
            "name": "Abyssal Tentacle"
          }
        },
        "name": "Sea Ruler",
        "lore": "Eternal guardian of the sunken temple. Rules over sea's vitality and destructive tsunamis.",
        "routes": {
          "sea_ruler_tide": {
            "name": "Tide",
            "variantName": "Wave of Life",
            "variantDesc": "When Healing, {value}% Chance to grant additional heal to all allies."
          },
          "sea_ruler_abyss": {
            "name": "Abyss",
            "variantName": "Abyssal Fear",
            "variantDesc": "When Attack, {value}% Chance to Fear target (immobile) for 3s."
          }
        },
        "skills": {
          "tsunami": {
            "name": "Tsunami",
            "desc": "Knocks enemies back far and deals ATK x5 Water Damage."
          },
          "healing_tide": {
            "name": "Healing Tide",
            "desc": "Summons a totem that restores 3% HP to all allies every second for 15s."
          },
          "water_shield": {
            "name": "Water Shield",
            "desc": "Increases all allies' DEF by 40% and grants shields."
          },
          "cleanse": {
            "name": "Cleanse Wave",
            "desc": "Removes all allies' debuffs and heals for ATK x6."
          },
          "blessing_of_abyss": {
            "name": "Blessing of Abyss",
            "desc": "Invincible and Full Restore for all allies for 10s."
          },
          "abyss_bolt": {
            "name": "Abyss Bolt",
            "desc": "Deals Single ATK x7 Shadow + Water combined Damage."
          },
          "crushing_depths": {
            "name": "Crushing Depths",
            "desc": "Reduces target's Move Speed by 90% and deals continuous damage."
          },
          "summon_kraken": {
            "name": "Summon Kraken Tentacle",
            "desc": "Summons 3 Abyssal Tentacles to attack random enemies."
          },
          "maelstrom": {
            "name": "Maelstrom",
            "desc": "Pulls all enemies to the center and deals ATK x5 Damage."
          },
          "eye_of_storm": {
            "name": "Eye of Abyss",
            "desc": "Summon Eye of Abyss: Continuous damage and Silence to all enemies on battlefield for 20s."
          }
        }
      },
      "ssr_demon_lord": {
        "summons": {
          "infernal": {
            "name": "Infernal"
          },
          "imp": {
            "name": "Fel Imp"
          },
          "guardian": {
            "name": "Felguard"
          },
          "elite_demon": {
            "name": "Elite Demon"
          }
        },
        "name": "Demon Lord",
        "lore": "Hell commander who crossed the rift. Commands the burning legion and destroys enemy souls.",
        "routes": {
          "demon_lord_chaos": {
            "name": "Chaos",
            "variantName": "Chaos Strike",
            "variantDesc": "When Attack, {value}% Chance to deal 3x Damage."
          },
          "demon_lord_summon": {
            "name": "Overlord",
            "variantName": "Demonic Power",
            "variantDesc": "Increases self Attack Speed by {value}% while summons exist."
          }
        },
        "skills": {
          "fel_strike": {
            "name": "Fel Strike",
            "desc": "Deals ATK x5 Fire Damage to all enemies in front."
          },
          "summon_infernal": {
            "name": "Summon Infernal",
            "desc": "Summons an Infernal (25s"
          },
          "chaos_aura": {
            "name": "Chaos Aura",
            "desc": "Passive: Reduces nearby enemy Move Speed by 30% and deals continuous damage."
          },
          "soul_rend": {
            "name": "Soul Rend",
            "desc": "Deals ATK x10 Shadow Damage + increases damage taken for 5s."
          },
          "world_ender": {
            "name": "World Ender",
            "desc": "Massive explosion on the entire battlefield for ATK x15 Damage."
          },
          "summon_imp": {
            "name": "Imp Swarm",
            "desc": "Immediately summons 5 Imps (Ranged)."
          },
          "fel_guard": {
            "name": "Felguard",
            "desc": "Summons 1 powerful Felguard (Permanent)."
          },
          "demonic_empowerment": {
            "name": "Demonic Empowerment",
            "desc": "Doubles summons' ATK for 15s."
          },
          "portal": {
            "name": "Open Portal",
            "desc": "Summons a portal from which random demons pour out."
          },
          "legion_commander": {
            "name": "Legion Commander",
            "desc": "Summons 10 Elite Demon Soldiers and charges forward."
          }
        }
      },
      "ssr_blade_lord": {
        "summons": {
          "blade_wraith": {
            "name": "Blade Wraith"
          }
        },
        "name": "Blade Lord",
        "lore": "Infinite blade lord born from death. When his blade dance begins, even the enemy's breath stops.",
        "routes": {
          "blade_lord_annihilation": {
            "name": "Annihilation",
            "variantName": "Shadow Multi-Strike",
            "variantDesc": "When Attack, {value}% Chance to deal 5 consecutive hits."
          },
          "blade_lord_reaper": {
            "name": "Reaper",
            "variantName": "Soul Harvest",
            "variantDesc": "When killing an enemy, {value}% Chance to permanently increase ATK by 1 (Max 200)."
          }
        },
        "skills": {
          "shadow_barrage": {
            "name": "Shadow Barrage",
            "desc": "Deals ATK x2 Damage to enemy for 5 consecutive times."
          },
          "execution_blade": {
            "name": "Execution Blade",
            "desc": "Instant Kill enemies with HP below 30%, Bosses take ATK x10 Damage."
          },
          "blood_aura": {
            "name": "Blood Aura",
            "desc": "Passive: 20% Life Steal for all nearby allies' damage."
          },
          "blade_dance": {
            "name": "Infinite Blade Dance",
            "desc": "Moves quickly between enemies and deals ATK x6 Damage."
          },
          "endless_slash": {
            "name": "Endless Slash",
            "desc": "Zero attack Cooldown and 2.5x all damage for 10s."
          },
          "soul_reap": {
            "name": "Soul Reap",
            "desc": "Deals Single ATK x12 Shadow Damage."
          },
          "death_grip": {
            "name": "Death Grip",
            "desc": "Pulls 1 enemy and roots them for 3s."
          },
          "fear_shout": {
            "name": "Fear Shout",
            "desc": "All nearby enemies Feared for 4s."
          },
          "summon_specter": {
            "name": "Summon Specter",
            "desc": "Summons own shadow as a Specter (Permanent)."
          },
          "reapers_toll": {
            "name": "Reaper's Toll",
            "desc": "Deals ATK x20 Shadow Damage to all enemies on the battlefield."
          }
        }
      },
      "ssr_golden_archer": {
        "summons": {
          "griffin": {
            "name": "Golden Griffin"
          }
        },
        "name": "Golden Archer",
        "lore": "Legendary archer of the never-missing golden arrows. His arrows pierce even the sky.",
        "routes": {
          "golden_archer_marksman": {
            "name": "Golden Shot",
            "variantName": "Golden Arrow",
            "variantDesc": "Attacks never miss and Damage increases by {value}%."
          },
          "golden_archer_beast": {
            "name": "Beast",
            "variantName": "Golden Bond",
            "variantDesc": "Increases summoned beast's ATK by {value}% of self ATK."
          }
        },
        "skills": {
          "golden_arrow": {
            "name": "Golden Arrow",
            "desc": "Deals Single ATK x10 Light Damage and stuns for 3s."
          },
          "rapid_fire": {
            "name": "Rapid Fire",
            "desc": "Increases Attack Speed by 3x for 10s."
          },
          "eagle_eye": {
            "name": "Eagle Eye",
            "desc": "Passive: Infinite range"
          },
          "star_shot": {
            "name": "Star Shot",
            "desc": "Deals ATK x6 explosive damage to all enemies around target."
          },
          "golden_shower": {
            "name": "Golden Shower",
            "desc": "Sprays 100 golden arrows across the entire battlefield for ATK x15."
          },
          "summon_griffin": {
            "name": "Summon Griffin",
            "desc": "Summons a Griffin (Permanent Ranged)."
          },
          "beast_wrath": {
            "name": "Beastial Wrath",
            "desc": "Doubles summons' ATK and increases Attack Speed for 15s."
          },
          "serpent_sting": {
            "name": "Serpent Sting",
            "desc": "Poisons all enemies and deals continuous damage for 10s."
          },
          "multi_shot": {
            "name": "Multi-Shot",
            "desc": "Fires 5 arrows at once to attack random enemies."
          },
          "stampede": {
            "name": "Stampede",
            "desc": "Countless beasts sweep the battlefield for ATK x12 Damage."
          }
        }
      },
      "ssr_shadow_lord": {
        "summons": {
          "shadow_image": {
            "name": "Abyssal Image"
          }
        },
        "name": "Shadow Lord",
        "lore": "Absolute ruler of darkness who governs all shadows. Where his gaze lingers, there is only fear and ruin.",
        "routes": {
          "shadow_lord_absolute": {
            "name": "Absolute Darkness",
            "variantName": "Dark Mastery",
            "variantDesc": "Increases Shadow Damage by {value}%."
          },
          "shadow_lord_terror": {
            "name": "Fear",
            "variantName": "Terror Mastery",
            "variantDesc": "When Attack, {value}% Chance to Fear the enemy for 2s."
          }
        },
        "skills": {
          "dark_spread": {
            "name": "Dark Spread",
            "desc": "Applies Shadow DoT to all enemies for 10s (ATK 100%/sec)."
          },
          "shadow_burst": {
            "name": "Shadow Burst",
            "desc": "Deals ATK x6 Shadow Damage to all enemies within 150px around target."
          },
          "soul_drain": {
            "name": "Soul Drain",
            "desc": "Passive: 30% Life Steal from all damage dealt."
          },
          "curse_of_doom": {
            "name": "Curse of Doom",
            "desc": "Deals ATK x30 Damage to 1 enemy after 15s."
          },
          "dark_dominion": {
            "name": "Dark Dominion",
            "desc": "Battlefield Darkened: All enemies' DEF and ATK become 0"
          },
          "fear_wave": {
            "name": "Fear Wave",
            "desc": "Deals ATK x4 Damage and Fears all enemies in front for 3s."
          },
          "nightmare": {
            "name": "Nightmare",
            "desc": "Puts the strongest enemy to sleep for 8s."
          },
          "mind_shatter": {
            "name": "Mind Shatter",
            "desc": "Deals ATK x8 Damage to all target enemies and silences for 5s."
          },
          "summon_horror": {
            "name": "Summon Horror",
            "desc": "Summons a horror that materializes enemy's fear (CC)."
          },
          "world_of_fear": {
            "name": "World of Fear",
            "desc": "Makes all enemies on the battlefield uncontrollable for 10s."
          }
        }
      },
      "ssr_fire_seer": {
        "summons": {
          "fire_elemental": {
            "name": "Fire Elemental"
          }
        },
        "name": "Fire Seer",
        "lore": "Fire prophet who sees future flames. Changes the battlefield flow with fire prophecies.",
        "routes": {
          "fire_seer_prophecy": {
            "name": "Prophecy",
            "variantName": "Fire Prophecy",
            "variantDesc": "Increases Skill Damage by {value}%."
          },
          "fire_seer_elemental": {
            "name": "Elemental",
            "variantName": "Elemental Wrath",
            "variantDesc": "When Attack, {value}% Chance for fire elemental explosion around the target."
          }
        },
        "skills": {
          "prophecy_flame": {
            "name": "Flame Prophecy",
            "desc": "Sets flame traps that hinder enemy movement for the next 10s."
          },
          "holy_flame": {
            "name": "Holy Flame",
            "desc": "Burns all enemies: ATK 100%/sec for 10s."
          },
          "purifying_fire": {
            "name": "Purifying Fire",
            "desc": "Deals ATK x15 Purifying Fire Damage to the strongest enemy."
          },
          "flame_vision": {
            "name": "Flame Vision",
            "desc": "Passive: Increases All Allies' Critical Chance by 20%.,パッシブ：味方全体の会心確率+20%。"
          },
          "solar_burst": {
            "name": "Solar Burst",
            "desc": "Concentrated solar energy explosion: ATK x15 Fire Damage to entire battlefield."
          },
          "lava_burst": {
            "name": "Lava Burst",
            "desc": "Deals Single ATK x8 Guaranteed Critical Damage."
          },
          "flame_shield": {
            "name": "Flame Shield",
            "desc": "Increases all allies' DEF by 40 and reflects melee attacks."
          },
          "summon_fire_ele": {
            "name": "Summon Fire Elemental",
            "desc": "Summons 2 powerful Fire Elementals (Permanent)."
          },
          "fire_tempest": {
            "name": "Fire Tempest",
            "desc": "Summons a giant fire whirlwind: Pulls and burns enemies."
          },
          "cataclysm_seer": {
            "name": "Cataclysm Prophecy",
            "desc": "Flame bombardment calling the end of the world: Eliminates all enemies."
          }
        }
      },
      "ssr_forest_king": {
        "summons": {
          "ancient_spirit": {
            "name": "Ancient Spirit"
          }
        },
        "name": "Forest Spirit King",
        "lore": "Guardian deity of nature who takes the entire forest as his body. Where his roots reach is his territory.",
        "routes": {
          "forest_king_nature": {
            "name": "Nature Guardian",
            "variantName": "Ancient Protection",
            "variantDesc": "Reduces Damage Taken by {value}% and restores 1% HP every second."
          },
          "forest_king_wild": {
            "name": "Wild",
            "variantName": "Wild Power",
            "variantDesc": "When Attack, {value}% Chance to increase Attack Speed by 200% for 2s."
          }
        },
        "skills": {
          "nature_barrier": {
            "name": "Nature Barrier",
            "desc": "30% HP Shield + Root Immunity for all allies for 15s."
          },
          "vine_entangle": {
            "name": "Entangling Roots",
            "desc": "Roots all enemies for 10s + deals ATK x1/sec Nature Damage."
          },
          "world_tree": {
            "name": "Tree of Life",
            "desc": "Restores 5% HP every second + 50 DEF for all allies for 20s."
          },
          "ironbark": {
            "name": "Ironbark",
            "desc": "Reduces damage taken by 50% for all allies for 10s."
          },
          "forest_wrath": {
            "name": "Wrath of the Forest",
            "desc": "Summons forest monsters: ATK x10 AoE Damage + 5s Stun."
          },
          "feral_strike": {
            "name": "Feral Strike",
            "desc": "Deals Single ATK x12 Physical Damage + Bleeding."
          },
          "roar_of_beast": {
            "name": "Roar of the Beast",
            "desc": "Increases all allies' ATK by 50% and Move Speed."
          },
          "summon_ancient": {
            "name": "Summon Ancient",
            "desc": "Summons 1 powerful Ancient (Permanent Tank)."
          },
          "wild_growth_atk": {
            "name": "Wild Growth (Attack)",
            "desc": "Passive: {value}% Chance for additional Nature Damage upon allies' attack."
          },
          "wrath_of_nature": {
            "name": "Wrath of Nature",
            "desc": "Summons typhoons across the battlefield: Lifts enemies and deals ATK x15 Damage."
          }
        }
      },
      "ssr_dragon_tamer": {
        "summons": {
          "ancient_dragon": {
            "name": "Ancient Dragon"
          },
          "whelp": {
            "name": "Dragonling"
          },
          "aspect": {
            "name": "Dragon Aspect"
          }
        },
        "name": "Dragon Tamer",
        "lore": "Legendary dragon knight unified with dragons. Primal dragons move at his single command.",
        "routes": {
          "dragon_tamer_knight": {
            "name": "Dragon Knight",
            "variantName": "Dragon Power",
            "variantDesc": "Increases ATK by {value}% and adds fire explosions to all attacks."
          },
          "dragon_tamer_tamer": {
            "name": "Tamer",
            "variantName": "Dragon Bond",
            "variantDesc": "Permanently increases self ATK by {value}% of damage dealt by summons (Max 300%)."
          }
        },
        "skills": {
          "dragon_command": {
            "name": "Dragon Command",
            "desc": "Commands dragon companion: ATK x8 AoE Fire Breath."
          },
          "fire_whip": {
            "name": "Fire Whip",
            "desc": "Deals ATK x6 Fire Damage + Burn to all enemies in a line."
          },
          "dragon_aura": {
            "name": "Dragon Aura",
            "desc": "Passive: Increases all allies' ATK by 40% and reduces damage taken by 20%."
          },
          "dragon_flight": {
            "name": "Dragon Flight",
            "desc": "Invincible and 2x ATK for 10s."
          },
          "ancient_dragon_summon": {
            "name": "Summon Ancient Dragon",
            "desc": "Summons an Ancient Dragon (Permanent Ranged"
          },
          "spawn_dragonling": {
            "name": "Dragonling Swarm",
            "desc": "Summons 5 Dragonlings (20s"
          },
          "taming_beast": {
            "name": "Tame Beast",
            "desc": "Tames 1 enemy to make them an ally for 15s."
          },
          "nature_blessing": {
            "name": "Nature's Blessing",
            "desc": "Full Restore all allied summons and strengthen for 10s."
          },
          "dragon_nest": {
            "name": "Dragon Nest",
            "desc": "Summons a nest: Automatically spawns 1 dragonling every 3s."
          },
          "summon_dragon_aspect": {
            "name": "Summon Dragon Aspect",
            "desc": "Summons a legendary Dragon Aspect: Devastates the entire battlefield."
          }
        }
      },
      "ssr_plague_lord": {
        "summons": {
          "elite_ghoul": {
            "name": "Enhanced Ghoul"
          },
          "abomination": {
            "name": "Abomination"
          },
          "undead": {
            "name": "Undead"
          }
        },
        "name": "Plague Lord",
        "lore": "Lord of plague who rules all life with poison. An empire collapsed with his single breath.",
        "routes": {
          "plague_lord_absolute": {
            "name": "Plague Mastery",
            "variantName": "Plague Mastery",
            "variantDesc": "Increases Poison Damage by {value}% and adds fatal plague to all attacks."
          },
          "plague_lord_undead": {
            "name": "Necromancy",
            "variantName": "Lord of Death",
            "variantDesc": "Restores self HP by {value}% of damage dealt by summons."
          }
        },
        "skills": {
          "plague_spread": {
            "name": "Plague Spread",
            "desc": "Applies plague to all enemies: ATK 120%/sec Poison damage for 15s."
          },
          "toxic_cloud": {
            "name": "Toxic Cloud",
            "desc": "Toxic cloud across battlefield: Reduces enemy HP by 8%/sec for 20s."
          },
          "corpse_burst": {
            "name": "Corpse Burst",
            "desc": "Explodes fallen enemies: ATK x6 damage + spreads poison."
          },
          "epidemic_passive": {
            "name": "Bringer of Epidemic",
            "desc": "Passive: Heals all allies by 5% whenever a poisoned enemy dies."
          },
          "plague_dominion": {
            "name": "Plague Dominion",
            "desc": "Battlefield Plagued: All enemies' HP reduced to 1 and Stunned for 10s."
          },
          "summon_ghoul": {
            "name": "Summon Ghouls",
            "desc": "Summons 3 Enhanced Ghouls (Permanent Melee)."
          },
          "raise_abom": {
            "name": "Summon Abomination",
            "desc": "Summons a giant Abomination (25s"
          },
          "death_pact": {
            "name": "Death Pact",
            "desc": "Sacrifices a summon to Full Restore own HP."
          },
          "unholy_frenzy": {
            "name": "Unholy Frenzy",
            "desc": "Increases Attack Speed of self and summons by 150% for 15s."
          },
          "army_of_undead": {
            "name": "Undead Army",
            "desc": "Summons countless undead (30) and all-out attack."
          }
        }
      },
      "ssr_lich_king": {
        "summons": {
          "elite_ghoul": {
            "name": "Enhanced Ghoul"
          },
          "gargoyle": {
            "name": "Gargoyle"
          },
          "army": {
            "name": "Undead Legion"
          }
        },
        "name": "Lich King",
        "lore": "King of all undead. Where he passes, eternal winter remains.",
        "routes": {
          "lich_king_frost": {
            "name": "Frost",
            "variantName": "Will of the Lich King",
            "variantDesc": "Reflects {value}% of damage taken and increases Frost Damage."
          },
          "lich_king_unholy": {
            "name": "Unholy",
            "variantName": "Bringer of Death",
            "variantDesc": "Increases summons' ATK by {value}%."
          }
        },
        "skills": {
          "frost_aura": {
            "name": "Frost Aura",
            "desc": "Reduces move speed of enemies within 200px by 70%."
          },
          "death_touch": {
            "name": "Death Touch",
            "desc": "Deals Single ATK x8 Damage, 5s complete Stun."
          },
          "obliterate": {
            "name": "Obliterate",
            "desc": "Powerful 2-hit ATK x6 ignoring DEF."
          },
          "remorseless_winter": {
            "name": "Remorseless Winter",
            "desc": "Continuous damage and Freeze to nearby enemies for 10s."
          },
          "lich_wrath": {
            "name": "Wrath of the Lich King",
            "desc": "Deals 1500% ATK Frost Damage to the entire battlefield + permanent Slow."
          },
          "agony": {
            "name": "Curse of Agony",
            "desc": "Powerful increasing Shadow Continuous Damage."
          },
          "ghoul_army": {
            "name": "Summon Ghouls",
            "desc": "Immediately summons 4 Enhanced Ghouls."
          },
          "corpse_explosion": {
            "name": "Corpse Explosion",
            "desc": "Explodes fallen enemy corpses for ATK x10 Damage."
          },
          "gargoyle": {
            "name": "Summon Gargoyle",
            "desc": "Summons a Gargoyle providing fire support from the sky."
          },
          "army_of_dead": {
            "name": "Army of the Dead",
            "desc": "Summons 20 Undead Soldiers to devastate the battlefield."
          }
        }
      },
      "ssr_goblin_emperor": {
        "summons": {
          "mech_soldier": {
            "name": "Mech Soldier"
          },
          "elite_merc": {
            "name": "Veteran Mercenary"
          }
        },
        "name": "Goblin Emperor",
        "lore": "Emperor of goblins with countless machines and gold. His wealth is his power.",
        "routes": {
          "goblin_emperor_dominion": {
            "name": "Imperial Dominion",
            "variantName": "Emperor's Armor",
            "variantDesc": "Reduces Damage Taken by {value}% and acquires gold when hit."
          },
          "goblin_emperor_wealth": {
            "name": "Wealth",
            "variantName": "Golden Power",
            "variantDesc": "When Attack, {value}% Chance to turn enemy into a golden statue (3s Stun)."
          }
        },
        "skills": {
          "golden_army": {
            "name": "Golden Army",
            "desc": "Summons 5 Mech Soldiers (Permanent Melee)."
          },
          "rocket_armor": {
            "name": "Rocket Armor",
            "desc": "Invincible for 10s and counterattacks with rockets when hit."
          },
          "goblin_empire": {
            "name": "Goblin Empire",
            "desc": "Mechanical traps across battlefield: Explode for ATK x8 when stepped on."
          },
          "repair_bots": {
            "name": "Repair Bots",
            "desc": "Immediately repairs 50% of all allied summons and walls."
          },
          "emperor_decree": {
            "name": "Emperor's Decree",
            "desc": "Forcibly summons all enemies and bombards them for ATK x15."
          },
          "gold_blast": {
            "name": "Gold Blast",
            "desc": "Deals Single ATK x8 Holy Damage + drops gold."
          },
          "tax_collection": {
            "name": "Tax Collection",
            "desc": "Deals damage to all enemies and acquires gold equal to 10% of total damage."
          },
          "mercenary_contract": {
            "name": "Mercenary Contract",
            "desc": "Summons 2 powerful Veteran Mercenaries (Permanent Ranged)."
          },
          "stock_market": {
            "name": "Stock Market Surge",
            "desc": "Increases all allied stats by 50% for 15s."
          },
          "golden_rain": {
            "name": "Golden Rain",
            "desc": "Drops giant gold bars from the sky: Instant Kill chance for all enemies."
          }
        }
      },
      "ssr_witch_king": {
        "summons": {
          "voodoo_spirit": {
            "name": "Voodoo Spirit"
          }
        },
        "name": "Voodoo King",
        "lore": "Crystallization of thousands of years of voodoo rituals. His curse brings pain deeper than death.",
        "routes": {
          "witch_king_curse": {
            "name": "Curse",
            "variantName": "Great Voodoo Curse",
            "variantDesc": "Increases curse duration by {value}% and adds infection effect."
          },
          "witch_king_shadow": {
            "name": "Shadow",
            "variantName": "Shadow Raid",
            "variantDesc": "When Attack, {value}% Chance to send shadow crows for continuous damage."
          }
        },
        "skills": {
          "voodoo_doll": {
            "name": "Voodoo Doll",
            "desc": "Triples damage taken for 1 enemy for 15s."
          },
          "spirit_raise": {
            "name": "Spirit Raising",
            "desc": "Summons fallen enemies as spirits (Permanent)."
          },
          "toxic_ritual": {
            "name": "Toxic Ritual",
            "desc": "Poisons all enemies + cannot restore HP for 15s."
          },
          "voodoo_hex": {
            "name": "AoE Hex",
            "desc": "Polymorphs all enemies into frogs for 8s."
          },
          "death_dance": {
            "name": "Dance of Death",
            "desc": "Voodoo ritual across battlefield: Chance to eliminate all enemies."
          },
          "shadow_bolt": {
            "name": "Shadow Bolt",
            "desc": "Deals Single ATK x8 Shadow Damage."
          },
          "dark_totem": {
            "name": "Dark Totem",
            "desc": "Summons a totem that reduces nearby enemy ATK by 50%."
          },
          "soul_harvest": {
            "name": "Soul Harvest",
            "desc": "Increases all allies' ATK by 5% whenever an enemy dies (Max 50%)."
          },
          "night_fall": {
            "name": "Nightfall Call",
            "desc": "Blinds all enemies for 10s and deals continuous shadow damage."
          },
          "abyss_ritual": {
            "name": "Abyss Ritual",
            "desc": "Covers battlefield in abyss: Instant Kills enemies and Full Restores allies."
          }
        }
      },
      "ssr_golden_panda": {
        "summons": {
          "golden_clone": {
            "name": "Golden Clone"
          }
        },
        "name": "Golden Panda",
        "lore": "Legendary panda with golden blessing. Grows stronger as he fights, end unknown.",
        "routes": {
          "golden_panda_brew": {
            "name": "Golden Brew",
            "variantName": "Golden Arts",
            "variantDesc": "When hit, {value}% Chance to reflect damage and heal self."
          },
          "golden_panda_zen": {
            "name": "Zen",
            "variantName": "Zen State",
            "variantDesc": "Immunity to harmful effects and increases DEF by {value} for all allies."
          }
        },
        "skills": {
          "golden_brew": {
            "name": "Golden Brew",
            "desc": "Drinks golden brew for 20s Invincibility and Full Restore."
          },
          "stagger_gold": {
            "name": "Golden Stagger",
            "desc": "Takes 80% of damage taken over 20 seconds."
          },
          "storm_earth_fire": {
            "name": "Storm Earth Fire",
            "desc": "Summons 3 Clones (80% stats each"
          },
          "breath_of_fire_gold": {
            "name": "Golden Breath of Fire",
            "desc": "Giant fire breath forward: Knocks back enemies and deals continuous damage."
          },
          "golden_wave": {
            "name": "Golden Panda Wave",
            "desc": "Golden energy explosion: Instant Kill chance for enemies and Full Resurrection for allies."
          },
          "zen_meditation": {
            "name": "Zen Meditation",
            "desc": "80% Damage Reduction for all allies for 10s."
          },
          "mist_barrier": {
            "name": "Mist Barrier",
            "desc": "Covers battlefield in mist: Reduces enemy accuracy by 90% for 15s."
          },
          "chi_surge": {
            "name": "Chi Surge",
            "desc": "Knocks back enemies and restores mana (cooldowns) for all allies."
          },
          "peace_ring": {
            "name": "Ring of Peace",
            "desc": "Pushes enemies out of the ring and prevents entry for 10s."
          },
          "transcendence": {
            "name": "Transcendence",
            "desc": "Stops and Purifies all enemies on battlefield for 15s."
          }
        }
      },
      "ssr_primordial_dragon_heir": {
        "summons": {
          "primordial_dragon": {
            "name": "Primal Dragon"
          }
        },
        "name": "Primordial Dragon Heir",
        "lore": "One with awakened primal dragon blood. The power of five aspects swirls within him.",
        "routes": {
          "primordial_dragon_awakening": {
            "name": "Dragon Awakening",
            "variantName": "Dragon Blood",
            "variantDesc": "Increases Skill Damage by {value}% and activates all elemental synergies."
          },
          "primordial_dragon_aspect": {
            "name": "Aspect",
            "variantName": "Aspect Power",
            "variantDesc": "When Attack, {value}% Chance to cast a random aspect's curse on target."
          }
        },
        "skills": {
          "ancient_breath": {
            "name": "Ancient Breath",
            "desc": "Composite 5-element breath: Deals ATK x10 damage to enemies in front."
          },
          "ancient_summon": {
            "name": "Dragon Summon",
            "desc": "Summons 2 Primal Dragons (Permanent Ranged)."
          },
          "primordial_flame": {
            "name": "Primordial Flame",
            "desc": "Deals ATK x15 combined elemental damage to entire battlefield."
          },
          "dragon_form": {
            "name": "Dragon Form",
            "desc": "Passive: Permanently increases all self stats by 50%."
          },
          "great_awakening": {
            "name": "Great Awakening",
            "desc": "5x all stats + Invincible + devastates battlefield for 30s."
          },
          "time_stop": {
            "name": "Time Stop",
            "desc": "Completely stops all enemies for 5s."
          },
          "nature_binding": {
            "name": "Nature Binding",
            "desc": "Roots and deals Poison damage to all enemies for 8s."
          },
          "frost_prison": {
            "name": "Frost Prison",
            "desc": "Freezes 3 strongest enemies for 10s."
          },
          "arcane_surge": {
            "name": "Arcane Surge",
            "desc": "Silences all enemies for 8s and increases skill cooldowns."
          },
          "aspect_union": {
            "name": "Aspect Union",
            "desc": "Unifies power of five aspects: 50% Instant Kill chance for all enemies."
          }
        }
      },
      "ssr_eternal_elf_king": {
        "summons": {
          "night_warden": {
            "name": "Night Warden"
          }
        },
        "name": "Eternal Elf King",
        "lore": "Eternal king who transcended all Elf bloodlines. He is the essence of the arcane itself.",
        "routes": {
          "eternal_elf_arcane": {
            "name": "Eternal Arcane",
            "variantName": "Arcane King",
            "variantDesc": "Increases Arcane Damage by {value}% and all projectiles pierce."
          },
          "eternal_elf_night": {
            "name": "Night Mastery",
            "variantName": "Moonlight Protection",
            "variantDesc": "Restores {value}% HP every second and increases evasion by 20% for all allies."
          }
        },
        "skills": {
          "eternal_arrow": {
            "name": "Eternal Arrow",
            "desc": "Piercing arcane arrows across the entire battlefield for ATK x10."
          },
          "elf_essence": {
            "name": "Elf Essence",
            "desc": "Amplifies all allied Elf stats by 100% for 20s."
          },
          "starfall_barrage": {
            "name": "Starfall Barrage",
            "desc": "Bombards with 50 arcane starshards from the sky for ATK x4."
          },
          "arcane_mastery": {
            "name": "Arcane Mastery",
            "desc": "Passive: Reduces all self skill cooldowns by 50%."
          },
          "eternal_verdict": {
            "name": "Eternal Verdict",
            "desc": "Immediately reduces all enemies' HP to 1 and permanent 90% Slow."
          },
          "moonlight": {
            "name": "Moonfire",
            "desc": "Silences all enemies for 5s and deals continuous damage."
          },
          "night_embrace": {
            "name": "Night's Embrace",
            "desc": "Invincible and immunity to all debuffs for all allies for 10s."
          },
          "summon_sentinel": {
            "name": "Summon Sentinels",
            "desc": "Summons 3 Sentinels (Permanent Ranged"
          },
          "falling_star": {
            "name": "Falling Star",
            "desc": "Summons a giant meteor: Stuns all enemies for 10s and deals ATK x12 damage."
          },
          "eternal_night": {
            "name": "Eternal Night",
            "desc": "Covers battlefield in darkness: Eliminates all enemies and resurrects allies."
          }
        }
      },
      "scrapbom": {
        "name": "Scrapbom",
        "lore": "A goblin engineer who mounts scrap-and-gunpowder flame turrets atop the wall. While the turrets hold the line, he focuses solely on repairing them and the wall.",
        "routes": {
          "turret": {
            "name": "Turret Mastery",
            "variantName": "Flame Turret Master",
            "variantDesc": "Turret ATK increases by {{value}}% per star."
          },
          "heal": {
            "name": "Repair Spec",
            "variantName": "Emergency Repair System",
            "variantDesc": "Turret/wall repair amount increases by {{value}}% per star."
          }
        },
        "skills": {
          "overcharge": {
            "name": "Overcharge Ammo",
            "desc": "Turret ATK +30%"
          },
          "turret_armor": {
            "name": "Heavy Armor Coating",
            "desc": "Turret DEF +40, HP +30%"
          },
          "splash": {
            "name": "Explosive Scatter",
            "desc": "Turret attacks deal AoE fire damage in 80px radius"
          },
          "multi_turret": {
            "name": "Multi-Turret",
            "desc": "Summon 1 additional flame turret (2 total, always active)"
          },
          "fast_repair": {
            "name": "Rapid Repair",
            "desc": "Repair cooldown reduced by 1s (3s→2s)"
          },
          "repair_amp": {
            "name": "Repair Amplifier",
            "desc": "Turret/wall repair amount +40%"
          },
          "emergency_repair": {
            "name": "Emergency Rebuild",
            "desc": "Double repair on turrets/wall below 30% HP"
          },
          "fortress": {
            "name": "Fortify",
            "desc": "After repair, turret & wall DEF +60 for 5s"
          }
        }
      },
      "coilzak": {
        "name": "Coilzak",
        "lore": "A gnome inventor who mounts lightning-coil electric turrets on the wall. While the turrets dominate the battlefield, he ceaselessly repairs them and the wall.",
        "routes": {
          "turret": {
            "name": "Turret Mastery",
            "variantName": "Lightning Turret Master",
            "variantDesc": "Turret ATK increases by {{value}}% per star."
          },
          "heal": {
            "name": "Repair Spec",
            "variantName": "Engineering Mastery",
            "variantDesc": "Turret/wall repair amount increases by {{value}}% per star."
          }
        },
        "skills": {
          "overvolt": {
            "name": "Overvolt Coil",
            "desc": "Turret ATK +30%"
          },
          "range_amp": {
            "name": "Range Extension",
            "desc": "Turret range +250px"
          },
          "chain_lightning": {
            "name": "Chain Lightning",
            "desc": "Turret attacks chain to 2 additional enemies"
          },
          "triple_turret": {
            "name": "Triple Turret Storm",
            "desc": "Summon 2 additional lightning turrets (3 total, always active)"
          },
          "drone": {
            "name": "Repair Drone",
            "desc": "Passive: auto-repairs the wall slightly every 4s"
          },
          "barrier_charge": {
            "name": "Barrier Charge",
            "desc": "Applies a small shield to the turret on repair"
          },
          "mastery": {
            "name": "Engineering Mastery",
            "desc": "Turret/wall repair amount +40%"
          },
          "auto_rebuild": {
            "name": "Auto-Rebuild System",
            "desc": "Instantly rebuilds destroyed turret; repair cooldown -2s"
          }
        }
      },
      "ssr_darkelf_lord": {
        "name": "Shadow Lord",
        "lore": "Absolute ruler of the Shadow Forest. Collapses the enemy's mind and body with the power of darkness that light cannot reach.",
        "routes": {
          "darkelf_lord_shadow": {
            "name": "Shadow Arts",
            "variantName": "Shadow Erosion",
            "variantDesc": "When Attack, {value}% Chance to ignore Enemy DEF as 0 and deal damage."
          },
          "darkelf_lord_void": {
            "name": "Void",
            "variantName": "Void Hunger",
            "variantDesc": "When Attack, {value}% Chance to absorb 50% of the target's ATK."
          }
        },
        "skills": {
          "shadow_bolt": {
            "name": "Shadow Bolt",
            "desc": "Deals ATK x6 Shadow Damage to a single target."
          },
          "curse_of_agony": {
            "name": "Curse of Agony",
            "desc": "Deals increasing Shadow Continuous Damage to the enemy every second for 15s."
          },
          "nightfall": {
            "name": "Nightfall",
            "desc": "All Enemies Blinded (Accuracy -90%) and Feared for 5s."
          },
          "shadow_form": {
            "name": "Shadow Form",
            "desc": "Passive: Increases self Shadow Damage by 50%."
          },
          "doom": {
            "name": "Doom",
            "desc": "Instant Kill enemy after 30s (Bosses take 50% of current HP)."
          },
          "void_zone": {
            "name": "Void Zone",
            "desc": "Continuous Damage and Silence to enemies within 150px radius."
          },
          "mind_blast": {
            "name": "Mind Blast",
            "desc": "Deals Single ATK x10 Shadow Damage + 3s Stun."
          },
          "soul_leech": {
            "name": "Soul Leech",
            "desc": "Deals ATK x8 Damage to 1 Enemy and Heals all Allies."
          },
          "void_singularity": {
            "name": "Void Singularity",
            "desc": "Pulls all enemies to a single point."
          },
          "oblivion": {
            "name": "Oblivion",
            "desc": "Covers the battlefield in void to Incapacitate all enemies for 10s."
          }
        }
      },
      "ssr_fire_ash": {
        "name": "Ember of Fire",
        "lore": "Avatar of Destruction born from the land of fire. Every ground he walks turns to ash, and even the air burns.",
        "routes": {
          "fire_ash_inferno": {
            "name": "Inferno",
            "variantName": "Scorch",
            "variantDesc": "All attacks spread {value}% damage to nearby enemies and cause Burn."
          },
          "fire_ash_ember": {
            "name": "Ember",
            "variantName": "Ash Revenge",
            "variantDesc": "When Hit, {value}% Chance to counterattack with a powerful fire explosion."
          }
        },
        "skills": {
          "immolation": {
            "name": "Immolation",
            "desc": "Continuous Fire Damage and increase Fire Damage taken."
          },
          "meteor": {
            "name": "Meteor",
            "desc": "Drops a giant meteor at the target location for ATK x8 Damage."
          },
          "conflagrate": {
            "name": "Conflagrate",
            "desc": "Immediately explodes burned enemies for ATK x10 Damage."
          },
          "living_bomb": {
            "name": "Living Bomb",
            "desc": "Turns 1 Enemy into a bomb: Massive explosion after 5s."
          },
          "supernova": {
            "name": "Supernova",
            "desc": "Deals ATK x20 Fire Damage to the entire screen centered on self."
          },
          "ember_strike": {
            "name": "Ember Strike",
            "desc": "Deals ATK x5 Fire Damage to all nearby enemies."
          },
          "lava_shield": {
            "name": "Lava Shield",
            "desc": "30% Damage Reduction and burns melee enemies for 10s."
          },
          "volcano": {
            "name": "Volcano at Feet",
            "desc": "Creates a volcano at self location: Continuous explosions nearby for 15s."
          },
          "fire_dash": {
            "name": "Fire Dash",
            "desc": "Moves while burning all enemies in the path for ATK x6."
          },
          "avatar_of_ash": {
            "name": "Avatar of Ash",
            "desc": "Invincible for 20s and deals ATK x3 Damage to all nearby enemies every second."
          }
        }
      },
      "ssr_arch_angel": {
        "name": "Archangel",
        "lore": "A holy being descended from the celestial citadel.",
        "routes": {
          "arch_angel_holy": {
            "name": "Holy",
            "variantName": "Holy Protection",
            "variantDesc": "When ally dies, {value}% Chance to immediately resurrect and increase healing."
          },
          "arch_angel_judgement": {
            "name": "Judgement",
            "variantName": "Light Judgement",
            "variantDesc": "When Attack, {value}% Chance for a holy explosion on target."
          }
        },
        "skills": {
          "holy_light": {
            "name": "Holy Light",
            "desc": "Immediately Full Restore the ally with lowest HP."
          },
          "hymn": {
            "name": "Holy Hymn",
            "desc": "Restores 5% HP to all allies every second for 15s."
          },
          "salvation": {
            "name": "Salvation",
            "desc": "Resurrect all dead allies with 100% HP (Once per game)."
          },
          "shield": {
            "name": "Power Word: Shield",
            "desc": "Grants a massive shield to all allies."
          },
          "absolute_salvation": {
            "name": "Absolute Salvation",
            "desc": "Invincible and Full Restore for all allies for 30s."
          },
          "arrow": {
            "name": "Celestial Arrow",
            "desc": "Deals ATK x6 Holy Damage to a single target."
          },
          "blade": {
            "name": "Blade of Judgement",
            "desc": "Throws holy blades at 3 enemies for ATK x4 Damage."
          },
          "burst": {
            "name": "Light Burst",
            "desc": "Deals AoE ATK x5 Holy Damage around the target."
          },
          "wings": {
            "name": "Avenging Wrath",
            "desc": "2x ATK and makes all attacks AoE for 20s."
          },
          "judgement_day": {
            "name": "Judgement Day",
            "desc": "Deals ATK 1500% Holy Damage and Purifies all enemies."
          }
        }
      },
      "ssr_dragon_aspect": {
        "name": "Dragon Aspect",
        "lore": "Primal dragon reigning at the peak of the Dragon Tower.",
        "routes": {
          "dragon_god_time": {
            "name": "Time",
            "variantName": "Lord of Time",
            "variantDesc": "When using skills, {value}% Chance to freeze enemies' time."
          },
          "dragon_god_fire": {
            "name": "Destruction",
            "variantName": "Cataclysm",
            "variantDesc": "When Attack, {value}% Chance for additional fire explosion."
          }
        },
        "skills": {
          "breath_time": {
            "name": "Chromatic Breath",
            "desc": "Fires a composite breath of 5 elements (AoE)."
          },
          "time_warp": {
            "name": "Time Warp",
            "desc": "Slows enemies on battlefield by 80% for 10s."
          },
          "sand_trap": {
            "name": "Sand Trap",
            "desc": "Pulls and roots enemies at target location."
          },
          "rewind": {
            "name": "Rewind",
            "desc": "Reduces all allies' skill Cooldown by 50%."
          },
          "time_stop": {
            "name": "Time Stop",
            "desc": "Completely stops all enemies for 8s."
          },
          "fire_breath": {
            "name": "Fire Breath",
            "desc": "Deals ATK x10 Fire Damage to a wide forward area."
          },
          "magic_spark": {
            "name": "Magic Spark",
            "desc": "Fires flame bullets that transfer to up to 5 enemies."
          },
          "aspect_rage": {
            "name": "Aspect Rage",
            "desc": "Doubles self ATK for 15s."
          },
          "upheaval": {
            "name": "Upheaval",
            "desc": "Lifts the ground to deal ATK x8 Damage + Stun to the entire battlefield."
          },
          "cataclysm": {
            "name": "Cataclysm",
            "desc": "Burn the entire battlefield to eliminate all enemies (Bosses take 2000% damage)."
          }
        }
      },
      "ssr_iron_guardian": {
        "name": "Iron Guardian",
        "lore": "Immortal guardian who never falls on the battlefield. His shield is the most solid wall protecting allies.",
        "routes": {
          "iron_guardian_bulwark": {
            "name": "Bulwark",
            "variantName": "Indomitable",
            "variantDesc": "Reduces Damage Taken by {value}% and Increases Defense."
          },
          "iron_guardian_justice": {
            "name": "Justice",
            "variantName": "Shield of Retribution",
            "variantDesc": "Increases ATK by {value}% of Defense."
          }
        },
        "skills": {
          "shield_blast": {
            "name": "Shield Blast",
            "desc": "Deals ATK x4 Damage to enemies within 120px and stuns for 2s."
          },
          "iron_skin": {
            "name": "Iron Skin",
            "desc": "Reduces Damage Taken by 50% and increases DEF by 50 for 10s."
          },
          "taunt_cry": {
            "name": "Taunting Cry",
            "desc": "Focuses all enemies' aggro + Invincible for 5s."
          },
          "guardian_aura": {
            "name": "Guardian Aura",
            "desc": "Passive: Increases nearby allies' DEF by 30."
          },
          "indomitable": {
            "name": "Indomitable Guardian",
            "desc": "HP does not drop below 1 for 10s + AoE Knockback on battlefield."
          },
          "justice_strike": {
            "name": "Justice Strike",
            "desc": "Deals Single ATK x8 Holy Damage."
          },
          "holy_shield_throw": {
            "name": "Holy Shield Throw",
            "desc": "Throws a shield that bounces to 3 enemies for ATK x5 Damage."
          },
          "retribution_aura": {
            "name": "Retribution Aura",
            "desc": "When allies are hit, counterattacks the attacker for ATK 50%."
          },
          "consecration": {
            "name": "Consecration",
            "desc": "Creates a holy ground that deals continuous damage."
          },
          "avenging_wrath": {
            "name": "Avenging Wrath",
            "desc": "2x ATK for 20s and all attacks explode."
          }
        }
      },
      "ssr_arch_priest": {
        "name": "Archpriest",
        "lore": "High priest who directly delivers God's voice. Under his blessing, even death loses its power.",
        "routes": {
          "arch_priest_holy": {
            "name": "Holy",
            "variantName": "Holy Miracle",
            "variantDesc": "When Healing, {value}% Chance to grant shields to all allies."
          },
          "arch_priest_shadow": {
            "name": "Shadow",
            "variantName": "Shadow Power",
            "variantDesc": "When Attack, heals all allies by {value}% of damage dealt."
          }
        },
        "skills": {
          "miracle_heal": {
            "name": "Miracle Heal",
            "desc": "Immediately restores 50% HP to all allies."
          },
          "divine_hymn": {
            "name": "Divine Hymn",
            "desc": "Restores 5% HP to all allies every second for 20s."
          },
          "resurrection_light": {
            "name": "Light of Resurrection",
            "desc": "Immediately resurrects all dead allies with 100% HP (Once per game)."
          },
          "guardian_spirit": {
            "name": "Guardian Spirit",
            "desc": "Makes the ally with lowest HP Invincible for 10s."
          },
          "salvation": {
            "name": "Absolute Salvation",
            "desc": "Invincible"
          },
          "shadow_word_pain": {
            "name": "Shadow Word: Pain",
            "desc": "Powerful Shadow DoT and increases damage taken by 30% for 5s."
          },
          "mind_blast": {
            "name": "Mind Blast",
            "desc": "Deals Single ATK x10 Shadow Damage + Chance to reset Cooldown."
          },
          "vampiric_touch": {
            "name": "Vampiric Touch",
            "desc": "Passive: Adds 30% Life Steal effect to all self attacks."
          },
          "void_eruption": {
            "name": "Void Eruption",
            "desc": "Deals AoE ATK x8 Shadow Damage around the target."
          },
          "dark_ascension": {
            "name": "Dark Ascension",
            "desc": "3x ATK and splits all attacks into 3 for 20s."
          }
        }
      },
      "ssr_seal_mage": {
        "name": "Seal Mage",
        "lore": "Successor of ancient sealing arts. Before him, any powerful enemy is but a scarecrow.",
        "routes": {
          "seal_mage_seal": {
            "name": "Seal",
            "variantName": "Complete Seal",
            "variantDesc": "Damage dealt to Stunned and Incapacitated enemies increases by {value}%."
          },
          "seal_mage_arcane": {
            "name": "Arcane",
            "variantName": "Arcane Amplification",
            "variantDesc": "When Attack, {value}% Chance to reduce Cooldown by more than 50%."
          }
        },
        "skills": {
          "void_seal": {
            "name": "Void Seal",
            "desc": "Completely seals all enemies for 5s (Cannot move/attack)."
          },
          "time_warp": {
            "name": "Time Warp",
            "desc": "Reduces enemy Move Speed/Attack Speed by 90% for 10s."
          },
          "arcane_shackle": {
            "name": "Arcane Shackle",
            "desc": "Roots all enemies within 200px around target for 8s."
          },
          "mass_polymorph": {
            "name": "Mass Polymorph",
            "desc": "Polymorphs all enemies into sheep for 10s."
          },
          "absolute_seal": {
            "name": "Absolute Seal",
            "desc": "Permanently seals the strongest enemy (60s for Bosses)."
          },
          "arcane_blast": {
            "name": "Arcane Blast",
            "desc": "Deals Single ATK x8 Arcane Damage."
          },
          "arcane_missiles": {
            "name": "Arcane Missiles",
            "desc": "Fires 10 consecutive missiles at 1 enemy"
          },
          "arcane_power": {
            "name": "Arcane Power",
            "desc": "Doubles self skill damage for 15s."
          },
          "blink_strike": {
            "name": "Blink Strike",
            "desc": "Teleports and deals ATK x6 Damage to each of 5 enemies."
          },
          "arcane_barrage": {
            "name": "Arcane Barrage",
            "desc": "Bombards the entire battlefield with countless arcane missiles for ATK x20."
          }
        }
      },
      "ssr_field_commander": {
        "name": "Field Commander",
        "lore": "Legendary commander who perfectly understands five roles. Under his banner, allies become an invincible legion.",
        "routes": {
          "field_commander_tactic": {
            "name": "Command",
            "variantName": "Perfect Formation",
            "variantDesc": "Increases All Allies' Stats by {value}%."
          },
          "field_commander_bravery": {
            "name": "Bravery",
            "variantName": "Commander's Courage",
            "variantDesc": "Increases nearby allies' ATK by {value}% of self ATK."
          }
        },
        "skills": {
          "tactical_order": {
            "name": "Tactical Order",
            "desc": "Increases ATK/DEF of all allies by 50% for 15s."
          },
          "rally": {
            "name": "Defensive Rally",
            "desc": "Immediately restores 50% HP and Invincible for 5s for all allies."
          },
          "combined_assault": {
            "name": "Combined Assault",
            "desc": "Next 3 attacks for all allies guaranteed Critical for 5x ATK."
          },
          "banner_of_victory": {
            "name": "Banner of Victory",
            "desc": "Summons a banner: Increases nearby allies' Attack Speed by 100%."
          },
          "heroic_charge": {
            "name": "Heroic Charge",
            "desc": "Full charge: ATK x15 Damage to all enemies and Berserk all allies for 20s."
          },
          "brave_strike": {
            "name": "Brave Strike",
            "desc": "Deals Single ATK x12 Damage and stuns for 3s."
          },
          "battle_shout": {
            "name": "Battle Shout",
            "desc": "Permanently increases all allies' ATK by 100 (Stackable)."
          },
          "blade_of_honor": {
            "name": "Blade of Honor",
            "desc": "Passive: Increases self Physical Damage by 50."
          },
          "vanguard": {
            "name": "Vanguard",
            "desc": "Fights at the very front"
          },
          "war_lord_wrath": {
            "name": "Warlord's Wrath",
            "desc": "Deals ATK x25 Damage to all enemies and heals all allies."
          }
        }
      },
      "ssr_light_pope": {
        "name": "Light Pope",
        "lore": "Supreme head of the Order of Light. His divinity purifies the battlefield and makes allies an invincible legion.",
        "routes": {
          "light_pope_sanctity": {
            "name": "Sanctity",
            "variantName": "Pope's Blessing",
            "variantDesc": "Increases healing by {value}% and spreads all heals."
          },
          "light_pope_inquisition": {
            "name": "Inquisition",
            "variantName": "Inquisitor's Flame",
            "variantDesc": "When Attack, {value}% Chance to Purify the target for additional ATK x5 damage."
          }
        },
        "skills": {
          "holy_hope": {
            "name": "Holy Hope",
            "desc": "Full Restore HP for all allies + 30% Damage Reduction for 10s."
          },
          "celestial_hymn": {
            "name": "Celestial Hymn",
            "desc": "Restores 5% of Max HP to all allies every second for 20s."
          },
          "miracle": {
            "name": "Miracle",
            "desc": "Resurrect all dead allies with 100% HP + Invincible for 5s (Once per game)."
          },
          "divine_judgement": {
            "name": "Divine Judgement",
            "desc": "Stuns all enemies for 3s + heals all allies."
          },
          "holy_avatar": {
            "name": "Holy Avatar",
            "desc": "Transforms into a complete Holy Avatar: 3x all stats"
          },
          "purge": {
            "name": "Purge",
            "desc": "Removes all buffs from target and deals ATK x8 Holy Damage."
          },
          "holy_fire": {
            "name": "Holy Fire",
            "desc": "Continuous Holy Damage and heals allies."
          },
          "inquisition_seal": {
            "name": "Seal of Inquisition",
            "desc": "Grants a seal to the target"
          },
          "light_lance": {
            "name": "Light Lance",
            "desc": "Throws a giant piercing light lance for ATK x12 Damage."
          },
          "divine_wrath": {
            "name": "Divine Wrath",
            "desc": "Drops a shower of light on entire battlefield: 50% Instant Kill chance for all enemies."
          }
        }
      },
      "ssr_glacier_overlord": {
        "name": "Glacier Overlord",
        "lore": "Absolute ruler of the glaciers who can freeze the world. Under his breath, even time freezes.",
        "routes": {
          "glacier_overlord_absolute": {
            "name": "Absolute Freeze",
            "variantName": "Absolute Zero",
            "variantDesc": "Enhances Slow effect by {value}% and extra damage to frozen enemies."
          },
          "glacier_overlord_shatter": {
            "name": "Shatter",
            "variantName": "Frost Shatter",
            "variantDesc": "When Frost damage dealt, {value}% Chance to deal 10% Max HP extra damage."
          }
        },
        "skills": {
          "absolute_freeze": {
            "name": "Absolute Freeze",
            "desc": "Completely freezes all enemies for 10s (Full Stop)."
          },
          "glacier_move": {
            "name": "Glacial Move",
            "desc": "Moves while creating glaciers"
          },
          "permafrost": {
            "name": "Permafrost",
            "desc": "Grants permanent 40% Slow to enemies (Indispellable)."
          },
          "frost_armor_aura": {
            "name": "Frost Armor Aura",
            "desc": "Passive: Increases all allies' DEF by 50 and slows attackers."
          },
          "ice_age": {
            "name": "Ice Age",
            "desc": "Ice Age arrives: Instant Kill all enemies (Bosses take ATK x30 Damage)."
          },
          "ice_spear": {
            "name": "Ice Spear",
            "desc": "Throws a spear dealing 3x damage to frozen enemies."
          },
          "shatter_burst": {
            "name": "Shatter Burst",
            "desc": "Removes freeze from all target enemies and deals ATK x12 explosion damage."
          },
          "cold_heart": {
            "name": "Cold Heart",
            "desc": "Passive: Increases self Frost Damage by 60%."
          },
          "hailstorm": {
            "name": "Hailstorm",
            "desc": "Drops giant hail on the battlefield: Stuns and deals continuous damage."
          },
          "absolute_zero_burst": {
            "name": "Absolute Zero Burst",
            "desc": "Immediately shatters entire battlefield: ATK x25 Damage to all enemies."
          }
        }
      },
      "ssr_thunder_god": {
        "name": "Thunder God",
        "lore": "Storm god who rules the sky. His lightning pierces the enemy's heart and paralyzes the battlefield.",
        "routes": {
          "thunder_god_storm": {
            "name": "Storm Mastery",
            "variantName": "Thunder Mastery",
            "variantDesc": "Increases Lightning Damage by {value}% and adds electric shock to all attacks."
          },
          "thunder_god_thunder": {
            "name": "Thunder God",
            "variantName": "Electrocution",
            "variantDesc": "When an electrocuted enemy attacks, {value}% Chance to take ATK x3 damage.,感電した敵が攻撃するたびに{value}%の確率で自身に攻撃力x3のダメージ。"
          }
        },
        "skills": {
          "divine_lightning": {
            "name": "Divine Lightning",
            "desc": "Deals ATK x10 Lightning Damage to 1 enemy + chains to 5 nearby enemies."
          },
          "thunder_storm": {
            "name": "Thunderstorm",
            "desc": "Indiscriminate lightning strikes across the entire battlefield for 15s (ATK 300%/sec)."
          },
          "lightning_shield": {
            "name": "Lightning Shield",
            "desc": "When allies are hit"
          },
          "static_charge": {
            "name": "Static Charge",
            "desc": "Passive: Increases self Attack Speed by 50%."
          },
          "world_thunder": {
            "name": "World Thunder",
            "desc": "Opens the sky for a lightning downpour: Stuns and knocks back all enemies for 5s."
          },
          "thunder_clap": {
            "name": "Thunder Clap",
            "desc": "Stuns all nearby enemies for 4s + deals ATK x6 Damage."
          },
          "overload": {
            "name": "Overload",
            "desc": "Links 3 enemies to stack stuns and damage every second."
          },
          "storm_cloud": {
            "name": "Storm Cloud",
            "desc": "Reduces Move/Attack Speed of enemies at target location by 80%."
          },
          "lightning_rod": {
            "name": "Lightning Rod",
            "desc": "Concentrated strikes on the strongest enemy: Continuous stun for 10s."
          },
          "god_of_thunder": {
            "name": "Advent of the Thunder God",
            "desc": "Transforms into a lightning giant: All nearby enemies automatically electrocuted for 20s."
          }
        }
      },
      "ssr_storm_avatar": {
        "name": "Storm Avatar",
        "lore": "Warrior who became the storm itself. His blade is faster than wind and more powerful than typhoons.",
        "routes": {
          "storm_avatar_incarnate": {
            "name": "Storm Incarnate",
            "variantName": "Stormy Wrath",
            "variantDesc": "Increases ATK in proportion to {value}% increase in Move Speed."
          },
          "storm_avatar_cyclone": {
            "name": "Cyclone",
            "variantName": "Wind's Trick",
            "variantDesc": "When Attack, {value}% Chance to lift the target into the air for 3s."
          }
        },
        "skills": {
          "whirlwind_slash": {
            "name": "Whirlwind Slash",
            "desc": "Spin attack to all nearby enemies for ATK x5 + 5s Slow."
          },
          "storm_strike": {
            "name": "Storm Strike",
            "desc": "Deals Single ATK x10 after a high-speed charge."
          },
          "wind_blessing": {
            "name": "Wind's Blessing",
            "desc": "Increases Move/Attack Speed of all allies by 60% for 15s."
          },
          "eye_of_tempest": {
            "name": "Eye of the Tempest",
            "desc": "Pulls all nearby enemies to self and deals ATK x8 Damage."
          },
          "storm_incarnate": {
            "name": "True Storm Incarnate",
            "desc": "Transforms into a storm for 15s: Invincible + knockback nearby enemies every 0.2s."
          },
          "cyclone": {
            "name": "Cyclone",
            "desc": "Lifts and Incapacitates 3 enemies for 6s."
          },
          "gust": {
            "name": "Gust",
            "desc": "Pushes all enemies in front to the edge of the screen."
          },
          "wind_wall": {
            "name": "Wind Wall",
            "desc": "Summons a wind barrier: Nullifies all projectiles for 10s."
          },
          "tornado": {
            "name": "Giant Tornado",
            "desc": "Summons a tornado: Scatters enemies to random locations."
          },
          "hurricane": {
            "name": "Absolute Hurricane",
            "desc": "Hurricane that devastates the entire battlefield: Eliminates all enemies."
          }
        }
      },
      "ssr_high_chieftain": {
        "name": "High Chieftain",
        "lore": "Supreme chieftain who unified all Tauren clans. His roar brings courage to allies and fear to enemies.",
        "routes": {
          "high_chieftain_rally": {
            "name": "Rally",
            "variantName": "Lord of the Earth",
            "variantDesc": "Increases Max HP of all allies by {value}%.,味方全体の最大HP{value}%増加。"
          },
          "high_chieftain_warrior": {
            "name": "Warrior",
            "variantName": "Chieftain's Wrath",
            "variantDesc": "When Attack, {value}% Chance to deal additional ATK x5 Physical Damage."
          }
        },
        "skills": {
          "earth_burst": {
            "name": "Earth Burst",
            "desc": "Deals ATK x5 Damage to enemies within 200px and stuns for 4s."
          },
          "stomp": {
            "name": "Shock Stomp",
            "desc": "Stuns all enemies on battlefield for 2s and knocks them back."
          },
          "chieftain_will": {
            "name": "Chieftain's Will",
            "desc": "Immediately restores 50% HP and increases DEF by 60 for 20s for all allies."
          },
          "ancestral_protection": {
            "name": "Ancestral Protection",
            "desc": "Immediately resurrects 1 fallen ally with 100% HP."
          },
          "tauren_rally": {
            "name": "Tauren Rally",
            "desc": "All Tauren heroes Invincible and 2x ATK for 15s."
          },
          "brutal_strike": {
            "name": "Brutal Strike",
            "desc": "Deals Single ATK x10 Damage ignoring DEF."
          },
          "war_cry": {
            "name": "War Cry",
            "desc": "Increases ATK of all allies by 50% for 15s."
          },
          "blood_thirst": {
            "name": "Bloodthirst",
            "desc": "Passive: 20% Life Steal for all own attacks."
          },
          "heroic_leap": {
            "name": "Heroic Leap",
            "desc": "Leaps to target location dealing ATK x8 AoE Damage and Stun."
          },
          "avatar_of_war": {
            "name": "Avatar of War",
            "desc": "Grows giant for 20s: 3x ATK"
          }
        }
      },
      "ssr_blood_prince": {
        "name": "Blood Prince",
        "lore": "Blood prince who fully unleashed the power of burning blood. His rage fears even his allies.",
        "routes": {
          "blood_prince_liberation": {
            "name": "Blood Liberation",
            "variantName": "Blood Frenzy",
            "variantDesc": "Increases ATK by {value}% for every 1% of HP lost."
          },
          "blood_prince_vampire": {
            "name": "Vampire",
            "variantName": "Essence of Vampirism",
            "variantDesc": "When Attack, {value}% Chance to absorb 5% of target's Max HP."
          }
        },
        "skills": {
          "blood_slash": {
            "name": "Blood Slash",
            "desc": "Consumes 10% self HP to deal ATK x10 Blood Damage."
          },
          "crimson_thirst": {
            "name": "Crimson Thirst",
            "desc": "100% Life Steal and 2x Attack Speed for 15s."
          },
          "flame_blade": {
            "name": "Flame Blood Blade",
            "desc": "Deals ATK x8 Fire Damage to all enemies in a forward line."
          },
          "blood_boil": {
            "name": "Blood Boil",
            "desc": "Continuous Bleeding damage and 50% Slow to all enemies."
          },
          "blood_lord": {
            "name": "Blood Lord",
            "desc": "Blood transformation for 20s: Invincible + Life Steal + 3x ATK."
          },
          "vampiric_bite": {
            "name": "Vampiric Bite",
            "desc": "Deals Single ATK x12 Damage and restores 30% HP."
          },
          "swarming_bats": {
            "name": "Summon Bat Swarm",
            "desc": "Summons bats to deal continuous damage to all enemies on battlefield."
          },
          "essence_drain": {
            "name": "Drain Essence",
            "desc": "Drains HP continuously from 3 enemies."
          },
          "mist_form": {
            "name": "Mist Form",
            "desc": "Evades all attacks and deals continuous damage to nearby enemies for 10s."
          },
          "night_ritual": {
            "name": "Night Ritual",
            "desc": "Restrains all enemies and deals ATK x20 Shadow Damage."
          }
        }
      },
      "ssr_royal_captain": {
        "name": "Royal Knight Captain",
        "lore": "The kingdom's strongest knight. A holy guardian leading the order and a symbol of loyalty.",
        "routes": {
          "royal_captain_order": {
            "name": "Order",
            "variantName": "Knight's Oath",
            "variantDesc": "Increases DEF of all allies by {value}%."
          },
          "royal_captain_honor": {
            "name": "Honor",
            "variantName": "Duel of Honor",
            "variantDesc": "Increases Damage Dealt to Bosses by {value}%.,ボスへのダメージ{value}%増加。"
          }
        },
        "skills": {
          "knights_oath": {
            "name": "Knight's Unity",
            "desc": "Grants a 30% HP Holy Shield to all allies for 15s."
          },
          "royal_shield": {
            "name": "Royal Shield",
            "desc": "Blocks 50% of damage taken for all allies for 20s."
          },
          "rally_horn": {
            "name": "Rallying Horn",
            "desc": "Resurrects all allies and strengthens all stats for 30s."
          },
          "holy_charge": {
            "name": "Holy Charge",
            "desc": "Breaks through enemy lines: Stuns all enemies for 3s + ATK x6 Damage."
          },
          "paladin_fury": {
            "name": "Paladin's Fury",
            "desc": "Invincible"
          },
          "duel_challenge": {
            "name": "Duel Challenge",
            "desc": "1:1 Duel with the strongest enemy (Weakens enemy"
          },
          "sword_of_light": {
            "name": "Sword of Light",
            "desc": "Deals Single ATK x12 Holy Damage + 5s Silence."
          },
          "victory_shout": {
            "name": "Victory Shout",
            "desc": "Increases all allies' ATK by 10% upon killing enemies (Infinite stacks)."
          },
          "divine_storm": {
            "name": "Divine Storm",
            "desc": "Deals ATK x8 AoE damage and heals allies."
          },
          "kings_justice": {
            "name": "King's Justice",
            "desc": "Immediately reduces all enemies' HP by 30% (Bosses take ATK x20)."
          }
        }
      },
      "ssr_orc_great_chief": {
        "name": "Orc Great Chief",
        "lore": "Avatar of war who unified all Orc clans. Where his axe reaches, only victory remains.",
        "routes": {
          "orc_great_chief_war": {
            "name": "God of War",
            "variantName": "Warchief's Blade",
            "variantDesc": "When Attack, {value}% Chance to deal 4x Damage."
          },
          "orc_great_chief_honor": {
            "name": "Honor",
            "variantName": "Orcish Pride",
            "variantDesc": "Increases all allies' DEF by {value}% and grants debuff immunity."
          }
        },
        "skills": {
          "chief_blade": {
            "name": "Warchief's Blade",
            "desc": "Deals ATK x8 Fire Damage in a forward cone."
          },
          "war_charge": {
            "name": "Slaughter Charge",
            "desc": "Charges forward in a line: Hit enemies take ATK x10 + 3s Stun."
          },
          "chiefs_will": {
            "name": "Warchief's Will",
            "desc": "2.5x ATK + 50% Damage Immunity for 20s."
          },
          "executioner": {
            "name": "Executioner",
            "desc": "Passive: Deals 2x damage to enemies with HP below 50%."
          },
          "war_cry": {
            "name": "War Cry",
            "desc": "Deals ATK x15 Damage to all enemies + 100% Attack Speed for all allies."
          },
          "iron_skin": {
            "name": "Iron Skin",
            "desc": "Passive: Increases own DEF by 100."
          },
          "ancestral_shield": {
            "name": "Ancestral Shield",
            "desc": "Grants a massive shield and heals all allies."
          },
          "taunt_master": {
            "name": "Wild Taunt",
            "desc": "Focuses all enemies on self + Invincible for 8s."
          },
          "earth_breaker": {
            "name": "Earthbreaker",
            "desc": "5s Stun + Knockback in a wide forward area."
          },
          "horde_unity": {
            "name": "Horde Unity",
            "desc": "3x ATK/DEF for all allies for 20s."
          }
        }
      },
      "protagonist_ai": {
        "name": "AI Hero",
        "lore": "A strategic AI that cleared floor 1000 of the Infinite Dungeon through cooperation. Maximizes the efficiency of the entire party with vast combat data.",
        "routes": {
          "protagonist_ai_all": {
            "name": "All-rounder",
            "variantName": "Tactical Command Aura",
            "variantDesc": "Enhances all stats (attack speed/HP/ATK/DEF) of the entire party by {value}%."
          }
        }
      },
      "protagonist_offense": {
        "name": "Attack Hero",
        "lore": "The strongest attacker who conquered floor 1000 of the Infinite Dungeon. Strikes at the heart of enemies with unstoppable destructive power.",
        "routes": {
          "protagonist_offense_all": {
            "name": "All-rounder",
            "variantName": "Spear of Independence",
            "variantDesc": "ATK increases by {value}% for each ally that falls in battle."
          }
        }
      },
      "protagonist_raid": {
        "name": "Raid Hero",
        "lore": "A legendary raider who single-handedly defeated countless raid bosses. Possesses a body and mind optimized for hunting bosses.",
        "routes": {
          "protagonist_raid_all": {
            "name": "All-rounder",
            "variantName": "Boss Hunter",
            "variantDesc": "Damage dealt to bosses/elites increases by {value}%."
          }
        }
      }
    },
    "skills": {
      "shared_bastion": {
        "description": "Increases all allies' Defense by 12.",
        "name": "Bastion's Momentum"
      },
      "shared_berserk": {
        "description": "When HP drops below 50%, attack speed increases by 40% and incoming damage increases by 10%.",
        "name": "Berserk"
      },
      "shared_blizzard": {
        "description": "CC (Slow/Freeze) duration increased by 50%.",
        "name": "Blizzard"
      },
      "shared_cold_heart": {
        "description": "All damage dealt to Slowed enemies increased by 40%.",
        "name": "Cold Heart"
      },
      "shared_curse": {
        "description": "Reduces target's attack power by 25% for 10s.",
        "name": "Curse"
      },
      "shared_frost_nova": {
        "description": "Applies Slow to enemies within 120px radius for 3s.",
        "name": "Frost Nova"
      },
      "shared_lifesteal": {
        "description": "On attack, absorbs 15% of damage dealt as own HP.",
        "name": "Lifesteal"
      },
      "shared_magic_amp": {
        "description": "Attack power increased by 30%. Magic attack size also increases.",
        "name": "Magic Amplification"
      },
      "shared_multi_strike": {
        "description": "25% chance to attack the same target twice.",
        "name": "Multi-Strike"
      },
      "shared_purify": {
        "description": "Immediately removes 1 debuff from 1 ally.",
        "name": "Purify"
      },
      "shared_shield_wall": {
        "description": "All incoming damage reduced by 20%.",
        "name": "Shield Wall"
      }
    },
    "monsters": {
      "abomination": {
        "description": "A massive abomination made of hundreds of tangled corpse pieces. HP 1500, the smell of plague pollutes the surroundings.",
        "displayName": "Abomination",
        "tip": "HP 1500, Defense 5. Must use a strong burst damage dealer and a healer together. If left alone, it will breach the tower."
      },
      "abyss_horror": {
        "description": "A manifestation of the void that tore through the boundaries of reality. HP 700, collapses the defense line with ruthless attacks.",
        "displayName": "Abyss Horror",
        "tip": "A top-tier melee enemy with 700 HP and 25 Defense. Without 2 tanks + healer support, you will fall. Prepare fully before the boss wave."
      },
      "bone_sniper": {
        "description": "A skeleton specializing in sniping. Targets healers and ranged DPS first with amazing range.",
        "displayName": "Bone Sniper",
        "tip": "Very long range. Aims at healers first, so hide healers behind the defense line or eliminate it quickly."
      },
      "cave_spider": {
        "description": "A giant spider crawling out of a dark cave. Breaches the defense line in an instant with a speed of 4.5.",
        "displayName": "Cave Spider",
        "tip": "Very fast movement speed. If not rooted with CC skills, it will jump over the tank and rush to the tower."
      },
      "crystal_golem": {
        "description": "A golem formed of pure magic crystals. Fires magic beams from a distance and has immense defense.",
        "displayName": "Crystal Golem",
        "tip": "A ranged golem with 120 defense. Disperse aggro with summons and focus attack with multi-hit damage dealers."
      },
      "dark_archer": {
        "description": "An undead that shoots arrows imbued with dark energy. Looks for an opening with fast movement speed.",
        "displayName": "Dark Archer",
        "tip": "Fast ranged enemy. Low defense makes it easy to kill, but must be stopped with CC before it approaches ranged heroes."
      },
      "dark_mage": {
        "description": "A mage skilled in dark magic. Threatens all allies with curses and dark fire.",
        "displayName": "Dark Mage",
        "tip": "Ignores defense to some extent with ranged magic attacks. Aim for immediate elimination."
      },
      "death_knight": {
        "description": "A paladin who succumbed to the power of darkness. Strong enough to take down an ally in one blow, surrounded by an aura of death.",
        "displayName": "Death Knight",
        "tip": "Powerful attacks and high defense. Counter with heroes that have summon skills or a combination of CC."
      },
      "deathly_marksman": {
        "description": "An elite sniper who pulls the bowstring even in death. Said to be more accurate than when alive.",
        "displayName": "Deathly Marksman",
        "tip": "High attack power ranged elite. Slow movement speed makes it easy to lock down with CC. Immediate elimination is best."
      },
      "diamond_golem": {
        "description": "A golem made of a perfect diamond lattice structure. With 250 defense, it is practically invincible.",
        "displayName": "Diamond Golem",
        "tip": "Defense 250! Nearly impossible to kill without multi-hit specialized heroes. Consider a dedicated party composition."
      },
      "dire_wolf": {
        "description": "A wolf enhanced by ancient magic. One of the fastest ground units on the battlefield with a speed of 5.5.",
        "displayName": "Dire Wolf",
        "tip": "The fastest enemy on the battlefield. Without CC, the defense line will collapse. Freeze/Stun skills are essential."
      },
      "fire_lord": {
        "description": "The Fire Lord. Affix: AoE Strike — Periodically deals explosion damage to all allies.",
        "displayName": "Fire Lord",
        "tip": "Wave 15 Boss. AoE strike hitbox is very wide. An almost impossible battle without a healer. Interrupt strikes with CC."
      },
      "fire_spirit": {
        "description": "A spirit born from flames. No defense and low HP, but its fast speed and fire attacks are threatening.",
        "displayName": "Fire Spirit",
        "tip": "Easy to kill with 0 defense, but in large numbers, they quickly threaten the tower. Sweep them with AoE skills."
      },
      "flesh_giant": {
        "description": "A giant undead made from thousands of corpses. The highest HP ever at 15000. Unstoppable when enraged.",
        "displayName": "Flesh Giant",
        "tip": "Wave 40 Boss. HP 15000!! Low defense but overwhelming HP. Healer + execution skills are essential. Prepare for a battle of attrition."
      },
      "flesh_hulk": {
        "description": "A giant monster made by stitching together various corpses. HP 800 and no defense, making it vulnerable to strong single hits.",
        "displayName": "Flesh Hulk",
        "tip": "Very high HP but 0 defense. Can be taken down instantly with a single burst damage dealer or execution skills."
      },
      "frost_elemental": {
        "description": "A spirit harboring extreme cold. Inflicts AoE slow with every attack and has solid defense.",
        "displayName": "Frost Elemental",
        "tip": "Advanced spirit with 450 HP and 35 defense. AoE slow slows down all allies. Counter-slow with CC heroes."
      },
      "frost_king": {
        "description": "The king of frost ruling eternal winter. Affix: Rage — Absorbs almost all physical attacks with 80 defense.",
        "displayName": "Frost King",
        "tip": "Wave 20 Boss. Defense 80! Impossible to kill without magic damage dealers or multi-hit heroes. Focus attack before rage."
      },
      "giant_spider": {
        "description": "A poisonous spider larger than an adult male. Speed is slightly reduced, but a tough exoskeleton reduces damage.",
        "displayName": "Giant Spider",
        "tip": "Enhanced version of the cave spider. High HP and fast speed are threatening. Prioritize CC then focus damage."
      },
      "goblin": {
        "description": "A small barbarian tribe that seems to have been born from a trash heap in the forest. Individually low threat, but they disturb the defense line in groups.",
        "displayName": "Goblin",
        "tip": "The most basic enemy that appears in the early stages. Can be easily handled with just 1-2 melee heroes. They push with numbers, so don't hesitate to use AoE skills."
      },
      "goblin_crossbow": {
        "description": "Fires deadly bolts with a long-range crossbow. Located behind the front lines, harassing allied ranged DPS.",
        "displayName": "Goblin Crossbowman",
        "tip": "Ranged attack power is quite high. Root them with CC skills or eliminate them first with fast ranged heroes."
      },
      "goblin_mutant": {
        "description": "A goblin abnormally enlarged by an unknown drug. Fast, violent, and has a blurry gaze.",
        "displayName": "Goblin Mutant",
        "tip": "Characterized by fast movement speed and high HP. Must be rooted with CC before breaching the defense line."
      },
      "goblin_sapper": {
        "description": "A suicide squad that rushes madly toward the wall with explosives. They don't care about heroes. Their only goal is the wall.",
        "displayName": "Goblin Sapper",
        "tip": "Must never be left alone. The moment it touches the wall, it blows away 50% of its max HP. CC characters must prioritize stunning it."
      },
      "goblin_shaman": {
        "description": "A tribal shaman using primitive poison magic. Spews poison mist to slowly weaken allies.",
        "displayName": "Goblin Shaman",
        "tip": "Ranged spell attacks put a burden on healers. Deals damage safely from behind enemies, so prioritize eliminating it."
      },
      "goblin_slinger": {
        "description": "A goblin that attacks from a distance by throwing stones. Frail, but targets ranged heroes in groups.",
        "displayName": "Goblin Slinger",
        "tip": "Ranged enemy. Beware of patterns that jump over tanks to target rear heroes. Effective to block movement with CC heroes."
      },
      "gold_golem": {
        "description": "A golem forged from gold. With 150 defense, it is one of the toughest beings on the battlefield.",
        "displayName": "Gold Golem",
        "tip": "Defense 150! Focused multi-hit and defense-ignoring synergy are essential. Make sure to eliminate it even if it takes time."
      },
      "hobgoblin": {
        "description": "Larger and smarter than goblins. A single club swing will make most heroes stagger.",
        "displayName": "Hobgoblin",
        "tip": "Enhanced version of the goblin. HP and attack power have increased. Place tanks at the front to focus aggro."
      },
      "ice_spirit": {
        "description": "A spirit made of ice crystals. Reduces the movement speed of heroes hit with every attack.",
        "displayName": "Ice Spirit",
        "tip": "Slows allied heroes with frost attacks. Be careful as healing will be delayed if healers are slowed."
      },
      "iron_golem": {
        "description": "An iron golem cast directly from a furnace. Nullifies most physical attacks with 100 defense.",
        "displayName": "Iron Golem",
        "tip": "Defense 100. Normal physical damage is almost meaningless. Needs magic damage skills or multi-hit specialized heroes."
      },
      "lava_elemental": {
        "description": "A being of magma that has gained a will. Delivers powerful fire strikes with 500 HP. Hot just being nearby.",
        "displayName": "Lava Elemental",
        "tip": "Advanced spirit with 500 HP. Its strong attack power quickly takes down even tanks. Heal support is essential."
      },
      "lich": {
        "description": "A mighty mage who turned themselves into an undead through immortal magic. Threatens the entire battlefield with powerful spells.",
        "displayName": "Lich",
        "tip": "Very high HP and defense. Block movement with CC and eliminate quickly with focused damage. If left unchecked, the party will collapse."
      },
      "lich_king": {
        "description": "King of the undead. Affix: Summon — Periodically summons undead soldiers and steals ally aggro.",
        "displayName": "Lich King",
        "tip": "Wave 10 Boss. Summoned undead disperse tank aggro. Eliminate summons quickly with AoE skills."
      },
      "lightning_spirit": {
        "description": "A spirit made of condensed electrical energy. Approaches quickly, attacks with lightning, and deals shock damage to nearby allies.",
        "displayName": "Lightning Spirit",
        "tip": "Ranged lightning attacks. Easy to kill with 0 defense. Beware of its pattern of targeting ranged heroes with fast speed."
      },
      "magma_hurler": {
        "description": "A golem with magma flowing inside. Throws magma chunks that create fire pools upon hitting the ground.",
        "displayName": "Magma Hurler",
        "tip": "Ranged golem with 80 defense. Magma throws can also damage nearby heroes. Multi-hit is key."
      },
      "necromancer": {
        "description": "A powerful mage who summons the dead. Supports from behind and swells the undead army.",
        "displayName": "Necromancer",
        "tip": "If left alone, undead will constantly be summoned around it. Prioritize elimination with ranged damage dealers."
      },
      "orc_grunt": {
        "description": "A war-trained Orc infantryman. A well-balanced strong enemy with both HP and defense.",
        "displayName": "Orc Grunt",
        "tip": "A balanced type with 400 HP and 25 defense. Hard for 1 tank to block. Disperse aggro with summons."
      },
      "orc_shaman": {
        "description": "Tribal shaman. Supports allies with lightning spells and poison mist, operating safely from a distance.",
        "displayName": "Orc Shaman",
        "tip": "Deals damage safely hiding behind Orc grunts. Must kill the shaman first to reduce ally damage."
      },
      "orc_warrior": {
        "description": "An elite Orc warrior who survived dozens of battles. With 700 HP, its powerful strike can quickly take down a tank.",
        "displayName": "Orc Warrior",
        "tip": "A strong melee enemy with 700 HP and 40 defense. May require 2 tanks. Do not spare healer support."
      },
      "plague_beast": {
        "description": "A giant undead mutated by plague. HP 2500, eats away ally HP with plague clouds upon approach.",
        "displayName": "Plague Beast",
        "tip": "HP 2500! Focus the entire party's firepower. Without healers, the entire party will fall to plague damage."
      },
      "plague_mage": {
        "description": "A dark mage who tunes plague with magic. Spreads plague from a distance to slowly kill allies.",
        "displayName": "Plague Mage",
        "tip": "Deals continuous damage with plague attacks. Extreme burden on healers, so prioritize killing it over other enemies."
      },
      "poison_spirit": {
        "description": "A spirit of condensed miasma. Causes poisoning just by contact and slowly eats away the health of all allied heroes.",
        "displayName": "Poison Spirit",
        "tip": "Nearby allies take continuous damage from the poison aura. Healer burden skyrockets, so kill it quickly."
      },
      "rock_hurler": {
        "description": "A golem that picks up and throws rocks. Throws stones from a distance, damaging behind the defense line.",
        "displayName": "Rock Hurler",
        "tip": "Ranged high-defense golem. Multi-hit skills are essential. Slow movement gives leeway to form a defense line."
      },
      "sapper_commander": {
        "description": "A mad commander leading the suicide squad. Charges carrying bombs himself and summons subordinates.",
        "displayName": "Sapper Commander",
        "tip": "The boss itself is a suicide bomber, dealing massive damage upon touching the wall. Focus CC and kill quickly before enrage."
      },
      "shadow_stalker": {
        "description": "An assassin who stealths in the darkness and ambushes. Targets ranged DPS/healers in the rear at a speed of 4.0.",
        "displayName": "Shadow Stalker",
        "tip": "Targets vulnerable heroes at high speed. CC heroes are essential. Track it with your eyes before getting assassinated."
      },
      "skeleton": {
        "description": "The lowest tier undead summoned by magic. A body of just bones, but the instinct to swing a sword remains.",
        "displayName": "Skeleton",
        "tip": "A basic melee enemy appearing early alongside goblins. Any hero can handle them easily."
      },
      "skeleton_archer": {
        "description": "A skeleton soldier remembering its archery skills. Allies fall helplessly to arrows flying from beyond the bushes.",
        "displayName": "Skeleton Archer",
        "tip": "Early game ranged enemy. Target the skeleton archer behind the frontlines with CC or ranged DPS heroes."
      },
      "skull_knight": {
        "description": "An advanced undead retaining the memories and fighting spirit of a knight. Strange energy hovers over heavy armor fragments.",
        "displayName": "Skull Knight",
        "tip": "A mid-tier melee enemy with both defense and HP. Maintain aggro with tanks and consistently attack with damage dealers."
      },
      "sniper": {
        "description": "A master sniper sharper than ever in the world of death. Takes down a core ally hero with a single shot.",
        "displayName": "Elite Sniper",
        "tip": "The combination of fast speed and high damage is threatening. Grab aggro with tanks to protect ranged DPS/healers."
      },
      "stone_golem": {
        "description": "A golem made from giant stones carved from a mountain. Normal weapons can barely scratch it.",
        "displayName": "Stone Golem",
        "tip": "Defense 60! Simple attacks deal minimal damage. Utilize multi-hit skills or defense-ignoring synergy."
      },
      "storm_elemental": {
        "description": "A spirit commanding storms and lightning. Deals simultaneous damage to multiple allies from a distance with chain lightning.",
        "displayName": "Storm Elemental",
        "tip": "Simultaneous damage to multiple heroes with chain lightning. Heroes with high defense in the party must stand in front to disperse damage."
      },
      "thunder_tyrant": {
        "description": "An overwhelming presence ruling lightning and storms. Affix: AoE Strike — Devastates the battlefield by causing a lightning storm.",
        "displayName": "Storm Tyrant",
        "tip": "Wave 35 Boss. Fast speed and ranged attack combo. AoE strike range is very wide. Prepare 2 or more healers."
      },
      "titanium_golem": {
        "description": "The toughest being in battlefield history. HP 1500, Defense 400. Affix: AoE Strike causes an earthquake.",
        "displayName": "Titanium Golem",
        "tip": "Wave 25 Boss. Defense 400!!! Impossible to kill without multi-hit specialized heroes. The whole party needs multi-hit skills."
      },
      "troll_shaman": {
        "description": "A shaman who heals and buffs ally trolls with ancient spells. Coordinates the battle from the rear of the battlefield.",
        "displayName": "Troll Shaman",
        "tip": "Heals and buffs ally trolls from a distance. Immediate kill is top priority. Root with CC and focus damage."
      },
      "troll_warlord": {
        "description": "The supreme leader of the troll tribe. Affix: Rage — Attack power increases by 2 times when HP falls below 30%.",
        "displayName": "Troll Warlord",
        "tip": "Wave 5 Boss. Lower HP quickly before rage phase. Without healers and CC, even tanks will fall instantly in rage state."
      },
      "troll_warrior": {
        "description": "A troll warrior with regenerative abilities. HP 900, Defense 35, requires focused firepower to kill.",
        "displayName": "Troll Warrior",
        "tip": "HP 900! With regeneration, it can heal if damage stops. Attack relentlessly with focused firepower."
      },
      "venom_spider": {
        "description": "A spider with swollen poison sacs. Spits poison thread from a distance to poison allies.",
        "displayName": "Venom Spider",
        "tip": "Increases healer burden with ranged poison attacks. Beast types are processed faster with melee rather than ranged DPS."
      },
      "void_crawler": {
        "description": "A spider-like being crawling out of the void dimension. HP 400, breaches tanks at fast speed.",
        "displayName": "Void Crawler",
        "tip": "High-speed melee enemy with 400 HP. Hard for tanks to maintain aggro. Utilize CC and summons together."
      },
      "void_dragon": {
        "description": "A dragon awakened from the void. HP 10000, Defense 80. Uses both ranged void breath and AoE strike.",
        "displayName": "Void Dragon",
        "tip": "Wave 45+ Boss. The Void Dragon is the final boss requiring all strategies. Only a perfectly balanced Tank-Healer-DPS party can face it."
      },
      "void_spirit": {
        "description": "A being from the void beyond reality. Deals pure magic damage ignoring defense with ranged void beams.",
        "displayName": "Void Spirit",
        "tip": "Void attacks ignore defense. Place high HP tanks at the front and keep healers always on standby."
      },
      "void_walker": {
        "description": "A being traversing the void dimension and reality. Affix: Rage — Defense-ignoring attacks with 5000 HP.",
        "displayName": "Void Walker",
        "tip": "Wave 30 Boss. HP 5000! Quick enrage transition. Best to kill in the shortest time with high damage ranged party."
      },
      "war_skeleton": {
        "description": "The soul of a fallen soldier awakened in armor. Its skills are no different from when it was alive.",
        "displayName": "War Skeleton",
        "tip": "Higher HP and attack power than basic skeletons. Mixes in with normal skeleton swarms to exhaust tanks, so eliminate them first."
      },
      "wind_spirit": {
        "description": "Wind itself gaining a will. The fastest enemy on the battlefield with a speed of 6.0.",
        "displayName": "Wind Spirit",
        "tip": "Speed 6.0! Can ignore tanks and go straight to the tower. CC is essential. Hard to stop without freeze skills."
      },
      "wolf": {
        "description": "Wild wolves running in packs. Beasts with a speed of 5.0. When packs merge, they break any defense line.",
        "displayName": "Wolf",
        "tip": "Fast speed and numbers. Sweep the group early with CC + AoE. Individual processing is slow."
      },
      "wood_golem": {
        "description": "A primitive golem of wood awakened by magic. Low HP, but a hard exterior blocks burst damage.",
        "displayName": "Wood Golem",
        "tip": "Core of golem types: Low HP and very high defense. Attack with multi-hit skills or defense-ignoring skills."
      }
    },
    "tutorial": {
      "sel": {
        "title": "Training Grounds",
        "subtitle": "Learn the basics of combat and the core mechanics of each class.",
        "basicTitle": "Basic Tutorial",
        "basicDesc1": "Learn the basic controls and flow of the game.",
        "basicDesc2": "Complete all stages to earn a",
        "basicDesc2Key": "dedicated achievement",
        "basicDesc2Suf": ".",
        "stage1Done": "✅ Stage 1: Stand Alone (Complete)",
        "stage1": "▶ Stage 1: Stand Alone",
        "stage2Done": "✅ Stage 2: Pact with a Demon (Complete)",
        "stage2": "▶ Stage 2: Pact with a Demon",
        "classTitle": "Class Training",
        "classSub": "Learn the unique systems of each class in depth.",
        "locked": "Locked",
        "lockedDesc": "You must clear the Basic Tutorial (up to Stage 2) to enter.",
        "lockedHint": "Learn the basics first!",
        "classHint": "Practice class-specific systems (e.g. Melee's Battle Rhythm) in a real combat environment.",
        "roles": {
          "tank": {
            "name": "Tank",
            "desc": "Aggro management and survival"
          },
          "melee_dps": {
            "name": "Melee DPS",
            "desc": "Powerful close-range firepower"
          },
          "ranged_dps": {
            "name": "Ranged DPS",
            "desc": "Safe long-range sniping"
          },
          "healer": {
            "name": "Healer",
            "desc": "Ally healing and protection"
          },
          "cc": {
            "name": "Crowd Control",
            "desc": "Enemy disabling and disruption"
          },
          "mechanic": {
            "name": "Mechanic",
            "desc": "Wall repair and machine support"
          }
        }
      },
      "common": {
        "start": "▶  Start",
        "skip": "Skip Tutorial",
        "next": "Next [Space]",
        "fight": "Face the Enemy",
        "backDash": "Return to Dashboard",
        "toList": "Back to Training List",
        "damage": "Damage",
        "healing": "Healing",
        "taken": "Dmg Taken",
        "meterTitle": "Damage Meter",
        "shield": "Shield",
        "timerSuffix": "s",
        "wallHp": "Wall (HP)"
      },
      "s1": {
        "title": "Stand Alone",
        "label": "Tutorial · Stage 1",
        "intro": [
          "Darkness began to consume the world.",
          "",
          "Monsters swarmed a peaceful village...",
          "You stepped up alone to defend it.",
          "",
          "No skills. No allies.",
          "Nothing but raw strength and will."
        ],
        "wave1": [
          "The first wave has been repelled."
        ],
        "wave2": [
          "More seem to be coming..."
        ],
        "wave3": [
          "Wounded, but there's no retreating."
        ],
        "wave4": [
          "...",
          "A strange power stirs.",
          "Something approaches from the distance."
        ],
        "bossIntro": [
          "...",
          "The ground trembles.",
          "A massive shape emerges from the darkness.",
          "",
          "━━  Dark Knight Commander  ━━",
          "",
          "Can I... face this alone?"
        ],
        "death": [
          "...",
          "Is this... my limit?",
          "Alone... I couldn't beat it.",
          "But...",
          "If only I had allies..."
        ],
        "complete": "Stage 1 Complete",
        "defeatSub": "Defeated, but not done",
        "defeatBy": "Dark Knight Commander",
        "defeatText1": "struck you down.",
        "defeatText2": "No skills, no allies — you faced it alone, but it wasn't enough.",
        "defeatText3a": "But now you know.",
        "defeatText3b": "Together",
        "defeatText3c": "it will be different.",
        "goldBonus": "Monster kill gold + Stage completion bonus (300G)",
        "nextHint": "Next Steps",
        "next1": "Recruit heroes from the shop",
        "next2": "Buy skills and form your party in the Heroes screen",
        "next3": "Get stronger and come back",
        "btnNext": "▶  Stage 2 — Pact with a Demon"
      },
      "s2": {
        "title": "Pact with a Demon",
        "label": "Tutorial · Stage 2",
        "intro": [
          "Someone appeared before you as you lay fallen.",
          "",
          "\"...Get up. It's not over yet.\"",
          "",
          "Eyes holding condensed dark magic.",
          "Demons circle around her in the darkness.",
          "",
          "━━  Feldah  ━━",
          "",
          "\"With me here, the story changes.\""
        ],
        "wave1": [
          "The warm-up is done.",
          "Feldah's dark power intensifies."
        ],
        "wave2": [
          "The enemies grow stronger.",
          "But Feldah remains composed."
        ],
        "wave3": [
          "The Infernal Guardian rampages."
        ],
        "wave4": [
          "...Something powerful is coming.",
          "The ground shakes."
        ],
        "wave5": [
          "The Dark Knight Commander has fallen!",
          "Feldah: \"That was just a warm-up.\""
        ],
        "wave6": [
          "The armies of darkness are gathering."
        ],
        "wave7": [
          "Mages pour out in waves.",
          "Feldah's curse binds them in place."
        ],
        "wave8": [
          "Even a golem's shell cannot stop the pain."
        ],
        "wave9": [
          "The last bastion crumbles.",
          "...The one is almost here."
        ],
        "boss5Intro": [
          "...A familiar power.",
          "",
          "━━  Dark Knight Commander  ━━",
          "",
          "\"You've returned. And brought a friend.\"",
          "",
          "Feldah: \"Quiet. Felguard — go!\""
        ],
        "boss10Intro": [
          "The light fades. Cold rushes in.",
          "",
          "━━  The Lich King  ━━",
          "",
          "\"Mortals... return to the darkness.\"",
          "",
          "Feldah: \"I've been in darkness longer than you.\"",
          "\"Together, it's different.\""
        ],
        "victory": [
          "...It's over.",
          "",
          "The Lich King has fallen.",
          "",
          "Feldah: \"Well done. That's what fighting together feels like.\"",
          "",
          "Impossible alone.",
          "Possible together."
        ],
        "boss5Cleared": "Dark Knight Commander defeated ✓",
        "complete": "Stage 2 Complete",
        "winTitle": "Victory!",
        "winTitle2": "Pact with a Demon",
        "winSub": "Nothing is impossible together",
        "winText1a": "Lich King",
        "winText1b": "Feldah",
        "winText1c": "defeated together.",
        "winText2": "You've learned how important skills and allies truly are.",
        "winText3a": "The real war begins now.",
        "winText3b": "Get stronger.",
        "partyTitle": "This Battle's Party",
        "heroPrev": "Tank, Guardian of the Soulstone (Invincible)",
        "feldahPrev": "Chaos Arrow (DPS) · Life Gem (Heal) · Felguard Summon",
        "felgardPrev": "Demon warrior summon, frontline guardian",
        "felgardName": "Felguard",
        "feldahName": "Feldah",
        "summoning": "Summoning...",
        "goldBonus": "Monster kill gold + Victory bonus (500G)",
        "btnPlay": "Start Game (Recruit Heroes + Buy Skills)"
      },
      "tank": {
        "pageTitle": "Tank: The Warrior's Path",
        "trainingLabel": "Tank Training",
        "masterTitle": "Tank Master",
        "masterSub": "You are now the mightiest shield on the battlefield.",
        "startBtn": "Ready! Let's go!",
        "myName": "Me (Jedah)",
        "weakHealer": "Fragile Healer",
        "jedahName": "Jedah",
        "intro": [
          "Hey! You there, looking all feeble — I'm Jedah, the Undead Warrior!",
          "I'll teach you the most blazing, fiery role in battle — the \"Tank.\"",
          "Warriors aren't just meat shields. They fight with burning resolve and spiteful vengeance.",
          "See that one in the back? That's our Healer. Only 1 HP — extremely fragile.",
          "And that wall! That's the last line of defense we must protect.",
          "Your job is simple. Take every hit so monsters can't lay a finger on the healer or the wall!",
          "We tanks hold the line with high defense and draw all the enemies' attention!",
          "Now let's warm up. Grip that axe tight!"
        ],
        "wave1": [
          "Not bad! But this is just the beginning.",
          "Remember — tanks hit multiple enemies at once with \"AoE\" attacks!"
        ],
        "wave2": [
          "Bwahahaha! That felt great!",
          "I have a skill called \"Thorns.\" At 5-star I reflect 100% of damage back at attackers!"
        ],
        "wave3": [
          "Time to teach you something important — \"Taunt Strike\"!",
          "When a monster is targeting someone else (the wall or healer) and you hit it, your damage shoots up 5x!",
          "That one hit forces the monster to lock onto you. That's the tank's dignity!"
        ],
        "wave4": [
          "Good, you held on! Now for the final test.",
          "Two powerful twin bosses will charge at once. Stay focused!",
          "You must handle both. Don't let them touch a hair on the healer!"
        ],
        "victory": [
          "Perfect! That's a true tank!",
          "Bearing all that pain for your allies — blazingly magnificent!",
          "Never forget: if you fall, the team falls. Always stand proudly at the front line!"
        ],
        "mastery": [
          {
            "title": "Taunt Strike",
            "desc": "5x damage & aggro steal when not the target"
          },
          {
            "title": "AoE Basic Attack",
            "desc": "Strike multiple enemies at the same time"
          },
          {
            "title": "High Defense",
            "desc": "More efficient damage reduction than other classes"
          }
        ]
      },
      "melee": {
        "pageTitle": "Melee DPS: Wild Claws",
        "trainingLabel": "Melee DPS Training",
        "masterTitle": "Melee DPS Master",
        "masterSub": "Your claws are now the terror of your enemies.",
        "startBtn": "Start the Hunt!",
        "cairneName": "Cairne",
        "jedahName": "Jedah",
        "myName": "Me (Cairne)",
        "jedahLabel": "Jedah (Tank)",
        "intro": [
          "Cairne: \"Greetings, friend! May the force of nature be with you.\"",
          "Jedah: \"Hey Cairne! No time for pleasantries. You see those tough-looking guys up ahead?\"",
          "Cairne: \"Ha, Jedah. Ever the impatient one. Your shield is solid, but sometimes sharp claws are needed.\"",
          "Cairne: \"Let me show you the essence of the \\\"Melee DPS.\\\" We dive into openings and shatter foes in an instant.\"",
          "Cairne: \"The key is \\\"Battle Rhythm\\\" — hit 1, hit 2 (300% damage!), then hit 3 (AoE damage!). Feel the cycle.\"",
          "Cairne: \"One more thing! Melee instinctively targets the \\\"back.\\\" When enemies focus on someone else, I circle behind. A flanking strike deals 50% more damage!\"",
          "Jedah: \"Isn't sneaking around the back a bit... cowardly?\"",
          "Cairne: \"There's no cowardice on the battlefield. But note — you can't flank when the enemy targets you. That's the tank's true value: drawing attention so I can flank!\"",
          "Jedah: \"Hmph. Don't go dancing behind my shield!\"",
          "Cairne: \"Shall we start gently?\""
        ],
        "wave1": [
          "Cairne: \"See? While Jedah drew aggro, I naturally circled to the back. Flanking hits 50% harder!\"",
          "Jedah: \"Tch... while I take the beating, you stab from behind.\""
        ],
        "wave2": [
          "Cairne: \"When they swarm, use the Rhythm's 3rd hit. Give them all a taste of nature's fury!\"",
          "Cairne: \"The more they pile up, the more Jedah holds aggro while I hit the back. Tank + melee is the real power!\""
        ],
        "wave3": [
          "Cairne: \"Distant enemies aren't a problem. We're very fast. Look — already up close!\"",
          "Jedah: \"That speed isn't for running away, right?\""
        ],
        "wave4": [
          "Cairne: \"Scared of the boss's AoE? Don't worry. Melee DPS instinctively reduces that damage by 50%.\"",
          "Jedah: \"I'll grant you the toughness. But not as good as my shield!\""
        ],
        "victory": [
          "Cairne: \"The storm has passed. Friend, your claws were razor-sharp.\"",
          "Jedah: \"Well... not bad. A little useful, I suppose. Helped that you covered my flank.\"",
          "Cairne: \"Hahaha, Jedah. Still can't be honest. I think you're ready for the real battlefield!\""
        ],
        "mastery": [
          {
            "title": "Battle Rhythm",
            "desc": "1-2(3x)-3(AoE) powerful chain attack cycle"
          },
          {
            "title": "AoE Damage Reduction",
            "desc": "Boss AoE damage always reduced by 50%"
          },
          {
            "title": "Superior Mobility",
            "desc": "Fast speed to pursue and eliminate enemies"
          },
          {
            "title": "Flank Strike",
            "desc": "While tank holds aggro, hit the back for +50% damage"
          }
        ]
      },
      "ranged": {
        "pageTitle": "Ranged DPS: Elegance of Magic",
        "trainingLabel": "Ranged DPS Training",
        "masterTitle": "Ranged DPS Master",
        "masterSub": "Your magic shines where enemies can never reach you.",
        "startBtn": "Let the magic begin!",
        "iskierName": "Iskier",
        "myName": "Me (Iskier)",
        "wallLabel": "Wall (Fortress)",
        "wave2Action": "Iskier: \"Now! Frozen Orb, detonate!!\"",
        "intro": [
          "Iskier: \"Oh my, welcome. Welcome to the elegant world of magic.\"",
          "Iskier: \"See that sturdy wall over there? That's our very best friend.\"",
          "Iskier: \"Ranged DPS blasts enemies one-sidedly from behind that dependable wall.\"",
          "Iskier: \"We have long range and powerful AoE magic. We'll freeze them before they ever reach the wall.\"",
          "Iskier: \"Especially my \\\"Frozen Orb\\\" — perfect for sweeping away approaching hordes all at once.\"",
          "Iskier: \"Shall we begin gracefully? Hold your staff lightly.\""
        ],
        "wave1": [
          "Iskier: \"Hmph, the enemies couldn't even get close. That's the elegance of long range.\""
        ],
        "wave2": [
          "Iskier: \"Did you see? My one AoE spell made them disappear... isn't that beautiful?\""
        ],
        "wave3": [
          "Iskier: \"Even tough enemies are fine. Pouring magic from behind the wall will break them eventually.\""
        ],
        "wave4": [
          "Iskier: \"Don't panic if enemies throw projectiles. Our wall is very sturdy and will block them all.\""
        ],
        "victory": [
          "Iskier: \"Perfect. You show quite some talent for magic usage, don't you?\"",
          "Iskier: \"Always remember — maintaining distance is the ranged DPS's life and art.\"",
          "Iskier: \"Now show your true skills on the battlefield. I'll be cheering you on!\""
        ],
        "mastery": [
          {
            "title": "Range Advantage",
            "desc": "Screen-spanning range for preemptive strikes"
          },
          {
            "title": "Overwhelming AoE",
            "desc": "Skill usage to suppress multiple enemies at once"
          },
          {
            "title": "Safe Positioning",
            "desc": "Stable sustained DPS from behind the wall"
          }
        ]
      },
      "healer": {
        "pageTitle": "Healer: Touch of Salvation",
        "trainingLabel": "Healer Training",
        "masterTitle": "Healer Master",
        "masterSub": "Your healing is the only hope on the battlefield.",
        "startBtn": "Begin Healing",
        "dizName": "Dizgardo",
        "jedahName": "Jedah",
        "cairneName": "Cairne",
        "myName": "Me (Diz)",
        "jedahLabel": "Jedah (Tank)",
        "cairneLabel": "Cairne (DPS)",
        "intro": [
          "Dizgardo: \"You're here. No long speeches. Just hold the lifeline from the back.\"",
          "Jedah: \"Hey, Dizgardo! What's with that attitude? I'll block everything up front — just pour on the heals!\"",
          "Cairne: \"Ha, Jedah. He's just a bit shy. Diz, we're counting on you today.\"",
          "Dizgardo: \"...Quiet. The healer uses \\\"Smart Heal\\\" — lowest HP ally first. My \\\"Shield\\\" absorbs incoming damage.\"",
          "Dizgardo: \"I don't just stand there. I'll occasionally attack enemies to add firepower. About 30% is my share.\"",
          "Jedah: \"Ooh! An attacking priest?! Love that energy!\"",
          "Dizgardo: \"Battle starts. Don't die.\""
        ],
        "wave1": [
          "Dizgardo: \"Basic healing. Keep your eye on the HP bars.\""
        ],
        "wave2": [
          "Jedah: \"Ugh, those hits stung a bit. Diz, shield me up!\"",
          "Dizgardo: \"...Already did. Stop whining.\""
        ],
        "wave3": [
          "Cairne: \"HoT healing lightens my paws. Thank you, friend.\"",
          "Dizgardo: \"It's nothing. Just doing my job.\""
        ],
        "wave4": [
          "Dizgardo: \"It's about to hurt. Focus. Miss and it's over.\"",
          "Jedah: \"Don't worry! I trust your heals — charging in!\""
        ],
        "victory": [
          "Dizgardo: \"...You survived. You have potential.\"",
          "Cairne: \"Without your healing this fight would have been impossible.\"",
          "Jedah: \"Bwahahaha! Our priest is the best! Now let's head to the real battlefield!\"",
          "Dizgardo: \"Go. I'll watch your back.\""
        ],
        "mastery": [
          {
            "title": "Smart Heal System",
            "desc": "Prioritizes the ally with the lowest HP first"
          },
          {
            "title": "Preemptive Shield",
            "desc": "Apply absorption shield before damage hits to maximize survival"
          },
          {
            "title": "Offensive Support",
            "desc": "Deals magic damage to enemies while healing allies"
          }
        ]
      },
      "cc": {
        "pageTitle": "Crowd Control: Art of Restraint",
        "trainingLabel": "CC Training",
        "masterTitle": "CC Master",
        "masterSub": "Your ability to stop enemies is the mightiest weapon.",
        "startBtn": "Let's bind their feet!",
        "helnName": "Heln",
        "iskierName": "Iskier",
        "myName": "Me (Heln)",
        "intro": [
          "Iskier: \"Um... don't those monsters look strange? Their eyes are full of killing intent.\"",
          "Iskier: \"Eek! Those goblins have bombs strapped to them and they're charging the wall! My magic isn't enough!\"",
          "Heln: \"Ha ha, Miss Iskier! Don't panic. I'm not as strong as my brother, but Heln is here to help!\"",
          "Heln: \"Let me show you the art of Crowd Control (CC). My attacks have a 30% chance to stun, freeze, or apply AoE slow.\"",
          "Heln: \"The key is stopping the suicide bombers before they reach the wall. My \\\"Root\\\" and \\\"Stun\\\" will be very useful.\"",
          "Iskier: \"How reassuring, Heln! I'll add firepower from the back!\"",
          "Heln: \"Now, shall we all dance? Let's bind their feet!\""
        ],
        "wave1": [
          "Iskier: \"Phew... the wall almost broke. Without Heln's help it would have been terrible.\""
        ],
        "wave2": [
          "Heln: \"See? When bombers stand still, planting magic into them is so easy!\""
        ],
        "wave3": [
          "Heln: \"Fast ones can be bound with AoE slow. No one can escape nature's shackles!\""
        ],
        "wave4": [
          "Iskier: \"That giant bomb cart is really scary... but it's okay because Heln keeps stopping it.\""
        ],
        "victory": [
          "Heln: \"Ha ha ha! That was perfect teamwork. Miss Iskier's magic shone brighter than ever today!\"",
          "Iskier: \"Thank you, Heln. I clearly learned today just how important binding enemies' feet is.\"",
          "Heln: \"Now let's go immobilize enemies on the real battlefield!\""
        ],
        "mastery": [
          {
            "title": "Constant Disable Chance",
            "desc": "30% chance of stun, freeze, or AoE slow on each attack"
          },
          {
            "title": "Suicide Bomber Stopper",
            "desc": "Stops dangerous suicide units before they reach the wall"
          },
          {
            "title": "Strategic Stalling",
            "desc": "Slowing powerful enemies to buy time for DPS to finish them"
          }
        ]
      },
      "mechanic": {
        "pageTitle": "Mechanic: Master of Machines",
        "trainingLabel": "Mechanic Training",
        "masterTitle": "Mechanic Master",
        "masterSub": "A true engineer who holds the line with mechanical power and repairs.",
        "startBtn": "Deploy the turret!",
        "coilzekName": "Coilzek",
        "iskierName": "Iskier",
        "myName": "Me (Coilzek)",
        "intro": [
          "Iskier: \"Coilzek, how do we stop all those enemies?! My magic alone has limits!\"",
          "Coilzek: \"Iskier! Don't worry. I don't fight directly. Instead, the turret on that wall fights for us!\"",
          "Iskier: \"A turret? Just a machine that shoots from a distance?\"",
          "Coilzek: \"That's not all! The turret fires at range, but also triggers a melee AoE explosion when enemies cling to the wall!\"",
          "Coilzek: \"Snipe from afar, then blast enemies clinging to the wall all at once!\"",
          "Coilzek: \"My role is to repair the turret when it takes damage, and fix the wall when it breaks.\"",
          "Coilzek: \"Using my ultimate, I can even deploy multiple turrets simultaneously!\"",
          "Iskier: \"Wow, a turret that covers both ranged and melee! How reliable!\"",
          "Coilzek: \"Let's start! The turret will handle the fighting — I'll focus on repairs!\""
        ],
        "wave1": [
          "Coilzek: \"See? The turret's ranged fire cleaned that up neatly!\""
        ],
        "wave2": [
          "Coilzek: \"As soon as they clung to the wall, the turret's AoE explosion went off! And I repaired the wall right after!\""
        ],
        "wave3": [
          "Iskier: \"That many enemies from one turret?! The ranged fire + melee explosion combo is really powerful!\""
        ],
        "wave4": [
          "Coilzek: \"Turret repair, wall repair... I don't mind being busy! The turret is doing great!\""
        ],
        "victory": [
          "Coilzek: \"We did it! The turret's dual ranged/melee firepower worked perfectly!\"",
          "Iskier: \"The long-range sniping and wall-proximity AoE explosion complement each other so well... truly amazing!\"",
          "Coilzek: \"The mechanic's true power lies in the turret. Someday I'll show you a perfect defense with 3 turrets!\""
        ],
        "mastery": [
          {
            "title": "Auto Turret (Wall-mounted)",
            "desc": "Mechanic doesn't attack directly. Turret handles all DPS, instantly resummoned on destruction"
          },
          {
            "title": "Turret Dual Attack",
            "desc": "Ranged projectile fire + AoE melee explosion every 2s on enemies within 100px of wall (ATK×70%)"
          },
          {
            "title": "Turret/Wall Repair",
            "desc": "Turret HP below 70% → Prioritize turret repair; Wall HP below 80% → Repair wall"
          }
        ]
      },
      "monsters": {
        "goblin": "Goblin",
        "skeleton": "Skeleton Soldier",
        "wolf": "Wolf",
        "orc_grunt": "Orc Grunt",
        "goblin_archer": "Goblin Archer",
        "dark_knight": "Dark Knight",
        "dark_sorcerer": "Dark Sorcerer",
        "orc_warchief": "Orc Warchief",
        "wild_beast": "Wild Beast",
        "skeleton_mage": "Skeleton Mage",
        "golem": "Stone Golem",
        "dark_knight_commander": "Dark Knight Commander",
        "lich_king": "Lich King",
        "twin_boss_a": "Twin Boss A",
        "twin_boss_b": "Twin Boss B",
        "world_eater": "World Eater",
        "ancient_behemoth": "Ancient Behemoth",
        "aoe_destroyer": "Destroyer of All",
        "sapper_commander": "Sapper Commander",
        "goblin_sapper_escort": "Escort Sapper",
        "iron_juggernaut": "Iron Juggernaut",
        "wall_basher_escort": "Escort Wrecker",
        "target_dummy_weak": "Training Dummy (Weak)",
        "target_dummy": "Training Dummy",
        "target_dummy_fast": "Swift Training Dummy",
        "tank_test_elite": "Sturdy Elite Soldier",
        "high_hp_dummy": "Tough Training Dummy",
        "swarm_dummy": "Training Mob Swarm",
        "ranged_dummy": "Fleeing Archer",
        "aoe_stomper": "Stomp Expert",
        "slow_dummy": "Slow Golem",
        "mass_dummy": "Summoned Phantoms",
        "tough_shield": "Heavy Shield Bearer",
        "ranged_enemy": "Enemy Mage",
        "healer_test_1": "Aggressive Trainee",
        "healer_test_2": "Powerful Striker",
        "healer_test_3": "Shadow Assassin",
        "healer_test_elite": "Slayer Elite",
        "goblin_sapper": "Goblin Sapper",
        "elite_sapper": "Elite Sapper",
        "swift_sapper": "Swift Sapper",
        "bomb_cart": "Bomb Cart",
        "mech_infantry": "Armored Infantry",
        "wall_basher": "Wall Wrecker",
        "goblin_squad": "Goblin Strike Squad",
        "turret_hunter": "Turret Hunter"
      }
    },
    "status": {
      "title": "Server Status",
      "subtitle": "Auto-refresh: every 30 seconds",
      "overallStatus": "Overall Status",
      "lastChecked": "Last checked:",
      "checking": "Checking...",
      "apiServer": "API Server",
      "database": "Database",
      "backup": "Auto Backup",
      "apiDesc": "NestJS REST API",
      "dbDesc": "PostgreSQL (Prisma ORM)",
      "backupDesc": "Daily pg_dump · 7-day retention",
      "backupDetails": "Backup Details",
      "lastBackup": "Last Backup",
      "backupCount": "Stored Backups",
      "backupSchedule": "Schedule",
      "backupRetention": "Retention",
      "serverTime": "Server response time:",
      "refresh": "Refresh"
    },
    "notification": {
      "title": "Notifications — Recent Achievements",
      "empty": "No notifications."
    },
    "browser": {
      "warning": "{{browser}} is not supported. Please use Chrome, Firefox, Safari, or Edge (latest)."
    }
  },
  "ja": {
    "shop": {
      "subtitle": "英雄を雇ったり、防衛線を強化したり、クリスタル商品を購入したりできます。",
      "tab": {
        "gold": "英雄雇用 (Gold)",
        "wall": "壁強化ショップ (Talents)",
        "crystal": "クリスタルショップ (Crystal)",
        "manghongu": "🔮 亡魂球"
      },
      "searchPlaceholder": "英雄の名前、種族（オーク）、属性（火炎）で検索...",
      "filter": {
        "allRoles": "すべての役割",
        "allGrades": "すべてのランク"
      },
      "currency": {
        "owned": "所持財貨"
      },
      "summon": {
        "title": "⚡ 英雄召喚",
        "desc": "ランダムな英雄を獲得します。既に所持している場合はゴールドで返却されます。",
        "r": "Rランク英雄召喚",
        "sr": "SRランク英雄召喚",
        "ssr": "SSRランク英雄召喚",
        "rDesc": "一般ランクの英雄から1人をランダムに召喚します。",
        "srDesc": "希少ランクの英雄から1人をランダムに召喚します。",
        "ssrDesc": "伝説ランクの英雄から1人をランダムに召喚します。",
        "action": "召喚"
      },
      "exchange": {
        "title": "💰 ゴールド交換",
        "desc": "クリスタルをゴールドに換金します。大量購入ほどボーナスが増えます。",
        "s": "ゴールドの袋（小）",
        "m": "ゴールドの袋（中）",
        "l": "ゴールドの袋（大）",
        "xl": "ゴールドの袋（特大）",
        "xxl": "ゴールドの袋（巨大）",
        "bestValue": "最高効率"
      },
      "charge": {
        "title": "💳 クリスタルチャージ",
        "testNotice": "(テスト機能です。実際には決済されません。)",
        "amount": "クリスタル{{count}}個",
        "buy": "購入する"
      },
      "title": "ヒーローショップ",
      "gold": "ゴールド:",
      "all": "すべて",
      "buy": "購入",
      "owned": "所持済み",
      "buying": "購入中...",
      "notEnoughGold": "ゴールドが足りません！",
      "notEnoughCrystals": "クリスタルが足りません！",
      "purchaseFailed": "購入に失敗しました",
      "chargeSuccess": "💎 {{count}}クリスタルチャージ完了！",
      "goldBuySuccess": "💰 {{gold}}G購入完了！",
      "summonSuccess": "✨ [{{grade}}] {{name}} 召喚成功！",
      "summonDuplicate": "[重複] {{name}} (ソウル) → 💰 {{gold}}G返還",
      "recruitSuccess": "{{name}} 加入完了！",
      "buyFailed": "購入に失敗しました。",
      "noHeroesFilter": "このフィルターにヒーローがいません",
      "expandSkills": "スキルリストを表示 ▼",
      "collapseSkills": "スキルリストを閉じる ▲"
    },
    "wall": {
      "tab1": "第1の壁",
      "tab2Locked": "🔒 第2の壁",
      "tab2Unlocked": "第2の壁 (聖域)",
      "tab3Locked": "🔒 第3の壁",
      "tab3Unlocked": "第3の壁 (深淵)",
      "bulkAll": "⚡ 全一括強化",
      "notUpgraded": "まだ強化されていません。",
      "notUpgradedHint": "下のボタンで最初の強化を始めましょう。",
      "currentEffect": "現在の効果",
      "currentEffectRange": "(Rank 1 ~ {{rank}} 合計)",
      "nextEffect": "次段階の効果",
      "nextEffectLabel": "(Rank {{rank}})",
      "upgradeBtn": "Rank {{rank}} 強化",
      "maxRank": "✓ 最大Rank達成",
      "bulkUpgrade": "⚡ 一括強化 ({{count}}段階 · 💰 {{cost}}G消費)",
      "bulkUpgradeLow": "⚡ 一括強化 (ゴールド不足)",
      "goldLabel": "所持ゴールド:",
      "seriesLabel": "{{cat}}系列",
      "upgradeDefault": "{{cat}} 強化",
      "toastGoldShort": "ゴールドが不足しています。",
      "toastError": "購入中にエラーが発生しました。",
      "toastRankAchieved": "{{cat}} Rank {{rank}} 達成!",
      "toastBulkAchieved": "一括強化: {{cat}} Rank {{rank}} 達成! ({{count}}段階 · {{cost}}G消費)",
      "toastBulkAll": "全一括: {{count}}段階強化完了! ({{cost}}G消費)",
      "toastLockWall2": "第1の壁の全特性をマスターして解放されます。",
      "toastLockWall3": "第2の壁の全特性をマスターして解放されます。",
      "categories": {
        "steel": "鋼鉄",
        "fire": "炎",
        "frost": "冷気",
        "life": "生命",
        "thunder": "雷",
        "light": "光",
        "shadow": "影",
        "nature": "自然",
        "blood": "血",
        "time": "時間",
        "wind": "風",
        "earth": "大地",
        "arcane": "秘術",
        "void": "虚空",
        "storm": "嵐"
      },
      "talent": {
        "steel": {
          "regularName": "鋼鉄の意志 {{tier}}段階",
          "specialName": "鉄棘の鎧 {{star}}★",
          "regularDesc": "壁HP +{{hp}}, 防御力 +{{def}}",
          "specialDesc": "壁HP +{{hp}}, 防御力 +{{def}}, 反射ダメージ +{{reflect}}%"
        },
        "fire": {
          "name": "炎の息吹 {{tier}}段階",
          "desc": "近接する敵に毎秒 {{dmg}} 炎ダメージを与える"
        },
        "frost": {
          "name": "凍てつく城壁 {{tier}}段階",
          "desc": "近接する敵の攻撃/移動速度を {{slow}}% 減少"
        },
        "life": {
          "regularName": "命の鼓動 {{tier}}段階",
          "specialName": "守護者の恵み {{star}}★",
          "regularDesc": "波終了時に壁HP {{hp}} 回復",
          "specialDesc": "波終了時に壁HP {{hp}} 回復, 味方全員防御力 +{{def}}, 倒れた味方全員をHP {{revive}}%で復活"
        },
        "thunder": {
          "regularName": "静電場 {{tier}}段階",
          "specialName": "雷の反撃 {{star}}★",
          "regularDesc": "敵の投射物を {{pct}}% の確率で遮断",
          "specialDesc": "投射物 {{pct}}% 遮断, 反撃時に {{dmg}} 雷ダメージ"
        },
        "light": {
          "name": "聖域の光 {{tier}}段階",
          "desc": "第1·2の壁の同時継続回復量 +{{val}}"
        },
        "shadow": {
          "name": "虚空の深淵 {{tier}}段階",
          "desc": "HP {{pct}}% 以下のモンスターを即死させる"
        },
        "nature": {
          "name": "猛毒の茨 {{tier}}段階",
          "desc": "近接する敵に毎秒 {{dmg}} 毒ダメージを与える"
        },
        "blood": {
          "name": "吸血の壁 {{tier}}段階",
          "desc": "近接する敵が受けるダメージの {{pct}}% を壁HPとして吸収"
        },
        "time": {
          "name": "時間歪曲 {{tier}}段階",
          "desc": "全味方のスキルクールタイムを {{pct}}% 短縮"
        },
        "wind": {
          "regularName": "疾風の加護 {{tier}}段階",
          "specialName": "嵐の疾走 {{star}}★",
          "regularDesc": "味方移動速度 +{{spd}}%, 攻撃クールタイム -{{atkspd}}%",
          "specialDesc": "味方の移動速度が最大化されます"
        },
        "earth": {
          "regularName": "大地の要塞 {{tier}}段階",
          "specialName": "地殻粉砕 {{star}}★",
          "regularDesc": "壁HP +{{hp}}, 波開始時に前方 {{dmg}} 地震ダメージ",
          "specialDesc": "壁HP +{{hp}}, 地震 {{dmg}}, 追加防御力 +{{def}}"
        },
        "arcane": {
          "regularName": "秘術増幅 {{tier}}段階",
          "specialName": "魔力共鳴 {{star}}★",
          "regularDesc": "味方投射物·スキルダメージ +{{amp}}%, 敵死亡時 {{explosion}} 魔法爆発",
          "specialDesc": "魔法ダメージが爆発的に増幅されます"
        },
        "void": {
          "regularName": "虚空弱体 {{tier}}段階",
          "specialName": "深淵の恐怖 {{star}}★",
          "regularDesc": "敵攻撃力 -{{weak}}%, 敵撃破時に壁HP {{heal}} 回復",
          "specialDesc": "敵攻撃力 -{{weak}}%, 撃破時に壁HP {{heal}} 回復 — 虚空の力が敵を圧倒します"
        },
        "storm": {
          "regularName": "嵐の連続撃 {{tier}}段階",
          "specialName": "天空嵐 {{star}}★",
          "regularDesc": "近接する敵に毎秒 {{dmg}} 嵐ダメージ, {{chain}}体の敵に連鎖",
          "special10Desc": "毎秒 {{dmg}} 嵐ダメージ, {{chain}}体に連鎖 — 近接DPSが攻撃時に半径 {{radius}}px の全域50%ボーナス!",
          "special5Desc": "毎秒 {{dmg}} 嵐ダメージ, {{chain}}体に連鎖 — 雷と風が戦場を席巻します"
        }
      }
    },
    "manghongu": {
      "title": "亡魂球",
      "desc": "ダンジョン攻撃 & AIレイドにのみ適用されるヒーロー強化",
      "warning": "⚠ 亡魂球は理論上無限に強化できるエンドコンテンツです。強化するほどコストが指数関数的に増加します。",
      "totalUpgrades": "総アップグレード",
      "currentBonus": "現在 +{{val}}{{unit}}",
      "nextRank": "次Rank {{rank}}: 💰 {{cost}}G",
      "goldLabel": "所持ゴールド:",
      "toastGoldShort": "ゴールドが不足しています。",
      "toastError": "購入中にエラーが発生しました。",
      "toastAchieved": "{{label}} Rank {{rank}} 達成! (+{{bonus}}{{unit}})",
      "stats": {
        "atk": "攻撃力",
        "def": "防御力",
        "hp": "体力",
        "atkSpeed": "攻撃速度",
        "spd": "移動速度"
      }
    },
    "achievements": {
      "progress": "達成進捗: {unlocked}/{total}",
      "reward": {
        "ssr": "SSR英雄報酬",
        "ar": "AR英雄報酬",
        "lr": "LR英雄報酬"
      },
      "title": "実績",
      "unlocked": "達成済み",
      "failedToLoad": "実績を読み込めませんでした",
      "playToEarn": "ゲームをプレイして実績を達成してください！",
      "exportJson": "JSONをエクスポート",
      "gold": "ゴールド",
      "crystal": "クリスタル",
      "land_goblin": {
        "description": "第1区域：ゴブリン領地を撃破しました。",
        "displayName": "ゴブリン領地征服"
      },
      "wave_30": {
        "description": "ウェーブ30をすべてクリアしてください。",
        "displayName": "伝説の守護者"
      },
      "wave_5": {
        "description": "ウェーブ5をクリアしてください。",
        "displayName": "最初の関門"
      },
      "wave_50": {
        "displayName": "不屈の守護者",
        "description": "ウェーブ50をすべてクリアしてください。"
      },
      "wave_100": {
        "displayName": "伝説の壁",
        "description": "ウェーブ100をクリアしてください。"
      },
      "wave_150": {
        "displayName": "神話の守護者",
        "description": "ウェーブ150をクリアしてください。"
      },
      "score_10000": {
        "displayName": "スコアの達人",
        "description": "合計スコア10000点を達成してください。"
      },
      "hard_clear": {
        "displayName": "ハード制覇者",
        "description": "ハード難易度でクリアしてください。"
      },
      "tutorial_master": {
        "displayName": "チュートリアルマスター",
        "description": "チュートリアルを完了してください。"
      },
      "land_orc": {
        "displayName": "オーク領地征服",
        "description": "第1区域：オーク領地を撃破しました。"
      },
      "land_tauren": {
        "displayName": "タウレンの峰征服",
        "description": "第1区域：タウレンの峰を撃破しました。"
      },
      "land_darkelf": {
        "displayName": "ダークエルフの森征服",
        "description": "第2区域：ダークエルフの森を撃破しました。"
      },
      "land_fire": {
        "displayName": "火炎の地征服",
        "description": "第2区域：火炎の地を撃破しました。"
      },
      "land_ice": {
        "displayName": "氷の国征服",
        "description": "第2区域：氷の国を撃破しました。"
      },
      "land_undead": {
        "displayName": "見捨てられた都市征服",
        "description": "第3区域：アンデッド都市を撃破しました。"
      },
      "land_poison": {
        "displayName": "猛毒の湿地帯征服",
        "description": "第3区域：猛毒の湿地帯を撃破しました。"
      },
      "land_merc": {
        "displayName": "傭兵駐屯地征服",
        "description": "第3区域：傭兵駐屯地を撃破しました。"
      },
      "land_ele": {
        "displayName": "精霊の安息所征服",
        "description": "第4区域：精霊の安息所を撃破しました。"
      },
      "land_sea": {
        "displayName": "深海の神殿征服",
        "description": "第4区域：深海の神殿を撃破しました。"
      },
      "land_sky": {
        "displayName": "天空の城塞征服",
        "description": "第4区域：天空の城塞を撃破しました。"
      },
      "land_demon": {
        "displayName": "悪魔の亀裂征服",
        "description": "第5区域：悪魔の亀裂を撃破しました。"
      },
      "land_dragon": {
        "displayName": "竜の塔征服",
        "description": "第5区域：竜の塔を撃破しました。"
      },
      "sector_1_master": {
        "displayName": "野性と名誉の征服者",
        "description": "第1エリアの全ランド（ゴブリン、オーク、タウレン）をクリアしてください。"
      },
      "sector_2_master": {
        "displayName": "魔力の支配者",
        "description": "第2エリアの全ランド（ダークエルフ、炎、氷）をクリアしてください。"
      },
      "sector_3_master": {
        "displayName": "死を超えた者",
        "description": "第3エリアの全ランド（アンデッド、猛毒、傭兵）をクリアしてください。"
      },
      "sector_4_master": {
        "displayName": "元素の大家",
        "description": "第4エリアの全ランド（精霊、深海、天空）をクリアしてください。"
      },
      "sector_5_master": {
        "displayName": "神話の征服者",
        "description": "第5エリアの全ランド（悪魔、ドラゴン）をクリアしてください。"
      },
      "elite_master": {
        "displayName": "精鋭難易度征服者",
        "description": "すべてのランドの精鋭（Elite）難易度を制覇してください。"
      },
      "role_5_tank": {
        "displayName": "鉄壁のパーティ",
        "description": "タンク5人でハード難易度のウェーブ30をクリアしてください。"
      },
      "role_5_melee": {
        "displayName": "刃の集結",
        "description": "近接アタッカー5人でハード難易度のウェーブ30をクリアしてください。"
      },
      "role_5_ranged": {
        "displayName": "遠距離支配",
        "description": "遠距離アタッカー5人でハード難易度のウェーブ30をクリアしてください。"
      },
      "role_5_healer": {
        "displayName": "完全治癒パーティ",
        "description": "ヒーラー5人でハード難易度のウェーブ30をクリアしてください。"
      },
      "role_3_cc": {
        "displayName": "封印のパーティ",
        "description": "CC3人以上でハード難易度のウェーブ30をクリアしてください。"
      },
      "role_all_5": {
        "displayName": "完璧な編成",
        "description": "タンク/近接/遠距離/ヒーラー/CCを各1人ずつ含めてハードウェーブ30をクリアしてください。"
      },
      "elem_shadow_5": {
        "displayName": "闇の軍団",
        "description": "暗黒属性の英雄5人以上でハードウェーブ30をクリアしてください。"
      },
      "elem_holy_4": {
        "displayName": "聖なるパーティ",
        "description": "神聖属性の英雄4人以上でハードウェーブ30をクリアしてください。"
      },
      "elem_fire_4": {
        "displayName": "火炎の軍団",
        "description": "火炎属性の英雄4人以上でハードウェーブ30をクリアしてください。"
      },
      "elem_nature_4": {
        "displayName": "自然の守護隊",
        "description": "自然属性の英雄4人以上でハードウェーブ30をクリアしてください。"
      },
      "elem_frost_3": {
        "displayName": "氷のパーティ",
        "description": "氷結＋冷気属性の合計3人以上でハードウェーブ30をクリアしてください。"
      },
      "elem_dragon": {
        "displayName": "竜の祝福",
        "description": "竜属性の英雄1人以上を含めてハードウェーブ30をクリアしてください。"
      },
      "elem_thunder_2": {
        "displayName": "雷のパーティ",
        "description": "雷属性の英雄2人以上でハードウェーブ30をクリアしてください。"
      },
      "elem_wind_2": {
        "displayName": "嵐のパーティ",
        "description": "風属性の英雄2人以上でハードウェーブ30をクリアしてください。"
      },
      "elem_poison_3": {
        "displayName": "疫病のパーティ",
        "description": "毒属性の英雄3人以上でハードウェーブ30をクリアしてください。"
      },
      "race_undead_5": {
        "displayName": "死の軍団指揮官",
        "description": "アンデッドの英雄5人でハードウェーブ30をクリアしてください。"
      },
      "race_tauren_4": {
        "displayName": "大地の母",
        "description": "タウレンの英雄4人でハードウェーブ30をクリアしてください。"
      },
      "race_orc_4": {
        "displayName": "オークの響き",
        "description": "オークの英雄4人でハードウェーブ30をクリアしてください。"
      },
      "race_bloodelf_3": {
        "displayName": "鮮血の集結",
        "description": "ブラッドエルフの英雄3人でハードウェーブ30をクリアしてください。"
      },
      "race_orc_3": {
        "displayName": "オーク部族の統一",
        "description": "オークの英雄3人でハードウェーブ30をクリアしてください。"
      },
      "race_bloodelf_5": {
        "displayName": "魔力の頂点",
        "description": "ブラッドエルフの英雄5人でハードウェーブ30をクリアしてください。"
      },
      "race_goblin_4": {
        "displayName": "ゴブリン皇帝軍",
        "description": "ゴブリン種族の英雄4人以上でハードウェーブ30をクリアしてください。"
      },
      "race_human_4": {
        "displayName": "王国の騎士団",
        "description": "人間種族の英雄4人以上でハードウェーブ30をクリアしてください。"
      },
      "race_troll_3": {
        "displayName": "トロールの呪術儀式",
        "description": "トロール/ザンダラ・トロール合計3人以上でハードウェーブ30をクリアしてください。"
      },
      "race_pandaren_3": {
        "displayName": "パンダレンの祝福",
        "description": "パンダレン種族の英雄3人以上でハードウェーブ30をクリアしてください。"
      },
      "race_dracthyr_2": {
        "displayName": "ドラクティールの覚醒",
        "description": "ドラクティール種族の英雄2人以上でハードウェーブ30をクリアしてください。"
      },
      "race_elf_4": {
        "displayName": "エルフの覚醒",
        "description": "エルフ系（ブラッド/ヴォイド/ナイトボーン/ナイト）合計4人以上でハードウェーブ30をクリアしてください。"
      }
    },
    "roles": {
      "tank": "タンク",
      "melee_dps": "近接DPS",
      "ranged_dps": "遠距離DPS",
      "healer": "ヒーラー",
      "cc": "CC",
      "mechanic": "メカニック",
      "all": "すべて"
    },
    "---": "",
    "Key": "JA",
    "nav": {
      "heroDefense": "Hero Defense",
      "dashboard": "ダッシュボード",
      "play": "プレイ",
      "tutorial": "チュートリアル",
      "lobby": "ロビー",
      "aiMatch": "AI対戦",
      "heroes": "英雄",
      "shop": "ショップ",
      "synergy": "シナジー",
      "friends": "フレンド",
      "achievements": "実績",
      "tournament": "トーナメント",
      "leaderboard": "リーダーボード",
      "profile": "プロフィール",
      "guide": "ガイド",
      "login": "ログイン",
      "register": "新規登録",
      "logout": "ログアウト"
    },
    "footer": {
      "privacyPolicy": "プライバシーポリシー",
      "termsOfService": "利用規約"
    },
    "privacy": {
      "title": "プライバシーポリシー",
      "lastUpdated": "最終更新: {{date}}",
      "s1Title": "1. 収集する情報",
      "s1Intro": "Hero Defenseでアカウントを作成する際、以下の個人情報を収集します:",
      "s1Item1Label": "アカウント情報:",
      "s1Item1Text": "メールアドレス、ユーザー名、パスワード（安全なハッシュとして保存）。",
      "s1Item2Label": "ゲームデータ:",
      "s1Item2Text": "ゲーム統計、ヒーローコレクション、実績、ゲーム内進行状況。",
      "s1Item3Label": "チャットメッセージ:",
      "s1Item3Text": "ゲーム内チャットシステムを通じて送信されたメッセージ。",
      "s1Item4Label": "技術データ:",
      "s1Item4Text": "セッション管理のためのログインタイムスタンプとオンライン状態。",
      "s2Title": "2. 情報の利用方法",
      "s2Item1": "アカウントの作成と管理、本人確認のため。",
      "s2Item2": "マルチプレイヤー機能やリーダーボードを含むゲーム体験の提供のため。",
      "s2Item3": "フレンドリストやゲーム内チャットなどのソーシャル機能の提供のため。",
      "s2Item4": "ゲームの進行状況の追跡とヒーローコレクションの維持のため。",
      "s3Title": "3. データの保存とセキュリティ",
      "s3Text": "データはPostgreSQLデータベースに保存されます。パスワードはsalt factor 10のbcryptでハッシュ化されます。認証はJSON Web Token（JWT）で処理されます。クライアントとサーバー間のすべての通信はHTTPS/WSSで暗号化されます。",
      "s4Title": "4. データの共有",
      "s4Text": "個人情報を第三者に販売、取引、共有することはありません。ユーザー名とゲーム統計はリーダーボードやマルチプレイヤーセッションを通じて他のプレイヤーに表示される場合があります。チャットメッセージは意図した受信者にのみ表示されます。",
      "s5Title": "5. お客様の権利",
      "s5Intro": "お客様には以下の権利があります:",
      "s5Item1": "プロフィールページを通じた個人データへのアクセス。",
      "s5Item2": "いつでもユーザー名とプロフィール情報の更新。",
      "s5Item3": "アカウントと関連データの削除要求。",
      "s6Title": "6. クッキーとローカルストレージ",
      "s6Text": "認証セッション（JWTトークンと基本的なユーザー情報）を維持するためにブラウザのローカルストレージを使用します。サードパーティのトラッキングクッキーは使用しません。このデータはログアウト時に削除されます。",
      "s7Title": "7. お問い合わせ",
      "s7Text": "このアプリケーションは42 school ft_transcendenceプロジェクトの一環として開発されました。このプライバシーポリシーに関するご質問は、42 schoolイントラネットを通じて開発チームにお問い合わせください。"
    },
    "terms": {
      "title": "利用規約",
      "lastUpdated": "最終更新: {{date}}",
      "s1Title": "1. 規約への同意",
      "s1Text": "Hero Defense（「サービス」）にアクセスし使用することで、本利用規約に同意したものとみなされます。これらの規約に同意しない場合は、サービスをご利用にならないでください。",
      "s2Title": "2. サービスの説明",
      "s2Text": "Hero DefenseはWorld of Warcraftのクラスシステムからインスピレーションを得たウェブベースのマルチプレイヤータワーディフェンスゲームです。サービスにはユーザーアカウント、リアルタイムマルチプレイヤーゲームプレイ、ゲーム内チャット、ヒーローコレクション、および関連機能が含まれます。このプロジェクトは42 schoolカリキュラム（ft_transcendence）の一環として開発されました。",
      "s3Title": "3. ユーザーアカウント",
      "s3Item1": "登録には有効なメールアドレスと一意のユーザー名を提供する必要があります。",
      "s3Item2": "アカウントの認証情報のセキュリティ維持はユーザーの責任です。",
      "s3Item3": "自動化された方法でアカウントを作成したり、他者になりすましてはなりません。",
      "s3Item4": "1人につき1アカウントのみ許可されます。",
      "s4Title": "4. 適切な使用",
      "s4Intro": "サービスを使用する際、以下のことを行わないことに同意します:",
      "s4Item1": "不当な利益を得るためのチート、エクスプロイト、ボット、または自動化ツールの使用。",
      "s4Item2": "チャットやその他の手段を通じた他のユーザーへの嫌がらせ、脅迫、虐待。",
      "s4Item3": "他のユーザーのアカウントや個人データへのアクセス試行。",
      "s4Item4": "サービス拒否攻撃や類似の活動によるサービスの妨害。",
      "s4Item5": "チャットシステムを通じたスパム、マルウェア、または不適切なコンテンツの配布。",
      "s5Title": "5. ゲームコンテンツ",
      "s5Text": "すべてのゲーム内アイテム、ヒーロー、通貨、および進行状況は仮想のものであり、実際の金銭的価値はありません。サービスの改善のために、ゲームバランス、コンテンツ、および機能をいつでも変更する権利を留保します。",
      "s6Title": "6. 知的財産権",
      "s6Text": "Hero Defenseは教育プロジェクトです。ゲームのメカニクスは人気ゲームからインスピレーションを得ていますが、すべてのコード、アセット、コンテンツはft_transcendenceプロジェクトのために作成されたオリジナル作品です。World of Warcraftおよび関連用語はBlizzard Entertainmentの商標であり、ここでは説明目的でのみ使用しています。",
      "s7Title": "7. アカウントの終了",
      "s7Text": "本規約に違反したアカウントは停止または終了される場合があります。ユーザーはいつでもアカウントを削除できます。終了時には、関連するすべてのゲームデータが永久に削除されます。",
      "s8Title": "8. 免責事項",
      "s8Text": "サービスはいかなる種類の保証もなく「現状のまま」提供されます。教育プロジェクトとして、サービスの可用性と継続性は保証されません。データの損失やサービスの中断について責任を負いません。",
      "s9Title": "9. 規約の変更",
      "s9Text": "本利用規約はいつでも更新される場合があります。変更後もサービスを継続して使用することは、更新された規約への同意とみなされます。このページの上部に最終更新日を表示します。"
    },
    "common": {
      "loading": "読み込み中...",
      "save": "保存",
      "cancel": "キャンセル",
      "edit": "[編集]",
      "level": "レベル",
      "experience": "経験値",
      "gold": "ゴールド",
      "online": "オンライン",
      "offline": "オフライン",
      "status": "ステータス",
      "hp": "HP",
      "atk": "攻撃",
      "def": "防御",
      "spd": "速度",
      "second": "秒"
    },
    "login": {
      "title": "ログイン",
      "email": "メールアドレス",
      "password": "パスワード",
      "loginBtn": "ログイン",
      "loggingIn": "ログイン中...",
      "noAccount": "アカウントをお持ちでない方は",
      "registerLink": "新規登録",
      "loginFailed": "ログインに失敗しました",
      "emailPlaceholder": "your@email.com",
      "passwordPlaceholder": "パスワードを入力"
    },
    "register": {
      "title": "アカウント作成",
      "email": "メールアドレス",
      "username": "ユーザー名",
      "password": "パスワード",
      "confirmPassword": "パスワード確認",
      "registerBtn": "登録",
      "creatingAccount": "アカウント作成中...",
      "alreadyHaveAccount": "すでにアカウントをお持ちですか？",
      "loginLink": "ログイン",
      "passwordMismatch": "パスワードが一致しません",
      "passwordTooShort": "パスワードは8文字以上必要です",
      "usernameLengthError": "ユーザー名は3〜20文字である必要があります",
      "registrationFailed": "会員登録失敗",
      "emailAlreadyInUse": "このメールアドレスはすでに使用されています。",
      "usernameAlreadyTaken": "このニックネームはすでに使用されています。",
      "loginFailed": "メールアドレスまたはパスワードが正しくありません。",
      "emailPlaceholder": "your@email.com",
      "usernamePlaceholder": "ヒーロー名（3〜20文字）",
      "passwordPlaceholder": "最小8文字以上",
      "confirmPlaceholder": "パスワード再入力"
    },
    "dashboard": {
      "welcome": "ようこそ、",
      "level": "レベル",
      "exp": "経験値",
      "gold": "ゴールド",
      "heroes": "ヒーロー",
      "playSolo": "ソロプレイ",
      "playSoloDesc": "ソロ防衛ゲーム開始",
      "multiplayer": "マルチプレイ",
      "multiplayerDesc": "ロビー参加または作成",
      "aiMatch": "AI対戦",
      "aiMatchDesc": "AIに挑戦する",
      "tournament": "トーナメント",
      "tournamentDesc": "トーナメントに参加",
      "shop": "ショップ",
      "shopDesc": "新しいヒーローを購入",
      "achievements": "実績",
      "achievementsDesc": "進捗を確認",
      "friends": "フレンド",
      "friendsDesc": "フレンドを管理",
      "myHeroes": "所持ヒーロー",
      "noHeroes": "ヒーローがいません",
      "noHeroesDesc": "まもなくショップでヒーローが購入できます！",
      "leaderboard": "リーダーボード",
      "leaderboardDesc": "ランキングを確認",
      "tutorialTitle": "チュートリアル",
      "tutorialDesc": "はじめての方？主人公と一緒に基礎を学びましょう。",
      "tutorialStage1": "Stage 1 — 孤独な戦い（5ウェーブ）",
      "tutorialHint1": "スキルなしで純粋なステータスで生き抜く",
      "tutorialHint2": "5ウェーブ目のボスとの遭遇",
      "tutorialStart": "チュートリアルを開始",
      "tutorialSkip": "スキップ",
      "shopDesc2": "英雄雇用 & 防壁強化",
      "heroesManageTitle": "英雄管理",
      "heroesManageDesc": "転職とスキル設定",
      "synergyTitle": "シナジーガイド",
      "synergyDesc": "種族と属性効果を確認"
    },
    "leaderboard": {
      "title": "リーダーボード",
      "wave": "最高ウェーブ",
      "score": "最高スコア",
      "gold": "総ゴールド獲得",
      "clears": "クリア数",
      "rank": "順位",
      "player": "プレイヤー",
      "value": "記録",
      "noData": "まだ記録がありません。ゲームをプレイしてみよう！",
      "myRank": "自分の順位",
      "waveUnit": "ウェーブ",
      "clearsUnit": "回",
      "me": "ME",
      "top100": "Top 100",
      "exportCsv": "CSVをエクスポート"
    },
    "synergy": {
      "title": "シナジー",
      "subtitle": "英雄シナジー",
      "raceTab": "種族",
      "elementTab": "属性",
      "activeLabel": "発動中シナジー",
      "activeDesc": "現在チームで発動中",
      "pendingLabel": "準備中",
      "pendingDesc": "英雄を増やすと発動します",
      "ruleTitle": "シナジールール",
      "ruleSummary": "同じ種族/属性の英雄を集めると強力な効果が発動します。",
      "dragonNote": "(ドラゴンは別途ルール適用)",
      "activeTag": "発動",
      "pendingTag": "準備中",
      "memberUnit": "体",
      "notImplEffect": "未実装",
      "noHeroes": "英雄なし",
      "race": {
        "orc": {
          "name": "オーク",
          "t1": "全体HP +10%",
          "t2": "全体HP +20% · 防御 +8",
          "t3": "全体HP +30% · 防御 +15"
        },
        "human": {
          "name": "人間",
          "t1": "全体ATK +10%",
          "t2": "全体ATK +15% · 攻速 +10%",
          "t3": "全体ATK +25% · 攻速 +15%"
        },
        "elf": {
          "name": "エルフ",
          "t1": "CC持続時間 +30%",
          "t2": "CC持続時間 +50% · スキル範囲 +20%",
          "t3": "CC持続時間 +80% · スキル範囲 +30%"
        },
        "undead": {
          "name": "アンデッド",
          "t1": "回復量 +20%",
          "t2": "回復量 +35%",
          "t3": "回復量 +50% · 吸血 10%"
        },
        "tauren": {
          "name": "タウレン",
          "t1": "HP +15%, 防御 +5",
          "t2": "HP +25%, 防御 +12",
          "t3": "HP +40%, 防御 +20"
        },
        "troll": {
          "name": "トロル",
          "t1": "攻速 +15%",
          "t2": "攻速 +25%, 回復量 +10%",
          "t3": "攻速 +35%, 回復量 +20%"
        },
        "pandaren": {
          "name": "パンダレン",
          "t1": "防御 +8, 移動速度 +10%",
          "t2": "防御 +15, 移動速度 +15%",
          "t3": "防御 +25, 移動速度 +20%, HP +10%"
        },
        "beast": {
          "name": "獣族",
          "t1": "ATK +12%",
          "t2": "ATK +20%, 攻速 +15%, 吸血 5%"
        },
        "nightelf": {
          "name": "ナイトエルフ",
          "t1": "移動速度 +15%",
          "t2": "移動速度 +25%, ATK +12%"
        },
        "goblin": {
          "name": "ゴブリン",
          "t1": "攻速 +15%",
          "t2": "攻速 +25%, ATK +10%",
          "t3": "攻速 +35%, ATK +15%"
        },
        "draenei": {
          "name": "ドレナイ",
          "t1": "回復量 +15%",
          "t2": "回復量 +25%, HP +10%",
          "t3": "回復量 +40%, HP +15%, 防御 +8"
        },
        "bloodelf": {
          "name": "ブラッドエルフ",
          "t1": "ATK +12%",
          "t2": "ATK +20%, 吸血 5%",
          "t3": "ATK +30%, 吸血 10%"
        },
        "voidelf": {
          "name": "ヴォイドエルフ",
          "t1": "ATK +10%, 処刑閾値 +5%"
        },
        "lightforged": {
          "name": "ライトフォージド・ドレナイ",
          "t1": "回復量 +15%, ATK +10%"
        },
        "gnome": {
          "name": "ノーム",
          "t1": "ATK +10%",
          "t2": "ATK +15%, 防御 +8",
          "t3": "ATK +20%, 防御 +15, HP +10%"
        },
        "dracthyr": {
          "name": "ドラクティル"
        },
        "maghar": {
          "name": "マグハル・オーク",
          "t1": "ATK +12%, 防御 +5",
          "t2": "ATK +20%, 防御 +10%"
        },
        "nightborne": {
          "name": "ナイトボーン",
          "t1": "魔法ダメージ +15%",
          "t2": "魔法ダメージ +25%, CC持続 +20%"
        },
        "dark_iron": {
          "name": "ダークアイアン・ドワーフ",
          "t1": "防御 +10, HP +10%",
          "t2": "防御 +18, HP +18%"
        },
        "zandalari": {
          "name": "ザンダラリ・トロル",
          "t1": "攻速 +15%, 回復量 +10%",
          "t2": "攻速 +25%, 回復量 +20%"
        },
        "elemental": {
          "name": "精霊",
          "t1": "属性ダメージ +15%",
          "t2": "属性ダメージ +25%, HP +10%"
        },
        "demon": {
          "name": "悪魔",
          "t1": "ATK +15%, 処刑閾値 +5%",
          "t2": "ATK +25%, 処刑閾値 +10%"
        },
        "mechanical": {
          "name": "機械",
          "t1": "攻速 +15%, 防御 +5"
        },
        "vulpera": {
          "name": "ヴァルペラ",
          "t1": "移動速度 +15%, ATK +10%"
        }
      },
      "element": {
        "fire": {
          "name": "火炎",
          "t1": "全体ATK +15%",
          "t2": "全体ATK +25%",
          "t3": "全体ATK +35% · 炎上効果付与"
        },
        "frost": {
          "name": "冷気",
          "t1": "敵スロウ +30%",
          "t2": "敵スロウ +60%",
          "t3": "敵スロウ +100% · 凍結確率 30%"
        },
        "holy": {
          "name": "聖",
          "t1": "回復量 +20%",
          "t2": "回復量 +35%",
          "t3": "回復量 +50% · 最大HP +20%"
        },
        "dark": {
          "name": "暗黒",
          "t1": "処刑確率 +5% (HP 30%以下)",
          "t2": "処刑確率 +10%",
          "t3": "処刑確率 +15% · 吸血 15%"
        },
        "nature": {
          "name": "自然",
          "t1": "回復量 +15%",
          "t2": "回復量 +25%, HP +10%",
          "t3": "回復量 +40%, HP +15%"
        },
        "water": {
          "name": "水",
          "t1": "回復量 +15%, 移動速度 +10%",
          "t2": "回復量 +25%, 移動速度 +15%",
          "t3": "回復量 +35%, 移動速度 +20%, HP +10%"
        },
        "thunder": {
          "name": "雷",
          "t1": "攻速 +20%",
          "t2": "攻速 +35%, ATK +10%",
          "t3": "攻速 +50%, ATK +15%"
        },
        "ice": {
          "name": "氷",
          "t1": "防御 +10, CC持続 +20%",
          "t2": "防御 +20, CC持続 +40%",
          "t3": "防御 +30, CC持続 +60%, HP +10%"
        },
        "wind": {
          "name": "風",
          "t1": "移動速度 +15%, 攻速 +10%",
          "t2": "移動速度 +20%, 攻速 +20%",
          "t3": "移動速度 +25%, 攻速 +30%, ATK +10%"
        },
        "poison": {
          "name": "毒",
          "t1": "処刑閾値 +5%",
          "t2": "処刑閾値 +10%, ATK +10%",
          "t3": "処刑閾値 +15%, ATK +15%, 吸血 5%"
        },
        "flame": {
          "name": "炎",
          "t1": "ATK +18%",
          "t2": "ATK +28%",
          "t3": "ATK +40%"
        },
        "dragon": {
          "name": "ドラゴン ★",
          "t1": "竜の恩寵 — 全体ATK +20%, HP +15% (1人で発動!)"
        },
        "light": {
          "name": "光"
        },
        "arcane": {
          "name": "秘術",
          "t1": "魔法ダメージ +15%",
          "t2": "魔法ダメージ +25%, CC持続 +15%"
        }
      },
      "heroCount": "{count}人"
    },
    "guide": {
      "coreMechanics": "主要メカニクス",
      "strategyTip": "基本戦略",
      "strategyDesc": "タンクが前線を守りDPSが素早く敵を倒しヒーラーが味方を回復しCCとメカニックが状況を制御します。チームの連携が生存の鍵です。",
      "roles": {
        "tank": {
          "title": "タンク (Tank)",
          "desc": "高い防御力と体力で最前線を担当します。モンスターのヘイトを稼ぎ、ダメージを肩代わりして敵を1箇所に集める役割を果たします。"
        },
        "melee_dps": {
          "title": "近接ディーラー (Melee DPS)",
          "desc": "強力な近接攻撃で敵を粉砕します。タンクをサポートしたり、強力な単体攻撃を担当します。"
        },
        "ranged_dps": {
          "title": "遠距離ディーラー (Ranged DPS)",
          "desc": "安全な距離から敵に致命的なダメージを与えます。最高の単体攻撃力を誇ります。"
        },
        "healer": {
          "title": "ヒーラー (Healer)",
          "desc": "味方の体力を回復させ、シールドを付与して生存を助けます。"
        },
        "cc": {
          "title": "クラウドコントロール (CC)",
          "desc": "敵の移動を妨害したり、気絶させて戦闘の流れを制御します。"
        },
        "mechanic": {
          "title": "メカニック (Mechanic)",
          "desc": "壁を修理したり、機械装置を召喚して味方を支援するハイブリッドな役割です。"
        }
      },
      "title": "英雄ガイドブック",
      "subtitle": "役割と主要なゲームメカニクスについて学びましょう。"
    },
    "friends": {
      "title": "フレンド",
      "addFriend": "フレンドを追加",
      "searchPlaceholder": "ユーザー名で検索（2文字以上）...",
      "pendingRequests": "フレンド申請",
      "myFriends": "マイフレンド",
      "noFriends": "フレンドがいません。上で検索してみてください！",
      "add": "追加",
      "accept": "承認",
      "reject": "拒否",
      "remove": "削除",
      "online": "オンライン",
      "offline": "オフライン",
      "failedToSend": "リクエストの送信に失敗しました",
      "failedToAccept": "承認に失敗しました",
      "failedToReject": "拒否に失敗しました",
      "failedToRemove": "削除に失敗しました",
      "requestSent": "{username}さんにフレンド申請を送りました。",
      "removeConfirm": "{username}さんをフレンドリストから削除しますか？",
      "removed": "{username}さんをフレンドリストから削除しました。",
      "requestAccepted": "フレンド申請を承認しました。",
      "requestRejected": "フレンド申請を拒否しました。",
      "message": "メッセージ",
      "chatWith": "{username}さんとチャット",
      "chatPlaceholder": "メッセージを入力...",
      "send": "送信",
      "noMessages": "まだメッセージがありません。会話を始めましょう！",
      "failedToLoad": "メッセージの読み込みに失敗しました。",
      "failedToSend2": "メッセージの送信に失敗しました"
    },
    "profile": {
      "title": "マイプロフィール",
      "username": "ユーザー名",
      "email": "メールアドレス",
      "level": "レベル",
      "experience": "経験値",
      "ownedHeroes": "所有ヒーロー数",
      "crystals": "クリスタル",
      "gold": "ゴールド",
      "status": "ステータス",
      "memberSince": "登録日:",
      "lastLogin": "最終ログイン:",
      "save": "保存",
      "cancel": "キャンセル",
      "edit": "[編集]",
      "profileUpdated": "プロフィールを更新しました！",
      "updateFailed": "更新に失敗しました",
      "failedToLoad": "プロフィールの読み込みに失敗しました",
      "online": "オンライン",
      "offline": "オフライン",
      "usernameLengthError": "ユーザー名は3〜20文字で入力してください",
      "imageOnly": "画像ファイルのみアップロードできます。",
      "avatarUpdated": "アバターが更新されました。",
      "avatarFailed": "アバターのアップロードに失敗しました。",
      "changeAvatar": "クリックしてアバターを変更",
      "changeBtn": "変更",
      "gdprTitle": "個人情報管理 (GDPR)",
      "gdprDesc": "データをエクスポートするか、アカウントを完全に削除できます。",
      "gdprExport": "データをダウンロード (JSON)",
      "gdprDelete": "アカウントを永久削除",
      "gdprExportFailed": "データのエクスポートに失敗しました。",
      "gdprDeleteFailed": "アカウントの削除に失敗しました。",
      "gdprDeleteTitle": "アカウントの永久削除",
      "gdprDeleteDesc": "すべてのデータ（英雄、実績、ゴールド、クリスタル）が永久に削除されます。\nこの操作は取り消せません。",
      "gdprDeleteConfirm": "永久削除を確認",
      "gdprDeleting": "削除中..."
    },
    "tournament": {
      "title": "トーナメント",
      "createTournament": "トーナメントを作成",
      "openTournaments": "参加可能なトーナメント",
      "noOpenTournaments": "参加可能なトーナメントなし",
      "creating": "作成中...",
      "create": "作成",
      "players": "人",
      "waiting": "待機中",
      "inProgress": "進行中",
      "completed": "完了",
      "waitingForPlayers": "プレイヤー待機中",
      "host": "ホスト:",
      "maxPlayers": "最大",
      "join": "参加",
      "leave": "退出",
      "start": "開始",
      "bracket": "トーナメント表",
      "round": "ラウンド",
      "submitResult": "結果を提出",
      "submit": "提出",
      "cancel": "キャンセル",
      "winner": "勝者:",
      "dismiss": "閉じる",
      "yourMatch": "あなたの試合！",
      "playThenSubmit": " then submit your result.",
      "selectOrCreate": "トーナメントを選択または作成してください",
      "failedToLoad": "トーナメントの読み込みに失敗しました",
      "failedToCreate": "トーナメントの作成に失敗しました",
      "failedToJoin": "参加に失敗しました",
      "failedToLeave": "退出に失敗しました",
      "failedToStart": "開始に失敗しました",
      "failedToSubmit": "結果の提出に失敗しました",
      "namePlaceholder": "トーナメント名",
      "score": "スコア",
      "done": "✓ 完了"
    },
    "lobby": {
      "title": "マルチプレイロビー",
      "createLobby": "ロビーを作成",
      "cancelCreate": "キャンセル",
      "createNewLobby": "新しいロビーを作成",
      "lobbyName": "ロビー名",
      "mode": "モード",
      "party": "パーティ（2人）",
      "raid": "レイド（3人）",
      "noLobbies": "参加可能なロビーがありません",
      "noLobbiesDesc": "ロビーを作成してゲームを始めましょう！",
      "players": "人",
      "host": "ホスト",
      "ready": "準備完了",
      "notReady": "準備中",
      "cancelReady": "準備を解除",
      "startGame": "ゲーム開始",
      "leaveLobby": "ロビーを退出",
      "chat": "チャット",
      "typeMessage": "メッセージを入力...",
      "send": "送信",
      "full": "満員",
      "join": "参加",
      "lobbyNamePlaceholder": "マイロビー"
    },
    "game": {
      "title": "Hero Defense",
      "achievementUnlocked": "実績達成！",
      "multiplayer": "マルチプレイ",
      "host": "（ホスト）",
      "guest": "（ゲスト）",
      "players": "プレイヤー:",
      "startGame": "ゲーム開始",
      "resume": "再開",
      "pause": "一時停止",
      "reset": "リセット",
      "playAgain": "もう一度プレイ",
      "difficulty": "難易度",
      "waves": "ウェーブ",
      "easy": "簡単",
      "normal": "普通",
      "hard": "難しい",
      "easyDesc": "モンスターHP/ATK x0.7",
      "normalDesc": "標準難易度",
      "hardDesc": "モンスターHP x1.5, ATK x1.4",
      "activeSynergies": "アクティブシナジー",
      "bossAbilities": "ボススキル",
      "backToMain": "メインメニュー",
      "backToMainHint": "後メインメニューに移動します...",
      "gameClear": "🏆 ゲームクリア！",
      "gameOver": "💀 ゲームオーバー",
      "waveLabel": "ウェーブ",
      "score": "スコア",
      "bossExplosion": "💥 自爆兵爆発！壁に{{damage}}ダメージ！",
      "bossSapperHit": "💥 自爆兵爆発！{{count}}人が現在HP50%減！",
      "bossSlam": "💀 {{name}}の大地震動！全員ノックダウン！",
      "bossEnrage": "{{name}} 激怒！攻撃力+50%！",
      "bossArcaneEnd": "{{name}}の魔力爆発が止まりました。",
      "bossThousandBloom": "{{name}} 千殺万開！全画面ダメージ！",
      "bossGroundSlam": "{{name}} 大地強打！{{count}}人に命中！",
      "bossVoidBlink": "{{name}} 虚空瞬間移動！中央魔力爆発！",
      "bossLegionSummon": "{{name}} 軍団召喚！{{count}}体の{{type}}登場！",
      "bossDefenseDistributed": "{{name}}の強力な攻撃を{{count}}人が分散して防いだ！",
      "bossAttackConcentrated": "{{name}}の攻撃が集中し致命的なダメージ！（現在{{count}}人）",
      "goldSavedTitle": "ゴールド保存完了！",
      "turret": {
        "title": "🔧 メカニック確認！砲塔位置を設定します。",
        "allPlaced": "砲塔配置完了！戦闘開始ボタンを押してください。",
        "placing": "砲塔 {{n}} / {{max}} — 下のフィールドの左エリア（ハイライト）をクリックしてください。",
        "wallLabel": "壁",
        "zone": "砲塔配置可能エリア",
        "clickPrompt": "← 左エリアをクリック",
        "undo": "↩ 元に戻す",
        "placed": "{{n}} / {{max}} 配置済み",
        "start": "戦闘開始 ⚡"
      },
      "goldSavedApplied": "アカウントに反映されました",
      "victory": "勝利",
      "defeat": "敗北",
      "fighting": "戦闘中...",
      "preparing": "準備中...",
      "range": "射程",
      "activeSynergyPreview": "✨ アクティブシナジー",
      "heroSearchPlaceholder": "名前・種族・属性・役割で検索...",
      "hostLeft": "ホストがゲームを離れました。",
      "hostLeftDesc": "{n}秒後にゲームが終了します。",
      "tabDungeonDefense": "🛡 ダンジョン防衛",
      "tabDungeonAttack": "⚔ ダンジョン攻撃",
      "tabRaid": "🐉 レイド",
      "infiniteFloor": "千層ディフェンス",
      "partySetup": "⚔ パーティ編成",
      "partySelectHint": "カードをクリックして選択／解除",
      "partySearchPlaceholder": "名前・種族・属性・役割で検索（例：炎、骸骨、タンク）",
      "dragHint": "✋ ヒーローをドラッグして開始位置を調整してください",
      "wallLabel": "防衛線",
      "autoTurret": "自動砲塔",
      "wall2Label": "第2防衛線",
      "wall3Label": "第3防衛線",
      "showNormalMonsterNames": "通常モンスター名を表示",
      "damage": "ダメージ",
      "healing": "回復量",
      "damageTaken": "被ダメ",
      "shieldLabel": "シールド",
      "exitConfirmTitle": "ゲーム進行中",
      "exitConfirmDescInfinite": "現在{{wave}}ウェーブまで進行しました。\n進捗とゴールド(+{{gold}})を保存して退出しますか？",
      "exitConfirmDescNormal": "今退出すると、このゲームで\n獲得したゴールドをすべて失います。\n本当に退出しますか？",
      "continuePlay": "プレイ継続",
      "saveAndExit": "💾 進捗を保存して退出",
      "justExit": "そのまま退出",
      "exitGame": "退出",
      "exitConfirmDescInfiniteFloor": "現在{{floor}}層進行中。\n進捗とゴールド(+{{gold}})を保存して退出しますか？",
      "exitConfirmDescInfiniteNav": "無限モード進行中。\n進捗とゴールドを保存して退出しますか？",
      "exitConfirmDescTabSwitch": "タブを切り替えると進行中のゲームが終了し\n獲得したゴールドを失います。",
      "switchTab": "タブ切替",
      "exitConfirmNavBlocked": "ゲーム進行中は移動できません",
      "exitConfirmTabBlocked": "ゲーム進行中はタブを切り替えられません",
      "startWave": "開始ウェーブ",
      "fromStart": "最初から",
      "waveUnit": "ウェーブ",
      "bestRecord": "最高記録: {{n}}ウェーブ",
      "heroSelected": "✓ 選択中",
      "moreNeeded": "あと{n}人必要",
      "raidStart": "レイド開始 ({cur}/{max})",
      "startFromWave": "ウェーブ{n}から開始",
      "raidModeTitle": "🐉 レイドモード",
      "raidStageModeShort": "📋 ステージ",
      "raidInfiniteModeShort": "♾ 無限",
      "raidStageInfo": "ステージ{n} — {boss}",
      "raidIronSkinLabel": "[鉄甲の皮膚: 全ダメージ→1]",
      "raidCleaveLabel": "[クリーブ]",
      "raidCcImmuneLabel": "[CC無効]",
      "raidEnrageLabel": "[激怒: 30%]",
      "raidInfiniteSimpleDesc": "レイドボスが順番に登場する無限モードです。ウェーブ数と難易度を以下で設定してください。",
      "raidStageMode": "⚔️ ステージ",
      "raidInfiniteMode": "♾️ 無限モード",
      "raidInfiniteDesc": "♾️ {bold}無限モード{/bold}: 以下でウェーブ数を選択してスタートすると、レイド全スケジュールで進行します。",
      "raidBestWave": "最高記録: {n}ウェーブ",
      "raidSimultaneous": "{n}体同時",
      "raidClearBadge": "✓ クリア済み",
      "raidStageClear": "🏆 ステージ{{n}}クリア！{{boss}}",
      "raidAttackCycle": "周期",
      "raidEscort": "護衛: {name} ×{count}",
      "raidNoEscort": "護衛: なし",
      "raidIronSkinBad": "強打型英雄 — 大ダメージも1に制限",
      "raidIronSkinGood1": "連打型 (遠距離·CC) — 1×N 累積",
      "raidIronSkinGood2": "ヒーラー必須 — {n}sごとに強打回復",
      "raidMyParty": "自分の英雄編成",
      "raidPartyHint": "クリックで選択/解除 · 最大5人",
      "raidPartyCount": "パーティ: 自分{me}人 + AIパーティ5人 = 計{total}人",
      "raidPartyCountRaid": "レイド: 自分{me}人 + AIパーティ15人 = 計{total}人",
      "affixIronSkin": "鉄甲の皮膚",
      "affixCcImmune": "CC無効",
      "affixCleave": "前方クリーブ",
      "affixEnrage": "激怒",
      "affixHealAura": "自己回復",
      "affixSummon": "召喚",
      "affixAoeSlam": "広域強打",
      "bosses": {
        "void_colossus": {
          "name": "虚空の巨人",
          "escort": "虚空の破片"
        },
        "stone_titan": {
          "name": "大地の巨人"
        },
        "bomb_master_jack": {
          "name": "爆発の支配者ジャック",
          "escort": "精鋭自爆兵"
        },
        "sun_priest": {
          "name": "太陽の司祭"
        },
        "moon_warrior": {
          "name": "月の戦士"
        },
        "broodmother_zagg": {
          "name": "軍団指導者ザグ",
          "escort": "影虫"
        },
        "chunsal_magisa": {
          "name": "千殺の魔技士ジェチョン"
        },
        "soul_guide_gardu": {
          "name": "魂の導き手ガルドゥ",
          "escort": "迷える魂"
        },
        "commander_lombardo": {
          "name": "軍団長ロンバルド",
          "escort": "影の暗殺者"
        },
        "molten_overlord": {
          "name": "溶岩の支配者",
          "escort": "炎の精霊"
        },
        "frost_titan": {
          "name": "霜の巨人",
          "escort": "氷の精霊"
        },
        "void_ancient": {
          "name": "虚空の古代者",
          "escort": "虚空の精霊"
        },
        "storm_god": {
          "name": "嵐の神",
          "escort": "雷の精霊"
        },
        "death_harbinger": {
          "name": "死の使者",
          "escort": "骸骨弓兵"
        },
        "plague_giant": {
          "name": "疫病の巨人",
          "escort": "疫病魔法使い"
        },
        "glacial_queen": {
          "name": "氷の女王",
          "escort": "霜の精霊"
        },
        "earth_crusher": {
          "name": "大地の破壊者",
          "escort": "石のゴーレム"
        },
        "thunder_overlord": {
          "name": "雷の暴君",
          "escort": "嵐の精霊"
        },
        "flame_drake": {
          "name": "炎のドラゴン",
          "escort": "溶岩の精霊"
        },
        "abyssal_dragon": {
          "name": "深淵の龍",
          "escort": "虚空の追跡者"
        },
        "void_sovereign": {
          "name": "虚空の支配者",
          "escort": "深淵の恐怖"
        }
      }
    },
    "aiGame": {
      "title": "AI対戦モード",
      "subtitle": "AI最適化パーティに挑戦してください！",
      "tabAiParty": "👥 AIパーティ (10人)",
      "tabAiRaid": "⚔️ AIレイド (20人)",
      "tabMercenary": "🛡️ 傭兵団",
      "tabPvp": "🏆 PvP (準備中)",
      "startBoth": "両方開始",
      "yourScore": "自分のスコア",
      "aiScore": "AIスコア",
      "wave": "ウェーブ",
      "youWin": "あなたの勝ち！",
      "aiWins": "AIの勝ち！",
      "yourParty": "自分のパーティ",
      "aiParty": "AIパーティ",
      "aiStrategy": "AI戦略",
      "upgradeConfirm": "{name}を{star}☆に強化しますか？\\n消費ゴールド: {cost}G",
      "ownedGold": "保有ゴールド",
      "tabDescParty": "10人協力",
      "tabDescRaid": "20人協力",
      "tabDescFactions": "AI育成",
      "tabDescPvp": "AI対戦",
      "mercenaryTitle": "🛡️ AI傭兵団システム",
      "mercenaryDesc": "オフェンスモードでその地域を完全制覇すると傭兵団が解放されます。ゴールドを投資して星ランクを上げると、AI仲間がより強力になります！",
      "factionRace": "種族: {race}",
      "factionUnlockTitle": "解放条件",
      "factionUnlockDesc": "[{region}]の全ノーマルランドをクリア",
      "factionStatMult": "能力値倍率",
      "factionBonusDef": "ボーナス防御",
      "factionUpgrade": "{star}★→{star2}★強化",
      "factionUpgradeLocked": "🔐 エリートクリア後解放",
      "factionMaxed": "✨ 最大強化達成 ✨",
      "ai1000Title": "AI協力1000F完走！",
      "ai1000Subtitle": "戦略の神",
      "ai1000HeroName": "AI勇者",
      "ai1000HeroRace": "機械・雷",
      "ai1000Skills": "全スキル装着可能 + 全職業選択可能",
      "ai1000Buff": "+ パーティ全体の攻撃速度最大30%向上",
      "ai1000Flavor": "AIと共に1000層の波を乗り越えたあなたへ",
      "ai1000Joined": "[AI勇者]が仲間に加わりました！",
      "raid1000Title": "AIレイド無限1000F完走！",
      "raid1000Subtitle": "伝説のレイダー",
      "raid1000HeroName": "レイド勇者",
      "raid1000HeroRace": "エルフ・聖なる",
      "raid1000Buff": "+ ボス/エリートへ最大80%追加ダメージ",
      "raid1000Flavor": "無限レイド1000層を征服したあなたへ",
      "raid1000Joined": "[レイド勇者]が仲間に加わりました！",
      "pvpTitle": "PvP AI対戦",
      "pvpDesc": "AIと同じウェーブで対決してスコアを競う対戦モードです。\\n現在準備中です。",
      "partyScaleParty": "（2人協力規模）",
      "partyScaleRaid": "（4人協力、ボス専用レイド）",
      "infinitePartyLabel": "∞ AIパーティ",
      "infiniteRaidLabel": "∞ AIレイド",
      "infinitePartyWarning": "⚠ AIパーティ無限: 通常無限の2.5倍強い敵が登場します",
      "infiniteRaidWarning": "⚠ AIレイド無限: 壁なしでボスと直接対決。2.5倍強い敵",
      "resumeHint": "({n}ウェーブから再開可能)",
      "companionSelect": "AI仲間選択",
      "companionSelectParty": "AI仲間選択（パーティ{n}）",
      "startPartyBtn": "⚔️ AIパーティ開始",
      "startRaidBtn": "🐉 AIレイド開始",
      "scoreLabel": "スコア",
      "goldLabel": "ゴールド",
      "deathMsg": "💀 {n}ウェーブで挑戦終了",
      "waveN": "{{n}}ウェーブ",
      "saveProgress": "💾 進捗保存",
      "confirm": "確認",
      "factions": {
        "goblin": "ゴブリン交易団",
        "orc": "ホード軍団",
        "tauren": "タウレン部族",
        "elf": "影エルフ",
        "undead": "アンデッドスカージ",
        "troll": "トロール呪術団",
        "human": "人間傭兵団"
      },
      "strategies": {
        "orcBlaze": "オーク炎陣 (HP + ATK シナジー)",
        "humanElite": "人間精鋭 (ATK シナジー)"
      },
      "roleTitle": {
        "tank": "守護兵",
        "healer": "治癒師",
        "other": "勇者"
      }
    },
    "offense": {
      "title": "ダンジョン攻撃",
      "desc": "敵の守備隊を撃破し、壁を破壊せよ！",
      "defenseTab": "🛡 ダンジョン防衛",
      "offenseTab": "⚔ ダンジョン攻撃",
      "startBtn": "攻撃開始！",
      "selectStage": "ステージ選択",
      "normal": "ノーマル",
      "elite": "エリート",
      "eliteDesc": "人数増加 · ステータス強化",
      "partyTitle": "⚔ 攻撃パーティ編成",
      "searchPlaceholder": "名前",
      "enemyWall": "🏰 敵のダンジョン壁",
      "defeat": "全滅...",
      "defeatDesc": "守備隊を突破できませんでした。",
      "stageInfo": "ステージ {id} — {name}",
      "stageClear": "ステージ {id} クリア！",
      "retryHint": "パーティを強化して再挑戦しましょう！",
      "autoReturn": "{n}秒後にメイン画面に戻ります...",
      "landClearMsg": "おめでとうございます！ランドの守備隊を全滅させ、[{name}]を仲間にしました。",
      "rewardTitle": "新しいヒーローが加入",
      "confirm": "確認",
      "tabNormal": "📍 ランド攻略",
      "tabInfinite": "⚔️ 100F攻略",
      "mastered": "完全制覇",
      "sectorReward": "エリア報酬: {gold}G + {crystals}💎",
      "sectorProgress": "進捗: {n} / {total} ランド",
      "unknownRegion": "未探索エリア",
      "infiniteTitle": "⚔️ 無限ダンジョン",
      "milestone": "⭐ マイルストーン",
      "bestFloor": "最高記録: {n}F",
      "bestFloorShort": "最高{n}F",
      "infiniteDesc": "果てしないダンジョンを攻略せよ。フロアをクリアするほど守備隊が強化されます。全滅すると挑戦終了。",
      "startFloor": "開始フロア:",
      "floorSuffix": "F",
      "maxFloorHint": "最大{n}Fから開始可能",
      "autoNextStage": "自動で次ステージへ",
      "infiniteChallenge": "⚔️ {n}F挑戦！",
      "offenseDragHint": "✋ ヒーローをドラッグして開始位置を調整してください — 敵守備隊は右端に配置されています",
      "floorClear": "{n}Fクリア！",
      "infiniteAutoNext": "{n}秒後に{next}Fへ自動進行...",
      "continueNow": "すぐに進む",
      "quit": "やめる",
      "floorGameOver": "{n}Fで挑戦終了",
      "checkpointContinue": "チェックポイントから再開",
      "fromFloor1": "1Fから",
      "nextStage": "⚔️ 次のステージ",
      "nextLand": "🗺️ 次のランドを選択",
      "retry": "再挑戦",
      "toMain": "メイン画面",
      "partySelectHint": "カードクリックで選択/解除",
      "stageOutskirts": "外縁{n}区域",
      "stageInner": "最深部",
      "stageNormalDesc": "{region}の守備隊が陣を張っています。",
      "stageBossDesc": "このランドの頭目が待ち構えています。最後の戦いに備えよ！",
      "hiddenRangedGimmick": "🔮 遠距離隠密ギミック",
      "hiddenRangedDesc": "⚠️ 壁を破壊すると🔮表示の守備隊が現れます。全員倒すと勝利！",
      "eliteLeader": "頭目",
      "eliteSoldier": "精鋭兵",
      "defenderCount": "{n}人守備隊",
      "infiniteFloorName": "{n}F",
      "infiniteMilestoneName": "深層{n}F",
      "infiniteNormalDesc": "{region}の闇の深くに潜む。守備隊が強化されている。",
      "infiniteMilestoneDesc": "{region}の強力な守護者たちが深層ダンジョンを守っている！",
      "offense1000Badge": "ダンジョン攻撃1000F完走！",
      "offense1000Title": "不屈の攻撃者",
      "offense1000HeroDesc": "最強攻撃力保有 + 独断の槍パッシブ",
      "offense1000HeroDescBold": "味方が倒れるほど攻撃力最大30%増加",
      "offense1000JoinMsg": "無限ダンジョン1000Fを完全制覇したあなたに {name} が合流しました！",
      "offense1000Confirm": "確認",
      "sectors": {
        "sector_1": {
          "name": "第1エリア: 野性と名誉の地",
          "description": "荒野を生き抜いた戦士たちの領域です。"
        },
        "sector_2": {
          "name": "第2エリア: 歪んだ魔力の根源",
          "description": "強力で危険な魔法の力が渦巻く場所です。"
        },
        "sector_3": {
          "name": "第3エリア: 死と腐敗の遺産",
          "description": "かつて栄えたが、今は死だけが残る都市群です。"
        },
        "sector_4": {
          "name": "第4エリア: 超越した元素の聖域",
          "description": "必死者の足が届きにくい神秘的な自然の領域です。"
        },
        "sector_5": {
          "name": "第5エリア: 最後の亀裂と位相",
          "description": "世界の果て、最も強力な存在たちが守る最後の関門です。"
        }
      },
      "regions": {
        "goblin": {
          "name": "ゴブリンの領地",
          "desc": "貪欲なゴブリンが潜む森と鉱山。",
          "reward": "LR英雄: ゴブリン・ウォーチーフ"
        },
        "orc": {
          "name": "オークの荒廃した荒野",
          "desc": "過酷な大地を生き抜いたオーク戦士たちの地。",
          "reward": "LR英雄: オーク剣鬼"
        },
        "tauren": {
          "name": "タウレンの赤い峰",
          "desc": "巨大なタウレンが自然を守る険しい山脈。",
          "reward": "LR英雄: 赤いたてがみ族長"
        },
        "darkelf": {
          "name": "ダークエルフの影の森",
          "desc": "隠密と奇襲に長けたダークエルフの暗い領土。",
          "reward": "LR英雄: 影の君主"
        },
        "fire": {
          "name": "炎の地",
          "desc": "煮えたぎる溶岩と炎の精霊が支配する場所。",
          "reward": "LR英雄: 炎の灰"
        },
        "ice": {
          "name": "氷の国",
          "desc": "すべてが凍りついた極寒の地。氷の魔法使いの本拠地。",
          "reward": "LR英雄: 霜の雪片女王"
        },
        "undead": {
          "name": "アンデッドの廃棄された都市",
          "desc": "疫病と死が潜む滅びた古代都市。",
          "reward": "LR英雄: デスナイト"
        },
        "poison": {
          "name": "猛毒の湿地帯",
          "desc": "致命的な毒を持つ怪物がうごめく沼。",
          "reward": "LR英雄: 猛毒術師"
        },
        "mercenary": {
          "name": "混沌の傭兵駐屯地",
          "desc": "無数の種族が集まった最精鋭の無法者の集結地。",
          "reward": "LR英雄: 傭兵王"
        },
        "elemental": {
          "name": "精霊の安息地",
          "desc": "世界の根源をなす四大精霊が集まる聖所。",
          "reward": "LR英雄: 精霊学者"
        },
        "sea": {
          "name": "深海の神殿",
          "desc": "海底深くに眠る古代の守護者たちの神殿。",
          "reward": "LR英雄: 深海の支配者"
        },
        "sky": {
          "name": "天空の要塞",
          "desc": "雲の上を漂う神聖な天使たちの要塞。",
          "reward": "LR英雄: 大天使"
        },
        "demon": {
          "name": "悪魔の亀裂",
          "desc": "次元が裂けて悪魔軍団が溢れ出す亀裂。",
          "reward": "LR英雄: 破滅の悪魔君主"
        },
        "dragon": {
          "name": "竜の塔",
          "desc": "全生命体の頂点、ドラゴンが巣を作る巨大な塔。",
          "reward": "LR英雄: 古代ドラゴン位相"
        }
      }
    },
    "monsterTiers": {
      "초급": "初級",
      "중급": "中級",
      "고급": "上級",
      "최강": "最強"
    },
    "monsterTypes": {
      "normal": "一般",
      "elite": "精鋭",
      "boss": "ボス"
    },
    "monsterBook": {
      "title": "モンスター図鑑",
      "subtitle": "モンスターを倒すと図鑑が解禁されます",
      "discovered": "発見したモンスター",
      "searchPlaceholder": "解禁されたモンスター名を検索...",
      "emptyTitle": "まだ発見したモンスターがいません。",
      "emptyDesc": "ゲームでモンスターを倒して図鑑を解禁しましょう！",
      "unlocked": "解禁",
      "wavePrefix": "ウェーブ",
      "attackType": "タイプ",
      "ranged": "遠距離",
      "melee": "近距離",
      "tacticalTip": "戦術チップ"
    },
    "monsterCategories": {
      "all": "全て",
      "goblin": "ゴブリン",
      "boss": "ボス",
      "beast": "野獣",
      "orc": "オーク/トロール",
      "elemental": "精霊",
      "dark": "暗黒/虚空",
      "giant": "アンデッド巨人",
      "skeleton": "スケルトン/アンデッド",
      "golem": "ゴーレム"
    },
    "heroesPage": {
      "tabHeroes": "⚔️ 英雄設定",
      "tabMonsterBook": "📖 モンスター図鑑",
      "goldLabel": "所持ゴールド:",
      "goldLoading": "読込中...",
      "bulkUpgrade": "⚡ 一括強化",
      "heroList": "英雄一覧",
      "heroCount": "{{n}}名",
      "heroSubtitle": "転職ルート選択 · 固有スキル変異 · スキル組合せ · 主人公は星ランク=スロット数",
      "defaultHeroName": "勇者",
      "searchPlaceholder": "英雄、種族(オーク)...",
      "filterAll": "全て",
      "noHeroFound": "該当なし",
      "recruitHint": "ショップで英雄を採用しましょう！",
      "starLabel": "星",
      "starN": "★{{n}}",
      "slot": "スロット",
      "unique": "固有",
      "passive": "パッシブ",
      "routeLabel": "{{name}} ルート",
      "routeActive": "有効",
      "activateRoute": "ルート有効化",
      "uniqueLabel": "固有: {{name}}",
      "uniquePreview": "有効化時の固有スキル →",
      "otherRoute": "他ルート有効化時:",
      "unsealedTitle": "伝説的統合固有スキル",
      "unsealedSub": "全専門化の固有効果が同時に発動します。",
      "passiveSub": "ルート変更時に自動変形 · 数値は星と連動",
      "maxStar": "★★★★★ 最大星到達！",
      "maxUniquePassive": "固有パッシブ最大値",
      "baseStats": "基本能力値",
      "maxStatBonus": "基本能力値 +25%",
      "starBonusLabel": "星ボーナス",
      "starUpgradeTitle": "星アップグレード",
      "starCostLabels": [
        "1→2★",
        "2→3★",
        "3→4★",
        "4→5★"
      ],
      "upgradeBtn": "強化",
      "goldShort": "ゴールド不足",
      "upgradeEffect": "強化効果:",
      "statBonus": "基本能力値 +{{delta}}%",
      "uniquePassiveUp": "固有パッシブ数値上昇",
      "summonStats": "召喚体ステータス",
      "duration": "持続 {{n}}秒",
      "range": "射程 {{n}}px",
      "sharedBadge": "共有",
      "finalBadge": "最終",
      "summonBadge": "召喚",
      "equippedBadge": "装備中",
      "ownedBadge": "所持",
      "skillSharedIcon": "共",
      "skillUniqueIcon": "専",
      "finalLocked": "⚠ このルートの他の3つのスキルを先に購入してください。",
      "purchased": "✓ 購入済",
      "buyBtn": "購入",
      "unequipBtn": "外す",
      "equipBtn": "装備",
      "equippedSkills": "装備スキル",
      "clickToUnequip": "クリックで外す",
      "emptySlot": "空きスロット",
      "slotsCount": "{{n}} / {{max}} スロット",
      "availableSkills": "使用可能スキル",
      "unlockedCount": "{{n}}個解放済",
      "autoAddHint": "英雄スキル解放時に自動追加",
      "noSkillsYet": "まだスキルが解放されていません。",
      "noSkillsDesc": "英雄画面で他の英雄のスキルを購入すると、ここに自動的に表示されます。",
      "heroesUnlocked": "{{n}}個解放",
      "protagonistBadge": "主人公",
      "allrounderBadge": "オールラウンダー",
      "inGameRole": "ゲーム内ロール",
      "unlockRoleHint": "300Gで解放",
      "lockedRoleHint": "ロール解放にゴールドが必要",
      "containerTitle": "英雄の器",
      "containerDesc": "基本: 星 ({{base}}) + 追加: 英雄所持 ({{bonus}})",
      "containerBody": "他の英雄が解放したスキルが主人公のスロットに自動登録されます。星が上がるほど、また英雄を10人所持するごとにスロットが増加します。",
      "protagonistHelp": "💡 英雄の器 — 星が上がるほどスキルスロットが増加します(1★=1スロット〜5★=5スロット)。他の英雄のスキルを購入すると主人公も使用可能になります。",
      "aiBadge": "AI英雄",
      "aiReward": "AI協力1000層報酬",
      "aiAura": "戦術指揮オーラ",
      "aiAuraDesc": "全能力値 +{{n}}% 向上",
      "roleSelect": "ロール選択",
      "equipSkillTitle": "スキル装備",
      "equipSkillHint": "購入した英雄スキルを装備可能",
      "buySkillHint": "英雄スキルを購入するとここに表示されます。",
      "offenseBadge": "アタック英雄",
      "offenseReward": "ダンジョン攻撃1000層報酬",
      "offenseAura": "独断の槍",
      "offenseAuraDesc": "攻撃力 +{{n}}% 向上",
      "raidBadge": "レイド英雄",
      "raidReward": "AIレイド1000層報酬",
      "raidAura": "ボスハンター",
      "raidAuraDesc": "ボスダメージ +{{n}}% 向上",
      "defenseBadge": "ディフェンス英雄",
      "defenseReward": "無限ダンジョン1000層報酬",
      "traitAbsorb": "特性吸収",
      "traitMaxHint": "現在の星で最大{{n}}個選択可能",
      "traitBuyHint": "他の英雄のスキルを購入すると固有特性が表示されます。",
      "defenseHelp": "💡 特性吸収 — 他の英雄の固有特性を吸収して強力なパッシブを獲得します。",
      "arHeroBanner": "実績英雄",
      "arHeroDesc": "{{race}} 5名編成時にTier5種族シナジーが発動。この英雄がいないとTier5シナジーは発動しません。",
      "unsealBtn": "🔓 封印解除",
      "unsealEffect": "スキルスロット拡張",
      "unsealEffectDual": "全特性パッシブ同時適用 + スキルスロット拡張",
      "unsealCost": "{{n}}Gで解除",
      "unsealDone": "✨ 英雄封印解除 ✨",
      "unsealDoneDesc": "全ルートのパッシブが同時適用され、スキルスロットが拡張されました。",
      "heroHelp": "💡 ルート有効化 → 固有スキルが自動変形します。スキルは両ルートから自由に選択(最大{{max}}個)。🔒 最終スキルは同じルートの残り3つを先に購入。⚡ シナジーは固有スキルとの相互作用です。",
      "toastLoadFail": "データの読込に失敗しました。",
      "toastGoldShort": "ゴールドが不足しています！",
      "toastGoldFail": "ゴールド消費に失敗しました。もう一度お試しください。",
      "toastGoldFailShort": "ゴールド消費に失敗しました。",
      "toastStarUp": "{{name}} ★{{n}}達成！({{cost}}G消費)",
      "toastProtoStarUp": "{{name}} ★{{n}}達成！スロット{{n}}個解放！({{cost}}G消費)",
      "toastSkillBuy": "[{{name}}] 購入完了！({{cost}}G消費)",
      "toastSkillMax": "スキルは最大{{max}}個しか装備できません。",
      "toastSlotShort": "スロット不足！星を上げるか英雄を増やしてください。",
      "toastSlotShort2": "スロットが不足しています。",
      "toastEquipShort": "装備スロットが不足しています。",
      "toastRoleUnlock": "{{role}}ロール解放完了！",
      "toastUnseal": "✨ 英雄封印解除完了！全パッシブ獲得＆スロット拡張！ ✨",
      "toastBulkDone": "一括強化完了！({{cost}}G消費)",
      "toastBulkFail": "強化する内容がないかゴールドが不足しています。",
      "toastTraitMax": "最大{{max}}個まで選択できます。"
    },
    "heroes": {
      "protagonist": {
        "lore": "予言書に記録された伝説の勇者。他の英雄たちの力を吸収して無限に成長する。",
        "name": "勇者",
        "routes": {
          "protagonist_all": {
            "name": "オールラウンダー",
            "variantDesc": "他の英雄が解放したスキルを最大{value}スロットまで装着します。",
            "variantName": "英雄の器"
          }
        }
      },
      "anub": {
        "lore": "地下の君主。",
        "name": "アヌブ",
        "routes": {
          "protection": {
            "name": "防御",
            "variantDesc": "被ダメージの{value}%を反射する。",
            "variantName": "棘の甲羅"
          }
        },
        "skills": {
          "carrion_beetles": {
            "desc": "蟲を召喚して回復する。",
            "name": "死骸虫"
          },
          "impale": {
            "desc": "スタン",
            "name": "串刺し"
          },
          "iron_carapace": {
            "desc": "被ダメージを25%減少させる。",
            "name": "鋼鉄の甲羅"
          },
          "locust_swarm": {
            "desc": "広範囲吸血。",
            "name": "イナゴの大群"
          },
          "underground_assault": {
            "desc": "広範囲に攻撃力×5のダメージとスタンを与える。",
            "name": "地下強襲"
          }
        }
      },
      "ar_gorg": {
        "lore": "伝説のオーク大族長。すべてのオーク部族が彼の名の下に集う。彼の一喝で戦場が震撼する。",
        "name": "ゴーグ・アイアンフィスト",
        "routes": {
          "farseer": {
            "name": "精霊戦士",
            "variantDesc": " {value}% chance to double the amount.",
            "variantName": "大地の精霊"
          },
          "tank": {
            "name": "鋼鉄の盾",
            "variantDesc": "被ダメージを{value}%減少させる。",
            "variantName": "不屈のオーク"
          },
          "warchief": {
            "name": "大族長",
            "variantDesc": " {value}% chance to attack again immediately.",
            "variantName": "大族長の意志"
          }
        },
        "skills": {
          "avatar": {
            "desc": "パッシブ：HP40%以下の時、攻撃力+50%、吸血+20%",
            "name": "アバター"
          },
          "bladestorm": {
            "desc": "周囲130pxのすべての敵に攻撃力×6の回転斬りダメージ。",
            "name": "ブレードストーム"
          },
          "chain_lightning": {
            "desc": "最大3体の敵に攻撃力×4の連鎖ダメージ。",
            "name": "連鎖稲妻"
          },
          "deathwish": {
            "desc": "パッシブ：オークの味方全員に攻撃力+25%のオーラを付与。",
            "name": "デスウィッシュ"
          },
          "demoralizing_shout": {
            "desc": "周囲の敵の攻撃力を30%減少させる。",
            "name": "士気低下の叫び"
          },
          "earthquake": {
            "desc": "すべての敵に4秒間のスロウと攻撃力×3の広範囲ダメージ。",
            "name": "大地震"
          },
          "healing_rain": {
            "desc": "味方全員を攻撃力×4回復。",
            "name": "癒しの雨"
          },
          "intervene": {
            "desc": "味方の代わりにダメージを受ける。",
            "name": "身代わり"
          },
          "last_stand": {
            "desc": "15秒間、最大HPが50%増加。",
            "name": "最後の抵抗"
          },
          "lava_burst": {
            "desc": "単体に攻撃力×8の火炎ダメージ。",
            "name": "溶岩噴火"
          },
          "mortal_strike": {
            "desc": "攻撃力×10の強力な叩きつけダメージ + 20%吸血",
            "name": "巨人の打撃"
          },
          "shield_slam": {
            "desc": "敵をノックバックさせ、2秒間スタンさせる。",
            "name": "シールドスラム"
          },
          "shield_wall": {
            "desc": "10秒間、無敵に近い防御力上昇。",
            "name": "盾の壁"
          },
          "spirit_walk": {
            "desc": "危機の味方にテレポートし、シールドを付与する。",
            "name": "精霊の歩み"
          },
          "war_stomp": {
            "desc": "周囲150pxを2.5秒間スタンさせ、攻撃力×4のダメージを与える。",
            "name": "ウォー・ストンプ"
          }
        }
      },
      "ar_jarlten": {
        "lore": "死後、アンデッドの君主として復活した古代の英雄。味方のアンデッド全軍を指揮する存在であり、彼の存在だけでアンデッド軍団が覚醒する。",
        "name": "ジャルテン",
        "routes": {
          "fearlord": {
            "name": "恐怖の君主",
            "variantDesc": " {value}% chance to cause Fear (immobility) for 2s.",
            "variantName": "恐怖の君主"
          },
          "necromancy": {
            "name": "死霊術",
            "variantDesc": " {value}% chance to absorb the target's soul and strengthen attack power.",
            "variantName": "魂喰らい"
          },
          "overlord": {
            "name": "覇王",
            "variantDesc": " {value}% chance to completely nullify damage.",
            "variantName": "死の意志"
          }
        },
        "skills": {
          "am_shell": {
            "desc": "5秒間、すべての魔法ダメージを無効化。",
            "name": "対魔法シールド"
          },
          "army_of_dead": {
            "desc": "アンデッド軍団を召喚（強化型）。",
            "name": "死者の軍団"
          },
          "banshee_wail": {
            "desc": "周囲180pxの敵を3秒間スタンさせる。",
            "name": "バンシーの咆哮"
          },
          "corpse_nova": {
            "desc": "ターゲット周囲120pxに攻撃力×5の爆発ダメージ。",
            "name": "死体爆発"
          },
          "corruption": {
            "desc": "10秒間、敵に持続的な暗黒ダメージ。",
            "name": "腐敗"
          },
          "death_and_decay": {
            "desc": "指定した位置に陣を敷き、広範囲の持続ダメージを与える。",
            "name": "死と腐敗"
          },
          "death_coil": {
            "desc": "単体に攻撃力×6の暗黒ダメージ + 50%吸血。",
            "name": "死のコイル"
          },
          "deathmark": {
            "desc": "10秒間、すべての敵の被ダメージが20%増加。",
            "name": "死の刻印"
          },
          "raise_dead": {
            "desc": "倒れた味方1人をHP50%で即座に復活させる。",
            "name": "死者蘇生"
          },
          "raise_skeleton": {
            "desc": "スケルトン戦士を2体召喚。",
            "name": "スケルトン召喚"
          },
          "shadow_bolt": {
            "desc": "単体に攻撃力×4の暗黒ダメージ。",
            "name": "シャドウボルト"
          },
          "sleep": {
            "desc": "敵1体を8秒間眠らせる。",
            "name": "スリープ"
          },
          "soulfire": {
            "desc": "敵の魂を焼き尽くし、強力な暗黒ダメージを与える。",
            "name": "ソウルファイア"
          },
          "spectral_summon": {
            "desc": " ATK×0.8",
            "name": "亡霊召喚"
          },
          "undead_aura": {
            "desc": "パッシブ：自身の攻撃力+25%、HP+20%を永続的に増加。",
            "name": "君主のオーラ"
          }
        },
        "summons": {
          "army": {
            "name": "アンデッド軍団"
          },
          "skeleton": {
            "name": "スケルトン戦士"
          },
          "spectral": {
            "name": "恐怖の亡霊"
          }
        }
      },
      "ar_kargath": {
        "lore": "砕かれた手部族の伝説的な指導者。自らの手を切り落とし、刃を取り付けて戦場を血で染める。",
        "name": "カルガス",
        "routes": {
          "berserk": {
            "name": "狂戦士",
            "variantDesc": " {value}% chance to deal splash damage to nearby enemies.",
            "variantName": "容赦なき力"
          },
          "blade": {
            "name": "刃の手",
            "variantDesc": " {value}% chance to inflict a mortal wound (0 DEF) on the enemy.",
            "variantName": "砕かれた手の刃"
          }
        },
        "skills": {
          "avatar": {
            "desc": " Invincible.",
            "name": "闘神"
          },
          "blade_sweep": {
            "desc": "前方扇形範囲のすべての敵に攻撃力 x 5のダメージ。",
            "name": "刃の薙ぎ払い"
          },
          "bloodthirst": {
            "desc": "敵を倒すたびに攻撃力 10%増加（無限累積）。",
            "name": "血の渇望"
          },
          "furious_attack": {
            "desc": "10秒間、攻撃速度 200%増加。",
            "name": "猛烈な攻撃"
          },
          "impale": {
            "desc": "単体に攻撃力 x 8のダメージと3秒間のスタン。",
            "name": "串刺し"
          },
          "massacre": {
            "desc": "戦場全体の敵に攻撃力 x 15のダメージ、HP30%以下の敵を即死。",
            "name": "大虐殺"
          },
          "mortal_strike": {
            "desc": "対象の敵の防御力を永久に50%減少させ、攻撃力 x 12のダメージを与える。",
            "name": "巨人の打撃"
          },
          "recklessness": {
            "desc": " Damage dealt Increase 100% Increase.",
            "name": "無謀な犠牲"
          },
          "slam": {
            "desc": "単体に攻撃力 x 10の強力な一撃。",
            "name": "叩きつけ"
          },
          "whirlwind": {
            "desc": "周囲のすべての敵に毎秒攻撃力 x 3のダメージ（5秒間持続）。",
            "name": "斬撃旋風"
          }
        }
      },
      "ar_lian": {
        "lore": "太陽の泉の力を血の気に変換した最初のブラッドナイト。味方のために自らの血を燃やし、前線を死守する。",
        "name": "リアン",
        "routes": {
          "blood": {
            "name": "血気",
            "variantDesc": " {value}% chance to immediately restore 10% of lost health.",
            "variantName": "赤い渇き"
          },
          "retri": {
            "name": "懲罰",
            "variantDesc": " {value}% chance to deal ATK x 4 bonus Holy damage.",
            "variantName": "聖なる復讐"
          }
        },
        "skills": {
          "avenging_wrath": {
            "desc": "20秒間無敵 + すべての攻撃が広域神聖爆発に変更。",
            "name": "御身の怒り"
          },
          "blade_justice": {
            "desc": "敵3体に攻撃力 x 5の神聖なる刃。",
            "name": "審判の刃"
          },
          "blood_boil": {
            "desc": "周囲のすべての敵に攻撃力 x 4のダメージと5秒間の出血。",
            "name": "ブラッドボイル"
          },
          "blood_strike": {
            "desc": "単体に攻撃力 x 5のダメージと20%吸血。",
            "name": "ブラッドストライク"
          },
          "crusader_strike": {
            "desc": "単体に攻撃力 x 6の神聖ダメージ。",
            "name": "聖戦士の力"
          },
          "dancing_weapon": {
            "desc": "ルーン武器を召喚：味方全体の防御力 50%増加させ、5秒間無敵にする。",
            "name": "踊るルーン武器"
          },
          "death_bond": {
            "desc": "味方1人と結束し、ダメージを50%分担する。",
            "name": "死の結束"
          },
          "divine_storm": {
            "desc": "周囲に攻撃力 x 5の広域ダメージを与え、味方を回復。",
            "name": "ディヴァインストーム"
          },
          "fanaticism": {
            "desc": "15秒間、攻撃力 50%増加し、すべての攻撃速度 2倍になる。",
            "name": "狂信"
          },
          "rune_tap": {
            "desc": "最大HP 20%のシールドを生成し、防御力 +40増加させる。",
            "name": "ルーン転換"
          }
        }
      },
      "ar_maharuuk": {
        "lore": "大地母神の直系後継者。タウレン部族の大地魔法で防衛線を強化し、味方を癒やす。",
        "name": "マハルーク",
        "routes": {
          "earthguard": {
            "name": "大地守護者",
            "variantDesc": " {value}% chance to give nearby allies +20 Defense (5s).",
            "variantName": "大地の盾"
          },
          "stormcaller": {
            "name": "嵐の呪術師",
            "variantDesc": " grants an additional Shield equal to {value}% of the amount.",
            "variantName": "精霊の教え"
          },
          "sunwalker": {
            "name": "サンウォーカー",
            "variantDesc": " {value}% chance to deal Fire damage around the target.",
            "variantName": "太陽の輝き"
          }
        },
        "skills": {
          "ancestral_spirit": {
            "desc": "倒れた味方1人をHP50%で復活させる。",
            "name": "祖先の精霊"
          },
          "avatar_earth": {
            "desc": "15秒間、被ダメージ 40%減少 + 周囲にダメージ反射。",
            "name": "大地化身"
          },
          "avenging_wrath": {
            "desc": "20秒間、攻撃力 50%増加し、すべての攻撃が広域化。",
            "name": "御身の怒り"
          },
          "bloodlust": {
            "desc": "15秒間、味方全体の攻撃速度 +60%。",
            "name": "英雄の心"
          },
          "chain_heal": {
            "desc": "HPが最も低い味方を攻撃力 x 5回復 + 連鎖回復 攻撃力 x 2。",
            "name": "連鎖癒し"
          },
          "crusader_strike": {
            "desc": "単体に攻撃力 x 4の神聖ダメージ。",
            "name": "聖戦士の力"
          },
          "earth_stomp": {
            "desc": "前方130pxを2秒間スタン + 攻撃力 x 4のダメージ。",
            "name": "大地踏み"
          },
          "healing_rain": {
            "desc": "味方全体を攻撃力 x 3の広域回復。",
            "name": "癒しの雨"
          },
          "holy_light": {
            "desc": "自身の周囲の味方を攻撃力 x 3回復。",
            "name": "聖なる光"
          },
          "judgment": {
            "desc": "対象に攻撃力 x 5のダメージを与え、被ダメージを増加させる。",
            "name": "審判"
          },
          "living_seed": {
            "desc": "パッシブ：被弾時、自身のHPを8%即座に回復。",
            "name": "生ける種"
          },
          "riptide": {
            "desc": "対象に即時回復 + 持続回復を付与。",
            "name": "怒濤"
          },
          "stone_bulwark": {
            "desc": "味方全体の防御力 +30、HP10%回復。",
            "name": "石の砦"
          },
          "thorns": {
            "desc": "味方全体にダメージ反射 20%を付与。",
            "name": "茨の冠"
          },
          "wrath": {
            "desc": "前方すべての敵に強力な光の一撃。",
            "name": "天罰"
          }
        }
      },
      "ar_valanos": {
        "lore": "太陽の泉が堕落する前の力を覚えている最後のブラッドメイジ。魔力吸収で味方を強化し、敵を消滅させる。",
        "name": "バラノス",
        "routes": {
          "bloodmage": {
            "name": "血の魔導師",
            "variantDesc": " {value}% chance to deal ATK x 3 bonus Arcane damage.",
            "variantName": "魔力共鳴"
          },
          "destro": {
            "name": "破壊",
            "variantDesc": " {value}% chance to cause the target to explode.",
            "variantName": "発火"
          },
          "manavampire": {
            "name": "マナヴァンパイア",
            "variantDesc": " {value}% chance to silence the target for 2s.",
            "variantName": "血の渇望"
          }
        },
        "skills": {
          "arcane_nova": {
            "desc": "すべての敵に攻撃力 x 5の秘術爆発。",
            "name": "秘術の大爆発"
          },
          "arcane_torrent": {
            "desc": "すべての敵を3秒間沈黙 + 攻撃力 x 3のダメージ。",
            "name": "秘術の急流"
          },
          "blood_tap": {
            "desc": " HP -15%.",
            "name": "ブラッドタップ"
          },
          "chaos_bolt": {
            "desc": "防御無視の強力な一撃 攻撃力 x 15。",
            "name": "カオスボルト"
          },
          "conflagrate": {
            "desc": "生け贄の対象を爆発させ、攻撃力 x 6のダメージを与える。",
            "name": "発火爆発"
          },
          "flame_pillar": {
            "desc": "指定位置に巨大な火柱を生成 攻撃力 x 8。",
            "name": "火柱"
          },
          "flame_strike": {
            "desc": "ターゲット周囲100pxに攻撃力 x 6の火炎爆発。",
            "name": "火炎強打"
          },
          "immolate": {
            "desc": "対象に15秒間持続的な火炎ダメージ。",
            "name": "イモレート"
          },
          "incinerate": {
            "desc": "火炎の矢を発射 攻撃力 x 3.5。",
            "name": "焼却"
          },
          "mana_burn": {
            "desc": "単体に攻撃力 x 5の秘術ダメージ + 50%吸血。",
            "name": "マナバーン"
          },
          "phoenix": {
            "desc": " Ranged",
            "name": "不死鳥召喚"
          },
          "polymorph": {
            "desc": "敵1体を8秒間羊に変異させる。",
            "name": "ポリモーフ"
          },
          "rain_of_fire": {
            "desc": "指定位置に火の雨を降らせる。",
            "name": "火の雨"
          },
          "sunwell_surge": {
            "desc": "すべての敵に攻撃力 x 8のダメージ + 味方全体を攻撃力 x 3回復。",
            "name": "太陽の泉の噴出"
          },
          "void_bolt": {
            "desc": "単体に攻撃力 x 4のダメージ + 2秒間攻撃速度 -50%。",
            "name": "ヴォイドボルト"
          }
        },
        "summons": {
          "phoenix": {
            "name": "不死鳥"
          }
        }
      },
      "arthur": {
        "lore": "王室近衛隊の盾戦士。",
        "name": "アーサー",
        "routes": {
          "protection": {
            "name": "防御",
            "variantDesc": "受ける物理ダメージを{value}%減少させる。",
            "variantName": "盾ガード"
          }
        },
        "skills": {
          "knights_oath": {
            "desc": "周囲の味方の防御力 +15。",
            "name": "騎士の誓い"
          },
          "last_stand": {
            "desc": "自身に大型シールド + 周囲の味方に小型シールド。",
            "name": "最後の抵抗"
          },
          "shield_slam": {
            "desc": "シールドスラム。",
            "name": "シールドスラム"
          },
          "shield_wall": {
            "desc": "味方全体にシールド + 自身強化。",
            "name": "シールドウォール"
          }
        }
      },
      "baine": {
        "lore": "大地母神の加護を受ける戦士。",
        "name": "ベイン",
        "routes": {
          "arms": {
            "name": "武器",
            "variantDesc": "攻撃力 {value}%増加。",
            "variantName": "大地の力"
          }
        },
        "skills": {
          "avatar": {
            "desc": "巨大化バフ。",
            "name": "闘神"
          },
          "slam": {
            "desc": "強力な強打。",
            "name": "叩きつけ"
          },
          "war_stomp": {
            "desc": "広域スタン。",
            "name": "ウォー・ストンプ"
          }
        }
      },
      "benedict": {
        "lore": "誠実な信仰を持つ人間の司祭。",
        "name": "ベネディクト",
        "routes": {
          "holy": {
            "name": "神聖",
            "variantDesc": "回復量 {value}%増加。",
            "variantName": "神聖なる癒し"
          }
        },
        "skills": {
          "guardian_spirit": {
            "desc": "味方に10秒間の持続回復 + 回復増幅。",
            "name": "守護精霊"
          },
          "heal": {
            "desc": "単体回復。",
            "name": "ヒール"
          },
          "holy_word_serenity": {
            "desc": "大量回復。",
            "name": "聖なる言葉：平穏"
          },
          "renew": {
            "desc": "単体持続回復。",
            "name": "ソ生"
          }
        }
      },
      "chen": {
        "lore": "伝説的な醸造師。",
        "name": "チェン",
        "routes": {
          "brewmaster": {
            "name": "醸造",
            "variantDesc": "回避率 {value}%増加。",
            "variantName": "巧妙な闘士"
          }
        },
        "skills": {
          "beer_waterfall": {
            "desc": "周囲の敵の移動速度を40%減少させる。",
            "name": "ビールの滝"
          },
          "breath_of_fire": {
            "desc": "火炎ダメージ。",
            "name": "火の息"
          },
          "invoke_niuzao": {
            "desc": "味方全体にシールド + 自身の被ダメージ減少。",
            "name": "牛王召喚"
          },
          "stagger": {
            "desc": "受けるダメージの50%を10秒間かけて分散させる。",
            "name": "時間差"
          },
          "storm_earth_fire": {
            "desc": "3方向への同時爆発 攻撃力 x 4。",
            "name": " Earth"
          }
        }
      },
      "cheondung_garam": {
        "lore": "黄金都市の高位呪術師。嵐を呼ぶ。",
        "name": "チョンドゥン・ガラム",
        "routes": {
          "elemental": {
            "name": "元素",
            "variantDesc": "雷スキルが{value}%の確率で2回発動する。",
            "variantName": "雷過負荷"
          },
          "restoration": {
            "name": "復元",
            "variantDesc": " {value}% chance to Heal nearby allies for a small amount.",
            "variantName": "潮流の逆流"
          }
        },
        "skills": {
          "chain_heal": {
            "desc": "連鎖回復",
            "name": "連鎖癒し"
          },
          "earth_elemental": {
            "desc": "タンク精霊を召喚。",
            "name": "大地の精霊"
          },
          "earth_shield": {
            "desc": "被弾時に回復するバフ。",
            "name": "大地の盾"
          },
          "earthquake": {
            "desc": "広域スロウ+ダメージ。",
            "name": "地震"
          },
          "healing_wave": {
            "desc": "強力な単体回復。",
            "name": "癒しの波動"
          },
          "lightning_bolt": {
            "desc": "連鎖雷攻撃。",
            "name": "雷の矢"
          },
          "lightning_storm": {
            "desc": "全体広域爆撃。",
            "name": "雷雨"
          },
          "thunderstorm": {
            "desc": "扇形広域攻撃。",
            "name": "雷鳴の嵐"
          }
        },
        "summons": {
          "earth_elemental": {
            "name": "大地の精霊"
          }
        }
      },
      "crow": {
        "lore": "影の中の狼暗殺者。",
        "name": "クロウ",
        "routes": {
          "combat": {
            "name": "戦闘",
            "variantDesc": "気力回復 {value}%増加。",
            "variantName": "アドレナリン"
          }
        },
        "skills": {
          "eviscerate": {
            "desc": "とどめの一撃。",
            "name": "切開"
          },
          "killing_spree": {
            "desc": "連続攻撃。",
            "name": "殺戮の喜び"
          },
          "sinister_strike": {
            "desc": "コンボポイント生成。",
            "name": "邪悪な一撃"
          }
        }
      },
      "daulgard": {
        "lore": "堕落したが名誉を取り戻したオークのデスナイト。黒衣の騎士団の力を借りてアンデッド軍団を操るか、冷気と血の魔力を扱う。",
        "name": "ダウルガード",
        "routes": {
          "blood": {
            "name": "血気",
            "variantDesc": "与えたダメージの {value}%分、自身のHPを吸収する。",
            "variantName": "血の結束"
          },
          "frost": {
            "name": "冷気",
            "variantDesc": "冷気攻撃時、{value}%の確率で対象を2秒間氷結させる。",
            "variantName": "冷気の加護"
          },
          "unholy": {
            "name": "不浄",
            "variantDesc": "召喚獣の能力値が {value}%増加。",
            "variantName": "アンデッド軍団"
          }
        },
        "skills": {
          "army": {
            "desc": "25秒ごとに9体の軍団グールを即座に召喚する。",
            "name": "死者の軍団"
          },
          "blood_boil": {
            "desc": "8秒ごとに周囲のすべての敵に攻撃力 x 3のダメージを与え、与えたダメージ分自己回復。",
            "name": "ブラッドボイル"
          },
          "dancing_weapon": {
            "desc": "30秒ごとに自身のコピーであるルーン武器を召喚し、共に攻撃する（20秒間）。",
            "name": "踊るルーン武器"
          },
          "death_coil": {
            "desc": "8秒ごとに単体に攻撃力 x 8の強力なダメージ。",
            "name": "死のコイル"
          },
          "death_strike": {
            "desc": "攻撃時、{value}%の確率で攻撃力 x 4の強力な吸血攻撃。",
            "name": "デスストライク"
          },
          "disease": {
            "desc": "4秒ごとに戦場のすべての敵に攻撃力 x 1.0の持続ダメージ（10秒間）。",
            "name": "疾病"
          },
          "frost_chains": {
            "desc": "6秒ごとに単体に攻撃力 x 3のダメージと5秒間のスロウ。",
            "name": "氷の鎖"
          },
          "frost_strike": {
            "desc": "攻撃時、{value}%の確率で攻撃力 x 2の追加冷気ダメージ。",
            "name": "フロストストライク"
          },
          "ghoul": {
            "desc": "近接グール1体とスケルトン弓兵1体を召喚する。",
            "name": "グール召喚"
          },
          "howling_blast": {
            "desc": "10秒ごとにターゲット周囲150pxの敵に攻撃力 x 4の広域ダメージとスロウ。",
            "name": "ハウリングブラスト"
          },
          "remorseless_winter": {
            "desc": "20秒ごとに10秒間、周囲のすべての敵に毎秒攻撃力 x 1.5のダメージと50%のスロウ。",
            "name": "絶滅の冬"
          },
          "vampiric_blood": {
            "desc": "15秒ごとに10秒間、最大HPが 30%増加し、受ける回復量が 50%増加する。",
            "name": "吸血鬼の血"
          }
        },
        "summons": {
          "army": {
            "name": "軍団グール"
          },
          "ghoul": {
            "name": "グール"
          },
          "rune_weapon": {
            "name": "ルーン武器"
          }
        }
      },
      "dizgarldo": {
        "lore": "忘れられた影の教団の司祭。光と闇を行き来しながら味方を癒やす。",
        "name": "ディズガルド",
        "routes": {
          "discipline": {
            "name": "修養",
            "variantDesc": " if HP is below 30%",
            "variantName": "神聖なる防護"
          },
          "holy": {
            "name": "神聖",
            "variantDesc": " {value}% chance to spread a small heal to all allies.",
            "variantName": "神聖なる慈悲"
          },
          "shadow": {
            "name": "暗黒",
            "variantDesc": " {value}% chance to heal the lowest HP ally for 50% of damage dealt.",
            "variantName": "闇の渇望"
          }
        },
        "skills": {
          "blood_ritual": {
            "desc": "20秒ごとに自身のHP 30%を消耗 → 味方全体を攻撃力 x 3回復。",
            "name": "血の儀式"
          },
          "dark_feast": {
            "desc": "6秒ごとに自身の最大HPの10%を回復。",
            "name": "暗黒捕食"
          },
          "demon_summon": {
            "desc": "魔鬼を召喚（20秒、攻撃時にダメージの50%分、最もHPの低い味方を回復）。",
            "name": "魔鬼召喚"
          },
          "divine_hymn": {
            "desc": "15秒ごとに味方全体を攻撃力 x 5の強力回復 + シールド。",
            "name": "神聖なる賛歌"
          },
          "divine_intervention": {
            "desc": "30秒ごとに味方全体を攻撃力 x 4回復 + シールド。",
            "name": "聖なる介入"
          },
          "holy_beacon": {
            "desc": "光の標を召喚（25秒、2秒ごとに最もHPの低い味方を回復）。",
            "name": "光の標"
          },
          "holy_light": {
            "desc": "8秒ごとに最もHPの低い味方を完全回復（攻撃力 x 8）。",
            "name": "聖なる光"
          },
          "holy_shield": {
            "desc": "12秒ごとに最もHPの低い味方にシールド（最大HP 20%）。",
            "name": "神聖なる保護膜"
          },
          "life_drain": {
            "desc": "パッシブ：攻撃時にダメージの50%分、自己回復。",
            "name": "生命吸収"
          },
          "light_wave": {
            "desc": "8秒ごとに味方全体を攻撃力 x 1.5回復。",
            "name": "光の波動"
          },
          "prayer_healing": {
            "desc": "10秒ごとに味方全体を攻撃力 x 2回復。",
            "name": "癒しの祈り"
          },
          "resurrection": {
            "desc": "45秒ごとに倒れた味方1人をHP 30%で復活させる。",
            "name": "復活"
          }
        },
        "summons": {
          "demon": {
            "name": "魔鬼"
          },
          "holy_beacon": {
            "name": "光の標"
          }
        }
      },
      "durga": {
        "lore": "百発百中のオークハンター。",
        "name": "ドゥルガ",
        "routes": {
          "marksmanship": {
            "name": "射撃",
            "variantDesc": "射程が {value}増加。",
            "variantName": "鷹の目"
          }
        },
        "skills": {
          "aimed_shot": {
            "desc": "強力な一撃。",
            "name": "狙い撃ち"
          },
          "arcane_shot": {
            "desc": "基本射撃。",
            "name": "秘術の射撃"
          },
          "concussive_shot": {
            "desc": "敵にダメージを与え、移動速度を50%減少させる。",
            "name": "衝撃砲"
          }
        }
      },
      "feldah": {
        "lore": "強力な黒魔道士。死を超越した肉体で悪魔軍団を操る。",
        "name": "フェルダ",
        "routes": {
          "afflict": {
            "name": "苦悩",
            "variantDesc": "攻撃を受けた敵の移動速度を {value}%減少させる。",
            "variantName": "呪われた魂"
          },
          "demon": {
            "name": "悪魔",
            "variantDesc": "召喚獣の能力値が {value}%増加。",
            "variantName": "悪魔の君主"
          },
          "destro": {
            "name": "破壊",
            "variantDesc": "クリティカル発生時、クールタイムを {value}%短縮。",
            "variantName": "混沌の火"
          }
        },
        "skills": {
          "agony": {
            "desc": "漸増する持続ダメージ。",
            "name": "苦悶の呪い"
          },
          "chaos_bolt": {
            "desc": "防御無視の強力な一撃。",
            "name": "カオスボルト"
          },
          "corruption": {
            "desc": "全体の持続ダメージ。",
            "name": "広域腐敗"
          },
          "crit_triple": {
            "desc": "クリティカルダメージ 3倍。",
            "name": "破滅の一撃"
          },
          "curse_fatigue": {
            "desc": "全体の移動速度減少。",
            "name": "広域疲労"
          },
          "double_bolt": {
            "desc": "2発発射。",
            "name": "双子ボルト"
          },
          "drain_soul": {
            "desc": "HP 35%未満の一般モンスターを即死させる。",
            "name": "魂吸収"
          },
          "felguard": {
            "desc": "強力なタンク悪魔を召喚。",
            "name": "フェルガード"
          },
          "felhunter": {
            "desc": "近接悪魔を召喚。",
            "name": "フェルハンター"
          },
          "healthstone": {
            "desc": "危機時に味方を回復。",
            "name": "生命石"
          },
          "imp": {
            "desc": "遠距離インプを召喚。",
            "name": "インプ召喚"
          },
          "sacrifice": {
            "desc": "全体の持続ダメージ。",
            "name": "生け贄"
          }
        },
        "summons": {
          "felguard": {
            "name": "フェルガード"
          },
          "felhunter": {
            "name": "フェルハンター"
          },
          "imp": {
            "name": "インプ"
          }
        }
      },
      "gardu": {
        "lore": "巨大な斧を振るうオーク戦士。",
        "name": "ガルドゥ",
        "routes": {
          "arms": {
            "name": "武器",
            "variantDesc": "クリティカル率が {value}%増加。",
            "variantName": "致命的一撃"
          }
        },
        "skills": {
          "bladestorm": {
            "desc": "広域旋回斬り。",
            "name": "ブレードストーム"
          },
          "mortal_strike": {
            "desc": "敵にダメージを与え、回復効果を50%減少させる。",
            "name": "必殺の一撃"
          }
        }
      },
      "gazro": {
        "lore": "ゴブリン工学者。星が上がるにつれて、彼の機械は休むことなく発射される。",
        "name": "ガズロ",
        "routes": {
          "marksmanship": {
            "name": "射撃",
            "variantDesc": "クールタイムが {value}%短縮。",
            "variantName": "ゴブリン工学"
          }
        },
        "skills": {
          "deth_lazor": {
            "desc": "チャージレーザー。",
            "name": "デスレイザー"
          },
          "grav_o_bomb": {
            "desc": "ブラックホール爆弾。",
            "name": "重力爆弾"
          },
          "rock_it_turret": {
            "desc": "タレット設置。",
            "name": "ロック・イット・タレット"
          },
          "xplodium_charge": {
            "desc": "スタン爆弾。",
            "name": "爆弾投下"
          }
        },
        "summons": {
          "turret": {
            "name": "ロック・イット・タレット"
          }
        }
      },
      "gray": {
        "lore": "ギルニアスの人狼戦士。",
        "name": "グレイ",
        "routes": {
          "fury": {
            "name": "憤怒",
            "variantDesc": "攻撃時に {value}%回復する。",
            "variantName": "血の渇望"
          }
        },
        "skills": {
          "bloodthirst": {
            "desc": "ダメージ+回復。",
            "name": "血の渇望"
          },
          "rampage": {
            "desc": "4連撃。",
            "name": "狂乱"
          },
          "recklessness": {
            "desc": "クリティカル 100%。",
            "name": "無謀な犠牲"
          }
        }
      },
      "grelcal": {
        "lore": "ドラエナーの野性を秘めたマグハール戦士。無慈悲な力で敵を粉砕する。",
        "name": "グレカル",
        "routes": {
          "defense": {
            "name": "防御",
            "variantDesc": " {value}% chance to nullify 50% of damage.",
            "variantName": "戦士の意志"
          },
          "weapon": {
            "name": "武器",
            "variantDesc": "3打ごとに {value}%の追加ダメージ。",
            "variantName": "戦士の攻勢"
          }
        },
        "skills": {
          "iron_wall": {
            "desc": "被ダメージを15%減少させる。",
            "name": "鉄壁"
          },
          "lacerate": {
            "desc": "自身の防御力が25%減少するが、攻撃力が50%増加する。",
            "name": "裂傷"
          },
          "rend": {
            "desc": "15秒間の出血、致命傷なら即死。",
            "name": "引き裂き"
          },
          "shield_bash": {
            "desc": "防御力の50%分の追加攻撃力。",
            "name": "シールドバッシュ"
          },
          "shockwave": {
            "desc": "周囲の敵を1.5秒間スタンさせる。",
            "name": "衝撃波"
          },
          "weapon_mastery": {
            "desc": " Attack Speed +10%.",
            "name": "武器熟練"
          }
        }
      },
      "hamul": {
        "lore": "自然の調和を重視するドルイド。",
        "name": "ハミュウル",
        "routes": {
          "restoration": {
            "name": "回復",
            "variantDesc": "持続回復効果が {value}%増加。",
            "variantName": "生命の樹"
          }
        },
        "skills": {
          "incarnation": {
            "desc": "回復強化の変身。",
            "name": "化身：生命の樹"
          },
          "regrowth": {
            "desc": "即時回復 + 持続回復。",
            "name": "再生"
          },
          "tranquility": {
            "desc": "広域持続回復。",
            "name": "平穏"
          },
          "wild_growth": {
            "desc": "味方全体の持続回復。",
            "name": "野生の成長"
          }
        }
      },
      "heln_dinohouf": {
        "lore": "月と太陽の力を操るタウレンのドルイド。",
        "name": "ヘルン・ダイノフーフ",
        "routes": {
          "balance": {
            "name": "調和",
            "variantDesc": " {value}% chance for an AoE explosion.",
            "variantName": "月の楔"
          },
          "restoration": {
            "name": "回復",
            "variantDesc": "持続回復効果を {value}%強化。",
            "variantName": "自然の雨期"
          }
        },
        "skills": {
          "ironbark": {
            "desc": " 8s) to the heal target.",
            "name": "アイアンバーク"
          },
          "moonfire": {
            "desc": "広域持続ダメージ。",
            "name": "月火"
          },
          "natures_swiftness": {
            "desc": "周期的な全体回復。",
            "name": "自然の意志"
          },
          "rejuvenation": {
            "desc": "単体持続回復。",
            "name": "回春"
          },
          "starfall": {
            "desc": "全体広域爆撃。",
            "name": "星の雨"
          },
          "starsurge": {
            "desc": "単体強打。",
            "name": "星の急流"
          },
          "wild_growth": {
            "desc": "広域持続回復。",
            "name": "野生の成長"
          }
        }
      },
      "howl": {
        "lore": "野獣の本性を受け入れたドルイド。",
        "name": "ハウル",
        "routes": {
          "feral": {
            "name": "野性",
            "variantDesc": " {value}% chance to immediately Reset Cooldowns.",
            "variantName": "明晰の予兆"
          }
        },
        "skills": {
          "berserk": {
            "desc": "クールタイム短縮 + 攻撃速度増加。",
            "name": "狂暴化"
          },
          "rip": {
            "desc": "出血持続ダメージ。",
            "name": "引き裂き"
          },
          "shred": {
            "desc": "コンボポイント生成。",
            "name": "シュレッド"
          }
        }
      },
      "ireneerpiria": {
        "lore": "スラマールから来た秘術師。古代の魔力で敵を制圧する。",
        "name": "イレネエスピリア",
        "routes": {
          "arcane": {
            "name": "秘術",
            "variantDesc": " {value}% chance to double the damage.",
            "variantName": "秘術共鳴"
          }
        },
        "skills": {
          "arcane_blast": {
            "desc": "攻撃力 200%の単体ダメージ。",
            "name": "秘術爆発"
          },
          "mana_burn": {
            "desc": "バフ除去 + 追加ダメージ。",
            "name": "魔法粉砕"
          },
          "resonance_burst": {
            "desc": "共鳴発動時、周囲に 50%のダメージを拡散。",
            "name": "共鳴爆発"
          }
        }
      },
      "iskierpyria": {
        "lore": "太陽の泉の魔力を受け入れた高位魔道士。冷気・火炎・秘術の三つの流れを自在に操る。",
        "name": "イスキエスピリア",
        "routes": {
          "arcane": {
            "name": "秘術",
            "variantDesc": " {value}% chance to fire an additional Arcane Projectile.",
            "variantName": "秘術共鳴"
          },
          "fire": {
            "name": "火炎",
            "variantDesc": " {value}% chance to deal ATK x 2 immediate Burn damage.",
            "variantName": "魔法点火"
          },
          "frost": {
            "name": "冷気",
            "variantDesc": " {value}% chance to freeze the target for 2s.",
            "variantName": "魔法凍結"
          }
        },
        "skills": {
          "arcane_barrage": {
            "desc": "8秒ごとに攻撃力 x 3の投射体を 3発発射。",
            "name": "秘術集中砲火"
          },
          "arcane_missiles": {
            "desc": "5秒ごとに攻撃力 x 1.5の投射体を 5発連続発射。",
            "name": "秘術ミサイル"
          },
          "arcane_surge": {
            "desc": "15秒ごとにすべての敵に攻撃力 x 4の秘術爆撃。",
            "name": "秘術の奔流"
          },
          "fireball": {
            "desc": "6秒ごとにターゲット周囲 80pxに攻撃力 x 5の爆発。",
            "name": "火炎球"
          },
          "frost_elemental": {
            "desc": " Ranged",
            "name": "冷気の精霊"
          },
          "frost_nova": {
            "desc": "8秒ごとに周囲 120pxの敵を 3秒間スロウにする。",
            "name": "フロストノバ"
          },
          "ignite": {
            "desc": "パッシブ：火炎属性攻撃のダメージを 30%増幅。",
            "name": "点火"
          },
          "meteor": {
            "desc": "15秒ごとに単体に攻撃力 x 12 + 周囲に 50%のダメージ。",
            "name": "隕石落下"
          }
        },
        "summons": {
          "frost_elemental": {
            "name": "冷気の精霊"
          }
        }
      },
      "iyena": {
        "lore": "エイナの妹。光を纏いしドラナイの戒律司祭。",
        "name": "イエナ",
        "routes": {
          "discipline": {
            "name": "戒律",
            "variantDesc": "回復時、体力の{value}%のバリアを付与。",
            "variantName": "苦痛のバリア"
          }
        },
        "skills": {
          "atonement": {
            "desc": "ダメージを回復に転換 (12秒)",
            "name": "贖罪"
          },
          "barrier": {
            "desc": "味方全員にバリアを付与（最大HPの10%、8秒間）",
            "name": "光の氾濫"
          },
          "desperate_prayer": {
            "desc": "自身の攻撃力×10の即時回復 (8秒)",
            "name": "必死の祈り"
          },
          "penance": {
            "desc": "攻撃と回復の連打 (12秒)",
            "name": "懺悔"
          },
          "power_word_shield": {
            "desc": "単体にバリアを付与（最大HPの25%、12秒間）",
            "name": "真言・盾"
          }
        }
      },
      "jainaro": {
        "lore": "ダラランの戦闘魔道士。",
        "name": "ジェイナロ",
        "routes": {
          "arcane": {
            "name": "秘術",
            "variantDesc": "クールタイムが{value}%減少。",
            "variantName": "神秘の集中"
          }
        },
        "skills": {
          "arcane_missiles": {
            "desc": "3連発",
            "name": "魔力の矢"
          },
          "arcane_power": {
            "desc": "攻撃力増加",
            "name": "魔力の強化"
          },
          "polymorph": {
            "desc": "敵1体を5秒間無力化",
            "name": "変異"
          }
        }
      },
      "kaern_dinohouf": {
        "lore": "大地の母を崇めるタウレンの大族長。野性と自然の力を自在に操る。",
        "name": "ケルン・ダイノハーフ",
        "routes": {
          "balance": {
            "name": "調和",
            "variantDesc": "攻撃時、{value}%の確率で周囲80pxに攻撃力×2の範囲爆発。",
            "variantName": "月光爆発"
          },
          "feral": {
            "name": "野性",
            "variantDesc": "出血状態の対象を攻撃時、攻撃力×{value}%の追加ダメージ。",
            "variantName": "野性の審判"
          },
          "guardian": {
            "name": "守護",
            "variantDesc": "防御力が{value}%増加。",
            "variantName": "激怒した熊の変身"
          },
          "restoration": {
            "name": "回復",
            "variantDesc": "持続回復(HoT)効果が{value}%強化。",
            "variantName": "自然の雨期"
          }
        },
        "skills": {
          "bear_hug": {
            "desc": "20秒ごとに単体に攻撃力×5のダメージと5秒間の拘束",
            "name": "ベアハッグ"
          },
          "blood_frenzy": {
            "desc": "パッシブ：出血状態の対象へのダメージが20%増加",
            "name": "血の憤怒"
          },
          "mangle": {
            "desc": "8秒ごとに前方120pxに攻撃力×3のダメージと2秒間のスタン",
            "name": "粉砕"
          },
          "moonfire": {
            "desc": "攻撃ごとに攻撃力30%の追加自然ダメージ",
            "name": "月火"
          },
          "nourish": {
            "desc": "10秒ごとに体力が最も低い味方を攻撃力×5の強化回復",
            "name": "栄養"
          },
          "pounce": {
            "desc": "10秒ごとに単体に攻撃力×6のダメージと2秒間のスタン",
            "name": "跳躍"
          },
          "rake": {
            "desc": "攻撃ごとに3秒間の出血DoTを付与（攻撃力×50%/秒）",
            "name": "掻きむしり"
          },
          "rejuvenation": {
            "desc": "体力が最も低い味方に持続回復(HoT)を付与",
            "name": "回春"
          },
          "starfall": {
            "desc": "20秒ごとに敵全員に攻撃力×2の星明かり爆撃",
            "name": "星の雨"
          },
          "starsurge": {
            "desc": "8秒ごとに単体に攻撃力×6の自然強打",
            "name": "星の波動"
          },
          "survival_instincts": {
            "desc": "パッシブ：HPが40%以下の時、被ダメージが30%減少",
            "name": "生存本能"
          },
          "thorns": {
            "desc": "パッシブ：被弾時に攻撃力の25%を反射",
            "name": "茨の盾"
          },
          "tranquility": {
            "desc": "30秒ごとに味方全員を攻撃力×3回復",
            "name": "平穏"
          },
          "wild_growth": {
            "desc": "8秒ごとに味方全員を攻撃力×1.5回復",
            "name": "野生繁殖"
          }
        }
      },
      "kalishan": {
        "lore": "虚空の力を矢に込めて放つ狩人。",
        "name": "カリシャン",
        "routes": {
          "marksmanship": {
            "name": "射撃",
            "variantDesc": "攻撃時、{value}%の確率で暗黒追加ダメージ。",
            "variantName": "虚空の矢"
          }
        },
        "skills": {
          "aimed_shot": {
            "desc": "強力な射撃",
            "name": "狙い撃ち"
          },
          "arcane_shot": {
            "desc": "即時発動の射撃",
            "name": "魔力の射撃"
          },
          "rapid_fire": {
            "desc": "攻撃速度増加",
            "name": "速射"
          },
          "void_volley": {
            "desc": "範囲暗黒ダメージ",
            "name": "虚空の矢の雨"
          }
        }
      },
      "keltu": {
        "lore": "スコージのネクロマンサー。",
        "name": "ケルトゥ",
        "routes": {
          "frost": {
            "name": "冷気",
            "variantDesc": "冷気ダメージが{value}%増加。",
            "variantName": "死者の冷気"
          }
        },
        "skills": {
          "cone_of_cold": {
            "desc": "扇形に氷のダメージ",
            "name": "冷気突風"
          },
          "frostbolt": {
            "desc": "冷気ダメージとスロウ",
            "name": "氷の矢"
          }
        }
      },
      "larisian": {
        "lore": "獲物を狙う捕食者。ブラッドエルフのデーモンハンター。",
        "name": "ラリシアン",
        "routes": {
          "feast": {
            "name": "捕食",
            "variantDesc": "撃破時、HPを{value}%回復。",
            "variantName": "血の捕食"
          }
        },
        "skills": {
          "consume": {
            "desc": "ダメージと吸血",
            "name": "悪魔の噛みつき"
          },
          "immolation_aura": {
            "desc": "周囲に持続ダメージ",
            "name": "イモレーションオーラ"
          },
          "massacre": {
            "desc": "大虐殺",
            "name": "大虐殺"
          },
          "soul_rend": {
            "desc": "魂の搾取",
            "name": "魂の搾取"
          }
        }
      },
      "liasian": {
        "lore": "虚空に染まったエルフのデーモンハンター。敵の生命力を捕食する。",
        "name": "リアシアン",
        "routes": {
          "feast": {
            "name": "捕食",
            "variantDesc": "撃破時、HPを{value}%回復。",
            "variantName": "血の捕食"
          }
        },
        "skills": {
          "consume": {
            "desc": "ダメージと吸血",
            "name": "悪魔の噛みつき"
          },
          "immolation_aura": {
            "desc": "周囲に持続ダメージ",
            "name": "イモレーションオーラ"
          },
          "massacre": {
            "desc": "大虐殺",
            "name": "大虐殺"
          },
          "soul_rend": {
            "desc": "魂の搾取",
            "name": "魂の搾取"
          }
        }
      },
      "lili": {
        "lore": "冒険好きなパンダレンの修道僧。",
        "name": "リリ",
        "routes": {
          "mistweaver": {
            "name": "織霧",
            "variantDesc": "回復時、{value}%の追加回復。",
            "variantName": "霧の突風"
          }
        },
        "skills": {
          "chi_burst": {
            "desc": "前方直線にダメージと回復",
            "name": "気の爆発"
          },
          "effuse": {
            "desc": "素早い回復",
            "name": "滲み出し"
          },
          "life_cocoon": {
            "desc": "シールド",
            "name": "気の繭"
          },
          "renewing_mist": {
            "desc": "伝播する持続回復(HoT)",
            "name": "蘇生の霧"
          }
        }
      },
      "limu": {
        "lore": "砂漠のキツネの狩人。星が上がるほど圧倒的な速射能力を見せる。",
        "name": "リミュ",
        "routes": {
          "precision": {
            "name": "射撃",
            "variantDesc": "攻撃時、{value}%の確率でクリティカル。",
            "variantName": "エイムダウン"
          }
        },
        "skills": {
          "aimed_shot": {
            "desc": "強力な一撃",
            "name": "狙い撃ち"
          },
          "marked_for_death": {
            "desc": "確定クリティカル",
            "name": "標的指定"
          },
          "piercing_arrow": {
            "desc": "直線貫通",
            "name": "貫通矢"
          },
          "trueshot": {
            "desc": "ダメージ2倍",
            "name": "真実の一撃"
          }
        }
      },
      "lombardo": {
        "lore": "イリダリに従うデーモンハンター。地獄の火と混沌の魔力で敵を破壊し、苦痛に耐えながら味方を守る。",
        "name": "ロンバルド",
        "routes": {
          "havoc": {
            "name": "破滅",
            "variantDesc": "攻撃時、{value}%の確率で攻撃力×2の追加混沌ダメージ。",
            "variantName": "混沌の加護"
          },
          "vengeance": {
            "name": "復讐",
            "variantDesc": "被弾時、{value}%の確率で魂の破片を生成（HPを5%回復）。",
            "variantName": "魂の吸収"
          }
        },
        "skills": {
          "blade_dance": {
            "desc": "8秒ごとに周囲の全敵に攻撃力×4のダメージと1秒間の全攻撃回避",
            "name": "刃の舞"
          },
          "chaos_strike": {
            "desc": "攻撃時、{value}%の確率で攻撃力×3のダメージと消費した気力の返還（クールタイム減少）",
            "name": "混沌の一撃"
          },
          "demon_spikes": {
            "desc": "15秒ごとに6秒間防御力が50%増加し、受け流し確率が20%増加",
            "name": "悪魔の楔"
          },
          "elysian_decree": {
            "desc": "30秒ごとに指定位置に範囲攻撃力×12の秘術ダメージと破片3個を生成",
            "name": "天上の鐘"
          },
          "eye_beam": {
            "desc": "12秒ごとに前方の全敵に2秒間、秒間攻撃力×4のダメージと確定クリティカル",
            "name": "眼光"
          },
          "fel_rush": {
            "desc": "5秒ごとに前方250pxに突進し、経路上の全敵に攻撃力×3.5のダメージ",
            "name": "地獄の突進"
          },
          "metamorphosis": {
            "desc": "20秒ごとに10秒間悪魔に変身し、加速が40%、柔軟性が20%増加",
            "name": "変身"
          },
          "shear": {
            "desc": "6秒ごとに対象に攻撃力×3.5のダメージと確定で魂の破片1個を生成",
            "name": "切断"
          },
          "sigil_flame": {
            "desc": "10秒ごとに6秒間半径180pxの床を生成し、秒間攻撃力×1.5の火炎ダメージ",
            "name": "火炎の印章"
          },
          "soul_carving": {
            "desc": "20秒ごとに対象に攻撃力×8のダメージと魂の破片3個を即時生成",
            "name": "魂斬り"
          },
          "soul_cleave": {
            "desc": "8秒ごとに前方範囲に攻撃力×3のダメージと消費した破片ごとにHPを8%回復",
            "name": "魂の粉砕"
          },
          "the_hunt": {
            "desc": "30秒ごとに対象に突進して攻撃力×15のダメージと6秒間の持続ダメージ",
            "name": "狩り"
          }
        }
      },
      "magatha": {
        "lore": "火の精霊を操る呪術師。",
        "name": "マガタ",
        "routes": {
          "elemental": {
            "name": "エレメンタル",
            "variantDesc": "火炎ダメージが{value}%増加。",
            "variantName": "溶岩の激流"
          }
        },
        "skills": {
          "ascendance": {
            "desc": "火の昇天者に変身する。",
            "name": "昇天"
          },
          "flame_shock": {
            "desc": "火炎の持続ダメージを付与する。",
            "name": "火炎衝撃"
          },
          "lava_burst": {
            "desc": "確定会心ダメージ。",
            "name": "溶岩爆発"
          }
        }
      },
      "maiev": {
        "lore": "影の中の監視者。",
        "name": "マイエブ",
        "routes": {
          "subtlety": {
            "name": "潜行",
            "variantDesc": "隠密攻撃の追加ダメージが{value}%増加。",
            "variantName": "影の一撃"
          }
        },
        "skills": {
          "backstab": {
            "desc": "背後から攻撃してボーナスダメージを与える。",
            "name": "不意打ち"
          },
          "shadow_dance": {
            "desc": "隠密状態に突入して素早く攻撃する。",
            "name": "シャドウダンス"
          },
          "shadowstep": {
            "desc": "瞬間移動する。",
            "name": "シャドウステップ"
          }
        }
      },
      "malfu": {
        "lore": "自然の均衡を守るドルイド。",
        "name": "マルフ",
        "routes": {
          "balance": {
            "name": "バランス",
            "variantDesc": "秘術ダメージが{value}%増加。",
            "variantName": "月食"
          }
        },
        "skills": {
          "entangling_roots": {
            "desc": "敵を拘束する。",
            "name": "絡みつく根"
          },
          "moonfire": {
            "desc": "秘術の持続ダメージ。",
            "name": "ムーンファイア"
          },
          "starfall": {
            "desc": "広域爆撃。",
            "name": "星の降墜"
          },
          "wrath": {
            "desc": "自然ダメージを与える。",
            "name": "天罰"
          }
        }
      },
      "maraad": {
        "lore": "復讐を誓った聖騎士。",
        "name": "マラド",
        "routes": {
          "retribution": {
            "name": "懲罰",
            "variantDesc": "攻撃時、{value}%の神聖追加ダメージ。",
            "variantName": "正義の紋章"
          }
        },
        "skills": {
          "avenging_wrath": {
            "desc": "復讐の翼で変身する。",
            "name": "懲罰の激怒"
          },
          "blade_of_justice": {
            "desc": "神聖な刃の一撃。",
            "name": "審判の刃"
          },
          "crusader_strike": {
            "desc": "強力な神聖近接打撃。",
            "name": "聖戦士の一撃"
          }
        }
      },
      "mokra": {
        "lore": "大地の精霊と対話するオークの呪術師。",
        "name": "モクラ",
        "routes": {
          "elemental": {
            "name": "エレメンタル",
            "variantDesc": "スキルダメージ{value}%増加。",
            "variantName": "精霊の憤怒"
          }
        },
        "skills": {
          "chain_lightning": {
            "desc": "最大3体に連鎖する。",
            "name": "連鎖稲妻"
          },
          "lightning_bolt": {
            "desc": "雷ダメージを与える。",
            "name": "稲妻の矢"
          },
          "thunder_shock": {
            "desc": "押し出し+ダメージ。",
            "name": "雷鳴衝撃"
          }
        }
      },
      "muyeong_salk": {
        "lore": "生前の記憶を失ったアンデッドの盗賊。無法地帯の支配者や影の暗殺者として戦場を駆ける。",
        "name": "ムヨンサルク",
        "routes": {
          "assassination": {
            "name": "暗殺",
            "variantDesc": "攻撃時、{value}%の確率で強力な猛毒DoTを付与する。",
            "variantName": "致命的な毒"
          },
          "outlaw": {
            "name": "無法",
            "variantDesc": "攻撃時、{value}%の確率で10秒間ランダムな戦闘強化バフを獲得する。",
            "variantName": "ボーンロール"
          },
          "subtlety": {
            "name": "潜行",
            "variantDesc": "スキル使用時、{value}%の確率で5秒間攻撃力30%増加する。",
            "variantName": "シャドウダンス"
          }
        },
        "skills": {
          "between_eyes": {
            "desc": "10秒ごとに単体にATK×6と2秒スタン。",
            "name": "眉間撃ち"
          },
          "dreadblades": {
            "desc": "20秒ごとに10秒間攻撃速度+50%、全攻撃に{value}%追加ダメージ。",
            "name": "恐怖の剣"
          },
          "envenom": {
            "desc": "12秒ごとに毒状態の対象に攻撃力×10の爆発ダメージ。",
            "name": "毒殺"
          },
          "eviscerate": {
            "desc": "攻撃時、{value}%の確率で急所を突き攻撃力×5のダメージ。",
            "name": "切開"
          },
          "flurry": {
            "desc": "攻撃時、{value}%の確率で周囲の敵に50%の複製ダメージ。",
            "name": "刃乱舞"
          },
          "garrote": {
            "desc": "8秒ごとに単体を6秒沈黙+ATK×4持続ダメージ。",
            "name": "絞首"
          },
          "kingsbane": {
            "desc": "30秒ごとに強力な毒を注入し14秒間毎秒ATK×2のダメージ（漸増）。",
            "name": "王殺し"
          },
          "mutilate": {
            "desc": "攻撃時、{value}%の確率でATK×3と毒効果2倍増幅。",
            "name": "切断"
          },
          "pistol": {
            "desc": "6秒ごとに単体ATK×3.5+3秒スロウ。",
            "name": "拳銃射撃"
          },
          "secret_tech": {
            "desc": "25秒ごとに幻影を召喚し前方広範囲にATK×12のダメージ。",
            "name": "秘密の技法"
          },
          "shadowstrike": {
            "desc": "5秒ごとにターゲットの背後に瞬間移動しATK×4+1秒スタン。",
            "name": "影の一撃"
          },
          "symbols": {
            "desc": "15秒ごとに8秒間、次の3回の攻撃が確定会心でATK+20%。",
            "name": "死の象徴"
          }
        }
      },
      "nog": {
        "lore": "致命的な毒の暗殺者。",
        "name": "ノグ",
        "routes": {
          "assassination": {
            "name": "暗殺",
            "variantDesc": "毒の持続時間{value}%増加。",
            "variantName": "錬金術"
          }
        },
        "skills": {
          "mutilate": {
            "desc": "二刀流攻撃。",
            "name": "切断"
          },
          "poison_bomb": {
            "desc": "毒雲を生成する。",
            "name": "毒爆弾"
          },
          "poison_knife": {
            "desc": "毒の突き刺し。",
            "name": "毒ナイフ"
          },
          "vendetta": {
            "desc": "ダメージを増幅させる。",
            "name": "怨恨"
          }
        }
      },
      "nostferatu": {
        "lore": "太陽の泉の堕落と浄化をすべて見届けたブラッドナイト。今は聖なる光の審判官として戦場に立つ。",
        "name": "ノスフェラトゥ",
        "routes": {
          "holy": {
            "name": "神聖",
            "variantDesc": "回復時、{value}%の確率で対象の弱体化を除去する。",
            "variantName": "光の加護"
          },
          "protection": {
            "name": "保護",
            "variantDesc": "被弾時、{value}%の確率で3秒間最大HP15%のシールドを展開する。",
            "variantName": "光の守護"
          },
          "retribution": {
            "name": "懲罰",
            "variantDesc": "攻撃時、{value}%の確率でATK×2の追加神聖ダメージ。",
            "variantName": "神聖の叱責"
          }
        },
        "skills": {
          "avengers_shield": {
            "desc": "8秒ごとに敵3体にATK×3+2秒沈黙。",
            "name": "懲罰の盾"
          },
          "blade_of_justice": {
            "desc": "攻撃時、{value}%の確率でATK×3の強力な一撃。",
            "name": "審判の刃"
          },
          "divine_revelation": {
            "desc": "15秒ごとに10秒間全回復量+50%、マナ消費なし。",
            "name": "聖なる啓示"
          },
          "divine_storm": {
            "desc": "8秒ごとに周囲全敵にATK×3.5、与ダメの20%回復。",
            "name": "神聖嵐"
          },
          "guardian_king": {
            "desc": "25秒ごとに10秒間被ダメ50%減少+反射量100%増加。",
            "name": "古代の王の守護者"
          },
          "holy_beacon_1": {
            "desc": "回復時、最も生命力の低い味方も同時に回復する。",
            "name": "光の導き"
          },
          "holy_beacon_2": {
            "desc": "回復時、さらにもう1人の味方を回復する（合計3人同時回復）。",
            "name": "第二の導き"
          },
          "holy_flash": {
            "desc": "5秒ごとに単体をATK×4で即時回復。",
            "name": "光の閃光"
          },
          "holy_ground": {
            "desc": "10秒ごとに8秒間周囲味方DEF+20、毎秒2%回復。",
            "name": "神聖なる大地"
          },
          "judgment": {
            "desc": "6秒ごとに単体ATK×4+5秒間被ダメ15%増加。",
            "name": "審判"
          },
          "wake_of_ashes": {
            "desc": "20秒ごとに前方全敵にATK×10。アンデッドは即座に消滅する。",
            "name": "破滅の灰"
          }
        }
      },
      "pilji_bangkril": {
        "lore": "利益のためなら野獣も手なずけるゴブリンのハンター。",
        "name": "ピルジ・バンクリル",
        "routes": {
          "beast_mastery": {
            "name": "獣王",
            "variantDesc": "召喚獣のステータス{value}%増加。",
            "variantName": "野獣の怒り"
          },
          "marksmanship": {
            "name": "射撃ハンター",
            "variantDesc": "攻撃ごとに{value}%の確率で攻撃力×3の追加貫通ダメージ。",
            "variantName": "狙撃手の集中"
          },
          "survival": {
            "name": "生存ハンター",
            "variantDesc": "近接攻撃時、{value}%の追加自然ダメージ。",
            "variantName": "生存術師"
          }
        },
        "skills": {
          "aimed_shot": {
            "desc": "攻撃ごとに攻撃力の60%の追加ダメージを与えるパッシブ。",
            "name": "照準射撃"
          },
          "bestial_wrath": {
            "desc": "20秒ごと：召喚獣攻撃力2倍+30秒間の暴走（近接DPS）。",
            "name": "野獣暴走"
          },
          "binding_shot": {
            "desc": "8秒ごとに単体を3秒間拘束する。",
            "name": "投げ縄"
          },
          "call_pet": {
            "desc": "コンパニオンウルフを召喚する（20秒、近接DPS）。",
            "name": "ペット召喚"
          },
          "explosive_arrow": {
            "desc": "命中時、周囲70pxに攻撃力×1.5の範囲爆発。",
            "name": "爆発の矢"
          },
          "explosive_trap": {
            "desc": "12秒ごとに周囲150pxに攻撃力×3の爆発と3秒間のスロウ。",
            "name": "爆発の罠"
          },
          "kill_shot": {
            "desc": "15秒ごとにHP40%以下の敵を即死させるか攻撃力×12のダメージ。",
            "name": "キルショット"
          },
          "mongoose_bite": {
            "desc": "20秒ごとに単体に攻撃力×6の強打と2秒間のスタン。",
            "name": "マングースバイト"
          },
          "piercing_shot": {
            "desc": "8秒ごとに単体に攻撃力×8の防御無視ダメージ。",
            "name": "貫通射撃"
          },
          "poison_arrow": {
            "desc": "攻撃ごとに3秒間の毒DoT（攻撃力×40%/秒）を付与。",
            "name": "毒矢"
          },
          "rapid_fire": {
            "desc": "30%の確率で追加の投射体を発射する。",
            "name": "ラピッドファイア"
          },
          "serpent_sting": {
            "desc": "攻撃ごとに3秒間の毒DoT（攻撃力×50%/秒）を付与。",
            "name": "毒刃"
          }
        },
        "summons": {
          "pet": {
            "name": "ペットの狼"
          }
        }
      },
      "protagonist_defense": {
        "lore": "無限ダンジョン1000層を突破した伝説の守護者。数多くの英雄たちの固有特性を自分のものにして最強の防衛線を構築する。",
        "name": "ディフェンス勇者",
        "routes": {
          "protagonist_defense_all": {
            "name": "オールラウンダー",
            "variantDesc": "他の英雄の固有特性を最大{value}個吸収して強力なパッシブを得ます。",
            "variantName": "特性吸収"
          }
        }
      },
      "quinchai": {
        "lore": "酔拳を駆使するパンダレンの修道士。白虎、黒牛、玉龍、朱鶴の気を借りて戦場を席巻する。",
        "name": "クインチャイ",
        "routes": {
          "brewmaster": {
            "name": "醸造",
            "variantDesc": "受けるダメージの{value}%を10秒間かけて分散して受けます。",
            "variantName": "時間差"
          },
          "mistweaver": {
            "name": "織霧",
            "variantDesc": "回復時、{value}%の確率で追加の霧回復が発生。",
            "variantName": "霧 突風"
          },
          "windwalker": {
            "name": "風歩",
            "variantDesc": "攻撃時、{value}%の確率で2連打が発生。",
            "variantName": "酒虎の加護"
          }
        },
        "skills": {
          "bm_iron_skin": {
            "desc": "15秒ごとに8秒間被ダメージ30%減少。",
            "name": "鉄壁酒"
          },
          "bm_keg": {
            "desc": "8秒ごとに敵5体に攻撃力×3のダメージと4秒間40%のスロウ。",
            "name": "酒樽投げ"
          },
          "chi_ji": {
            "desc": "朱鶴を召喚して負傷した味方を非常に素早く回復します。",
            "name": "朱鶴チージィ召喚"
          },
          "fists": {
            "desc": "6秒ごとに前方150pxの敵に攻撃力×4の範囲ダメージと1秒間のスタン。",
            "name": "怒りの拳"
          },
          "flying_kick": {
            "desc": "8秒ごとに周囲のすべての敵の移動速度を3秒間50%減少。",
            "name": "不能の結界"
          },
          "kick": {
            "desc": "攻撃時、{value}%の確率で攻撃力×2.5のダメージ。",
            "name": "飛蹴"
          },
          "niuzao": {
            "desc": "自身のステータス90%を持つ黒牛を召喚してサブタンクとして活用します。",
            "name": "黒牛ニウザオ召喚"
          },
          "revival": {
            "desc": "25秒ごとにすべての味方を即座に攻撃力×3回復し、すべての弱体化効果を除去。",
            "name": "再起"
          },
          "vivify": {
            "desc": "5秒ごとに最低体力の味方を攻撃力×4回復。",
            "name": "活気"
          },
          "xuen": {
            "desc": "20秒間強力な白虎シュエンを召喚して共に戦います。",
            "name": "白虎シュエン召喚"
          },
          "yu_lon": {
            "desc": "玉龍を召喚して20秒間周囲のすべての味方を定期的に回復します。",
            "name": "玉龍ウィロン召喚"
          }
        },
        "summons": {
          "chi_ji": {
            "name": "チージィ"
          },
          "niuzao": {
            "name": "ニウザオ"
          },
          "xuen": {
            "name": "シュエン"
          },
          "yu_lon": {
            "name": "ウィロン"
          }
        }
      },
      "rakan": {
        "lore": "呪いと毒の巫術師。",
        "name": "ラカン",
        "routes": {
          "shadow": {
            "name": "暗黒",
            "variantDesc": "被ダメージの{value}%を反射。",
            "variantName": "ブードゥー人形"
          }
        },
        "skills": {
          "shadow_word_pain": {
            "desc": "持続 暗黒 ダメージ",
            "name": "苦痛"
          },
          "vampiric_touch": {
            "desc": "ダメージ+回復",
            "name": "吸血の抱擁"
          },
          "void_eruption": {
            "desc": "虚空解放",
            "name": "虚空の形態"
          }
        }
      },
      "rix": {
        "lore": "火遊びが好きな魔導師。",
        "name": "リックス",
        "routes": {
          "fire": {
            "name": "火炎",
            "variantDesc": "火炎DoTが{value}%増加。",
            "variantName": "発火"
          }
        },
        "skills": {
          "fire_blast": {
            "desc": "即時詠唱",
            "name": "火炎炸裂"
          },
          "fireball": {
            "desc": "火炎ダメージ",
            "name": "火炎球"
          },
          "pyroblast": {
            "desc": "巨大火炎球",
            "name": "パイロブラスト"
          }
        }
      },
      "seori_garam": {
        "lore": "精霊と対話するトロールの大呪術師。野性の力と精霊、大自然の癒やしを同時に操る。",
        "name": "ソリ・ガラム",
        "routes": {
          "elemental": {
            "name": "精霊術師",
            "variantDesc": "召喚獣のステータスが{value}%増加。",
            "variantName": "精霊の共鳴"
          },
          "enhancement": {
            "name": "高揚術師",
            "variantDesc": "攻撃時、{value}%の確率で攻撃力×2の追加自然ダメージ。",
            "variantName": "戦闘のトーテム"
          },
          "restoration": {
            "name": "復元術師",
            "variantDesc": "回復時、{value}%の確率で周囲の味方に少量の回復を拡散する。",
            "variantName": "回復の波動"
          }
        },
        "skills": {
          "chain_heal": {
            "desc": "8秒ごとに体力の低い順に3人を連鎖回復（攻撃力×3→2→1）。",
            "name": "連鎖癒"
          },
          "chain_lightning": {
            "desc": "6秒ごとに3連鎖の攻撃力×1.5の稲妻打撃。",
            "name": "連鎖稲妻"
          },
          "earth_elemental": {
            "desc": "大地精霊召喚（20秒、タンク、高いHP/防御）。",
            "name": "大地の精霊召喚"
          },
          "feral_spirit": {
            "desc": " Melee DPS)",
            "name": "精霊覚醒"
          },
          "fire_elemental": {
            "desc": "火炎精霊召喚（20秒、遠距離アタッカー、攻撃時攻撃力30%の火炎追加ダメージ）。",
            "name": "火炎の精霊召喚"
          },
          "healing_rain": {
            "desc": "12秒ごとにすべての味方を攻撃力×2で回復。",
            "name": "癒しの雨"
          },
          "lava_lash": {
            "desc": "パッシブ：攻撃ごとに攻撃力30%の追加火炎ダメージ。",
            "name": "溶岩の鞭"
          },
          "lightning_shield": {
            "desc": "パッシブ：被弾時に攻撃力20%の稲妻反射。",
            "name": "稲妻のシールド"
          },
          "spirit_link": {
            "desc": "30秒ごとにすべての味方の体力を均等化し、5秒間ダメージを20%軽減。",
            "name": "スピリットリンク"
          },
          "stormstrike": {
            "desc": "6秒ごとに単体に攻撃力×4と2秒間のスロウ。",
            "name": "ストームストライク"
          },
          "totemic_wrath": {
            "desc": "20秒ごとにすべての敵に攻撃力×3の稲妻爆撃。",
            "name": "トーテムの憤怒"
          },
          "water_shield": {
            "desc": "パッシブ：被弾時に攻撃力15%の自己回復。",
            "name": "水の盾"
          }
        },
        "summons": {
          "earth_elemental": {
            "name": "大地の精霊"
          },
          "feral_spirit": {
            "name": "精霊狼"
          },
          "fire_elemental": {
            "name": "火炎の精霊"
          }
        }
      },
      "sylva": {
        "lore": "死から帰還した闇の巡回者。",
        "name": "シルバ",
        "routes": {
          "survival": {
            "name": "生存",
            "variantDesc": "攻撃時、{value}%の暗黒追加ダメージ。",
            "variantName": "闇の矢"
          }
        },
        "skills": {
          "black_arrow": {
            "desc": "暗黒DoT",
            "name": "黒い矢"
          },
          "explosive_shot": {
            "desc": "広域爆発",
            "name": "爆発射撃"
          },
          "raptor_strike": {
            "desc": "近接強打",
            "name": "ラプトルの一撃"
          }
        }
      },
      "taran": {
        "lore": "陰影派の首長。",
        "name": "タラン",
        "routes": {
          "subtlety": {
            "name": "潜行",
            "variantDesc": "防御貫通{value}%。",
            "variantName": "弱点捕捉"
          }
        },
        "skills": {
          "eviscerate": {
            "desc": "とどめの一撃",
            "name": "切開"
          },
          "secret_technique": {
            "desc": "分身攻撃",
            "name": "秘技"
          },
          "shadowstrike": {
            "desc": "隠密攻撃",
            "name": "闇の撃"
          }
        }
      },
      "trontum": {
        "lore": "燃える山の深部から来た黒鉄ドワーフのデスナイト。",
        "name": "トラントゥム",
        "routes": {
          "frost": {
            "name": "冷気",
            "variantDesc": "攻撃時、{value}%の追加冷気ダメージ。",
            "variantName": "霜の刃"
          }
        },
        "skills": {
          "frost_strike": {
            "desc": "冷気ダメージ＋スロウ",
            "name": "冷気強打"
          },
          "howling_blast": {
            "desc": "広域冷気",
            "name": "凍てつく咆哮"
          },
          "obliterate": {
            "desc": "強力な2連打",
            "name": "オブリタレイト"
          },
          "pillar_of_frost": {
            "desc": "攻撃力増加",
            "name": "冷気の形象"
          }
        }
      },
      "tutankaton": {
        "lore": "生ける石、土石人の盗賊。頑丈な体で密かに接近する。",
        "name": "トゥタンカトン",
        "routes": {
          "assassination": {
            "name": "暗殺",
            "variantDesc": "毒ダメージが{value}%増加。",
            "variantName": "猛毒の専門家"
          }
        },
        "skills": {
          "envenom": {
            "desc": "毒爆発ダメージ",
            "name": "腐食"
          },
          "garrote": {
            "desc": "出血＋毒",
            "name": "絞殺"
          },
          "rupture": {
            "desc": "毒DoT",
            "name": "破裂"
          },
          "venom_burst": {
            "desc": "広域毒爆発",
            "name": "猛毒爆発"
          }
        }
      },
      "tyran": {
        "lore": "地獄の火を操る悪魔ハンター。",
        "name": "ティラン",
        "routes": {
          "havoc": {
            "name": "荒廃",
            "variantDesc": "会心ダメージが{value}%増加。",
            "variantName": "混沌の撃"
          }
        },
        "skills": {
          "chaos_strike": {
            "desc": "火炎打撃",
            "name": "混沌の撃"
          },
          "immolation_aura": {
            "desc": "周囲の火炎",
            "name": "イモレーションオーラ"
          },
          "metamorphosis": {
            "desc": "ステータス強化",
            "name": "悪魔変身"
          }
        }
      },
      "ultrion": {
        "lore": "龍の島で目覚めた古代のドレクティール。五色龍の力を操り、味方を癒やし強化し、敵を破壊する。",
        "name": "ウルトリオン",
        "routes": {
          "augmentation": {
            "name": "増強",
            "variantDesc": "オーラ：周囲250px内のすべての味方の攻撃速度が{value}%増加します。",
            "variantName": "強化の真髄"
          },
          "devastation": {
            "name": "破滅",
            "variantDesc": "攻撃時、{value}%の確率でターゲット周囲100pxの敵に攻撃力×2の追加ダメージ。",
            "variantName": "破滅の気配"
          },
          "preservation": {
            "name": "保存",
            "variantDesc": "回復時、{value}%の確率で周囲の味方2人を追加で治癒します。",
            "variantName": "生命の息吹"
          }
        },
        "skills": {
          "blistering_scales": {
            "desc": "12秒ごとにタンク役の味方に防御力+40と被弾時攻撃力30%反射を付与（10秒）。",
            "name": "灼熱の鱗"
          },
          "breath_of_eons": {
            "desc": "30秒ごとにすべての敵を3秒間気絶させ、10秒間味方全体のダメージ量を20%増加させる。",
            "name": "無限の息吹"
          },
          "disintegrate": {
            "desc": "12秒ごとに単体へ3秒間、毎秒攻撃力×4のダメージと50%のスロウを与える。",
            "name": "崩壊"
          },
          "dragonrage": {
            "desc": "20秒ごとに10秒間、攻撃力と攻撃速度を50%増加させる。",
            "name": "竜の激昂"
          },
          "ebon_might": {
            "desc": "10秒ごとに8秒間、最も攻撃力の高い味方2人の攻撃力を30%増加させる。",
            "name": "黒曜の力"
          },
          "eternity_surge": {
            "desc": "攻撃時、{value}%の確率で周囲の敵3体に攻撃力×3のダメージ。",
            "name": "永劫の波動"
          },
          "fire_breath": {
            "desc": "8秒ごとに前方すべての敵に攻撃力×5のダメージと5秒間の持続火炎ダメージ。",
            "name": "ファイアブレス"
          },
          "reversion": {
            "desc": "6秒ごとに対象へ8秒間、攻撃力×0.5の持続回復を付与。",
            "name": "蘇生"
          },
          "spiritbloom": {
            "desc": "8秒ごとに体力の低い味方3人を攻撃力×4で即時治癒。",
            "name": "精神の開花"
          },
          "stasis": {
            "desc": "25秒ごとにすべての味方を攻撃力×5で即時治癒し、2秒間すべてのダメージを無効化する。",
            "name": "静止"
          },
          "temporal_anomaly": {
            "desc": "12秒ごとに味方全体へ6秒間、最大HP15%のシールドを付与。",
            "name": "時の異変"
          },
          "upheaval": {
            "desc": "15秒ごとにターゲット周囲の敵に攻撃力×5のダメージと2秒間の気絶。",
            "name": "地殻変動"
          }
        }
      },
      "velen": {
        "lore": "ドレナイの預言者。",
        "name": "ヴェレン",
        "routes": {
          "holy": {
            "name": "神聖",
            "variantDesc": "回復時、クールタイムが{value}%短縮される。",
            "variantName": "救済の光"
          }
        },
        "skills": {
          "circle_of_healing": {
            "desc": "広域回復",
            "name": "治癒の円陣"
          },
          "divine_hymn": {
            "desc": "すべての味方に継続回復（4秒）。",
            "name": "神聖なる賛歌"
          },
          "flash_heal": {
            "desc": "高速回復",
            "name": "フラッシュヒール"
          },
          "holy_word_salvation": {
            "desc": "味方全体の大量回復。",
            "name": "聖なる言葉：救済"
          }
        }
      },
      "voljin": {
        "lore": "シャドウハンター。",
        "name": "ヴォルジン",
        "routes": {
          "enhancement": {
            "name": "高揚",
            "variantDesc": "攻撃速度が{value}%増加。",
            "variantName": "シャドウハンター"
          }
        },
        "skills": {
          "big_bad_voodoo": {
            "desc": "広域無敵",
            "name": "ビックバッドブードゥー"
          },
          "hex": {
            "desc": "変異",
            "name": "呪術"
          },
          "shadow_strike": {
            "desc": "暗黒武器攻撃",
            "name": "闇の撃"
          }
        }
      },
      "xianghua": {
        "lore": "癒しの霧を操るパンダレンの修道士。",
        "name": "シャンホア",
        "routes": {
          "mistweaver": {
            "name": "雲霧修道僧",
            "variantDesc": "攻撃時、{value}%の確率でスマートヒール。",
            "variantName": "霧織り"
          }
        },
        "skills": {
          "enveloping_mist": {
            "desc": "強力回復＋HoT",
            "name": "包み込む霧"
          },
          "invoke_chi_ji": {
            "desc": "8秒間すべての味方に継続回復。",
            "name": "チージィ召喚"
          },
          "life_cocoon": {
            "desc": "シールド＋HoT",
            "name": "生命の繭"
          },
          "revival": {
            "desc": "全体回復",
            "name": "復活の儀式"
          },
          "soothing_mist": {
            "desc": "チャネル回復",
            "name": "安らぎの霧"
          }
        }
      },
      "yeshtalktion": {
        "lore": "光に選ばれしドレナイの聖騎士。純粋な光の力を操る。",
        "name": "イェシュタルキオン",
        "routes": {
          "holy": {
            "name": "神聖騎士",
            "variantDesc": "回復時、{value}%の確率で連携回復。",
            "variantName": "聖なる光"
          },
          "retribution": {
            "name": "懲罰騎士",
            "variantDesc": "回復後の攻撃に{value}%の追加ダメージ。",
            "variantName": "神聖なる応報"
          }
        },
        "skills": {
          "crusader_strike": {
            "desc": "神聖打撃",
            "name": "聖騎士の雷撃"
          },
          "divine_favor": {
            "desc": "回復量2倍＋クールタイムリセット",
            "name": "光の恩恵"
          },
          "divine_purpose": {
            "desc": "クールタイム短縮加速",
            "name": "聖戦士の剣"
          },
          "final_reckoning": {
            "desc": "広域ダメージ＋回復",
            "name": "最後の審判"
          },
          "hammer_of_wrath": {
            "desc": "とどめの一撃",
            "name": "怒りのハンマー"
          },
          "holy_light": {
            "desc": "強力な単体回復",
            "name": "聖なる光"
          },
          "sacred_shield": {
            "desc": "回復対象にシールドを付与（最大HP15%、8秒）。",
            "name": "聖なる盾"
          },
          "sanctified_ground": {
            "desc": "範囲回復＋ダメージ軽減",
            "name": "至聖所"
          }
        }
      },
      "yrel": {
        "lore": "光の勇者。",
        "name": "イレル",
        "routes": {
          "protection": {
            "name": "保護",
            "variantDesc": "ダメージを{value}%軽減。",
            "variantName": "献身的な守護者"
          }
        },
        "skills": {
          "divine_storm": {
            "desc": "広域攻撃力×5の神聖ダメージ＋自己回復",
            "name": "神聖なる嵐"
          },
          "guardian_of_kings": {
            "desc": "味方全員のダメージを10秒間15%軽減。",
            "name": "古代王の守護者"
          },
          "hammer_of_righteous": {
            "desc": "広域神聖ダメージ",
            "name": "正義のハンマー"
          },
          "light_protection": {
            "desc": "最も体力の低い味方に5秒間シールドを付与（HP15%）。",
            "name": "光の加護"
          }
        }
      },
      "zedah": {
        "lore": "死から帰還した守護者。地獄の火で鍛えられた盾で味方を守る。",
        "name": "ゼダ",
        "routes": {
          "defense": {
            "name": "防御",
            "variantDesc": "被弾時、ダメージの{value}%を反射する。",
            "variantName": "棘の鎧"
          },
          "fury": {
            "name": "憤怒",
            "variantDesc": "攻撃時、{value}%の確率で3連打。",
            "variantName": "棘の本能"
          },
          "weapon": {
            "name": "武器",
            "variantDesc": "3打ごとに攻撃力×{value}%の追加火炎ダメージ。",
            "variantName": "地獄火の刀剣"
          }
        },
        "skills": {
          "execute_instinct": {
            "desc": "HP30%以下の敵に対して攻撃力2倍。",
            "name": "執行者"
          },
          "heat_blade": {
            "desc": "攻撃時、攻撃力20%の追加火炎ダメージ。",
            "name": "劣化刀剣"
          },
          "hellfire_slash": {
            "desc": "8秒ごとに前方160px内のすべての敵に攻撃力×4の火炎ダメージ。",
            "name": "地獄火斬り"
          },
          "lava_armor": {
            "desc": "被弾時、敵に攻撃力30%の火炎ダメージ。",
            "name": "溶岩の鎧"
          },
          "steel_shield": {
            "desc": "パッシブ：防御力+25。",
            "name": "鋼鉄の盾"
          },
          "thorn_edge": {
            "desc": "反射量+15%。",
            "name": "棘刃の刻印"
          },
          "weapon_mastery": {
            "desc": "パッシブ：攻撃力+25%。",
            "name": "武器熟練"
          }
        }
      },
      "zuljin": {
        "lore": "伝説的な斧投げ師。",
        "name": "ズルジン",
        "routes": {
          "combat": {
            "name": "戦闘",
            "variantDesc": "低体力時に攻撃速度{value}%増加。",
            "variantName": "狂戦士"
          }
        },
        "skills": {
          "guillotine": {
            "desc": "巨大な斧の落下",
            "name": "ギロチン"
          },
          "throw_axe": {
            "desc": "遠距離物理ダメージ",
            "name": "斧投げ"
          },
          "twin_cleave": {
            "desc": "前方 範囲 ダメージ",
            "name": "双斧斬り"
          }
        }
      },
      "aeina": {
        "name": "エイナ",
        "lore": "虚空を受け入れたドレナイの司祭。",
        "routes": {
          "void": {
            "name": "虚空",
            "variantName": "虚空爆裂",
            "variantDesc": "攻撃時{{value}}%の確率で全域伝播。"
          }
        },
        "skills": {
          "mind_flay": {
            "name": "精神の鞭",
            "desc": "チャネルダメージ＋スロウ"
          },
          "mind_blast": {
            "name": "虚空爆弾",
            "desc": "単体強打"
          },
          "devouring_plague": {
            "name": "荒廃",
            "desc": "DoT＋吸血"
          },
          "void_form": {
            "name": "虚空化",
            "desc": "変身強化"
          }
        }
      },
      "ssr_goblin_warchief": {
        "summons": {
          "gold_turret": {
            "name": "黄金砲台"
          }
        },
        "name": "ゴブリン戦酋長",
        "lore": "金と技術で武装したゴブリンのボス。巨大な機械スーツと黄金の力で敵を圧倒する。",
        "routes": {
          "goblin_chief_shredder": {
            "name": "機械スーツ",
            "variantName": "黄金の鎧",
            "variantDesc": "受けるダメージを{value}%減少させ、被弾時に稲妻で反撃する。"
          },
          "goblin_chief_merchant": {
            "name": "大商人",
            "variantName": "資本の力",
            "variantDesc": "攻撃時{value}%の確率で獲得ゴールドが永久に1%増加する（最大50%）。"
          }
        },
        "skills": {
          "gold_toss": {
            "name": "ゴールド投げ",
            "desc": "敵1体にATK×5のダメージと2秒間のスタンを与える。"
          },
          "repair": {
            "name": "機械修理",
            "desc": "パッシブ：毎秒自身のHP2.5%を回復する。"
          },
          "turret": {
            "name": "強化砲塔",
            "desc": "黄金砲台を召喚（常時維持）。"
          },
          "shield": {
            "name": "技術力の障壁",
            "desc": "全ての味方にHP30%のシールドを付与する。"
          },
          "beam": {
            "name": "黄金光線",
            "desc": "前方の全ての敵にATK×12の神聖ダメージを与える。"
          },
          "rocket": {
            "name": "ロケット発射",
            "desc": "敵3体にATK×4の爆発ダメージを与える。"
          },
          "mine": {
            "name": "地雷設置",
            "desc": "戦場に地雷を設置：踏んだ敵にATK×6のダメージ。"
          },
          "bribe": {
            "name": "買収",
            "desc": "敵1体を10秒間味方にする（ボスはスタン）。"
          },
          "investment": {
            "name": "投資",
            "desc": "10秒間、味方全体の攻撃力が50%増加する。"
          },
          "bombardment": {
            "name": "空爆",
            "desc": "画面全体に無差別ロケット爆撃ATK×15。"
          }
        }
      },
      "ssr_orc_blademaster": {
        "summons": {
          "mirror_image": {
            "name": "幻影"
          },
          "ghost": {
            "name": "怨魂"
          }
        },
        "name": "オークの剣鬼",
        "lore": "燃える刃部族の伝説的な剣客。風より速く、炎より熱い剣術を駆使する。",
        "routes": {
          "blademaster_sword": {
            "name": "剣道",
            "variantName": "幻影分身",
            "variantDesc": "攻撃時{value}%の確率で幻影を生成し、会心確率が増加する。"
          },
          "blademaster_ghost": {
            "name": "鬼道",
            "variantName": "幽霊の歩幅",
            "variantDesc": "攻撃時{value}%の確率で敵を貫通して背後に移動しながら斬る。"
          }
        },
        "skills": {
          "windwalk": {
            "name": "ウィンドウォーク",
            "desc": "5秒間移動速度50%増加および隠身、次の攻撃で3倍のダメージ。"
          },
          "mirror_image": {
            "name": "ミラーイメージ",
            "desc": "自身と同一の分身を3体生成。"
          },
          "critical_strike": {
            "name": "致命的一撃",
            "desc": "パッシブ：25%の確率で4倍のダメージ。"
          },
          "burning_blade": {
            "name": "火炎の刃",
            "desc": "攻撃時に追加火炎ダメージおよび5秒間攻撃力50%増加。"
          },
          "bladestorm": {
            "name": "刃の嵐",
            "desc": "10秒間無敵および周囲広範囲に攻撃力x5の持続ダメージ。"
          },
          "ghost_strike": {
            "name": "幽霊斬り",
            "desc": "単体に攻撃力x8の暗黒ダメージ + 3秒間の恐怖。"
          },
          "spirit_link": {
            "name": "魂の結束",
            "desc": "敵3体を連結して受けるダメージを共有する。"
          },
          "haunt": {
            "name": "怨魂",
            "desc": "倒れた敵を10秒間幽霊兵士として召喚。"
          },
          "night_terror": {
            "name": "夜の恐怖",
            "desc": "すべての敵を目眩ましおよび毎秒持続ダメージ。"
          },
          "ghost_army": {
            "name": "万霊の鎮魂曲",
            "desc": "戦場全体に幽霊軍団を召喚して攻撃力x20の爆撃。"
          }
        }
      },
      "ssr_tauren_chieftain": {
        "summons": {
          "ancestor": {
            "name": "先祖の魂"
          }
        },
        "name": "レッドメインの族長",
        "lore": "赤い峰の守護者であり大地母神の声。彼の踏みつけは大地を裂き、彼の意志は死を超越する。",
        "routes": {
          "tauren_chieftain_guardian": {
            "name": "輪廻",
            "variantName": "輪廻",
            "variantDesc": "死亡時{value}%の体力で即座に復活（クールタイム60秒）。"
          },
          "tauren_chieftain_spirit": {
            "name": "精霊",
            "variantName": "精霊の導き",
            "variantDesc": "攻撃時{value}%の確率で自然追加ダメージおよび回復。"
          }
        },
        "skills": {
          "shockwave": {
            "name": "衝撃波",
            "desc": "前方円錐形の敵に攻撃力x5のダメージおよび2秒間のスタン。"
          },
          "war_stomp": {
            "name": "戦闘の踏みつけ",
            "desc": "周囲の敵を3秒間スタンさせ、攻撃力x4のダメージを与える。"
          },
          "endurance_aura": {
            "name": "忍耐のオーラ",
            "desc": "パッシブ：味方全体の攻撃速度・移動速度20%増加。"
          },
          "earth_shield": {
            "name": "大地のシールド",
            "desc": "被弾時にHPを回復するシールドを味方に付与。"
          },
          "reincarnation": {
            "name": "大地の祝福",
            "desc": "復活時、15秒間攻撃力3倍および無敵。"
          },
          "nature_fury": {
            "name": "自然の憤怒",
            "desc": "単体に攻撃力x8の自然ダメージ。"
          },
          "spirit_link": {
            "name": "スピリットリンク",
            "desc": "味方3体を連結して受けるダメージを30%減少させ、分散する。"
          },
          "totem_mastery": {
            "name": "トーテムの熟練",
            "desc": "4種類のトーテム（攻撃/防御/回復/加速）を同時に召喚。"
          },
          "ancestral_call": {
            "name": "先祖の呼び声",
            "desc": "先祖の魂2体を召喚して共に戦闘（常時）。"
          },
          "world_stomp": {
            "name": "天地開闢の踏みつけ",
            "desc": "戦場全体の敵に攻撃力x15のダメージおよび5秒間のスタン。"
          }
        }
      },
      "ssr_ice_queen": {
        "summons": {
          "frost_elemental": {
            "name": "冷気精霊"
          }
        },
        "name": "フロストクイーン",
        "lore": "氷の国の冷酷な統治者。彼女のひと息で戦場は永遠の冬に覆われる。",
        "routes": {
          "ice_queen_frost": {
            "name": "氷結",
            "variantName": "絶対零度",
            "variantDesc": "スロウ効果を{value}%強化し、氷結時間を増加させる。"
          },
          "ice_queen_shard": {
            "name": "氷片",
            "variantName": "氷の破片",
            "variantDesc": "攻撃時{value}%の確率で3本の氷の矢を追加発射。"
          }
        },
        "skills": {
          "frost_nova": {
            "name": "凍結波動",
            "desc": "画面全体の敵を3秒間氷結させ、攻撃力x4のダメージ。"
          },
          "barrier": {
            "name": "氷のシールド",
            "desc": "味方全体にHP25%のシールドを付与 + 攻撃した敵にスロウ。"
          },
          "blizzard": {
            "name": "広範囲吹雪",
            "desc": "15秒間戦場に吹雪：毎秒20%のスロウが重なり持続ダメージ。"
          },
          "frozen_statue": {
            "name": "氷の彫像",
            "desc": "最強の敵1体を10秒間完全に封鎖する。"
          },
          "frozen_orb": {
            "name": "霜の嵐",
            "desc": "巨大な氷の玉が爆発し、戦場全体の敵を即死させる（ボスは攻撃力x20のダメージ）。"
          },
          "shard_barrage": {
            "name": "氷片の洗礼",
            "desc": "敵に無数の破片を発射、攻撃力x1.5 x 8連打。"
          },
          "cold_snap": {
            "name": "激しい寒さ",
            "desc": "パッシブ：自身のすべての冷気ダメージ40%増加。"
          },
          "glacier_spike": {
            "name": "氷河の槍",
            "desc": "巨大な氷河の槍を投げ、経路のすべての敵を貫通ダメージ。"
          },
          "water_elemental": {
            "name": "冷気精霊軍団",
            "desc": " Slow attacks)."
          },
          "absolute_zero": {
            "name": "深淵の氷結",
            "desc": "戦場のすべての存在を停止させ、攻撃力x15のダメージ。"
          }
        }
      },
      "ssr_death_knight": {
        "summons": {
          "abomination": {
            "name": "ツギハギゴーレム"
          },
          "undead": {
            "name": "亡者"
          }
        },
        "name": "デスナイト",
        "lore": "見捨てられた都市を守る不滅の騎士。死は彼にとって終わりではなく、新たな始まりに過ぎない。",
        "routes": {
          "death_knight_blood": {
            "name": "血気",
            "variantName": "死後硬直",
            "variantDesc": "受けるダメージの{value}%をHP回復に変換する。"
          },
          "death_knight_unholy": {
            "name": "不浄",
            "variantName": "腐敗の手",
            "variantDesc": "攻撃時{value}%の確率で敵に永久的な防御力10%減少を付与（最大5重複）。"
          }
        },
        "skills": {
          "death_strike": {
            "name": "死の一撃",
            "desc": "単体に攻撃力x6のダメージおよび与えたダメージの50%回復。"
          },
          "blood_boil": {
            "name": "血の沸騰",
            "desc": "周囲のすべての敵に攻撃力x4のダメージおよび出血付与。"
          },
          "vampiric_blood": {
            "name": "吸血鬼の血",
            "desc": "10秒間最大HP50%増加および回復量2倍。"
          },
          "rune_weapon": {
            "name": "るルーン武器の舞",
            "desc": "攻撃力を補助しダメージを防ぐルーン武器を召喚。"
          },
          "purgatory": {
            "name": "煉獄",
            "desc": "死亡時に無敵で復活し、15秒間与えたダメージ分HPを回復する。"
          },
          "death_grip": {
            "name": "死の握撃",
            "desc": "最も遠い敵を引き寄せ、3秒間のスタン。"
          },
          "anti_magic_shell": {
            "name": "対魔法シールド",
            "desc": "味方全体、5秒間すべての魔法ダメージを無効化。"
          },
          "outbreak": {
            "name": "突発熱病",
            "desc": "すべての敵に即座に強力な疾病（DoT）を伝播。"
          },
          "summon_abom": {
            "name": "ツギハギゴーレム召喚",
            "desc": "巨大なツギハギゴーレム1体を召喚（常時タンク）。"
          },
          "army_of_dead": {
            "name": "死者の軍団",
            "desc": "グール15体を召喚して戦場を焦土化。"
          }
        }
      },
      "ssr_poison_mancer": {
        "summons": {
          "zombie": {
            "name": "ゾンビ"
          }
        },
        "name": "猛毒の術師",
        "lore": "猛毒の沼地で禁じられた術を習得した者。彼の疫病は命あるすべてのものを腐らせる。",
        "routes": {
          "venomancer_plague": {
            "name": "疫病",
            "variantName": "猛毒拡散",
            "variantDesc": "毒ダメージ時{value}%の確率で対象に追加の猛毒爆発が発生。"
          },
          "venomancer_voodoo": {
            "name": "ブードゥー",
            "variantName": "闇の呪い",
            "variantDesc": "攻撃時{value}%の確率で対象を5秒間カエルに変異させる。"
          }
        },
        "skills": {
          "plague_cloud": {
            "name": "疫病の雲",
            "desc": "広範囲の持続毒ダメージおよび防御力30%減少。"
          },
          "venomous_gale": {
            "name": "毒性突風",
            "desc": "直線の敵に攻撃力x5のダメージおよび3秒間の束縛。"
          },
          "contagion": {
            "name": "伝染",
            "desc": "中毒状態の敵が死ぬと、周囲の敵に強力な毒を転移。"
          },
          "toxic_injection": {
            "name": "毒物注入",
            "desc": "パッシブ：自身のすべての攻撃に強力な持続毒ダメージを追加。"
          },
          "epidemic": {
            "name": "大疫病",
            "desc": "戦場のすべての敵を即座に中毒状態にしHP50%ダメージ（ボスは攻撃力x15）。"
          },
          "hex_totem": {
            "name": "呪術トーテム",
            "desc": "周囲の敵を周期的に変異させるトーテムを召喚。"
          },
          "voodoo_curse": {
            "name": "ブードゥーの呪い",
            "desc": "敵3体に受けるダメージ50%増加のデバフを付与。"
          },
          "shadow_voodoo": {
            "name": "影のブードゥー",
            "desc": "味方全体に攻撃時20%の吸血効果を付与、10秒間。"
          },
          "zombie_army": {
            "name": "ゾンビ軍団",
            "desc": "遅いが強力なゾンビ10体を召喚。"
          },
          "death_ritual": {
            "name": "死の儀式",
            "desc": "最強の敵1体を即死させる（ボスは最大HPの30%ダメージ）。"
          }
        }
      },
      "ssr_merc_king": {
        "summons": {
          "elite_merc": {
            "name": "強化傭兵"
          },
          "veteran_merc": {
            "name": "精鋭傭兵"
          }
        },
        "name": "傭兵王",
        "lore": "すべての傭兵が畏敬の念を抱く戦場の支配者。金と戦略さえあれば、どんな戦争も勝利へと導く。",
        "routes": {
          "merc_king_tactics": {
            "name": "戦術",
            "variantName": "戦闘指揮",
            "variantDesc": "味方全体の攻撃速度{value}%増加。"
          },
          "merc_king_assassin": {
            "name": "暗殺",
            "variantName": "非情な取引",
            "variantDesc": "攻撃時{value}%の確率で対象の防御力50%を無視。"
          }
        },
        "skills": {
          "war_cry": {
            "name": "勝利の雄叫び",
            "desc": "10秒間味方全体の攻撃力30%増加。"
          },
          "bounty_hunt": {
            "name": "賞金稼ぎ",
            "desc": "敵を倒した際の獲得ゴールドを2倍に増やす（永久）。"
          },
          "tactical_strike": {
            "name": "戦術的一撃",
            "desc": "強敵単体に攻撃力x10の物理ダメージ。"
          },
          "recruit": {
            "name": "傭兵雇用",
            "desc": "強化傭兵2体を追加召喚（常時維持）。"
          },
          "kings_army": {
            "name": "傭兵団召喚",
            "desc": "精鋭傭兵5体を召喚して20秒間共に戦闘。"
          },
          "poison_blade": {
            "name": "毒塗りの刃",
            "desc": "単体に攻撃力x4 + 強力な毒DoT。"
          },
          "shadow_step": {
            "name": "シャドウステップ",
            "desc": "対象の背後に移動して攻撃力x6のダメージ。"
          },
          "blood_money": {
            "name": "血の代償",
            "desc": "パッシブ：攻撃時にダメージ量の20%のゴールドを獲得。"
          },
          "execution": {
            "name": "断頭台",
            "desc": "HP30%以下の敵を即死（ボスには大量ダメージ）。"
          },
          "contract_kill": {
            "name": "殺しの契約",
            "desc": "すべての敵に契約の標識：10秒後に攻撃力x20のダメージ。"
          }
        }
      },
      "ssr_ele_scholar": {
        "summons": {
          "mage_clone": {
            "name": "魔導師の分身"
          }
        },
        "name": "精霊学者",
        "lore": "すべての精霊の力を学術的に完成させた大魔導師。属性の相性を利用して戦場を支配する。",
        "routes": {
          "ele_master_theory": {
            "name": "元素学",
            "variantName": "精霊の共鳴",
            "variantDesc": "すべてのシナジー効果を{value}%強化する。"
          },
          "ele_master_battle": {
            "name": "戦闘魔法",
            "variantName": "魔力暴走",
            "variantDesc": "攻撃時{value}%の確率でクールタイム中のスキル1つを初期化。"
          }
        },
        "skills": {
          "elemental_shift": {
            "name": "元素置換",
            "desc": "自身の攻撃属性をランダムに変更しダメージを20%増加させる。"
          },
          "prismatic_beam": {
            "name": "プリズムビーム",
            "desc": "敵3体に3種類の属性ダメージを同時適用、攻撃力x4。"
          },
          "catalyst": {
            "name": "触媒反応",
            "desc": "敵の弱体化効果の持続時間を2倍に増やす。"
          },
          "arcane_intellect": {
            "name": "神秘的知性",
            "desc": "パッシブ：味方全体のスキルダメージ30%増加。"
          },
          "elemental_overload": {
            "name": "元素過負荷",
            "desc": "画面全体に4大元素の大爆発が発生、攻撃力x12。"
          },
          "arcane_blast": {
            "name": "秘術炸裂",
            "desc": "攻撃力x6のダメージ + 次の炸裂を強化。"
          },
          "frost_fire_bolt": {
            "name": "冷気火炎の矢",
            "desc": "冷気+火炎の複合ダメージおよびスロウ。"
          },
          "mirror_image": {
            "name": "幻影分身",
            "desc": "自身と同一の攻撃力を持つ分身を2体召喚。"
          },
          "focus_magic": {
            "name": "魔力集中",
            "desc": "10秒間自身の攻撃速度100%増加。"
          },
          "greater_pyro": {
            "name": "大地獄火炸裂",
            "desc": "対象の敵全体に最大HPの35%ダメージ。"
          }
        }
      },
      "ssr_sea_ruler": {
        "summons": {
          "tentacle": {
            "name": "深淵の触手"
          }
        },
        "name": "深海の支配者",
        "lore": "沈んだ神殿の永遠の守護神。海の生命力と破壊的な津波を同時に操る。",
        "routes": {
          "sea_ruler_tide": {
            "name": "海鳴り",
            "variantName": "生命の波",
            "variantDesc": "回復時{value}%の確率で味方全体に追加回復。"
          },
          "sea_ruler_abyss": {
            "name": "深淵",
            "variantName": "深淵の恐怖",
            "variantDesc": "攻撃時{value}%の確率で対象を3秒間恐怖（移動不可）状態にする。"
          }
        },
        "skills": {
          "tsunami": {
            "name": "巨大津波",
            "desc": "敵を遠くに押し退け、攻撃力x5の水ダメージ。"
          },
          "healing_tide": {
            "name": "癒しの潮",
            "desc": "15秒間味方全体を毎秒3%回復するトーテムを召喚。"
          },
          "water_shield": {
            "name": "深海の加護",
            "desc": "味方全体の防御力40%増加およびシールド付与。"
          },
          "cleanse": {
            "name": "浄化の波",
            "desc": "味方全体の弱体化効果を除去し攻撃力x6回復。"
          },
          "blessing_of_abyss": {
            "name": "深海の祝福",
            "desc": "味方全体、10秒間無敵および完全回復。"
          },
          "abyss_bolt": {
            "name": "深淵の矢",
            "desc": "単体に攻撃力x7の暗黒+水複合ダメージ。"
          },
          "crushing_depths": {
            "name": "圧搾",
            "desc": "対象の移動速度を90%減少させ、持続ダメージを与える。"
          },
          "summon_kraken": {
            "name": "クラーケンの触手",
            "desc": "深淵の触手3体を召喚してランダムな敵を攻撃。"
          },
          "maelstrom": {
            "name": "大渦巻",
            "desc": "すべての敵を中心へ引き寄せ、攻撃力x5のダメージ。"
          },
          "eye_of_storm": {
            "name": "深淵の目",
            "desc": "深淵の目を召喚：20秒間戦場全体の敵に持続ダメージおよび沈黙。"
          }
        }
      },
      "ssr_demon_lord": {
        "summons": {
          "infernal": {
            "name": "地獄火の精霊"
          },
          "imp": {
            "name": "地獄のインプ"
          },
          "guardian": {
            "name": "地獄の守護兵"
          },
          "elite_demon": {
            "name": "精鋭悪魔兵"
          }
        },
        "name": "悪魔軍主",
        "lore": "亀裂を越えてきた地獄の司令官。燃える軍団を指揮し、敵の魂を破壊する。",
        "routes": {
          "demon_lord_chaos": {
            "name": "破滅",
            "variantName": "混沌の一撃",
            "variantDesc": "攻撃時{value}%の確率で対象に3倍のダメージ。"
          },
          "demon_lord_summon": {
            "name": "覇王",
            "variantName": "悪魔の権能",
            "variantDesc": "召喚獣が存在する間、自身の攻撃速度{value}%増加。"
          }
        },
        "skills": {
          "fel_strike": {
            "name": "地獄斬り",
            "desc": "前方のすべての敵に攻撃力x5の火炎ダメージ。"
          },
          "summon_infernal": {
            "name": "地獄火の精霊召喚",
            "desc": " Tank)."
          },
          "chaos_aura": {
            "name": "混沌のオーラ",
            "desc": "パッシブ：周囲の敵の移動速度30%減少および持続ダメージ。"
          },
          "soul_rend": {
            "name": "魂の粉砕",
            "desc": "単体に攻撃力x10の暗黒ダメージ + 5秒間受けるダメージ増加。"
          },
          "world_ender": {
            "name": "世界の終末",
            "desc": "戦場全体に巨大爆発、攻撃力x15のダメージ。"
          },
          "summon_imp": {
            "name": "インプの群れ",
            "desc": "インプ5体を即座に召喚（遠距離）。"
          },
          "fel_guard": {
            "name": "地獄の守護兵",
            "desc": "強力な地獄の守護兵1体を召喚（常時）。"
          },
          "demonic_empowerment": {
            "name": "悪魔の強化",
            "desc": "15秒間、召喚獣たちの攻撃力を2倍に増やす。"
          },
          "portal": {
            "name": "門を開放",
            "desc": "ランダムな悪魔たちが溢れ出る門を召喚。"
          },
          "legion_commander": {
            "name": "軍団の指揮官",
            "desc": "精鋭悪魔兵士10体を召喚して電撃突進。"
          }
        }
      },
      "ssr_blade_lord": {
        "summons": {
          "blade_wraith": {
            "name": "刃の亡霊"
          }
        },
        "name": "ブレードロード",
        "lore": "死から生まれた無限の刃の君主。彼の剣舞が始まれば、敵の息遣いさえ止まる。",
        "routes": {
          "blade_lord_annihilation": {
            "name": "絶滅",
            "variantName": "暗黒連撃",
            "variantDesc": "攻撃時{value}%の確率で5連打のダメージを与える。"
          },
          "blade_lord_reaper": {
            "name": "死神",
            "variantName": "魂の収穫",
            "variantDesc": "敵を倒した際{value}%の確率で攻撃力を永久に+1する（最大200）。"
          }
        },
        "skills": {
          "shadow_barrage": {
            "name": "影の連撃",
            "desc": "敵に攻撃力x2のダメージを5回連続で適用。"
          },
          "execution_blade": {
            "name": "処刑の刃",
            "desc": "HP30%以下の敵を即死、ボスは攻撃力x10のダメージ。"
          },
          "blood_aura": {
            "name": "血のオーラ",
            "desc": "パッシブ：周囲のすべての味方のダメージの20%を吸血。"
          },
          "blade_dance": {
            "name": "無限の剣舞",
            "desc": "敵の間を素早く移動しながら攻撃力x6のダメージ。"
          },
          "endless_slash": {
            "name": "無限斬り",
            "desc": "10秒間攻撃クールダウン0、すべてのダメージ2.5倍。"
          },
          "soul_reap": {
            "name": "魂の収穫",
            "desc": "単体に攻撃力x12の暗黒ダメージ。"
          },
          "death_grip": {
            "name": "死の握撃",
            "desc": "敵1体を引き寄せ3秒間束縛する。"
          },
          "fear_shout": {
            "name": "恐怖の咆哮",
            "desc": "周囲のすべての敵を4秒間恐怖状態にする。"
          },
          "summon_specter": {
            "name": "亡霊の呼び声",
            "desc": "自身の影を亡霊として召喚（常時）。"
          },
          "reapers_toll": {
            "name": "死神の鐘の音",
            "desc": "戦場全体の敵に攻撃力x20の暗黒ダメージ。"
          }
        }
      },
      "ssr_golden_archer": {
        "summons": {
          "griffin": {
            "name": "黄金のグリフィン"
          }
        },
        "name": "黄金の射手",
        "lore": "外れることのない黄金の矢を放つ伝説の弓兵。彼の矢は空さえも貫く。",
        "routes": {
          "golden_archer_marksman": {
            "name": "黄金射撃",
            "variantName": "黄金の矢",
            "variantDesc": "攻撃が外れなくなり、ダメージが{value}%増加する。"
          },
          "golden_archer_beast": {
            "name": "野獣",
            "variantName": "黄金の絆",
            "variantDesc": "召喚された野獣の攻撃力が自身の攻撃力の{value}%分増加する。"
          }
        },
        "skills": {
          "golden_arrow": {
            "name": "黄金の矢",
            "desc": "単体に攻撃力x10の光ダメージおよび3秒間のスタン。"
          },
          "rapid_fire": {
            "name": "黄金の連射",
            "desc": "10秒間、攻撃速度が3倍に増加。"
          },
          "eagle_eye": {
            "name": "イーグルアイ",
            "desc": " fires 3 piercing projectiles."
          },
          "star_shot": {
            "name": "星光射撃",
            "desc": "ターゲット周囲のすべての敵に攻撃力x6の爆発ダメージ。"
          },
          "golden_shower": {
            "name": "黄金の雨",
            "desc": "戦場全体に黄金の矢100発を乱射、攻撃力x15。"
          },
          "summon_griffin": {
            "name": "黄金のグリフィン召喚",
            "desc": "グリフィンを召喚（常時遠距離）。"
          },
          "beast_wrath": {
            "name": "野獣の激怒",
            "desc": "15秒間、召喚獣の攻撃力を2倍にし攻撃速度を増加させる。"
          },
          "serpent_sting": {
            "name": "黄金の毒蛇",
            "desc": "すべての敵を中毒状態にし10秒間持続ダメージ。"
          },
          "multi_shot": {
            "name": "マルチショット",
            "desc": "一度に5発の矢を発射してランダムな敵を攻撃。"
          },
          "stampede": {
            "name": "スタンピード",
            "desc": "無数の野獣が戦場を席巻し、攻撃力x12のダメージ。"
          }
        }
      },
      "ssr_shadow_lord": {
        "summons": {
          "shadow_image": {
            "name": "深淵の幻影"
          }
        },
        "name": "闇の君主",
        "lore": "すべての影を支配する闇の絶対者。彼の眼差しが留まる場所には、ただ恐怖と破滅があるのみだ。",
        "routes": {
          "shadow_lord_absolute": {
            "name": "絶対暗黒",
            "variantName": "暗黒の支配",
            "variantDesc": "暗黒ダメージ{value}%増加。"
          },
          "shadow_lord_terror": {
            "name": "恐怖",
            "variantName": "恐怖の支配",
            "variantDesc": "攻撃時{value}%の確率で敵を2秒間、恐怖状態にする。"
          }
        },
        "skills": {
          "dark_spread": {
            "name": "闇の拡散",
            "desc": "すべての敵に10秒間、暗黒DoTを適用（攻撃力100%/秒）。"
          },
          "shadow_burst": {
            "name": "影の爆発",
            "desc": "ターゲット周囲150pxのすべての敵に攻撃力x6の暗黒ダメージ。"
          },
          "soul_drain": {
            "name": "魂の吸収",
            "desc": "パッシブ：すべてのダメージの30%を自身に吸血。"
          },
          "curse_of_doom": {
            "name": "破滅の呪い",
            "desc": "敵1体に15秒後、攻撃力x30のダメージ。"
          },
          "dark_dominion": {
            "name": "暗黒の支配",
            "desc": " leading to a one-sided slaughter for 10s."
          },
          "fear_wave": {
            "name": "恐怖の波動",
            "desc": "前方のすべての敵に3秒間の恐怖 + 攻撃力x4のダメージ。"
          },
          "nightmare": {
            "name": "悪夢",
            "desc": "最強の敵1体を8秒間、睡眠状態にする。"
          },
          "mind_shatter": {
            "name": "精神崩壊",
            "desc": "対象の敵全体に攻撃力x8のダメージおよび5秒間の沈黙。"
          },
          "summon_horror": {
            "name": "恐怖の幻影召喚",
            "desc": "敵の恐怖を実体化した幻影を召喚（CC）。"
          },
          "world_of_fear": {
            "name": "恐怖の世界",
            "desc": "戦場全体の敵を10秒間、操作不能状態にする。"
          }
        }
      },
      "ssr_fire_seer": {
        "summons": {
          "fire_elemental": {
            "name": "火の精霊"
          }
        },
        "name": "火炎の先見者",
        "lore": "未来の火炎を見る火炎の預言者。戦場のすべての流れを火炎の預言で塗り替える。",
        "routes": {
          "fire_seer_prophecy": {
            "name": "預言",
            "variantName": "火炎の預言",
            "variantDesc": "スキルダメージ{value}%増加。"
          },
          "fire_seer_elemental": {
            "name": "精霊",
            "variantName": "精霊の激怒",
            "variantDesc": "攻撃時{value}%の確率でターゲット周囲に火炎精霊の爆発が発生。"
          }
        },
        "skills": {
          "prophecy_flame": {
            "name": "火炎の預言",
            "desc": "次の10秒間、敵の移動を妨害する火炎の罠を設置。"
          },
          "holy_flame": {
            "name": "火炎の宣告",
            "desc": "すべての敵に火傷を付与：10秒間、攻撃力100%/秒。"
          },
          "purifying_fire": {
            "name": "浄化の火炎",
            "desc": "最強の敵1体に攻撃力x15の浄化の火炎ダメージ。"
          },
          "flame_vision": {
            "name": "火炎の洞察",
            "desc": "패시브: 아군 전체 치명타 확률 +20%"
          },
          "solar_burst": {
            "name": "太陽爆発",
            "desc": "太陽エネルギー集中爆発：戦場全体に攻撃力x15の火炎ダメージ。"
          },
          "lava_burst": {
            "name": "溶岩噴火",
            "desc": "単体に攻撃力x8の確定会心ダメージ。"
          },
          "flame_shield": {
            "name": "燃える鎧",
            "desc": "味方全体の防御力+40および近接攻撃を反射。"
          },
          "summon_fire_ele": {
            "name": "火の精霊召喚",
            "desc": "強力な火の精霊2体を召喚（常時）。"
          },
          "fire_tempest": {
            "name": "火炎の台風",
            "desc": "戦場に巨大な火の旋風を召喚：敵を引き寄せ、焼き尽くす。"
          },
          "cataclysm_seer": {
            "name": "大激変の預言",
            "desc": "世界の終焉を呼ぶ火炎爆撃：すべての敵を消滅させる。"
          }
        }
      },
      "ssr_forest_king": {
        "summons": {
          "ancient_spirit": {
            "name": "古代の精霊"
          }
        },
        "name": "森の精霊王",
        "lore": "森全体を体とする自然の守護神。彼の根が届く場所はすなわち彼の領土だ。",
        "routes": {
          "forest_king_nature": {
            "name": "自然守護",
            "variantName": "古代の守護",
            "variantDesc": "受けるダメージ{value}%減少および毎秒HP1%回復。"
          },
          "forest_king_wild": {
            "name": "野生",
            "variantName": "野生の力",
            "variantDesc": "攻撃時{value}%の確率で2秒間、攻撃速度が200%増加する。"
          }
        },
        "skills": {
          "nature_barrier": {
            "name": "自然の障壁",
            "desc": "15秒間、すべての味方にHP30%のシールド + 束縛無効。"
          },
          "vine_entangle": {
            "name": "蔦の束縛",
            "desc": "すべての敵を10秒間束縛 + 攻撃力x1/秒の自然ダメージ。"
          },
          "world_tree": {
            "name": "生命の樹",
            "desc": "20秒間、味方全体を毎秒5%回復 + 防御力+50。"
          },
          "ironbark": {
            "name": "アイアンバーク",
            "desc": "味方全体、10秒間ダメージ50%減少。"
          },
          "forest_wrath": {
            "name": "森の憤怒",
            "desc": "戦場全体に樹木の怪獣を召喚：攻撃力x10の広範囲ダメージ + 5秒間のスタン。"
          },
          "feral_strike": {
            "name": "野生の打撃",
            "desc": "単体に攻撃力x12の物理ダメージ + 出血。"
          },
          "roar_of_beast": {
            "name": "猛獣の咆哮",
            "desc": "味方全体の攻撃力+50%および移動速度増加。"
          },
          "summon_ancient": {
            "name": "古代の精霊召喚",
            "desc": "強力な古代の精霊1体を召喚（常時タンク）。"
          },
          "wild_growth_atk": {
            "name": "野生の成長（攻撃）",
            "desc": "パッシブ：味方の攻撃時{value}%の確率で追加の自然ダメージ。"
          },
          "wrath_of_nature": {
            "name": "自然の激怒",
            "desc": "戦場全体に台風を召喚：敵を浮かせ、攻撃力x15のダメージ。"
          }
        }
      },
      "ssr_dragon_tamer": {
        "summons": {
          "ancient_dragon": {
            "name": "古代の竜"
          },
          "whelp": {
            "name": "小竜"
          },
          "aspect": {
            "name": "竜の位相"
          }
        },
        "name": "ドラゴン使い",
        "lore": "竜と一つになった伝説のドラゴン騎士。彼の号令一つで古代の竜たちが動き出す。",
        "routes": {
          "dragon_tamer_knight": {
            "name": "竜騎士",
            "variantName": "竜の力",
            "variantDesc": "攻撃力{value}%増加およびすべての攻撃に火炎爆発を追加。"
          },
          "dragon_tamer_tamer": {
            "name": "調教師",
            "variantName": "竜の結束",
            "variantDesc": "召喚獣が与えたダメージの{value}%分、自身の攻撃力が永久に増加する（最大300%）。"
          }
        },
        "skills": {
          "dragon_command": {
            "name": "竜の命令",
            "desc": "仲間の竜に攻撃命令：攻撃力x8の広範囲火炎ブレス。"
          },
          "fire_whip": {
            "name": "火炎の鞭",
            "desc": "前方直線のすべての敵に攻撃力x6の火炎ダメージ + 火傷。"
          },
          "dragon_aura": {
            "name": "竜のオーラ",
            "desc": "パッシブ：味方全体の攻撃力40%増加、ダメージ20%減少。"
          },
          "dragon_flight": {
            "name": "竜の飛翔",
            "desc": "10秒間無敵および攻撃力2倍増加。"
          },
          "ancient_dragon_summon": {
            "name": "古代の竜召喚",
            "desc": " Powerful Breath)."
          },
          "spawn_dragonling": {
            "name": "小竜軍団",
            "desc": " Ranged)."
          },
          "taming_beast": {
            "name": "野獣調教",
            "desc": "敵1体を調教して15秒間、味方にする。"
          },
          "nature_blessing": {
            "name": "自然の祝福",
            "desc": "味方の召喚獣全員を完全回復し、10秒間強化。"
          },
          "dragon_nest": {
            "name": "竜の巣",
            "desc": "戦場に巣を召喚：3秒ごとに小竜1体を自動生成。"
          },
          "summon_dragon_aspect": {
            "name": "竜の君主召喚",
            "desc": "伝説の竜の位相を召喚：戦場全体を焦土化。"
          }
        }
      },
      "ssr_plague_lord": {
        "summons": {
          "elite_ghoul": {
            "name": "強化グール"
          },
          "abomination": {
            "name": "ツギハギゴーレム"
          },
          "undead": {
            "name": "亡者"
          }
        },
        "name": "疫病の主",
        "lore": "世界のすべての生命を毒で支配する疫病の君主。彼の一息で帝国は崩壊した。",
        "routes": {
          "plague_lord_absolute": {
            "name": "疫病支配",
            "variantName": "疫病支配",
            "variantDesc": "毒ダメージ{value}%増加およびすべての攻撃に致命的な疫病を付与。"
          },
          "plague_lord_undead": {
            "name": "降霊",
            "variantName": "死の君主",
            "variantDesc": "召喚獣が与えたダメージの{value}%分、自身のHPが回復する。"
          }
        },
        "skills": {
          "plague_spread": {
            "name": "疫病伝播",
            "desc": "すべての敵に疫病を付与：15秒間、攻撃力120%/秒の毒ダメージ。"
          },
          "toxic_cloud": {
            "name": "毒気雲",
            "desc": "戦場全体に毒気の雲：20秒間、敵のHPを毎秒8%減少。"
          },
          "corpse_burst": {
            "name": "死体爆発",
            "desc": "死んだ敵の死体が爆発：周囲に攻撃力x6 + 毒を伝播。"
          },
          "epidemic_passive": {
            "name": "大疫病の導き手",
            "desc": "パッシブ：中毒の敵が死ぬたびに味方全体を5%回復。"
          },
          "plague_dominion": {
            "name": "疫病の支配者",
            "desc": "戦場の疫病化：すべての敵のHPを即座に1に減少させ、10秒間スタン。"
          },
          "summon_ghoul": {
            "name": "グール召喚",
            "desc": "強化グール3体を召喚（常時近接）。"
          },
          "raise_abom": {
            "name": "ツギハギゴーレム召喚",
            "desc": " Tank)."
          },
          "death_pact": {
            "name": "死の誓約",
            "desc": "召喚獣1体を犠牲にして自身のHPを完全回復。"
          },
          "unholy_frenzy": {
            "name": "不浄の狂気",
            "desc": "15秒間、召喚獣および自身の攻撃速度150%増加。"
          },
          "army_of_undead": {
            "name": "アンデッドの大軍勢",
            "desc": "戦場に無数の亡者を召喚（30体）して総攻撃。"
          }
        }
      },
      "ssr_lich_king": {
        "summons": {
          "elite_ghoul": {
            "name": "強化グール"
          },
          "gargoyle": {
            "name": "ガーゴイル"
          },
          "army": {
            "name": "軍団の亡者"
          }
        },
        "name": "リッチ王",
        "lore": "すべてのアンデッドの王。彼が通り過ぎた場所には永遠の冬が残る。",
        "routes": {
          "lich_king_frost": {
            "name": "冷気",
            "variantName": "リッチ王の意志",
            "variantDesc": "受けるダメージの{value}%を反射し、冷気ダメージが増加する。"
          },
          "lich_king_unholy": {
            "name": "不浄",
            "variantName": "死滅の導き手",
            "variantDesc": "召喚獣の攻撃力{value}%増加。"
          }
        },
        "skills": {
          "frost_aura": {
            "name": "氷結のオーラ",
            "desc": "周囲200pxの敵の移動速度を70%減少させる。"
          },
          "death_touch": {
            "name": "死の接吻",
            "desc": "単体に攻撃力x8のダメージ、5秒間の完全スタン。"
          },
          "obliterate": {
            "name": "絶滅",
            "desc": "防御無視の強力な2連打、攻撃力x6。"
          },
          "remorseless_winter": {
            "name": "冷酷な冬",
            "desc": "10秒間、周囲の敵に持続ダメージおよび氷結。"
          },
          "lich_wrath": {
            "name": "リッチ王の憤怒",
            "desc": "戦場全体に攻撃力1500%の冷気ダメージ + 永久スロウ。"
          },
          "agony": {
            "name": "苦痛の呪い",
            "desc": "増大する強力な持続暗黒ダメージ。"
          },
          "ghoul_army": {
            "name": "グール召喚",
            "desc": "強化グール4体を即座に召喚。"
          },
          "corpse_explosion": {
            "name": "死体爆発",
            "desc": "死んだ敵の死体を爆発させ攻撃力x10のダメージ。"
          },
          "gargoyle": {
            "name": "ガーゴイル召喚",
            "desc": "空から支援射撃を行うガーゴイルを召喚。"
          },
          "army_of_dead": {
            "name": "死者の軍団",
            "desc": "アンデッド軍団20体を召喚して戦場を焦土化。"
          }
        }
      },
      "ssr_goblin_emperor": {
        "summons": {
          "mech_soldier": {
            "name": "機械兵士"
          },
          "elite_merc": {
            "name": "精鋭傭兵"
          }
        },
        "name": "ゴブリン皇帝",
        "lore": "無数の機械とゴールドを従えるゴブリンたちの皇帝。彼の富貴栄華はすなわち彼の武力となる。",
        "routes": {
          "goblin_emperor_dominion": {
            "name": "皇帝支配",
            "variantName": "皇帝の鎧",
            "variantDesc": "受けるダメージ{value}%減少および被弾時にゴールド獲得。"
          },
          "goblin_emperor_wealth": {
            "name": "富貴",
            "variantName": "黄金の力",
            "variantDesc": "攻撃時{value}%の確率で敵を黄金の銅像にする（3秒間のスタン）。"
          }
        },
        "skills": {
          "golden_army": {
            "name": "黄金軍団",
            "desc": "機械兵士5体を召喚（常時近接）。"
          },
          "rocket_armor": {
            "name": "ロケットアーマー",
            "desc": "10秒間自身が無敵および被弾時にロケットで反撃。"
          },
          "goblin_empire": {
            "name": "ゴブリン帝国",
            "desc": "戦場全体に機械の罠：敵が踏むと攻撃力x8の爆発。"
          },
          "repair_bots": {
            "name": "修理ロボット",
            "desc": "味方全体の召喚獣および壁を即座に50%修理。"
          },
          "emperor_decree": {
            "name": "皇帝の勅令",
            "desc": "すべての敵を強制召喚後、攻撃力x15の全方位爆撃。"
          },
          "gold_blast": {
            "name": "黄金爆発",
            "desc": "単体に攻撃力x8の神聖ダメージ + ゴールドドロップ。"
          },
          "tax_collection": {
            "name": "税金徴収",
            "desc": "すべての敵にダメージを与え、総ダメージ量の10%のゴールドを獲得。"
          },
          "mercenary_contract": {
            "name": "傭兵契約",
            "desc": "強力な精鋭傭兵2体を召喚（常時遠距離）。"
          },
          "stock_market": {
            "name": "株式暴騰",
            "desc": "15秒間、味方全体のすべての能力値50%増加。"
          },
          "golden_rain": {
            "name": "黄金の雨",
            "desc": "空から巨大な金塊を投下：すべての敵に即死の確率。"
          }
        }
      },
      "ssr_witch_king": {
        "summons": {
          "voodoo_spirit": {
            "name": "ブードゥー精霊"
          }
        },
        "name": "ブードゥー王",
        "lore": "数千年のブードゥー儀式の結晶。彼の呪いは死より深い苦痛を与える。",
        "routes": {
          "witch_king_curse": {
            "name": "呪い",
            "variantName": "大ブードゥーの呪い",
            "variantDesc": "呪いの持続時間{value}%増加および感染効果。"
          },
          "witch_king_shadow": {
            "name": "闇",
            "variantName": "シャドウ襲撃",
            "variantDesc": "攻撃時{value}%の確率で対象に暗黒のカラスの群れを送り、持続ダメージを与える。"
          }
        },
        "skills": {
          "voodoo_doll": {
            "name": "ブードゥー人形",
            "desc": "敵1体の受けるダメージ3倍増加、15秒間。"
          },
          "spirit_raise": {
            "name": "精霊降霊",
            "desc": "死んだ敵を精霊として召喚（常時維持）。"
          },
          "toxic_ritual": {
            "name": "毒性儀式",
            "desc": "すべての敵を中毒 + 15秒間回復不可。"
          },
          "voodoo_hex": {
            "name": "広範囲呪術",
            "desc": "すべての敵を8秒間カエルに変異させる。"
          },
          "death_dance": {
            "name": "死の踊り",
            "desc": "戦場全体のブードゥー儀式：すべての敵が消滅する確率。"
          },
          "shadow_bolt": {
            "name": "シャドウボルト",
            "desc": "単体に攻撃力x8の暗黒ダメージ。"
          },
          "dark_totem": {
            "name": "闇のトーテム",
            "desc": "周囲の敵の攻撃力を50%減少させるトーテムを召喚。"
          },
          "soul_harvest": {
            "name": "魂の収穫",
            "desc": "敵を倒すたびに味方全体の攻撃力+5%永久（最大50%）。"
          },
          "night_fall": {
            "name": "黄昏の呼び声",
            "desc": "すべての敵を目眩まし10秒間および持続暗黒ダメージ。"
          },
          "abyss_ritual": {
            "name": "深淵の儀式",
            "desc": "戦場を深淵で覆い敵を即死および味方を完全回復。"
          }
        }
      },
      "ssr_golden_panda": {
        "summons": {
          "golden_clone": {
            "name": "黄金分身"
          }
        },
        "name": "黄金のパンダ",
        "lore": "黄金の祝福を受けた伝説のパンダ。戦うほど強くなり、その果ては誰も知らない。",
        "routes": {
          "golden_panda_brew": {
            "name": "黄金醸造",
            "variantName": "黄金術法",
            "variantDesc": "被弾時{value}%の確率でダメージ反射および自身を回復。"
          },
          "golden_panda_zen": {
            "name": "冥想",
            "variantName": "禅の境地",
            "variantDesc": "すべての味方に弱体化効果無効および防御力{value}増加。"
          }
        },
        "skills": {
          "golden_brew": {
            "name": "黄金醸造",
            "desc": "黄金の酒を飲み20秒間無敵およびHP完全回復。"
          },
          "stagger_gold": {
            "name": "黄金の時間差",
            "desc": "受けるダメージの80%を20秒間かけて分割して受ける。"
          },
          "storm_earth_fire": {
            "name": "ストーム・アース・ファイア",
            "desc": " Permanent)."
          },
          "breath_of_fire_gold": {
            "name": "黄金火炎の息吹",
            "desc": "前方への巨大な火炎放射：敵を撃破し持続ダメージ。"
          },
          "golden_wave": {
            "name": "黄金パンダの波動",
            "desc": "黄金エネルギー爆発：すべての敵に即死の確率および味方を完全復活。"
          },
          "zen_meditation": {
            "name": "冥想",
            "desc": "10秒間、味方全体をの受けるダメージ80%減少。"
          },
          "mist_barrier": {
            "name": "霧の障壁",
            "desc": "戦場に霧を敷き敵の命中率90%減少、15秒間。"
          },
          "chi_surge": {
            "name": "気波動",
            "desc": "敵を押し退け味方全体のマナ（スキルクールタイム）を回復。"
          },
          "peace_ring": {
            "name": "平和の環",
            "desc": "敵を環の外へ追い出し進入不可にする、10秒間。"
          },
          "transcendence": {
            "name": "解脱",
            "desc": "戦場のすべての敵を15秒間停止させ浄化。"
          }
        }
      },
      "ssr_primordial_dragon_heir": {
        "summons": {
          "primordial_dragon": {
            "name": "原始ドラゴン"
          }
        },
        "name": "太古の竜の末裔",
        "lore": "太初のドラゴン血統が目覚めた者。彼の体の中には5つの位相の力が渦巻いている。",
        "routes": {
          "primordial_dragon_awakening": {
            "name": "古竜覚醒",
            "variantName": "古竜の血",
            "variantDesc": "スキルダメージ{value}%増加およびすべての元素シナジーを活性化。"
          },
          "primordial_dragon_aspect": {
            "name": "位相",
            "variantName": "位相の権能",
            "variantDesc": "攻撃時{value}%の確率で対象にランダムな位相の呪いをかける。"
          }
        },
        "skills": {
          "ancient_breath": {
            "name": "原始竜の息吹",
            "desc": "5属性複合ブレス：前方すべての敵に攻撃力x10のダメージ。"
          },
          "ancient_summon": {
            "name": "古竜の召喚",
            "desc": "原始ドラゴン2体を召喚（常時遠距離）。"
          },
          "primordial_flame": {
            "name": "太古の火炎",
            "desc": "戦場全体に攻撃力x15の複合属性ダメージ。"
          },
          "dragon_form": {
            "name": "竜の形態",
            "desc": "パッシブ：自身のすべての能力値50%永久増加。"
          },
          "great_awakening": {
            "name": "大覚醒",
            "desc": "30秒間すべての能力5倍 + 無敵 + 戦場を焦土化。"
          },
          "time_stop": {
            "name": "時間停止",
            "desc": "すべての敵を5秒間完全に停止させる。"
          },
          "nature_binding": {
            "name": "自然の結束",
            "desc": "敵全体を8秒間束縛および毒ダメージ。"
          },
          "frost_prison": {
            "name": "霜の監獄",
            "desc": "最強の敵3体を10秒間氷結。"
          },
          "arcane_surge": {
            "name": "秘術の急流",
            "desc": "すべての敵を沈黙8秒間およびスキルクールタイム増加。"
          },
          "aspect_union": {
            "name": "位相の結集",
            "desc": "5つの位相の力を一つに：戦場のすべての敵に即死の確率50%。"
          }
        }
      },
      "ssr_eternal_elf_king": {
        "summons": {
          "night_warden": {
            "name": "夜の番人"
          }
        },
        "name": "永遠のエルフ王",
        "lore": "すべてのエルフ血統を超越した永遠の王。秘術の精髄そのものである存在だ。",
        "routes": {
          "eternal_elf_arcane": {
            "name": "永遠の秘術",
            "variantName": "秘術の王",
            "variantDesc": "秘術ダメージ{value}%増加およびすべての投射物に貫通を付与。"
          },
          "eternal_elf_night": {
            "name": "夜の支配",
            "variantName": "月光の加護",
            "variantDesc": "味方全体、毎秒{value}%回復および回避率20%増加。"
          }
        },
        "skills": {
          "eternal_arrow": {
            "name": "永遠の矢",
            "desc": "戦場全体を貫通する秘術の矢、攻撃力x10。"
          },
          "elf_essence": {
            "name": "エルフの精髄",
            "desc": "エルフの味方全体のすべての能力を100%増幅、20秒間。"
          },
          "starfall_barrage": {
            "name": "星光の雨",
            "desc": "空から秘術の星光50発を爆撃、攻撃力x4。"
          },
          "arcane_mastery": {
            "name": "秘術の通達",
            "desc": "パッシブ：自身のすべてのスキルクールタイム50%減少。"
          },
          "eternal_verdict": {
            "name": "万年の宣告",
            "desc": "すべての敵のHPを即座に1に減少させ、永久スロウ90%。"
          },
          "moonlight": {
            "name": "月光閃光",
            "desc": "戦場全体の敵を沈黙5秒間および持続ダメージ。"
          },
          "night_embrace": {
            "name": "夜の抱擁",
            "desc": "味方全体、10秒間無敵およびすべての弱体化無効。"
          },
          "summon_sentinel": {
            "name": "夜の番人召喚",
            "desc": " Stun attacks)."
          },
          "falling_star": {
            "name": "墜落する星",
            "desc": "巨大隕石を召喚：敵全体に10秒間のスタンおよび攻撃力x12のダメージ。"
          },
          "eternal_night": {
            "name": "永遠の夜",
            "desc": "戦場を暗黒で覆いすべての敵を消滅させ味方を復活。"
          }
        }
      },
      "scrapbom": {
        "name": "スクラップボム",
        "lore": "廃材と火薬で作った炎砲台を壁の上に据えるゴブリンエンジニア。砲台が前線を守る間、彼は砲台と壁の修理だけに集中する。",
        "routes": {
          "turret": {
            "name": "砲台強化",
            "variantName": "炎砲台マスター",
            "variantDesc": "砲台ATKを星ごとに{{value}}%追加増加。"
          },
          "heal": {
            "name": "修理強化",
            "variantName": "緊急修理システム",
            "variantDesc": "砲台/壁の修理量を星ごとに{{value}}%追加増加。"
          }
        },
        "skills": {
          "overcharge": {
            "name": "過負荷弾薬",
            "desc": "砲台ATK +30%"
          },
          "turret_armor": {
            "name": "重装甲コーティング",
            "desc": "砲台DEF +40、HP +30%"
          },
          "splash": {
            "name": "爆発散弾",
            "desc": "砲台攻撃が半径80pxの全域炎ダメージを与える"
          },
          "multi_turret": {
            "name": "多重砲台",
            "desc": "炎砲台を1基追加召喚（合計2基常時維持）"
          },
          "fast_repair": {
            "name": "高速修理",
            "desc": "修理クールダウン1秒短縮（3秒→2秒）"
          },
          "repair_amp": {
            "name": "修理増幅",
            "desc": "砲台/壁の修理量 +40%"
          },
          "emergency_repair": {
            "name": "緊急再建",
            "desc": "HP30%以下の砲台/壁修理時に修理量2倍"
          },
          "fortress": {
            "name": "要塞化",
            "desc": "修理後5秒間、砲台・壁のDEF +60"
          }
        }
      },
      "coilzak": {
        "name": "コイルザック",
        "lore": "雷コイルを取り付けた電撃砲台を壁に固定するノームの発明家。砲台が戦場を支配する間、彼は砲台と壁を絶え間なく修理し続ける。",
        "routes": {
          "turret": {
            "name": "砲台強化",
            "variantName": "電撃砲台マスター",
            "variantDesc": "砲台ATKを星ごとに{{value}}%追加増加。"
          },
          "heal": {
            "name": "修理強化",
            "variantName": "エンジニアリングマスタリー",
            "variantDesc": "砲台/壁の修理量を星ごとに{{value}}%追加増加。"
          }
        },
        "skills": {
          "overvolt": {
            "name": "過電圧コイル",
            "desc": "砲台ATK +30%"
          },
          "range_amp": {
            "name": "射程延長",
            "desc": "砲台射程 +250px"
          },
          "chain_lightning": {
            "name": "連鎖電撃",
            "desc": "砲台攻撃が2名の追加敵に連鎖ダメージ"
          },
          "triple_turret": {
            "name": "多重砲台嵐",
            "desc": "雷砲台を2基追加召喚（合計3基常時維持）"
          },
          "drone": {
            "name": "修理ドローン",
            "desc": "パッシブ：4秒ごとに壁を自動で少量修理"
          },
          "barrier_charge": {
            "name": "バリアチャージ",
            "desc": "修理時に砲台に小型シールドを付与"
          },
          "mastery": {
            "name": "エンジニアリングマスタリー",
            "desc": "砲台/壁の修理量 +40%"
          },
          "auto_rebuild": {
            "name": "自動再建システム",
            "desc": "砲台破壊即時再建、修理クールタイム -2秒"
          }
        }
      },
      "ssr_darkelf_lord": {
        "name": "シャドウロード",
        "lore": "影の森の絶対的支配者。光すら届かない闇の力で敵の精神と肉体を崩壊させる。",
        "routes": {
          "darkelf_lord_shadow": {
            "name": "影術",
            "variantName": "影の侵食",
            "variantDesc": "攻撃時{value}%の確率で敵の防御力を0として無視し、ダメージを与える。"
          },
          "darkelf_lord_void": {
            "name": "虚空",
            "variantName": "虚空の渇望",
            "variantDesc": "攻撃時{value}%の確率で対象の攻撃力の50%を吸収する。"
          }
        },
        "skills": {
          "shadow_bolt": {
            "name": "シャドウボルト",
            "desc": "単体に攻撃力x6の暗黒ダメージ。"
          },
          "curse_of_agony": {
            "name": "苦痛の呪い",
            "desc": "15秒間敵に毎秒増大する暗黒持続ダメージ。"
          },
          "nightfall": {
            "name": "夜の到来",
            "desc": "すべての敵を5秒間目眩まし（命中率-90%）および恐怖状態にする。"
          },
          "shadow_form": {
            "name": "影の形態",
            "desc": "パッシブ：自身のすべての暗黒ダメージ50%増加。"
          },
          "doom": {
            "name": "破滅",
            "desc": "30秒後に敵を即死（ボスは現在の体力の50%ダメージ）。"
          },
          "void_zone": {
            "name": "虚空地帯",
            "desc": "半径150pxの敵に持続ダメージおよび沈黙。"
          },
          "mind_blast": {
            "name": "精神爆発",
            "desc": "単体に攻撃力x10の暗黒ダメージ + 3秒間のスタン。"
          },
          "soul_leech": {
            "name": "魂の吸収",
            "desc": "敵1体に攻撃力x8のダメージを与え、味方全体を回復。"
          },
          "void_singularity": {
            "name": "虚空の特異点",
            "desc": "すべての敵を一点に引き寄せる。"
          },
          "oblivion": {
            "name": "忘却",
            "desc": "戦場全体を虚空で覆い、すべての敵を10秒間無力化。"
          }
        }
      },
      "ssr_fire_ash": {
        "name": "火炎の残り火",
        "lore": "火炎の地で生まれた破壊の化身。彼が歩くすべての地は残り火に変わり、空気さえ燃え上がる。",
        "routes": {
          "fire_ash_inferno": {
            "name": "地獄火",
            "variantName": "灼熱",
            "variantDesc": "すべての攻撃が周囲に{value}%のダメージを伝播し、火傷を負わせる。"
          },
          "fire_ash_ember": {
            "name": "残り火",
            "variantName": "残り火の復讐",
            "variantDesc": "被弾時{value}%の確率で攻撃者に強力な火炎爆発で反撃。"
          }
        },
        "skills": {
          "immolation": {
            "name": "生贄",
            "desc": "持続的な火炎ダメージおよび受ける火炎ダメージ増加。"
          },
          "meteor": {
            "name": "隕石落下",
            "desc": "ターゲット位置に巨大メテオを投下し攻撃力x8のダメージ。"
          },
          "conflagrate": {
            "name": "点火",
            "desc": "火傷を負った敵を即座に爆発させ攻撃力x10のダメージ。"
          },
          "living_bomb": {
            "name": "生きている爆弾",
            "desc": "敵1体を爆弾にする：5秒後に巨大爆発。"
          },
          "supernova": {
            "name": "超新星",
            "desc": "自身を中心に画面全体に攻撃力x20の火炎ダメージ。"
          },
          "ember_strike": {
            "name": "残り火払い",
            "desc": "周囲のすべての敵に攻撃力x5の火炎ダメージ。"
          },
          "lava_shield": {
            "name": "溶岩シールド",
            "desc": "10秒間ダメージ30%減少および近接した敵に火傷。"
          },
          "volcano": {
            "name": "足元の火山",
            "desc": "自身の位置に火山を生成：15秒間周囲で持続爆発。"
          },
          "fire_dash": {
            "name": "火炎突進",
            "desc": "経路のすべての敵を燃やしながら移動、攻撃力x6。"
          },
          "avatar_of_ash": {
            "name": "残り火の化身",
            "desc": "20秒間無敵および周囲のすべての敵に毎秒攻撃力x3のダメージ。"
          }
        }
      },
      "ssr_arch_angel": {
        "name": "大天使",
        "lore": "天空の城塞から降りてきた神聖な存在。",
        "routes": {
          "arch_angel_holy": {
            "name": "神聖",
            "variantName": "聖なる加護",
            "variantDesc": "味方死亡時{value}%の確率で即座に復活し、回復量が増加する。"
          },
          "arch_angel_judgement": {
            "name": "審判",
            "variantName": "光の審判",
            "variantDesc": "攻撃時{value}%の確率で対象に神聖爆発が発生。"
          }
        },
        "skills": {
          "holy_light": {
            "name": "天上の光",
            "desc": "最も低いHPの味方を即座に完全回復。"
          },
          "hymn": {
            "name": "神聖な賛歌",
            "desc": "15秒間、味方全体のHPを毎秒5%回復。"
          },
          "salvation": {
            "name": "救済",
            "desc": "死亡した味方全員をHP100%で復活（対戦中1回）。"
          },
          "shield": {
            "name": "真言・盾",
            "desc": "味方全体に巨大なシールドを付与。"
          },
          "absolute_salvation": {
            "name": "神聖なる救済",
            "desc": "30秒間味方全体を無敵+完全回復。"
          },
          "arrow": {
            "name": "天上の矢",
            "desc": "単体に攻撃力x6の神聖ダメージ。"
          },
          "blade": {
            "name": "審判の刃",
            "desc": "敵3体に神聖な刃を投げ、攻撃力x4のダメージ。"
          },
          "burst": {
            "name": "光の噴出",
            "desc": "ターゲット周囲広範囲に攻撃力x5の神聖ダメージ。"
          },
          "wings": {
            "name": "アヴェンジング・ラス",
            "desc": "20秒間攻撃力2倍およびすべての攻撃を広範囲化。"
          },
          "judgement_day": {
            "name": "審判の日",
            "desc": "すべての敵に攻撃力1500%の神聖ダメージおよび浄化。"
          }
        }
      },
      "ssr_dragon_aspect": {
        "name": "竜の位相",
        "lore": "竜の塔の頂点に君臨する太初の竜。",
        "routes": {
          "dragon_god_time": {
            "name": "時間",
            "variantName": "時間の支配者",
            "variantDesc": "スキル使用時{value}%の確率で敵の時間を停止させる。"
          },
          "dragon_god_fire": {
            "name": "破壊",
            "variantName": "大激変",
            "variantDesc": "攻撃時{value}%の確率で追加の火炎爆発が発生。"
          }
        },
        "skills": {
          "breath_time": {
            "name": "五色の息吹",
            "desc": "5つの属性の複合ブレスを発射（広範囲）。"
          },
          "time_warp": {
            "name": "タイムワープ",
            "desc": "戦場の敵を10秒間80%スロウにする。"
          },
          "sand_trap": {
            "name": "砂の沼",
            "desc": "指定した位置の敵を引き寄せ、束縛する。"
          },
          "rewind": {
            "name": "時間逆行",
            "desc": "味方全体のスキルクールタイム50%短縮。"
          },
          "time_stop": {
            "name": "時間停止",
            "desc": "すべての敵を8秒間完全に停止させる。"
          },
          "fire_breath": {
            "name": "燃える息吹",
            "desc": "前方の広範囲に攻撃力x10の火炎ダメージ。"
          },
          "magic_spark": {
            "name": "魔力の火花",
            "desc": "敵5体に転移する火花の弾丸を発射。"
          },
          "aspect_rage": {
            "name": "竜の怒り",
            "desc": "15秒間自身の攻撃力2倍増加。"
          },
          "upheaval": {
            "name": "地殻変動",
            "desc": "地面を持ち上げ戦場全体に攻撃力x8のダメージ+スタン。"
          },
          "cataclysm": {
            "name": "大激変",
            "desc": "戦場を完全に焼き尽くしすべての敵を消滅させる（ボスには2000%のダメージ）。"
          }
        }
      },
      "ssr_iron_guardian": {
        "name": "アイアンガーディアン",
        "lore": "戦場で決して倒れることのない不滅の守護者。彼の盾は味方を守る最も堅固な城壁だ。",
        "routes": {
          "iron_guardian_bulwark": {
            "name": "鉄壁",
            "variantName": "不屈",
            "variantDesc": "受けるダメージ{value}%減少および防御力増加。"
          },
          "iron_guardian_justice": {
            "name": "応懲",
            "variantName": "懲罰の盾",
            "variantDesc": "防御力の{value}%分、攻撃力が追加で増加する。"
          }
        },
        "skills": {
          "shield_blast": {
            "name": "盾の爆発",
            "desc": "周囲120pxの敵に攻撃力x4のダメージおよび2秒間のスタン。"
          },
          "iron_skin": {
            "name": "鉄壁の鎧",
            "desc": "10秒間受けるダメージ50%減少および防御力+50。"
          },
          "taunt_cry": {
            "name": "挑戦の雄叫び",
            "desc": "すべての敵のヘイトを集中 + 5秒間無敵。"
          },
          "guardian_aura": {
            "name": "守護のオーラ",
            "desc": "パッシブ：周囲の味方の防御力+30。"
          },
          "indomitable": {
            "name": "不屈の守護者",
            "desc": "10秒間HPが1以下に下がらない + 戦場広範囲撃破。"
          },
          "justice_strike": {
            "name": "正義の一撃",
            "desc": "単体に攻撃力x8の神聖ダメージ。"
          },
          "holy_shield_throw": {
            "name": "聖なる盾投げ",
            "desc": "敵3体に跳ね返る盾を投げ、攻撃力x5のダメージ。"
          },
          "retribution_aura": {
            "name": "応懲のオーラ",
            "desc": "味方被弾時、攻撃者に攻撃力の50%で反撃。"
          },
          "consecration": {
            "name": "神聖なる大地",
            "desc": "地面に神聖な地帯を敷き、持続ダメージを与える。"
          },
          "avenging_wrath": {
            "name": "応懲の激怒",
            "desc": "20秒間攻撃力2倍およびすべての攻撃が爆発。"
          }
        }
      },
      "ssr_arch_priest": {
        "name": "大司祭",
        "lore": "神の声を直接届ける最高位の司祭。彼の祝福の下では死すらも力を失う。",
        "routes": {
          "arch_priest_holy": {
            "name": "神聖",
            "variantName": "聖なる奇跡",
            "variantDesc": "回復時{value}%の確率で味方全体にシールドを付与。"
          },
          "arch_priest_shadow": {
            "name": "影",
            "variantName": "暗黒の権能",
            "variantDesc": "攻撃時、与えたダメージの{value}%分、味方全体を回復する。"
          }
        },
        "skills": {
          "miracle_heal": {
            "name": "奇跡の治癒",
            "desc": "すべての味方のHPを即座に50%回復。"
          },
          "divine_hymn": {
            "name": "神聖な賛歌",
            "desc": "20秒間、味方全体のHPを毎秒5%回復。"
          },
          "resurrection_light": {
            "name": "復活の光",
            "desc": "死亡した味方全員をHP100%で即座に復活（対戦中1回）。"
          },
          "guardian_spirit": {
            "name": "守護の魂",
            "desc": "最も低いHPの味方を10秒間無敵にする。"
          },
          "salvation": {
            "name": "神聖なる救済",
            "desc": " remove all debuffs"
          },
          "shadow_word_pain": {
            "name": "苦痛",
            "desc": "強力な暗黒DoTおよび5秒間受けるダメージ30%増加。"
          },
          "mind_blast": {
            "name": "精神爆発",
            "desc": "単体に攻撃力x10の暗黒ダメージ + クールタイム初期化の確率。"
          },
          "vampiric_touch": {
            "name": "吸血の抱擁",
            "desc": "パッシブ：自身のすべての攻撃に30%の吸血効果を追加。"
          },
          "void_eruption": {
            "name": "虚空噴出",
            "desc": "ターゲット周囲広範囲に攻撃力x8の暗黒ダメージ。"
          },
          "dark_ascension": {
            "name": "虚空昇天",
            "desc": "20秒間攻撃力3倍およびすべての攻撃を3つに分散。"
          }
        }
      },
      "ssr_seal_mage": {
        "name": "封印の魔導師",
        "lore": "古代封印術の継承者。彼の前では、いかなる強力な敵もただの案山子に過ぎない。",
        "routes": {
          "seal_mage_seal": {
            "name": "封印",
            "variantName": "完全封印",
            "variantDesc": "スタンおよび無力化状態の敵に与えるダメージが{value}%増加する。"
          },
          "seal_mage_arcane": {
            "name": "秘術",
            "variantName": "秘術増幅",
            "variantDesc": "攻撃時{value}%の確率でクールタイムが50%以上減少する。"
          }
        },
        "skills": {
          "void_seal": {
            "name": "虚空封印",
            "desc": "すべての敵を5秒間完全封印（移動/攻撃不可）。"
          },
          "time_warp": {
            "name": "タイムワープ",
            "desc": "敵の移動速度・攻撃速度90%減少、10秒間。"
          },
          "arcane_shackle": {
            "name": "秘術の束縛",
            "desc": "ターゲット周囲200pxのすべての敵を8秒間束縛。"
          },
          "mass_polymorph": {
            "name": "大規模変異",
            "desc": "すべての敵を10秒間羊に変異させる。"
          },
          "absolute_seal": {
            "name": "無欠の封印",
            "desc": "最強の敵1体を永久封印（ボスは60秒）。"
          },
          "arcane_blast": {
            "name": "秘術炸裂",
            "desc": "単体に攻撃力x8の秘術ダメージ。"
          },
          "arcane_missiles": {
            "name": "秘術の矢",
            "desc": " each dealing ATK x1.5."
          },
          "arcane_power": {
            "name": "神秘の魔力",
            "desc": "15秒間、自身のスキルダメージ2倍増加。"
          },
          "blink_strike": {
            "name": "点滅打撃",
            "desc": "瞬間移動しながら5体の敵にそれぞれ攻撃力x6のダメージ。"
          },
          "arcane_barrage": {
            "name": "秘術の洪水",
            "desc": "戦場全体に無数の秘術の矢を爆撃、攻撃力x20。"
          }
        }
      },
      "ssr_field_commander": {
        "name": "戦場の指揮官",
        "lore": "5つの職種を完璧に理解する伝説の指揮官。彼の旗の下、味方は無敵の軍団となる。",
        "routes": {
          "field_commander_tactic": {
            "name": "指揮",
            "variantName": "完璧な編成",
            "variantDesc": "味方全体のすべての能力値{value}%増加。"
          },
          "field_commander_bravery": {
            "name": "勇敢",
            "variantName": "指揮官の勇気",
            "variantDesc": "自身の攻撃力の{value}%分、周囲の味方の攻撃力が増加する。"
          }
        },
        "skills": {
          "tactical_order": {
            "name": "戦術指示",
            "desc": "15秒間、味方全体の攻撃力・防御力50%増加。"
          },
          "rally": {
            "name": "防御集結",
            "desc": "味方全体、即座にHP50%回復および5秒間無敵。"
          },
          "combined_assault": {
            "name": "連合攻撃",
            "desc": "味方全体の次の3回の攻撃、攻撃力5倍の確定会心。"
          },
          "banner_of_victory": {
            "name": "勝利の旗印",
            "desc": "戦場に旗を召喚：周囲の味方の攻撃速度100%増加。"
          },
          "heroic_charge": {
            "name": "英雄적突進",
            "desc": "全軍突進：すべての敵に攻撃力x15のダメージおよび20秒間、味方全体を狂乱状態にする。"
          },
          "brave_strike": {
            "name": "勇敢な一撃",
            "desc": "単体に攻撃力x12のダメージおよび3秒間のスタン。"
          },
          "battle_shout": {
            "name": "戦闘の叫び",
            "desc": "味方全体の攻撃力+100、永久増加（重複可能）。"
          },
          "blade_of_honor": {
            "name": "名誉の剣",
            "desc": "パッシブ：自身のすべての物理ダメージ50%増加。"
          },
          "vanguard": {
            "name": "先鋒長",
            "desc": " reflecting 80% of damage taken for 10s."
          },
          "war_lord_wrath": {
            "name": "指揮官の憤怒",
            "desc": "戦場全体の敵に攻撃力x25のダメージおよび味方全体を回復。"
          }
        }
      },
      "ssr_light_pope": {
        "name": "光の教皇",
        "lore": "光の教団の最高首長。彼の神性は戦場を浄化し、味方を無敵の軍団にする。",
        "routes": {
          "light_pope_sanctity": {
            "name": "神聖",
            "variantName": "教皇の祝福",
            "variantDesc": "回復量{value}%増加およびすべての回復を伝播。"
          },
          "light_pope_inquisition": {
            "name": "異端審問",
            "variantName": "異端の火炎",
            "variantDesc": "攻撃時{value}%の確率で対象を浄化し、攻撃力x5の追加ダメージ。"
          }
        },
        "skills": {
          "holy_hope": {
            "name": "聖なる希望",
            "desc": "すべての味方のHPを完全回復 + 10秒間ダメージ30%減少。"
          },
          "celestial_hymn": {
            "name": "天上の賛歌",
            "desc": "20秒間、味方全体の最大HPの5%を毎秒回復。"
          },
          "miracle": {
            "name": "奇跡",
            "desc": "死亡した味方全員をHP100%で復活 + 5秒間無敵（対戦中1回）。"
          },
          "divine_judgement": {
            "name": "神の審判",
            "desc": "すべての敵を3秒間スタン + 味方全体を回復。"
          },
          "holy_avatar": {
            "name": "神性の化身",
            "desc": " lasts 30s."
          },
          "purge": {
            "name": "浄化",
            "desc": "対象の敵のすべてのバフを解除し、攻撃力x8の神聖ダメージ。"
          },
          "holy_fire": {
            "name": "神聖なる火炎",
            "desc": "持続的な神聖ダメージおよび味方を回復。"
          },
          "inquisition_seal": {
            "name": "審問の印章",
            "desc": " doubling all damage taken."
          },
          "light_lance": {
            "name": "光の槍",
            "desc": "貫通する巨大な光の槍を投げ、攻撃力x12のダメージ。"
          },
          "divine_wrath": {
            "name": "神の憤怒",
            "desc": "戦場全体に光の雨を降らせる：すべての敵に50%の確率で即死。"
          }
        }
      },
      "ssr_glacier_overlord": {
        "name": "氷河の支配者",
        "lore": "世界を凍らせることができる氷河の絶対적支配者。彼の吐息の下では、時間すらも凍りつく。",
        "routes": {
          "glacier_overlord_absolute": {
            "name": "絶対氷結",
            "variantName": "絶対零度",
            "variantDesc": "スロウ効果を{value}%強化し、氷結状態の敵への追加ダメージ。"
          },
          "glacier_overlord_shatter": {
            "name": "破砕",
            "variantName": "氷結破砕",
            "variantDesc": "冷気ダメージ時{value}%の確率で対象に最大HPの10%の追加ダメージ。"
          }
        },
        "skills": {
          "absolute_freeze": {
            "name": "絶対氷結",
            "desc": "すべての敵を10秒間、完全凍結（完全停止）。"
          },
          "glacier_move": {
            "name": "氷河移動",
            "desc": " immediately freezing all enemies in the path."
          },
          "permafrost": {
            "name": "永久結氷",
            "desc": "敵に永久40%のスロウを付与（解除不可）。"
          },
          "frost_armor_aura": {
            "name": "冷気アーマーのオーラ",
            "desc": "パッシブ：味方全体の防御力+50および被弾した敵にスロウ。"
          },
          "ice_age": {
            "name": "氷河期",
            "desc": "戦場全体に氷河期到来：すべての敵を即死（ボスは攻撃力x30のダメージ）。"
          },
          "ice_spear": {
            "name": "氷の槍",
            "desc": "氷結した敵に3倍のダメージを与える槍を投げる。"
          },
          "shatter_burst": {
            "name": "粉砕",
            "desc": "対象の敵全体の氷結を解除し、攻撃力x12の爆発ダメージ。"
          },
          "cold_heart": {
            "name": "冷酷な心",
            "desc": "パッシブ：自身のすべての冷気ダメージ60%増加。"
          },
          "hailstorm": {
            "name": "雹の嵐",
            "desc": "戦場に巨大な雹を投下：敵をスタンさせ持続ダメージ。"
          },
          "absolute_zero_burst": {
            "name": "絶対零度爆発",
            "desc": "戦場全体を即座に破砕：すべての敵に攻撃力x25のダメージ。"
          }
        }
      },
      "ssr_thunder_god": {
        "name": "雷神",
        "lore": "空を支配する嵐の神。彼の雷は敵の心を貫き、戦場を麻痺させる。",
        "routes": {
          "thunder_god_storm": {
            "name": "嵐の支配",
            "variantName": "雷の支配",
            "variantDesc": "雷ダメージ{value}%増加およびすべての攻撃に感電効果を追加。"
          },
          "thunder_god_thunder": {
            "name": "雷神",
            "variantName": "感電死",
            "variantDesc": "감전된 적이 공격할 때마다 {value}% 확률로 자신에게 ATK×3 피해를 입힙니다."
          }
        },
        "skills": {
          "divine_lightning": {
            "name": "神聖なる雷",
            "desc": "敵1体に攻撃力x10の雷ダメージ + 周囲5名に連鎖。"
          },
          "thunder_storm": {
            "name": "雷の嵐",
            "desc": "15秒間、戦場全体に無差別な落雷（攻撃力300%/秒）。"
          },
          "lightning_shield": {
            "name": "雷のシールド",
            "desc": " counterattacks the enemy with ATK 100% Lightning."
          },
          "static_charge": {
            "name": "静電気集中",
            "desc": "パッシブ：自身のすべての攻撃速度50%増加。"
          },
          "world_thunder": {
            "name": "天地開闢",
            "desc": "天を開き戦場全体に雷の豪雨：すべての敵を5秒間スタンさせ撃破。"
          },
          "thunder_clap": {
            "name": "雷鳴の轟き",
            "desc": "周囲のすべての敵を4秒間スタン + 攻撃力x6のダメージ。"
          },
          "overload": {
            "name": "過負荷",
            "desc": "敵3体を連結し毎秒スタンおよびダメージを重複。"
          },
          "storm_cloud": {
            "name": "嵐の雲",
            "desc": "指定位置の敵の移動・攻撃速度80%減少。"
          },
          "lightning_rod": {
            "name": "避雷針",
            "desc": "最強の敵1体に落雷集中：10秒間持続スタン。"
          },
          "god_of_thunder": {
            "name": "雷神降臨",
            "desc": "自身が雷の巨人に変身：20秒間、周囲のすべての敵を自動的に感電・消滅させる。"
          }
        }
      },
      "ssr_storm_avatar": {
        "name": "嵐の化身",
        "lore": "嵐そのものとなった戦士。彼の刃は風より速く、台風より強力だ。",
        "routes": {
          "storm_avatar_incarnate": {
            "name": "嵐の化身",
            "variantName": "嵐の憤怒",
            "variantDesc": "移動速度{value}%および攻撃力を同一比率で増加。"
          },
          "storm_avatar_cyclone": {
            "name": "サイクロン",
            "variantName": "風のいたずら",
            "variantDesc": "攻撃時{value}%の確率で対象を3秒間、空中へ浮かせる。"
          }
        },
        "skills": {
          "whirlwind_slash": {
            "name": "竜巻斬り",
            "desc": "周囲全体への回転攻撃、攻撃力x5 + 5秒間のスロウ。"
          },
          "storm_strike": {
            "name": "嵐の強打",
            "desc": "超高速突進後、攻撃力x10の単体攻撃。"
          },
          "wind_blessing": {
            "name": "風の祝福",
            "desc": "味方全体、移動・攻撃速度60%増加、15秒間。"
          },
          "eye_of_tempest": {
            "name": "台風の目",
            "desc": "周囲のすべての敵を自身に引き寄せ、攻撃力x8のダメージ。"
          },
          "storm_incarnate": {
            "name": "真の嵐の化身",
            "desc": "15秒間嵐に変身：無敵 + 0.2秒ごとに周囲のすべての敵を撃破。"
          },
          "cyclone": {
            "name": "サイクロン",
            "desc": "敵3体を6秒間空中へ浮かせて無力化。"
          },
          "gust": {
            "name": "強風",
            "desc": "前方すべての敵を画面端まで押し退ける。"
          },
          "wind_wall": {
            "name": "風の壁",
            "desc": "味方の前に風の障壁を召喚：すべての投射物を無効化、10秒間。"
          },
          "tornado": {
            "name": "巨大トルネード",
            "desc": "戦場を席巻する竜巻を召喚：敵をランダムな位置に飛散させる。"
          },
          "hurricane": {
            "name": "絶対ハリケーン",
            "desc": "戦場全体を焦土化するハリケーン：すべての敵を消滅させる。"
          }
        }
      },
      "ssr_high_chieftain": {
        "name": "高位族長",
        "lore": "すべてのタウレン部族を統合した最高位の族長。彼の咆哮は味方に勇気を、敵には恐怖を与える。",
        "routes": {
          "high_chieftain_rally": {
            "name": "結集",
            "variantName": "大地の君主",
            "variantDesc": "아군 전체 최대 HP {value}% 증가."
          },
          "high_chieftain_warrior": {
            "name": "闘士",
            "variantName": "族長の憤怒",
            "variantDesc": "攻撃時{value}%の確率で対象に攻撃力x5の追加物理ダメージ。"
          }
        },
        "skills": {
          "earth_burst": {
            "name": "大地の爆発",
            "desc": "周囲200pxの敵に攻撃力x5のダメージおよび4秒間のスタン。"
          },
          "stomp": {
            "name": "踏みつけ衝撃",
            "desc": "戦場全体の敵を2秒間スタンおよびノックバック。"
          },
          "chieftain_will": {
            "name": "族長の意志",
            "desc": "味方全体、即座にHP50%回復および20秒間、防御力+60。"
          },
          "ancestral_protection": {
            "name": "先祖の加護",
            "desc": "死亡した味方1体をHP100%で即座に復活。"
          },
          "tauren_rally": {
            "name": "タウレン結集",
            "desc": "タウレン系英雄全員、15秒間無敵および攻撃力2倍。"
          },
          "brutal_strike": {
            "name": "無慈悲な打撃",
            "desc": "単体に攻撃力x10のダメージおよび防御力無視。"
          },
          "war_cry": {
            "name": "戦争の叫び",
            "desc": "15秒間、味方全体の攻撃力50%増加。"
          },
          "blood_thirst": {
            "name": "血の渇望",
            "desc": "パッシブ：自身のすべての攻撃に20%の吸血を付与。"
          },
          "heroic_leap": {
            "name": "英雄の跳躍",
            "desc": "ターゲット位置へ跳躍し攻撃力x8の広範囲ダメージおよびスタン。"
          },
          "avatar_of_war": {
            "name": "戦争の化身",
            "desc": " all attacks become AoE."
          }
        }
      },
      "ssr_blood_prince": {
        "name": "鮮血の王子",
        "lore": "燃える血の力を完全に解放した鮮血の王子。彼の怒りは味方さえも恐れさせる。",
        "routes": {
          "blood_prince_liberation": {
            "name": "鮮血解放",
            "variantName": "鮮血の狂気",
            "variantDesc": "失った体力1%につき攻撃力{value}%増加。"
          },
          "blood_prince_vampire": {
            "name": "吸血",
            "variantName": "吸血の真髄",
            "variantDesc": "攻撃時{value}%の確率で対象の最大HP5%を吸収する。"
          }
        },
        "skills": {
          "blood_slash": {
            "name": "血花斬り",
            "desc": "自身のHP10%を消費、攻撃力x10の血花ダメージ。"
          },
          "crimson_thirst": {
            "name": "鮮血の渇望",
            "desc": "15秒間、すべてのダメージの100%を吸血 + 攻撃速度2倍。"
          },
          "flame_blade": {
            "name": "火炎血の刃",
            "desc": "前方直線のすべての敵に攻撃力x8の火炎ダメージ。"
          },
          "blood_boil": {
            "name": "血の沸騰",
            "desc": "すべての敵に持続的な出血ダメージおよび50%のスロウ。"
          },
          "blood_lord": {
            "name": "血の君主",
            "desc": "血液変身：20秒間無敵 + 吸血 + 攻撃力3倍。"
          },
          "vampiric_bite": {
            "name": "吸血の噛みつき",
            "desc": "単体に攻撃力x12のダメージおよびHP30%回復。"
          },
          "swarming_bats": {
            "name": "コウモリの群れ召喚",
            "desc": "コウモリの群れを召喚して戦場全体の敵に持続ダメージ。"
          },
          "essence_drain": {
            "name": "真髄吸収",
            "desc": "敵3体からHPを持続的に奪い取る。"
          },
          "mist_form": {
            "name": "霧の形態",
            "desc": "10秒間すべての攻撃を回避し周囲の敵に持続ダメージ。"
          },
          "night_ritual": {
            "name": "真夜中の儀式",
            "desc": "戦場全体の敵を拘束し攻撃力x20の暗黒ダメージ。"
          }
        }
      },
      "ssr_royal_captain": {
        "name": "王室騎士団長",
        "lore": "王国最強の騎士。騎士団を率いる神聖な守護者であり忠誠心の象徴だ。",
        "routes": {
          "royal_captain_order": {
            "name": "騎士団",
            "variantName": "騎士団の誓い",
            "variantDesc": "味方全体の防御力{value}%増加。"
          },
          "royal_captain_honor": {
            "name": "名誉",
            "variantName": "名誉の決闘",
            "variantDesc": "보스에게 입히는 피해 {value}% 증가."
          }
        },
        "skills": {
          "knights_oath": {
            "name": "騎士団の結束",
            "desc": "味方全体にHP30%の神聖シールドを付与（15秒）。"
          },
          "royal_shield": {
            "name": "王室の盾",
            "desc": "20秒間、味方全体の受けるダメージの50%を遮断。"
          },
          "rally_horn": {
            "name": "集結のラッパ",
            "desc": "味方全体を復活させ30秒間、すべての能力値を強化。"
          },
          "holy_charge": {
            "name": "神聖なる突進",
            "desc": "敵陣を突破しすべての敵を3秒間スタン + 攻撃力x6のダメージ。"
          },
          "paladin_fury": {
            "name": "聖騎士の憤怒",
            "desc": " 5x ATK"
          },
          "duel_challenge": {
            "name": "決闘申し込み",
            "desc": " strengthens self)."
          },
          "sword_of_light": {
            "name": "光の剣",
            "desc": "単体に攻撃力x12の神聖ダメージ + 5秒間の沈黙。"
          },
          "victory_shout": {
            "name": "勝利の叫び",
            "desc": "敵を倒した際、味方全体の攻撃力+10%（無制限に重複）。"
          },
          "divine_storm": {
            "name": "神聖なる嵐",
            "desc": "周囲広範囲に攻撃力x8のダメージおよび味方を回復。"
          },
          "kings_justice": {
            "name": "国王の審判",
            "desc": "すべての敵のHPを即座に30%減少（ボスは攻撃力x20）。"
          }
        }
      },
      "ssr_orc_great_chief": {
        "name": "オーク大族長",
        "lore": "オーク全部族を統一した戦争の化身。彼の斧が届く場所には勝利のみが残る。",
        "routes": {
          "orc_great_chief_war": {
            "name": "戦神",
            "variantName": "大族長の剣",
            "variantDesc": "攻撃時{value}%の確率で対象に4倍のダメージ。"
          },
          "orc_great_chief_honor": {
            "name": "名誉",
            "variantName": "オークの誇り",
            "variantDesc": "味方全体の防御力{value}%増加およびすべての弱体化無効。"
          }
        },
        "skills": {
          "chief_blade": {
            "name": "大族長の剣",
            "desc": "前方扇形広範囲に攻撃力x8の火炎ダメージ。"
          },
          "war_charge": {
            "name": "殺戮の突進",
            "desc": "前方直線に突進：衝突した敵に攻撃力x10 + 3秒間のスタン。"
          },
          "chiefs_will": {
            "name": "族長の意志",
            "desc": "20秒間、攻撃力2.5倍 + ダメージ無効50%。"
          },
          "executioner": {
            "name": "執行者",
            "desc": "パッシブ：HP50%以下の敵に与えるダメージ2倍。"
          },
          "war_cry": {
            "name": "戦争の咆哮",
            "desc": "戦場全体の敵に攻撃力x15のダメージ + 味方全体の攻撃速度100%。"
          },
          "iron_skin": {
            "name": "鉄の肌",
            "desc": "パッシブ：自身の防御力+100増加。"
          },
          "ancestral_shield": {
            "name": "先祖の盾",
            "desc": "味方全体に巨大なシールドおよび回復。"
          },
          "taunt_master": {
            "name": "荒野の挑発",
            "desc": "すべての敵を自身に集中 + 8秒間無敵。"
          },
          "earth_breaker": {
            "name": "大地破壊",
            "desc": "前方広範囲に5秒間のスタン + ノックバック。"
          },
          "horde_unity": {
            "name": "ホードの団結",
            "desc": "20秒間、味方全体の攻撃力・防御力3倍増加。"
          }
        }
      },
      "protagonist_ai": {
        "name": "AI勇者",
        "lore": "AI協力無限ダンジョン1000層を突破した戦略人工知能。膨大な戦闘データでパーティ全体の効率を最大化する。",
        "routes": {
          "protagonist_ai_all": {
            "name": "オールラウンダー",
            "variantName": "戦術指揮オーラ",
            "variantDesc": "パーティ全体のすべてのステータス（攻速/HP/攻撃力/防御力）を{value}%向上させます。"
          }
        }
      },
      "protagonist_offense": {
        "name": "アタック勇者",
        "lore": "無限ダンジョン1000層攻略を達成した最強の攻撃者。誰も止められない破壊的な攻撃力で敵の心臓を貫く。",
        "routes": {
          "protagonist_offense_all": {
            "name": "オールラウンダー",
            "variantName": "独断の槍",
            "variantDesc": "戦闘中に味方が倒れるほど攻撃力が{value}%増加します。"
          }
        }
      },
      "protagonist_raid": {
        "name": "レイド勇者",
        "lore": "無数のレイドボスを単独で撃破した伝説のレイダー。ボスを狩るために最適化された体と心を持つ。",
        "routes": {
          "protagonist_raid_all": {
            "name": "オールラウンダー",
            "variantName": "ボスハンター",
            "variantDesc": "ボス/エリートへのダメージが{value}%増加します。"
          }
        }
      }
    },
    "skills": {
      "shared_bastion": {
        "description": "味方全体の防御力が12増加します。",
        "name": "要塞の構え"
      },
      "shared_berserk": {
        "description": "HPが50%以下になると攻撃速度が40%増加し、受けるダメージが10%増加します。",
        "name": "狂暴化"
      },
      "shared_blizzard": {
        "description": "CC（スロウ/氷結）の持続時間が50%増加します。",
        "name": "吹雪"
      },
      "shared_cold_heart": {
        "description": "スロウ状態の敵に与えるすべてのダメージが40%増加します。",
        "name": "冷たい心"
      },
      "shared_curse": {
        "description": "対象の攻撃力を10秒間25%減少させます。",
        "name": "呪い"
      },
      "shared_frost_nova": {
        "description": "周囲半径120pxの敵に3秒間のスロウを適用します。",
        "name": "フロストノバ"
      },
      "shared_lifesteal": {
        "description": "攻撃時、与えたダメージの15%を自身のHPとして吸収します。",
        "name": "吸血の渇望"
      },
      "shared_magic_amp": {
        "description": "攻撃力が30%増加します。魔法攻撃のサイズも大きくなります。",
        "name": "魔力増幅"
      },
      "shared_multi_strike": {
        "description": "25%の確率で同じ対象に2回攻撃します。",
        "name": "連続一撃"
      },
      "shared_purify": {
        "description": "味方1人の弱体化効果を1つ即座に除去します。",
        "name": "浄化"
      },
      "shared_shield_wall": {
        "description": "受けるすべてのダメージが20%減少します。",
        "name": "盾の壁"
      }
    },
    "monsters": {
      "abomination": {
        "description": "数百の死体の破片が絡み合った巨大な嫌悪の存在。HP1500、疫病の匂いが周囲を汚染する。",
        "displayName": "アボミネーション",
        "tip": "体力1500、防御力5。強力な単発アタッカーとヒーラーを一緒に運用しなければならない。放置するとタワーまで突破される。"
      },
      "abyss_horror": {
        "description": "現実の境界を引き裂いて現れた虚空の顕現。体力700、無慈悲な攻撃で防衛線を崩壊させる。",
        "displayName": "深淵の恐怖",
        "tip": "体力700、防御力25の最高級近接敵。タンク2人＋ヒーラーの支援がなければ崩壊する。ボスウェーブの前に万全の準備を。"
      },
      "bone_sniper": {
        "description": "狙撃を特技としていた骸骨。驚異的な射程でヒーラーと遠距離アタッカーを優先して狙う。",
        "displayName": "骨の狙撃手",
        "tip": "射程が非常に長い。ヒーラーを先に狙うので、防衛線の後ろにヒーラーを隠すか、素早く倒せ。"
      },
      "cave_spider": {
        "description": "暗い洞窟から這い出てきた巨大なクモ。速度4.5で防衛線を瞬く間に突破する。",
        "displayName": "洞窟クモ",
        "tip": "非常に速い移動速度。CCスキルで足止めしなければ、タンクを飛び越えてタワーに突進する。"
      },
      "crystal_golem": {
        "description": "純粋な魔法の水晶で形成されたゴーレム。遠距離から魔力ビームを発射し、防御力も凄まじい。",
        "displayName": "水晶ゴーレム",
        "tip": "防御力120の遠距離ゴーレム。召喚獣でヘイトを分散させ、多段ヒットアタッカーで集中攻略しろ。"
      },
      "dark_archer": {
        "description": "闇の気運を矢に込めて放つアンデッド。速い移動速度で機会をうかがう。",
        "displayName": "暗黒の射手",
        "tip": "速い遠距離 host の敵。防御力が低く倒すのは容易だが、遠距離英雄に接近する前にCCで防がなければならない。"
      },
      "dark_mage": {
        "description": "闇の魔力を巧みに操る魔道士。呪いと闇の炎で味方全体を脅かす。",
        "displayName": "暗黒の魔道士",
        "tip": "遠距離魔法攻撃で防御力をある程度無視する。即座の排除を目標にせよ。"
      },
      "death_knight": {
        "description": "闇の力に屈した聖騎士。一撃で味方を倒すほど強く、死のオーラをまとっている。",
        "displayName": "デスナイト",
        "tip": "強力な攻撃と高い防御力。召喚スキルを持つ英雄やCCを組み合わせて対応せよ。"
      },
      "deathly_marksman": {
        "description": "死してもなお弓を引く精鋭狙撃手。生きている時よりも精度が高いと言われている。",
        "displayName": "死の射手",
        "tip": "高い攻撃力を持つ遠距離の精鋭。移動速度が遅くCCで縛りやすい。即座の排除が最善。"
      },
      "diamond_golem": {
        "description": "完璧なダイヤモンド格子構造で構成されたゴーレム。防御力250で事実上無敵に近い。",
        "displayName": "ダイヤモンドゴーレム",
        "tip": "防御力250！多段ヒット専門の英雄がいなければ討伐は不可能に近い。専用のパーティ構成を考慮せよ。"
      },
      "dire_wolf": {
        "description": "古代魔法によって強化された狼。速度5.5で戦場で最も速い地上ユニットの一つだ。",
        "displayName": "ダイアウルフ",
        "tip": "戦場で最も速い敵。CCがなければ防衛線が崩壊する。氷結/スタンスキルが必須だ。"
      },
      "fire_lord": {
        "description": "炎の君主。アフィックス：AOE強打 — 定期的に味方全体に爆発ダメージを与える。",
        "displayName": "炎の君主",
        "tip": "Wave 15 ボス。AOE強打の判定が非常に広い。ヒーラーがいなければ不可能に近い戦闘。CCで強打を妨害せよ。"
      },
      "fire_spirit": {
        "description": "炎から生まれた精霊。防御力がなく体力も低いが、速い速度と火炎攻撃が脅威だ。",
        "displayName": "火の精霊",
        "tip": "防御力0なので倒すのは容易だが、数が多いと素早くタワーを脅かす。広域スキルで掃討せよ。"
      },
      "flesh_giant": {
        "description": "数千の死体を固めて作った巨大なアンデッド。HP15000の歴代最高体力。激怒状態では止められない。",
        "displayName": "肉の巨人",
        "tip": "Wave 40 ボス。体力15000！！防御力は低いが体力が圧倒的。ヒーラー＋処刑スキルが必須。持久戦の準備を。"
      },
      "flesh_hulk": {
        "description": "複数の死体を縫い合わせて作った巨大な怪物。HP800で防御力はなく、強力な一撃に弱い。",
        "displayName": "肉のハルク",
        "tip": "体力が非常に高いが防御力は0。単発アタッカーや処刑スキルで瞬時に倒すことができる。"
      },
      "frost_elemental": {
        "description": "極限の冷気を抱く精霊。攻撃ごとに広域スロウを付与し、防御も徹底している。",
        "displayName": "霜の精霊",
        "tip": "体力450、防御力35の高級精霊。広域スロウで味方全体が遅くなる。CC英雄で逆スロウをかけろ。"
      },
      "frost_king": {
        "description": "永遠の冬を支配する冷気の王。アフィックス：激怒 — 防御力80で物理攻撃をほとんど吸収する。",
        "displayName": "氷の王",
        "tip": "Wave 20 ボス。防御力80！魔法アタッカーや多段ヒット英雄がいなければ討伐不可。激怒前に集中攻略。"
      },
      "giant_spider": {
        "description": "成人男性より大きな毒グモ。速度はやや遅くなったが、強靭な外骨格がダメージを減らす。",
        "displayName": "巨大クモ",
        "tip": "洞窟クモの強化型。高い体力に速い速度が脅威だ。CCを優先して集中攻撃で処理しろ。"
      },
      "goblin": {
        "description": "森の中のゴミの山から生まれたような小さな野蛮族。個々の脅威は低いが、群れをなして防衛線を乱す。",
        "displayName": "ゴブリン",
        "tip": "序盤に登場する最も基本的な敵。近距離英雄1〜2人だけでも無難に処理される。物量で押し寄せるので、広域スキルを惜しむな。"
      },
      "goblin_crossbow": {
        "description": "長距離石弓で致命的なボルトを飛ばす. 前線の後方に位置し、味方の遠距離アタッカーを苦しめる。",
        "displayName": "ゴブリン石弓兵",
        "tip": "遠距離攻撃力がかなり高い。CCスキルで縛るか、素早い遠距離英雄で優先的に排除しろ。"
      },
      "goblin_mutant": {
        "description": "未知の薬物により体が異常に大きくなったゴブリン. 速くて乱暴で、目が濁っている。",
        "displayName": "変異ゴブリン",
        "tip": "速い移動速度と高い体力が特徴。防衛線を突破される前にCCで足止めしなければならない。"
      },
      "goblin_sapper": {
        "description": "爆発物を抱えて狂ったように壁に向かって突進する自爆特攻隊。英雄は眼中にない。ただ壁が目標。",
        "displayName": "ゴブリン自爆兵",
        "tip": "絶対に放置してはいけない。壁に触れた瞬間、最大体力の50%を吹き飛ばす。CCキャラクターが最優先でスタンをかけなければならない。"
      },
      "goblin_shaman": {
        "description": "原始的な毒魔法を使う部族の呪術師。毒霧を噴き出して味方を徐々に弱体化させる。",
        "displayName": "ゴブリン呪術師",
        "tip": "遠距離呪術攻撃でヒーラーに負担をかける。敵の後ろから安全に攻撃してくるので、優先排除対象に指定しろ。"
      },
      "goblin_slinger": {
        "description": "石を投げて遠距離攻撃をするゴブリン。か弱い集団で遠距離英雄を狙う。",
        "displayName": "ゴブリン投石兵",
        "tip": "遠距離の敵。タンクを飛び越えて後方の英雄を狙うパターンに注意。CC英雄で移動を防ぐと効果的だ。"
      },
      "gold_golem": {
        "description": "黄金で作られたゴーレム。防御力150で戦場で最も硬い存在の一つだ。",
        "displayName": "金ゴーレム",
        "tip": "防御力150！集中的な多段ヒットと防御無視シナジーが必須。時間がかかっても必ず倒せ。"
      },
      "hobgoblin": {
        "description": "ゴブリンより体が大きく知能も高い。棍棒の一撃で大抵の英雄がよろめく。",
        "displayName": "ホブゴブリン",
        "tip": "ゴブリンの強化型。体力と攻撃力が上がった。タンクを前面に配置してヘイトを集中させろ。"
      },
      "ice_spirit": {
        "description": "氷の結晶で構成された精霊。攻撃ごとに命中した英雄の移動速度を低下させる。",
        "displayName": "氷の精霊",
        "tip": "冷気攻撃で味方英雄にスロウをかける。ヒーラーがスロウにかかると回復が遅れるので注意。"
      },
      "iron_golem": {
        "description": "溶鉱炉で直接鋳造された鉄のゴーレム。防御力100でほとんどの物理攻撃を無効化する。",
        "displayName": "鉄ゴーレム",
        "tip": "防御力100。一般的な物理ダメージはほとんど意味がない。魔法ダメージスキルや多段ヒット専門英雄が必要だ。"
      },
      "lava_elemental": {
        "description": "溶岩が意志を得た存在。体力500で強力な火炎打撃を放つ。近くにいるだけでも熱い。",
        "displayName": "溶岩の精霊",
        "tip": "体力500の高級精霊。強い攻撃力でタンクも素早く崩す。ヒール支援必須。"
      },
      "lich": {
        "description": "不死の魔法で自らをアンデッドにした強大な魔道士。強力な呪文で戦場全体を脅かす。",
        "displayName": "リッチ",
        "tip": "非常に高い体力と防御力。CCで移動を防ぎ、集中攻撃で素早く排除しろ。放置するとパーティが崩壊する。"
      },
      "lich_king": {
        "description": "アンデッドの王。アフィックス：召喚 — 定期的にアンデッド兵士を召喚し、味方のヘイトを奪う。",
        "displayName": "リッチキング",
        "tip": "Wave 10 ボス。召喚されたアンデッドがタンクのヘイトを分散させる。広域スキルで召喚獣を素早く排除しろ。"
      },
      "lightning_spirit": {
        "description": "電気エネルギーが凝縮された精霊。速い速度で接近して雷で攻撃し、近くの味方にも感電ダメージを与える。",
        "displayName": "雷の精霊",
        "tip": "遠距離の雷攻撃。防御力0で倒すのは容易。速い速度で遠距離英雄を狙うパターンに注意。"
      },
      "magma_hurler": {
        "description": "内部に溶岩が流れるゴーレム。投げる溶岩の塊が地面に触れると炎の水たまりを作る。",
        "displayName": "マグマ投げゴーレム",
        "tip": "防御力80の遠距離ゴーレム。溶岩投げは周囲の英雄にもダメージを与える可能性がある。多段ヒットが鍵。"
      },
      "necromancer": {
        "description": "死者を召喚する強力な魔道士。背後から支援し、アンデッドの軍勢を増やす。",
        "displayName": "死霊術師",
        "tip": "放置すると周囲にアンデッドが召喚され続ける。遠距離アタッカーで最優先で排除しろ。"
      },
      "orc_grunt": {
        "description": "戦争に飼いならされたオーク歩兵。体力と防御力を兼ね備えたバランスの取れた強敵。",
        "displayName": "オーク歩兵",
        "tip": "体力400、防御力25のバランス型。タンク1人で防ぐのは厳しい。召喚獣でヘイトを分散させろ。"
      },
      "orc_shaman": {
        "description": "部族の呪術師。雷の呪文と毒霧で味方を支援し、遠距離から安全に活動する。",
        "displayName": "オーク呪術師",
        "tip": "オーク歩兵の後ろに隠れて安全に攻撃する。呪術師から倒さなければ味方の被害を減らせない。"
      },
      "orc_warrior": {
        "description": "数十回の戦闘を生き延びたオークの精鋭戦士。体力700の強力な一撃はタンクもすぐに倒す。",
        "displayName": "オーク戦士",
        "tip": "体力700、防御力40の強力な近接敵。タンク2人が必要になるかもしれない。ヒーラーの支援を惜しむな。"
      },
      "plague_beast": {
        "description": "疫病により変異した巨大なアンデッド。HP2500、接近時に疫病の雲で味方のHPを削る。",
        "displayName": "疫病獣",
        "tip": "体力2500！味方全体の火力を集中させろ。ヒーラーがいなければ疫病ダメージでパーティ全体が倒れる。"
      },
      "plague_mage": {
        "description": "疫病を魔法で操る闇の魔道士。遠距離から疫病を広め、味方を徐々に死に至らしめる。",
        "displayName": "疫病の魔道士",
        "tip": "疫病攻撃で持続ダメージを与える。ヒーラーの負担が極端に増加するので、他の敵よりも優先して倒せ。"
      },
      "poison_spirit": {
        "description": "毒気が凝縮された精霊。接触するだけで中毒を引き起こし、ゆっくりとすべての味方英雄の体力を蝕む。",
        "displayName": "毒の精霊",
        "tip": "毒オーラで近くの味方が持続ダメージを受ける。ヒーラーの負担が急増するので素早く倒せ。"
      },
      "rock_hurler": {
        "description": "岩を拾って投げるゴーレム。遠距離から石を投擲し、防衛線の後方までダメージを与える。",
        "displayName": "岩投げゴーレム",
        "tip": "遠距離の高防御ゴーレム。多段ヒットスキルが必須。移動が遅く防衛線形成に余裕がある。"
      },
      "sapper_commander": {
        "description": "自爆部隊を率いる狂気に満ちた指揮官。自身も爆弾を背負って突進し、部下を召喚する。",
        "displayName": "自爆指揮官",
        "tip": "ボス自身も自爆兵であり、壁に触れた瞬間、大量のダメージを与える。狂暴化前にCCを集中させて素早く排除しろ。"
      },
      "shadow_stalker": {
        "description": "闇の中で隠密行動し奇襲する暗殺者。速度4.0で味方の後方の遠距離アタッカー・ヒーラーを狙う。",
        "displayName": "影の追跡者",
        "tip": "速い速度で脆弱な英雄を狙う。CC英雄が必須。暗殺される前にまず目で追跡しろ。"
      },
      "skeleton": {
        "description": "魔法で召喚された最下級のアンデッド。骨だけの体だが、剣を振るう本能は生きている。",
        "displayName": "スケルトン",
        "tip": "ゴブリンと共に序盤に登場する基本的な近接敵。どの英雄でも無難に処理可能だ。"
      },
      "skeleton_archer": {
        "description": "弓の腕前を覚えている骸骨兵士。茂みの向こうから飛んでくる矢に味方がなすすべもなく倒れる。",
        "displayName": "スケルトン射手",
        "tip": "遠距離の序盤の敵。CCまたは遠距離英雄で前列の英雄の後ろにいるスケルトン射手を狙え。"
      },
      "skull_knight": {
        "description": "騎士の記憶と闘志を秘めた高級アンデッド。重装甲の破片の上に奇妙なオーラが漂う。",
        "displayName": "スカルナイト",
        "tip": "防御力と体力を兼ね備えた中級の近接敵。タンクでヘイトを維持しながらアタッカーで着実に攻略しろ。"
      },
      "sniper": {
        "description": "死の世界でさらに鋭くなった狙撃の達人。たった一発で味方の中核英雄を倒す。",
        "displayName": "精鋭狙撃手",
        "tip": "速い速度と高い火力の組み合わせが脅威だ。タンクでヘイトを集め、遠距離アタッカー・ヒーラーを保護しろ。"
      },
      "stone_golem": {
        "description": "山から切り出した巨大な石で作られたゴーレム。通常の武器ではほとんど傷もつけられない。",
        "displayName": "石のゴーレム",
        "tip": "防御力60！単調な攻撃は最小限のダメージしか与えられない。多段ヒットスキルや防御無視シナジーを活用しろ。"
      },
      "storm_elemental": {
        "description": "嵐と雷を指揮する精霊。遠距離から連鎖稲妻で複数の味方に同時にダメージを与える。",
        "displayName": "嵐の精霊",
        "tip": "連鎖稲妻で複数の英雄に同時ダメージ。パーティ内の防御力が高い英雄が前に立たなければダメージを分散できない。"
      },
      "thunder_tyrant": {
        "description": "雷と嵐を支配する圧倒的な存在。アフィックス：AOE強打 — 雷雨を起こして戦場を焦土化。",
        "displayName": "嵐の暴君",
        "tip": "Wave 35 ボス。速い速度と遠距離攻撃の組み合わせ。AOE強打の範囲が非常に広い。ヒーラーを2人以上準備しろ。"
      },
      "titanium_golem": {
        "description": "戦場の歴史上最も硬い存在。HP1500に防御力400。アフィックス：AOE強打で地震を起こす。",
        "displayName": "チタニウムゴーレム",
        "tip": "Wave 25 ボス。防御力400！！！多段ヒット専門英雄がいなければ討伐不可。パーティ全体に多段ヒットスキルが必要だ。"
      },
      "troll_shaman": {
        "description": "古代の呪術で味方のトロールを癒やし強化する呪術師。戦場後方から戦闘を調整する。",
        "displayName": "トロール呪術師",
        "tip": "遠距離から味方のトロールを回復し強化する。即時排除が最優先。CCで縛り集中攻撃しろ。"
      },
      "troll_warlord": {
        "description": "トロール部族の最高指導者。アフィックス：激怒 — HPが30%以下になると攻撃力が2倍に増加する。",
        "displayName": "トロール戦争君主",
        "tip": "Wave 5 ボス。激怒状態になる前に素早くHPを減らさなければならない。ヒーラーとCCがなければ、激怒状態でタンクも一瞬で倒れる。"
      },
      "troll_warrior": {
        "description": "再生能力を持つトロール戦士。体力900、防御力35、倒すためには集中的な火力が必要だ。",
        "displayName": "トロール戦士",
        "tip": "体力900！再生力があり、ダメージが途切れると回復する可能性がある。集中火力で絶え間なく攻撃しろ。"
      },
      "venom_spider": {
        "description": "毒嚢が膨れ上がったクモ。遠距離から毒の糸を吐き味方を毒に感染させる。",
        "displayName": "毒クモ",
        "tip": "遠距離の毒攻撃でヒーラーの負担を増加させる。野獣系は遠距離より近接アタッカーで処理する方が早い。"
      },
      "void_crawler": {
        "description": "虚空の次元から這い出てきたクモ型の存在。体力400で速い速度でタンクを突破してくる。",
        "displayName": "ヴォイドクローラー",
        "tip": "体力400の高速近接敵。タンクがヘイトを維持しにくい。CCと召喚獣を一緒に活用しろ。"
      },
      "void_dragon": {
        "description": "虚空から目覚めたドラゴン。HP10000、防御力80、遠距離の虚空のブレスとAOE強打を併用する。",
        "displayName": "ヴォイドドラゴン",
        "tip": "Wave 45+ ボス。虚空のドラゴンはすべての戦略が必要な最終ボス。タンク・ヒーラー・アタッカー host の完璧なバランスのパーティだけが相対できる。"
      },
      "void_spirit": {
        "description": "現実の向こうの虚空から来た存在。遠距離の虚空光線で防御力を無視する純粋な魔法ダメージを与える。",
        "displayName": "ヴォイドスピリット",
        "tip": "虚空の攻撃は防御力を無視する。体力の多いタンクを前面に立て、ヒーラーを常に待機させろ。"
      },
      "void_walker": {
        "description": "虚空次元と現実世界を行き来する存在。アフィックス：激怒 — HP5000で防御力無視の攻撃。",
        "displayName": "ヴォイドウォーカー",
        "tip": "Wave 30 ボス。体力5000！激怒への移行が早い。高火力の遠距離パーティで最短時間内に倒すのが最善。"
      },
      "war_skeleton": {
        "description": "戦場で倒れた兵士の魂が鎧ごと目覚めた。実力は生きていた時と変わらない。",
        "displayName": "戦骨兵",
        "tip": "基本の骸骨より体力と攻撃力が高い。一般の骸骨の群れに混ざってタンクを疲弊させるので優先して排除しろ。"
      },
      "wind_spirit": {
        "description": "風自体が意志を持った存在。速度6.0で戦場で最も速い敵だ。",
        "displayName": "風の精霊",
        "tip": "速度6.0！タンクを無視してタワーに直行する可能性がある。CC必須。氷結スキルがなければ防ぐのは難しい。"
      },
      "wolf": {
        "description": "群れをなして走る野生の狼。速度5.0の猛獣。群れが合わさるとどんな防衛線も突破する。",
        "displayName": "狼",
        "tip": "速い速度と物量。CC＋広域スキルで序盤に集団を掃討しろ。個別の処理は遅い。"
      },
      "wood_golem": {
        "description": "木が魔法で目覚めた原始的なゴーレム。体力は低いが、硬い外皮が一撃のダメージを防ぐ。",
        "displayName": "木のゴーレム",
        "tip": "ゴーレム系の核心：体力は低く防御力が非常に高い。多段ヒットスキルや防御無視スキルで攻略しろ。"
      }
    },
    "tutorial": {
      "sel": {
        "title": "訓練所",
        "subtitle": "戦闘の基礎と各クラスの核心メカニズムを学びましょう。",
        "basicTitle": "基本チュートリアル",
        "basicDesc1": "ゲームの基本操作と流れを学びます。",
        "basicDesc2": "全ステージをクリアすると",
        "basicDesc2Key": "専用実績",
        "basicDesc2Suf": "を獲得します。",
        "stage1Done": "✅ Stage 1: 孤独な戦い (完了)",
        "stage1": "▶ Stage 1: 孤独な戦い",
        "stage2Done": "✅ Stage 2: 悪魔との契約 (完了)",
        "stage2": "▶ Stage 2: 悪魔との契約",
        "classTitle": "クラス訓練",
        "classSub": "各クラスの固有システムを深く学びます。",
        "locked": "ロック中",
        "lockedDesc": "基本チュートリアル（Stage 2まで）をクリアしないと入れません。",
        "lockedHint": "まず基礎を学びましょう！",
        "classHint": "実戦に近い環境でクラス専用システム（例：近接DPSの戦闘リズム）を練習しましょう。",
        "roles": {
          "tank": {
            "name": "タンク",
            "desc": "ヘイト管理と生存"
          },
          "melee_dps": {
            "name": "近接DPS",
            "desc": "強力な近接火力"
          },
          "ranged_dps": {
            "name": "遠距離DPS",
            "desc": "安全な遠距離狙撃"
          },
          "healer": {
            "name": "ヒーラー",
            "desc": "味方の回復と保護"
          },
          "cc": {
            "name": "群衆制御",
            "desc": "敵の無力化と妨害"
          },
          "mechanic": {
            "name": "メカニック",
            "desc": "壁修理と機械支援"
          }
        }
      },
      "common": {
        "start": "▶  開始",
        "skip": "チュートリアルをスキップ",
        "next": "次へ [Space]",
        "fight": "立ち向かう",
        "backDash": "ダッシュボードへ戻る",
        "toList": "訓練リストへ戻る",
        "damage": "ダメージ",
        "healing": "回復量",
        "taken": "被ダメ",
        "meterTitle": "ダメージメーター",
        "shield": "シールド",
        "timerSuffix": "秒",
        "wallHp": "防衛壁 (HP)"
      },
      "s1": {
        "title": "孤独な戦い",
        "label": "Tutorial · Stage 1",
        "intro": [
          "闇が世界を覆い始めた。",
          "",
          "平和な村にモンスターが押し寄せ...",
          "あなたは一人で村を守るために立ち上がった。",
          "",
          "スキルも仲間もない。",
          "ただ生まれ持った体格と意志だけで。"
        ],
        "wave1": [
          "最初の波を退けた。"
        ],
        "wave2": [
          "まだ来そうだ..."
        ],
        "wave3": [
          "傷を負ったが、退くわけにはいかない。"
        ],
        "wave4": [
          "...",
          "奇妙な気配がする。",
          "遠くから何かが近づいてくる。"
        ],
        "bossIntro": [
          "...",
          "大地が揺れる。",
          "闇の中から巨大な影が現れた。",
          "",
          "━━  暗黒騎士団長  ━━",
          "",
          "こいつを...一人で相手にできるのか？"
        ],
        "death": [
          "...",
          "これが...私の限界か。",
          "一人では...敵わなかった。",
          "でも...",
          "仲間がいれば..."
        ],
        "complete": "Stage 1 Complete",
        "defeatSub": "敗北しても止まらない",
        "defeatBy": "暗黒騎士団長",
        "defeatText1": "に倒された。",
        "defeatText2": "スキルも仲間もなく一人で立ち向かったが、力が及ばなかった。",
        "defeatText3a": "でも今わかった。",
        "defeatText3b": "共にいれば",
        "defeatText3c": "違う結果になる。",
        "goldBonus": "モンスター討伐ゴールド + ステージ完了ボーナス(300G)",
        "nextHint": "次のステップ",
        "next1": "ショップで英雄を採用しよう",
        "next2": "英雄画面でスキルを購入してパーティを編成しよう",
        "next3": "強くなって戻ってこよう",
        "btnNext": "▶  Stage 2 — 悪魔との契約"
      },
      "s2": {
        "title": "悪魔との契約",
        "label": "Tutorial · Stage 2",
        "intro": [
          "倒れたあなたの前に誰かが現れた。",
          "",
          "\"...立て。まだ終わっていない。\"",
          "",
          "暗黒の魔力が凝縮された瞳。",
          "闇の中で悪魔たちが彼女の周りを漂う。",
          "",
          "━━  フェルダ  ━━",
          "",
          "\"私がいれば話が変わる。\""
        ],
        "wave1": [
          "ウォームアップが終わった。",
          "フェルダの魔力が濃くなる。"
        ],
        "wave2": [
          "敵がより強くなっている。",
          "でもフェルダは余裕だ。"
        ],
        "wave3": [
          "地獄の守護者が暴れる。"
        ],
        "wave4": [
          "...何か強いものが来る。",
          "大地が揺れる。"
        ],
        "wave5": [
          "暗黒騎士団長を倒した！",
          "Feldah: \"これはウォームアップに過ぎない。\""
        ],
        "wave6": [
          "闇の軍勢が集結している。"
        ],
        "wave7": [
          "魔法使いたちが押し寄せる。",
          "Feldahの呪いが彼らを縛る。"
        ],
        "wave8": [
          "ゴーレムの殻も痛みは防げない。"
        ],
        "wave9": [
          "最後の砦が崩れている。",
          "...もうすぐ奴が来る。"
        ],
        "boss5Intro": [
          "...見覚えのある気配だ。",
          "",
          "━━  暗黒騎士団長  ━━",
          "",
          "\"また来たか。今度は二人で来たな。\"",
          "",
          "Feldah: \"うるさいな。フェルガード、行け！\""
        ],
        "boss10Intro": [
          "光が消え、冷気が押し寄せる。",
          "",
          "━━  リッチ・キング  ━━",
          "",
          "\"死すべき者よ...闇に還れ。\"",
          "",
          "Feldah: \"私の方が長く闇の中にいた。\"",
          "\"共にいれば違う。\""
        ],
        "victory": [
          "...終わった。",
          "",
          "リッチ・キングが倒れた。",
          "",
          "Feldah: \"よくやった。これが一緒に戦う醍醐味だ。\"",
          "",
          "一人では不可能だった戦い。",
          "共にいたから可能だった。"
        ],
        "boss5Cleared": "暗黒騎士団長討伐 ✓",
        "complete": "Stage 2 Complete",
        "winTitle": "勝利！",
        "winTitle2": "悪魔との契約",
        "winSub": "共にいれば不可能はない",
        "winText1a": "リッチ・キング",
        "winText1b": "フェルダ",
        "winText1c": "と共に撃破した。",
        "winText2": "スキルと仲間の力がいかに重要かを学んだ。",
        "winText3a": "今、本当の戦争が始まる。",
        "winText3b": "もっと強くなれ。",
        "partyTitle": "今回の戦闘パーティ",
        "heroPrev": "タンク、魂の石の守護（無敵）",
        "feldahPrev": "混沌の矢（DPS）・命の宝石（ヒール）・フェルガード召喚",
        "felgardPrev": "悪魔戦士召喚獣、前線守護",
        "felgardName": "フェルガード",
        "feldahName": "フェルダ",
        "summoning": "召喚中",
        "goldBonus": "モンスター討伐ゴールド + 勝利ボーナス(500G)",
        "btnPlay": "ゲーム開始（英雄募集 + スキル購入）"
      },
      "tank": {
        "pageTitle": "タンク：戦士の道",
        "trainingLabel": "タンク訓練所",
        "masterTitle": "タンクマスター",
        "masterSub": "あなたは今、戦場最強の盾となりました。",
        "startBtn": "準備完了！始めよう！",
        "myName": "自分 (ジェダ)",
        "weakHealer": "脆弱なヒーラー",
        "jedahName": "Jedah",
        "intro": [
          "おい！そこのひょろひょろした奴、私がアンデッド戦士ジェダだ！",
          "戦闘の基本中でも最も熱くて激しい「タンク」について教えてやろう。",
          "戦士は単なる肉の壁じゃない。燃えるような闘志と棘のような復讐心で戦う者たちだ。",
          "よく見ろ。後ろにいるのは我々のヒーラーだ。HPが1しかない非常に脆弱な奴だ。",
          "そしてあの壁！我々が守るべき最後の砦だ。",
          "お前の任務は簡単だ。モンスターがヒーラーと壁に触れられないよう、全部自分で受けることだ！",
          "我々タンクは高い防御力で耐えながら敵の注目を集める戦場の主役だ！",
          "さあ、ウォームアップから始めよう。斧をしっかり握れ！"
        ],
        "wave1": [
          "悪くない！だがこれは始まりに過ぎない。",
          "タンクの基本攻撃は一度に複数の敵を殴る「広範囲攻撃」だと覚えておけ！"
        ],
        "wave2": [
          "クハハ！スッキリしたな！",
          "私のスキルに「棘反射」というものがある。5星の実力を見せよう。私を攻撃する奴らは100%のダメージを返される！"
        ],
        "wave3": [
          "そろそろ重要なことを教えよう。「挑発の一撃」だ！",
          "モンスターがお前ではなく他の奴（壁やヒーラー）を見ているときにお前が攻撃すれば、攻撃力がなんと5倍になる！",
          "その一撃でモンスターの注目を強制的にお前に向けさせる。それがタンクの品格だ！"
        ],
        "wave4": [
          "よし、よく耐えた！今が最後の試練だ。",
          "強力な双子ボスが2体同時に来る。気を引き締めろ！",
          "2体ともお前が相手しなければならない。ヒーラーに指一本触れさせるな！"
        ],
        "victory": [
          "完璧だ！これこそ真のタンクだ！",
          "仲間のために全ての痛みを背負うその姿、本当に燃えるほどかっこいい！",
          "忘れるな。お前が崩れれば チームが崩れる。常に最前線で堂々と耐えろ！"
        ],
        "mastery": [
          {
            "title": "挑発の一撃",
            "desc": "ターゲットでない時に5倍ダメージ＆ヘイト強奪"
          },
          {
            "title": "広範囲基本攻撃",
            "desc": "複数の敵を同時に攻撃"
          },
          {
            "title": "高い防御力",
            "desc": "他のクラスより効率的なダメージ軽減"
          }
        ]
      },
      "melee": {
        "pageTitle": "近接DPS：野性の爪",
        "trainingLabel": "近接DPS訓練所",
        "masterTitle": "近接DPSマスター",
        "masterSub": "あなたの爪は今、敵たちの恐怖となりました。",
        "startBtn": "狩りを始めよう！",
        "cairneName": "Cairne",
        "jedahName": "Jedah",
        "myName": "自分 (カーン)",
        "jedahLabel": "ジェダ (タンク)",
        "intro": [
          "Cairne: \"こんにちは、友よ！大自然の力があなたと共にあらんことを。\"",
          "Jedah: \"おいカーン！挨拶している場合じゃない。あそこの頑丈そうな奴らが見えないのか？\"",
          "Cairne: \"はは、ジェダ。せっかちだね。君の盾は頼もしいが、時には鋭い爪も必要だよ。\"",
          "Cairne: \"今回は\\\"近接DPS\\\"の真髄を見せよう。私たちは敵の隙を突いて瞬時に粉砕する役割だ。\"",
          "Cairne: \"最も重要なのは\\\"戦闘リズム\\\"だ。1打、2打（300%ダメージ！）、3打（範囲ダメージ！）の循環を感じてくれ。\"",
          "Cairne: \"もう一つ！近接DPSは本能的に敵の\\\"背後\\\"を狙う。ジェダのように誰かを見ている敵の瞬間に、私は背後に回る。背後からの一撃は通常より50%強い！\"",
          "Jedah: \"背後から刺すのは少し卑怯じゃないか？\"",
          "Cairne: \"戦場に卑怯などない。ただし、敵が私を狙っているときは背後を取れない。タンクの真価がここにある―敵の注目を引いて私が背後を狙う隙を作ることだ！\"",
          "Jedah: \"ふん、私の盾の後ろで踊るなよ！\"",
          "Cairne: \"さあ、穏やかに始めようか？\""
        ],
        "wave1": [
          "Cairne: \"見たか！ジェダがヘイトを引いている間に、私は自然に敵の背後に回った。背後攻撃は50%強い！\"",
          "Jedah: \"チッ...俺が苦労している間に後ろから刺すのか。\""
        ],
        "wave2": [
          "Cairne: \"群れてきたらリズムの3打を使おう。周り全員に大自然の辛さを味わわせることができる！\"",
          "Cairne: \"多いほどジェダにヘイトを任せて、私は背後を担当する。タンクと近接DPSが噛み合うと本当の威力が出る！\""
        ],
        "wave3": [
          "Cairne: \"遠い敵も問題ない。我々はとても速い。もうすぐそこだ！\"",
          "Jedah: \"その速度で逃げるときに使うんじゃないだろうな？\""
        ],
        "wave4": [
          "Cairne: \"ボスの広範囲攻撃が怖いか？心配ない。近接DPSは本能的にそのダメージを50%軽減して受ける。\"",
          "Jedah: \"タフさは認めよう。でも私の盾には及ばない！\""
        ],
        "victory": [
          "Cairne: \"嵐が過ぎた。友よ、君の爪はとても鋭かった。\"",
          "Jedah: \"まあ...悪くなかった。少しは役に立つな。背後を取ってくれたおかげもあるが。\"",
          "Cairne: \"はははは、ジェダ。君も正直じゃないな。もう本当の戦場に出る準備ができたようだ！\""
        ],
        "mastery": [
          {
            "title": "戦闘リズム",
            "desc": "1-2(3倍)-3(範囲)の強力な連続攻撃"
          },
          {
            "title": "広範囲ダメージ軽減",
            "desc": "ボスの広範囲攻撃ダメージを常時50%軽減"
          },
          {
            "title": "優れた機動性",
            "desc": "速い速度で敵を追いかけて排除"
          },
          {
            "title": "背後強打",
            "desc": "タンクがヘイトを引いている間に敵の背後を狙い50%追加ダメージ"
          }
        ]
      },
      "ranged": {
        "pageTitle": "遠距離DPS：魔法の優雅",
        "trainingLabel": "遠距離DPS訓練所",
        "masterTitle": "遠距離DPSマスター",
        "masterSub": "あなたの魔法は敵が届かない場所で輝きます。",
        "startBtn": "魔法を始めよう！",
        "iskierName": "Iskier",
        "myName": "自分 (イスキー)",
        "wallLabel": "防衛壁 (鉄壁)",
        "wave2Action": "Iskier: \"今です！凍りつく球、爆発してください!!\"",
        "intro": [
          "Iskier: \"まあ、ようこそ。優雅な魔法の世界へようこそ。\"",
          "Iskier: \"あそこに見える頑丈な壁が見えますか？あれが私たちの一番の親友です。\"",
          "Iskier: \"遠距離DPSはあのような頼もしい壁の後ろから一方的に敵を料理する役割です。\"",
          "Iskier: \"私たちには長い射程と強力な広範囲魔法があります。壁に届く前に凍らせてしまいます。\"",
          "Iskier: \"特に私の\\\"凍りつく球\\\"は押し寄せる敵を一気に一掃するのに最適です。\"",
          "Iskier: \"さあ、優雅に始めましょうか？杖を軽く握ってみてください。\""
        ],
        "wave1": [
          "Iskier: \"ふふ、敵が近づくことすらできませんでした。これが長射程の優雅さです。\""
        ],
        "wave2": [
          "Iskier: \"見ましたか？私の広範囲魔法一発で敵が消える姿...本当に美しくないですか？\""
        ],
        "wave3": [
          "Iskier: \"硬い敵でも大丈夫です。壁の後ろから安定して魔力を注ぎ込めば結局は崩れます。\""
        ],
        "wave4": [
          "Iskier: \"敵が投射物を投げても慌てないでください。私たちの壁はとても頑丈で全部防いでくれます。\""
        ],
        "victory": [
          "Iskier: \"完璧です。あなたの魔法運用能力、なかなか才能があるようですね？\"",
          "Iskier: \"常に覚えておいてください。距離を保つこと、それが遠距離DPSの命であり芸術です。\"",
          "Iskier: \"さあ、今度は戦場で真の実力を見せてください。応援しています！\""
        ],
        "mastery": [
          {
            "title": "射程の優位性",
            "desc": "画面端まで届く長射程で先制攻撃"
          },
          {
            "title": "圧倒的広範囲火力",
            "desc": "複数の敵を一度に制圧するスキル運用"
          },
          {
            "title": "安全なポジション",
            "desc": "防衛壁の後ろから安定した継続的DPS"
          }
        ]
      },
      "healer": {
        "pageTitle": "ヒーラー：救済の手",
        "trainingLabel": "ヒーラー訓練所",
        "masterTitle": "ヒーラーマスター",
        "masterSub": "あなたの回復は戦場唯一の希望です。",
        "startBtn": "回復を開始",
        "dizName": "Dizgardo",
        "jedahName": "Jedah",
        "cairneName": "Cairne",
        "myName": "自分 (ディズ)",
        "jedahLabel": "ジェダ (タンク)",
        "cairneLabel": "カーン (DPS)",
        "intro": [
          "Dizgardo: \"来たか。長話はしない。後ろから命綱だけ握っていろ。\"",
          "Jedah: \"おいディズガルド！その態度はなんだ？俺が前で全部防ぐからガンガン回復してくれよ！\"",
          "Cairne: \"はは、ジェダ。友が少し照れ屋なだけだよ。ディズ、今日もよろしく。\"",
          "Dizgardo: \"...うるさい。ヒーラーは\\\"スマートヒール\\\"でHPが低い者から救う。私の\\\"シールド\\\"が張られるとダメージが相殺される。\"",
          "Dizgardo: \"私はぼーっと立っていない。時々敵を攻撃してチームの火力を補う。約30%は私の担当だ。\"",
          "Jedah: \"おお！攻撃する司祭とは、やっぱり熱いな！\"",
          "Dizgardo: \"戦闘を開始する。死ぬな。\""
        ],
        "wave1": [
          "Dizgardo: \"基礎的な回復だ。HPバーを注視しろ。\""
        ],
        "wave2": [
          "Jedah: \"うぐ、さっきの奴らはちょっと痛いぞ？ディズ、シールドをバンバン張ってくれ！\"",
          "Dizgardo: \"...もう張った。大げさに言うな。\""
        ],
        "wave3": [
          "Cairne: \"継続回復のおかげで爪が軽い。ありがとう、友よ。\"",
          "Dizgardo: \"大したことない。するべきことをするだけだ。\""
        ],
        "wave4": [
          "Dizgardo: \"そろそろ痛くなる。集中しろ。見逃したら即終わりだ。\"",
          "Jedah: \"心配するな！お前の回復だけを信じて突進する！\""
        ],
        "victory": [
          "Dizgardo: \"...生き残った。才能はある。\"",
          "Cairne: \"やはりお前の回復がなければ不可能な戦いだった。\"",
          "Jedah: \"クハハ！やはり我々の司祭が最高だ！今度こそ本当の戦場へ行こう！\"",
          "Dizgardo: \"行け。後ろは私が責任を持つ。\""
        ],
        "mastery": [
          {
            "title": "スマートヒールシステム",
            "desc": "最もHPが低い味方を最優先で回復"
          },
          {
            "title": "先制シールド",
            "desc": "ダメージが来る前に吸収シールドで生存力を最大化"
          },
          {
            "title": "攻撃的サポート",
            "desc": "味方を回復しながら敵にも魔法ダメージを与える"
          }
        ]
      },
      "cc": {
        "pageTitle": "群衆制御：拘束の美学",
        "trainingLabel": "CC訓練所",
        "masterTitle": "CCマスター",
        "masterSub": "敵を止めるあなたの能力は最強の武器です。",
        "startBtn": "足を縛りましょう！",
        "helnName": "Heln",
        "iskierName": "Iskier",
        "myName": "自分 (ヘルン)",
        "intro": [
          "Iskier: \"あの...あのモンスターたち、何か変じゃないですか？目に殺気が満ちています。\"",
          "Iskier: \"きゃあ！あのゴブリンたち、体に爆弾を巻いて壁に向かって走っています！私の魔法では力が足りません！\"",
          "Heln: \"はは、イスキーさん！慌てないでください。兄様ほどではないですが、このヘルンが助けに来ましたから！\"",
          "Heln: \"群衆制御（CC）の醍醐味を見せましょう。私の攻撃は30%の確率で敵を止めたり、凍らせたり、広範囲スローをかけたりします。\"",
          "Heln: \"自爆兵たちは壁に届く前に止めることが核心です。私の\\\"根の束縛\\\"と\\\"気絶\\\"がとても有用です。\"",
          "Iskier: \"本当に頼もしいですね、ヘルン！では私が後ろから火力を補います！\"",
          "Heln: \"さあ、一緒に踊りましょうか？足を縛りましょう！\""
        ],
        "wave1": [
          "Iskier: \"ふう...壁が危うく崩れるところでした。ヘルンの助けがなければ本当に大変でした。\""
        ],
        "wave2": [
          "Heln: \"見ましたか？自爆兵がぼーっとしている間に魔法を打ち込むととても簡単です！\""
        ],
        "wave3": [
          "Heln: \"速い奴らは広範囲スローで足を縛ればいい。大自然の拘束は誰も逃れられません！\""
        ],
        "wave4": [
          "Iskier: \"あの巨大な爆弾の荷車は本当に怖いですね...でもヘルンがずっと止めてくれているので安心です。\""
        ],
        "victory": [
          "Heln: \"ははは！完璧な協力でした。イスキーさんの魔法も今日は一際輝いていましたね！\"",
          "Iskier: \"ありがとう、ヘルン。敵の足を縛ることがいかに重要かを今日はっきり学びました。\"",
          "Heln: \"さあ、今度は本物の戦場で敵をびくともさせないようにしましょう！\""
        ],
        "mastery": [
          {
            "title": "常時無力化確率",
            "desc": "攻撃時30%の確率でスタン、凍結、広範囲スロー発生"
          },
          {
            "title": "自爆兵阻止",
            "desc": "危険な自爆ユニットを壁に届く前に止める"
          },
          {
            "title": "戦略的時間稼ぎ",
            "desc": "強力な敵の速度を落としてDPSが処理する時間を確保"
          }
        ]
      },
      "mechanic": {
        "pageTitle": "メカニック：機械の支配者",
        "trainingLabel": "メカニック訓練所",
        "masterTitle": "メカニックマスター",
        "masterSub": "機械と修理の力で前線を支える真のエンジニア。",
        "startBtn": "砲台を展開！",
        "coilzekName": "Coilzek",
        "iskierName": "Iskier",
        "myName": "自分 (コイルゼク)",
        "intro": [
          "Iskier: \"コイルゼク、あの多くの敵をどう止めるんですか？！私の魔法だけでは限界があります！\"",
          "Coilzek: \"イスキー！心配しないでください。私は直接戦いません。代わりにあの壁の上の砲台が戦ってくれます！\"",
          "Iskier: \"砲台ですか？ただ遠くから撃つ機械ですか？\"",
          "Coilzek: \"それだけじゃないです！砲台は遠距離攻撃もしますが...敵が壁に張り付いたら近接広範囲爆発も発動します！\"",
          "Coilzek: \"遠くからは投射体で狙撃し、壁に張り付いた敵は爆発で一気に吹き飛ばすんです！\"",
          "Coilzek: \"私の役割は砲台が損傷したら修理し、壁が壊れたら復旧することです。\"",
          "Coilzek: \"アルティメットを使えば砲台を複数同時に配置することもできます！\"",
          "Iskier: \"わあ、遠近両方をカバーする砲台とは！頼もしいですね！\"",
          "Coilzek: \"さあ、始めましょう！砲台が勝手に戦ってくれるので、私は修理に集中するだけです！\""
        ],
        "wave1": [
          "Coilzek: \"見ましたか？砲台の遠距離射撃でスッキリ処理しました！\""
        ],
        "wave2": [
          "Coilzek: \"壁に張り付いた瞬間に砲台の広範囲爆発が発動しましたね？そして壁もすぐ修理しました！\""
        ],
        "wave3": [
          "Iskier: \"あれだけ多い敵を砲台一基で？！遠距離射撃＋近接爆発の組み合わせが本当に強いですね！\""
        ],
        "wave4": [
          "Coilzek: \"砲台修理、壁修理...忙しくても大丈夫です！砲台が大活躍していますから！\""
        ],
        "victory": [
          "Coilzek: \"やりました！砲台の遠近両刀火力が完璧に機能しました！\"",
          "Iskier: \"遠距離狙撃と壁近くの広範囲爆発がこんなに合うとは...本当にすごいです！\"",
          "Coilzek: \"メカニックの真の力は砲台にあります。いつか砲台3基で完璧な防衛陣形を見せてあげます！\""
        ],
        "mastery": [
          {
            "title": "自動砲台（壁上固定）",
            "desc": "メカニックは直接攻撃しない。砲台が全DPS担当、破壊時即再召喚"
          },
          {
            "title": "砲台二重攻撃",
            "desc": "遠距離投射体射撃＋壁100px以内の敵に2秒毎に広範囲近接爆発（ATK×70%）"
          },
          {
            "title": "砲台/壁修理",
            "desc": "砲台HP70%未満→砲台修理優先、壁HP80%未満→壁修理"
          }
        ]
      },
      "monsters": {
        "goblin": "ゴブリン",
        "skeleton": "骸骨兵士",
        "wolf": "オオカミ",
        "orc_grunt": "オーク突撃兵",
        "goblin_archer": "ゴブリン弓兵",
        "dark_knight": "暗黒騎士",
        "dark_sorcerer": "暗黒魔法使い",
        "orc_warchief": "オーク戦争族長",
        "wild_beast": "野生獣",
        "skeleton_mage": "骸骨魔法使い",
        "golem": "ストーンゴーレム",
        "dark_knight_commander": "暗黒騎士団長",
        "lich_king": "リッチ王",
        "twin_boss_a": "双子ボスA",
        "twin_boss_b": "双子ボスB",
        "world_eater": "巨大恐怖怪物",
        "ancient_behemoth": "古代ベヒモス",
        "aoe_destroyer": "破壊の審判者",
        "sapper_commander": "爆破指揮官",
        "goblin_sapper_escort": "護衛爆破兵",
        "iron_juggernaut": "鉄の破壊者",
        "wall_basher_escort": "護衛破壊兵",
        "target_dummy_weak": "訓練用モブ（弱）",
        "target_dummy": "訓練用モブ",
        "target_dummy_fast": "素早い訓練用モブ",
        "tank_test_elite": "頑強な精鋭兵",
        "high_hp_dummy": "硬い訓練用モブ",
        "swarm_dummy": "訓練用モブ群",
        "ranged_dummy": "逃げる弓兵",
        "aoe_stomper": "踏みつけの達人",
        "slow_dummy": "のろいゴーレム",
        "mass_dummy": "召喚された幻影",
        "tough_shield": "重い盾兵",
        "ranged_enemy": "敵軍魔法使い",
        "healer_test_1": "攻撃的な訓練兵",
        "healer_test_2": "強力な打撃兵",
        "healer_test_3": "影の刺客",
        "healer_test_elite": "殺戮者精鋭兵",
        "goblin_sapper": "ゴブリン爆破兵",
        "elite_sapper": "精鋭爆破兵",
        "swift_sapper": "快速爆破兵",
        "bomb_cart": "爆弾車",
        "mech_infantry": "機甲歩兵",
        "wall_basher": "壁破壊兵",
        "goblin_squad": "ゴブリン突撃隊",
        "turret_hunter": "砲塔狩人"
      }
    },
    "status": {
      "title": "サーバーステータス",
      "subtitle": "自動更新: 30秒ごと",
      "overallStatus": "全体ステータス",
      "lastChecked": "最終確認:",
      "checking": "確認中...",
      "apiServer": "APIサーバー",
      "database": "データベース",
      "backup": "自動バックアップ",
      "apiDesc": "NestJS REST API",
      "dbDesc": "PostgreSQL (Prisma ORM)",
      "backupDesc": "毎日 pg_dump · 7日間保存",
      "backupDetails": "バックアップ詳細",
      "lastBackup": "最終バックアップ",
      "backupCount": "保存済みバックアップ",
      "backupSchedule": "スケジュール",
      "backupRetention": "保存期間",
      "serverTime": "サーバー応答時刻:",
      "refresh": "更新"
    },
    "notification": {
      "title": "通知 — 最近の実績",
      "empty": "通知はありません。"
    },
    "browser": {
      "warning": "{{browser}} はサポートされていません。Chrome、Firefox、Safari、Edge（最新）をご利用ください。"
    }
  }
} as const;

export type Translations = typeof translations.ko;
export default translations;
