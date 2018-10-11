import Band, { BandType } from '.';
import { EventsBandConfig } from '../config';
import { Pixels } from '../../constants';
import { Ev3nt } from '../event';
import { OrderedBand } from '../../utils/events.worker';
export default class EventsBand extends Band<EventsBandConfig> {
    type: BandType;
    private height;
    private lowestVisibleRow;
    private highestVisibleRow;
    events: Ev3nt[];
    rowCount: number;
    visibleEvents: Ev3nt[];
    private _offsetY;
    offsetY: number;
    constructor(config: EventsBandConfig);
    init(orderedBand: OrderedBand): void;
    private getColor;
    private updateEvents;
    update(): void;
    getEventByCoordinates(x: Pixels, y: Pixels): Ev3nt;
    zoomIn(): void;
    zoomOut(): void;
}
