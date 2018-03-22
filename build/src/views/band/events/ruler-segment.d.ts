import Domain from '../../../models/domain';
import { RawSegment } from '../../../constants';
export default class Segment {
    private domain;
    rendered: boolean;
    private rootElement;
    private left;
    private from;
    private to;
    constructor(domain: Domain, segmentData: RawSegment);
    render(): HTMLElement;
    renderChildren: () => void;
}
