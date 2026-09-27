import { Page } from '@playwright/test';
import {
  CRUISE_SEARCH_STATIC_LOCATORS,
  cruiseSearchDynamicLocators,
} from '@/pages/locators/cruise-search.locators';
import { BasePage } from '@/pages/base/BasePage';

export class CruiseResultsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getCruceroText(nombre: string): Promise<string | null> {
    const locator = this.page.locator(cruiseSearchDynamicLocators.cruceroEspecifico(nombre));
    if (await locator.isVisible()) {
      return (await locator.textContent())?.trim() ?? null;
    }
    return null;
  }

  async isCruceroVisible(nombre: string): Promise<boolean> {
    return this.page.locator(cruiseSearchDynamicLocators.cruceroEspecifico(nombre)).isVisible();
  }

  async isItinerarioVisible(): Promise<boolean> {
    return this.page.locator(CRUISE_SEARCH_STATIC_LOCATORS.ITINERARIO).isVisible();
  }

  async getItinerarioText(): Promise<string> {
    return this.page.locator(CRUISE_SEARCH_STATIC_LOCATORS.ITINERARIO).innerText();
  }
}
