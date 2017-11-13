"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const constants_1 = require("../../constants");
const Point = (props) => React.createElement("div", { style: {
        backgroundColor: 'black',
        borderRadius: `${constants_1.EVENT_HEIGHT / 2}px`,
        display: 'inline-block',
        width: `${constants_1.EVENT_HEIGHT}px`,
        height: `${constants_1.EVENT_HEIGHT}px`,
    } });
exports.default = Point;
