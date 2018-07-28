import BandView from './index'
import eventBus from '../../event-bus';
import EventsBand from '../../models/band/events';

function formatDate(ts) {
	const d = new Date(ts)
	return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}
export default class EventsBandView extends BandView {
	constructor(public band: EventsBand) {
		super(band)
	}

	render() {
		const root = super.render()
		eventBus.register('click', this.onClick, this.rootElement)
		return root
	}

	private onClick = (ev) => {
		const event = this.band.getEventByCoordinates(ev.clientX, ev.clientY)
		if (event) console.log(event.label, formatDate(event.from), formatDate(event.to), event)
	}
}