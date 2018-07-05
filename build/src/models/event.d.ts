import Domain from './domain';
import { Pixels, Milliseconds } from '../constants';
import { Granularity } from '../utils/dates';
export declare class RawEv3nt {
    date: Milliseconds;
    date_granularity?: Granularity;
    date_min?: Milliseconds;
    date_min_granularity?: Granularity;
    description?: string;
    end_date?: Milliseconds;
    end_date_granularity?: Granularity;
    end_date_max?: Milliseconds;
    end_date_max_granularity?: Granularity;
    id?: string;
    label?: string;
    row?: number;
    wikidata_identifier?: string;
}
declare class DomainEvent extends RawEv3nt {
    description: string;
    left: Pixels;
    width: Pixels;
    constructor(rawEvent: RawEv3nt, domain: Domain);
    isInterval(): boolean;
}
export default DomainEvent;
