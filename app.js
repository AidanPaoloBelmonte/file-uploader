import express from "express";
import session from "express-session";
import passport from "passport";
import passportLocal from "passport-local";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { fileURLToPath } from "node:url";
import path from "node:path";
import dotenv from "dotenv";

import { handleAccountStrategy, deserializeUser } from "./db/queries.js";
import { handleRouting } from "./routers/appRouter.js";

import { PrismaClient } from "./generated/prisma/client.js";
const LocalStrategy = passportLocal.Strategy;

dotenv.config();

const app = express();

// Specify View Engine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Specify Path to external data such as CSS and Images
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Allow parsing of Form Data in the Request Body (req.body)
app.use(express.urlencoded({ extended: true }));

// Initialize Sessions
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);
app.use(passport.session());
passport.use(new LocalStrategy(handleAccountStrategy));
passport.serializeUser((user, done) => {
  done(null, user.id, user.username);
});
passport.deserializeUser(deserializeUser);

// Specify Routes
app.use("/", handleRouting(passport));

// Start Server
const PORT = process.env.PORT | 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Active on port ${PORT}`);
});
