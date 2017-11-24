"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const rulers_1 = require("../rulers/rulers");
const domain_labels_1 = require("./domain-labels");
const Sparkline = (props) => {
    if (props.aggregate == null)
        return null;
    if (props.aggregate.length > props.domain.width)
        return null;
    const countMax = props.aggregate.reduce((prev, curr) => { return Math.max(prev, curr.count); }, 0);
    const path = props.aggregate.reduce((prev, curr, index) => {
        const curveType = index === 0 ? 'M' : 'L';
        const x = (props.domain.width / (props.aggregate.length - 1)) * index;
        const y = props.domain.height - ((curr.count / countMax) * props.domain.height);
        return `${prev} ${curveType} ${x} ${y}`;
    }, '');
    const pathCloser = ` L ${props.domain.width + 1} ${props.domain.height + 1} L -1 ${props.domain.height + 1}`;
    return (React.createElement("div", null,
        props.domain.rulers &&
            React.createElement(rulers_1.default, { domain: props.domain }),
        props.domain.domainLabels &&
            React.createElement(domain_labels_1.default, { domain: props.domain }),
        React.createElement("svg", { viewBox: `0 0 ${props.domain.width} ${props.domain.height}`, style: {
                position: 'relative',
                zIndex: 1,
            } },
            React.createElement("path", { d: path + pathCloser, style: {
                    fill: 'rgba(245, 245, 255, .7)',
                    stroke: 'rgb(180, 180, 255)',
                } }))));
};
exports.default = Sparkline;
