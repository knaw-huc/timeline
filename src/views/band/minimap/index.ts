import Domain from '../../../models/domain'
import createElement from '../../../utils/create-element'
import props from '../../../models/props'
import DomainEvent from '../../../models/event'
import { DATE_BAR_HEIGHT } from '../../../constants';

export default class MiniMap {
	constructor(private domain: Domain) {}

	render() {
		const canvas = createElement('canvas', 'minimap', [
			'position: absolute',
		])
		canvas.width = this.domain.width
		canvas.height = this.domain.height
		const context = canvas.getContext('2d')
		context.fillStyle = 'rgba(180, 180, 255, .5)'

		const maxHeight = this.domain.height - DATE_BAR_HEIGHT
		const height = maxHeight / props.rowCount

		for (let i = 0; i < props.events.length; i++) {
			const event = new DomainEvent(props.events[i], this.domain)
			const y = maxHeight - ((event.row + 1) * height)
			const width = event.width < 1 ? 1 : event.width
			context.fillRect(event.left, y, width, height)
		}

		return canvas
	}
}