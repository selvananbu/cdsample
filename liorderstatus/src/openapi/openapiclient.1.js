import OpenApiBody from './openapibody'

class OpenApiClient {
    
    constructor(/*host, customer,*/ site, service){
        this.customer = "DEFAULT";
        this.site = site;
        this.service = service;
        this.baseURL = "http://swpdmsrv4.lisec.internal/";
    }

    static serviceMap = new Map();

    logResponse(functionName, response) {
        // console.log(functionName, "====> functionName ==");
        // console.log(response, "====> response ==");
    }

    getBaseUrl(){
        return (encodeURI(this.baseURL));
    }

    getUrl(entities = [], parameters = {}){
        var url = this.baseURL + "openapi/" + this.customer + "/" + this.site + "/" + this.service;
        console.log("#########333",url);
        

        entities.forEach(entity => {
            url += '/' + entity;
        });

        var first = true;

        for(var key in parameters){
            if(first){
                url += '?';
                first = false;
            }   
            else{
                url += '&';
            }
            url += key+ '=' + parameters[key];
        }

        return(encodeURI(url));
    }

    verifyParamIsInteger(par, allowNull = false, enumValues = []){
        if(par === null || par === undefined){
            
           return (allowNull ? true : false);
        }
        if(Number.isInteger(parseInt(par)) &&(enumValues.length === 0 || enumValues.includes(par))){
            return true;
        }
        else{
            return false;
        }
    }

    verifyParamIsStringArray(par, allowNull = false, enumValues = []){
        if(par === null || par === undefined){
            return (allowNull ? true : false);
        }
        else if(par.length > 0){
            for(var i=0;i<par.length;i++){
                if(!this.verifyParamIsString(par[i], false, enumValues)){
                    return false;
                }
            }
        }
        return true;
    }

    verifyParamIsIntegerArray(par, allowNull = false, enumValues = []){
        if(par === null || par === undefined){
            return (allowNull ? true : false);
        }
        else if(par.length > 0){
            for(var i=0;i<par.length;i++){
                if(!this.verifyParamIsInteger(par[i], false, enumValues)){
                    return false;
                }
            }
        }
        return true;
    }

    verifyParamIsString(par, allowNull = false, enumValues = []){
        if(par === null || par === undefined){
           return (allowNull ? true : false);
        }
        if(typeof par === 'string' &&
           (enumValues.length === 0 || enumValues.includes(par))){
            return true;
        }
    }

    verifyBody(body, allowedMimeTypes = []){
        var returnValue = false;
        allowedMimeTypes.forEach(element => {
            if(body.getMimeType() === element){
                returnValue = true;
            }
        });
        return returnValue;
    }
}

export default OpenApiClient;