"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
exports.default = (domain) => {
    const grid = [];
    return (event) => {
        const [left, width] = event.space();
        let row;
        const rowHasSpace = (row) => {
            return row.reduce((prev, curr, index, array) => {
                if (!prev)
                    return false;
                const [currLeft, currWidth] = curr;
                return (left + width < currLeft ||
                    left > currLeft + currWidth);
            }, true);
        };
        for (let i = 0; i < grid.length; i++) {
            if (rowHasSpace(grid[i])) {
                grid[i].push([left, width]);
                row = i;
                break;
            }
        }
        if (row == null) {
            row = grid.push([[left, width]]);
        }
        event.top = row * constants_1.EVENT_ROW_HEIGHT;
        return event;
    };
};
