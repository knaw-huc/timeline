import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Timeline, { DomainType, IAggregate } from '../src'

const yearAggregate: IAggregate[] = [
	{ year: 1964, count: 12 },
	{ year: 1965, count: 52 },
	{ year: 1966, count: 22 },
	{ year: 1967, count: 2 },
	{ year: 1968, count: 1 },
	{ year: 1969, count: 12 },
	{ year: 1970, count: 14 },
	{ year: 1971, count: 21 },
	{ year: 1972, count: 27 },
	{ year: 1973, count: 14 },
	{ year: 1974, count: 9 },
	{ year: 1975, count: 82 },
	{ year: 1976, count: 62 },
	{ year: 1977, count: 92 },
	{ year: 1978, count: 10 },
]

storiesOf('Timeline', module)
	.add('sparkline', () =>
		<Timeline
			aggregate={yearAggregate}
			domains={[
				{ type: DomainType.Sparkline }
			]}
			from={new Date(1964, 0, 1)}
			to={new Date(1978, 0, 1)}
		/>
	)
	.add('sparkline, no rulers', () =>
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
	.add('sparkline, with domain labels', () =>
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
	)