/// <reference types="react" />
import * as React from 'react';
import Event from "../models/event";
export interface IProps {
    className?: string;
    event: Event;
    key?: number;
    isNewEvent?: boolean;
    onEventClick?: (IEvent, MouseClickEvent) => void;
    onHandleMouseDown?: (string, number) => void;
}
declare class IntervalOfTimeComp extends React.Component<IProps, null> {
    render(): JSX.Element;
}
export default IntervalOfTimeComp;
