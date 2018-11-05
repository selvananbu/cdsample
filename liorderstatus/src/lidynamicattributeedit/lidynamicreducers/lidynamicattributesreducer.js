const SET_ATTRIBUTE_LIST = 'SET_ATTRIBUTE_LIST'
const SET_FAV_INDEX = 'SET_FAV_UNIT_INDEX'

const setAttributeList = (list) => ({
	type: SET_ATTRIBUTE_LIST,
	attrList: list
})

const setFavUnitIndex = (attrType, favIndex) => ({
	type: SET_FAV_INDEX,
	attrType: attrType,
	favUnitIdx: favIndex
})


const attributesReducer = (attrList=[], action) => {
	switch(action.type) {
		case SET_ATTRIBUTE_LIST:
			return action.attrList
		case SET_FAV_INDEX:
			return attrList.map(attr => 
				attr.attrType === action.attrType
				? {
					...attr,
					favUnitIdx: action.favUnitIdx
				}
				: attr
			)
		default:
			return attrList
	}
}


export { setAttributeList, setFavUnitIndex }
export default attributesReducer
