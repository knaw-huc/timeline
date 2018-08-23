import View from "./index";
import EventsBand from "../models/band/events";
export default class Label implements View {
    private band;
    constructor(band: EventsBand);
    render(): HTMLDivElement;
    resize(): void;
}
