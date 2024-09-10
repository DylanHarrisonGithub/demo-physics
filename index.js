(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["myLibrary"] = factory();
	else
		root["myLibrary"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ts/engine/augmented-ball.ts":
/*!*************************************!*\
  !*** ./ts/engine/augmented-ball.ts ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var ball_1 = __webpack_require__(/*! ./elements/ball */ "./ts/engine/elements/ball.ts");
var Edge2D = __webpack_require__(/*! ./augmented-edge */ "./ts/engine/augmented-edge.ts");
ball_1.Ball.prototype.controls = function () {
    var _this = this;
    return {
        ranges: [
            {
                vt: {
                    oninput: function (e) { _this.velocity.angle(0.01 * 2 * Math.PI * parseFloat(e.target.value)); },
                    initialValue: function () { return (50 * _this.velocity.t() / Math.PI).toString(); }
                },
                vm: {
                    oninput: function (e) { _this.velocity.size(parseFloat(e.target.value) + 1); },
                    initialValue: function () { return _this.velocity.m().toString(); }
                }
            },
            {
                radius: {
                    oninput: function (e) { _this.radius = (parseFloat(e.target.value) + 1); },
                    initialValue: function () { return _this.radius.toString(); }
                },
                mass: {
                    oninput: function (e) { _this.mass = (parseFloat(e.target.value) + 1); },
                    initialValue: function () { return _this.mass.toString(); }
                }
            }
        ]
    };
};
ball_1.Ball.prototype.withinBounds = function (point) {
    var x = point.x - this.getLocation().x;
    var y = point.y - this.getLocation().y;
    var r = this.getRadius() + (this.attributes.thickness || 0);
    return (x * x + y * y) <= r * r;
};
ball_1.Ball.prototype.click = function (e, keys) { };
ball_1.Ball.prototype.gestureEnter = function () { console.log('entered'); };
ball_1.Ball.prototype.gestureLeave = function () { console.log('left'); };
ball_1.Ball.prototype.drag = function (e, keys, p1, p2) { };
ball_1.Ball.prototype.draw = function (ctx, plane) {
    var wc = plane.worldToScreenCoordinates(this.getLocation());
    if (this.attributes.isHovered || this.attributes.selected) {
        ctx.fillStyle = '#000000ff';
        ctx.beginPath();
        ctx.arc(wc.x, wc.y, this.getRadius() * plane.getZoom() + 5, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.fillStyle = '#ffff00ff';
        ctx.beginPath();
        ctx.arc(wc.x, wc.y, this.getRadius() * plane.getZoom() + 4, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.fillStyle = '#000000ff';
        ctx.beginPath();
        ctx.arc(wc.x, wc.y, this.getRadius() * plane.getZoom() + 1, 0, 2 * Math.PI, false);
        ctx.fill();
    }
    ctx.fillStyle = '#' + (this.attributes.color >>> 0).toString(16).padStart(8, '0'); // >>> unsigned right shift
    //console.log('#' + ((<number>this.attributes.color) >>> 0).toString(16).padStart(8, '0'));
    ctx.beginPath();
    ctx.arc(wc.x, wc.y, this.getRadius() * plane.getZoom(), 0, 2 * Math.PI, false);
    ctx.fill();
    if (!this.attributes.hideVelocityVector || this.attributes.selected) {
        (new Edge2D(this.getLocation(), { x: this.getLocation().x + this.velocity.x(), y: this.getLocation().y + this.velocity.y() }, { color: 0xff00ffff, thickness: 1, directed: true })).draw(ctx, plane);
    }
    if (!this.attributes.hideAccelerationVector) {
        (new Edge2D(this.getLocation(), { x: this.getLocation().x + this.acceleration.x(), y: this.getLocation().y + this.acceleration.y() }, { color: 0xffff00ff, thickness: 1, directed: true })).draw(ctx, plane);
    }
};
module.exports = ball_1.Ball;


/***/ }),

/***/ "./ts/engine/augmented-edge.ts":
/*!*************************************!*\
  !*** ./ts/engine/augmented-edge.ts ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var edge_1 = __webpack_require__(/*! ./elements/edge */ "./ts/engine/elements/edge.ts");
edge_1.Edge2D.prototype.controls = function () {
    var _this = this;
    return {
        inputs: [
            {
                x0: { onchange: function (e) { return _this.p1.x = typeof parseFloat(e.target.value) === undefined ? _this.p1.x : parseFloat(e.target.value); }, initialValue: function () { return _this.p1.x.toString(); } },
                y0: { onchange: function (e) { return _this.p1.y = typeof parseFloat(e.target.value) === undefined ? _this.p1.y : parseFloat(e.target.value); }, initialValue: function () { return _this.p1.y.toString(); } },
                x1: { onchange: function (e) { return _this.p2.x = typeof parseFloat(e.target.value) === undefined ? _this.p2.x : parseFloat(e.target.value); }, initialValue: function () { return _this.p2.x.toString(); } },
                y1: { onchange: function (e) { return _this.p2.y = typeof parseFloat(e.target.value) === undefined ? _this.p2.y : parseFloat(e.target.value); }, initialValue: function () { return _this.p2.y.toString(); } }
            },
            {
                m: { onchange: function (e) { return _this.size(typeof parseFloat(e.target.value) === undefined ? _this.m() : parseFloat(e.target.value)); }, initialValue: function () { return _this.m().toString(); } },
                t: { onchange: function (e) { return _this.angle(typeof parseFloat(e.target.value) === undefined ? _this.m() : parseFloat(e.target.value)); }, initialValue: function () { return _this.t().toString(); } }
            }
        ]
    };
};
edge_1.Edge2D.prototype.withinBounds = function (point) {
    var v = new edge_1.Edge2D(this.p1, point);
    var proj = v.projectedScalar(this);
    var rej = Math.abs(v.rejectedScalar(this));
    if (proj > 0 && proj < this.m()) {
        if (rej < 0.5 * this.attributes.thickness) {
            return true;
        }
    }
    return false;
};
edge_1.Edge2D.prototype.click = function (e, keys) { };
edge_1.Edge2D.prototype.gestureEnter = function () { console.log('entered'); };
edge_1.Edge2D.prototype.gestureLeave = function () { console.log('left'); };
edge_1.Edge2D.prototype.drag = function (e, keys, p1, p2) { };
edge_1.Edge2D.prototype.draw = function (ctx, plane) {
    var e1 = this.rotated(3 * Math.PI / 4).scale(0.2).add(this);
    var e2 = this.rotated(-3 * Math.PI / 4).scale(0.2).add(this);
    var p0 = plane.worldToScreenCoordinates({ x: this.p1.x, y: this.p1.y });
    var p1 = plane.worldToScreenCoordinates({ x: this.p2.x, y: this.p2.y });
    var p2 = plane.worldToScreenCoordinates({ x: e1.getP2().x, y: e1.getP2().y });
    var p3 = plane.worldToScreenCoordinates({ x: e2.getP2().x, y: e2.getP2().y });
    var lw = ctx.lineWidth;
    var lc = ctx.lineCap;
    ctx.lineCap = 'round';
    //ctx.strokeStyle = '#' + ((<number>this.attributes.color) >>> 0).toString(16).padStart(8, '0'); // >>> unsigned right shift
    //ctx.lineWidth = (<number>this.attributes.thickness) * plane.getZoom();
    //plane.drawDirectedEdge(ctx, new Edge({x: this.p1.x, y: this.p1.y}, {x: this.p2.x, y: this.p2.y}, this.attributes.color.toString()));
    if (this.attributes.isHovered || this.attributes.selected) {
        ctx.strokeStyle = '#000000ff';
        ctx.lineWidth = this.attributes.thickness * plane.getZoom() + 5;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
        if (this.attributes.directed) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.stroke();
        }
        ctx.strokeStyle = '#ffff00ff';
        ctx.lineWidth = this.attributes.thickness * plane.getZoom() + 4;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
        if (this.attributes.directed) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.stroke();
        }
        ctx.strokeStyle = '#000000ff';
        ctx.lineWidth = this.attributes.thickness * plane.getZoom() + 1;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
        if (this.attributes.directed) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.stroke();
        }
    }
    ctx.strokeStyle = '#' + (this.attributes.color >>> 0).toString(16).padStart(8, '0'); // >>> unsigned right shift
    ctx.lineWidth = this.attributes.thickness * plane.getZoom();
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
    if (this.attributes.directed) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.stroke();
    }
    ctx.lineWidth = lw;
    ctx.lineCap = lc;
};
module.exports = edge_1.Edge2D;


/***/ }),

/***/ "./ts/engine/augmented-vector.ts":
/*!***************************************!*\
  !*** ./ts/engine/augmented-vector.ts ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var vector_1 = __webpack_require__(/*! ./elements/vector */ "./ts/engine/elements/vector.ts");
vector_1.Vector2D.prototype.controls = function () {
    var _this = this;
    return {
        inputs: [
            {
                x: { oninput: function (e) { return _this.components.x = parseFloat(e.target.value) || _this.components.x; }, initialValue: function () { return _this.components.x.toString(); } },
                y: { oninput: function (e) { return _this.components.y = parseFloat(e.target.value) || _this.components.y; }, initialValue: function () { return _this.components.y.toString(); } }
            },
            {
                magnitude: { oninput: function (e) { return _this.size(parseFloat(e.target.value) || _this.m()); }, initialValue: function () { return _this.m().toString(); } },
                thickness: { oninput: function (e) { return _this.attributes.thickness = parseFloat(e.target.value); }, initialValue: function () { return _this.attributes.thickness.toString(); } }
            }
        ],
        ranges: [
            { theta: { oninput: function (e) { return _this.angle(2 * Math.PI * (parseFloat(e.target.value) / 100)); }, initialValue: function () { return (100 * (_this.t() / (2 * Math.PI))).toString(); } } },
            {
                r: {
                    oninput: function (e) { return _this.attributes.color = (_this.attributes.color & 0x00ffffff) | (Math.floor(255 * (parseInt(e.target.value) / 100)) << 24); },
                    initialValue: function () { return Math.floor(100 * (((_this.attributes.color & 0xff000000) >>> 24) / (255))).toString(); }
                },
                g: {
                    oninput: function (e) { return _this.attributes.color = (_this.attributes.color & 0xff00ffff) | (Math.floor(255 * (parseInt(e.target.value) / 100)) << 16); },
                    initialValue: function () { return Math.floor(100 * (((_this.attributes.color & 0xff0000) >> 16) / (255))).toString(); }
                },
                b: {
                    oninput: function (e) { return _this.attributes.color = (_this.attributes.color & 0xffff00ff) | (Math.floor(255 * (parseInt(e.target.value) / 100)) << 8); },
                    initialValue: function () { return Math.floor(100 * (((_this.attributes.color & 0xff00) >> 8) / (255))).toString(); }
                },
                a: {
                    oninput: function (e) { return _this.attributes.color = (_this.attributes.color & 0xffffff00) | (Math.floor(255 * (parseInt(e.target.value) / 100)) << 0); },
                    initialValue: function () { return Math.floor(100 * ((_this.attributes.color & 0xff) / (255))).toString(); }
                }
            }
        ]
    };
};
vector_1.Vector2D.prototype.withinBounds = function (point) {
    var p = new vector_1.Vector2D(point);
    var proj = p.projectedScalar(this);
    var rej = Math.abs(p.rejectedScalar(this));
    if (proj > 0 && proj < this.m()) {
        if (rej < 0.5 * this.attributes.thickness) {
            return true;
        }
    }
    return false;
};
vector_1.Vector2D.prototype.click = function (e, keys) { };
vector_1.Vector2D.prototype.gestureEnter = function () { console.log('entered'); };
vector_1.Vector2D.prototype.gestureLeave = function () { console.log('left'); };
vector_1.Vector2D.prototype.drag = function (e, keys, p1, p2) { };
vector_1.Vector2D.prototype.draw = function (ctx, plane) {
    var lw = ctx.lineWidth;
    var lc = ctx.lineCap;
    ctx.lineCap = 'round';
    var v1 = this.rotated(3 * Math.PI / 4).scale(0.2).add(this);
    var v2 = this.rotated(-3 * Math.PI / 4).scale(0.2).add(this);
    var p0 = plane.worldToScreenCoordinates({ x: 0, y: 0 });
    var p1 = plane.worldToScreenCoordinates({ x: this.x(), y: this.y() });
    var p2 = plane.worldToScreenCoordinates({ x: v1.x(), y: v1.y() });
    var p3 = plane.worldToScreenCoordinates({ x: v2.x(), y: v2.y() });
    if (this.attributes.isHovered || this.attributes.selected) {
        ctx.strokeStyle = '#000000ff';
        ctx.lineWidth = this.attributes.thickness * plane.getZoom() + 5;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.stroke();
        ctx.strokeStyle = '#ffff00ff';
        ctx.lineWidth = this.attributes.thickness * plane.getZoom() + 4;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.stroke();
        ctx.strokeStyle = '#000000ff';
        ctx.lineWidth = this.attributes.thickness * plane.getZoom() + 1;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.stroke();
    }
    ctx.strokeStyle = '#' + (this.attributes.color >>> 0).toString(16).padStart(8, '0'); // >>> unsigned right shift
    ctx.lineWidth = this.attributes.thickness * plane.getZoom();
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.stroke();
    ctx.lineWidth = lw;
    ctx.lineCap = lc;
};
module.exports = vector_1.Vector2D;


/***/ }),

/***/ "./ts/engine/elements/ball.ts":
/*!************************************!*\
  !*** ./ts/engine/elements/ball.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Ball = void 0;
var vector_1 = __webpack_require__(/*! ./vector */ "./ts/engine/elements/vector.ts");
var edge_1 = __webpack_require__(/*! ./edge */ "./ts/engine/elements/edge.ts");
var Ball = /** @class */ (function () {
    function Ball(location, velocity, acceleration, radius, mass, attributes) {
        var _this = this;
        this.applyForce = function (f) { _this.acceleration.add(f.scaled(1 / _this.mass)); };
        this.location = location;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.radius = radius;
        this.mass = mass;
        this.attributes = __assign({}, attributes);
    }
    Ball.prototype.getLocation = function () { return { x: this.location.x, y: this.location.y }; };
    ;
    Ball.prototype.relocate = function (x, y) { this.location.x = x; this.location.y = y; return this; };
    Ball.prototype.getRadius = function () { return this.radius; };
    Ball.prototype.move = function (dt) {
        this.location.x += dt * this.velocity.x();
        this.location.y += dt * this.velocity.y();
        this.velocity.add(this.acceleration.scaled(dt));
    };
    Ball.prototype.timeToCollideWithEdge = function (e) {
        // first determine when ball will strike line
        var ve = new edge_1.Edge2D({ x: this.location.x, y: this.location.y }, { x: this.location.x + this.velocity.x(), y: this.location.y + this.velocity.y() });
        var c = new edge_1.Edge2D(e.p1, this.location);
        var cDetE = c.det(e);
        var eDetV = e.det(ve);
        var cReM = this.radius * e.m();
        var t1 = 999999;
        var t2 = 999999;
        if (eDetV != 0) {
            t1 = (cDetE + cReM) / eDetV;
            t2 = (cDetE - cReM) / eDetV;
        }
        // determine if ball will strike outside of line segment
        //
        // proj(t) = (this.x(t)-e1.x)(e2.x-e1.x)+(this.y(t)-e1.y)(e2.y-e1.y)/e.m()
        // where:
        //  this.x(t) = this.location.x + t*this.velocity.x
        //  this.y(t) = this.location.y + t*this.velocity.y
        var m = e.m();
        var mInv = 1 / m;
        if (t1 < 0 || t1 > 999999) {
            t1 = 999999;
        }
        else {
            var x_t1 = this.location.x + t1 * this.velocity.x();
            var y_t1 = this.location.y + t1 * this.velocity.y();
            var proj_t1 = ((x_t1 - e.getP1().x) * e.x() + (y_t1 - e.getP1().y) * e.y()) * mInv;
            if (proj_t1 < 0 || proj_t1 > m)
                t1 = 9999999;
        }
        if (t2 < 0 || t2 > 999999) {
            t2 = 999999;
        }
        else {
            var x_t2 = this.location.x + t2 * this.velocity.x();
            var y_t2 = this.location.y + t2 * this.velocity.y();
            var proj_t2 = ((x_t2 - e.getP1().x) * e.x() + (y_t2 - e.getP1().y) * e.y()) * mInv;
            if (proj_t2 < 0 || proj_t2 > m)
                t2 = 9999999;
        }
        return [t1, t2];
    };
    Ball.prototype.timeToCollideWithBall = function (b) {
        var meVX = this.velocity.x();
        var meVY = this.velocity.y();
        var youVX = b.velocity.x();
        var youVY = b.velocity.y();
        var dx = this.location.x - b.location.x;
        var dy = this.location.y - b.location.y;
        var dVX = meVX - youVX;
        var dVY = meVY - youVY;
        var A = dVX * dVX + dVY * dVY;
        var B = 2.0 * (dx * dVX + dy * dVY);
        var C = dx * dx + dy * dy - (this.radius + b.radius) * (this.radius + b.radius);
        var discriminant = B * B - 4.0 * A * C;
        if (discriminant < 0 || A === 0) {
            return [999999999, 99999999];
        }
        else {
            return [
                (-B - Math.sqrt(discriminant)) / (2 * A),
                (-B + Math.sqrt(discriminant)) / (2 * A),
            ];
        }
    };
    Ball.prototype.timeToCollideWithPoint = function (p) {
        var meVX = this.velocity.x();
        var meVY = this.velocity.y();
        var dx = this.location.x - p.x;
        var dy = this.location.y - p.y;
        var dVX = meVX;
        var dVY = meVY;
        var A = dVX * dVX + dVY * dVY;
        var B = 2.0 * (dx * dVX + dy * dVY);
        var C = dx * dx + dy * dy - (this.radius) * (this.radius);
        var discriminant = B * B - 4.0 * A * C;
        if (discriminant < 0 || A === 0) {
            return [999999999, 99999999];
        }
        else {
            return [
                (-B - Math.sqrt(discriminant)) / (2 * A),
                (-B + Math.sqrt(discriminant)) / (2 * A),
            ];
        }
    };
    Ball.prototype.deflectWithEdge = function (e) {
        var ve = new edge_1.Edge2D({ x: this.location.x, y: this.location.y }, { x: this.location.x + this.velocity.x(), y: this.location.y + this.velocity.y() });
        var mSquared = e.mm();
        var x = new vector_1.Vector2D({
            x: (-2 * e.y() * ve.det(e)) / mSquared,
            y: 2 * e.x() * ve.det(e) / mSquared
        });
        this.velocity.add(x);
    };
    Ball.prototype.deflectWithBall = function (b) {
        var bbv = new vector_1.Vector2D({ x: b.location.x - this.location.x, y: b.location.y - this.location.y });
        var aProj = this.velocity.projected(bbv);
        var bProj = b.velocity.projected(bbv);
        var aRej = this.velocity.rejected(bbv);
        var bRej = b.velocity.rejected(bbv);
        var avi = this.velocity.projectedScalar(bbv);
        var bvi = b.velocity.projectedScalar(bbv);
        var aVf = (2.0 * b.mass * bvi + avi * (this.mass - b.mass)) / (this.mass + b.mass);
        var bVf = (2.0 * this.mass * avi + bvi * (b.mass - this.mass)) / (this.mass + b.mass);
        var avf = bbv.sized(aVf).add(aRej);
        var bvf = bbv.sized(bVf).add(bRej);
        this.velocity.components.x = avf.x();
        this.velocity.components.y = avf.y();
        b.velocity.components.x = bvf.x();
        b.velocity.components.y = bvf.y();
        //b.attributes.color = 0x000000ff | (Math.floor(Math.random()*16777216) << 8);
        bbv.size(this.radius);
        var collisionLocation = {
            x: this.location.x + bbv.x(),
            y: this.location.y + bbv.y(),
        };
        return [
        //new Edge2D({x: collisionLocation.x, y: collisionLocation.y}, {x: collisionLocation.x + aProj.x(), y: collisionLocation.y + aProj.y()}, {directed: true, color: 0x0000ffff, thickness: 0.1}), 
        //new Edge2D({x: collisionLocation.x, y: collisionLocation.y}, {x: collisionLocation.x + aRej.x(), y: collisionLocation.y + aRej.y()}, {directed: true, color: 0xff00ffff, thickness: .1}), 
        //new Edge2D({x: collisionLocation.x, y: collisionLocation.y}, {x: collisionLocation.x + bProj.x(), y: collisionLocation.y + bProj.y()}, {directed: true, color: 0x0000ffff, thickness: .1}), 
        //new Edge2D({x: collisionLocation.x, y: collisionLocation.y}, {x: collisionLocation.x + bRej.x(), y: collisionLocation.y + bRej.y()}, {directed: true, color: 0xff00ffff, thickness: .1}), 
        //new Edge2D({x: collisionLocation.x, y: collisionLocation.y}, {x: collisionLocation.x + this.velocity.x(), y: collisionLocation.y + this.velocity.y()}, {directed: true, color: this.attributes.color!, thickness: .2}),
        //new Edge2D({x: collisionLocation.x, y: collisionLocation.y}, {x: collisionLocation.x + b.velocity.x(), y: collisionLocation.y + b.velocity.y()}, {directed: true, color: b.attributes.color!, thickness: .2}),
        ];
    };
    Ball.prototype.deflectWithPoint = function (p) {
        var btp = new vector_1.Vector2D({ x: p.x - this.location.x, y: p.y - this.location.y });
        var aProj = this.velocity.projected(btp);
        var aVf = this.velocity.rejected(btp).add(aProj.scaled(-1));
        this.velocity.components.x = aVf.x();
        this.velocity.components.y = aVf.y();
    };
    return Ball;
}());
exports.Ball = Ball;


/***/ }),

/***/ "./ts/engine/elements/edge.ts":
/*!************************************!*\
  !*** ./ts/engine/elements/edge.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Edge2D = void 0;
var Edge2D = /** @class */ (function () {
    function Edge2D(p1, p2, attributes) {
        this.attributes = {};
        this.p1 = p1;
        this.p2 = p2;
        this.attributes = __assign(__assign({}, this.attributes), attributes);
    }
    Edge2D.prototype.x = function () { return this.p2.x - this.p1.x; };
    Edge2D.prototype.y = function () { return this.p2.y - this.p1.y; };
    Edge2D.prototype.getP1 = function () { return { x: this.p1.x, y: this.p1.y }; };
    Edge2D.prototype.getP2 = function () { return { x: this.p2.x, y: this.p2.y }; };
    Edge2D.prototype.m = function () { return Math.sqrt(this.mm()); };
    Edge2D.prototype.mm = function () { return this.x() * this.x() + this.y() * this.y(); };
    Edge2D.prototype.t = function () { var t = Math.atan2(this.y(), this.x()); if (t < 0)
        t += 2 * Math.PI; return t; };
    Edge2D.prototype.dot = function (b) { return this.x() * b.x() + this.y() * b.y(); };
    Edge2D.prototype.det = function (b) { return this.x() * b.y() - this.y() * b.x(); };
    Edge2D.prototype.projectedScalar = function (b) { return this.dot(b) / b.m(); };
    Edge2D.prototype.rejectedScalar = function (b) { return this.det(b) / b.m(); };
    Edge2D.prototype.getParametricPoint = function (t) { return { x: this.p1.x + t * this.x(), y: this.p1.y + t * this.y() }; };
    Edge2D.prototype.getParametricIntersection = function (b) { var det = this.det(b); return det ? (b.y() * (b.p1.x - this.p1.x) - b.x() * (b.p1.y - this.p1.y)) / det : null; };
    Edge2D.prototype.reposition = function (p1) { this.p2.x = p1.x + this.x(); this.p2.y = p1.y + this.y(); this.p1.x = p1.x; this.p1.y = p1.y; return this; };
    Edge2D.prototype.repositioned = function (p1) { return new Edge2D({ x: p1.x, y: p1.y }, { x: p1.x + this.x(), y: p1.y + this.y() }, __assign({}, this.attributes)); };
    Edge2D.prototype.scale = function (c) { this.p2.x = this.p1.x + c * this.x(); this.p2.y = this.p1.y + c * this.y(); return this; };
    Edge2D.prototype.scaled = function (c) { return new Edge2D({ x: this.p1.x, y: this.p1.y }, { x: this.p1.x + c * this.x(), y: this.p1.y + c * this.y() }, __assign({}, this.attributes)); };
    Edge2D.prototype.size = function (m) { return this.scale(1 / this.m()).scale(m); };
    Edge2D.prototype.sized = function (m) { return (new Edge2D({ x: this.p1.x, y: this.p1.y }, { x: this.p2.x, y: this.p2.y }, __assign({}, this.attributes))).scale(1 / this.m()).scale(m); };
    Edge2D.prototype.angle = function (a) { var m = this.m(); this.p2.x = this.p1.x + m * Math.cos(a); this.p2.y = this.p1.y + m * Math.sin(a); return this; };
    Edge2D.prototype.angled = function (a) { var m = this.m(); return new Edge2D({ x: this.p1.x, y: this.p1.y }, { x: this.p1.x + m * Math.cos(a), y: this.p1.y + m * Math.sin(a) }, __assign({}, this.attributes)); };
    Edge2D.prototype.rotate = function (a) {
        var ct = Math.cos(a);
        var st = Math.sin(a);
        var p = this.x();
        var q = this.y();
        this.p2.x = this.p1.x + p * ct - q * st;
        this.p2.y = this.p1.y + p * st + q * ct;
        return this;
    };
    Edge2D.prototype.rotated = function (a) {
        var ct = Math.cos(a);
        var st = Math.sin(a);
        var p = this.x();
        var q = this.y();
        return new Edge2D({ x: this.p1.x, y: this.p1.y }, { x: this.p1.x + p * ct - q * st, y: this.p1.y + p * st + q * ct }, __assign({}, this.attributes));
    };
    Edge2D.prototype.add = function (b) { this.p2.x += b.x(); this.p2.y += b.y(); return this; };
    Edge2D.prototype.added = function (b) { return new Edge2D({ x: this.p1.x, y: this.p1.y }, { x: this.p2.x += b.x(), y: this.p2.y += b.y() }, __assign({}, this.attributes)); };
    Edge2D.prototype.project = function (b) {
        var c = this.dot(b) / b.mm();
        this.p1.x = b.p1.x;
        this.p1.y = b.p1.y;
        this.p2.x = this.p1.x + c * b.x();
        this.p2.y = this.p1.y + c * b.y();
        return this;
    };
    Edge2D.prototype.projected = function (b) {
        var c = this.dot(b) / b.mm();
        return new Edge2D({ x: b.p1.x, y: b.p1.y }, { x: this.p1.x + c * b.x(), y: this.p1.y + c * b.y() }, __assign({}, this.attributes));
    };
    Edge2D.prototype.reject = function (b) {
        var pTemp = this.projected(b);
        var c = this.det(b) / b.mm();
        this.p1.x = pTemp.p2.x;
        this.p1.y = pTemp.p2.y;
        this.p2.x = pTemp.p2.x + c * b.y();
        this.p2.y = pTemp.p2.y - c * b.x();
        return this;
    };
    Edge2D.prototype.rejected = function (b) {
        var pTemp = this.projected(b);
        var c = this.det(b) / b.mm();
        return new Edge2D({ x: pTemp.p2.x, y: pTemp.p2.y }, { x: pTemp.p2.x + +c * b.y(), y: pTemp.p2.y - c * b.x() }, __assign({}, this.attributes));
    };
    Edge2D.prototype.intersection = function (e) {
        var bDetA = e.det(this);
        var BAx = e.p1.x - this.p1.x;
        var BAy = e.p1.y - this.p1.y;
        return (-e.y() * BAx + e.x() * BAy) / bDetA;
        //return (-this.y()*BAx + this.x()*BAy)/bDetA;
        // var a = this.x();
        // var b = this.y();
        // var c = e2.x();
        // var d = e2.y();
        // var determinant = a*d-b*c;
        // return (d*(e2.p1.x - this.p1.x) - c*(e2.p1.y - this.p1.y))/determinant;
        //return (new Edge2D({x: b.p1.x, y: b.p1.y}, {x: this.p1.x, y: this.p1.y})).det(this)/this.det(b); 
    };
    Edge2D.prototype.point = function (t) { return { x: this.p1.x + t * (this.p2.x - this.p1.x), y: this.p1.y + t * (this.p2.y - this.p1.y) }; };
    return Edge2D;
}());
exports.Edge2D = Edge2D;


