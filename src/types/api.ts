import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { BaseError } from 'server/responses/errors';
import { BaseFailure } from 'server/responses/failures';
import { BaseSuccess } from 'server/responses/successes';

export interface OurNextApiRequest extends NextApiRequest {
  context: {
    auth?: User;
  };
}

export interface OurNextApiResponse extends NextApiResponse {
  success: (success?: Partial<BaseSuccess> | BaseSuccess) => void;
  fail: (failure?: Partial<BaseFailure> | BaseFailure) => void;
  error: (error?: Partial<BaseError> | BaseError) => void;
}
