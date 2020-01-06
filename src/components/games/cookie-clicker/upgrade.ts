export class Upgrade {
  constructor(
    public name: string,
    public defaultCost: number,
    public cost: number,
    public level: number,
    public pointsToAdd: number // For example how many points to add per click
  ) {}
  getCostAfterUpgrade() {
    this.cost = Math.floor(this.defaultCost * Math.pow(1.1, this.level));
    this.level++;
  }
  static fromJSON(serializedJson: any) {
    return Object.assign(
      new Upgrade('', 0, 0, 0, 0 /* To avoid error */),
      serializedJson
    );
  }
}

export class PointsPerClick extends Upgrade {
  constructor() {
    super('Amount of points per click', 50, 50, 1, 1);
  }
}

export class SpeedOfPointsByTime extends Upgrade {
  constructor(public speed: number) {
    super('Speed of automatic cookies', 250, 250, 1, 0);
  }
}

export class AmountOfPointsByTime extends Upgrade {
  constructor() {
    super('Amount of automatic cookies', 500, 500, 1, 1);
  }
}
