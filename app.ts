import express from 'express';
import routeEmployee from './router/employee';
import routeDepartment from './router/department';
import routeSubway from './router/subway';
import cors from 'cors';
import morgan from 'morgan';
import commonErrProc from './router/commonErrorHandler';
import dotenv from 'dotenv';
dotenv.config();

const server = async () => {
  const app = express();

  app.use(morgan('dev'));
  app.use(
    cors({
      origin: '*',
      //   credentials: true,
      methods: 'DELETE, POST, GET, PATCH, PUT, OPTIONS',
    })
  );

  app.use(express.json());

  app.use('/employee', routeEmployee);
  app.use('/department', routeDepartment);
  app.use('/subway', routeSubway);

  app.use(commonErrProc);

  const listenPort = process.env.LISTEN_PORT || 8080;
  const serverInstance = app.listen(listenPort, async () => {
    serverInstance.keepAliveTimeout = 61000;
    serverInstance.headersTimeout = 65000;

    console.info('listening port', listenPort || 8080);
  });
};

server();
