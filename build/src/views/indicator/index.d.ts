import Domain from '../../models/domain';
export default class Indicator {
    private hostDomain;
    private leftOfIndicator;
    private rightOfIndicator;
    private width;
    private leftWidth;
    private rightWidth;
    private offset;
    constructor(hostDomain: Domain);
    render(): any;
    private handleCenterChange;
    private nextLeftWidth();
    private nextRightWidth();
    private leftWidthScale();
    private rightWidthScale();
}
