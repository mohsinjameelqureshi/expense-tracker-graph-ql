import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@as-integrations/express5";
import { buildContext } from "graphql-passport";

import express from "express";
import http from "http";
import cors from "cors";

import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import passport from "passport";
import session from "express-session";
import ConnectMongo from "connect-mongodb-session";

import { ENV } from "./utils/env.js";
import { configurePassport } from "./passport/passport.config.js";

configurePassport();
const app = express();

// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

// Connect-mongodb-session is a library that connects express-session to MongoDB.
// This line initializes a session store constructor that knows how to save sessions inside MongoDB.
const MongoDBStore = ConnectMongo(session);

// It tells Express to save sessions in your MongoDB database under a collection named "session".
const store = new MongoDBStore({
  uri: ENV.MONGODB_URL,
  collection: "session",
});

// This listens for any error in the session store (e.g., if MongoDB disconnects).
store.on("error", (err) => console.log("connecting errors: ", err));

// This is the Express session middleware that enables sessions for your app.
app.use(
  session({
    secret: ENV.SESSION_SECRET,
    resave: false, // this option specifies weather to save the session to the store on every request
    saveUninitialized: false, //Prevents saving new sessions that haven’t been modified yet (e.g., before login).
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // expire in 1 week
      httpOnly: true,
    },
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Initialize Apollo Server
await server.start();

// Apply middleware
app.use(
  "/",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  })
);

export { app, httpServer };
