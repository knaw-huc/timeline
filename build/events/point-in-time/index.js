"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const point_1 = require("./point");
const title_1 = require("./title");
const PointInTimeContainer = (props) => React.createElement("li", { style: {
        left: `${props.event.left}px`,
        top: `${props.event.top}px`,
        width: `${props.event.width}px`,
        boxSizing: 'border-box',
        position: 'absolute',
    } }, props.children);
const PointInTime = (props) => React.createElement(PointInTimeContainer, { event: props.event },
    !props.event.flip &&
        React.createElement(point_1.default, { event: props.event }),
    props.event.title != null &&
        React.createElement(title_1.default, { event: props.event }, props.event.title),
    props.event.flip &&
        React.createElement(point_1.default, { event: props.event }));
exports.default = PointInTime;
