/// <reference types="react" />
import * as React from 'react';
import Domain from './models/domain';
export interface IProps {
    domain: Domain;
    visibleDomain: Domain;
}
export interface IState {
    active: boolean;
}
declare class Dev extends React.Component<IProps, IState> {
    state: {
        active: boolean;
    };
    render(): JSX.Element;
}
export default Dev;
