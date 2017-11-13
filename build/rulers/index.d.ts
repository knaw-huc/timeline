/// <reference types="react" />
import * as React from 'react';
import Domain from '../models/domain';
export interface IProps {
    domain: Domain;
    domainRatio: number;
    visibleDomain: Domain;
}
declare class RulersComp extends React.Component<IProps, null> {
    render(): JSX.Element;
}
export default RulersComp;
