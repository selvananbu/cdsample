import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    BackHandler,
    BackAndroid
} from 'react-native';
import { WebView } from 'react-native';
import MenuExample from './nativeconnector/menuconnector';

var WEBVIEW_REF = 'webview';
export default class NewsFeed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: 'https://business-portal.lisec.com/newsfeed/newsfeedlistallview.php',
            backButtonEnabled:false
        }
    }
   componentDidMount(){
         MenuExample.setTitle('Order Status - News Feed');
         BackHandler.addEventListener('hardwareBackPress', this.backHandler);
    }
    componentWillUnmount(){
         BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
    }
     backHandler = () => {
         if (this.state.backButtonEnabled) {
             this.refs[WEBVIEW_REF].goBack();
             return true;
         }
         else{
             MenuExample.setTitle('Order Status');
         }
     }

    onNavigationStateChange = (navState) => {
        this.setState({
            backButtonEnabled: navState.canGoBack,
        });
    };
    
    render() {
        return (
            <View style={styles.container}>
                <WebView
                ref={WEBVIEW_REF}
                source={{uri:this.state.url}}
                onNavigationStateChange={this.onNavigationStateChange}
                style={{marginTop: 20}}
                />
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
