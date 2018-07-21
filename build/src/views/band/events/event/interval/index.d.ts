import DomainEvent from "../../../../../models/event";
import Domain from "../../../../../models/domain";
export default class Interval {
    private domain;
    private event;
    constructor(domain: Domain, event: DomainEvent);
    render(): any;
}
