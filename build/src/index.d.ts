import Config from './models/config';
export default class Timeline {
    private config;
    private domains;
    private views;
    private wrapper;
    constructor(config: Partial<Config>);
    remove(): void;
    private resize;
    private render();
    private createDomains();
    private renderBands();
    private renderIndicators();
    private appendToWrapper;
}
