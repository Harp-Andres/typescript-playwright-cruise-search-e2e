import { describe, expect, it } from 'vitest';
import { cruiseSearchDynamicLocators } from './cruise-search.locators';

describe('cruiseSearchDynamicLocators', () => {
  it('builds destino and crucero selectors', () => {
    expect(cruiseSearchDynamicLocators.destino('Caribe')).toContain('Caribe');
    expect(cruiseSearchDynamicLocators.cruceroEspecifico('Horizon')).toContain('Horizon');
  });
});
