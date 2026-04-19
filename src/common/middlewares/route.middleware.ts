import {
  Endpoint,
  NextFunction,
  Request,
  Response,
} from "../route/route.common";

export const RouteMiddleware =
  <T>(route: Endpoint<T>) =>
  async (req: Request & T, res: Response, next: NextFunction) => {
    try {
      await route(req, res, next);
      return next();
    } catch (err) {
      next(err);
    }
  };
