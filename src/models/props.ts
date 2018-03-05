import { CENTER_CHANGE_EVENT } from "../constants";

export class Props {
	private _center: number = .5
	private _from: Date
	private _to: Date

	get center() { return this._center }
	set center(n: number) {
		if ((this._center === 0 && n < 0) || (this._center === 1 && n > 1)) return
		else if (n < 0) this._center = 0
		else if (n > 1) this._center = 1
		else this._center = n

		document.dispatchEvent(new CustomEvent(CENTER_CHANGE_EVENT, { detail: n }))
	}

	get from() { return this._from }
	set from(date: Date) {
		this._from = date
	}

	get to() { return this._to }
	set to(date: Date) {
		this._to = date
	}
}

export default new Props()