import { Granularity } from '../../utils/dates';
import { Pixels, Milliseconds, Ratio } from '../../constants';
import { BandConfig } from '../config';
export default abstract class Band<T extends BandConfig> {
    config: T;
    protected readonly defaultZoomLevel: number;
    from: Milliseconds;
    to: Milliseconds;
    time: Milliseconds;
    granularity: Granularity;
    availableHeight: Pixels;
    visibleHeight: Pixels;
    visibleRowsCount: number;
    nextDate: (d: Milliseconds) => Milliseconds;
    pixelsPerMillisecond: Pixels;
    prevOffsetX: Pixels;
    prevZoomLevel: number;
    top: Pixels;
    visibleRatio: Ratio;
    width: Pixels;
    private _offsetX;
    offsetX: number;
    private _zoomLevel;
    zoomLevel: number;
    constructor(config: T);
    private setVerticalProps;
    private setHorizontalProps;
    init(): void;
    resize(): void;
    update(): void;
    updateConfig(props: {
        [prop: string]: string | number;
    }): void;
    positionAtTimestamp(timestamp: Milliseconds): Pixels;
    timestampAtProportion(proportion: Ratio): Milliseconds;
    timestampAtPosition(position: Pixels): Milliseconds;
}
