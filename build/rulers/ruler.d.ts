/// <reference types="react" />
import * as React from 'react';
export interface IProps {
    className?: string;
    left: number;
    toggleRelative: () => void;
    label: string;
}
declare const RulerComp: React.StatelessComponent<IProps>;
export default RulerComp;
