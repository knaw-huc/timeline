import Animatable from '../../animatable';
export default class MiniMap extends Animatable {
    private readonly font;
    private canvas;
    private ctx;
    constructor();
    render(): HTMLCanvasElement;
    update: () => void;
    private drawEvents(domain);
    private drawMinimap(band, domain);
    private drawIndicators(band, domain);
    private drawRulers(band, domain);
}
