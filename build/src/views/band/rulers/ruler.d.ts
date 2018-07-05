import Domain from '../../../models/domain';
import { Milliseconds } from '../../../constants';
export default class Ruler {
    private date;
    private domain;
    private offset;
    constructor(date: Milliseconds, domain: Domain, offset?: number);
    render(): any;
}
