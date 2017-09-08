"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
const event_1 = require("../event");
const point_1 = require("./point");
const title_1 = require("./title");
const li = styled_components_1.default.li;
exports.PointInTimeContainer = li.attrs({
    style: (props) => ({
        left: props.event.flip ? 'initial' : `${props.event.left}px`,
        paddingLeft: props.event.isUncertain() ? 'initial' : '12px',
        paddingRight: props.event.flip ? '12px' : 'intitial',
        right: props.event.flip ? `${props.event.root.width - props.event.left}px` : 'initial',
        width: props.event.width === 0 ?
            'initial' :
            props.event.width > 0 && props.event.width < 12 ?
                '12px' :
                `${props.event.width}px`
    }),
    title: (props) => `${props.event.title}\n${props.event.date}`,
}) `
	${event_1.eventCSS}
	
	// Check if top prop exists. A new event does not have a top prop.
 	${props => props.event.top != null ? `top: ${props.event.top}px;` : ''}
`;
const PointInTime = (props) => React.createElement(exports.PointInTimeContainer, { event: props.event },
    props.event.flip ? null : React.createElement(point_1.default, { event: props.event }),
    React.createElement(title_1.default, { event: props.event }, props.event.title),
    props.event.flip ? React.createElement(point_1.default, { event: props.event }) : null);
exports.default = PointInTime;
