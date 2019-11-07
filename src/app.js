import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import redis from 'redis';
import RateLimit from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';
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
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());

    // serve arquivos estaticos na rota /files do diretorio uploads METHOD: GET
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );

    // adicionamos depois da rota de /files pq dificilmente a rota de files ira gargalar o app
    // caso queira adicionar o RateLimit tb ao /files, adicione a rota apos o RateLimit
    if (process.env.NODE_ENV !== 'development') {
      this.server.use(
        new RateLimit({
          store: new RateLimitRedis({
            client: redis.createClient({
              host: process.env.REDIS_HOST,
              port: process.env.REDIS_PORT,
            }),
          }),
          windowMs: 1000 * 60 * 15, // janela de tempo de verificacao
          max: 100, // qtd max de requisicoes permitidas dentro da janela de verificacao
        })
      );
    }
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
