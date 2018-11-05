import OpenApiClient_auth from '../openapi/openapiclient_auth';
import {Mutex} from 'async-mutex';
import * as commonFunction from '../lib/responseFunction';
import {decode as atob, encode as btoa} from 'base-64';
import * as LocalSettings from '../lib/localsettings';


// import createHistory from 'history/createBrowserHistory';

const mutex = new Mutex();
var newRefreshToken = '';
// const history = createHistory();

const ensureAccessTokenIsValid =  (functionAfterTokenisValid) => {
    mutex
    .acquire()
    .then(async function(release) {
       
        
        let siteName = LocalSettings.getStorageItem("config.sitename");
        let accessToken = LocalSettings.getStorageItem("config.accessToken." + siteName);
        let refreshToken = LocalSettings.getStorageItem("config.refreshToken." + siteName);
        let username = LocalSettings.getStorageItem("config.username");
       

                var isValid = checkAccessTokenIsValid(accessToken);
                 console.log('====================================');
                 console.log(isValid);
                 console.log('====================================');
                if (!isValid) {
                    var promisesToMake = [refreshAuthCall(refreshToken, username)];

                    Promise.all(promisesToMake.map(p => p.catch((err) => err)))
                        .then(async function (results) {
                            //release();
                            //functionAfterTokenisValid(accessToken);

                            //let refreshedAccessToken = await commonFunction.getStorageItem("config.accessToken." + siteName);
                            console.log("--------- ALL CALLS COMPLETED ---------", newRefreshToken);
                            if (checkAccessTokenIsValid(newRefreshToken)) {
                                release();
                                functionAfterTokenisValid(newRefreshToken);
                            } else {
                                // add some logging
                                release();
                            }
                        });
                } else {
                    release();
                    functionAfterTokenisValid(accessToken);
                }
      
    }); // mutex - Acquire
}

const checkAccessTokenIsValid = (accessToken) => {
    if(accessToken === undefined || accessToken === null) return false;
    if (accessToken.length > 0) {
            let parts = accessToken.split(".");
            if(parts.length !== 3)
            {
                console.error("Invalid access token");
                return false;
            }

            var decodedPayload = decodeToken(parts[1]); 
            var timeDiffMillis = (decodedPayload.exp * 1000) - Date.now();
            var timeDiffSec = Math.floor(timeDiffMillis/1000); // in seconds

            console.log("timeDiffSec: ", timeDiffSec);
            return (timeDiffSec > 60 ? true : false);
    }
    return false;
    
}

const decodeToken = (tokenPart) => {
    var playload = JSON.parse(atob(tokenPart));
    return(playload); 
}

const getSiteName = async  () => {
    return await commonFunction.getStorageItem("config.sitename");
}

const refreshAuthCall = async (refreshToken, username) => {
    let siteName = LocalSettings.getStorageItem("config.sitename");
    return OpenApiClient_auth.getClient(siteName).PUT_tokens(callbackRefreshAuth, null, refreshToken, null, username, null, siteName, null, "DEFAULT");
}

const callbackRefreshAuth = async (responseData) => {
    
    if (responseData.state.response !== undefined) {
        if (responseData.state.response.status === 200) {
            console.log('====================================');
            console.log("Came hereeee", responseData.state.response);
            console.log('====================================');
            newRefreshToken =  commonFunction.convertToString(responseData.state.response.data); // plain text format.. no JSON conversion required

            if(newRefreshToken !== undefined && newRefreshToken !== {}){
                         var siteName = LocalSettings.getStorageItem("config.sitename");
                         console.log('New Access Token set', newRefreshToken, "config.accessToken." + siteName);
                            LocalSettings.setStorageItem("config.accessToken." + siteName, newRefreshToken);
                         }
                         else if (responseData.state.response.response.status === 405) {
                             console.error(responseData.state.response.response.statusText + " :: Failed to refresh");

                            var siteName = LocalSettings.getStorageItem("config.sitename");
                            LocalSettings.removeStorageItem("config.loggedin");
                            LocalSettings.removeStorageItem("config.refreshToken." + siteName);
                            LocalSettings.removeStorageItem("config.accessToken." + siteName);

                             // history.push("/");
                             // history.go(0);
                         } else if (responseData.state.response.response.status === 406) {
                             console.error(responseData.state.response.response.statusText + " :: Failed to load or verify");

                             // history.push("./");
                             // history.go(0);
                         } else {
                             console.error("Error in refresh auth");
                         }
            }
            
        
    }
    else {
        console.log("RESPONSE : " + responseData.state.response);
    }
}

export {ensureAccessTokenIsValid, getSiteName};
