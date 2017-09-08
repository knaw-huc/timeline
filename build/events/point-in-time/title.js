"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
const constants_1 = require("../../constants");
const Title = styled_components_1.default.div `
	display: inline-block;
	line-height: 26px;
	margin-left: ${(props) => (props.event.width > 0) ? `${(props.event.width / -2)}px` : 'initial'};
	max-width: calc(${constants_1.EVENT_MIN_SPACE}px - 12px);
	overflow: hidden;
	padding-left: ${(props) => props.event.isUncertain() ? '12px' : 'initial'};
	text-overflow: ellipsis;
`;
exports.default = Title;
