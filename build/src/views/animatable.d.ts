export default abstract class Animatable {
    register(): void;
    abstract render(): HTMLElement;
    abstract update: () => void;
}
