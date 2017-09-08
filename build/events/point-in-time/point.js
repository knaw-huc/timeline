"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
const constants_1 = require("../../constants");
const set_icons_1 = require("../set-icons");
const Point = styled_components_1.default.div `
	background: ${(props) => props.event.isUncertain() ? `linear-gradient(to right, white, ${constants_1.timelineBlue}, white)` : 'initial'}; 
	display: inline-block;
	left: ${(props) => props.event.flip || props.event.isUncertain() ? 'initial' : '-6px'}; 
	line-height: 26px;
	position: ${(props) => props.event.isUncertain() ? `static` : 'absolute'}; 
	right: ${props => props.event.flip ? `-6px` : 'initial'};
	text-align: center;
	vertical-align: top;
	width: ${(props) => props.event.width > 0 ? `${props.event.width}px` : 'initial'};
	
	${props => set_icons_1.default(props.event.types, props.event.flip)}
`;
exports.default = Point;
