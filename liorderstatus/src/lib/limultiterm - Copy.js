import React, { Component } from 'react';
import axios from 'axios';

import OpenApiClient_search from '../openapi/openapiclient_search';
import {getSiteName} from '../lilayoutauthentication/authutil';
// import * as LiLayoutActions from './lilayoutactions/lilayoutaction';
import * as localStorage from '../lib/localsettings';
import * as commonFunction from '../lib/responseFunction';
import * as MenuConnector from '../nativeconnector/menuconnector';

var textNumDetailArr = {};
var textNumArr = [];
var fullTextNumArr = [];
var userLang = "eng";
var dataCnntr = 0;
var resultedArr = [];
var dataFromServerCall = {}

export default class LiMultiTerm extends Component{

    constructor(props) {
        super(props);
        if (this.props !== undefined) {
            this.constructorFunc();
        }

        this.state = { 
                    [this.removeLeadingZero(this.props.textId)]: textNumDetailArr[this.removeLeadingZero(this.props.textId)]['text'],
                    allTextArr : [], 
                    mounted : true
        }
        // console.log(textNumArr);
        textNumArr = this.removeDuplicateArrValue(this.clearUndefined(textNumArr));
        fullTextNumArr = this.clearUndefined(fullTextNumArr);

        // console.log(textNumArr);

        if (this.isEmpty(textNumArr) === false) { localStorage.removeStorageItem('delayTime') }
    }

    handleClearTextFromLocalStorage() {
        console.log('cleared');
        for (let key in localStorage.getAll()) {
            if (localStorage.getStorageItem(key) !== null) {
                // var str = localStorage.getStorageItem(key);
                console.log(key);
                var res = key.substr(0, 8);
                //   console.log(res);
                if (res === "text."+localStorage.getStorageItem('core.app.language.id3')) {
                    // console.log(localStorage[key] + "====" + key);
                    localStorage.removeItem(key);
                }
            }
        }
    }

    removeLeadingZero(textValToParse) {
        if (textValToParse !== undefined) {
            if (textValToParse.search("0") === 0) {
                textValToParse = textValToParse.substr(1, textValToParse.length);
            }
        }
        return (textValToParse !== undefined ? textValToParse : undefined);
    }

    constructorFunc = () => {
        if (localStorage.getStorageItem('core.app.language.id3') !== undefined) { userLang = localStorage.getStorageItem('core.app.language.id3') }
        var jsObj = {};
        jsObj = { 'textid': this.removeLeadingZero(this.props.textId), 'text': this.props.textVal };

        if (localStorage.getStorageItem("text." + userLang + "." + this.removeLeadingZero(this.props.textId)) === undefined) {
            textNumArr.push(this.removeLeadingZero(this.props.textId)); // push only missing textnumber
            fullTextNumArr.push(this.removeLeadingZero(this.props.textId)); // push all text number
        }
        else {
            textNumArr.pop(this.removeLeadingZero(this.props.textId));
            fullTextNumArr.push(this.removeLeadingZero(this.props.textId));
        }
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        console.log(textNumArr,jsObj);
        console.log('====================================');
        textNumDetailArr[this.removeLeadingZero(this.props.textId)] = jsObj;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.textVal !== prevState[this.removeLeadingZero(prevProps.textId)]) {
            dataCnntr++;
        }

