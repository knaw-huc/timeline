import Config from './models/config';
import { orderEvents, OrderedEvents } from './utils/events.worker';
import Api from './api';
export { Config as TimelineConfig, orderEvents, OrderedEvents };
export default class Timeline extends Api {
    private wrapper;
    constructor(config: Config);
    private removeChildren();
    reload: (config?: Config) => void;
    private debouncedReload;
    private render();
    private renderBands();
    private renderIndicators();
    private renderLabels();
    private appendToWrapper;
}
