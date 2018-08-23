import { Animator } from './animator';
import { Props } from './models/props';
import View from './views';
export declare type OnChangeFunction = (props: Props, e?: Event) => void;
export default class Api {
    private onChange;
    protected views: View[];
    animator: Animator;
    constructor(onChange: OnChangeFunction);
    private handleChange;
    protected resize: () => void;
    reload(): void;
}
