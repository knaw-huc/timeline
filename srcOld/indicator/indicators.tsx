import * as React from 'react'
import Domain from '../models/domain'

export interface IDomainIndicator {
	domain: Domain
	onClick: (ev: any) => void
	setRef: (el: Element) => void
}
export const DomainIndicator: React.SFC<IDomainIndicator> = (props) =>
	<div
		onClick={props.onClick}
		ref={props.setRef}
		style={{
			position: 'absolute',
			bottom: 0,
			left: 0,
			right: 0,
			height: `${props.domain.viewportHeight}px`,
		}}
	>
		{props.children}
	</div>

export interface IVisibleDomainIndicator {
	domain: Domain
	dragging: boolean
	onMouseDown: (ev: any) => void
	left: number
	width: number
}
export const VisibleDomainIndicator: React.SFC<IVisibleDomainIndicator> = (props) =>
	<div
		onMouseDown={props.onMouseDown}
		style={{
			position: 'absolute',
			bottom: 0,
			cursor: '-webkit-grab',
			border: '1px solid red',
			backgroundColor: 'rgba(255, 0, 0, 0.1)',
			height: `${props.domain.viewportHeight}px`,
			left: `${props.left}px`,
			transition: props.dragging ? 'inital' : 'left 300ms ease-in-out',
			width: `${props.width}px`,
			zIndex: 3,
		}}
	>
		{props.children}
	</div>

/**
|--------------------------------------------------------------|
| DomainIndicator     |------------------------|               |
|                     | VisibleDomainIndicator |               |
|                     |________________________|               |
|--------------------------------------------------------------|
*/