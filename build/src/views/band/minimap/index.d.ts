import Domain from '../../../models/domain';
import { RawEv3nt } from '../../../models/event';
export declare const onVisible: (from: any, to: any) => (e: RawEv3nt) => boolean;
export default class MiniMap {
    private domain;
    private canvas;
    private ctx;
    private maxHeight;
    private eventHeight;
    constructor(domain: Domain);
    render(): HTMLCanvasElement;
    private drawEvents;
}
