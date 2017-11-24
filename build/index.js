"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const debounce = require("lodash.debounce");
const index_1 = require("./events/index");
const sparkline_1 = require("./sparkline");
const domain_1 = require("./models/domain");
const Container = (props) => React.createElement("div", { ref: props.setRef, style: Object.assign({ backgroundColor: 'white', boxSizing: 'border-box', height: '100%', overflow: 'hidden', position: 'relative', width: '100%' }, props.style) }, props.children);
class Timeline extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            domains: [],
            domain: null,
            domainCenter: this.props.domainCenter,
            domainRatio: this.props.domainRatio,
            events: [],
            visibleDomain: null,
        };
        this.init2 = (props) => {
            const width = this.el.getBoundingClientRect().width;
            const height = this.el.getBoundingClientRect().height;
            this.setState({
                domains: props.domains.map(d => new domain_1.default(props.from, props.to, width, height, d))
            });
        };
        this.debouncedHandleResize = debounce(this.init2, 200);
    }
    componentDidMount() {
        this.init2(this.props);
        window.addEventListener('resize', this.debouncedHandleResize);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.from !== nextProps.from ||
            this.props.to !== nextProps.to) {
            this.init2(nextProps);
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.debouncedHandleResize);
    }
    render() {
        return (React.createElement(Container, { setRef: (el) => { this.el = el; }, style: this.props.style }, this.state.domains.length &&
            React.createElement("div", { style: { width: '100%', height: '100%' } }, this.state.domains
                .map(d => this.domainComponents(d)))));
    }
    domainComponents(domain) {
        switch (domain.type) {
            case domain_1.DomainType.Sparkline: {
                return (React.createElement(sparkline_1.default, { aggregate: this.props.aggregate, domain: domain, key: "sparkline" }));
            }
            case domain_1.DomainType.Event: {
                return (React.createElement(index_1.default, { events: this.state.events, key: "events" }));
            }
        }
    }
}
Timeline.defaultProps = {
    async: false,
    domainCenter: .5,
    domainRatio: 1,
};
exports.default = Timeline;
var domain_2 = require("./models/domain");
exports.DomainType = domain_2.DomainType;
