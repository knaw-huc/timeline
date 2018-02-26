import { Granularity } from '../constants';
export declare enum DomainType {
    Event = 0,
    Navigator = 1,
    Sparkline = 2,
}
export interface IDomainDef {
    domainLabels?: boolean;
    hasIndicatorFor?: number;
    heightRatio?: number;
    visibleRatio?: number;
    rulerLabels?: boolean;
    rulers?: boolean;
    topOffsetRatio?: number;
    type?: DomainType;
}
declare class Domain implements IDomainDef {
    viewportWidth: number;
    domainCenter: number;
    domainLabels: boolean;
    from: Date;
    granularity: Granularity;
    hasIndicatorFor: number;
    heightRatio: number;
    pixelsPerDay: number;
    visibleRatio: number;
    rulerLabels: boolean;
    rulers: boolean;
    to: Date;
    topOffsetRatio: number;
    type: DomainType;
    viewportHeight: number;
    height: number;
    width: number;
    constructor(from: Date, to: Date, viewportWidth: number, viewportHeight: number, domainCenter: number, domainDef: IDomainDef);
    countDays(): number;
    dateAtPosition(x: number): Date;
    dateAtProportion(proportion: number): Date;
    positionAtDate(date: Date): number;
    proportionAtPosition(position: number): number;
    private getGranularity();
}
export default Domain;
