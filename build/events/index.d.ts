/// <reference types="react" />
import * as React from 'react';
import { IEvent } from "../models/event";
import { IRootEvent } from "../models/root-event";
export interface IProps {
    events: IEvent[];
    root: IRootEvent;
}
declare class EventsComp extends React.Component<IProps, null> {
    render(): JSX.Element;
}
export default EventsComp;
