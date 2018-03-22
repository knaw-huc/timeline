import Domain from '../../../models/domain';
export default class Events {
    private domain;
    private eventSegments;
    private rulerSegments;
    constructor(domain: Domain);
    render(): any;
    renderChildren(): void;
}
