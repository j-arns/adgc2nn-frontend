/**
 * Formats a prediction value for display.
 * Uses scientific notation for values >= 1e5 or < 1 (non-zero).
 */
export const formatPrediction = (value: number | null): string => {
    if (value === null) return 'N/A';

    const absValue = Math.abs(value);
    if (absValue >= 1e5 || (absValue < 1 && value !== 0)) {
        return value.toExponential(2);
    }
    return value.toFixed(2);
};