"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const props_1 = require("../../models/props");
const dates_1 = require("../../utils/dates");
const smallFont = "11px sans-serif";
const bigFont = "13px sans-serif";
function isSpecialRuler(date, band) {
    if (band.granularity === "CENTURY" && new Date(date).getUTCFullYear() % 1000 === 0)
        return true;
    if (band.granularity === "YEAR_5" && new Date(date).getUTCFullYear() % 50 === 0)
        return true;
    if (band.granularity === "YEAR" && new Date(date).getUTCFullYear() % 5 === 0)
        return true;
    return false;
}
function drawRuler(ctx, band, date, top, bottom) {
    const left = band.positionAtTimestamp(date);
    ctx.moveTo(left, top);
    ctx.lineTo(left, bottom);
    if (band.config.rulerLabels)
        ctx.fillText(dates_1.labelBody(date, band.granularity), left + 3, bottom - 3);
}
function drawRulers(ctx, band) {
    if (!band.config.rulers)
        return;
    let date = band.nextDate(band.from);
    const y = band.config.topOffsetRatio * props_1.default.viewportHeight;
    const height = band.config.heightRatio * props_1.default.viewportHeight;
    const normalRulerDates = [];
    const specialRulerDates = [];
    while (date < band.to) {
        if (isSpecialRuler(date, band))
            specialRulerDates.push(date);
        else
            normalRulerDates.push(date);
        date = band.nextDate(date);
    }
    ctx.beginPath();
    ctx.font = smallFont;
    ctx.fillStyle = `rgb(205, 205, 205)`;
    for (const date of normalRulerDates) {
        drawRuler(ctx, band, date, y, y + height);
    }
    ctx.strokeStyle = `rgb(235, 235, 235)`;
    ctx.stroke();
    ctx.beginPath();
    ctx.font = bigFont;
    ctx.fillStyle = `rgb(120, 120, 120)`;
    for (const date of specialRulerDates) {
        drawRuler(ctx, band, date, y, y + height);
    }
    ctx.strokeStyle = `rgb(150, 150, 150)`;
    ctx.stroke();
}
exports.default = drawRulers;
