import * as Constants from '../constants';
import {IEvent} from "../models/event";
import {IDateRange} from "../models/base-event";

const hasOverlap = (a: IEvent, b: IEvent): boolean => {
	const [aLeft, aWidth] = a.space();
	const [bLeft, bWidth] = b.space();

	let overlap = true;
	if (aLeft + aWidth < bLeft) overlap = false;
	if (bLeft + bWidth < aLeft) overlap = false;

	return overlap;
};

export const addTop = (events: IEvent[]) => {
	if (!events.length) return events;
	const firstEvent = events[0];
	const rows = [[firstEvent]];
	const calc = (event) => {
		if (event === firstEvent) return event;
		for (let row = 0; row < rows.length; row++) {
			const eventsInRow = rows[row];
			const isRowWithSpace = eventsInRow.reduce((prev, curr) => {
				return prev && !hasOverlap(event, curr);
			}, true);

			if (isRowWithSpace) {
				eventsInRow.push(event);
				event.top = row * Constants.EVENT_ROW_HEIGHT;
				break;
			}
		}
		if (event.top == null) {
			const newLength = rows.push([event]);
			event.top = (newLength - 1) * Constants.EVENT_ROW_HEIGHT;
		}
		return event;
	};
	return events.map(calc);
};

const parseDate = (date: string): Date => {
	// TODO remove split('+') code. It is used to let the dates work under FF. Use different solution.
	// Plus, there should be some sort of granularity. When a date does not need time information, the
	// timezone can be skipped anyway.
	date = date.split('+')[0];
	return (date === 'infinity') ? null : new Date(date);
};

interface IServerDateRange {
	from: string;
	to: string;
}

const parseDateRange = (dateRange: IServerDateRange): IDateRange => {
	return {
		from: parseDate(dateRange.from),
		infiniteFrom: dateRange.from === 'infinity',
		infiniteTo: dateRange.to === 'infinity',
		to: parseDate(dateRange.to),
	};
};

const clone = (data) => JSON.parse(JSON.stringify(data));

export const parseEvent = (eventData) => {
	eventData = clone(eventData);

	if (eventData.date) {
		eventData.date = parseDate(eventData.date);
	}

	if (eventData.dateUncertain != null) {
		eventData.dateUncertain = parseDateRange(eventData.dateUncertain);
	}

	if (eventData.dateRange != null) {
		eventData.dateRange = parseDateRange(eventData.dateRange);
	}

	if (eventData.dateRangeUncertain != null) {
		eventData.dateRangeUncertain = parseDateRange(eventData.dateRangeUncertain);
	}

	return eventData;
};
