import Domain from '../../../models/domain';
import Animatable from '../../animatable';
export default class MiniMap extends Animatable {
    private domain;
    private canvas;
    private ctx;
    private maxHeight;
    private eventHeight;
    constructor(domain: Domain);
    render(): HTMLCanvasElement;
    update: () => void;
}
