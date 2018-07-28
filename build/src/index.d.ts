import Config from './models/config/index';
import { calcPixelsPerMillisecond } from './utils';
import { orderEvents, OrderedEvents } from './utils/events.worker';
import Api from './api';
export { Config as TimelineConfig, orderEvents, OrderedEvents, calcPixelsPerMillisecond };
export default class Timeline extends Api {
    private config;
    private wrapper;
    constructor(config: Config);
    resize: () => void;
    private debouncedResize;
    reload: (config?: Config) => void;
    private render();
    private renderLabels();
    private appendToWrapper;
}
