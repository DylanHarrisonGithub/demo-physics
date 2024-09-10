import { Plane } from "./plane"

export interface UIElements {
  canvas: HTMLCanvasElement,
  controlPanel: HTMLDivElement,
  outputPanel: HTMLDivElement,
  overlay: HTMLDivElement
}

export interface UIControls {
  buttons?: { [key: string]: (e?: Event) => void }[],
  ranges?: { [key: string]: { 
    onchange?: (e: Event) => void, 
    oninput?: (e: Event) => void, 
    initialValue: () => string //string
  } }[],
  inputs?: { [key: string]: {
    onchange?: (e: Event) => void,
    oninput?: (e: Event) => void, 
    initialValue: () => string
  } }[],
  checkboxes?: { [key: string]: {
    oninput: (e: Event) => void, 
    initialValue: () => boolean
  } }[]
}

export interface UIController {
  controls: () => UIControls;
  withinBounds: (point: {x: number, y: number}) => boolean,
  gestureEnter: (keys: string[]) => void,
  gestureLeave: (keys: string[]) => void,
  click: (e: MouseEvent, keys: string[]) => void,
  drag: (e: MouseEvent, keys: string[], p1: {x: number, y: number}, p2: {x: number, y: number}) => any
  draw: (ctx: CanvasRenderingContext2D, plane: Plane) => void
}

export function getUIElements(): UIElements | null {

  let canvas: (HTMLCanvasElement | null) = (<HTMLCanvasElement | null> document.getElementById('myCanvas'));
  let controlPanel: (HTMLDivElement | null) = (<HTMLDivElement | null> document.getElementById('control-panel'));
  let outputPanel: (HTMLDivElement | null) = (<HTMLDivElement | null> document.getElementById('output-panel'));
  let overlay: (HTMLDivElement | null) = (<HTMLDivElement | null> document.getElementById('overlay'));

  if (canvas && controlPanel && outputPanel && overlay) {
    return {
      canvas: canvas,
      controlPanel: controlPanel,
      outputPanel: outputPanel,
      overlay: overlay
    }
  }
  return null;

}

export function setControls(element: HTMLElement, controls: UIControls): void {

  element.innerHTML = '';
  controls.buttons?.forEach(buttonGroup => {
    let span = <HTMLSpanElement>document.createElement('span');
    span.classList.add('control-panel-group', 'control-panel-button-group');
    Object.keys(buttonGroup).forEach(buttonKey => {
      let button = document.createElement('button');
      button.classList.add('control-panel-button');
      button.innerHTML = buttonKey;
      button.onclick = (e: Event) => buttonGroup[buttonKey](e);
      span.appendChild(button);
    });
    element.appendChild(span);
    element.appendChild(document.createElement('br'));
  });
  controls.ranges?.forEach(rangeGroup => {
    let span = <HTMLTableElement>document.createElement('table');
    span.classList.add('control-panel-group', 'control-panel-range-group');
    Object.keys(rangeGroup).forEach(rangeKey => {
      let tr = <HTMLTableRowElement>document.createElement('tr');
      let td1 = <HTMLTableCellElement>document.createElement('td');
      let td2 = <HTMLTableCellElement>document.createElement('td');
      
      let label = <HTMLLabelElement>document.createElement('label');
      label.classList.add('control-panel-label', 'control-panel-range-label');
      label.innerHTML = rangeKey;

      let range = <HTMLInputElement>document.createElement('input');
      range.classList.add('control-panel-range');
      range.type = 'range';
      range.min = '0';
      range.max = '100';
      range.value = rangeGroup[rangeKey].initialValue();
      if (rangeGroup[rangeKey].onchange) range.onchange = (e: Event) => rangeGroup[rangeKey].onchange!(e);
      if (rangeGroup[rangeKey].oninput) range.oninput = (e: Event) => { e.stopPropagation(); rangeGroup[rangeKey].oninput!(e); }

      td1.appendChild(label);
      td2.appendChild(range);
      tr.appendChild(td1);
      tr.appendChild(td2);

      span.appendChild(tr);
    });
    element.appendChild(span);
    element.appendChild(document.createElement('br'));
  });
  controls.inputs?.forEach(inputGroup => {
    let span =  <HTMLTableElement>document.createElement('table');
    span.classList.add('control-panel-group', 'control-panel-input-group');
    Object.keys(inputGroup).forEach(inputKey => {
      let tr = <HTMLTableRowElement>document.createElement('tr');
      let td1 = <HTMLTableCellElement>document.createElement('td');
      let td2 = <HTMLTableCellElement>document.createElement('td');

      let label = <HTMLLabelElement>document.createElement('label');
      label.classList.add('control-panel-label', 'control-panel-input-label');
      label.innerHTML = inputKey;
      
      let input = <HTMLInputElement>document.createElement('input');
      input.classList.add('control-panel-input');
      input.type = 'text';
      input.value = inputGroup[inputKey].initialValue();
      if (inputGroup[inputKey].onchange) input.onchange = (e: Event) => inputGroup[inputKey].onchange!(e);
      if (inputGroup[inputKey].oninput) input.oninput = (e: Event) => inputGroup[inputKey].oninput!(e);
      
      td1.appendChild(label);
      td2.appendChild(input);
      tr.appendChild(td1);
      tr.appendChild(td2);

      span.appendChild(tr);
    });
    element.appendChild(span);
    element.appendChild(document.createElement('br'));
  });
  controls.checkboxes?.forEach(checkboxGroup => {
    let span =  <HTMLTableElement>document.createElement('table');
    span.classList.add('control-panel-group', 'control-panel-checkbox-group');
    Object.keys(checkboxGroup).forEach(checkboxKey => {
      let tr = <HTMLTableRowElement>document.createElement('tr');
      let td1 = <HTMLTableCellElement>document.createElement('td');
      let td2 = <HTMLTableCellElement>document.createElement('td');

      let label = <HTMLLabelElement>document.createElement('label');
      label.classList.add('control-panel-label', 'control-panel-checkbox-label');
      label.innerHTML = checkboxKey;

      let checkbox = <HTMLInputElement>document.createElement('input');
      checkbox.classList.add('control-panel-checkbox');
      checkbox.type = 'checkbox';
      checkbox.checked = checkboxGroup[checkboxKey].initialValue();
      checkbox.oninput = (e: Event) => checkboxGroup[checkboxKey].oninput(e);

      td1.appendChild(label);
      td2.appendChild(checkbox);
      tr.appendChild(td1);
      tr.appendChild(td2);

      span.appendChild(tr);
    });
    element.appendChild(span);
    element.appendChild(document.createElement('br'));
  });
}