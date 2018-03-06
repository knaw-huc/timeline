import Domain from '../../../models/domain';
import Band from '../index';
export default class EventsBand extends Band {
    private events;
    private eventsWrap;
    private topAdder;
    private segments;
    constructor(domain: Domain, events: any);
    render(): HTMLElement;
    protected renderChildren(): void;
    private createSegments();
}
