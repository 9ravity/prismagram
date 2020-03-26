import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

// passport는 인증 관련된 모든 일을 수행, jwt토큰, 쿠키, 사용자 정보에 저장함
// 토큰에서 정보를 가져와서 해독한 후 사용자 객체를 req에 추가함

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET //헤더에서 jwt 토큰을 찾는 역할
};

const verifyUser = async (payload, done) => {
  console.log(payload);
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

// 미들웨어 함수 - express에서는 미들웨어를 지나서 라우트가 실행됨
export const authenticatedJwt = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();

// server에 전달되는 모든 request 는 authenticateJwt 함수를 통과 -> 함수에서 passport.authenticate("jwt") 실행
// Strategy 를 활용해서 jwt 토큰 추출 -> verifyUser를 payload와 함께 실행
// payload는 토큰에서 해석된 id를 받아서 user를 찾아서 리턴 콜백 함수가 실행되어서 사용자가 있으면 사용자를 req에 추가함 server.js에서 context에 request를 담아줌
