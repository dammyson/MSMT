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

import { getToken, baseUrl, processResponse, showTopNotification } from '../../utilities';
import ActivityIndicator from '../../components/ActivityIndicator';

import Moment from 'moment';
Moment.locale('en');
const moment = require('moment');

export default class PrescriptionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            details: this.props.route.params.item
        };
    }

    async componentDidMount() {
        console.warn(this.props.route.params.item)
    }





    render() {

       const {details} =this.state

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

            <Container style={{ backgroundColor: lightTheme.PRIMARY_COLOR }}>
                <StatusBar backgroundColor={lightTheme.PRIMARY_COLOR} barStyle="dark-content" />
                <Navbar left={left} title='' bg='#101023' />
                <Content>

                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>
                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: font.BOLD, fontSize: 18, marginBottom: 2, marginTop: 2, color: lightTheme.WHITE_COLOR }}>{details.comment}</Text>
                                    <Text style={{ fontFamily: font.REGULAR, fontSize: 14, marginBottom: 2, color: lightTheme.WHITE_COLOR }}>{details.clinician.fullName}</Text>
                                    <Text style={{ fontFamily: font.REGULAR, fontSize: 8, marginBottom: 2, color: lightTheme.WHITE_COLOR }}>{details.clinician.title}</Text>

                                </View>
                            </View>

                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <ScrollView showsVerticalScrollIndicator={false} style={{}}>
                                    {this.renderReview(details.drugs)}
                                </ScrollView>
                            </View>



                        </View>
                    </View>

                </Content>
            </Container>

        );
    }


    renderReview(data) {
        let packages = [];
        for (var i = 0; i < data.length; i++) {
            var nice = data[i]
            console.warn(nice)
            packages.push(
                <View style={{ marginRight: 20, marginVertical: 10, borderRadius: 10, backgroundColor: lightTheme.WHITE_COLOR }}>
                    <View style={{ marginVertical: 10, marginRight: 20, justifyContent: 'center', flex: 1, flexDirection: 'row' }}>
                        <View style={{ marginLeft: 20, justifyContent: 'center', marginTop: 10, flexDirection: 'row' }}>
                            <Icon
                                active
                                name="pill"
                                type='material-community'
                                size={35}
                                color='#F3603F'
                            />
                        </View>
                        <View style={{ margin: 2, justifyContent: 'center', flex: 1, marginTop: 10, }}>
                             <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.BOLD, fontSize: 14, }}>{data[i].drug}</Text> 


                            <Text style={{ color: lightTheme.SMALL_BODY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 10, }}>{data[i].dosage} </Text>

                            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                                <TouchableOpacity  style={buttonStyles.appointmentWhiteButtonStyle}>
                                    <Text style={{ fontFamily: font.REGULAR, marginHorizontal: 15, fontSize: 10, color: lightTheme.PRIMARY_TEXT_COLOR }}>Order Meds.</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={buttonStyles.appointmentOrangeButtonStyle}>
                                    <Text style={{ fontFamily: font.REGULAR, marginHorizontal: 15, fontSize: 10, color: lightTheme.WHITE_COLOR }}>Order Meds.</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
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
    image_profile: {
        width: 50,
        height: 50,
        borderRadius: 150,
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
