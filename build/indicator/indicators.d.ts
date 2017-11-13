/// <reference types="react" />
import * as React from 'react';
export interface IDomainIndicator {
    onClick: (ev: any) => void;
    setRef: (el: Element) => void;
}
export declare const DomainIndicator: React.SFC<IDomainIndicator>;
export interface IVisibleDomainIndicator {
    dragging: boolean;
    onMouseDown: (ev: any) => void;
    left: number;
    width: number;
}
export declare const VisibleDomainIndicator: React.SFC<IVisibleDomainIndicator>;
