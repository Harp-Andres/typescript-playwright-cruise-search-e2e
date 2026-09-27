import { describe, expect, it, vi } from 'vitest';
import { createLogger } from './logger';

describe('createLogger', () => {
  it('writes JSON lines at info level', () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    const log = createLogger('test', 'info');
    log.info('hello', { step: 1 });
    expect(info).toHaveBeenCalled();
    const payload = JSON.parse(String(info.mock.calls[0]?.[0]));
    expect(payload.message).toBe('hello');
    expect(payload.namespace).toBe('test');
    info.mockRestore();
  });

  it('suppresses debug when level is info', () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    const log = createLogger('test', 'info');
    log.debug('hidden');
    expect(info).not.toHaveBeenCalled();
    info.mockRestore();
  });
});
