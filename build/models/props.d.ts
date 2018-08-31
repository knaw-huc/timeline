import { Milliseconds, Pixels } from "../constants";
import Config from "./config";
import MinimapBand from "./band/minimap";
import EventsBand from "./band/events";
export declare class Props {
    private readonly defaultCenterRatio;
    bands: (EventsBand | MinimapBand)[];
    eventsBands: EventsBand[];
    minimapBands: MinimapBand[];
    controlBand: EventsBand;
    imagePath: string;
    from: Milliseconds;
    time: Milliseconds;
    to: Milliseconds;
    rootElement: HTMLElement;
    viewportHeight: Pixels;
    viewportOffset: Pixels;
    viewportWidth: Pixels;
    private _center;
    center: Milliseconds;
    dimensions: HTMLElement;
    private centerChangeDone;
    init(config: Config): void;
    resize(): void;
}
declare const _default: Props;
export default _default;
