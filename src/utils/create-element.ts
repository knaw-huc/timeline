export const createSvg = (name: string, style?: string[], attrs: { [k: string]: string } = {}) => {
	const el = document.createElementNS("http://www.w3.org/2000/svg", name)

	if (style != null) el.setAttribute('style', style.join(';').concat(';'))

	Object.keys(attrs).forEach(k => el.setAttribute(k, attrs[k]))

	return el
}

let sheet: CSSStyleSheet
if (typeof window !== 'undefined')  {
	const element = document.createElement('style')
	document.head.appendChild(element)
	sheet = <CSSStyleSheet>element.sheet
}

const rules: { [key: string]: HTMLElement} = {}

function createElement(name: 'div', className?: string, style?: string[], dynamicStyle?: string[]): HTMLDivElement
function createElement(name: 'canvas', className?: string, style?: string[], dynamicStyle?: string[]): HTMLCanvasElement
function createElement(name: string, className?: string, style?: string[], dynamicStyle?: string[]): HTMLElement {
	if (!className) return document.createElement(name)

	let el: HTMLElement
	if (rules.hasOwnProperty(className)) {
		el = rules[className].cloneNode(false) as HTMLElement
	} else {
		el = document.createElement(name)
		el.classList.add(className)

		if (style) {
			sheet.insertRule(`.${className} { ${style.join(';').concat(';')} }`)
		}
		rules[className] = el.cloneNode(false) as HTMLElement
	}
	if (dynamicStyle) el.setAttribute('style', dynamicStyle.join(';').concat(';'))

	return el
}

export default createElement