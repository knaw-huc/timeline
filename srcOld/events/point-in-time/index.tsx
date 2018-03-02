import * as React from 'react'
import Event from "../../models/event"
import Point from "./point"
import Title from "./title"
import { EVENT_MIN_SPACE } from '../../constants';

export interface IPointInTime {
	className?: string
	event: Event
	isNewEvent?: boolean
	onHandleMouseDown?: (string, number) => void
	style?: any
}

export interface IPointInTimeContainer {
	event: Event
}

const PointInTimeContainer: React.SFC<IPointInTimeContainer> = (props) =>
	<li
		style={{
			boxSizing: 'border-box',
			fontSize: '0.8em',
			left: `${props.event.left - 5}px`,
			position: 'absolute',
			top: `${props.event.top}px`,
			whiteSpace: 'nowrap',
			maxWidth: `${EVENT_MIN_SPACE}px`,
		}}
		title={props.event.date.toString()}
	>
		{props.children}
	</li>
	
const PointInTime: React.StatelessComponent<IPointInTime> = (props) =>
	<PointInTimeContainer event={props.event}>
		<Point event={props.event} />
		{
			props.event.title != null &&
			<Title>
				{props.event.title}
			</Title>
		}
	</PointInTimeContainer>

export default PointInTime;
