import { Weapon } from './weapon';
export class Melee extends Weapon {
  constructor(
    name: string,
    public minDamage: number,
    public maxDamage: number
  ) {
    super(name);
  }

  get damage() {
    return this.getRandomDamage(this.minDamage, this.maxDamage);
  }
}

export class IronSword extends Melee {
  constructor() {
    super('Iron sword', 1, 4);
  }
}
