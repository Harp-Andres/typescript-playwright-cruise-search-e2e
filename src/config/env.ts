import { z } from 'zod';

export const cruiseEnvSchema = z.object({
  BASE_URL: z.string().url().default('https://www.cruceros.co'),
  TIMEOUT_MS: z.coerce.number().int().positive().default(30_000),
  DEFAULT_WAIT_MS: z.coerce.number().int().positive().default(5_000),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  CRUISE_LANDING_SLUG: z.string().min(1).default('c-1-carnival'),
});

export type CruiseEnv = z.infer<typeof cruiseEnvSchema>;

let cached: CruiseEnv | null = null;

export function parseCruiseEnv(source: Record<string, string | undefined>): CruiseEnv {
  return cruiseEnvSchema.parse({
    BASE_URL: source.CRUISE_BASE_URL,
    TIMEOUT_MS: source.CRUISE_TIMEOUT_MS,
    DEFAULT_WAIT_MS: source.CRUISE_DEFAULT_WAIT_MS,
    LOG_LEVEL: source.LOG_LEVEL,
    CRUISE_LANDING_SLUG: source.CRUISE_LANDING_SLUG,
  });
}

export function getCruiseEnv(): CruiseEnv {
  if (!cached) {
    cached = parseCruiseEnv(process.env);
  }
  return cached;
}

export function resetCruiseEnvCache(): void {
  cached = null;
}

/** @deprecated Use getCruiseEnv() — kept for gradual migration. */
export const CONFIG = {
  get BASE_URL() {
    return getCruiseEnv().BASE_URL;
  },
  get TIMEOUT() {
    return getCruiseEnv().TIMEOUT_MS;
  },
  get DEFAULT_WAIT_TIME() {
    return getCruiseEnv().DEFAULT_WAIT_MS;
  },
} as const;
