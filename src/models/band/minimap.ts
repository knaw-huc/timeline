import Band from '.'
import { BandConfig, MinimapDomainConfig } from '../config'

export default class MinimapBand extends Band {
	domains: MinimapDomainConfig[]

	constructor(public config: BandConfig<MinimapDomainConfig>) {
		super(config)
		this.domains = config.domains
	}
}
