import { Vector2D } from "./elements/vector";
import { UIControls } from './ui';
import { Plane } from "./plane";

declare module "./elements/vector" {
  export interface Vector2D {
    controls: () => UIControls;
    withinBounds: (point: {x: number, y: number}) => boolean;
    click: (e: MouseEvent, keys: string[]) => void;
    gestureEnter: () => void;
    gestureLeave: () => void;
    drag: (e: MouseEvent, keys: string[], p1: { x: number; y: number; }, p2: { x: number; y: number; }) => void;
    draw: (ctx: CanvasRenderingContext2D, plane: Plane) => void;
  }
}

Vector2D.prototype.controls = function(): UIControls { 
  return {
    inputs: [
      {
        x: { oninput: (e) => this.components.x = parseFloat((<HTMLInputElement>e.target).value) || this.components.x, initialValue: () => this.components.x.toString() },
        y: { oninput: (e) => this.components.y = parseFloat((<HTMLInputElement>e.target).value) || this.components.y, initialValue: () => this.components.y.toString() }
      },
      {
        magnitude: { oninput: (e) => this.size(parseFloat((<HTMLInputElement>e.target).value) || this.m()), initialValue: () => this.m().toString() },
        thickness: { oninput: e => this.attributes.thickness = parseFloat((<HTMLInputElement>e.target).value), initialValue: () => this.attributes.thickness!.toString() }
      }
    ],
    ranges: [
      { theta: {oninput: (e) => this.angle(2*Math.PI*(parseFloat((<HTMLInputElement>e.target).value)/100)), initialValue: () => (100*(this.t()/(2*Math.PI))).toString() } },
      { 
        r: {
          oninput: (e) => this.attributes.color = ((<number> this.attributes.color) & 0x00ffffff) | (Math.floor(255*(parseInt((<HTMLInputElement>e.target).value)/100)) << 24),
          initialValue: () => Math.floor(100*((((<number> this.attributes.color) & 0xff000000) >>> 24)/(255))).toString()
        },
        g: {
          oninput: (e) => this.attributes.color = ((<number> this.attributes.color) & 0xff00ffff) | (Math.floor(255*(parseInt((<HTMLInputElement>e.target).value)/100)) << 16),
          initialValue: () => Math.floor(100*((((<number> this.attributes.color) & 0xff0000) >> 16)/(255))).toString() 
          
        },
        b: {
          oninput: (e) => this.attributes.color = ((<number> this.attributes.color) & 0xffff00ff) | (Math.floor(255*(parseInt((<HTMLInputElement>e.target).value)/100)) << 8),
          initialValue: () => Math.floor(100*((((<number> this.attributes.color) & 0xff00) >> 8)/(255))).toString() 
        },
        a: {
          oninput: (e) => this.attributes.color = ((<number> this.attributes.color) & 0xffffff00) | (Math.floor(255*(parseInt((<HTMLInputElement>e.target).value)/100)) << 0),
          initialValue: () => Math.floor(100*(((<number> this.attributes.color) & 0xff)/(255))).toString() 
        }
      }
    ]
  }
}
Vector2D.prototype.withinBounds = function(point: { x: number, y: number }): boolean {
  let p = new Vector2D(point);
  let proj = p.projectedScalar(this);
  let rej = Math.abs(p.rejectedScalar(this));
  if (proj > 0 && proj < this.m()) {
    if (rej < 0.5*(<number>this.attributes.thickness)) {
      return true;
    }
  }
  return false;
}
Vector2D.prototype.click = function(e: MouseEvent, keys: string[]): void {}
Vector2D.prototype.gestureEnter = function(): void { console.log('entered') }
Vector2D.prototype.gestureLeave = function(): void { console.log('left')}
Vector2D.prototype.drag = function(e: MouseEvent, keys: string[], p1: { x: number; y: number; }, p2: { x: number; y: number; }): void {};
Vector2D.prototype.draw = function(ctx: CanvasRenderingContext2D, plane: Plane): void {

  let lw = ctx.lineWidth;
  let lc = ctx.lineCap;
  ctx.lineCap = 'round'

  let v1 = this.rotated(3*Math.PI/4).scale(0.2).add(this);
  let v2 = this.rotated(-3*Math.PI/4).scale(0.2).add(this);

  let p0 = plane.worldToScreenCoordinates({x: 0, y: 0});
  let p1 = plane.worldToScreenCoordinates({x: this.x(), y: this.y()});
  let p2 = plane.worldToScreenCoordinates({x: v1.x(), y: v1.y()});
  let p3 = plane.worldToScreenCoordinates({x: v2.x(), y: v2.y()});
  
  
  if (this.attributes.isHovered || this.attributes.selected) {
    ctx.strokeStyle = '#000000ff';
    ctx.lineWidth = (<number>this.attributes.thickness) * plane.getZoom() + 5;
    ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p3.x, p3.y); ctx.stroke();

    ctx.strokeStyle = '#ffff00ff';
    ctx.lineWidth = (<number>this.attributes.thickness) * plane.getZoom() + 4;
    ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p3.x, p3.y); ctx.stroke();

    ctx.strokeStyle = '#000000ff';
    ctx.lineWidth = (<number>this.attributes.thickness) * plane.getZoom() + 1;
    ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p3.x, p3.y); ctx.stroke();
  }
  
  ctx.strokeStyle = '#' + ((<number>this.attributes.color) >>> 0).toString(16).padStart(8, '0'); // >>> unsigned right shift
  ctx.lineWidth = (<number>this.attributes.thickness) * plane.getZoom();
  ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p3.x, p3.y); ctx.stroke();

  ctx.lineWidth = lw;
  ctx.lineCap = lc;
};

export = Vector2D;