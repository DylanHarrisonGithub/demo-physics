export class M2 {

  protected components: [[number, number], [number, number]] = [[0, 0], [0, 0]];
  public attributes: { [key: string]: boolean | number | string | null } = {};

  constructor(components: [[number, number], [number, number]], attributes?: { [key: string]: boolean | number | string | null } ) {
    this.components = components;
    this.attributes = {...this.attributes, ...attributes};
  }

  public getComponent(i: 0 | 1, j: 0 | 1): number { return this.components[i][j]; }
  public getComponents(): [[number, number], [number, number]] {
    return [
      [this.components[0][0], this.components[0][1]],
      [this.components[1][0], this.components[1][1]]
    ];
  }
  public setComponent(i: 0 | 1, j: 0 | 1, v: number): M2 { this.components[i][j] = v; return this; }
  public setComponented(i: 0 | 1, j: 0 | 1, v: number): M2 { 
    let m2 = new M2([
      [this.components[0][0], this.components[0][1]],
      [this.components[1][0], this.components[1][1]]
    ]);
    return m2.setComponent(i, j, v);
  }
  public setComponents(components: [[number, number], [number, number]]): M2 {
    this.components[0][0] = components[0][0]; this.components[0][1] = components[0][1]; 
    this.components[1][0] = components[1][0]; this.components[1][1] = components[1][1]; 
    return this;
  }
  public getColumn(c: 0 | 1): { x: number, y: number } { return { x: this.components[0][c], y: this.components[1][c] }; }
  public getRow(r: 0 | 1): { x: number, y: number } { return { x: this.components[r][0], y: this.components[r][1] }; }
  public setColumn(c: 0 | 1, components: { x: number, y: number }): M2 { this.components[0][c] = components.x; this.components[1][c] = components.y; return this; }
  public setColumned(c: 0 | 1, components: { x: number, y: number }): M2 { return (new M2(this.getComponents())).setColumn(c, components); }
  public setRow(r: 0 | 1, components: { x: number, y: number }): M2 { this.components[r][0] = components.x, this.components[r][1] = components.y; return this; }
  public setRowed(r: 0 | 1, components: { x: number, y: number }): M2 { return (new M2(this.getComponents())).setRow(r, components); }

  public transpose(): M2 { let m2 = this.transposed(); this.setRow(0, m2.getColumn(0)).setRow(1, m2.getColumn(1)); return this; }
  public transposed(): M2 { return (new M2(this.getComponents())).setRow(0, this.getColumn(0)).setRow(1, this.getColumn(1)); }

  public scale(c: number): M2 {
    this.components[0][0] *= c; this.components[0][1] *= c; 
    this.components[1][0] *= c; this.components[1][1] *= c; 
    return this;
  }
  public scaled(c: number): M2 { return (new M2(this.getComponents())).scale(c); }
  // scaleRow(); scaleColumn()

  // get eigenvalues() eigenvectors()
  // get rank()
  public determinant(): number { return this.components[0][0]*this.components[1][1] - this.components[0][1]*this.components[1][0]; }
  public trace(): number { return this.components[0][0] + this.components[1][1]; }
  public inverse(): M2 | null { let i = this.inversed(); return i ? this.setComponents(i!.getComponents()) : null;}
  public inversed(): M2 | null { 
    let d = this.determinant(); 
    if (d) {
      return (new M2([
        [this.components[1][1], -this.components[0][1]],
        [-this.components[1][0], this.components[0][0]]
      ])).scale(1.0/d);
    } else {
      return null;
    }
  }
  // decompositions LU, PDP, QR

  public add(B: M2) { return this.setComponents(this.added(B).getComponents()); }
  public added(B: M2) {
    return new M2([
      [this.components[0][0]+B.components[0][0], this.components[0][1]*B.components[0][1]],
      [this.components[1][0]+B.components[1][0], this.components[1][1]*B.components[1][1]]
    ]);
  }
  public multiply(B: M2): M2 { return this.setComponents(this.multiplied(B).getComponents()); }
  public multiplied(B: M2): M2 {
    return new M2([
      [this.components[0][0]*B.components[0][0] + this.components[0][1]*B.components[1][0], this.components[0][0]*B.components[0][1] + this.components[0][1]*B.components[1][1]],
      [this.components[1][0]*B.components[0][0] + this.components[1][1]*B.components[1][0], this.components[1][0]*B.components[0][1] + this.components[1][1]*B.components[1][1]]
    ]);
  }

  public vecMultiply(v: {x: number, y: number}): {x: number, y: number} {
    return {
      x: this.components[0][0]*v.x + this.components[0][1]*v.y,
      y: this.components[1][0]*v.x + this.components[1][1]*v.y,
    }
  }

}