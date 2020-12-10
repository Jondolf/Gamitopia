export interface CreatureStats {
  name: string,
  health: number,
  mana: number,
  minDamage: number,
  maxDamage: number,
  weaknesses: (MagicElement | 'Physical')[],
  strengths: (MagicElement | 'Physical')[]
}