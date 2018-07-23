import Domain from '../../../models/domain';
export default class Events {
    private domain;
    private eventSegments;
    constructor(domain: Domain);
    render(): any;
    renderChildren(): void;
}
