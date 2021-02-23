import nc from 'next-connect';
import { genericHandlers } from 'server/middleware/genericHandlers';
import { jsend } from 'server/middleware/jsend';
import { OurNextApiRequest, OurNextApiResponse } from 'types/api';

export const common = () => nc<OurNextApiRequest, OurNextApiResponse>(genericHandlers).use(jsend);
