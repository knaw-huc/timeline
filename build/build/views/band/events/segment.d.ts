import Event from '../../../models/event';
import Domain from '../../../models/domain';
export default class Segment {
    events: Event[];
    rulerDates: Date[];
    left: number;
    private topAdder;
    private domain;
    rendered: boolean;
    private rootElement;
    constructor(events: Event[], rulerDates: Date[], left: number, topAdder: (e: Event) => Event, domain: Domain);
    render(): HTMLElement;
    renderEvents(): void;
    show(): void;
    hide(): void;
}
