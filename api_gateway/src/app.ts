import express, { Application } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { applySecurityMiddleware } from "./middleware/security";
import { routes } from "./routes";

const app: Application = express();

// Middleware
app.use(morgan("dev")); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

// Apply security middleware (Helmet, CORS, rate-limiting)
applySecurityMiddleware(app);


routes(app);

export default app;
