import Band from '.';
import { MinimapBandConfig } from '../config';
export default class MinimapBand extends Band<MinimapBandConfig> {
    private eventHeight;
    private maxRowCount;
    isDrawn: boolean;
    private canvas;
    private ctx;
    private nextCanvas;
    private nextCtx;
    constructor(config: MinimapBandConfig);
    init(): void;
    resize(): void;
    draw(): HTMLCanvasElement;
    private drawEvents;
    private updateNextCanvas;
}
