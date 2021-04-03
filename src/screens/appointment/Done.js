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


export default class Done extends Component {
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
                <StatusBar backgroundColor={lightTheme.WHITE_COLOR} barStyle="dark-content" />
                <Content>

                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>

                            <View style={{ alignItems: 'center', }}>
                                <Image source={images.success} style={{ margin: 20, }} />
                              
                            </View>

                            <View style={{ marginHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: font.BOLD, fontSize: 30, marginTop: 2, color: lightTheme.PRIMARY_TEXT_COLOR }}>Booking Successful</Text>
                                <Text style={{ fontFamily: font.REGULAR, fontSize: 15, marginTop: 5,  color:lightTheme.PRIMARY_TEXT_COLOR, textAlign: 'center' }}>Your appointment booking with 
                                <Text style={{ fontFamily: font.REGULAR, fontSize: 15, color: '#A74343', textAlign: 'center' }}> Dr. Johnson Jones Joseph</Text> was successful.</Text>
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
