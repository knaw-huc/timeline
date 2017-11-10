/// <reference types="react" />
import * as React from 'react';
import { IAggregate } from '../index';
export interface IProps {
    aggregate: IAggregate[];
    width: number;
}
declare const Sparkline: React.SFC<IProps>;
export default Sparkline;
