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
    async?: boolean;
    children?: React.ReactNode;
    events: IRawEvent[];
    from: Date;
    load: (from: Date, to: Date) => void;
    to: Date;
    domainCenter?: number;
    domainRatio?: number;
}
export interface ITimelineState {
    domain: Domain;
    domainCenter: number;
    events: Event[];
    visibleDomain: Domain;
}
declare class Timeline extends React.Component<ITimelineProps, ITimelineState> {
    static defaultProps: Partial<ITimelineProps>;
    state: {
        domain: any;
        domainCenter: number;
        domainRatio: number;
        events: any[];
        visibleDomain: any;
    };
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private init;
    private getVisibleDomain(domain, domainCenter, domainRatio);
    private debouncedHandleResize;
}
export default Timeline;
