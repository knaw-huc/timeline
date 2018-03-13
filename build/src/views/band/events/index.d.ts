import Domain from '../../../models/domain';
import { RawEv3nt } from '../../../models/config';
export default class Events {
    private domain;
    private events;
    private segments;
    constructor(domain: Domain, events: RawEv3nt[]);
    render(): any;
    renderChildren(): void;
}
