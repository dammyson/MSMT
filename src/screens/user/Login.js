import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    StatusBar,
    Alert,
    Dimensions,

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { Container, Content } from 'native-base';
import { lightTheme } from '../../theme/colors';
import { font, fontSizes } from '../../constants';
import { buttonStyles } from '../../theme/ButtonStyle';
import { Icon } from 'react-native-elements';
import { textInputStyles } from '../../theme/TextInputStyle';
import ActivityIndicator from '../../components/ActivityIndicator';
import { baseUrl, showTopNotification, processResponse, storeToken, storeUserDetails } from '../../utilities';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
            password: '',
            image1: '',
            image1_display: '',
            is_valide_mail: false,
            done: false,
            show_camera: false,
            secureTextEntry: true
        };
    }

    async componentDidMount() {

    }



    validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            this.setState({ email: text, is_valide_mail: false })
            return false;
        }
        else {
            this.setState({ email: text, is_valide_mail: true })
        }
    }

    updateSecureTextEntry = () => {
        this.setState({ secureTextEntry: this.state.secureTextEntry ? false : true })
    }

    loginRequest(){
        const{ email, password, is_valide_mail} = this.state
        if(!is_valide_mail){
            showTopNotification("warn", "The email provided is invalid", 3)
            return
        }
        if(password.length < 4){
            showTopNotification("warn", "The password is to short", 3)
            return
        }
        this.setState({ loading: true})
        fetch('https://mhealthwebapi.azurewebsites.net/api/Auth/authenticate', {
            method: 'POST', headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }, body: JSON.stringify({
                email:email,
                password:password
            }),
          })
          .then(processResponse)
            .then(res => {
                this.setState({ loading: false})
              const{ statusCode, data} = res
              console.warn(statusCode, data)
              if (statusCode == 200) {
                storeToken(data.data.token)
                storeUserDetails(data.data)
                AsyncStorage.setItem('rem', 'login');
                if(data.data.role == 'client'){
                    this.props.navigation.replace('App')
                }else{
                    this.props.navigation.replace('ProviderApp')
                }
            
              } else {
                showTopNotification("error", data.message, 3)
              }
            }).catch((error) => {
              showTopNotification("erroe", error.message, 3)
              this.setState({ loading: false})
            });
    }



    render() {
        
        return (

            <Container style={{ backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR }}>
                <StatusBar backgroundColor="transparent" barStyle="dark-content" />
                <Content>
                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>

                            <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'flex-start', marginBottom: 15, }}>
                                <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 26, marginBottom: 2, marginTop: 2 }}>Login</Text>
                            </View>

                            <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'flex-start', marginBottom: 30, }}>
                                <Text style={[styles.textInputStyles, { fontFamily: font.REGULAR, }]}>Enter your emails and password</Text>
                            </View>

                            <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'flex-start', marginBottom: 5, }}>
                                <Text style={textInputStyles.action_text}>Email</Text>
                            </View>
                            <View style={textInputStyles.textInputContainer}>

                                <View style={textInputStyles.input}>
                                    <TextInput
                                        placeholder="mymail@yahoo.com "
                                        placeholderTextColor={lightTheme.PRIMARY_LIGHT_TEXT_COLOR}
                                        returnKeyType="next"
                                        keyboardType='email-address'
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        defaultValue={this.state.email}
                                        style={{ flex: 1, fontSize: 16, color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: 'Poppins-SemiBold', }}
                                        onChangeText={(text) => this.validate(text)}
                                        onSubmitEditing={() => this.passwordInput.focus()}
                                    />
                                </View>


                                <View style={textInputStyles.operation_icon}>
                                    {this.state.is_valide_mail ?
                                        <Animatable.View
                                            animation="bounceIn"
                                        >
                                            <Icon
                                                name="check-circle"
                                                color="green"
                                                size={20}
                                                type='feather'


                                            />
                                        </Animatable.View>
                                        : null}

                                </View>
                            </View>
                            <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'flex-start', marginBottom: 5, }}>
                                <Text style={textInputStyles.action_text}>Password</Text>
                            </View>
                            <View style={textInputStyles.textInputContainer}>
                                <View style={textInputStyles.input}>
                                    <TextInput
                                        placeholder="password "
                                        secureTextEntry={this.state.secureTextEntry}
                                        placeholderTextColor={lightTheme.PRIMARY_LIGHT_TEXT_COLOR}
                                        returnKeyType="next"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        style={{ flex: 1, fontSize: 16, color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: 'Poppins-SemiBold', }}
                                        onChangeText={(text) => this.setState({ password: text })}
                                        onSubmitEditing={() => this.loginRequest()}
                                    />
                                </View>

                                <View style={textInputStyles.operation_icon}>
                                    <TouchableOpacity
                                        onPress={() => this.updateSecureTextEntry()}
                                    >
                                        {!this.state.secureTextEntry ?
                                            <Icon
                                                name="eye-off-outline"
                                                type='material-community'
                                                color="grey"
                                                size={20}
                                            />
                                            :
                                            <Icon
                                                name="eye-outline"
                                                type='material-community'
                                                color="grey"
                                                size={20}
                                            />
                                        }
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <View style={{ marginLeft: 20, marginRight: 20, alignItems: 'flex-end', marginBottom: 10, }}>
                                <Text style={[{ fontFamily: font.REGULAR, fontSize: 14, color: lightTheme.PRIMARY_TEXT_COLOR }]}>Forgot Password?</Text>
                            </View>

                            <TouchableOpacity onPress={() => this.loginRequest()} style={buttonStyles.primaryButtonStyle}>
                                <Text style={[buttonStyles.primaryButtonTextStyle]}>Login</Text>
                            </TouchableOpacity>
                            <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 10, }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ color: '#193a4d', fontFamily: font.REGULAR, fontSize: 15, marginBottom: 7, marginTop: 7 }}>Don’t have an account? </Text>
                                </View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('user_type')} style={{ alignItems: 'center' }}>
                                    <Text style={{ color: lightTheme.PRIMARY_COLOR, fontFamily: font.REGULAR, fontSize: 15, marginBottom: 7, marginTop: 7 }}> Sign up</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                </Content>
                {this.state.loading?  <ActivityIndicator message={'Loading...'} /> : null}
            </Container>
            

        );
    }



}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    mainbody: {
        flex: 1,

        justifyContent: 'center',
    },

});
