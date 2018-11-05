import { Component } from 'react';
import axios from 'axios';

import OpenApiClient from './openapiclient';
import OpenApiException from './openapiexception';
import { MimeTypes } from './openapibody';
import OpenApiResponse from './openapiresponse';
import OpenApiClientArrayHelper from './openapiclientarrayhelper';
import { ensureAccessTokenIsValid } from '../lilayoutauthentication/authutil';

var Qs = require('qs');



class OpenApiClient_editor extends OpenApiClient {

    constructor(site) {
        super(site, OpenApiClient_editor.getServiceName());
    }

    static getClient(site) {
        var key = site + "." + OpenApiClient_editor.getServiceName();
        var service = OpenApiClient.serviceMap.get(key);

        if(service == undefined)
        {
            service = new OpenApiClient_editor(site);
            OpenApiClient.serviceMap.set(key, service);
        }
        return service;
    }

    static getServiceName() {
        return 'editor';
    }


    GET_orders_category_order(callback, category, order, variant = null) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(category, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(order, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(variant, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(variant !== null) queryParams['variant'] = variant;
                const config = {
                    url: self.getUrl(['orders', category, order]),
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
                console.log("#@@@@@@@@@@@@@@@@@########",config.url);
                
                return axios.request(config)
                    .then(function(response) {
                      //  self.logResponse('GET_orders_category_order', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                      //  self.logResponse('GET_orders_category_order', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
              //  self.logResponse('GET_orders_category_order', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_orders_category_order_header(callback, category, order, variant = null, detail = null, lang_id3 = null) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(category, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(order, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(variant, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsString(detail, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsString(lang_id3, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(variant !== null) queryParams['variant'] = variant;
                if(detail !== null) queryParams['detail'] = detail;
                if(lang_id3 !== null) queryParams['lang_id3'] = lang_id3;
                const config = {
                    url: self.getUrl(['orders', category, order, 'header']),
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
                        self.logResponse('GET_orders_category_order_header', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_orders_category_order_header', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_orders_category_order_header', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
}

export default OpenApiClient_editor;
