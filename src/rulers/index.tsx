import * as React from 'react';
import styled from 'styled-components';
import Ruler from "./ruler";
import {IRootEvent} from "../models/root-event";
import {DATE_BAR_HEIGHT, Granularity} from "../constants";

const Rulers = styled.ul`
	font-size: 0.8em;
	list-style: none;
	margin: 0;
	padding: 0;
`;

const FromToLabel = styled.li`
	background: white;
	bottom: -1px;
	border: 1px solid #AAA;
	color: #AAA;
	font-size: 1.5em;
	line-height: ${DATE_BAR_HEIGHT}px;
	padding: 0 0.8em;
	position: absolute;
	z-index: 1;
`;

export interface IProps {
	granularity: Granularity;
	root: IRootEvent;
}

export interface IState {
	relative: boolean;
}

class RulersComp extends React.Component<IProps, IState> {
	public state = {
		relative: false,
	};

	public render() {
		const { granularity, root } = this.props;
		const { relative } = this.state;
		const [fromYear, toYear] = [root.from.getFullYear(), root.to.getFullYear()];
		const rulers = [];

		let i = this.state.relative ? 0 : fromYear;
		let j = this.state.relative ? toYear - fromYear : toYear;


		for (i; i <= j; i++) {
			if (granularity === Granularity.YEAR) rulers.push(i);
			else if ((granularity === Granularity.DECADE) && (i % 10 === 0)) rulers.push(i);
			else if ((granularity === Granularity.CENTURY) && (i % 100 === 0)) rulers.push(i);
		}

		return (
			<Rulers>
				<FromToLabel style={{left: '-1px'}}>
					{relative ?  0 : fromYear}
				</FromToLabel>
				{
					rulers.map((year: number, index: number) =>
						<Ruler
							toggleRelative={() => this.setState({ relative: !relative })}
							key={index}
							left={
								this.state.relative ?
									root.leftPositionAtDate(new Date((fromYear + year).toString())) :
									root.leftPositionAtDate(new Date(year.toString()))
							}
							label={year.toString()}
						/>
					)
				}
				<FromToLabel style={{right: '-1px'}}>
					{relative ? toYear - fromYear : toYear}
				</FromToLabel>
			</Rulers>
		);
	}
}

export default RulersComp;
