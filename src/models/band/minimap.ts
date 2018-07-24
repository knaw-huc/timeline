import Band from './index'
import { BandConfig, MinimapDomainConfig } from '../config'

export default class MinimapBand extends Band {
	constructor(config: BandConfig<MinimapDomainConfig>) {
		super(config)
	}
}
