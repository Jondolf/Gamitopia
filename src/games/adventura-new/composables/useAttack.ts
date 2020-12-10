type MagicElement = 'Fire' | 'Water';

interface AttackStats {
  minDamage: number;
  maxDamage: number;
  element?: MagicElement[]
}

function useAttack(attackStats: AttackStats) {

}