onmessage = function(e) {
	importScripts(e.data.func1, e.data.func2)
	const rulers = []
	let date = findClosestRulerDate(e.data.from, e.data.gra)
	const nextDate = subsequentDate(e.data.gra)
	while(date.getTime() < e.data.to.getTime()) {
		rulers.push(date)
		date = nextDate(date)
	}
	postMessage(rulers)
}