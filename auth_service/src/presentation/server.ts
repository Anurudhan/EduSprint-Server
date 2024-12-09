import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import { env_variables } from '../_boot/config';
import { routes } from '../infrastructure/routers';
import { dependencies } from '../_boot/dependencies';
import { logger } from '../_lib/utility/middleware/logger';
import { HttpStatusCode } from '../_lib/common/HttpStatusCode';

const app:Application =express();
const PORT:number = Number(env_variables.PORT)||5001;

const corsOptions = {
     origin:String(env_variables.FRONTEND_URL),
     methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
     Credentials:true
}

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const morganStream = {
    write: (message: any) => logger.info(message.trim()) 
};
app.use(morgan('combined', { stream: morganStream }));
app.use(helmet());
app.use(cors(corsOptions));

app.get('/health', (req: Request, res: Response) => {
    res.status(HttpStatusCode.OK).json({ success: true, message: "Auth service is up and running!" });
});

app.use('/',routes(dependencies))

app.all("*", (req: Request, res: Response) => {
    res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, status: HttpStatusCode.BAD_REQUEST    , message: "API Not found--->AUTH" });
});

// const start = () => {
    app.listen(PORT, () => {
        console.log(`The auth-service is listening on port ${env_variables.PORT}`);
    });
// };


export default app;