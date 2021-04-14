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


export default class AppointmentInformation extends Component {
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

            <Container style={{ backgroundColor: lightTheme.WHITE_COLOR }}>
                <StatusBar backgroundColor={lightTheme.PRIMARY_COLOR} barStyle="dark-content" />
                <Navbar left={left} title='Additional Information' bg='#101023' />
                <Content>

                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>

                            <View style={{ marginHorizontal: 10, justifyContent: 'center', }}>
                                <Text style={{ fontFamily: font.SEMI_BOLD, fontSize: 16, marginTop: 2, color: '#080256' }}>Previous Diagnosis</Text>

                            </View>

                            <View style={{ marginHorizontal: 10, justifyContent: 'center', }}>
                              {this.renderSymptom(times)}

                            </View>

                           

                            <View style={{ marginHorizontal: 5, marginTop: 20 }}>
                                <View style={{ marginHorizontal: 10, justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: font.SEMI_BOLD, fontSize: 16, marginTop: 2, color: '#080256' }}>What are your allergies</Text>
                                    <Text style={{ fontFamily: font.REGULAR, fontSize: 13, color: '#A74343' }}>Separate with comma(,)</Text>
                                </View>
                                <View style={textInputStyles.textAreaContainer} >
                                    <TextInput
                                        style={textInputStyles.textArea}
                                        underlineColorAndroid="transparent"
                                        placeholder="Input Note"
                                        placeholderTextColor={lightTheme.SUB_TEXT_COLOR}
                                        placeholderTextColor="gray"
                                        numberOfLines={5}
                                        multiline={true}
                                        onSubmitEditing={() => this.proceedAppointment()}
                                        onChangeText={text => this.setState({ note: text })}
                                    />
                                </View>
                            </View>


                            <View style={{ marginHorizontal: 5, marginTop: 20 }}>
                                <View style={{ marginHorizontal: 10, justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: font.SEMI_BOLD, fontSize: 16, marginTop: 2, color: '#080256' }}>Previous Diagnosis</Text>
                                    <Text style={{ fontFamily: font.REGULAR, fontSize: 13, color: '#A74343' }}>Separate with comma(,)</Text>
                                </View>
                                <View style={textInputStyles.textAreaContainer} >
                                    <TextInput
                                        style={textInputStyles.textArea}
                                        underlineColorAndroid="transparent"
                                        placeholder="Input Note"
                                        placeholderTextColor={lightTheme.SUB_TEXT_COLOR}
                                        placeholderTextColor="gray"
                                        numberOfLines={5}
                                        multiline={true}
                                        onSubmitEditing={() => this.proceedAppointment()}
                                        onChangeText={text => this.setState({ note: text })}
                                    />
                                </View>
                            </View>
                            <View style={{ marginHorizontal: 5, marginTop: 20 }}>
                                <View style={{ marginHorizontal: 10, justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: font.SEMI_BOLD, fontSize: 16, marginTop: 2, color: '#080256' }}>Previous Medication</Text>
                                    <Text style={{ fontFamily: font.REGULAR, fontSize: 13, color: '#A74343' }}>Separate with comma(,)</Text>
                                </View>
                                <View style={textInputStyles.textAreaContainer} >
                                    <TextInput
                                        style={textInputStyles.textArea}
                                        underlineColorAndroid="transparent"
                                        placeholder="Input Note"
                                        placeholderTextColor={lightTheme.SUB_TEXT_COLOR}
                                        placeholderTextColor="gray"
                                        numberOfLines={5}
                                        multiline={true}
                                        onSubmitEditing={() => this.proceedAppointment()}
                                        onChangeText={text => this.setState({ note: text })}
                                    />
                                </View>
                            </View>
                            <View style={{ marginHorizontal: 5, marginTop: 20 }}>
                                <View style={{ marginHorizontal: 10, justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: font.SEMI_BOLD, fontSize: 16, marginTop: 2, color: '#080256' }}>Ongoing Medication</Text>
                                    <Text style={{ fontFamily: font.REGULAR, fontSize: 13, color: '#A74343' }}>Separate with comma(,)</Text>
                                </View>
                                <View style={textInputStyles.textAreaContainer} >
                                    <TextInput
                                        style={textInputStyles.textArea}
                                        underlineColorAndroid="transparent"
                                        placeholder="Input Note"
                                        placeholderTextColor={lightTheme.SUB_TEXT_COLOR}
                                        placeholderTextColor="gray"
                                        numberOfLines={5}
                                        multiline={true}
                                        onSubmitEditing={() => this.proceedAppointment()}
                                        onChangeText={text => this.setState({ note: text })}
                                    />
                                </View>
                            </View>

                            <View style={{ marginTop: 15, }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('billing_appointment')} style={buttonStyles.primaryButtonStyle}>
                                    <Text style={[buttonStyles.primaryButtonTextStyle]}>Proceed</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Content>
            </Container>

        );
    }
    selectSymptom(value){
        console.warn(value)
    }
    renderSymptom(data) {
        let packages = [];
        let index;
        let vall;
        for (var i = 0; i < data.length; i++) {
            index =i
            vall = data[index].value
            packages.push(
                <View style={{ marginHorizontal: 10, marginVertical:5, flexDirection: 'row' , alignItems:'center'}}>
                 <TouchableOpacity onPress={() => this.selectSymptom(vall)}>
                 <Icon
                    active
                    name={ this.state.selected_symptoms.includes(data[i].value)? "check-box":"check-box-outline-blank"}
                    type='material'
                    size={35}
                    color={this.state.selected_symptoms.includes(data[i].value) ? "#FF7648" : lightTheme.SMALL_BODY_TEXT_COLOR}
                />
                </TouchableOpacity>
                <Text style={{ fontFamily: font.SEMI_BOLD, fontSize: 16, color: this.state.selected_symptoms.includes(data[i].value)? '#FF7648'  : '#080256' }}>{data[i].value}</Text>

            </View>               
            );
        }
        return packages;
    }

}

const times = [
    {
        value: 'Migraine',
    },
    {
        value: 'Cluster Headache',
    },
    {
        value: 'Pain after Surgery',
    },
    {
        value: 'Headache',
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
