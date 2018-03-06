import Event from "../../../../../models/event";
export default class PointInTime {
    private event;
    private segmentOffset;
    constructor(event: Event, segmentOffset: number);
    render(): any;
}
