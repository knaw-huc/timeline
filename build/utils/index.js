"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = (func, wait) => {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    };
};
function visibleRatio(zoomLevel) {
    return Math.pow(2, zoomLevel * -1);
}
exports.visibleRatio = visibleRatio;
function createRange(n) {
    return Array.apply(null, { length: n }).map(Number.call, Number);
}
exports.createRange = createRange;
function selectRandom(set, amount) {
    const selected = [];
    while (selected.length < amount) {
        const randomIndex = Math.floor(Math.random() * set.length);
        const nextItem = set[randomIndex];
        if (selected.indexOf(nextItem) === -1 || set.length < amount)
            selected.push(nextItem);
    }
    return selected;
}
exports.selectRandom = selectRandom;
function calcPixelsPerMillisecond(viewportWidth, zoomLevel, totalTime) {
    return (viewportWidth / visibleRatio(zoomLevel)) / totalTime;
}
exports.calcPixelsPerMillisecond = calcPixelsPerMillisecond;
function formatDate(ts) {
    if (ts == null)
        return null;
    const d = new Date(ts);
    return d.toUTCString();
}
function logEvent(event, ...rest) {
    console.log(event.lbl, event, formatDate(event.from), formatDate(event.to), rest);
}
exports.logEvent = logEvent;
