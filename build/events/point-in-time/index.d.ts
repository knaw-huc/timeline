/// <reference types="react" />
import * as React from 'react';
import { StyledComponentClass } from "styled-components";
import { IEvent } from "../../models/event";
export interface IPointInTime {
    className?: string;
    event: IEvent;
    isNewEvent?: boolean;
    onHandleMouseDown?: (string, number) => void;
    style?: any;
}
export interface IPointInTimeContainer {
    event: IEvent;
}
export declare const PointInTimeContainer: StyledComponentClass<IPointInTimeContainer & React.HTMLProps<HTMLOListElement | HTMLUListElement> & {
    style: {
        left: string;
        paddingLeft: string;
        paddingRight: string;
        right: string;
        width: string;
    };
    title: string;
}, any, IPointInTimeContainer & React.HTMLProps<HTMLOListElement | HTMLUListElement>>;
declare const PointInTime: React.StatelessComponent<IPointInTime>;
export default PointInTime;
