this.CAL = this.CAL || {};

this.CAL.graphics = this.CAL.graphics || {};

(function(undefined) {
	"use strict";
	
	var DisplayObject = function() {
		DisplayObject.super.forEach(function(base) { base.call(this); });	
		this._location = CAL.graphics.Vector2(0, 0);
		this._size = CAL.graphics.Vector2(0, 0);
	}
	
	CAL.lang.extend(DisplayObject, [CAL.lang.IUpdateableObject, CAL.graphics.IDrawableObject]);
	
	var p = DisplayObject.prototype;
	
	p.getAttributes = function() {
		return  {
			location: this.getLocation(),
			size: this.getSize()
		};
	}
	
	p.getLocation = function() {
		return this._location;
	}
	
	p.getX = function() {
		return this._location.x;
	}
	
	p.getY = function() {
		return this._location.y;
	}
	
	p.setLocation = function(x, y) {
		if (typeof y === "undefined") {
			this._location = CAL.graphics.Vector2(x.x, x.y);
			return;
		}
		this._location = CAL.graphics.Vector2(x, y);
	}
	
	p.setX = function(x) {
		this._location.x = x;
	}
	
	p.setY = function(y) {
		this._location.y = y;
	}
	
	p.getSize = function() {
		return this._size;
	}
	
	p.getWidth = function() {
		return this._size.x;
	}
	
	p.getHeight = function() {
		return this._size.y;
	}
	
	p.setSize = function(w, h) {
		if (typeof h === "undefined") {
			this.setWidth(w.x || w.width);
			this.setHeight(w.y || w.height);
			return;
		}
		this.setWidth(w);
		this.setHeight(h);
	}
	
	p.scale = function(x, y) {
		this.setSize(this.getWidth() * x, this.getHeight() * y);
	}
	
	p.setWidth = function(w) {
		this._size.x = w;
	}
	
	p.setHeight = function(h) {
		this._size.y = h;
	}
	
	p.translate = function(x, y) {
		if (typeof y === "undefined") {
			y = x.y;
			x = x.x;
		}
		if (x == 0 && y == 0) {
			return;
		}
		var l = this.getLocation();
		this.setLocation(l.x + x, l.y + y);
	}
	
	p.draw = function(params) {
	}
	
	CAL.graphics.DisplayObject = DisplayObject;
	
})();