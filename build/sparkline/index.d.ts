/// <reference types="react" />
import * as React from 'react';
import { IAggregate, IDomainDef } from '../index';
import Domain from '../models/domain';
export interface IProps {
    aggregate: IAggregate[];
    domain: Domain;
    domainDef: IDomainDef;
}
declare const Sparkline: React.SFC<IProps>;
export default Sparkline;
