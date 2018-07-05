import { RawEv3nt } from '../models/event';
import { byDate } from './dates';
import { clone } from '../../test/utils';
import { events } from '../../test/data';

test('Sort events', () => {
	const sorted = clone(events).sort(byDate)
	expect(sorted).toEqual([events[4], events[3], events[2], events[5], events[1], events[0]])
})