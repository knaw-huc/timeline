"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const constants_1 = require("../constants");
class Indicator extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            dragOffset: null,
            left: this.props.left,
            width: this.props.width,
        };
        this.cursorX = (ev) => ev.clientX - this.el.getBoundingClientRect().left;
        this.onClick = (ev) => this.props.onClick(this.cursorX(ev));
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
                console.log('left', left);
                this.setState({ left });
            }
        };
        this.onMouseUp = () => {
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', this.onMouseUp);
            this.props.onMove(this.state.left);
            this.setState({
                dragOffset: null,
            });
            console.log('removing');
        };
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    render() {
        return (React.createElement("div", { onClick: this.onClick, ref: (el) => { this.el = el; }, style: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: `${constants_1.DATE_BAR_HEIGHT}px`,
            } },
            React.createElement("div", { onMouseDown: this.onMouseDown, style: {
                    position: 'absolute',
                    bottom: 0,
                    cursor: '-webkit-grab',
                    border: '1px solid red',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    height: `${constants_1.DATE_BAR_HEIGHT}px`,
                    left: `${this.state.left}px`,
                    width: `${this.state.width}px`,
                    zIndex: 3,
                } })));
    }
}
exports.default = Indicator;
