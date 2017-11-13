"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const constants_1 = require("../constants");
const Sparkline = (props) => {
    if (props.aggregate.length > props.domain.width)
        return null;
    const countMax = props.aggregate.reduce((prev, curr) => { return Math.max(prev, curr.count); }, 0);
    const path = props.aggregate.reduce((prev, curr, index) => {
        const curveType = index === 0 ? 'M' : 'L';
        const x = (props.domain.width / (props.aggregate.length - 1)) * index;
        const y = constants_1.DATE_BAR_HEIGHT - ((curr.count / countMax) * constants_1.DATE_BAR_HEIGHT);
        return `${prev} ${curveType} ${x} ${y}`;
    }, '');
    const pathCloser = ` L ${props.domain.width + 1} ${constants_1.DATE_BAR_HEIGHT + 1} L -1 ${constants_1.DATE_BAR_HEIGHT + 1}`;
    return (React.createElement("svg", { style: {
            position: 'absolute',
            bottom: 0,
        }, viewBox: `0 0 ${props.domain.width} ${constants_1.DATE_BAR_HEIGHT}` },
        React.createElement("path", { d: path + pathCloser, style: {
                fill: 'rgb(245, 245, 255)',
                stroke: 'rgb(180, 180, 255)',
            } })));
};
exports.default = Sparkline;
