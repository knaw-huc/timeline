/// <reference types="react" />
import * as React from 'react';
import Event from "../models/event";
import Domain from '../models/domain';
export interface IProps {
    domain: Domain;
    events: Event[];
    fetchEvents: (from: Date, to: Date) => void;
    style: React.CSSProperties;
}
export interface IState {
    activeRegionHeight: number;
    events: Event[];
}
declare class Events extends React.PureComponent<IProps, IState> {
    state: {
        events: Event[];
        activeRegionHeight: number;
    };
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    render(): JSX.Element;
}
export default Events;
