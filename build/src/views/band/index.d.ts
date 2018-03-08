import Domain from '../../models/domain';
import { AggregateEntry, RawEv3nt } from '../../models/config';
import DomainConfig from '../../models/domain.config';
export default class Band {
    private aggregate;
    private dragStart;
    private dragOffset;
    private rootElement;
    domain: Domain;
    private events;
    private eventsBand;
    constructor(domainConfig: DomainConfig, events: RawEv3nt[], aggregate: AggregateEntry[]);
    remove(): void;
    render(): HTMLElement;
    private updateLeft;
    private onMouseDown;
    private onMouseMove;
    private onMouseUp;
    private onDblClick;
}
