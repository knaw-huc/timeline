export interface IDateRange {
    from: Date;
    infiniteFrom?: boolean;
    infiniteTo?: boolean;
    to: Date;
}
declare class BaseEvent {
    body: string;
    coordinates: any[];
    date: Date;
    dateRange: IDateRange;
    dateRangeUncertain: IDateRange;
    dateUncertain: IDateRange;
    from: Date;
    to: Date;
    slug: string;
    title: string;
    types: string[];
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
