const initial = {
    attrList : [],
    attrValue: "",
    attrType: "",
    attrFavIndex: null,
    attrDecimal: null,
    attrMapAttrId: {},
    unit: {}
}

var index = [];

export default function(state= initial,action){
    switch(action.type){
        case "INIT_ATTR_EDIT":
            state = {...state,
                attrType: action.attrType,
                attrValue: action.value,
                attrList: action.attrList,
                attrDecimal: action.decimal,
            }
            state = mapAttrIdToType(state, state.attrList);
        break;
        case "SET_ATTR_VALUE":
            state = setAttrValue(state, action.payload);
        break;
        case "RESTRICT_ATTR_VALUE":
            validateAttrValue(state, action.event);
        break;
        case "CONVERT_TO_FAV":
            state = convertToFav(state);
        break;
        case "SET_FAV_INDEX":
            state = {...state,
                attrFavIndex: action.value
            }
            state = convertToFav(state);
        break;

    }
    return state;
}

const getNearest = (value) => {
    var sum = 1, val = [];
    for(var i=1; i< 12; i++){
        sum = sum + sum,
        val.push(sum)
    }
    var fraction=val[0];
    for(var k=0; k< val.length; k++){
        if(Math.abs(value - val[k]) < Math.abs(value - fraction)){
            fraction = val[k]
        }
    }
    return fraction
}

const reduce = (numerator,denominator) => {
    var gcd = function gcd(a,b){
      return b ? gcd(b, a%b) : a;
    };
    gcd = gcd(numerator,denominator);
    return [numerator/gcd, denominator/gcd];
}

