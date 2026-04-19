import {
  type Request,
  type Response,
  type NextFunction,
} from "../route/route.common";

export const ResponseMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.send(res.body);
};
