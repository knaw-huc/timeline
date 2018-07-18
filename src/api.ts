import Animator from './animator'
import { CENTER_CHANGE_DONE, Ratio, Milliseconds } from './constants'
import Band from './views/band';
import props from './models/props';

export interface OnChangeFunctionProps { center: Ratio, visibleFrom: Milliseconds, visibleTo: Milliseconds }
export type OnChangeFunction = (props: OnChangeFunctionProps, e?: Event) => void

export default class Api {
	protected bands:Band[] = []
	animator: Animator = new Animator()

	init(onInit: OnChangeFunction) {
		const [from, to] = this.bands[0].domain.fromTo
		onInit(
			{
				center: props.center,
				visibleFrom: from,
				visibleTo: to,
			}
		)
	}

	change(onChange: OnChangeFunction) {
		document.addEventListener(CENTER_CHANGE_DONE, this.handleChange(onChange))
	}

	private handleChange = (onChange: OnChangeFunction) => (ev) => {
		const [from, to] = this.bands[0].domain.fromTo

		onChange(
			{
				center: props.center,
				visibleFrom: from,
				visibleTo: to,
			},
			ev
		)
	}

}