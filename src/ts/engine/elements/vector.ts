export class Vector2D {

  public components: {x: number, y: number};            // should be protected but you playin
  public attributes: { [key: string]: boolean | number | string | null } = {}

  constructor(components: {x: number, y: number}, attributes?: { [key: string]: boolean | number | string | null }) {
    this.components = components; 
    this.attributes = {...this.attributes, ...attributes};
  }

  public toString(): string { return `(${this.components.x}, ${this.components.y})`; }
  public x(): number { return this.components.x; }
  public y(): number { return this.components.y; }
  public getComponents(): {x: number, y: number} { return this.components }

  public m(): number { return Math.sqrt(this.components.x*this.components.x + this.components.y*this.components.y); }
  public mm(): number { return this.components.x*this.components.x + this.components.y*this.components.y; }
  public t(): number { let t = Math.atan2(this.components.y, this.components.x); if (t < 0) t += 2*Math.PI; return t; } //t1 - 2*Math.PI*Math.floor(t1/(Math.PI*2))

  public dot(b: Vector2D): number { return this.x()*b.x() + this.y()*b.y(); }
  public det(b: Vector2D): number { return this.x()*b.y() - this.y()*b.x(); }
  public projectedScalar(b: Vector2D): number { return this.dot(b)/b.m(); }
  public rejectedScalar(b: Vector2D): number { return this.det(b)/b.m(); }

  // present tense indicates mutation of THIS whereas past tense indicates production of new Vector2d while preserving THIS
  public scale(c: number): Vector2D { this.components.x *= c; this.components.y *= c; return this; }
  public scaled(c: number): Vector2D { return new Vector2D({x: this.components.x*c, y: this.components.y*c }, {...this.attributes}); }
  public size(m: number): Vector2D { return this.scale(m/this.m()); }
  public sized(m: number): Vector2D { return (new Vector2D({x: this.components.x, y: this.components.y}, {...this.attributes})).scale(m/this.m()); }
  public angle(a: number): Vector2D { let m = this.m(); this.components.x = m*Math.cos(a); this.components.y = m*Math.sin(a); return this }
  public angled(a: number): Vector2D { let m = this.m(); return new Vector2D({x: m*Math.cos(a), y: m*Math.sin(a)}, {...this.attributes}); }
  public rotate(t: number): Vector2D { 
    var ct = Math.cos(t); var st = Math.sin(t);
		var a = this.components.x; var b = this.components.y;
		this.components.x = a*ct - b*st; this.components.y = a*st + b*ct;
    return this;
  }
  public rotated(t: number): Vector2D { 
    let ct = Math.cos(t); let st = Math.sin(t);
    return new Vector2D(
      { x: this.components.x*ct - this.components.y*st, y: this.components.x*st + this.components.y*ct },
      {...this.attributes}
    );
  }
  public reflect(b: Vector2D): Vector2D {
    let x = this.components.x; let y = this.components.y;
    let squares = b.x()*b.x() - b.y()*b.y();
    let prod = 2*b.x()*b.y();
    this.components.x = x*squares + y*prod;
    this.components.y = x*prod + y*squares;
    this.scale(1/b.mm());
    return this;
  }
  public reflected(b: Vector2D): Vector2D { return (new Vector2D({ x: this.components.x, y: this.components.y })).reflect(b); }
  public transform(M: [[number, number], [number, number]]): Vector2D {
    let a = M[0][0]*this.x() + M[0][1]*this.y(); let b = M[1][0]*this.x() + M[1][1]*this.y();
    this.components.x = a; this.components.y = b;
    return this;
  }
  public transformed(M: [[number, number], [number, number]]): Vector2D {
    return new Vector2D({x: M[0][0]*this.x() + M[0][1]*this.y(), y: M[1][0]*this.x() + M[1][1]*this.y()}, {...this.attributes})
  }
  public add(b: Vector2D): Vector2D { this.components.x += b.components.x; this.components.y += b.components.y; return this; }
  public added(b: Vector2D): Vector2D { return new Vector2D({x: this.x() + b.x(), y: this.y() + b.y()}, {...this.attributes}); }
  public project(b: Vector2D): Vector2D { let c = this.dot(b)/b.mm(); this.components.x = b.x()*c; this.components.y = b.y()*c; return this; }
  public projected(b: Vector2D): Vector2D { let c = this.dot(b)/b.mm(); return new Vector2D({x: b.x()*c, y: b.y()*c}, {...this.attributes}); }
  public reject(b: Vector2D): Vector2D { let c = this.det(b)/b.mm(); this.components.x = b.y()*c; this.components.y = -b.x()*c; return this; }
  public rejected(b: Vector2D): Vector2D { let c = this.det(b)/b.mm(); return new Vector2D({x: b.y()*c, y: -b.x()*c}, {...this.attributes}); }

  // complex number operations
  public complex = {
    toString: (): string => { return this.components.y ? `${this.components.x} + i${this.components.y}` : this.components.x.toString(); },
    inverse: (): Vector2D => { let mmR = 1.0/this.mm(); this.components.x *= mmR; this.components.y *= mmR; return this; },
    inversed: (): Vector2D => { let mmR = 1.0/this.mm(); return new Vector2D({x: this.components.x * mmR, y: this.components.y * mmR}, {...this.attributes}); },
    conjugate: (): Vector2D => { this.components.y *= -1; return this; },
    conjugated: (): Vector2D => { return new Vector2D({x: this.components.x, y: -this.components.y}); },

    multiply: (b: Vector2D): Vector2D => { let x = this.x()*b.x() - this.y()*b.y(); let y = this.x()*b.y() + this.y()*b.x(); this.components.x = x; this.components.y = y; return this; },
    multiplied: (b: Vector2D): Vector2D => { return new Vector2D({x: this.x()*b.x() - this.y()*b.y(), y: this.x()*b.y() + this.y()*b.x()}, {...this.attributes}); },
    divide: (b: Vector2D): Vector2D => { return this.complex.multiply(b.complex.inversed()); },
    divided: (b: Vector2D): Vector2D => { return this.complex.multiplied(b.complex.inversed()); },
    
    // exponential functions
    pow: (b: Vector2D): Vector2D => { let p = this.complex.powed(b); this.components.x = p.components.x; this.components.y = p.components.y; return this; },
    powed: (b: Vector2D): Vector2D => {
      return b.complex.multiplied(this.complex.loged()).complex.exped()
    },
    exp: (): Vector2D => { 
      let ea = Math.pow(Math.E, this.components.x);
      let x = ea*Math.cos(this.components.y);
      let y = ea*Math.sin(this.components.y);
      this.components.x = x; this.components.y = y;
      return this;
    },
    exped: (): Vector2D => {
      let ea = Math.pow(Math.E, this.components.x);
      return new Vector2D({
        x: ea*Math.cos(this.components.y), y: ea*Math.sin(this.components.y)
      })
    },
    log: (): Vector2D => {
      let m = this.m(); let t = this.t();
      this.components.x = Math.log(m); this.components.y = t;
      return this;
    },
    loged: (): Vector2D => { return new Vector2D({ x: Math.log(this.m()), y: this.t() }); },

    // trig functions
    cos: (): Vector2D => { 
      let x = Math.cos(this.components.x)*Math.cosh(this.components.y); let y = -Math.sin(this.components.x)*Math.sinh(this.components.y);
      this.components.x = x; this.components.y = y;
      return this;
    },
    cosed: (): Vector2D => { return new Vector2D({x: Math.cos(this.components.x)*Math.cosh(this.components.y), y: -Math.sin(this.components.x)*Math.sinh(this.components.y)}, {...this.attributes}); },
    sin: (): Vector2D => {
      let x = Math.sin(this.components.x)*Math.cosh(this.components.y); let y = Math.cos(this.components.x)*Math.sinh(this.components.y);
      this.components.x = x; this.components.y = y;
      return this;
    },
    sined: (): Vector2D => { return new Vector2D({x: Math.sin(this.components.x)*Math.cosh(this.components.y), y: Math.cos(this.components.x)*Math.sinh(this.components.y)}, {...this.attributes}); }
  }
  
}