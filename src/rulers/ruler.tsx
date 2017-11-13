import * as React from 'react';
import styled, { StyledComponentClass } from 'styled-components';
import {DATE_BAR_HEIGHT, Granularity} from "../constants";

const Label: React.SFC = (props) =>
	<span
		style={{
			alignItems: 'flex-end',
			bottom: '10px',
			display: 'flex',
			height: `calc(${DATE_BAR_HEIGHT} - 10px)`,
			color: '#444',
			position: 'absolute',
			zIndex: 1,
		}}
	>
		{props.children}
	</span>


interface IRuler {
	left: number
}
const Ruler: React.SFC<IRuler> = (props) =>
	<li
		style={{
			borderLeft: '1px solid #EEE',
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
	left: number
	label: JSX.Element
}
const RulerComp: React.SFC<IProps> = (props) =>
	<Ruler left={props.left}>
		<Label>
			{props.label}
		</Label>
	</Ruler>;


export default RulerComp;
