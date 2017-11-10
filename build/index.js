"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const debounce = require("lodash.debounce");
const index_1 = require("./events/index");
const index_2 = require("./rulers/index");
const styled_components_1 = require("styled-components");
const root_event_1 = require("./models/root-event");
const event_1 = require("./models/event");
const event_2 = require("./utils/event");
const dev_1 = require("./dev");
const sparkline_1 = require("./sparkline");
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
            events: [],
            granularity: 2,
            root: null,
            width: 0,
        };
        this.resize = () => {
            const width = document.getElementById('timeline-container').getBoundingClientRect().width;
            const root = new root_event_1.default(this.props.root, width);
            const events = event_2.addTop(this.props.events.map(e => new event_1.default(e, root)));
            this.setState({ events, root });
        };
        this.debouncedHandleResize = debounce(this.resize, 200);
    }
    componentDidMount() {
        const containerRect = document.getElementById('timeline-container').getBoundingClientRect();
        const root = new root_event_1.default(this.props.root, containerRect.width);
        const events = this.props.events.map(e => new event_1.default(e, root));
        const eventsWithTop = event_2.addTop(events);
        this.setState({
            events: eventsWithTop,
            root,
            width: containerRect.width
        });
        window.addEventListener('resize', this.debouncedHandleResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.debouncedHandleResize);
    }
    render() {
        const { children } = this.props;
        const { events, granularity, root, width } = this.state;
        return (React.createElement(Container, { id: "timeline-container" }, root != null &&
            React.createElement("div", { style: { width: '100%', height: '100%' } },
                React.createElement(index_2.default, { granularity: granularity, root: root }),
                React.createElement(sparkline_1.default, { aggregate: this.props.aggregate, width: this.state.width }),
                React.createElement(index_1.default, { events: events, root: root }),
                React.createElement(dev_1.default, { root: root, width: width }),
                children)));
    }
}
exports.default = Timeline;
