import animator from "../animator";

export default abstract class Animatable {
	register() {
		animator.registerViewUpdaters(this.update)
	}

	abstract render(): HTMLElement
	abstract update: () => void
}