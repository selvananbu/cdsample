import { Component } from 'react';
import axios from 'axios';

import OpenApiClient from './openapiclient';
import OpenApiException from './openapiexception';
import { MimeTypes } from './openapibody';
import OpenApiResponse from './openapiresponse';

class OpenApiClient_prod_feedback extends OpenApiClient {
    constructor(host, customer, site) {
        super(host, customer, site, 'prod_feedback');
    }

    GET_delivery_racks_rackID(callback, rackID) {
        try {
            if (!this.verifyParamIsString(rackID, false)) {
                throw new OpenApiException("Parameter is not a String!");
            }
            var headers = {};
            var queryParams = {};
            const config = {
                url: this.getUrl(['delivery_racks', rackID], queryParams),
                method: 'get',
                headers: headers,
                onUploadProgress: function (progressEvent) {
                    console.log(progressEvent,'in progress');
                },
                onDownloadProgress: function (progressEvent) {
                    console.log(progressEvent, 'completed');
                }
            }
            console.log("URL!!!!",config.url);
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

    PATCH_delivery_racks_rackID_clear(callback, rackID) {
        try {
            if (!this.verifyParamIsString(rackID, false)) {
                throw new OpenApiException("Parameter is not a String!");
            }
            var headers = {};
            var queryParams = {};
            const config = {
                url: this.getUrl(['delivery_racks', rackID, 'clear'], queryParams),
                method: 'patch',
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

    PATCH_delivery_racks_rackID_outgoing(callback, rackID) {
        try {
            if (!this.verifyParamIsString(rackID, false)) {
                throw new OpenApiException("Parameter is not a String!");
            }
            var headers = {};
            var queryParams = {};
            const config = {
                url: this.getUrl(['delivery_racks', rackID, 'outgoing'], queryParams),
                method: 'patch',
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

    PATCH_delivery_racks_rackID_incoming(callback, rackID) {
        try {
            if (!this.verifyParamIsString(rackID, false)) {
                throw new OpenApiException("Parameter is not a String!");
            }
            var headers = {};
            var queryParams = {};
            const config = {
                url: this.getUrl(['delivery_racks', rackID, 'incoming'], queryParams),
                method: 'patch',
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

    GET_delivery_racks_rackID_print(callback, rackID) {
        try {
            if (!this.verifyParamIsString(rackID, false)) {
                throw new OpenApiException("Parameter is not a String!");
            }
            var headers = {};
            var queryParams = {};
            const config = {
                url: this.getUrl(['delivery_racks', rackID, 'print'], queryParams),
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

    GET_delivery_racks_rackID_pdf(callback, rackID) {
        try {
            if (!this.verifyParamIsString(rackID, false)) {
                throw new OpenApiException("Parameter is not a String!");
            }
            var headers = {};
            var queryParams = {};
            const config = {
                url: this.getUrl(['delivery_racks', rackID, 'pdf'], queryParams),
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

    GET_todo_lists(callback, order, item, barcode, batch, visualUF, deliveryID, optimisationID, stepID, machineID, rackID, externalBarcode) {
        try {
            if (!this.verifyParamIsInteger(order, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(item, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(barcode, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(batch, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(visualUF, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(deliveryID, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(optimisationID, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(stepID, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(machineID, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsString(rackID, true)) {
                throw new OpenApiException("Parameter is not a String!");
            }
            if (!this.verifyParamIsString(externalBarcode, true)) {
                throw new OpenApiException("Parameter is not a String!");
            }
            var headers = {};
            var queryParams = {};
            if(order !== null && order != undefined) queryParams['order'] = order;
            if(item !== null && item != undefined) queryParams['item'] = item;
            if(barcode !== null && barcode != undefined) queryParams['barcode'] = barcode;
            if(batch !== null && batch != undefined) queryParams['batch'] = batch;
            if(visualUF !== null && visualUF != undefined) queryParams['visualUF'] = visualUF;
            if(deliveryID !== null && deliveryID != undefined) queryParams['deliveryID'] = deliveryID;
            if(optimisationID !== null && optimisationID != undefined) queryParams['optimisationID'] = optimisationID;
            if(stepID !== null && stepID != undefined) queryParams['stepID'] = stepID;
            if(machineID !== null && machineID != undefined) queryParams['machineID'] = machineID;
            if(rackID !== null && rackID != undefined) queryParams['rackID'] = rackID;
            if(externalBarcode !== null && externalBarcode != undefined) queryParams['externalBarcode'] = externalBarcode;


            const config = {
                url: this.getUrl(['todo_lists'], queryParams),
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

    PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_ready(callback, order, item, pane, component, pieceCount, stepID, machineID, rackID) {
        try {
            if (!this.verifyParamIsInteger(order, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(item, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(pane, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(component, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(pieceCount, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(stepID, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(machineID, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsString(rackID, true)) {
                throw new OpenApiException("Parameter is not a String!");
            }
            var headers = {};
            var queryParams = {};
            if(machineID !== null) queryParams['machineID'] = machineID;
            if(rackID !== null) queryParams['rackID'] = rackID;
            const config = {
                url: this.getUrl(['orders', order, item, pane, component, pieceCount, 'worksteps', stepID, 'ready'], queryParams),
                method: 'patch',
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

    PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_undo(callback, order, item, pane, component, pieceCount, stepID, machineID, rackID) {
        try {
            if (!this.verifyParamIsInteger(order, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(item, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(pane, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(component, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(pieceCount, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(stepID, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(machineID, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsString(rackID, true)) {
                throw new OpenApiException("Parameter is not a String!");
            }
            var headers = {};
            var queryParams = {};
            if(machineID !== null) queryParams['machineID'] = machineID;
            if(rackID !== null) queryParams['rackID'] = rackID;
            const config = {
                url: this.getUrl(['orders', order, item, pane, component, pieceCount, 'worksteps', stepID, 'undo'], queryParams),
                method: 'patch',
                headers: headers,
                onUploadProgress: function (progressEvent) {
                    console.log(progressEvent,'in progress');
                },
                onDownloadProgress: function (progressEvent) {
                    console.log(progressEvent, 'completed');
                }
            }

            console.log("URL",config.url);
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

    PATCH_orders_order_item_pane_component_pieceCount_remake(callback, order, item, pane, component, pieceCount, machineID, stepID, remakePane, remakeComponent) {
        try {
            if (!this.verifyParamIsInteger(order, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(item, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(pane, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(component, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(pieceCount, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(machineID, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(stepID, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(remakePane, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(remakeComponent, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            var headers = {};
            var queryParams = {};
            if(machineID !== null) queryParams['machineID'] = machineID;
            if(stepID !== null) queryParams['stepID'] = stepID;
            if(remakePane !== null) queryParams['remakePane'] = remakePane;
            if(remakeComponent !== null) queryParams['remakeComponent'] = remakeComponent;
            const config = {
                url: this.getUrl(['orders', order, item, pane, component, pieceCount, 'remake'], queryParams),
                method: 'patch',
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

    PATCH_orders_order_item_pane_component_pieceCount_assign_rack(callback, order, item, pane, component, pieceCount, rackID) {
        try {
            if (!this.verifyParamIsInteger(order, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(item, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(pane, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(component, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(pieceCount, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsString(rackID, false)) {
                throw new OpenApiException("Parameter is not a String!");
            }
            var headers = {};
            var queryParams = {};
            if(rackID !== null) queryParams['rackID'] = rackID;
            const config = {
                url: this.getUrl(['orders', order, item, pane, component, pieceCount, 'assign_rack'], queryParams),
                method: 'patch',
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

    PATCH_orders_order_item_pieceCount_add_to_delivery(callback, order, item, pieceCount, deliveryID, route) {
        try {
            if (!this.verifyParamIsInteger(order, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(item, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(pieceCount, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(deliveryID, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(route, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            var headers = {};
            var queryParams = {};
            if(deliveryID !== null) queryParams['deliveryID'] = deliveryID;
            if(route !== null) queryParams['route'] = route;
            const config = {
                url: this.getUrl(['orders', order, item, pieceCount, 'add_to_delivery'], queryParams),
                method: 'patch',
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

    PATCH_delivery_racks_rackID_add_to_delivery(callback, rackID, deliveryID, route) {
        try {
            if (!this.verifyParamIsString(rackID, false)) {
                throw new OpenApiException("Parameter is not a String!");
            }
            if (!this.verifyParamIsInteger(deliveryID, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(route, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            var headers = {};
            var queryParams = {};
            if(deliveryID !== null) queryParams['deliveryID'] = deliveryID;
            if(route !== null) queryParams['route'] = route;
            const config = {
                url: this.getUrl(['delivery_racks', rackID, 'add_to_delivery'], queryParams),
                method: 'patch',
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

    POST_delivery_lists(callback, route, stock) {
        try {
            if (!this.verifyParamIsInteger(route, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(stock, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            var headers = {};
            var queryParams = {};
            if(route !== null) queryParams['route'] = route;
            if(stock !== null) queryParams['stock'] = stock;
            const config = {
                url: this.getUrl(['delivery_lists'], queryParams),
                method: 'post',
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

    GET_delivery_lists_deliveryID(callback, deliveryID, route) {
        try {
            if (!this.verifyParamIsInteger(deliveryID, false)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            if (!this.verifyParamIsInteger(route, true)) {
                throw new OpenApiException("Parameter is not a number!");
            }
            var headers = {};
            var queryParams = {};
            if(route !== null) queryParams['route'] = route;
            const config = {
                url: this.getUrl(['delivery_lists', deliveryID], queryParams),
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

}

export default OpenApiClient_prod_feedback;
