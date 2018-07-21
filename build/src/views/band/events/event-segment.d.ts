import Domain from '../../../models/domain';
import { RawSegment } from '../../../constants';
export default class Segment {
    private domain;
    private rootElement;
    rendered: boolean;
    private rawEvents;
    constructor(domain: Domain, segmentData: RawSegment, rootElement: HTMLUListElement);
    renderChildren(): void;
}
