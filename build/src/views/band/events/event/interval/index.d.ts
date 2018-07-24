import DomainEvent from "../../../../../models/event";
import EventsBand from "../../../../../models/band/events";
export default class Interval {
    private band;
    private event;
    constructor(band: EventsBand, event: DomainEvent);
    render(): any;
}
