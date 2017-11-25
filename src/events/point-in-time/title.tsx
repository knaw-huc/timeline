import * as React from 'react'
import {EVENT_MIN_SPACE, EVENT_HEIGHT} from "../../constants";

const Title: React.SFC = (props) =>
	<div
		style={{
			backgroundColor: 'rgba(255, 255, 255, 0.75)',
			display: 'inline-block',
			lineHeight: `${EVENT_HEIGHT}px`,
			maxWidth: `calc(${EVENT_MIN_SPACE}px - ${EVENT_HEIGHT}px)`,
			overflow: 'hidden',
			padding: '.25em',
			textOverflow: 'ellipsis',
		}}
	>
		{props.children}
	</div>

export default Title;