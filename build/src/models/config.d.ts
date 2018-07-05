import { Ratio, Milliseconds } from "../constants";
import { RawEv3nt } from "./event";
import DomainConfig from "./domain.config";
export declare class AggregateEntry {
    count: number;
    year: number;
}
export default class Config {
    aggregate?: AggregateEntry[];
    center?: Ratio;
    domains: DomainConfig[];
    events: RawEv3nt[];
    from: Milliseconds;
    rootElement: HTMLElement;
    rowCount: number;
    sortEvents?: boolean;
    to: Milliseconds;
}
