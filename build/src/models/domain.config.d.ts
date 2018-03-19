import { Ratio } from "../constants";
export declare enum DomainType {
    Events = "EVENTS",
    Sparkline = "SPARKLINE",
}
export default class DomainConfig {
    hasEvents: boolean;
    hasIndicatorFor: number;
    heightRatio: Ratio;
    hasRulers: boolean;
    hasSparkline: boolean;
    topOffsetRatio: Ratio;
    type: DomainType;
    visibleRatio: Ratio;
    constructor(props: any);
}
