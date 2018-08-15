import BandView from './index';
import EventsBand from '../../models/band/events';
import { RawEv3nt } from '../../models/event';
export default class EventsBandView extends BandView {
    band: EventsBand;
    private select;
    constructor(band: EventsBand, select: (e: RawEv3nt) => void);
    render(): HTMLElement;
    private onWheel;
    private onClick;
    private zoomIn;
    private zoomOut;
}
