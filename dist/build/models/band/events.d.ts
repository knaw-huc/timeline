import Band, { BandType } from '.';
import { EventsBandConfig } from '../config';
import { Pixels } from '../../constants';
import { RawEv3nt } from '../event';
export default class EventsBand extends Band<EventsBandConfig> {
    type: BandType;
    private height;
    private lowestVisibleRow;
    private highestVisibleRow;
    events: RawEv3nt[];
    rowCount: number;
    visibleEvents: RawEv3nt[];
    private _offsetY;
    offsetY: number;
    constructor(config: EventsBandConfig);
    init(): void;
    private getColor;
    private updateEvents;
    update(): void;
    getEventByCoordinates(x: Pixels, y: Pixels): RawEv3nt;
    zoomIn(): void;
    zoomOut(): void;
}
