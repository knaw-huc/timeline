/// <reference types="react" />
import * as React from 'react';
import Domain from '../models/domain';
export interface IProps {
    domain: Domain;
    style: React.CSSProperties;
}
declare const DomainWrapper: React.SFC<IProps>;
export default DomainWrapper;
