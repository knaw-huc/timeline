import DomainEvent from "../../../../../models/event";
import Domain from "../../../../../models/domain";
export default class Interval {
    private domain;
    private event;
    private segmentOffset;
    constructor(domain: Domain, event: DomainEvent, segmentOffset: number);
    render(): any;
}
