
export class Enemy {
  constructor(
    public name: string,
    public health: number,
    public mana: number,
    public min: number,
    public max: number,
    public weakness: string[],
    public strength: string[],
    public imgSrc: string
  ) { }

  getDamage(min: number, max: number) {
    return min + Math.round(Math.random() * (max - min));
  }

  get damage() {
    return this.getDamage(this.min, this.max);
  }
}

export class FloatingEye extends Enemy {
  constructor() {
    super(
      'Floating eye',
      15,
      0,
      2,
      6,
      [''],
      [''],
      require('@/assets/images/adventura/enemy/floating-eye.png')
    );
  }
}

export class WanderingZombie extends Enemy {
  constructor() {
    super(
      'Wandering zombie',
      20,
      0,
      1,
      4,
      [''],
      [''],
      require('@/assets/images/adventura/enemy/wandering-zombie.png')
    );
  }
}

export class Skeleton extends Enemy {
  constructor() {
    super(
      'Skeleton',
      18,
      0,
      3,
      6,
      ['Melee'],
      [''],
      require('@/assets/images/adventura/enemy/skeleton.png')
    );
  }
}

export class BlueSlime extends Enemy {
  constructor() {
    super(
      'Blue slime',
      8,
      0,
      1,
      2,
      ['Melee'],
      ['Fire', 'Water', 'Earth', 'Lightning', 'Air'],
      require('@/assets/images/adventura/enemy/blue-slime.png')
    );
  }
}

export class Mummy extends Enemy {
  constructor() {
    super(
      'Mummy',
      10,
      0,
      2,
      3,
      ['Water'],
      ['Fire'],
      require('@/assets/images/adventura/enemy/mummy.png')
    );
  }
}

export class FireSlime extends Enemy {
  constructor() {
    super(
      'Fire slime',
      8,
      0,
      2,
      4,
      ['Melee', 'Water'],
      ['Fire', 'Earth', 'Lightning', 'Air'],
      require('@/assets/images/adventura/enemy/fire-slime.png')
    );
  }
}

export class FireOrb extends Enemy {
  constructor() {
    super(
      'Fire orb',
      6,
      0,
      3,
      6,
      ['Water', 'Ice'],
      ['Fire'],
      require('@/assets/images/adventura/enemy/fire-orb.png')
    );
  }
}

export class RoyalKnight extends Enemy {
  constructor() {
    super(
      'Royal knight',
      15,
      0,
      4,
      5,
      [],
      [],
      require('@/assets/images/adventura/enemy/knight.png')
    );
  }
}
export class RedWizard extends Enemy {
  constructor() {
    super(
      'Red wizard',
      12,
      0,
      3,
      6,
      ['Melee'],
      ['Fire'],
      require('@/assets/images/adventura/enemy/red-wizard.png')
    );
  }
}
export class ForestSlime extends Enemy {
  constructor() {
    super(
      'Forest slime',
      20,
      0,
      4,
      7,
      ['Melee'],
      ['Fire', 'Water', 'Earth', 'Lightning', 'Air'],
      require('@/assets/images/adventura/enemy/forest-slime.png')
    );
  }
}
export class ForestOrb extends Enemy {
  constructor() {
    super(
      'Forest orb',
      18,
      0,
      5,
      8,
      [],
      ['Earth'],
      require('@/assets/images/adventura/enemy/forest-orb.png')
    );
  }
}
export class IceOrb extends Enemy {
  constructor() {
    super(
      'Ice orb',
      18,
      0,
      5,
      7,
      ['Fire'],
      ['Ice'],
      require('@/assets/images/adventura/enemy/ice-orb.png')
    );
  }
}

export class Snowman extends Enemy {
  constructor() {
    super(
      'Snowman',
      20,
      0,
      4,
      6,
      ['Fire', 'Melee'],
      ['Ice'],
      require('@/assets/images/adventura/enemy/snowman.png')
    );
  }
}

export class EvilPenguin extends Enemy {
  constructor() {
    super(
      'Evil penguin',
      22,
      0,
      5,
      6,
      ['Fire', 'Melee'],
      ['Ice', 'Water'],
      require('@/assets/images/adventura/enemy/evil-penguin.png')
    );
  }
}

export class Vampire extends Enemy {
  constructor() {
    super(
      'Vampire',
      20,
      0,
      5,
      6,
      ['Fire'],
      [''],
      require('@/assets/images/adventura/enemy/vampire.png')
    );
  }
}

export class SpookyGhost extends Enemy {
  constructor() {
    super(
      'Spooky ghost',
      12,
      0,
      6,
      7,
      [''],
      ['Melee'],
      require('@/assets/images/adventura/enemy/spooky-ghost.png')
    );
  }
}

export class CaveBat extends Enemy {
  constructor() {
    super(
      'Cave bat',
      10,
      0,
      3,
      5,
      ['Melee', 'Fire'],
      [''],
      require('@/assets/images/adventura/enemy/cave-bat.png')
    );
  }
}

export class JackOLantern extends Enemy {
  constructor() {
    super(
      "Jack o' lantern",
      12,
      0,
      6,
      7,
      ['Melee', 'Water'],
      ['Fire'],
      require('@/assets/images/adventura/enemy/jack-o-lantern.png')
    );
  }
}
