import * as React from 'react'
import { DATE_BAR_HEIGHT, Granularity } from "../constants"
import Ruler from './ruler'
import {IRootEvent} from "../models/root-event"
import Domain from '../models/domain'
import dateRange from './date-range'

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const getWeekNumber = (date: Date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7)
};

type LabelFormatter = (date: Date) => JSX.Element
const labelFormatter = (granularity: Granularity): LabelFormatter => {
	if (granularity >= Granularity.YEAR) {
		return (d: Date) => <span>{d.getFullYear().toString()}</span>
	} else if (granularity === Granularity.MONTH) {
		return (d: Date) =>
			<span>
				{
					(d.getMonth() === 0) &&
					<span>{d.getFullYear().toString()}<br/></span>
				}
				{months[d.getMonth()]}
			</span>
	} else if (granularity === Granularity.WEEK) {
		const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
		return (d: Date) => <span>{months[d.getMonth()]}, week {getWeekNumber(d)}</span>
	} else if (granularity === Granularity.DAY) {
		const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
		return (d: Date) => <span>{days[d.getDate()]}</span>
	} else if (granularity === Granularity.HOUR) {
		return (d: Date) => <span>NOT IMPLEMENTED</span>
	}
}

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
			top: props.type === 'visibledomain' ? 0 : 'initial',
			whiteSpace: 'nowrap',
		}}
	>
		{props.children}
	</ul>

export interface IProps {
	domain: Domain
	domainRatio: number
	type: 'sparkline' | 'visibledomain'
	visibleDomain: Domain
}
const Rulers: React.SFC<IProps> = (props) => {
	const domain = props.type === 'visibledomain' ? props.visibleDomain : props.domain
	const dates = dateRange(domain.from, domain.to, domain.granularity)
	const formatLabel = labelFormatter(domain.granularity)

	return (
		<Ul {...props}>
			{
				dates.map((date: Date, index: number) =>
					<Ruler
						key={index}
						label={formatLabel(date)}
						left={domain.positionAtDate(date)}
					/>
				)
			}
		</Ul>
	)
}

export default Rulers