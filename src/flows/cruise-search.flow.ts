// pages/realizar-busqueda.page.ts

import { Page, Locator } from '@playwright/test';
import { CONFIG } from '@/config/global.config';
import { CRUISE_SEARCH_STATIC_LOCATORS, cruiseSearchDynamicLocators } from '@/pages/locators/cruise-search.locators';
import { CruiseSearchData } from '@/models/cruise-search.model';

export class CruiseSearchPage {
  private page: Page;
  
  // Locators usando constantes
  private cerrarCalendario: Locator;

  constructor(page: Page) {
    this.page = page;
    // Solo los locators que necesitan lógica especial
    this.cerrarCalendario = page.locator(CRUISE_SEARCH_STATIC_LOCATORS.CERRAR_CALENDARIO).nth(4);
  }

  async goto(): Promise<void> {
    await this.page.goto(`${CONFIG.BASE_URL}/c-1-carnival`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async search(data: CruiseSearchData): Promise<void> {
    // Usando localizadores estáticos y dinámicos separados
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