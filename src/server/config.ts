export function envString(name: string, fallback: string): string {
  const it = process.env[name];
  if (typeof it === 'string' && it.length > 0) {
    return it;
  }

  return fallback;
}

export function envNumber(name: string, fallback: number): number {
  const it = process.env[name];
  if (typeof it === 'string' && !isNaN(parseInt(it, 10))) {
    return parseInt(it, 10);
  }
  return fallback;
}

export function envBoolean(name: string, fallback: boolean): boolean {
  const it = process.env[name];
  if (typeof it === 'string' && (it === 'TRUE' || it === 'true')) {
    return true;
  }

  return fallback;
}

export const databaseConfig = {
  database: envString('RDS_DATABASE', 'valheim'),
  host: envString('RDS_HOST', '127.0.0.1'),
  password: envString('RDS_PASSWORD', ''),
  port: envNumber('RDS_PORT', 3306),
  user: envString('RDS_USERNAME', 'root'),
  pool: {
    min: envNumber('RDS_POOL_MIN', 2),
    max: envNumber('RDS_POOL_MAX', 10),
  },
};

export const appConfig = {
  env: envString('NODE_ENV', 'development'),
  baseUrl: envString('BASE_URL', 'http://localhost:3000'),
  cookieDomain: envString('BASE_URL', 'http://localhost:3000').replace('http://', ''),
  cookieSigningKey: envString('COOKIE_SIGNING_KEY', ''),
  jwtSecret: envString('JWT_SECRET', ''),
  jwtExpiration: envNumber('JWT_EXPIRATION', 1000 * 60 * 60 * 24), // 24 Hours
};
