import { StyledComponentClass } from "styled-components";
import Event from "../models/event";
export interface IProps {
    className?: string;
    event: Event;
    key?: number;
    isNewEvent?: boolean;
    onEventClick?: (IEvent, MouseClickEvent) => void;
    onHandleMouseDown?: (string, number) => void;
}
declare const IntervalOfTime: StyledComponentClass<IProps, any, IProps>;
export default IntervalOfTime;
