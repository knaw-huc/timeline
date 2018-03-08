import { Granularity } from '../utils/dates';
import DomainConfig from './domain.config';
declare class Domain {
    config: DomainConfig;
    granularity: Granularity;
    pixelsPerDay: number;
    private _left;
    height: number;
    width: number;
    prevDate: (d: Date) => Date;
    nextDate: (d: Date) => Date;
    constructor(config: DomainConfig);
    initialActiveRange(iteration: number): [Date, Date, boolean];
    dateAtPosition(x: number): Date;
    dateAtProportion(proportion: number): Date;
    left: number;
    updateLeft(): number;
    positionAtDate(date: Date): number;
    proportionAtPosition(position: number): number;
}
export default Domain;
