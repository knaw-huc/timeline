import { Granularity } from '../../utils/dates';
import { Pixels, Milliseconds, Ratio } from '../../constants';
import { BandConfig, MinimapDomainConfig, EventsDomainConfig } from '../config';
export default abstract class Band {
    protected readonly defaultZoomLevel: number;
    from: Milliseconds;
    to: Milliseconds;
    time: Milliseconds;
    granularity: Granularity;
    height: Pixels;
    nextDate: (d: Milliseconds) => Milliseconds;
    pixelsPerMillisecond: Pixels;
    top: Pixels;
    visibleRatio: Ratio;
    width: Pixels;
    private _left;
    left: number;
    private _zoomLevel;
    zoomLevel: number;
    constructor(config: BandConfig<MinimapDomainConfig | EventsDomainConfig>);
    update(): void;
    positionAtTimestamp(date: Milliseconds): Pixels;
    proportionAtPosition(position: Pixels): Ratio;
    timestampAtProportion(proportion: Ratio): Milliseconds;
}
