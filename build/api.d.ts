import { Animator } from './animator';
import { Ratio } from './constants';
import View from './views';
import MinimapBand from './models/band/minimap';
import EventsBand from './models/band/events';
export interface OnChangeProps {
    center: Ratio;
    bands: (EventsBand | MinimapBand)[];
}
export declare type OnChangeFunction = (props: OnChangeProps, e?: Event) => void;
export default class Api {
    private onChange;
    protected views: View[];
    animator: Animator;
    constructor(onChange: (changeProps: OnChangeProps) => void);
    private handleChange;
    protected resize: () => void;
    reload(): void;
}
