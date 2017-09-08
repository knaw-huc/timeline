export interface IDateRange {
    from: Date;
    infiniteFrom?: boolean;
    infiniteTo?: boolean;
    to: Date;
}
export interface IBaseEvent {
    date: Date;
    dateRange: IDateRange;
    dateRangeUncertain: IDateRange;
    dateUncertain: IDateRange;
    from: Date;
    slug: string;
    title: string;
    to: Date;
    types: string[];
    countDays(): number;
    formatFromDate(): string;
    formatToDate(): string;
    isInterval(): boolean;
    isUncertain(): boolean;
}
declare class BaseEvent implements IBaseEvent {
    body: string;
    coordinates: any[];
    date: any;
    dateRange: any;
    dateRangeUncertain: any;
    dateUncertain: any;
    from: any;
    to: any;
    slug: string;
    title: string;
    types: any[];
    private dateGranularity;
    private dateRangeGranularity;
    constructor(data: any);
    countDays(): number;
    formatFromDate(): string;
    formatToDate(): string;
    isInterval(): boolean;
    isUncertain(): boolean;
    private formatDate;
    private setFrom();
    private setTo();
}
export default BaseEvent;
