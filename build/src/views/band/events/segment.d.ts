import Ev3nt from '../../../models/event';
import Domain from '../../../models/domain';
export default class Segment {
    events: Ev3nt[];
    private from;
    private to;
    left: number;
    private topAdder;
    private domain;
    rendered: boolean;
    private rootElement;
    constructor(events: Ev3nt[], from: Date, to: Date, left: number, topAdder: (e: Ev3nt) => Ev3nt, domain: Domain);
    render(): HTMLElement;
    renderChildren(): void;
    show(): void;
    hide(): void;
    private renderRulers;
}
