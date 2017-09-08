"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
const constants_1 = require("../constants");
const Label = styled_components_1.default.span `
	align-items: flex-end;
	background: white;
	bottom: 10px;
	display: flex;
	height: calc(${constants_1.DATE_BAR_HEIGHT} - 10px);
	color: #AAA;
	position: absolute;
`;
const Ruler = styled_components_1.default.li `
	border-left: 1px solid #EEE;
	box-sizing: border-box;
	height: 100%;
	padding-left: 6px;
	position: absolute;
	transition: all 1s cubic-bezier(.25,.8,.25,1);
`;
const RulerComp = (props) => React.createElement(Ruler, { className: props.className, style: {
        left: `${props.left}px`,
    } },
    React.createElement(Label, { onClick: props.toggleRelative }, props.label));
exports.default = RulerComp;
