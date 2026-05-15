export type EffectType = 
  | 'damage' 
  | 'heal' 
  | 'shield' 
  | 'hot' 
  | 'dot' 
  | 'buff' 
  | 'projectile' 
  | 'explosion' 
  | 'stun' 
  | 'slow';

export interface SkillEffect {
  type: EffectType;
  value?: number;          // Damage multiplier or flat value
  radius?: number;         // AOE radius
  duration?: number;       // Duration for shield/hot/dot/stun/buff
  chance?: number;         // Proc chance (0.0 - 1.0)
  color?: string;          // Visual color
  projectileType?: string; // Type of projectile to spawn
  stat?: string;           // Stat for buff (atk, def, speed, etc)
  isMultiplier?: boolean;  // If true, value is treated as multiplier (e.g. 1.5x)
}

export interface SkillDefinition {
  id: string;
  cooldown: number;
  targetType: 'closest_enemy' | 'self' | 'lowest_hp_ally' | 'all_enemies' | 'all_allies' | 'random_enemy';
  effects: SkillEffect[];
}
