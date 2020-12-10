import { Weapon } from './weapon';
export class Magic extends Weapon {
  constructor(
    public name: string,
    public minDamage: number,
    public maxDamage: number,
    public manaConsumed: number
  ) {
    super(name);
  }

  get damage() {
    return this.getRandomDamage(this.minDamage, this.maxDamage);
  }

  get manaToConsume() {
    return this.manaConsumed;
  }
}

export class FireScroll extends Magic {
  constructor() {
    super('Fire scroll', 3, 8, 5);
  }
}

export class IceScroll extends Magic {
  constructor() {
    super('Ice scroll', 3, 7, 4);
  }
}

export class WaterScroll extends Magic {
  constructor() {
    super('Water scroll', 2, 6, 3);
  }
}

export class EarthScroll extends Magic {
  constructor() {
    super('Earth scroll', 5, 7, 5);
  }
}

export class AirScroll extends Magic {
  constructor() {
    super('Air scroll', 3, 5, 2);
  }
}

export class LightningScroll extends Magic {
  constructor() {
    super('Lightning scroll', 6, 8, 6);
  }
}

export class HealScroll extends Magic {
  constructor(public heal: number) {
    super('Heal scroll', 0, 0, 4);
  }
}
