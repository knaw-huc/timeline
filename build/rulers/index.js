"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
const ruler_1 = require("./ruler");
const constants_1 = require("../constants");
const Rulers = styled_components_1.default.ul `
	font-size: 0.8em;
	list-style: none;
	margin: 0;
	padding: 0;
`;
const FromToLabel = styled_components_1.default.li `
	background: white;
	bottom: -1px;
	border: 1px solid #AAA;
	color: #AAA;
	font-size: 1.5em;
	line-height: ${constants_1.DATE_BAR_HEIGHT}px;
	padding: 0 0.8em;
	position: absolute;
	z-index: 1;
`;
class RulersComp extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            relative: false,
        };
    }
    render() {
        const { granularity, root } = this.props;
        const { relative } = this.state;
        const [fromYear, toYear] = [root.from.getFullYear(), root.to.getFullYear()];
        const rulers = [];
        let i = this.state.relative ? 0 : fromYear;
        let j = this.state.relative ? toYear - fromYear : toYear;
        for (i; i <= j; i++) {
            if (granularity === 3)
                rulers.push(i);
            else if ((granularity === 2) && (i % 10 === 0))
                rulers.push(i);
            else if ((granularity === 1) && (i % 100 === 0))
                rulers.push(i);
        }
        return (React.createElement(Rulers, null, rulers.map((year, index) => React.createElement(ruler_1.default, { toggleRelative: () => this.setState({ relative: !relative }), key: index, left: this.state.relative ?
                root.leftPositionAtDate(new Date((fromYear + year).toString())) :
                root.leftPositionAtDate(new Date(year.toString())), label: year.toString() }))));
    }
}
exports.default = RulersComp;
