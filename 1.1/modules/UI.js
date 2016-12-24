/**
 * @module UI
 * @description User Interfaces and stuff
 * @version 1.0
 * @since 1.1
 * @license MIT
 * @author Maximilian Berkmann <maxieberkmann@gmail.com>
 * @copyright Maximilian Berkmann 2016
 * @requires module:essence
 * @requires Maths
 * @type {Module}
 * @exports UI
 */
var UI = new Module("UI", "UI stuff", ["Maths", "DOM"]);

/* eslint no-undef: 0 */
/**
 * @description Resize the window to maximum size of the client/screen/device with the support of ActiveX, Java (mainly Processing) and VBS
 * @returns {undefined}
 * @since 1.0
 * @func
 * @throws {Error} Impossible to maximise the size
 */
function toMaxSize () {
	try {
		if (clientWidth || ActiveX || ActiveXObject) window.resizeTo(clientWidth, clientHeight);
		else if (client.Width) window.resizeTo(client.Width, client.Height);
		else if (client.width) window.resizeTo(client.width, client.height);
		else if (clientX) window.resizeTo(clientX, clientY);
		else if (client.X) window.resizeTo(client.X, client.Y);
		else if (client.x) window.resizeTo(client.x, client.y);
		else if (screenWidth) window.resizeTo(screenWidth, screenHeight);
		else if (screen.Width) window.resizeTo(screen.Width, screen.Height);
		else if (screen.width) window.resizeTo(screen.width, screen.height);
		else if (screenX) window.resizeTo(screenX, screenY);
		else if (screen.X) window.resizeTo(screen.X, screen.Y);
		else if (screen.x) window.resizeTo(screen.x, screen.y);
		else if (deviceWidth) window.resizeTo(deviceWidth, deviceHeight);
		else if (device.Width) window.resizeTo(device.Width, device.Height);
		else if (device.width) window.resizeTo(device.width, device.height);
		else if (deviceX) window.resizeTo(deviceX, deviceY);
		else if (device.X) window.resizeTo(device.X, device.Y);
		else if (device.x) window.resizeTo(device.x, device.y);
		else if (pageWidth) window.resizeTo(pageWidth, pageHeight);
		else if (page.Width) window.resizeTo(page.Width, page.Height);
		else if (page.width) window.resizeTo(page.width, page.height);
		else if (pageX) window.resizeTo(pageX, pageY);
		else if (page.X) window.resizeTo(page.X, page.Y);
		else if (page.x) window.resizeTo(page.x, page.y);
		else if (windowWidth) window.resizeTo(windowWidth, windowHeight);
		else if (window.Width) window.resizeTo(window.Width, window.Height);
		else if (window.width) window.resizeTo(window.width, window.height);
		else if (windowX) window.resizeTo(windowX, windowY);
		else if (window.X) window.resizeTo(window.X, window.Y);
		else if (window.x) window.resizeTo(window.x, window.y);
		else if (monitorWidth) monitor.resizeTo(monitorWidth, monitorHeight);
		else if (monitor.Width) monitor.resizeTo(monitor.Width, monitor.Height);
		else if (monitor.width) monitor.resizeTo(monitor.width, monitor.height);
		else if (monitorX) monitor.resizeTo(monitorX, monitorY);
		else if (monitor.X) monitor.resizeTo(monitor.X, monitor.Y);
		else if (monitor.x) monitor.resizeTo(monitor.x, monitor.y);
		else if (frameWidth) frame.resizeTo(frameWidth, frameHeight);
		else if (frame.Width) frame.resizeTo(frame.Width, frame.Height);
		else if (frame.width) frame.resizeTo(frame.width, frame.height);
		else if (frameX) frame.resizeTo(frameX, frameY);
		else if (frame.X) frame.resizeTo(frame.X, frame.Y);
		else if (frame.x) frame.resizeTo(frame.x, frame.y);
		else { //noinspection ExceptionCaughtLocallyJS
			throw new Error("It's not possible to maximise the size or you need to do more researches.");
		}
	} catch(e) {
		Essence.say("An error occurred when trying to maximise the size Because of %c" + e, "err", "text-decoration: underline;");
	}
}

/**
 * @description Dimension of the screen
 * @returns {number[]} Screen dimensions
 * @since 1.0
 * @func
 */
function getScreenDim () {
	return [screen.width, screen.height]
}

/**
 * @description Dimension of the window
 * @returns {number[]} Window dimensions
 * @since 1.0
 * @func
 */
function getWinDim () {
	return [screen.availWidth, screen.availHeight]
}

/**
 * @description Colour (Processing's style)
 * @param {number} [r=0] Red
 * @param {number} [g=0] Green
 * @param {number} [b=0] Blue
 * @param {number} [a=255] Alpha
 * @returns {Colour} Colour
 * @this Colour
 * @constructor
 * @since 1.0
 * @func
 * @property {function(...number)} Colour.constructor Constructor
 * @property {NumberLike} Colour.red Red
 * @property {NumberLike} Colour.green Green
 * @property {NumberLike} Colour.blue Blue
 * @property {NumberLike} Colour.alpha Alpha (transparency)
 * @property {string} Colour.hex Hex colour
 * @property {string} Colour.rgba RGBA colour
 * @property {Function} Colour.update Update the HEX/RGBA colours
 * @property {function(): string} Colour.getRGBAPerc RGBA percentage
 * @property {function(): number} Colour.getMaxClr Brightest colour shade
 * @property {function(): number} Colour.getMinClr Darkest colour shade
 * @property {function(boolean)} Colour.negative Negate all shades
 * @property {Function} Colour.redNegative Negate the red
 * @property {Function} Colour.greenNegative Negate the green
 * @property {Function} Colour.blueNegative Negate the blue
 * @property {function(boolean): string} Colour.rand Randomise the colour
 * @property {function(): string} Colour.toLocaleString String representation
 * @property {function(): string} Colour.toString RGBA string representation
 * @property {function(): number[]} Colour.get RGBA array representation
 * @property {function(number)} Colour.increment Increment all the colour shades
 * @todo Add the getColourName method
 */
function Colour (r, g, b, a) {
	this.constructor = function (r, g, b, a) {
		if (isType(r, "Array") && r.length >= 3 && !g && !b) { //Colour([rad, g, b(, a)])
			this.red = r[0];
			this.green = r[1];
			this.blue = r.last();
			this.alpha = (r.length === 4)? r[3]: 255;
		}else if (!g && !b && r && g != 0 && b != 0) { //Colour(rgb(, a))
			this.red = this.green = this.blue = r;
			this.alpha = (r.length === 2 && isType(r, "Array"))? r[1]: 255;
		}else if (!g && !b && r) { //Colour(rad, 0, 0)
			this.red = r;
			this.green = 0;
			this.blue = 0;
			this.alpha = (r.length === 2)? r[1]: 255;
		}else if (g && !b && r) { //Colour(rad, rad, rad, g)
			this.red = this.green = this.blue = r;
			this.alpha = g;
		} else { //Colour(, g, b(, a))
			this.red = r || 0;
			this.green = g || 0;
			this.blue = b || 0;
			this.alpha = a || 255;
		}
		this.hex = "#" + conv(this.red, 10, 16).toNDigits() + "" + conv(this.green, 10, 16).toNDigits() + "" + conv(this.blue, 10, 16).toNDigits();
		this.rgba = "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")";
	};
	this.constructor(r, g, b, a);
	this.update = function () {
		this.hex = "#" + conv(this.red, 10, 16).toNDigits() + "" + conv(this.green, 10, 16).toNDigits() + "" + conv(this.blue, 10, 16).toNDigits();
		this.rgba = "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")";
	};
	this.getRGBAPerc = function () {
		return "rgba(" + markConv(this.red, 255) + "%, " + markConv(this.green, 255) + "%, " + markConv(this.blue, 255) + "%, " + markConv(this.alpha, 255) + "%)"
	};

	this.getMaxClr = function () {
		return Math.max(Math.max(this.red, g), b)
	};

	this.getMinClr = function () {
		return Math.min(Math.min(this.red, g), b)
	};

	this.negative = function (withAlpha) { //Negative mod
		//conv(parseInt(conv("EE", 16)) + parseInt(conv(11, 16)), 10, 16)= "FF" = 255 (always)
		this.red = 255 - parseInt(this.red);
		this.green = 255 - parseInt(this.green);
		this.blue = 255 - parseInt(this.blue);
		if (withAlpha) this.alpha = 255 - parseInt(this.alpha);
		this.update();
	};

	this.redNegative = function () { //Invert the red
		this.red = 255 - parseInt(this.red);
		this.update();
	};

	this.greenNegative = function () { //Invert the green
		this.green = 255 - parseInt(this.green);
		this.update();
	};

	this.blueNegative = function () {
		this.green = 255 - parseInt(this.green);
		this.update();
	};

	this.rand = function (hex) {
		this.red = randTo(255);
		this.green = randTo(255);
		this.blue = randTo(255);
		this.update();
		return hex? this.hex: this.rgba
	};

	this.toLocaleString = function () {
		return "Colour(rad=" + this.red + ", g=" + this.green + ", b=" + this.blue + ", a=" + this.alpha + ")"
	};

	this.toString = function () {
		return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")"
	};

	this.get = function () {
		return [this.red, this.green, this.blue, this.alpha]
	};

	this.increment = function (i) {
		if (isNon(i)) i = 63.75;
		this.blue += i;
		if (this.blue >= 255) {
			this.blue -= 255;
			this.green += i;
		}
		if (this.green >= 255) {
			this.green -= 255;
			this.red += i;
		}
		this.update();
	};
	//this.getColourName = function()
	return this
}

