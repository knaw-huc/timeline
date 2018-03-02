import Domain from '../../../models/domain'
import createElement from '../../../utils/create-element'
import Ruler from './ruler'

export default class Rulers {
	constructor(private domain: Domain) {}

	public render() {
		const ul = createElement(
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

		this.domain.range()
			.map(date => new Ruler(date, this.domain))
			.forEach(r => ul.appendChild(r.render()))

		return ul
	}
}