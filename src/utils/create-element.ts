export const createSvg = (name: string, style?: string[], attrs = {}) => {
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

const rules = {}
export default (name: string, className?: string, style?: string[], dynamicStyle?: string[]) => {
	if (!className) return document.createElement(name)

	let el
	if (rules.hasOwnProperty(className)) {
		el = rules[className].cloneNode(false)
	} else {
		el = document.createElement(name)
		el.classList.add(className)

		if (style) {
			sheet.insertRule(`.${className} { ${style.join(';').concat(';')} }`)
		}
		rules[className] = el.cloneNode(false)
	}
	if (dynamicStyle) el.setAttribute('style', dynamicStyle.join(';').concat(';'))
	return el
}