/**
 * @description Hexadecimal to RGB
 * @param {Str} hex Hexadecimal
 * @param {boolean} [toArray=false] Result as an array
 * @returns {?(number[]|string)} RGB equivalent
 * @see module:UI~rgb2hex
 * @since 1.0
 * @func
 */
function hex2rgb (hex, toArray) {
    var _format = function (shade) {
        return parseInt(shade, 16);
    };
	var rgb = isType(hex, "Array")? hex.map(_format): /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(hex).get(1).map(_format);
    return toArray? rgb: "rgb(" + rgb.join(", ") + ")";
}

/**
 * @description RGB to hexadecimal
 * @param {Str} rgb RGB colour
 * @param {boolean} [toArray=false] Result as an array
 * @returns {NumberLike[]|string} Hexadecimal colour
 * @see module:UI~hex2rgb
 * @since 1.0
 * @func
 */
function rgb2hex (rgb, toArray) {
	var clr = isType(rgb, "Array")? rgb: clrToArr(rgb), _format = function (shade) {
		return conv(shade, 10, 16).toNDigits();
    };
	clr = clr.map(_format);
	return toArray? clr: "#" + clr.join("");
}

/**
 * @description RGB to HSL.<br />
 * Inspired by {@link https://codepen.io/pankajparashar/pen/oFzIg|this}.
 * @param {Str} rgb RGB colour
 * @param {boolean} [toArray=false] Result as an array
 * @returns {NumberLike[]|string} HSL colour
 * @see module:UI~hsl2rgb
 * @since 1.1
 * @func
 */
function rgb2hsl (rgb, toArray) {
	var clr = isType(rgb, "Array")? rgb: clrToArr(rgb), h, s, l, _format = function (shade) {
		return (shade * 100 + .5) | 0;
    };
	var r = clr[0] / 255, g = clr[1] / 255, b = clr[2] / 255, max = clr.max(), min = clr.min();
	l = (max + min) / 2;
	if (max === min) h = s = 0; //achromatic
	else {
		var delta = max - min;
        s = l >= .5? delta / (2 - delta): delta / (max + min);

        switch (max) {
            case r: h = ((g - b) / delta) * 60; break;
            case g: h = ((b - r) / delta + 2) * 60; break;
            case b: h = ((r - g) / delta + 4) * 60; break;
        }
        h /= 6;
	}
    return toArray? [_format(h), _format(s) * 100, _format(l) * 100]: "hsl(" + _format(h) + ", " + (_format(s) * 100) + "%, " + (_format(l) * 100) + "%)";
}

/**
 * @description HSL to RGB.<br />
 * Inspired by {@link https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion|Mohsen's}.
 * @param {string} hsl RGB colour
 * @param {boolean} [toArray=false] Result as an array
 * @returns {NumberLike[]|string} HSL colour
 * @see module:UI~rgb2hsl
 * @since 1.1
 * @func
 */
function hsl2rgb (hsl, toArray) {
	var clr = clrToArr(hsl), r, g, b, _format = function (shade) {
        return ((shade - .5) / 100) | 0;
    };
	var h = _format(clr[0]), s = _format(clr[1]), l = _format(clr[2]);
	if (s === 0) r = g = b = 1;
	else {
        var hue2rgb = function (p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < .5) return q;
            if (t < 2 / 3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        var q = l<.5? l * (1 + s): l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3)
	}

	var rgb = [r, g, b].map(function (shade) {
		return Math.min(Math.floor(shade * 256), 255); //Math.round(shade * 255) is less accurate
    });

	return toArray? rgb: "rgb(" + rgb.join(", ") + ")";
}

/**
 * @description RGB to HSV.<br />
 * Inspired by {@link https://web.archive.org/web/20081227003853/http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript|this}.
 * @param {Str} rgb RGB colour
 * @param {boolean} [toArray=false] Result as an array
 * @returns {NumberLike[]|string} HSV colour
 * @see module:UI~hsv2rgb
 * @since 1.1
 * @func
 */
function rgb2hsv (rgb, toArray) {
    var clr = isType(rgb, "Array")? rgb: clrToArr(rgb);
    clr = clr.map(function (shade) {
		return shade / 255;
    });
    var max = clr.max(), min = clr.min();
    var h, s, v = max;

    var delta = max - min;
    s = max === 0? 0: delta / max;

    if (max === min) h = 0; // achromatic
    else {
        switch (max) {
            case r: h = (g - b) / delta + (g < b ? 6 : 0); break;
            case g: h = (b - r) / delta + 2; break;
            case b: h = (r - g) / delta + 4; break;
        }
        h /= 6;
    }

    return toArray? [h, s, v]: "hsv(" + h + ", " + s + "%, " + v + "%)";
}

/**
 * @description HSV to RGB.<br />
 * Inspired by {@link https://web.archive.org/web/20081227003853/http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript|this}.
 * @param {Str} hsv HSV colour
 * @param {boolean} [toArray=false] Result as an array
 * @returns {NumberLike[]|string} RGB colour
 * @see module:UI~rgb2hsv
 * @since 1.1
 * @func
 */
function hsv2rgb (hsv, toArray) {
    var clr = isType(hsv, "Array")? hsv: clrToArr(hsv), r, g, b;

    var i = Math.floor(clr[0] * 6);
    var f = clr[0] * 6 - i, p = clr[2] * (1 - clr[1]);
    var q = clr[2] * (1 - f * clr[1]);
    var t = clr[2] * (1 - (1 - f) * clr[1]);

    switch (i % 6) {
		case 0:
        	r = clr[2];
        	g = t;
        	b = p;
        	break;
        case 1:
        	r = q;
        	g = clr[2];
        	b = p;
        	break;
        case 2:
        	r = p;
        	g = clr[2];
        	b = t;
        	break;
        case 3:
        	r = p;
        	g = q;
        	b = clr[2];
        	break;
        case 4:
        	r = t;
        	g = p;
        	b = clr[2];
        	break;
        case 5:
        	r = clr[2];
        	g = p;
        	b = q;
        	break;
    }

    var rgb = [r, g, b].map(function (shade) {
		return shade * 255;
    });

    return toArray? rgb: "rgb(" + rgb.join(", ") + ")";
}

/**
 * @description Get the colour type of a colour
 * @param {String} clr Colour
 * @return {?String} Colour type (if present)
 * @throws {InvalidExpressionError} Not a valid colour!
 * @since 1.1
 * @func
 */
