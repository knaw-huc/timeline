import Domain from '../../../models/domain';
import { Granularity } from '../../../utils/dates';
export declare function findClosestRulerDate(date: Date, granularity: Granularity): Date;
export default class Rulers {
    private domain;
    private ul;
    constructor(domain: Domain);
    render(): HTMLElement;
}
