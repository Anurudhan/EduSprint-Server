import express, { Request, Response, NextFunction, Application } from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import morgan from "morgan";

import helmet from 'helmet'
import cors from 'cors'
import { logger } from "../_lib/utilities/middleware/logger";
import { userRoutes } from "../infrastructure/routers";
import { dependencies } from "../_boot/dependencies";

// Load environment-specific variables
// if (process.env.NODE_ENV === "production") {
//   config({ path: "./.env.production" });
// } else {
//   config({ path: "./.env.local" });
// }
config();

console.log(process.env.FRONTEND_URL,"=======user=========");

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5002;

const corsOptions = {
  origin: String(process.env.FRONTEND_URL),
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const morganStream = {
  write: (message: any) => logger.info(message.trim()) 
};
app.use(morgan('combined', { stream: morganStream }));
app.use(helmet())
app.use(cors(corsOptions))

//test route
app.get("/user/test", (req: Request, res: Response) => {
  res.status(200).json({
    message: "User service ON!",
  });
});

// app.use("/user", userRoutes(dependencies));
app.use("/", userRoutes(dependencies));

app.use("*", (req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, status: 404, message: "Api Not found---->user" });
});

const start = () => {
  app.listen(PORT, () => {
    console.log(`The user-service is listening on port ${PORT}`);
  });
};

export default { start };