import Domain from '../../../models/domain';
export default class Events {
    private domain;
    private segments;
    constructor(domain: Domain);
    render(): any;
    renderChildren(): void;
    private renderRulers;
}
