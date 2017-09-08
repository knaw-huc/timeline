/// <reference types="react" />
import * as React from 'react';
import { IRootEvent } from "../models/root-event";
import { Granularity } from "../constants";
export interface IProps {
    granularity: Granularity;
    root: IRootEvent;
}
export interface IState {
    relative: boolean;
}
declare class RulersComp extends React.Component<IProps, IState> {
    state: {
        relative: boolean;
    };
    render(): JSX.Element;
}
export default RulersComp;
