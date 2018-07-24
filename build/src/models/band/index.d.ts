import { Granularity } from '../../utils/dates';
import { Pixels, Milliseconds, Ratio } from '../../constants';
import { BandConfig, MinimapDomainConfig, EventsDomainConfig } from '../config';
export default abstract class Band {
    config: BandConfig<MinimapDomainConfig | EventsDomainConfig>;
    protected readonly defaultZoomLevel: number;
    from: Milliseconds;
    to: Milliseconds;
    time: Milliseconds;
    granularity: Granularity;
    height: Pixels;
    pixelsPerMillisecond: Pixels;
    visibleRatio: Ratio;
    width: Pixels;
    private _left;
    left: number;
    private _zoomLevel;
    zoomLevel: number;
    nextDate: (d: Milliseconds) => Milliseconds;
    constructor(config: BandConfig<MinimapDomainConfig | EventsDomainConfig>);
    updateLeft(): Pixels;
    positionAtDate(date: Milliseconds): Pixels;
    proportionAtPosition(position: Pixels): Ratio;
    dateAtProportion(proportion: Ratio): Milliseconds;
}
