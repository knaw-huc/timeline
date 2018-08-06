import Band from '.'
import { BandConfig, MinimapDomainConfig } from '../config'
import animator from '../../animator';

export default class MinimapBand extends Band {
	domains: MinimapDomainConfig[]

	constructor(public config: BandConfig<MinimapDomainConfig>) {
		super(config)
		this.domains = config.domains
		animator.registerModelUpdaters(() => this.update())
	}
}
