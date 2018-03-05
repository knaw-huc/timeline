export default class Timeline {
    private config;
    private domains;
    private wrapper;
    constructor(config: any);
    private render();
    private createDomains();
    private renderEvents();
    private renderSparklines();
    private renderIndicators();
    private appendToWrapper;
}
