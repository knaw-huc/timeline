import Domain from '../../../models/domain';
export default class Rulers {
    private domain;
    private iter;
    private ul;
    private prevRange;
    constructor(domain: Domain);
    render(): HTMLElement;
    private renderRulers;
}
