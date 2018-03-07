import Domain from '../../models/domain';
export default class Indicator {
    private hostDomain;
    private targetDomain;
    private indicator;
    private width;
    constructor(hostDomain: Domain, targetDomain: Domain);
    remove(): void;
    render(): any;
    private handleCenterChange;
    private indicatorLeft();
}
