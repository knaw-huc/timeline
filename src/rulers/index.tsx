import * as React from 'react'
import {IRootEvent} from "../models/root-event"
import {Granularity} from "../constants"
import Rulers from './rulers'
import Domain from '../models/domain'

const Wrapper = (props) =>
	<div style={{ fontSize: '0.8em' }}>{props.children}</div>

export interface IProps {
	domain: Domain
	domainRatio: number
	visibleDomain: Domain
}
class RulersComp extends React.Component<IProps, null> {

	public render() {
		return (
			<Wrapper>
				<Rulers
					type="visibledomain"
					{...this.props}
					{...this.state}
				/>
				<Rulers
					type="sparkline"
					{...this.props}
					{...this.state}
				/>
			</Wrapper>
		);
	}
}

export default RulersComp;