/***/ }),

/***/ "./ts/engine/elements/vector.ts":
/*!**************************************!*\
  !*** ./ts/engine/elements/vector.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Vector2D = void 0;
var Vector2D = /** @class */ (function () {
    function Vector2D(components, attributes) {
        var _this = this;
        this.attributes = {};
        // complex number operations
        this.complex = {
            toString: function () { return _this.components.y ? "".concat(_this.components.x, " + i").concat(_this.components.y) : _this.components.x.toString(); },
            inverse: function () { var mmR = 1.0 / _this.mm(); _this.components.x *= mmR; _this.components.y *= mmR; return _this; },
            inversed: function () { var mmR = 1.0 / _this.mm(); return new Vector2D({ x: _this.components.x * mmR, y: _this.components.y * mmR }, __assign({}, _this.attributes)); },
            conjugate: function () { _this.components.y *= -1; return _this; },
            conjugated: function () { return new Vector2D({ x: _this.components.x, y: -_this.components.y }); },
            multiply: function (b) { var x = _this.x() * b.x() - _this.y() * b.y(); var y = _this.x() * b.y() + _this.y() * b.x(); _this.components.x = x; _this.components.y = y; return _this; },
            multiplied: function (b) { return new Vector2D({ x: _this.x() * b.x() - _this.y() * b.y(), y: _this.x() * b.y() + _this.y() * b.x() }, __assign({}, _this.attributes)); },
            divide: function (b) { return _this.complex.multiply(b.complex.inversed()); },
            divided: function (b) { return _this.complex.multiplied(b.complex.inversed()); },
            // exponential functions
            pow: function (b) { var p = _this.complex.powed(b); _this.components.x = p.components.x; _this.components.y = p.components.y; return _this; },
            powed: function (b) {
                return b.complex.multiplied(_this.complex.loged()).complex.exped();
            },
            exp: function () {
                var ea = Math.pow(Math.E, _this.components.x);
                var x = ea * Math.cos(_this.components.y);
                var y = ea * Math.sin(_this.components.y);
                _this.components.x = x;
                _this.components.y = y;
                return _this;
            },
            exped: function () {
                var ea = Math.pow(Math.E, _this.components.x);
                return new Vector2D({
                    x: ea * Math.cos(_this.components.y), y: ea * Math.sin(_this.components.y)
                });
            },
            log: function () {
                var m = _this.m();
                var t = _this.t();
                _this.components.x = Math.log(m);
                _this.components.y = t;
                return _this;
            },
            loged: function () { return new Vector2D({ x: Math.log(_this.m()), y: _this.t() }); },
            // trig functions
            cos: function () {
                var x = Math.cos(_this.components.x) * Math.cosh(_this.components.y);
                var y = -Math.sin(_this.components.x) * Math.sinh(_this.components.y);
                _this.components.x = x;
                _this.components.y = y;
                return _this;
            },
            cosed: function () { return new Vector2D({ x: Math.cos(_this.components.x) * Math.cosh(_this.components.y), y: -Math.sin(_this.components.x) * Math.sinh(_this.components.y) }, __assign({}, _this.attributes)); },
            sin: function () {
                var x = Math.sin(_this.components.x) * Math.cosh(_this.components.y);
                var y = Math.cos(_this.components.x) * Math.sinh(_this.components.y);
                _this.components.x = x;
                _this.components.y = y;
                return _this;
            },
            sined: function () { return new Vector2D({ x: Math.sin(_this.components.x) * Math.cosh(_this.components.y), y: Math.cos(_this.components.x) * Math.sinh(_this.components.y) }, __assign({}, _this.attributes)); }
        };
        this.components = components;
        this.attributes = __assign(__assign({}, this.attributes), attributes);
    }
    Vector2D.prototype.toString = function () { return "(".concat(this.components.x, ", ").concat(this.components.y, ")"); };
    Vector2D.prototype.x = function () { return this.components.x; };
    Vector2D.prototype.y = function () { return this.components.y; };
    Vector2D.prototype.getComponents = function () { return this.components; };
    Vector2D.prototype.m = function () { return Math.sqrt(this.components.x * this.components.x + this.components.y * this.components.y); };
    Vector2D.prototype.mm = function () { return this.components.x * this.components.x + this.components.y * this.components.y; };
    Vector2D.prototype.t = function () { var t = Math.atan2(this.components.y, this.components.x); if (t < 0)
        t += 2 * Math.PI; return t; }; //t1 - 2*Math.PI*Math.floor(t1/(Math.PI*2))
    Vector2D.prototype.dot = function (b) { return this.x() * b.x() + this.y() * b.y(); };
    Vector2D.prototype.det = function (b) { return this.x() * b.y() - this.y() * b.x(); };
    Vector2D.prototype.projectedScalar = function (b) { return this.dot(b) / b.m(); };
    Vector2D.prototype.rejectedScalar = function (b) { return this.det(b) / b.m(); };
    // present tense indicates mutation of THIS whereas past tense indicates production of new Vector2d while preserving THIS
    Vector2D.prototype.scale = function (c) { this.components.x *= c; this.components.y *= c; return this; };
    Vector2D.prototype.scaled = function (c) { return new Vector2D({ x: this.components.x * c, y: this.components.y * c }, __assign({}, this.attributes)); };
    Vector2D.prototype.size = function (m) { return this.scale(m / this.m()); };
    Vector2D.prototype.sized = function (m) { return (new Vector2D({ x: this.components.x, y: this.components.y }, __assign({}, this.attributes))).scale(m / this.m()); };
    Vector2D.prototype.angle = function (a) { var m = this.m(); this.components.x = m * Math.cos(a); this.components.y = m * Math.sin(a); return this; };
    Vector2D.prototype.angled = function (a) { var m = this.m(); return new Vector2D({ x: m * Math.cos(a), y: m * Math.sin(a) }, __assign({}, this.attributes)); };
    Vector2D.prototype.rotate = function (t) {
        var ct = Math.cos(t);
        var st = Math.sin(t);
        var a = this.components.x;
        var b = this.components.y;
        this.components.x = a * ct - b * st;
        this.components.y = a * st + b * ct;
        return this;
    };
    Vector2D.prototype.rotated = function (t) {
        var ct = Math.cos(t);
        var st = Math.sin(t);
        return new Vector2D({ x: this.components.x * ct - this.components.y * st, y: this.components.x * st + this.components.y * ct }, __assign({}, this.attributes));
    };
    Vector2D.prototype.reflect = function (b) {
        var x = this.components.x;
        var y = this.components.y;
        var squares = b.x() * b.x() - b.y() * b.y();
        var prod = 2 * b.x() * b.y();
        this.components.x = x * squares + y * prod;
        this.components.y = x * prod + y * squares;
        this.scale(1 / b.mm());
        return this;
    };
    Vector2D.prototype.reflected = function (b) { return (new Vector2D({ x: this.components.x, y: this.components.y })).reflect(b); };
    Vector2D.prototype.transform = function (M) {
        var a = M[0][0] * this.x() + M[0][1] * this.y();
        var b = M[1][0] * this.x() + M[1][1] * this.y();
        this.components.x = a;
        this.components.y = b;
        return this;
    };
    Vector2D.prototype.transformed = function (M) {
        return new Vector2D({ x: M[0][0] * this.x() + M[0][1] * this.y(), y: M[1][0] * this.x() + M[1][1] * this.y() }, __assign({}, this.attributes));
    };
    Vector2D.prototype.add = function (b) { this.components.x += b.components.x; this.components.y += b.components.y; return this; };
    Vector2D.prototype.added = function (b) { return new Vector2D({ x: this.x() + b.x(), y: this.y() + b.y() }, __assign({}, this.attributes)); };
    Vector2D.prototype.project = function (b) { var c = this.dot(b) / b.mm(); this.components.x = b.x() * c; this.components.y = b.y() * c; return this; };
    Vector2D.prototype.projected = function (b) { var c = this.dot(b) / b.mm(); return new Vector2D({ x: b.x() * c, y: b.y() * c }, __assign({}, this.attributes)); };
    Vector2D.prototype.reject = function (b) { var c = this.det(b) / b.mm(); this.components.x = b.y() * c; this.components.y = -b.x() * c; return this; };
    Vector2D.prototype.rejected = function (b) { var c = this.det(b) / b.mm(); return new Vector2D({ x: b.y() * c, y: -b.x() * c }, __assign({}, this.attributes)); };
    return Vector2D;
}());
exports.Vector2D = Vector2D;


/***/ }),

/***/ "./ts/engine/engine.ts":
/*!*****************************!*\
  !*** ./ts/engine/engine.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Engine = void 0;
var augmented_edge_1 = __importDefault(__webpack_require__(/*! ./augmented-edge */ "./ts/engine/augmented-edge.ts"));
var augmented_ball_1 = __importDefault(__webpack_require__(/*! ./augmented-ball */ "./ts/engine/augmented-ball.ts"));
var Engine = /** @class */ (function () {
    function Engine(actors, elements) {
        this.minTime = 0.000001; //Number.MIN_VALUE;
        var numElements = 0;
        actors.forEach(function (a) { a.attributes.id = (numElements++).toString(); });
        elements.forEach(function (a) { a.attributes.id = (numElements++).toString(); });
        this.state = { numElements: numElements, actors: actors, elements: elements };
    }
    Engine.prototype.getActors = function () { return this.state.actors; };
    Engine.prototype.getElements = function () { return this.state.elements; };
    Engine.prototype.pushActor = function (a) { a.attributes.id = this.state.numElements++; this.state.actors.push(a); };
    Engine.prototype.pushElement = function (e) { e.attributes.id = this.state.numElements++; this.state.elements.push(e); };
    Engine.prototype.popActorById = function (id) { return this.state.actors.filter(function (a) { return a.attributes.id === id; })[0]; };
    Engine.prototype.popElementById = function (id) { return this.state.elements.filter(function (e) { return e.attributes.id === id; })[0]; };
    Engine.prototype.determineNextCollisions = function () {
        var _this = this;
        var collisions = [{
                t: 999999999,
                Object1: null,
                Object2: null
            }];
        this.state.actors.forEach(function (a, i) {
            for (var j = i + 1; j < _this.state.actors.length; j++) {
                var t = Math.min.apply(Math, a.timeToCollideWithBall(_this.state.actors[j]));
                if (t === collisions[0].t) {
                    collisions.push({
                        t: t,
                        Object1: a,
                        Object2: _this.state.actors[j]
                    });
                }
                if (t < collisions[0].t && (t > _this.minTime)) { // and (t > 0.00001)   
                    collisions = [{
                            t: t,
                            Object1: a,
                            Object2: _this.state.actors[j]
                        }];
                }
            }
            _this.state.elements.forEach(function (e) {
                var t = Math.min.apply(Math, a.timeToCollideWithEdge(e));
                if (t === collisions[0].t) {
                    collisions.push({
                        t: t,
                        Object1: a,
                        Object2: e
                    });
                }
                if (t < collisions[0].t && (t > _this.minTime)) { //and (t > 0.00001)
                    collisions = [{
                            t: t,
                            Object1: a,
                            Object2: e
                        }];
                }
                t = Math.min.apply(Math, a.timeToCollideWithPoint(e.getP1()));
                if (t === collisions[0].t) {
                    collisions.push({
                        t: t,
                        Object1: a,
                        Object2: e.getP1()
                    });
                }
                if (t < collisions[0].t && (t > _this.minTime)) { //and (t > 0.00001)
                    collisions = [{
                            t: t,
                            Object1: a,
                            Object2: e.getP1()
                        }];
                }
                t = Math.min.apply(Math, a.timeToCollideWithPoint(e.getP2()));
                if (t === collisions[0].t) {
                    collisions.push({
                        t: t,
                        Object1: a,
                        Object2: e.getP2()
                    });
                }
                if (t < collisions[0].t && (t > _this.minTime)) { //and (t > 0.00001)
                    collisions = [{
                            t: t,
                            Object1: a,
                            Object2: e.getP2()
                        }];
                }
            });
        });
        return collisions;
    };
    Engine.prototype.moveActors = function (dt) {
        var nextCollisions = this.determineNextCollisions();
        var additionalRenders = [];
        while (nextCollisions[0].t < dt && nextCollisions[0].t > 0) {
            this.state.actors.forEach(function (v) { return v.move(nextCollisions[0].t); });
            nextCollisions.forEach(function (nextCollision) {
                var _a, _b;
                if (nextCollision.Object2 instanceof augmented_ball_1.default) {
                    var vs = nextCollision.Object1.deflectWithBall(nextCollision.Object2);
                    additionalRenders.push.apply(additionalRenders, vs);
                }
                else {
                    if (nextCollision.Object2 instanceof augmented_edge_1.default) {
                        nextCollision.Object1.deflectWithEdge(nextCollision.Object2);
                    }
                    else {
                        if (((_a = nextCollision.Object2) === null || _a === void 0 ? void 0 : _a.x) && ((_b = nextCollision.Object2) === null || _b === void 0 ? void 0 : _b.y)) {
                            nextCollision.Object1.deflectWithPoint(nextCollision.Object2);
                        }
                    }
                }
            });
            dt -= nextCollisions[0].t;
            nextCollisions = this.determineNextCollisions();
        }
        this.state.actors.forEach(function (a) { return a.move(dt); });
        return additionalRenders;
    };
    return Engine;
}());
exports.Engine = Engine;


/***/ }),

/***/ "./ts/engine/plane.ts":
/*!****************************!*\
  !*** ./ts/engine/plane.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Plane = void 0;
var Plane = /** @class */ (function () {
    function Plane(canvas) {
        this.width = 0;
        this.height = 0;
        this.xOrigin = 0.0;
        this.yOrigin = 0.0;
        this.zoom = 1.0;
        this.zoomInverse = 1.0 / this.zoom;
        this.halfWidth = this.width / 2.0;
        this.halfHeight = this.height / 2.0;
        this.mx = -1.0;
        this.my = -1.0;
        this.gridColor = '#C8C8FF'; //'#C8C8DC';
        this.axesColor = '#000000';
        this.delegateCanvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.halfWidth = this.width / 2.0;
        this.halfHeight = this.height / 2.0;
    }
    Plane.prototype.getZoom = function () { return this.zoom; };
    Plane.prototype.screenToWorldCoordinates = function (screenCoordinate) {
        return {
            x: (screenCoordinate.x - this.halfWidth) * this.zoomInverse + this.xOrigin,
            y: -(screenCoordinate.y - this.halfHeight) * this.zoomInverse + this.yOrigin
        };
    };
    Plane.prototype.worldToScreenCoordinates = function (worldCoordinate) {
        return {
            x: (worldCoordinate.x - this.xOrigin) * this.zoom + this.halfWidth,
            y: -(worldCoordinate.y - this.yOrigin) * this.zoom + this.halfHeight
        };
    };
    Plane.prototype.clear = function (canvas2dContext) {
        canvas2dContext.clearRect(0, 0, this.width, this.height);
    };
    Plane.prototype.drawAxes = function (canvas2dContext) {
        var northWest = { "x": 0, "y": 0 };
        var southEast = { "x": this.width, "y": this.height };
        northWest = this.screenToWorldCoordinates(northWest);
        southEast = this.screenToWorldCoordinates(southEast);
        if ((northWest.x <= 0) && (southEast.x >= 0)) {
            var topCoord = { "x": 0, "y": northWest.y };
            var bottomCoord = { "x": 0, "y": southEast.y };
            topCoord = this.worldToScreenCoordinates(topCoord);
            bottomCoord = this.worldToScreenCoordinates(bottomCoord);
            canvas2dContext.strokeStyle = this.axesColor;
            canvas2dContext.beginPath();
            canvas2dContext.moveTo(topCoord.x, topCoord.y);
            canvas2dContext.lineTo(bottomCoord.x, bottomCoord.y);
            canvas2dContext.stroke();
        }
        if ((northWest.y >= 0) && (southEast.y <= 0)) {
            var leftCoord = { "x": northWest.x, "y": 0 };
            var rightCoord = { "x": southEast.x, "y": 0 };
            leftCoord = this.worldToScreenCoordinates(leftCoord);
            rightCoord = this.worldToScreenCoordinates(rightCoord);
            canvas2dContext.strokeStyle = this.axesColor;
            canvas2dContext.beginPath();
            canvas2dContext.moveTo(leftCoord.x, leftCoord.y);
            canvas2dContext.lineTo(rightCoord.x, rightCoord.y);
            canvas2dContext.stroke();
        }
    };
    Plane.prototype.drawGrid = function (canvas2dContext) {
        var northWest = { "x": 0, "y": 0 };
        var southEast = { "x": this.width, "y": this.height };
        northWest = this.screenToWorldCoordinates(northWest);
        southEast = this.screenToWorldCoordinates(southEast);
        var width = southEast.x - northWest.x;
        var height = northWest.y - southEast.y;
        var wMagnitude = Math.floor(Math.log10(width));
        var hMagnitude = Math.floor(Math.log10(height));
        if (wMagnitude < hMagnitude) {
            var m = wMagnitude;
            var p1 = Math.pow(10, m - 1);
            var p0 = Math.pow(10, m);
            var ones = Math.floor(width / p1);
            var tens = Math.floor(width / p0);
        }
        else {
            var m = hMagnitude;
            var p1 = Math.pow(10, m - 1);
            var p0 = Math.pow(10, m);
            var ones = Math.floor(height / p1);
            var tens = Math.floor(height / p0);
        }
        canvas2dContext.strokeStyle = this.gridColor;
        canvas2dContext.globalAlpha = (1.0 - (ones / 99.0));
        var leftmostOne = Math.floor(northWest.x / p1) * p1;
        var topCoord = { x: -1, y: -1 };
        var bottomCoord = { x: -1, y: -1 };
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
        var bottommostOne = Math.floor(southEast.y / p1) * p1;
        var leftCoord = { x: -1, y: -1 };
        var rightCoord = { x: -1, y: -1 };
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
        canvas2dContext.globalAlpha = 1.0;
        var leftmostOne = Math.floor(northWest.x / p0) * p0;
        var topCoord = { x: -1, y: -1 };
        var bottomCoord = { x: -1, y: -1 };
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
        var bottommostOne = Math.floor(southEast.y / p0) * p0;
        var leftCoord = { x: -1, y: -1 };
        var rightCoord = { x: -1, y: -1 };
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
    };
    Plane.prototype.drawEdge = function (canvas2dContext, edge) {
        var startPoint = this.worldToScreenCoordinates(edge.p0);
        var endPoint = this.worldToScreenCoordinates(edge.pf);
        canvas2dContext.strokeStyle = '#000000'; //edge.color;
        canvas2dContext.beginPath();
        canvas2dContext.moveTo(startPoint.x, startPoint.y);
        canvas2dContext.lineTo(endPoint.x, endPoint.y);
        canvas2dContext.stroke();
    };
    Plane.prototype.defaultResizeListener = function () {
        this.delegateCanvas.width = this.delegateCanvas.parentNode.clientWidth;
        this.delegateCanvas.height = this.delegateCanvas.parentNode.clientHeight;
        this.width = this.delegateCanvas.width;
        this.height = this.delegateCanvas.height;
        this.halfWidth = this.delegateCanvas.width / 2.0;
        this.halfHeight = this.delegateCanvas.height / 2.0;
    };
    Plane.prototype.defaultMouseMoveListener = function (event) {
        var centerDivRect = this.delegateCanvas.parentNode.getBoundingClientRect();
        var coord = {
            x: event.clientX - centerDivRect.left,
            y: event.clientY - centerDivRect.top
        };
        this.mx = coord.x;
        this.my = coord.y;
    };
    Plane.prototype.defaultMouseWheelListener = function (event) {
        if (event.deltaY < 0) {
            this.zoom = this.zoom * (1.05);
            this.zoomInverse = 1.0 / this.zoom;
        }
        else {
            this.zoom = this.zoom * (0.95);
            this.zoomInverse = 1.0 / this.zoom;
        }
    };
    Plane.prototype.defaultMouseClickListener = function (event) {
        var centerDivRect = this.delegateCanvas.parentNode.getBoundingClientRect();
        var coord = {
            x: event.clientX - centerDivRect.left,
            y: event.clientY - centerDivRect.top
        };
        this.mx = coord.x;
        this.my = coord.y;
        coord = this.screenToWorldCoordinates(coord);
        this.xOrigin = coord.x;
        this.yOrigin = coord.y;
    };
    return Plane;
}());
exports.Plane = Plane;


/***/ }),

