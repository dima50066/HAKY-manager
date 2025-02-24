import express from "express";
import pino from "pino-http";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routers/index";
import { errorHandler } from "./middlewares/errorHandler";
import { notFoundHandler } from "./middlewares/notFoundHandler";
import { UPLOAD_DIR } from "./constants/constants";

dotenv.config();

const pinoConfig =
  process.env.NODE_ENV !== "production"
    ? {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
      }
    : {};

const PORT = process.env.PORT || 5000;
console.log(`Running in ${process.env.NODE_ENV} mode`);

export const setupServer = () => {
  const app = express();

  app.use(express.json());

  const corsOptions = {
    origin:
      process.env.NODE_ENV === "production"
        ? "https://haky-manager.vercel.app/"
        : "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  };
  app.use(cors(corsOptions));

  app.use(cookieParser());

  app.use(pino(pinoConfig));

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to the HAKY Manager" });
  });

  app.use("/uploads", express.static(UPLOAD_DIR));

  app.use(router);

  app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
  });

  app.use(notFoundHandler);

  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      errorHandler(err, req, res, next);
    }
  );

  app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  });
};
