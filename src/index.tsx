import * as React from 'react'
import * as debounce from 'lodash.debounce'
import Events from './events/index'
import Event from "./models/event"
import {addTop} from "./utils/event"
import Sparkline from './sparkline'
import Domain, { DomainType, IDomainDef } from './models/domain'
// import Dev from "./dev"
// import Indicator from './indicator'



const Container = (props) =>
	<div
		ref={props.setRef}
		style={{
			backgroundColor: 'white',
			boxSizing: 'border-box',
			height: '100%',
			overflow: 'hidden',
			position: 'relative',
			width: '100%',
			...props.style
		}}
	>
		{props.children}	
	</div>

export interface IServerEvent {
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
	domainCenter?: number // Between 0 and 1. 0 = left, .5 = centered, 1 = right
	domains: IDomainDef[]
	events?: IServerEvent[]
	from: Date,
	load?: (from: Date, to: Date) => void
	style?: React.CSSProperties
	to: Date,
}
export interface ITimelineState {
	domains: Domain[]
	domainCenter: number
	events: Event[]
}
class Timeline extends React.PureComponent<ITimelineProps, ITimelineState> {
	static defaultProps: Partial<ITimelineProps> = {
		aggregate: [],
		async: false,
		domainCenter: .5,
		events: [],
	}

	private el: Element

	public state: ITimelineState = {
		domains: [],
		domainCenter: this.props.domainCenter,
		events: [],
	};

	public componentDidMount() {
		const domains = this.getDomains(this.props)
		const events = this.getEvents(this.props.events, domains.find(d => d.type === DomainType.Event))
		this.setState({ domains, events })
		window.addEventListener('resize', this.debouncedHandleResize)
	}

	public componentWillReceiveProps(nextProps: ITimelineProps) {
		if (
			this.props.from !== nextProps.from ||
			this.props.to !== nextProps.to
		) {
			this.setState({ domains: this.getDomains(nextProps) })
		}
		// if (nextProps.hasOwnProperty('events')) {
		// 	const events = addTop(nextProps.events.map(e => new Event(e, this.state.visibleDomain)))
		// 	this.setState({ events })
		// }
	}

	public componentWillUnmount() {
		window.removeEventListener('resize', this.debouncedHandleResize)
	}

	public render() {
		return (
			<Container
				setRef={(el) => { this.el = el }}
				style={this.props.style}
			>
				{ this.state.domains.map(this.domainComponents) }
				{/* <Dev domains={this.state.domains} /> */}
			</Container>
		)
	}

	public domainComponents = (domain: Domain, index: number) => {
		switch (domain.type) {
			case DomainType.Sparkline: {
				return (
					<Sparkline
						aggregate={this.props.aggregate}
						domain={domain}
						key="sparkline"
						style={{ zIndex: index }}
					/>
				)
			}
			case DomainType.Event: {
				return (
					<Events
						domain={domain}
						events={this.state.events}
						key="events"
						style={{ zIndex: index }}
					/>
				)
			}
		}
	}

	private getDomains(props: ITimelineProps): Domain[] {
		const rect = this.el.getBoundingClientRect()
		return props.domains.map(d => {
			return new Domain(props.from, props.to, rect.width, rect.height, props.domainCenter, d)
		})
	}

	private getEvents(events: IServerEvent[], domain: Domain): Event[] {
		return addTop(events.map(e => new Event(e, domain)))
	}

	// private init = () => {
	// 	const width = this.el.getBoundingClientRect().width
	// 	const height = this.el.getBoundingClientRect().height
	// 	const domain = new Domain(this.props.from, this.props.to, width, height)
	// 	const visibleDomain = this.getVisibleDomain(domain, this.state.domainCenter, this.state.domainRatio)
	// 	const events = this.props.events != null ?
	// 		addTop(this.props.events.map(e => new Event(e, visibleDomain))) :
	// 		null

	// 	this.setState({ events, domain, visibleDomain })

	// 	if (this.props.load != null) {
	// 		this.props.load(visibleDomain.from, visibleDomain.to)
	// 	}
	// }

	private debouncedHandleResize = debounce(() => this.setState({ domains: this.getDomains(this.props) }), 200)
}

export default Timeline
export { DomainType } from './models/domain'

						// <Rulers
						// 	domain={this.state.domain}
						// 	domainRatio={this.state.domainRatio}
						// 	visibleDomain={this.state.visibleDomain}
						// />
						// <Indicator
						// 	left={this.state.domain.positionAtDate(this.state.visibleDomain.from)}
						// 	onClick={(x) => {
						// 		const domainCenter = this.state.domain.proportionAtPosition(x)
						// 		const visibleDomain = this.getVisibleDomain(this.state.domain, domainCenter, this.state.domainRatio)
						// 		this.setState({ visibleDomain, domainCenter })
						// 		this.props.load(visibleDomain.from, visibleDomain.to)
						// 	}}
						// 	onMove={(left) => {
						// 		const domainCenter = this.state.domain.proportionAtPosition(left) + (this.state.domainRatio/2)
						// 		const visibleDomain = this.getVisibleDomain(this.state.domain, domainCenter, this.state.domainRatio)
						// 		this.setState({ visibleDomain, domainCenter })
						// 		this.props.load(visibleDomain.from, visibleDomain.to)
						// 	}}
						// 	width={this.state.domain.positionAtDate(this.state.visibleDomain.to) - this.state.domain.positionAtDate(this.state.visibleDomain.from)}
						// />