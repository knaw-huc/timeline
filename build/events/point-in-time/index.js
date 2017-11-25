"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const point_1 = require("./point");
const title_1 = require("./title");
const constants_1 = require("../../constants");
const PointInTimeContainer = (props) => React.createElement("li", { style: {
        boxSizing: 'border-box',
        fontSize: '0.8em',
        left: `${props.event.left - 5}px`,
        position: 'absolute',
        top: `${props.event.top}px`,
        whiteSpace: 'nowrap',
        maxWidth: `${constants_1.EVENT_MIN_SPACE}px`,
    }, title: props.event.date.toString() }, props.children);
const PointInTime = (props) => React.createElement(PointInTimeContainer, { event: props.event },
    React.createElement(point_1.default, { event: props.event }),
    props.event.title != null &&
        React.createElement(title_1.default, null, props.event.title));
exports.default = PointInTime;
