export default class Canvas {
    private readonly font;
    private canvas;
    private ctx;
    private offsiteCanvas;
    private offsiteCtx;
    constructor();
    render(): HTMLCanvasElement;
    update: () => void;
    private drawEvents(domain);
    private drawMinimap(band, domain);
    private drawIndicators(band, domain);
    private drawRulers(band, domain);
}