        if (textNumArr.length <= 0 || dataCnntr === fullTextNumArr.length) {
            localStorage.setStorageItem('delayTime', 0)
            MenuConnector.writeKeyValueItem('delayTime', '0');
        }
        else {
            localStorage.setStorageItem('delayTime', 2000);
            MenuConnector.writeKeyValueItem('delayTime', '2000');
        }
    }

    componentDidMount() {
        if(this.state.mounted){
            var langCode1 = localStorage.getStorageItem('core.app.language.id3') !== undefined ? localStorage.getStorageItem('core.app.language.id3') : 'eng' ;

            console.log("55555555555555555555555555555555", localStorage.getStorageItem('text.deu.99024423'), localStorage.getStorageItem('text.eng.99024423'), this.props.textId);
            if(localStorage.getStorageItem('last.loaded.multiterm.time.'+langCode1) === undefined)
            {
                
                var curDateTime = new Date();
                localStorage.setStorageItem('last.loaded.multiterm.time.'+langCode1, curDateTime);
                MenuConnector.writeKeyValueItem('last.loaded.multiterm.time.' + langCode1, curDateTime.toString());
            }

            if (localStorage.getStorageItem(langCode1 + ".version") === undefined) {
                localStorage.setStorageItem(langCode1 + ".version", '123456');
                MenuConnector.writeKeyValueItem(langCode1 + ".version", '123456');
            }

            var self = this;
            setTimeout(function () {
                console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@');
                console.log(self.removeLeadingZero(self.props.textId)); 
                console.log(userLang);
                console.log(localStorage.getStorageItem("delayTime"));
                console.log(localStorage.getStorageItem("text." + userLang + "." + self.removeLeadingZero(self.props.textId)));
                console.log(localStorage.getStorageItem("text." + userLang + "." + self.removeLeadingZero(self.props.textId)));
                console.log('====================================');
                self.setState({
                    [self.props.textId]: (localStorage.getStorageItem("text." + userLang + "." + self.removeLeadingZero(self.props.textId)) !== undefined ? localStorage.getStorageItem("text." + userLang + "." + self.removeLeadingZero(self.props.textId)) : self.props.textVal)
                })
            })
            // (localStorage.getStorageItem("delayTime") !== undefined ? localStorage.getStorageItem("delayTime"): 2000)
            
        }
        
    }

    componentWillUnmount() {
        this.setState({mounted: false});
    }

    componentWillReceiveProps(nextProps) {
        this.constructorFunc();
        console.log('====================================');
        console.log("Propssssssssssss");
        console.log('====================================');
        var langCode1 = localStorage.getStorageItem('core.app.language.id3') !== undefined ? localStorage.getStorageItem('core.app.language.id3') : 'eng' ;
        
        if (localStorage.getStorageItem('core.app.language.id3')) {
            var self = this;
            setTimeout(function () {
                self.setState({
                    [self.removeLeadingZero(self.props.textId)]: (localStorage.getStorageItem("text." + localStorage.getStorageItem('core.app.language.id3') + "." + self.removeLeadingZero(self.props.textId)) !== undefined ? localStorage.getStorageItem("text." + localStorage.getStorageItem('core.app.language.id3') + "." + self.removeLeadingZero(self.props.textId)) : self.props.textVal)
                })
            }, (2000))

        }

        if (localStorage.getStorageItem(langCode1 + ".version") === undefined) {
            localStorage.setStorageItem(langCode1 + ".version", '123456');
            MenuConnector.writeKeyValueItem(langCode1 + ".version", '123456');
        }

        if(localStorage.getStorageItem('last.loaded.multiterm.time.'+langCode1) === undefined)
        {
            var curDateTime = new Date();
            localStorage.setStorageItem('last.loaded.multiterm.time.'+langCode1, curDateTime);
            console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
            console.log(curDateTime);
            console.log('====================================');
            MenuConnector.writeKeyValueItem('last.loaded.multiterm.time.' + langCode1, curDateTime.toString());
        }
        else{
            var lastLoadedDateTime = localStorage.getStorageItem('last.loaded.multiterm.time.'+langCode1);
        }
        
        
        
        var curDateTime = Date.now();
        var lastLoadedDateTime = new Date(lastLoadedDateTime).getTime();

        var difftimeMin = (curDateTime - lastLoadedDateTime)/1000/60; 

        console.log("langCode1===="+langCode1+"====cur===="+curDateTime+"======"+"last loaded"+lastLoadedDateTime+"=========="+"minute: "+difftimeMin);
       
        if (parseInt(difftimeMin) >= 240) {
            var curDateTime = new Date();
            localStorage.setStorageItem('last.loaded.multiterm.time.'+langCode1, curDateTime);
             console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
             console.log(curDateTime);
             console.log('====================================');
            MenuConnector.writeKeyValueItem('last.loaded.multiterm.time.' + langCode1, curDateTime.toString());

            var dummyArr = ['1000001']
            this.axiosCall(dummyArr);
        }
        // this.forceUpdate()
        // var self = this;
        // setTimeout(function () {
        //     self.setState({
        //         [self.props.textId]: (localStorage["text." + userLang + "." + self.props.textId] !== undefined ? localStorage["text." + userLang + "." + self.props.textId] : self.props.textVal)
        //     })
        // }, (localStorage["delayTime"] !== undefined ? localStorage["delayTime"] : 2000));
        // var self = this;
        // setTimeout(function () {
        //     self.setState({
        //         [nextProps.textId]: (localStorage["text." + userLang + "." + nextProps.textId] !== undefined ? localStorage["text." + userLang + "." + nextProps.textId] : nextProps.textVal)
        //     })
        // }, (localStorage["delayTime"] !== undefined ? localStorage["delayTime"] : 2000))
    }
    clearUndefined = (arrContent) => {
        arrContent = arrContent.filter(function (element) {
            return element !== undefined;
        });

        return arrContent;
    }

    removeDuplicateArrValue = (arrContent) => {
        var temp = [];
        arrContent = arrContent.filter((x, i) => {
            if (temp.indexOf(x) < 0) {
                temp.push(x);
                return true;
            }
            return false;
        });
        return arrContent;
    }

    isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    javaScriptInArray = (needle, haystack) => {
        var length = haystack.length;
        for (var i = 0; i < length; i++) {
            if (haystack[i] === needle)
                return true;
        }
        return false;
    }

    callbackWithArgFromViewText(responseData) {
        // LiLayoutActions.showLoader(false);
            // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@", responseData.state.response.response.status);

        // var enc = new TextDecoder("utf-8");
        // var result = JSON.parse(enc.decode(responseData.state.response.response.data));
        
        if (responseData.state.response.response !== undefined && responseData.state.response.response.status === 426) {
            // var enc1 = new TextDecoder("utf-8");
            var version = commonFunction.convertToString(responseData.state.response.response.data);
            console.log(version);
            localStorage.setStorageItem(localStorage.getStorageItem('core.app.language.id3') + ".version", version);
            MenuConnector.writeKeyValueItem(localStorage.getStorageItem('core.app.language.id3') + ".version", version);
            this.handleClearTextFromLocalStorage();
             var langCode = localStorage.getStorageItem('core.app.language.id3');
            this.setupText();
        }
        if (responseData.state.response !== undefined && responseData.state.response.data !== undefined) {
            // var enc = new TextDecoder("utf-8");
            var result =commonFunction.convertToUint(responseData.state.response.data);
            // console.log(result)
            if (result) {
                // console.log(result.txt);
                var ffObj = {};
                result.txt.map(function (k) {
                    ffObj[k.textNo] = k.text;

                });

                dataFromServerCall = ffObj;

                for (var key in ffObj) {
                    if (ffObj.hasOwnProperty(key)) {
                        localStorage.setStorageItem("text." + userLang + "." + key, JSON.parse(JSON.stringify(ffObj[key])));
                        MenuConnector.writeKeyValueItem("text." + userLang + "." + key, (JSON.stringify(ffObj[key])));
                        resultedArr.push(key);
                    }
                }

                textNumArr.forEach(element => {
                    if (this.javaScriptInArray(element, resultedArr) === false) {
                         localStorage.setStorageItem("text." + userLang + "." + element, textNumDetailArr[element]['text']);
                         MenuConnector.writeKeyValueItem("text." + userLang + "." + element, textNumDetailArr[element]['text']);
                }
                });
                // this.props.setTExtNumber(result.txt);
                 
            }
            else {
                // console.log(responseData.state.response.data);
            }

        }
        else {
            //console.log(responseData.state.data);
        }
    }

    axiosCall = (textNumArrFinal) => {
        // console.log(textNumArrFinal);
        // console.log(localStorage['core.app.language.id3'])
          console.log('====================================');
          console.log("FINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG", localStorage.getStorageItem('core.app.language.id3'));
          console.log('====================================');
        if (localStorage.getStorageItem('core.app.language.id3') === null || localStorage.getStorageItem('core.app.language.id3') === undefined) {
          
            localStorage.setStorageItem('core.app.language.id3','eng');
            MenuConnector.writeKeyValueItem('core.app.language.id3', 'eng');
        }
        var langCode = localStorage.getStorageItem('core.app.language.id3');
        
        // LiLayoutActions.showLoader(true);
        let siteName = getSiteName();
        OpenApiClient_search.getClient('PROD').GET_texts_langID3(this.callbackWithArgFromViewText.bind(this), localStorage.getStorageItem('core.app.language.id3'), textNumArrFinal, localStorage.getStorageItem(langCode + ".version"));
    }

    setupText = () => {
        console.log('setupText');
        console.log(textNumArr);
        textNumArr = this.removeDuplicateArrValue(this.clearUndefined(textNumArr))
        fullTextNumArr = this.clearUndefined(fullTextNumArr);
      

        if (!(textNumArr.length === 1 && textNumArr[0] === "") && !this.isEmpty(textNumArr)) { 
//        if (this.isEmpty(textNumArr) === false) {
            // var url = localStorage.multilangapiurl + '?langid=' + userLang + '&guidreq=' + localStorage.guid + '&textnum={"num":' + JSON.stringify(textNumArr) + '}';
            this.axiosCall(textNumArr);
        }
       
        
        var langCode2 = localStorage.getStorageItem('core.app.language.id3') !== undefined ? localStorage.getStorageItem('core.app.language.id3') : 'eng' ;
        var lastLoadedDateTime = localStorage.getStorageItem('last.loaded.multiterm.time.'+langCode2);
        var curDateTime = Date.now();

        var lastLoadedDateTime = new Date(lastLoadedDateTime).getTime();

        var difftimeMin = (curDateTime - lastLoadedDateTime)/1000/60; 

        console.log("cur"+curDateTime+"======"+"last loaded"+lastLoadedDateTime+"=========="+"minute: "+difftimeMin);
       
        if (parseInt(difftimeMin) >= 240) {

            var curDateTime = new Date();
            localStorage.setStorageItem('last.loaded.multiterm.time.'+langCode2, curDateTime);
          
            MenuConnector.writeKeyValueItem('last.loaded.multiterm.time.' + langCode2, curDateTime.toString());

            var dummyArr = ['1000001']
            this.axiosCall(dummyArr);
        }
    }

    render() {
    //    console.log(this.state[this.removeLeadingZero(this.props.textId)])

        return (this.state[this.removeLeadingZero(this.props.textId)]);
    }
}

