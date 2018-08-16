// import Config from "../src/models/config";
// import prepareConfig from "../src/utils/prepare-config";

// describe('Config', () => {
// 	test('Empty instance', () => {
// 		expect(new Config()).toMatchObject({
// 			center: .5,
// 			minimaps: [],
// 		})
// 	})
// })

// describe('Prepare config', () => {
// 	test('Bare minimum instance', () => {
// 		const config = prepareConfig({
// 			events: {
// 				domains: [{
// 					events: []
// 				}]
// 			},
// 			rootElement: null
// 		}, 1000)

// 		// The events should be converted to orderedEvents and so no longer present on the config object
// 		expect(config).not.toMatchObject({ events: { domains: [ { events: [] }]} })

// 		expect(config).toMatchObject({
// 			center: .5,
// 			events: {
// 				domains: [{
// 					heightRatio: 1,
// 					orderedEvents: {
// 						events: [],
// 						from: null,
// 						grid: [],
// 						rowCount: 0,
// 						to: null
// 					},
// 					rulers: true,
// 					topOffsetRatio: 0,
// 				}],
// 				zoomLevel: 0
// 			},
// 			minimaps: [],
// 			rootElement: null,
// 		})
// 	})

// 	test('Minimum instance with minimap', () => {
// 		const config = prepareConfig({
// 			center: .1,
// 			events: {
// 				domains: [{
// 					events: []
// 				}]
// 			},
// 			minimaps: [{}],
// 			rootElement: null
// 		}, 1000)

// 		// The events should be converted to orderedEvents and so no longer present on the config object
// 		expect(config).not.toMatchObject({ events: { domains: [ { events: [] }]} })

// 		expect(config).toMatchObject({
// 			center: .1,
// 			events: {
// 				domains: [{
// 					heightRatio: 1,
// 					orderedEvents: {
// 						events: [],
// 						from: null,
// 						grid: [],
// 						rowCount: 0,
// 						to: null
// 					},
// 					rulers: true,
// 					topOffsetRatio: 0,
// 				}],
// 				zoomLevel: 0
// 			},
// 			minimaps: [{
// 				domains: [{
// 					heightRatio: 1,
// 					rulers: true,
// 					targets: [],
// 					topOffsetRatio: 0,
// 				}],
// 				zoomLevel: 0,
// 			}],
// 			rootElement: null,
// 		})
// 	})
// })