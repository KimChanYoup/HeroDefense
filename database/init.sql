-- =============================================
-- Hero Defense - Database Schema (초안)
-- ft_transcendence 과제용
-- =============================================

-- 유저 테이블
CREATE TABLE IF NOT EXISTS users (
    id              SERIAL PRIMARY KEY,
    email           VARCHAR(255) UNIQUE NOT NULL,
    username        VARCHAR(50) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    avatar_url      VARCHAR(500) DEFAULT NULL,
    level           INTEGER DEFAULT 1,
    experience      INTEGER DEFAULT 0,
    gold            INTEGER DEFAULT 500,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login      TIMESTAMP DEFAULT NULL,
    is_online       BOOLEAN DEFAULT FALSE
);

-- 친구 관계
CREATE TABLE IF NOT EXISTS friendships (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE,
    friend_id       INTEGER REFERENCES users(id) ON DELETE CASCADE,
    status          VARCHAR(20) DEFAULT 'pending', -- pending, accepted, blocked
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, friend_id)
);

-- 종족 정의
CREATE TABLE IF NOT EXISTS races (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(50) UNIQUE NOT NULL,   -- human, undead, elf, orc...
    display_name    VARCHAR(100) NOT NULL,          -- 인간, 언데드, 엘프, 오크...
    synergy_3       TEXT,                            -- 3명 시너지 효과 설명
    synergy_4       TEXT,
    synergy_5       TEXT
);

-- 원소 정의
CREATE TABLE IF NOT EXISTS elements (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(50) UNIQUE NOT NULL,   -- fire, frost, shadow, holy...
    display_name    VARCHAR(100) NOT NULL,
    synergy_3       TEXT,
    synergy_4       TEXT,
    synergy_5       TEXT
);

-- 소속 진영 정의
CREATE TABLE IF NOT EXISTS factions (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(100) UNIQUE NOT NULL,   -- world_tree_champions, undead_legion...
    display_name    VARCHAR(100) NOT NULL,
    description     TEXT,
    synergy_3       TEXT
);

-- 직업 정의
CREATE TABLE IF NOT EXISTS classes (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(50) UNIQUE NOT NULL,   -- warrior, mage, priest...
    display_name    VARCHAR(100) NOT NULL
);

-- 특성 정의
CREATE TABLE IF NOT EXISTS specs (
    id              SERIAL PRIMARY KEY,
    class_id        INTEGER REFERENCES classes(id),
    name            VARCHAR(50) NOT NULL,           -- protection, fury, arms...
    display_name    VARCHAR(100) NOT NULL,
    role            VARCHAR(20) NOT NULL,            -- tank, melee_dps, ranged_dps, healer, cc
    range_type      VARCHAR(10) NOT NULL,            -- melee, ranged
    description     TEXT,
    UNIQUE(class_id, name)
);

-- 영웅 템플릿 (게임에 존재하는 모든 영웅 종류)
CREATE TABLE IF NOT EXISTS hero_templates (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    spec_id         INTEGER REFERENCES specs(id),
    race_id         INTEGER REFERENCES races(id),
    element_id      INTEGER REFERENCES elements(id),
    faction_id      INTEGER REFERENCES factions(id),
    rarity          VARCHAR(20) DEFAULT 'normal',   -- normal, rare, epic
    base_hp         INTEGER NOT NULL,
    base_atk        INTEGER NOT NULL,
    base_def        INTEGER NOT NULL,
    base_speed      INTEGER NOT NULL,
    aggro_radius    INTEGER DEFAULT 0,
    attack_range    INTEGER NOT NULL,
    description     TEXT,
    is_achievement  BOOLEAN DEFAULT FALSE            -- 업적 보상 영웅 여부
);

-- 영웅 스킬 정의
CREATE TABLE IF NOT EXISTS skills (
    id              SERIAL PRIMARY KEY,
    spec_id         INTEGER REFERENCES specs(id),
    name            VARCHAR(100) NOT NULL,
    display_name    VARCHAR(100) NOT NULL,
    skill_type      VARCHAR(30) NOT NULL,            -- damage, heal, buff, debuff, taunt, cc, summon
    target_type     VARCHAR(20) NOT NULL,            -- single, aoe, self, ally, enemy
    damage          INTEGER DEFAULT 0,
    heal            INTEGER DEFAULT 0,
    duration        FLOAT DEFAULT 0,
    cooldown        FLOAT NOT NULL,
    range           INTEGER DEFAULT 0,
    radius          INTEGER DEFAULT 0,
    description     TEXT
);

