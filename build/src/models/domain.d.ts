import { Granularity } from '../utils/dates';
import DomainConfig from './domain.config';
import { Pixels, Milliseconds, Ratio, Color } from '../constants';
declare class Domain {
    config: DomainConfig;
    color: Color;
    granularity: Granularity;
    height: number;
    pixelsPerMillisecond: number;
    width: number;
    private _left;
    left: number;
    nextDate: (d: Milliseconds) => Milliseconds;
    constructor(config: DomainConfig, color: Color);
    updateLeft(): Pixels;
    positionAtDate(date: Milliseconds): Pixels;
    proportionAtPosition(position: Pixels): Ratio;
    dateAtProportion(proportion: Ratio): Milliseconds;
    readonly fromTo: [Milliseconds, Milliseconds];
}
export default Domain;
