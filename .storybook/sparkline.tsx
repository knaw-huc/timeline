import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Timeline, { DomainType } from '../src'
import { yearAggregate } from './data';

storiesOf('Timeline', module)
	.add('sparkline, with rulers, no domain labels', () =>
		<div style={{ height: '60px'}}>
			<Timeline
				aggregate={yearAggregate}
				domains={[
					{ type: DomainType.Sparkline }
				]}
				from={new Date(1964, 0, 1)}
				to={new Date(1978, 0, 1)}
			/>
		</div>
	)
	.add('sparkline, no rulers, with domain labels', () =>
		<div style={{ height: '40px'}}>
			<Timeline
				aggregate={yearAggregate}
				domains={[
					{
						domainLabels: true,
						rulers: false,
						type: DomainType.Sparkline,
					}
				]}
				from={new Date(1964, 0, 1)}
				to={new Date(1978, 0, 1)}
			/>
		</div>
	)
	.add('sparkline, no rulers, no domain labels', () =>
		<Timeline
			aggregate={yearAggregate}
			domains={[
				{
					rulers: false,
					type: DomainType.Sparkline,
				}
			]}
			from={new Date(1964, 0, 1)}
			to={new Date(1978, 0, 1)}
		/>
	)