import Ev3nt from '../models/event'

export default () => {
	const grid = []

	return (event: Ev3nt): Ev3nt => {
		const [left, width] = event.space()
		let row

		const rowHasSpace = (row) => {
			return row.reduce((prev, curr, index, array) => {
				if (!prev) return false
				const [currLeft, currWidth] = curr
				return (
					left + width < currLeft ||
					left > currLeft + currWidth
				)
			}, true)
		}

		for (let i = 0; i < grid.length; i++) {
			if (rowHasSpace(grid[i])) {
				grid[i].push([left, width])
				row = i
				break
			}	
		}

		if (row == null) row = grid.push([[left, width]]) - 1

		event.row = row
		return event
	}
}
