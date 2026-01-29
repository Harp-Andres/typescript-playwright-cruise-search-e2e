import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  // ========== PROPIEDADES ==========
  protected page: Page;  // ✅ Protected: Solo clases hijas necesitan acceso
  
  constructor(page: Page) {
    this.page = page;
  }

  // ========== MÉTODOS PÚBLICOS (API para tests) ==========
  
  /**
   * Toma screenshot - PÚBLICO porque los tests necesitan debugging
   */
  public async takeScreenshot(name: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const path = `screenshots/${name}-${timestamp}.png`;
    
    await this.page.screenshot({ 
      path,
      fullPage: true 
    });
    
    console.log(`📸 Screenshot: ${path}`);
    return path;  // Retornar path para referencia
  }

  /**
   * Obtiene título actual - PÚBLICO para assertions en tests
   */
  public async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Obtiene URL actual - PÚBLICO para verificaciones
   */
  public async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Verifica que página cargó - PÚBLICO para setup de tests
   */
  public async waitForPageLoad(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
    await this.page.waitForLoadState(state);
    console.log(`✅ Página cargada (estado: ${state})`);
  }

  // ========== MÉTODOS PROTECTED (Utilidades internas) ==========
  
  /**
   * Click con reintentos - PROTECTED: lógica interna de pages
   */
  protected async clickWithRetry(selector: string | Locator, maxRetries = 3): Promise<void> {
    const locator = typeof selector === 'string' 
      ? this.page.locator(selector) 
      : selector;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await locator.click({ timeout: 10000 });
        console.log(`✅ Click exitoso en intento ${attempt}`);
        return;
      } catch (error) {
        console.warn(`⚠️  Intento ${attempt} falló: ${error.message}`);
        if (attempt === maxRetries) throw error;
        await this.page.waitForTimeout(1000);
      }
    }
  }

  /**
   * Fill con validación - PROTECTED: lógica de formularios interna
   */
  protected async fillWithValidation(selector: string | Locator, value: string): Promise<void> {
    const locator = typeof selector === 'string' 
      ? this.page.locator(selector) 
      : selector;
    
    await locator.fill(value);
    const actualValue = await locator.inputValue();
    
    if (actualValue !== value) {
      throw new Error(`Validación falló en ${selector}: esperado "${value}", obtenido "${actualValue}"`);
    }
    
    console.log(`✅ Campo ${selector} llenado correctamente`);
  }

  /**
   * Espera elemento visible - PROTECTED: utilidad interna
   */
  protected async waitForVisible(selector: string | Locator, timeout = 10000): Promise<Locator> {
    const locator = typeof selector === 'string' 
      ? this.page.locator(selector) 
      : selector;
    
    await locator.waitFor({ state: 'visible', timeout });
    return locator;
  }

  /**
   * Obtiene texto de elemento - PROTECTED: extracción interna
   */
  protected async getElementText(selector: string | Locator): Promise<string> {
    const locator = typeof selector === 'string' 
      ? this.page.locator(selector) 
      : selector;
    
    return (await locator.textContent()) || '';
  }

  // ========== MÉTODOS PRIVADOS (Helpers muy específicos) ==========
  
  /**
   * Scroll a elemento - PRIVATE: detalle de implementación
   */
  private async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500); // Pequeña pausa después de scroll
  }

  /**
   * Limpiar campo - PRIVATE: operación específica
   */
  private async clearField(locator: Locator): Promise<void> {
    await locator.fill('');
    await this.page.waitForTimeout(100);
  }
}