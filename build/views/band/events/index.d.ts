import Domain from '../../../models/domain';
import Band from '../index';
export default class EventsBand extends Band {
    private events;
    private eventsWrap;
    private iter;
    private topAdder;
    constructor(domain: Domain, events: any);
    render(): HTMLElement;
    private renderEvents;
}
