import OpenApiBody from './openapibody'
import * as LocalSettings from '../lib/localsettings';

class OpenApiClient {
    
    constructor(/*host, customer,*/ site, service){
        this.customer = "default";
        this.site = site;
        this.service = service;
        this.baseURL =  LocalSettings.getStorageItem("config.baseurl");
    }

    static serviceMap = new Map();

    logResponse(functionName, response) {
        // console.log(functionName, "====> functionName ==");
        // console.log(response, "====> response ==");
    }

    getBaseUrl(){
        return (encodeURI(LocalSettings.getStorageItem("config.baseurl")));
    }

    getUrl(entities = [], parameters = {}){
        var url = LocalSettings.getStorageItem("config.baseurl") + "openapi/" + this.customer + "/" + this.site + "/" + this.service;

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