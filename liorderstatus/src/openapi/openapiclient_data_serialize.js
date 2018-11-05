export const StyleType = {
    STYLE_PIPEDELIMITED : "STYLE_PIPEDELIMITED",
    STYLE_SPACEDELIMITED: "STYLE_SPACEDELIMITED",
    STYLE_FORM: "STYLE_FORM",
    STYLE_SIMPLE: "STYLE_SIMPLE",
    STYLE_LABEL: "STYLE_LABEL",
    STYLE_MATRIX: "STYLE_MATRIX",    
}

export class OpenApiDataSerialize{
    constructor(data = [], style, queryParam, explode){
        this.data = data;
        this.style = style;
        this.queryParam = queryParam;
        this.explode = explode;
    }

    serializePipeStyle(){
        var tempArray = this.data;
        var result = "";
        tempArray.forEach((element, index) => {
            result += element;
            if(index !== tempArray.length-1){
                result += '|';
            }
        });
        return result;
    }

    serializeSpaceStyle(){
        var tempArray = this.data;
        var result = "";
        tempArray.forEach((element, index) => {
            result += element;
            if(index !== tempArray.length-1){
                result += ' ';
            }
        });
        return encodeURI(result);
    }

    serializeFormStyle(){
        var tempArray = this.data;
        var result = "";
        tempArray.forEach((element, index) => {
            result += element;
            if(index !== tempArray.length-1){
                result += ',';
            }
        });
        return result;
    }

    serializeWithExplode(){
        var tempArray = this.data;
        var result = "";
        tempArray.forEach((element, index) => {
            result += element;
            if(index !== tempArray.length-1){
                result += '&'+this.queryParam+'=';
            }
        });
        return result;
    }

    serializeSimpleStyle(){
        var tempArray = this.data;
        var result = "";
        tempArray.forEach((element, index) => {
            result += element;
            if(index !== tempArray.length-1){
                result += ',';
            }
        });
        return result;
    }

    serializeLabelStyle(){
        var tempArray = this.data;
        var explode = this.explode;
        var result = ".";
        tempArray.forEach((element, index) => {
            result += element; 
            if(index !== tempArray.length-1){
                if(explode){
                    result += '.' ;
                }
                else{
                    result += ',' ;
                }
            }       
        });
        return result;
    }

    serializeMatrixStyle(){
        var tempArray = this.data;
        var explode = this.explode;
        var result = ";"+this.queryParam+"=";
        tempArray.forEach((element, index) => {
            result += element; 
            if(index !== tempArray.length-1){
                if(explode){
                    result += ';'+this.queryParam+'=' ;
                }
                else{
                    result += ',' ;
                }
            }       
        });
        return result;
    }

    serializeCookie(){
        var tempArray = this.data;
        var result = "id=";
        tempArray.forEach((element, index) => {
            result += element;
            if(index !== tempArray.length-1){
                result += ',';
            }
        });
        return result;
    }

    serializeHeader(){
        var tempArray = this.data;
        var result = "";
        tempArray.forEach((element, index) => {
            result += element;
            if(index !== tempArray.length-1){
                result += ',';
            }
        });
        return result;
    }
}