"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countDays = (from, to) => {
    if (to == null)
        return 0;
    return Math.round(to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24);
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
