"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
exports.eventCSS = styled_components_1.css `
	box-sizing: border-box;
	color: #444;
	position: absolute;
	transition: all 1s cubic-bezier(.25, .8, .25, 1);
	white-space: nowrap;
`;
exports.intervalOfTimeCSS = styled_components_1.css `
	border-radius: 2px;
	height: 26px;
	padding: 4px 4px;

	&:hover {
		box-shadow: 0 4px 8px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.22);
	}	
`;
exports.default = null;
