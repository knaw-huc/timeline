import DomainEvent from "../../../../../models/event";
export default class PointInTime {
    private event;
    private segmentOffset;
    constructor(event: DomainEvent, segmentOffset: number);
    render(): any;
}
