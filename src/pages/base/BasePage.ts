import { Page, Locator } from '@playwright/test';
import { getCruiseEnv } from '@/config/env';
import { createLogger, type Logger } from '@/utils/logger';

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly log: Logger;

  constructor(page: Page, logger?: Logger) {
    this.page = page;
    const env = getCruiseEnv();
    this.log = logger ?? createLogger(this.constructor.name, env.LOG_LEVEL);
  }

  public async takeScreenshot(name: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const path = `screenshots/${name}-${timestamp}.png`;

    await this.page.screenshot({
      path,
      fullPage: true,
    });

    this.log.info('Screenshot captured', { path });
    return path;
  }

  public async getTitle(): Promise<string> {
    return await this.page.title();
  }

  public async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  public async waitForPageLoad(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
    await this.page.waitForLoadState(state);
    this.log.debug('Page load state reached', { state });
  }

  protected async clickWithRetry(selector: string | Locator, maxRetries = 3): Promise<void> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await locator.click({ timeout: 10_000 });
        this.log.debug('Click succeeded', { attempt });
        return;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        this.log.warn('Click attempt failed', { attempt, message });
        if (attempt === maxRetries) throw error;
        await this.page.waitForTimeout(1_000);
      }
    }
  }

  protected async fillWithValidation(selector: string | Locator, value: string): Promise<void> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;

    await locator.fill(value);
    const actualValue = await locator.inputValue();

    if (actualValue !== value) {
      throw new Error(`Validación falló: esperado "${value}", obtenido "${actualValue}"`);
    }

    this.log.debug('Field filled', { selector: typeof selector === 'string' ? selector : 'locator' });
  }

  protected async waitForVisible(selector: string | Locator, timeout = 10_000): Promise<Locator> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await locator.waitFor({ state: 'visible', timeout });
    return locator;
  }

  protected async getElementText(selector: string | Locator): Promise<string> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    return (await locator.textContent()) ?? '';
  }
}
