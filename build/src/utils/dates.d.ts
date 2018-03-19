export declare const enum Granularity {
    HOUR = 0,
    DAY = 1,
    WEEK = 2,
    MONTH = 3,
    YEAR = 4,
    DECADE = 5,
    YEARS_50 = 6,
    CENTURY = 7,
    MILLENIUM = 8,
}
export declare const countDays: (from: number, to: number) => number;
export declare const isEqual: (date1: Date, date2: Date) => boolean;
export declare const format: (date: Date, granularity: Granularity) => string;
export declare const getGranularity: (from: number, to: number, visibleRatio: number) => Granularity;
export declare const getStep: (granularity: Granularity) => number;
export declare function subsequentDate(granularity: Granularity): ((Date) => Date);
