import animator, { Animator } from './animator'
import { CENTER_CHANGE_DONE, Ratio, Milliseconds } from './constants'
import props from './models/props';

export interface OnChangeFunctionProps { center: Ratio, visibleFrom: Milliseconds, visibleTo: Milliseconds }
export type OnChangeFunction = (props: OnChangeFunctionProps, e?: Event) => void

export default class Api {
	animator: Animator = animator

	constructor() {
		document.addEventListener('keydown', (ev) => {
			if (ev.keyCode === 189) props.eventsBand.zoomOut() // -
			if (ev.keyCode === 187) props.eventsBand.zoomIn() // +
		})
	}

	init(onInit: OnChangeFunction) {
		const { from, to } = props.eventsBand
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
		const { from, to } = props.eventsBand

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