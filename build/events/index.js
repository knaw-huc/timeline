"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const interval_of_time_1 = require("./interval-of-time");
const index_1 = require("./point-in-time/index");
const rulers_1 = require("../rulers/rulers");
const domain_labels_1 = require("../sparkline/domain-labels");
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
        return (React.createElement("div", null,
            this.props.domain.rulers &&
                React.createElement(rulers_1.default, { domain: this.props.domain }),
            this.props.domain.domainLabels &&
                React.createElement(domain_labels_1.default, { domain: this.props.domain }),
            React.createElement(Ul, null, this.props.events.map((event, index) => event.isInterval() ?
                React.createElement(interval_of_time_1.default, { event: event, key: index }) :
                React.createElement(index_1.default, { event: event, key: index })))));
    }
}
exports.default = Events;
