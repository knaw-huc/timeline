import animator, { Animator } from './animator'
import { CENTER_CHANGE_DONE, ZOOM_DONE } from './constants'
import props, { Props } from './models/props'
import View from './views';

export type OnChangeFunction = (props: Props, e?: Event) => void

export default class Api {
	protected views: View[]
	animator: Animator = animator

	constructor(private onChange: OnChangeFunction) {
		document.addEventListener('keydown', (ev) => {
			if (ev.keyCode === 189) props.controlBand.zoomOut() // -
			if (ev.keyCode === 187) props.controlBand.zoomIn() // +
		})

		if (this.onChange != null && typeof this.onChange === 'function') {
			document.addEventListener(CENTER_CHANGE_DONE, this.handleChange)
			document.addEventListener(ZOOM_DONE, this.handleChange)
		}
	}

	private handleChange = () => {
		this.onChange(props)
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