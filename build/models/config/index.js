"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DomainConfig {
}
exports.DomainConfig = DomainConfig;
class BandConfig {
    constructor() {
        this.heightRatio = 1;
        this.rulers = true;
        this.rulerLabels = true;
        this.topOffsetRatio = 0;
        this.zoomLevel = 0;
    }
}
exports.BandConfig = BandConfig;
class MinimapBandConfig extends BandConfig {
    constructor() {
        super(...arguments);
        this.indicatorFor = 0;
        this.targets = [];
    }
}
exports.MinimapBandConfig = MinimapBandConfig;
class EventsBandConfig extends BandConfig {
}
exports.EventsBandConfig = EventsBandConfig;
class Config {
}
exports.default = Config;
