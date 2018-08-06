import View from '../index';
export default class Canvas implements View {
    private readonly font;
    private canvas;
    private ctx;
    private offsiteCanvas;
    private offsiteCtx;
    private indicatorsCanvas;
    private indicatorsCtx;
    constructor();
    render(): HTMLCanvasElement[];
    private drawStaticMinimapBands;
    private clear;
    update: () => void;
    private drawEvents;
    private drawEventsText;
    private drawMinimap;
    private drawIndicators;
    private drawRulers;
}
