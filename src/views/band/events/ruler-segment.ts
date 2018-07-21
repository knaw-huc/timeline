import Domain from '../../../models/domain'
import { RawSegment, Milliseconds } from '../../../constants';
import { findClosestRulerDate } from '../rulers';
import Ruler from '../rulers/ruler';

export default class Segment {
	rendered = false

	private from: Milliseconds
	private to: Milliseconds

	constructor(
		private domain: Domain,
		segmentData: RawSegment,
		private rootElement: HTMLDivElement		
	) {
		this.from = segmentData.from
		this.to = segmentData.to
	}

	renderChildren = () => {
		if (this.rendered) return

		let date = findClosestRulerDate(this.from, this.domain.granularity)
		while(date < this.to) {
			this.rootElement.appendChild(new Ruler(date, this.domain).render())
			date = this.domain.nextDate(date)
		}

		this.rendered = true
	}
}