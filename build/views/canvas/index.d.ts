import View from '../index';
export default class Canvas implements View {
    private canvas;
    private ctx;
    private indicatorsCanvas;
    private indicatorsCtx;
    private indicatorsDrawn;
    constructor();
    private updateImages;
    private drawImage;
    private loadImage;
    private onAnimationDone;
    render(): HTMLCanvasElement[];
    resize(): void;
    private clear;
    update: () => void;
    private drawEventsBand;
    private drawEventsText;
    private drawMinimapBand;
    private drawIndicators;
}
