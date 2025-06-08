const { calculateBMI } = require('../controllers/bmiController');

describe('BMI Calculator', () => {
  test('should calculate BMI correctly for normal weight', () => {
    const weight = 70; // kg
    const height = 175; // cm
    const result = calculateBMI(weight, height);
    expect(result.bmi).toBeCloseTo(22.86, 2);
    expect(result.category).toBe('Normal weight');
  });

  test('should categorize underweight correctly', () => {
    const weight = 45; // kg
    const height = 170; // cm
    const result = calculateBMI(weight, height);
    expect(result.bmi).toBeLessThan(18.5);
    expect(result.category).toBe('Underweight');
  });

  test('should categorize overweight correctly', () => {
    const weight = 85; // kg
    const height = 170; // cm
    const result = calculateBMI(weight, height);
    expect(result.bmi).toBeGreaterThanOrEqual(25);
    expect(result.bmi).toBeLessThan(30);
    expect(result.category).toBe('Overweight');
  });

  test('should categorize obese correctly', () => {
    const weight = 100; // kg
    const height = 170; // cm
    const result = calculateBMI(weight, height);
    expect(result.bmi).toBeGreaterThanOrEqual(30);
    expect(result.category).toBe('Obese');
  });

  test('should handle decimal values correctly', () => {
    const weight = 65.5; // kg
    const height = 168.5; // cm
    const result = calculateBMI(weight, height);
    expect(typeof result.bmi).toBe('number');
    expect(typeof result.category).toBe('string');
    expect(result.bmi).toBeGreaterThan(0);
  });
});