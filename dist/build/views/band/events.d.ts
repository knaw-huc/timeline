import BandView from './index';
import EventsBand from '../../models/band/events';
import { OnSelectFunction } from '../../index';
export default class EventsBandView extends BandView {
    band: EventsBand;
    private select;
    constructor(band: EventsBand, select: OnSelectFunction);
    render(): HTMLElement;
    private onWheel;
    private onClick;
    private zoomIn;
    private zoomOut;
}
