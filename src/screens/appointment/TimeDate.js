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
import { getToken, showTopNotification, processResponse, baseUrl } from '../../utilities';
import Moment from 'moment';
Moment.locale('en');
const moment = require('moment');

const width = Dimensions.get('window').width;
const single_with = width / 100;
const stage_1 = width / single_with;
const percentage = (width / single_with) / width * 100;
const sty = percentage.toString() + "%"


export default class TimeData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            sel_time: '',
            starCount: 5,
            display_days: [],
            selected: { day: 'M', date: 3, full: "01/01/2021"},
            clinician: ''
        };
    }

    async componentDidMount() {
        this.getDates()
        const { clinician } = this.props.route.params;
        this.setState({
            clinician: clinician,
        });
    }


    getDates() {

        var instant_array = []
        var today = new Date();
        for (let i = 3; i >= 1; i--) {
            var new_date = moment(today, "DD-MM-YYYY").subtract(i, 'days');
            var res = Moment(new_date).format('D-dd-MM/DD/YYYY').split("-");
            instant_array.push({ day: res[1], date: res[0] })
        }
        var res = Moment(today).format('D-dd-MM/DD/YYYY').split("-");
        instant_array.push({ day: res[1], date: res[0] ,  full:res[2] })
        this.setState({ selected: { day: res[1], date: res[0],  full:res[2] } })
        for (let i = 1; i <= 3; i++) {
            var new_date = moment(today, "DD-MM-YYYY").add(i, 'days');
            var res = Moment(new_date).format('D-dd-MM/DD/YYYY').split("-");
            instant_array.push({ day: res[1], date: res[0], full:res[2] })
        }

        this.setState({ display_days: instant_array })
    }

    selDay(data) {
        console.warn(data)
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

            <Container style={{ backgroundColor: lightTheme.WHITE_COLOR }}>
                <StatusBar backgroundColor={lightTheme.PRIMARY_COLOR} barStyle="dark-content" />
                <Navbar left={left} title='Appointment' bg='#101023' />
                <Content>

                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>
                            <View style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#F6F6F6', }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', flexDirection: 'row', }}>
                                    <Text style={{ fontFamily: font.BOLD, fontSize: 40, marginBottom: 2, marginTop: 2, marginRight: 7, color: lightTheme.PRIMARY_TEXT_COLOR }}>{Moment(new Date()).format('D')}</Text>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: font.REGULAR, fontSize: 14, marginBottom: 2, color: lightTheme.SMALL_BODY_TEXT_COLOR }}>{Moment(new Date()).format('ddd')}</Text>
                                        <Text style={{ fontFamily: font.REGULAR, fontSize: 14, marginBottom: 2, color: lightTheme.SMALL_BODY_TEXT_COLOR }}> {Moment(new Date()).format('MMM YYYY')} </Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')} style={styles.appointmentButtonStyle}>
                                        <Text style={{ fontFamily: font.BOLD, marginHorizontal: 15, fontSize: 14, color: '#4DC591' }}>Today</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ marginVertical: 10, marginHorizontal: 10, justifyContent: 'center', flexDirection: 'row' }}>
                                <ScrollView showsHorizontalScrollIndicator={false} style={{}} horizontal>
                                    {this.renderdays(this.state.display_days)}

                                </ScrollView>
                            </View>

                            <View style={{ height: 0.6, opacity: 0.4, marginVertical: 10, backgroundColor: lightTheme.SMALL_BODY_TEXT_COLOR }} />

                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: font.BOLD, fontSize: 16, marginBottom: 2, marginTop: 2, color: '#A74343' }}>Morning Time: 8am - 12noon</Text>
                                </View>
                            </View>

                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, marginTop: 15, flexWrap: 'wrap', flexDirection: 'row' }}>
                                {this.renderTimes(times)}
                            </View>

                            <View style={{ height: 0.5, opacity: 0.4, marginVertical: 10, backgroundColor: lightTheme.SMALL_BODY_TEXT_COLOR }} />


                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: font.BOLD, fontSize: 16, marginBottom: 2, marginTop: 2, color: '#A74343' }}>Afternoon Time: 12pm - 4pm</Text>
                                </View>
                            </View>

                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, marginTop: 15, flexWrap: 'wrap', flexDirection: 'row' }}>
                                {this.renderTimes(timesafter)}
                            </View>
                            <View style={{ height: 0.5, opacity: 0.6, backgroundColor: lightTheme.SMALL_BODY_TEXT_COLOR }} />

                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: font.BOLD, fontSize: 16, marginBottom: 2, marginTop: 2, color: '#A74343' }}>Evening Time: 4pm - 9pm</Text>
                                </View>
                            </View>

                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, marginTop: 15, flexWrap: 'wrap', flexDirection: 'row' }}>
                                {this.renderTimes(timesafeven)}
                            </View>
                            <View style={{ marginTop: 15, }}>
                                <TouchableOpacity onPress={() => this.hanedProceedButton()} style={buttonStyles.primaryButtonStyle}>
                                    <Text style={[buttonStyles.primaryButtonTextStyle]}>Proceed</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Content>
            </Container>

        );
    }

    hanedProceedButton() {
       const {sel_time, selected, clinician} = this.state

       if(sel_time == ""){
        showTopNotification("error", 'Select time date and time',3)
           return
       }

       let appointment_datetime = {
           clinician: clinician,
           time: sel_time,
           date: selected
       }

    
        this.props.navigation.navigate('appointment_information', { appointment_datetime : appointment_datetime})
    }

    renderdays(data) {
        let packages = [];
        var selected = this.state.selected
        for (var i = 0; i < data.length; i++) {
            let sel = i
            packages.push(
                <View style={{ marginHorizontal: 5, marginVertical: 10, borderRadius: 10, backgroundColor: lightTheme.WHITE_COLOR }}>
                    <TouchableOpacity onPress={() => this.selDay(data[sel])} style={[styles.inactive, selected.date == data[i].date & selected.day == data[i].day ? styles.active : null]}>
                        <Text style={{ color: lightTheme.SMALL_BODY_TEXT_COLOR, opacity: 0.6, fontFamily: font.BOLD, fontSize: 10, }}>{data[i].day}</Text>
                        <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.BOLD, fontSize: 15, }}>{data[i].date} </Text>
                    </TouchableOpacity>
                </View>

            );
        }
        return packages;
    }


    renderTimes(data) {
        let packages = [];
        var selected = this.state.selected
        for (var i = 0; i < data.length; i++) {
            let selected = i
            packages.push(
                <View style={[styles.cell]}>
                    <TouchableOpacity
                        onPress={() => this.selectTime(data[selected].value)}
                        style={[{ width: 80, alignItems: 'center', borderColor: lightTheme.SMALL_BODY_TEXT_COLOR, borderRadius: 4, borderWidth: 0.7, padding: 3, margin: 5 }, this.state.sel_time == data[i].value ? { backgroundColor: "#FF7648" } : {}]}>
                        <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 12, }}>{data[i].value}</Text>
                    </TouchableOpacity>
                </View>

            );
        }
        return packages;
    }
    selectTime(value) {
        console.warn(value)
        this.setState({ sel_time: value })
    }

}


