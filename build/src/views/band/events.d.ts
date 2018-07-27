import BandView from './index';
import EventsBand from '../../models/band/events';
export default class EventsBandView extends BandView {
    band: EventsBand;
    constructor(band: EventsBand);
    render(): HTMLElement;
    private onClick;
}
