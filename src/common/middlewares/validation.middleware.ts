import { ZodType, ZodObject } from "zod";
import { NextFunction, Request, Response } from "../route/route.common";
import { SystemError } from "../errors/system.error";
import { ParamsDictionary, Query } from "express-serve-static-core";

type Schema = ZodObject<{
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
}>;

const validate = (schema: Schema, target: any) => {
  const { success, data, error } = schema.safeParse(target);

  if (!success) {
    throw SystemError.InvalidData("Validation Error");
  }

  return data;
};

export const ValidationMiddleware = (schema: Schema) => {
  const validateMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { data, error } = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (error) {
      throw SystemError.InvalidData("Validation Error");
    }

    req.body = data.body;
    req.params = data.params as ParamsDictionary;
    req.query = data.query as Query;

    return next();
  };

  return validateMiddleware;
};
