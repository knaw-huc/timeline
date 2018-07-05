import Domain from '../../models/domain';
import { AggregateEntry } from '../../models/config';
export default class Band {
    domain: Domain;
    private aggregate;
    private dragStart;
    private dragOffset;
    private rootElement;
    private eventsBand;
    constructor(domain: Domain, aggregate: AggregateEntry[]);
    remove(): void;
    render(): HTMLElement;
    private updateLeft;
    private onMouseDown;
    private onMouseMove;
    private onMouseUp;
    private onDblClick;
}
