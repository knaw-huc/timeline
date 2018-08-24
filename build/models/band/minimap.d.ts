import Band from '.';
import { MinimapBandConfig } from '../config';
export default class MinimapBand extends Band<MinimapBandConfig> {
    private eventHeight;
    private maxRowCount;
    private canvas;
    private ctx;
    private nextCanvas;
    private nextCtx;
    isDrawn: boolean;
    constructor(config: MinimapBandConfig);
    init(): void;
    resize(): void;
    draw(): HTMLCanvasElement;
    private drawEvents;
    private updateNextCanvas;
}
