import { Props } from './models/props';
import Config from './models/config/index';
import { calcPixelsPerMillisecond } from './utils';
import { OrderedTimeline, orderEvents } from './utils/events.worker';
import Api from './api';
import MinimapBand from './models/band/minimap';
import EventsBand from './models/band/events';
import { formatDate } from './utils/dates';
import { Ev3ntLocation, RawEv3nt, Ev3nt, Voyage } from './models/event';
import { EventType } from './constants';
export { Config as TimelineConfig, Ev3nt, Ev3ntLocation, EventsBand, EventType, MinimapBand, OrderedTimeline, Props as TimelineProps, RawEv3nt, calcPixelsPerMillisecond, formatDate, orderEvents, Voyage, };
export declare type OnSelectFunction = (e: Ev3nt, band: EventsBand, props: Props) => void;
export default class Timeline extends Api {
    private wrapper;
    private popup;
    constructor(config: Config);
    hidePopup(): void;
    showPopup(event: Ev3nt): void;
    private render;
    private renderLabels;
    private appendToWrapper;
}
