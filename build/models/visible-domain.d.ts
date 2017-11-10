import Domain from './domain';
declare class VisibleDomain extends Domain {
    private domain;
    ratio: number;
    center: number;
    constructor(domain: Domain, ratio?: number, center?: number);
}
export default VisibleDomain;
