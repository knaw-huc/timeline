import { Granularity } from '../constants';
export declare enum DomainType {
    Events = "EVENTS",
    Sparkline = "SPARKLINE",
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
    viewportHeight: number;
    domainLabels: boolean;
    granularity: Granularity;
    hasIndicatorFor: number;
    heightRatio: number;
    pixelsPerDay: number;
    rulerLabels: boolean;
    rulers: boolean;
    topOffsetRatio: number;
    type: DomainType;
    visibleRatio: number;
    private _left;
    height: number;
    width: number;
    prevDate: (d: Date) => Date;
    nextDate: (d: Date) => Date;
    constructor(domain: IDomainDef, viewportWidth: number, viewportHeight: number);
    initialActiveRange(iteration: number): [Date, Date, boolean];
    dateAtPosition(x: number): Date;
    dateAtProportion(proportion: number): Date;
    left: number;
    updateLeft(): number;
    positionAtDate(date: Date): number;
    proportionAtPosition(position: number): number;
}
export default Domain;
