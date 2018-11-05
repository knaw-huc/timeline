import animator, { Animator } from './animator'
import props, { Props } from './models/props'
import View from './views';
import { EventType } from './constants';
import eventBus from './event-bus';

export type OnChangeFunction = (props: Props, e?: Event) => void

export default class Api {
	protected views: View[]
	animator: Animator = animator

	constructor() {
		document.addEventListener('keydown', (ev) => {
			if (ev.keyCode === 189) props.controlBand.zoomOut() // -
			if (ev.keyCode === 187) props.controlBand.zoomIn() // +
		})

		// if (this.onChange != null && typeof this.onChange === 'function') {
		// 	document.addEventListener(EventType.CENTER_CHANGE_DONE, this.handleChange)
		// 	document.addEventListener(EventType.ZOOM_DONE, this.handleChange)
		// }
	}

	on(eventName: string, func: any) {
		const nameMap = {
			centerchange: EventType.CenterChange,
			pause: EventType.Pause,
			play: EventType.Play,
			scrolldone: EventType.ScrollDone,
			select: EventType.Select,
			zoomdone: EventType.ZoomDone,
		}
		if (Object.keys(nameMap).indexOf(eventName) > -1) {
			const eventType = (nameMap as any)[eventName]
			let realFunc
			if (eventType === EventType.CenterChange) realFunc = () => func(props)
			else if (eventType === EventType.Select) realFunc = (ev: any) => func(ev.detail)
			else realFunc = func

			eventBus.register(eventType, realFunc)
		}
	}

	// private handleChange = () => {
	// 	this.onChange(props)
	// }

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