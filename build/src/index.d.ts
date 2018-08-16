import Config from './models/config/index';
import { calcPixelsPerMillisecond } from './utils';
import { OrderedEvents, orderEvents } from './utils/events.worker';
import Api from './api';
import MinimapBand from './models/band/minimap';
import EventsBand from './models/band/events';
import { formatDate } from './utils/dates';
export { Config as TimelineConfig, EventsBand, MinimapBand, OrderedEvents, calcPixelsPerMillisecond, formatDate, orderEvents, };
export default class Timeline extends Api {
    protected config: Config;
    private onSelect?;
    private wrapper;
    constructor(config: Config, onChange?: any, onSelect?: any);
    private render;
    private renderLabels;
    private appendToWrapper;
}
