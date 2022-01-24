

export const calculateBmi = (height: number, weight: number): string => {

  const bmi = weight / (height * 0.01 ^ 2);

  if (bmi < 16.1) {
    return ('Underweight (Severe thinness)');
  } else if (bmi < 17) {
    return ('Underweight (Moderate thinness)');
  } else if (bmi < 18.5) {
    return ('Underweight (Mild thinness)');
  } else if (bmi < 25.0) {
    return ('Normal range');
  } else if (bmi < 30.0) {
    return ('Overweight (Pre-obese)');
  } else if (bmi < 35.0) {
    return ('Obese (Class I)');
  } else if (bmi < 40) {
    return ('Obese (Class II)');
  } else {
    return ('Obese (Class III)');
  }
};

calculateBmi(Number(process.argv[2]), Number(process.argv[3]));