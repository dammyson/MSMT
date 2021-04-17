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
import AppointmentType from '../../components/AppointmentType';
import AppointmentCategory from '../../components/AppointmentCategory';
import Navbar from '../../components/Navbar';
import Moment from 'moment';
import AppointmentActivity from '../../components/AppointmentActivity';
import { getToken, showTopNotification, processResponse, baseUrl } from '../../utilities';
import DoctorServices from '../../components/DoctorServices';
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
            activity_id: '',

            show_service: false,
            service_text: 'Select Service',
            service_id: '',
            service_cost: 0,
            selected_symptoms: ['Migraine', 'Headache'],
            selected: { day: 'M', date: 3 }
        };
    }

    async componentDidMount() {
        this.getDates()
        this.getDoctorServicesCost()
    }


    currencyFormat(n) {
        return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
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

    async getDoctorServices() {
        this.setState({ loading: true })
        fetch(baseUrl() + '/Clinician/getDoctorServices?clinicianId=' + '4972a38a-2c33-4707-9ffd-44a088a991ee', {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': 'Bearer ' + await getToken(),
            }
        })
            .then(processResponse)
            .then(res => {
                this.setState({ loading: false })
                const { statusCode, data } = res
                console.warn(res)
                if (statusCode == 200) {

                    this.setState({
                        list_doctor_services: data.data
                    })


                } else {
                    this.setState({ loading: false })
                    showTopNotification("danger", res.data.message)

                }
            })
            .catch((error) => {
                this.setState({ loading: false })
                console.warn(error.message)
                showTopNotification("danger", error.message)
            });


    }


    async getDoctorServicesCost() {
        this.setState({ loading: true })
        fetch(baseUrl() + '/Clinician/getDoctorServiceCost?clinicianId=' + '4972a38a-2c33-4707-9ffd-44a088a991ee', {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': 'Bearer ' + await getToken(),
            }
        })
            .then(processResponse)
            .then(res => {
                this.setState({ loading: false })
                const { statusCode, data } = res
                console.warn(res)
                if (statusCode == 200) {

                    this.setState({
                        list_doctor_services: data.data
                    })


                } else {
                    this.setState({ loading: false })
                    showTopNotification("danger", res.data.message)

                }
            })
            .catch((error) => {
                this.setState({ loading: false })
                console.warn(error.message)
                showTopNotification("danger", error.message)
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


                            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, justifyContent: 'flex-start', }}>
                                <Text style={{ fontFamily: font.SEMI_BOLD, fontSize: 16, marginTop: 2, color: '#080256' }}>Appointment Service</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.state.service_text == "Select service" ? showTopNotification("warning", "You need to Select category") : this.setState({ show_service: true })} style={styles.textInputContainer}>
                                <View style={styles.input}>
                                    <Text style={[{ fontFamily: font.SEMI_BOLD, fontSize: 14, marginTop: 2, color: '#080256' }, this.state.service_text == "Select Service" ? { color: '#08025640' } : {}]}>{this.state.service_text}</Text>
                                </View>

                            </TouchableOpacity>
                            <View style={{ marginLeft: 25, marginRight: 20, marginTop: 0, justifyContent: 'flex-start', }}>
                                <Text style={{ fontFamily: font.SEMI_BOLD, fontSize: 16, color: '#080256' }}> ₦{this.currencyFormat(this.state.service_cost)}</Text>

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
                {this.state.show_type ? this.SelectAppointmentType() : null}
                {this.state.show_category ? this.SelectAppointmentCategory() : null}
                {this.state.show_activty ? this.SelectAppointmentActivity() : null}
                {this.state.show_service ? this.SelectDoctorService() : null}
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
                onClose={() => this.setState({ show_category: false })}
                onSelect={(value) => this.onSelectActivity(value)}
                category={this.state.type_id}
            />
        )
    }
    onSelectActivity(value) {
        this.setState({
            show_category: false,
            activity_id: value.id,
            activity_text: value.name
        })
    }


    SelectDoctorService() {
        return (
            <DoctorServices
                onClose={() => this.setState({ show_category: false })}
                onSelect={(value) => this.onSelectService(value)}
                services={this.state.list_doctor_services}
            />
        )
    }
    onSelectService(value) {
        this.setState({
            show_service: false,
            service_id: value.service_id,
            service_text: value.service_name,
            service_cost: value.cost
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
