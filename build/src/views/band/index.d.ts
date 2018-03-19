import Domain from '../../models/domain';
import { AggregateEntry } from '../../models/config';
import DomainConfig from '../../models/domain.config';
export default class Band {
    private aggregate;
    domain: Domain;
    private dragStart;
    private dragOffset;
    private rootElement;
    private eventsBand;
    constructor(domainConfig: DomainConfig, aggregate: AggregateEntry[]);
    remove(): void;
    render(): HTMLElement;
    private updateLeft;
    private onMouseDown;
    private onMouseMove;
    private onMouseUp;
    private onDblClick;
}
