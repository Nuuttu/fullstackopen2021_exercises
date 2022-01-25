import express from 'express';
import patientRouter from './src/routes/patients'
import diagnosesRouter from './src/routes/diagnoses'

const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors())

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosesRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});