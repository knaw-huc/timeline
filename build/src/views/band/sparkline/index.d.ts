import Domain from '../../../models/domain';
import { AggregateEntry } from '../../../models/config';
export default class Sparkline {
    private domain;
    private aggregate;
    private svg;
    private events;
    constructor(domain: Domain, aggregate: AggregateEntry[]);
    render(): SVGElement;
    protected renderChildren(): void;
    private createPath();
    private renderPath();
}
