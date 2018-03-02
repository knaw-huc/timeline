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
    private from;
    private to;
    viewportWidth: number;
    viewportHeight: number;
    activeFrom: Date;
    activeTo: Date;
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
    center: number;
    left: number;
    height: number;
    width: number;
    constructor(domain: IDomainDef, from: Date, to: Date, viewportWidth: number, viewportHeight: number);
    setActiveRange(iteration: number): void;
    countDays(): number;
    dateAtPosition(x: number): Date;
    dateAtProportion(proportion: number): Date;
    setCenter(center: number): void;
    setLeft(left: number): void;
    positionAtDate(date: Date): number;
    proportionAtPosition(position: number): number;
    range(): Date[];
    private getGranularity();
}
export default Domain;
