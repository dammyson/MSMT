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

export default class TimeData extends Component {
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
            display_days: [],
            selected:{day: 'M', date: 3 }
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
        this.setState({ selected:{ day: res[1], date: res[0] } })
        for (let i = 1; i <= 3; i++) {
            var new_date = moment(today, "DD-MM-YYYY").add(i, 'days');
            var res = Moment(new_date).format('D/dd').split("/");
            instant_array.push({ day: res[1], date: res[0] })
        }

        this.setState({ display_days: instant_array })
    }

    selDay(data){
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
                <Navbar left={left} title='' bg='#101023' />
                <Content>

                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>
                            <View style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#F6F6F6', }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', flexDirection: 'row', }}>
                                    <Text style={{ fontFamily: font.BOLD, fontSize: 40, marginBottom: 2, marginTop: 2, marginRight: 7, color: lightTheme.PRIMARY_TEXT_COLOR }}>24</Text>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: font.REGULAR, fontSize: 14, marginBottom: 2, color: lightTheme.SMALL_BODY_TEXT_COLOR }}>Wed</Text>
                                        <Text style={{ fontFamily: font.REGULAR, fontSize: 14, marginBottom: 2, color: lightTheme.SMALL_BODY_TEXT_COLOR }}> Jan 2021 </Text>
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


                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{  fontFamily: font.BOLD, fontSize: 16, marginBottom: 2, marginTop: 2, color:'#A74343' }}>Morning Time: 8am - 12noon</Text>
                                    </View>
                            </View>

                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                              
                            </View>

                            <View style={{hieght:4, backgroundColor:lightTheme.SMALL_BODY_TEXT_COLOR }}/>


                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{  fontFamily: font.BOLD, fontSize: 16, marginBottom: 2, marginTop: 2, color:'#A74343' }}>Afternoon Time: 12pm - 4pm</Text>
                                    </View>
                            </View>

                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                              
                            </View>


                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{  fontFamily: font.BOLD, fontSize: 16, marginBottom: 2, marginTop: 2, color:'#A74343' }}>Evening Time: 4pm - 9pm</Text>
                                    </View>
                            </View>

                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                              
                            </View>

                        </View>
                    </View>

                </Content>
            </Container>

        );
    }



    renderdays(data) {
        let packages = [];
        var selected = this.state.selected
        for (var i = 0; i < data.length; i++) {
            packages.push(
                <View style={{ marginHorizontal: 5, marginVertical: 10, borderRadius: 10, backgroundColor: lightTheme.WHITE_COLOR }}>
                    <View style={[styles.inactive, selected.date == data[i].date &  selected.day == data[i].day ? styles.active : null]}>
                        <Text style={{ color: lightTheme.SMALL_BODY_TEXT_COLOR, opacity: 0.6, fontFamily: font.BOLD, fontSize: 10, }}>{data[i].day}</Text>
                        <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.BOLD, fontSize: 15, }}>{data[i].date} </Text>
                    </View>
                </View>

            );
        }
        return packages;
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


const doctors = [
    {
        image: images.user,
        name: 'Josephina Ibrahim Abubakar',
        job: 'General Practitioner',


    },
    {
        image: images.user,
        name: 'Josephina Ibrahim Abubakar',
        job: 'General Practitioner',
    },
    {
        image: images.user,
        name: 'Josephina Ibrahim Abubakar',
        job: 'General Practitioner',


    },
    {
        image: images.user,
        name: 'Josephina Ibrahim Abubakar',
        job: 'General Practitioner',
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
        flexBasis: '50%',
        flex: 1,
    },


});
