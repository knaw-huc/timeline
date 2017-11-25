import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Timeline, { DomainType } from '../src'
import { events } from './data';

storiesOf('Timeline', module)
	.add('events, with rulers, no domain labels', () =>
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
	.add('events, no rulers, with domain labels', () =>
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
	.add('events, no rulers, no domain labels', () =>
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
	.add('events, with rulers, no domain labels, ratio .5', () =>
		<div style={{ height: '200px'}}>
			<Timeline
				domains={[
					{
						ratio: .5,
						type: DomainType.Event,
					}
				]}
				events={events}
				from={new Date(1964, 0, 1)}
				to={new Date(1978, 0, 1)}
			/>
		</div>
	)
	.add('events, with rulers, no domain labels, ratio .1', () =>
		<div style={{ height: '200px'}}>
			<Timeline
				domains={[
					{
						ratio: .1,
						type: DomainType.Event,
					}
				]}
				events={events}
				from={new Date(1964, 0, 1)}
				to={new Date(1978, 0, 1)}
			/>
		</div>
	)
	.add('events, with rulers, no domain labels, ratio .01', () =>
		<div style={{ height: '200px'}}>
			<Timeline
				domains={[
					{
						ratio: .01,
						type: DomainType.Event,
					}
				]}
				events={events}
				from={new Date(1964, 0, 1)}
				to={new Date(1978, 0, 1)}
			/>
		</div>
	)
	.add('events, with rulers, no domain labels, ratio .001', () =>
		<div style={{ height: '200px'}}>
			<Timeline
				domains={[
					{
						ratio: .001,
						type: DomainType.Event,
					}
				]}
				events={events}
				from={new Date(1964, 0, 1)}
				to={new Date(1978, 0, 1)}
			/>
		</div>
	)