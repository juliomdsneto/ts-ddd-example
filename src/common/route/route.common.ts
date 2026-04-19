import {
  type Request as ExpressRequest,
  type Response as ExpressResponse,
  type NextFunction as ExpressNextFunction,
  type Errback,
  RequestHandler,
} from "express";

export type Response = ExpressResponse & { body?: any };
export type Request = ExpressRequest;
export type NextFunction = ExpressNextFunction;
export type Error = Errback;
export type Endpoint<T> = (
  req: Request & T,
  res: Response,
  next?: NextFunction,
) => Promise<void>;

export class Route<
  PARAMS = any,
  REQUEST_BODY = any,
  QUERY = any,
  RESPONSE_BODY = any,
> {
  public middlewares: RequestHandler<
    PARAMS,
    RESPONSE_BODY,
    REQUEST_BODY,
    QUERY
  >[];
  public name: string;

  constructor(
    name: string,
    ...middlewares: RequestHandler<PARAMS, RESPONSE_BODY, REQUEST_BODY, QUERY>[]
  ) {
    this.name = name;

    this.middlewares = middlewares;
  }
}
