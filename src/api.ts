import animator, { Animator } from './animator'
import { CENTER_CHANGE_DONE, Ratio, Milliseconds, ZOOM_DONE } from './constants'
import props from './models/props'
import View from './views';

export interface OnChangeFunctionProps {
	center: Ratio,
	bands: {
		from: Milliseconds,
		to: Milliseconds,
		zoomLevel: number
	}[]
}

export type OnChangeFunction = (props: OnChangeFunctionProps, e?: Event) => void

export default class Api {
	protected views: View[]
	animator: Animator = animator

	constructor(
		rootElement: HTMLElement, 
		private onChange: (changeProps: OnChangeFunctionProps) => void
	) {
		document.addEventListener('keydown', (ev) => {
			if (ev.keyCode === 189) props.eventsBands[0].zoomOut() // -
			if (ev.keyCode === 187) props.eventsBands[0].zoomIn() // +
		})

		if (this.onChange != null && typeof this.onChange === 'function') {
			document.addEventListener(CENTER_CHANGE_DONE, this.handleChange)
			document.addEventListener(ZOOM_DONE, this.handleChange)
		}
	}

	private handleChange = () => {
		this.onChange({
			center: props.center,
			bands: props.bands,
		})
	}

	protected resize = () => {
		props.resize()

		for (const band of props.bands) {
			band.resize()
		}

		for (const view of this.views) {
			view.resize()
		}

		this.animator.nextFrame()
	}

	reload() {
		this.resize()
	}
}