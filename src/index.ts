import props from './models/props'
import Config from './models/config'
import Band from './views/band'
import Indicator from './views/indicator'
import createElement from './utils/create-element'
import { debounce } from './utils/index'
import { orderEvents } from './utils/events.worker'
import { CENTER_CHANGE_DONE_EVENT, Milliseconds, Ratio } from './constants'
import Animator from './animator'

export { orderEvents }

export interface OnChangeFunctionProps { center: Ratio, visibleFrom: Milliseconds, visibleTo: Milliseconds }
export type OnChangeFunction = (props: OnChangeFunctionProps, e?: Event) => void

// TODO Add rows with domain knowledge
// TODO Add resize event
// TODO Add clean up method (remove dom nodes and event listeners)
// TODO Add open ranges (ie: people still alive)
// TODO If event granularity is equal to band granularity a point in time should be rendered as an interval 
// TODO flip PiT when on edge of timeline
// TODO Scroll vertical when events higher than viewportHeight
// TODO max size of canvas is 32676px, so the current minimap does not work on big screens and large timelines
//		create a prev, curr, next canvas, te size of the viewport width and move and update them on center change
export default class Timeline {
	private bands:Band[] = []
	private wrapper: HTMLElement
	private animator: Animator = new Animator()

	constructor(config: Config) {
		props.init(config)

		config.rootElement.appendChild(this.render())
		window.addEventListener('resize', this.debouncedRefresh)
	}

	// private remove() {
	// 	window.removeEventListener('resize', this.debouncedRefresh)
	// 	props.config.rootElement.removeChild(this.wrapper)
	// 	this.wrapper.remove()
	// 	this.wrapper.innerHTML = ''
	// 	this.wrapper = null
	// }

	refresh = (config: Partial<Config> = {}) => {
		// this.remove()
		// window.addEventListener('resize', this.debouncedRefresh)
	}
	private debouncedRefresh = debounce(this.refresh, 1000)

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
		document.addEventListener(CENTER_CHANGE_DONE_EVENT, (ev) => {
			const [from, to] = this.bands[0].domain.fromTo

			onChange(
				{
					center: props.center,
					visibleFrom: from,
					visibleTo: to,
				},
				ev
			)
		})
	}

	private render() {
		this.wrapper = createElement(
			'div',
			'wrapper',
			[
				'background-color: teal',
				'box-sizing: border-box',
				'height: 100%',
				'overflow: hidden',
				'position: relative',
				'user-select: none',
				'width: 100%',
			]
		)

			
		this.renderControls()
		this.renderBands()
		this.renderIndicators()

		return this.wrapper
	}

	private renderControls(): void {
		const playButton = createElement(
			'div',
			'play',
			[
				'border: 1px solid black',
				'border-radius: 4px',
				'cursor: pointer',
				'height: 18px',
				'line-height: 18px',
				'position: absolute',
				'text-align: center',
				'top: 10px',
				'width: 18px',
				'z-index: 1',
			],
			[
				'left: 100px',
			]
		)
		playButton.innerHTML = '▸'
		playButton.addEventListener('click', () => {
			if (this.animator.isPlayingForward()) this.animator.stop()
			else this.animator.playForward()
		})

		const playBackButton = createElement(
			'div',
			'play',
			[
				'border: 1px solid black',
				'border-radius: 4px',
				'cursor: pointer',
				'height: 18px',
				'line-height: 18px',
				'position: absolute',
				'text-align: center',
				'top: 10px',
				'width: 18px',
				'z-index: 1',
			],
			[
				'left: 10px',
			]
		)
		playBackButton.innerHTML = '◂'
		playBackButton.addEventListener('click', () => {
			if (this.animator.isPlayingBackward()) this.animator.stop()
			else this.animator.playBackward()
		})

		// const speed = createElement(
		// 	'div',
		// 	'play',
		// 	[
		// 		// 'border: 1px solid black',
		// 		// 'border-radius: 4px',
		// 		'cursor: pointer',
		// 		'height: 18px',
		// 		'line-height: 18px',
		// 		'position: absolute',
		// 		'text-align: center',
		// 		'top: 10px',
		// 		'width: 18px',
		// 		'z-index: 1',
		// 	],
		// 	[
		// 		'left: 10px',
		// 	]
		// )
		const speed = document.createElement('div')
		speed.style.position = 'absolute'
		speed.style.left = '50px'
		speed.style.zIndex = '1'
		speed.innerHTML = `<span id="decelerate">-</span><span id="multiplier">1</span>x<span id="accelerate">+</span>` 
		speed.addEventListener('click', (ev) => {
			if ((ev.target as HTMLSpanElement).id === 'accelerate') {
				const nextMultiplier = this.animator.accelerate()
				const multiplierElement = document.getElementById('multiplier')	
				multiplierElement.innerHTML = nextMultiplier.toString()
			}
			if ((ev.target as HTMLSpanElement).id === 'decelerate') {
				const nextMultiplier = this.animator.decelerate()
				const multiplierElement = document.getElementById('multiplier')	
				multiplierElement.innerHTML = nextMultiplier.toString()
			}
		})

		this.wrapper.appendChild(playButton)
		this.wrapper.appendChild(playBackButton)
		this.wrapper.appendChild(speed)
	}

	private renderBands(): void {
		// TODO remove second param: props is global
		this.bands = props.domains.map(d => new Band(d, props.config.aggregate))
		this.bands.forEach(this.appendToWrapper)
	}

	private renderIndicators(): void {
		this.bands
			.filter(band => band.domain.config.hasIndicatorFor != null)
			.map(band => new Indicator(band.domain, this.bands[band.domain.config.hasIndicatorFor].domain))
			.forEach(this.appendToWrapper)
	}

	private appendToWrapper = (child) => this.wrapper.appendChild(child.render())
}