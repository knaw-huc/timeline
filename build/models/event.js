"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
var ImageFileType;
(function (ImageFileType) {
    ImageFileType["NONE"] = "none";
    ImageFileType["JPG"] = "jpg";
    ImageFileType["SVG"] = "svg";
    ImageFileType["GIF"] = "gif";
    ImageFileType["PNG"] = "png";
})(ImageFileType = exports.ImageFileType || (exports.ImageFileType = {}));
class Point {
}
class Ev3ntLocation {
}
exports.Ev3ntLocation = Ev3ntLocation;
class Voyage {
}
exports.Voyage = Voyage;
class RawEv3nt {
}
exports.RawEv3nt = RawEv3nt;
class Ev3nt extends RawEv3nt {
    constructor(event, pixelsPerMillisecond) {
        super();
        for (const key in event) {
            if (event[key] != null)
                this[key] = event[key];
        }
        if (this.lbl == null)
            this.lbl = 'NO LABEL';
        if (this.id == null)
            this.id = 'id_' + crypto.getRandomValues(new Uint8Array(4)).join('_');
        this.from = this.dmin || this.d;
        this.to = this.dmax || this.ed;
        if (this.to == null)
            this.to = this.from;
        this.time = this.to - this.from;
        if (pixelsPerMillisecond != null) {
            const paddingRight = Math.round(constants_1.EVENT_HEIGHT * 2 / pixelsPerMillisecond);
            let space = ((this.lbl.length * constants_1.PIXELS_PER_LETTER) / pixelsPerMillisecond) + paddingRight;
            space = space > this.time ? space - this.time : 0;
            this.screenTo = Math.round(this.from + this.time + space);
        }
    }
}
exports.Ev3nt = Ev3nt;
