import * as React from 'react';
import IntervalOfTime from './interval-of-time';
import PointInTime from './point-in-time/index'
import Event from "../models/event"
import Domain from '../models/domain'
import DomainWrapper from '../domain-wrapper'

const Ul = (props) =>
	<ul
		style={{
			height: '100%',
			listStyle: 'none',
			margin: 0,
			overflowX: 'hidden',
			overflowY: 'auto',
			padding: 0,
			width: '100%',
		}}
	>
		{props.children}
	</ul>

export interface IProps {
	domain: Domain
	events: Event[]
	style: React.CSSProperties
}
class Events extends React.PureComponent<IProps, null> {
	public render() {
		return (
			<DomainWrapper
				domain={this.props.domain}
				style={this.props.style}
			>
				<Ul>
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
				</Ul>
			</DomainWrapper>
		)
	}
}

export default Events
