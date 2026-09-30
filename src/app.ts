import express, { Request, Response } from 'express';
import cors from 'cors';

export function createApp() {
  const app = express();
  const origin = process.env.CORS_ORIGIN;

  app.use(origin ? cors({ origin }) : cors());
  app.use(express.json());

  app.get('/health', (_req: Request, res: Response) => {
    const environment = process.env.NODE_ENV || 'development';

    res.status(200).json({
      status: 'ok',
      environment,
      message: 'Server is running',
    });
  });

  return app;
}
