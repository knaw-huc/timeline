"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStep = (granularity) => {
    if (granularity === 4)
        return 1;
    if (granularity === 5)
        return 10;
    if (granularity === 6)
        return 50;
    if (granularity === 7)
        return 100;
    if (granularity === 8)
        return 1000;
    throw new RangeError("[getStep] Only steps with a granularity greater than 'year' calculated");
};
exports.default = (granularity, prev = false) => {
    const modifier = prev ? -1 : 1;
    if (granularity >= 4) {
        return (date) => new Date(date.getFullYear() + (exports.getStep(granularity) * modifier), 0, 1);
    }
    if (granularity === 3) {
        return (date) => new Date(date.getFullYear(), date.getMonth() + modifier, 1);
    }
    if (granularity === 2) {
        return (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + (7 * modifier));
    }
    if (granularity === 1) {
        return (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + modifier);
    }
    if (granularity === 0) {
        return (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + modifier);
    }
};
