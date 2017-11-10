"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Wrapper = (props) => React.createElement("div", { style: {
        position: 'absolute',
        padding: '1%',
        right: 0,
        bottom: '100px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderTopLeftRadius: '3px',
        borderBottomLeftRadius: '3px',
        color: 'white',
        fontSize: '0.6em',
    } }, props.children);
const Dev = ({ domain, visibleDomain, width }) => React.createElement(Wrapper, null,
    React.createElement("span", { style: { textDecoration: 'underline' } }, "Timeline"),
    React.createElement("br", null),
    React.createElement("span", null, `${width}px wide`),
    React.createElement("br", null),
    React.createElement("span", null, `${domain.countDays().toFixed(0)} days`),
    React.createElement("br", null),
    React.createElement("span", null, `${(domain.countDays() / 365).toFixed(2)} years`),
    React.createElement("br", null),
    React.createElement("br", null),
    React.createElement("span", null, `One pixel is: ${(domain.countDays() / width).toFixed(2)} days`),
    React.createElement("br", null),
    React.createElement("span", null, `One day is: ${(width / domain.countDays()).toFixed(4)}px`));
exports.default = Dev;
