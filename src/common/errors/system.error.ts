export enum ErrorCodesEnum {
  NOT_FOUND = "NOT_FOUND",
  INVALID_DATA = "INVALID_DATA",
  FAILED = "FAILED",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export class SystemError extends Error {
  public code: ErrorCodesEnum = ErrorCodesEnum.INTERNAL_SERVER_ERROR;

  constructor(message: string, code: ErrorCodesEnum) {
    super(message);
    this.code = code;
  }

  static NotFound(message: string = "Not Found") {
    return new SystemError(message, ErrorCodesEnum.NOT_FOUND);
  }

  static InvalidData(message: string = "Invalid Data") {
    return new SystemError(message, ErrorCodesEnum.INVALID_DATA);
  }
  static Failed(message: string = "Failed") {
    return new SystemError(message, ErrorCodesEnum.FAILED);
  }
}
