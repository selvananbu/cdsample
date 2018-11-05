import { validateInch, validateValue } from './restrict';

const arr = [
    { str: '12.5m',         type: 'LENGTH', expect: true, strict: true },  // +4
    { str: '12.5 m',        type: 'LENGTH', expect: true, strict: true },
    { str: '12 mm',         type: 'LENGTH', expect: true, strict: true },
    { str: '12mm',          type: 'LENGTH', expect: true, strict: true },
    { str: '.5m',           type: 'LENGTH', expect: true, strict: true },
    { str: '.5 cm',         type: 'LENGTH', expect: true, strict: true },
    { str: '12.5 mm/100',   type: 'LENGTH', expect: true, strict: true },
    { str: '12.5km',        type: 'LENGTH', expect: true, strict: true },
    { str: '12.5 k',        type: 'LENGTH', expect: true, strict: false },
    { str: '12.5 inch',     type: 'LENGTH', expect: true, strict: false },
    { str: '12.5 inch d',   type: 'LENGTH', expect: true, strict: true },
    { str: '12 3/128"',     type: 'LENGTH', expect: true, strict: true },
    { str: '12',            type: 'LENGTH', expect: true, strict: true },
    { str: '.',             type: 'LENGTH', expect: true, strict: false },
    { str: '.5/12"',        type: 'LENGTH', expect: false, strict: false },
    { str: '.5/',           type: 'LENGTH', expect: false, strict: false },
    { str: '12 3/128 "',    type: 'LENGTH', expect: true, strict: true },
    { str: '123/128"',      type: 'LENGTH', expect: true, strict: true },
    { str: '.5%',           type: 'PERCENTAGE', expect: true, strict: true },
    { str: '5%',            type: 'PERCENTAGE', expect: true, strict: true },
    { str: '%',             type: 'PERCENTAGE', expect: true, strict: false },
    { str: '51/10%',        type: 'PERCENTAGE', expect: false, strict: false },
    { str: '5 1/10%',       type: 'PERCENTAGE', expect: true, strict: true },
    { str: '5 1/1',         type: 'PERCENTAGE', expect: true, strict: false },
    { str: '5 1/10',        type: 'PERCENTAGE', expect: true, strict: false },
    { str: '5°',            type: 'ANGLE', expect: true, strict: true },
    { str: '4 1/100mm/s',   type: 'SPEED', expect: true, strict: true },
    { str: '4 1/100d',      type: 'TIME', expect: false, strict: false },
    { str: '4 1/100s',      type: 'TIME', expect: true, strict: true },
]

describe('validateValue', () => {
    it('handles values', () =>{
        const varr = arr.map(tcase => 
            validateValue(getAttribute(tcase.type), tcase.str) === tcase.expect
        )
        const index = varr.indexOf(false)
        expect(index).toBe(-1)
    })
})


describe('validateValue (strict)', () => {
    it('handles values', () => {
        const varr = arr.map(tcase => 
            validateValue(getAttribute(tcase.type), tcase.str, true) === tcase.strict
        )
        const index = varr.indexOf(false)
        expect(index).toBe(-1)
    })
})

describe('validateInch', () => {
    it('evaluates a normal inch', () => {
        expect(validateInch('3/128')).toBeTruthy()
        expect(validateInch('/128')).toBeTruthy()
    })
    it('evaluates wrong inches', () => {
        expect(validateInch('133/128')).toBeFalsy()
        expect(validateInch('3/127')).toBeFalsy()
        expect(validateInch('3/')).toBeFalsy()
    })
})




const getAttribute = (type) => {
  const attribute = attributes.filter(attr => attr.attrType === type)
  return (attribute.length === 1) ? attribute[0] : null
}

