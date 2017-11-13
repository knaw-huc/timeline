"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const debounce = require("lodash.debounce");
const index_1 = require("./events/index");
const index_2 = require("./rulers/index");
const styled_components_1 = require("styled-components");
const event_1 = require("./models/event");
const event_2 = require("./utils/event");
const dev_1 = require("./dev");
const sparkline_1 = require("./sparkline");
const domain_1 = require("./models/domain");
const indicator_1 = require("./indicator");
const Container = styled_components_1.default.div `
	background-color: white;
	height: 100%;
	overflow: hidden;
	position: relative;
	width: 100%;
`;
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
            const width = document.getElementById('timeline-container').getBoundingClientRect().width;
            const domain = new domain_1.default(this.props.from, this.props.to, width);
            const visibleDomain = this.getVisibleDomain(domain, this.state.domainCenter, this.state.domainRatio);
            const events = event_2.addTop(this.props.events.map(e => new event_1.default(e, visibleDomain)));
            this.setState({ events, domain, visibleDomain });
            this.props.load(visibleDomain.from, visibleDomain.to);
        };
        this.debouncedHandleResize = debounce(this.init, 200);
    }
    componentDidMount() {
        this.init();
        window.addEventListener('resize', this.debouncedHandleResize);
    }
    componentWillReceiveProps(nextProps) {
        const events = event_2.addTop(nextProps.events.map(e => new event_1.default(e, this.state.visibleDomain)));
        this.setState({ events });
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.debouncedHandleResize);
    }
    render() {
        return (React.createElement(Container, { id: "timeline-container" }, this.state.domain != null &&
            React.createElement("div", { style: { width: '100%', height: '100%' } },
                React.createElement(index_2.default, { domain: this.state.domain, domainRatio: this.state.domainRatio, visibleDomain: this.state.visibleDomain }),
                React.createElement(sparkline_1.default, { aggregate: this.props.aggregate, domain: this.state.domain }),
                React.createElement(indicator_1.default, { left: this.state.domain.positionAtDate(this.state.visibleDomain.from), onClick: (x) => {
                        const domainCenter = this.state.domain.proportionAtPosition(x);
                        const visibleDomain = this.getVisibleDomain(this.state.domain, domainCenter, this.state.domainRatio);
                        this.setState({ visibleDomain, domainCenter });
                        this.props.load(visibleDomain.from, visibleDomain.to);
                    }, onMove: (left) => {
                        const domainCenter = this.state.domain.proportionAtPosition(left) + (this.state.domainRatio / 2);
                        const visibleDomain = this.getVisibleDomain(this.state.domain, domainCenter, this.state.domainRatio);
                        this.setState({ visibleDomain, domainCenter });
                        this.props.load(visibleDomain.from, visibleDomain.to);
                    }, width: this.state.domain.positionAtDate(this.state.visibleDomain.to) - this.state.domain.positionAtDate(this.state.visibleDomain.from) }),
                React.createElement(index_1.default, { events: this.state.events }),
                React.createElement(dev_1.default, { domain: this.state.domain, visibleDomain: this.state.visibleDomain }),
                this.props.children)));
    }
    getVisibleDomain(domain, domainCenter, domainRatio) {
        const leftRatio = domainCenter - (domainRatio / 2);
        const rightRatio = domainCenter + (domainRatio / 2);
        const from = domain.dateAtProportion(leftRatio);
        const to = domain.dateAtProportion(rightRatio);
        return new domain_1.default(from, to, domain.width);
    }
}
Timeline.defaultProps = {
    async: false,
    domainCenter: .5,
    domainRatio: 1,
};
exports.default = Timeline;
