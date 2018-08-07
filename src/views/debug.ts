import animator from "../animator"
import View from "./index"
import createElement from "../utils/create-element";
import props from "../models/props";

export default class Debug implements View {
	wrapper: HTMLDivElement

	constructor() {
		animator.registerView(this)
	}

	render() {
		this.wrapper = createElement('div', 'debug', [
			'background: black',
			'color: white',
			'font-size: .75em',
			'height: 300px',
			'padding: 1em',
			'position: absolute',
			'right: 0',
			'top: 200px',
			'width: 240px',
		])

		this.update()

		return this.wrapper
	}

	update() {
		this.wrapper.innerHTML = `
			<h3 style="padding: 0; margin: 0">Events band</h3>
			<div>left: ${Math.round(props.eventsBand.left)}px</div>
			<div>width: ${Math.round(props.eventsBand.width)}px</div>
			<div>px/ms: ${props.eventsBand.pixelsPerMillisecond}</div>
			<div>from: ${new Date(props.eventsBand.from).toISOString()}</div>
			<div>to: ${new Date(props.eventsBand.to).toISOString()}</div>
			<h3 style="padding: 0; margin: 0; margin-top: 1em">Minimap bands</h3>
			${
				props.minimapBands.map(mmb => 
					`<div>left: ${Math.round(mmb.left)}px</div>
					<div>width: ${Math.round(mmb.width)}px</div>
					<div>px/ms: ${mmb.pixelsPerMillisecond}</div>
					<div>from: ${new Date(mmb.from).toISOString()}</div>
					<div>to: ${new Date(mmb.to).toISOString()}</div>`
				)
			}
		`
	}
}