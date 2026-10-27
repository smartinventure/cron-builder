import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { calculateNextRun } from '../src/cronNextRun';

describe('calculateNextRun', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        // Wednesday, 2025-01-15 10:00:00 local time
        vi.setSystemTime(new Date(2025, 0, 15, 10, 0, 0));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('handles every-minute schedules', () => {
        expect(calculateNextRun('* * * * *')).toBe('in 1 min');
    });

    it('handles daily schedules later the same day', () => {
        expect(calculateNextRun('30 14 * * *')).toBe('in 4h 30m');
    });

    it('handles daily schedules that roll over to the next day', () => {
        expect(calculateNextRun('0 2 * * *')).toBe('in 16h 0m');
    });

    it('handles step values', () => {
        expect(calculateNextRun('*/15 * * * *')).toBe('in 15 min');
    });

    it('handles weekday lists', () => {
        // Next Monday 02:00 is 4 days 16 hours away
        expect(calculateNextRun('0 2 * * 1')).toBe('in 4d 16h');
    });

    it('treats 7 as Sunday', () => {
        expect(calculateNextRun('0 10 * * 7')).toBe(calculateNextRun('0 10 * * 0'));
    });

    it('handles ranges with steps', () => {
        expect(calculateNextRun('0 9-17/2 * * *')).toBe('in 1h 0m');
    });

    it('uses OR semantics when both day-of-month and weekday are set', () => {
        // 16th of the month OR Friday -> Thursday the 16th wins
        expect(calculateNextRun('0 10 16 * 5')).toBe('in 1d 0h');
    });

    it('rejects malformed expressions', () => {
        expect(calculateNextRun('0 2 *')).toBe('Invalid schedule');
    });
});
