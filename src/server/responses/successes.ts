/* eslint-disable max-classes-per-file */

export enum SuccessCode {
  // 200 - OK
  S_200000 = 'S_200000',

  // 201 - Created
  S_201000 = 'S_201000',
}

interface SuccessOpts {
  name?: string;
  code?: SuccessCode;
  httpStatus?: number;
  data?: unknown;
}

export class BaseSuccess {
  name: string = 'BaseSuccess';

  code: SuccessCode = SuccessCode.S_200000;

  httpStatus: number = 200;

  data?: unknown;

  readonly status = 'success';

  constructor(opts?: SuccessOpts) {
    Object.assign(this, opts);
  }
}

export class CreatedSuccess extends BaseSuccess {
  name: string = 'CreatedSuccess';

  code: SuccessCode = SuccessCode.S_201000;
}
