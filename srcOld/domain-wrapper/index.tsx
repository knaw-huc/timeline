import * as React from 'react'
import Rulers from '../rulers'
import DomainLabels from './domain-labels'
import Domain from '../models/domain';

export interface IProps {
	domain: Domain
	style: React.CSSProperties
}
export interface IState {
	dragOffset: number
	left: number
	dragStart: number
}
export default class DomainWrapper extends React.PureComponent<IProps, IState> {
	// private el: Element

	public state = {
		dragOffset: null, // Relative to indicator
		left: 0,
		dragStart: 0,
	}

	public render() {
		return (
			<div
				onMouseDown={this.onMouseDown}
				onMouseMove={this.onMouseMove}
				style={{
					height: `${this.props.domain.heightRatio * 100}%`,
					left: `${this.state.left}px`,
					position: 'absolute',
					top: `${this.props.domain.topOffsetRatio * 100}%`,
					width: `${this.props.domain.width}px`,
					...this.props.style
				}}
			>
				{
					this.props.domain.rulers &&
					<Rulers
						domain={this.props.domain}
					/>
				}
				{
					this.props.domain.domainLabels &&
					<DomainLabels
						domain={this.props.domain}
					/>
				}
				{this.props.children}
			</div>
		)
	}

	private onMouseDown = (ev) => {
		document.addEventListener('mouseup', this.onMouseUp)

		this.setState({
			dragOffset: ev.clientX,
			dragStart: this.state.left,
		})
	}

	private onMouseMove = (ev) => {
		if (this.state.dragOffset) {
			const left = this.state.dragStart - (this.state.dragOffset - ev.clientX)
			this.setState({ left })
		}
	}

	private onMouseUp = () => {
		document.removeEventListener('mouseup', this.onMouseUp)

		// Wrap setState in setTimeout to fire onClick before
		// unsetting dragOffset (ability to check if dragging)
		setTimeout(() => { this.setState({ dragOffset: null }) }, 0)
	}
}