/***/ "./ts/engine/ui.ts":
/*!*************************!*\
  !*** ./ts/engine/ui.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setControls = exports.getUIElements = void 0;
function getUIElements() {
    var canvas = document.getElementById('myCanvas');
    var controlPanel = document.getElementById('control-panel');
    var outputPanel = document.getElementById('output-panel');
    var overlay = document.getElementById('overlay');
    if (canvas && controlPanel && outputPanel && overlay) {
        return {
            canvas: canvas,
            controlPanel: controlPanel,
            outputPanel: outputPanel,
            overlay: overlay
        };
    }
    return null;
}
exports.getUIElements = getUIElements;
function setControls(element, controls) {
    var _a, _b, _c, _d;
    element.innerHTML = '';
    (_a = controls.buttons) === null || _a === void 0 ? void 0 : _a.forEach(function (buttonGroup) {
        var span = document.createElement('span');
        span.classList.add('control-panel-group', 'control-panel-button-group');
        Object.keys(buttonGroup).forEach(function (buttonKey) {
            var button = document.createElement('button');
            button.classList.add('control-panel-button');
            button.innerHTML = buttonKey;
            button.onclick = function (e) { return buttonGroup[buttonKey](e); };
            span.appendChild(button);
        });
        element.appendChild(span);
        element.appendChild(document.createElement('br'));
    });
    (_b = controls.ranges) === null || _b === void 0 ? void 0 : _b.forEach(function (rangeGroup) {
        var span = document.createElement('table');
        span.classList.add('control-panel-group', 'control-panel-range-group');
        Object.keys(rangeGroup).forEach(function (rangeKey) {
            var tr = document.createElement('tr');
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var label = document.createElement('label');
            label.classList.add('control-panel-label', 'control-panel-range-label');
            label.innerHTML = rangeKey;
            var range = document.createElement('input');
            range.classList.add('control-panel-range');
            range.type = 'range';
            range.min = '0';
            range.max = '100';
            range.value = rangeGroup[rangeKey].initialValue();
            if (rangeGroup[rangeKey].onchange)
                range.onchange = function (e) { return rangeGroup[rangeKey].onchange(e); };
            if (rangeGroup[rangeKey].oninput)
                range.oninput = function (e) { e.stopPropagation(); rangeGroup[rangeKey].oninput(e); };
            td1.appendChild(label);
            td2.appendChild(range);
            tr.appendChild(td1);
            tr.appendChild(td2);
            span.appendChild(tr);
        });
        element.appendChild(span);
        element.appendChild(document.createElement('br'));
    });
    (_c = controls.inputs) === null || _c === void 0 ? void 0 : _c.forEach(function (inputGroup) {
        var span = document.createElement('table');
        span.classList.add('control-panel-group', 'control-panel-input-group');
        Object.keys(inputGroup).forEach(function (inputKey) {
            var tr = document.createElement('tr');
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var label = document.createElement('label');
            label.classList.add('control-panel-label', 'control-panel-input-label');
            label.innerHTML = inputKey;
            var input = document.createElement('input');
            input.classList.add('control-panel-input');
            input.type = 'text';
            input.value = inputGroup[inputKey].initialValue();
            if (inputGroup[inputKey].onchange)
                input.onchange = function (e) { return inputGroup[inputKey].onchange(e); };
            if (inputGroup[inputKey].oninput)
                input.oninput = function (e) { return inputGroup[inputKey].oninput(e); };
            td1.appendChild(label);
            td2.appendChild(input);
            tr.appendChild(td1);
            tr.appendChild(td2);
            span.appendChild(tr);
        });
        element.appendChild(span);
        element.appendChild(document.createElement('br'));
    });
    (_d = controls.checkboxes) === null || _d === void 0 ? void 0 : _d.forEach(function (checkboxGroup) {
        var span = document.createElement('table');
        span.classList.add('control-panel-group', 'control-panel-checkbox-group');
        Object.keys(checkboxGroup).forEach(function (checkboxKey) {
            var tr = document.createElement('tr');
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var label = document.createElement('label');
            label.classList.add('control-panel-label', 'control-panel-checkbox-label');
            label.innerHTML = checkboxKey;
            var checkbox = document.createElement('input');
            checkbox.classList.add('control-panel-checkbox');
            checkbox.type = 'checkbox';
            checkbox.checked = checkboxGroup[checkboxKey].initialValue();
            checkbox.oninput = function (e) { return checkboxGroup[checkboxKey].oninput(e); };
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
exports.setControls = setControls;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./ts/index.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var ui_1 = __webpack_require__(/*! ./engine/ui */ "./ts/engine/ui.ts");
var plane_1 = __webpack_require__(/*! ./engine/plane */ "./ts/engine/plane.ts");
var Vector2D = __webpack_require__(/*! ./engine/augmented-vector */ "./ts/engine/augmented-vector.ts");
var Edge2D = __webpack_require__(/*! ./engine/augmented-edge */ "./ts/engine/augmented-edge.ts");
var engine_1 = __webpack_require__(/*! ./engine/engine */ "./ts/engine/engine.ts");
var Ball = __webpack_require__(/*! ./engine/augmented-ball */ "./ts/engine/augmented-ball.ts");
function draw(state) {
    state.plane.clear(state.ctx);
    state.plane.drawGrid(state.ctx);
    //state.plane.drawAxes(state.ctx);
    state.engine.getElements().forEach(function (e) { e.draw(state.ctx, state.plane); });
    state.engine.getActors().forEach(function (e) { e.draw(state.ctx, state.plane); });
    state.additionalRenders.forEach(function (ar) { return ar.element.draw(state.ctx, state.plane); });
}
function go(state, t) {
    var _a;
    var time = Date.now();
    var dt = (time - t) / 1000.0;
    state.additionalRenders.forEach(function (r) { return r.ttl -= dt; });
    state.additionalRenders = state.additionalRenders.filter(function (r) { return r.ttl > 0; });
    (_a = state.additionalRenders).push.apply(_a, (state.engine.moveActors(dt).map(function (e) { return { element: e, ttl: 5 }; })));
    var wc = state.plane.screenToWorldCoordinates({ x: state.plane.mx, y: state.plane.my });
    state.engine.getActors().forEach(function (a) {
        a = a;
        a.attributes.isHovered = false;
        if (a.withinBounds({ x: wc.x, y: wc.y })) {
            a.attributes.isHovered = true;
            //setControls(state.ui.controlPanel, (<Ball>a).controls());
        }
    });
    state.engine.getElements().forEach(function (el) {
        el = el;
        el.attributes.isHovered = false;
        if (el.withinBounds({ x: wc.x, y: wc.y })) {
            el.attributes.isHovered = true;
            //setControls(state.ui.controlPanel, (<Edge2D>el).controls());
        }
    });
    draw(state);
    requestAnimationFrame(function () { return go(state, time); });
}
window.main = function () {
    var uiElements = (0, ui_1.getUIElements)();
    if (uiElements) {
        uiElements = uiElements;
        uiElements.canvas.width = uiElements.canvas.parentElement.clientWidth;
        uiElements.canvas.height = uiElements.canvas.parentElement.clientHeight;
        var box = [
            { x: 200, y: 200 },
            { x: -200, y: 200 },
            { x: -200, y: -200 },
            { x: 200, y: -200 },
        ];
        var plane_2 = new plane_1.Plane(uiElements.canvas);
        window.addEventListener('resize', function () { plane_2.defaultResizeListener(); });
        uiElements.overlay.addEventListener('mousemove', function (e) {
            plane_2.defaultMouseMoveListener(e);
        });
        uiElements.overlay.addEventListener('wheel', function (e) { plane_2.defaultMouseWheelListener(e); });
        uiElements.overlay.addEventListener('click', function (e) {
            var selection = false;
            var wc = state_1.plane.screenToWorldCoordinates({ x: state_1.plane.mx, y: state_1.plane.my });
            state_1.engine.getActors().forEach(function (a) {
                a = a;
                a.attributes.selected = false;
                if (a.withinBounds({ x: wc.x, y: wc.y })) {
                    a.attributes.selected = true;
                    (0, ui_1.setControls)(state_1.ui.controlPanel, a.controls());
                    selection = true;
                }
            });
            state_1.engine.getElements().forEach(function (el) {
                el = el;
                el.attributes.selected = false;
                if (el.withinBounds({ x: wc.x, y: wc.y })) {
                    el.attributes.selected = true;
                    (0, ui_1.setControls)(state_1.ui.controlPanel, el.controls());
                    selection = true;
                }
            });
            if (!selection) {
                (0, ui_1.setControls)(state_1.ui.controlPanel, {});
                plane_2.defaultMouseClickListener(e);
            }
        });
        var ctx = uiElements.canvas.getContext('2d');
        var state_1 = {
            ctx: ctx,
            plane: plane_2,
            engine: new engine_1.Engine((Array(10).fill(null).map(function (b) { return new Ball({ x: 200 * (Math.random() - 0.5), y: 200 * (Math.random() - 0.5) }, new Vector2D({ x: 200 * (Math.random() - 0.5), y: 200 * (Math.random() - 0.5) }, { color: 0xff00ffff }), new Vector2D({ x: 0, y: 0 }), 10 * (Math.random()) + 10, 20 * (Math.random()), {
                color: 0x000000ff | (Math.floor(Math.random() * 16777216) << 8),
                hideVelocityVector: true,
                hideAccelerationVector: true
            }); })), [
                new Edge2D(box[0], box[1], { color: 0x000000ff, thickness: 1 }),
                new Edge2D(box[1], box[2], { color: 0x000000ff, thickness: 1 }),
                new Edge2D(box[2], box[3], { color: 0x000000ff, thickness: 1 }),
                new Edge2D(box[3], box[0], { color: 0x000000ff, thickness: 1 })
            ].concat((Array(5).fill(null).map(function (e) { return new Edge2D({ x: 400 * (Math.random() - 0.5), y: 400 * (Math.random() - 0.5) }, { x: 400 * (Math.random() - 0.5), y: 400 * (Math.random() - 0.5) }, { color: 0x000000ff, thickness: 1 }); })))),
            additionalRenders: [],
            ui: uiElements
        };
        go(state_1, Date.now());
    }
};

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUEwQztBQUN4RztBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsa0JBQWtCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxrQkFBa0I7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxpRUFBaUU7QUFDakU7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRixrQkFBa0IsZ0VBQWdFLGlCQUFpQixnRUFBZ0UsSUFBSSxtQkFBbUIsa0JBQWtCLFlBQVk7QUFDelM7QUFDQTtBQUNBO0FBQ0EsYUFBYSxJQUFJO0FBQ2pCLDZDQUE2QyxpQ0FBaUM7QUFDOUUsNkNBQTZDLGlDQUFpQztBQUM5RSw2Q0FBNkMsaUNBQWlDO0FBQzlFLDZDQUE2QyxpQ0FBaUM7QUFDOUUsNkRBQTZELG9CQUFvQixnRUFBZ0UsSUFBSSxnRUFBZ0UsSUFBSSxpQ0FBaUMsSUFBSTtBQUM5UDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teUxpYnJhcnkvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL215TGlicmFyeS8uL3RzL2VuZ2luZS9hdWdtZW50ZWQtYmFsbC50cyIsIndlYnBhY2s6Ly9teUxpYnJhcnkvLi90cy9lbmdpbmUvYXVnbWVudGVkLWVkZ2UudHMiLCJ3ZWJwYWNrOi8vbXlMaWJyYXJ5Ly4vdHMvZW5naW5lL2F1Z21lbnRlZC12ZWN0b3IudHMiLCJ3ZWJwYWNrOi8vbXlMaWJyYXJ5Ly4vdHMvZW5naW5lL2VsZW1lbnRzL2JhbGwudHMiLCJ3ZWJwYWNrOi8vbXlMaWJyYXJ5Ly4vdHMvZW5naW5lL2VsZW1lbnRzL2VkZ2UudHMiLCJ3ZWJwYWNrOi8vbXlMaWJyYXJ5Ly4vdHMvZW5naW5lL2VsZW1lbnRzL3ZlY3Rvci50cyIsIndlYnBhY2s6Ly9teUxpYnJhcnkvLi90cy9lbmdpbmUvZW5naW5lLnRzIiwid2VicGFjazovL215TGlicmFyeS8uL3RzL2VuZ2luZS9wbGFuZS50cyIsIndlYnBhY2s6Ly9teUxpYnJhcnkvLi90cy9lbmdpbmUvdWkudHMiLCJ3ZWJwYWNrOi8vbXlMaWJyYXJ5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL215TGlicmFyeS8uL3RzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm15TGlicmFyeVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJteUxpYnJhcnlcIl0gPSBmYWN0b3J5KCk7XG59KShzZWxmLCAoKSA9PiB7XG5yZXR1cm4gIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgYmFsbF8xID0gcmVxdWlyZShcIi4vZWxlbWVudHMvYmFsbFwiKTtcbnZhciBFZGdlMkQgPSByZXF1aXJlKFwiLi9hdWdtZW50ZWQtZWRnZVwiKTtcbmJhbGxfMS5CYWxsLnByb3RvdHlwZS5jb250cm9scyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiB7XG4gICAgICAgIHJhbmdlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZ0OiB7XG4gICAgICAgICAgICAgICAgICAgIG9uaW5wdXQ6IGZ1bmN0aW9uIChlKSB7IF90aGlzLnZlbG9jaXR5LmFuZ2xlKDAuMDEgKiAyICogTWF0aC5QSSAqIHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpKTsgfSxcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBmdW5jdGlvbiAoKSB7IHJldHVybiAoNTAgKiBfdGhpcy52ZWxvY2l0eS50KCkgLyBNYXRoLlBJKS50b1N0cmluZygpOyB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2bToge1xuICAgICAgICAgICAgICAgICAgICBvbmlucHV0OiBmdW5jdGlvbiAoZSkgeyBfdGhpcy52ZWxvY2l0eS5zaXplKHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpICsgMSk7IH0sXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMudmVsb2NpdHkubSgpLnRvU3RyaW5nKCk7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJhZGl1czoge1xuICAgICAgICAgICAgICAgICAgICBvbmlucHV0OiBmdW5jdGlvbiAoZSkgeyBfdGhpcy5yYWRpdXMgPSAocGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkgKyAxKTsgfSxcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5yYWRpdXMudG9TdHJpbmcoKTsgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbWFzczoge1xuICAgICAgICAgICAgICAgICAgICBvbmlucHV0OiBmdW5jdGlvbiAoZSkgeyBfdGhpcy5tYXNzID0gKHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpICsgMSk7IH0sXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMubWFzcy50b1N0cmluZygpOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbn07XG5iYWxsXzEuQmFsbC5wcm90b3R5cGUud2l0aGluQm91bmRzID0gZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgdmFyIHggPSBwb2ludC54IC0gdGhpcy5nZXRMb2NhdGlvbigpLng7XG4gICAgdmFyIHkgPSBwb2ludC55IC0gdGhpcy5nZXRMb2NhdGlvbigpLnk7XG4gICAgdmFyIHIgPSB0aGlzLmdldFJhZGl1cygpICsgKHRoaXMuYXR0cmlidXRlcy50aGlja25lc3MgfHwgMCk7XG4gICAgcmV0dXJuICh4ICogeCArIHkgKiB5KSA8PSByICogcjtcbn07XG5iYWxsXzEuQmFsbC5wcm90b3R5cGUuY2xpY2sgPSBmdW5jdGlvbiAoZSwga2V5cykgeyB9O1xuYmFsbF8xLkJhbGwucHJvdG90eXBlLmdlc3R1cmVFbnRlciA9IGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coJ2VudGVyZWQnKTsgfTtcbmJhbGxfMS5CYWxsLnByb3RvdHlwZS5nZXN0dXJlTGVhdmUgPSBmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKCdsZWZ0Jyk7IH07XG5iYWxsXzEuQmFsbC5wcm90b3R5cGUuZHJhZyA9IGZ1bmN0aW9uIChlLCBrZXlzLCBwMSwgcDIpIHsgfTtcbmJhbGxfMS5CYWxsLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24gKGN0eCwgcGxhbmUpIHtcbiAgICB2YXIgd2MgPSBwbGFuZS53b3JsZFRvU2NyZWVuQ29vcmRpbmF0ZXModGhpcy5nZXRMb2NhdGlvbigpKTtcbiAgICBpZiAodGhpcy5hdHRyaWJ1dGVzLmlzSG92ZXJlZCB8fCB0aGlzLmF0dHJpYnV0ZXMuc2VsZWN0ZWQpIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwMDAwZmYnO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMod2MueCwgd2MueSwgdGhpcy5nZXRSYWRpdXMoKSAqIHBsYW5lLmdldFpvb20oKSArIDUsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZmYwMGZmJztcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHdjLngsIHdjLnksIHRoaXMuZ2V0UmFkaXVzKCkgKiBwbGFuZS5nZXRab29tKCkgKyA0LCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAwMDBmZic7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyh3Yy54LCB3Yy55LCB0aGlzLmdldFJhZGl1cygpICogcGxhbmUuZ2V0Wm9vbSgpICsgMSwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICB9XG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjJyArICh0aGlzLmF0dHJpYnV0ZXMuY29sb3IgPj4+IDApLnRvU3RyaW5nKDE2KS5wYWRTdGFydCg4LCAnMCcpOyAvLyA+Pj4gdW5zaWduZWQgcmlnaHQgc2hpZnRcbiAgICAvL2NvbnNvbGUubG9nKCcjJyArICgoPG51bWJlcj50aGlzLmF0dHJpYnV0ZXMuY29sb3IpID4+PiAwKS50b1N0cmluZygxNikucGFkU3RhcnQoOCwgJzAnKSk7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMod2MueCwgd2MueSwgdGhpcy5nZXRSYWRpdXMoKSAqIHBsYW5lLmdldFpvb20oKSwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICBjdHguZmlsbCgpO1xuICAgIGlmICghdGhpcy5hdHRyaWJ1dGVzLmhpZGVWZWxvY2l0eVZlY3RvciB8fCB0aGlzLmF0dHJpYnV0ZXMuc2VsZWN0ZWQpIHtcbiAgICAgICAgKG5ldyBFZGdlMkQodGhpcy5nZXRMb2NhdGlvbigpLCB7IHg6IHRoaXMuZ2V0TG9jYXRpb24oKS54ICsgdGhpcy52ZWxvY2l0eS54KCksIHk6IHRoaXMuZ2V0TG9jYXRpb24oKS55ICsgdGhpcy52ZWxvY2l0eS55KCkgfSwgeyBjb2xvcjogMHhmZjAwZmZmZiwgdGhpY2tuZXNzOiAxLCBkaXJlY3RlZDogdHJ1ZSB9KSkuZHJhdyhjdHgsIHBsYW5lKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmF0dHJpYnV0ZXMuaGlkZUFjY2VsZXJhdGlvblZlY3Rvcikge1xuICAgICAgICAobmV3IEVkZ2UyRCh0aGlzLmdldExvY2F0aW9uKCksIHsgeDogdGhpcy5nZXRMb2NhdGlvbigpLnggKyB0aGlzLmFjY2VsZXJhdGlvbi54KCksIHk6IHRoaXMuZ2V0TG9jYXRpb24oKS55ICsgdGhpcy5hY2NlbGVyYXRpb24ueSgpIH0sIHsgY29sb3I6IDB4ZmZmZjAwZmYsIHRoaWNrbmVzczogMSwgZGlyZWN0ZWQ6IHRydWUgfSkpLmRyYXcoY3R4LCBwbGFuZSk7XG4gICAgfVxufTtcbm1vZHVsZS5leHBvcnRzID0gYmFsbF8xLkJhbGw7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBlZGdlXzEgPSByZXF1aXJlKFwiLi9lbGVtZW50cy9lZGdlXCIpO1xuZWRnZV8xLkVkZ2UyRC5wcm90b3R5cGUuY29udHJvbHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4ge1xuICAgICAgICBpbnB1dHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4MDogeyBvbmNoYW5nZTogZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF90aGlzLnAxLnggPSB0eXBlb2YgcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkgPT09IHVuZGVmaW5lZCA/IF90aGlzLnAxLnggOiBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKTsgfSwgaW5pdGlhbFZhbHVlOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5wMS54LnRvU3RyaW5nKCk7IH0gfSxcbiAgICAgICAgICAgICAgICB5MDogeyBvbmNoYW5nZTogZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF90aGlzLnAxLnkgPSB0eXBlb2YgcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkgPT09IHVuZGVmaW5lZCA/IF90aGlzLnAxLnkgOiBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKTsgfSwgaW5pdGlhbFZhbHVlOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5wMS55LnRvU3RyaW5nKCk7IH0gfSxcbiAgICAgICAgICAgICAgICB4MTogeyBvbmNoYW5nZTogZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF90aGlzLnAyLnggPSB0eXBlb2YgcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkgPT09IHVuZGVmaW5lZCA/IF90aGlzLnAyLnggOiBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKTsgfSwgaW5pdGlhbFZhbHVlOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5wMi54LnRvU3RyaW5nKCk7IH0gfSxcbiAgICAgICAgICAgICAgICB5MTogeyBvbmNoYW5nZTogZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF90aGlzLnAyLnkgPSB0eXBlb2YgcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkgPT09IHVuZGVmaW5lZCA/IF90aGlzLnAyLnkgOiBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKTsgfSwgaW5pdGlhbFZhbHVlOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5wMi55LnRvU3RyaW5nKCk7IH0gfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtOiB7IG9uY2hhbmdlOiBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuc2l6ZSh0eXBlb2YgcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkgPT09IHVuZGVmaW5lZCA/IF90aGlzLm0oKSA6IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpKTsgfSwgaW5pdGlhbFZhbHVlOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5tKCkudG9TdHJpbmcoKTsgfSB9LFxuICAgICAgICAgICAgICAgIHQ6IHsgb25jaGFuZ2U6IGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy5hbmdsZSh0eXBlb2YgcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkgPT09IHVuZGVmaW5lZCA/IF90aGlzLm0oKSA6IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpKTsgfSwgaW5pdGlhbFZhbHVlOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy50KCkudG9TdHJpbmcoKTsgfSB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcbmVkZ2VfMS5FZGdlMkQucHJvdG90eXBlLndpdGhpbkJvdW5kcyA9IGZ1bmN0aW9uIChwb2ludCkge1xuICAgIHZhciB2ID0gbmV3IGVkZ2VfMS5FZGdlMkQodGhpcy5wMSwgcG9pbnQpO1xuICAgIHZhciBwcm9qID0gdi5wcm9qZWN0ZWRTY2FsYXIodGhpcyk7XG4gICAgdmFyIHJlaiA9IE1hdGguYWJzKHYucmVqZWN0ZWRTY2FsYXIodGhpcykpO1xuICAgIGlmIChwcm9qID4gMCAmJiBwcm9qIDwgdGhpcy5tKCkpIHtcbiAgICAgICAgaWYgKHJlaiA8IDAuNSAqIHRoaXMuYXR0cmlidXRlcy50aGlja25lc3MpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5lZGdlXzEuRWRnZTJELnByb3RvdHlwZS5jbGljayA9IGZ1bmN0aW9uIChlLCBrZXlzKSB7IH07XG5lZGdlXzEuRWRnZTJELnByb3RvdHlwZS5nZXN0dXJlRW50ZXIgPSBmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKCdlbnRlcmVkJyk7IH07XG5lZGdlXzEuRWRnZTJELnByb3RvdHlwZS5nZXN0dXJlTGVhdmUgPSBmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKCdsZWZ0Jyk7IH07XG5lZGdlXzEuRWRnZTJELnByb3RvdHlwZS5kcmFnID0gZnVuY3Rpb24gKGUsIGtleXMsIHAxLCBwMikgeyB9O1xuZWRnZV8xLkVkZ2UyRC5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uIChjdHgsIHBsYW5lKSB7XG4gICAgdmFyIGUxID0gdGhpcy5yb3RhdGVkKDMgKiBNYXRoLlBJIC8gNCkuc2NhbGUoMC4yKS5hZGQodGhpcyk7XG4gICAgdmFyIGUyID0gdGhpcy5yb3RhdGVkKC0zICogTWF0aC5QSSAvIDQpLnNjYWxlKDAuMikuYWRkKHRoaXMpO1xuICAgIHZhciBwMCA9IHBsYW5lLndvcmxkVG9TY3JlZW5Db29yZGluYXRlcyh7IHg6IHRoaXMucDEueCwgeTogdGhpcy5wMS55IH0pO1xuICAgIHZhciBwMSA9IHBsYW5lLndvcmxkVG9TY3JlZW5Db29yZGluYXRlcyh7IHg6IHRoaXMucDIueCwgeTogdGhpcy5wMi55IH0pO1xuICAgIHZhciBwMiA9IHBsYW5lLndvcmxkVG9TY3JlZW5Db29yZGluYXRlcyh7IHg6IGUxLmdldFAyKCkueCwgeTogZTEuZ2V0UDIoKS55IH0pO1xuICAgIHZhciBwMyA9IHBsYW5lLndvcmxkVG9TY3JlZW5Db29yZGluYXRlcyh7IHg6IGUyLmdldFAyKCkueCwgeTogZTIuZ2V0UDIoKS55IH0pO1xuICAgIHZhciBsdyA9IGN0eC5saW5lV2lkdGg7XG4gICAgdmFyIGxjID0gY3R4LmxpbmVDYXA7XG4gICAgY3R4LmxpbmVDYXAgPSAncm91bmQnO1xuICAgIC8vY3R4LnN0cm9rZVN0eWxlID0gJyMnICsgKCg8bnVtYmVyPnRoaXMuYXR0cmlidXRlcy5jb2xvcikgPj4+IDApLnRvU3RyaW5nKDE2KS5wYWRTdGFydCg4LCAnMCcpOyAvLyA+Pj4gdW5zaWduZWQgcmlnaHQgc2hpZnRcbiAgICAvL2N0eC5saW5lV2lkdGggPSAoPG51bWJlcj50aGlzLmF0dHJpYnV0ZXMudGhpY2tuZXNzKSAqIHBsYW5lLmdldFpvb20oKTtcbiAgICAvL3BsYW5lLmRyYXdEaXJlY3RlZEVkZ2UoY3R4LCBuZXcgRWRnZSh7eDogdGhpcy5wMS54LCB5OiB0aGlzLnAxLnl9LCB7eDogdGhpcy5wMi54LCB5OiB0aGlzLnAyLnl9LCB0aGlzLmF0dHJpYnV0ZXMuY29sb3IudG9TdHJpbmcoKSkpO1xuICAgIGlmICh0aGlzLmF0dHJpYnV0ZXMuaXNIb3ZlcmVkIHx8IHRoaXMuYXR0cmlidXRlcy5zZWxlY3RlZCkge1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSAnIzAwMDAwMGZmJztcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHRoaXMuYXR0cmlidXRlcy50aGlja25lc3MgKiBwbGFuZS5nZXRab29tKCkgKyA1O1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8ocDAueCwgcDAueSk7XG4gICAgICAgIGN0eC5saW5lVG8ocDEueCwgcDEueSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgaWYgKHRoaXMuYXR0cmlidXRlcy5kaXJlY3RlZCkge1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4Lm1vdmVUbyhwMS54LCBwMS55KTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8ocDIueCwgcDIueSk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHgubW92ZVRvKHAxLngsIHAxLnkpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhwMy54LCBwMy55KTtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSAnI2ZmZmYwMGZmJztcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHRoaXMuYXR0cmlidXRlcy50aGlja25lc3MgKiBwbGFuZS5nZXRab29tKCkgKyA0O1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8ocDAueCwgcDAueSk7XG4gICAgICAgIGN0eC5saW5lVG8ocDEueCwgcDEueSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgaWYgKHRoaXMuYXR0cmlidXRlcy5kaXJlY3RlZCkge1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4Lm1vdmVUbyhwMS54LCBwMS55KTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8ocDIueCwgcDIueSk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHgubW92ZVRvKHAxLngsIHAxLnkpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhwMy54LCBwMy55KTtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSAnIzAwMDAwMGZmJztcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHRoaXMuYXR0cmlidXRlcy50aGlja25lc3MgKiBwbGFuZS5nZXRab29tKCkgKyAxO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8ocDAueCwgcDAueSk7XG4gICAgICAgIGN0eC5saW5lVG8ocDEueCwgcDEueSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgaWYgKHRoaXMuYXR0cmlidXRlcy5kaXJlY3RlZCkge1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4Lm1vdmVUbyhwMS54LCBwMS55KTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8ocDIueCwgcDIueSk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHgubW92ZVRvKHAxLngsIHAxLnkpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhwMy54LCBwMy55KTtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnIycgKyAodGhpcy5hdHRyaWJ1dGVzLmNvbG9yID4+PiAwKS50b1N0cmluZygxNikucGFkU3RhcnQoOCwgJzAnKTsgLy8gPj4+IHVuc2lnbmVkIHJpZ2h0IHNoaWZ0XG4gICAgY3R4LmxpbmVXaWR0aCA9IHRoaXMuYXR0cmlidXRlcy50aGlja25lc3MgKiBwbGFuZS5nZXRab29tKCk7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8ocDAueCwgcDAueSk7XG4gICAgY3R4LmxpbmVUbyhwMS54LCBwMS55KTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgaWYgKHRoaXMuYXR0cmlidXRlcy5kaXJlY3RlZCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8ocDEueCwgcDEueSk7XG4gICAgICAgIGN0eC5saW5lVG8ocDIueCwgcDIueSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKHAxLngsIHAxLnkpO1xuICAgICAgICBjdHgubGluZVRvKHAzLngsIHAzLnkpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxuICAgIGN0eC5saW5lV2lkdGggPSBsdztcbiAgICBjdHgubGluZUNhcCA9IGxjO1xufTtcbm1vZHVsZS5leHBvcnRzID0gZWRnZV8xLkVkZ2UyRDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIHZlY3Rvcl8xID0gcmVxdWlyZShcIi4vZWxlbWVudHMvdmVjdG9yXCIpO1xudmVjdG9yXzEuVmVjdG9yMkQucHJvdG90eXBlLmNvbnRyb2xzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5wdXRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeDogeyBvbmlucHV0OiBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuY29tcG9uZW50cy54ID0gcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkgfHwgX3RoaXMuY29tcG9uZW50cy54OyB9LCBpbml0aWFsVmFsdWU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLmNvbXBvbmVudHMueC50b1N0cmluZygpOyB9IH0sXG4gICAgICAgICAgICAgICAgeTogeyBvbmlucHV0OiBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuY29tcG9uZW50cy55ID0gcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkgfHwgX3RoaXMuY29tcG9uZW50cy55OyB9LCBpbml0aWFsVmFsdWU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLmNvbXBvbmVudHMueS50b1N0cmluZygpOyB9IH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbWFnbml0dWRlOiB7IG9uaW5wdXQ6IGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy5zaXplKHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpIHx8IF90aGlzLm0oKSk7IH0sIGluaXRpYWxWYWx1ZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMubSgpLnRvU3RyaW5nKCk7IH0gfSxcbiAgICAgICAgICAgICAgICB0aGlja25lc3M6IHsgb25pbnB1dDogZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF90aGlzLmF0dHJpYnV0ZXMudGhpY2tuZXNzID0gcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSk7IH0sIGluaXRpYWxWYWx1ZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuYXR0cmlidXRlcy50aGlja25lc3MudG9TdHJpbmcoKTsgfSB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIHJhbmdlczogW1xuICAgICAgICAgICAgeyB0aGV0YTogeyBvbmlucHV0OiBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuYW5nbGUoMiAqIE1hdGguUEkgKiAocGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkgLyAxMDApKTsgfSwgaW5pdGlhbFZhbHVlOiBmdW5jdGlvbiAoKSB7IHJldHVybiAoMTAwICogKF90aGlzLnQoKSAvICgyICogTWF0aC5QSSkpKS50b1N0cmluZygpOyB9IH0gfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByOiB7XG4gICAgICAgICAgICAgICAgICAgIG9uaW5wdXQ6IGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy5hdHRyaWJ1dGVzLmNvbG9yID0gKF90aGlzLmF0dHJpYnV0ZXMuY29sb3IgJiAweDAwZmZmZmZmKSB8IChNYXRoLmZsb29yKDI1NSAqIChwYXJzZUludChlLnRhcmdldC52YWx1ZSkgLyAxMDApKSA8PCAyNCk7IH0sXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gTWF0aC5mbG9vcigxMDAgKiAoKChfdGhpcy5hdHRyaWJ1dGVzLmNvbG9yICYgMHhmZjAwMDAwMCkgPj4+IDI0KSAvICgyNTUpKSkudG9TdHJpbmcoKTsgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZzoge1xuICAgICAgICAgICAgICAgICAgICBvbmlucHV0OiBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuYXR0cmlidXRlcy5jb2xvciA9IChfdGhpcy5hdHRyaWJ1dGVzLmNvbG9yICYgMHhmZjAwZmZmZikgfCAoTWF0aC5mbG9vcigyNTUgKiAocGFyc2VJbnQoZS50YXJnZXQudmFsdWUpIC8gMTAwKSkgPDwgMTYpOyB9LFxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIE1hdGguZmxvb3IoMTAwICogKCgoX3RoaXMuYXR0cmlidXRlcy5jb2xvciAmIDB4ZmYwMDAwKSA+PiAxNikgLyAoMjU1KSkpLnRvU3RyaW5nKCk7IH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGI6IHtcbiAgICAgICAgICAgICAgICAgICAgb25pbnB1dDogZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF90aGlzLmF0dHJpYnV0ZXMuY29sb3IgPSAoX3RoaXMuYXR0cmlidXRlcy5jb2xvciAmIDB4ZmZmZjAwZmYpIHwgKE1hdGguZmxvb3IoMjU1ICogKHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSAvIDEwMCkpIDw8IDgpOyB9LFxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIE1hdGguZmxvb3IoMTAwICogKCgoX3RoaXMuYXR0cmlidXRlcy5jb2xvciAmIDB4ZmYwMCkgPj4gOCkgLyAoMjU1KSkpLnRvU3RyaW5nKCk7IH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGE6IHtcbiAgICAgICAgICAgICAgICAgICAgb25pbnB1dDogZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF90aGlzLmF0dHJpYnV0ZXMuY29sb3IgPSAoX3RoaXMuYXR0cmlidXRlcy5jb2xvciAmIDB4ZmZmZmZmMDApIHwgKE1hdGguZmxvb3IoMjU1ICogKHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSAvIDEwMCkpIDw8IDApOyB9LFxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIE1hdGguZmxvb3IoMTAwICogKChfdGhpcy5hdHRyaWJ1dGVzLmNvbG9yICYgMHhmZikgLyAoMjU1KSkpLnRvU3RyaW5nKCk7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcbnZlY3Rvcl8xLlZlY3RvcjJELnByb3RvdHlwZS53aXRoaW5Cb3VuZHMgPSBmdW5jdGlvbiAocG9pbnQpIHtcbiAgICB2YXIgcCA9IG5ldyB2ZWN0b3JfMS5WZWN0b3IyRChwb2ludCk7XG4gICAgdmFyIHByb2ogPSBwLnByb2plY3RlZFNjYWxhcih0aGlzKTtcbiAgICB2YXIgcmVqID0gTWF0aC5hYnMocC5yZWplY3RlZFNjYWxhcih0aGlzKSk7XG4gICAgaWYgKHByb2ogPiAwICYmIHByb2ogPCB0aGlzLm0oKSkge1xuICAgICAgICBpZiAocmVqIDwgMC41ICogdGhpcy5hdHRyaWJ1dGVzLnRoaWNrbmVzcykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbnZlY3Rvcl8xLlZlY3RvcjJELnByb3RvdHlwZS5jbGljayA9IGZ1bmN0aW9uIChlLCBrZXlzKSB7IH07XG52ZWN0b3JfMS5WZWN0b3IyRC5wcm90b3R5cGUuZ2VzdHVyZUVudGVyID0gZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZygnZW50ZXJlZCcpOyB9O1xudmVjdG9yXzEuVmVjdG9yMkQucHJvdG90eXBlLmdlc3R1cmVMZWF2ZSA9IGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coJ2xlZnQnKTsgfTtcbnZlY3Rvcl8xLlZlY3RvcjJELnByb3RvdHlwZS5kcmFnID0gZnVuY3Rpb24gKGUsIGtleXMsIHAxLCBwMikgeyB9O1xudmVjdG9yXzEuVmVjdG9yMkQucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAoY3R4LCBwbGFuZSkge1xuICAgIHZhciBsdyA9IGN0eC5saW5lV2lkdGg7XG4gICAgdmFyIGxjID0gY3R4LmxpbmVDYXA7XG4gICAgY3R4LmxpbmVDYXAgPSAncm91bmQnO1xuICAgIHZhciB2MSA9IHRoaXMucm90YXRlZCgzICogTWF0aC5QSSAvIDQpLnNjYWxlKDAuMikuYWRkKHRoaXMpO1xuICAgIHZhciB2MiA9IHRoaXMucm90YXRlZCgtMyAqIE1hdGguUEkgLyA0KS5zY2FsZSgwLjIpLmFkZCh0aGlzKTtcbiAgICB2YXIgcDAgPSBwbGFuZS53b3JsZFRvU2NyZWVuQ29vcmRpbmF0ZXMoeyB4OiAwLCB5OiAwIH0pO1xuICAgIHZhciBwMSA9IHBsYW5lLndvcmxkVG9TY3JlZW5Db29yZGluYXRlcyh7IHg6IHRoaXMueCgpLCB5OiB0aGlzLnkoKSB9KTtcbiAgICB2YXIgcDIgPSBwbGFuZS53b3JsZFRvU2NyZWVuQ29vcmRpbmF0ZXMoeyB4OiB2MS54KCksIHk6IHYxLnkoKSB9KTtcbiAgICB2YXIgcDMgPSBwbGFuZS53b3JsZFRvU2NyZWVuQ29vcmRpbmF0ZXMoeyB4OiB2Mi54KCksIHk6IHYyLnkoKSB9KTtcbiAgICBpZiAodGhpcy5hdHRyaWJ1dGVzLmlzSG92ZXJlZCB8fCB0aGlzLmF0dHJpYnV0ZXMuc2VsZWN0ZWQpIHtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJyMwMDAwMDBmZic7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSB0aGlzLmF0dHJpYnV0ZXMudGhpY2tuZXNzICogcGxhbmUuZ2V0Wm9vbSgpICsgNTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKHAwLngsIHAwLnkpO1xuICAgICAgICBjdHgubGluZVRvKHAxLngsIHAxLnkpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyhwMS54LCBwMS55KTtcbiAgICAgICAgY3R4LmxpbmVUbyhwMi54LCBwMi55KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8ocDEueCwgcDEueSk7XG4gICAgICAgIGN0eC5saW5lVG8ocDMueCwgcDMueSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJyNmZmZmMDBmZic7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSB0aGlzLmF0dHJpYnV0ZXMudGhpY2tuZXNzICogcGxhbmUuZ2V0Wm9vbSgpICsgNDtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKHAwLngsIHAwLnkpO1xuICAgICAgICBjdHgubGluZVRvKHAxLngsIHAxLnkpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyhwMS54LCBwMS55KTtcbiAgICAgICAgY3R4LmxpbmVUbyhwMi54LCBwMi55KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8ocDEueCwgcDEueSk7XG4gICAgICAgIGN0eC5saW5lVG8ocDMueCwgcDMueSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJyMwMDAwMDBmZic7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSB0aGlzLmF0dHJpYnV0ZXMudGhpY2tuZXNzICogcGxhbmUuZ2V0Wm9vbSgpICsgMTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKHAwLngsIHAwLnkpO1xuICAgICAgICBjdHgubGluZVRvKHAxLngsIHAxLnkpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyhwMS54LCBwMS55KTtcbiAgICAgICAgY3R4LmxpbmVUbyhwMi54LCBwMi55KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8ocDEueCwgcDEueSk7XG4gICAgICAgIGN0eC5saW5lVG8ocDMueCwgcDMueSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJyMnICsgKHRoaXMuYXR0cmlidXRlcy5jb2xvciA+Pj4gMCkudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDgsICcwJyk7IC8vID4+PiB1bnNpZ25lZCByaWdodCBzaGlmdFxuICAgIGN0eC5saW5lV2lkdGggPSB0aGlzLmF0dHJpYnV0ZXMudGhpY2tuZXNzICogcGxhbmUuZ2V0Wm9vbSgpO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKHAwLngsIHAwLnkpO1xuICAgIGN0eC5saW5lVG8ocDEueCwgcDEueSk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKHAxLngsIHAxLnkpO1xuICAgIGN0eC5saW5lVG8ocDIueCwgcDIueSk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKHAxLngsIHAxLnkpO1xuICAgIGN0eC5saW5lVG8ocDMueCwgcDMueSk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5saW5lV2lkdGggPSBsdztcbiAgICBjdHgubGluZUNhcCA9IGxjO1xufTtcbm1vZHVsZS5leHBvcnRzID0gdmVjdG9yXzEuVmVjdG9yMkQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJhbGwgPSB2b2lkIDA7XG52YXIgdmVjdG9yXzEgPSByZXF1aXJlKFwiLi92ZWN0b3JcIik7XG52YXIgZWRnZV8xID0gcmVxdWlyZShcIi4vZWRnZVwiKTtcbnZhciBCYWxsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJhbGwobG9jYXRpb24sIHZlbG9jaXR5LCBhY2NlbGVyYXRpb24sIHJhZGl1cywgbWFzcywgYXR0cmlidXRlcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiAoZikgeyBfdGhpcy5hY2NlbGVyYXRpb24uYWRkKGYuc2NhbGVkKDEgLyBfdGhpcy5tYXNzKSk7IH07XG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5O1xuICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IGFjY2VsZXJhdGlvbjtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgIHRoaXMubWFzcyA9IG1hc3M7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlcyA9IF9fYXNzaWduKHt9LCBhdHRyaWJ1dGVzKTtcbiAgICB9XG4gICAgQmFsbC5wcm90b3R5cGUuZ2V0TG9jYXRpb24gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB7IHg6IHRoaXMubG9jYXRpb24ueCwgeTogdGhpcy5sb2NhdGlvbi55IH07IH07XG4gICAgO1xuICAgIEJhbGwucHJvdG90eXBlLnJlbG9jYXRlID0gZnVuY3Rpb24gKHgsIHkpIHsgdGhpcy5sb2NhdGlvbi54ID0geDsgdGhpcy5sb2NhdGlvbi55ID0geTsgcmV0dXJuIHRoaXM7IH07XG4gICAgQmFsbC5wcm90b3R5cGUuZ2V0UmFkaXVzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5yYWRpdXM7IH07XG4gICAgQmFsbC5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICB0aGlzLmxvY2F0aW9uLnggKz0gZHQgKiB0aGlzLnZlbG9jaXR5LngoKTtcbiAgICAgICAgdGhpcy5sb2NhdGlvbi55ICs9IGR0ICogdGhpcy52ZWxvY2l0eS55KCk7XG4gICAgICAgIHRoaXMudmVsb2NpdHkuYWRkKHRoaXMuYWNjZWxlcmF0aW9uLnNjYWxlZChkdCkpO1xuICAgIH07XG4gICAgQmFsbC5wcm90b3R5cGUudGltZVRvQ29sbGlkZVdpdGhFZGdlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgLy8gZmlyc3QgZGV0ZXJtaW5lIHdoZW4gYmFsbCB3aWxsIHN0cmlrZSBsaW5lXG4gICAgICAgIHZhciB2ZSA9IG5ldyBlZGdlXzEuRWRnZTJEKHsgeDogdGhpcy5sb2NhdGlvbi54LCB5OiB0aGlzLmxvY2F0aW9uLnkgfSwgeyB4OiB0aGlzLmxvY2F0aW9uLnggKyB0aGlzLnZlbG9jaXR5LngoKSwgeTogdGhpcy5sb2NhdGlvbi55ICsgdGhpcy52ZWxvY2l0eS55KCkgfSk7XG4gICAgICAgIHZhciBjID0gbmV3IGVkZ2VfMS5FZGdlMkQoZS5wMSwgdGhpcy5sb2NhdGlvbik7XG4gICAgICAgIHZhciBjRGV0RSA9IGMuZGV0KGUpO1xuICAgICAgICB2YXIgZURldFYgPSBlLmRldCh2ZSk7XG4gICAgICAgIHZhciBjUmVNID0gdGhpcy5yYWRpdXMgKiBlLm0oKTtcbiAgICAgICAgdmFyIHQxID0gOTk5OTk5O1xuICAgICAgICB2YXIgdDIgPSA5OTk5OTk7XG4gICAgICAgIGlmIChlRGV0ViAhPSAwKSB7XG4gICAgICAgICAgICB0MSA9IChjRGV0RSArIGNSZU0pIC8gZURldFY7XG4gICAgICAgICAgICB0MiA9IChjRGV0RSAtIGNSZU0pIC8gZURldFY7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZGV0ZXJtaW5lIGlmIGJhbGwgd2lsbCBzdHJpa2Ugb3V0c2lkZSBvZiBsaW5lIHNlZ21lbnRcbiAgICAgICAgLy9cbiAgICAgICAgLy8gcHJvaih0KSA9ICh0aGlzLngodCktZTEueCkoZTIueC1lMS54KSsodGhpcy55KHQpLWUxLnkpKGUyLnktZTEueSkvZS5tKClcbiAgICAgICAgLy8gd2hlcmU6XG4gICAgICAgIC8vICB0aGlzLngodCkgPSB0aGlzLmxvY2F0aW9uLnggKyB0KnRoaXMudmVsb2NpdHkueFxuICAgICAgICAvLyAgdGhpcy55KHQpID0gdGhpcy5sb2NhdGlvbi55ICsgdCp0aGlzLnZlbG9jaXR5LnlcbiAgICAgICAgdmFyIG0gPSBlLm0oKTtcbiAgICAgICAgdmFyIG1JbnYgPSAxIC8gbTtcbiAgICAgICAgaWYgKHQxIDwgMCB8fCB0MSA+IDk5OTk5OSkge1xuICAgICAgICAgICAgdDEgPSA5OTk5OTk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgeF90MSA9IHRoaXMubG9jYXRpb24ueCArIHQxICogdGhpcy52ZWxvY2l0eS54KCk7XG4gICAgICAgICAgICB2YXIgeV90MSA9IHRoaXMubG9jYXRpb24ueSArIHQxICogdGhpcy52ZWxvY2l0eS55KCk7XG4gICAgICAgICAgICB2YXIgcHJval90MSA9ICgoeF90MSAtIGUuZ2V0UDEoKS54KSAqIGUueCgpICsgKHlfdDEgLSBlLmdldFAxKCkueSkgKiBlLnkoKSkgKiBtSW52O1xuICAgICAgICAgICAgaWYgKHByb2pfdDEgPCAwIHx8IHByb2pfdDEgPiBtKVxuICAgICAgICAgICAgICAgIHQxID0gOTk5OTk5OTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodDIgPCAwIHx8IHQyID4gOTk5OTk5KSB7XG4gICAgICAgICAgICB0MiA9IDk5OTk5OTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciB4X3QyID0gdGhpcy5sb2NhdGlvbi54ICsgdDIgKiB0aGlzLnZlbG9jaXR5LngoKTtcbiAgICAgICAgICAgIHZhciB5X3QyID0gdGhpcy5sb2NhdGlvbi55ICsgdDIgKiB0aGlzLnZlbG9jaXR5LnkoKTtcbiAgICAgICAgICAgIHZhciBwcm9qX3QyID0gKCh4X3QyIC0gZS5nZXRQMSgpLngpICogZS54KCkgKyAoeV90MiAtIGUuZ2V0UDEoKS55KSAqIGUueSgpKSAqIG1JbnY7XG4gICAgICAgICAgICBpZiAocHJval90MiA8IDAgfHwgcHJval90MiA+IG0pXG4gICAgICAgICAgICAgICAgdDIgPSA5OTk5OTk5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbdDEsIHQyXTtcbiAgICB9O1xuICAgIEJhbGwucHJvdG90eXBlLnRpbWVUb0NvbGxpZGVXaXRoQmFsbCA9IGZ1bmN0aW9uIChiKSB7XG4gICAgICAgIHZhciBtZVZYID0gdGhpcy52ZWxvY2l0eS54KCk7XG4gICAgICAgIHZhciBtZVZZID0gdGhpcy52ZWxvY2l0eS55KCk7XG4gICAgICAgIHZhciB5b3VWWCA9IGIudmVsb2NpdHkueCgpO1xuICAgICAgICB2YXIgeW91VlkgPSBiLnZlbG9jaXR5LnkoKTtcbiAgICAgICAgdmFyIGR4ID0gdGhpcy5sb2NhdGlvbi54IC0gYi5sb2NhdGlvbi54O1xuICAgICAgICB2YXIgZHkgPSB0aGlzLmxvY2F0aW9uLnkgLSBiLmxvY2F0aW9uLnk7XG4gICAgICAgIHZhciBkVlggPSBtZVZYIC0geW91Vlg7XG4gICAgICAgIHZhciBkVlkgPSBtZVZZIC0geW91Vlk7XG4gICAgICAgIHZhciBBID0gZFZYICogZFZYICsgZFZZICogZFZZO1xuICAgICAgICB2YXIgQiA9IDIuMCAqIChkeCAqIGRWWCArIGR5ICogZFZZKTtcbiAgICAgICAgdmFyIEMgPSBkeCAqIGR4ICsgZHkgKiBkeSAtICh0aGlzLnJhZGl1cyArIGIucmFkaXVzKSAqICh0aGlzLnJhZGl1cyArIGIucmFkaXVzKTtcbiAgICAgICAgdmFyIGRpc2NyaW1pbmFudCA9IEIgKiBCIC0gNC4wICogQSAqIEM7XG4gICAgICAgIGlmIChkaXNjcmltaW5hbnQgPCAwIHx8IEEgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBbOTk5OTk5OTk5LCA5OTk5OTk5OV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICgtQiAtIE1hdGguc3FydChkaXNjcmltaW5hbnQpKSAvICgyICogQSksXG4gICAgICAgICAgICAgICAgKC1CICsgTWF0aC5zcXJ0KGRpc2NyaW1pbmFudCkpIC8gKDIgKiBBKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEJhbGwucHJvdG90eXBlLnRpbWVUb0NvbGxpZGVXaXRoUG9pbnQgPSBmdW5jdGlvbiAocCkge1xuICAgICAgICB2YXIgbWVWWCA9IHRoaXMudmVsb2NpdHkueCgpO1xuICAgICAgICB2YXIgbWVWWSA9IHRoaXMudmVsb2NpdHkueSgpO1xuICAgICAgICB2YXIgZHggPSB0aGlzLmxvY2F0aW9uLnggLSBwLng7XG4gICAgICAgIHZhciBkeSA9IHRoaXMubG9jYXRpb24ueSAtIHAueTtcbiAgICAgICAgdmFyIGRWWCA9IG1lVlg7XG4gICAgICAgIHZhciBkVlkgPSBtZVZZO1xuICAgICAgICB2YXIgQSA9IGRWWCAqIGRWWCArIGRWWSAqIGRWWTtcbiAgICAgICAgdmFyIEIgPSAyLjAgKiAoZHggKiBkVlggKyBkeSAqIGRWWSk7XG4gICAgICAgIHZhciBDID0gZHggKiBkeCArIGR5ICogZHkgLSAodGhpcy5yYWRpdXMpICogKHRoaXMucmFkaXVzKTtcbiAgICAgICAgdmFyIGRpc2NyaW1pbmFudCA9IEIgKiBCIC0gNC4wICogQSAqIEM7XG4gICAgICAgIGlmIChkaXNjcmltaW5hbnQgPCAwIHx8IEEgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBbOTk5OTk5OTk5LCA5OTk5OTk5OV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICgtQiAtIE1hdGguc3FydChkaXNjcmltaW5hbnQpKSAvICgyICogQSksXG4gICAgICAgICAgICAgICAgKC1CICsgTWF0aC5zcXJ0KGRpc2NyaW1pbmFudCkpIC8gKDIgKiBBKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEJhbGwucHJvdG90eXBlLmRlZmxlY3RXaXRoRWRnZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciB2ZSA9IG5ldyBlZGdlXzEuRWRnZTJEKHsgeDogdGhpcy5sb2NhdGlvbi54LCB5OiB0aGlzLmxvY2F0aW9uLnkgfSwgeyB4OiB0aGlzLmxvY2F0aW9uLnggKyB0aGlzLnZlbG9jaXR5LngoKSwgeTogdGhpcy5sb2NhdGlvbi55ICsgdGhpcy52ZWxvY2l0eS55KCkgfSk7XG4gICAgICAgIHZhciBtU3F1YXJlZCA9IGUubW0oKTtcbiAgICAgICAgdmFyIHggPSBuZXcgdmVjdG9yXzEuVmVjdG9yMkQoe1xuICAgICAgICAgICAgeDogKC0yICogZS55KCkgKiB2ZS5kZXQoZSkpIC8gbVNxdWFyZWQsXG4gICAgICAgICAgICB5OiAyICogZS54KCkgKiB2ZS5kZXQoZSkgLyBtU3F1YXJlZFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy52ZWxvY2l0eS5hZGQoeCk7XG4gICAgfTtcbiAgICBCYWxsLnByb3RvdHlwZS5kZWZsZWN0V2l0aEJhbGwgPSBmdW5jdGlvbiAoYikge1xuICAgICAgICB2YXIgYmJ2ID0gbmV3IHZlY3Rvcl8xLlZlY3RvcjJEKHsgeDogYi5sb2NhdGlvbi54IC0gdGhpcy5sb2NhdGlvbi54LCB5OiBiLmxvY2F0aW9uLnkgLSB0aGlzLmxvY2F0aW9uLnkgfSk7XG4gICAgICAgIHZhciBhUHJvaiA9IHRoaXMudmVsb2NpdHkucHJvamVjdGVkKGJidik7XG4gICAgICAgIHZhciBiUHJvaiA9IGIudmVsb2NpdHkucHJvamVjdGVkKGJidik7XG4gICAgICAgIHZhciBhUmVqID0gdGhpcy52ZWxvY2l0eS5yZWplY3RlZChiYnYpO1xuICAgICAgICB2YXIgYlJlaiA9IGIudmVsb2NpdHkucmVqZWN0ZWQoYmJ2KTtcbiAgICAgICAgdmFyIGF2aSA9IHRoaXMudmVsb2NpdHkucHJvamVjdGVkU2NhbGFyKGJidik7XG4gICAgICAgIHZhciBidmkgPSBiLnZlbG9jaXR5LnByb2plY3RlZFNjYWxhcihiYnYpO1xuICAgICAgICB2YXIgYVZmID0gKDIuMCAqIGIubWFzcyAqIGJ2aSArIGF2aSAqICh0aGlzLm1hc3MgLSBiLm1hc3MpKSAvICh0aGlzLm1hc3MgKyBiLm1hc3MpO1xuICAgICAgICB2YXIgYlZmID0gKDIuMCAqIHRoaXMubWFzcyAqIGF2aSArIGJ2aSAqIChiLm1hc3MgLSB0aGlzLm1hc3MpKSAvICh0aGlzLm1hc3MgKyBiLm1hc3MpO1xuICAgICAgICB2YXIgYXZmID0gYmJ2LnNpemVkKGFWZikuYWRkKGFSZWopO1xuICAgICAgICB2YXIgYnZmID0gYmJ2LnNpemVkKGJWZikuYWRkKGJSZWopO1xuICAgICAgICB0aGlzLnZlbG9jaXR5LmNvbXBvbmVudHMueCA9IGF2Zi54KCk7XG4gICAgICAgIHRoaXMudmVsb2NpdHkuY29tcG9uZW50cy55ID0gYXZmLnkoKTtcbiAgICAgICAgYi52ZWxvY2l0eS5jb21wb25lbnRzLnggPSBidmYueCgpO1xuICAgICAgICBiLnZlbG9jaXR5LmNvbXBvbmVudHMueSA9IGJ2Zi55KCk7XG4gICAgICAgIC8vYi5hdHRyaWJ1dGVzLmNvbG9yID0gMHgwMDAwMDBmZiB8IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTY3NzcyMTYpIDw8IDgpO1xuICAgICAgICBiYnYuc2l6ZSh0aGlzLnJhZGl1cyk7XG4gICAgICAgIHZhciBjb2xsaXNpb25Mb2NhdGlvbiA9IHtcbiAgICAgICAgICAgIHg6IHRoaXMubG9jYXRpb24ueCArIGJidi54KCksXG4gICAgICAgICAgICB5OiB0aGlzLmxvY2F0aW9uLnkgKyBiYnYueSgpLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAvL25ldyBFZGdlMkQoe3g6IGNvbGxpc2lvbkxvY2F0aW9uLngsIHk6IGNvbGxpc2lvbkxvY2F0aW9uLnl9LCB7eDogY29sbGlzaW9uTG9jYXRpb24ueCArIGFQcm9qLngoKSwgeTogY29sbGlzaW9uTG9jYXRpb24ueSArIGFQcm9qLnkoKX0sIHtkaXJlY3RlZDogdHJ1ZSwgY29sb3I6IDB4MDAwMGZmZmYsIHRoaWNrbmVzczogMC4xfSksIFxuICAgICAgICAvL25ldyBFZGdlMkQoe3g6IGNvbGxpc2lvbkxvY2F0aW9uLngsIHk6IGNvbGxpc2lvbkxvY2F0aW9uLnl9LCB7eDogY29sbGlzaW9uTG9jYXRpb24ueCArIGFSZWoueCgpLCB5OiBjb2xsaXNpb25Mb2NhdGlvbi55ICsgYVJlai55KCl9LCB7ZGlyZWN0ZWQ6IHRydWUsIGNvbG9yOiAweGZmMDBmZmZmLCB0aGlja25lc3M6IC4xfSksIFxuICAgICAgICAvL25ldyBFZGdlMkQoe3g6IGNvbGxpc2lvbkxvY2F0aW9uLngsIHk6IGNvbGxpc2lvbkxvY2F0aW9uLnl9LCB7eDogY29sbGlzaW9uTG9jYXRpb24ueCArIGJQcm9qLngoKSwgeTogY29sbGlzaW9uTG9jYXRpb24ueSArIGJQcm9qLnkoKX0sIHtkaXJlY3RlZDogdHJ1ZSwgY29sb3I6IDB4MDAwMGZmZmYsIHRoaWNrbmVzczogLjF9KSwgXG4gICAgICAgIC8vbmV3IEVkZ2UyRCh7eDogY29sbGlzaW9uTG9jYXRpb24ueCwgeTogY29sbGlzaW9uTG9jYXRpb24ueX0sIHt4OiBjb2xsaXNpb25Mb2NhdGlvbi54ICsgYlJlai54KCksIHk6IGNvbGxpc2lvbkxvY2F0aW9uLnkgKyBiUmVqLnkoKX0sIHtkaXJlY3RlZDogdHJ1ZSwgY29sb3I6IDB4ZmYwMGZmZmYsIHRoaWNrbmVzczogLjF9KSwgXG4gICAgICAgIC8vbmV3IEVkZ2UyRCh7eDogY29sbGlzaW9uTG9jYXRpb24ueCwgeTogY29sbGlzaW9uTG9jYXRpb24ueX0sIHt4OiBjb2xsaXNpb25Mb2NhdGlvbi54ICsgdGhpcy52ZWxvY2l0eS54KCksIHk6IGNvbGxpc2lvbkxvY2F0aW9uLnkgKyB0aGlzLnZlbG9jaXR5LnkoKX0sIHtkaXJlY3RlZDogdHJ1ZSwgY29sb3I6IHRoaXMuYXR0cmlidXRlcy5jb2xvciEsIHRoaWNrbmVzczogLjJ9KSxcbiAgICAgICAgLy9uZXcgRWRnZTJEKHt4OiBjb2xsaXNpb25Mb2NhdGlvbi54LCB5OiBjb2xsaXNpb25Mb2NhdGlvbi55fSwge3g6IGNvbGxpc2lvbkxvY2F0aW9uLnggKyBiLnZlbG9jaXR5LngoKSwgeTogY29sbGlzaW9uTG9jYXRpb24ueSArIGIudmVsb2NpdHkueSgpfSwge2RpcmVjdGVkOiB0cnVlLCBjb2xvcjogYi5hdHRyaWJ1dGVzLmNvbG9yISwgdGhpY2tuZXNzOiAuMn0pLFxuICAgICAgICBdO1xuICAgIH07XG4gICAgQmFsbC5wcm90b3R5cGUuZGVmbGVjdFdpdGhQb2ludCA9IGZ1bmN0aW9uIChwKSB7XG4gICAgICAgIHZhciBidHAgPSBuZXcgdmVjdG9yXzEuVmVjdG9yMkQoeyB4OiBwLnggLSB0aGlzLmxvY2F0aW9uLngsIHk6IHAueSAtIHRoaXMubG9jYXRpb24ueSB9KTtcbiAgICAgICAgdmFyIGFQcm9qID0gdGhpcy52ZWxvY2l0eS5wcm9qZWN0ZWQoYnRwKTtcbiAgICAgICAgdmFyIGFWZiA9IHRoaXMudmVsb2NpdHkucmVqZWN0ZWQoYnRwKS5hZGQoYVByb2ouc2NhbGVkKC0xKSk7XG4gICAgICAgIHRoaXMudmVsb2NpdHkuY29tcG9uZW50cy54ID0gYVZmLngoKTtcbiAgICAgICAgdGhpcy52ZWxvY2l0eS5jb21wb25lbnRzLnkgPSBhVmYueSgpO1xuICAgIH07XG4gICAgcmV0dXJuIEJhbGw7XG59KCkpO1xuZXhwb3J0cy5CYWxsID0gQmFsbDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRWRnZTJEID0gdm9pZCAwO1xudmFyIEVkZ2UyRCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFZGdlMkQocDEsIHAyLCBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlcyA9IHt9O1xuICAgICAgICB0aGlzLnAxID0gcDE7XG4gICAgICAgIHRoaXMucDIgPSBwMjtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHRoaXMuYXR0cmlidXRlcyksIGF0dHJpYnV0ZXMpO1xuICAgIH1cbiAgICBFZGdlMkQucHJvdG90eXBlLnggPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLnAyLnggLSB0aGlzLnAxLng7IH07XG4gICAgRWRnZTJELnByb3RvdHlwZS55ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5wMi55IC0gdGhpcy5wMS55OyB9O1xuICAgIEVkZ2UyRC5wcm90b3R5cGUuZ2V0UDEgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB7IHg6IHRoaXMucDEueCwgeTogdGhpcy5wMS55IH07IH07XG4gICAgRWRnZTJELnByb3RvdHlwZS5nZXRQMiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHsgeDogdGhpcy5wMi54LCB5OiB0aGlzLnAyLnkgfTsgfTtcbiAgICBFZGdlMkQucHJvdG90eXBlLm0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBNYXRoLnNxcnQodGhpcy5tbSgpKTsgfTtcbiAgICBFZGdlMkQucHJvdG90eXBlLm1tID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy54KCkgKiB0aGlzLngoKSArIHRoaXMueSgpICogdGhpcy55KCk7IH07XG4gICAgRWRnZTJELnByb3RvdHlwZS50ID0gZnVuY3Rpb24gKCkgeyB2YXIgdCA9IE1hdGguYXRhbjIodGhpcy55KCksIHRoaXMueCgpKTsgaWYgKHQgPCAwKVxuICAgICAgICB0ICs9IDIgKiBNYXRoLlBJOyByZXR1cm4gdDsgfTtcbiAgICBFZGdlMkQucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uIChiKSB7IHJldHVybiB0aGlzLngoKSAqIGIueCgpICsgdGhpcy55KCkgKiBiLnkoKTsgfTtcbiAgICBFZGdlMkQucHJvdG90eXBlLmRldCA9IGZ1bmN0aW9uIChiKSB7IHJldHVybiB0aGlzLngoKSAqIGIueSgpIC0gdGhpcy55KCkgKiBiLngoKTsgfTtcbiAgICBFZGdlMkQucHJvdG90eXBlLnByb2plY3RlZFNjYWxhciA9IGZ1bmN0aW9uIChiKSB7IHJldHVybiB0aGlzLmRvdChiKSAvIGIubSgpOyB9O1xuICAgIEVkZ2UyRC5wcm90b3R5cGUucmVqZWN0ZWRTY2FsYXIgPSBmdW5jdGlvbiAoYikgeyByZXR1cm4gdGhpcy5kZXQoYikgLyBiLm0oKTsgfTtcbiAgICBFZGdlMkQucHJvdG90eXBlLmdldFBhcmFtZXRyaWNQb2ludCA9IGZ1bmN0aW9uICh0KSB7IHJldHVybiB7IHg6IHRoaXMucDEueCArIHQgKiB0aGlzLngoKSwgeTogdGhpcy5wMS55ICsgdCAqIHRoaXMueSgpIH07IH07XG4gICAgRWRnZTJELnByb3RvdHlwZS5nZXRQYXJhbWV0cmljSW50ZXJzZWN0aW9uID0gZnVuY3Rpb24gKGIpIHsgdmFyIGRldCA9IHRoaXMuZGV0KGIpOyByZXR1cm4gZGV0ID8gKGIueSgpICogKGIucDEueCAtIHRoaXMucDEueCkgLSBiLngoKSAqIChiLnAxLnkgLSB0aGlzLnAxLnkpKSAvIGRldCA6IG51bGw7IH07XG4gICAgRWRnZTJELnByb3RvdHlwZS5yZXBvc2l0aW9uID0gZnVuY3Rpb24gKHAxKSB7IHRoaXMucDIueCA9IHAxLnggKyB0aGlzLngoKTsgdGhpcy5wMi55ID0gcDEueSArIHRoaXMueSgpOyB0aGlzLnAxLnggPSBwMS54OyB0aGlzLnAxLnkgPSBwMS55OyByZXR1cm4gdGhpczsgfTtcbiAgICBFZGdlMkQucHJvdG90eXBlLnJlcG9zaXRpb25lZCA9IGZ1bmN0aW9uIChwMSkgeyByZXR1cm4gbmV3IEVkZ2UyRCh7IHg6IHAxLngsIHk6IHAxLnkgfSwgeyB4OiBwMS54ICsgdGhpcy54KCksIHk6IHAxLnkgKyB0aGlzLnkoKSB9LCBfX2Fzc2lnbih7fSwgdGhpcy5hdHRyaWJ1dGVzKSk7IH07XG4gICAgRWRnZTJELnByb3RvdHlwZS5zY2FsZSA9IGZ1bmN0aW9uIChjKSB7IHRoaXMucDIueCA9IHRoaXMucDEueCArIGMgKiB0aGlzLngoKTsgdGhpcy5wMi55ID0gdGhpcy5wMS55ICsgYyAqIHRoaXMueSgpOyByZXR1cm4gdGhpczsgfTtcbiAgICBFZGdlMkQucHJvdG90eXBlLnNjYWxlZCA9IGZ1bmN0aW9uIChjKSB7IHJldHVybiBuZXcgRWRnZTJEKHsgeDogdGhpcy5wMS54LCB5OiB0aGlzLnAxLnkgfSwgeyB4OiB0aGlzLnAxLnggKyBjICogdGhpcy54KCksIHk6IHRoaXMucDEueSArIGMgKiB0aGlzLnkoKSB9LCBfX2Fzc2lnbih7fSwgdGhpcy5hdHRyaWJ1dGVzKSk7IH07XG4gICAgRWRnZTJELnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24gKG0pIHsgcmV0dXJuIHRoaXMuc2NhbGUoMSAvIHRoaXMubSgpKS5zY2FsZShtKTsgfTtcbiAgICBFZGdlMkQucHJvdG90eXBlLnNpemVkID0gZnVuY3Rpb24gKG0pIHsgcmV0dXJuIChuZXcgRWRnZTJEKHsgeDogdGhpcy5wMS54LCB5OiB0aGlzLnAxLnkgfSwgeyB4OiB0aGlzLnAyLngsIHk6IHRoaXMucDIueSB9LCBfX2Fzc2lnbih7fSwgdGhpcy5hdHRyaWJ1dGVzKSkpLnNjYWxlKDEgLyB0aGlzLm0oKSkuc2NhbGUobSk7IH07XG4gICAgRWRnZTJELnByb3RvdHlwZS5hbmdsZSA9IGZ1bmN0aW9uIChhKSB7IHZhciBtID0gdGhpcy5tKCk7IHRoaXMucDIueCA9IHRoaXMucDEueCArIG0gKiBNYXRoLmNvcyhhKTsgdGhpcy5wMi55ID0gdGhpcy5wMS55ICsgbSAqIE1hdGguc2luKGEpOyByZXR1cm4gdGhpczsgfTtcbiAgICBFZGdlMkQucHJvdG90eXBlLmFuZ2xlZCA9IGZ1bmN0aW9uIChhKSB7IHZhciBtID0gdGhpcy5tKCk7IHJldHVybiBuZXcgRWRnZTJEKHsgeDogdGhpcy5wMS54LCB5OiB0aGlzLnAxLnkgfSwgeyB4OiB0aGlzLnAxLnggKyBtICogTWF0aC5jb3MoYSksIHk6IHRoaXMucDEueSArIG0gKiBNYXRoLnNpbihhKSB9LCBfX2Fzc2lnbih7fSwgdGhpcy5hdHRyaWJ1dGVzKSk7IH07XG4gICAgRWRnZTJELnByb3RvdHlwZS5yb3RhdGUgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgICB2YXIgY3QgPSBNYXRoLmNvcyhhKTtcbiAgICAgICAgdmFyIHN0ID0gTWF0aC5zaW4oYSk7XG4gICAgICAgIHZhciBwID0gdGhpcy54KCk7XG4gICAgICAgIHZhciBxID0gdGhpcy55KCk7XG4gICAgICAgIHRoaXMucDIueCA9IHRoaXMucDEueCArIHAgKiBjdCAtIHEgKiBzdDtcbiAgICAgICAgdGhpcy5wMi55ID0gdGhpcy5wMS55ICsgcCAqIHN0ICsgcSAqIGN0O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEVkZ2UyRC5wcm90b3R5cGUucm90YXRlZCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIHZhciBjdCA9IE1hdGguY29zKGEpO1xuICAgICAgICB2YXIgc3QgPSBNYXRoLnNpbihhKTtcbiAgICAgICAgdmFyIHAgPSB0aGlzLngoKTtcbiAgICAgICAgdmFyIHEgPSB0aGlzLnkoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBFZGdlMkQoeyB4OiB0aGlzLnAxLngsIHk6IHRoaXMucDEueSB9LCB7IHg6IHRoaXMucDEueCArIHAgKiBjdCAtIHEgKiBzdCwgeTogdGhpcy5wMS55ICsgcCAqIHN0ICsgcSAqIGN0IH0sIF9fYXNzaWduKHt9LCB0aGlzLmF0dHJpYnV0ZXMpKTtcbiAgICB9O1xuICAgIEVkZ2UyRC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGIpIHsgdGhpcy5wMi54ICs9IGIueCgpOyB0aGlzLnAyLnkgKz0gYi55KCk7IHJldHVybiB0aGlzOyB9O1xuICAgIEVkZ2UyRC5wcm90b3R5cGUuYWRkZWQgPSBmdW5jdGlvbiAoYikgeyByZXR1cm4gbmV3IEVkZ2UyRCh7IHg6IHRoaXMucDEueCwgeTogdGhpcy5wMS55IH0sIHsgeDogdGhpcy5wMi54ICs9IGIueCgpLCB5OiB0aGlzLnAyLnkgKz0gYi55KCkgfSwgX19hc3NpZ24oe30sIHRoaXMuYXR0cmlidXRlcykpOyB9O1xuICAgIEVkZ2UyRC5wcm90b3R5cGUucHJvamVjdCA9IGZ1bmN0aW9uIChiKSB7XG4gICAgICAgIHZhciBjID0gdGhpcy5kb3QoYikgLyBiLm1tKCk7XG4gICAgICAgIHRoaXMucDEueCA9IGIucDEueDtcbiAgICAgICAgdGhpcy5wMS55ID0gYi5wMS55O1xuICAgICAgICB0aGlzLnAyLnggPSB0aGlzLnAxLnggKyBjICogYi54KCk7XG4gICAgICAgIHRoaXMucDIueSA9IHRoaXMucDEueSArIGMgKiBiLnkoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBFZGdlMkQucHJvdG90eXBlLnByb2plY3RlZCA9IGZ1bmN0aW9uIChiKSB7XG4gICAgICAgIHZhciBjID0gdGhpcy5kb3QoYikgLyBiLm1tKCk7XG4gICAgICAgIHJldHVybiBuZXcgRWRnZTJEKHsgeDogYi5wMS54LCB5OiBiLnAxLnkgfSwgeyB4OiB0aGlzLnAxLnggKyBjICogYi54KCksIHk6IHRoaXMucDEueSArIGMgKiBiLnkoKSB9LCBfX2Fzc2lnbih7fSwgdGhpcy5hdHRyaWJ1dGVzKSk7XG4gICAgfTtcbiAgICBFZGdlMkQucHJvdG90eXBlLnJlamVjdCA9IGZ1bmN0aW9uIChiKSB7XG4gICAgICAgIHZhciBwVGVtcCA9IHRoaXMucHJvamVjdGVkKGIpO1xuICAgICAgICB2YXIgYyA9IHRoaXMuZGV0KGIpIC8gYi5tbSgpO1xuICAgICAgICB0aGlzLnAxLnggPSBwVGVtcC5wMi54O1xuICAgICAgICB0aGlzLnAxLnkgPSBwVGVtcC5wMi55O1xuICAgICAgICB0aGlzLnAyLnggPSBwVGVtcC5wMi54ICsgYyAqIGIueSgpO1xuICAgICAgICB0aGlzLnAyLnkgPSBwVGVtcC5wMi55IC0gYyAqIGIueCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEVkZ2UyRC5wcm90b3R5cGUucmVqZWN0ZWQgPSBmdW5jdGlvbiAoYikge1xuICAgICAgICB2YXIgcFRlbXAgPSB0aGlzLnByb2plY3RlZChiKTtcbiAgICAgICAgdmFyIGMgPSB0aGlzLmRldChiKSAvIGIubW0oKTtcbiAgICAgICAgcmV0dXJuIG5ldyBFZGdlMkQoeyB4OiBwVGVtcC5wMi54LCB5OiBwVGVtcC5wMi55IH0sIHsgeDogcFRlbXAucDIueCArICtjICogYi55KCksIHk6IHBUZW1wLnAyLnkgLSBjICogYi54KCkgfSwgX19hc3NpZ24oe30sIHRoaXMuYXR0cmlidXRlcykpO1xuICAgIH07XG4gICAgRWRnZTJELnByb3RvdHlwZS5pbnRlcnNlY3Rpb24gPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgYkRldEEgPSBlLmRldCh0aGlzKTtcbiAgICAgICAgdmFyIEJBeCA9IGUucDEueCAtIHRoaXMucDEueDtcbiAgICAgICAgdmFyIEJBeSA9IGUucDEueSAtIHRoaXMucDEueTtcbiAgICAgICAgcmV0dXJuICgtZS55KCkgKiBCQXggKyBlLngoKSAqIEJBeSkgLyBiRGV0QTtcbiAgICAgICAgLy9yZXR1cm4gKC10aGlzLnkoKSpCQXggKyB0aGlzLngoKSpCQXkpL2JEZXRBO1xuICAgICAgICAvLyB2YXIgYSA9IHRoaXMueCgpO1xuICAgICAgICAvLyB2YXIgYiA9IHRoaXMueSgpO1xuICAgICAgICAvLyB2YXIgYyA9IGUyLngoKTtcbiAgICAgICAgLy8gdmFyIGQgPSBlMi55KCk7XG4gICAgICAgIC8vIHZhciBkZXRlcm1pbmFudCA9IGEqZC1iKmM7XG4gICAgICAgIC8vIHJldHVybiAoZCooZTIucDEueCAtIHRoaXMucDEueCkgLSBjKihlMi5wMS55IC0gdGhpcy5wMS55KSkvZGV0ZXJtaW5hbnQ7XG4gICAgICAgIC8vcmV0dXJuIChuZXcgRWRnZTJEKHt4OiBiLnAxLngsIHk6IGIucDEueX0sIHt4OiB0aGlzLnAxLngsIHk6IHRoaXMucDEueX0pKS5kZXQodGhpcykvdGhpcy5kZXQoYik7IFxuICAgIH07XG4gICAgRWRnZTJELnByb3RvdHlwZS5wb2ludCA9IGZ1bmN0aW9uICh0KSB7IHJldHVybiB7IHg6IHRoaXMucDEueCArIHQgKiAodGhpcy5wMi54IC0gdGhpcy5wMS54KSwgeTogdGhpcy5wMS55ICsgdCAqICh0aGlzLnAyLnkgLSB0aGlzLnAxLnkpIH07IH07XG4gICAgcmV0dXJuIEVkZ2UyRDtcbn0oKSk7XG5leHBvcnRzLkVkZ2UyRCA9IEVkZ2UyRDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVmVjdG9yMkQgPSB2b2lkIDA7XG52YXIgVmVjdG9yMkQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVmVjdG9yMkQoY29tcG9uZW50cywgYXR0cmlidXRlcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMgPSB7fTtcbiAgICAgICAgLy8gY29tcGxleCBudW1iZXIgb3BlcmF0aW9uc1xuICAgICAgICB0aGlzLmNvbXBsZXggPSB7XG4gICAgICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuY29tcG9uZW50cy55ID8gXCJcIi5jb25jYXQoX3RoaXMuY29tcG9uZW50cy54LCBcIiArIGlcIikuY29uY2F0KF90aGlzLmNvbXBvbmVudHMueSkgOiBfdGhpcy5jb21wb25lbnRzLngudG9TdHJpbmcoKTsgfSxcbiAgICAgICAgICAgIGludmVyc2U6IGZ1bmN0aW9uICgpIHsgdmFyIG1tUiA9IDEuMCAvIF90aGlzLm1tKCk7IF90aGlzLmNvbXBvbmVudHMueCAqPSBtbVI7IF90aGlzLmNvbXBvbmVudHMueSAqPSBtbVI7IHJldHVybiBfdGhpczsgfSxcbiAgICAgICAgICAgIGludmVyc2VkOiBmdW5jdGlvbiAoKSB7IHZhciBtbVIgPSAxLjAgLyBfdGhpcy5tbSgpOyByZXR1cm4gbmV3IFZlY3RvcjJEKHsgeDogX3RoaXMuY29tcG9uZW50cy54ICogbW1SLCB5OiBfdGhpcy5jb21wb25lbnRzLnkgKiBtbVIgfSwgX19hc3NpZ24oe30sIF90aGlzLmF0dHJpYnV0ZXMpKTsgfSxcbiAgICAgICAgICAgIGNvbmp1Z2F0ZTogZnVuY3Rpb24gKCkgeyBfdGhpcy5jb21wb25lbnRzLnkgKj0gLTE7IHJldHVybiBfdGhpczsgfSxcbiAgICAgICAgICAgIGNvbmp1Z2F0ZWQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBWZWN0b3IyRCh7IHg6IF90aGlzLmNvbXBvbmVudHMueCwgeTogLV90aGlzLmNvbXBvbmVudHMueSB9KTsgfSxcbiAgICAgICAgICAgIG11bHRpcGx5OiBmdW5jdGlvbiAoYikgeyB2YXIgeCA9IF90aGlzLngoKSAqIGIueCgpIC0gX3RoaXMueSgpICogYi55KCk7IHZhciB5ID0gX3RoaXMueCgpICogYi55KCkgKyBfdGhpcy55KCkgKiBiLngoKTsgX3RoaXMuY29tcG9uZW50cy54ID0geDsgX3RoaXMuY29tcG9uZW50cy55ID0geTsgcmV0dXJuIF90aGlzOyB9LFxuICAgICAgICAgICAgbXVsdGlwbGllZDogZnVuY3Rpb24gKGIpIHsgcmV0dXJuIG5ldyBWZWN0b3IyRCh7IHg6IF90aGlzLngoKSAqIGIueCgpIC0gX3RoaXMueSgpICogYi55KCksIHk6IF90aGlzLngoKSAqIGIueSgpICsgX3RoaXMueSgpICogYi54KCkgfSwgX19hc3NpZ24oe30sIF90aGlzLmF0dHJpYnV0ZXMpKTsgfSxcbiAgICAgICAgICAgIGRpdmlkZTogZnVuY3Rpb24gKGIpIHsgcmV0dXJuIF90aGlzLmNvbXBsZXgubXVsdGlwbHkoYi5jb21wbGV4LmludmVyc2VkKCkpOyB9LFxuICAgICAgICAgICAgZGl2aWRlZDogZnVuY3Rpb24gKGIpIHsgcmV0dXJuIF90aGlzLmNvbXBsZXgubXVsdGlwbGllZChiLmNvbXBsZXguaW52ZXJzZWQoKSk7IH0sXG4gICAgICAgICAgICAvLyBleHBvbmVudGlhbCBmdW5jdGlvbnNcbiAgICAgICAgICAgIHBvdzogZnVuY3Rpb24gKGIpIHsgdmFyIHAgPSBfdGhpcy5jb21wbGV4LnBvd2VkKGIpOyBfdGhpcy5jb21wb25lbnRzLnggPSBwLmNvbXBvbmVudHMueDsgX3RoaXMuY29tcG9uZW50cy55ID0gcC5jb21wb25lbnRzLnk7IHJldHVybiBfdGhpczsgfSxcbiAgICAgICAgICAgIHBvd2VkOiBmdW5jdGlvbiAoYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBiLmNvbXBsZXgubXVsdGlwbGllZChfdGhpcy5jb21wbGV4LmxvZ2VkKCkpLmNvbXBsZXguZXhwZWQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBleHA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWEgPSBNYXRoLnBvdyhNYXRoLkUsIF90aGlzLmNvbXBvbmVudHMueCk7XG4gICAgICAgICAgICAgICAgdmFyIHggPSBlYSAqIE1hdGguY29zKF90aGlzLmNvbXBvbmVudHMueSk7XG4gICAgICAgICAgICAgICAgdmFyIHkgPSBlYSAqIE1hdGguc2luKF90aGlzLmNvbXBvbmVudHMueSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuY29tcG9uZW50cy54ID0geDtcbiAgICAgICAgICAgICAgICBfdGhpcy5jb21wb25lbnRzLnkgPSB5O1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBleHBlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBlYSA9IE1hdGgucG93KE1hdGguRSwgX3RoaXMuY29tcG9uZW50cy54KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHtcbiAgICAgICAgICAgICAgICAgICAgeDogZWEgKiBNYXRoLmNvcyhfdGhpcy5jb21wb25lbnRzLnkpLCB5OiBlYSAqIE1hdGguc2luKF90aGlzLmNvbXBvbmVudHMueSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsb2c6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbSA9IF90aGlzLm0oKTtcbiAgICAgICAgICAgICAgICB2YXIgdCA9IF90aGlzLnQoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5jb21wb25lbnRzLnggPSBNYXRoLmxvZyhtKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5jb21wb25lbnRzLnkgPSB0O1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsb2dlZDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFZlY3RvcjJEKHsgeDogTWF0aC5sb2coX3RoaXMubSgpKSwgeTogX3RoaXMudCgpIH0pOyB9LFxuICAgICAgICAgICAgLy8gdHJpZyBmdW5jdGlvbnNcbiAgICAgICAgICAgIGNvczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciB4ID0gTWF0aC5jb3MoX3RoaXMuY29tcG9uZW50cy54KSAqIE1hdGguY29zaChfdGhpcy5jb21wb25lbnRzLnkpO1xuICAgICAgICAgICAgICAgIHZhciB5ID0gLU1hdGguc2luKF90aGlzLmNvbXBvbmVudHMueCkgKiBNYXRoLnNpbmgoX3RoaXMuY29tcG9uZW50cy55KTtcbiAgICAgICAgICAgICAgICBfdGhpcy5jb21wb25lbnRzLnggPSB4O1xuICAgICAgICAgICAgICAgIF90aGlzLmNvbXBvbmVudHMueSA9IHk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvc2VkOiBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVmVjdG9yMkQoeyB4OiBNYXRoLmNvcyhfdGhpcy5jb21wb25lbnRzLngpICogTWF0aC5jb3NoKF90aGlzLmNvbXBvbmVudHMueSksIHk6IC1NYXRoLnNpbihfdGhpcy5jb21wb25lbnRzLngpICogTWF0aC5zaW5oKF90aGlzLmNvbXBvbmVudHMueSkgfSwgX19hc3NpZ24oe30sIF90aGlzLmF0dHJpYnV0ZXMpKTsgfSxcbiAgICAgICAgICAgIHNpbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciB4ID0gTWF0aC5zaW4oX3RoaXMuY29tcG9uZW50cy54KSAqIE1hdGguY29zaChfdGhpcy5jb21wb25lbnRzLnkpO1xuICAgICAgICAgICAgICAgIHZhciB5ID0gTWF0aC5jb3MoX3RoaXMuY29tcG9uZW50cy54KSAqIE1hdGguc2luaChfdGhpcy5jb21wb25lbnRzLnkpO1xuICAgICAgICAgICAgICAgIF90aGlzLmNvbXBvbmVudHMueCA9IHg7XG4gICAgICAgICAgICAgICAgX3RoaXMuY29tcG9uZW50cy55ID0geTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2luZWQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBWZWN0b3IyRCh7IHg6IE1hdGguc2luKF90aGlzLmNvbXBvbmVudHMueCkgKiBNYXRoLmNvc2goX3RoaXMuY29tcG9uZW50cy55KSwgeTogTWF0aC5jb3MoX3RoaXMuY29tcG9uZW50cy54KSAqIE1hdGguc2luaChfdGhpcy5jb21wb25lbnRzLnkpIH0sIF9fYXNzaWduKHt9LCBfdGhpcy5hdHRyaWJ1dGVzKSk7IH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gY29tcG9uZW50cztcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHRoaXMuYXR0cmlidXRlcyksIGF0dHJpYnV0ZXMpO1xuICAgIH1cbiAgICBWZWN0b3IyRC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBcIihcIi5jb25jYXQodGhpcy5jb21wb25lbnRzLngsIFwiLCBcIikuY29uY2F0KHRoaXMuY29tcG9uZW50cy55LCBcIilcIik7IH07XG4gICAgVmVjdG9yMkQucHJvdG90eXBlLnggPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmNvbXBvbmVudHMueDsgfTtcbiAgICBWZWN0b3IyRC5wcm90b3R5cGUueSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuY29tcG9uZW50cy55OyB9O1xuICAgIFZlY3RvcjJELnByb3RvdHlwZS5nZXRDb21wb25lbnRzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5jb21wb25lbnRzOyB9O1xuICAgIFZlY3RvcjJELnByb3RvdHlwZS5tID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuY29tcG9uZW50cy54ICogdGhpcy5jb21wb25lbnRzLnggKyB0aGlzLmNvbXBvbmVudHMueSAqIHRoaXMuY29tcG9uZW50cy55KTsgfTtcbiAgICBWZWN0b3IyRC5wcm90b3R5cGUubW0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmNvbXBvbmVudHMueCAqIHRoaXMuY29tcG9uZW50cy54ICsgdGhpcy5jb21wb25lbnRzLnkgKiB0aGlzLmNvbXBvbmVudHMueTsgfTtcbiAgICBWZWN0b3IyRC5wcm90b3R5cGUudCA9IGZ1bmN0aW9uICgpIHsgdmFyIHQgPSBNYXRoLmF0YW4yKHRoaXMuY29tcG9uZW50cy55LCB0aGlzLmNvbXBvbmVudHMueCk7IGlmICh0IDwgMClcbiAgICAgICAgdCArPSAyICogTWF0aC5QSTsgcmV0dXJuIHQ7IH07IC8vdDEgLSAyKk1hdGguUEkqTWF0aC5mbG9vcih0MS8oTWF0aC5QSSoyKSlcbiAgICBWZWN0b3IyRC5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKGIpIHsgcmV0dXJuIHRoaXMueCgpICogYi54KCkgKyB0aGlzLnkoKSAqIGIueSgpOyB9O1xuICAgIFZlY3RvcjJELnByb3RvdHlwZS5kZXQgPSBmdW5jdGlvbiAoYikgeyByZXR1cm4gdGhpcy54KCkgKiBiLnkoKSAtIHRoaXMueSgpICogYi54KCk7IH07XG4gICAgVmVjdG9yMkQucHJvdG90eXBlLnByb2plY3RlZFNjYWxhciA9IGZ1bmN0aW9uIChiKSB7IHJldHVybiB0aGlzLmRvdChiKSAvIGIubSgpOyB9O1xuICAgIFZlY3RvcjJELnByb3RvdHlwZS5yZWplY3RlZFNjYWxhciA9IGZ1bmN0aW9uIChiKSB7IHJldHVybiB0aGlzLmRldChiKSAvIGIubSgpOyB9O1xuICAgIC8vIHByZXNlbnQgdGVuc2UgaW5kaWNhdGVzIG11dGF0aW9uIG9mIFRISVMgd2hlcmVhcyBwYXN0IHRlbnNlIGluZGljYXRlcyBwcm9kdWN0aW9uIG9mIG5ldyBWZWN0b3IyZCB3aGlsZSBwcmVzZXJ2aW5nIFRISVNcbiAgICBWZWN0b3IyRC5wcm90b3R5cGUuc2NhbGUgPSBmdW5jdGlvbiAoYykgeyB0aGlzLmNvbXBvbmVudHMueCAqPSBjOyB0aGlzLmNvbXBvbmVudHMueSAqPSBjOyByZXR1cm4gdGhpczsgfTtcbiAgICBWZWN0b3IyRC5wcm90b3R5cGUuc2NhbGVkID0gZnVuY3Rpb24gKGMpIHsgcmV0dXJuIG5ldyBWZWN0b3IyRCh7IHg6IHRoaXMuY29tcG9uZW50cy54ICogYywgeTogdGhpcy5jb21wb25lbnRzLnkgKiBjIH0sIF9fYXNzaWduKHt9LCB0aGlzLmF0dHJpYnV0ZXMpKTsgfTtcbiAgICBWZWN0b3IyRC5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uIChtKSB7IHJldHVybiB0aGlzLnNjYWxlKG0gLyB0aGlzLm0oKSk7IH07XG4gICAgVmVjdG9yMkQucHJvdG90eXBlLnNpemVkID0gZnVuY3Rpb24gKG0pIHsgcmV0dXJuIChuZXcgVmVjdG9yMkQoeyB4OiB0aGlzLmNvbXBvbmVudHMueCwgeTogdGhpcy5jb21wb25lbnRzLnkgfSwgX19hc3NpZ24oe30sIHRoaXMuYXR0cmlidXRlcykpKS5zY2FsZShtIC8gdGhpcy5tKCkpOyB9O1xuICAgIFZlY3RvcjJELnByb3RvdHlwZS5hbmdsZSA9IGZ1bmN0aW9uIChhKSB7IHZhciBtID0gdGhpcy5tKCk7IHRoaXMuY29tcG9uZW50cy54ID0gbSAqIE1hdGguY29zKGEpOyB0aGlzLmNvbXBvbmVudHMueSA9IG0gKiBNYXRoLnNpbihhKTsgcmV0dXJuIHRoaXM7IH07XG4gICAgVmVjdG9yMkQucHJvdG90eXBlLmFuZ2xlZCA9IGZ1bmN0aW9uIChhKSB7IHZhciBtID0gdGhpcy5tKCk7IHJldHVybiBuZXcgVmVjdG9yMkQoeyB4OiBtICogTWF0aC5jb3MoYSksIHk6IG0gKiBNYXRoLnNpbihhKSB9LCBfX2Fzc2lnbih7fSwgdGhpcy5hdHRyaWJ1dGVzKSk7IH07XG4gICAgVmVjdG9yMkQucHJvdG90eXBlLnJvdGF0ZSA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHZhciBjdCA9IE1hdGguY29zKHQpO1xuICAgICAgICB2YXIgc3QgPSBNYXRoLnNpbih0KTtcbiAgICAgICAgdmFyIGEgPSB0aGlzLmNvbXBvbmVudHMueDtcbiAgICAgICAgdmFyIGIgPSB0aGlzLmNvbXBvbmVudHMueTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLnggPSBhICogY3QgLSBiICogc3Q7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cy55ID0gYSAqIHN0ICsgYiAqIGN0O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFZlY3RvcjJELnByb3RvdHlwZS5yb3RhdGVkID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgdmFyIGN0ID0gTWF0aC5jb3ModCk7XG4gICAgICAgIHZhciBzdCA9IE1hdGguc2luKHQpO1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHsgeDogdGhpcy5jb21wb25lbnRzLnggKiBjdCAtIHRoaXMuY29tcG9uZW50cy55ICogc3QsIHk6IHRoaXMuY29tcG9uZW50cy54ICogc3QgKyB0aGlzLmNvbXBvbmVudHMueSAqIGN0IH0sIF9fYXNzaWduKHt9LCB0aGlzLmF0dHJpYnV0ZXMpKTtcbiAgICB9O1xuICAgIFZlY3RvcjJELnByb3RvdHlwZS5yZWZsZWN0ID0gZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgdmFyIHggPSB0aGlzLmNvbXBvbmVudHMueDtcbiAgICAgICAgdmFyIHkgPSB0aGlzLmNvbXBvbmVudHMueTtcbiAgICAgICAgdmFyIHNxdWFyZXMgPSBiLngoKSAqIGIueCgpIC0gYi55KCkgKiBiLnkoKTtcbiAgICAgICAgdmFyIHByb2QgPSAyICogYi54KCkgKiBiLnkoKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLnggPSB4ICogc3F1YXJlcyArIHkgKiBwcm9kO1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMueSA9IHggKiBwcm9kICsgeSAqIHNxdWFyZXM7XG4gICAgICAgIHRoaXMuc2NhbGUoMSAvIGIubW0oKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgVmVjdG9yMkQucHJvdG90eXBlLnJlZmxlY3RlZCA9IGZ1bmN0aW9uIChiKSB7IHJldHVybiAobmV3IFZlY3RvcjJEKHsgeDogdGhpcy5jb21wb25lbnRzLngsIHk6IHRoaXMuY29tcG9uZW50cy55IH0pKS5yZWZsZWN0KGIpOyB9O1xuICAgIFZlY3RvcjJELnByb3RvdHlwZS50cmFuc2Zvcm0gPSBmdW5jdGlvbiAoTSkge1xuICAgICAgICB2YXIgYSA9IE1bMF1bMF0gKiB0aGlzLngoKSArIE1bMF1bMV0gKiB0aGlzLnkoKTtcbiAgICAgICAgdmFyIGIgPSBNWzFdWzBdICogdGhpcy54KCkgKyBNWzFdWzFdICogdGhpcy55KCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cy54ID0gYTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLnkgPSBiO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFZlY3RvcjJELnByb3RvdHlwZS50cmFuc2Zvcm1lZCA9IGZ1bmN0aW9uIChNKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQoeyB4OiBNWzBdWzBdICogdGhpcy54KCkgKyBNWzBdWzFdICogdGhpcy55KCksIHk6IE1bMV1bMF0gKiB0aGlzLngoKSArIE1bMV1bMV0gKiB0aGlzLnkoKSB9LCBfX2Fzc2lnbih7fSwgdGhpcy5hdHRyaWJ1dGVzKSk7XG4gICAgfTtcbiAgICBWZWN0b3IyRC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGIpIHsgdGhpcy5jb21wb25lbnRzLnggKz0gYi5jb21wb25lbnRzLng7IHRoaXMuY29tcG9uZW50cy55ICs9IGIuY29tcG9uZW50cy55OyByZXR1cm4gdGhpczsgfTtcbiAgICBWZWN0b3IyRC5wcm90b3R5cGUuYWRkZWQgPSBmdW5jdGlvbiAoYikgeyByZXR1cm4gbmV3IFZlY3RvcjJEKHsgeDogdGhpcy54KCkgKyBiLngoKSwgeTogdGhpcy55KCkgKyBiLnkoKSB9LCBfX2Fzc2lnbih7fSwgdGhpcy5hdHRyaWJ1dGVzKSk7IH07XG4gICAgVmVjdG9yMkQucHJvdG90eXBlLnByb2plY3QgPSBmdW5jdGlvbiAoYikgeyB2YXIgYyA9IHRoaXMuZG90KGIpIC8gYi5tbSgpOyB0aGlzLmNvbXBvbmVudHMueCA9IGIueCgpICogYzsgdGhpcy5jb21wb25lbnRzLnkgPSBiLnkoKSAqIGM7IHJldHVybiB0aGlzOyB9O1xuICAgIFZlY3RvcjJELnByb3RvdHlwZS5wcm9qZWN0ZWQgPSBmdW5jdGlvbiAoYikgeyB2YXIgYyA9IHRoaXMuZG90KGIpIC8gYi5tbSgpOyByZXR1cm4gbmV3IFZlY3RvcjJEKHsgeDogYi54KCkgKiBjLCB5OiBiLnkoKSAqIGMgfSwgX19hc3NpZ24oe30sIHRoaXMuYXR0cmlidXRlcykpOyB9O1xuICAgIFZlY3RvcjJELnByb3RvdHlwZS5yZWplY3QgPSBmdW5jdGlvbiAoYikgeyB2YXIgYyA9IHRoaXMuZGV0KGIpIC8gYi5tbSgpOyB0aGlzLmNvbXBvbmVudHMueCA9IGIueSgpICogYzsgdGhpcy5jb21wb25lbnRzLnkgPSAtYi54KCkgKiBjOyByZXR1cm4gdGhpczsgfTtcbiAgICBWZWN0b3IyRC5wcm90b3R5cGUucmVqZWN0ZWQgPSBmdW5jdGlvbiAoYikgeyB2YXIgYyA9IHRoaXMuZGV0KGIpIC8gYi5tbSgpOyByZXR1cm4gbmV3IFZlY3RvcjJEKHsgeDogYi55KCkgKiBjLCB5OiAtYi54KCkgKiBjIH0sIF9fYXNzaWduKHt9LCB0aGlzLmF0dHJpYnV0ZXMpKTsgfTtcbiAgICByZXR1cm4gVmVjdG9yMkQ7XG59KCkpO1xuZXhwb3J0cy5WZWN0b3IyRCA9IFZlY3RvcjJEO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkVuZ2luZSA9IHZvaWQgMDtcbnZhciBhdWdtZW50ZWRfZWRnZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2F1Z21lbnRlZC1lZGdlXCIpKTtcbnZhciBhdWdtZW50ZWRfYmFsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2F1Z21lbnRlZC1iYWxsXCIpKTtcbnZhciBFbmdpbmUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRW5naW5lKGFjdG9ycywgZWxlbWVudHMpIHtcbiAgICAgICAgdGhpcy5taW5UaW1lID0gMC4wMDAwMDE7IC8vTnVtYmVyLk1JTl9WQUxVRTtcbiAgICAgICAgdmFyIG51bUVsZW1lbnRzID0gMDtcbiAgICAgICAgYWN0b3JzLmZvckVhY2goZnVuY3Rpb24gKGEpIHsgYS5hdHRyaWJ1dGVzLmlkID0gKG51bUVsZW1lbnRzKyspLnRvU3RyaW5nKCk7IH0pO1xuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChhKSB7IGEuYXR0cmlidXRlcy5pZCA9IChudW1FbGVtZW50cysrKS50b1N0cmluZygpOyB9KTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgbnVtRWxlbWVudHM6IG51bUVsZW1lbnRzLCBhY3RvcnM6IGFjdG9ycywgZWxlbWVudHM6IGVsZW1lbnRzIH07XG4gICAgfVxuICAgIEVuZ2luZS5wcm90b3R5cGUuZ2V0QWN0b3JzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5zdGF0ZS5hY3RvcnM7IH07XG4gICAgRW5naW5lLnByb3RvdHlwZS5nZXRFbGVtZW50cyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuc3RhdGUuZWxlbWVudHM7IH07XG4gICAgRW5naW5lLnByb3RvdHlwZS5wdXNoQWN0b3IgPSBmdW5jdGlvbiAoYSkgeyBhLmF0dHJpYnV0ZXMuaWQgPSB0aGlzLnN0YXRlLm51bUVsZW1lbnRzKys7IHRoaXMuc3RhdGUuYWN0b3JzLnB1c2goYSk7IH07XG4gICAgRW5naW5lLnByb3RvdHlwZS5wdXNoRWxlbWVudCA9IGZ1bmN0aW9uIChlKSB7IGUuYXR0cmlidXRlcy5pZCA9IHRoaXMuc3RhdGUubnVtRWxlbWVudHMrKzsgdGhpcy5zdGF0ZS5lbGVtZW50cy5wdXNoKGUpOyB9O1xuICAgIEVuZ2luZS5wcm90b3R5cGUucG9wQWN0b3JCeUlkID0gZnVuY3Rpb24gKGlkKSB7IHJldHVybiB0aGlzLnN0YXRlLmFjdG9ycy5maWx0ZXIoZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGEuYXR0cmlidXRlcy5pZCA9PT0gaWQ7IH0pWzBdOyB9O1xuICAgIEVuZ2luZS5wcm90b3R5cGUucG9wRWxlbWVudEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHsgcmV0dXJuIHRoaXMuc3RhdGUuZWxlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLmF0dHJpYnV0ZXMuaWQgPT09IGlkOyB9KVswXTsgfTtcbiAgICBFbmdpbmUucHJvdG90eXBlLmRldGVybWluZU5leHRDb2xsaXNpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgY29sbGlzaW9ucyA9IFt7XG4gICAgICAgICAgICAgICAgdDogOTk5OTk5OTk5LFxuICAgICAgICAgICAgICAgIE9iamVjdDE6IG51bGwsXG4gICAgICAgICAgICAgICAgT2JqZWN0MjogbnVsbFxuICAgICAgICAgICAgfV07XG4gICAgICAgIHRoaXMuc3RhdGUuYWN0b3JzLmZvckVhY2goZnVuY3Rpb24gKGEsIGkpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSBpICsgMTsgaiA8IF90aGlzLnN0YXRlLmFjdG9ycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHZhciB0ID0gTWF0aC5taW4uYXBwbHkoTWF0aCwgYS50aW1lVG9Db2xsaWRlV2l0aEJhbGwoX3RoaXMuc3RhdGUuYWN0b3JzW2pdKSk7XG4gICAgICAgICAgICAgICAgaWYgKHQgPT09IGNvbGxpc2lvbnNbMF0udCkge1xuICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdDogdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdDE6IGEsXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QyOiBfdGhpcy5zdGF0ZS5hY3RvcnNbal1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0IDwgY29sbGlzaW9uc1swXS50ICYmICh0ID4gX3RoaXMubWluVGltZSkpIHsgLy8gYW5kICh0ID4gMC4wMDAwMSkgICBcbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9ucyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdDogdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QxOiBhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdDI6IF90aGlzLnN0YXRlLmFjdG9yc1tqXVxuICAgICAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuc3RhdGUuZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciB0ID0gTWF0aC5taW4uYXBwbHkoTWF0aCwgYS50aW1lVG9Db2xsaWRlV2l0aEVkZ2UoZSkpO1xuICAgICAgICAgICAgICAgIGlmICh0ID09PSBjb2xsaXNpb25zWzBdLnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQ6IHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QxOiBhLFxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0MjogZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHQgPCBjb2xsaXNpb25zWzBdLnQgJiYgKHQgPiBfdGhpcy5taW5UaW1lKSkgeyAvL2FuZCAodCA+IDAuMDAwMDEpXG4gICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbnMgPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQ6IHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0MTogYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QyOiBlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdCA9IE1hdGgubWluLmFwcGx5KE1hdGgsIGEudGltZVRvQ29sbGlkZVdpdGhQb2ludChlLmdldFAxKCkpKTtcbiAgICAgICAgICAgICAgICBpZiAodCA9PT0gY29sbGlzaW9uc1swXS50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0OiB0LFxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0MTogYSxcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdDI6IGUuZ2V0UDEoKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHQgPCBjb2xsaXNpb25zWzBdLnQgJiYgKHQgPiBfdGhpcy5taW5UaW1lKSkgeyAvL2FuZCAodCA+IDAuMDAwMDEpXG4gICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbnMgPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQ6IHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0MTogYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QyOiBlLmdldFAxKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0ID0gTWF0aC5taW4uYXBwbHkoTWF0aCwgYS50aW1lVG9Db2xsaWRlV2l0aFBvaW50KGUuZ2V0UDIoKSkpO1xuICAgICAgICAgICAgICAgIGlmICh0ID09PSBjb2xsaXNpb25zWzBdLnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQ6IHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QxOiBhLFxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0MjogZS5nZXRQMigpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodCA8IGNvbGxpc2lvbnNbMF0udCAmJiAodCA+IF90aGlzLm1pblRpbWUpKSB7IC8vYW5kICh0ID4gMC4wMDAwMSlcbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9ucyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdDogdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QxOiBhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdDI6IGUuZ2V0UDIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY29sbGlzaW9ucztcbiAgICB9O1xuICAgIEVuZ2luZS5wcm90b3R5cGUubW92ZUFjdG9ycyA9IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICB2YXIgbmV4dENvbGxpc2lvbnMgPSB0aGlzLmRldGVybWluZU5leHRDb2xsaXNpb25zKCk7XG4gICAgICAgIHZhciBhZGRpdGlvbmFsUmVuZGVycyA9IFtdO1xuICAgICAgICB3aGlsZSAobmV4dENvbGxpc2lvbnNbMF0udCA8IGR0ICYmIG5leHRDb2xsaXNpb25zWzBdLnQgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmFjdG9ycy5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7IHJldHVybiB2Lm1vdmUobmV4dENvbGxpc2lvbnNbMF0udCk7IH0pO1xuICAgICAgICAgICAgbmV4dENvbGxpc2lvbnMuZm9yRWFjaChmdW5jdGlvbiAobmV4dENvbGxpc2lvbikge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRDb2xsaXNpb24uT2JqZWN0MiBpbnN0YW5jZW9mIGF1Z21lbnRlZF9iYWxsXzEuZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdnMgPSBuZXh0Q29sbGlzaW9uLk9iamVjdDEuZGVmbGVjdFdpdGhCYWxsKG5leHRDb2xsaXNpb24uT2JqZWN0Mik7XG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxSZW5kZXJzLnB1c2guYXBwbHkoYWRkaXRpb25hbFJlbmRlcnMsIHZzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0Q29sbGlzaW9uLk9iamVjdDIgaW5zdGFuY2VvZiBhdWdtZW50ZWRfZWRnZV8xLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRDb2xsaXNpb24uT2JqZWN0MS5kZWZsZWN0V2l0aEVkZ2UobmV4dENvbGxpc2lvbi5PYmplY3QyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoKF9hID0gbmV4dENvbGxpc2lvbi5PYmplY3QyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EueCkgJiYgKChfYiA9IG5leHRDb2xsaXNpb24uT2JqZWN0MikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dENvbGxpc2lvbi5PYmplY3QxLmRlZmxlY3RXaXRoUG9pbnQobmV4dENvbGxpc2lvbi5PYmplY3QyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZHQgLT0gbmV4dENvbGxpc2lvbnNbMF0udDtcbiAgICAgICAgICAgIG5leHRDb2xsaXNpb25zID0gdGhpcy5kZXRlcm1pbmVOZXh0Q29sbGlzaW9ucygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUuYWN0b3JzLmZvckVhY2goZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGEubW92ZShkdCk7IH0pO1xuICAgICAgICByZXR1cm4gYWRkaXRpb25hbFJlbmRlcnM7XG4gICAgfTtcbiAgICByZXR1cm4gRW5naW5lO1xufSgpKTtcbmV4cG9ydHMuRW5naW5lID0gRW5naW5lO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlBsYW5lID0gdm9pZCAwO1xudmFyIFBsYW5lID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBsYW5lKGNhbnZhcykge1xuICAgICAgICB0aGlzLndpZHRoID0gMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAwO1xuICAgICAgICB0aGlzLnhPcmlnaW4gPSAwLjA7XG4gICAgICAgIHRoaXMueU9yaWdpbiA9IDAuMDtcbiAgICAgICAgdGhpcy56b29tID0gMS4wO1xuICAgICAgICB0aGlzLnpvb21JbnZlcnNlID0gMS4wIC8gdGhpcy56b29tO1xuICAgICAgICB0aGlzLmhhbGZXaWR0aCA9IHRoaXMud2lkdGggLyAyLjA7XG4gICAgICAgIHRoaXMuaGFsZkhlaWdodCA9IHRoaXMuaGVpZ2h0IC8gMi4wO1xuICAgICAgICB0aGlzLm14ID0gLTEuMDtcbiAgICAgICAgdGhpcy5teSA9IC0xLjA7XG4gICAgICAgIHRoaXMuZ3JpZENvbG9yID0gJyNDOEM4RkYnOyAvLycjQzhDOERDJztcbiAgICAgICAgdGhpcy5heGVzQ29sb3IgPSAnIzAwMDAwMCc7XG4gICAgICAgIHRoaXMuZGVsZWdhdGVDYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMud2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcbiAgICAgICAgdGhpcy5oYWxmV2lkdGggPSB0aGlzLndpZHRoIC8gMi4wO1xuICAgICAgICB0aGlzLmhhbGZIZWlnaHQgPSB0aGlzLmhlaWdodCAvIDIuMDtcbiAgICB9XG4gICAgUGxhbmUucHJvdG90eXBlLmdldFpvb20gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLnpvb207IH07XG4gICAgUGxhbmUucHJvdG90eXBlLnNjcmVlblRvV29ybGRDb29yZGluYXRlcyA9IGZ1bmN0aW9uIChzY3JlZW5Db29yZGluYXRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiAoc2NyZWVuQ29vcmRpbmF0ZS54IC0gdGhpcy5oYWxmV2lkdGgpICogdGhpcy56b29tSW52ZXJzZSArIHRoaXMueE9yaWdpbixcbiAgICAgICAgICAgIHk6IC0oc2NyZWVuQ29vcmRpbmF0ZS55IC0gdGhpcy5oYWxmSGVpZ2h0KSAqIHRoaXMuem9vbUludmVyc2UgKyB0aGlzLnlPcmlnaW5cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFBsYW5lLnByb3RvdHlwZS53b3JsZFRvU2NyZWVuQ29vcmRpbmF0ZXMgPSBmdW5jdGlvbiAod29ybGRDb29yZGluYXRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiAod29ybGRDb29yZGluYXRlLnggLSB0aGlzLnhPcmlnaW4pICogdGhpcy56b29tICsgdGhpcy5oYWxmV2lkdGgsXG4gICAgICAgICAgICB5OiAtKHdvcmxkQ29vcmRpbmF0ZS55IC0gdGhpcy55T3JpZ2luKSAqIHRoaXMuem9vbSArIHRoaXMuaGFsZkhlaWdodFxuICAgICAgICB9O1xuICAgIH07XG4gICAgUGxhbmUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKGNhbnZhczJkQ29udGV4dCkge1xuICAgICAgICBjYW52YXMyZENvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9O1xuICAgIFBsYW5lLnByb3RvdHlwZS5kcmF3QXhlcyA9IGZ1bmN0aW9uIChjYW52YXMyZENvbnRleHQpIHtcbiAgICAgICAgdmFyIG5vcnRoV2VzdCA9IHsgXCJ4XCI6IDAsIFwieVwiOiAwIH07XG4gICAgICAgIHZhciBzb3V0aEVhc3QgPSB7IFwieFwiOiB0aGlzLndpZHRoLCBcInlcIjogdGhpcy5oZWlnaHQgfTtcbiAgICAgICAgbm9ydGhXZXN0ID0gdGhpcy5zY3JlZW5Ub1dvcmxkQ29vcmRpbmF0ZXMobm9ydGhXZXN0KTtcbiAgICAgICAgc291dGhFYXN0ID0gdGhpcy5zY3JlZW5Ub1dvcmxkQ29vcmRpbmF0ZXMoc291dGhFYXN0KTtcbiAgICAgICAgaWYgKChub3J0aFdlc3QueCA8PSAwKSAmJiAoc291dGhFYXN0LnggPj0gMCkpIHtcbiAgICAgICAgICAgIHZhciB0b3BDb29yZCA9IHsgXCJ4XCI6IDAsIFwieVwiOiBub3J0aFdlc3QueSB9O1xuICAgICAgICAgICAgdmFyIGJvdHRvbUNvb3JkID0geyBcInhcIjogMCwgXCJ5XCI6IHNvdXRoRWFzdC55IH07XG4gICAgICAgICAgICB0b3BDb29yZCA9IHRoaXMud29ybGRUb1NjcmVlbkNvb3JkaW5hdGVzKHRvcENvb3JkKTtcbiAgICAgICAgICAgIGJvdHRvbUNvb3JkID0gdGhpcy53b3JsZFRvU2NyZWVuQ29vcmRpbmF0ZXMoYm90dG9tQ29vcmQpO1xuICAgICAgICAgICAgY2FudmFzMmRDb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5heGVzQ29sb3I7XG4gICAgICAgICAgICBjYW52YXMyZENvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjYW52YXMyZENvbnRleHQubW92ZVRvKHRvcENvb3JkLngsIHRvcENvb3JkLnkpO1xuICAgICAgICAgICAgY2FudmFzMmRDb250ZXh0LmxpbmVUbyhib3R0b21Db29yZC54LCBib3R0b21Db29yZC55KTtcbiAgICAgICAgICAgIGNhbnZhczJkQ29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKG5vcnRoV2VzdC55ID49IDApICYmIChzb3V0aEVhc3QueSA8PSAwKSkge1xuICAgICAgICAgICAgdmFyIGxlZnRDb29yZCA9IHsgXCJ4XCI6IG5vcnRoV2VzdC54LCBcInlcIjogMCB9O1xuICAgICAgICAgICAgdmFyIHJpZ2h0Q29vcmQgPSB7IFwieFwiOiBzb3V0aEVhc3QueCwgXCJ5XCI6IDAgfTtcbiAgICAgICAgICAgIGxlZnRDb29yZCA9IHRoaXMud29ybGRUb1NjcmVlbkNvb3JkaW5hdGVzKGxlZnRDb29yZCk7XG4gICAgICAgICAgICByaWdodENvb3JkID0gdGhpcy53b3JsZFRvU2NyZWVuQ29vcmRpbmF0ZXMocmlnaHRDb29yZCk7XG4gICAgICAgICAgICBjYW52YXMyZENvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLmF4ZXNDb2xvcjtcbiAgICAgICAgICAgIGNhbnZhczJkQ29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGNhbnZhczJkQ29udGV4dC5tb3ZlVG8obGVmdENvb3JkLngsIGxlZnRDb29yZC55KTtcbiAgICAgICAgICAgIGNhbnZhczJkQ29udGV4dC5saW5lVG8ocmlnaHRDb29yZC54LCByaWdodENvb3JkLnkpO1xuICAgICAgICAgICAgY2FudmFzMmRDb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQbGFuZS5wcm90b3R5cGUuZHJhd0dyaWQgPSBmdW5jdGlvbiAoY2FudmFzMmRDb250ZXh0KSB7XG4gICAgICAgIHZhciBub3J0aFdlc3QgPSB7IFwieFwiOiAwLCBcInlcIjogMCB9O1xuICAgICAgICB2YXIgc291dGhFYXN0ID0geyBcInhcIjogdGhpcy53aWR0aCwgXCJ5XCI6IHRoaXMuaGVpZ2h0IH07XG4gICAgICAgIG5vcnRoV2VzdCA9IHRoaXMuc2NyZWVuVG9Xb3JsZENvb3JkaW5hdGVzKG5vcnRoV2VzdCk7XG4gICAgICAgIHNvdXRoRWFzdCA9IHRoaXMuc2NyZWVuVG9Xb3JsZENvb3JkaW5hdGVzKHNvdXRoRWFzdCk7XG4gICAgICAgIHZhciB3aWR0aCA9IHNvdXRoRWFzdC54IC0gbm9ydGhXZXN0Lng7XG4gICAgICAgIHZhciBoZWlnaHQgPSBub3J0aFdlc3QueSAtIHNvdXRoRWFzdC55O1xuICAgICAgICB2YXIgd01hZ25pdHVkZSA9IE1hdGguZmxvb3IoTWF0aC5sb2cxMCh3aWR0aCkpO1xuICAgICAgICB2YXIgaE1hZ25pdHVkZSA9IE1hdGguZmxvb3IoTWF0aC5sb2cxMChoZWlnaHQpKTtcbiAgICAgICAgaWYgKHdNYWduaXR1ZGUgPCBoTWFnbml0dWRlKSB7XG4gICAgICAgICAgICB2YXIgbSA9IHdNYWduaXR1ZGU7XG4gICAgICAgICAgICB2YXIgcDEgPSBNYXRoLnBvdygxMCwgbSAtIDEpO1xuICAgICAgICAgICAgdmFyIHAwID0gTWF0aC5wb3coMTAsIG0pO1xuICAgICAgICAgICAgdmFyIG9uZXMgPSBNYXRoLmZsb29yKHdpZHRoIC8gcDEpO1xuICAgICAgICAgICAgdmFyIHRlbnMgPSBNYXRoLmZsb29yKHdpZHRoIC8gcDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIG0gPSBoTWFnbml0dWRlO1xuICAgICAgICAgICAgdmFyIHAxID0gTWF0aC5wb3coMTAsIG0gLSAxKTtcbiAgICAgICAgICAgIHZhciBwMCA9IE1hdGgucG93KDEwLCBtKTtcbiAgICAgICAgICAgIHZhciBvbmVzID0gTWF0aC5mbG9vcihoZWlnaHQgLyBwMSk7XG4gICAgICAgICAgICB2YXIgdGVucyA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gcDApO1xuICAgICAgICB9XG4gICAgICAgIGNhbnZhczJkQ29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuZ3JpZENvbG9yO1xuICAgICAgICBjYW52YXMyZENvbnRleHQuZ2xvYmFsQWxwaGEgPSAoMS4wIC0gKG9uZXMgLyA5OS4wKSk7XG4gICAgICAgIHZhciBsZWZ0bW9zdE9uZSA9IE1hdGguZmxvb3Iobm9ydGhXZXN0LnggLyBwMSkgKiBwMTtcbiAgICAgICAgdmFyIHRvcENvb3JkID0geyB4OiAtMSwgeTogLTEgfTtcbiAgICAgICAgdmFyIGJvdHRvbUNvb3JkID0geyB4OiAtMSwgeTogLTEgfTtcbiAgICAgICAgd2hpbGUgKGxlZnRtb3N0T25lIDwgc291dGhFYXN0LngpIHtcbiAgICAgICAgICAgIHRvcENvb3JkLnggPSBsZWZ0bW9zdE9uZTtcbiAgICAgICAgICAgIHRvcENvb3JkLnkgPSBub3J0aFdlc3QueTtcbiAgICAgICAgICAgIGJvdHRvbUNvb3JkLnggPSBsZWZ0bW9zdE9uZTtcbiAgICAgICAgICAgIGJvdHRvbUNvb3JkLnkgPSBzb3V0aEVhc3QueTtcbiAgICAgICAgICAgIHRvcENvb3JkID0gdGhpcy53b3JsZFRvU2NyZWVuQ29vcmRpbmF0ZXModG9wQ29vcmQpO1xuICAgICAgICAgICAgYm90dG9tQ29vcmQgPSB0aGlzLndvcmxkVG9TY3JlZW5Db29yZGluYXRlcyhib3R0b21Db29yZCk7XG4gICAgICAgICAgICBjYW52YXMyZENvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjYW52YXMyZENvbnRleHQubW92ZVRvKHRvcENvb3JkLngsIHRvcENvb3JkLnkpO1xuICAgICAgICAgICAgY2FudmFzMmRDb250ZXh0LmxpbmVUbyhib3R0b21Db29yZC54LCBib3R0b21Db29yZC55KTtcbiAgICAgICAgICAgIGNhbnZhczJkQ29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgICAgIGxlZnRtb3N0T25lID0gbGVmdG1vc3RPbmUgKyBwMTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYm90dG9tbW9zdE9uZSA9IE1hdGguZmxvb3Ioc291dGhFYXN0LnkgLyBwMSkgKiBwMTtcbiAgICAgICAgdmFyIGxlZnRDb29yZCA9IHsgeDogLTEsIHk6IC0xIH07XG4gICAgICAgIHZhciByaWdodENvb3JkID0geyB4OiAtMSwgeTogLTEgfTtcbiAgICAgICAgd2hpbGUgKGJvdHRvbW1vc3RPbmUgPCBub3J0aFdlc3QueSkge1xuICAgICAgICAgICAgbGVmdENvb3JkLnggPSBub3J0aFdlc3QueDtcbiAgICAgICAgICAgIGxlZnRDb29yZC55ID0gYm90dG9tbW9zdE9uZTtcbiAgICAgICAgICAgIHJpZ2h0Q29vcmQueCA9IHNvdXRoRWFzdC54O1xuICAgICAgICAgICAgcmlnaHRDb29yZC55ID0gYm90dG9tbW9zdE9uZTtcbiAgICAgICAgICAgIGxlZnRDb29yZCA9IHRoaXMud29ybGRUb1NjcmVlbkNvb3JkaW5hdGVzKGxlZnRDb29yZCk7XG4gICAgICAgICAgICByaWdodENvb3JkID0gdGhpcy53b3JsZFRvU2NyZWVuQ29vcmRpbmF0ZXMocmlnaHRDb29yZCk7XG4gICAgICAgICAgICBjYW52YXMyZENvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjYW52YXMyZENvbnRleHQubW92ZVRvKGxlZnRDb29yZC54LCBsZWZ0Q29vcmQueSk7XG4gICAgICAgICAgICBjYW52YXMyZENvbnRleHQubGluZVRvKHJpZ2h0Q29vcmQueCwgcmlnaHRDb29yZC55KTtcbiAgICAgICAgICAgIGNhbnZhczJkQ29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgICAgIGJvdHRvbW1vc3RPbmUgPSBib3R0b21tb3N0T25lICsgcDE7XG4gICAgICAgIH1cbiAgICAgICAgY2FudmFzMmRDb250ZXh0Lmdsb2JhbEFscGhhID0gMS4wO1xuICAgICAgICB2YXIgbGVmdG1vc3RPbmUgPSBNYXRoLmZsb29yKG5vcnRoV2VzdC54IC8gcDApICogcDA7XG4gICAgICAgIHZhciB0b3BDb29yZCA9IHsgeDogLTEsIHk6IC0xIH07XG4gICAgICAgIHZhciBib3R0b21Db29yZCA9IHsgeDogLTEsIHk6IC0xIH07XG4gICAgICAgIHdoaWxlIChsZWZ0bW9zdE9uZSA8IHNvdXRoRWFzdC54KSB7XG4gICAgICAgICAgICB0b3BDb29yZC54ID0gbGVmdG1vc3RPbmU7XG4gICAgICAgICAgICB0b3BDb29yZC55ID0gbm9ydGhXZXN0Lnk7XG4gICAgICAgICAgICBib3R0b21Db29yZC54ID0gbGVmdG1vc3RPbmU7XG4gICAgICAgICAgICBib3R0b21Db29yZC55ID0gc291dGhFYXN0Lnk7XG4gICAgICAgICAgICB0b3BDb29yZCA9IHRoaXMud29ybGRUb1NjcmVlbkNvb3JkaW5hdGVzKHRvcENvb3JkKTtcbiAgICAgICAgICAgIGJvdHRvbUNvb3JkID0gdGhpcy53b3JsZFRvU2NyZWVuQ29vcmRpbmF0ZXMoYm90dG9tQ29vcmQpO1xuICAgICAgICAgICAgY2FudmFzMmRDb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY2FudmFzMmRDb250ZXh0Lm1vdmVUbyh0b3BDb29yZC54LCB0b3BDb29yZC55KTtcbiAgICAgICAgICAgIGNhbnZhczJkQ29udGV4dC5saW5lVG8oYm90dG9tQ29vcmQueCwgYm90dG9tQ29vcmQueSk7XG4gICAgICAgICAgICBjYW52YXMyZENvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICBsZWZ0bW9zdE9uZSA9IGxlZnRtb3N0T25lICsgcDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGJvdHRvbW1vc3RPbmUgPSBNYXRoLmZsb29yKHNvdXRoRWFzdC55IC8gcDApICogcDA7XG4gICAgICAgIHZhciBsZWZ0Q29vcmQgPSB7IHg6IC0xLCB5OiAtMSB9O1xuICAgICAgICB2YXIgcmlnaHRDb29yZCA9IHsgeDogLTEsIHk6IC0xIH07XG4gICAgICAgIHdoaWxlIChib3R0b21tb3N0T25lIDwgbm9ydGhXZXN0LnkpIHtcbiAgICAgICAgICAgIGxlZnRDb29yZC54ID0gbm9ydGhXZXN0Lng7XG4gICAgICAgICAgICBsZWZ0Q29vcmQueSA9IGJvdHRvbW1vc3RPbmU7XG4gICAgICAgICAgICByaWdodENvb3JkLnggPSBzb3V0aEVhc3QueDtcbiAgICAgICAgICAgIHJpZ2h0Q29vcmQueSA9IGJvdHRvbW1vc3RPbmU7XG4gICAgICAgICAgICBsZWZ0Q29vcmQgPSB0aGlzLndvcmxkVG9TY3JlZW5Db29yZGluYXRlcyhsZWZ0Q29vcmQpO1xuICAgICAgICAgICAgcmlnaHRDb29yZCA9IHRoaXMud29ybGRUb1NjcmVlbkNvb3JkaW5hdGVzKHJpZ2h0Q29vcmQpO1xuICAgICAgICAgICAgY2FudmFzMmRDb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY2FudmFzMmRDb250ZXh0Lm1vdmVUbyhsZWZ0Q29vcmQueCwgbGVmdENvb3JkLnkpO1xuICAgICAgICAgICAgY2FudmFzMmRDb250ZXh0LmxpbmVUbyhyaWdodENvb3JkLngsIHJpZ2h0Q29vcmQueSk7XG4gICAgICAgICAgICBjYW52YXMyZENvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICBib3R0b21tb3N0T25lID0gYm90dG9tbW9zdE9uZSArIHAwO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQbGFuZS5wcm90b3R5cGUuZHJhd0VkZ2UgPSBmdW5jdGlvbiAoY2FudmFzMmRDb250ZXh0LCBlZGdlKSB7XG4gICAgICAgIHZhciBzdGFydFBvaW50ID0gdGhpcy53b3JsZFRvU2NyZWVuQ29vcmRpbmF0ZXMoZWRnZS5wMCk7XG4gICAgICAgIHZhciBlbmRQb2ludCA9IHRoaXMud29ybGRUb1NjcmVlbkNvb3JkaW5hdGVzKGVkZ2UucGYpO1xuICAgICAgICBjYW52YXMyZENvbnRleHQuc3Ryb2tlU3R5bGUgPSAnIzAwMDAwMCc7IC8vZWRnZS5jb2xvcjtcbiAgICAgICAgY2FudmFzMmRDb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjYW52YXMyZENvbnRleHQubW92ZVRvKHN0YXJ0UG9pbnQueCwgc3RhcnRQb2ludC55KTtcbiAgICAgICAgY2FudmFzMmRDb250ZXh0LmxpbmVUbyhlbmRQb2ludC54LCBlbmRQb2ludC55KTtcbiAgICAgICAgY2FudmFzMmRDb250ZXh0LnN0cm9rZSgpO1xuICAgIH07XG4gICAgUGxhbmUucHJvdG90eXBlLmRlZmF1bHRSZXNpemVMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZUNhbnZhcy53aWR0aCA9IHRoaXMuZGVsZWdhdGVDYW52YXMucGFyZW50Tm9kZS5jbGllbnRXaWR0aDtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZUNhbnZhcy5oZWlnaHQgPSB0aGlzLmRlbGVnYXRlQ2FudmFzLnBhcmVudE5vZGUuY2xpZW50SGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5kZWxlZ2F0ZUNhbnZhcy53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmRlbGVnYXRlQ2FudmFzLmhlaWdodDtcbiAgICAgICAgdGhpcy5oYWxmV2lkdGggPSB0aGlzLmRlbGVnYXRlQ2FudmFzLndpZHRoIC8gMi4wO1xuICAgICAgICB0aGlzLmhhbGZIZWlnaHQgPSB0aGlzLmRlbGVnYXRlQ2FudmFzLmhlaWdodCAvIDIuMDtcbiAgICB9O1xuICAgIFBsYW5lLnByb3RvdHlwZS5kZWZhdWx0TW91c2VNb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIGNlbnRlckRpdlJlY3QgPSB0aGlzLmRlbGVnYXRlQ2FudmFzLnBhcmVudE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBjb29yZCA9IHtcbiAgICAgICAgICAgIHg6IGV2ZW50LmNsaWVudFggLSBjZW50ZXJEaXZSZWN0LmxlZnQsXG4gICAgICAgICAgICB5OiBldmVudC5jbGllbnRZIC0gY2VudGVyRGl2UmVjdC50b3BcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5teCA9IGNvb3JkLng7XG4gICAgICAgIHRoaXMubXkgPSBjb29yZC55O1xuICAgIH07XG4gICAgUGxhbmUucHJvdG90eXBlLmRlZmF1bHRNb3VzZVdoZWVsTGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmRlbHRhWSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuem9vbSA9IHRoaXMuem9vbSAqICgxLjA1KTtcbiAgICAgICAgICAgIHRoaXMuem9vbUludmVyc2UgPSAxLjAgLyB0aGlzLnpvb207XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnpvb20gPSB0aGlzLnpvb20gKiAoMC45NSk7XG4gICAgICAgICAgICB0aGlzLnpvb21JbnZlcnNlID0gMS4wIC8gdGhpcy56b29tO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQbGFuZS5wcm90b3R5cGUuZGVmYXVsdE1vdXNlQ2xpY2tMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgY2VudGVyRGl2UmVjdCA9IHRoaXMuZGVsZWdhdGVDYW52YXMucGFyZW50Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIGNvb3JkID0ge1xuICAgICAgICAgICAgeDogZXZlbnQuY2xpZW50WCAtIGNlbnRlckRpdlJlY3QubGVmdCxcbiAgICAgICAgICAgIHk6IGV2ZW50LmNsaWVudFkgLSBjZW50ZXJEaXZSZWN0LnRvcFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm14ID0gY29vcmQueDtcbiAgICAgICAgdGhpcy5teSA9IGNvb3JkLnk7XG4gICAgICAgIGNvb3JkID0gdGhpcy5zY3JlZW5Ub1dvcmxkQ29vcmRpbmF0ZXMoY29vcmQpO1xuICAgICAgICB0aGlzLnhPcmlnaW4gPSBjb29yZC54O1xuICAgICAgICB0aGlzLnlPcmlnaW4gPSBjb29yZC55O1xuICAgIH07XG4gICAgcmV0dXJuIFBsYW5lO1xufSgpKTtcbmV4cG9ydHMuUGxhbmUgPSBQbGFuZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZXRDb250cm9scyA9IGV4cG9ydHMuZ2V0VUlFbGVtZW50cyA9IHZvaWQgMDtcbmZ1bmN0aW9uIGdldFVJRWxlbWVudHMoKSB7XG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteUNhbnZhcycpO1xuICAgIHZhciBjb250cm9sUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbC1wYW5lbCcpO1xuICAgIHZhciBvdXRwdXRQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRwdXQtcGFuZWwnKTtcbiAgICB2YXIgb3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVybGF5Jyk7XG4gICAgaWYgKGNhbnZhcyAmJiBjb250cm9sUGFuZWwgJiYgb3V0cHV0UGFuZWwgJiYgb3ZlcmxheSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2FudmFzOiBjYW52YXMsXG4gICAgICAgICAgICBjb250cm9sUGFuZWw6IGNvbnRyb2xQYW5lbCxcbiAgICAgICAgICAgIG91dHB1dFBhbmVsOiBvdXRwdXRQYW5lbCxcbiAgICAgICAgICAgIG92ZXJsYXk6IG92ZXJsYXlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5leHBvcnRzLmdldFVJRWxlbWVudHMgPSBnZXRVSUVsZW1lbnRzO1xuZnVuY3Rpb24gc2V0Q29udHJvbHMoZWxlbWVudCwgY29udHJvbHMpIHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAoX2EgPSBjb250cm9scy5idXR0b25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZm9yRWFjaChmdW5jdGlvbiAoYnV0dG9uR3JvdXApIHtcbiAgICAgICAgdmFyIHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnY29udHJvbC1wYW5lbC1ncm91cCcsICdjb250cm9sLXBhbmVsLWJ1dHRvbi1ncm91cCcpO1xuICAgICAgICBPYmplY3Qua2V5cyhidXR0b25Hcm91cCkuZm9yRWFjaChmdW5jdGlvbiAoYnV0dG9uS2V5KSB7XG4gICAgICAgICAgICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnY29udHJvbC1wYW5lbC1idXR0b24nKTtcbiAgICAgICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBidXR0b25LZXk7XG4gICAgICAgICAgICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBidXR0b25Hcm91cFtidXR0b25LZXldKGUpOyB9O1xuICAgICAgICAgICAgc3Bhbi5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgICAgICB9KTtcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKTtcbiAgICB9KTtcbiAgICAoX2IgPSBjb250cm9scy5yYW5nZXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5mb3JFYWNoKGZ1bmN0aW9uIChyYW5nZUdyb3VwKSB7XG4gICAgICAgIHZhciBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcbiAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdjb250cm9sLXBhbmVsLWdyb3VwJywgJ2NvbnRyb2wtcGFuZWwtcmFuZ2UtZ3JvdXAnKTtcbiAgICAgICAgT2JqZWN0LmtleXMocmFuZ2VHcm91cCkuZm9yRWFjaChmdW5jdGlvbiAocmFuZ2VLZXkpIHtcbiAgICAgICAgICAgIHZhciB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICAgICAgICB2YXIgdGQxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgICAgIHZhciB0ZDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgICAgdmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIGxhYmVsLmNsYXNzTGlzdC5hZGQoJ2NvbnRyb2wtcGFuZWwtbGFiZWwnLCAnY29udHJvbC1wYW5lbC1yYW5nZS1sYWJlbCcpO1xuICAgICAgICAgICAgbGFiZWwuaW5uZXJIVE1MID0gcmFuZ2VLZXk7XG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgcmFuZ2UuY2xhc3NMaXN0LmFkZCgnY29udHJvbC1wYW5lbC1yYW5nZScpO1xuICAgICAgICAgICAgcmFuZ2UudHlwZSA9ICdyYW5nZSc7XG4gICAgICAgICAgICByYW5nZS5taW4gPSAnMCc7XG4gICAgICAgICAgICByYW5nZS5tYXggPSAnMTAwJztcbiAgICAgICAgICAgIHJhbmdlLnZhbHVlID0gcmFuZ2VHcm91cFtyYW5nZUtleV0uaW5pdGlhbFZhbHVlKCk7XG4gICAgICAgICAgICBpZiAocmFuZ2VHcm91cFtyYW5nZUtleV0ub25jaGFuZ2UpXG4gICAgICAgICAgICAgICAgcmFuZ2Uub25jaGFuZ2UgPSBmdW5jdGlvbiAoZSkgeyByZXR1cm4gcmFuZ2VHcm91cFtyYW5nZUtleV0ub25jaGFuZ2UoZSk7IH07XG4gICAgICAgICAgICBpZiAocmFuZ2VHcm91cFtyYW5nZUtleV0ub25pbnB1dClcbiAgICAgICAgICAgICAgICByYW5nZS5vbmlucHV0ID0gZnVuY3Rpb24gKGUpIHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgcmFuZ2VHcm91cFtyYW5nZUtleV0ub25pbnB1dChlKTsgfTtcbiAgICAgICAgICAgIHRkMS5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICAgICAgICB0ZDIuYXBwZW5kQ2hpbGQocmFuZ2UpO1xuICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGQxKTtcbiAgICAgICAgICAgIHRyLmFwcGVuZENoaWxkKHRkMik7XG4gICAgICAgICAgICBzcGFuLmFwcGVuZENoaWxkKHRyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSk7XG4gICAgfSk7XG4gICAgKF9jID0gY29udHJvbHMuaW5wdXRzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuZm9yRWFjaChmdW5jdGlvbiAoaW5wdXRHcm91cCkge1xuICAgICAgICB2YXIgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XG4gICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnY29udHJvbC1wYW5lbC1ncm91cCcsICdjb250cm9sLXBhbmVsLWlucHV0LWdyb3VwJyk7XG4gICAgICAgIE9iamVjdC5rZXlzKGlucHV0R3JvdXApLmZvckVhY2goZnVuY3Rpb24gKGlucHV0S2V5KSB7XG4gICAgICAgICAgICB2YXIgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICAgICAgdmFyIHRkMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgICAgICB2YXIgdGQyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgICAgIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBsYWJlbC5jbGFzc0xpc3QuYWRkKCdjb250cm9sLXBhbmVsLWxhYmVsJywgJ2NvbnRyb2wtcGFuZWwtaW5wdXQtbGFiZWwnKTtcbiAgICAgICAgICAgIGxhYmVsLmlubmVySFRNTCA9IGlucHV0S2V5O1xuICAgICAgICAgICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoJ2NvbnRyb2wtcGFuZWwtaW5wdXQnKTtcbiAgICAgICAgICAgIGlucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGlucHV0R3JvdXBbaW5wdXRLZXldLmluaXRpYWxWYWx1ZSgpO1xuICAgICAgICAgICAgaWYgKGlucHV0R3JvdXBbaW5wdXRLZXldLm9uY2hhbmdlKVxuICAgICAgICAgICAgICAgIGlucHV0Lm9uY2hhbmdlID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGlucHV0R3JvdXBbaW5wdXRLZXldLm9uY2hhbmdlKGUpOyB9O1xuICAgICAgICAgICAgaWYgKGlucHV0R3JvdXBbaW5wdXRLZXldLm9uaW5wdXQpXG4gICAgICAgICAgICAgICAgaW5wdXQub25pbnB1dCA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBpbnB1dEdyb3VwW2lucHV0S2V5XS5vbmlucHV0KGUpOyB9O1xuICAgICAgICAgICAgdGQxLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICAgICAgICAgIHRkMi5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZDEpO1xuICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGQyKTtcbiAgICAgICAgICAgIHNwYW4uYXBwZW5kQ2hpbGQodHIpO1xuICAgICAgICB9KTtcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKTtcbiAgICB9KTtcbiAgICAoX2QgPSBjb250cm9scy5jaGVja2JveGVzKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuZm9yRWFjaChmdW5jdGlvbiAoY2hlY2tib3hHcm91cCkge1xuICAgICAgICB2YXIgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XG4gICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnY29udHJvbC1wYW5lbC1ncm91cCcsICdjb250cm9sLXBhbmVsLWNoZWNrYm94LWdyb3VwJyk7XG4gICAgICAgIE9iamVjdC5rZXlzKGNoZWNrYm94R3JvdXApLmZvckVhY2goZnVuY3Rpb24gKGNoZWNrYm94S2V5KSB7XG4gICAgICAgICAgICB2YXIgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICAgICAgdmFyIHRkMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgICAgICB2YXIgdGQyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgICAgIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBsYWJlbC5jbGFzc0xpc3QuYWRkKCdjb250cm9sLXBhbmVsLWxhYmVsJywgJ2NvbnRyb2wtcGFuZWwtY2hlY2tib3gtbGFiZWwnKTtcbiAgICAgICAgICAgIGxhYmVsLmlubmVySFRNTCA9IGNoZWNrYm94S2V5O1xuICAgICAgICAgICAgdmFyIGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGNoZWNrYm94LmNsYXNzTGlzdC5hZGQoJ2NvbnRyb2wtcGFuZWwtY2hlY2tib3gnKTtcbiAgICAgICAgICAgIGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IGNoZWNrYm94R3JvdXBbY2hlY2tib3hLZXldLmluaXRpYWxWYWx1ZSgpO1xuICAgICAgICAgICAgY2hlY2tib3gub25pbnB1dCA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBjaGVja2JveEdyb3VwW2NoZWNrYm94S2V5XS5vbmlucHV0KGUpOyB9O1xuICAgICAgICAgICAgdGQxLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICAgICAgICAgIHRkMi5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZDEpO1xuICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGQyKTtcbiAgICAgICAgICAgIHNwYW4uYXBwZW5kQ2hpbGQodHIpO1xuICAgICAgICB9KTtcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuc2V0Q29udHJvbHMgPSBzZXRDb250cm9scztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1aV8xID0gcmVxdWlyZShcIi4vZW5naW5lL3VpXCIpO1xudmFyIHBsYW5lXzEgPSByZXF1aXJlKFwiLi9lbmdpbmUvcGxhbmVcIik7XG52YXIgVmVjdG9yMkQgPSByZXF1aXJlKFwiLi9lbmdpbmUvYXVnbWVudGVkLXZlY3RvclwiKTtcbnZhciBFZGdlMkQgPSByZXF1aXJlKFwiLi9lbmdpbmUvYXVnbWVudGVkLWVkZ2VcIik7XG52YXIgZW5naW5lXzEgPSByZXF1aXJlKFwiLi9lbmdpbmUvZW5naW5lXCIpO1xudmFyIEJhbGwgPSByZXF1aXJlKFwiLi9lbmdpbmUvYXVnbWVudGVkLWJhbGxcIik7XG5mdW5jdGlvbiBkcmF3KHN0YXRlKSB7XG4gICAgc3RhdGUucGxhbmUuY2xlYXIoc3RhdGUuY3R4KTtcbiAgICBzdGF0ZS5wbGFuZS5kcmF3R3JpZChzdGF0ZS5jdHgpO1xuICAgIC8vc3RhdGUucGxhbmUuZHJhd0F4ZXMoc3RhdGUuY3R4KTtcbiAgICBzdGF0ZS5lbmdpbmUuZ2V0RWxlbWVudHMoKS5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7IGUuZHJhdyhzdGF0ZS5jdHgsIHN0YXRlLnBsYW5lKTsgfSk7XG4gICAgc3RhdGUuZW5naW5lLmdldEFjdG9ycygpLmZvckVhY2goZnVuY3Rpb24gKGUpIHsgZS5kcmF3KHN0YXRlLmN0eCwgc3RhdGUucGxhbmUpOyB9KTtcbiAgICBzdGF0ZS5hZGRpdGlvbmFsUmVuZGVycy5mb3JFYWNoKGZ1bmN0aW9uIChhcikgeyByZXR1cm4gYXIuZWxlbWVudC5kcmF3KHN0YXRlLmN0eCwgc3RhdGUucGxhbmUpOyB9KTtcbn1cbmZ1bmN0aW9uIGdvKHN0YXRlLCB0KSB7XG4gICAgdmFyIF9hO1xuICAgIHZhciB0aW1lID0gRGF0ZS5ub3coKTtcbiAgICB2YXIgZHQgPSAodGltZSAtIHQpIC8gMTAwMC4wO1xuICAgIHN0YXRlLmFkZGl0aW9uYWxSZW5kZXJzLmZvckVhY2goZnVuY3Rpb24gKHIpIHsgcmV0dXJuIHIudHRsIC09IGR0OyB9KTtcbiAgICBzdGF0ZS5hZGRpdGlvbmFsUmVuZGVycyA9IHN0YXRlLmFkZGl0aW9uYWxSZW5kZXJzLmZpbHRlcihmdW5jdGlvbiAocikgeyByZXR1cm4gci50dGwgPiAwOyB9KTtcbiAgICAoX2EgPSBzdGF0ZS5hZGRpdGlvbmFsUmVuZGVycykucHVzaC5hcHBseShfYSwgKHN0YXRlLmVuZ2luZS5tb3ZlQWN0b3JzKGR0KS5tYXAoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIHsgZWxlbWVudDogZSwgdHRsOiA1IH07IH0pKSk7XG4gICAgdmFyIHdjID0gc3RhdGUucGxhbmUuc2NyZWVuVG9Xb3JsZENvb3JkaW5hdGVzKHsgeDogc3RhdGUucGxhbmUubXgsIHk6IHN0YXRlLnBsYW5lLm15IH0pO1xuICAgIHN0YXRlLmVuZ2luZS5nZXRBY3RvcnMoKS5mb3JFYWNoKGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIGEgPSBhO1xuICAgICAgICBhLmF0dHJpYnV0ZXMuaXNIb3ZlcmVkID0gZmFsc2U7XG4gICAgICAgIGlmIChhLndpdGhpbkJvdW5kcyh7IHg6IHdjLngsIHk6IHdjLnkgfSkpIHtcbiAgICAgICAgICAgIGEuYXR0cmlidXRlcy5pc0hvdmVyZWQgPSB0cnVlO1xuICAgICAgICAgICAgLy9zZXRDb250cm9scyhzdGF0ZS51aS5jb250cm9sUGFuZWwsICg8QmFsbD5hKS5jb250cm9scygpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHN0YXRlLmVuZ2luZS5nZXRFbGVtZW50cygpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIGVsID0gZWw7XG4gICAgICAgIGVsLmF0dHJpYnV0ZXMuaXNIb3ZlcmVkID0gZmFsc2U7XG4gICAgICAgIGlmIChlbC53aXRoaW5Cb3VuZHMoeyB4OiB3Yy54LCB5OiB3Yy55IH0pKSB7XG4gICAgICAgICAgICBlbC5hdHRyaWJ1dGVzLmlzSG92ZXJlZCA9IHRydWU7XG4gICAgICAgICAgICAvL3NldENvbnRyb2xzKHN0YXRlLnVpLmNvbnRyb2xQYW5lbCwgKDxFZGdlMkQ+ZWwpLmNvbnRyb2xzKCkpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgZHJhdyhzdGF0ZSk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGdvKHN0YXRlLCB0aW1lKTsgfSk7XG59XG53aW5kb3cubWFpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdWlFbGVtZW50cyA9ICgwLCB1aV8xLmdldFVJRWxlbWVudHMpKCk7XG4gICAgaWYgKHVpRWxlbWVudHMpIHtcbiAgICAgICAgdWlFbGVtZW50cyA9IHVpRWxlbWVudHM7XG4gICAgICAgIHVpRWxlbWVudHMuY2FudmFzLndpZHRoID0gdWlFbGVtZW50cy5jYW52YXMucGFyZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgdWlFbGVtZW50cy5jYW52YXMuaGVpZ2h0ID0gdWlFbGVtZW50cy5jYW52YXMucGFyZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHZhciBib3ggPSBbXG4gICAgICAgICAgICB7IHg6IDIwMCwgeTogMjAwIH0sXG4gICAgICAgICAgICB7IHg6IC0yMDAsIHk6IDIwMCB9LFxuICAgICAgICAgICAgeyB4OiAtMjAwLCB5OiAtMjAwIH0sXG4gICAgICAgICAgICB7IHg6IDIwMCwgeTogLTIwMCB9LFxuICAgICAgICBdO1xuICAgICAgICB2YXIgcGxhbmVfMiA9IG5ldyBwbGFuZV8xLlBsYW5lKHVpRWxlbWVudHMuY2FudmFzKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHsgcGxhbmVfMi5kZWZhdWx0UmVzaXplTGlzdGVuZXIoKTsgfSk7XG4gICAgICAgIHVpRWxlbWVudHMub3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgcGxhbmVfMi5kZWZhdWx0TW91c2VNb3ZlTGlzdGVuZXIoZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB1aUVsZW1lbnRzLm92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBmdW5jdGlvbiAoZSkgeyBwbGFuZV8yLmRlZmF1bHRNb3VzZVdoZWVsTGlzdGVuZXIoZSk7IH0pO1xuICAgICAgICB1aUVsZW1lbnRzLm92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHdjID0gc3RhdGVfMS5wbGFuZS5zY3JlZW5Ub1dvcmxkQ29vcmRpbmF0ZXMoeyB4OiBzdGF0ZV8xLnBsYW5lLm14LCB5OiBzdGF0ZV8xLnBsYW5lLm15IH0pO1xuICAgICAgICAgICAgc3RhdGVfMS5lbmdpbmUuZ2V0QWN0b3JzKCkuZm9yRWFjaChmdW5jdGlvbiAoYSkge1xuICAgICAgICAgICAgICAgIGEgPSBhO1xuICAgICAgICAgICAgICAgIGEuYXR0cmlidXRlcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChhLndpdGhpbkJvdW5kcyh7IHg6IHdjLngsIHk6IHdjLnkgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYS5hdHRyaWJ1dGVzLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgKDAsIHVpXzEuc2V0Q29udHJvbHMpKHN0YXRlXzEudWkuY29udHJvbFBhbmVsLCBhLmNvbnRyb2xzKCkpO1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3RhdGVfMS5lbmdpbmUuZ2V0RWxlbWVudHMoKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgIGVsID0gZWw7XG4gICAgICAgICAgICAgICAgZWwuYXR0cmlidXRlcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChlbC53aXRoaW5Cb3VuZHMoeyB4OiB3Yy54LCB5OiB3Yy55IH0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsLmF0dHJpYnV0ZXMuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAoMCwgdWlfMS5zZXRDb250cm9scykoc3RhdGVfMS51aS5jb250cm9sUGFuZWwsIGVsLmNvbnRyb2xzKCkpO1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFzZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAoMCwgdWlfMS5zZXRDb250cm9scykoc3RhdGVfMS51aS5jb250cm9sUGFuZWwsIHt9KTtcbiAgICAgICAgICAgICAgICBwbGFuZV8yLmRlZmF1bHRNb3VzZUNsaWNrTGlzdGVuZXIoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgY3R4ID0gdWlFbGVtZW50cy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdmFyIHN0YXRlXzEgPSB7XG4gICAgICAgICAgICBjdHg6IGN0eCxcbiAgICAgICAgICAgIHBsYW5lOiBwbGFuZV8yLFxuICAgICAgICAgICAgZW5naW5lOiBuZXcgZW5naW5lXzEuRW5naW5lKChBcnJheSgxMCkuZmlsbChudWxsKS5tYXAoZnVuY3Rpb24gKGIpIHsgcmV0dXJuIG5ldyBCYWxsKHsgeDogMjAwICogKE1hdGgucmFuZG9tKCkgLSAwLjUpLCB5OiAyMDAgKiAoTWF0aC5yYW5kb20oKSAtIDAuNSkgfSwgbmV3IFZlY3RvcjJEKHsgeDogMjAwICogKE1hdGgucmFuZG9tKCkgLSAwLjUpLCB5OiAyMDAgKiAoTWF0aC5yYW5kb20oKSAtIDAuNSkgfSwgeyBjb2xvcjogMHhmZjAwZmZmZiB9KSwgbmV3IFZlY3RvcjJEKHsgeDogMCwgeTogMCB9KSwgMTAgKiAoTWF0aC5yYW5kb20oKSkgKyAxMCwgMjAgKiAoTWF0aC5yYW5kb20oKSksIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogMHgwMDAwMDBmZiB8IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNjc3NzIxNikgPDwgOCksXG4gICAgICAgICAgICAgICAgaGlkZVZlbG9jaXR5VmVjdG9yOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhpZGVBY2NlbGVyYXRpb25WZWN0b3I6IHRydWVcbiAgICAgICAgICAgIH0pOyB9KSksIFtcbiAgICAgICAgICAgICAgICBuZXcgRWRnZTJEKGJveFswXSwgYm94WzFdLCB7IGNvbG9yOiAweDAwMDAwMGZmLCB0aGlja25lc3M6IDEgfSksXG4gICAgICAgICAgICAgICAgbmV3IEVkZ2UyRChib3hbMV0sIGJveFsyXSwgeyBjb2xvcjogMHgwMDAwMDBmZiwgdGhpY2tuZXNzOiAxIH0pLFxuICAgICAgICAgICAgICAgIG5ldyBFZGdlMkQoYm94WzJdLCBib3hbM10sIHsgY29sb3I6IDB4MDAwMDAwZmYsIHRoaWNrbmVzczogMSB9KSxcbiAgICAgICAgICAgICAgICBuZXcgRWRnZTJEKGJveFszXSwgYm94WzBdLCB7IGNvbG9yOiAweDAwMDAwMGZmLCB0aGlja25lc3M6IDEgfSlcbiAgICAgICAgICAgIF0uY29uY2F0KChBcnJheSg1KS5maWxsKG51bGwpLm1hcChmdW5jdGlvbiAoZSkgeyByZXR1cm4gbmV3IEVkZ2UyRCh7IHg6IDQwMCAqIChNYXRoLnJhbmRvbSgpIC0gMC41KSwgeTogNDAwICogKE1hdGgucmFuZG9tKCkgLSAwLjUpIH0sIHsgeDogNDAwICogKE1hdGgucmFuZG9tKCkgLSAwLjUpLCB5OiA0MDAgKiAoTWF0aC5yYW5kb20oKSAtIDAuNSkgfSwgeyBjb2xvcjogMHgwMDAwMDBmZiwgdGhpY2tuZXNzOiAxIH0pOyB9KSkpKSxcbiAgICAgICAgICAgIGFkZGl0aW9uYWxSZW5kZXJzOiBbXSxcbiAgICAgICAgICAgIHVpOiB1aUVsZW1lbnRzXG4gICAgICAgIH07XG4gICAgICAgIGdvKHN0YXRlXzEsIERhdGUubm93KCkpO1xuICAgIH1cbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=