import * as React from 'react';
import { DATE_BAR_HEIGHT } from "../constants";

interface ILabel {
	title: string
}
const Label: React.SFC<ILabel> = (props) =>
	<span
		style={{
			alignItems: 'flex-end',
			bottom: '10px',
			display: 'flex',
			height: `calc(${DATE_BAR_HEIGHT} - 10px)`,
			color: '#444',
			position: 'absolute',
			zIndex: 2,
		}}
		title={props.title}
	>
		{props.children}
	</span>


interface IRuler {
	left: number
}
const Ruler: React.SFC<IRuler> = (props) =>
	<li
		style={{
			borderLeft: '1px solid #ccc',
			boxSizing: 'border-box',
			height: '100%',
			left: `${props.left}px`,
			paddingLeft: '6px',
			position: 'absolute',
			transition: 'all 1s cubic-bezier(.25,.8,.25,1)',
		}}
	>
		{props.children}
	</li>

export interface IProps {
	date: Date
	left: number
	label: JSX.Element
}
const RulerComp: React.SFC<IProps> = (props) =>
	<Ruler left={props.left}>
		{
			props.label != null &&
			<Label title={props.date.toString()}>
				{props.label}
			</Label>
		}
	</Ruler>;


export default RulerComp;
