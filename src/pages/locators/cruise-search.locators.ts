// constants/selectores.constants.ts

// Localizadores estáticos (constantes)
export const CRUISE_SEARCH_STATIC_LOCATORS = {
  // Página de búsqueda
  TODOS_DESTINOS: "//button[@class='MuiButtonBase-root MuiCardActionArea-root mui-1bvkg4q']//p[contains(text(),'destinos')]",
  TODAS_FECHAS: "//button[@class='MuiButtonBase-root MuiCardActionArea-root mui-1bvkg4q']//p[contains(text(),'fechas')]",
  TODOS_PUERTOS: 'div[data-nom="todos los puertos"]',
  TODAS_COMPANIAS: "//button[@class='MuiButtonBase-root MuiCardActionArea-root mui-1bvkg4q']//p[contains(text(),'compañías')]",
  BOTON_BUSCAR: 'div#bt_recherche',
  CERRAR_VENTANA: '#auto_ferme_ports',
  CERRAR_CALENDARIO: '#auto_ferme_dates',
  BOTON_LOGIN: '#ingresar',

  // Página de resultados
  LISTA_CRUCEROS: '#listeCroisieres',
  ITINERARIO: '//div[contains(@class,"itineraire")]',
} as const;

// Localizadores dinámicos (funciones)
export const cruiseSearchDynamicLocators = {
  destino: (destino: string) => `div[data-nom="${destino}"]`,
  fecha: (mes: string, fechaId: string) => `div#calendar_2026 div[data-nom="${mes}"][data-id="${fechaId}"]`,
  puerto: (puerto: string) => `div.top10[data-nom="${puerto}"]`,
  compania: (compania: string) => `div.top10[data-nom="${compania}"]`,
  cruceroEspecifico: (nombre: string) => `//div[@id="listeCroisieres"]//span[normalize-space(text())="${nombre}"]`,
};

// Países para validación
export const PAISES = {
  ESTADOS_UNIDOS: 'Estados Unidos',
  PUERTO_RICO: 'Puerto Rico',
  CANADA: 'Canadá',
  PAISES_BAJOS: 'Países Bajos',
  ANTIGUA_BARBUDA: 'Antigua y Barbuda',
} as const;