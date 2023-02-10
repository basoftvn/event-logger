export const LogLevels = [
  'fatal',
  'error',
  'warn',
  'log',
  'verbose',
  'debug',
] as const;

export type LogLevels = (typeof LogLevels)[number];
