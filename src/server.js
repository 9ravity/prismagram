import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import passport from "passport";
import schema from "./schema";
import "./passport"; // passport 모듈 내부적으로 실행
import { authenticatedJwt } from "./passport";

const PORT = process.env.PORT || 3000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request })
}); // context는 resolver 사이에서 정보를 공유할 때 사용 -> context에 함수 담기

server.express.use(logger("dev"));
server.express.use(authenticatedJwt);

server.start({ port: PORT }, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
