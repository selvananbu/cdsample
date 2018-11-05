export const initAttribute = (attrType, value, decimal, attrList) => {
    return {
        type: 'INIT_ATTR_EDIT',
        attrType: attrType,
        value: value,
        attrList: attrList,
        decimal: decimal,
    }
}

export const setAttrValue = (value) => {
    return {
        type: 'SET_ATTR_VALUE',
        payload: value
    }
}

export const restrictAttrValue = (event) => {
    return {
        type: 'RESTRICT_ATTR_VALUE',
        event: event,
    }
}

export const convertToFav = (event) => {
    return {
        type: 'CONVERT_TO_FAV'
    }
}

export const setFavIndex = (value) => {
    return {
        type: 'SET_FAV_INDEX',
        value: value
    }
}
