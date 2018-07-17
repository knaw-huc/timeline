import props from "./models/props";
import { CENTER_CHANGE, Milliseconds, CENTER_CHANGE_DONE } from "./constants";

export type Multiplier = .25 | .5 | 1 | 2 | 4 | 8 | 16

export default class Animator {
	private readonly elapsedTimeThreshold: Milliseconds = 2000
	private readonly interval: number = .00001
	readonly multipliers: Multiplier[] = [.25, .5, 1, 2, 4, 8, 16]

	private multiplier: Multiplier = 1
	private animating = false
	private direction: -1 | 1 = 1
	// Timestamp of the prev animation frame
	private prevTimestamp: Milliseconds = 0
	// A counter to throttle the CENTER_CHANGE_DONE event
	private elapsedTimeTotal: Milliseconds = 0

	private animate = (timestamp) => {
		// time elapsed since previous frame
		const elapsedTime = timestamp - this.prevTimestamp

		// TODO find out why timestamp can be 0
		if (elapsedTime > 0) {
			props.center = props.center + (this.interval * this.multiplier * this.direction)
			document.dispatchEvent(new CustomEvent(CENTER_CHANGE))
		}

		this.elapsedTimeTotal += elapsedTime
		if (this.elapsedTimeTotal > this.elapsedTimeThreshold) this.resetElapsedTimeTotal()

		if (this.animating && props.center > 0 && props.center < 1) {
			this.prevTimestamp = timestamp
			requestAnimationFrame(this.animate)
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

	speed(multiplier: string) {
		const multiplier2: any = parseFloat(multiplier)
		if (this.multipliers.indexOf(multiplier2) === -1) return
		this.multiplier = multiplier2
	}

	isPlaying() {
		return this.animating
	}

	isPlayingForward() {
		return this.animating && this.direction === 1
	}

	isPlayingBackward() {
		return this.animating && this.direction === -1
	}

	play() {
		this.animating = true
		requestAnimationFrame(this.animate)
	}

	playForward() {
		this.direction = 1
		this.play()
	}

	playBackward() {
		this.direction = -1
		this.play()
	}

	stop() {
		this.animating = false
	}

	toggle() {
		this.animating ? this.stop() : this.play()
	}
}