import { Props } from './models/props';
import Config from './models/config/index';
import { calcPixelsPerMillisecond } from './utils';
import { OrderedEvents, orderEvents } from './utils/events.worker';
import Api, { OnChangeFunction } from './api';
import MinimapBand from './models/band/minimap';
import EventsBand from './models/band/events';
import { formatDate } from './utils/dates';
import { Ev3ntLocation, RawEv3nt } from './models/event';
export { Config as TimelineConfig, Props as TimelineProps, EventsBand, MinimapBand, OrderedEvents, calcPixelsPerMillisecond, formatDate, orderEvents, RawEv3nt, Ev3ntLocation };
export declare type OnSelectFunction = (e: RawEv3nt, band: EventsBand, props: Props) => void;
export default class Timeline extends Api {
    protected config: Config;
    private onSelect?;
    private wrapper;
    private popup;
    constructor(config: Config, onChange?: OnChangeFunction, onSelect?: OnSelectFunction);
    hidePopup(): void;
    showPopup(event: RawEv3nt): void;
    private render;
    private renderLabels;
    private appendToWrapper;
}
