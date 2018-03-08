import Ev3nt from '../../../models/event';
import Domain from '../../../models/domain';
export default class Events {
    private domain;
    private events;
    private topAdder;
    private segments;
    constructor(domain: Domain, events: Ev3nt[]);
    render(): any;
    renderChildren(): void;
    private createSegments();
}
