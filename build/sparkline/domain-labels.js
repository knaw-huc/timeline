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
        fontSize: '1.5em',
        gridTemplateColumns: '50% 50%',
        padding: '0 .5em',
        position: 'absolute',
        width: '100%',
        zIndex: 2,
    } },
    React.createElement("div", null,
        React.createElement(Span, null, "1924")),
    React.createElement("div", { style: { textAlign: 'right' } },
        React.createElement(Span, null, "1948")));
exports.default = DomainLabels;
