import Domain from '../../models/domain';
import Band from './index';
import { IAggregateEntry, IRawEntry } from '../../models/config';
export default class SparklineBand extends Band {
    private events;
    private aggregate;
    private svg;
    constructor(domain: Domain, events: IRawEntry[], aggregate: IAggregateEntry[]);
    render(): HTMLElement;
    protected renderChildren(): void;
    private createPath();
    private renderPath();
}
