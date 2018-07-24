import EventsBand from '../../../models/domain';
import { RawSegment } from '../../../constants';
export default class Segment {
    private band;
    private rootElement;
    rendered: boolean;
    private rawEvents;
    constructor(band: EventsBand, segmentData: RawSegment, rootElement: HTMLUListElement);
    renderChildren(): void;
}
