import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

dotenv.config();

export const verifyJWT = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      return res.status(401).json({ error: "Authorization header missing" });
    const token = authHeader.split(" ")[1];
    try {
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err: any, decoded: any) => {
          if (err)
            return res
              .status(403)
              .json({ error: "Forbidden: Invalid token generated" });
          (req as any).users = decoded;
          return handler(req, res);
        }
      );
    } catch (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
  };
};
