import Band from '../../models/band';
import View from '../index';
export default class BandView implements View {
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
    resize(): void;
}
