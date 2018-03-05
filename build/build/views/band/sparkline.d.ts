import Domain from '../../models/domain';
import Band from './index';
export default class SparklineBand extends Band {
    private aggregate;
    constructor(domain: Domain, aggregate: any);
    render(): HTMLElement;
    protected renderChildren(): void;
    private createPath();
}
