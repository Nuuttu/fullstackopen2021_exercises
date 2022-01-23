const calculateBmi = (a: number, b: number) => {

  const bmi = b / (a * 0.01 ^ 2)

  if (bmi < 16.1) {
    console.log('Underweight (Severe thinness)')
  } else if (bmi < 17) {
    console.log('Underweight (Moderate thinness)	')
  } else if (bmi < 18.5) {
    console.log('Underweight (Mild thinness)')
  } else if (bmi < 25.0) {
    console.log('Normal range')
  } else if (bmi < 30.0) {
    console.log('Overweight (Pre-obese)')
  } else if (bmi < 35.0) {
    console.log('Obese (Class I)')
  } else if (bmi < 40) {
    console.log('Obese (Class II)')
  } else {
    console.log('Obese (Class III)')
  }
}


calculateBmi(180, 74);