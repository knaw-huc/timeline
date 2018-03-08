import Config from './models/config';
export default class Timeline {
    private config;
    private domains;
    private views;
    private wrapper;
    constructor(config: Partial<Config>);
    remove(): void;
    refresh: (config?: Partial<Config>) => void;
    private debouncedRefresh;
    private render();
    private createDomains();
    private renderBands();
    private renderIndicators();
    private appendToWrapper;
}