<<<<<<< HEAD
function getColourType(clr) {
=======
function getColourType (clr) {
>>>>>>> develop
	if (!isValid(clr, "colour")) throw new InvalidExpressionError(clr + " isn't a colour!");
	if (/^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.test(clr)) return "hex";
	var colourNames = [clr.replace(/^(rgb|hsl|hsv|hsb)\(([0-9]+,\s){2}([0-9]+)\)$/, "$1"), clr.replace(/^(rgb|hsl|hsv|hsb)a\(([0-9]+,\s){3}((0|1|)\.[0-9]*)\)$/, "$1")];
	return colourNames[0] != clr? colourNames[0]: (colourNames[1] != clr? colourNames[1]: null);
}

/**
 * @description Switch the colour of the <code>elmt</code>'s attribute (that can be the background/border/font colour of an HTML element and which is in hex form) to it's red/green/blue/yellow/cyan/magenta/full negative version.
 * @param {string} elmt Element to be used
 * @param {string} attr Attribute to be used
 * @param {string} [mod="x"] Mod
 * @returns {undefined}
 * @since 1.0
 * @func
 */
function negateColour (elmt, attr, mod) {
	mod = mod? mod[0].toLowerCase(): "x"; //To accept: rad, R, red, Red, RED; for the red, ...
	var clrs = ($e(elmt).css(attr).indexOf("rgb(") === 0)? clrToArr($e(elmt).css(attr)): hex2rgb($e(elmt).css(attr), true), clr = new Colour();
	if (mod === "rad") {
		clr.red = 255 - parseInt(clrs[0]);
		clr.green = clrs[1];
		clr.blue = clrs[2];
	}else if (mod === "g") {
		clr.red = clrs[0];
		clr.green = 255 - parseInt(clrs[0]);
		clr.blue = clrs[2];
	}else if (mod === "b") {
		clr.red = clrs[0];
		clr.green = clrs[1];
		clr.blue = 255 - parseInt(clrs[2]);
	}else if (mod === "y") {
		clr.red = 255 - parseInt(clrs[0]);
		clr.green = 255 - parseInt(clrs[1]);
		clr.blue = clrs[2];
	}else if (mod === "c") {
		clr.red = clrs[0];
		clr.green = 255 - parseInt(clrs[0]);
		clr.blue = 255 - parseInt(clrs[2]);
	}else if (mod === "m") {
		clr.red = 255 - parseInt(clrs[0]);
		clr.green = clrs[1];
		clr.blue = 255 - parseInt(clrs[2]);
	}else if (mod === "a" || mod === "f" || mod === "width") {
		clr.red = 255 - parseInt(clrs[0]);
		clr.green = 255 - parseInt(clrs[1]);
		clr.blue = 255 - parseInt(clrs[2]);
	} else {
		clr.red = clrs[0];
		clr.green = clrs[1];
		clr.blue = clrs[2];
	}
	clr.update();
	$e(elmt).setCSS(attr, clr.hex)
}

/**
 * @description Get the hexadecimal equivalent of the colour names
 * @param {string} clr Colour name
 * @returns {?string} Hexadecimal equivalent
 * @since 1.0
 * @func
 */
function colourName2Hex (clr) { //Get the hexadecimal equivalent of the colour names
	switch (clr.normal()) {
		case "aqua": return "#00ffff";
		case "cyan": return "#00ffff";
		case "black": return "#000000";
		case "blue": return "#0000ff";
		case "fuchsia": return "#ff00ff";
		case "magenta": return "#f800f8";
		case "gray": return "#808080";
		case "grey": return "#808080";
		case "green": return "#008000";
		case "lime": return "#00ff00";
		case "brown": return "#800000";
		case "maroon": return "#800000";
		case "navy": return "#000080";
		case "olive": return "#808000";
		case "purple": return "#800080";
		case "red": return "#ff0000";
		case "silver": return "#c0c0c0";
		case "teal": return "#008080";
		case "white": return "#ffffff";
		case "yellow": return "#ffff00";
		case "gold": return "#ffd700";
		case "seagreen": return "#2e8b57";
		case "pink": return "#ffc0cb";
		case "skyblue": return "#87ceeb";
		case "coral": return "#ff7f50";
		case "tan": return "#d2b48c";
		case "orange": return "#ffa500";
		case "cream": return "#feffff";
		case "lightgray": return "#d3d3d3";
		case "salmon": return "#fa8072";
		default: return null;
	}
}

/**
 * @description List of all possible RGB colours mod $inc
 * @param {number} [inc=63.75] Increment
 * @param {boolean} [intOnly=false] Only integers
 * @param {boolean} [debug=false] Debug all the elements
 * @returns {Array} RGB list
 * @since 1.0
 * @func
 */
function rgbList (inc, intOnly, debug) {
	var l = [];
	if (isNon(inc)) inc = 63.75;
	for (var r = 0; r < 257; r += inc) {
		for (var g = 0; g < 257; g += inc) {
			for (var b = 0; b < 257; b += inc) {
				if (debug) Essence.sayClr(intOnly? [Math.round(r), Math.round(g), Math.round(b)]: [r, g, b]);
				l.push("rgb(" + (intOnly? [Math.round(r), Math.round(g), Math.round(b)].join(", "): [r, g, b].join(", ")) + ")");
			}
		}
	}
	return l
}

/**
 * @description Shape
 * @param {number} [x=0] X-coordinate
 * @param {number} [y=0] Y-coordinate
 * @param {number} [b=1] Border
 * @param {Vector} [v=new Vector()] Velocity
 * @constructor
 * @namespace
 * @since 1.0
 * @property {number} Shape.x X coordinate
 * @property {number} Shape.y Y coordinate
 * @property {number} Shape.border Border
 * @property {Vector} Shape.vel Velocity
 * @property {Vector} Shape.norm Normal of the velocity
 * @property {Function} Shape.update Update the shape
 * @property {Function} Shape.stop Stop the shape from moving
 * @property {function(): string} Shape.toString String representation
 * @property {function(string): number} Shape.offset Offset
 * @property {function(Vector)} Shape.bounce Bounce the shape off an object
 * @property {function(): Shape} Shape.copy Get a copy of the shape
 * @property {function(number): Shape} Shape.mult Multiply the shape's position
 * @property {function(number): Shape} Shape.div Divide the shape's position
 * @property {function(number): Shape} Shape.add Add to the shape's position
 * @property {function(number): Shape} Shape.sub Sub to the shape's position
 * @property {Function} Shape.draw Draw the shape
 * @property {function(): number} Shape.getSpeed Get the speed
 */
function Shape (x, y, b, v) {
	this.x = x || 0;
	this.y = y || 0;
	this.border = b || 1;
	this.vel = v || new Vector();
	this.norm = this.vel.getNormal();

	this.update = function () {
		this.x += this.vel.x;
		this.y += this.vel.y;
		this.norm = this.vel.getNormal();
	};

	this.stop = function () {
		this.vel = this.norm = new Vector();
	};

	this.toString = function () {
		return "Shape(x = " + this.x + ", y = " + this.y + ", border = " + this.border + ", velocity = " + this.vel + ")"
	};

	this.offset = function (s) {
		return (s === "l") ?  this.x - 1 - this.border: ((s === "rad")? this.x + 1+ this.border: ((s === "u")? this.y - 1 - this.border: this.y + 1 + this.border))
	};

	this.bounce = function (n) {
		this.vel.reflect(n);
	};

	this.copy = function () {
		return new Shape(this.x, this.y, this.border, this.vel)
	};

	this.mult = function (k) {
		this.x *= k;
		this.y *= k;
		return this
	};

	this.div = function (k) {
		this.x /= k;
		this.y /= k;
		return this
	};

	this.add = function (v) {
		this.x += v.x;
		this.y += v.y;
		return this
	};

	this.sub = function (v) {
		this.x -= v.x;
		this.y -= v.y;
		return this
	};

	this.draw = function () {

	};

	this.getSpeed = function () {
		return Math.sqrt(Math.pow(this.vel.x, 2) + Math.pow(this.vel.y, 2))
	};

	return this;
}

/* eslint no-unused-vars: 0 */
/**
 * @description A 2D/3D box
 * @param {number} [x=0] X-coordinate
 * @param {number} [y=0] Y-coordinate
 * @param {number} [z=0] Z-coordinate
 * @param {number} [w=10] Width
 * @param {number} [h=10] Height
 * @param {number} [d=.1] Depth
 * @param {number} [bsz=1] Border size
 * @param {string} [bclr="#000"] Border colour
 * @param {string} [clr="#fff"] Background colour
 * @param {number} [brd=0] Border radius
 * @returns {Box} Box
 * @todo Work on draw(), erase(), rot() and translate()
 * @this Box
 * @constructor
 * @since 1.0
 * @property {number} Box.x X coordinate
 * @property {number} Box.y Y coordinate
 * @property {number} Box.z Z coordinate
 * @property {number} Box.width Width
 * @property {number} Box.height Height
 * @property {number} Box.depth Depth
 * @property {number} Box.borderSize Border size
 * @property {string} Box.borderColor Border colour
 * @property {number} Box.borderRadius Border radius
 * @property {string} Box.color Colour of the box
 * @property {function(...number)} Box.rot Rotate the box
 * @property {function(...number)} Box.translate Translate the box
 * @property {function(): string} Box.toString String representation
 * @property {Function} Box.draw Draw the box
 * @property {Function} Box.erase Erase the box
 * @todo Fix Box.rot
 */
function Box (x, y, z, w, h, d, bsz, bclr, clr, brd) {
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	this.width = w || 10;
	this.height = h || 10;
	this.depth = d || .1;
	this.borderSize = bsz || 1;
	this.borderColor = bclr || "#000";
	this.borderRadius = brd || 0;
	this.color = clr || "#fff";
	this.ratio = (this.height / this.width).toNDigits();
	//noinspection JSUnusedGlobalSymbols
	this.ratio3d = [this.ratio, this.height / non0(this.depth), this.width / non0(this.depth)].mean(4);
	var self = this;
	this.draw = function () {
        runCanvas(function (context) {
			context.fillStyle = self.color;
			context.strokeStyle = self.borderColor;
			context.lineWidth = self.borderSize;
			context.fill();
			context.stroke();
			context.beginPath();
			context.rect(self.x, self.y, self.width, self.height);
			context.closePath();
        })
	};
	this.erase = function () {
		runCanvas(function (context) {
			context.clearRect(self.x - self.borderSize, self.y - self.borderSize, self.width + self.borderSize + 1, self.height + self.borderSize + 1);
		})
	};
	/* eslint no-undef: 0 */
	this.rot = function (alpha, beta, theta) { //Rotation
		runCanvas(function (context) {
			context.rotate(alpha);
		})
	};
    this.translate = function (px, py) {
        runCanvas(function (context) {
			context.translate(px, py);
		})
	};
	this.toString = function () {
		return "Box(x=" + this.x + ", y=" + this.y + ", z=" + this.z + ", width=" + this.width + ", height=" + this.height + ", depth=" + this.depth + ", borderSize=" + this.borderSize + ", borderColor=" + this.borderColor + ", borderRadius=" + this.borderRadius + ", color=" + this.color + ")"
	};

	return this;
}
/* eslint no-unused-vars: 2 */

AABB.inheritsFrom(Shape);
/**
 * @description Axe Aligned Bounding Box
 * @param {number} [x=0] X-coordinate
 * @param {number} [y=0] Y-coordinate
 * @param {number} [w=10] Width
 * @param {number} [h=10] Height
 * @param {number} [b=1] Border
 * @param {Vector} [v=new Vector()] Velocity
 * @returns {AABB} AABB
 * @this AABB
 * @constructor
 * @inheritdoc
 * @see module:UI~Shape
 * @since 1.0
 * @property {number} AABB.x X coordinate
 * @property {number} ABB.y Y coordinate
 * @property {number} AABB.width Width
 * @property {number} AABB.height Height
 * @property {number} AABB.border Border
 * @property {Vector} AABB.vel Velocity
 * @property {number} AABB.ratio Ratio
 * @property {Vector} AABB.norm Normal of the velocity
 * @property {function(): Pt[]} AABB.getPoints Get the points of the box
 * @property {function(AABB): boolean} AABB.equals Equality check
 * @property {function(): string} AABB.toString String representation
 * @property {function(Shape, string): boolean} AABB.hit Was it hit by something
 * @property {function(): AABB} AABB.copy Get a copy of the AABB
 * @property {function(AABB)} AABB.concat Concat an AABB to it
 * @property {function(AABB)} AABB.deconcat Deconcat an AABB from it
 * @property {Function} AABB.draw Draw the AABB
 * @property {function(): number} AABB.getPerimeter Perimeter of the AABB
 * @property {function(): number} AABB.getArea Area of the AABB
 * @property {function(): number} AABB.getDiag Diagonal of the AABB
 *
 */
function AABB (x, y, w, h, b, v) {
	this.x = x || 0;
	this.y = y || this.x;
	this.width = w || 10;
	this.height = h || this.width;
	this.border = b || 1;
	this.vel = v || new Vector();
	this.ratio = this.height / this.width;
	this.norm = this.vel.getNormal();
	var self = this;

	this.getPoints = function () {
		return [new Pt(this.x, this.y), new Pt(this.x + this.width, this.y), new Pt(this.x + this.width, this.y + this.height), new Pt(this.x, this.y + this.height)]
	};

	this.equals = function (a) {
		return this.x == a.x && this.y == a.y && this.width == a.width && this.height == a.height && this.border == a.border && this.vel.equals(a.vel)
	};

	this.toString = function () {
		return "AABB(x=" + this.x + ", y=" + this.y + ", width=" + this.width + ", height=" + this.height + ", velocity=" + this.vel.toString() + ", border=" + this.border + ")"
	};

	this.hit = function (obj, s) {
		return (s === "l")?  obj.offset("l") <= this.width: ((s === "r")? obj.offset("rad") >= this.x: ((s === "u")? obj.offset("u") <= this.height: ((s === "d")? obj.offset("d") >= this.y: (this.hit(obj, "l") || this.hit(obj, "rad") || this.hit(obj, "u") || this.hit(obj, "d")))))
	};

	this.copy = function () {
		return new AABB(this.x, this.y, this.width, this.height, this.border, this.vel)
	};

	this.concat = function (a) {
		this.width = a.x - this.x - this.width; //Or width + a.x + a.width
		this.height = a.y - this.y - this.height; //Or height + a.y + a.height
	};

	this.deconcat = function (a) {
		this.width = (a.x - this.x) / 2; //(a.x + a.width)/2
		this.height = (a.y - this.y) / 2; //(a.y + a.height)/2
	};

	this.draw = function () {
		runCanvas(function (context) {
			context.lineWidth = self.border;
			context.fill();
			context.stroke();
			context.beginPath();
			context.rect(self.x, self.y, self.width, self.height);
			context.closePath();
		})
	};

	this.getPerimeter = function () {
		return 2 * this.width + 2 * this.height
	};

	this.getArea = function () {
		return this.width * this.height
	};

	this.getDiag = function () { //Diagonal
		return Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2))
	};

	return this;
}

