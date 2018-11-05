import {AsyncStorage} from 'react-native';
import {Mutex} from 'async-mutex';
var localValues = new Map();
const mutex = new Mutex();


export const initializeLocalSettings = (functionAfterTokenisValid) => {
       mutex
           .acquire()
           .then(async function (release) {
       let promisesToMake =  [getAllKeys()];
        Promise.all(promisesToMake.map(p => p.catch((error) => error)))
            .then(async function (results) {
                console.log('====================================',results);

                let promiseInner = [getAllValues(results[0])];
                   Promise.all(promiseInner.map(p => p.catch((error) => error)))
                       .then(async function (resultsInner) {
                           console.log("All calls done......", resultsInner);
                           
                             release();
                             functionAfterTokenisValid();
                       })
              
            })
    })
}
const getAllValues = async (array) => {
    await Promise.all(array.map(async (item) => {
        var abc = await getItems(item);
        return abc;
    }));
}
const getItems = async (item) => {
   const value = await AsyncStorage.getItem(item);
   if (value !== null) {
       var valueTemp = JSON.parse(value);
       localValues.set(item,valueTemp)
      return JSON.parse(value);
   }
   else{
       console.log("Errrrr");
       
   }

}
const getAllKeys = async () => {
    return await AsyncStorage.getAllKeys();
}
const setAsyncStorage = async (key, value) => {
        
        if(value === {}){
            return;
        }
         try {
         await AsyncStorage.setItem(key, JSON.stringify(value));
         } catch (error) {
             console.log("Errr");
         }

}
const removeAsyncStorage = async (key, value) => {
    await AsyncStorage.removeItem(key);
}

export const setStorageItem = (key,value) => {
    localValues.set( key,value);
    setAsyncStorage(key, value);
}

export const removeStorageItem = (key) => {

        localValues.delete(key);
        removeAsyncStorage(key);
}

export const getStorageItem = (key) => {
    
    return localValues.get(key);
}

export const Test = (Item) => {
    console.log('====================================');
    console.log(localValues);
    console.log('====================================');
    // for (var key of localValues.keys()) {
    //     console.log(key, Item);
    // }
}
