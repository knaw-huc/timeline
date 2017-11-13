import * as React from 'react'
import {EVENT_MIN_SPACE, EVENT_HEIGHT} from "../../constants";

const Title: React.SFC = (props) =>
	<div
		style={{
			display: 'inline-block',
			lineHeight: `${EVENT_HEIGHT}px`,
			// marginLeft: ${(props: {event: Event}) =>
			// 	(props.event.width > 0) ? `${(props.event.width / -2)}px` : 'initial'
			// },
			maxWidth: `calc(${EVENT_MIN_SPACE}px - ${EVENT_HEIGHT}px)`,
			overflow: 'hidden',
			textOverflow: 'ellipsis',
		}}
	>
		{props.children}
	</div>

export default Title;

			// paddingLeft: ${(props: {event: Event}) =>
			// 	props.event.isUncertain() ? '12px' : 'initial'
			// };