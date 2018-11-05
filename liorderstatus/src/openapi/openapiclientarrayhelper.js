import { MimeTypes } from './openapibody';
import { StyleType, OpenApiDataSerialize } from './openapiclient_data_serialize';

export default class OpenApiClientArrayHelper{

    static GET_QUERY_serialized_array(data = [], style, queryParam = null, explode = false){
        var obj = new OpenApiDataSerialize(data, style, queryParam, explode);
        var serializedData = "";
        if(explode){
            serializedData =  obj.serializeWithExplode();
        }
        else{
            switch(style){
                case StyleType.STYLE_PIPEDELIMITED: serializedData = obj.serializePipeStyle(); break;
                case StyleType.STYLE_SPACEDELIMITED: serializedData = obj.serializeSpaceStyle(); break;
                case StyleType.STYLE_FORM: serializedData = obj.serializeFormStyle(); break;
            }
        }
        return serializedData;
    }

    static GET_PATH_serialized_array(data = [], style, queryParam = null, explode = false){
        var obj = new OpenApiDataSerialize(data, style, queryParam, explode);
        var serializedData = "";
        switch(style){
            case StyleType.STYLE_SIMPLE: serializedData = obj.serializeSimpleStyle(); break;
            case StyleType.STYLE_LABEL: serializedData = obj.serializeLabelStyle(); break;
            case StyleType.STYLE_MATRIX: serializedData = obj.serializeMatrixStyle(); break;
        }
        return serializedData;
    }

    static GET_COOKIES(data = []){
        var obj = new OpenApiDataSerialize(data);
        var serializedData = obj.serializeCookie();
        return serializedData;
    }

    static GET_HEADERS(data = []){
        var obj = new OpenApiDataSerialize(data);
        var serializedData = obj.serializeHeader();
        return serializedData;
    }

}