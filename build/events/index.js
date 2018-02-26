"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const interval_of_time_1 = require("./interval-of-time");
const index_1 = require("./point-in-time/index");
const domain_wrapper_1 = require("../domain-wrapper");
const constants_1 = require("../constants");
const Wrapper = (props) => React.createElement("div", { onScroll: props.onScroll, style: {
        height: `calc(100% - ${constants_1.RULER_LABELS_HEIGHT}px)`,
        position: 'relative',
        width: '100%',
    } }, props.children);
const Ul = (props) => React.createElement("ul", { style: {
        height: `${props.height}px`,
        listStyle: 'none',
        margin: 0,
        padding: 0,
        width: '100%',
    } }, props.children);
class Events extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            events: this.props.events.filter(e => e.top < this.props.domain.viewportHeight),
            activeRegionHeight: this.props.domain.viewportHeight,
        };
    }
    componentDidMount() {
        if (this.props.fetchEvents != null)
            this.props.fetchEvents(this.props.domain.from, this.props.domain.to);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.events !== nextProps.events) {
            this.setState({
                events: nextProps.events.filter(e => e.top < this.state.activeRegionHeight)
            });
        }
    }
    render() {
        return (React.createElement(domain_wrapper_1.default, { domain: this.props.domain, style: this.props.style },
            React.createElement(Wrapper, { onScroll: (ev) => {
                    const activeRegionHeight = ev.nativeEvent.target.scrollTop + this.props.domain.viewportHeight;
                    if (activeRegionHeight > this.state.activeRegionHeight) {
                        const events = this.props.events.filter(e => e.top < this.state.activeRegionHeight);
                        this.setState({ activeRegionHeight, events });
                    }
                } },
                React.createElement(Ul, { height: this.props.events.reduce((a, b) => { if (b.top == null)
                        b.top = 0; return Math.max(a, b.top); }, 0) }, this.state.events
                    .map((event, index) => event.isInterval() ?
                    React.createElement(interval_of_time_1.default, { event: event, key: index }) :
                    React.createElement(index_1.default, { event: event, key: index }))))));
    }
}
exports.default = Events;
