import * as React from 'react';
import IntervalOfTime from './interval-of-time';
import PointInTime from './point-in-time/index'
import Event from "../models/event"
import Domain from '../models/domain'
import DomainWrapper from '../domain-wrapper'
import { RULER_LABELS_HEIGHT } from '../constants';

const Wrapper = (props) =>
	<div
		onScroll={props.onScroll}
		style={{
			height: `calc(100% - ${RULER_LABELS_HEIGHT}px)`,
			overflowX: 'hidden',
			overflowY: 'auto',
			position: 'relative',
			width: '100%',
		}}
	>
		{props.children}
	</div>

const Ul = (props) =>
	<ul
		style={{
			height: `${props.height}px`,
			listStyle: 'none',
			margin: 0,
			padding: 0,
			width: '100%',
		}}
	>
		{props.children}
	</ul>

export interface IProps {
	domain: Domain
	events: Event[]
	fetchEvents: (from: Date, to: Date) => void
	style: React.CSSProperties
}
export interface IState {
	activeRegionHeight: number
	events: Event[]
}
class Events extends React.PureComponent<IProps, IState> {
	public state = {
		events: this.props.events.filter(e => e.top < this.props.domain.viewportHeight),
		activeRegionHeight: this.props.domain.viewportHeight,
	}

	public componentDidMount() {
		if (this.props.fetchEvents != null) this.props.fetchEvents(this.props.domain.from, this.props.domain.to)
	}

	public componentWillReceiveProps(nextProps) {
		if (this.props.events !== nextProps.events) {
			this.setState({
				events: nextProps.events.filter(e => e.top < this.state.activeRegionHeight)
			})
		}
	}

	public render() {
		return (
			<DomainWrapper
				domain={this.props.domain}
				style={this.props.style}
			>
				<Wrapper
					onScroll={(ev) => {
						const activeRegionHeight = ev.nativeEvent.target.scrollTop + this.props.domain.viewportHeight
						if (activeRegionHeight > this.state.activeRegionHeight) {
							const events = this.props.events.filter(e => e.top < this.state.activeRegionHeight)
							this.setState({ activeRegionHeight, events })

						}
					}}
				>
					<Ul
						height={this.props.events.reduce((a, b) => { if (b.top == null) b.top = 0; return Math.max(a, b.top) }, 0)}
					>
						{
							this.state.events
								.map((event, index) =>
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
				</Wrapper>
			</DomainWrapper>
		)
	}
}

export default Events
