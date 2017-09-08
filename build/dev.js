"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
const Wrapper = styled_components_1.default.div `
	position: absolute;
	padding: 1%;
	right: 0;
	bottom: 100px;
	background-color: rgba(0, 0, 0, 0.5);
	border-top-left-radius: 3px;
	border-bottom-left-radius: 3px;
	color: white;
	font-size: 0.6em;
`;
const Dev = ({ root, width }) => React.createElement(Wrapper, null,
    React.createElement("span", { style: { textDecoration: 'underline' } }, "Timeline"),
    React.createElement("br", null),
    React.createElement("span", null, ` width: ${width}px`),
    React.createElement("br", null),
    React.createElement("span", null, ` days: ${root.countDays().toFixed(0)} days`),
    React.createElement("br", null),
    React.createElement("span", null, ` years: ${(root.countDays() / 365).toFixed(2)} years`),
    React.createElement("br", null),
    React.createElement("br", null),
    React.createElement("span", null, `One pixel is: ${(root.countDays() / width).toFixed(2)} days`),
    React.createElement("br", null),
    React.createElement("span", null, `One day is: ${(width / root.countDays()).toFixed(4)}px`));
exports.default = Dev;
