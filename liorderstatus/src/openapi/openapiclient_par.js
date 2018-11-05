import { Component } from 'react';
import axios from 'axios';

import OpenApiClient from './openapiclient';
import OpenApiException from './openapiexception';
import { MimeTypes } from './openapibody';
import OpenApiResponse from './openapiresponse';

class OpenApiClient_par extends OpenApiClient {
    constructor(host, customer, site) {
        super(host, customer, site, 'par');
    }

    GET_parameters(callback) {
        try {
            var headers = {};
            var queryParams = {};
            console.log(this.getUrl(['parameters'], queryParams));
            const config = {
                url: this.getUrl(['parameters'], queryParams),
                method: 'get',
                headers: headers,
                onUploadProgress: function (progressEvent) {
                    console.log(progressEvent,'in progress');
                },
                onDownloadProgress: function (progressEvent) {
                    console.log(progressEvent, 'completed');
                }
            }
            axios.request(config)
                .then( function (response) {
                    callback(new OpenApiResponse(response));
                })
                .catch(function (err) {
                    callback(new OpenApiResponse(err));
                })
        }
        catch (e) {
            callback(new OpenApiResponse(e)); // pass exception object to err handler
        }
    }

    PUT_parameters(callback, body) {
        console.log(this.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON]));
        try {
            if (!this.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                throw new OpenApiException("Invalid MIME type");
            }
            var headers = {};
            var queryParams = {};
            headers['Content-Type'] = body.getMimeTypeAsString();
            console.log(this.getUrl(['parameters'], queryParams),'test');
            const config = {
                url: this.getUrl(['parameters'], queryParams),
                method: 'put',
                data: body.getContent(),
                responseType: 'blob',
                headers: headers,
                onUploadProgress: function (progressEvent) {
                    console.log(progressEvent,'in progress');
                },
                onDownloadProgress: function (progressEvent) {
                    console.log(progressEvent, 'completed');
                }
            }
            axios.request(config)
                .then( function (response) {
                    callback(new OpenApiResponse(response));
                })
                .catch(function (err) {
                    callback(new OpenApiResponse(err));
                })
        }
        catch (e) {
            callback(new OpenApiResponse(e)); // pass exception object to err handler
        }
    }

}

export default OpenApiClient_par;
