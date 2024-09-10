import { Ball } from './elements/ball';
import Edge2D = require('./augmented-edge');
import { UIControls } from './ui';
import { Plane } from './plane';

declare module './elements/ball' {
  export interface Ball {
    controls: () => UIControls;
    withinBounds: (point: {x: number, y: number}) => boolean;
    click: (e: MouseEvent, keys: string[]) => void;
    gestureEnter: () => void;
    gestureLeave: () => void;
    drag: (e: MouseEvent, keys: string[], p1: { x: number; y: number; }, p2: { x: number; y: number; }) => void;
    draw: (ctx: CanvasRenderingContext2D, plane: Plane) => void;
  }
}
Ball.prototype.controls = function(): UIControls {
  return {
    ranges: [
      {
        vt: {
          oninput: (e) => { this.velocity.angle(0.01*2*Math.PI*parseFloat((<HTMLInputElement>e.target).value)) },
          initialValue: () => (50*this.velocity.t()/Math.PI).toString()
        },
        vm: {
          oninput: (e) => { this.velocity.size(parseFloat((<HTMLInputElement>e.target).value) + 1) },
          initialValue: () => this.velocity.m().toString()
        }
      },
      {
        radius: {
          oninput: (e) => { this.radius = (parseFloat((<HTMLInputElement>e.target).value) + 1); },
          initialValue: () => this.radius.toString()
        },
        mass: {
          oninput: (e) => { this.mass = (parseFloat((<HTMLInputElement>e.target).value) + 1); },
          initialValue: () => this.mass.toString()
        }
      }
    ]
  }
}
Ball.prototype.withinBounds = function(point: { x: number; y: number; }): boolean {
  let x = point.x - this.getLocation().x; let y = point.y - this.getLocation().y;
  let r = this.getRadius() + (<number>this.attributes.thickness || 0);
  return (x*x + y*y) <= r*r;
}
Ball.prototype.click = function(e: MouseEvent, keys: string[]): void {}
Ball.prototype.gestureEnter = function(): void { console.log('entered'); }
Ball.prototype.gestureLeave = function(): void { console.log('left'); }
Ball.prototype.drag = function(e: MouseEvent, keys: string[], p1: { x: number; y: number; }, p2: { x: number; y: number; }): void {};
Ball.prototype.draw = function(ctx: CanvasRenderingContext2D, plane: Plane): void {

  let wc = plane.worldToScreenCoordinates(this.getLocation());
  if (this.attributes.isHovered || this.attributes.selected) {
    ctx.fillStyle = '#000000ff';
    ctx.beginPath(); ctx.arc(wc.x, wc.y, this.getRadius()*plane.getZoom() + 5, 0, 2*Math.PI, false);
    ctx.fill();

    ctx.fillStyle = '#ffff00ff';
    ctx.beginPath(); ctx.arc(wc.x, wc.y, this.getRadius()*plane.getZoom() + 4, 0, 2*Math.PI, false);
    ctx.fill();

    ctx.fillStyle = '#000000ff';
    ctx.beginPath(); ctx.arc(wc.x, wc.y, this.getRadius()*plane.getZoom() + 1, 0, 2*Math.PI, false);
    ctx.fill();
  }

  ctx.fillStyle = '#' + ((<number>this.attributes.color) >>> 0).toString(16).padStart(8, '0'); // >>> unsigned right shift
  //console.log('#' + ((<number>this.attributes.color) >>> 0).toString(16).padStart(8, '0'));
  ctx.beginPath(); ctx.arc(wc.x, wc.y, this.getRadius()*plane.getZoom(), 0, 2*Math.PI, false);
  ctx.fill();

  if (!this.attributes.hideVelocityVector || this.attributes.selected) { (new Edge2D(this.getLocation(), {x: this.getLocation().x + this.velocity.x(), y: this.getLocation().y + this.velocity.y()}, {color: 0xff00ffff, thickness: 1, directed: true})).draw(ctx, plane); }
  if (!this.attributes.hideAccelerationVector) {  (new Edge2D(this.getLocation(), {x: this.getLocation().x + this.acceleration.x(), y: this.getLocation().y + this.acceleration.y()}, {color: 0xffff00ff, thickness: 1, directed: true})).draw(ctx, plane); }

}
export = Ball;