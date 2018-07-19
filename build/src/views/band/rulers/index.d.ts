import Domain from '../../../models/domain';
import { Granularity } from '../../../utils/dates';
import { Milliseconds } from '../../../constants';
export declare function findClosestRulerDate(timestamp: Milliseconds, granularity: Granularity): Milliseconds;
export default class Rulers {
    private domain;
    private ul;
    constructor(domain: Domain);
    render(): HTMLElement;
}
