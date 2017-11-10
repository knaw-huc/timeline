/// <reference types="react" />
import * as React from 'react';
import Event from "./models/event";
import Domain from './models/domain';
export interface IRawEvent {
    date: Date;
    title: string;
}
export interface IAggregate {
    count: number;
    year: number;
}
export interface ITimelineProps {
    aggregate?: IAggregate[];
    children?: React.ReactNode;
    events: IRawEvent[];
    from: Date;
    to: Date;
    domainCenter?: number;
    domainRatio?: number;
}
export interface ITimelineState {
    domain: Domain;
    domainCenter: number;
    events: Event[];
    visibleDomain: Domain;
    width: number;
}
declare class Timeline extends React.Component<ITimelineProps, ITimelineState> {
    static defaultProps: {
        domainCenter: number;
        domainRatio: number;
    };
    state: {
        domain: any;
        domainCenter: number;
        domainRatio: number;
        events: any[];
        visibleDomain: any;
        width: number;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private init;
    private getVisibleDomain(domain);
    private debouncedHandleResize;
}
export default Timeline;
