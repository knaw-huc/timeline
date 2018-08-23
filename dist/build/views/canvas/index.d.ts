import View from '../index';
export default class Canvas implements View {
    private canvas;
    private ctx;
    private indicatorsCanvas;
    private indicatorsCtx;
    private indicatorsDrawn;
    constructor();
    render(): HTMLCanvasElement[];
    resize(): void;
    private clear;
    update: () => void;
    private drawEventsBand;
    private drawEventsText;
    private drawMinimapBand;
    private drawIndicators;
}
