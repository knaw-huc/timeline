import BandView from './index'
import eventBus from '../../event-bus'
import EventsBand from '../../models/band/events'
import { EventType } from '../../constants';
// import { logEvent } from '../../utils'
// import { OnSelectFunction } from '../../index'
// import props from '../../models/props';

export default class EventsBandView extends BandView {
	constructor(public band: EventsBand) {
		super(band)
	}

	render() {
		const root = super.render()
		eventBus.register('click', this.onClick, this.rootElement)
		eventBus.register('wheel', this.onWheel, this.rootElement)
		return root
	}

	private onWheel = (ev: WheelEvent) => {
		if (Math.abs(ev.deltaX) === 0 && ev.deltaY !== 0) {
			if (ev.deltaY < 0) this.zoomOut()
			if (ev.deltaY > 0) this.zoomIn()
		}
	}

	private onClick = (ev: MouseEvent) => {
		if (this.lastDragInterval > 175) return

		const event = this.band.getEventByCoordinates(ev.clientX, ev.clientY)

		eventBus.dispatch(EventType.Select, event)
	}

	private zoomIn() {
		this.band.zoomIn()
	}

	private zoomOut() {
		this.band.zoomOut()
	} 
}
