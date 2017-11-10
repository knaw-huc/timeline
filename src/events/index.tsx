import * as React from 'react';
import IntervalOfTime from './interval-of-time';
import PointInTime from './point-in-time/index';
import styled from "styled-components";
import Event from "../models/event";
import {DATE_BAR_HEIGHT} from "../constants";

const Events = styled.ul`
	border-left: 1px solid #AAA;
	height: calc(100% - ${DATE_BAR_HEIGHT}px);
	list-style: none;
	margin: 0 auto;
	overflow-y: auto;
	padding: 0;
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
`;

export interface IProps {
	events: Event[]
}

class EventsComp extends React.Component<IProps, null> {
	public render() {
		return (
			<Events>
				{
					this.props.events.map((event, index) =>
						event.isInterval() ?
							<IntervalOfTime
								event={event}
								key={index}
							/> :
							<PointInTime
								event={event}
								key={index}
							/>
					)
				}
			</Events>
		)
	}
}

export default EventsComp;
