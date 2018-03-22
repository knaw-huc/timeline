import { Ratio, ComponentType } from "../constants";
export default class DomainConfig {
    components: Set<ComponentType>;
    hasEvents: boolean;
    hasIndicatorFor: number;
    heightRatio: Ratio;
    hasRulers: boolean;
    hasSparkline: boolean;
    topOffsetRatio: Ratio;
    visibleRatio: Ratio;
    constructor(props: any);
}
