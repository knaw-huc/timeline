"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (events) => {
    let prevYear;
    const run1 = events
        .reduce((prev, curr, index, array) => {
        const year = curr.date.getFullYear();
        if (prev.hasOwnProperty(year)) {
            prev[year]++;
        }
        else {
            while (prevYear < year) {
                prevYear += 1;
                prev[prevYear] = 0;
            }
            prev[year] = 1;
        }
        prevYear = year;
        return prev;
    }, {});
    const run2 = Object.keys(run1).map((year, index) => ({ year, count: run1[year] }));
    return run2;
};
