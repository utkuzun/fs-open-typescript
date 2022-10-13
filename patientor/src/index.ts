import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

import express from 'express';

import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

// const corsOptions = {
//   origin: 'http://localhost:3000/',
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const port = process.env.PORT || 3005;

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
