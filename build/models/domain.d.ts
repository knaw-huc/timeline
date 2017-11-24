import { Granularity } from '../constants';
declare class Domain {
    from: Date;
    to: Date;
    width: number;
    height: number;
    pixelsPerDay: number;
    granularity: Granularity;
    constructor(from: Date, to: Date, width: number, height: number);
    positionAtDate(date: Date): number;
    dateAtPosition(x: number): Date;
    countDays(): number;
    dateAtProportion(proportion: number): Date;
    proportionAtPosition(position: number): number;
    private getGranularity();
}
export default Domain;
