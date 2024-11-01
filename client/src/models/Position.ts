export class Position {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getColumnName = (i : number): string => {
    const letter = 'abcdefghijklmnopqrstuvwxyz'[i % 26]; 
    return letter
  }

  samePosition(otherPosition: Position): boolean {
    return this.x === otherPosition.x && this.y === otherPosition.y;
  }

  clone(): Position {
    return new Position(this.x, this.y);
  }

  getAlgebraic(): string {
    return this.getColumnName(this.x) + (this.y + 1).toString()
  }
}
