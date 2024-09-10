import { M2 } from "./matrix";
import { Vector2D } from "./vector";

export class M2C {

  protected components: [[Vector2D, Vector2D], [Vector2D, Vector2D]];
  public attributes: { [key: string]: boolean | number | string | null } = {};

  constructor(components: [[Vector2D, Vector2D], [Vector2D, Vector2D]], attributes?: { [key: string]: boolean | number | string | null } ) {
    this.components = components;
    this.attributes = {...this.attributes, ...attributes};
  }

  public getComponent(i: 0 | 1, j: 0 | 1): Vector2D { return this.components[i][j]; }
  public getComponents(): [[Vector2D, Vector2D], [Vector2D, Vector2D]] {
    return [
      [this.components[0][0], this.components[0][1]],
      [this.components[1][0], this.components[1][1]]
    ];
  }

  public setComponent(i: 0 | 1, j: 0 | 1, v: Vector2D): M2C { this.components[i][j] = v; return this; }
  public setComponented(i: 0 | 1, j: 0 | 1, v: Vector2D): M2C { 
    let m2 = new M2C([
      [this.components[0][0], this.components[0][1]],
      [this.components[1][0], this.components[1][1]]
    ]);
    return m2.setComponent(i, j, v);
  }
  public setComponents(components: [[Vector2D, Vector2D], [Vector2D, Vector2D]]): M2C {
    this.components[0][0] = components[0][0]; this.components[0][1] = components[0][1]; 
    this.components[1][0] = components[1][0]; this.components[1][1] = components[1][1]; 
    return this;
  }

  public getColumn(c: 0 | 1): { x: Vector2D, y: Vector2D } { return { x: this.components[0][c], y: this.components[1][c] }; }
  public getRow(r: 0 | 1): { x: Vector2D, y: Vector2D } { return { x: this.components[r][0], y: this.components[r][1] }; }
  public setColumn(c: 0 | 1, components: { x: Vector2D, y: Vector2D }): M2C { this.components[0][c] = components.x; this.components[1][c] = components.y; return this; }
  public setColumned(c: 0 | 1, components: { x: Vector2D, y: Vector2D }): M2C { return (new M2C(this.getComponents())).setColumn(c, components); }
  public setRow(r: 0 | 1, components: { x: Vector2D, y: Vector2D }): M2C { this.components[r][0] = components.x, this.components[r][1] = components.y; return this; }
  public setRowed(r: 0 | 1, components: { x: Vector2D, y: Vector2D }): M2C { return (new M2C(this.getComponents())).setRow(r, components); }

  public transpose(): M2C { let m2 = this.transposed(); this.setRow(0, m2.getColumn(0)).setRow(1, m2.getColumn(1)); return this; }
  public transposed(): M2C { return (new M2C(this.getComponents())).setRow(0, this.getColumn(0)).setRow(1, this.getColumn(1)); }

  public scale(c: Vector2D): M2C {
    this.components[0][0].complex.multiply(c); this.components[0][1].complex.multiply(c); 
    this.components[1][0].complex.multiply(c); this.components[1][1].complex.multiply(c);
    return this;
  }
  public scaled(c: Vector2D): M2C { return (new M2C(this.getComponents())).scale(c); }

  public determinant(): Vector2D { 
    return this.components[0][0].complex.multiplied(this.components[1][1]).added(
      this.components[0][1].complex.multiplied(this.components[1][0]).scaled(-1)
    );
  }
  public trace(): Vector2D { return this.components[0][0].added(this.components[1][1]); }

