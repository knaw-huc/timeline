import Domain from '../../models/domain';
export default class Band {
    domain: Domain;
    private dragStart;
    private dragOffset;
    private rootElement;
    private eventsBand;
    constructor(domain: Domain);
    render(): HTMLElement;
    private updateLeft;
    private onMouseDown;
    private onMouseMove;
    private onMouseUp;
    private onDblClick;
}
