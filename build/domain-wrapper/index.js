"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const rulers_1 = require("../rulers");
const domain_labels_1 = require("./domain-labels");
class DomainWrapper extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            dragOffset: null,
            left: 0,
            dragStart: 0,
        };
        this.onMouseDown = (ev) => {
            document.addEventListener('mouseup', this.onMouseUp);
            this.setState({
                dragOffset: ev.clientX,
                dragStart: this.state.left,
            });
        };
        this.onMouseMove = (ev) => {
            if (this.state.dragOffset) {
                const left = this.state.dragStart - (this.state.dragOffset - ev.clientX);
                this.setState({ left });
            }
        };
        this.onMouseUp = () => {
            document.removeEventListener('mouseup', this.onMouseUp);
            setTimeout(() => { this.setState({ dragOffset: null }); }, 0);
        };
    }
    render() {
        return (React.createElement("div", { onMouseDown: this.onMouseDown, onMouseMove: this.onMouseMove, style: Object.assign({ height: `${this.props.domain.heightRatio * 100}%`, left: `${this.state.left}px`, position: 'absolute', top: `${this.props.domain.topOffsetRatio * 100}%`, width: `${this.props.domain.width}px` }, this.props.style) },
            this.props.domain.rulers &&
                React.createElement(rulers_1.default, { domain: this.props.domain }),
            this.props.domain.domainLabels &&
                React.createElement(domain_labels_1.default, { domain: this.props.domain }),
            this.props.children));
    }
}
exports.default = DomainWrapper;
