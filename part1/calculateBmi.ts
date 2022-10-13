// interface BmiValues {
//   mass: number
//   height: number
// }

// const parseArgs = (args: Array<string>): BmiValues => {
//   if (args.length < 4 || args.length > 4) {
//     throw new Error('Wrong number of arguments!!!')
//   }

//   const height = Number(args[2])
//   const mass = Number(args[3])

//   if (isNaN(mass) || isNaN(height)) {
//     throw new Error('Invalid argument types!!!')
//   }

//   return { mass, height }
// }

export const calCulateBmi = (mass: number, height: number): string => {
  const bmi: number = mass / (height / 100) ** 2

  if (bmi < 16) {
    return 'Underweight (Severe thinness)'
  }
  if (16 < bmi && bmi < 16.9) {
    return 'Underweight (Moderate thinness)'
  }
  if (17 < bmi && bmi < 18.4) {
    return 'Underweight (Mild thinness)'
  }
  if (18.5 < bmi && bmi < 24.9) {
    return 'Normal range'
  }
  if (25 < bmi && bmi < 29.9) {
    return 'Overweight (Pre-obese)'
  }
  if (30 < bmi && bmi < 34.9) {
    return 'Obese (Class I)'
  }
  if (35 < bmi && bmi < 39.9) {
    return 'Obese (Class II)'
  }

  return 'Obese (Class III)'
}

// try {
//   const { mass, height } = parseArgs(process.argv)
//   console.log(calCulateBmi(mass, height))
// } catch (error: unknown) {
//   if (error instanceof Error) {
//     console.log(error.message)
//   }
// }
