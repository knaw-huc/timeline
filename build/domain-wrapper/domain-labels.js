"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Span = (props) => React.createElement("span", { style: {
        textShadow: '-3px 0 rgba(255, 255, 255, .7), 3px 0 rgba(255, 255, 255, .7), 0 -3px rgba(255, 255, 255, .7), 0 3px rgba(255, 255, 255, .7)',
    } }, props.children);
const DomainLabels = (props) => React.createElement("div", { style: {
        alignItems: 'center',
        boxSizing: 'border-box',
        color: '#666',
        display: 'grid',
        height: '100%',
        gridTemplateColumns: '50% 50%',
        padding: '0 .25em',
        position: 'absolute',
        width: '100%',
        zIndex: 2,
    } },
    React.createElement("div", null,
        React.createElement(Span, null, props.domain.from.getFullYear())),
    React.createElement("div", { style: { textAlign: 'right' } },
        React.createElement(Span, null, props.domain.to.getFullYear())));
exports.default = DomainLabels;
