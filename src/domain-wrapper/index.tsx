import * as React from 'react'
import Rulers from '../rulers'
import DomainLabels from './domain-labels'
import Domain from '../models/domain';

export interface IProps {
	domain: Domain
	style: React.CSSProperties
}
const DomainWrapper: React.SFC<IProps> = (props) =>
	<div
		style={{
			height: `${props.domain.heightRatio * 100}%`,
			position: 'absolute',
			top: `${props.domain.topOffsetRatio * 100}%`,
			width: '100%',
			...props.style
		}}
	>
		{
			props.domain.rulers &&
			<Rulers
				domain={props.domain}
			/>
		}
		{
			props.domain.domainLabels &&
			<DomainLabels
				domain={props.domain}
			/>
		}
		{props.children}
	</div>

export default DomainWrapper