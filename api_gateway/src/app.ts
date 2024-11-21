import express, { Application } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { applySecurityMiddleware } from "./middleware/security";
import { routes } from "./routes";
import { logger } from "./utilities/logger";

const app: Application = express();

// Middleware
const morganStream = {
    write: (message: any) => logger.info(message.trim()) 
};
app.use(morgan('combined', { stream: morganStream }));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

// Apply security middleware (Helmet, CORS, rate-limiting)
applySecurityMiddleware(app);


routes(app);

export default app;
