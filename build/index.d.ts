/// <reference types="react" />
import * as React from 'react';
import { IEvent } from "./models/event";
import { IRootEvent } from "./models/root-event";
import { Granularity } from "./constants";
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
export interface IAggregate {
    count: number;
    year: number;
}
export interface ITimelineProps {
    aggregate?: IAggregate[];
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
declare class Timeline extends React.Component<ITimelineProps, ITimelineState> {
    state: {
        events: any[];
        granularity: Granularity;
        root: any;
        width: number;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private resize;
    private debouncedHandleResize;
}
export default Timeline;
