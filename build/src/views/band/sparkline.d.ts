import Domain from '../../models/domain';
import { AggregateEntry, RawEv3nt } from '../../models/config';
export default class SparklineBand {
    private domain;
    private events;
    private aggregate;
    private svg;
    constructor(domain: Domain, events: RawEv3nt[], aggregate: AggregateEntry[]);
    render(): SVGElement;
    protected renderChildren(): void;
    private createPath();
    private renderPath();
}
