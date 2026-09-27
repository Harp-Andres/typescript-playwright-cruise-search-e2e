# TypeScript Playwright — Cruise Search E2E (sample)

**Domain / data-driven end-to-end demo** for [cruceros.co](https://www.cruceros.co): Excel-backed test data, Page Object Model, and multi-browser Playwright runs.

This repo is intentionally **not** a second test framework. For the reusable WEB + API foundation (logging, env config, API clients, AI-ready helpers), use **[qa-playwright-ai-framework](https://github.com/Harp-Andres/qa-playwright-ai-framework)**.

## Layout

```text
src/
  config/          # env parsing (Zod)
  pages/           # page objects + selectors
  services/        # pure URL builders
  utils/           # Excel IO, mappers, lightweight JSON logger
  models/          # typed test data
tests/             # Playwright E2E specs
```

## Commands

```bash
npm ci
npx playwright install --with-deps chromium firefox

# Unit tests (no browser)
npm test
npm run test:unit

# End-to-end (live site; headed by default in config)
npm run test:e2e
```

## Data-driven tests

Scenario rows live in `src/data/cruise-search-data.xlsx` (`cruise-search-data` and `cruise-search-results` sheets). Mappers in `src/utils/excel-mapper.util.ts` keep specs decoupled from column names.

## Related repos

| Repo | Role |
|------|------|
| [qa-playwright-ai-framework](https://github.com/Harp-Andres/qa-playwright-ai-framework) | Shared automation framework |
| [Buscar_Cruceros](https://github.com/Harp-Andres/Buscar_Cruceros) | **Archived** JavaScript predecessor — superseded by this TypeScript sample |
