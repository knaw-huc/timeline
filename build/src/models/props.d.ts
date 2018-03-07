import Config from "./config";
export declare class Props {
    private _center;
    private _from;
    private _to;
    private _viewportWidth;
    private _viewportHeight;
    init(config: Config): void;
    center: number;
    readonly from: Date;
    readonly to: Date;
    edges: Config;
    readonly viewportWidth: number;
    readonly viewportHeight: number;
    dimensions: HTMLElement;
}
declare const _default: Props;
export default _default;
