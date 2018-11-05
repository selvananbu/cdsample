


const validateAttributeValue = (attribute, value) => {
    //var currentposition = event.target.selectionStart;
    //var current = value.slice(0, currentposition) + event.key + value.slice(currentposition);
    if (!isNaN(value)) return true

    var attrValue = value.toLowerCase();
    var currentType = attribute.attrType;
    var units = attribute.unit;
    var breakAttrValue = attrValue.split(/(^[-+]?[0-9]+(\.[0-9]+)?)/g);
    var checkDecimalNegative = breakAttrValue[0].split('');
    //for one space and decimal"
    var inchUnit = breakAttrValue[3].match(/((^")|([1-9]*[0-9]\/?[0-9]*["]?))/g);
    // console.log(breakAttrValue, inchUnit,'check');
    if(currentType === 'LENGTH' && breakAttrValue[3] !== "" && inchUnit !== null && inchUnit[0] === breakAttrValue[3].replace(' ','')){ //?
        if(inchUnit !== null && inchUnit[0] === breakAttrValue[3].replace(' ','')){                           //?
            return true;
        }
        else{
            return false;
        }
    }
    if((breakAttrValue[3] === '.' || breakAttrValue[3] === ' ')){
        return true;
    }
    //for - as first character
    else if(checkDecimalNegative.length > 1 || breakAttrValue[0] !== '-' && breakAttrValue.length === 1){
        return false;
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
            for(var i=0; i< units.length; i++){
                var current = units[i].unitStr.split('');
                // console.log(current[len],'in');
                // console.log(current[len],currentChar);
                //adding all matched to an array
                if(current[len] === currentChar && units[i].unitStr.indexOf(refChar) > -1){
                    index.push(i);
                }
            }
        }
        //console.log(index);
        var check = false;
        if(index.length  === 0){
            return false;
        }
        else{
            for(var k = 0; k< index.length; k++){
                currentNew = units[index[k]].unitStr;
                currentNew = currentNew.split('');
                //console.log(refChar === units[index[k]].unitStr);
                if(currentNew[len] === currentChar){
                    check = true;
                }
                //if matched to unit empty the array
                if(refChar === units[index[k]].unitStr){
                    index = [];
                }
            }
        }
        if(check){
            return true;
        }
        else{
            return false;
        }
    }
}

const validateInch = (fractureStr) => {
  const fractureArr = fractureStr.split('/')
  if (fractureArr.length !== 2) return false
    const fracture = [ Number(fractureArr[0]), Number(fractureArr[1]) ]
  if (isNaN(fracture[0]) || isNaN(fracture[1])) return false
  if (!Number.isInteger(fracture[0]) || !Number.isInteger(fracture[1])) return false
  if (fracture[0] < 0 || fracture[1] < 2) return false
  if (fracture[0] < fracture[1] && Number.isInteger(Math.log2(fracture[1]))) return true
  return false
}



const validateValue = (attribute, value, strict=false) => {
  if (!isNaN(value)) return true // no unit ==> assume fav unit
  if (!strict && value === '.') return true

  const FULL = 0
  const VALUE = 1
  const UNIT = 2

  if(attribute.attrType === 'LENGTH') {
    const patternInch = strict
      ? /^([+-]?(?:[1-9][0-9]* )?[1-9][0-9]*(?:\/[1-9][0-9]*)?) ?(")$/
      : /^([+-]?(?:[1-9][0-9]* )?[1-9][0-9]*\/?(?:[1-9][0-9]*)?) ?("?)$/
    const matchInch = patternInch.exec(value.toLowerCase().trim())
    if(matchInch !== null && matchInch.length === 3) { // handle inch
      if(!strict) return true
      const vals = matchInch[VALUE].split(' ')
      if(vals !== null) {
        if (vals.length === 1 && !isNaN(vals[0])) return true
        if (vals.length === 1 && isNaN(vals[0])) return validateInch(vals[0])
        if (vals.length === 2 && isNaN(vals[1])) return validateInch(vals[1])
      }
    }
  }

  const pattern = strict
    ? /^([+-]?\d*\.?\d+) ?([^"]*)$/
    : /^([+-]?\d*\.?\d*) ?([^"]*)$/

  const match = pattern.exec(value.toLowerCase().trim())
  
  if(match !== null && match.length === 3) {
    if(match[UNIT] === 'inch' && strict) return false  //invalid unit string 'inch'

    // other units
    const unitValues = attribute.unit.map(unit => unit.unitStr)
    if(
         ( strict && unitValues.includes(match[UNIT])
      || (!strict && unitValues.filter(unit => unit.startsWith(match[UNIT])).length > 0))
    ) {
      if(!isNaN(match[VALUE])) return true  // invalid / for decimal separator
    }
  }

  


  return false // all other cases
}

export { validateValue, validateInch }
export default validateAttributeValue