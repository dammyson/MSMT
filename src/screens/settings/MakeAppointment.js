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
import {
    SelectMultipleButton,
    SelectMultipleGroupButton
} from "react-native-selectmultiple-button";

export default class MakeAppointment extends Component {
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

            <Container style={{ backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR }}>
                <StatusBar backgroundColor={lightTheme.PRIMARY_COLOR} barStyle="dark-content" />
                <Navbar left={left} title='Make Appointment' bg='#101023' />
                <Content>

                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>
                            <View style={{ flex: 1, }}>


                                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20, justifyContent: 'flex-start', }}>
                                    <Text style={{ color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 11, }}>Day</Text>
                                </View>
                                <View style={styles.textInputContainer}>

                                    <View style={{ flex: 1,justifyContent:'center', marginLeft: 10,}}>
                                    <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 12,  }}>Sunday</Text>

                                    </View>

                                    <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center', }}>
                                        <Icon
                                            name="arrow-down"
                                            color={lightTheme.PRIMARY_TEXT_COLOR}
                                            size={15}
                                            type='simple-line-icon'
                                        />
                                    </View>

                                </View>



                              
                                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20, justifyContent: 'flex-start', }}>
                                    <Text style={{ color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 11, }}>Start Time</Text>
                                </View>
                                <View style={styles.textInputContainer}>

                                    <View style={{ flex: 1,justifyContent:'center', marginLeft: 10,}}>
                                    <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 12,  }}>09:00 AM</Text>

                                    </View>

                                    <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center', }}>
                                        <Icon
                                            name="arrow-down"
                                            color={lightTheme.PRIMARY_TEXT_COLOR}
                                            size={15}
                                            type='simple-line-icon'
                                        />
                                    </View>

                                </View>



                               
                                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20, justifyContent: 'flex-start', }}>
                                    <Text style={{ color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 11, }}>End Time</Text>
                                </View>
                                <View style={styles.textInputContainer}>

                                    <View style={{ flex: 1,justifyContent:'center', marginLeft: 10,}}>
                                    <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 12,  }}>09:00 PM</Text>

                                    </View>

                                    <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center', }}>
                                        <Icon
                                            name="arrow-down"
                                            color={lightTheme.PRIMARY_TEXT_COLOR}
                                            size={15}
                                            type='simple-line-icon'
                                        />
                                    </View>

                                </View>



                                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20, justifyContent: 'flex-start', }}>
                                    <Text style={{ color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 11, }}>Set Status</Text>
                                </View>
                                <View style={styles.textInputContainer}>

                                    <View style={{ flex: 1,justifyContent:'center', marginLeft: 10,}}>
                                    <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 12,  }}>Active</Text>

                                    </View>

                                    <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center', }}>
                                        <Icon
                                            name="arrow-down"
                                            color={lightTheme.PRIMARY_TEXT_COLOR}
                                            size={15}
                                            type='simple-line-icon'
                                        />
                                    </View>

                                </View>


                            </View>
                            <View style={{ marginTop: 15, }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')} style={[buttonStyles.primaryButtonStyle, { height: 60 }]}>
                                    <Text style={[buttonStyles.primaryButtonTextStyle,]}>Add Billing Cost</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: 15, }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')} style={ { alignItems:'center'}}>
                                    <Text style={[buttonStyles.primaryButtonTextStyle,{color:'#F3603F', fontFamily: font.SEMI_BOLD, fontSize: 12, }]}>View Appointment Set</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>


                </Content>
            </Container>

        );
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
        height: Dimensions.get('window').height - 100,
    },
    mainbody: {
        flex: 1,
        paddingHorizontal: 5,
        justifyContent: 'flex-start',
    },
    image_profile: {
        width: 100,
        height: 100,
        borderRadius: 150,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5
    },
    textInputContainer: {
        flexDirection: 'row',
        marginRight: 20,
        marginLeft: 20,
        height: 45,
        marginBottom: 15,
        marginTop: 5,
        borderBottomWidth: 0.6,
        borderBottomColor: lightTheme.TEXT_PLACEHOLDER_COLOR,
        borderRadius: 10
    },

    input: {
        flex: 1,
        marginLeft: 1,
    },
});
