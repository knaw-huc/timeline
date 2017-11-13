"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const indicators_1 = require("./indicators");
class Indicator extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            dragOffset: null,
            left: this.props.left,
            width: this.props.width,
        };
        this.cursorX = (ev) => ev.clientX - this.el.getBoundingClientRect().left;
        this.onClick = (ev) => {
            if (this.state.dragOffset == null)
                this.props.onClick(this.cursorX(ev));
        };
        this.onMouseDown = (ev) => {
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
            this.setState({
                dragOffset: this.cursorX(ev) - this.state.left,
            });
        };
        this.onMouseMove = (ev) => {
            if (this.state.dragOffset) {
                const left = this.cursorX(ev) - this.state.dragOffset;
                this.setState({ left });
            }
        };
        this.onMouseUp = () => {
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', this.onMouseUp);
            this.props.onMove(this.state.left);
            setTimeout(() => { this.setState({ dragOffset: null }); }, 0);
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.left !== this.state.left ||
            nextProps.width !== this.state.width) {
            this.setState({
                left: nextProps.left,
                width: nextProps.width,
            });
        }
    }
    render() {
        return (React.createElement(indicators_1.DomainIndicator, { onClick: this.onClick, setRef: (el) => { this.el = el; } },
            React.createElement(indicators_1.VisibleDomainIndicator, Object.assign({ dragging: this.state.dragOffset != null, onMouseDown: this.onMouseDown }, this.state))));
    }
}
exports.default = Indicator;
