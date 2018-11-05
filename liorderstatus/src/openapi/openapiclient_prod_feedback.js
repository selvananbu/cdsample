import { Component } from 'react';
import axios from 'axios';

import OpenApiClient from './openapiclient';
import OpenApiException from './openapiexception';
import { MimeTypes } from './openapibody';
import OpenApiResponse from './openapiresponse';
import OpenApiClientArrayHelper from './openapiclientarrayhelper';
import { ensureAccessTokenIsValid } from '../lilayoutauthentication/authutil';

var Qs = require('qs');

export const PROD_FEEDBACK_ENTITY_BATCH = "batch";
export const PROD_FEEDBACK_ENTITY_ORDER = "order";
export const PROD_FEEDBACK_ENTITY_UF = "uf";
export const PROD_FEEDBACK_ENTITY_RACK = "rack";
export const PROD_FEEDBACK_ENTITY_OPTIMISATION = "optimisation";
export const PROD_FEEDBACK_ENTITY_DELIVERY = "delivery";
export const PROD_FEEDBACK_READY_UNDO_READY = "ready";
export const PROD_FEEDBACK_READY_UNDO_UNDO = "undo";


class OpenApiClient_prod_feedback extends OpenApiClient {

    constructor(site) {
        super(site, OpenApiClient_prod_feedback.getServiceName());
    }

    static getClient(site) {
        var key = site + "." + OpenApiClient_prod_feedback.getServiceName();
        var service = OpenApiClient.serviceMap.get(key);

        if(service == undefined)
        {
            service = new OpenApiClient_prod_feedback(site);
            OpenApiClient.serviceMap.set(key, service);
        }
        return service;
    }

    static getServiceName() {
        return 'prod_feedback';
    }


