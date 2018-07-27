import { Animator } from './animator';
import { Ratio, Milliseconds } from './constants';
export interface OnChangeFunctionProps {
    center: Ratio;
    visibleFrom: Milliseconds;
    visibleTo: Milliseconds;
}
export declare type OnChangeFunction = (props: OnChangeFunctionProps, e?: Event) => void;
export default class Api {
    animator: Animator;
    constructor();
    init(onInit: OnChangeFunction): void;
    change(onChange: OnChangeFunction): void;
    private handleChange;
}
