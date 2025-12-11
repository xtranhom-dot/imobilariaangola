import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

const app = express();

app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

const httpServer = createServer(app);

let initialized = false;

async function initializeApp() {
  if (initialized) return;
  await registerRoutes(httpServer, app);
  initialized = true;
}

export default async function handler(req: Request, res: Response) {
  await initializeApp();
  
  app(req, res);
}
