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
import Indicator from './indicator'

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
	async?: boolean
	children?: React.ReactNode
	events: IRawEvent[]
	from: Date,
	load: (from: Date, to: Date) => void
	to: Date,
	domainCenter?: number // Between 0 and 1. 0 = left, .5 = centered, 1 = right
	domainRatio?: number // Between 0 and 1. 0 = no visible domain, 1 = whole domain visible
}
export interface ITimelineState {
	domain: Domain
	domainCenter: number
	events: Event[]
	visibleDomain: Domain
}
class Timeline extends React.Component<ITimelineProps, ITimelineState> {
	static defaultProps: Partial<ITimelineProps> = {
		async: false,
		domainCenter: .5,
		domainRatio: 1,
	}

	public state = {
		domain: null,
		domainCenter: this.props.domainCenter,
		domainRatio: this.props.domainRatio,
		events: [],
		visibleDomain: null,
	};

	public componentDidMount() {
		this.init()
		window.addEventListener('resize', this.debouncedHandleResize)
	}

	public componentWillReceiveProps(nextProps) {
		const events = addTop(nextProps.events.map(e => new Event(e, this.state.visibleDomain)))
		this.setState({ events })
	}

	public componentWillUnmount() {
		window.removeEventListener('resize', this.debouncedHandleResize)
	}

	public render() {
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
							domain={this.state.domain}
						/>
						<Indicator
							left={this.state.domain.positionAtDate(this.state.visibleDomain.from)}
							onClick={(x) => {
								const domainCenter = this.state.domain.proportionAtPosition(x)
								const visibleDomain = this.getVisibleDomain(this.state.domain, domainCenter, this.state.domainRatio)
								this.setState({ visibleDomain, domainCenter })
								this.props.load(visibleDomain.from, visibleDomain.to)
							}}
							onMove={(left) => {
								const domainCenter = this.state.domain.proportionAtPosition(left) + (this.state.domainRatio/2)
								const visibleDomain = this.getVisibleDomain(this.state.domain, domainCenter, this.state.domainRatio)
								this.setState({ visibleDomain, domainCenter })
								this.props.load(visibleDomain.from, visibleDomain.to)
							}}
							width={this.state.domain.positionAtDate(this.state.visibleDomain.to) - this.state.domain.positionAtDate(this.state.visibleDomain.from)}
						/>
						<Events
							events={this.state.events}
						/>
						<Dev
							domain={this.state.domain}
							visibleDomain={this.state.visibleDomain}
						/>
						{this.props.children}
					</div>
				}
			</Container>
		)
	}

	private init = () => {
		const width = document.getElementById('timeline-container').getBoundingClientRect().width
		const domain = new Domain(this.props.from, this.props.to, width)
		const visibleDomain = this.getVisibleDomain(domain, this.state.domainCenter, this.state.domainRatio)
		const events = addTop(this.props.events.map(e => new Event(e, visibleDomain)))
		this.setState({ events, domain, visibleDomain })
		this.props.load(visibleDomain.from, visibleDomain.to)
	}

	private getVisibleDomain(domain: Domain, domainCenter: number, domainRatio: number): Domain {
		// ----- leftRatio --- visibleDomainCenter --- rightRatio -----
		// The area between leftRatio and rightRatio === this.props.visibleDomainRatio
		// Center point between leftRatio and rightRatio === this.props.visibleDomainCenter

		const leftRatio = domainCenter - (domainRatio/2) 
		const rightRatio = domainCenter + (domainRatio/2) 
		const from = domain.dateAtProportion(leftRatio)
		const to = domain.dateAtProportion(rightRatio)

		return new Domain(from, to, domain.width)
	}

	private debouncedHandleResize = debounce(this.init, 200)
}

export default Timeline
