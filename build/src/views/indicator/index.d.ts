import Domain from '../../models/domain';
import Animatable from '../animatable';
export default class Indicator extends Animatable {
    private hostDomain;
    private leftOfIndicator;
    private rightOfIndicator;
    private width;
    private leftWidth;
    private rightWidth;
    private offset;
    constructor(hostDomain: Domain);
    render(): any;
    update: () => void;
    private nextLeftWidth();
    private nextRightWidth();
    private leftWidthScale();
    private rightWidthScale();
}
