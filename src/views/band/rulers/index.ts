import Domain from '../../../models/domain'
import createElement from '../../../utils/create-element'
import Ruler from './ruler'

export default class Rulers {
	private iter: number = 0
	private ul: HTMLElement
	private prevRange: [Date, Date] = [null, null]
	// private nextDate

	constructor(private domain: Domain) {}
		// this.nextDate = nextDate(this.domain.granularity)
	

	public render() {
		this.ul = createElement(
			'ul',
			'ruler-wrap',
			[
				'bottom: 0',
				'left: 0',
				'list-style: none',
				'margin: 0',
				'padding: 0',
				'position: absolute',
				'right: 0',
				'top: 0',
				'whiteSpace: nowrap',
			]
		)

		this.renderRulers()

		return this.ul
	}

	private renderRulers = () => {
		let [from, to, last] = this.domain.initialActiveRange(++this.iter)

		const [prevFrom, prevTo] = this.prevRange

		const end = prevFrom || to
		for (let i = from; i < end; i = new Date(this.domain.nextDate(i))) {
			const r = new Ruler(i, this.domain)
			this.ul.appendChild(r.render())
		}

		if (prevTo) {
			for (let i = prevTo; i < to; i = new Date(this.domain.nextDate(i))) {
				const r = new Ruler(i, this.domain)
				this.ul.appendChild(r.render())
			}
		}

		this.prevRange = [from, to]

		if (!last) window.requestAnimationFrame(this.renderRulers)
	}
}