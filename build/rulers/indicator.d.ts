/// <reference types="react" />
import * as React from 'react';
export interface IProps {
    left: number;
    onMove: (left: number) => void;
    width: number;
}
export interface IState {
    dragOffset: number;
    cursorXPosition: number;
    left: number;
    width: number;
}
declare class Indicator extends React.Component<IProps, IState> {
    private el;
    state: {
        cursorXPosition: any;
        dragOffset: any;
        left: number;
        width: number;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private onMouseUp;
}
export default Indicator;
