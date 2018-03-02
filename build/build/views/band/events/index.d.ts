import Domain from '../../../models/domain';
export default class EventsBand {
    private domain;
    private events;
    private eventsWrap;
    constructor(domain: Domain, events: any);
    render(): HTMLElement;
}
