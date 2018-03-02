"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const hasOverlap = (a, b) => {
    const [aLeft, aWidth] = a.space();
    const [bLeft, bWidth] = b.space();
    let overlap = true;
    if (aLeft + aWidth < bLeft)
        overlap = false;
    if (bLeft + bWidth < aLeft)
        overlap = false;
    return overlap;
};
exports.default = () => {
    const rows = [0];
    return (event) => {
        const [left, width] = event.space();
        let row = rows.findIndex(r => r < left);
        if (row === -1)
            row = rows.push(left + width);
        else
            rows[row] = left + width;
        event.top = row * constants_1.EVENT_ROW_HEIGHT;
        return event;
    };
};
