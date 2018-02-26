import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Timeline, { DomainType } from '../src'
import { yearAggregate, events } from './data';

storiesOf('Timeline/Three Domains', module)
	.add('sparkline .25, sparkline .25, event .75', () =>
		<div style={{ height: '400px'}}>
			<Timeline
				aggregate={yearAggregate}
				domains={[
					{
						heightRatio: .5,
						type: DomainType.Event,
						visibleRatio: .25,
					},
					{
						heightRatio: .25,
						hasIndicatorFor: 0,
						type: DomainType.Sparkline,
						rulerLabels: false,
						topOffsetRatio: .5,
						visibleRatio: .5,
					},
					{
						heightRatio: .25,
						type: DomainType.Sparkline,
						topOffsetRatio: .75,
					},
				]}
				events={events}
				from={new Date(1964, 0, 1)}
				to={new Date(1978, 0, 1)}
			/>
		</div>
	)