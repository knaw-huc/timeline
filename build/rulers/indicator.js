"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const constants_1 = require("../constants");
class Indicator extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            cursorXPosition: null,
            dragOffset: null,
            left: this.props.left,
            width: this.props.width,
        };
        this.onMouseUp = () => {
            this.props.onMove(this.state.left);
            this.setState({
                dragOffset: null,
                cursorXPosition: null,
            });
        };
    }
    componentDidMount() {
        document.addEventListener('mouseup', this.onMouseUp);
    }
    componentWillUnmount() {
        document.addEventListener('mouseup', this.onMouseUp);
    }
    render() {
        return (React.createElement("div", { ref: (el) => { this.el = el; }, style: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: `${constants_1.DATE_BAR_HEIGHT}px`,
            } },
            React.createElement("div", { onMouseDown: (ev) => {
                    const cursorXPosition = ev.clientX - this.el.getBoundingClientRect().left;
                    this.setState({
                        dragOffset: cursorXPosition - this.state.left,
                    });
                }, onMouseMove: (ev) => {
                    if (this.state.dragOffset) {
                        const cursorXPosition = ev.clientX - this.el.getBoundingClientRect().left;
                        const left = cursorXPosition - this.state.dragOffset;
                        this.setState({ left });
                    }
                }, style: {
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
