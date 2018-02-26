import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Timeline, { DomainType } from '../src'
import { events } from './data';

storiesOf('Timeline/Zoom', module)
	.add('with rulers, no domain labels, ratio .5', () =>
		<div style={{ height: '200px'}}>
			<Timeline
				domains={[
					{
						visibleRatio: .5,
						type: DomainType.Event,
					}
				]}
				events={events}
				from={new Date(1964, 0, 1)}
				to={new Date(1978, 0, 1)}
			/>
		</div>
	)
	.add('with rulers, no domain labels, ratio .1', () =>
		<div style={{ height: '200px'}}>
			<Timeline
				domains={[
					{
						visibleRatio: .1,
						type: DomainType.Event,
					}
				]}
				events={events}
				from={new Date(1964, 0, 1)}
				to={new Date(1978, 0, 1)}
			/>
		</div>
	)
	.add('with rulers, no domain labels, ratio .01', () =>
		<div style={{ height: '200px'}}>
			<Timeline
				domains={[
					{
						visibleRatio: .01,
						type: DomainType.Event,
					}
				]}
				events={events}
				from={new Date(1964, 0, 1)}
				to={new Date(1978, 0, 1)}
			/>
		</div>
	)
	.add('with rulers, no domain labels, ratio .001', () =>
		<div style={{ height: '200px'}}>
			<Timeline
				domains={[
					{
						visibleRatio: .001,
						type: DomainType.Event,
					}
				]}
				events={events}
				from={new Date(1964, 0, 1)}
				to={new Date(1978, 0, 1)}
			/>
		</div>
	)