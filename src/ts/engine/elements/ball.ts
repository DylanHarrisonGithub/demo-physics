import { Actor } from "../engine";
import { Vector2D } from "./vector";
import { Edge2D } from "./edge";

export class Ball implements Actor {
  
  private location: {x: number, y: number};
  public velocity: Vector2D;
  public acceleration: Vector2D;
  public radius: number;
  public mass: number;

  public attributes: { [key: string]: string | number | boolean | null };

  constructor(
    location: {x: number, y: number}, 
    velocity: Vector2D, acceleration: Vector2D,
    radius: number, 
    mass: number, 
    attributes?: { [key: string]: string | number | boolean | null }) {
    this.location = location;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.radius = radius;
    this.mass = mass;
    this.attributes = {...attributes};
  }

  getLocation(): {x: number, y: number} { return {x: this.location.x, y: this.location.y} };
  relocate(x: number, y: number): Ball { this.location.x = x; this.location.y = y; return this; }
  getRadius(): number { return this.radius }
  move(dt: number) {
    this.location.x += dt*this.velocity.x(); this.location.y += dt*this.velocity.y();
    this.velocity.add(this.acceleration.scaled(dt));
  }

  applyForce = (f: Vector2D) => { this.acceleration.add(f.scaled(1/this.mass)); }

  public timeToCollideWithEdge(e: Edge2D): [number, number] { 
    // first determine when ball will strike line
    let ve = new Edge2D({x: this.location.x, y: this.location.y}, {x: this.location.x + this.velocity.x(), y: this.location.y + this.velocity.y()});
    let c = new Edge2D(e.p1, this.location);
    
    let cDetE = c.det(e);
    let eDetV = e.det(ve);
    let cReM = this.radius*e.m();
    
    let t1 = 999999;
    let t2 = 999999;
    if (eDetV != 0) { 
      t1 = (cDetE + cReM)/eDetV
      t2 = (cDetE - cReM)/eDetV
    }

    // determine if ball will strike outside of line segment
    //
    // proj(t) = (this.x(t)-e1.x)(e2.x-e1.x)+(this.y(t)-e1.y)(e2.y-e1.y)/e.m()
    // where:
    //  this.x(t) = this.location.x + t*this.velocity.x
    //  this.y(t) = this.location.y + t*this.velocity.y
    let m = e.m();
    let mInv = 1/m;
    if (t1 < 0 || t1 > 999999) {
      t1 = 999999;
    } else {
      let x_t1 = this.location.x + t1*this.velocity.x();
      let y_t1 = this.location.y + t1*this.velocity.y();
      let proj_t1 = ((x_t1 - e.getP1().x)*e.x()+(y_t1-e.getP1().y)*e.y())*mInv;
      if (proj_t1 < 0 || proj_t1 > m) t1 = 9999999;
    }
    if (t2 < 0 || t2 > 999999) {
      t2 = 999999; 
    } else {
      let x_t2 = this.location.x + t2*this.velocity.x();
      let y_t2 = this.location.y + t2*this.velocity.y();
      let proj_t2 = ((x_t2 - e.getP1().x)*e.x()+(y_t2-e.getP1().y)*e.y())*mInv;
      if (proj_t2 < 0 || proj_t2 > m) t2 = 9999999;
    }
    return [t1, t2];
  }

