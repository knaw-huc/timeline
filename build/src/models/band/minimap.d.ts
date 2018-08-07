import Band from '.';
import { BandConfig, MinimapDomainConfig } from '../config';
export default class MinimapBand extends Band {
    config: BandConfig<MinimapDomainConfig>;
    domains: MinimapDomainConfig[];
    constructor(config: BandConfig<MinimapDomainConfig>);
}
