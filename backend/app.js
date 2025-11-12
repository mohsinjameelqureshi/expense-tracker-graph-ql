import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@as-integrations/express5";

import express from "express";
import http from "http";
import cors from "cors";

import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";

const app = express();

// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

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
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ req }),
  })
);

export { app, httpServer };
