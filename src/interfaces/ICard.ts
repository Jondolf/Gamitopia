export interface ICard {
  name: string;
  rarity: string;
  imgSrc: string;
  animatableImgSrc: string;
  maxHealth: number;
  currentHealth: number;
  power: number;
  specialMove: object;
  description: string;
}
