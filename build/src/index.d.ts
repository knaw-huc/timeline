import Config from './models/config';
export default class Timeline {
    private config;
    private bands;
    private wrapper;
    constructor(config: Partial<Config>);
    remove(): void;
    refresh: (config?: Partial<Config>) => void;
    private debouncedRefresh;
    private render();
    private renderBands();
    private renderIndicators();
    private appendToWrapper;
}
