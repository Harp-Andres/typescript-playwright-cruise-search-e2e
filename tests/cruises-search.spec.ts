// tests/features/filtro-busqueda-cruceros.spec.ts
import { test, expect } from '@playwright/test';
import { CruiseSearchPage } from '@/flows/cruise-search.flow';
import { CruiseResultsPage } from '@/flows/cruise-results.flow';
import { readExcelData } from '../src/utils/excel-reader.util';
import { CruiseSearchData, CruiseSearchResultData } from '../src/models/cruise-search.model';
import { mapCruiseSearchData, mapCruiseSearchResultData } from '../src/utils/excel-mapper.util';

const rawTestData = readExcelData('src/data/cruise-search-data.xlsx', 'cruise-search-data');
const testData: CruiseSearchData[] = rawTestData.map(mapCruiseSearchData);
const rawResultData = readExcelData('src/data/cruise-search-data.xlsx', 'cruise-search-results');
const resultData: CruiseSearchResultData[] = rawResultData.map(mapCruiseSearchResultData);

test.describe('Busqueda y verificacion de cruceros', () => {
  for (const data of testData) {
    test(`Busqueda de crucero: ${data.destino} en ${data.fechaNom} (${data.puerto}, ${data.companias})`, async ({ page }) => {
      const realizarBusqueda = new CruiseSearchPage(page);
      const verificarBusqueda = new CruiseResultsPage(page);

      await realizarBusqueda.goto();

      await test.step('Realizar busqueda en la pagina', async () => {
        await realizarBusqueda.search(data); // Pasa los datos del modelo
      });

      await test.step('Realizar verificaciones', async () => {
        const esperado = resultData.find(r => r.idTest === data.idTest);
        expect(esperado, `No se encontró data esperada para el idTest: ${data.idTest}`).toBeDefined();

        // Verificar visibilidad y texto del crucero
        const visibleCrucero = await verificarBusqueda.isCruceroVisible(esperado!.cruceroEsperado);
        expect(visibleCrucero, 'El crucero buscado no es visible').toBeTruthy();

        const cruceroText = await verificarBusqueda.getCruceroText(esperado!.cruceroEsperado);
        expect(cruceroText, 'El nombre del crucero no coincide con el esperado').toBe(esperado!.cruceroEsperado);

        // Verificar visibilidad del itinerario
        const visibleItinerario = await verificarBusqueda.isItinerarioVisible();
        expect(visibleItinerario, 'El itinerario no es visible').toBeTruthy();

        // Verificar que el itinerario contenga todos los países esperados
        const itinerarioText = await verificarBusqueda.getItinerarioText();
        const paisesEsperados = esperado!.paisesEsperados.split(',').map(p => p.trim());
        for (const pais of paisesEsperados) {
          expect(itinerarioText, `No se encontró el país esperado: ${pais}`).toMatch(new RegExp(pais, 'i'));
        }
      });
    });
  }
});



