import Ev3nt from "../../../../../models/event";
export default class PointInTime {
    private event;
    private segmentOffset;
    constructor(event: Ev3nt, segmentOffset: number);
    render(): any;
}
