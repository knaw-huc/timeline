"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const rulers_1 = require("./rulers");
const Wrapper = (props) => React.createElement("div", { style: { fontSize: '0.8em' } }, props.children);
class RulersComp extends React.Component {
    render() {
        return (React.createElement(Wrapper, null,
            React.createElement(rulers_1.default, Object.assign({ type: "visibledomain" }, this.props, this.state)),
            React.createElement(rulers_1.default, Object.assign({ type: "sparkline" }, this.props, this.state))));
    }
}
exports.default = RulersComp;
