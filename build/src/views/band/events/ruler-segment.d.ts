import Domain from '../../../models/domain';
import { RawSegment } from '../../../constants';
export default class Segment {
    private domain;
    private rootElement;
    rendered: boolean;
    private from;
    private to;
    constructor(domain: Domain, segmentData: RawSegment, rootElement: HTMLDivElement);
    renderChildren: () => void;
}
