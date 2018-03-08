export interface IDateRange {
    from: Date;
    infiniteFrom?: boolean;
    infiniteTo?: boolean;
    to: Date;
}
declare abstract class BaseEvent {
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
    constructor(data: any);
    countDays(): number;
    private setFrom();
    private setTo();
    isInterval(): boolean;
    isUncertain(): boolean;
}
export default BaseEvent;
