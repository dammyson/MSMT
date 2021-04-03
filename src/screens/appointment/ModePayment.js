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
import { font, fontSizes } from '../../constants';
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


export default class ModePayment extends Component {
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
                <Navbar left={left} title='Mode of Payment' />
                <Content>

                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>

                            <TouchableOpacity style={styles.user_box}>

                                <View style={{ alignItems: 'flex-start', margin: 20 }}>
                                    <Text style={{ fontFamily: font.BOLD, fontSize: 14, color: lightTheme.PRIMARY_TEXT_COLOR }}>Wallet</Text>
                                    <Text style={{ fontFamily: font.REGULAR, fontSize: 11, color: lightTheme.SMALL_BODY_TEXT_COLOR, marginBottom: 10 }}>Counselling Assessment</Text>

                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.user_box}>

                                <View style={{ alignItems: 'flex-start', margin: 20 }}>
                                    <Text style={{ fontFamily: font.BOLD, fontSize: 14, color: lightTheme.PRIMARY_TEXT_COLOR, marginBottom: 10 }}>Online Payment</Text>
                                    <View style={{ alignItems: 'flex-start', flexDirection: 'row' }}>

                                        <View style={{ marginHorizontal: 5 }}>
                                            <Icon
                                                active
                                                name="visa"
                                                type='fontisto'
                                                size={35}
                                                color='#080256'
                                            />
                                        </View>
                                        <View style={{ marginHorizontal: 5 }}>
                                            <Icon
                                                active
                                                name="mastercard"
                                                type='fontisto'
                                                size={35}
                                                color='#080256'
                                            />
                                        </View>
                                        <View style={{ marginHorizontal: 5 }}>
                                            <Icon
                                                active
                                                name="paypal"
                                                type='fontisto'
                                                size={35}
                                                color='#080256'
                                            />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>

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
