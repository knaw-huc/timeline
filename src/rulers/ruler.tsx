import * as React from 'react';
import styled, { StyledComponentClass } from 'styled-components';
import {DATE_BAR_HEIGHT} from "../constants";

const Label = styled.span`
	align-items: flex-end;
	bottom: 10px;
	display: flex;
	height: calc(${DATE_BAR_HEIGHT} - 10px);
	color: #444;
	position: absolute;
	z-index: 1;
`;

export interface IProps {
	className?: string;
	left: number;
	toggleRelative: () => void;
	label: string;
}

const Ruler = styled.li`
	border-left: 1px solid #EEE;
	box-sizing: border-box;
	height: 100%;
	padding-left: 6px;
	position: absolute;
	transition: all 1s cubic-bezier(.25,.8,.25,1);
`;

const RulerComp: React.StatelessComponent<IProps> = (props) =>
	<Ruler
		className={props.className}
		style={{
			left: `${props.left}px`,
		}}
	>
		<Label
			onClick={props.toggleRelative}
		>
			{props.label}
		</Label>
	</Ruler>;


export default RulerComp;
