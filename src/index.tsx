import * as React from 'react'
import * as debounce from 'lodash.debounce'
import Events from './events/index'
import Rulers from './rulers/index'
import styled, { StyledComponentClass } from "styled-components"
import Event from "./models/event"
import {IRootEvent, default as RootEvent} from "./models/root-event"
import {addTop} from "./utils/event"
import Dev from "./dev"
import {Granularity} from "./constants"
import Sparkline from './sparkline'
import Domain from './models/domain';
import Indicator from './rulers/indicator'

const Container = styled.div`
	background-color: white;
	height: 100%;
	overflow: hidden;
	position: relative;
	width: 100%;
`;

export interface IRawEvent {
	date: Date,
	title: string
}

export interface IAggregate {
	count: number
	year: number
}

export interface ITimelineProps {
	aggregate?: IAggregate[]
	children?: React.ReactNode
	events: IRawEvent[]
	from: Date,
	to: Date,
	domainCenter?: number // Between 0 and 1. 0 = left, .5 = centered, 1 = right
	domainRatio?: number // Between 0 and 1. 0 = no visible domain, 1 = whole domain visible
}
export interface ITimelineState {
	domain: Domain
	domainCenter: number
	events: Event[]
	visibleDomain: Domain
	width: number
}
class Timeline extends React.Component<ITimelineProps, ITimelineState> {
	static defaultProps = {
		domainCenter: .5,
		domainRatio: 1,
	}

	public state = {
		domain: null,
		domainCenter: this.props.domainCenter,
		domainRatio: this.props.domainRatio,
		events: [],
		visibleDomain: null,
		width: 0,
	};

	public componentDidMount() {
		this.init()

		window.addEventListener('resize', this.debouncedHandleResize)
	}

	public componentWillUnmount() {
		window.removeEventListener('resize', this.debouncedHandleResize)
	}

	public render() {
		const { children } = this.props
		const { events, width } = this.state

		return (
			<Container
				id="timeline-container"
			>
				{
					this.state.domain != null &&
					<div style={{ width: '100%', height: '100%' }}>
						<Rulers
							domain={this.state.domain}
							domainRatio={this.state.domainRatio}
							visibleDomain={this.state.visibleDomain}
						/>
						<Sparkline
							aggregate={this.props.aggregate}
							width={this.state.width}
						/>
						<Indicator
							left={this.state.domain.leftPositionAtDate(this.state.visibleDomain.from)}
							onMove={(left) => {
								this.setState({ domainCenter: this.state.domain.proportionAtPosition(left) + (this.state.domainRatio/2) }, this.init)
							}}
							width={this.state.domain.leftPositionAtDate(this.state.visibleDomain.to) - this.state.domain.leftPositionAtDate(this.state.visibleDomain.from)}
						/>
						<Events
							events={events}
						/>
						<Dev
							domain={this.state.domain}
							visibleDomain={this.state.visibleDomain}
							width={width}
						/>
						{children}
					</div>
				}
			</Container>
		)
	}

	private init = () => {
		const width = document.getElementById('timeline-container').getBoundingClientRect().width
		const domain = new Domain(this.props.from, this.props.to, width)
		const visibleDomain = this.getVisibleDomain(domain)
		const events = addTop(this.props.events.map(e => new Event(e, visibleDomain)))
		this.setState({ events, domain, visibleDomain, width })
	}

	private getVisibleDomain(domain: Domain): Domain {
		// ----- leftRatio --- visibleDomainCenter --- rightRatio -----
		// The area between leftRatio and rightRatio === this.props.visibleDomainRatio
		// Center point between leftRatio and rightRatio === this.props.visibleDomainCenter

		const leftRatio = this.state.domainCenter - (this.state.domainRatio/2) 
		const rightRatio = this.state.domainCenter + (this.state.domainRatio/2) 
		const from = domain.dateAtProportion(leftRatio)
		const to = domain.dateAtProportion(rightRatio)

		return new Domain(from, to, domain.width)
	}

	private debouncedHandleResize = debounce(this.init, 200)
}

export default Timeline