    GET_delivery_racks_rackID(callback, rackID) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(rackID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['delivery_racks', rackID]),
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
                        self.logResponse('GET_delivery_racks_rackID', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_delivery_racks_rackID', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_delivery_racks_rackID', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_delivery_racks_rackID_clear(callback, rackID) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(rackID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['delivery_racks', rackID, 'clear']),
                    method: 'patch',
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
                        self.logResponse('PATCH_delivery_racks_rackID_clear', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PATCH_delivery_racks_rackID_clear', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PATCH_delivery_racks_rackID_clear', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_delivery_racks_rackID_outgoing(callback, rackID) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(rackID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['delivery_racks', rackID, 'outgoing']),
                    method: 'patch',
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
                        self.logResponse('PATCH_delivery_racks_rackID_outgoing', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PATCH_delivery_racks_rackID_outgoing', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PATCH_delivery_racks_rackID_outgoing', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_delivery_racks_rackID_incoming(callback, rackID) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(rackID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['delivery_racks', rackID, 'incoming']),
                    method: 'patch',
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
                        self.logResponse('PATCH_delivery_racks_rackID_incoming', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PATCH_delivery_racks_rackID_incoming', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PATCH_delivery_racks_rackID_incoming', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_delivery_racks_rackID_print(callback, rackID) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(rackID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['delivery_racks', rackID, 'print']),
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
                        self.logResponse('GET_delivery_racks_rackID_print', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_delivery_racks_rackID_print', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_delivery_racks_rackID_print', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_delivery_racks_rackID_pdf(callback, rackID) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(rackID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['delivery_racks', rackID, 'pdf']),
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
                        self.logResponse('GET_delivery_racks_rackID_pdf', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_delivery_racks_rackID_pdf', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_delivery_racks_rackID_pdf', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_delivery_racks_rackID_add_to_delivery(callback, rackID, deliveryID = null, route = null) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(rackID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(deliveryID, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(route, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(deliveryID !== null) queryParams['deliveryID'] = deliveryID;
                if(route !== null) queryParams['route'] = route;
                const config = {
                    url: self.getUrl(['delivery_racks', rackID, 'add_to_delivery']),
                    method: 'patch',
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
                        self.logResponse('PATCH_delivery_racks_rackID_add_to_delivery', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PATCH_delivery_racks_rackID_add_to_delivery', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PATCH_delivery_racks_rackID_add_to_delivery', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_todo_lists(callback, order = null, item = null, barcode = null, batch = null, visualUF = null, deliveryID = null, optimisationID = null, stepID = null, machineID = null, rackID = null, externalBarcode = null, allowOtherMachines = null) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(order, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(item, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(barcode, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(batch, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(visualUF, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(deliveryID, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(optimisationID, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(stepID, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(machineID, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsString(rackID, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsString(externalBarcode, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(allowOtherMachines, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(order !== null) queryParams['order'] = order;
                if(item !== null) queryParams['item'] = item;
                if(barcode !== null) queryParams['barcode'] = barcode;
                if(batch !== null) queryParams['batch'] = batch;
                if(visualUF !== null) queryParams['visualUF'] = visualUF;
                if(deliveryID !== null) queryParams['deliveryID'] = deliveryID;
                if(optimisationID !== null) queryParams['optimisationID'] = optimisationID;
                if(stepID !== null) queryParams['stepID'] = stepID;
                if(machineID !== null) queryParams['machineID'] = machineID;
                if(rackID !== null) queryParams['rackID'] = rackID;
                if(externalBarcode !== null) queryParams['externalBarcode'] = externalBarcode;
                if(allowOtherMachines !== null) queryParams['allowOtherMachines'] = allowOtherMachines;
                const config = {
                    url: self.getUrl(['todo_lists']),
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
                        self.logResponse('GET_todo_lists', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_todo_lists', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_todo_lists', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_todo_lists_entity_entityID_worksteps_stepID_ready_undo(callback, entity, entityID, stepID, ready_undo, machineID) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(entity, false, [PROD_FEEDBACK_ENTITY_BATCH, PROD_FEEDBACK_ENTITY_ORDER, PROD_FEEDBACK_ENTITY_UF, PROD_FEEDBACK_ENTITY_RACK, PROD_FEEDBACK_ENTITY_OPTIMISATION, PROD_FEEDBACK_ENTITY_DELIVERY])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsString(entityID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(stepID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsString(ready_undo, false, [PROD_FEEDBACK_READY_UNDO_READY, PROD_FEEDBACK_READY_UNDO_UNDO])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(machineID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(machineID !== null) queryParams['machineID'] = machineID;
                const config = {
                    url: self.getUrl(['todo_lists', entity, entityID, 'worksteps', stepID, ready_undo]),
                    method: 'patch',
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
                        self.logResponse('PATCH_todo_lists_entity_entityID_worksteps_stepID_ready_undo', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PATCH_todo_lists_entity_entityID_worksteps_stepID_ready_undo', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PATCH_todo_lists_entity_entityID_worksteps_stepID_ready_undo', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_ready(callback, order, item, pane, component, pieceCount, stepID, machineID, rackID = null) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(order, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(item, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pane, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(component, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pieceCount, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(stepID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(machineID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsString(rackID, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(machineID !== null) queryParams['machineID'] = machineID;
                if(rackID !== null) queryParams['rackID'] = rackID;
                const config = {
                    url: self.getUrl(['orders', order, item, pane, component, pieceCount, 'worksteps', stepID, 'ready']),
                    method: 'patch',
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
                        self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_ready', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_ready', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_ready', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_undo(callback, order, item, pane, component, pieceCount, stepID, machineID, rackID = null) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(order, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(item, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pane, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(component, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pieceCount, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(stepID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(machineID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsString(rackID, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(machineID !== null) queryParams['machineID'] = machineID;
                if(rackID !== null) queryParams['rackID'] = rackID;
                const config = {
                    url: self.getUrl(['orders', order, item, pane, component, pieceCount, 'worksteps', stepID, 'undo']),
                    method: 'patch',
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
                        self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_undo', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_undo', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_undo', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_orders_order_item_pane_component_pieceCount_remake_reason(callback, order, item, pane, component, pieceCount, reason, machineID = null, stepID = null, remakePane = null, remakeComponent = null) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(order, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(item, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pane, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(component, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pieceCount, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(reason, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(machineID, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(stepID, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(remakePane, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(remakeComponent, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(machineID !== null) queryParams['machineID'] = machineID;
                if(stepID !== null) queryParams['stepID'] = stepID;
                if(remakePane !== null) queryParams['remakePane'] = remakePane;
                if(remakeComponent !== null) queryParams['remakeComponent'] = remakeComponent;
                const config = {
                    url: self.getUrl(['orders', order, item, pane, component, pieceCount, 'remake', reason]),
                    method: 'patch',
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
                        self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_remake_reason', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_remake_reason', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_remake_reason', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_orders_order_item_pane_component_pieceCount_assign_rack(callback, order, item, pane, component, pieceCount, rackID) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(order, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(item, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pane, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(component, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pieceCount, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsString(rackID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(rackID !== null) queryParams['rackID'] = rackID;
                const config = {
                    url: self.getUrl(['orders', order, item, pane, component, pieceCount, 'assign_rack']),
                    method: 'patch',
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
                        self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_assign_rack', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_assign_rack', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_assign_rack', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_orders_order_item_pieceCount_add_to_delivery(callback, order, item, pieceCount, deliveryID = null, route = null) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(order, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(item, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pieceCount, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(deliveryID, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(route, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(deliveryID !== null) queryParams['deliveryID'] = deliveryID;
                if(route !== null) queryParams['route'] = route;
                const config = {
                    url: self.getUrl(['orders', order, item, pieceCount, 'add_to_delivery']),
                    method: 'patch',
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
                        self.logResponse('PATCH_orders_order_item_pieceCount_add_to_delivery', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PATCH_orders_order_item_pieceCount_add_to_delivery', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PATCH_orders_order_item_pieceCount_add_to_delivery', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_delivery_lists(callback, route) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(route, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(route !== null) queryParams['route'] = route;
                const config = {
                    url: self.getUrl(['delivery_lists']),
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
                        self.logResponse('GET_delivery_lists', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_delivery_lists', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_delivery_lists', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    POST_delivery_lists(callback, route, stock = null) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(route, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(stock, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(route !== null) queryParams['route'] = route;
                if(stock !== null) queryParams['stock'] = stock;
                const config = {
                    url: self.getUrl(['delivery_lists']),
                    method: 'post',
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
                        self.logResponse('POST_delivery_lists', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('POST_delivery_lists', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('POST_delivery_lists', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_delivery_lists_deliveryID(callback, deliveryID, route = null) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(deliveryID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(route, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(route !== null) queryParams['route'] = route;
                const config = {
                    url: self.getUrl(['delivery_lists', deliveryID]),
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
                        self.logResponse('GET_delivery_lists_deliveryID', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_delivery_lists_deliveryID', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_delivery_lists_deliveryID', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_delivery_lists_deliveryID_clear(callback, deliveryID) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(deliveryID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['delivery_lists', deliveryID, 'clear']),
                    method: 'patch',
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
                        self.logResponse('PATCH_delivery_lists_deliveryID_clear', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PATCH_delivery_lists_deliveryID_clear', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PATCH_delivery_lists_deliveryID_clear', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_delivery_lists_deliveryID_outgoing(callback, deliveryID) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(deliveryID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['delivery_lists', deliveryID, 'outgoing']),
                    method: 'patch',
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
                        self.logResponse('PATCH_delivery_lists_deliveryID_outgoing', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PATCH_delivery_lists_deliveryID_outgoing', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PATCH_delivery_lists_deliveryID_outgoing', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_delivery_lists_deliveryID_print(callback, deliveryID) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(deliveryID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['delivery_lists', deliveryID, 'print']),
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
                        self.logResponse('GET_delivery_lists_deliveryID_print', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_delivery_lists_deliveryID_print', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_delivery_lists_deliveryID_print', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_delivery_lists_deliveryID_pdf(callback, deliveryID) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(deliveryID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['delivery_lists', deliveryID, 'pdf']),
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
                        self.logResponse('GET_delivery_lists_deliveryID_pdf', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_delivery_lists_deliveryID_pdf', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_delivery_lists_deliveryID_pdf', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_reason_codes(callback, group_no = null, station_key = null) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(group_no, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsString(station_key, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(group_no !== null) queryParams['group_no'] = group_no;
                if(station_key !== null) queryParams['station_key'] = station_key;
                const config = {
                    url: self.getUrl(['reason_codes']),
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
                        self.logResponse('GET_reason_codes', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_reason_codes', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_reason_codes', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_materials(callback, mat_type = null, mat_id = null) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(mat_type, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(mat_id, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(mat_type !== null) queryParams['mat_type'] = mat_type;
                if(mat_id !== null) queryParams['mat_id'] = mat_id;
                const config = {
                    url: self.getUrl(['materials']),
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
                        self.logResponse('GET_materials', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_materials', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_materials', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_materials_mat_barcode(callback, mat_barcode) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(mat_barcode, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['materials', mat_barcode]),
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
                        self.logResponse('GET_materials_mat_barcode', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_materials_mat_barcode', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_materials_mat_barcode', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_materials_mat_barcode_emptied(callback, mat_barcode, stock_name = null) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(mat_barcode, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsString(stock_name, true, [])) {
                    throw new OpenApiException("Parameter is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(mat_barcode !== null) queryParams['mat_barcode'] = mat_barcode;
                if(stock_name !== null) queryParams['stock_name'] = stock_name;
                const config = {
                    url: self.getUrl(['materials', mat_barcode, 'emptied']),
                    method: 'patch',
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
                        self.logResponse('PATCH_materials_mat_barcode_emptied', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PATCH_materials_mat_barcode_emptied', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PATCH_materials_mat_barcode_emptied', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_machines_machineID_materials(callback, machineID) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(machineID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['machines', machineID, 'materials']),
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
                        self.logResponse('GET_machines_machineID_materials', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_machines_machineID_materials', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_machines_machineID_materials', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PUT_machines_machineID_materials(callback, body, machineID) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                if (!self.verifyParamIsInteger(machineID, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['machines', machineID, 'materials']),
                    method: 'put',
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
                        self.logResponse('PUT_machines_machineID_materials', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PUT_machines_machineID_materials', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PUT_machines_machineID_materials', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
}

export default OpenApiClient_prod_feedback;
