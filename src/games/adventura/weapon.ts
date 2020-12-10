export class Weapon {
  constructor(public name: string) {}

  getRandomDamage(min: number, max: number) {
    return min + Math.round(Math.random() * (max - min));
  }
}
