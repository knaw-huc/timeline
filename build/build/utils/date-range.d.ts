import { Granularity } from "./dates";
export declare const getStep: (granularity: Granularity) => number;
declare const _default: (granularity: Granularity, prev?: boolean) => (Date: any) => Date;
export default _default;
