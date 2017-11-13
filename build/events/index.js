"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const interval_of_time_1 = require("./interval-of-time");
const index_1 = require("./point-in-time/index");
const constants_1 = require("../constants");
const Events = (props) => React.createElement("ul", { style: {
        height: `calc(100% - ${constants_1.DATE_BAR_HEIGHT * 2}px)`,
        listStyle: 'none',
        margin: '0 auto',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: 0,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
    } }, props.children);
class EventsComp extends React.Component {
    render() {
        return (React.createElement(Events, null, this.props.events.map((event, index) => event.isInterval() ?
            React.createElement(interval_of_time_1.default, { event: event, key: index }) :
            React.createElement(index_1.default, { event: event, key: index }))));
    }
}
exports.default = EventsComp;
