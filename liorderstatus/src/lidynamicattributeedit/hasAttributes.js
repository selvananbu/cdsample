import { connect } from 'react-redux'
import React from 'react'

/*import {
  setAttributeList,
  setFavUnitIndex,
} from './lidynamicreducers/lidynamicattributesreducer';*/
import convertToFav, { getBaseUnit } from '../utils/convert';
import { writeFavIndex, loadFavIndex } from '../utils/attribute-access'
import { validateValue, validateValueStrict } from '../utils/restrict'

const mapStateToProps = state =>  ({
	changeOpen: state.changeOpen
})



const mapDispatchToProps = dispatch => ({
	/*setFavIndex: (type, index) => {
		dispatch(setFavUnitIndex(type, index))
		// write attribute
		writeFavIndex(type, index)
	},
	setAttributeList: (attributeList) => dispatch(setAttributeList(attributeList))*/
	incrementChangeOpen: () => dispatch({type: 'changeOpen'})

})

const getAttribute = (list, type) => {
	const attribute = list.filter(attr => attr.attrType === type)
	return (attribute.length === 1) ? attribute[0] : null
}

const wrapBaseValue = (attribute, value) => {
	if (isNaN(value)) return value
	// console.warn(value)
	const baseUnit = getBaseUnit(attribute).unitStr
	// console.warn(baseUnit)
	const baseValue = value.toString() + ' ' + ((baseUnit === 'inch') ? '"' : baseUnit)
	
	return baseValue
}

//var loading = false

const hasAttributes = (LC) => {
	return connect(
		mapStateToProps,
		mapDispatchToProps
	)((props) => {
		/*if(props.attrList.length < 1 && loading === false) {
			loading = true
			retrieveAttributes()  // retrieveAttributeList()
			.then(attributeList => {
				props.setAttributeList(attributeList)
				loading = false
			})
		}*/
		// console.error(getAttribute(props.attrList, 'LENGTH'))
		//if(props.attrList.length < 1) return null
		return (
			<LC {...props}
				convertToFav  ={(value, attribute, decimals=null) => convertToFav(attribute, value, decimals) }
				validateValue ={(value, attribute) => validateValue(attribute, value) }
				validateStrict={(value, attribute) => validateValueStrict(attribute, value) }
				wrapBaseValue ={(value, attribute) => wrapBaseValue(attribute, value) }
				getAttribute  ={(list, type)  => getAttribute(list, type) }
				writeFavIndex ={async (type, index) => await writeFavIndex(type, index) }
				loadFavIndex  ={(type) => loadFavIndex(type) }
				/>
		)
	})
	
}

export default hasAttributes
