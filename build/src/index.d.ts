import Config from './models/config/index';
import { calcPixelsPerMillisecond } from './utils';
import { OrderedEvents, orderEvents } from './utils/events.worker';
import Api from './api';
export { Config as TimelineConfig, orderEvents, OrderedEvents, calcPixelsPerMillisecond };
export default class Timeline extends Api {
    protected config: Config;
    private onSelect?;
    private minimapBandViews;
    private eventsBandView;
    private wrapper;
    constructor(config: Config, onChange?: any, onSelect?: any);
    private render;
    private renderLabels;
    private appendToWrapper;
    reload: (config?: Config) => void;
    resize: () => void;
}
