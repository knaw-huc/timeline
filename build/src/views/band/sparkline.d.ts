import Domain from '../../models/domain';
import Band from './index';
export default class SparklineBand extends Band {
    private events;
    private aggregate;
    constructor(domain: Domain, events: any, aggregate: any);
    render(): HTMLElement;
    protected renderChildren(): void;
    private createPath(aggregate);
}
