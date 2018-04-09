import DomainConfig from "./domain.config";
import { Ratio } from "../constants";
import { RawEv3nt } from "./event";
export declare class AggregateEntry {
    count: number;
    year: number;
}
export default class Config {
    aggregate: AggregateEntry[];
    center: Ratio;
    domains: DomainConfig[];
    events: RawEv3nt[];
    rootElement: HTMLElement;
    sortEvents: boolean;
    constructor(config: Partial<Config>);
    refresh(config: Partial<Config>): void;
}
