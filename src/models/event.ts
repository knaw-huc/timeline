import BaseEvent, {IBaseEvent} from './base-event';
import * as Constants from '../constants';
import {IRootEvent} from "./root-event";

export interface IEvent extends IBaseEvent {
	flip: boolean;
	left: number;
	root: IRootEvent;
	top: number;
	width: number;
	space(): [number, number];
}

class Event extends BaseEvent implements IEvent {
	public flip = null;
	public left = null;
	public top = null;
	public width = null;
	public root = null;

	constructor(data, root: IRootEvent) {
		super(data);

		this.root = root; // TODO remove this.root? Root is only used in the constructor
		this.left = this.root.leftPositionAtDate(this.from);
		this.flip = (this.left + Constants.EVENT_MIN_SPACE > this.root.width) ? true : false;

		const width = this.countDays() * this.root.pixelsPerDay;
		this.width = (width > 0 && width < 12) ? 12 : width;
	}

	/**
	 * The space of an event is the left position and the width of the event.
	 * The width differs from this.width() that this.space() takes the label into account.
	 *
	 * @returns {[number, number]} The first element is the left position, the second element the width.
	 */
	public space(): [number, number] {
		const minWidth = (w) => (w === 0 || w < Constants.EVENT_MIN_SPACE) ? Constants.EVENT_MIN_SPACE : w;
		const width = minWidth(this.width);
		const left = (this.flip) ? this.left - width : this.left;
		return [left, width];
	}
}

export default Event;
