"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
class Props {
    constructor() {
        this._center = .5;
    }
    get center() { return this._center; }
    set center(n) {
        if ((this._center === 0 && n < 0) || (this._center === 1 && n > 1))
            return;
        else if (n < 0)
            this._center = 0;
        else if (n > 1)
            this._center = 1;
        else
            this._center = n;
        document.dispatchEvent(new CustomEvent(constants_1.CENTER_CHANGE_EVENT, { detail: n }));
    }
    get from() { return this._from; }
    set from(date) {
        this._from = date;
    }
    get to() { return this._to; }
    set to(date) {
        this._to = date;
    }
}
exports.Props = Props;
exports.default = new Props();
