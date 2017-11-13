"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const constants_1 = require("../constants");
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
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
        bottom: props.type === 'visibledomain' ? `${constants_1.DATE_BAR_HEIGHT}px` : 0,
        height: props.type === 'visibledomain' ?
            'initial' :
            props.domainRatio < 1 ?
                `${constants_1.DATE_BAR_HEIGHT}px` :
                '100%',
        left: 0,
        position: 'absolute',
        right: 0,
        top: props.type === 'visibledomain' ? 0 : 'initial',
        whiteSpace: 'nowrap',
    } }, props.children);
const Rulers = (props) => {
    const domain = props.type === 'visibledomain' ? props.visibleDomain : props.domain;
    const dates = date_range_1.default(domain.from, domain.to, domain.granularity);
    const formatLabel = labelFormatter(domain.granularity);
    return (React.createElement(Ul, Object.assign({}, props), dates.map((date, index) => React.createElement(ruler_1.default, { key: index, label: formatLabel(date), left: domain.positionAtDate(date) }))));
};
exports.default = Rulers;
