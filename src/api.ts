import animator, { Animator } from './animator'
import { CENTER_CHANGE_DONE, Ratio, Milliseconds } from './constants'
import props from './models/props';

export interface OnChangeFunctionProps { center: Ratio, visibleFrom: Milliseconds, visibleTo: Milliseconds }
export type OnChangeFunction = (props: OnChangeFunctionProps, e?: Event) => void

export default class Api {
	animator: Animator = animator

	constructor(
		rootElement: HTMLElement, 
		private onChange: (changeProps: { center: Ratio, visibleFrom: Milliseconds, visibleTo: Milliseconds }) => void
	) {
		document.addEventListener('keydown', (ev) => {
			if (ev.keyCode === 189) props.eventsBand.zoomOut() // -
			if (ev.keyCode === 187) props.eventsBand.zoomIn() // +
		})

		rootElement.addEventListener('wheel', (ev) => {
			if (Math.abs(ev.deltaX) === 0 && ev.deltaY !== 0) {
				if (ev.deltaY < 0) props.eventsBand.zoomOut()
				if (ev.deltaY > 0) props.eventsBand.zoomIn()
			}
		})

		if (this.onChange != null && typeof this.onChange === 'function') {
			document.addEventListener(CENTER_CHANGE_DONE, this.handleChange)
		}
	}

	private handleChange = () => {
		const { from, to } = props.eventsBand

		this.onChange({
			center: props.center,
			visibleFrom: from,
			visibleTo: to,
		})
	}

	zoomIn() {
		props.eventsBand.zoomIn()
	}

	zoomOut() {
		props.eventsBand.zoomOut()
		this.handleChange()
	} 
}