import { Grid, Ratio, Milliseconds } from "../constants";
import Config from "./config";
import { RawEv3nt } from "./event";
export declare class Props {
    grid: Grid;
    rowCount: number;
    events: RawEv3nt[];
    from: Milliseconds;
    to: Milliseconds;
    time: Milliseconds;
    init(config: Config): void;
    private _center;
    center: Ratio;
    private _viewportWidth;
    private _viewportHeight;
    readonly viewportWidth: number;
    readonly viewportHeight: number;
    dimensions: HTMLElement;
    private centerChangeDone;
}
declare const _default: Props;
export default _default;
