/// <reference types="react" />
import * as React from 'react';
export interface IProps {
    date: Date;
    left: number;
    label: JSX.Element;
}
declare const RulerComp: React.SFC<IProps>;
export default RulerComp;
