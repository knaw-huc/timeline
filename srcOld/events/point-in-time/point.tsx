import * as React from 'react'
import { EVENT_HEIGHT } from '../../constants';

const Point = (props) =>
	<div
		style={{
			backgroundImage: 'radial-gradient(white 20%, black 100%)',
			borderRadius: `${EVENT_HEIGHT/2}px`,
			display: 'inline-block',
			margin: '.25em 0',
			width: `${EVENT_HEIGHT}px`,
			height: `${EVENT_HEIGHT}px`,
		}}
	/>

export default Point;
