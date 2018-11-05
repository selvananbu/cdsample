import { Component } from 'react';
import axios from 'axios';

import OpenApiClient from './openapiclient';
import OpenApiException from './openapiexception';
import { MimeTypes } from './openapibody';
import OpenApiResponse from './openapiresponse';

class OpenApiClient_status extends OpenApiClient {
    constructor(host, customer, site) {
        super(host, customer, site, 'status');
    }

    GET_orders_category_order_history(callback, category, order, skip_text = null, item = null) {

        try {
            if (!this.verifyParamIsInteger(category, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }

            if (!this.verifyParamIsInteger(order, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }

            if (!this.verifyParamIsInteger(skip_text, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }

            if (!this.verifyParamIsInteger(item, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }

            var headers = {};
            var queryParams = {};
            if(skip_text !== null) queryParams['skip_text'] = skip_text;
            if(item !== null) queryParams['item'] = item;
            const config = {
                url: this.getUrl(['orders', category, order, 'history'], queryParams),
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
                .then(function(response) {
                    callback(new OpenApiResponse(response));
                })
                .catch(function(err) {
                    callback(new OpenApiResponse(err));
                })
        }
        catch (e) {
            callback(new OpenApiResponse(e)); // pass exception object to err handler
        }
    }

    GET_orders_category_order_worksteps(callback, category, order, item = null, visual_uf = null, detail_level = null) {

        try {
            if (!this.verifyParamIsInteger(category, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }

            if (!this.verifyParamIsInteger(order, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }

            if (!this.verifyParamIsInteger(item, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }

            if (!this.verifyParamIsInteger(visual_uf, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }

            if (!this.verifyParamIsInteger(detail_level, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }

            var headers = {};
            var queryParams = {};
            if(item !== null) queryParams['item'] = item;
            if(visual_uf !== null) queryParams['visual_uf'] = visual_uf;
            if(detail_level !== null) queryParams['detail_level'] = detail_level;
            const config = {
                url: this.getUrl(['orders', category, order, 'worksteps'], queryParams),
                method: 'get',
                headers: headers,
                onUploadProgress: function (progressEvent) {
                    console.log(progressEvent,'in progress');
                },
                onDownloadProgress: function (progressEvent) {
                    console.log(progressEvent, 'completed');
                }
            }
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%",config.url);
            axios.request(config)
                .then(function(response) {
                    callback(new OpenApiResponse(response));
                })
                .catch(function(err) {
                    callback(new OpenApiResponse(err));
                })
        }
        catch (e) {
            callback(new OpenApiResponse(e)); // pass exception object to err handler
        }
    }

    GET_orders_category_order_qty_summary(callback, category, order, item = null, item_to = null) {

        try {
            if (!this.verifyParamIsInteger(category, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }

            if (!this.verifyParamIsInteger(order, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }

            if (!this.verifyParamIsInteger(item, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }

            if (!this.verifyParamIsInteger(item_to, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }

            var headers = {};
            var queryParams = {};
            if(item !== null) queryParams['item'] = item;
            if(item_to !== null) queryParams['item_to'] = item_to;
            const config = {
                url: this.getUrl(['orders', category, order, 'qty_summary'], queryParams),
                method: 'get',
                headers: headers,
                onUploadProgress: function (progressEvent) {
                    console.log(progressEvent,'in progress');
                },
                onDownloadProgress: function (progressEvent) {
                    console.log(progressEvent, 'completed');
                }
            }

            console.log("@@@@@@@@@@@@@@@@@@@@@@",config.url);
            axios.request(config)
                .then(function(response) {
                    callback(new OpenApiResponse(response));
                })
                .catch(function(err) {
                    callback(new OpenApiResponse(err));
                })
        }
        catch (e) {
            callback(new OpenApiResponse(e)); // pass exception object to err handler
        }
    }

    GET_machines(callback) {

        try {
            var headers = {};
            var queryParams = {};
            const config = {
                url: this.getUrl(['machines'], queryParams),
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
                .then(function(response) {
                    callback(new OpenApiResponse(response));
                })
                .catch(function(err) {
                    callback(new OpenApiResponse(err));
                })
        }
        catch (e) {
            callback(new OpenApiResponse(e)); // pass exception object to err handler
        }
    }

    GET_worksteps(callback) {

        try {
            var headers = {};
            var queryParams = {};
            const config = {
                url: this.getUrl(['worksteps'], queryParams),
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
                .then(function(response) {
                    callback(new OpenApiResponse(response));
                })
                .catch(function(err) {
                    callback(new OpenApiResponse(err));
                })
        }
        catch (e) {
            callback(new OpenApiResponse(e)); // pass exception object to err handler
        }
    }

}

export default OpenApiClient_status;
