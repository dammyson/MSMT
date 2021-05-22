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
            show_type: false,
            type_text: 'Select type',
            type_id: '',
            list_doctor_services: [],
            show_category: false,
            category_text: 'Select category',
            category_id: '',
            show_activty: false,
            activity_text: 'Select activity',
            activity_id: '4',

            appointment_datetime:'',
            selected_symptoms: ['Migraine', 'Headache'],
            selected: { day: 'M', date: 3 , },

            allegies:'',
            medication:'',
            on_medication:'',
            diagnosis:'',
        };
    }

    async componentDidMount() {
       // this.getDates()
        const { appointment_datetime } = this.props.route.params;
        this.setState({
            appointment_datetime: appointment_datetime,
        });
        this.getDoctorServicesCost()
    }


    currencyFormat(n) {
        return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
   
    hanedProceedButton() {
        const {appointment_datetime, selected_symptoms, type_id,  activity_id, category_id, allegies, medication, on_medication, diagnosis } = this.state
        let appointment_information = {
            appointment_datetime: appointment_datetime,
            selected_symptoms: selected_symptoms,
            type_id: type_id,
            category_id:category_id,
            activity_id: activity_id,
            allegies: allegies,
            medication: medication,
            on_medication: on_medication,
            diagnosis: diagnosis,
        }
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





                            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, justifyContent: 'flex-start', }}>
                                <Text style={{ fontFamily: font.SEMI_BOLD, fontSize: 16, marginTop: 2, color: '#080256' }}>Appointment Type</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.setState({ show_type: true })} style={styles.textInputContainer}>
                                <View style={styles.input}>
                                    <Text style={[{ fontFamily: font.SEMI_BOLD, fontSize: 14, marginTop: 2, color: '#080256' }, this.state.type_text == "Select type" ? { color: '#08025640' } : {}]}>{this.state.type_text}</Text>
                                </View>

                            </TouchableOpacity>




                            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, justifyContent: 'flex-start', }}>
                                <Text style={{ fontFamily: font.SEMI_BOLD, fontSize: 16, marginTop: 2, color: '#080256' }}>Appointment category</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.state.type_text == "Select type" ? showTopNotification("warning", "You need to Select type") : this.setState({ show_category: true })} style={styles.textInputContainer}>
                                <View style={styles.input}>
                                    <Text style={[{ fontFamily: font.SEMI_BOLD, fontSize: 14, marginTop: 2, color: '#080256' }, this.state.category_text == "Select category" ? { color: '#08025640' } : {}]}>{this.state.category_text}</Text>
                                </View>

                            </TouchableOpacity>



                            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, justifyContent: 'flex-start', }}>
                                <Text style={{ fontFamily: font.SEMI_BOLD, fontSize: 16, marginTop: 2, color: '#080256' }}>Appointment Activity</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.state.category_text == "Select category" ? showTopNotification("warning", "You need to Select category") : this.setState({ show_activty: true })} style={styles.textInputContainer}>
                                <View style={styles.input}>
                                    <Text style={[{ fontFamily: font.SEMI_BOLD, fontSize: 14, marginTop: 2, color: '#080256' }, this.state.activity_text == "Select activity" ? { color: '#08025640' } : {}]}>{this.state.activity_text}</Text>
                                </View>

                            </TouchableOpacity>


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
                {this.state.show_type ? this.SelectAppointmentType() : null}
                {this.state.show_category ? this.SelectAppointmentCategory() : null}
                {this.state.show_activty ? this.SelectAppointmentActivity() : null}
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



    SelectAppointmentType() {
        return (
            <AppointmentType
                onClose={() => this.setState({ show_type: false })}
                onSelect={(value) => this.onSelectType(value)}
            />
        )
    }
    onSelectType(value) {
        this.setState({
            show_type: false,
            type_id: value.id,
            type_text: value.name
        })
    }


    SelectAppointmentCategory() {
        return (
            <AppointmentCategory
                onClose={() => this.setState({ show_category: false })}
                onSelect={(value) => this.onSelectCategory(value)}
                type={this.state.type_id}
            />
        )
    }
    onSelectCategory(value) {
        this.setState({
            show_category: false,
            category_id: value.id,
            category_text: value.name
        })
    }

    SelectAppointmentActivity() {
        return (
            <AppointmentActivity
                onClose={() => this.setState({ show_activty: false })}
                onSelect={(value) => this.onSelectActivity(value)}
                category={this.state.type_id}
            />
        )
    }
    onSelectActivity(value) {
        this.setState({
            show_activty: false,
            activity_id: value.id,
            activity_text: value.name
        })
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
