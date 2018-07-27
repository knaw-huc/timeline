import Band from '.';
import { BandConfig, MinimapDomainConfig } from '../config';
export default class MinimapBand extends Band {
    domains: MinimapDomainConfig[];
    constructor(config: BandConfig<MinimapDomainConfig>);
}
