import { describe, expect, it } from 'vitest';
import { parseCruiseEnv } from './env';

describe('parseCruiseEnv', () => {
  it('applies defaults', () => {
    const env = parseCruiseEnv({});
    expect(env.BASE_URL).toBe('https://www.cruceros.co');
    expect(env.TIMEOUT_MS).toBe(30_000);
    expect(env.CRUISE_LANDING_SLUG).toBe('c-1-carnival');
  });

  it('reads overrides from process-style keys', () => {
    const env = parseCruiseEnv({
      CRUISE_BASE_URL: 'https://example.test',
      LOG_LEVEL: 'debug',
      CRUISE_LANDING_SLUG: 'custom-slug',
    });
    expect(env.BASE_URL).toBe('https://example.test');
    expect(env.LOG_LEVEL).toBe('debug');
    expect(env.CRUISE_LANDING_SLUG).toBe('custom-slug');
  });
});
