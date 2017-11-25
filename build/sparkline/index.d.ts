/// <reference types="react" />
import * as React from 'react';
import { IAggregate } from '../index';
import Domain from '../models/domain';
export interface IProps {
    aggregate: IAggregate[];
    domain: Domain;
    style: React.CSSProperties;
}
declare const Sparkline: React.SFC<IProps>;
export default Sparkline;
