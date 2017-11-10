import * as React from 'react'
import { DATE_BAR_HEIGHT, Granularity } from "../constants";
import Ruler from './ruler'
import {IRootEvent} from "../models/root-event";
import Domain from '../models/domain';

const Ul: React.SFC<IProps> = (props) =>
	<ul
		style={{
			bottom: props.type === 'visibledomain' ? `${DATE_BAR_HEIGHT}px` : 0,
			height: props.type === 'visibledomain' ?
				'initial' :
				props.domainRatio < 1 ?
					`${DATE_BAR_HEIGHT}px` :
					'100%',
			left: 0,
			position: 'absolute',
			right: 0,
			top: props.type === 'visibledomain' ? 0 : 'initial'
		}}
	>
		{props.children}
	</ul>

export interface IProps {
	domain: Domain
	domainRatio: number
	relative: boolean
	toggleRelative: () => void
	type: 'sparkline' | 'visibledomain'
	visibleDomain: Domain
}
const Rulers: React.SFC<IProps> = (props) => {
	const rulers = [];
	const domain = props.type === 'visibledomain' ? props.visibleDomain : props.domain
	const fromYear = domain.from.getFullYear()
	const toYear = domain.to.getFullYear()

	let i = props.relative ? 0 : fromYear;
	let j = props.relative ? toYear - fromYear : toYear;

	for (i; i <= j; i++) {
		if (domain.granularity === Granularity.YEAR) rulers.push(i);
		else if ((domain.granularity === Granularity.DECADE) && (i % 10 === 0)) rulers.push(i);
		else if ((domain.granularity === Granularity.CENTURY) && (i % 100 === 0)) rulers.push(i);
	}

	return (
		<Ul {...props}>
			{
				// The year var can be simply the year (ie 1765) or the relative year (ie 165 if the start year is 1600)
				rulers.map((year: number, index: number) => {
					const absoluteYear = props.relative ? fromYear + year : year
					const left = domain.leftPositionAtDate(new Date(absoluteYear.toString()))
					return (
						<Ruler
							toggleRelative={props.toggleRelative}
							key={index}
							left={left}
							label={year.toString()}
						/>
					)
				})
			}
		</Ul>
	)
}

export default Rulers