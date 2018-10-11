import { Milliseconds, Pixels } from "../constants";
import Config from "./config";
import MinimapBand from "./band/minimap";
import EventsBand from "./band/events";
import { RawEv3nt } from './event';
export declare class Props {
    private readonly defaultCenterRatio;
    parent: RawEv3nt;
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
    init(config: Config): void;
    resize(): void;
}
declare const _default: Props;
export default _default;
