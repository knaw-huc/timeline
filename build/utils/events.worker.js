"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
class OrderedEvents {
    constructor() {
        this.events = [];
        this.row_count = 0;
    }
}
exports.OrderedEvents = OrderedEvents;
const pixelsPerLetter = 8;
function orderEvents(events, pixelsPerMillisecond) {
    if (!events.length)
        return new OrderedEvents();
    let rowCount = 0;
    const grid = [];
    const paddingRight = constants_1.EVENT_HEIGHT * 2 / pixelsPerMillisecond;
    const addRow = (event) => {
        let row;
        if (event.label == null)
            event.label = 'NO LABEL';
        event.from = event.date_min || event.date;
        event.to = event.end_date_max || event.end_date;
        if (event.to == null)
            event.to = event.from;
        event.time = event.to == null ? 0 : event.to - event.from;
        event.space = 0;
        if (!event.time) {
            if (event.label == null)
                event.label = 'NO LABEL';
            event.space = ((event.label.length * pixelsPerLetter) / pixelsPerMillisecond) + paddingRight;
        }
        let rowIterator = 0;
        while (row == null && rowIterator < grid.length) {
            let cellIterator = 0;
            let hasSpace = true;
            while (hasSpace && cellIterator < grid[rowIterator].length) {
                if (event.to < grid[rowIterator][cellIterator][0])
                    break;
                hasSpace = event.from > grid[rowIterator][cellIterator][1];
                cellIterator++;
            }
            if (hasSpace) {
                grid[rowIterator].push([event.from, event.from + event.time + event.space]);
                row = rowIterator;
            }
            rowIterator++;
        }
        if (row == null)
            row = grid.push([[event.from, event.from + event.time + event.space]]) - 1;
        if (row > rowCount)
            rowCount = row;
        event.row = row;
        return event;
    };
    events = events.map(addRow);
    return {
        events,
        row_count: grid.length
    };
}
exports.orderEvents = orderEvents;
