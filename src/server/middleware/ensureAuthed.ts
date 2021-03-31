import { verify } from 'jsonwebtoken';
import { NextHandler } from 'next-connect';
import { appConfig } from 'server/config';
import { AuthService } from 'server/domains/auth/AuthService';
import { FailureCode, UnauthorizedFailure } from 'server/responses/failures';
import { db } from 'server/services/db';
import { OurNextApiRequest, OurNextApiResponse } from 'types/api';

function getToken(req: OurNextApiRequest, res: OurNextApiResponse) {
  // Header takes priority over cookie
  if (req.headers.authorization) {
    const header = req.headers.authorization;

    const parts = header.split(' ');
    if (parts.length !== 2) throw new UnauthorizedFailure({ code: FailureCode.F_401002 });

    const scheme = parts[0];
    const token = parts[1];
    if (!/^Bearer$/i.test(scheme as string)) throw new UnauthorizedFailure({ code: FailureCode.F_401002 });

    return token;
  }
  if (req.cookies['auth-cookie']) {
    return AuthService.getAuthCookie(req, res);
  }

  throw new UnauthorizedFailure({ code: FailureCode.F_401001 });
}

export async function ensureAuthed(req: OurNextApiRequest, res: OurNextApiResponse, next?: NextHandler) {
  const token = getToken(req, res);
  let decoded: { sub: number };

  try {
    decoded = verify(token as string, appConfig.jwtSecret) as { sub: number };
  } catch (error) {
    throw new UnauthorizedFailure({ code: FailureCode.F_401003 });
  }

  const user = await db.user.findFirst({ where: { id: decoded.sub } });

  if (!user) {
    throw new UnauthorizedFailure({ code: FailureCode.F_401004 });
  }

  req.context.auth = user;

  // Refresh cookie
  if (req.cookies['auth-cookie']) {
    const authToken = AuthService.createAuthToken(decoded.sub);

    AuthService.setAuthCookie(req, res, authToken);
  }

  return next ? next() : res;
}
