import Domain from '../../models/domain';
export default abstract class Band {
    protected domain: Domain;
    private dragStart;
    private dragOffset;
    private rootElement;
    constructor(domain: Domain);
    private updateLeft;
    render(): HTMLElement;
    private onMouseDown;
    private onMouseMove;
    protected abstract renderChildren(): void;
    private onMouseUp;
}
