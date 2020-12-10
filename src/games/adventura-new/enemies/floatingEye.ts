import { reactive } from "vue";
import { CreatureStats } from '../creatureStats';

function FloatingEye() {
  const stats = reactive<CreatureStats>({
    name: 'Floating eye',
    health: 15,
    mana: 0,
    minDamage: 2,
    maxDamage: 6,
    weaknesses: [],
    strengths: []
  })
  const { attack } = usePhysicalAttack(stats.minDamage, stats.maxDamage);
  const { currentAnimationFrame } = useSpriteAnimation('@/assets/images/adventura/enemy/floating-eye', 100)

  return {
    stats, attack, currentAnimationFrame
  }
}