Circ.inheritsFrom(Shape);
/**
 * @description Circle
 * @param {number} [x=0] X-coordinate
 * @param {number} [y=0] Y-coordinate
 * @param {number} [r=10] Radius
 * @param {number} [b=1] Border
 * @param {Vector} [v=new Vector()] Velocity
 * @returns {Circ} Circle
 * @this Circ
 * @constructor
 * @see module:UI~Shape
 * @since 1.0
 * @inheritdoc
 * @property {number} Circ.x X coordinate
 * @property {number} Circ.y Y coordinate
 * @property {number} Circ.rad Radius
 * @property {number} Circ.border Border
 * @property {Vector} Circ.vel Velocity
 * @property {Vector} Circ.norm Normal of the velocity
 * @property {function(): string} Circ.toString String representation
 * @property {function(string): number} Circ.offset Offset
 * @property {function(Shape, string): boolean} Circ.hit Was the circle hit by something ?
 * @property {Function} Circ.draw Draw the shape
 * @property {function(Circ): boolean} Circ.equals Equality check
 * @property {function(): number} Circ.getCircumference Circumference
 */
function Circ (x, y, r, b, v) {
	this.x = x || 0;
	this.y = y || 0;
	this.rad = r || 10;
	this.border = b || 1;
	this.vel = v || new Vector();
	this.norm = this.vel.getNormal();
	var self = this;

	this.offset = function (s) {
		return (s === "l")?  this.x - this.rad: ((s === "r")? this.x + this.rad: ((s === "u")? this.y - this.rad: this.y + this.rad))
	};

	this.equals = function (a) {
		return this.x === a.x && this.y === a.y && this.rad === a.rad && this.border === a.border && this.vel.equals(a.vel)
	};

	this.toString = function () {
		return "Circ(x=" + this.x + ", y=" + this.y + ", radius=" + this.rad + ", velocity=" + this.vel.toString() + ")"
	};

	this.hit = function (obj, s) { //More like a getHit(obj) but for also circle/circle situations
		if (obj.hit(this, s || "")) {
			this.vel.bounce(obj.norm);
			this.vel.update();
			return true
		} return false
	};

	this.draw = function () {
		runCanvas(function (context) {
			context.lineWidth = self.border;
			context.fill();
			context.stroke();
			context.beginPath();
			context.arc(self.x, self.y, self.rad, 0, 2 * Math.PI);
			context.closePath();
		})
	};

	this.getCircumference = function () {
		return 2 * this.rad * Math.PI
	};

	return this;
}

