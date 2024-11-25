
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { Application } from "express";
import { Service } from "../config";

export const applySecurityMiddleware = (app: Application) => {

  app.use(helmet());

  app.use(cors({ origin: [Service.CLIENT_URL], credentials: true }));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
  });
  app.use(limiter);
};
