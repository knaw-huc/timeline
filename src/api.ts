import animator, { Animator } from './animator'
import { CENTER_CHANGE_DONE, Ratio, Milliseconds, ZOOM_DONE } from './constants'
import props from './models/props';

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
	animator: Animator = animator

	constructor(
		rootElement: HTMLElement, 
		private onChange: (changeProps: OnChangeFunctionProps) => void
	) {
		document.addEventListener('keydown', (ev) => {
			console.log('NOT IMPLEMENTED')
			// if (ev.keyCode === 189) props.eventsBand.zoomOut() // -
			// if (ev.keyCode === 187) props.eventsBand.zoomIn() // +
		})

		if (this.onChange != null && typeof this.onChange === 'function') {
			document.addEventListener(CENTER_CHANGE_DONE, this.handleChange)
			document.addEventListener(ZOOM_DONE, this.handleChange)
		}
	}

	private handleChange = () => {
		// const { from, to } = props.eventsBand

		this.onChange({
			center: props.center,
			bands: props.bands.map(b => ({
				from: b.from,
				to: b.to,
				zoomLevel: b.zoomLevel
			}))
			// visibleFrom: from,
			// visibleTo: to,
			// zoomLevel: props.eventsBand.zoomLevel
		})
	}
}