import { describe, expect, it } from 'vitest';
import { mapCruiseSearchData, mapCruiseSearchResultData } from './excel-mapper.util';

describe('excel mappers', () => {
  it('maps cruise search rows', () => {
    expect(
      mapCruiseSearchData({
        id_test: 'TC01',
        destino: 'Caribe',
        fecha_id: '1',
        fecha_nom: 'Enero',
        puerto: 'Miami',
        companias: 'Carnival',
      }),
    ).toEqual({
      idTest: 'TC01',
      destino: 'Caribe',
      fechaId: '1',
      fechaNom: 'Enero',
      puerto: 'Miami',
      companias: 'Carnival',
    });
  });

  it('maps result rows', () => {
    expect(
      mapCruiseSearchResultData({
        id_test: 'TC01',
        crucero_esperado: 'Carnival Horizon',
        paises_esperados: 'México, Bahamas',
      }),
    ).toEqual({
      idTest: 'TC01',
      cruceroEsperado: 'Carnival Horizon',
      paisesEsperados: 'México, Bahamas',
    });
  });
});
