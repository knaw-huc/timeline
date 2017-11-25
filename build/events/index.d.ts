/// <reference types="react" />
import * as React from 'react';
import Event from "../models/event";
import Domain from '../models/domain';
export interface IProps {
    domain: Domain;
    events: Event[];
    style: React.CSSProperties;
}
declare class Events extends React.PureComponent<IProps, null> {
    render(): JSX.Element;
}
export default Events;
