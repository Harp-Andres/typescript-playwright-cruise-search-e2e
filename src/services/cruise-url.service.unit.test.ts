import { describe, expect, it } from 'vitest';
import { buildCruiseLandingPath, buildCruiseLandingUrl } from './cruise-url.service';

describe('cruise URL builder', () => {
  it('builds a normalized landing path', () => {
    expect(buildCruiseLandingPath('c-1-carnival')).toBe('/c-1-carnival');
    expect(buildCruiseLandingPath('/c-1-carnival')).toBe('/c-1-carnival');
  });

  it('builds a full landing URL', () => {
    expect(buildCruiseLandingUrl('https://www.cruceros.co', 'c-1-carnival')).toBe(
      'https://www.cruceros.co/c-1-carnival',
    );
  });
});
