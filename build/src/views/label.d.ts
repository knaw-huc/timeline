import View from "./index";
import { EventsDomainConfig } from "../models/config";
export default class Label implements View {
    private domain;
    constructor(domain: EventsDomainConfig);
    render(): HTMLDivElement;
}
