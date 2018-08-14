export default abstract class View {
	abstract render(): HTMLElement | HTMLElement[]
	abstract resize(): void
}