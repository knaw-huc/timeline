import { formatDate, Granularity } from '../src/utils/dates'

describe('Format', () => {
	test('YEAR and bigger', () => {
		expect(formatDate(Date.UTC(1900, 0), Granularity.YEAR)).toBe('1900')
		expect(formatDate(Date.UTC(1900, 0), Granularity.YEAR_5)).toBe('1900')
		expect(formatDate(Date.UTC(1900, 0), Granularity.DECADE)).toBe('1900')
		expect(formatDate(Date.UTC(1900, 0), Granularity.DECADE_5)).toBe('1900')
		expect(formatDate(Date.UTC(1900, 0), Granularity.CENTURY)).toBe('1900')
		expect(formatDate(Date.UTC(1900, 0), Granularity.CENTURY_5)).toBe('1900')
		expect(formatDate(Date.UTC(1900, 0), Granularity.MILLENIUM)).toBe('1900')
	})

	test('MONTH', () => {
		expect(formatDate(Date.UTC(1900, 0), Granularity.MONTH)).toBe('Jan 1900')
		expect(formatDate(Date.UTC(1900, 11), Granularity.MONTH)).toBe('Dec 1900')
	})

	test('DAY', () => {
		expect(formatDate(Date.UTC(1900, 0), "DAY")).toBe('Mon, 1st Jan 1900')
		expect(formatDate(Date.UTC(1900, 11, 2), Granularity.DAY)).toBe('Sun, 2nd Dec 1900')
		expect(formatDate(Date.UTC(1900, 11, 3), Granularity.DAY)).toBe('Mon, 3rd Dec 1900')
		expect(formatDate(Date.UTC(1900, 5, 30), Granularity.DAY)).toBe('Sat, 30th Jun 1900')
		expect(formatDate(Date.UTC(1900, 5, 31), Granularity.DAY)).toBe('Sun, 1st Jul 1900')
		expect(formatDate(Date.UTC(1900, 3, 11), Granularity.DAY)).toBe('Wed, 11th Apr 1900')
		expect(formatDate(Date.UTC(1900, 3, 12), Granularity.DAY)).toBe('Thu, 12th Apr 1900')
		expect(formatDate(Date.UTC(1900, 3, 13), Granularity.DAY)).toBe('Fri, 13th Apr 1900')
		expect(formatDate(Date.UTC(1900, 3, 21), Granularity.DAY)).toBe('Sat, 21st Apr 1900')
		expect(formatDate(Date.UTC(1900, 3, 22), Granularity.DAY)).toBe('Sun, 22nd Apr 1900')
		expect(formatDate(Date.UTC(1900, 3, 23), Granularity.DAY)).toBe('Mon, 23rd Apr 1900')
	})

	test('HOUR', () => {
		expect(formatDate(Date.UTC(1900, 0), Granularity.HOUR)).toBe('Mon, 1st Jan 1900 at 00:00')
		expect(formatDate(Date.UTC(1900, 0, 1, 3), Granularity.HOUR)).toBe('Mon, 1st Jan 1900 at 03:00')
		expect(formatDate(Date.UTC(1900, 0, 1, 14), Granularity.HOUR)).toBe('Mon, 1st Jan 1900 at 14:00')
	})

	test('MINUTES', () => {
		expect(formatDate(Date.UTC(1900, 0), Granularity.MINUTE)).toBe('Mon, 1st Jan 1900 at 00:00')
		expect(formatDate(Date.UTC(1900, 0, 1, 14), Granularity.MINUTE)).toBe('Mon, 1st Jan 1900 at 14:00')
		expect(formatDate(Date.UTC(1900, 0, 1, 14, 1), Granularity.MINUTE)).toBe('Mon, 1st Jan 1900 at 14:01')
		expect(formatDate(Date.UTC(1900, 0, 1, 14, 41), Granularity.MINUTE)).toBe('Mon, 1st Jan 1900 at 14:41')
	})

	test('SECONDS', () => {
		expect(formatDate(Date.UTC(1900, 0), Granularity.SECOND)).toBe('Mon, 1st Jan 1900 at 00:00:00')
		expect(formatDate(Date.UTC(1900, 0, 1, 14, 0, 12), Granularity.SECOND)).toBe('Mon, 1st Jan 1900 at 14:00:12')
		expect(formatDate(Date.UTC(1900, 0, 1, 14, 1, 1), Granularity.SECOND)).toBe('Mon, 1st Jan 1900 at 14:01:01')
		expect(formatDate(Date.UTC(1900, 0, 1, 14, 41, 59), Granularity.SECOND)).toBe('Mon, 1st Jan 1900 at 14:41:59')
	})

	test('MILLISECONDS', () => {
		expect(formatDate(Date.UTC(1900, 0), Granularity.MILLISECOND)).toBe('Mon, 1st Jan 1900 at 00:00:00.000')
		expect(formatDate(Date.UTC(1900, 0, 1, 14, 0, 12, 1), Granularity.MILLISECOND)).toBe('Mon, 1st Jan 1900 at 14:00:12.001')
		expect(formatDate(Date.UTC(1900, 0, 1, 14, 1, 1, 500), Granularity.MILLISECOND)).toBe('Mon, 1st Jan 1900 at 14:01:01.500')
		expect(formatDate(Date.UTC(1900, 0, 1, 14, 41, 59, 999), Granularity.MILLISECOND)).toBe('Mon, 1st Jan 1900 at 14:41:59.999')
	})
})