"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const debounce = require("lodash.debounce");
const index_1 = require("./events/index");
const event_1 = require("./models/event");
const event_2 = require("./utils/event");
const sparkline_1 = require("./sparkline");
const domain_1 = require("./models/domain");
const Container = (props) => React.createElement("div", { ref: props.setRef, style: Object.assign({ backgroundColor: 'white', boxSizing: 'border-box', height: '100%', overflow: 'hidden', position: 'relative', width: '100%' }, props.style) }, props.children);
var DomainType;
(function (DomainType) {
    DomainType[DomainType["Event"] = 0] = "Event";
    DomainType[DomainType["Navigator"] = 1] = "Navigator";
    DomainType[DomainType["Sparkline"] = 2] = "Sparkline";
})(DomainType = exports.DomainType || (exports.DomainType = {}));
class Timeline extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            domain: null,
            domainCenter: this.props.domainCenter,
            domainRatio: this.props.domainRatio,
            events: [],
            visibleDomain: null,
        };
        this.init = () => {
            const width = this.el.getBoundingClientRect().width;
            const height = this.el.getBoundingClientRect().height;
            const domain = new domain_1.default(this.props.from, this.props.to, width, height);
            const visibleDomain = this.getVisibleDomain(domain, this.state.domainCenter, this.state.domainRatio);
            const events = this.props.events != null ?
                event_2.addTop(this.props.events.map(e => new event_1.default(e, visibleDomain))) :
                null;
            this.setState({ events, domain, visibleDomain });
            if (this.props.load != null) {
                this.props.load(visibleDomain.from, visibleDomain.to);
            }
        };
        this.debouncedHandleResize = debounce(this.init, 200);
    }
    componentDidMount() {
        this.init();
        window.addEventListener('resize', this.debouncedHandleResize);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.hasOwnProperty('events')) {
            const events = event_2.addTop(nextProps.events.map(e => new event_1.default(e, this.state.visibleDomain)));
            this.setState({ events });
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.debouncedHandleResize);
    }
    render() {
        return (React.createElement(Container, { setRef: (el) => { this.el = el; }, style: this.props.style }, this.state.domain != null &&
            React.createElement("div", { style: { width: '100%', height: '100%' } },
                this.props.domains
                    .map(d => this.domainComponents(d)),
                this.props.children)));
    }
    domainComponents(domainDef) {
        domainDef = Object.assign({ domainLabels: false, ratio: 1, rulers: true, type: DomainType.Event }, domainDef);
        switch (domainDef.type) {
            case DomainType.Sparkline: {
                return (React.createElement(sparkline_1.default, { aggregate: this.props.aggregate, domain: this.state.domain, domainDef: domainDef, key: "sparkline" }));
            }
            case DomainType.Event: {
                return (React.createElement(index_1.default, { events: this.state.events, key: "events" }));
            }
        }
    }
    getVisibleDomain(domain, domainCenter, domainRatio) {
        const leftRatio = domainCenter - (domainRatio / 2);
        const rightRatio = domainCenter + (domainRatio / 2);
        const from = domain.dateAtProportion(leftRatio);
        const to = domain.dateAtProportion(rightRatio);
        return new domain_1.default(from, to, domain.width, domain.height);
    }
}
Timeline.defaultProps = {
    async: false,
    domainCenter: .5,
    domainRatio: 1,
};
exports.default = Timeline;
