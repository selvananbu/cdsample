import convertToFav, { getFavUnit } from './convert';

const attributeLength = {
  "attrId": 3,
  "unit": [
    {
      "unitName": "cm",
      "unitStr": "cm",
      "unitFactor": 0.1,
      "isBaseUnit": 0,
      "decimals": 2,
      "docType": 0,
      "offset": 0
    },
    {
      "unitName": "mm",
      "unitStr": "mm",
      "unitFactor": 1,
      "isBaseUnit": 1,
      "decimals": 1,
      "docType": 0,
      "offset": 0
    },
    {
      "unitName": "mm/10",
      "unitStr": "mm/10",
      "unitFactor": 10,
      "isBaseUnit": 0,
      "decimals": 1,
      "docType": 0,
      "offset": 0
    },
    {
      "unitName": "mm/100",
      "unitStr": "mm/100",
      "unitFactor": 100,
      "isBaseUnit": 0,
      "decimals": 1,
      "docType": 0,
      "offset": 0
    },
    {
      "unitName": "m",
      "unitStr": "m",
      "unitFactor": 0.001,
      "isBaseUnit": 0,
      "decimals": 1,
      "docType": 0,
      "offset": 0
    },
    {
      "unitName": "inch",
      "unitStr": "inch",
      "unitFactor": 0.03937085375696372,
      "isBaseUnit": 0,
      "decimals": 4,
      "docType": 1,
      "offset": 0
    },
    {
      "unitName": "inch d",
      "unitStr": "inch d",
      "unitFactor": 0.03937085375696372,
      "isBaseUnit": 0,
      "decimals": 4,
      "docType": 2,
      "offset": 0
    },
    {
      "unitName": "ft",
      "unitStr": "ft",
      "unitFactor": 0.003280904479746977,
      "isBaseUnit": 0,
      "decimals": 4,
      "docType": 0,
      "offset": 0
    },
    {
      "unitName": "km",
      "unitStr": "km",
      "unitFactor": 0.000001,
      "isBaseUnit": 0,
      "decimals": 1,
      "docType": 0,
      "offset": 0
    },
    {
      "unitName": "mi",
      "unitStr": "mi",
      "unitFactor": 6.2137E-7,
      "isBaseUnit": 0,
      "decimals": 4,
      "docType": 0,
      "offset": 0
    }
  ],
  "baseUnitIdx": 1,
  "favUnitIdx": 1,
  "attrType": "LENGTH"
}

describe('getFavUnit', () => {
  it('returns the fav unit if favUnitIdx is set', () => {
    expect(getFavUnit(attributeLength).unitName).toBe('mm')
  })
  it('returns the base unit if no favUnitIdx is set', () => {
    expect(getFavUnit({
      unit: attributeLength.unit,
      baseUnitIdx: 1
    }).isBaseUnit).toBeTruthy()
  })
  it('returns the base unit if no favUnitIdx and no baseUnitIdx is set', () => {
    expect(getFavUnit({
      unit: attributeLength.unit
    }).isBaseUnit).toBeTruthy()
  })
})

describe('convertToFav', () => {
  it('converts mm to m', () => {
    const converted = convertToFav({
      ...attributeLength,
      favUnitIdx: 4
    }, '1000 mm').split(' ')
    const value = converted[0].split('.')

    expect(parseInt(value[0])).toBe(1)
    expect(value[1].length).toBe(attributeLength.unit[4].decimals)
    expect(converted[1]).toBe('m')
  })
  it('converts m to cm', () => {
    const converted = convertToFav({
      ...attributeLength,
      favUnitIdx: 0
    }, '13 m').split(' ')
    const value = converted[0].split('.')

    expect(parseInt(value[0])).toBe(1300)
    expect(value[1].length).toBe(attributeLength.unit[0].decimals)
    expect(converted[1]).toBe('cm')
  })
  it('returns 0 for unitless values', () => {
    const converted = convertToFav({
      ...attributeLength,
      "baseUnitIdx": 1,
      "favUnitIdx": 3,
      "attrType": "LENGTH"
    }, '13.56').split(' ')

    expect(parseFloat(converted[0])).toBe(0)
    expect(converted[0].split('.')[1].length).toBe(attributeLength.unit[3].decimals)
    expect(converted[1]).toBe('mm/100')
  })
})
