import Event from '../../../models/event';
import Domain from '../../../models/domain';
export default class Segment {
    events: Event[];
    private from;
    private to;
    left: number;
    private topAdder;
    private domain;
    rendered: boolean;
    private rootElement;
    constructor(events: Event[], from: Date, to: Date, left: number, topAdder: (e: Event) => Event, domain: Domain);
    render(): HTMLElement;
    renderChildren(): void;
    show(): void;
    hide(): void;
    private renderRulers;
}
