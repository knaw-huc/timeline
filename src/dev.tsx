import * as React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
	position: absolute;
	padding: 1%;
	right: 0;
	bottom: 100px;
	background-color: rgba(0, 0, 0, 0.5);
	border-top-left-radius: 3px;
	border-bottom-left-radius: 3px;
	color: white;
	font-size: 0.6em;
`;

const Dev = ({root, width}) =>
	<Wrapper>
		<span style={{textDecoration: 'underline'}}>Timeline</span>
		<br />
		<span>{` width: ${width}px`}</span>
		<br />
		<span>{` days: ${root.countDays().toFixed(0)} days`}</span>
		<br />
		<span>{` years: ${(root.countDays() / 365).toFixed(2)} years`}</span>
		<br /><br />
		<span>{`One pixel is: ${(root.countDays() / width).toFixed(2)} days`}</span>
		<br />
		<span>{`One day is: ${(width / root.countDays()).toFixed(4)}px`}</span>
	</Wrapper>

export default Dev;
