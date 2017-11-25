"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const rulers_1 = require("../rulers/rulers");
const domain_labels_1 = require("./domain-labels");
const DomainWrapper = (props) => React.createElement("div", { style: Object.assign({ height: '100%', position: 'absolute', width: '100%' }, props.style) },
    this.props.domain.rulers &&
        React.createElement(rulers_1.default, { domain: this.props.domain }),
    this.props.domain.domainLabels &&
        React.createElement(domain_labels_1.default, { domain: this.props.domain }),
    props.children);
exports.default = DomainWrapper;
