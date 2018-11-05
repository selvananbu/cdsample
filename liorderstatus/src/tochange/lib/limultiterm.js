import React, { Component } from 'react';
import axios from 'axios';

import OpenApiClient_search from '../openapi/openapiclient_search';
import {getSiteName} from '../lilayoutauthentication/authutil';

var textNumDetailArr = {};
var textNumArr = [];
var fullTextNumArr = [];
var userLang = "eng";
var dataCnntr = 0;
var resultedArr = [];
var dataFromServerCall = {}

class LiMultiTerm extends Component {

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
        textNumArr = this.removeDuplicateArrValue(this.clearUndefined(textNumArr));
        fullTextNumArr = this.clearUndefined(fullTextNumArr);

        if (this.isEmpty(textNumArr) === false) { localStorage.removeItem('delayTime') }
    }

    handleClearTextFromLocalStorage() {
        console.log('clear add');
        for (let key in localStorage) {
            if (localStorage.getItem(key) !== null) {
                var str = localStorage[key];
                //console.log(key);
                var res = key.substr(0, 9);
                //   console.log(res);
                if (res === "text."+localStorage['core.app.language.id3']) {
                    //   console.log(localStorage[key] + "====" + key);
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
        if (localStorage['core.app.language.id3'] !== undefined) { userLang = localStorage['core.app.language.id3'] }
        var jsObj = {};
        jsObj = { 'textid': this.removeLeadingZero(this.props.textId), 'text': this.props.textVal };

        if (localStorage["text." + userLang + "." + this.removeLeadingZero(this.props.textId)] === undefined) {
            textNumArr.push(this.removeLeadingZero(this.props.textId)); // push only missing textnumber
            fullTextNumArr.push(this.removeLeadingZero(this.props.textId)); // push all text number
        }
        else {
            textNumArr.pop(this.removeLeadingZero(this.props.textId));
            fullTextNumArr.push(this.removeLeadingZero(this.props.textId));
        }
        textNumDetailArr[this.removeLeadingZero(this.props.textId)] = jsObj;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.textVal !== prevState[this.removeLeadingZero(prevProps.textId)]) {
            dataCnntr++;
        }

        if (textNumArr.length <= 0 || dataCnntr === fullTextNumArr.length) {
            localStorage.setItem('delayTime', 0)
        }
        else {
            localStorage.setItem('delayTime', 1500)
        }
    }

    componentDidMount() {

        if(this.state.mounted){
            var langCode1 = localStorage['core.app.language.id3'] !== undefined ? localStorage['core.app.language.id3'] : 'eng' ;

            console.log(langCode1);
            if(localStorage['last.loaded.multiterm.time.'+langCode1] === undefined)
            {
                console.log(langCode1,"===========================");
                var curDateTime = new Date();
                localStorage.setItem('last.loaded.multiterm.time.'+langCode1, curDateTime);
            }

            if (localStorage[langCode1 + ".version"] === undefined) {
                localStorage.setItem(langCode1 + ".version", '123456');
            }

            var self = this;
            setTimeout(function () {
                self.setState({
                    [self.props.textId]: (localStorage["text." + userLang + "." + self.removeLeadingZero(self.props.textId)] !== undefined ? localStorage["text." + userLang + "." + self.removeLeadingZero(self.props.textId)] : self.props.textVal)
                })
            }, (localStorage["delayTime"] !== undefined ? localStorage["delayTime"] : 1500))
            
        }
        
    }

    componentWillUnmount() {
        this.setState({mounted: false});
    }

    componentWillReceiveProps(nextProps) {
        this.constructorFunc();
        var langCode1 = localStorage['core.app.language.id3'] !== undefined ? localStorage['core.app.language.id3'] : 'eng' ;
        
        if (localStorage['core.app.language.id3']) {
            var self = this;
            setTimeout(function () {
                self.setState({
                    [self.removeLeadingZero(self.props.textId)]: (localStorage["text." + localStorage['core.app.language.id3'] + "." + self.removeLeadingZero(self.props.textId)] !== undefined ? localStorage["text." + localStorage['core.app.language.id3'] + "." + self.removeLeadingZero(self.props.textId)] : self.props.textVal)
                })
            }, (1500))

        }

        if (localStorage[langCode1 + ".version"] === undefined) {
            localStorage.setItem(langCode1 + ".version", '123456');
        }

        if(localStorage['last.loaded.multiterm.time.'+langCode1] === undefined)
        {
            var curDateTime = new Date();
            localStorage.setItem('last.loaded.multiterm.time.'+langCode1, curDateTime);
        }
        else{
            var lastLoadedDateTime = localStorage['last.loaded.multiterm.time.'+langCode1];
        }
        
        
        
        var curDateTime = Date.now();
        var lastLoadedDateTime = new Date(lastLoadedDateTime).getTime();

        var difftimeMin = (curDateTime - lastLoadedDateTime)/1000/60; 

        // console.log("langCode1===="+langCode1+"====cur===="+curDateTime+"======"+"last loaded"+lastLoadedDateTime+"=========="+"minute: "+difftimeMin);
       
        if (parseInt(difftimeMin) >= 240) {
            var curDateTime = new Date();
            localStorage.setItem('last.loaded.multiterm.time.'+langCode1, curDateTime);

            var dummyArr = ['1000001']
            this.axiosCall(dummyArr);
        }
        // this.forceUpdate()
        // var self = this;
        // setTimeout(function () {
        //     self.setState({
        //         [self.props.textId]: (localStorage["text." + userLang + "." + self.props.textId] !== undefined ? localStorage["text." + userLang + "." + self.props.textId] : self.props.textVal)
        //     })
        // }, (localStorage["delayTime"] !== undefined ? localStorage["delayTime"] : 1500));
        // var self = this;
        // setTimeout(function () {
        //     self.setState({
        //         [nextProps.textId]: (localStorage["text." + userLang + "." + nextProps.textId] !== undefined ? localStorage["text." + userLang + "." + nextProps.textId] : nextProps.textVal)
        //     })
        // }, (localStorage["delayTime"] !== undefined ? localStorage["delayTime"] : 1500))
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
        // console.log(responseData);
        // var enc = new TextDecoder("utf-8");
        // var result = JSON.parse(enc.decode(responseData.state.response.response.data));
        if (responseData.state.response.response !== undefined && responseData.state.response.response.status === 426) {
            var enc1 = new TextDecoder("utf-8");
            var version = enc1.decode(responseData.state.response.response.data);
            // console.log(version);
            localStorage.setItem(localStorage['core.app.language.id3'] + ".version", version);
            this.handleClearTextFromLocalStorage();
            this.setupText();
        }
        if (responseData.state.response !== undefined && responseData.state.response.data !== undefined) {
            var enc = new TextDecoder("utf-8");
            var result = JSON.parse(enc.decode(responseData.state.response.data));
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
                        localStorage.setItem("text." + userLang + "." + key, JSON.parse(JSON.stringify(ffObj[key])));
                        resultedArr.push(key);
                    }
                }

                textNumArr.forEach(element => {
                    if (this.javaScriptInArray(element, resultedArr) === false) { localStorage.setItem("text." + userLang + "." + element, textNumDetailArr[element]['text']) }
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
        if (localStorage['core.app.language.id3'] === null || localStorage['core.app.language.id3'] === undefined) {
            localStorage['core.app.language.id3'] = 'eng';
        }
        var langCode = localStorage['core.app.language.id3'];

        let siteName = getSiteName(); 
        OpenApiClient_search.getClient(siteName).GET_texts_langID3(this.callbackWithArgFromViewText.bind(this), localStorage['core.app.language.id3'], textNumArrFinal, localStorage[langCode + ".version"]);
    }

    setupText = () => {
        textNumArr = this.removeDuplicateArrValue(this.clearUndefined(textNumArr))
        fullTextNumArr = this.clearUndefined(fullTextNumArr);

        if (!(textNumArr.length === 1 && textNumArr[0] === "") && this.isEmpty(textNumArr) === false) { 
//        if (this.isEmpty(textNumArr) === false) {
            // var url = localStorage.multilangapiurl + '?langid=' + userLang + '&guidreq=' + localStorage.guid + '&textnum={"num":' + JSON.stringify(textNumArr) + '}';
            // console.log('em not here');
            this.axiosCall(textNumArr);
        }
        
        var langCode2 = localStorage['core.app.language.id3'] !== undefined ? localStorage['core.app.language.id3'] : 'eng' ;
        var lastLoadedDateTime = localStorage['last.loaded.multiterm.time.'+langCode2];
        var curDateTime = Date.now();

        var lastLoadedDateTime = new Date(lastLoadedDateTime).getTime();

        var difftimeMin = (curDateTime - lastLoadedDateTime)/1000/60; 

        // console.log("cur"+curDateTime+"======"+"last loaded"+lastLoadedDateTime+"=========="+"minute: "+difftimeMin);
       
        if (parseInt(difftimeMin) >= 240) {

            var curDateTime = new Date();
            localStorage.setItem('last.loaded.multiterm.time.'+langCode2, curDateTime);

            var dummyArr = ['1000001']
            this.axiosCall(dummyArr);
        }
    }

    render() {
    //    console.log(this.state.allTextArr)
        return (this.state[this.removeLeadingZero(this.props.textId)]);
    }
}

export default LiMultiTerm;
