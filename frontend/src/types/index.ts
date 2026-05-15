export interface User {
  id: number;
  email: string;
  username: string;
  avatarUrl: string | null;
  level: number;
  experience: number;
  gold: number;
  crystals: number;
  isOnline: boolean;
  createdAt: string;
  lastLogin: string | null;
  ownedHeroIds?: string[];
}

export interface AuthResponse {
  user: Pick<User, 'id' | 'email' | 'username'>;
  access_token: string;
}

export interface HeroTemplate {
  id: number;
  name: string;
  rarity: string;
  baseHp: number;
  baseAtk: number;
  baseDef: number;
  baseSpeed: number;
  attackRange: number;
  aggroRadius: number;
  description: string | null;
  spec: {
    id: number;
    name: string;
    displayName: string;
    role: string;
    rangeType: string;
    gameClass: {
      id: number;
      name: string;
      displayName: string;
    };
  };
  race: {
    id: number;
    name: string;
    displayName: string;
  };
  element: {
    id: number;
    name: string;
    displayName: string;
  };
  faction: {
    id: number;
    name: string;
    displayName: string;
  } | null;
}

export interface UserHero {
  id: number;
  level: number;
  experience: number;
  talentPoints: number;
  template: HeroTemplate;
}
