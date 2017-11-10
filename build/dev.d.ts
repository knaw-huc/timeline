/// <reference types="react" />
import * as React from 'react';
import Domain from './models/domain';
export interface IProps {
    domain: Domain;
    visibleDomain: Domain;
    width: number;
}
declare const Dev: React.SFC<IProps>;
export default Dev;
