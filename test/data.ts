import { RawEv3nt } from "../src/models/event";

export const events: RawEv3nt[] = [
	{ id: 'a0', date: Date.UTC(2001, 0, 1), end_date: Date.UTC(2100, 0, 1), end_date_max: Date.UTC(2100, 8, 1) }, // last, hightest end_date_max
	{ id: 'b1', date: Date.UTC(2001, 0, 1), end_date: Date.UTC(2100, 0, 1), end_date_max: Date.UTC(2100, 6, 1) },
	{ id: 'c2', date: Date.UTC(1800, 0, 1) },
	{ id: 'd3', date: Date.UTC(2000, 0, 1), date_min: Date.UTC(1700, 2, 1), end_date: Date.UTC(2000, 1, 1) },
	{ id: 'e4', date: Date.UTC(2000, 0, 1), date_min: Date.UTC(1700, 0, 1), end_date: Date.UTC(2000, 1, 1) }, // first, lowest date_min
	{ id: 'f5', date: Date.UTC(1900, 0, 1) },
]