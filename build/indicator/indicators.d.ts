/// <reference types="react" />
import * as React from 'react';
import Domain from '../models/domain';
export interface IDomainIndicator {
    domain: Domain;
    onClick: (ev: any) => void;
    setRef: (el: Element) => void;
}
export declare const DomainIndicator: React.SFC<IDomainIndicator>;
export interface IVisibleDomainIndicator {
    domain: Domain;
    dragging: boolean;
    onMouseDown: (ev: any) => void;
    left: number;
    width: number;
}
export declare const VisibleDomainIndicator: React.SFC<IVisibleDomainIndicator>;
