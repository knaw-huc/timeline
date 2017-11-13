"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Wrapper = (props) => React.createElement("div", { onClick: props.onClick, style: {
        backgroundColor: '#444',
        borderBottomLeftRadius: '3px',
        borderTopLeftRadius: '3px',
        bottom: '100px',
        color: 'white',
        cursor: 'pointer',
        fontSize: '0.6em',
        overflowX: 'hidden',
        padding: '1%',
        position: 'absolute',
        right: props.active ? 0 : '-146px',
        transition: 'right 300ms',
        width: '150px',
    } }, props.children);
const DomainData = (props) => React.createElement("section", { style: { marginBottom: '1em', whiteSpace: 'nowrap' } },
    React.createElement("h3", { style: { margin: 0 } }, props.visible ? 'Visible domain' : 'Domain'),
    React.createElement("span", null, `${props.domain.width.toFixed(0)}px wide`),
    React.createElement("br", null),
    React.createElement("span", null, `${props.domain.countDays().toFixed(0)} days`),
    React.createElement("br", null),
    React.createElement("span", null, `${(props.domain.countDays() / 365).toFixed(2)} years`),
    React.createElement("br", null),
    React.createElement("br", null),
    React.createElement("span", null, `One pixel is: ${(props.domain.countDays() / props.domain.width).toFixed(2)} days`),
    React.createElement("br", null),
    React.createElement("span", null, `One day is: ${(props.domain.width / props.domain.countDays()).toFixed(4)}px`),
    React.createElement("br", null),
    React.createElement("br", null),
    React.createElement("span", null, `From: ${props.domain.from}`),
    React.createElement("br", null),
    React.createElement("span", null, `To: ${props.domain.to}`),
    React.createElement("br", null),
    React.createElement("br", null));
class Dev extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            active: true,
        };
    }
    render() {
        return (React.createElement(Wrapper, { active: this.state.active, onClick: (ev) => this.setState({ active: !this.state.active }) },
            React.createElement(DomainData, { domain: this.props.domain }),
            React.createElement(DomainData, { domain: this.props.visibleDomain, visible: true })));
    }
}
exports.default = Dev;
