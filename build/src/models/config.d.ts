import { Ratio } from "../constants";
import DomainConfig from "./domain.config";
export default class Config {
    center?: Ratio;
    domains?: DomainConfig[];
    rootElement?: HTMLElement;
}
