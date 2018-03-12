import Config from "./config";
export declare class Props {
    init(config: Config): void;
    private _center;
    center: number;
    private _from;
    private _to;
    readonly from: Date;
    readonly to: Date;
    edges: Config;
    private _time;
    readonly time: number;
    private _viewportWidth;
    private _viewportHeight;
    readonly viewportWidth: number;
    readonly viewportHeight: number;
    dimensions: HTMLElement;
    private centerChangeDone;
}
declare const _default: Props;
export default _default;
