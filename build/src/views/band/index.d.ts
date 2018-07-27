import Band from '../../models/band';
export default class BandView {
    band: Band;
    private dragStart;
    private dragOffset;
    protected rootElement: HTMLElement;
    constructor(band: Band);
    render(): HTMLElement;
    private onMouseDown;
    private onMouseMove;
    private onMouseUp;
    private onDblClick;
}
