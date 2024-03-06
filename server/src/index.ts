import { config } from 'dotenv';
import express from 'express';
import router from './router';

if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');
  config({ path: '.prod.env' });
} else {
  console.log('Running in development mode');
  config({ path: '.dev.env' });
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});