import { UIElements, getUIElements, setControls, UIController, UIControls } from './engine/ui';
import { Plane } from './engine/plane';
import Vector2D = require('./engine/augmented-vector');
import Edge2D = require('./engine/augmented-edge');
import { Engine } from './engine/engine';
import Ball = require('./engine/augmented-ball');

function draw(state: {
  ctx: CanvasRenderingContext2D,
  plane: Plane,
  engine: Engine,
  additionalRenders: {element: UIController, ttl: number}[],
  ui: UIElements
}) {
  state.plane.clear(state.ctx);
  state.plane.drawGrid(state.ctx);
  //state.plane.drawAxes(state.ctx);
  state.engine.getElements().forEach(e => { e.draw(state.ctx, state.plane); });
  state.engine.getActors().forEach(e => { (<Ball>e).draw(state.ctx, state.plane); });
  state.additionalRenders.forEach(ar => ar.element.draw(state.ctx, state.plane));
}

function go(state: {
  ctx: CanvasRenderingContext2D,
  plane: Plane,
  engine: Engine,
  additionalRenders: {element: UIController, ttl: number}[],
  ui: UIElements
}, t: number) {
  let time = Date.now();
  let dt = (time - t) / 1000.0;
  state.additionalRenders.forEach(r => r.ttl -= dt);
  state.additionalRenders = state.additionalRenders.filter(r => r.ttl > 0);
  state.additionalRenders.push(...(state.engine.moveActors(dt).map(e => {return {element: e, ttl: 5}})));

  let wc = state.plane.screenToWorldCoordinates({x: state.plane.mx, y: state.plane.my});
  state.engine.getActors().forEach(a => {
    a = <Ball> a;
    a.attributes.isHovered = false;
    if ((<Ball>a).withinBounds({x: wc.x, y: wc.y})) {
      a.attributes.isHovered = true;
      //setControls(state.ui.controlPanel, (<Ball>a).controls());
    } 
  });
  state.engine.getElements().forEach(el => {
    el = <Edge2D>el;
    el.attributes.isHovered = false;
    if (el.withinBounds({x: wc.x, y: wc.y})) {
      el.attributes.isHovered = true;
      //setControls(state.ui.controlPanel, (<Edge2D>el).controls());
    }
  });

  draw(state);
  requestAnimationFrame(() => go(state, time));
}

(<any> window).main = (): void => {
  
  let uiElements: UIElements | null = getUIElements();
  if (uiElements) {

    uiElements = (<UIElements> uiElements);
    uiElements.canvas.width = (<HTMLElement>uiElements.canvas.parentElement).clientWidth;
    uiElements.canvas.height = (<HTMLElement>uiElements.canvas.parentElement).clientHeight;

    let box = [
      {x: 200, y: 200},
      {x: -200, y: 200},
      {x: -200, y: -200},
      {x: 200, y: -200},
    ];

    let plane = new Plane(uiElements.canvas);
    window.addEventListener('resize', () => { plane.defaultResizeListener(); });
    uiElements.overlay.addEventListener('mousemove', (e: MouseEvent) => { 
      plane.defaultMouseMoveListener(e);
      
    });
    uiElements.overlay.addEventListener('wheel', (e: WheelEvent) => { plane.defaultMouseWheelListener(e); });
    uiElements.overlay.addEventListener('click', (e: MouseEvent) => {
      let selection = false;
      let wc = state.plane.screenToWorldCoordinates({x: state.plane.mx, y: state.plane.my});
      state.engine.getActors().forEach(a => {
        a = <Ball> a;
        a.attributes.selected = false;
        if ((<Ball>a).withinBounds({x: wc.x, y: wc.y})) {
          a.attributes.selected = true;
          setControls(state.ui.controlPanel, (<Ball>a).controls());
          selection = true;
        } 
      });
      state.engine.getElements().forEach(el => {
        el = <Edge2D>el;
        el.attributes.selected = false;
        if (el.withinBounds({x: wc.x, y: wc.y})) {
          el.attributes.selected = true;
          setControls(state.ui.controlPanel, (<Edge2D>el).controls());
          selection = true;
        }
      });
      if (!selection) {
        setControls(state.ui.controlPanel, {});
        plane.defaultMouseClickListener(e); 
      }
    });

    let ctx = uiElements.canvas.getContext('2d')!;

    let state: {
      ctx: CanvasRenderingContext2D,
      plane: Plane,
      engine: Engine,
      additionalRenders: {element: UIController, ttl: number}[],
      ui: UIElements
    } = {
      ctx: ctx,
      plane: plane,
      engine: new Engine(
        (<Array<Ball>>(Array<Ball | null>(10).fill(null).map(b => new Ball(
          {x: 200*(Math.random()-0.5), y: 200*(Math.random()-0.5)},
          new Vector2D({x: 200*(Math.random()-0.5), y: 200*(Math.random()-0.5)}, {color: 0xff00ffff}),
          new Vector2D({x: 0, y: 0}),
          10*(Math.random()) + 10,
          20*(Math.random()),
          {
            color: 0x000000ff | (Math.floor(Math.random()*16777216) << 8),
            hideVelocityVector: true,
            hideAccelerationVector: true
          }
        )))),
        [
          new Edge2D(box[0], box[1], {color: 0x000000ff, thickness: 1}),
          new Edge2D(box[1], box[2], {color: 0x000000ff, thickness: 1}),
          new Edge2D(box[2], box[3], {color: 0x000000ff, thickness: 1}),
          new Edge2D(box[3], box[0], {color: 0x000000ff, thickness: 1})
        ].concat(
          (<Array<Edge2D>>(Array<Edge2D | null>(5).fill(null).map(e => new Edge2D(
            {x: 400*(Math.random()-0.5), y: 400*(Math.random()-0.5)},
            {x: 400*(Math.random()-0.5), y: 400*(Math.random()-0.5)},
            {color: 0x000000ff, thickness: 1}
          )))),
        )
      ),
      additionalRenders: [],
      ui: uiElements
    }
    go(state, Date.now());
  }
}