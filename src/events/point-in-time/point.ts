import styled, { StyledComponentClass } from "styled-components"; // https://github.com/styled-components/styled-components/issues/1063
import {IEvent} from "../../models/event";
import {timelineBlue} from "../../constants";
import setIcons from "../set-icons";

const Point = styled.div`
	background: ${(props: {event: IEvent}) =>
	props.event.isUncertain() ? `linear-gradient(to right, white, ${timelineBlue}, white)` : 'initial'
	}; 
	display: inline-block;
	left: ${(props: {event: IEvent}) =>
	props.event.flip || props.event.isUncertain() ? 'initial' : '-6px'
	}; 
	line-height: 26px;
	position: ${(props: {event: IEvent}) =>
	props.event.isUncertain() ? `static` : 'absolute'
	}; 
	right: ${props =>
	props.event.flip ? `-6px` : 'initial'
	};
	text-align: center;
	vertical-align: top;
	width: ${(props: {event: IEvent}) =>
	props.event.width > 0 ? `${props.event.width}px` : 'initial'
	};
	
	${props => setIcons(props.event.types, props.event.flip)}
`;

export default Point;
