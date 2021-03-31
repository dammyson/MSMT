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
import StarRating from 'react-native-star-rating';

export default class PrescriptionDetail extends Component {
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
            starCount: 5
        };
    }

    async componentDidMount() {

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

            <Container style={{ backgroundColor: lightTheme.PRIMARY_COLOR }}>
                <StatusBar backgroundColor={lightTheme.PRIMARY_COLOR} barStyle="dark-content" />
                <Navbar left={left} title='' bg='#101023' />
                <Content>

                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>
                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: font.BOLD, fontSize: 18, marginBottom: 2, marginTop: 2, color: lightTheme.WHITE_COLOR }}>Your prescription for Fever</Text>
                                    <Text style={{ fontFamily: font.REGULAR, fontSize: 14, marginBottom: 2, color: lightTheme.WHITE_COLOR }}>Dr. Josephina Ibrahim Abubakar</Text>
                                    <Text style={{ fontFamily: font.REGULAR, fontSize: 8, marginBottom: 2, color: lightTheme.WHITE_COLOR }}>BEHAVIORAL HEALTH </Text>

                                </View>
                            </View>

                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <ScrollView showsVerticalScrollIndicator={false} style={{}}>
                                    {this.renderReview(packagesa)}
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
        for (var i = 0; i < 2; i++) {
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
                            <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.BOLD, fontSize: 14, }}>Ciprofloxacin (Cipro)</Text>


                            <Text style={{ color: lightTheme.SMALL_BODY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 10, }}>2 tablets everyday for 2 weeks in morning noon and evening after food. </Text>

                            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')} style={buttonStyles.appointmentWhiteButtonStyle}>
                                    <Text style={{ fontFamily: font.REGULAR, marginHorizontal: 15, fontSize: 10, color: lightTheme.PRIMARY_TEXT_COLOR }}>Order Meds.</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')} style={buttonStyles.appointmentOrangeButtonStyle}>
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
