import Domain from '../../models/domain';
import Event from '../../models/event';
export default class EventsBand {
    private domain;
    private events;
    constructor(domain: Domain, events: Event[]);
    render(): HTMLElement;
}
