import props from "./models/props";
import { Milliseconds, Ratio } from "./constants";

export type Multiplier = .25 | .5 | 1 | 2 | 4 | 8 | 16
enum Direction {
	Backward = -1,
	Stop = 0,
	Forward = 1,
}

export class Animator {
	private readonly goToDuration: Milliseconds = 300
	private readonly interval: number = .00001
	readonly multipliers: Multiplier[] = [.25, .5, 1, 2, 4, 8, 16]

	// A marker is set when animating/navigating to a point on the timeline
	// When the marker is set to .5, the timeline will animate in `goToDuration`
	// time to center = .5
	private marker: Ratio

	private multiplier: Multiplier = 1
	// Animation direction, -1 is backward, 0 is pause, 1 is forward
	private direction: Direction = Direction.Stop
	// Timestamp of the prev animation frame
	private prevTimestamp: Milliseconds

	// Total time elapsed since start of animation. This reference is kept
	// to calculate the remaining time when animating to a marker
	private elapsedTimeTotal: Milliseconds = 0

	private updaters: any[] = []

	registerUpdater(update) {
		this.updaters.push(update)
	}

	animate = (timestamp) => {
		// time elapsed since previous frame
		const elapsedTime = this.prevTimestamp == null ? 0 : timestamp - this.prevTimestamp

		// TODO find out why timestamp can be 0
		if (elapsedTime > 0 || this.prevTimestamp == null) {
			// If there is no marker, use the multiplier to determine speed
			if (this.marker == null) {
				props.center = props.center + (this.interval * this.multiplier * this.direction)
			// Else if there is a marker, calculated the speed based on props.center and time remaining
			} else {
				const timeRemaining = this.goToDuration - this.elapsedTimeTotal
				const centerDelta = Math.abs(this.marker - props.center) / (timeRemaining / elapsedTime)
				if (timeRemaining < elapsedTime) {
					props.center = this.marker
					this.stop()
				}
				else props.center = props.center + (centerDelta * this.direction)
			}

			this.update()
		}

		this.elapsedTimeTotal += elapsedTime

		if (this.isPlaying() && props.center > 0 && props.center < 1) {
			this.prevTimestamp = timestamp
			requestAnimationFrame(this.animate)
		}
	}

	private update = () => this.updaters.forEach(update => update())

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
		this.marker = nextCenter
		if (nextCenter > props.center) this.playForward()
		else this.playBackward()
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
		this.marker = null
		this.prevTimestamp = null
		this.elapsedTimeTotal = 0
	}

	toggle() {
		this.isPlaying() ? this.stop() : this.play()
	}
}

export default new Animator()