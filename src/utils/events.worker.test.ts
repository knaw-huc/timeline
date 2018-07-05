import { orderEvents } from './events.worker'
import { RawEv3nt } from '../models/event';
import { byDate } from './dates';
import { clone } from '../../test/utils';
import { events } from '../../test/data';

test('Order some events', () => {
	const e = clone(events)
	const [ordered] = orderEvents(clone(events).sort(byDate), 1500, 1)
	expect(ordered).toEqual([
		{ ...e[4], row: 0 },
		{ ...e[3], row: 1 },
		{ ...e[2], row: 2 },
		{ ...e[5], row: 2 },
		{ ...e[1], row: 0 },
		{ ...e[0], row: 1 }
	])
})