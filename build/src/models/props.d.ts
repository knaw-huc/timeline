import { Ratio, Milliseconds } from "../constants";
import Config from "./config";
import Domain from "./domain";
export declare class Props {
    config: Config;
    domains: Domain[];
    time: Milliseconds;
    viewportHeight: number;
    viewportWidth: number;
    init(config: Config): void;
    private _center;
    center: Ratio;
    dimensions: HTMLElement;
    private centerChangeDone;
}
declare const _default: Props;
export default _default;
