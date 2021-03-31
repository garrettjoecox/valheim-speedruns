/* eslint-disable max-len */
/* eslint-disable max-classes-per-file */
import { STATUS_CODES } from 'http';

export enum FailureCode {
  // 400 - Bad Request
  F_400000 = 'F_400000',
  F_400001 = 'F_400001', // middleware/validate - Validation error

  // 401 - Unauthorized
  F_401000 = 'F_401000',
  F_401001 = 'F_401001', // middleware/ensureAuthed - No token found
  F_401002 = 'F_401002', // middleware/ensureAuthed - Invalid token scheme
  F_401003 = 'F_401003', // middleware/ensureAuthed - Expired token
  F_401004 = 'F_401004', // middleware/ensureAuthed - Token for invalid user

  // 403 - Forbidden
  F_403000 = 'F_403000',

  // 404 - Not found
  F_404000 = 'F_404000',
  F_404001 = 'F_404001', // middleware/genericHandlers - No route found

  // 409 - Conflict
  F_409000 = 'F_409000',
}

interface FailureOpts {
  name?: string;
  message?: string;
  code?: FailureCode;
  httpStatus?: number;
  data?: unknown;
}

export class BaseFailure extends Error {
  name: string = 'BaseFailure';

  message!: string;

  code: FailureCode = FailureCode.F_400000;

  httpStatus: number = 400;

  data?: unknown;

  readonly status = 'fail';

  constructor(opts?: FailureOpts) {
    super();
    Error.captureStackTrace(this, this.constructor);
    Object.assign(this, {
      message: STATUS_CODES[opts?.httpStatus || 400],
      ...opts,
    });
  }
}

export class UserFailure extends BaseFailure {
  name: string = 'UserFailure';

  constructor(opts?: FailureOpts) {
    super({
      httpStatus: 400,
      ...opts,
    });
  }
}

export class InputValidationFailure extends BaseFailure {
  name: string = 'InputValidationFailure';

  code: FailureCode = FailureCode.F_400001;

  constructor(opts?: FailureOpts) {
    super({
      httpStatus: 400,
      ...opts,
    });
  }
}

export class UnauthorizedFailure extends BaseFailure {
  name: string = 'UnauthorizedFailure';

  code: FailureCode = FailureCode.F_401000;

  constructor(opts?: FailureOpts) {
    super({
      httpStatus: 401,
      ...opts,
    });
  }
}

export class ForbiddenFailure extends BaseFailure {
  name: string = 'ForbiddenFailure';

  code: FailureCode = FailureCode.F_403000;

  constructor(opts?: FailureOpts) {
    super({
      httpStatus: 403,
      ...opts,
    });
  }
}

export class NotFoundFailure extends BaseFailure {
  name: string = 'NotFoundFailure';

  code: FailureCode = FailureCode.F_404000;

  constructor(opts?: FailureOpts) {
    super({
      httpStatus: 404,
      ...opts,
    });
  }
}

export class ConflictFailure extends BaseFailure {
  name: string = 'ConflictFailure';

  code: FailureCode = FailureCode.F_409000;

  constructor(opts?: FailureOpts) {
    super({
      httpStatus: 409,
      ...opts,
    });
  }
}
