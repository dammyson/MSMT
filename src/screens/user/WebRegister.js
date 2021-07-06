import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, Image, Text, Dimensions, ProgressBarAndroid, StatusBar, Alert, FlatList, TouchableOpacity, ImageBackground, AsyncStorage, View } from 'react-native';

import { Container, Content, Button, Left, } from 'native-base';
import { Icon } from 'react-native-elements';
import { lightTheme } from '../../theme/colors';


export default class WebRegister extends Component {


    constructor(props) {
        super(props);
        this.state = {
            url: this.props.route.params.url,
           // url:'https://mhealthdev.azurewebsites.net/Identity/Account/Login',
            done: false,
            loading: false,
            amount: 0,
            tempory: [],
            topDetails: '',
            urLdetails: [],
            operation_message: '',
            complete_transaction: false,
            fail_transaction: false,
            show_logout: false,
            curr: ''
        };
    }

    componentDidMount() {
    
       

    }

    async _onNavigationStateChange(navState) {
        console.warn(navState)
        if (navState.url.includes('Identity/Account/Login')) {
            this.props.navigation.navigate('rdone', {message: 'Congratulation'})
        }else if (navState.url.includes('Applicant/Completed?')) {
            this.props.navigation.navigate('rdone', {message: 'congratulation'})
        }

    }


    render() {
        const { state, goBack } = this.props.navigation;

        return (
            <>
                {this.renderBody()}
            
            </>
        );
    }




    renderBody() {
        const { state, goBack } = this.props.navigation;
        return (<View style={{ flex: 1, justifyContent: 'center' }}>
            <WebView
                originWhitelist={['*']}
                source={{ uri: this.state.url }}
                onNavigationStateChange={this._onNavigationStateChange.bind(this)}
            />
            <TouchableOpacity style={styles.fab} onPress={() => this.props.navigation.goBack()}>
                <Icon
                    active
                    name="close"
                    type='antdesign'
                    color='#fff'
                    size={20}
                />
            </TouchableOpacity>



            <View style={styles.fabtwo} onPress={() => goBack(null)}>
                <ProgressBarAndroid style={{ width: Dimensions.get('window').width - 40 }} styleAttr="Horizontal" />
            </View>
        </View>)
    }

 
}


const styles = StyleSheet.create({
    loadingBackgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    fab: {
        height: 40,
        width: 40,
        borderRadius: 200,
        position: 'absolute',
        top: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: lightTheme.PRIMARY_BUTTON_COLOR,
    },
    fabtwo: {
        height: 10,
        width: Dimensions.get('window').width - 40,
        borderRadius: 200,
        position: 'absolute',
        top: 7,
        left: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },



});


