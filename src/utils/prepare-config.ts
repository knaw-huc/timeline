import Config, { EventsDomainConfig, BandConfig, MinimapDomainConfig } from "../models/config";
import { orderEvents } from "./events.worker";
import { Pixels } from "../constants";

export default function prepareConfig(config: Config, viewportWidth: Pixels): Config {
	if (config.events == null) {
		console.error('[DomainConfig] No events band in config!')
		return config
	}

	if (config.events.domains == null || !config.events.domains.length) {
		console.error('[DomainConfig] No events band domains in config!')
		return config
	}


	config.events.domains = config.events.domains.map(domainConfig => {
		if (domainConfig.events == null && domainConfig.orderedEvents == null) {
			console.error('[DomainConfig] No events in config!')
		}
		else if (domainConfig.orderedEvents == null) {
			domainConfig.orderedEvents = orderEvents(domainConfig.events)
			delete domainConfig.events
		}

		return { ...new EventsDomainConfig(), ...domainConfig }	
	})

	config = { ...new Config(), ...config}

	config.events.domains = config.events.domains.map(d => ({ ...new EventsDomainConfig(), ...d }))
	config.events = { ...new BandConfig<EventsDomainConfig>(), ...config.events }

	config.minimaps = config.minimaps.map(mm => {
		mm = { ...new BandConfig<MinimapDomainConfig>(), ...mm }
		if (!mm.domains.length) mm.domains.push({})
		mm.domains = mm.domains.map(d => ({ ...new MinimapDomainConfig(), ...d }))
		return ({ ...new BandConfig<MinimapDomainConfig>(), ...mm })
	})

	return config
}