import Band from '../index';
import EventsDomain from '../../../models/events.domain';
export default class EventsBand extends Band {
    private eventsWrap;
    private topAdder;
    private segments;
    private events;
    constructor(domain: EventsDomain);
    remove(): void;
    render(): HTMLElement;
    protected renderChildren(): void;
    private createSegments();
}
