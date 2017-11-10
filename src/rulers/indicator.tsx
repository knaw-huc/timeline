import * as React from 'react'
import { DATE_BAR_HEIGHT } from '../constants';

export interface IProps {
	left: number
	onMove: (left: number) => void
	width: number
}
export interface IState {
	dragOffset: number
	cursorXPosition: number
	left: number
	width: number
}
class Indicator extends React.Component<IProps, IState> {
	private el: Element

	public state = {
		cursorXPosition: null, // Relative to timeline
		dragOffset: null, // Relative to indicator
		left: this.props.left,
		width: this.props.width,
	}

	public componentDidMount() {
		document.addEventListener('mouseup', this.onMouseUp)
	}

	public componentWillUnmount() {
		document.addEventListener('mouseup', this.onMouseUp)
	}

	public render() {
		return (
			<div
				ref={(el) => { this.el = el }}
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					height: `${DATE_BAR_HEIGHT}px`,
				}}
			>
				<div
					onMouseDown={(ev) => {
						const cursorXPosition = ev.clientX - this.el.getBoundingClientRect().left
						this.setState({
							dragOffset: cursorXPosition - this.state.left,
						})
					}}
					onMouseMove={(ev) => {
						if (this.state.dragOffset) {
							const cursorXPosition = ev.clientX - this.el.getBoundingClientRect().left
							const left = cursorXPosition - this.state.dragOffset
							this.setState({ left })
						}
					}}
					style={{
						position: 'absolute',
						bottom: 0,
						cursor: '-webkit-grab',
						border: '1px solid red',
						backgroundColor: 'rgba(255, 0, 0, 0.1)',
						height: `${DATE_BAR_HEIGHT}px`,
						left: `${this.state.left}px`,
						width: `${this.state.width}px`,
						zIndex: 3,
					}}
				/>
			</div>
		)
	}

	private onMouseUp = () => {
		this.props.onMove(this.state.left)
		this.setState({
			dragOffset: null,
			cursorXPosition: null,
		})
	}
}

export default Indicator