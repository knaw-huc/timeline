import { Granularity } from '../utils/dates';
import DomainConfig from './domain.config';
import Ev3nt from './event';
declare class Domain {
    config: DomainConfig;
    granularity: Granularity;
    pixelsPerDay: number;
    width: number;
    height: number;
    private _left;
    left: number;
    nextDate: (d: Date) => Date;
    topAdder: (e: Ev3nt) => Ev3nt;
    constructor(config: DomainConfig);
    dateAtPosition(x: number): Date;
    dateAtProportion(proportion: number): Date;
    updateLeft(): number;
    positionAtDate(date: Date): number;
    proportionAtPosition(position: number): number;
    proportionAtDate(date: Date): number;
}
export default Domain;
