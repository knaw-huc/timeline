import Domain from '../models/domain';
export default class EventsBand {
    private domain;
    private aggregate;
    constructor(domain: Domain, aggregate: any);
    render(): HTMLElement;
}