const convertToFav = (state) => {
    var currentType = state.attrType, flag = 0, convertedValue = 0, inchFlag=0;
    var currentValue = String(state.attrValue).toLowerCase(); // typo
    var fav = state.attrFavIndex;
    var decimal = state.attrDecimal;
    var availableUnit = state.attrMapAttrId[currentType];

    //get the index of fav unit if no fav is set then base unit
    if(fav === null){
        fav = getFav(availableUnit);
    }

    var favUnit = state.attrMapAttrId[currentType][fav]; // get the fav

    if(decimal === null){
        decimal = favUnit.decimals;
    }

    var getUnit = currentValue.split(/(^\-?\d+\.?\d*|\.\d+)/g); //split the value

    var getStatic = currentValue.split(' '); //if no units are passed

    var unitFactor = {};
    if(getUnit.length > 1 ){
        for(var i=0;i < availableUnit.length; i++){
            // var checkInch = getUnit[2].match(/((^"$)|(["](\d*)\/?\d*))/g);
            var checkInch = getUnit[2].match(/((^")|([1-9]*[0-9]*\/*[1-9][0-9]*["]*))/g);
            //console.log(getStatic,availableUnit[i].unitStr);
            if(getStatic[1] === availableUnit[i].unitStr.toLowerCase()){
                unitFactor = availableUnit[i];
            }
            // console.log(checkInch);

            //if the value is in inch and fav is not inch
            if(checkInch !== null && checkInch[0] !== '"' && checkInch[0] === getUnit[2].replace(' ','') && favUnit.unitStr !== 'inch'){
                //console.log('insde*****');
                var convertToDecimal = '';
               // console.log(getUnit,'check');
                convertToDecimal =(getUnit[2]).split('"')
                //console.log(convertToDecimal,'***');
                convertToDecimal = convertToDecimal[0].split('/');

                if(getUnit.length > 3){
                    convertToDecimal =(getUnit[2] + getUnit[3] + getUnit[4] ).split('"');
                    convertToDecimal = convertToDecimal[1].split('/');
                }
                //console.log(convertToDecimal,'***');
                var decimalVal=0;
                if(convertToDecimal[1] !== ''){

                    decimalVal = (eval(convertToDecimal[0]/convertToDecimal[1]));
                    inchFlag = 1;
                }
                //console.log(decimalVal,'***');
                getUnit[1] =eval(parseInt(getUnit[1]) + parseFloat(decimalVal));
            }
            //console.log(getUnit,'/////');

            if((getUnit[2].replace(' ','')) === availableUnit[i].unitStr || ( checkInch !== null && checkInch[0] === getUnit[2].replace(' ','')  && favUnit.unitStr === availableUnit[i].unitStr) && inchFlag === 1 ){
                flag = 1;
                //console.log(getUnit,availableUnit[i], 'check/*/*/*');
                if(favUnit.unitStr === 'inch'){
                    var inchValue = (((parseFloat(getUnit[1])/availableUnit[i].unitFactor)*favUnit.unitFactor)+favUnit.offset).toFixed(decimal);
                    //console.log(inchValue,'check*-*-*-');
                    var breakInch = inchValue.split('.');
                    var fractionValue = getNearest(breakInch[1]);
                    var getReduced = reduce(parseInt(Math.ceil((parseFloat(0 + '.' + breakInch[1]))*fractionValue)), fractionValue);
                    // console.log((parseFloat(breakInch[1]))*fractionValue,'in');
                    if(checkInch !== null && checkInch[0].indexOf('"') !== -1){
                        convertedValue = currentValue;
                    }
                    else{
                        convertedValue = breakInch[0] + ' ' + getReduced[0] + '/' + getReduced[1]+'"';
                    }

                }
                else{
                    //console.log(parseFloat(getUnit[1]),availableUnit[i],availableUnit[i].unitFactor,favUnit.unitFactor,'check');
                    //console.log('insnide');
                    var currentUnitFactor = availableUnit[i].unitFactor;
                    //console.log(checkInch);

                    //if current unit is inch and needs to convert
                    if(checkInch !== null && checkInch[0].indexOf('"') !== -1){
                        currentUnitFactor =  0.03937085375696372;
                    }
                    //console.log(getUnit[1],(((parseFloat(getUnit[1])/currentUnitFactor)*favUnit.unitFactor)+favUnit.offset).toFixed(decimal),'in');
                    convertedValue = (((parseFloat(getUnit[1])/currentUnitFactor)*favUnit.unitFactor)+favUnit.offset).toFixed(decimal) + ' ' + favUnit.unitStr;
                }

                //console.log(convertedValue);
            }
        }

        //if no match found with available unit

        if(flag === 0){
            if(favUnit.unitStr === 'inch'){
                var breaakDecimal = (getUnit[2].replace(' ','')).replace('"','').split('/');
                //console.log(breaakDecimal);
                if(breaakDecimal.length > 0 && breaakDecimal[0] !== ''){
                    var getReduced = reduce(parseInt(breaakDecimal[0]), parseInt(breaakDecimal[1]));
                    convertedValue = getUnit[1]+ ' '+ getReduced[0]+ '/' + getReduced[1]+'"';
                }
                else{
                    var convertedValue = (getUnit[1]);
                    var currentUnit = unitFactor.unitFactor !== undefined? unitFactor.unitFactor : 1;
                    var currentUnitOffset = unitFactor.offset !== undefined? unitFactor.offset : 0;
                    var sign = 0;
                    //console.log(unitFactor,favUnit,'*****');
                    //if offset is availble and convert to base unit so subtract offset
                    if(unitFactor.offest > favUnit.offset && unitFactor.offset !== undefined){
                        //console.log(sign,'/*/*/*');
                        sign = -1 *unitFactor.offset;
                        convertedValue = ((((parseFloat(getUnit[1])  + (sign) )/currentUnit) * favUnit.unitFactor )).toFixed(decimal);
                    }
                    else{
                        sign = 1 * favUnit.offset;
                        convertedValue = ((((parseFloat(getUnit[1]) - currentUnitOffset )/currentUnit) * favUnit.unitFactor ) + (sign) ).toFixed(decimal);
                    }
                    //console.log(convertedValue);
                    var breakInch = convertedValue.split('.');
                    //console.log(breakInch);
                    var fractionValue = getNearest(breakInch[1]);
                    //console.log(fractionValue,'check');
                    var getReduced = reduce(parseInt(Math.ceil((parseFloat(0 + '.' + breakInch[1]))*fractionValue)), fractionValue);
                    //console.log(getReduced,'check**');
                    convertedValue = breakInch[0] + ' ' + getReduced[0] + '/' + getReduced[1]+'"';
                }
            }
            else{
                var currentUnit = unitFactor.unitFactor !== undefined? unitFactor.unitFactor : 1;
                var currentUnitOffset = unitFactor.offset !== undefined? unitFactor.offset : 0;
                var sign = 0;
                //console.log(unitFactor,favUnit,'*****');
                //if offset is availble and convert to base unit so subtract offset
                if(unitFactor.offest > favUnit.offset && unitFactor.offset !== undefined){
                    //console.log(sign,'/*/*/*');
                    sign = -1 *unitFactor.offset;
                    convertedValue = ((((parseFloat(getUnit[1])  + (sign) )/currentUnit) * favUnit.unitFactor )).toFixed(decimal) + ' ' + favUnit.unitStr;
                }
                else{
                    sign = 1 * favUnit.offset;
                    convertedValue = ((((parseFloat(getUnit[1]) - currentUnitOffset )/currentUnit) * favUnit.unitFactor ) + (sign) ).toFixed(decimal) + ' ' + favUnit.unitStr;
                }
                //console.log(convertedValue,'in1');


            }
        }
    }

    else{
        // var favBase = getFav(availableUnit);
        // var favUnitBase = state.attrMapAttrId[currentType][favBase];
        if(favUnit.unitStr === 'inch'){
            convertedValue = 0 + '"';
        }
        else{
            convertedValue = parseFloat(0).toFixed(decimal) + ' ' + favUnit.unitStr;
        }
    }
    //console.log(convertedValue,'in2');
    state = {...state,
        attrValue: convertedValue
    }
    return state;
}

