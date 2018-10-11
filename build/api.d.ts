import { Animator } from './animator';
import { Props } from './models/props';
import View from './views';
export declare type OnChangeFunction = (props: Props, e?: Event) => void;
export default class Api {
    protected views: View[];
    animator: Animator;
    constructor();
    on(eventName: string, func: any): void;
    protected resize: () => void;
    reload(): void;
}
