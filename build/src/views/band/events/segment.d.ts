import Ev3nt from '../../../models/event';
import Domain from '../../../models/domain';
export default class Segment {
    private domain;
    private events;
    private from;
    private to;
    private lowerIndex;
    private upperIndex;
    left: number;
    rendered: boolean;
    private rootElement;
    constructor(domain: Domain, events: Ev3nt[], from: Date, to: Date, lowerIndex: number, upperIndex: number, left: number);
    render(): HTMLElement;
    renderChildren(): void;
    show(): void;
    hide(): void;
    private renderRulers;
}
