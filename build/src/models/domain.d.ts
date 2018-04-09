import { Granularity } from '../utils/dates';
import DomainConfig from './domain.config';
import { Pixels, Milliseconds, Ratio } from '../constants';
declare class Domain {
    config: DomainConfig;
    granularity: Granularity;
    pixelsPerMillisecond: number;
    width: number;
    height: number;
    private _left;
    left: number;
    nextDate: (d: Milliseconds) => Milliseconds;
    constructor(config: DomainConfig);
    updateLeft(): Pixels;
    positionAtDate(date: Milliseconds): Pixels;
    proportionAtPosition(position: Pixels): Ratio;
    dateAtProportion(proportion: Ratio): Milliseconds;
    readonly fromTo: [Milliseconds, Milliseconds];
}
export default Domain;
