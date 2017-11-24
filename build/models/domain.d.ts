import { Granularity } from '../constants';
export declare enum DomainType {
    Event = 0,
    Navigator = 1,
    Sparkline = 2,
}
export interface IDomainDef {
    domainLabels?: boolean;
    ratio?: number;
    rulers?: boolean;
    type?: DomainType;
}
interface Domain extends IDomainDef {
}
declare class Domain implements IDomainDef {
    from: Date;
    to: Date;
    width: number;
    height: number;
    pixelsPerDay: number;
    granularity: Granularity;
    ratio: number;
    type: DomainType;
    domainLabels: boolean;
    rulers: boolean;
    constructor(from: Date, to: Date, width: number, height: number, domainDef: IDomainDef);
    positionAtDate(date: Date): number;
    dateAtPosition(x: number): Date;
    countDays(): number;
    dateAtProportion(proportion: number): Date;
    proportionAtPosition(position: number): number;
    private getGranularity();
}
export default Domain;
