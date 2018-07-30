import { Animator } from './animator';
import { Ratio, Milliseconds } from './constants';
export interface OnChangeFunctionProps {
    center: Ratio;
    visibleFrom: Milliseconds;
    visibleTo: Milliseconds;
}
export declare type OnChangeFunction = (props: OnChangeFunctionProps, e?: Event) => void;
export default class Api {
    private onChange;
    animator: Animator;
    constructor(onChange: (changeProps: {
        center: Ratio;
        visibleFrom: Milliseconds;
        visibleTo: Milliseconds;
    }) => void);
    private handleChange;
    zoomIn(): void;
    zoomOut(): void;
}
