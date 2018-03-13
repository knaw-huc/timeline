import Domain from '../../../models/domain';
export default class Segment {
    private domain;
    private _rendered;
    private rootElement;
    private left;
    fromRatio: number;
    private events;
    private toRatio;
    constructor(domain: Domain, segmentData: any);
    render(): HTMLElement;
    renderChildren(): void;
    private renderRulers;
    private renderEvents();
}