Pt.inheritsFrom(Shape);
/**
 * @description Point
 * @param {number} [x=0] X-coordinate
 * @param {number} [y=0] Y-coordinate
 * @returns {Pt} Point
 * @this Pt
 * @see module:UI~Shape
 * @constructor
 * @since 1.0
 * @inheritdoc
 * @property {number} Pt.x X coordinate
 * @property {number} Pt.y Y coordinate
 * @property {Vector} Pt.vel Velocity
 * @property {function(Pt): boolean} Pt.equals Equality check
 * @property {function(): string} Pt.toString String representation
 */
function Pt (x, y) {
	this.x = x || 0;
	this.y = y || 0;
	this.vel = new Vector();

	this.equals = function (p) {
		return this.x === p.x && this.y === p.y
	};

	this.toString = function () {
		return "Pt(x=" + this.x + ", y=" + this.y + ")"
	};

	return this;
}

Line.inheritsFrom(Shape);
/**
 * @description Line
 * @param {number[]} a Starting point
 * @param {number[]} b Ending point
 * @returns {Line} Line
 * @this Line
 * @see module:UI~Shape
 * @constructor
 * @since 1.0
 * @inheritdoc
 * @property {Pt} Line.start Starting point
 * @property {Pt} Line.end Ending point
 * @property {function(Line): boolean} Line.equals Equality check
 * @property {function(): string} Line.toString String representation
 */
function Line (a, b) {
	this.start = a;
	this.end = b;
	var self = this;

	this.equals = function (l) {
		return this.start.equals(l.start) && this.end.equals(l.end)
	};

	this.toString = function () {
		return "Line(start=" + this.start.toString() + ", end=" + this.end.toString() + ")"
	};

	this.draw = function () {
		runCanvas(function (context) {
			context.lineWidth = 1;
			context.fill();
			context.stroke();
			context.beginPath();
			context.lineTo(self.start.x, self.start.y);
			context.lineTo(self.end.x, self.end.y);
			context.closePath();
		})
	};

	return this;
}

Vector.inheritsFrom(Shape);
/**
 * @description 2D vector
 * @see module:UI~Shape
 * @this Vector
 * @param {number} [x=0] X-coordinate
 * @param {number} [y=0] Y-coordinate
 * @returns {Vector} Vector
 * @constructor
 * @since 1.0
 * @inheritdoc
 * @property {*} Vector.prototype Prototype
 * @property {number} Vector.x X coordinate
 * @property {number} Vector.y Y coordinate
 * @property {function(Vector): boolean} Vector.equals Equality check
 * @property {function(): string} Vector.toString String representation
 * @property {function(): Vector} Vector.copy Get a copy of the vector
 * @property {Function} Vector.normalise Normalise the vector
 * @property {function(): Vector} Vector.getNormal Get the normal of the vector
 * @property {function(): Vector} Vector.zero Null vector
 * @property {function(): Vector} Vector.neg Negate the vector
 * @property {function(number): Vector} Vector.mult Multiply this vector by a scalar
 * @property {function(number): Vector} Vector.div Divide this vector by a scalar
 * @property {function(Vector): Vector} Vector.add Add two vectors together
 * @property {function(number): Vector} Vector.addScalar Add a scalar to the vector
 * @property {function(Vector): Vector} Vector.sub Subtract two vectors
 * @property {function(Vector): number} Vector.dot Dot/scalar product
 * @property {function(Vector): number} Vector.cross Cross/vector product
 * @property {function(): number} Vector.lenSq Length squared
 * @property {function(): number} Vector.length Length
 * @property {function(Vector): Vector} Vector.reflect Reflect the vector on a something
 * @property {function(Vector): number} Vector.angle Angle between two vector
 */
function Vector (x, y) {
	this.prototype = Shape.prototype; //To avoid bugs
	this.x = x || 0;
	this.y = y || 0;

	this.toString = function () {
		return "Vector(x=" + this.x + ", y=" + this.y + ")"
	};

	this.equals = function (v) {
		return this.x == v.x && this.y == v.y
	};

	this.copy = function () {
		return new Vector(this.x, this.y)
	};

	this.normalise = function () {
		var v = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
		this.x /= v;
		this.y /= v;
	};

	this.getNormal = function () {
		return new Vector(this.x / Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)), this.y / Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)))
	};

	this.zero = function () {
		this.x = this.y = 0;
		return this
	};

    this.mult = function (k) {
        this.x *= k;
        this.y *= k;
        return this
    };

    this.div = function (k) {
        this.x /= k;
        this.y /= k;
        return this
    };

    this.addScalar = function (k) {
        this.x += k;
        this.y += k;
        return this
    };

    this.add = function (v) {
        this.x += v.x;
        this.y += v.y;
        return this
    };

    this.sub = function (v) {
        this.x -= v.x;
        this.y -= v.y;
        return this
    };

	this.neg = function () {
		this.x = -this.x;
		this.y = -this.y;
		return this
	};

	this.dot = function (v) {
		return this.x * v.x + this.y * v.y
	};

	this.cross = function (v) {
		return this.x * v.y - this.y * v.x
	};

	this.lenSq = function () {
		return Math.pow(this.x, 2) + Math.pow(this.y, 2)
	};

	this.length = function () {
		return Math.sqrt(this.lenSq())
	};

	this.reflect = function (normal) { //.. on a normal
		var n = normal || this.getNormal().copy();
		n.mult(2 * this.dot(normal || this.getNormal()));
		this.sub(n);
		return this
	};

	this.angle = function (v) {
		return Math.acos((this.x * v.x + this.y * v.y)/(this.length() * v.length()))
	};

	return this;
}

Polygon.inheritsFrom(Shape);
/**
 * @description Polygon
 * @this Polygon
 * @see module:UI~Shape
 * @param {Array} pts Points
 * @param {number} [b=1] Border
 * @param {Vector} [v=new Vector()] Velocity
 * @returns {Polygon} Polygon
 * @constructor
 * @since 1.0
 * @inheritdoc
 * @property {Pt[]} Polygon.points Points
 * @property {number} Polygon.border Border
 * @property {Vector} Polygon.vel Velocity
 * @property {Vector} Polygon.norm Normal
 * @property {function(Polygon): boolean} Polygon.equals Equality check
 * @property {function(): string} Polygon.toString String representation
 * @property {function(Shape, string): boolean} Polygon.hit Was it hit by something ?
 * @property {function(): Polygon} Polygon.copy Get a copy of the polygon
 * @property {Function} Polygon.draw Draw the polygon
 */
