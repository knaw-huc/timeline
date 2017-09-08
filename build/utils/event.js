"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants = require("../constants");
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
exports.addTop = (events) => {
    if (!events.length)
        return events;
    const firstEvent = events[0];
    const rows = [[firstEvent]];
    const calc = (event) => {
        if (event === firstEvent)
            return event;
        for (let row = 0; row < rows.length; row++) {
            const eventsInRow = rows[row];
            const isRowWithSpace = eventsInRow.reduce((prev, curr) => {
                return prev && !hasOverlap(event, curr);
            }, true);
            if (isRowWithSpace) {
                eventsInRow.push(event);
                event.top = row * Constants.EVENT_ROW_HEIGHT;
                break;
            }
        }
        if (event.top == null) {
            const newLength = rows.push([event]);
            event.top = (newLength - 1) * Constants.EVENT_ROW_HEIGHT;
        }
        return event;
    };
    return events.map(calc);
};
const parseDate = (date) => {
    date = date.split('+')[0];
    return (date === 'infinity') ? null : new Date(date);
};
const parseDateRange = (dateRange) => {
    return {
        from: parseDate(dateRange.from),
        infiniteFrom: dateRange.from === 'infinity',
        infiniteTo: dateRange.to === 'infinity',
        to: parseDate(dateRange.to),
    };
};
const clone = (data) => JSON.parse(JSON.stringify(data));
exports.parseEvent = (eventData) => {
    eventData = clone(eventData);
    if (eventData.date) {
        eventData.date = parseDate(eventData.date);
    }
    if (eventData.dateUncertain != null) {
        eventData.dateUncertain = parseDateRange(eventData.dateUncertain);
    }
    if (eventData.dateRange != null) {
        eventData.dateRange = parseDateRange(eventData.dateRange);
    }
    if (eventData.dateRangeUncertain != null) {
        eventData.dateRangeUncertain = parseDateRange(eventData.dateRangeUncertain);
    }
    return eventData;
};
