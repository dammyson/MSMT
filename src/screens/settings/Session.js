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
import { Container, Content, Button, Left, Toast, Body, Title, List, ListItem, } from 'native-base';
import { lightTheme } from '../../theme/colors';
import { font, fontSizes } from '../../constants';
import { buttonStyles } from '../../theme/ButtonStyle';
import { Icon } from 'react-native-elements';
import { textInputStyles } from '../../theme/TextInputStyle';
import { ScrollView } from 'react-native';
import Navbar from '../../components/Navbar';
import ActivityIndicator from '../../components/ActivityIndicator';
import { getToken, showTopNotification, processResponse, baseUrl, imageUrl, getUserID, getRole } from '../../utilities';
import IsEmpty from '../../components/IsEmpty';
import Moment from 'moment';
Moment.locale('en');
const moment = require('moment');


export default class Session extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            list_appointments:[],
            role: ""
            
        };
    }

    async componentDidMount() {
        this.setState({ role: await getRole() })
        this.getDoctorServicesCost();
        
    }



    async getDoctorServicesCost() {

        this.setState({ loading: true })
        fetch(baseUrl() + '/Appointment/getAppointments?profileId='+await getUserID() , {
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
                console.warn(data.data)
                if (statusCode == 200) {

                    this.setState({
                        list_appointments: data.data
                    })
                    this.arrayholder = data.data;

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

        if (this.state.loading) {
            return (
                <ActivityIndicator message={'getting sessions... '} />
            );
        }


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
            <Container style={{ backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR }}>
                <StatusBar backgroundColor={lightTheme.PRIMARY_COLOR} barStyle="dark-content" />
                <Navbar left={left} title='All Sessions' bg='#101023' />
                <Content scrollEnabled={false}>
                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>
                            <View style={{ marginLeft: 10, marginBottom: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <ScrollView showsVerticalScrollIndicator={false} style={{}}>
                                    {this.renderSessionItem(this.state.list_appointments)}
                                </ScrollView>
                            </View>
                        </View>
                    </View>

                </Content>
            </Container>

        );
    }



    renderSessionItem(data) {
        console.warn(this.state.role)
        let packages = [];
        for (var i = 0; i < data.length; i++) {
            packages.push(
                <View style={[{ paddingLeft: 10, marginTop: 10, paddingVertical: 10, flexDirection: 'row', marginBottom: 5, },]}>
                    <View style={{ margin: 2, }}>
                        <Image source={images.user} style={{ width: 50, height: 50, borderRadius: 150, shadowColor: 'gray', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 1, elevation: 5 }} />
                    </View>
                    <View style={{ marginLeft: 10, justifyContent: 'center', flex: 1, }}>
                        <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 15, marginBottom: 2, marginTop: 2 }}>{this.state.role == 'clinician' ?  data[i].member.fullName : data[i].doctor.fullName}</Text>
                        <Text style={{ color: lightTheme.PRIMARY_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 10, marginBottom: 2, marginTop: 2 }}>{data[i].title}</Text>
                        <View style={{ marginRight: 20, justifyContent: 'center', flexDirection: 'row', marginTop: 5 }}>




                            <Text style={{ color: lightTheme.SMALL_BODY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 10, marginBottom: 2, marginTop: 2 }}> {Moment(data[i].appointmentDate).format('llll')}</Text>
                            <View style={{ flex: 1 }} />
                            <View style={{ justifyContent: 'center', borderRadius: 5, backgroundColor: "#F3603F" }}>
                                <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, textTransform: 'uppercase', fontFamily: font.SEMI_BOLD, fontSize: 10, marginVertical: 3, marginHorizontal: 5 }}>  {Moment(data[i].appointmentDate).format('h:mm a')}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center', }}>

                        <Icon
                            name="arrow-right"
                            color={lightTheme.PRIMARY_TEXT_COLOR}
                            size={20}
                            type='simple-line-icon'
                        />
                    </View>
                </View>
            );
        }
        return packages;
    }




  




}




const doctors = [
    {
        image: images.user,
        name: 'Josephina Ibrahim Abubakar',
        job: 'Head of Dental Care - Reddington Hospital',


    },
    {
        image: images.user,
        name: 'Josephina Ibrahim Abubakar',
        job: 'Head of Dental Care - Reddington Hospital',
    },
    {
        image: images.user,
        name: 'Josephina Ibrahim Abubakar',
        job: 'Head of Dental Care - Reddington Hospital',
    },

    {
        image: images.user,
        name: 'Josephina Ibrahim Abubakar',
        job: 'Head of Dental Care - Reddington Hospital',
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
        height: Dimensions.get('window').height,
    },
    mainbody: {
        flex: 1,
        paddingHorizontal: 5,
        justifyContent: 'flex-start',
    },
    image_profile: {
        width: 50,
        height: 50,
        borderRadius: 150,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5
    },
    user_box: {
        flex: 1,
        paddingTop: 10,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        backgroundColor: lightTheme.INPUT_BACKGROUND_COLOR,

    },
    pack_box: {
        width: Dimensions.get('window').width - Dimensions.get('window').width / 3.5,
        paddingTop: 10,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,

    },
    pack_long_box: {
        width: Dimensions.get('window').width - Dimensions.get('window').width / 5,
        flexDirection: 'row',
        paddingTop: 10,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,

    },
    doctor_box: {
        width: Dimensions.get('window').width / 3.5,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        borderWidth: 0.6,
        borderColor: lightTheme.TEXT_PLACEHOLDER_COLOR,

    }

});
