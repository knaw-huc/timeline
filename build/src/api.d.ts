import { Animator } from './animator';
import { Ratio, Milliseconds } from './constants';
import View from './views';
export interface OnChangeFunctionProps {
    center: Ratio;
    bands: {
        from: Milliseconds;
        to: Milliseconds;
        zoomLevel: number;
    }[];
}
export declare type OnChangeFunction = (props: OnChangeFunctionProps, e?: Event) => void;
export default class Api {
    private onChange;
    protected views: View[];
    animator: Animator;
    constructor(rootElement: HTMLElement, onChange: (changeProps: OnChangeFunctionProps) => void);
    private handleChange;
    protected resize: () => void;
    reload(): void;
}
