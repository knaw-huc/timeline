"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const rulers_1 = require("./rulers");
const Wrapper = (props) => React.createElement("div", { style: { fontSize: '0.8em' } }, props.children);
class RulersComp extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            relative: false,
        };
        this.toggleRelative = () => this.setState({ relative: !this.state.relative });
    }
    render() {
        return (React.createElement(Wrapper, null,
            React.createElement(rulers_1.default, Object.assign({ toggleRelative: this.toggleRelative, type: "visibledomain" }, this.props, this.state)),
            React.createElement(rulers_1.default, Object.assign({ toggleRelative: this.toggleRelative, type: "sparkline" }, this.props, this.state))));
    }
}
exports.default = RulersComp;
