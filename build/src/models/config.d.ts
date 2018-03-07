import { DomainType } from "./domain";
export interface IAggregateEntry {
    count: number;
    year: number;
}
export interface IRawEntry {
    title: string;
    date: string;
}
export interface IRawDomain {
    hasIndicatorFor?: number;
    heightRatio?: number;
    visibleRatio?: number;
    topOffsetRatio?: number;
    type: DomainType;
}
export default class Config {
    aggregate: IAggregateEntry[];
    center: number;
    domains: IRawDomain[];
    events: IRawEntry[];
    rootElement: HTMLElement;
    constructor(config: any);
}
