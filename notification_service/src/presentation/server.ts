import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import morgan from "morgan";
import helmet from 'helmet'
import cors from 'cors'
import { logger } from "../_lib/utilities/middleware/logger";

dotenv.config()

console.log(process.env.CLIENT_URL,"=======notification=========");

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5004;



const corsOptions = {
  origin: String(process.env.CLIENT_URL),
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};


app.use(helmet());
app.use(express());
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
app.get("/api/notification/test", (req: Request, res: Response) => {
  res.status(200).json({ message: "Notification server is ON!" });
});



app.use("*", (req: Request, res: Response) => {
  res
    .status(404)
    .json({
      success: false,
      status: 404,
      message: "Api Not found--->notification",
    });
});

export const start = () => {
  app.listen(PORT, () => {
    console.log(`The ${process.env.SERVICE} is listening on port ${PORT}`);
  });
};

export default { start };