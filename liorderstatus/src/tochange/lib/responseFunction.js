import {AsyncStorage} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64';

export const convertToJSON = (response) => {
    var enc = new TextDecoder("utf-8");
    
    var result = JSON.parse(enc.decode(response));
    
    return result;
}
export const convertToString = (response) => {
    // var enc = new TextDecoder("utf-8");
    var binary = '';
    var result = response;
    var bytes = new Uint8Array(result);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    // var result = atob(response);
    console.log("######################",binary);
    
    return binary;
}


export const convertToBlob = (response, contentType) => {
    var file = new Blob([response], {type:contentType});
    return file;
}
export const convertToUint = (response, contentType) => {
var binary = '';
var result = response;
var bytes = new Uint8Array(result);
var len = bytes.byteLength;
for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
}

    return JSON.parse(binary);
}

export const setStorageItem = async (key, value,callBack) => {
        
        if(value === {}){
            return;
        }
         try {
         await AsyncStorage.setItem(key, JSON.stringify(value),callBack);
         } catch (error) {
             console.log("Errr");
         }

}
export const getStorageItem = async (key,callBack) => {
       
        try {
           const value = await AsyncStorage.getItem(key,callBack);
            if (value !== null) {
                // return JSON.parse(value);
            }
            else{
               console.log("Errr");
            }
        } catch (error) {
            console.log("Errr");
        }

   
}

export const removeStorageItem = async (key) => {

    try {
        const value = await AsyncStorage.removeItem(key);
        if (value !== null) {
            console.log("Removeddd");
            
        } else {
            console.log("Errr");
        }
    } catch (error) {
        console.log("Errr");
    }


}