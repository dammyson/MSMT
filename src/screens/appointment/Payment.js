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
import { textInputStyles } from '../../theme/TextInputStyle';
import { ScrollView } from 'react-native';
import Navbar from '../../components/Navbar';
import Moment from 'moment';
Moment.locale('en');
const moment = require('moment');

const width = Dimensions.get('window').width;
const single_with = width / 100;
const stage_1 = width / single_with;
const percentage = (width / single_with) / width * 100;
const sty = percentage.toString() + "%"


export default class Payment extends Component {
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
            starCount: 5,
            selected_symptoms: ['Migraine', 'Headache'],
            selected: { day: 'M', date: 3 }
        };
    }

    async componentDidMount() {
        this.getDates()
    }


    getDates() {

        var instant_array = []
        var today = new Date();
        for (let i = 3; i >= 1; i--) {
            var new_date = moment(today, "DD-MM-YYYY").subtract(i, 'days');
            var res = Moment(new_date).format('D/dd').split("/");
            instant_array.push({ day: res[1], date: res[0] })
        }
        var res = Moment(today).format('D/dd').split("/");
        instant_array.push({ day: res[1], date: res[0] })
        this.setState({ selected: { day: res[1], date: res[0] } })
        for (let i = 1; i <= 3; i++) {
            var new_date = moment(today, "DD-MM-YYYY").add(i, 'days');
            var res = Moment(new_date).format('D/dd').split("/");
            instant_array.push({ day: res[1], date: res[0] })
        }

        this.setState({ display_days: instant_array })
    }

    selDay(data) {
        this.setState({ selected: data })
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
                                            onChangeText={(text) => this.setState({ password: text })}
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
                                            onChangeText={(text) => this.setState({ password: text })}
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
                                            onChangeText={(text) => this.setState({ password: text })}
                                            onSubmitEditing={() => this.loginRequest()}
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
                                            onChangeText={(text) => this.setState({ password: text })}
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
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')} style={buttonStyles.primaryButtonStyle}>
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