-- 특성 트리 (레벨업 시 선택 가능한 특성)
CREATE TABLE IF NOT EXISTS talent_nodes (
    id              SERIAL PRIMARY KEY,
    spec_id         INTEGER REFERENCES specs(id),
    required_level  INTEGER NOT NULL,
    name            VARCHAR(100) NOT NULL,
    description     TEXT NOT NULL,
    effect_json     JSONB NOT NULL                   -- 효과 데이터 (유연한 구조)
);

-- 유저가 보유한 영웅
CREATE TABLE IF NOT EXISTS user_heroes (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE,
    template_id     INTEGER REFERENCES hero_templates(id),
    level           INTEGER DEFAULT 1,
    experience      INTEGER DEFAULT 0,
    talent_points   INTEGER DEFAULT 0,
    is_fallen       BOOLEAN DEFAULT FALSE,           -- 쓰러짐 상태
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, template_id)
);

-- 유저 영웅의 특성 선택
CREATE TABLE IF NOT EXISTS user_hero_talents (
    id              SERIAL PRIMARY KEY,
    user_hero_id    INTEGER REFERENCES user_heroes(id) ON DELETE CASCADE,
    talent_node_id  INTEGER REFERENCES talent_nodes(id),
    UNIQUE(user_hero_id, talent_node_id)
);

-- 몬스터 정의
CREATE TABLE IF NOT EXISTS monster_templates (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    display_name    VARCHAR(100) NOT NULL,
    monster_type    VARCHAR(20) NOT NULL,             -- normal, elite, boss
    hp              INTEGER NOT NULL,
    atk             INTEGER NOT NULL,
    def             INTEGER NOT NULL,
    speed           INTEGER NOT NULL,
    is_ranged       BOOLEAN DEFAULT FALSE,
    abilities_json  JSONB DEFAULT '[]'               -- 특수 능력 (어픽스 등)
);

-- 웨이브 정의
CREATE TABLE IF NOT EXISTS waves (
    id              SERIAL PRIMARY KEY,
    wave_number     INTEGER NOT NULL,
    mode            VARCHAR(20) NOT NULL,             -- solo, party, raid_10, raid_15
    monsters_json   JSONB NOT NULL,                   -- 이 웨이브에 등장하는 몬스터 구성
    boss_id         INTEGER REFERENCES monster_templates(id) DEFAULT NULL
);

-- 게임 세션 (한 판의 기록)
CREATE TABLE IF NOT EXISTS game_sessions (
    id              SERIAL PRIMARY KEY,
    mode            VARCHAR(20) NOT NULL,             -- solo, party, raid_10, raid_15
    max_wave        INTEGER DEFAULT 0,
    is_cleared      BOOLEAN DEFAULT FALSE,
    started_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at        TIMESTAMP DEFAULT NULL,
    tower_level     INTEGER DEFAULT 1
);

-- 게임 세션 참가자
CREATE TABLE IF NOT EXISTS game_session_players (
    id              SERIAL PRIMARY KEY,
    session_id      INTEGER REFERENCES game_sessions(id) ON DELETE CASCADE,
    user_id         INTEGER REFERENCES users(id),
    party_json      JSONB NOT NULL,                   -- 이 플레이어의 파티 구성 (영웅 5명)
    UNIQUE(session_id, user_id)
);

-- 업적 정의
CREATE TABLE IF NOT EXISTS achievements (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(100) UNIQUE NOT NULL,
    display_name    VARCHAR(100) NOT NULL,
    description     TEXT NOT NULL,
    condition_json  JSONB NOT NULL,                   -- 달성 조건
    reward_hero_id  INTEGER REFERENCES hero_templates(id) DEFAULT NULL,
    reward_gold     INTEGER DEFAULT 0
);

-- 유저 업적 달성
CREATE TABLE IF NOT EXISTS user_achievements (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE,
    achievement_id  INTEGER REFERENCES achievements(id),
    achieved_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, achievement_id)
);

