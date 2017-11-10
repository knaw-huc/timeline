import * as React from 'react';
import styled from "styled-components";

const Wrapper = (props) => 
	<div
		style={{
			position: 'absolute',
			padding: '1%',
			right: 0,
			bottom: '100px',
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
			borderTopLeftRadius: '3px',
			borderBottomLeftRadius: '3px',
			color: 'white',
			fontSize: '0.6em',
		}}
	>
		{props.children}
	</div>

const Dev = ({root, width}) =>
	<Wrapper>
		<span style={{textDecoration: 'underline'}}>Timeline</span>
		<br />
		<span>{`${width}px wide`}</span>
		<br />
		<span>{`${root.countDays().toFixed(0)} days`}</span>
		<br />
		<span>{`${(root.countDays() / 365).toFixed(2)} years`}</span>
		<br /><br />
		<span>{`One pixel is: ${(root.countDays() / width).toFixed(2)} days`}</span>
		<br />
		<span>{`One day is: ${(width / root.countDays()).toFixed(4)}px`}</span>
	</Wrapper>

export default Dev;
