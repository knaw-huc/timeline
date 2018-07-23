import animator from "../animator";

export default abstract class Animatable {
	register() {
		animator.registerUpdater(this.update)
	}

	abstract render(): HTMLElement
	abstract update: () => void
}