"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateRange = (from, to, granularity) => {
    const range = [];
    let nextFrom;
    if (granularity >= 4) {
        const step = granularity === 7 ?
            1000 :
            granularity === 6 ?
                100 :
                granularity === 5 ?
                    10 :
                    1;
        nextFrom = (from) => from.setFullYear(from.getFullYear() + step);
    }
    else if (granularity === 3) {
        nextFrom = (from) => from.setMonth(from.getMonth() + 1);
    }
    else if (granularity === 2) {
        nextFrom = (from) => from.setDate(from.getDate() + 7);
    }
    else if (granularity === 1) {
        nextFrom = (from) => from.setDate(from.getDate() + 1);
    }
    else if (granularity === 0) {
        nextFrom = (from) => from.setHours(from.getHours() + 1);
    }
    while (from < to) {
        range.push(from);
        from = new Date(from.valueOf());
        nextFrom(from);
    }
    return range;
};
exports.default = dateRange;
