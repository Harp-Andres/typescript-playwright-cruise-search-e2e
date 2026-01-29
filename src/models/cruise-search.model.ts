// Modelo alineado con los datos de la hoja de resultados del Excel
export interface CruiseSearchResultData {
  idTest: string;
  cruceroEsperado: string;
  paisesEsperados: string; // Lista separada por comas
}
// Modelo alineado con los datos del Excel para facilitar el mapeo y desacoplar cambios de estructura
export interface CruiseSearchData {
  idTest: string;
  destino: string;
  fechaId: string;
  fechaNom: string;
  puerto: string;
  companias: string;
}