import Animator from './animator';
import Config from './models/config';
import { Ratio, Milliseconds } from './constants';
import Band from './views/band';
export interface OnChangeFunctionProps {
    center: Ratio;
    visibleFrom: Milliseconds;
    visibleTo: Milliseconds;
}
export declare type OnChangeFunction = (props: OnChangeFunctionProps, e?: Event) => void;
export default class Api {
    protected bands: Band[];
    animator: Animator;
    constructor(config: Config);
    init(onInit: OnChangeFunction): void;
    change(onChange: OnChangeFunction): void;
}
