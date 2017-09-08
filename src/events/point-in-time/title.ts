import styled, { StyledComponentClass } from "styled-components";
import {IEvent} from "../../models/event";
import {EVENT_MIN_SPACE} from "../../constants";

const Title = styled.div`
	display: inline-block;
	line-height: 26px;
	margin-left: ${(props: {event: IEvent}) =>
	(props.event.width > 0) ? `${(props.event.width / -2)}px` : 'initial'
	};
	max-width: calc(${EVENT_MIN_SPACE}px - 12px);
	overflow: hidden;
	padding-left: ${(props: {event: IEvent}) =>
	props.event.isUncertain() ? '12px' : 'initial'
	};
	text-overflow: ellipsis;
`;

export default Title;