const getFav = (unit) => {
    for(var i=0; i< unit.length; i++){
        if(unit[i].isBaseUnit === 1){
            return i;
        }
    }
}

// const getDecimal = (unit) => {
//     for(var i=0; i< unit.length; i++){
//         if(unit[i].isBaseUnit === 1){
//             return unit[i].decimals;
//         }
//     }
// }

const mapAttrIdToType = (state, attrList) => {
    var attrType = {};
    attrList.map((attr) => {
        attrType[attr.attrType] = attr.unit;
    });
    state = {...state,
        attrMapAttrId: attrType
    }
    return state;
}

const setAttrValue = (state,attrValue) => {

    state = {...state,
        attrValue: attrValue
    }
    return state;
}

const validateAttrValue = (state,event) => {
    var currentposition = event.target.selectionStart;
    var current = state.attrValue.slice(0, currentposition) + event.key + state.attrValue.slice(currentposition);
    var attrValue = current.toLowerCase();
    var currentType = state.attrType;
    var availableUnit = state.attrMapAttrId[currentType];
    var breakAttrValue = attrValue.split(/(^[-+]?[0-9]+(\.[0-9]+)?)/g);
    var checkDecimalNegative = breakAttrValue[0].split('');
    //for one space and decimal"
    var inchUnit = breakAttrValue[3].match(/((^")|([1-9]*[0-9]\/?[0-9]*["]?))/g);
    // console.log(breakAttrValue, inchUnit,'check');
    if(currentType === 'LENGTH' && breakAttrValue[3] !== "" && inchUnit !== null && inchUnit[0] === breakAttrValue[3].replace(' ','')){
        if(inchUnit !== null && inchUnit[0] === breakAttrValue[3].replace(' ','')){
            return true;
        }
        else{
            return event.preventDefault();
        }
    }
    if((breakAttrValue[3] === '.' || breakAttrValue[3] === ' ')){
        return true;
    }
    //for - as first character
    else if(checkDecimalNegative.length > 1 || breakAttrValue[0] !== '-' && breakAttrValue.length === 1){
        return event.preventDefault();
    }
    var unit = (attrValue.split(breakAttrValue[1]));
    //for first character . or -
    var currentNew = '';
    if(unit.length > 1 && unit[1] !== ""){
        var refChar = (unit[1].replace(' ',''));
        var char = (unit[1].replace(' ','')).split('');
        var len = char.length-1;
        var currentChar = char[len];
        //console.log(index);
        if(len === 0 || index.length >= 0){
            index = [];
            for(var i=0; i< availableUnit.length; i++){
                var current = availableUnit[i].unitStr.split('');
                // console.log(current[len],'in');
                // console.log(current[len],currentChar);
                //adding all matched to an array
                if(current[len] === currentChar && availableUnit[i].unitStr.indexOf(refChar) > -1){
                    index.push(i);
                }
            }
        }
        //console.log(index);
        var check = false;
        if(index.length  === 0){
            return event.preventDefault();
        }
        else{
            for(var k = 0; k< index.length; k++){
                currentNew = availableUnit[index[k]].unitStr;
                currentNew = currentNew.split('');
                //console.log(refChar === availableUnit[index[k]].unitStr);
                if(currentNew[len] === currentChar){
                    check = true;
                }
                //if matched to unit empty the array
                if(refChar === availableUnit[index[k]].unitStr){
                    index = [];
                }
            }
        }
        if(check){
            return true;
        }
        else{
            return event.preventDefault();
        }
    }
}
