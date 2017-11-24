/// <reference types="react" />
import * as React from 'react';
import Event from "./models/event";
import Domain, { IDomainDef } from './models/domain';
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
    domainCenter?: number;
    domainRatio?: number;
    domains: IDomainDef[];
    events?: IRawEvent[];
    from: Date;
    load?: (from: Date, to: Date) => void;
    style?: React.CSSProperties;
    to: Date;
}
export interface ITimelineState {
    domain: Domain;
    domains: Domain[];
    domainCenter: number;
    domainRatio: number;
    events: Event[];
    visibleDomain: Domain;
}
declare class Timeline extends React.Component<ITimelineProps, ITimelineState> {
    static defaultProps: Partial<ITimelineProps>;
    private el;
    state: ITimelineState;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    domainComponents(domain: Domain): JSX.Element;
    private init2;
    private debouncedHandleResize;
}
export default Timeline;
export { DomainType } from './models/domain';
