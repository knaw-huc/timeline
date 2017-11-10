"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("./domain");
class VisibleDomain extends domain_1.default {
    constructor(domain, ratio = 1, center = .5) {
        super(domain.from, domain.to, domain.width);
        this.domain = domain;
        this.ratio = ratio;
        this.center = center;
    }
}
exports.default = VisibleDomain;
