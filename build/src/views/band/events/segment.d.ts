import Domain from '../../../models/domain';
import { RawSegment } from '../../../constants';
export default class Segment {
    private domain;
    private _rendered;
    rendered: boolean;
    private rootElement;
    private left;
    private rawEvents;
    private from;
    constructor(domain: Domain, segmentData: RawSegment);
    render(): HTMLElement;
    renderChildren(): void;
}
