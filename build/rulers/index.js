"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ruler_1 = require("./ruler");
const date_range_1 = require("./date-range");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const getWeekNumber = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};
const labelFormatter = (granularity) => {
    if (granularity >= 4) {
        return (d) => React.createElement("span", null, d.getFullYear().toString());
    }
    else if (granularity === 3) {
        return (d) => React.createElement("span", null,
            (d.getMonth() === 0) &&
                React.createElement("span", null,
                    d.getFullYear().toString(),
                    React.createElement("br", null)),
            months[d.getMonth()]);
    }
    else if (granularity === 2) {
        return (d) => React.createElement("span", null,
            months[d.getMonth()],
            ", week ",
            getWeekNumber(d));
    }
    else if (granularity === 1) {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return (d) => React.createElement("span", null, days[d.getDate()]);
    }
    else if (granularity === 0) {
        return (d) => React.createElement("span", null, "NOT IMPLEMENTED");
    }
};
const Ul = (props) => React.createElement("ul", { style: {
        bottom: 0,
        heigth: '100%',
        left: 0,
        listStyle: 'none',
        margin: 0,
        padding: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        whiteSpace: 'nowrap',
    } }, props.children);
const Rulers = (props) => {
    const dates = date_range_1.default(props.domain.from, props.domain.to, props.domain.granularity);
    const formatLabel = labelFormatter(props.domain.granularity);
    return (React.createElement(Ul, Object.assign({}, props), dates.map((date, index) => {
        const labelComp = props.domain.rulerLabels ? formatLabel(date) : null;
        return (React.createElement(ruler_1.default, { date: date, key: index, label: labelComp, left: props.domain.positionAtDate(date) }));
    })));
};
exports.default = Rulers;
