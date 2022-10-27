import express from 'express';
import 'express-async-errors';
import errorHandler from './middleware/error';
import carsRoute from './routers';

const app = express();
app.use(express.json());

app.use('/cars', carsRoute);

app.use(errorHandler);
export default app;
