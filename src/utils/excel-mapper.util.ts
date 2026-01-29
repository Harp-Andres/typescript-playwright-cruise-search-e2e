// src/utils/excel-mapper.ts
import { CruiseSearchResultData, CruiseSearchData } from '@/models/cruise-search.model';

export function mapCruiseSearchData(row: any): CruiseSearchData {
  return {
    idTest: row['id_test'],
    destino: row['destino'],
    fechaId: row['fecha_id'],
    fechaNom: row['fecha_nom'],
    puerto: row['puerto'],
    companias: row['companias'],
  };
}

export function mapCruiseSearchResultData(row: any): CruiseSearchResultData {
  return {
    idTest: row['id_test'],
    cruceroEsperado: row['crucero_esperado'],
    paisesEsperados: row['paises_esperados'],
  };
}