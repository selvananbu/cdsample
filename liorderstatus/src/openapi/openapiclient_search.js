import { Component } from 'react';
import axios from 'axios';

import OpenApiClient from './openapiclient';
import OpenApiException from './openapiexception';
import { MimeTypes } from './openapibody';
import OpenApiResponse from './openapiresponse';
import OpenApiClientArrayHelper from './openapiclientarrayhelper';
import { ensureAccessTokenIsValid } from '../lilayoutauthentication/authutil';

var Qs = require('qs');

export const SEARCH_DATA_TYPE_TABLE = "table";
export const SEARCH_DATA_TYPE_XLSX = "xlsx";


class OpenApiClient_search extends OpenApiClient {

    constructor(site) {
        super(site, OpenApiClient_search.getServiceName());
    }

    static getClient(site) {
        var key = site + "." + OpenApiClient_search.getServiceName();
        var service = OpenApiClient.serviceMap.get(key);

        if(service == undefined)
        {
            service = new OpenApiClient_search(site);
            OpenApiClient.serviceMap.set(key, service);
        }
        return service;
    }

    static getServiceName() {
        return 'search';
    }


    GET_languages(callback) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['languages']),
                    method: 'get',
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
                        self.logResponse('GET_languages', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_languages', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_languages', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_attributes(callback) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['attributes']),
                    method: 'get',
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
                        self.logResponse('GET_attributes', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_attributes', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_attributes', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_texts_langID3(callback, langID3, text_no, version = null) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(langID3, false, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsIntegerArray(text_no, false, [])) {
                    throw new OpenApiException("Parameter is not a valid integer array!");
                }
                
                if (!self.verifyParamIsString(version, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(text_no !== null) queryParams['text_no'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(text_no, "STYLE_PIPEDELIMITED", "text_no", false);
                if(version !== null) queryParams['version'] = version;
                const config = {
                    url: self.getUrl(['texts', langID3]),
                    method: 'get',
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
                        self.logResponse('GET_texts_langID3', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_texts_langID3', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_texts_langID3', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_combo_choices(callback, type = null) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsIntegerArray(type, true, [])) {
                    throw new OpenApiException("Parameter is not a valid integer array!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(type !== null) queryParams['type'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(type, "STYLE_PIPEDELIMITED", "type", false);
                const config = {
                    url: self.getUrl(['combo_choices']),
                    method: 'get',
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
                        self.logResponse('GET_combo_choices', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_combo_choices', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_combo_choices', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_searches(callback) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['searches']),
                    method: 'get',
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
                        self.logResponse('GET_searches', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_searches', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_searches', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_searches_searchID_columns(callback, searchID) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(searchID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['searches', searchID, 'columns']),
                    method: 'get',
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
                        self.logResponse('GET_searches_searchID_columns', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_searches_searchID_columns', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_searches_searchID_columns', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_searches_searchID_langID3_rows(callback, body, searchID, langID3, column) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                if (!self.verifyParamIsInteger(searchID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsString(langID3, false, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsIntegerArray(column, false, [])) {
                    throw new OpenApiException("Parameter is not a valid integer array!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                if(column !== null) queryParams['column'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(column, "STYLE_PIPEDELIMITED", "column", false);
                const config = {
                    url: self.getUrl(['searches', searchID, langID3, 'rows']),
                    method: 'patch',
                    data: body.getContent(),
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
                        self.logResponse('PATCH_searches_searchID_langID3_rows', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PATCH_searches_searchID_langID3_rows', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PATCH_searches_searchID_langID3_rows', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_searches_searchID_langID3_data_type(callback, body, searchID, langID3, data_type, column) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                if (!self.verifyParamIsInteger(searchID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsString(langID3, false, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsString(data_type, false, [SEARCH_DATA_TYPE_TABLE, SEARCH_DATA_TYPE_XLSX])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsIntegerArray(column, false, [])) {
                    throw new OpenApiException("Parameter is not a valid integer array!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                if(column !== null) queryParams['column'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(column, "STYLE_PIPEDELIMITED", "column", false);
                const config = {
                    url: self.getUrl(['searches', searchID, langID3, data_type]),
                    method: 'patch',
                    data: body.getContent(),
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
                        self.logResponse('PATCH_searches_searchID_langID3_data_type', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PATCH_searches_searchID_langID3_data_type', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PATCH_searches_searchID_langID3_data_type', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
}

export default OpenApiClient_search;
