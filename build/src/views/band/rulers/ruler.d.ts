import Domain from '../../../models/domain';
import { Milliseconds } from '../../../constants';
import { Granularity } from '../../../utils/dates';
export declare const labelBody: (d: number, granularity: Granularity) => string;
export default class Ruler {
    private date;
    private domain;
    constructor(date: Milliseconds, domain: Domain);
    render(): any;
}
