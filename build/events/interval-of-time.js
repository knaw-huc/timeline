"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const cx = require("classnames");
const constants_1 = require("../constants");
const styled_components_1 = require("styled-components");
const event_1 = require("./event");
const percentageOfDateInEvent = (date, event) => {
    return (date.getTime() - event.from.getTime()) / (event.to.getTime() - event.from.getTime());
};
const IntervalOfTimeLink = styled_components_1.default.a `
	color: #DDD;
	cursor: pointer;
	text-decoration: none;
	background: rgba(0, 0, 0, 0.4);
	border-radius: 2px;
	box-sizing: border-box;
	max-width: ${(props) => props.event.width > constants_1.EVENT_MIN_SPACE ? 'calc(100% - 8px)' : constants_1.EVENT_MIN_SPACE};
	overflow: hidden;
	right: ${(props) => props.event.flip ? '4px' : 'initial'};
	text-overflow: ellipsis;
	padding: 0 4px;
	position: absolute;
`;
class IntervalOfTimeComp extends React.Component {
    constructor() {
        super(...arguments);
        this.handleMouseDown = (ev) => {
            let handle;
            if (ev.target.matches('div.uncertain-w-resize-handle')) {
                handle = 'west-resize';
            }
            else if (ev.target.matches('div.uncertain-e-resize-handle')) {
                handle = 'east-resize';
            }
            else if (ev.target.matches('div.w-resize-handle')) {
                handle = 'west-resize';
            }
            else if (ev.target.matches('div.e-resize-handle')) {
                handle = 'east-resize';
            }
            else if (ev.target.matches('li.interval-of-time') ||
                ev.target.matches('.move-handle') ||
                ev.target.matches('.move-handle .title')) {
                handle = 'move';
            }
            this.props.onHandleMouseDown(handle, ev.pageX);
        };
    }
    render() {
        const { event, isNewEvent } = this.props;
        return (React.createElement("li", { className: this.props.className }, isNewEvent ?
            React.createElement("div", { className: "handles" },
                React.createElement("div", { className: "w-resize-handle" }),
                isNewEvent && event.isUncertain() ? React.createElement("div", { className: "uncertain-w-resize-handle" }) : null,
                React.createElement("div", { className: "move-handle" },
                    React.createElement("div", { className: cx('title', event.types, {
                            fill: event.width > constants_1.EVENT_MIN_SPACE,
                        }) }, event.title)),
                isNewEvent && event.isUncertain() ? React.createElement("div", { className: "uncertain-e-resize-handle" }) : null,
                React.createElement("div", { className: "e-resize-handle" })) :
            React.createElement(IntervalOfTimeLink, { event: event, onClick: (ev) => this.props.onEventClick(event, ev) }, event.title)));
    }
}
const IntervalOfTime = styled_components_1.default(IntervalOfTimeComp) `
	${event_1.eventCSS}
	${event_1.intervalOfTimeCSS}
	
	background: ${props => {
    if (props.event.dateRangeUncertain != null) {
        const percFrom = percentageOfDateInEvent(props.event.dateRangeUncertain.from, props.event);
        const percTo = percentageOfDateInEvent(props.event.dateRangeUncertain.to, props.event);
        return `linear-gradient(to right, ${constants_1.timelineBlue}, ${constants_1.timelineLightestBlue} ${percFrom * 100}%, ${constants_1.timelineLightestBlue} ${percTo * 100}%, ${constants_1.timelineBlue})`;
    }
    else {
        return constants_1.timelineLightestBlue;
    }
}};
	left: ${props => props.event.left}px;
	top: ${props => props.event.top}px;
	width: ${props => props.event.width}px;
`;
exports.default = IntervalOfTime;
