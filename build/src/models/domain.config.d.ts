export declare enum DomainType {
    Events = "EVENTS",
    Sparkline = "SPARKLINE",
}
export default class DomainConfig {
    hasEvents: boolean;
    hasIndicatorFor: number;
    heightRatio: number;
    hasRulers: boolean;
    hasSparkline: boolean;
    topOffsetRatio: number;
    type: DomainType;
    visibleRatio: number;
    constructor(props: any);
}
