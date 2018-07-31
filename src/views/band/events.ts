import BandView from './index'
import eventBus from '../../event-bus';
import EventsBand from '../../models/band/events';
import { RawEv3nt } from '../../models/event';

function formatDate(ts) {
	const d = new Date(ts)
	return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}
export default class EventsBandView extends BandView {
	constructor(public band: EventsBand, private select: (e: RawEv3nt) => void) {
		super(band)
	}

	render() {
		const root = super.render()
		eventBus.register('click', this.onClick, this.rootElement)
		return root
	}

	private onClick = (ev) => {
		const event = this.band.getEventByCoordinates(ev.clientX, ev.clientY)
		if (event && this.select) {
			this.select(event)
			console.log(event, formatDate(event.from), formatDate(event.to))
		}
	}
}
