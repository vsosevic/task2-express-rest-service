import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { router as userRouter } from './resources/users/user.router';
import { router as boardRouter } from './resources/boards/board.router';
import { router as taskRouter } from './resources/tasks/task.router';
import { requestLogger } from "./middlewares/logger/requestLogger";
import { logger } from "./middlewares/logger/logger";
import errorHandler from "./middlewares/errorHandler";

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(requestLogger);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use(errorHandler);

process.on('uncaughtException', async (err) => {
  logger.error(`uncaughtException - ${err.message}`);
  // There is no solution so far on how to handle logging to the file while using process.exit.
  // That's why I use this dirty hack with setTimeout :).
  setTimeout(() => {
    process.exit(1);
  }, 2000);
});

process.on('unhandledRejection', (err) => {
  let errorMessage = 'unhandledRejection - ';
  if (err) {
    errorMessage += err.toString();
  }
  logger.error(errorMessage);
  setTimeout(() => {
    process.exit(1);
  }, 2000);
});

// Code for testing errors. Just uncomment appropriate line.
// throw new Error('Oops!');
// Promise.reject(Error('Oops!'));

export { app };
