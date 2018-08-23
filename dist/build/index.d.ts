import Config from './models/config/index';
import { calcPixelsPerMillisecond } from './utils';
import { OrderedEvents, orderEvents } from './utils/events.worker';
import Api, { OnChangeFunction } from './api';
import MinimapBand from './models/band/minimap';
import EventsBand from './models/band/events';
import { formatDate } from './utils/dates';
import { RawEv3nt } from './models/event';
export { Config as TimelineConfig, EventsBand, MinimapBand, OrderedEvents, calcPixelsPerMillisecond, formatDate, orderEvents, RawEv3nt };
export declare type OnSelectFunction = (e: RawEv3nt) => void;
export default class Timeline extends Api {
    protected config: Config;
    private onSelect?;
    private wrapper;
    constructor(config: Config, onChange?: OnChangeFunction, onSelect?: OnSelectFunction);
    private render;
    private renderLabels;
    private appendToWrapper;
}