function Polygon (pts, b, v) {
	this.points = pts;
	this.border = b || 1;
	this.vel = v || new Vector();
	this.norm = this.vel.getNormal();
	var self = this;

	this.equals = function (a) {
		var eq = true;
		for (var p in this.points) {
			if (this.points.hasOwnProperty(p) && a.points.hasOwnProperty(p)) eq = eq && this.points[p].equals(a.points[p]);
		}
		return eq && this.border === a.border && this.vel.equals(a.vel)
	};

	this.toString = function () {
		var ptStr = "[";
		for (var p in this.points) {
			if (this.points.hasOwnProperty(p)) ptStr += this.points[p].toString() + ", ";
		}
		ptStr += "]";
		return "Polygon(points=" + ptStr + ", velocity=" + this.vel.toString() + ", border=" + this.border + ")"
	};

	this.hit = function (obj, s) {
		return (s === "l")?  obj.offset("l") <= this.offset("rad"): ((s === "rad")? obj.offset("rad") >= this.offset("l"): ((s === "u")? obj.offset("u") <= this.offset("d"): ((s === "d")? obj.offset("d") >= this.offset("u"): (this.hit(obj, "l") || this.hit(obj, "rad") || this.hit(obj, "u") || this.hit(obj, "d")))))
	};

	this.copy = function () {
		return new Polygon(this.points, this.border, this.vel)
	};

	this.draw = function () {
		runCanvas(function (context) {
			context.lineWidth = 1;
			context.fill();
			context.stroke();
			context.beginPath();
			self.points.map(function (point) {
				context.lineTo(point.x, point.y);
			});
			context.closePath();
		})
	};

	return this;
}

/**
 * @description Message boxes
 * @param {string} type Type
 * @param {string} title Title
 * @param {string} text Text
 * @param {boolean} [isHTML=false] HTML flag
 * @param {Object} style Style
 * @param {string} [customIcon] Custom icon
 * @returns {undefined}
 * @todo Work on it
 * @since 1.0
 * @func
 */
function msgBox (type, title, text, isHTML, style, customIcon) {
	type = type.normal();
	var dS = { //Default style
		borderColor: "#bababa",
		borderSize: "1px",
		borderRadius: 5,
		backgroundColor: "#fbfbfb",
		textColor: "#000",
		textSize: "14px",
		textFont: "Calibrie",
		buttonBorderColor: "#aaa",
		buttonBorderSize: .8,
		buttonBorderRadius: 5,
		buttonColor: "#ccc",
		buttonTextColor: "#000",
		buttonTextSize: "14px",
		buttonText: "OK"
	}, icon = "", alt = "";
	if (type === "info") {
		icon = "img/info.png"; alt = "i";
		dS.borderColor = "#088";
		dS.backgroundColor = "rgba(0,255,255,1)";
		console.info("[Essence.js] " + title + ": " + text);
	} else if (type === "error") {
		icon = "img/error.png"; alt = "x";
		dS.borderColor = "#800";
		dS.backgroundColor = "rgba(255,0,0,1)";
		dS.textColor = "#FFF";
		console.error("[Essence.js] " + title + ": " + text);
	} else if (type === "warning") {
		icon = "img/warning.png"; alt = "/!\\";
		dS.borderColor = "#840";
		dS.backgroundColor = "rgba(255,127,0,1)";
		dS.textColor = "#FFF";
		dS.buttonText = "Got it";
		console.warn("[Essence.js] " + title + ": " + text);
	} else if (type === "question") {
		icon = "img/question.png"; alt = "?";
		dS.borderColor = "#008";
		dS.backgroundColor = "rgba(0,0,255,1)";
		dS.textColor = "#FFF";
		dS.buttonText = "Continue";
		console.log("[Essence.js] " + title + ": " + text + " ?");
	} else if (type === "success") {
		icon = "img/success.png"; alt = "v/";
		dS.borderColor = "#080";
		dS.backgroundColor = "rgba(0,255,0,1)";
		dS.textColor = "#FFF";
		dS.buttonText = "OK";
		console.log("[Essence.js] " + title + ": " + text);
	} else if (type === "load") {
		icon = "img/load.gif"; alt = "o";
		dS.borderColor = "#888";
		dS.backgroundColor = "rgba(255,255,255,1)";
		dS.textColor = "#FFF";
		dS.buttonText = "Continue";
		console.log("[Essence.js] " + title + ": " + text + "...");
	} else if (type === "custom") {
		icon = customIcon; alt = " ";
		if (style.borderColor) dS.borderColor = style.borderColor;
		if (style.borderSize) dS.borderSize = style.borderSize;
		if (style.borderRadius) dS.borderRadius = style.borderRadius;
		if (style.backgroundColor) dS.backgroundColor = style.backgroundColor;
		if (style.textColor) dS.textColor = style.textColor;
		if (style.textSize) dS.textSize = style.textSize;
		if (style.textFont) dS.textFont = style.textFont;
		if (style.buttonBorderColor) dS.buttonBorderColor = style.buttonBorderColor;
		if (style.buttonBorderSize) dS.buttonBorderSize = style.buttonBorderSize;
		if (style.buttonBorderRadius) dS.buttonBorderRadius = style.buttonBorderRadius;
		if (style.buttonColor) dS.buttonColor = style.buttonColor;
		if (style.buttonTextColor) dS.buttonTextColor = style.buttonTextColor;
		if (style.buttonTextSize) dS.buttonTextSize = style.buttonTextSize;
		if (style.buttonText) dS.buttonText = style.buttonText;
		console.log("[Essence.js] " + title + ": " + text);
	} else icon = false;
	var msg = document.createElement("div"), header = document.createElement("span"), ctt = document.createElement("p"), btn = document.createElement("input"), img = "<img src = " + icon + " alt = '" + alt + "' />";

	msg.id = "overlay";
	header.id = "msgBoxHeader";
	ctt.id = "msg";
	btn.id = "msgBoxBtn";
	btn.type = "button";
	btn.value = dS.buttonText;
	img.id = "msgImg";

	if (isHTML) {
		header.innerHTML = title;
		ctt.innerHTML = text;
	} else {
		header.innerText = title;
		ctt.innerText = text;
	}
	if ($e("#overlay").isEmpty()) {
		Essence.handleError("The #overlay element is voided", "essence.js", 1336);
		$e("#overlay").write("<div id = 'overlay'></div>", true);
		if (!$n("#overlay")) document.body.appendChild(document.createElement("div").id = "overlay")
	}
	$e("#overlay").setStyles(["visibility", "hidden", "position", "absolute", "left", 0, "top", 0, "width", "100 % ", "height", "100 % ", "text-align", "center", "z-index", "1000", "background", "rgba(127,127,127,.5)"]);
	$e("div#overlay").setStyles(["width", "300px", "margin", "100px auto", "background", dS.backgroundColor, "border", dS.borderSize + " solid " + dS.borderColor, "padding", "15px", "textAlign", "center", "boxShadow", "3px 3px 3px #333", "borderRadius", dS.borderRadius]);
	$e("#msgBoxHeader").setStyles(["fontSize", parseInt(dS.textSize + 2) + "px", "fontFamily", dS.textFont, "color", dS.textColor]);
	$e("#msg").setStyles(["fontSize", dS.textSize, "fontFamily", dS.textFont, "color", dS.textColor]);
	$e("#btnBoxBtn").setStyles(["border", dS.buttonBorderSize + " solid " + dS.buttonBorderColor, "color", dS.buttonTextColor, "fontSize", dS.buttonTextSize]);
	$e("#msgImg").setStyles(["position", "", "top", "2 % ", "left", "2 % "]);
	msg.appendChild(header);
	msg.appendChild(img);
	msg.appendChild(ctt);
	msg.appendChild(btn);
	document.body.appendChild(msg);
	btn.onClick = function () {
		document.body.removeChild(msg);
	}
}

/**
 * @description Linear gradient
 * @param {NumberLike} clrI Initial colour
 * @param {NumberLike} clrF Final colour
 * @param {number} [n=10] Number of shades
 * @returns {Array} Shades
 * @since 1.0
 * @func
 */
