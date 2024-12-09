import express, { Request, Response, NextFunction, Application } from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { routes } from "../infrastructure/routes";
import { dependencie } from "../_boot/depenedencie";
import morgan from "morgan";
import helmet from 'helmet'
import cors from 'cors'
import { errorHandler, logger } from "../_lib/middleware";
import { httpStatusCode } from "../_lib/http";

const app:Application =express();
const PORT:number = Number(process.env.PORT)||5005;

const corsOptions = {
    origin:String(process.env.FRONTEND_URL),
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
    Credentials:true
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const morganStream = {
    write: (message: any) => logger.info(message.trim()) 
};
app.use(morgan('combined', { stream: morganStream }));
app.use(helmet())
app.use(cors(corsOptions));

app.get("/test", (req: Request, res: Response) => {
    res.status(200).json({
      message: `Course Service ON!`,
    });
  });

app.use("/", routes(dependencie));
app.use("*", (req: Request, res: Response) => {
    res
      .status(httpStatusCode.NOT_FOUND)
      .json({ success: false, status: httpStatusCode.NOT_FOUND, message: "Api Not found---->course" });
  });
app.use(errorHandler);

const start = () => {
  app.listen(PORT, () => {
    console.log(`The course-service is listening on port ${PORT}`);
  });
};

export default { start };