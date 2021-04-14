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
    Image,
    Keyboard,
    NativeModules,
    PermissionsAndroid,
    ImageBackground

} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Container, Content } from 'native-base';
import { lightTheme } from '../../theme/colors';
import { font, fontSizes } from '../../constants';
import { buttonStyles } from '../../theme/ButtonStyle';
import { Icon } from 'react-native-elements';
import { textInputStyles } from '../../theme/TextInputStyle';
import SelectAddressType from '../../components/SelectAddressType';


export default class Register extends Component {
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
            show_camera: false
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





    render() {

        return (

            <Container style={{ backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR }}>
                <StatusBar  backgroundColor="transparent" barStyle="dark-content" />
                <Content>
                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>

                            <View style={{ marginLeft: 20, marginRight: 20,justifyContent: 'flex-start', marginBottom: 15, }}>
                                <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 26, marginBottom: 2, marginTop: 2 }}>Sign Up</Text>
                            </View>

                            <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'flex-start', marginBottom: 30, }}>
                                <Text style={[styles.textInputStyles, { fontFamily: font.REGULAR, }]}>Enter your credentials to continue</Text>
                            </View>







                            <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'flex-start', marginBottom: 5, }}>
                                <Text style={textInputStyles.action_text}>Full Name</Text>
                            </View>
                            <View style={textInputStyles.textInputContainer}>

                                <View style={textInputStyles.input}>
                                    <TextInput
                                        placeholder="Full name "
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

                            <View style={{ flexDirection: 'row', marginBottom: 5, }}>
                                <View style={{ flex: 2 }}> 
                                    <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'flex-start', marginBottom: 5, }}>
                                        <Text style={textInputStyles.action_text}>Mobile Number</Text>
                                    </View>
                                    <View style={textInputStyles.textInputContainer}>

                                        <View style={textInputStyles.input}>
                                            <TextInput
                                                placeholder="Full name "
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




                                    </View>

                                </View>

                                <View style={{ flex: 1 }}>
                                    <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'flex-start', marginBottom: 5, }}>
                                        <Text style={textInputStyles.action_text}>Gender</Text>
                                    </View>
                                    <View style={textInputStyles.textInputContainer}>

                                        <View style={textInputStyles.input}>
                                            <TextInput
                                                placeholder="Full name "
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




                                    </View>

                                </View>
                            </View>
                            <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'flex-start', marginBottom: 5, }}>
                                <Text style={textInputStyles.action_text}>Password</Text>
                            </View>
                            <View style={textInputStyles.textInputContainer}>
                                <View style={textInputStyles.input}>
                                    <TextInput
                                        placeholder="password "
                                        secureTextEntry
                                        placeholderTextColor={lightTheme.PRIMARY_LIGHT_TEXT_COLOR}
                                        returnKeyType="next"
                                        keyboardType='password'
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





                            <View style={{ marginLeft: 25, marginRight: 25, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 10, }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ color: '#193a4d', fontFamily: font.REGULAR, fontSize: 14, marginBottom: 7, marginTop: 7 }}>By continuing you agree to our
                                    <Text style={{ color: lightTheme.SECONDARY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, }}> Terms of Service </Text>

                                    and
                                    <Text style={{ color: lightTheme.SECONDARY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, }}> Privacy Policy. </Text>
                                    </Text>
                                </View>

                            </View>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')} style={buttonStyles.primaryButtonStyle}>
                                <Text style={[buttonStyles.primaryButtonTextStyle]}>Get Started</Text>
                            </TouchableOpacity>
                            <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 10, }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ color: '#193a4d', fontFamily: font.REGULAR, fontSize: 15, marginBottom: 7, marginTop: 7 }}>Already have an account?  </Text>
                                </View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={{ alignItems: 'center' }}>
                                    <Text style={{ color: lightTheme.SECONDARY_TEXT_COLOR, fontFamily: font.REGULAR, fontSize: 15, marginBottom: 7, marginTop: 7 }}>Login</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                </Content>
                
             
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
       
    },
    mainbody: {
        flex: 1,
paddingTop: 80,
        justifyContent: 'center',
    },

});
