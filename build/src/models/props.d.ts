import { Ratio, Milliseconds, Pixels } from "../constants";
import Config from "./config";
import Domain from "./domain";
export declare class Props {
    private readonly defaultCenter;
    config: Config;
    domains: Domain[];
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