const packagesa = [
    {
        title: 'Cardio Screening \n          ',
        text: 'For the most complete assessment of the cardiovascular system.',
        bg: '#D3B0E025',
        text_color: "#A74343"

    },

];


const times = [
    {
        value: '08:00 AM',
    },
    {
        value: '08:30 AM',
    },
    {
        value: '09:00 AM',
    },
    {
        value: '09:30 AM',
    },
    {
        value: '10:00 AM',
    },
    {
        value: '10:30 AM',
    },
    {
        value: '11:00 AM',
    },
    {
        value: '11:30 PM',
    },
    {
        value: '12:00 AM',
    },
];

const timesafter = [
    {
        value: '12:00 PM',
    },
    {
        value: '12:30 PM',
    },
    {
        value: '13:00 PM',
    },
    {
        value: '13:30 AM',
    },
    {
        value: '14:00 AM',
    },
    {
        value: '14:30 AM',
    },
    {
        value: '15:00 AM',
    },
    {
        value: '15:30 PM',
    },
    {
        value: '16:00 AM',
    },
];
const timesafeven = [
    {
        value: '16:00 PM',
    },
    {
        value: '16:30 PM',
    },
    {
        value: '17:00 PM',
    },
    {
        value: '17:30 AM',
    },
    {
        value: '18:00 AM',
    },
    {
        value: '18:30 AM',
    },
    {
        value: '19:00 AM',
    },
    {
        value: '19:30 PM',
    },
    {
        value: '20:00 AM',
    },

    {
        value: '20:30 AM',
    },
    {
        value: '21:00 AM',
    },
];
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
        justifyContent: 'flex-start',
    },
    appointmentButtonStyle: {
        height: 38,
        borderRadius: 6,
        paddingHorizontal: 5,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4DC59140',

    },
    inactive: {
        margin: 2,
        justifyContent: 'center',
        marginTop: 10,
        alignItems: 'center',
        width: 40,
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    active: {
        backgroundColor: '#FF7648',

        borderRadius: 10
    },

    piceContainer: {
        flexDirection: 'row'
    },
    table: {
        marginTop: 15,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    cell: {
        flexBasis: sty,
        flex: 1,
    },


});
