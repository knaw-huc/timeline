import props from "./models/props";
import { CENTER_CHANGE, Milliseconds, CENTER_CHANGE_DONE, Ratio } from "./constants";

export type Multiplier = .25 | .5 | 1 | 2 | 4 | 8 | 16
enum Direction {
	Backward = -1,
	Stop = 0,
	Forward = 1,
}

export class Animator {
	private readonly goToDuration: Milliseconds = 300
	private readonly elapsedTimeThreshold: Milliseconds = 2000
	private readonly interval: number = .00001
	readonly multipliers: Multiplier[] = [.25, .5, 1, 2, 4, 8, 16]

	private marker: Ratio

	private multiplier: Multiplier = 1
	// Animation direction, -1 is backward, 0 is pause, 1 is forward
	private direction: Direction = Direction.Stop
	// Timestamp of the prev animation frame
	private prevTimestamp: Milliseconds
	// A counter to throttle the CENTER_CHANGE_DONE event
	private elapsedTimeTotal: Milliseconds = 0

	private animate = (timestamp) => {
		// time elapsed since previous frame
		const elapsedTime = this.prevTimestamp == null ? 0 : timestamp - this.prevTimestamp

		// TODO find out why timestamp can be 0
		if (elapsedTime > 0) {
			// If there is no marker, use the multiplier to determine speed
			if (this.marker == null) {
				props.center = props.center + (this.interval * this.multiplier * this.direction)
			// Else if there is a marker, calculated the speed based on props.center and time remaining
			} else {
				const timeRemaining = this.goToDuration - this.elapsedTimeTotal
				const centerDelta = Math.abs(this.marker - props.center) / (timeRemaining / elapsedTime)
				if (timeRemaining < 10) {
					props.center = this.marker
					this.stop()
					return
				}
				else props.center = props.center + (centerDelta * this.direction)
			}

			document.dispatchEvent(new CustomEvent(CENTER_CHANGE))
		}

		this.elapsedTimeTotal += elapsedTime
		if (this.elapsedTimeTotal > this.elapsedTimeThreshold) this.centerChangeDone()

		if (this.isPlaying() && props.center > 0 && props.center < 1) {
			this.prevTimestamp = timestamp
			requestAnimationFrame(this.animate)
		}
	}

	private centerChangeDone() {
		this.marker = null
		this.prevTimestamp = null
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

	goTo(nextCenter: Ratio) {
		this.marker = nextCenter
		this.multiplier = 16
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
		this.centerChangeDone()
	}

	toggle() {
		this.isPlaying() ? this.stop() : this.play()
	}
}

export default new Animator()