import { Ratio, Milliseconds, Pixels } from "../constants";
import Config from "./config";
import MinimapBand from "./band/minimap";
import EventsBand from "./band/events";
export declare class Props {
    private readonly defaultCenter;
    eventsBand: EventsBand;
    minimapBands: MinimapBand[];
    from: Milliseconds;
    time: Milliseconds;
    to: Milliseconds;
    viewportHeight: Pixels;
    viewportWidth: Pixels;
    init(config: Config): void;
    private _center;
    center: Ratio;
    dimensions: HTMLElement;
    private centerChangeDone;
}
declare const _default: Props;
export default _default;
