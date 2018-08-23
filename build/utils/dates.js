"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function nth(n) { return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th"; }
function formatMonth(d) { return months[d.getUTCMonth()]; }
function formatDateNumber(d) {
    const dateNumber = d.getUTCDate();
    const day = days[d.getUTCDay()];
    return `${day}, ${dateNumber}${nth(dateNumber)}`;
}
function formatHours(d) { return d.getUTCHours().toString().padStart(2, '0'); }
function formatMinutes(d) { return d.getUTCMinutes().toString().padStart(2, '0'); }
function formatSeconds(d) { return d.getUTCSeconds().toString().padStart(2, '0'); }
function formatMilliseconds(d) { return d.getUTCMilliseconds().toString().padStart(3, '0'); }
function isYearOrBigger(granularity) {
    return granularity === "YEAR" ||
        granularity === "YEAR_5" ||
        granularity === "DECADE" ||
        granularity === "DECADE_5" ||
        granularity === "CENTURY" ||
        granularity === "CENTURY_5" ||
        granularity === "MILLENIUM";
}
exports.formatDate = (timestamp, granularity) => {
    if (timestamp == null)
        return '∞';
    const date = new Date(timestamp);
    let label = date.getUTCFullYear().toString();
    if (isYearOrBigger(granularity))
        return label;
    label = `${formatMonth(date)} ${label}`;
    if (granularity === "MONHT")
        return label;
    label = `${formatDateNumber(date)} ${label}`;
    if (granularity === "DAY")
        return label;
    label = `${label} at ${formatHours(date)}:`;
    if (granularity === "HOUR")
        return `${label}00`;
    label = `${label}${formatMinutes(date)}`;
    if (granularity === "MINUTE")
        return label;
    label = `${label}:${formatSeconds(date)}`;
    if (granularity === "SECOND")
        return label;
    return `${label}.${formatMilliseconds(date)}`;
};
exports.getGranularity = (pixelsPerMillisecond) => {
    if (pixelsPerMillisecond > 58)
        return "MILLISECOND";
    if (pixelsPerMillisecond > 12)
        return "MILLISECOND_10";
    if (pixelsPerMillisecond > 2.3)
        return "MILLISECOND_50";
    if (pixelsPerMillisecond > 1.5)
        return "MILLISECOND_100";
    if (pixelsPerMillisecond > .4)
        return "MILLISECOND_500";
    if (pixelsPerMillisecond > 1.12e-3)
        return "SECOND";
    if (pixelsPerMillisecond > 1.12e-4)
        return "MINUTE";
    if (pixelsPerMillisecond > 1.12e-5)
        return "HOUR";
    if (pixelsPerMillisecond > 8e-7)
        return "DAY";
    if (pixelsPerMillisecond > 2.6e-7)
        return "WEEK";
    if (pixelsPerMillisecond > 2.2e-8)
        return "MONHT";
    if (pixelsPerMillisecond > 2.2e-9)
        return "YEAR";
    if (pixelsPerMillisecond > 3.3e-10)
        return "YEAR_5";
    if (pixelsPerMillisecond > 1.6e-10)
        return "DECADE";
    if (pixelsPerMillisecond > 8e-11)
        return "DECADE_5";
    if (pixelsPerMillisecond > 1e-11)
        return "CENTURY";
    if (pixelsPerMillisecond > 5e-12)
        return "CENTURY_5";
    return "MILLENIUM";
};
exports.getStep = (granularity) => {
    if (granularity === "YEAR")
        return 1;
    if (granularity === "YEAR_5")
        return 5;
    if (granularity === "DECADE")
        return 10;
    if (granularity === "DECADE_5")
        return 50;
    if (granularity === "CENTURY")
        return 100;
    if (granularity === "CENTURY_5")
        return 500;
    if (granularity === "MILLENIUM")
        return 1000;
    if (granularity === "MILLISECOND")
        return 1;
    if (granularity === "MILLISECOND_10")
        return 10;
    if (granularity === "MILLISECOND_50")
        return 50;
    if (granularity === "MILLISECOND_100")
        return 100;
    if (granularity === "MILLISECOND_500")
        return 500;
    throw new RangeError("[getStep] Only steps with a granularity greater than 'year' calculated");
};
function subsequentDate(granularity) {
    if (isYearOrBigger(granularity)) {
        return (d) => {
            let date = new Date(d);
            let nextYear = date.getUTCFullYear() + 1;
            if (granularity !== "YEAR") {
                const step = exports.getStep(granularity);
                while (nextYear % step !== 0) {
                    nextYear += 1;
                }
            }
            if (nextYear > -1 && nextYear < 100) {
                date.setUTCFullYear(nextYear);
                return date.getTime();
            }
            else {
                return Date.UTC(nextYear, 0, 1);
            }
        };
    }
    if (granularity === "MONHT") {
        return (d) => {
            const date = new Date(d);
            return Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1);
        };
    }
    if (granularity === "WEEK") {
        return (d) => {
            const date = new Date(d);
            return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 7);
        };
    }
    if (granularity === "DAY") {
        return (d) => {
            const date = new Date(d);
            return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1);
        };
    }
    if (granularity === "HOUR") {
        return (d) => {
            const date = new Date(d);
            return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours() + 1);
        };
    }
    if (granularity === "MINUTE") {
        return (d) => {
            const date = new Date(d);
            return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes() + 1);
        };
    }
    if (granularity === "SECOND") {
        return (d) => {
            const date = new Date(d);
            return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds() + 1);
        };
    }
    if (granularity.slice(0, "MILLISECOND".length) === "MILLISECOND") {
        return (d) => {
            const step = exports.getStep(granularity);
            const date = new Date(d);
            let ms = date.getUTCMilliseconds() + 1;
            if (step > 1)
                ms = ms + step - (ms % step);
            return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), ms);
        };
    }
}
exports.subsequentDate = subsequentDate;
function byDate(a, b) {
    const aFrom = a.date_min != null ? a.date_min : a.date;
    const bFrom = b.date_min != null ? b.date_min : b.date;
    if (aFrom < bFrom)
        return -1;
    if (aFrom > bFrom)
        return 1;
    const aTo = a.end_date_max != null ? a.end_date_max : a.end_date;
    const bTo = b.end_date_max != null ? b.end_date_max : b.end_date;
    if (aTo < bTo)
        return -1;
    if (aTo > bTo)
        return 1;
    return 0;
}
exports.byDate = byDate;
const getWeekNumber = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};
exports.labelBody = (d, granularity) => {
    const date = new Date(d);
    if (isYearOrBigger(granularity))
        return date.getUTCFullYear().toString();
    if (granularity === "MONHT")
        return formatMonth(date);
    if (granularity === "WEEK")
        return `${formatMonth(date)}, week ${getWeekNumber(date)}`;
    if (granularity === "DAY")
        return `${formatDateNumber(date)} ${formatMonth(date)}`;
    if (granularity === "HOUR")
        return `${formatHours(date)}:00`;
    if (granularity === "MINUTE")
        return `${formatHours(date)}:${formatMinutes(date)}`;
    if (granularity === "SECOND")
        return `${formatHours(date)}:${formatMinutes(date)}:${formatSeconds(date)}`;
    if (granularity.slice(0, "MILLISECOND".length) === "MILLISECOND") {
        return `${formatHours(date)}:${formatMinutes(date)}:${formatSeconds(date)}.${formatMilliseconds(date)}`;
    }
};
