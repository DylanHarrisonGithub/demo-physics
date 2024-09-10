export class Plane {

  private delegateCanvas: HTMLCanvasElement;
	private width: number = 0;
	private height: number = 0;
	private xOrigin: number = 0.0;
	private yOrigin: number = 0.0;
	private zoom: number = 1.0;
	private zoomInverse: number = 1.0/this.zoom;
	private halfWidth: number = this.width/2.0;
	private halfHeight: number = this.height/2.0;
	public mx: number = -1.0;
	public my: number = -1.0;
	private gridColor: string = '#C8C8FF'; //'#C8C8DC';
	private axesColor: string = '#000000';

  constructor(canvas: HTMLCanvasElement) {
    this.delegateCanvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.halfWidth = this.width/2.0;
    this.halfHeight = this.height/2.0;
  }

	public getZoom() { return this.zoom; }

  public screenToWorldCoordinates(screenCoordinate: {x: number, y: number}): {x: number, y: number} {
		return {
		  x: (screenCoordinate.x - this.halfWidth)*this.zoomInverse + this.xOrigin,
		  y: -(screenCoordinate.y - this.halfHeight)*this.zoomInverse + this.yOrigin
    };
	}
	
	public worldToScreenCoordinates(worldCoordinate: {x: number, y: number}): {x: number, y: number} {
    return {
      x: (worldCoordinate.x - this.xOrigin)*this.zoom + this.halfWidth,
      y: -(worldCoordinate.y - this.yOrigin)*this.zoom + this.halfHeight
    }
	}

  public clear(canvas2dContext: CanvasRenderingContext2D) {
		canvas2dContext.clearRect(0,0, this.width, this.height);
	}

public drawAxes(canvas2dContext: CanvasRenderingContext2D) {

		var northWest = {"x":0, "y":0};
		var southEast = {"x":this.width, "y":this.height};
		
		northWest = this.screenToWorldCoordinates(northWest);
		southEast = this.screenToWorldCoordinates(southEast);

		if ((northWest.x <= 0) && (southEast.x >= 0)) {
			
			var topCoord = {"x":0, "y":northWest.y};
			var bottomCoord = {"x":0,"y":southEast.y};
			
			topCoord = this.worldToScreenCoordinates(topCoord);
			bottomCoord = this.worldToScreenCoordinates(bottomCoord);

			canvas2dContext.strokeStyle = this.axesColor;
			canvas2dContext.beginPath();
			canvas2dContext.moveTo(topCoord.x, topCoord.y);
			canvas2dContext.lineTo(bottomCoord.x, bottomCoord.y);
			canvas2dContext.stroke();
			
		}
		if ((northWest.y >= 0) && (southEast.y <= 0)) {
			
			var leftCoord = {"x":northWest.x, "y":0};
			var rightCoord = {"x":southEast.x, "y":0};

			leftCoord = this.worldToScreenCoordinates(leftCoord);
			rightCoord = this.worldToScreenCoordinates(rightCoord);

			canvas2dContext.strokeStyle = this.axesColor;
			canvas2dContext.beginPath();
			canvas2dContext.moveTo(leftCoord.x, leftCoord.y);
			canvas2dContext.lineTo(rightCoord.x, rightCoord.y);
			canvas2dContext.stroke();
			
		}		
	}

  public drawGrid(canvas2dContext: CanvasRenderingContext2D) {
				
		var northWest = {"x":0, "y":0};
		var southEast = {"x":this.width, "y":this.height};
		
		northWest = this.screenToWorldCoordinates(northWest);
		southEast = this.screenToWorldCoordinates(southEast);
		
		var width = southEast.x - northWest.x;
		var height = northWest.y - southEast.y;
		
		var wMagnitude = Math.floor(Math.log10(width));
		var hMagnitude = Math.floor(Math.log10(height));
		
		if (wMagnitude < hMagnitude) {	
			var m = wMagnitude;
			var p1 = Math.pow(10,m-1);
			var p0 = Math.pow(10,m);
			var ones = Math.floor(width/p1);
			var tens = Math.floor(width/p0);			
		} else {			
			var m = hMagnitude;
			var p1 = Math.pow(10,m-1);
			var p0 = Math.pow(10,m);
			var ones = Math.floor(height/p1);
			var tens = Math.floor(height/p0);
		}

		canvas2dContext.strokeStyle = this.gridColor;
		canvas2dContext.globalAlpha=(1.0-(ones/99.0));
		var leftmostOne = Math.floor(northWest.x/p1)*p1;
		var topCoord = {x: -1, y: -1};
		var bottomCoord = {x: -1, y: -1};
		while (leftmostOne < southEast.x) {
			topCoord.x = leftmostOne;
			topCoord.y = northWest.y;			
			bottomCoord.x = leftmostOne;
			bottomCoord.y = southEast.y;
			topCoord = this.worldToScreenCoordinates(topCoord);
			bottomCoord = this.worldToScreenCoordinates(bottomCoord);
			canvas2dContext.beginPath();
			canvas2dContext.moveTo(topCoord.x, topCoord.y);
			canvas2dContext.lineTo(bottomCoord.x, bottomCoord.y);
			canvas2dContext.stroke();
			leftmostOne = leftmostOne + p1;						
		}
		
		var bottommostOne = Math.floor(southEast.y/p1)*p1;
		var leftCoord = {x: -1, y: -1};
		var rightCoord = {x: -1, y: -1};
		while (bottommostOne < northWest.y) {
			leftCoord.x = northWest.x;
			leftCoord.y = bottommostOne;			
			rightCoord.x = southEast.x;
			rightCoord.y = bottommostOne;
			leftCoord = this.worldToScreenCoordinates(leftCoord);
			rightCoord = this.worldToScreenCoordinates(rightCoord);
			canvas2dContext.beginPath();
			canvas2dContext.moveTo(leftCoord.x, leftCoord.y);
			canvas2dContext.lineTo(rightCoord.x, rightCoord.y);
			canvas2dContext.stroke();
			bottommostOne = bottommostOne + p1;						
		}
		
		canvas2dContext.globalAlpha=1.0;
		var leftmostOne = Math.floor(northWest.x/p0)*p0;
		var topCoord = {x: -1, y: -1};
		var bottomCoord = {x: -1, y: -1};
		while (leftmostOne < southEast.x) {
			topCoord.x = leftmostOne;
			topCoord.y = northWest.y;			
			bottomCoord.x = leftmostOne;
			bottomCoord.y = southEast.y;
			topCoord = this.worldToScreenCoordinates(topCoord);
			bottomCoord = this.worldToScreenCoordinates(bottomCoord);
			canvas2dContext.beginPath();
			canvas2dContext.moveTo(topCoord.x, topCoord.y);
			canvas2dContext.lineTo(bottomCoord.x, bottomCoord.y);
			canvas2dContext.stroke();
			leftmostOne = leftmostOne + p0;						
		}
		
		var bottommostOne = Math.floor(southEast.y/p0)*p0;
		var leftCoord = {x: -1, y: -1};
		var rightCoord = {x: -1, y: -1};
		while (bottommostOne < northWest.y) {
			leftCoord.x = northWest.x;
			leftCoord.y = bottommostOne;			
			rightCoord.x = southEast.x;
			rightCoord.y = bottommostOne;
			leftCoord = this.worldToScreenCoordinates(leftCoord);
			rightCoord = this.worldToScreenCoordinates(rightCoord);
			canvas2dContext.beginPath();
			canvas2dContext.moveTo(leftCoord.x, leftCoord.y);
			canvas2dContext.lineTo(rightCoord.x, rightCoord.y);
			canvas2dContext.stroke();
			bottommostOne = bottommostOne + p0;						
		}
	}
	
	drawEdge(
    canvas2dContext: CanvasRenderingContext2D, 
    edge: {
      p0: {x: number, y: number},
      pf: {x: number, y: number},
      color: string
    }
  ) {
		
		var startPoint = this.worldToScreenCoordinates(edge.p0);
		var endPoint = this.worldToScreenCoordinates(edge.pf);
		
		canvas2dContext.strokeStyle = '#000000'; //edge.color;
		canvas2dContext.beginPath();
		canvas2dContext.moveTo(startPoint.x, startPoint.y);
		canvas2dContext.lineTo(endPoint.x, endPoint.y);
		canvas2dContext.stroke();
		
	}

  defaultResizeListener() {
		this.delegateCanvas.width = (<HTMLElement>this.delegateCanvas.parentNode!).clientWidth;
		this.delegateCanvas.height = (<HTMLElement>this.delegateCanvas.parentNode!).clientHeight;
		this.width = this.delegateCanvas.width;
		this.height = this.delegateCanvas.height;
		this.halfWidth = this.delegateCanvas.width/2.0;
		this.halfHeight = this.delegateCanvas.height/2.0;	
	}

  defaultMouseMoveListener(event: MouseEvent) {
		var centerDivRect = (<HTMLElement>this.delegateCanvas.parentNode!).getBoundingClientRect();
		var coord = {
		  x: event.clientX-centerDivRect.left,
		  y: event.clientY-centerDivRect.top
    }
		this.mx = coord.x;
		this.my = coord.y;
	}

  defaultMouseWheelListener(event: WheelEvent) {
		if (event.deltaY < 0) {
			this.zoom = this.zoom*(1.05);
			this.zoomInverse = 1.0/this.zoom;
		} else {
			this.zoom = this.zoom*(0.95);
			this.zoomInverse = 1.0/this.zoom;			
		}
	}

  defaultMouseClickListener(event: MouseEvent) {
		var centerDivRect = (<HTMLElement>this.delegateCanvas.parentNode!).getBoundingClientRect();
		var coord = {
		  x: event.clientX-centerDivRect.left,
		  y: event.clientY-centerDivRect.top
    }
		this.mx = coord.x;
		this.my = coord.y;
		coord = this.screenToWorldCoordinates(coord);
		this.xOrigin = coord.x;
		this.yOrigin = coord.y;
	}
}