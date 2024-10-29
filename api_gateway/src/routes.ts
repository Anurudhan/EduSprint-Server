import { Application, Request, Response } from "express";
import proxy from "express-http-proxy";
import { Service } from "./config";

export const routes = (app: Application) => {
  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "API Gateway is running" });
  });

  app.use("/auth", proxy(Service.AUTH_SERVICE_URL, {
    proxyReqPathResolver: (req) =>{
      return req.url
    }
  }));

  app.use("/user", proxy(Service.USER_SERVICE_URL, {
    proxyReqPathResolver: (req) => {
      return req.url
    }
  }));

  app.use("*", (req: Request, res: Response) => {
    res.status(404).json({ error: "Route not found" });
  });
};
