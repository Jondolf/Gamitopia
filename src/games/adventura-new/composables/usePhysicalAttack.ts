import { CreatureStats } from '../creatureStats';

export function usePhysicalAttack(minDamage: number, maxDamage: number) {
  const attack = (target: CreatureStats) => {
    target.health -= minDamage + Math.round(Math.random() * (maxDamage - minDamage));
  }
}
