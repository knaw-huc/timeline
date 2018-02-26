import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Timeline, { DomainType } from '../src'
import { yearAggregate, events } from './data';

storiesOf('Timeline/Two Domains', module)
	.add('sparkline, event', () =>
		<div style={{ height: '200px'}}>
			<Timeline
				aggregate={yearAggregate}
				domains={[
					{
						type: DomainType.Sparkline
					},
					{
						rulers: false,
						type: DomainType.Event
					},
				]}
				events={events}
				from={new Date(1964, 0, 1)}
				to={new Date(1978, 0, 1)}
			/>
		</div>
	)
	.add('sparkline .5, event .5', () =>
		<div style={{ height: '400px'}}>
			<Timeline
				aggregate={yearAggregate}
				domains={[
					{
						heightRatio: .5,
						type: DomainType.Sparkline,
						topOffsetRatio: .5,
					},
					{
						heightRatio: .5,
						type: DomainType.Event,
					},
				]}
				events={events}
				from={new Date(1964, 0, 1)}
				to={new Date(1978, 0, 1)}
			/>
		</div>
	)
	.add('sparkline .25, event .75', () =>
		<div style={{ height: '200px'}}>
			<Timeline
				aggregate={yearAggregate}
				domains={[
					{
						heightRatio: .25,
						rulerLabels: false,
						type: DomainType.Sparkline,
						topOffsetRatio: .75,
					},
					{
						heightRatio: .75,
						type: DomainType.Event,
					},
				]}
				events={events}
				from={new Date(1964, 0, 1)}
				to={new Date(1978, 0, 1)}
			/>
		</div>
	)
	.add('sparkline .25, event', () =>
		<div style={{ height: '200px'}}>
			<Timeline
				aggregate={yearAggregate}
				domains={[
					{
						heightRatio: .25,
						rulerLabels: false,
						type: DomainType.Sparkline,
						topOffsetRatio: .75,
					},
					{
						type: DomainType.Event,
					},
				]}
				events={events}
				from={new Date(1964, 0, 1)}
				to={new Date(1978, 0, 1)}
			/>
		</div>
	)