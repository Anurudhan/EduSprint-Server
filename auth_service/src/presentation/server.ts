import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import { env_variables } from '../_boot/config';
import { routes } from '../infrastructure/routers';
import { dependencies } from '../_boot/dependencies';

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
app.use(morgan('dev'));
app.use(helmet());
app.use(cors(corsOptions));

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: "Auth service is up and running!" });
});

app.use('/',routes(dependencies))

app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ success: false, status: 404, message: "API Not found--->AUTH" });
});

// const start = () => {
    app.listen(PORT, () => {
        console.log(`The auth-service is listening on port ${env_variables.PORT}`);
    });
// };


export default app;