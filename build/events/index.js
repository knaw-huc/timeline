"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const interval_of_time_1 = require("./interval-of-time");
const index_1 = require("./point-in-time/index");
const domain_wrapper_1 = require("../domain-wrapper");
const Ul = (props) => React.createElement("ul", { style: {
        height: '100%',
        listStyle: 'none',
        margin: 0,
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: 0,
        width: '100%',
    } }, props.children);
class Events extends React.PureComponent {
    render() {
        return (React.createElement(domain_wrapper_1.default, { domain: this.props.domain, style: this.props.style },
            React.createElement(Ul, null, this.props.events.map((event, index) => event.isInterval() ?
                React.createElement(interval_of_time_1.default, { event: event, key: index }) :
                React.createElement(index_1.default, { event: event, key: index })))));
    }
}
exports.default = Events;
