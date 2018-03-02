import Domain from '../../models/domain';
export default class Indicator {
    private hostDomain;
    private targetDomain;
    private indicator;
    constructor(hostDomain: Domain, targetDomain: Domain);
    render(): any;
    private indicatorLeft();
    private indicatorWidth();
}
