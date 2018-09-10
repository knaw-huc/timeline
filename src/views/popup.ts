import { RawEv3nt } from '../models/event';
import createElement from '../utils/create-element';
import props from '../models/props';
import { EVENT_HEIGHT } from '../constants';
import { formatDate } from '../utils/dates';
import animator from '../animator';

const POPUP_OFFSET = 14

function template(event: RawEv3nt) {
	return `
		<img alt="noimage" src="" />
		<div class="metadata">
			<h2 class="label">${event.label}</h2>
			<div class="description">${event.description || ''}</div>
			<br />
			<br />
			<div class="from">${formatDate(event.from, event.date_min_granularity || event.date_granularity)}</div>
			${
				event.time ?
					`<div class="to">${formatDate(event.to, event.end_date_max_granularity || event.end_date_granularity)}</div>` :
					''
			}
		</div>
		<div id="popup-close">✖</div>
	`
}

export default class Popup {
	el: HTMLDivElement
	event: RawEv3nt

	constructor(private rootElement: HTMLDivElement) {
		this.el = createElement('div')
		this.el.id = 'popup'
		this.el.style.position = 'absolute'
		this.el.style.zIndex = '10'
		this.hide()
		this.rootElement.appendChild(this.el)
		this.el.addEventListener('click', (ev: MouseEvent) => {
			if ((ev.target as HTMLElement).matches('#popup-close')) {
				this.hide()
			}
		})

		animator.registerView(this)
	}

	update = () => {
		if (this.event) this.setPosition()
	}

	hide() {
		this.event = null
		this.el.style.width = 'auto'
		this.el.style.visibility = 'hidden'
		this.el.classList.remove('bottom')
	}

	private setWidth() {
		const rect = this.el.getBoundingClientRect()
		this.el.style.width = `${rect.width}px`
	}

	private setPosition() {
		const rect = this.el.getBoundingClientRect()

		if (
			this.event.left + this.event.width < POPUP_OFFSET ||
			this.event.left > props.viewportWidth - POPUP_OFFSET
		) {
			this.el.style.visibility = 'hidden'
			return
		}

		let left = this.event.left + this.event.width/2 - rect.width/2
		if (left < POPUP_OFFSET) left = POPUP_OFFSET
		if (left + rect.width > props.viewportWidth - POPUP_OFFSET) left = props.viewportWidth - rect.width - POPUP_OFFSET
		this.el.style.left = `${left}px`

		let top = this.event.top + EVENT_HEIGHT + POPUP_OFFSET
		if (top + rect.height > props.viewportHeight - POPUP_OFFSET) {
			top = this.event.top - rect.height - POPUP_OFFSET
			this.el.classList.add('bottom')
		}
		this.el.style.top = `${top}px`

		this.el.style.visibility = 'visible'
	}

	private loadImage = () => {
		const img = this.el.querySelector('img') as HTMLImageElement
		img.removeEventListener('load', this.loadImage)

		this.setWidth()
		this.setPosition()
	}

	show(event: RawEv3nt) {
		this.hide()
		this.event = event
		this.el.innerHTML = template(event)

		const label = this.el.querySelector('.label') as HTMLHeadingElement
		label.style.color = event.color

		const img = this.el.querySelector('img') as HTMLImageElement
		if (event.has_image) {
			img.setAttribute('alt', `Image of ${event.label}`)
			img.addEventListener('load', this.loadImage)
			img.src = event.image.src.replace('32', '128')
		} else {
			img.src = null
			img.setAttribute('alt', 'noimage')
			this.setWidth()
			this.setPosition()
		}
	}
}
