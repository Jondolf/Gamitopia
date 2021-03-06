import { Melee, IronSword } from '@/games/adventura/melee';
import {
  Magic,
  FireScroll,
  WaterScroll,
  EarthScroll,
  AirScroll,
  LightningScroll,
  HealScroll,
  IceScroll
} from '@/games/adventura/magic';

const ironSword = new IronSword();
const fireScroll = new FireScroll();
const waterScroll = new WaterScroll();
const iceScroll = new IceScroll();
const earthScroll = new EarthScroll();
const airScroll = new AirScroll();
const lightningScroll = new LightningScroll();
const healScroll = new HealScroll(6);

export class Boss {
  constructor(
    public name: string,
    public health: number,
    public mana: number,
    public min: number,
    public max: number,
    public weakness: string[],
    public strength: string[],
    public coinsDropped: number,
    public itemDropped: Melee | Magic,
    public imgSrc: string
  ) { }

  getDamage(min: number, max: number) {
    return min + Math.round(Math.random() * (max - min));
  }

  get damage() {
    return this.getDamage(this.min, this.max);
  }
}

export class KingSlime extends Boss {
  constructor() {
    super(
      'King slime',
      25,
      0,
      2,
      4,
      ['Melee'],
      [''],
      25,
      waterScroll,
      require('@/assets/images/adventura/boss/king-slime.png')
    );
  }
}

export class MummifiedPharaoh extends Boss {
  constructor() {
    super(
      'Mummified pharaoh',
      30,
      0,
      3,
      5,
      ['Water'],
      [''],
      100,
      iceScroll,
      require('@/assets/images/adventura/boss/mummified-pharaoh.png')
    );
  }
}

export class EvilKing extends Boss {
  constructor() {
    super(
      'Evil king',
      45,
      0,
      5,
      8,
      [''],
      [''],
      200,
      earthScroll,
      require('@/assets/images/adventura/boss/evil-king.png')
    );
  }
}

export class GiantIceCube extends Boss {
  constructor() {
    super(
      'Giant ice cube',
      60,
      0,
      8,
      10,
      ['Fire', 'Water'],
      ['Ice'],
      350,
      airScroll,
      require('@/assets/images/adventura/boss/giant-ice-cube.png')
    );
  }
}
