import Domain from '../models/domain';
export default class Band {
    private domain;
    constructor(domain: Domain);
    render(): HTMLElement;
}
