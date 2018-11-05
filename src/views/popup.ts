import { Ev3nt } from '../models/event';
import createElement from '../utils/create-element';
import props from '../models/props';
import { EVENT_HEIGHT } from '../constants';
import { formatDate } from '../utils/dates';
import animator from '../animator';

const POPUP_OFFSET = 14

function template(event: Ev3nt) {
	return `
		<img alt="noimage" src="" />
		<div class="metadata">
			<h2 class="label">${event.lbl}</h2>
			<div class="description">${event.dsc || ''}</div>
			<br />
			<br />
			<div class="from">${formatDate(event.from, event.dmin_g || event.d_g)}</div>
			${
				event.time ?
					`<div class="to">${formatDate(event.to, event.dmax_g || event.ed_g)}</div>` :
					''
			}
		</div>
		<div id="popup-close">✖</div>
	`
}

export default class Popup {
	el: HTMLDivElement
	event: Ev3nt

	constructor(private rootElement: HTMLDivElement) {
		this.el = createElement('div')
		this.el.id = 'popup'
		this.el.style.position = 'absolute'
		this.el.style.zIndex = '10'
		this.hide()
		this.rootElement.appendChild(this.el)
		// TODO use eventBus
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

	show(event: Ev3nt) {
		this.hide()
		this.event = event
		this.el.innerHTML = template(event)

		const label = this.el.querySelector('.label') as HTMLHeadingElement
		label.style.color = event.color

		const img = this.el.querySelector('img') as HTMLImageElement
		if (event.img) {
			img.setAttribute('alt', `Image of ${event.lbl}`)
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
