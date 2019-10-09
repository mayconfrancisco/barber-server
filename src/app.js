import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import path from 'path';
import * as Sentry from '@sentry/node';
import 'express-async-errors'; // lidar com os erros que ocorrem dentro dos async/await - Deve ser importando antes da Rotas

import Youch from 'youch';

import sentryConfig from './config/sentry';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(cors());
    this.server.use(express.json());

    // serve arquivos estaticos na rota /files do diretorio uploads METHOD: GET
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, resp, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return resp.status(500).json(errors);
      }

      return resp.status(500).json('Internal Server Error');
    });
  }
}

export default new App().server;
