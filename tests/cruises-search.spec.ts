import { test, expect } from '@playwright/test';
import { CruiseSearchPage } from '@/pages/cruise-search.page';
import { CruiseResultsPage } from '@/pages/cruise-results.page';
import { readExcelData } from '@/utils/excel-reader.util';
import { CruiseSearchData, CruiseSearchResultData } from '@/models/cruise-search.model';
import { mapCruiseSearchData, mapCruiseSearchResultData } from '@/utils/excel-mapper.util';

const rawTestData = readExcelData('src/data/cruise-search-data.xlsx', 'cruise-search-data');
const testData: CruiseSearchData[] = rawTestData.map(mapCruiseSearchData);
const rawResultData = readExcelData('src/data/cruise-search-data.xlsx', 'cruise-search-results');
const resultData: CruiseSearchResultData[] = rawResultData.map(mapCruiseSearchResultData);

test.describe('Busqueda y verificacion de cruceros', () => {
  for (const data of testData) {
    test(`Busqueda de crucero: ${data.destino} en ${data.fechaNom} (${data.puerto}, ${data.companias})`, async ({
      page,
    }) => {
      const realizarBusqueda = new CruiseSearchPage(page);
      const verificarBusqueda = new CruiseResultsPage(page);

      await realizarBusqueda.goto();

      await test.step('Realizar busqueda en la pagina', async () => {
        await realizarBusqueda.search(data);
      });

      await test.step('Realizar verificaciones', async () => {
        const esperado = resultData.find((r) => r.idTest === data.idTest);
        expect(esperado, `No se encontró data esperada para el idTest: ${data.idTest}`).toBeDefined();

        const visibleCrucero = await verificarBusqueda.isCruceroVisible(esperado!.cruceroEsperado);
        expect(visibleCrucero, 'El crucero buscado no es visible').toBeTruthy();

        const cruceroText = await verificarBusqueda.getCruceroText(esperado!.cruceroEsperado);
        expect(cruceroText, 'El nombre del crucero no coincide con el esperado').toBe(esperado!.cruceroEsperado);

        const visibleItinerario = await verificarBusqueda.isItinerarioVisible();
        expect(visibleItinerario, 'El itinerario no es visible').toBeTruthy();

        const itinerarioText = await verificarBusqueda.getItinerarioText();
        const paisesEsperados = esperado!.paisesEsperados.split(',').map((p) => p.trim());
        for (const pais of paisesEsperados) {
          expect(itinerarioText, `No se encontró el país esperado: ${pais}`).toMatch(new RegExp(pais, 'i'));
        }
      });
    });
  }
});
