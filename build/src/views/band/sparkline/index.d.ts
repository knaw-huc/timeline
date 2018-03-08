import Domain from '../../../models/domain';
import Ev3nt from '../../../models/event';
import { AggregateEntry } from '../../../models/config';
export default class Sparkline {
    private domain;
    private events;
    private aggregate;
    private svg;
    constructor(domain: Domain, events: Ev3nt[], aggregate: AggregateEntry[]);
    render(): SVGElement;
    protected renderChildren(): void;
    private createPath();
    private renderPath();
}
