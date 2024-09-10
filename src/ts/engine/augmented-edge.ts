import { Edge2D } from './elements/edge';
import { UIControls } from './ui';
import { Plane } from "./plane";

declare module './elements/edge' {
  export interface Edge2D {
    controls: () => UIControls;
    withinBounds: (point: {x: number, y: number}) => boolean;
    click: (e: MouseEvent, keys: string[]) => void;
    gestureEnter: () => void;
    gestureLeave: () => void;
    drag: (e: MouseEvent, keys: string[], p1: { x: number; y: number; }, p2: { x: number; y: number; }) => void;
    draw: (ctx: CanvasRenderingContext2D, plane: Plane) => void;
  }
}

Edge2D.prototype.controls = function(): UIControls {
  return {
    inputs: [
      {
        x0: {onchange: (e) => this.p1.x = typeof parseFloat((<HTMLInputElement>e.target).value) === undefined ? this.p1.x : parseFloat((<HTMLInputElement>e.target).value), initialValue: () => this.p1.x.toString()},
        y0: {onchange: (e) => this.p1.y = typeof parseFloat((<HTMLInputElement>e.target).value) === undefined ? this.p1.y : parseFloat((<HTMLInputElement>e.target).value), initialValue: () => this.p1.y.toString()},
        x1: {onchange: (e) => this.p2.x = typeof parseFloat((<HTMLInputElement>e.target).value) === undefined ? this.p2.x : parseFloat((<HTMLInputElement>e.target).value), initialValue: () => this.p2.x.toString()},
        y1: {onchange: (e) => this.p2.y = typeof parseFloat((<HTMLInputElement>e.target).value) === undefined ? this.p2.y : parseFloat((<HTMLInputElement>e.target).value), initialValue: () => this.p2.y.toString()}
      },
      {
        m: {onchange: (e) => this.size(typeof parseFloat((<HTMLInputElement>e.target).value) === undefined ? this.m() : parseFloat((<HTMLInputElement>e.target).value)), initialValue: () => this.m().toString()},
        t: {onchange: (e) => this.angle(typeof parseFloat((<HTMLInputElement>e.target).value) === undefined ? this.m() : parseFloat((<HTMLInputElement>e.target).value)), initialValue: () => this.t().toString()}
      }
    ]
  }
}

Edge2D.prototype.withinBounds = function(point: { x: number; y: number; }): boolean {
  let v = new Edge2D(this.p1, point);
  let proj = v.projectedScalar(this);
  let rej = Math.abs(v.rejectedScalar(this));
  if (proj > 0 && proj < this.m()) {
    if (rej < 0.5*(<number>this.attributes.thickness)) {
      return true;
    }
  }
  return false;
}
Edge2D.prototype.click = function(e: MouseEvent, keys: string[]): void {}
Edge2D.prototype.gestureEnter = function(): void { console.log('entered'); }
Edge2D.prototype.gestureLeave = function(): void { console.log('left'); }
Edge2D.prototype.drag = function(e: MouseEvent, keys: string[], p1: { x: number; y: number; }, p2: { x: number; y: number; }): void {};
Edge2D.prototype.draw = function(ctx: CanvasRenderingContext2D, plane: Plane): void {

  let e1 = this.rotated(3*Math.PI/4).scale(0.2).add(this);
  let e2 = this.rotated(-3*Math.PI/4).scale(0.2).add(this);

  let p0 = plane.worldToScreenCoordinates({x: this.p1.x, y: this.p1.y});
  let p1 = plane.worldToScreenCoordinates({x: this.p2.x, y: this.p2.y});
  let p2 = plane.worldToScreenCoordinates({x: e1.getP2().x, y: e1.getP2().y});
  let p3 = plane.worldToScreenCoordinates({x: e2.getP2().x, y: e2.getP2().y});

  let lw = ctx.lineWidth;
  let lc = ctx.lineCap;
  ctx.lineCap = 'round';

  //ctx.strokeStyle = '#' + ((<number>this.attributes.color) >>> 0).toString(16).padStart(8, '0'); // >>> unsigned right shift
  //ctx.lineWidth = (<number>this.attributes.thickness) * plane.getZoom();
  //plane.drawDirectedEdge(ctx, new Edge({x: this.p1.x, y: this.p1.y}, {x: this.p2.x, y: this.p2.y}, this.attributes.color.toString()));
  if (this.attributes.isHovered || this.attributes.selected) {
    ctx.strokeStyle = '#000000ff';
    ctx.lineWidth = (<number>this.attributes.thickness) * plane.getZoom() + 5;
    ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
    if (this.attributes.directed) {
      ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p3.x, p3.y); ctx.stroke();
    }

    ctx.strokeStyle = '#ffff00ff';
    ctx.lineWidth = (<number>this.attributes.thickness) * plane.getZoom() + 4;
    ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
    if (this.attributes.directed) {
      ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p3.x, p3.y); ctx.stroke();
    }

    ctx.strokeStyle = '#000000ff';
    ctx.lineWidth = (<number>this.attributes.thickness) * plane.getZoom() + 1;
    ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
    if (this.attributes.directed) {
      ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p3.x, p3.y); ctx.stroke();
    }
  }
  
  ctx.strokeStyle = '#' + ((<number>this.attributes.color) >>> 0).toString(16).padStart(8, '0'); // >>> unsigned right shift
  ctx.lineWidth = (<number>this.attributes.thickness) * plane.getZoom();
  ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
  if (this.attributes.directed) {
    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p3.x, p3.y); ctx.stroke();
  }
  
  ctx.lineWidth = lw;
  ctx.lineCap = lc;
  
};
export = Edge2D;