import * as React from 'react'
import { Granularity } from "../constants"
import Ruler from './ruler'
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
			bottom: 0,
			heigth: '100%',
			left: 0,
			listStyle: 'none',
			margin: 0,
			padding: 0,
			position: 'absolute',
			right: 0,
			top: 0,
			whiteSpace: 'nowrap',
		}}
	>
		{props.children}
	</ul>

export interface IProps {
	domain: Domain
}
const Rulers: React.SFC<IProps> = (props) => {
	const dates = dateRange(props.domain.from, props.domain.to, props.domain.granularity)
	const formatLabel = labelFormatter(props.domain.granularity)

	return (
		<Ul {...props}>
			{
				dates.map((date: Date, index: number) => {
					const labelComp = props.domain.rulerLabels ? formatLabel(date) : null
					return (
						<Ruler
							date={date}
							key={index}
							label={labelComp}
							left={props.domain.positionAtDate(date)}
						/>
					)
				})
			}
		</Ul>
	)
}

export default Rulers