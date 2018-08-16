import MinimapBand from "../../models/band/minimap"
import EventsBand from "../../models/band/events"
import props from "../../models/props"
import { Milliseconds } from "../../constants"
import { labelBody, Granularity, findClosestRulerDate } from "../../utils/dates"

const smallFont: string = "11px sans-serif"
const bigFont: string = "13px sans-serif"

function isSpecialRuler(date: Milliseconds, band: MinimapBand | EventsBand) {
	if (band.granularity === Granularity.CENTURY && new Date(date).getUTCFullYear() % 1000 === 0) return true
	if (band.granularity === Granularity.YEAR_5 && new Date(date).getUTCFullYear() % 50 === 0) return true
	if (band.granularity === Granularity.YEAR && new Date(date).getUTCFullYear() % 5 === 0) return true

	return false
}

function drawRuler (ctx: CanvasRenderingContext2D, band: MinimapBand | EventsBand, date: Milliseconds, top: number, bottom: number) {
	const left = band.positionAtTimestamp(date)
	ctx.moveTo(left, top)
	ctx.lineTo(left, bottom)
	if (band.config.rulerLabels) ctx.fillText(labelBody(date, band.granularity), left + 3, bottom - 3)
}

export default function drawRulers(ctx: CanvasRenderingContext2D, band: MinimapBand | EventsBand) {
	if (!band.config.rulers) return

	let date = findClosestRulerDate(band.from, band.granularity)
	const y = band.config.topOffsetRatio * props.viewportHeight
	const height = band.config.heightRatio * props.viewportHeight

	const normalRulerDates: Milliseconds[] = []	
	const specialRulerDates: Milliseconds[] = []	

	while(date < band.to) {
		if (isSpecialRuler(date, band))
			specialRulerDates.push(date)
		else
			normalRulerDates.push(date)

		date = band.nextDate(date)
	}

	ctx.beginPath()
	ctx.font = smallFont
	// Normal ruler font fill
	ctx.fillStyle = `rgb(205, 205, 205)`

	for (const date of normalRulerDates) {
		drawRuler(ctx, band, date, y, y + height)
	}

	// Normal ruler stroke
	ctx.strokeStyle = `rgb(235, 235, 235)`
	ctx.stroke()

	ctx.beginPath()
	ctx.font = bigFont
	// Special ruler font fill
	ctx.fillStyle = `rgb(120, 120, 120)`

	for (const date of specialRulerDates) {
		drawRuler(ctx, band, date, y, y + height)
	}

	// Special ruler stroke
	ctx.strokeStyle = `rgb(150, 150, 150)`
	ctx.stroke()
}