export const attributes = [
    {
      "attrId": 1,
      "unit": [
        {
          "unitName": "°",
          "unitStr": "°",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 2,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "rad",
          "unitStr": "rad",
          "unitFactor": 0.017453293,
          "isBaseUnit": 0,
          "decimals": 5,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "ANGLE"
    },
    {
      "attrId": 2,
      "unit": [
        {
          "unitName": "sqm",
          "unitStr": "sqm",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 2,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "sqft",
          "unitStr": "sqft",
          "unitFactor": 10.76391041671,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "sqmm",
          "unitStr": "sqmm",
          "unitFactor": 1000000,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "AREA"
    },
    {
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
    },
    {
      "attrId": 4,
      "unit": [
        {
          "unitName": "m³",
          "unitStr": "m³",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 5,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "mm³",
          "unitStr": "mm³",
          "unitFactor": 1000000000,
          "isBaseUnit": 0,
          "decimals": 0,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "cm³",
          "unitStr": "cm³",
          "unitFactor": 1000000,
          "isBaseUnit": 0,
          "decimals": 0,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "l",
          "unitStr": "l",
          "unitFactor": 1000,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "VOLUME"
    },
    {
      "attrId": 5,
      "unit": [
        {
          "unitName": "kg",
          "unitStr": "kg",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "g",
          "unitStr": "g",
          "unitFactor": 1000,
          "isBaseUnit": 0,
          "decimals": 2,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "lbs",
          "unitStr": "lbs",
          "unitFactor": 2.204622621849,
          "isBaseUnit": 0,
          "decimals": 2,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "t",
          "unitStr": "t",
          "unitFactor": 0.001,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "WEIGHT"
    },
    {
      "attrId": 6,
      "unit": [
        {
          "unitName": "s",
          "unitStr": "s",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 1,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "min",
          "unitStr": "min",
          "unitFactor": 0.01666666666666,
          "isBaseUnit": 0,
          "decimals": 1,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "ms",
          "unitStr": "ms",
          "unitFactor": 1000,
          "isBaseUnit": 0,
          "decimals": 0,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "1/100s",
          "unitStr": "1/100s",
          "unitFactor": 100,
          "isBaseUnit": 0,
          "decimals": 0,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "h",
          "unitStr": "h",
          "unitFactor": 0.0002777777777777778,
          "isBaseUnit": 0,
          "decimals": 1,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "d",
          "unitStr": "d",
          "unitFactor": 0.000011574074074074073,
          "isBaseUnit": 0,
          "decimals": 1,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "TIME"
    },
    {
      "attrId": 7,
      "unit": [
        {
          "unitName": "bar",
          "unitStr": "bar",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 5,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "Pa",
          "unitStr": "Pa",
          "unitFactor": 100000,
          "isBaseUnit": 0,
          "decimals": 1,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "mbar",
          "unitStr": "mbar",
          "unitFactor": 1000,
          "isBaseUnit": 0,
          "decimals": 3,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "psi",
          "unitStr": "psi",
          "unitFactor": 14.50377,
          "isBaseUnit": 0,
          "decimals": 3,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "PRESSURE"
    },
    {
      "attrId": 8,
      "unit": [
        {
          "unitName": "%",
          "unitStr": "%",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 1,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "ppm",
          "unitStr": "ppm",
          "unitFactor": 10000,
          "isBaseUnit": 0,
          "decimals": 0,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "1/10%",
          "unitStr": "1/10%",
          "unitFactor": 10,
          "isBaseUnit": 0,
          "decimals": 1,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "1/10000%",
          "unitStr": "1/10000%",
          "unitFactor": 10000,
          "isBaseUnit": 0,
          "decimals": 0,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "PERCENTAGE"
    },
    {
      "attrId": 9,
      "unit": [
        {
          "unitName": "€",
          "unitStr": "€",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 2,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "PRICE"
    },
    {
      "attrId": 10,
      "unit": [
        {
          "unitName": "°C",
          "unitStr": "°C",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 1,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "°F",
          "unitStr": "°F",
          "unitFactor": 1.8,
          "isBaseUnit": 0,
          "decimals": 1,
          "docType": 0,
          "offset": 32
        },
        {
          "unitName": "K",
          "unitStr": "K",
          "unitFactor": 1,
          "isBaseUnit": 0,
          "decimals": 1,
          "docType": 0,
          "offset": 273.15
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "TEMPERATURE"
    },
    {
      "attrId": 11,
      "unit": [
        {
          "unitName": "kg/sqm",
          "unitStr": "kg/sqm",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "lbs/sqft",
          "unitStr": "lbs/sqft",
          "unitFactor": 0.204891,
          "isBaseUnit": 0,
          "decimals": 2,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "WEIGHT_PER_AREA"
    },
    {
      "attrId": 12,
      "unit": [
        {
          "unitName": "/sqm",
          "unitStr": "/sqm",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 2,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "/sqft",
          "unitStr": "/sqft",
          "unitFactor": 0.092899382436,
          "isBaseUnit": 0,
          "decimals": 2,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "PRICE_PER_AREA"
    },
    {
      "attrId": 13,
      "unit": [
        {
          "unitName": "/lfm",
          "unitStr": "/lfm",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 2,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "/lft",
          "unitStr": "/lft",
          "unitFactor": 0.304794,
          "isBaseUnit": 0,
          "decimals": 2,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "/lin",
          "unitStr": "/lin",
          "unitFactor": 0.0253995,
          "isBaseUnit": 0,
          "decimals": 2,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "PRICE_PER_LENGTH"
    },
    {
      "attrId": 14,
      "unit": [
        {
          "unitName": "/kg",
          "unitStr": "/kg",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "/lbs",
          "unitStr": "/lbs",
          "unitFactor": 0.453590008428156,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "PRICE_PER_WEIGHT"
    },
    {
      "attrId": 15,
      "unit": [
        {
          "unitName": "lfm",
          "unitStr": "lfm",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 2,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "lft",
          "unitStr": "lft",
          "unitFactor": 3.280904479746977,
          "isBaseUnit": 0,
          "decimals": 2,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "lm",
          "unitStr": "lm",
          "unitFactor": 0.001,
          "isBaseUnit": 0,
          "decimals": 2,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "LINEAR_LENGTH"
    },
    {
      "attrId": 16,
      "unit": [
        {
          "unitName": "?",
          "unitStr": "?",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 5,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "DYNAMIC_UNIT"
    },
    {
      "attrId": 17,
      "unit": [
        {
          "unitName": "/pc",
          "unitStr": "/pc",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "PRICE_PER_PIECE"
    },
    {
      "attrId": 18,
      "unit": [
        {
          "unitName": "/Unit",
          "unitStr": "/Unit",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "PRICE_PER_UNIT"
    },
    {
      "attrId": 19,
      "unit": [
        {
          "unitName": "m/s",
          "unitStr": "m/s",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 2,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "m/min",
          "unitStr": "m/min",
          "unitFactor": 60,
          "isBaseUnit": 0,
          "decimals": 2,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "mm/s",
          "unitStr": "mm/s",
          "unitFactor": 1000,
          "isBaseUnit": 0,
          "decimals": 3,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "mm/min",
          "unitStr": "mm/min",
          "unitFactor": 60000,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "1/100mm/s",
          "unitStr": "1/100mm/s",
          "unitFactor": 100000,
          "isBaseUnit": 0,
          "decimals": 3,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "1/10mm/min",
          "unitStr": "1/10mm/min",
          "unitFactor": 600000,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "inch/s",
          "unitStr": "inch/s",
          "unitFactor": 39.37085375696372,
          "isBaseUnit": 0,
          "decimals": 3,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "ft/min",
          "unitStr": "ft/min",
          "unitFactor": 196.8542687848186,
          "isBaseUnit": 0,
          "decimals": 3,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 1,
      "attrType": "SPEED"
    },
    {
      "attrId": 20,
      "unit": [
        {
          "unitName": "m/s²",
          "unitStr": "m/s²",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "m/min²",
          "unitStr": "m/min²",
          "unitFactor": 3600,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "mm/s²",
          "unitStr": "mm/s²",
          "unitFactor": 1000,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "1/10mm/s²",
          "unitStr": "1/10mm/s²",
          "unitFactor": 10000,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "1/100mm/s²",
          "unitStr": "1/100mm/s²",
          "unitFactor": 100000,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "inch/s²",
          "unitStr": "inch/s²",
          "unitFactor": 39.37085375696372,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "ft/s²",
          "unitStr": "ft/s²",
          "unitFactor": 3.280904479746977,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 1,
      "attrType": "ACCELERATION"
    },
    {
      "attrId": 21,
      "unit": [
        {
          "unitName": "m/s³",
          "unitStr": "m/s³",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 6,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "m/min³",
          "unitStr": "m/min³",
          "unitFactor": 216000,
          "isBaseUnit": 0,
          "decimals": 6,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 1,
      "attrType": "JERK"
    },
    {
      "attrId": 22,
      "unit": [
        {
          "unitName": "Hz",
          "unitStr": "Hz",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "kHz",
          "unitStr": "kHz",
          "unitFactor": 0.001,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "MHz",
          "unitStr": "MHz",
          "unitFactor": 0.000001,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "FREQUENCY"
    },
    {
      "attrId": 23,
      "unit": [
        {
          "unitName": "N",
          "unitStr": "N",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "kN",
          "unitStr": "kN",
          "unitFactor": 0.001,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "MN",
          "unitStr": "MN",
          "unitFactor": 0.000001,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "FORCE"
    },
    {
      "attrId": 24,
      "unit": [
        {
          "unitName": "rpm",
          "unitStr": "rpm",
          "unitFactor": 60,
          "isBaseUnit": 1,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "rps",
          "unitStr": "rps",
          "unitFactor": 1,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "CYCLESPERMINUTE"
    },
    {
      "attrId": 25,
      "unit": [
        {
          "unitName": " ",
          "unitStr": " ",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "NOUNIT"
    },
    {
      "attrId": 26,
      "unit": [
        {
          "unitName": "V",
          "unitStr": "V",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 3,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "mV",
          "unitStr": "mV",
          "unitFactor": 1000,
          "isBaseUnit": 0,
          "decimals": 3,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "ELECTRIC_POTENTIAL"
    },
    {
      "attrId": 27,
      "unit": [
        {
          "unitName": "A",
          "unitStr": "A",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 3,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "ELECTRIC_CURRENT"
    },
    {
      "attrId": 28,
      "unit": [
        {
          "unitName": "kWh",
          "unitStr": "kWh",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 3,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "kJ",
          "unitStr": "kJ",
          "unitFactor": 3600,
          "isBaseUnit": 0,
          "decimals": 1,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "ENERGY"
    },
    {
      "attrId": 29,
      "unit": [
        {
          "unitName": "°/s",
          "unitStr": "°/s",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "°/min",
          "unitStr": "°/min",
          "unitFactor": 60,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "ANGULAR_SPEED"
    },
    {
      "attrId": 30,
      "unit": [
        {
          "unitName": "°/s²",
          "unitStr": "°/s²",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "°/min²",
          "unitStr": "°/min²",
          "unitFactor": 3600,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "ANGULAR_ACCELERATION"
    },
    {
      "attrId": 31,
      "unit": [
        {
          "unitName": "°/s³",
          "unitStr": "°/s³",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "°/min³",
          "unitStr": "°/min³",
          "unitFactor": 216000,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "ANGULAR_JERK"
    },
    {
      "attrId": 32,
      "unit": [
        {
          "unitName": "Nm",
          "unitStr": "Nm",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "TURNINGMOMENT"
    },
    {
      "attrId": 33,
      "unit": [
        {
          "unitName": "l/s",
          "unitStr": "l/s",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "l/min",
          "unitStr": "l/min",
          "unitFactor": 60,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "l/hr",
          "unitStr": "l/hr",
          "unitFactor": 3600,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "VOLUMETRICFLOWRATE"
    },
    {
      "attrId": 34,
      "unit": [
        {
          "unitName": "µS/cm",
          "unitStr": "µS/cm",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "ELECTRICALCONDUCTIVITY"
    },
    {
      "attrId": 35,
      "unit": [
        {
          "unitName": "/(kg*km)",
          "unitStr": "/(kg*km)",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "/(lbs*mi)",
          "unitStr": "/(lbs*mi)",
          "unitFactor": 0.7299875597469365,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "PRICE_PER_WEIGHT_AND_LINEAR_LENGTH"
    },
    {
      "attrId": 36,
      "unit": [
        {
          "unitName": "%/km",
          "unitStr": "%/km",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "%/mi",
          "unitStr": "%/mi",
          "unitFactor": 1.6093470878864442,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "PERCENTAGE_PER_LINEAR_LENGTH"
    },
    {
      "attrId": 37,
      "unit": [
        {
          "unitName": "km",
          "unitStr": "km",
          "unitFactor": 1,
          "isBaseUnit": 1,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        },
        {
          "unitName": "mi",
          "unitStr": "mi",
          "unitFactor": 0.621371,
          "isBaseUnit": 0,
          "decimals": 4,
          "docType": 0,
          "offset": 0
        }
      ],
      "baseUnitIdx": 0,
      "favUnitIdx": 0,
      "attrType": "DISTANCE"
    }
]