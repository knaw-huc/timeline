import DomainConfig from "./domain.config";
export declare class AggregateEntry {
    count: number;
    year: number;
}
export declare class RawEv3nt {
    title: string;
    date: string;
}
export default class Config {
    aggregate: AggregateEntry[];
    center: number;
    domains: DomainConfig[];
    events: RawEv3nt[];
    rootElement: HTMLElement;
    constructor(config: Partial<Config>);
    refresh(config: Partial<Config>): void;
}
