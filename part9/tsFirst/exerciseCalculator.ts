interface exerciseResults {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  ratingDescription: string

}

const calculateExercises = (hours: Array<number>, target: number): exerciseResults => {

  const days = hours.length
  const daysOfTraining = hours.filter(a => a != 0).length
  const averageHours = hours.reduce((a, b) => a + b, 0) / days

  var rating
  var explanation

  if (averageHours > target) {
    rating = 3
    explanation = "Good Job"
  } else if (averageHours > target - 1) {
    rating = 2
    explanation = "Almost hit the target!"
  } else {
    rating = 1
    explanation = "You need to do better"
  }

  return {
    periodLength: Number(days),
    trainingDays: Number(daysOfTraining),
    target: Number(target),
    average: Number(averageHours),
    success: Boolean(averageHours > target),
    rating: Number(rating),
    ratingDescription: String(explanation)
  }
}

console.log('argv', process.argv)


//console.log(calculateExercises(process.argv, args[3]));
//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));