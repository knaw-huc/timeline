const data = require('../examples/data/political-philosophy.json')
import orderEvents, { prepareEvent, BinarySearchTree } from '../src/utils/order-events'
import { calcPixelsPerMillisecond } from '../src/utils'
import { byDate } from '../src/utils/dates';

describe('Order events', () => {
	test('first', () => {
		const t0 = performance.now()
		const rawEvents = data.sort(byDate)
		const from = rawEvents[0].date_min || rawEvents[0].date
		const to = rawEvents.reduce((prev2, curr2) => {
			return Math.max(prev2, curr2.end_date || -Infinity, curr2.end_date_max || -Infinity)
		}, -Infinity)
		const ppm = calcPixelsPerMillisecond(1000, 3, to - from)
		const events = rawEvents.map(prepareEvent)

		new BinarySearchTree(events)
		const t1 = performance.now(); console.log('Performance: ', `${t1 - t0}ms`)

		expect(true).toBeTruthy()
	})
})