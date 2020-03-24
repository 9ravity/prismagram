import dotenv from "dotenv";
import path from "path";
console.log(__dirname);
dotenv.config({ path: path.resolve(__dirname, ".env") });
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";

const PORT = process.env.PORT || 3000;

//typeDefs 와 resolvers 는
const typeDefs = `type Query{
    hello:String!
}`;

const resolvers = {
  Query: {
    hello: () => "Hi"
  }
};

const server = new GraphQLServer({
  schema
});

server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
