import { BaseError, ErrorCode } from 'server/responses/errors';
import { BaseFailure, FailureCode, NotFoundFailure } from 'server/responses/failures';
import { OurNextApiRequest, OurNextApiResponse } from 'types/api';

function onError(error: Error, req: OurNextApiRequest, res: OurNextApiResponse) {
  if (error instanceof BaseFailure) {
    res.fail(error);
  } else if (error instanceof BaseError) {
    res.error(error);
  } else {
    res.error(
      new BaseError({
        message: 'Sorry, something went wrong. Please try again shortly.',
        code: ErrorCode.E_500001,
        originalError: error.message,
      }),
    );
  }
}

function onNoMatch(req: OurNextApiRequest, res: OurNextApiResponse) {
  return res.fail(new NotFoundFailure({ code: FailureCode.F_404001 }));
}

const genericHandlers = { onError, onNoMatch };

export { genericHandlers };
