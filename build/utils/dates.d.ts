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
export declare const countDays: (from: Date, to: Date) => number;
export declare const isEqual: (date1: Date, date2: Date) => boolean;
export declare const format: (date: Date, granularity: Granularity) => string;
export declare const getGranularity: (from: Date, to: Date, visibleRatio: number) => Granularity;
