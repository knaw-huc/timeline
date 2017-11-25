"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const constants_1 = require("../constants");
const Label = (props) => React.createElement("span", { style: {
        alignItems: 'flex-end',
        bottom: '10px',
        display: 'flex',
        height: `calc(${constants_1.DATE_BAR_HEIGHT} - 10px)`,
        color: '#444',
        position: 'absolute',
        zIndex: 2,
    }, title: props.title }, props.children);
const Ruler = (props) => React.createElement("li", { style: {
        borderLeft: '1px solid #ccc',
        boxSizing: 'border-box',
        height: '100%',
        left: `${props.left}px`,
        paddingLeft: '6px',
        position: 'absolute',
        transition: 'all 1s cubic-bezier(.25,.8,.25,1)',
    } }, props.children);
const RulerComp = (props) => React.createElement(Ruler, { left: props.left },
    React.createElement(Label, { title: props.date.toString() }, props.label));
exports.default = RulerComp;
