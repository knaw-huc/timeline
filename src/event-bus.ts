import { EventType } from './constants';

type EventListener = [string, EventListenerOrEventListenerObject, Target]
export type Target = Document | Window | HTMLElement

/**
 * The EventBus registers all event listeners on the views.
 * When the views are redrawn (because of a resize for example),
 * all the event listeners have to be removed and re-added.
 * Doing that in a central place, prevents leaks.
 */
export class EventBus {
	private eventsListeners: EventListener[] = []

	dispatch(eventType: EventType, payload?: any) {
		const event = (payload != null) ?
			new CustomEvent(eventType, { detail: payload }) :
			new CustomEvent(eventType)

		document.dispatchEvent(event)
	}

	register(type: string, listener: EventListenerOrEventListenerObject, target: Target = document) {
		target.addEventListener(type, listener)
		this.eventsListeners.push([type, listener, target])
	}

	flush() {
		this.eventsListeners.forEach((eventListener: EventListener) => {
			const [type, listener, target] = eventListener
			target.removeEventListener(type, listener)
		})
		this.eventsListeners = []
	}
}

export default new EventBus()
