import props from "./models/props";
import { Milliseconds, Ratio, ZOOM_DONE } from "./constants";

export type Multiplier = .25 | .5 | 1 | 2 | 4 | 8 | 16
enum Direction {
	Backward = -1,
	Stop = 0,
	Forward = 1,
}

export class Animator {
	private readonly goToDuration: Milliseconds = 300
	private readonly zoomToDuration: Milliseconds = 300
	private readonly interval: number = .00001
	readonly multipliers: Multiplier[] = [.25, .5, 1, 2, 4, 8, 16]

	// A marker is set when animating/navigating to a point on the timeline
	// When the marker is set to .5, the timeline will animate in `goToDuration`
	// time to center = .5
	private centerMarker: Ratio

	// Controls the speed of the animation
	private multiplier: Multiplier = 1

	// Animation direction, -1 is backward, 0 is pause, 1 is forward
	private direction: Direction = Direction.Stop

	// Timestamp of the prev animation frame
	private prevTimestamp: Milliseconds

	// Total time elapsed since start of animation. This reference is kept
	// to calculate the remaining time when animating to a marker
	private elapsedTimeTotal: Milliseconds = 0

	private modelUpdaters: any[] = []
	private viewUpdaters: any[] = []
	private zoomMarker: Ratio

	registerModelUpdaters(update) {
		this.modelUpdaters.push(update)
	}

	registerViewUpdaters(update) {
		this.viewUpdaters.push(update)
	}

	animate = (timestamp) => {
		// time elapsed since previous frame
		const elapsedTime = this.prevTimestamp == null ? 0 : timestamp - this.prevTimestamp

		// TODO find out why timestamp can be 0
		if (elapsedTime > 0 || this.prevTimestamp == null) {
			// If there is no marker, use the multiplier to determine speed
			if (this.centerMarker == null && this.zoomMarker == null) {
				props.center = props.center + (this.interval * this.multiplier * this.direction)
			// Else if there is a marker, calculated the speed based on props.center and time remaining
			}
			else if (this.centerMarker != null) {
				const timeRemaining = this.goToDuration - this.elapsedTimeTotal
				const centerDelta = Math.abs(this.centerMarker - props.center) / (timeRemaining / elapsedTime)
				if (timeRemaining < elapsedTime) {
					props.center = this.centerMarker
					this.stop()
				}
				else props.center = props.center + (centerDelta * this.direction)
			}
			else if (this.zoomMarker != null) {
				const timeRemaining = this.zoomToDuration - this.elapsedTimeTotal
				const zoomDelta = (this.zoomMarker - props.eventsBand.zoomLevel) / (timeRemaining / elapsedTime)
				if (timeRemaining < elapsedTime) {
					props.eventsBand.zoomLevel = this.zoomMarker
					document.dispatchEvent(new CustomEvent(ZOOM_DONE))
					this.stop()
				}
				else {
					props.eventsBand.zoomLevel = props.eventsBand.zoomLevel + zoomDelta
				}

				// A minimap zoom level should never be greater than the events band zoom level
				props.minimapBands.forEach(mmb => {
					// If the events band zoomlevel becomes smaller than the minimap band zoomlevel,
					// adjust the minimap band zoom level to follow the events band zoom level
					if (props.eventsBand.zoomLevel < mmb.config.zoomLevel) {
						mmb.zoomLevel = props.eventsBand.zoomLevel
					// If the events band zoom level becomes greater than the minimap zoom level,
					// set the minimap zoom level back to the config value
					} else if (mmb.zoomLevel !== mmb.config.zoomLevel) {
						mmb.zoomLevel = mmb.config.zoomLevel
					}
				})
			}

			// Update the models. This is real quick ~0ms
			const t0 = performance.now()
			this.modelUpdaters.forEach(update => update())
			const t1 = performance.now(); console.log('Performance: ', `${t1 - t0}ms`)

			// Update the view. This is too slow ~30-50ms
			const t2 = performance.now()
			this.viewUpdaters.forEach(update => update())
			const t3 = performance.now(); console.log('Performance: ', `${t3 - t2}ms`)
		}

		this.elapsedTimeTotal += elapsedTime

		if (this.isPlaying() || this.zoomMarker != null) {
 			if ((props.center > 0 && props.center < 1) || this.centerMarker != null) {
				this.prevTimestamp = timestamp
				requestAnimationFrame(this.animate)
			} else {
				this.stop()
			}
		}
	}

	accelerate(): number {
		const index = this.multipliers.indexOf(this.multiplier)
		if (index === this.multipliers.length - 1) return this.multipliers[this.multipliers.length - 1]
		this.multiplier = this.multipliers[index + 1]
		return this.multiplier
	}

	decelerate(): number {
		const index = this.multipliers.indexOf(this.multiplier)
		if (index === 0) return this.multipliers[0]
		this.multiplier = this.multipliers[index - 1]
		return this.multiplier
	}

	goTo(nextCenter: Ratio) {
		this.centerMarker = nextCenter
		if (nextCenter > props.center) this.playForward()
		else this.playBackward()
	}

	zoomTo(nextZoomLevel: Ratio) {
		if (this.zoomMarker != null) return
		if (nextZoomLevel < 0) nextZoomLevel = 0
		this.zoomMarker = nextZoomLevel
		this.play()
	}

	speed(multiplier: string) {
		const multiplier2: any = parseFloat(multiplier)
		if (this.multipliers.indexOf(multiplier2) === -1) return
		this.multiplier = multiplier2
	}

	isPlaying() {
		return this.direction !== Direction.Stop
	}

	isPlayingForward() {
		return this.direction === Direction.Forward
	}

	isPlayingBackward() {
		return this.direction === Direction.Backward
	}

	play() {
		requestAnimationFrame(this.animate)
	}

	playForward() {
		this.direction = Direction.Forward
		this.play()
	}

	playBackward() {
		this.direction = Direction.Backward
		this.play()
	}

	stop() {
		this.direction = Direction.Stop
		this.centerMarker = null
		this.zoomMarker = null
		this.prevTimestamp = null
		this.elapsedTimeTotal = 0
	}

	toggle() {
		this.isPlaying() ? this.stop() : this.play()
	}
}

export default new Animator()