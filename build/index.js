"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const debounce = require("lodash.debounce");
const index_1 = require("./events/index");
const event_1 = require("./models/event");
const event_2 = require("./utils/event");
const sparkline_1 = require("./sparkline");
const domain_1 = require("./models/domain");
const dev_1 = require("./dev");
const Container = (props) => React.createElement("div", { ref: props.setRef, style: Object.assign({ backgroundColor: 'white', boxSizing: 'border-box', height: '100%', overflow: 'hidden', position: 'relative', width: '100%' }, props.style) }, props.children);
class Timeline extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            domains: [],
            domainCenter: this.props.domainCenter,
            events: [],
        };
        this.debouncedHandleResize = debounce(() => this.setState({ domains: this.getDomains(this.props) }), 200);
    }
    componentDidMount() {
        const domains = this.getDomains(this.props);
        const events = this.getEvents(this.props.events, domains.find(d => d.type === domain_1.DomainType.Event));
        this.setState({ domains, events });
        window.addEventListener('resize', this.debouncedHandleResize);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.from !== nextProps.from ||
            this.props.to !== nextProps.to) {
            this.setState({ domains: this.getDomains(nextProps) });
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.debouncedHandleResize);
    }
    render() {
        return (React.createElement(Container, { setRef: (el) => { this.el = el; }, style: this.props.style },
            this.state.domains.length &&
                React.createElement("div", { style: { width: '100%', height: '100%' } }, this.state.domains.map(d => this.domainComponents(d))),
            React.createElement(dev_1.default, { domains: this.state.domains })));
    }
    domainComponents(domain) {
        switch (domain.type) {
            case domain_1.DomainType.Sparkline: {
                return (React.createElement(sparkline_1.default, { aggregate: this.props.aggregate, domain: domain, key: "sparkline" }));
            }
            case domain_1.DomainType.Event: {
                return (React.createElement(index_1.default, { domain: domain, events: this.state.events, key: "events" }));
            }
        }
    }
    getDomains(props) {
        const rect = this.el.getBoundingClientRect();
        return props.domains.map(d => {
            return new domain_1.default(props.from, props.to, rect.width, rect.height, props.domainCenter, d);
        });
    }
    getEvents(events, domain) {
        return event_2.addTop(events.map(e => new event_1.default(e, domain)));
    }
}
Timeline.defaultProps = {
    aggregate: [],
    async: false,
    domainCenter: .5,
    events: [],
};
exports.default = Timeline;
var domain_2 = require("./models/domain");
exports.DomainType = domain_2.DomainType;
