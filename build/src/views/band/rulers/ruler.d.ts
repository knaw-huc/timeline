import Domain from '../../../models/domain';
import { Milliseconds } from '../../../constants';
export default class Ruler {
    private date;
    private domain;
    constructor(date: Milliseconds, domain: Domain);
    render(): any;
}