-- 채팅 메시지
CREATE TABLE IF NOT EXISTS chat_messages (
    id              SERIAL PRIMARY KEY,
    sender_id       INTEGER REFERENCES users(id) ON DELETE CASCADE,
    receiver_id     INTEGER REFERENCES users(id) ON DELETE CASCADE DEFAULT NULL, -- NULL이면 전체 채팅
    room_id         VARCHAR(100) DEFAULT NULL,        -- 로비/게임방 채팅
    content         TEXT NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 초기 데이터: 종족
-- =============================================
INSERT INTO races (name, display_name, synergy_3, synergy_4, synergy_5) VALUES
('human',    '인간',     '아군 공격력 +10%',         '아군 공격력 +20%',           '아군 전원 추가 스킬 해금'),
('undead',   '언데드',   '적 주기적 공포',           '적 체력회복 불가',            '적 회복량이 데미지로 전환'),
('elf',      '엘프',     '아군 회피율 +15%',         '회피율 +25%, 치명타 +10%',   '회피 시 반격 발동'),
('orc',      '오크',     '근딜 공격속도 +15%',       '킬 시 HP 회복',              '처형 HP 기준 30% 상향');

-- =============================================
-- 초기 데이터: 원소
-- =============================================
INSERT INTO elements (name, display_name, synergy_3, synergy_4, synergy_5) VALUES
('fire',    '화염',   '적에게 주기적 화상',         '화염 공격에 폭발 속성 추가',   '10웨이브마다 화염 폭풍'),
('frost',   '냉기',   '적 이동속도 -15%',          '적 공격속도 -20%',            '보스 제외 5초 빙결'),
('shadow',  '암흑',   '적 방어력 -10%',            '적에게 주기적 DoT',           '보스전 적 HP 10% 즉삭'),
('holy',    '신성',   '아군 받는 힐 +15%',         '피해 시 보호막 자동 생성',     '부활 쿨다운 제거');

-- =============================================
-- 초기 데이터: 직업
-- =============================================
INSERT INTO classes (name, display_name) VALUES
('warrior',   '전사'),
('mage',      '마법사'),
('priest',    '사제'),
('hunter',    '사냥꾼'),
('warlock',   '흑마법사');

-- =============================================
-- 초기 데이터: 특성 (MVP 5직업 8특성)
-- =============================================
INSERT INTO specs (class_id, name, display_name, role, range_type, description) VALUES
((SELECT id FROM classes WHERE name='warrior'),  'protection', '방어',   'tank',       'melee',  '어그로를 모아 전선을 유지하는 탱커'),
((SELECT id FROM classes WHERE name='warrior'),  'fury',       '분노',   'melee_dps',  'melee',  '빠른 공격속도의 근접 딜러'),
((SELECT id FROM classes WHERE name='mage'),     'frost',      '냉기',   'cc',         'ranged', 'CC와 슬로우 특화 원거리'),
((SELECT id FROM classes WHERE name='mage'),     'fire',       '화염',   'ranged_dps', 'ranged', '광역 폭딜 원거리 딜러'),
((SELECT id FROM classes WHERE name='priest'),   'holy',       '신성',   'healer',     'ranged', '광역/폭힐 전환형 힐러'),
((SELECT id FROM classes WHERE name='priest'),   'shadow',     '암흑',   'ranged_dps', 'ranged', '0.8딜 0.2힐 원거리 딜힐러'),
((SELECT id FROM classes WHERE name='hunter'),   'beast',      '야수',   'ranged_dps', 'ranged', '소환수와 함께 싸우는 딜러'),
((SELECT id FROM classes WHERE name='warlock'),  'demon',      '악마',   'ranged_dps', 'ranged', '악마 소환수 특화 딜러');

-- =============================================
-- 초기 데이터: 영웅 템플릿 (MVP 8영웅)
-- =============================================
INSERT INTO hero_templates (name, spec_id, race_id, element_id, faction_id, rarity, base_hp, base_atk, base_def, base_speed, aggro_radius, attack_range, description) VALUES
-- 탱커: 드워프 방어 전사
('아이언포지 수호자',
  (SELECT id FROM specs WHERE name='protection'),
  (SELECT id FROM races WHERE name='orc'),
  (SELECT id FROM elements WHERE name='fire'),
  NULL, 'normal', 800, 30, 60, 2, 120, 40,
  '강인한 오크 전사. 넓은 어그로 범위로 몬스터를 붙잡는다.'),

-- 근딜: 오크 분노 전사
('피의 광전사',
  (SELECT id FROM specs WHERE name='fury'),
  (SELECT id FROM races WHERE name='orc'),
  (SELECT id FROM elements WHERE name='fire'),
  NULL, 'normal', 500, 80, 25, 4, 0, 40,
  '빠른 공격속도로 적을 난도질하는 근접 딜러.'),

-- 원딜: 인간 화염 마법사
('스톰윈드 화염술사',
  (SELECT id FROM specs WHERE name='fire' AND class_id=(SELECT id FROM classes WHERE name='mage')),
  (SELECT id FROM races WHERE name='human'),
  (SELECT id FROM elements WHERE name='fire'),
  NULL, 'normal', 350, 100, 10, 3, 0, 200,
  '강력한 화염 마법으로 적을 불태우는 원거리 딜러.'),

-- CC: 엘프 냉기 마법사
('달빛 냉기술사',
  (SELECT id FROM specs WHERE name='frost'),
  (SELECT id FROM races WHERE name='elf'),
  (SELECT id FROM elements WHERE name='frost'),
  NULL, 'normal', 370, 60, 12, 3, 0, 180,
  '냉기 마법으로 적을 얼리고 둔화시키는 CC 전문가.'),

-- 힐러: 인간 신성 사제
('성당의 사제',
  (SELECT id FROM specs WHERE name='holy'),
  (SELECT id FROM races WHERE name='human'),
  (SELECT id FROM elements WHERE name='holy'),
  NULL, 'normal', 400, 20, 15, 3, 0, 200,
  '신성한 빛으로 아군을 치유하는 힐러.'),

-- 원딜+힐: 언데드 암흑 사제
('망각의 암흑술사',
  (SELECT id FROM specs WHERE name='shadow'),
  (SELECT id FROM races WHERE name='undead'),
  (SELECT id FROM elements WHERE name='shadow'),
  NULL, 'normal', 380, 85, 12, 3, 0, 190,
  '어둠의 힘으로 적을 공격하며 아군을 보조 치유한다.'),

-- 원딜+소환: 엘프 야수 사냥꾼
('은빛숲 사냥꾼',
  (SELECT id FROM specs WHERE name='beast'),
  (SELECT id FROM races WHERE name='elf'),
  (SELECT id FROM elements WHERE name='frost'),
  NULL, 'normal', 420, 75, 18, 4, 0, 200,
  '야수 동반자와 함께 싸우는 사냥꾼.'),

-- 원딜+소환: 언데드 악마 흑마법사
('언더시티 소환사',
  (SELECT id FROM specs WHERE name='demon'),
  (SELECT id FROM races WHERE name='undead'),
  (SELECT id FROM elements WHERE name='shadow'),
  NULL, 'rare', 360, 90, 10, 3, 0, 190,
  '악마를 소환하여 전장을 지배하는 흑마법사.');

-- =============================================
-- 초기 데이터: 몬스터 템플릿
-- =============================================
INSERT INTO monster_templates (name, display_name, monster_type, hp, atk, def, speed, is_ranged, abilities_json) VALUES
('goblin',        '고블린',       'normal', 100,  15,  5,  3, FALSE, '[]'),
('skeleton',      '해골 병사',    'normal', 150,  20,  10, 2, FALSE, '[]'),
('wolf',          '늑대',         'normal', 80,   25,  3,  5, FALSE, '[]'),
('dark_archer',   '암흑 궁수',    'normal', 120,  30,  5,  3, TRUE,  '[]'),
('orc_grunt',     '오크 돌격병',  'elite',  400,  40,  25, 2, FALSE, '["charge"]'),
('necromancer',   '네크로맨서',   'elite',  300,  50,  15, 2, TRUE,  '["summon"]'),
('plague_beast',  '역병 괴수',    'elite',  500,  35,  30, 1, FALSE, '["aoe_poison"]'),
('troll_warlord', '트롤 전쟁군주','boss',   2000, 60,  40, 2, FALSE, '["enrage","cleave"]'),
('lich_king',     '리치 군주',    'boss',   3000, 80,  50, 1, TRUE,  '["frost_aura","summon","magic_immune"]'),
('void_walker',   '공허의 보행자','boss',   5000, 100, 60, 1, FALSE, '["damage_cap_1","split","cc_immune"]');

-- =============================================
-- 초기 데이터: 종족 확장 (오펜스 모드용)
-- =============================================
INSERT INTO races (name, display_name) VALUES
('goblin_race', '고블린'),
('tauren_race', '타우렌'),
('spirit_race', '정령'),
('demon_race',  '악마'),
('dracthyr_race', '드렉티르')
ON CONFLICT (name) DO NOTHING;

-- =============================================
-- 초기 데이터: 원소 확장 (오펜스 모드용)
-- =============================================
INSERT INTO elements (name, display_name) VALUES
('lightning', '번개'),
('nature',    '자연'),
('poison_el', '독'),
('water',     '물'),
('wind',      '바람'),
('dragon_el', '용'),
('light',     '빛')
ON CONFLICT (name) DO NOTHING;

-- =============================================
-- 초기 데이터: 영웅 템플릿 확장 (14개 랜드 보상 SSR)
-- =============================================
INSERT INTO hero_templates (name, spec_id, race_id, element_id, rarity, base_hp, base_atk, base_def, base_speed, aggro_radius, attack_range, description) VALUES
('고블린 워치프',
  (SELECT id FROM specs WHERE name='protection'),
  (SELECT id FROM races WHERE name='goblin_race'),
  (SELECT id FROM elements WHERE name='lightning'),
  'ssr', 1200, 80, 80, 3, 150, 50, '랜드 보상: 고블린 영지 지배자'),

('오크 검귀',
  (SELECT id FROM specs WHERE name='fury'),
  (SELECT id FROM races WHERE name='orc'),
  (SELECT id FROM elements WHERE name='fire'),
  'ssr', 900, 150, 40, 5, 0, 45, '랜드 보상: 오크 황야의 전설'),

('붉은갈기 족장',
  (SELECT id FROM specs WHERE name='protection'),
  (SELECT id FROM races WHERE name='tauren_race'),
  (SELECT id FROM elements WHERE name='nature'),
  'ssr', 1800, 70, 100, 2, 180, 55, '랜드 보상: 타우렌 봉우리의 수호자'),

('그림자 군주',
  (SELECT id FROM specs WHERE name='shadow'),
  (SELECT id FROM races WHERE name='elf'),
  (SELECT id FROM elements WHERE name='shadow'),
  'ssr', 800, 180, 30, 3, 0, 1200, '랜드 보상: 다크엘프의 그림자'),

('불꽃의 잿더미',
  (SELECT id FROM specs WHERE name='fire' AND class_id=(SELECT id FROM classes WHERE name='mage')),
  (SELECT id FROM races WHERE name='spirit_race'),
  (SELECT id FROM elements WHERE name='fire'),
  'ssr', 850, 200, 25, 3, 0, 1000, '랜드 보상: 화염의 땅의 화신'),

('서리눈송이 여왕',
  (SELECT id FROM specs WHERE name='frost'),
  (SELECT id FROM races WHERE name='elf'),
  (SELECT id FROM elements WHERE name='frost'),
  'ssr', 750, 120, 30, 3, 0, 1500, '랜드 보상: 얼음 나라의 통치자'),

('죽음의 기사',
  (SELECT id FROM specs WHERE name='protection'),
  (SELECT id FROM races WHERE name='undead'),
  (SELECT id FROM elements WHERE name='shadow'),
  'ssr', 2000, 90, 90, 2, 150, 50, '랜드 보상: 버림받은 도시의 기사'),

('맹독술사',
  (SELECT id FROM specs WHERE name='shadow'),
  (SELECT id FROM races WHERE name='orc'),
  (SELECT id FROM elements WHERE name='poison_el'),
  'ssr', 800, 160, 35, 3, 0, 1100, '랜드 보상: 맹독 늪지대의 지배자'),

('용병왕',
  (SELECT id FROM specs WHERE name='fury'),
  (SELECT id FROM races WHERE name='human'),
  (SELECT id FROM elements WHERE name='wind'),
  'ssr', 1100, 140, 50, 4, 0, 45, '랜드 보상: 혼돈의 용병 주둔지 왕'),

('정령학자',
  (SELECT id FROM specs WHERE name='frost'),
  (SELECT id FROM races WHERE name='human'),
  (SELECT id FROM elements WHERE name='light'),
  'ssr', 700, 130, 25, 3, 0, 1300, '랜드 보상: 정령의 안식처 대마법사'),

('심해의 지배자',
  (SELECT id FROM specs WHERE name='holy'),
  (SELECT id FROM races WHERE name='undead'),
  (SELECT id FROM elements WHERE name='water'),
  'ssr', 900, 60, 40, 3, 0, 800, '랜드 보상: 심해의 신전 수호신'),

('대천사',
  (SELECT id FROM specs WHERE name='holy'),
  (SELECT id FROM races WHERE name='human'),
  (SELECT id FROM elements WHERE name='light'),
  'ssr', 1000, 50, 60, 3, 0, 1000, '랜드 보상: 천공의 성채 신성 존재'),

('파멸의 악마군주',
  (SELECT id FROM specs WHERE name='demon'),
  (SELECT id FROM races WHERE name='demon_race'),
  (SELECT id FROM elements WHERE name='fire'),
  'ssr', 1500, 180, 50, 4, 0, 50, '랜드 보상: 악마 균열의 사령관'),

('고대 드래곤 위상',
  (SELECT id FROM specs WHERE name='fire' AND class_id=(SELECT id FROM classes WHERE name='mage')),
  (SELECT id FROM races WHERE name='dracthyr_race'),
  (SELECT id FROM elements WHERE name='dragon_el'),
  'ssr', 3000, 250, 120, 3, 0, 2000, '랜드 보상: 용의 탑 태초의 용');
