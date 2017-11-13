"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const constants_1 = require("../../constants");
const Title = (props) => React.createElement("div", { style: {
        display: 'inline-block',
        lineHeight: `${constants_1.EVENT_HEIGHT}px`,
        maxWidth: `calc(${constants_1.EVENT_MIN_SPACE}px - ${constants_1.EVENT_HEIGHT}px)`,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    } }, props.children);
exports.default = Title;
