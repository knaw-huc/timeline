// import Config, { BandConfig } from "../models/config"
// import { orderEvents, OrderedEvents } from "./events.worker"
// import { Pixels } from "../constants"
// import { RawEv3nt } from "../models/event";

// // function orderEventsProxy(events: RawEv3nt[], pixelsPerMillisecond: Pixels, orderEventsWasm?): OrderedEvents {
// // 	// @ts-ignore
// // 	if (typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function" && orderEventsWasm) {
// // 		console.warn("[Timeline] Using WebAssembly")
// // 		const es = JSON.stringify(events)
// // 		const es2 = orderEventsWasm.order_events(es, pixelsPerMillisecond)
// // 		return JSON.parse(es2)
// // 	} else {
// // 		return orderEvents(events, pixelsPerMillisecond)
// // 	}
// // }

// export default async function prepareConfig(config: Config): Promise<Config> {
// 	// config.bands = config.bands.map(band => {
// 	// 	if (band instanceof EventsBand) {

// 	// 	}
// 	// })
// 	// if (config.events == null) {
// 	// 	console.error('[DomainConfig] No events band in config!')
// 	// 	return config
// 	// }

// 	// if (config.events.domains == null || !config.events.domains.length) {
// 	// 	console.error('[DomainConfig] No events band domains in config!')
// 	// 	return config
// 	// }

// 	/**
// 	 * Wasm works in dev mode. When created into a lib, the deps are lazy loaded
// 	 * from the wrong dir (project root)
// 	 */
// 	// const orderEventsWasm = await import('../wasm/timeline_sort_events.js')

// 	// config.events.domains = config.events.domains.map(domainConfig => {
// 	// 	if (domainConfig.events == null && domainConfig.orderedEvents == null) {
// 	// 		console.error('[DomainConfig] No events in config!')
// 	// 	}
// 	// 	else if (domainConfig.orderedEvents == null) {
// 	// 		domainConfig.orderedEvents = orderEventsProxy(domainConfig.events, pixelsPerMillisecond)
// 	// 		delete domainConfig.events
// 	// 	}

// 	// 	return { ...new EventsDomainConfig(), ...domainConfig }	
// 	// })

// 	// config = { ...new Config(), ...config}

// 	// config.events.domains = config.events.domains.map(d => ({ ...new EventsDomainConfig(), ...d }))
// 	// config.events = { ...new BandConfig<EventsDomainConfig>(), ...config.events }

// 	// config.minimaps = config.minimaps.map(mm => {
// 	// 	mm = { ...new BandConfig<MinimapDomainConfig>(), ...mm }
// 	// 	if (!mm.domains.length) mm.domains.push({})
// 	// 	mm.domains = mm.domains.map(d => ({ ...new MinimapDomainConfig(), ...d }))
// 	// 	return ({ ...new BandConfig<MinimapDomainConfig>(), ...mm })
// 	// })

// 	return config
// }