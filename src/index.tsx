import * as React from 'react';
import * as debounce from 'lodash.debounce';
import Events from './events/index';
import Rulers from './rulers/index';
import styled, { StyledComponentClass } from "styled-components";
import {IEvent} from "./models/event";
import {IRootEvent, default as RootEvent} from "./models/root-event";
import Event from "./models/event";
import {addTop} from "./utils/event";
import Dev from "./dev";
import {Granularity} from "./constants";

const Container = styled.div`
	height: 100%;
	overflow: hidden;
	position: relative;
	width: 100%;
`;

export interface IRawEvent {
	date: Date;
	title: string;
}

export interface IRawRootEvent {
	dateRange: {
		from: Date;
		to: Date;
	};
	title: string;
}

export interface ITimelineProps {
	children?: React.ReactNode;
	events: IRawEvent[];
	root: IRawRootEvent;
}

export interface ITimelineState {
	events: IEvent[];
	granularity: Granularity;
	root: IRootEvent;
	width: number;
}

class Timeline extends React.Component<ITimelineProps, ITimelineState> {
	public state = {
		events: [],
		granularity: Granularity.DECADE,
		root: null,
		width: 0,
	};

	public componentDidMount() {
		const containerRect = document.getElementById('timeline-container').getBoundingClientRect();
		const root = new RootEvent(this.props.root, containerRect.width);
		const events = this.props.events.map(e => new Event(e, root));
		const eventsWithTop = addTop(events);
		this.setState({
			events: eventsWithTop,
			root,
			width: containerRect.width
		});

		window.addEventListener('resize', this.debouncedHandleResize);
	}

	public componentWillUnmount(): void {
		window.removeEventListener('resize', this.debouncedHandleResize);
	}

	public render() {
		const { children } = this.props;
		const { events, granularity, root, width } = this.state;

		return (
			<Container
				id="timeline-container"
			>
				{
					root != null &&
					<div style={{ width: '100%', height: '100%' }}>
						<Rulers
							granularity={granularity}
							root={root}
						/>
						<Events
							events={events}
							root={root}
						/>
						{/*<Dev root={root} width={width} />*/}
						{children}
					</div>
				}
			</Container>
		);
	}

	private resize = () => {
		const width = document.getElementById('timeline-container').getBoundingClientRect().width;
		const root = new RootEvent(this.props.root, width);
		const events = addTop(this.props.events.map(e => new Event(e, root)));
		this.setState({ events, root });
	};

	private debouncedHandleResize = debounce(this.resize, 200);
}

export default Timeline;
