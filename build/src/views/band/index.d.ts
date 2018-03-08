import Domain from '../../models/domain';
export default abstract class Band {
    domain: Domain;
    private dragStart;
    private dragOffset;
    private rootElement;
    constructor(domain: Domain);
    remove(): void;
    render(): HTMLElement;
    protected abstract renderChildren(): void;
    private updateLeft;
    private onMouseDown;
    private onMouseMove;
    private onMouseUp;
    private onDblClick;
}
