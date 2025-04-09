import express from 'express';
import cors from 'cors';
import chalk from 'chalk';

import { userRouter, bookRouter } from './routes/index.js';
import { errorHandler, ErrorResponse } from './utils/index.js';

const app = express();

const port = process.env.PORT || 8901;
app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/books', bookRouter);

app.use(errorHandler);

app.listen(port, () => console.log(chalk.bgGreen(` Library API listening on port ${port}... `)));