  public add(B: M2C): M2C {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        this.components[i][j].add(B.components[i][j]);
      }
    }
    return this;
  }
  public added(B: M2C): M2C {
    let copy = this.scaled(new Vector2D({x: 1, y: 0}));
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        copy.components[i][j] = this.components[i][j].added(B.components[i][j]);
      }
    }
    return copy;
  }
  public multiply(B: M2C): M2C {
    let copy = this.scaled(new Vector2D({x: 1, y: 0}));
    this.components[0][0] = copy.components[0][0].complex.multiplied(B.components[0][0]).added(copy.components[0][1].complex.multiplied(B.components[1][0]));
    this.components[1][0] = copy.components[1][0].complex.multiplied(B.components[0][0]).added(copy.components[1][1].complex.multiplied(B.components[1][0]));
    this.components[0][1] = copy.components[0][0].complex.multiplied(B.components[0][1]).added(copy.components[0][1].complex.multiplied(B.components[1][1]));
    this.components[1][1] = copy.components[1][0].complex.multiplied(B.components[0][1]).added(copy.components[1][1].complex.multiplied(B.components[1][1]));
    return this;
  }
  public multiplied(B: M2C): M2C {
    let copy = this.scaled(new Vector2D({x: 1, y: 0}));
    copy.components[0][0] = this.components[0][0].complex.multiplied(B.components[0][0]).added(this.components[0][1].complex.multiplied(B.components[1][0]));
    copy.components[1][0] = this.components[1][0].complex.multiplied(B.components[0][0]).added(this.components[1][1].complex.multiplied(B.components[1][0]));
    copy.components[0][1] = this.components[0][0].complex.multiplied(B.components[0][1]).added(this.components[0][1].complex.multiplied(B.components[1][1]));
    copy.components[1][1] = this.components[1][0].complex.multiplied(B.components[0][1]).added(this.components[1][1].complex.multiplied(B.components[1][1]));
    return copy;
  }
  public inverse(): M2C { this.setComponents(this.inversed().getComponents()); return this; }
  public inversed(): M2C { 
    let d = this.determinant(); 
    return (new M2C([
      [this.components[1][1], this.components[0][1].scaled(-1)],
      [this.components[1][0].scaled(-1), this.components[0][0]]
    ])).scale(d.complex.inverse());
  }

  public eigenvalues(): [Vector2D, Vector2D] {
    let d = this.determinant(); let t = this.trace();
    let half = new Vector2D({x: 1/2, y: 0});
    let discriminant = t.complex.multiplied(t).added(d.scaled(-4)).complex.powed(half);
    return [
      t.add(discriminant.scaled(-1)).scaled(1/2),
      t.add(discriminant).scaled(1/2),
    ];
  }
  public eigenvectors(): [{x: Vector2D, y: Vector2D}, {x: Vector2D, y: Vector2D}] {
    let eigenvalues = this.eigenvalues();
    return [
      {
        x: eigenvalues[0].added(this.components[1][0].scaled(-1)),
        y: this.components[1][0]
      },
      {
        x: this.components[0][1],
        y: eigenvalues[1].added(this.components[0][0].scaled(-1))
      }
    ];
  }

  public PDPinvDecomposition(): {P: M2C, D: M2C, Pi: M2C} {
    let eigenvalues = this.eigenvalues();
    let eigenvectors = this.eigenvectors();
    let d = new M2C([
      [eigenvalues[0], new Vector2D({x: 0, y: 0})],
      [new Vector2D({x: 0, y: 0}), eigenvalues[1]]
    ]);
    let p = new M2C([
      [eigenvectors[0].x, eigenvectors[1].x],
      [eigenvectors[0].y, eigenvectors[1].y]
    ]);
    let pi = p.inversed();
    return {P: p, D: d, Pi: pi};
  }

  public pow(e: Vector2D): M2C {
    let pdp = this.PDPinvDecomposition();
    pdp.D.components[0][0].complex.pow(e);
    pdp.D.components[1][1].complex.pow(e);
    let r = pdp.P.multiplied(pdp.D).multiplied(pdp.Pi);
    this.setComponents(r.getComponents());
    return this;
  }
  public powed(e: Vector2D): M2C {
    let pdp = this.PDPinvDecomposition();
    pdp.D.components[0][0].complex.pow(e);
    pdp.D.components[1][1].complex.pow(e);
    let r = pdp.P.multiplied(pdp.D).multiplied(pdp.Pi);
    return r;
  }
  public exp(): M2C {
    let pdp = this.PDPinvDecomposition();
    pdp.D.components[0][0].complex.exp()
    pdp.D.components[1][1].complex.exp();
    let r = pdp.P.multiplied(pdp.D).multiplied(pdp.Pi);
    this.setComponents(r.getComponents());
    return this;
  }
  public exped(): M2C {
    let pdp = this.PDPinvDecomposition();
    pdp.D.components[0][0].complex.exp()
    pdp.D.components[1][1].complex.exp();
    let r = pdp.P.multiplied(pdp.D).multiplied(pdp.Pi);
    return r;
  }

  public toString(): string {
    let maxStringLength = Math.max(...this.components.flat().map(v => v.complex.toString().length));
    let s = `[ ${this.components[0][0].complex.toString().padStart(maxStringLength, ' ')}  ${this.components[0][1].complex.toString().padStart(maxStringLength, ' ')}]`;
    s += '\n' + `[ ${this.components[1][0].complex.toString().padStart(maxStringLength, ' ')}  ${this.components[1][1].complex.toString().padStart(maxStringLength, ' ')}]`;
    return s;
  }

  // public reM2(): M2 {
  //   return new M2([
  //     [this.components[0][0].x(), this.components[0][1].x()],
  //     [this.components[1][0].x(), this.components[1][1].x()]
  //   ]);
  // }
}