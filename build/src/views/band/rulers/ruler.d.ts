import Domain from '../../../models/domain';
export default class Ruler {
    private date;
    private domain;
    private offset;
    constructor(date: Date, domain: Domain, offset?: number);
    render(): any;
}
