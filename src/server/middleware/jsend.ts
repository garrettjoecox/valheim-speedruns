import { STATUS_CODES } from 'http';
import { BaseError, ErrorCode } from 'server/responses/errors';
import { BaseFailure } from 'server/responses/failures';
import { BaseSuccess } from 'server/responses/successes';
import { OurNextApiRequest, OurNextApiResponse } from 'types/api';

export async function jsend(req: OurNextApiRequest, res: OurNextApiResponse, next: Function) {
  res.success = (_success) => {
    let success = _success instanceof BaseSuccess ? _success : new BaseSuccess(_success);

    const { httpStatus, status, data } = success;

    res.status(httpStatus);
    res.json({
      data,
      status,
    });
  };

  res.fail = (_failure) => {
    let failure = _failure instanceof BaseFailure ? _failure : new BaseFailure(_failure);

    const { code, httpStatus, message, data, status } = failure;

    res.status(httpStatus);

    res.json({
      message,
      data,
      status,
      code,
    });
  };

  res.error = (_error) => {
    let error: BaseError;
    if (!_error) {
      error = new BaseError();
    } else if (!(_error instanceof BaseError)) {
      error = new BaseError({
        message: 'Sorry, something went wrong. Please try again shortly.',
        code: ErrorCode.E_500001,
        originalError: _error?.message,
      });
    } else {
      error = _error;
    }

    const { code, httpStatus, status, message, data, originalError, stack } = error;

    if (process.env.NODE_ENV === 'production') {
      res.status(500);
      res.json({
        message: STATUS_CODES[500],
        status: 'error',
        code,
      });
    } else {
      res.status(httpStatus);
      res.json({
        message,
        data,
        status,
        code,
        stack,
        originalError,
      });
    }
  };

  return next();
}
