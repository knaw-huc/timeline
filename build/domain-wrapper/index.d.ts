/// <reference types="react" />
import * as React from 'react';
import Domain from '../models/domain';
export interface IProps {
    domain: Domain;
    style: React.CSSProperties;
}
export interface IState {
    dragOffset: number;
    left: number;
    dragStart: number;
}
export default class DomainWrapper extends React.PureComponent<IProps, IState> {
    state: {
        dragOffset: any;
        left: number;
        dragStart: number;
    };
    render(): JSX.Element;
    private onMouseDown;
    private onMouseMove;
    private onMouseUp;
}
