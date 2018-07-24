import { Ratio, Milliseconds, Pixels } from "../constants";
import Config from "./config";
import MinimapBand from "./band/minimap";
import EventsBand from "./band/events";
import { RawEv3nt } from "./event";
export declare class Props {
    private readonly defaultCenter;
    eventsBand: EventsBand;
    minimapBands: MinimapBand[];
    from: Milliseconds;
    time: Milliseconds;
    to: Milliseconds;
    viewportHeight: Pixels;
    viewportWidth: Pixels;
    visibleEvents: RawEv3nt[];
    init(config: Config): void;
    private _center;
    center: Ratio;
    dimensions: HTMLElement;
    calculateVisibleEvents(): void;
    private centerChangeDone;
    zoomIn(): void;
    zoomOut(): void;
}
declare const _default: Props;
export default _default;
