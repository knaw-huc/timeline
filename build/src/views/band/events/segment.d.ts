import Ev3nt from '../../../models/event';
import Domain from '../../../models/domain';
export default class Segment {
    private domain;
    private events;
    fromRatio: number;
    private toRatio;
    private _rendered;
    private rootElement;
    private left;
    constructor(domain: Domain, events: Ev3nt[], fromRatio: number, toRatio: number);
    render(): HTMLElement;
    renderChildren(): void;
    private renderRulers;
}
