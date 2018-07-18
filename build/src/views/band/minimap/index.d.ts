import Domain from '../../../models/domain';
export default class MiniMap {
    private domain;
    private canvas;
    private context;
    private maxHeight;
    private eventHeight;
    constructor(domain: Domain);
    render(): HTMLCanvasElement;
    private drawEvents;
}
