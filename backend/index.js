// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
// import mergedResolvers from "./resolvers/index.js";
// import mergedTypeDefs from "./typeDefs/index.js";

// const server = new ApolloServer({
//   typeDefs: mergedTypeDefs,
//   resolvers: mergedResolvers,
// });

// const { url } = await startStandaloneServer(server);
// console.log(`server is ready at ${url}`);

// backend/index.js
import { app, httpServer } from "./app.js";
import connectDB from "./db/index.js";
import { ENV } from "./utils/env.js";

const PORT = ENV.PORT || 4001;

// Start HTTP server
connectDB()
  .then(() => {
    httpServer.listen({ port: PORT });
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });

// await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
