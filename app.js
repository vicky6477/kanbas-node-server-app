import "dotenv/config";
import express from 'express';
import "dotenv/config";
import session from "express-session";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./Courses/routes.js";
import ModuleRoutes from "./Modules/routes.js";
import cors from "cors";
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/kanbas");

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

import UserRoutes from "./users/routes.js";

const app = express();
app.use(cors({ credentials: true, origin: "https://a6--luminous-kangaroo-c0e365.netlify.app/#/project/signin" }));

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

app.use(session(sessionOptions));

app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);
