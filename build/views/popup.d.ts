import { Ev3nt } from '../models/event';
export default class Popup {
    private rootElement;
    el: HTMLDivElement;
    event: Ev3nt;
    constructor(rootElement: HTMLDivElement);
    update: () => void;
    hide(): void;
    private setWidth;
    private setPosition;
    private loadImage;
    show(event: Ev3nt): void;
}
