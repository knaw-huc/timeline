"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const rulers_1 = require("../rulers");
const domain_labels_1 = require("./domain-labels");
const DomainWrapper = (props) => React.createElement("div", { style: Object.assign({ height: `${props.domain.heightRatio * 100}%`, position: 'absolute', top: `${props.domain.topOffsetRatio * 100}%`, width: '100%' }, props.style) },
    props.domain.rulers &&
        React.createElement(rulers_1.default, { domain: props.domain }),
    props.domain.domainLabels &&
        React.createElement(domain_labels_1.default, { domain: props.domain }),
    props.children);
exports.default = DomainWrapper;
