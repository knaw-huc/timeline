import props from "./models/props";
import { Milliseconds, ZOOM_DONE, CENTER_CHANGE_DONE } from "./constants";
import Band from "./models/band";
import Canvas from "./views/canvas";
import Debug from "./views/debug";
import { MinimapBandConfig, EventsBandConfig } from "./models/config";
import EventsBand from "./models/band/events";

export type Multiplier = .25 | .5 | 1 | 2 | 4 | 8 | 16
enum Direction {
	Backward = -1,
	Stop = 0,
	Forward = 1,
}

export class Animator {
	private readonly elapsedTimeThreshold: Milliseconds = 2000
	private readonly goToDuration: Milliseconds = 300
	private readonly zoomToDuration: Milliseconds = 300

	private activeBand: EventsBand

	// private readonly interval: number = .00001
	readonly multipliers: Multiplier[] = [.25, .5, 1, 2, 4, 8, 16]

	// A marker is set when animating/navigating to a point on the timeline
	// When the marker is set to .5, the timeline will animate in `goToDuration`
	// time to center = .5
	private centerMarker: Milliseconds

	// Controls the speed of the animation
	private multiplier: Multiplier = 1

	// Animation direction, -1 is backward, 0 is pause, 1 is forward
	private direction: Direction = Direction.Stop

	// Timestamp of the prev animation frame
	private prevTimestamp: Milliseconds

	// Total time elapsed since start of animation. This reference is kept
	// to calculate the remaining time when animating to a marker
	private elapsedTimeTotal: Milliseconds = 0

	private models: Band<MinimapBandConfig | EventsBandConfig>[] = []
	private views: (Canvas | Debug)[] = []

	private zoomMarker: number

	registerModel(model: Band<MinimapBandConfig | EventsBandConfig>) {
		this.models.push(model)
	}

	registerView(view: Canvas | Debug) {
		this.views.push(view)
	}

	private adjustMinimapBands() {
		// A minimap zoom level should never be greater than the events band zoom level
		props.minimapBands.forEach(mmb => {
			// If the events band zoomlevel becomes smaller than the minimap band zoomlevel,
			// adjust the minimap band zoom level to follow the events band zoom level
			if (this.activeBand.zoomLevel < mmb.config.zoomLevel) {
				mmb.zoomLevel = this.activeBand.zoomLevel
			}
		})
	}

	animate = (timestamp) => {
		// time elapsed since previous frame
		const elapsedTime = this.prevTimestamp == null ? 0 : timestamp - this.prevTimestamp

		if (elapsedTime > 0 || this.prevTimestamp == null) {
			// If there is no marker, use the multiplier to determine speed
			if (this.centerMarker == null && this.zoomMarker == null) {
				// 7.5 = 60fps x 1/8 of the screen, so at multiplier = 1 and if the browser
				// gets a sweet 60fps, every second 1/8 of the screen should pass by
				props.center += (props.eventsBands[1].time / 7.5) * this.multiplier * this.direction

			// Else if there is a center marker, calculated the speed based on props.center and time remaining
			} else if (this.centerMarker != null) {
				const timeRemaining = this.goToDuration - this.elapsedTimeTotal
				const centerDelta = Math.abs(this.centerMarker - props.center) / (timeRemaining / elapsedTime)
				if (timeRemaining < elapsedTime) {
					props.center = this.centerMarker
					this.stop()
				}
				else props.center = props.center + (centerDelta * this.direction)
			}

			// Else if there is a zoom marker
			else if (this.zoomMarker != null) {
				const timeRemaining = this.zoomToDuration - this.elapsedTimeTotal
				const zoomDelta = (this.zoomMarker - this.activeBand.zoomLevel) / (timeRemaining / elapsedTime)
				if (timeRemaining < elapsedTime) {
					this.activeBand.zoomLevel = this.zoomMarker
					props.eventsBands.forEach(band => {
						// The band zoom level should always end in a whole number (the zoom marker)
						if (band === this.activeBand) this.activeBand.zoomLevel = this.zoomMarker
						// To get the whole number for the "inactive" bands, the zoom marker is added 
						// to the original (in the config) difference of the zoom levels with the active band
						else band.zoomLevel = this.zoomMarker + (band.config.zoomLevel - this.activeBand.config.zoomLevel)
					})
					this.adjustMinimapBands()
					document.dispatchEvent(new CustomEvent(ZOOM_DONE))
					this.stop()
				}
				else {
					for (const band of props.eventsBands) {
						band.zoomLevel = band.zoomLevel + zoomDelta
					}
					this.adjustMinimapBands()
				}
			}

			// Remember. There are only ~16ms (1000ms / 60fps) to update a frame

			// Update the models. This is quick ~2ms
			this.models.forEach(model => model.update())

			// Update the view. This is slower ~10/~15ms
			this.views.forEach(view => view.update())
		}

		this.elapsedTimeTotal += elapsedTime
		if (this.elapsedTimeTotal > this.elapsedTimeThreshold) this.resetElapsedTimeTotal()

		if (this.isPlaying() || this.zoomMarker != null) {
 			if ((props.center >= props.from && props.center <= props.to) || this.centerMarker != null || this.zoomMarker != null) {
				this.prevTimestamp = timestamp
				requestAnimationFrame(this.animate)
			} else {
				this.stop()
			}
		}
	}

	private resetElapsedTimeTotal() {
		this.elapsedTimeTotal = 0
		document.dispatchEvent(new CustomEvent(CENTER_CHANGE_DONE))
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

	goTo(nextCenter: Milliseconds) {
		this.centerMarker = nextCenter
		if (nextCenter > props.center) this.playForward()
		else this.playBackward()
	}

	zoomTo(band: EventsBand, nextZoomLevel: number) {
		// If the zoom marker is already set, return to let current the animation finish
		if (this.zoomMarker != null) return

		// The zoom level cannot be smaller than 0, 0 === no zoom
		if (nextZoomLevel < 0) nextZoomLevel = 0

		// If the the active band changed, reset the animation with this.stop()
		// and set the active band
		if (band !== this.activeBand) {
			this.stop()
			this.activeBand = band
		}

		// If the zoom level is the same as the current zoom level,
		// return to avoid unnecessary calcs and renders
		if (this.activeBand.zoomLevel === nextZoomLevel) return

		// Set the zoom marker
		this.zoomMarker = nextZoomLevel

		// Run the first frame
		this.nextFrame()
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

	nextFrame() {
		requestAnimationFrame(this.animate)
	}

	playForward() {
		this.direction = Direction.Forward
		this.nextFrame()
	}

	playBackward() {
		this.direction = Direction.Backward
		this.nextFrame()
	}

	stop() {
		this.direction = Direction.Stop
		this.activeBand = null
		this.centerMarker = null
		this.zoomMarker = null
		this.prevTimestamp = null
		this.elapsedTimeTotal = 0
	}

	toggle() {
		this.isPlaying() ? this.stop() : this.nextFrame()
	}
}

export default new Animator()