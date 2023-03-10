import { Request, Response, NextFunction, response } from "express";

const OktaJwtVerifier = require("@okta/jwt-verifier");

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: "0oa7tv8hhy0RvbrUZ5d7",
  issuer: "https://dev-40969864.okta.com/oauth2/default",
});

export async function oktaAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = (req as any).token;
    if (!token) {
      return res.status(401).send("Not Authorized");
    }
    const jwt = await oktaJwtVerifier.verifyAccessToken(token, "api://default");

    req.user = {
      uid: jwt.claims.uid,
      email: jwt.claims.sub,
    };
    next();
  } catch (err) {
    return res.status(401).send(err.message);
  }
}