  public timeToCollideWithBall(b: Ball): [number, number] { 
    var meVX = this.velocity.x(); var meVY = this.velocity.y();
		var youVX = b.velocity.x(); var youVY = b.velocity.y();
		var dx = this.location.x - b.location.x;
		var dy = this.location.y - b.location.y;
		var dVX = meVX - youVX;
		var dVY = meVY - youVY;
		
		var A = dVX*dVX + dVY*dVY;
		var B = 2.0*(dx*dVX + dy*dVY);
		var C = dx*dx + dy*dy - (this.radius + b.radius)*(this.radius + b.radius);
		var discriminant = B*B-4.0*A*C;
		
		if (discriminant < 0 || A === 0) {
			return [999999999, 99999999];
		} else {
			return [
				(-B - Math.sqrt(discriminant))/(2*A),
				(-B + Math.sqrt(discriminant))/(2*A),
			];
		}
  }
  public timeToCollideWithPoint(p: {x: number, y: number}): [number, number] { 
    var meVX = this.velocity.x(); var meVY = this.velocity.y();
		var dx = this.location.x - p.x;
		var dy = this.location.y - p.y;
		var dVX = meVX;
		var dVY = meVY;
		
		var A = dVX*dVX + dVY*dVY;
		var B = 2.0*(dx*dVX + dy*dVY);
		var C = dx*dx + dy*dy - (this.radius)*(this.radius);
		var discriminant = B*B-4.0*A*C;
		
		if (discriminant < 0 || A === 0) {
			return [999999999, 99999999];
		} else {
			return [
				(-B - Math.sqrt(discriminant))/(2*A),
				(-B + Math.sqrt(discriminant))/(2*A),
			];
		}
  }
  public deflectWithEdge(e: Edge2D): void { 
    let ve = new Edge2D({x: this.location.x, y: this.location.y}, {x: this.location.x + this.velocity.x(), y: this.location.y + this.velocity.y()});
    let mSquared = e.mm();
		let x = new Vector2D({
			x: (-2*e.y()*ve.det(e))/mSquared, 
			y: 2*e.x()*ve.det(e)/mSquared
		});
		this.velocity.add(x);
  }
  public deflectWithBall(b: Ball): Edge2D[] {
    let bbv = new Vector2D({x: b.location.x - this.location.x, y: b.location.y - this.location.y});
    
    let aProj = this.velocity.projected(bbv); let bProj = b.velocity.projected(bbv);
    let aRej = this.velocity.rejected(bbv); let bRej = b.velocity.rejected(bbv);

    let avi = this.velocity.projectedScalar(bbv);
    let bvi = b.velocity.projectedScalar(bbv);

    let aVf = (2.0*b.mass*bvi + avi*(this.mass - b.mass))/(this.mass + b.mass);
		let bVf = (2.0*this.mass*avi + bvi*(b.mass - this.mass))/(this.mass + b.mass);

    let avf = bbv.sized(aVf).add(aRej); 
    let bvf = bbv.sized(bVf).add(bRej);
  
    this.velocity.components.x = avf.x(); this.velocity.components.y = avf.y();
    b.velocity.components.x = bvf.x(); b.velocity.components.y = bvf.y();
    //b.attributes.color = 0x000000ff | (Math.floor(Math.random()*16777216) << 8);

    bbv.size(this.radius);
    let collisionLocation = {
      x: this.location.x + bbv.x(),
      y: this.location.y + bbv.y(),
    }
    return [
      //new Edge2D({x: collisionLocation.x, y: collisionLocation.y}, {x: collisionLocation.x + aProj.x(), y: collisionLocation.y + aProj.y()}, {directed: true, color: 0x0000ffff, thickness: 0.1}), 
      //new Edge2D({x: collisionLocation.x, y: collisionLocation.y}, {x: collisionLocation.x + aRej.x(), y: collisionLocation.y + aRej.y()}, {directed: true, color: 0xff00ffff, thickness: .1}), 
      //new Edge2D({x: collisionLocation.x, y: collisionLocation.y}, {x: collisionLocation.x + bProj.x(), y: collisionLocation.y + bProj.y()}, {directed: true, color: 0x0000ffff, thickness: .1}), 
      //new Edge2D({x: collisionLocation.x, y: collisionLocation.y}, {x: collisionLocation.x + bRej.x(), y: collisionLocation.y + bRej.y()}, {directed: true, color: 0xff00ffff, thickness: .1}), 
      //new Edge2D({x: collisionLocation.x, y: collisionLocation.y}, {x: collisionLocation.x + this.velocity.x(), y: collisionLocation.y + this.velocity.y()}, {directed: true, color: this.attributes.color!, thickness: .2}),
      //new Edge2D({x: collisionLocation.x, y: collisionLocation.y}, {x: collisionLocation.x + b.velocity.x(), y: collisionLocation.y + b.velocity.y()}, {directed: true, color: b.attributes.color!, thickness: .2}),
    ];
  }
  public deflectWithPoint(p: {x: number, y: number}): void { 
    let btp = new Vector2D({x: p.x - this.location.x, y: p.y - this.location.y});
    let aProj = this.velocity.projected(btp);
    let aVf = this.velocity.rejected(btp).add(aProj.scaled(-1));
    this.velocity.components.x = aVf.x(); this.velocity.components.y = aVf.y()
  }

}