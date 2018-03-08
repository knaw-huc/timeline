import Domain from '../../models/domain';
import Band from './index';
import { AggregateEntry, RawEv3nt } from '../../models/config';
export default class SparklineBand extends Band {
    private events;
    private aggregate;
    private svg;
    constructor(domain: Domain, events: RawEv3nt[], aggregate: AggregateEntry[]);
    render(): HTMLElement;
    protected renderChildren(): void;
    private createPath();
    private renderPath();
}
