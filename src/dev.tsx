import * as React from 'react';
import Domain from './models/domain';

const Wrapper = (props) => 
	<div
		onClick={props.onClick}
		style={{
			backgroundColor: '#444',
			borderBottomLeftRadius: '3px',
			borderTopLeftRadius: '3px',
			bottom: '100px',
			color: 'white',
			cursor: 'pointer',
			fontSize: '0.6em',
			overflowX: 'hidden',
			padding: '1%',
			position: 'absolute',
			right: props.active ? 0 : '-146px',
			transition: 'right 300ms',
			width: '150px',
		}}
	>
		{props.children}
	</div>

const DomainData = (props) =>
	<section style={{ marginBottom: '1em', whiteSpace: 'nowrap' }}>
		<h3 style={{ margin: 0 }}>
			{
				props.visible ? 'Visible domain' : 'Domain'
			}
		</h3>
		<span>{`${props.domain.width.toFixed(0)}px wide`}</span>
		<br />
		<span>{`${props.domain.countDays().toFixed(0)} days`}</span>
		<br />
		<span>{`${(props.domain.countDays() / 365).toFixed(2)} years`}</span>
		<br /><br />
		<span>{`One pixel is: ${(props.domain.countDays() / props.domain.width).toFixed(2)} days`}</span>
		<br />
		<span>{`One day is: ${(props.domain.width / props.domain.countDays()).toFixed(4)}px`}</span>
		<br /><br />
		<span>{`From: ${props.domain.from}`}</span>
		<br />
		<span>{`To: ${props.domain.to}`}</span>
		<br /><br />

	</section>

export interface IProps {
	domain: Domain
	visibleDomain: Domain
}
export interface IState {
	active: boolean
}
class Dev extends React.Component<IProps, IState> {
	public state = {
		active: true,
	}

	public render() {
		return (
			<Wrapper
				active={this.state.active}
				onClick={(ev) => this.setState({ active: !this.state.active })}
			>
				<DomainData domain={this.props.domain} />
				<DomainData domain={this.props.visibleDomain} visible />
			</Wrapper>
		)
	}
}

export default Dev
