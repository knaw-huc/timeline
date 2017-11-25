"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const constants_1 = require("../../constants");
const Point = (props) => React.createElement("div", { style: {
        backgroundImage: 'radial-gradient(white 20%, black 100%)',
        borderRadius: `${constants_1.EVENT_HEIGHT / 2}px`,
        display: 'inline-block',
        margin: '.25em 0',
        width: `${constants_1.EVENT_HEIGHT}px`,
        height: `${constants_1.EVENT_HEIGHT}px`,
    } });
exports.default = Point;
