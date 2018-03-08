import Ev3nt from '../../../models/event';
import Domain from '../../../models/domain';
export default class Segment {
    private domain;
    private from;
    private to;
    private lowerIndex;
    private upperIndex;
    left: number;
    private topAdder;
    private events;
    rendered: boolean;
    private rootElement;
    constructor(domain: Domain, from: Date, to: Date, lowerIndex: number, upperIndex: number, left: number, topAdder: (e: Ev3nt) => Ev3nt, events: Ev3nt[]);
    render(): HTMLElement;
    renderChildren(): void;
    show(): void;
    hide(): void;
    private renderRulers;
}
