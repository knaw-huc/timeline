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
const PIXELS_PER_LETTER = 8;
function orderEvents(events, pixelsPerMillisecond) {
    if (!events.length)
        return new OrderedEvents();
    const rows = [-Infinity];
    const paddingRight = Math.round(constants_1.EVENT_HEIGHT * 2 / pixelsPerMillisecond);
    const imageSize = Math.round(constants_1.EVENT_ROW_HEIGHT * 2 / pixelsPerMillisecond);
    function rowHasSpace(row, imageFrom) {
        return (rows[row + 1] == null || rows[row + 1] < imageFrom) && (rows[row + 2] == null || rows[row + 2] < imageFrom);
    }
    function addRow(event) {
        if (event.label == null)
            event.label = 'NO LABEL';
        event.from = event.date_min || event.date;
        event.to = event.end_date_max || event.end_date;
        if (event.to == null)
            event.to = event.from;
        event.time = event.to == null ? 0 : event.to - event.from;
        const space = ((event.label.length * PIXELS_PER_LETTER) / pixelsPerMillisecond) + paddingRight;
        event.space = space > event.time ? space - event.time : 0;
        const eventRight = event.from + event.time + event.space;
        let row;
        if (event.has_image) {
            const imageFrom = event.time ? event.from : event.from - imageSize / 2;
            const imageTo = event.time ? event.from + imageSize : event.from + imageSize / 2;
            row = rows.findIndex(r => imageFrom > r);
            if (row > -1) {
                let hasSpace = false;
                while (!hasSpace) {
                    hasSpace = rowHasSpace(row, imageFrom);
                    if (hasSpace)
                        break;
                    row = rows.findIndex((r, i) => i > row && imageFrom > r);
                    if (row === -1)
                        hasSpace = true;
                }
            }
            if (row === -1) {
                row = rows.push(eventRight) - 1;
                rows.push(imageTo);
                rows.push(imageTo);
            }
            else {
                rows[row] = eventRight;
                rows[row + 1] = imageTo;
                rows[row + 2] = imageTo;
            }
        }
        else {
            row = rows.findIndex(r => event.from > r);
            if (row === -1) {
                row = rows.push(eventRight) - 1;
            }
            else {
                rows[row] = eventRight;
            }
        }
        event.row = row;
        return event;
    }
    events = events.map(addRow);
    return {
        events,
        row_count: rows.length
    };
}
exports.orderEvents = orderEvents;
