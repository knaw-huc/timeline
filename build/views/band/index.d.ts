import Domain from '../../models/domain';
export default class BandWrapper {
    private domain;
    private dragStart;
    private dragOffset;
    private id;
    private rootElement;
    constructor(domain: Domain);
    private updateLeft;
    render(): HTMLElement;
    private onMouseDown;
    private onMouseMove;
    private onMouseUp;
}
