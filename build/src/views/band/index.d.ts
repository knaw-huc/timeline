import Domain from '../../models/domain';
import Animatable from '../animatable';
export default class Band extends Animatable {
    domain: Domain;
    private dragStart;
    private dragOffset;
    private rootElement;
    private eventsBand;
    constructor(domain: Domain);
    render(): HTMLElement;
    update: () => void;
    private onMouseDown;
    private onMouseMove;
    private onMouseUp;
    private onDblClick;
}
