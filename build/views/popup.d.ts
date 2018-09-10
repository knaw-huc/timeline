import { RawEv3nt } from '../models/event';
export default class Popup {
    private rootElement;
    el: HTMLDivElement;
    event: RawEv3nt;
    constructor(rootElement: HTMLDivElement);
    update: () => void;
    hide(): void;
    private setWidth;
    private setPosition;
    private loadImage;
    show(event: RawEv3nt): void;
}
