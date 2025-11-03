/**
 * Utility functions for random number generation
 */

export interface GenerateRandomNumbersOptions {
  min: number;
  max: number;
  count: number;
  noDuplicates: boolean;
  decimalPlaces?: number; // Number of decimal places (0 for integers)
}

/**
 * Generates random integers within a specified range
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @param count - Number of random numbers to generate
 * @param noDuplicates - Whether to ensure all numbers are unique
 * @param decimalPlaces - Number of decimal places (0 for integers, undefined defaults to 0)
 * @returns Array of random integers or decimals
 */
export function generateRandomNumbers({
  min,
  max,
  count,
  noDuplicates,
  decimalPlaces = 0,
}: GenerateRandomNumbersOptions): number[] {
  // Validate inputs
  if (min > max) {
    throw new Error("Minimum value cannot be greater than maximum value");
  }

  if (count < 1) {
    throw new Error("Count must be at least 1");
  }

  if (decimalPlaces < 0) {
    throw new Error("Decimal places cannot be negative");
  }

  const range = max - min;

  // If duplicates not allowed and decimals = 0, check if there are enough numbers in range
  if (noDuplicates && decimalPlaces === 0) {
    const integerRange = Math.floor(max) - Math.ceil(min) + 1;
    if (count > integerRange) {
      throw new Error(
        `Cannot generate ${count} unique integers in range [${min}, ${max}]. Maximum unique integers: ${integerRange}`
      );
    }
  }

  const results: number[] = [];

  if (noDuplicates) {
    // Use Set to ensure uniqueness
    const uniqueNumbers = new Set<number>();

    // For decimals with no duplicates, we need to be careful
    if (decimalPlaces > 0) {
      const maxAttempts = count * 1000; // Prevent infinite loop
      let attempts = 0;

      while (uniqueNumbers.size < count && attempts < maxAttempts) {
        const randomNum = min + Math.random() * range;
        const rounded = Number(randomNum.toFixed(decimalPlaces));
        uniqueNumbers.add(rounded);
        attempts++;
      }

      if (uniqueNumbers.size < count) {
        throw new Error(
          `Could not generate ${count} unique decimal numbers. Try increasing the range or decimal places.`
        );
      }
    } else {
      // Integer mode
      while (uniqueNumbers.size < count) {
        const randomNum = Math.floor(Math.random() * range) + min;
        uniqueNumbers.add(randomNum);
      }
    }

    results.push(...Array.from(uniqueNumbers));
  } else {
    // Allow duplicates
    for (let i = 0; i < count; i++) {
      if (decimalPlaces > 0) {
        const randomNum = min + Math.random() * range;
        const rounded = Number(randomNum.toFixed(decimalPlaces));
        results.push(rounded);
      } else {
        const randomNum = Math.floor(Math.random() * range) + min;
        results.push(randomNum);
      }
    }
  }

  return results;
}

/**
 * Generates a single random integer within a specified range
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns Random integer
 */
export function generateRandomNumber(min: number, max: number): number {
  return generateRandomNumbers({ min, max, count: 1, noDuplicates: false })[0];
}
