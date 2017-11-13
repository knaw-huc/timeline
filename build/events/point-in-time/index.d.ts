/// <reference types="react" />
import * as React from 'react';
import Event from "../../models/event";
export interface IPointInTime {
    className?: string;
    event: Event;
    isNewEvent?: boolean;
    onHandleMouseDown?: (string, number) => void;
    style?: any;
}
export interface IPointInTimeContainer {
    event: Event;
}
declare const PointInTime: React.StatelessComponent<IPointInTime>;
export default PointInTime;
