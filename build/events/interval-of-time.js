"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const cx = require("classnames");
const constants_1 = require("../constants");
const IntervalOfTimeLink = (props) => React.createElement("a", { style: {
        background: 'rgba(0, 0, 0, 0.4)',
        borderRadius: '2px',
        boxSizing: 'border-box',
        color: '#DDD',
        cursor: 'pointer',
        maxWidth: (props) => props.event.width > constants_1.EVENT_MIN_SPACE ? 'calc(100% - 8px)' : constants_1.EVENT_MIN_SPACE,
        overflow: 'hidden',
        padding: '0 4px',
        position: 'absolute',
        textDecoration: 'none',
        textOverflow: 'ellipsis',
    } }, props.children);
class IntervalOfTimeComp extends React.Component {
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
exports.default = IntervalOfTimeComp;
