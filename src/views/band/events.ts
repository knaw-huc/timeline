import BandView from './index'
import eventBus from '../../event-bus';
import EventsBand from '../../models/band/events';
import { RawEv3nt } from '../../models/event';
import { logEvent } from '../../utils';

export default class EventsBandView extends BandView {
	constructor(public band: EventsBand, private select: (e: RawEv3nt) => void) {
		super(band)
	}

	render() {
		const root = super.render()
		eventBus.register('click', this.onClick, this.rootElement)
		eventBus.register('wheel', this.onWheel, this.rootElement)
		return root
	}

	private onWheel = (ev) => {
		if (Math.abs(ev.deltaX) === 0 && ev.deltaY !== 0) {
			if (ev.deltaY < 0) this.zoomOut()
			if (ev.deltaY > 0) this.zoomIn()
		}
	}

	private onClick = (ev) => {
		const event = this.band.getEventByCoordinates(ev.clientX, ev.clientY)
		if (event && this.select) {
			this.select(event)
			logEvent(event)
		}
	}

	private zoomIn() {
		this.band.zoomIn()
	}

	private zoomOut() {
		this.band.zoomOut()
	} 
}
