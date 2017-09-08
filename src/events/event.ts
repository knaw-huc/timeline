import {css, StyledComponentClass} from "styled-components";

export const eventCSS = css`
	box-sizing: border-box;
	color: #444;
	position: absolute;
	transition: all 1s cubic-bezier(.25, .8, .25, 1);
	white-space: nowrap;
`;

export const intervalOfTimeCSS = css`
	border-radius: 2px;
	height: 26px;
	padding: 4px 4px;

	&:hover {
		box-shadow: 0 4px 8px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.22);
	}	
`;

export default null;