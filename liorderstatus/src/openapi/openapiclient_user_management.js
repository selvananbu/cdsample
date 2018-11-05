import { Component } from 'react';
import axios from 'axios';

import OpenApiClient from './openapiclient';
import OpenApiException from './openapiexception';
import { MimeTypes } from './openapibody';
import OpenApiResponse from './openapiresponse';
import OpenApiClientArrayHelper from './openapiclientarrayhelper';
import { ensureAccessTokenIsValid } from '../lilayoutauthentication/authutil';

var Qs = require('qs');



class OpenApiClient_user_management extends OpenApiClient {

    constructor(site) {
        super(site, OpenApiClient_user_management.getServiceName());
    }

    static getClient(site) {
        var key = site + "." + OpenApiClient_user_management.getServiceName();
        var service = OpenApiClient.serviceMap.get(key);

        if(service == undefined)
        {
            service = new OpenApiClient_user_management(site);
            OpenApiClient.serviceMap.set(key, service);
        }
        return service;
    }

    static getServiceName() {
        return 'user_management';
    }


    GET_users(callback) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['users']),
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
                        self.logResponse('GET_users', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_users', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_users', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    POST_users(callback, body) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['users']),
                    method: 'post',
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
                        self.logResponse('POST_users', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('POST_users', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('POST_users', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PUT_users(callback, body) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['users']),
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
                        self.logResponse('PUT_users', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PUT_users', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PUT_users', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_users_userId(callback, userId) {
        
        var self = this;
        console.log('====================================');
        console.log("77777777777777777777");
        console.log('====================================');
        ensureAccessTokenIsValid(function(accessToken){
            console.log('====================================');
            console.log("88888888888888888888888");
            console.log('====================================');
            try {
                if (!self.verifyParamIsInteger(userId, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['users', userId]),
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
                console.log("Came 55555555555555555555555",config.url);
                console.log('====================================');
                return axios.request(config)
                    .then(function(response) {
                        self.logResponse('GET_users_userId', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_users_userId', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_users_userId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    DELETE_users_userId(callback, userId) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(userId, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['users', userId]),
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
                        self.logResponse('DELETE_users_userId', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('DELETE_users_userId', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('DELETE_users_userId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_users_userId_roles(callback, userId) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(userId, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['users', userId, 'roles']),
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
                        self.logResponse('GET_users_userId_roles', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_users_userId_roles', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_users_userId_roles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    POST_users_userId_roles(callback, userId, roleIds) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(userId, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsIntegerArray(roleIds, false, [])) {
                    throw new OpenApiException("Parameter is not a valid integer array!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(roleIds !== null) queryParams['roleIds'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(roleIds, "STYLE_UNDEFINED", "roleIds", true);
                const config = {
                    url: self.getUrl(['users', userId, 'roles']),
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
                        self.logResponse('POST_users_userId_roles', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('POST_users_userId_roles', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('POST_users_userId_roles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    DELETE_users_userId_roles_roleId(callback, userId, roleId) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(userId, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(roleId, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['users', userId, 'roles', roleId]),
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
                        self.logResponse('DELETE_users_userId_roles_roleId', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('DELETE_users_userId_roles_roleId', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('DELETE_users_userId_roles_roleId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_users_userId_job_titles(callback, userId) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(userId, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['users', userId, 'job_titles']),
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
                        self.logResponse('GET_users_userId_job_titles', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_users_userId_job_titles', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_users_userId_job_titles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    POST_users_userId_job_titles(callback, body, userId) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                if (!self.verifyParamIsInteger(userId, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['users', userId, 'job_titles']),
                    method: 'post',
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
                        self.logResponse('POST_users_userId_job_titles', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('POST_users_userId_job_titles', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('POST_users_userId_job_titles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PUT_users_userId_job_titles(callback, body, userId) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                if (!self.verifyParamIsInteger(userId, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['users', userId, 'job_titles']),
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
                        self.logResponse('PUT_users_userId_job_titles', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PUT_users_userId_job_titles', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PUT_users_userId_job_titles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    DELETE_users_userId_job_titles_jobTitleSeq(callback, userId, jobTitleSeq) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(userId, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(jobTitleSeq, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['users', userId, 'job_titles', jobTitleSeq]),
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
                        self.logResponse('DELETE_users_userId_job_titles_jobTitleSeq', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('DELETE_users_userId_job_titles_jobTitleSeq', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('DELETE_users_userId_job_titles_jobTitleSeq', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_company_entities(callback, type = null) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(type, true, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                if(type !== null) queryParams['type'] = type;
                const config = {
                    url: self.getUrl(['company_entities']),
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
                        self.logResponse('GET_company_entities', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_company_entities', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_company_entities', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    POST_company_entities(callback, body) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['company_entities']),
                    method: 'post',
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
                        self.logResponse('POST_company_entities', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('POST_company_entities', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('POST_company_entities', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PUT_company_entities(callback, body) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['company_entities']),
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
                        self.logResponse('PUT_company_entities', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PUT_company_entities', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PUT_company_entities', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_company_entities_entityId(callback, entityId) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(entityId, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['company_entities', entityId]),
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
                        self.logResponse('GET_company_entities_entityId', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_company_entities_entityId', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_company_entities_entityId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    DELETE_company_entities_entityId(callback, entityId) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(entityId, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['company_entities', entityId]),
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
                        self.logResponse('DELETE_company_entities_entityId', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('DELETE_company_entities_entityId', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('DELETE_company_entities_entityId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_sites(callback) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['sites']),
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
        });
    }
    
    POST_sites(callback, body) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['sites']),
                    method: 'post',
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
                        self.logResponse('POST_sites', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('POST_sites', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('POST_sites', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PUT_sites(callback, body) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['sites']),
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
                        self.logResponse('PUT_sites', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PUT_sites', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PUT_sites', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_sites_siteId(callback, siteId) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(siteId, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['sites', siteId]),
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
                        self.logResponse('GET_sites_siteId', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_sites_siteId', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_sites_siteId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    DELETE_sites_siteId(callback, siteId) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(siteId, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['sites', siteId]),
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
                        self.logResponse('DELETE_sites_siteId', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('DELETE_sites_siteId', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('DELETE_sites_siteId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_roles(callback) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['roles']),
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
                        self.logResponse('GET_roles', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_roles', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_roles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    POST_roles(callback, body) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['roles']),
                    method: 'post',
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
                        self.logResponse('POST_roles', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('POST_roles', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('POST_roles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PUT_roles(callback, body) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['roles']),
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
                        self.logResponse('PUT_roles', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PUT_roles', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PUT_roles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_roles_roleId(callback, roleId) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(roleId, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['roles', roleId]),
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
                        self.logResponse('GET_roles_roleId', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_roles_roleId', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_roles_roleId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    DELETE_roles_roleId(callback, roleId) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(roleId, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['roles', roleId]),
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
                        self.logResponse('DELETE_roles_roleId', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('DELETE_roles_roleId', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('DELETE_roles_roleId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_job_titles(callback) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['job_titles']),
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
                        self.logResponse('GET_job_titles', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_job_titles', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_job_titles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    POST_job_titles(callback, body) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['job_titles']),
                    method: 'post',
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
                        self.logResponse('POST_job_titles', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('POST_job_titles', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('POST_job_titles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PUT_job_titles(callback, body) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['job_titles']),
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
                        self.logResponse('PUT_job_titles', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('PUT_job_titles', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('PUT_job_titles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_job_titles_jobTitleId(callback, jobTitleId) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(jobTitleId, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['job_titles', jobTitleId]),
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
                        self.logResponse('GET_job_titles_jobTitleId', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('GET_job_titles_jobTitleId', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('GET_job_titles_jobTitleId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    DELETE_job_titles_jobTitleId(callback, jobTitleId) {
        
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(jobTitleId, false, [])) {
                    throw new OpenApiException("Parameter is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                const config = {
                    url: self.getUrl(['job_titles', jobTitleId]),
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
                        self.logResponse('DELETE_job_titles_jobTitleId', response);
                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {
                        self.logResponse('DELETE_job_titles_jobTitleId', err);
                        callback(new OpenApiResponse(err));
                    })
            }
            catch (e) {
                self.logResponse('DELETE_job_titles_jobTitleId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
}

export default OpenApiClient_user_management;