function linearGradient (clrI, clrF, n) {
	var i = parseInt(conv(clrI, 16)), f = parseInt(conv(clrF, 16));
	n = parseInt(n) || 10;
	var /*start = (f - i).sign(), */grad = [], inc = (f - i) / (n - 1);
	//console.log("i = " + i + "\tf = " + f + "\nstart = " + start + "\ninc = " + inc);
	for(var j = 0; j < n; j++) grad.push(conv(i + j * inc, 10, 16));
	return grad
}

/* eslint no-unused-vars: 0 */
/**
 * @description Radial gradient
 * @param {NumberLike} clrI Initial colour
 * @param {NumberLike} clrF Final colour
 * @param {number} [n=10] Number of shades
 * @todo Add the essential part to make it work
 * @returns {Array} Shades
 * @since 1.0
 * @func
 */
function radialGradient (clrI, clrF, n) {
	var i = parseInt(conv(clrI, 16)), f = parseInt(conv(clrF, 16)), grad;
	n = parseInt(n) || 10;
	//Radial gradient
	return grad;
}
/* eslint no-unused-vars: 2 */

/**
<<<<<<< HEAD
=======
 * @description Luminance of an RGB colour.
 * @param {number} [r=0] Red shade
 * @param {number} [g=0] Green shade
 * @param {number} [b=0] Blue shade
 * @returns {number} Luminance
 */
function getLuminance (r, g, b) {
    return .299 * (r || 0) + .587 * (g || 0) + .114 * (b || 0);
}

/**
>>>>>>> develop
 * @description Check if a colour is dark<i>-ish</i>.
 * @param {string} clr Colour
 * @return {boolean} Darkness
 * @since 1.1
 * @func
 */
function isDark (clr) {
<<<<<<< HEAD

	return true;
=======
	var shades = clrToArr(clr);
	if (getColourType(clr) != "rgb") shades = window[getColourType(clr) + "2rgb"](shades, true);
    return getLuminance(shades[0], shades[1], shades[2]) < 128;
>>>>>>> develop
}

/**
 * @description Day/night mode
 * @type {boolean}
 * @default
 * @since 1.0
 * @external module:essence~$G
 * @memberof external:essence~$G
 */
$G["dnM"] = false;
/**
 * @description Switch between enabled or not for the day/night page vision
 * @param {boolean} [exch=false] Switch the mode
 * @returns {undefined}
 * @since 1.0
 * @func
 */
function daynightMode (exch) { //Switch between enabled or not for Day/Night page vision
	var h = new Date().getHours(), getTags = function () {
        return rmDuplicates(DomTree().getOrder().split("->"));
    };
	if (exch) $G.dnM = !$G.dnM;
	if ($G.dnM) {
		//negateColour("body", "color", "a");
		//negateColour("body", "backgroundColor", "a");
		/*if (h >= 20) $e("body").setStyles(["backgroundColor", "#000", "color", "#fff"]);
		else $e("body").setStyles(["backgroundColor", "#fff", "color", "#000"]);*/
		var tags = getTags().map(function (name) {
			return $e("*" + name);
        }), darkTime = (h >= 20 || h <= 3); //Assuming it will be dark between 8pm and 3am

		Essence.say((darkTime ? "It's dark" : "It's light") + "!", "info");

		for (var i = 0; i < tags.length; i++) {
			//console.log("#%d tag: %s => %s", i, tags[i], tags[i].node);
<<<<<<< HEAD
			if (darkTime) tags[i].invColour();
=======
			if (darkTime && !isDark(tags[i].css("backgroundColor"))) tags[i].invColour();
>>>>>>> develop
		}
	} else Essence.say("You cannot use the day/night mod if it\'s disabled.", "warn")
}

/**
 * @description Old/initial tab
 * @type {string}
 * @since 1.0
 * @default
 * @external module:essence~$G
 * @memberof external:essence~$G
 */
$G["oldTab"] = "home";
/**
 * @description Change tabs
 * @param {string} name Name of the tab to switch to
 * @returns {undefined}
 * @since 1.0
 * @func
 */
function chTab (name) {
	$e("#tab_" + $G["oldTab"]).rmClass("tabOn");
	$e("#tab_" + $G["oldTab"]).addClass("tabOff");
	$e("#tab_" + name).rmClass("tabOff");
	$e("#tab_" + name).addClass("tabOn");
	$e("#contentTab_" + $G["oldTab"]).setCSS("display", "none");
	$e("#contentTab_" + name).setCSS("display", "block");
	$G["oldTab"] = name
}

/**
 * @description Move an HTML range left or right which was made using htmlRange
 * @param {string} id ID of the element
 * @param {number} [n=1] Incrementation
 * @returns {undefined}
 * @see module:UI~htmlRange
 * @since 1.0
 * @func
 */
function moveHTMLRange (id, n) { //Move an HTML range left or right which was made using htmlRange
	$e("#" + id).write(parseFloat($e("#" + id).val()) + (n || 1));
	$e("#" + id + "_val").write($e("#" + id).val())
}

/**
 * @description Dynamic HTML range
 * @param {string} id ID of the element
 * @param {number} [min=0] Minimum
 * @param {number} [val=0] Default value
 * @param {number} [max=100] Maximum
 * @returns {string} HTML code
 * @see module:UI~moveHTMLRange
 * @since 1.0
 * @func
 * @throws {Error} No ID found
 */
function htmlRange (id, min, val, max) {
	if (!id) throw new Error("htmlRange needs to know the id of the element implementing the range");
	Essence.addCSS(".arrow{cursor: pointer;font-size: 20px;vertical-align: middle}");
	return "<b class=\"arrow\" onClick=\"moveHTMLRange('" + id + "', -1)\">&triangleleft;</b><input type=\"range\" value=" + (val || 0) + " max=" + (max || 100) + " min=" + (min || 0) + " id=\"" + id + "\" onChange=\"$e('#" + id + "_val').write(this.value);\" /><b class=\"arrow\" onClick=\"moveHTMLRange('" + id + "', 1)\">&triangleright;</b><span id=\"" + id + "_val\">" + (val || "") + "</span>"
}

/**
 * @description HTML/JS animation swapping the field with the label
 * @param {string} id ID of the element
 * @param {string} lbl Label
 * @returns {undefined}
 * @see module:UI~htmlInput
 * @since 1.0
 * @func
 */
function labelFieldSwap (id, lbl) {
	//if (!$end("#" + id).isEmpty() && $end("#" + id).val() != lbl && $end("#" + id).val() != $end("#lbl_" + id).val()) return false
	if ($e("#lbl_" + id).isEmpty()) $e("#lbl_" + id).write("&ensp;", true);
	if ($e("#" + id).isEmpty() || $e("#" + id).val() === "\b" || ($e("#" + id).val()!= lbl && $e("#" + id).size() < 2)) { //The field isn't being filled so label inside the field
		$e("#" + id).write($e("#lbl_" + id).val());
		$e("#lbl_" + id).write("&ensp;", true);
	} else { //The field is being filled up so label shown and no place-holding value in the field
		$e("#lbl_" + id).write(lbl || $e("#" + id).val());
		if ($e("#" + id).val() === lbl || $e("#" + id).val() === "") $e("#" + id).write("\b");
	}
}

/**
 * @description HTML/JS animation swapping the password field with the label
 * @param {string} id ID of the element
 * @param {string} lbl Label
 * @returns {undefined}
 * @see module:UI~htmlPassword
 * @since 1.0
 * @func
 */
function labelPwSwap (id, lbl) {
	if ($e("#lbl_" + id).isEmpty()) $e("#lbl_" + id).write("&ensp;", true);
	if ($e("#" + id).isEmpty() || $e("#" + id).val() === "\b" || ($e("#" + id).val() != lbl && $e("#" + id).size() < 2)) { //The field isn't being filled so label inside the field
		$e("#" + id).type = "text";
		$e("#" + id).write($e("#lbl_" + id).val());
		$e("#lbl_" + id).write("&ensp;", true);
	} else { //The field is being filled up so label shown and no place-holding value in the field
		$e("#" + id).type = "password";
		$e("#lbl_" + id).write(lbl || $e("#" + id).val());
		if ($e("#" + id).val() === lbl || $e("#" + id).val() === "") $e("#" + id).write("\b");
	}
}

