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
import * as images from '../../assets/images';
import { Container, Content, Button, Left, } from 'native-base';
import { lightTheme } from '../../theme/colors';
import { font } from '../../constants';
import { buttonStyles } from '../../theme/ButtonStyle';
import { Icon } from 'react-native-elements';
import ActivityIndicator from '../../components/ActivityIndicator';
import { getToken, showTopNotification, processResponse, baseUrl , getPaystackKey} from '../../utilities';
import Navbar from '../../components/Navbar';
import RNPaystack from 'react-native-paystack';
RNPaystack.init({ publicKey: getPaystackKey() });


export default class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            cv: '',
            ex: '',
            cn: '',
            cname: '',
           // appointment_information: this.props.route.params.appointment_information,
           // amount:this.props.route.params.appointment_information.amount
        };
    }

    async componentDidMount() {
     
    }


    handleChange = (text) => {

        let textTemp = text;
        if (textTemp[0] !== '1' && textTemp[0] !== '0') {
            textTemp = '';
        }
        if (textTemp.length === 2) {
            if (parseInt(textTemp.substring(0, 2)) > 12 || parseInt(textTemp.substring(0, 2)) == 0) {
                textTemp = textTemp[0];
            } else if (this.state.ex.length === 1) {
                textTemp += '/';
            } else {
                textTemp = textTemp[0];
            }
        }
        this.setState({ ex: textTemp })
    }


    chargeCard() {

        const { cn, ex, cv, amount, data, email } = this.state

        var card_lenghts = [16, 17, 18, 19, 20];
        if (!card_lenghts.includes(cn.length)) {
            Alert.alert('Operation failed', 'Invalide card number, remove spaces if present', [{ text: 'Okay' }])
            return
        }


        if (!ex.includes('/')) {
            Alert.alert('Operation failed', 'Invalide Expiry date', [{ text: 'Okay' }])
            return
        }
        if (cv.length != 3) {
            Alert.alert('Operation failed', 'Invalide card cvv', [{ text: 'Okay' }])
            return
        }

        var res = ex.split("/");
        this.setState({ loading: true })
        RNPaystack.chargeCard({
            cardNumber: cn,
            expiryMonth: res[0],
            expiryYear: res[1],
            cvc: cv,
            email: email,
            amountInKobo: amount * 100,
        })
            .then(response => {
                console.warn(response); // card charged successfully, get reference here
                this.processPostPayment(response)
            })
            .catch(error => {
                this.setState({ loading: false })
                console.warn(error);
                Alert.alert('Process failed', error.message, [{ text: 'Okay' }])// error is a javascript Error object
            })

    }


  async  processPostPayment(res) {

        console.warn(value)
        const { appointment_information } = this.state
        let information = {
            appointmentId: appointment_information,
            amount: appointment_information,
            transactionReference: appointment_information,
            
        }
        console.warn(information)
        this.setState({ loading: true, loading_msg:'creating appointment...'})
        fetch( baseUrl() +'/Appointment/bookAppointment', {
            method: 'POST', headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + await getToken(),
            }, body: JSON.stringify(information),
          })
          .then(processResponse)
            .then(res => {
                this.setState({ loading: false})
              const{ statusCode, data} = res
              console.warn(statusCode, data)
              if (statusCode == 200) {
                showTopNotification("success", data.message, 3)
                this.props.navigation.navigate('mode_appointment', { appointment_information : data.data})
                
              } else {
                showTopNotification("error", data.message, 3)
              }
            }).catch((error) => {
              showTopNotification("error", error.message, 3)
              this.setState({ loading: false})
            });
    }

    render() {

        var left = (
            <Left style={{ flex: 1 }}>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                    <Icon
                        active
                        name="keyboard-arrow-left"
                        type='material'
                        size={35}
                        color='#FFF'
                    />
                </Button>
            </Left>
        );

        return (

            <Container style={{ backgroundColor: lightTheme.INPUT_BACKGROUND_COLOR }}>
                <StatusBar backgroundColor={lightTheme.PRIMARY_COLOR} barStyle="dark-content" />
                <Navbar left={left} title='Payment' />
                <Content>

                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>

                            <View style={styles.user_box}>
                                <View style={{ flex: 1, marginHorizontal: 20, marginVertical: 10, marginBottom:15, }}>
                                    <View style={{ flex: 1, marginLeft: 5, }}>
                                        <TextInput
                                            placeholder="Name on card"
                                            placeholderTextColor={lightTheme.PRIMARY_LIGHT_TEXT_COLOR}
                                            returnKeyType="next"
                                            keyboardType='default'
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1, fontSize: 20, color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.BOLD, }}
                                            onChangeText={(text) => this.setState({ cname: text })}
                                            onSubmitEditing={() => this.loginRequest()}
                                        />
                                    </View>
                                </View>
                            </View>


                            <View style={styles.user_box}>
                                <Text style={{ marginHorizontal: 20, fontFamily: font.BOLD, fontSize: 16, opacity:0.6,  color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR, }}>Card number</Text>
                                <View style={{ flex: 1, marginHorizontal: 20, marginBottom: 10, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, marginLeft: 5, }}>
                                        <TextInput
                                            placeholder="**** **** **** ****"
                                            placeholderTextColor={lightTheme.PRIMARY_LIGHT_TEXT_COLOR}
                                            returnKeyType="next"
                                            keyboardType='default'
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1, fontSize: 16, color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.BOLD, }}
                                            onChangeText={(text) => this.setState({ cn: text })}
                                            onSubmitEditing={() => this.loginRequest()}
                                        />
                                    </View>


                                    <View style={{ marginHorizontal: 5 }}>
                                        <Icon
                                            active
                                            name="mastercard"
                                            type='fontisto'
                                            size={25}
                                            color='#080256'
                                        />
                                    </View>
                                </View>
                            </View>


                            <View style={styles.user_box}>
                                <Text style={{ marginHorizontal: 20, opacity:0.6,  fontFamily: font.BOLD, fontSize: 16, color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR, }}>Expire</Text>
                                <View style={{ flex: 1, marginHorizontal: 20, marginBottom: 10, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, marginLeft: 5, }}>
                                        <TextInput
                                            placeholder="03/24"
                                            placeholderTextColor={lightTheme.PRIMARY_LIGHT_TEXT_COLOR}
                                            returnKeyType="next"
                                            keyboardType='numeric'
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1, fontSize: 16, color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.BOLD, }}
                                            onChangeText={this.handleChange} 
                                            defaultValue={this.state.ex} 
                                            maxLength={5}
                                           
                                        />
                                    </View>
                                </View>
                            </View>


                            <View style={styles.user_box}>
                                <Text style={{ marginHorizontal: 20, opacity:0.6, fontFamily: font.BOLD, fontSize: 16, color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR, }}>CVV</Text>
                                <View style={{ flex: 1, marginHorizontal: 20, marginBottom: 10, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, marginLeft: 5, }}>
                                        <TextInput
                                            placeholder="234"
                                            placeholderTextColor={lightTheme.PRIMARY_LIGHT_TEXT_COLOR}
                                            returnKeyType="next"
                                            keyboardType='numeric'
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1, fontSize: 16, color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.BOLD, }}
                                            onChangeText={(text) => this.setState({ cv: text })}
                                            onSubmitEditing={() => this.loginRequest()}
                                        />
                                    </View>

                                    <View style={{ marginHorizontal: 5 }}>
                                        <Icon
                                            active
                                            name="questioncircleo"
                                            type='antdesign'
                                            size={25}
                                            color='#08025660'
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginHorizontal: 15, marginVertical: 5, flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity >
                                    <Icon
                                        active
                                        name={"check-box-outline-blank"}
                                        type='material'
                                        size={25}
                                        color={lightTheme.SMALL_BODY_TEXT_COLOR}
                                    />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: font.SEMI_BOLD, fontSize: 13, color: lightTheme.SMALL_BODY_TEXT_COLOR }}>Set as default payment method</Text>

                            </View>



                            <View style={{ marginTop: 15, }}>
                                <TouchableOpacity onPress={() => this.chargeCard()} style={buttonStyles.primaryButtonStyle}>
                                    <Text style={[buttonStyles.primaryButtonTextStyle]}>Proceed</Text>
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
        paddingHorizontal: 5,
        paddingVertical: 20,
        justifyContent: 'flex-start',
    },

    user_box: {
        flex: 1,
        paddingTop: 10,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        marginVertical: 10,
        backgroundColor: lightTheme.WHITE_COLOR,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5
    }



});
