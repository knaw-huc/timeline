/// <reference types="react" />
import * as React from 'react';
import Event from "../models/event";
export interface IProps {
    events: Event[];
}
declare class EventsComp extends React.Component<IProps, null> {
    render(): JSX.Element;
}
export default EventsComp;