/**
 * @description Dynamic HTML input with an animation
 * @param {string} id ID of the element
 * @param {string} [type="text"] Input type
 * @param {string} lbl Label
 * @returns {string} HTML code
 * @see module:UI~labelFieldSwap
 * @since 1.0
 * @func
 * @throws {Error} No ID found
 */
function htmlInput (id, type, lbl) {
	if (!id) throw new Error("htmlInput needs to know the id of the element implementing the input");
	if (!lbl) lbl = type || id;
	return "<label for='" + id + "' id='lbl_" + id + "'>&ensp;</label><br /><input type='" + (type || "text") + "' id='" + id + "' value='" + lbl + "' onFocus='labelFieldSwap(\"" + id + "\", \"" + lbl + "\")' onBlur='labelFieldSwap(\"" + id + "\", \"" + lbl + "\")' />"
}

/**
 * @description Dynamic HTML password input with an animation
 * @param {string} id ID of the element
 * @param {string} lbl Label
 * @returns {string} HTML code
 * @see module:UI~labelPwSwap
 * @since 1.0
 * @func
 * @throws {Error} No ID found
 */
function htmlPassword (id, lbl) {
	if (!id) throw new Error("htmlPassword needs to know the id of the element implementing the input");
	if (!lbl) lbl = id;
	return "<label for='" + id + "' id='lbl_" + id + "'>&ensp;</label><br /><input type='text' id='" + id + "' value='" + lbl + "' onFocus='labelPwSwap(\"" + id + "\", \"" + lbl + "\")' onBlur='labelPwSwap(\"" + id + "\", \"" + lbl + "\")' />"
}

//noinspection JSUnusedGlobalSymbols
/**
 * @description Generate an HTML date selector
 * @param {string} [id] ID
 * @param {number} [minYear=(new Date()).getFullYear()-80] Minimum (oldest) year
 * @param {number} [maxYear=(new Date()).getFullYear()-2] Maximum (youngest) year
 * @return {string} HTML date
 * @since 1.1
 * @func
 */
function htmlDate (id, minYear, maxYear) {
	var day = "<select name='"+ (id? id + "_": "")  + "day'>", month = "<select name='"+ (id? id + "_": "")  + "month'>", year = "<select name='"+ (id? id + "_": "")  + "year'>", months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], y = (new Date()).getFullYear();

	for (var i = 1; i < 32; i++) day += "<option value=" + i + ">" + i + "</option>";
	for (i = 0; i < months.length; i++) month += "<option value=" + (i + 1) + ">" + months[i] + "</option>";
	for (i = (minYear || y - 80); i < (maxYear || y - 2); i++) year += "<option value=" + i + ">" + i + "</option>";
	return day + "</select>" + month + "</select>" + year + "</select>";
}

/**
 * @description Initialise the canvas.
 * @param {number} [width=500] Width
 * @param {number} [height=500] Height
 * @returns undefined
 * @since 1.1
 * @func
 */
function initCanvas (width, height) {
	if (!width) width = 500;
	if (!height) height = 500;
	//There's no <canvas id="essenceCanvas"></canvas> in the document
	if ($n("canvas#essenceCanvas", true) === null) print("<canvas id='essenceCanvas' width='" + width + "' height='" + height + "'>Canvas isn't supported by this browser</canvas>", true);
	else {
		$n("canvas#essenceCanvas").width = width;
		$n("canvas#essenceCanvas").height = height;
	}
}

/**
 * @description Run HTML5 canvas commands in a simpler and easier way.
 * @param {function(CanvasRenderingContext2D)} commands Commands to execute on the canvas
 * @param {string} [dimension="2d"] Dimension
 * @param {number} [stackLayer=0] Stack layer
 * @returns undefined
 * @since 1.1
 * @func
 * @example
 * runCanvas(function (context) {
 * 	   context.fillStyle = "#000";
 * 	   context.strokeStyle = "#0f0";
 * 	   context.fill();
 * 	   context.stroke();
 * 	   context.beginPath();
 * 	   context.moveTo(0, 100);
 * 	   context.lineTo(50, 0);
 * 	   context.lineTo(100, 100);
 * 	   context.lineTo(0, 100);
 * 	   context.closePath()
 * });
 * //This will draw a black triangle with green borders
 */
function runCanvas (commands, dimension, stackLayer) {
	//var context = $n("canvas#essenceCanvas").getContext(dimension || "2d"), instructions = commands.toString(), funcDef, startOfFunc;
	//funcDef = instructions.match(/function\start*\width*\(\)\start*\{\n*/)[0];
	/*startOfFunc = instructions.indexOf(funcDef);
	instructions = instructions.get(instructions.indexOf(startOfFunc) + funcDef.length).replace(/(?:.*?)}/, "");*/
	if (!stackLayer) stackLayer = 0;
	commands($n("canvas#essenceCanvas").getContext(dimension || "2d"));
	if (stackLayer < 1) runCanvas(commands, dimension, stackLayer + 1);
}

/**
 * @description Transform a colour into an array.
 * @param {String} clr Colour
 * @returns {String[]} Array of shades
 * @since 1.1
 * @func
 */
function clrToArr (clr) {
	return (getColourType(clr) === "hex")? clr.get(1).divide((clr.length - 1) / 3): clr.get(clr.indexOf("(") + 1, -1).split(", ");
}

/**
 * @description It will synchronize the in-JS CSS to the CSS of a page (since JS won't always know when an element follow CSS rules specified in a CSS snippet/code).
 * @since 1.1
 * @func
 * @returns {undefined}
 */
function syncCSS () {
	var styleSheets = document.styleSheets.toArray();
	for (var sheet in styleSheets) {
		if (styleSheets.hasOwnProperty(sheet)) {
            var rules = document.all? sheet.rules: sheet.cssRules;
            console.log("\tRules of %s:\n%s", sheet, rules);
		}
	}
}

/**
 * @description Add a CSS rule to a particular place.<br />
 * Inspired by Diego Fl&ocute;rez's version of {@link https://davidwalsh.name/add-rules-stylesheets|David Walsh's addCSSRule}.
 * @param {Stylesheet} [sheet=document.styleSheets[0]] Stylesheet
 * @param {String} selector Selector
 * @param {String} rules CSS rules
 * @param {number} [index=-1] Insertion index
 * @returns {String} Newly modified CSS rule
 */
function addCSSRule (sheet, selector, rules, index) {
	if (!sheet) sheet = document.styleSheets[0];
    //noinspection JSUnresolvedVariable
    var styleRules = document.all? sheet.rules: sheet.cssRules;
    if (!index) index = styleRules.length - 1;

    for (var i = index; i > 0; i--) {
        if (styleRules[i].selectorText === selector) { //Append the new rules to the current content of the styleRules[i]
            rules = styleRules[i].style.cssText + rules;
            sheet.deleteRule(i);
            index = i;
        }
    }

    if ("insertRule" in sheet) sheet.insertRule(selector + "{" + rules + "}", index);
    else if ("addRule" in sheet) sheet.addRule(selector, rules, index);

    return styleRules[index].cssText;
}

/**
 * @description Clear CSS rules from a stylesheet.<br />
 * Source: {@link https://davidwalsh.name/add-rules-stylesheets|Leonard's}
 * @param {Stylesheet} [sheet=document.styleSheets[0]] Stylesheet
 */
function clearCSSRules (sheet) {
	if (!sheet) sheet = document.styleSheets[0];
    var i = (document.all? sheet.rules: sheet.cssRules).length - 1;

    // Remove all the rules from the end inwards.
    while (i >= 0) {
        if ("deleteRule" in sheet) sheet.deleteRule(i);
        else if ("removeRule" in sheet) sheet.removeRule(i);
        i--;
    }
}