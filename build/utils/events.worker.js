"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const event_1 = require("../models/event");
const index_1 = require("./index");
class OrderedTimeline {
}
exports.OrderedTimeline = OrderedTimeline;
function orderEvents(options) {
    if (options.bands == null || !options.bands.length)
        return new OrderedTimeline();
    let from = options.bands.reduce((prev, curr) => {
        const firstEvent = curr.events[0];
        return Math.min(prev, firstEvent.dmin || Infinity, firstEvent.d || Infinity);
    }, Infinity);
    let to = options.bands.reduce((prev, curr) => {
        const highest = curr.events.reduce((prev2, curr2) => {
            return Math.max(prev2, curr2.d || -Infinity, curr2.ed || -Infinity, curr2.dmax || -Infinity);
        }, -Infinity);
        return Math.max(highest, prev);
    }, -Infinity);
    let parent;
    if (options.parent != null) {
        parent = new event_1.Ev3nt(options.parent);
        from = Math.min(from, parent.dmin || Infinity, parent.d || Infinity);
        to = Math.max(to, parent.ed || -Infinity, parent.dmax || -Infinity);
    }
    const time = to - from;
    function processBand(band) {
        const pixelsPerMillisecond = index_1.calcPixelsPerMillisecond(options.viewportWidth, band.zoomLevel, time);
        const rows = [-Infinity];
        const imageSize = Math.round(constants_1.EVENT_ROW_HEIGHT * 2 / pixelsPerMillisecond);
        function rowHasSpace(row, imageFrom) {
            return (rows[row + 1] == null || rows[row + 1] < imageFrom) && (rows[row + 2] == null || rows[row + 2] < imageFrom);
        }
        function addRow(rawEvent) {
            const event = new event_1.Ev3nt(rawEvent, pixelsPerMillisecond);
            let row;
            if (event.img) {
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
                    row = rows.push(event.screenTo) - 1;
                    rows.push(imageTo);
                    rows.push(imageTo);
                }
                else {
                    rows[row] = event.screenTo;
                    rows[row + 1] = imageTo;
                    rows[row + 2] = imageTo;
                }
            }
            else {
                row = rows.findIndex(r => event.from > r);
                if (row === -1) {
                    row = rows.push(event.screenTo) - 1;
                }
                else {
                    rows[row] = event.screenTo;
                }
            }
            event.row = row;
            return event;
        }
        return {
            events: band.events.map(addRow),
            zoomLevel: band.zoomLevel,
            pixelsPerMillisecond,
            rowCount: rows.length,
        };
    }
    return {
        bands: options.bands.map(processBand),
        from,
        parent,
        time,
        to,
    };
}
exports.orderEvents = orderEvents;
