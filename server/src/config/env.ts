function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is missing`);
  }
  return value;
}

export const ENV = {
  ACCESS_TOKEN_SECRET: getEnv('ACCESS_TOKEN_SECRET'),
  REFRESH_TOKEN_SECRET: getEnv('REFRESH_TOKEN_SECRET'),
  ACCESS_TOKEN_EXPIRY: getEnv('ACCESS_TOKEN_EXPIRY'), // e.g., "15m"
  REFRESH_TOKEN_EXPIRY: getEnv('REFRESH_TOKEN_EXPIRY'), // e.g., "7d"
};
