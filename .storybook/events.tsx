import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Timeline, { DomainType } from '../src'
import { events } from './data';

storiesOf('Timeline/Events', module)
	.add('with rulers, no domain labels', () =>
		<div style={{ height: '200px'}}>
			<Timeline
				domains={[
					{ type: DomainType.Event }
				]}
				events={events}
				from={new Date(1964, 0, 1)}
				to={new Date(1978, 0, 1)}
			/>
		</div>
	)
	.add('no rulers, with domain labels', () =>
		<div style={{ height: '200px'}}>
			<Timeline
				domains={[
					{
						domainLabels: true,
						rulers: false,
						type: DomainType.Event,
					}
				]}
				events={events}
				from={new Date(1964, 0, 1)}
				to={new Date(1978, 0, 1)}
			/>
		</div>
	)
	.add('no rulers, no domain labels', () =>
		<div style={{ height: '200px'}}>
			<Timeline
				domains={[
					{
						rulers: false,
						type: DomainType.Event,
					}
				]}
				events={events}
				from={new Date(1964, 0, 1)}
				to={new Date(1978, 0, 1)}
			/>
		</div>
	)