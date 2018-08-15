import Config from './models/config/index';
import { calcPixelsPerMillisecond } from './utils';
import { OrderedEvents, orderEvents } from './utils/events.worker';
import Api from './api';
import MinimapBand from './models/band/minimap';
import EventsBand from './models/band/events';
export { Config as TimelineConfig, orderEvents, OrderedEvents, calcPixelsPerMillisecond, EventsBand, MinimapBand, };
export default class Timeline extends Api {
    protected config: Config;
    private onSelect?;
    private wrapper;
    constructor(config: Config, onChange?: any, onSelect?: any);
    private render;
    private renderLabels;
    private appendToWrapper;
}
