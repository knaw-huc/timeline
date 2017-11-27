/// <reference types="react" />
import * as React from 'react';
import Event from "./models/event";
import Domain, { IDomainDef } from './models/domain';
export interface IServerEvent {
    date: Date;
    title: string;
}
export interface IAggregate {
    count: number;
    year: number;
}
export interface ITimelineProps {
    aggregate?: IAggregate[];
    async?: boolean;
    domainCenter?: number;
    domains: IDomainDef[];
    events?: IServerEvent[];
    from: Date;
    fetchAggregate?: (from: Date, to: Date) => void;
    fetchEvents?: (from: Date, to: Date) => void;
    style?: React.CSSProperties;
    to: Date;
}
export interface ITimelineState {
    domains: Domain[];
    domainCenter: number;
    events: Event[];
}
declare class Timeline extends React.PureComponent<ITimelineProps, ITimelineState> {
    static defaultProps: Partial<ITimelineProps>;
    private el;
    state: ITimelineState;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: ITimelineProps): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    domainComponents: (domain: Domain, index: number) => JSX.Element;
    private getDomains(props);
    private getEvents(events, domain);
    private debouncedHandleResize;
}
export default Timeline;
export { DomainType } from './models/domain';
