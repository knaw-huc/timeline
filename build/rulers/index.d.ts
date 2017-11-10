/// <reference types="react" />
import * as React from 'react';
import Domain from '../models/domain';
export interface IProps {
    domain: Domain;
    domainRatio: number;
    visibleDomain: Domain;
}
export interface IState {
    relative: boolean;
}
declare class RulersComp extends React.Component<IProps, IState> {
    state: {
        relative: boolean;
    };
    render(): JSX.Element;
    private toggleRelative;
}
export default RulersComp;
