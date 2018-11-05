import { Component } from 'react';
import axios from 'axios';

import OpenApiClient from './openapiclient';
import OpenApiException from './openapiexception';
import { MimeTypes } from './openapibody';
import OpenApiResponse from './openapiresponse';
import OpenApiClientArrayHelper from './openapiclientarrayhelper';
import { ensureAccessTokenIsValid } from '../lilayoutauthentication/authutil';
var Qs = require('qs');

class OpenApiClient_auth extends OpenApiClient {

    constructor(site) {
        super(site, OpenApiClient_auth.getServiceName());
    }

    static getClient(site) {
        var key = site + "." + OpenApiClient_auth.getServiceName();
        var service = OpenApiClient.serviceMap.get(key);

        if(service == undefined)
        {
            service = new OpenApiClient_auth(site);
            OpenApiClient.serviceMap.set(key, service);
        }
        return service;
    }

    static getServiceName() {
        return 'auth';
    }


    GET_sites = (callback)  =>{
        var self = this;
            try {
                var headers = {};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['sites'], queryParams),
                    method: 'get',
                    responseType: 'arraybuffer',
                    headers: headers,
                    onUploadProgress: function (progressEvent) {
                        console.log(progressEvent,'in progress');
                    },
                    onDownloadProgress: function (progressEvent) {
                        console.log(progressEvent, 'completed');
                    }
                }
                console.log("#####################",config.url);
                return axios.request(config)
                    .then(function(response) {
                        self.logResponse('GET_sites', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_sites', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_sites', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
    }
    
    POST_tokens(callback, userQuery = null, passwordQuery = null, userHeader = null, passwordHeader = null) {
        
        var self = this;
            try {
                if (!self.verifyParamIsString(userQuery, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsString(passwordQuery, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsString(userHeader, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsString(passwordHeader, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {};
                var queryParams = {};
                if(userQuery !== null) queryParams['userQuery'] = userQuery;
                if(passwordQuery !== null) queryParams['passwordQuery'] = passwordQuery;
                if(userHeader !== null) headers['userHeader'] = userHeader;
                if(passwordHeader !== null) headers['passwordHeader'] = passwordHeader;
                
                const config = {
                    url: self.getUrl(['tokens']),
                    method: 'post',
                    responseType: 'arraybuffer',
                    headers: headers, 
                    params: queryParams,
                    paramsSerializer: function(params) {
                        return Qs.stringify(params, {arrayFormat: 'brackets'})
                    },
                    onUploadProgress: function (progressEvent) {
                        console.log(progressEvent,'in progress');
                    },
                    onDownloadProgress: function (progressEvent) {
                        console.log(progressEvent, 'completed');
                    }
                }
                return axios.request(config)
                    .then(function(response) {
                        self.logResponse('POST_tokens', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('POST_tokens', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('POST_tokens', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
    }
    
    PUT_tokens(callback, refreshTokenQuery = null, refreshTokenHeader = null, userQuery = null, userHeader = null, remoteSiteQuery = null, remoteSiteHeader = null, companyQuery = null, companyHeader = null) {
        
        var self = this;
            try {
                if (!self.verifyParamIsString(refreshTokenQuery, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsString(refreshTokenHeader, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsString(userQuery, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsString(userHeader, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsString(remoteSiteQuery, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsString(remoteSiteHeader, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsString(companyQuery, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsString(companyHeader, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {};
                var queryParams = {};
                if(refreshTokenQuery !== null) queryParams['refreshTokenQuery'] = refreshTokenQuery;
                if(refreshTokenHeader !== null) headers['refreshTokenHeader'] = refreshTokenHeader;
                if(userQuery !== null) queryParams['userQuery'] = userQuery;
                if(userHeader !== null) headers['userHeader'] = userHeader;
                if(remoteSiteQuery !== null) queryParams['remoteSiteQuery'] = remoteSiteQuery;
                if(remoteSiteHeader !== null) headers['remoteSiteHeader'] = remoteSiteHeader;
                if(companyQuery !== null) queryParams['companyQuery'] = companyQuery;
                if(companyHeader !== null) headers['companyHeader'] = companyHeader;
                const config = {
                    url: self.getUrl(['tokens'], queryParams),
                    method: 'put',
                    responseType: 'arraybuffer',
                    headers: headers,
                    params: queryParams,
                    paramsSerializer: function(params) {
                        return Qs.stringify(params, {arrayFormat: 'brackets'})
                    },
                    onUploadProgress: function (progressEvent) {
                        // console.log(progressEvent,'in progress');
                    },
                    onDownloadProgress: function (progressEvent) {
                        // console.log(progressEvent, 'completed');
                    }
                }
                return axios.request(config)
                    .then(function(response) {
                        // self.logResponse('PUT_tokens', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        // self.logResponse('PUT_tokens', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PUT_tokens', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
    }
    
    DELETE_tokens(callback, refreshTokenQuery = null, refreshTokenHeader = null) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(refreshTokenQuery, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsString(refreshTokenHeader, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(refreshTokenQuery !== null) queryParams['refreshTokenQuery'] = refreshTokenQuery;
                if(refreshTokenHeader !== null) headers['refreshTokenHeader'] = refreshTokenHeader;
                const config = {
                    url: self.getUrl(['tokens'], queryParams),
                    method: 'delete',
                    responseType: 'arraybuffer',
                    headers: headers,
                    params: queryParams,
                    paramsSerializer: function(params) {
                        return Qs.stringify(params, {arrayFormat: 'brackets'})
                    },
                    onUploadProgress: function (progressEvent) {
                        // console.log(progressEvent,'in progress');
                    },
                    onDownloadProgress: function (progressEvent) {
                        // console.log(progressEvent, 'completed');
                    }
                }
                return axios.request(config)
                    .then(function(response) {
                        // self.logResponse('DELETE_tokens', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        // self.logResponse('DELETE_tokens', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                // self.logResponse('DELETE_tokens', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_tokens(callback, accessTokenQuery = null, accessTokenHeader = null) {
        
        var self = this;
            try {
                if (!self.verifyParamIsString(accessTokenQuery, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsString(accessTokenHeader, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {};
                var queryParams = {};
                if(accessTokenQuery !== null) queryParams['accessTokenQuery'] = accessTokenQuery;
                if(accessTokenHeader !== null) headers['accessTokenHeader'] = accessTokenHeader;
                const config = {
                    url: self.getUrl(['tokens'], queryParams),
                    method: 'get',
                    responseType: 'arraybuffer',
                    headers: headers,
                    params: queryParams,
                    paramsSerializer: function(params) {
                        return Qs.stringify(params, {arrayFormat: 'brackets'})
                    },
                    onUploadProgress: function (progressEvent) {
                        console.log(progressEvent,'in progress');
                    },
                    onDownloadProgress: function (progressEvent) {
                        console.log(progressEvent, 'completed');
                    }
                }
                return axios.request(config)
                    .then(function(response) {
                        self.logResponse('GET_tokens', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_tokens', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_tokens', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
    }
    
    GET_hash_algorithm(callback, user) {
        
        var self = this;
            try {
                if (!self.verifyParamIsString(user, false, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {};
                var queryParams = {};
                if(user !== null) queryParams['user'] = user;
                const config = {
                    url: self.getUrl(['hash_algorithm'], queryParams),
                    method: 'get',
                    responseType: 'arraybuffer',
                    headers: headers,
                    params: queryParams,
                    paramsSerializer: function(params) {
                        return Qs.stringify(params, {arrayFormat: 'brackets'})
                    },
                    onUploadProgress: function (progressEvent) {
                        console.log(progressEvent,'in progress');
                    },
                    onDownloadProgress: function (progressEvent) {
                        console.log(progressEvent, 'completed');
                    }
                }
                return axios.request(config)
                    .then(function(response) {
                        self.logResponse('GET_hash_algorithm', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_hash_algorithm', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_hash_algorithm', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
    }
    
    GET_lock_sessions(callback, sessionToken) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(sessionToken, false, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(sessionToken !== null) headers['sessionToken'] = sessionToken;
                const config = {
                    url: self.getUrl(['lock_sessions'], queryParams),
                    method: 'get',
                    responseType: 'arraybuffer',
                    headers: headers,
                    onUploadProgress: function (progressEvent) {
                        console.log(progressEvent,'in progress');
                    },
                    onDownloadProgress: function (progressEvent) {
                        console.log(progressEvent, 'completed');
                    }
                }
                return axios.request(config)
                    .then(function(response) {
                        self.logResponse('GET_lock_sessions', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_lock_sessions', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_lock_sessions', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    POST_lock_sessions(callback, sessionToken) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(sessionToken, false, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(sessionToken !== null) headers['sessionToken'] = sessionToken;
                const config = {
                    url: self.getUrl(['lock_sessions'], queryParams),
                    method: 'post',
                    responseType: 'arraybuffer',
                    headers: headers,
                    onUploadProgress: function (progressEvent) {
                        console.log(progressEvent,'in progress');
                    },
                    onDownloadProgress: function (progressEvent) {
                        console.log(progressEvent, 'completed');
                    }
                }
                return axios.request(config)
                    .then(function(response) {
                        self.logResponse('POST_lock_sessions', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('POST_lock_sessions', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('POST_lock_sessions', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PUT_lock_sessions(callback, sessionToken) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(sessionToken, false, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(sessionToken !== null) headers['sessionToken'] = sessionToken;
                const config = {
                    url: self.getUrl(['lock_sessions'], queryParams),
                    method: 'put',
                    responseType: 'arraybuffer',
                    headers: headers,
                    onUploadProgress: function (progressEvent) {
                        console.log(progressEvent,'in progress');
                    },
                    onDownloadProgress: function (progressEvent) {
                        console.log(progressEvent, 'completed');
                    }
                }
                return axios.request(config)
                    .then(function(response) {
                        self.logResponse('PUT_lock_sessions', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PUT_lock_sessions', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PUT_lock_sessions', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    DELETE_lock_sessions(callback, sessionToken) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(sessionToken, false, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(sessionToken !== null) headers['sessionToken'] = sessionToken;
                const config = {
                    url: self.getUrl(['lock_sessions'], queryParams),
                    method: 'delete',
                    responseType: 'arraybuffer',
                    headers: headers,
                    onUploadProgress: function (progressEvent) {
                        console.log(progressEvent,'in progress');
                    },
                    onDownloadProgress: function (progressEvent) {
                        console.log(progressEvent, 'completed');
                    }
                }
                return axios.request(config)
                    .then(function(response) {
                        self.logResponse('DELETE_lock_sessions', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('DELETE_lock_sessions', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('DELETE_lock_sessions', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
}

export default OpenApiClient_auth;
