import Event from '../models/event'
import { EVENT_ROW_HEIGHT } from '../constants';

export default () => {
	const rows = [0]

	return (event: Event): Event => {
		const [left, width] = event.space()
		let row = rows.findIndex(r => r < left)

		if (row === -1) row = rows.push(left + width)
		else rows[row] = left + width

		event.top = row * EVENT_ROW_HEIGHT
		return event
	}
}