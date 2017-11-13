/// <reference types="react" />
import * as React from 'react';
import Domain from '../models/domain';
export interface IProps {
    domain: Domain;
    domainRatio: number;
    type: 'sparkline' | 'visibledomain';
    visibleDomain: Domain;
}
declare const Rulers: React.SFC<IProps>;
export default Rulers;
