import { Granularity } from '../constants';
export declare enum DomainType {
    Event = 0,
    Navigator = 1,
    Sparkline = 2,
}
export interface IDomainDef {
    domainLabels?: boolean;
    heightRatio?: number;
    visibleRatio?: number;
    rulerLabels?: boolean;
    rulers?: boolean;
    topOffsetRatio?: number;
    type?: DomainType;
}
declare class Domain implements IDomainDef {
    domainLabels: boolean;
    from: Date;
    height: number;
    heightRatio: number;
    granularity: Granularity;
    pixelsPerDay: number;
    visibleRatio: number;
    rulerLabels: boolean;
    rulers: boolean;
    to: Date;
    topOffsetRatio: number;
    type: DomainType;
    width: number;
    constructor(from: Date, to: Date, viewPortWidth: number, viewPortHeight: number, domainCenter: number, domainDef: IDomainDef);
    positionAtDate(date: Date): number;
    dateAtPosition(x: number): Date;
    countDays(): number;
    dateAtProportion(proportion: number): Date;
    proportionAtPosition(position: number): number;
    private getGranularity();
}
export default Domain;
