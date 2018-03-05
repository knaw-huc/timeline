"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countDays = (from, to) => {
    if (to == null)
        return 0;
    return Math.round(to.getTime() - from.getTime()) / 86400000;
};
exports.isEqual = (date1, date2) => date1.getTime() === date2.getTime();
exports.format = (date, granularity) => {
    if (date == null)
        return '∞';
    let displayDate = date.getFullYear().toString();
    if (granularity >= 3) {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ];
        displayDate = `${months[date.getMonth()]} ${displayDate}`;
    }
    if (granularity >= 1) {
        displayDate = `${date.getDate()} ${displayDate}`;
    }
    if (granularity === 0) {
        displayDate = `${date.getHours()}:${date.getMinutes()} ${displayDate}`;
    }
    return displayDate;
};
exports.getGranularity = (from, to, visibleRatio) => {
    const days = exports.countDays(from, to) * visibleRatio;
    if (days < 1)
        return 0;
    if (days < 15)
        return 1;
    if (days < 45)
        return 2;
    if (days < 1.5 * 365)
        return 3;
    if (days < 15 * 365)
        return 4;
    if (days < 150 * 365)
        return 5;
    if (days < 300 * 365)
        return 6;
    return 7;
};
