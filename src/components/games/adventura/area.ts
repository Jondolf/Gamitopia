import {
  Enemy,
  FloatingEye,
  WanderingZombie,
  Skeleton,
  Mummy,
  BlueSlime,
  ForestSlime,
  Vampire,
  SpookyGhost,
  JackOLantern,
  CaveBat,
  Snowman,
  FireSlime,
  FireOrb,
  ForestOrb,
  IceOrb,
  RoyalKnight,
  RedWizard,
  EvilPenguin
} from '@/components/games/adventura/enemy';

import {
  KingSlime,
  Boss,
  MummifiedPharaoh,
  EvilKing,
  GiantIceCube
} from '@/components/games/adventura/boss';

//Enemies
const blueSlime = new BlueSlime();
const fireSlime = new FireSlime();
const forestSlime = new ForestSlime();
const fireOrb = new FireOrb();
const forestOrb = new ForestOrb();
const iceOrb = new IceOrb();
const mummy = new Mummy();
const royalKnight = new RoyalKnight();
const redWizard = new RedWizard();
const snowman = new Snowman();
const evilPenguin = new EvilPenguin();
const vampire = new Vampire();
const wanderingZombie = new WanderingZombie();
const spookyGhost = new SpookyGhost();
const skeleton = new Skeleton();
const jackOLantern = new JackOLantern();
const caveBat = new CaveBat();
const floatingEye = new FloatingEye();

//Bosses
const kingSlime = new KingSlime();
const mummifiedPharaoh = new MummifiedPharaoh();
const evilKing = new EvilKing();
const giantIceCube = new GiantIceCube();

export class Area {
  constructor(
    public name: string,
    public bossDefeatedToUnlock: string,
    public enemiesInArea: Enemy[],
    public areaBoss: Boss,
    public coinRange: number,
    public backgroundImgSrc: string | null,
    public animatableBackgroundImgSrc: string | null,
    public groundImgSrc: string,
    public backgroundMusicSrc: string
  ) {}
}

export class Grasslands extends Area {
  constructor() {
    super(
      'The Grasslands',
      '',
      [blueSlime],
      kingSlime,
      Math.random() * 2 + 1,
      require('@/assets/images/adventura/background/grasslands-background.png'),
      require('@/assets/images/adventura/background/grasslands-background-animatable.png'),
      require('@/assets/images/adventura/background/grasslands-ground.png'),
      require('@/assets/sound/adventura-battle-grasslands.mp3')
    );
  }
}

export class Desert extends Area {
  constructor() {
    super(
      'The Desert',
      'King slime',
      [mummy, fireSlime, fireOrb],
      mummifiedPharaoh,
      Math.random() * 5 + 3,
      require('@/assets/images/adventura/background/desert-background.png'),
      null,
      require('@/assets/images/adventura/background/desert-ground.png'),
      require('@/assets/sound/adventura-battle-desert.mp3')
    );
  }
}

export class Castle extends Area {
  constructor() {
    super(
      'The Castle',
      'Mummified pharaoh',
      [royalKnight, redWizard],
      evilKing,
      Math.random() * 7 + 8,
      require('@/assets/images/adventura/background/castle-background.png'),
      require('@/assets/images/adventura/background/castle-background-animatable.png'),
      require('@/assets/images/adventura/background/castle-ground.png'),
      require('@/assets/sound/adventura-battle-grasslands.mp3')
    );
  }
}

export class Forest extends Area {
  constructor() {
    super(
      'The Forest',
      'Evil king',
      [forestSlime, forestOrb],
      mummifiedPharaoh,
      Math.random() * 5 + 20,
      require('@/assets/images/adventura/background/forest-background.png'),
      null,
      require('@/assets/images/adventura/background/forest-ground.png'),
      require('@/assets/sound/adventura-battle-forest.mp3')
    );
  }
}

export class SnowLands extends Area {
  constructor() {
    super(
      'The Snowlands',
      'Evil king',
      [snowman, evilPenguin, iceOrb],
      giantIceCube,
      Math.random() * 5 + 15,
      require('@/assets/images/adventura/background/snowlands-background.png'),
      null,
      require('@/assets/images/adventura/background/snowlands-ground.png'),
      require('@/assets/sound/adventura-battle-snowlands.mp3')
    );
  }
}

export class BlueAbyss extends Area {
  constructor() {
    super(
      'The Blue Abyss',
      'Snow golem',
      [blueSlime],
      mummifiedPharaoh,
      Math.random() * 5 + 250,
      require('@/assets/images/adventura/background/blue-abyss-background.png'),
      require('@/assets/images/adventura/background/blue-abyss-background-animatable.png'),
      require('@/assets/images/adventura/background/blue-abyss-ground.png'),
      require('@/assets/sound/adventura-battle-snowlands.mp3')
    );
  }
}

export class LandOfTheDead extends Area {
  constructor() {
    super(
      'The Land of The Dead',
      '',
      [wanderingZombie, skeleton, vampire, caveBat, jackOLantern],
      mummifiedPharaoh,
      Math.random() * 5 + 495,
      null,
      require('@/assets/images/adventura/background/land-of-the-dead-background.png'),
      require('@/assets/images/adventura/background/land-of-the-dead-ground.png'),
      require('@/assets/sound/adventura-battle-grasslands.mp3')
    );
  }
}
