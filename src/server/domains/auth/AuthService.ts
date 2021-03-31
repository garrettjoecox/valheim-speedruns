import * as bcrypt from 'bcryptjs';
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';
import { appConfig } from 'server/config';
import { OurNextApiRequest, OurNextApiResponse } from 'types/api';

export class AuthService {
  static hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static createAuthToken(userId: number): string {
    return jwt.sign({}, appConfig.jwtSecret, {
      expiresIn: appConfig.jwtExpiration,
      subject: userId.toString(),
    });
  }

  /**
   * This will set the authToken appropriately on a response cookie, if no auth token
   * is provided it will instead clear the cookie (this is useful for log-out)
   */
  static setAuthCookie(req: OurNextApiRequest, res: OurNextApiResponse, authToken?: string) {
    const cookies = new Cookies(req, res, { keys: [appConfig.cookieSigningKey], secure: true });

    if (authToken) {
      cookies.set('auth-cookie', authToken, {
        maxAge: appConfig.jwtExpiration,
        expires: new Date(Date.now() + appConfig.jwtExpiration),
        secure: true,
        httpOnly: true,
        overwrite: true,
        domain: appConfig.cookieDomain,
        sameSite: 'lax',
        signed: true,
      });
    } else {
      cookies.set('auth-cookie', '', {
        secure: true,
        httpOnly: true,
        overwrite: true,
        domain: appConfig.cookieDomain,
        sameSite: 'lax',
        signed: true,
      });
    }
  }

  static getAuthCookie(req: OurNextApiRequest, res: OurNextApiResponse) {
    const cookies = new Cookies(req, res, { keys: [appConfig.cookieSigningKey], secure: true });

    return cookies.get('auth-cookie', { signed: true });
  }
}
