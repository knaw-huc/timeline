import Band from '../../models/band';
import View from '../index';
import { MinimapBandConfig, EventsBandConfig } from '../../models/config';
export default class BandView implements View {
    band: Band<MinimapBandConfig | EventsBandConfig>;
    private dragOffsetX;
    private dragOffsetY;
    protected rootElement: HTMLElement;
    constructor(band: Band<MinimapBandConfig | EventsBandConfig>);
    render(): HTMLElement;
    private onMouseDown;
    private onMouseMove;
    private onMouseUp;
    private onDblClick;
    resize(): void;
}
