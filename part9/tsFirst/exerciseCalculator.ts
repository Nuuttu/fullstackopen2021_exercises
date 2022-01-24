interface exerciseResults {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  ratingDescription: string

}

export const calculateExercises = (target: number, hours: Array<number>): exerciseResults => {

  const days = hours.length;
  const daysOfTraining = hours.filter(a => a != 0).length;
  const averageHours = hours.reduce((a, b) => a + b, 0) / days;

  let rating;
  let explanation;

  if (averageHours > target) {
    rating = 3;
    explanation = "Good Job";
  } else if (averageHours > target - 1) {
    rating = 2;
    explanation = "Almost hit the target!";
  } else {
    rating = 1;
    explanation = "You need to do better";
  }

  return {
    periodLength: Number(days),
    trainingDays: Number(daysOfTraining),
    target: Number(target),
    average: Number(averageHours),
    success: Boolean(averageHours > target),
    rating: Number(rating),
    ratingDescription: String(explanation)
  };
};

interface TargetAndHours {
  target: number,
  hours: Array<number>
}

const parseArguments = (args: Array<string>): TargetAndHours => {
  const target = Number(args[2]);
  const hours = args.slice(3).map(Number);
  return {
    target: target,
    hours: hours
  };
};

try {
  //const { target, hours } = parseArguments(process.argv);
  parseArguments(process.argv);
  //console.log(calculateExercises(target, hours));
} catch (error: unknown) {
  console.log('err');
}