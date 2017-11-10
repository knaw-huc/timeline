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
const indicator_1 = require("./rulers/indicator");
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
            width: 0,
        };
        this.init = () => {
            const width = document.getElementById('timeline-container').getBoundingClientRect().width;
            const domain = new domain_1.default(this.props.from, this.props.to, width);
            const visibleDomain = this.getVisibleDomain(domain);
            const events = event_2.addTop(this.props.events.map(e => new event_1.default(e, visibleDomain)));
            this.setState({ events, domain, visibleDomain, width });
        };
        this.debouncedHandleResize = debounce(this.init, 200);
    }
    componentDidMount() {
        this.init();
        window.addEventListener('resize', this.debouncedHandleResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.debouncedHandleResize);
    }
    render() {
        const { children } = this.props;
        const { events, width } = this.state;
        return (React.createElement(Container, { id: "timeline-container" }, this.state.domain != null &&
            React.createElement("div", { style: { width: '100%', height: '100%' } },
                React.createElement(index_2.default, { domain: this.state.domain, domainRatio: this.state.domainRatio, visibleDomain: this.state.visibleDomain }),
                React.createElement(sparkline_1.default, { aggregate: this.props.aggregate, width: this.state.width }),
                React.createElement(indicator_1.default, { left: this.state.domain.leftPositionAtDate(this.state.visibleDomain.from), onMove: (left) => {
                        this.setState({ domainCenter: this.state.domain.proportionAtPosition(left) + (this.state.domainRatio / 2) }, this.init);
                    }, width: this.state.domain.leftPositionAtDate(this.state.visibleDomain.to) - this.state.domain.leftPositionAtDate(this.state.visibleDomain.from) }),
                React.createElement(index_1.default, { events: events }),
                React.createElement(dev_1.default, { domain: this.state.domain, visibleDomain: this.state.visibleDomain, width: width }),
                children)));
    }
    getVisibleDomain(domain) {
        const leftRatio = this.state.domainCenter - (this.state.domainRatio / 2);
        const rightRatio = this.state.domainCenter + (this.state.domainRatio / 2);
        const from = domain.dateAtProportion(leftRatio);
        const to = domain.dateAtProportion(rightRatio);
        return new domain_1.default(from, to, domain.width);
    }
}
Timeline.defaultProps = {
    domainCenter: .5,
    domainRatio: 1,
};
exports.default = Timeline;
