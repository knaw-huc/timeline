import * as React from 'react'
import Event from "../../models/event";
import setIcons from "../set-icons";

// const point = styled.div`
// 	background: ${(props: {event: event}) =>
// 		props.event.isuncertain() ?
// 			`linear-gradient(to right, white, ${timelineblue}, white)` :
// 			'initial'
// 	}; 
// 	display: inline-block;
// 	left: ${(props: {event: event}) =>
// 		props.event.flip || props.event.isuncertain() ? 'initial' : '-6px'
// 	}; 
// 	line-height: 26px;
// 	position: ${(props: {event: event}) =>
// 		props.event.isuncertain() ? `static` : 'absolute'
// 	}; 
// 	right: ${props =>
// 		props.event.flip ? `-6px` : 'initial'
// 	};
// 	text-align: center;
// 	vertical-align: top;
// 	width: ${(props: {event: event}) =>
// 		props.event.width > 0 ? `${props.event.width}px` : 'initial'
// 	};
	
// 	${props => seticons(props.event.types, props.event.flip)}
// `;

const Point = (props) =>
	<div
		style={{
			backgroundColor: 'black',
			borderRadius: '6px',
			width: '12px',
			height: '12px',
		}}
	/>

export default Point;
