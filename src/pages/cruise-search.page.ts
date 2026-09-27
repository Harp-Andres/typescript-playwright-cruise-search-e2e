import { Locator, Page } from '@playwright/test';
import { getCruiseEnv } from '@/config/env';
import { buildCruiseLandingUrl } from '@/services/cruise-url.service';
import {
  CRUISE_SEARCH_STATIC_LOCATORS,
  cruiseSearchDynamicLocators,
} from '@/pages/locators/cruise-search.locators';
import { CruiseSearchData } from '@/models/cruise-search.model';
import { BasePage } from '@/pages/base/BasePage';

export class CruiseSearchPage extends BasePage {
  private readonly cerrarCalendario: Locator;

  constructor(page: Page) {
    super(page);
    this.cerrarCalendario = page.locator(CRUISE_SEARCH_STATIC_LOCATORS.CERRAR_CALENDARIO).nth(4);
  }

  async goto(): Promise<void> {
    const env = getCruiseEnv();
    const url = buildCruiseLandingUrl(env.BASE_URL, env.CRUISE_LANDING_SLUG);
    this.log.info('Navigating to cruise search landing', { url });
    await this.page.goto(url);
    await this.waitForPageLoad('domcontentloaded');
  }

  async search(data: CruiseSearchData): Promise<void> {
    this.log.info('Starting cruise search', { idTest: data.idTest, destino: data.destino });

    await this.page.click(CRUISE_SEARCH_STATIC_LOCATORS.TODOS_DESTINOS);
    await this.page.click(cruiseSearchDynamicLocators.destino(data.destino));
    await this.page.click(CRUISE_SEARCH_STATIC_LOCATORS.TODAS_FECHAS);
    await this.page.click(cruiseSearchDynamicLocators.fecha(data.fechaNom, data.fechaId));
    await this.cerrarCalendario.click();
    await this.page.click(CRUISE_SEARCH_STATIC_LOCATORS.TODOS_PUERTOS);
    await this.page.click(cruiseSearchDynamicLocators.puerto(data.puerto));
    await this.page.click(CRUISE_SEARCH_STATIC_LOCATORS.CERRAR_VENTANA);
    await this.page.click(CRUISE_SEARCH_STATIC_LOCATORS.TODAS_COMPANIAS);
    await this.page.click(cruiseSearchDynamicLocators.compania(data.companias));
    await this.page.click(CRUISE_SEARCH_STATIC_LOCATORS.BOTON_BUSCAR);
  }
}
