export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_RANK: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

export interface Logger {
  debug(message: string, meta?: Record<string, unknown>): void;
  info(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
  child(bindings: Record<string, unknown>): Logger;
}

function write(level: LogLevel, namespace: string, message: string, meta?: Record<string, unknown>): void {
  const payload = {
    level,
    namespace,
    message,
    time: new Date().toISOString(),
    ...meta,
  };
  const line = JSON.stringify(payload);
  if (level === 'error' || level === 'warn') {
    console.error(line);
  } else {
    console.info(line);
  }
}

export function createLogger(namespace: string, minLevel: LogLevel = 'info'): Logger {
  const shouldLog = (level: LogLevel): boolean => LEVEL_RANK[level] >= LEVEL_RANK[minLevel];

  const base = (bindings: Record<string, unknown>): Logger => ({
    debug: (message, meta) => {
      if (shouldLog('debug')) write('debug', namespace, message, { ...bindings, ...meta });
    },
    info: (message, meta) => {
      if (shouldLog('info')) write('info', namespace, message, { ...bindings, ...meta });
    },
    warn: (message, meta) => {
      if (shouldLog('warn')) write('warn', namespace, message, { ...bindings, ...meta });
    },
    error: (message, meta) => {
      if (shouldLog('error')) write('error', namespace, message, { ...bindings, ...meta });
    },
    child: (childBindings) => base({ ...bindings, ...childBindings }),
  });

  return base({});
}
