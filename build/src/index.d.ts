import Config from './models/config';
import { orderEvents } from './utils/events.worker';
import { Milliseconds, Ratio } from './constants';
export { orderEvents };
export interface OnChangeFunctionProps {
    center: Ratio;
    visibleFrom: Milliseconds;
    visibleTo: Milliseconds;
}
export declare type OnChangeFunction = (props: OnChangeFunctionProps, e?: Event) => void;
export default class Timeline {
    private bands;
    private wrapper;
    constructor(config: Config);
    refresh: (config?: Partial<Config>) => void;
    private debouncedRefresh;
    init(onInit: OnChangeFunction): void;
    change(onChange: OnChangeFunction): void;
    private render();
    private renderBands();
    private renderIndicators();
    private appendToWrapper;
}
