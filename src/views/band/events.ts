import BandView from './index'
import eventBus from '../../event-bus';
import EventsBand from '../../models/band/events';

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
		console.log(event)
	}
}