/* eslint-disable max-len */
/* eslint-disable max-classes-per-file */
import { STATUS_CODES } from 'http';

export enum ErrorCode {
  E_500000 = 'E_500000',
  E_500001 = 'E_500001', // middleware/genericHandlers - Unknown error
}

interface ErrorOpts {
  name?: string;
  message?: string;
  originalError?: string;
  code?: ErrorCode;
  httpStatus?: number;
  data?: unknown;
  stack?: string;
}

export class BaseError extends Error {
  name: string = 'BaseError';

  message!: string;

  originalError?: string;

  code: ErrorCode = ErrorCode.E_500000;

  httpStatus: number = 500;

  data?: unknown;

  stack?: string;

  readonly status = 'error';

  constructor(opts?: ErrorOpts) {
    super();
    Error.captureStackTrace(this, this.constructor);
    Object.assign(this, {
      message: STATUS_CODES[opts?.httpStatus || 500],
      ...opts,
    });
  }
}
