import Domain from '../../models/domain';
export default class SparklineBand {
    private domain;
    private aggregate;
    constructor(domain: Domain, aggregate: any);
    render(): HTMLElement;
    private createPath();
}
