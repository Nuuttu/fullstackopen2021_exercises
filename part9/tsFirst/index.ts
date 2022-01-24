import express from 'express';
import bodyParser from 'body-parser';
import { calculateBmi } from './bmi';
import { calculateExercises } from './exerciseCalculator';

//const express = require('express');
const app = express();
const jsonParser = bodyParser.json();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (Number(height) == null || Number(weight) == null || isNaN(Number(height)) || isNaN(Number(weight))) {
    res.json({ error: 'malformatted parameters' });
  } else {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({
      height: Number(height),
      weight: Number(weight),
      bmi: bmi
    });
  }
});

app.post('/exercises', jsonParser, (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target } = req.body;

  if (target == null || daily_exercises == null) {
    res.json({ error: "parameters missing" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } else if (isNaN(target) || daily_exercises.some(isNaN)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.json({ error: 'malformatted parameters' });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.json(calculateExercises(target, daily_exercises));
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});