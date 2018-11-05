import { Component } from 'react';
import axios from 'axios';

import OpenApiClient from './openapiclient';
import OpenApiException from './openapiexception';
import { MimeTypes } from './openapibody';
import OpenApiResponse from './openapiresponse';
import OpenApiClientArrayHelper from './openapiclientarrayhelper';
import { ensureAccessTokenIsValid } from '../lilayoutauthentication/authutil';

var Qs = require('qs');



class OpenApiClient_status extends OpenApiClient {

    constructor(site) {
        super(site, OpenApiClient_status.getServiceName());
    }

    static getClient(site) {
        var key = site + "." + OpenApiClient_status.getServiceName();
        var service = OpenApiClient.serviceMap.get(key);

        if(service == undefined)
        {
            service = new OpenApiClient_status(site);
            OpenApiClient.serviceMap.set(key, service);
        }
        return service;
    }

    static getServiceName() {
        return 'status';
    }


    GET_orders_category_order_history(callback, category, order, skip_text = null, item = null) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(category, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(order, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(skip_text, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(item, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(skip_text !== null) queryParams['skip_text'] = skip_text;
                if(item !== null) queryParams['item'] = item;
                const config = {
                    url: self.getUrl(['orders', category, order, 'history']),
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
                     //   self.logResponse('GET_orders_category_order_history', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                     //   self.logResponse('GET_orders_category_order_history', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_orders_category_order_history', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_orders_category_order_worksteps(callback, category, order, item = null, visual_uf = null, detail_level = null) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(category, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(order, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(item, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(visual_uf, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(detail_level, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(item !== null) queryParams['item'] = item;
                if(visual_uf !== null) queryParams['visual_uf'] = visual_uf;
                if(detail_level !== null) queryParams['detail_level'] = detail_level;
                const config = {
                    url: self.getUrl(['orders', category, order, 'worksteps']),
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
                     //   self.logResponse('GET_orders_category_order_worksteps', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                       // self.logResponse('GET_orders_category_order_worksteps', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_orders_category_order_worksteps', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_orders_category_order_qty_summary(callback, category, order, item = null, item_to = null) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(category, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(order, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(item, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(item_to, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(item !== null) queryParams['item'] = item;
                if(item_to !== null) queryParams['item_to'] = item_to;
                const config = {
                    url: self.getUrl(['orders', category, order, 'qty_summary']),
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
                console.log('====================================');
                console.log(config.url);
                console.log('====================================');
                return axios.request(config)
                    .then(function(response) {
                      //  self.logResponse('GET_orders_category_order_qty_summary', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                       // self.logResponse('GET_orders_category_order_qty_summary', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_orders_category_order_qty_summary', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_machines(callback) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['machines']),
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
                     //   self.logResponse('GET_machines', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                     //   self.logResponse('GET_machines', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_machines', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_worksteps(callback) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['worksteps']),
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
                     //   self.logResponse('GET_worksteps', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                     //   self.logResponse('GET_worksteps', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
               // self.logResponse('GET_worksteps', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_orders_category_order_remakes(callback, category, order, item = null, visual_uf = null) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(category, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(order, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(item, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(visual_uf, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(item !== null) queryParams['item'] = item;
                if(visual_uf !== null) queryParams['visual_uf'] = visual_uf;
                const config = {
                    url: self.getUrl(['orders', category, order, 'remakes']),
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
                  //      self.logResponse('GET_orders_category_order_remakes', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                     //   self.logResponse('GET_orders_category_order_remakes', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_orders_category_order_remakes', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
}

export default OpenApiClient_status;
