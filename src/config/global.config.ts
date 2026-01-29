// Configuraciones globales que podrían cambiar por entorno
export const CONFIG = {
  BASE_URL: 'https://www.cruceros.co',
  TIMEOUT: 30000,
  DEFAULT_WAIT_TIME: 5000,
} as const;

export type Config = typeof CONFIG;