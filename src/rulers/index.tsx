import * as React from 'react'
import {IRootEvent} from "../models/root-event"
import {Granularity} from "../constants"
import Rulers from './rulers'
import Domain from '../models/domain'

const Wrapper = (props) => <div style={{ fontSize: '0.8em' }}>{props.children}</div>

export interface IProps {
	domain: Domain
	domainRatio: number
	visibleDomain: Domain
}
export interface IState {
	relative: boolean;
}
class RulersComp extends React.Component<IProps, IState> {
	public state = {
		relative: false,
	};

	public render() {
		return (
			<Wrapper>
				<Rulers
					toggleRelative={this.toggleRelative}
					type="visibledomain"
					{...this.props}
					{...this.state}
				/>
				<Rulers
					toggleRelative={this.toggleRelative}
					type="sparkline"
					{...this.props}
					{...this.state}
				/>
			</Wrapper>
		);
	}

	private toggleRelative = () => this.setState({ relative: !this.state.relative })
}

export default RulersComp;
