"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const constants_1 = require("../constants");
const ruler_1 = require("./ruler");
const Ul = (props) => React.createElement("ul", { style: {
        bottom: props.type === 'visibledomain' ? `${constants_1.DATE_BAR_HEIGHT}px` : 0,
        height: props.type === 'visibledomain' ?
            'initial' :
            props.domainRatio < 1 ?
                `${constants_1.DATE_BAR_HEIGHT}px` :
                '100%',
        left: 0,
        position: 'absolute',
        right: 0,
        top: props.type === 'visibledomain' ? 0 : 'initial'
    } }, props.children);
const Rulers = (props) => {
    const rulers = [];
    const domain = props.type === 'visibledomain' ? props.visibleDomain : props.domain;
    const fromYear = domain.from.getFullYear();
    const toYear = domain.to.getFullYear();
    let i = props.relative ? 0 : fromYear;
    let j = props.relative ? toYear - fromYear : toYear;
    for (i; i <= j; i++) {
        if (domain.granularity === 3)
            rulers.push(i);
        else if ((domain.granularity === 2) && (i % 10 === 0))
            rulers.push(i);
        else if ((domain.granularity === 1) && (i % 100 === 0))
            rulers.push(i);
    }
    return (React.createElement(Ul, Object.assign({}, props), rulers.map((year, index) => {
        const absoluteYear = props.relative ? fromYear + year : year;
        const left = domain.leftPositionAtDate(new Date(absoluteYear.toString()));
        return (React.createElement(ruler_1.default, { toggleRelative: props.toggleRelative, key: index, left: left, label: year.toString() }));
    })));
};
exports.default = Rulers;
