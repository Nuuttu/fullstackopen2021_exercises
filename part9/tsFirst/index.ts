import express from 'express';
import { calculateBmi } from './bmi';

//const express = require('express');
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  // console.log('req', req.query)
  const { height, weight } = req.query
  if (Number(height) == null || Number(weight) == null || isNaN(Number(height)) || isNaN(Number(weight))) {
    res.json({ error: 'malformatted parameters' })
  } else {
    const bmi = calculateBmi(Number(height), Number(weight))
    res.json({
      height: Number(height),
      weight: Number(weight),
      bmi: bmi
    });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});