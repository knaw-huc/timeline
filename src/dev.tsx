import * as React from 'react';
import Domain from './models/domain';

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

export interface IProps {
	domain: Domain
	visibleDomain: Domain
	width: number
}
const Dev: React.SFC<IProps> = ({domain, visibleDomain, width}) =>
	<Wrapper>
		<span style={{textDecoration: 'underline'}}>Timeline</span>
		<br />
		<span>{`${width}px wide`}</span>
		<br />
		<span>{`${domain.countDays().toFixed(0)} days`}</span>
		<br />
		<span>{`${(domain.countDays() / 365).toFixed(2)} years`}</span>
		<br /><br />
		<span>{`One pixel is: ${(domain.countDays() / width).toFixed(2)} days`}</span>
		<br />
		<span>{`One day is: ${(width / domain.countDays()).toFixed(4)}px`}</span>
	</Wrapper>

export default Dev;
