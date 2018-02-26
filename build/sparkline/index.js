"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const domain_wrapper_1 = require("../domain-wrapper");
const Sparkline = (props) => {
    if (props.aggregate == null)
        return null;
    if (props.aggregate.length > props.domain.width)
        return null;
    const countMax = props.aggregate.reduce((prev, curr) => { return Math.max(prev, curr.count); }, 0);
    const path = props.aggregate.reduce((prev, curr, index) => {
        const curveType = index === 0 ? 'M' : 'L';
        const x = (props.domain.width / (props.aggregate.length - 1)) * index;
        const y = props.domain.viewportHeight - ((curr.count / countMax) * props.domain.viewportHeight);
        return `${prev} ${curveType} ${x} ${y}`;
    }, '');
    const pathCloser = ` L ${props.domain.width + 1} ${props.domain.viewportHeight + 1} L -1 ${props.domain.viewportHeight + 1}`;
    return (React.createElement(domain_wrapper_1.default, { domain: props.domain, style: props.style },
        React.createElement("svg", { height: `${props.domain.viewportHeight}px`, style: {
                position: 'relative',
                zIndex: 1,
            }, preserveAspectRatio: "none", viewBox: `0 0 ${props.domain.width} ${props.domain.viewportHeight}`, width: `${props.domain.width}px` },
            React.createElement("path", { d: path + pathCloser, style: {
                    fill: 'rgba(245, 245, 255, .7)',
                    stroke: 'rgb(180, 180, 255)',
                } }))));
};
exports.default = Sparkline;
