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
import { Container, Content, Button, Left, } from 'native-base';
import { lightTheme } from '../../theme/colors';
import { font, fontSizes } from '../../constants';
import { buttonStyles } from '../../theme/ButtonStyle';
import { Icon } from 'react-native-elements';
import { textInputStyles } from '../../theme/TextInputStyle';
import AppointmentType from '../../components/AppointmentType';
import AppointmentCategory from '../../components/AppointmentCategory';
import Navbar from '../../components/Navbar';
import Moment from 'moment';
import AppointmentActivity from '../../components/AppointmentActivity';
import { getToken, showTopNotification, processResponse, baseUrl } from '../../utilities';
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
            appointment_datetime:'',
            selected_symptoms: ['Migraine', 'Headache'],
            selected: { day: 'M', date: 3 , },

            allegies:'',
            medication:'',
            on_medication:'',
            diagnosis:'',
            clinician: this.props.route.params.clinician,
            appointment_information:this.props.route.params.appointment_information,
        };
    }

    async componentDidMount() {
        this.getDoctorServicesCost()
    }


    currencyFormat(n) {
        return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
   
    hanedProceedButton() {
        const { selected_symptoms, appointment_information, allegies, medication, on_medication, diagnosis } = this.state
        appointment_information['allegies']=  allegies  
        appointment_information['diagnosis']=  diagnosis 
        appointment_information['medication']=  medication 
        appointment_information['on_medication']=  on_medication 
        appointment_information['selected_symptoms']=  selected_symptoms      
        console.warn(appointment_information)
         this.props.navigation.navigate('appointment_billing', { appointment_information : appointment_information})
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
                <StatusBar backgroundColor={lightTheme.PRIMARY_COLOR} barStyle="dark-content" translucent />
                <Navbar left={left} title='Additional Information' bg='#101023' />
                <Content>

                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>

                            {/* <View style={{ marginHorizontal: 10, justifyContent: 'center', }}>
                                <Text style={{ fontFamily: font.SEMI_BOLD, fontSize: 16, marginTop: 2, color: '#080256' }}>Previous Diagnosis</Text>

                            </View> */}

                            {/* <View style={{ marginHorizontal: 10, justifyContent: 'center', }}>
                                {this.renderSymptom(times)}

                            </View> */}

                           

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
                                        onChangeText={text => this.setState({ allegies: text })}
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
                                        onChangeText={text => this.setState({ diagnosis: text })}
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
                                        onChangeText={text => this.setState({ medication: text })}
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
                                        onChangeText={text => this.setState({ on_medication: text })}
                                    />
                                </View>
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
    selectSymptom(value) {
        console.warn(value)
    }
    renderSymptom(data) {
        let packages = [];
        let index;
        let vall;
        for (var i = 0; i < data.length; i++) {
            index = i
            vall = data[index].value
            packages.push(
                <View style={{ marginHorizontal: 10, marginVertical: 5, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.selectSymptom(vall)}>
                        <Icon
                            active
                            name={this.state.selected_symptoms.includes(data[i].value) ? "check-box" : "check-box-outline-blank"}
                            type='material'
                            size={35}
                            color={this.state.selected_symptoms.includes(data[i].value) ? "#FF7648" : lightTheme.SMALL_BODY_TEXT_COLOR}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: font.SEMI_BOLD, fontSize: 16, color: this.state.selected_symptoms.includes(data[i].value) ? '#FF7648' : '#080256' }}>{data[i].value}</Text>

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

    textInputContainer: {
        flexDirection: 'row',
        backgroundColor: '#F2F3F2',
        justifyContent: 'center',
        marginRight: 20,
        marginLeft: 20,
        height: 45,
        marginBottom: 15,
        marginTop: 5,
        borderRadius: 10
    },

    input: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 15
    },


});
