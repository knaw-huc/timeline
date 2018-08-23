import View from "./index";
export default class Debug implements View {
    wrapper: HTMLDivElement;
    constructor();
    render(): HTMLDivElement;
    resize(): void;
    update(): void;
}
