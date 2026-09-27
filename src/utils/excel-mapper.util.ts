import { CruiseSearchResultData, CruiseSearchData } from '@/models/cruise-search.model';

type ExcelRow = Record<string, string | number | boolean | undefined>;

export function mapCruiseSearchData(row: ExcelRow): CruiseSearchData {
  return {
    idTest: String(row['id_test']),
    destino: String(row['destino']),
    fechaId: String(row['fecha_id']),
    fechaNom: String(row['fecha_nom']),
    puerto: String(row['puerto']),
    companias: String(row['companias']),
  };
}

export function mapCruiseSearchResultData(row: ExcelRow): CruiseSearchResultData {
  return {
    idTest: String(row['id_test']),
    cruceroEsperado: String(row['crucero_esperado']),
    paisesEsperados: String(row['paises_esperados']),
  };
}
