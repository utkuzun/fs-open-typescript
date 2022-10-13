import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

const app = express();
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

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
