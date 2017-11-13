import { Granularity } from '../constants';
declare class Domain {
    from: Date;
    to: Date;
    width: number;
    pixelsPerDay: number;
    granularity: Granularity;
    constructor(from: Date, to: Date, width: number);
    positionAtDate(date: Date): number;
    dateAtPosition(x: number): Date;
    countDays(): number;
    dateAtProportion(proportion: number): Date;
    proportionAtPosition(position: number): number;
    private getGranularity();
}
export default Domain;
