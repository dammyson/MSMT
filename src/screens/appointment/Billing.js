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
import ActivityIndicator from '../../components/ActivityIndicator';
import { getToken, showTopNotification, processResponse, baseUrl } from '../../utilities';
import Moment from 'moment';
import IsEmpty from '../../components/IsEmpty';
Moment.locale('en');
const moment = require('moment');

const width = Dimensions.get('window').width;
const single_with = width / 100;
const stage_1 = width / single_with;
const percentage = (width / single_with) / width * 100;
const sty = percentage.toString() + "%"


export default class Billing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            list_doctor_services: [],
            appointment_information: this.props.route.params.appointment_information
        };
    }

    async componentDidMount() {
        this.getDoctorServicesCost();
    }



    async getDoctorServicesCost() {
        const { appointment_information } = this.state
        console.warn(appointment_information.appointment_datetime.clinician_id)
        this.setState({ loading: true })
        fetch(baseUrl() + '/Clinician/getDoctorServiceCost?clinicianId=' + appointment_information.appointment_datetime.clinician_id, {
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
                console.warn(error)
                showTopNotification("danger", error.message)
            });


    }


    selectSevice(value) {
      
        const { appointment_information } = this.state
        let information = {
            clinicianId: appointment_information.appointment_datetime.clinician_id,
            appointment_type: appointment_information.type_id,
            startDate: appointment_information.appointment_datetime.date.full,
            startTime: appointment_information.appointment_datetime.time,
            appointmentService: value.service_id,
            appointmentActivityId:  appointment_information.category_id,
            appointmentActivitySubId:  appointment_information.activity_id
        }
        console.warn(information)
        this.setState({ loading: true})
        fetch( baseUrl() +'/Appointment/bookAppointment', {
            method: 'POST', headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }, body: JSON.stringify(information),
          })
          .then(processResponse)
            .then(res => {
                this.setState({ loading: false})
              const{ statusCode, data} = res
              console.warn(statusCode, data)
              if (statusCode == 200) {
                this.props.navigation.navigate('mode_appointment', { appointment_information : data.data})
                
              } else {
                showTopNotification("erroe", data.message, 3)
              }
            }).catch((error) => {
              showTopNotification("erroe", error.message, 3)
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

        if (this.state.loading) {
            return (
                <ActivityIndicator message={'getting services and cost... '} />
            );
        }



        return (
            <Container style={{ backgroundColor: lightTheme.WHITE_COLOR }}>
                <StatusBar backgroundColor={lightTheme.PRIMARY_COLOR} barStyle="dark-content" />
                <Navbar left={left} title='Billing' bg='#101023' />
                <Content>
                    {this.state.list_doctor_services.length == 0 ?
                        <IsEmpty message={'services and cost is not available at the moment '} />
                        :
                        <View style={styles.backgroundImage}>
                            <View style={styles.mainbody}>

                                <View style={{ marginVertical: 20, justifyContent: 'center', }}>
                                    {this.renderSymptom(this.state.list_doctor_services)}

                                </View>
                            </View>
                        </View>
                    }

                </Content>
            </Container>

        );
    }

    currencyFormat(n) {
        return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    renderSymptom(data) {
        let packages = [];
        let index;
        let vall;
        for (var i = 0; i < data.length; i++) {
            index = i
            vall = data[index].value
            packages.push(
                <TouchableOpacity onPress={() => this.selectSevice(data[index])} style={{ paddingHorizontal: 20, paddingVertical: 10, marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: lightTheme.SMALL_BODY_TEXT_COLOR }}>
                    <View style={{ marginHorizontal: 10, justifyContent: 'center', flex: 1, }}>
                        <Text style={{ fontFamily: font.SEMI_BOLD, fontSize: 16, opacity: 0.7, marginTop: 2, color: lightTheme.SMALL_BODY_TEXT_COLOR }}>{data[index].service_name}</Text>
                        <Text style={{ fontFamily: font.REGULAR, fontSize: 15, marginTop: 2, color: '#5383EC' }}>{data[index].sub_name}</Text>
                        <Text style={{ fontFamily: font.BOLD, fontSize: 18, marginTop: 2, color: lightTheme.PRIMARY_TEXT_COLOR }}>NGN {this.currencyFormat(data[index].cost)} </Text>
                    </View>

                    <View style={{ justifyContent: 'center', }}>
                        <Icon
                            active
                            name="keyboard-arrow-right"
                            type='material'
                            size={35}
                            color={lightTheme.SMALL_BODY_TEXT_COLOR}
                        />

                    </View>
                </TouchableOpacity>
            );
        }
        return packages;
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
