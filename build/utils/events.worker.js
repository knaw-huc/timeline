"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
function addIntervalToGrid(grid, event, eventRight) {
    if (event.row == null)
        event.row = grid.push([]) - 1;
    grid[event.row].push([event.from, eventRight]);
    if (event.has_image != null) {
        if (grid[event.row + 1] == null)
            grid[event.row + 1] = [];
        grid[event.row + 1].push([event.imageFrom, event.imageTo]);
        if (grid[event.row + 2] == null)
            grid[event.row + 2] = [];
        grid[event.row + 2].push([event.imageFrom, event.imageTo]);
    }
}
class OrderedEvents {
    constructor() {
        this.events = [];
        this.row_count = 0;
    }
}
exports.OrderedEvents = OrderedEvents;
const PIXELS_PER_LETTER = 8;
function orderEvents(events, pixelsPerMillisecond) {
    if (!events.length)
        return new OrderedEvents();
    let rowCount = 0;
    const grid = [];
    const paddingRight = Math.round(constants_1.EVENT_HEIGHT * 2 / pixelsPerMillisecond);
    const imageSize = Math.round(constants_1.EVENT_ROW_HEIGHT * 2 / pixelsPerMillisecond);
    const addRow = (event) => {
        if (event.label == null)
            event.label = 'NO LABEL';
        event.from = event.date_min || event.date;
        event.to = event.end_date_max || event.end_date;
        if (event.to == null)
            event.to = event.from;
        event.time = event.to == null ? 0 : event.to - event.from;
        if (event.label == null)
            event.label = 'NO LABEL';
        const space = ((event.label.length * PIXELS_PER_LETTER) / pixelsPerMillisecond) + paddingRight;
        event.space = space > event.time ? space - event.time : 0;
        if (event.has_image) {
            event.imageFrom = event.time ? event.from : event.from - imageSize / 2;
            event.imageTo = event.time ? event.from + imageSize : event.from + imageSize / 2;
        }
        const eventRight = event.from + event.time + event.space;
        let rowIterator = 0;
        while (event.row == null && rowIterator < grid.length) {
            let cellIterator = 0;
            let hasSpace = true;
            while (hasSpace && cellIterator < grid[rowIterator].length) {
                if (eventRight < grid[rowIterator][cellIterator][0])
                    break;
                hasSpace = event.from > grid[rowIterator][cellIterator][1];
                if (hasSpace && event.has_image != null) {
                    if (grid[rowIterator + 1] == null)
                        break;
                    hasSpace = grid[rowIterator + 1].every(occupiedSpace => event.imageTo < occupiedSpace[0] || event.imageFrom > occupiedSpace[1]);
                }
                if (hasSpace && event.has_image != null) {
                    if (grid[rowIterator + 2] == null)
                        break;
                    hasSpace = grid[rowIterator + 2].every(occupiedSpace => event.imageTo < occupiedSpace[0] || event.imageFrom > occupiedSpace[1]);
                }
                cellIterator++;
            }
            if (hasSpace) {
                event.row = rowIterator;
                addIntervalToGrid(grid, event, eventRight);
            }
            rowIterator++;
        }
        if (event.row == null)
            addIntervalToGrid(grid, event, eventRight);
        if (event.row > rowCount)
            rowCount = event.row;
        return event;
    };
    return {
        events: events.map(addRow),
        row_count: grid.length
    };
}
exports.orderEvents = orderEvents;
