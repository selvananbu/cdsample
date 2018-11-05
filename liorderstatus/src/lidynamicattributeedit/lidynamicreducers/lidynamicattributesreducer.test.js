import attributeReducer, {
  setAttributeList,
  setFavUnitIndex
} from './lidynamicattributesreducer';

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

describe('attributeReducer', () => {
	it('sets the attribute list', () => {
		expect(attributeReducer([], setAttributeList([attributeLength]))).toEqual([attributeLength])
	})
	it('sets the fav unit index', () => {
		const result = attributeReducer([attributeLength], setFavUnitIndex('LENGTH', 5))
		//const favUnitIdx = result.filter(attr => attr.attr)
		expect(result).toEqual([
			{
				...attributeLength,
				favUnitIdx: 5	
			}
		])
	})
})

describe('setAttributeList', () => {
	it('returns an action', () => {
		expect(setAttributeList([1, 2])).toEqual({
			type: 'SET_ATTRIBUTE_LIST',
			attrList: [1, 2]
		})
	})
})

describe('setFavUnitIndex', () => {
	it('returns an action', () => {
		expect(setFavUnitIndex('LENGTH', 12)).toEqual({
			type: 'SET_FAV_UNIT_INDEX',
			attrType: 'LENGTH',
			favUnitIdx: 12
		})
	})
})