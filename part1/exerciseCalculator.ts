interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

// const parseArguments = (args: Array<string>): Array<number> => {
//   const trainingDays = args.slice(2).map((arg) => {
//     if (isNaN(Number(arg))) {
//       throw new Error('Invalid input type')
//     }

//     return Number(arg)
//   })

//   return trainingDays
// }

export const calculateExercises = (
  trainInfo: Array<number>,
  target: number
): Result => {
  const periodLength: number = trainInfo.length
  const trainingDays: number = trainInfo.filter((time) => time !== 0).length
  const average: number =
    trainInfo.reduce((acc, cur) => {
      acc += cur
      return acc
    }, 0) / periodLength

  let rating: number
  let ratingDescription: string

  if (average < target / 2) {
    rating = 1
    ratingDescription = 'Must work harder'
  } else if (average < target && average > target / 2) {
    rating = 2
    ratingDescription = 'Not too bad but could be better'
  } else {
    rating = 3
    ratingDescription = 'Great:)'
  }

  const success: boolean = average > target

  return {
    rating,
    ratingDescription,
    target,
    periodLength,
    trainingDays,
    success,
    average,
  }
}

// try {
//   const [target, ...trainInfo] = parseArguments(process.argv)
//   console.log(calculateExercises(trainInfo, target))
// } catch (error: unknown) {
//   if (error instanceof Error) {
//     console.log(error.message)
//   }
// }
