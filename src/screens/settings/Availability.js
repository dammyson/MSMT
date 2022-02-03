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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SelectTime from '../../components/SelectTime';

export default class Availability extends Component {
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
                <Navbar left={left} title='Availability' bg='#101023' />
                <Content>

                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>
                            <View style={{ flex: 1, }}>
                                <Content>
                                    {this.renderAvailabilty(days)}
                                </Content>
                            </View>
                            <View style={{ marginTop: 15, }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')} style={[buttonStyles.primaryButtonStyle, { height: 60 }]}>
                                    <Text style={[buttonStyles.primaryButtonTextStyle,]}>Add Billing Cost</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>


                </Content>

                {/* <SelectTime  Selected = {(date) }/> */}
            </Container>

        );
    }


    renderAvailabilty(data) {
        let packages = [];
        let index;
        let vall;
        for (var i = 0; i < data.length; i++) {
            index = i
            vall = data[index].value
            packages.push(
                <>
                    <View style={{ marginLeft: 5, marginRight: 20, marginVertical: 10, justifyContent: 'flex-start', }}>
                        <Text style={{ color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 11, }}>{vall}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', height: 60, }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 11, marginLeft: 10, }}>Start Time</Text>
                            <View style={styles.textInputContainer}>
                                <Text style={{ color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 13, }}>08:00:00</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={{ color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 11, marginLeft: 10, }}>End Time</Text>
                            <View style={styles.textInputContainer}>
                                <Text style={{ color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 13, }}>19:00:00</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row', }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 11, }}>Set Status</Text>
                                <TouchableOpacity style={{ height: 30, width: 30, alignItems: 'center', justifyContent: 'center', borderWidth: 0.6, marginVertical: 8, borderColor: lightTheme.TEXT_PLACEHOLDER_COLOR, borderRadius: 10, }}>
                                    <TouchableOpacity style={{ height: 20, width: 20, borderRadius: 10, backgroundColor: 'red' }} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={[styles.primaryButtonStyle]}>
                                <Icon
                                    active
                                    name="edit"
                                    type='material'
                                    size={20}
                                    color='#FFF'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            );
        }
        return packages;
    }

}


const days = [
    {
        value: 'Monday',
    },
    {
        value: 'Tuesday',
    },
    {
        value: 'Wednestday',
    },
    {
        value: 'Thurday',
    },
    {
        value: 'Friday',
    },
    {
        value: 'Saturday',
    },
    {
        value: 'Sunday',
    },]

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
    textInputContainer: {
        flex: 1,
        flexDirection: 'row',
        marginRight: 10,
        marginLeft: 10,
        height: 40,
        marginBottom: 5,
        marginTop: 5,
        borderWidth: 0.6,
        borderColor: lightTheme.TEXT_PLACEHOLDER_COLOR,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    input: {
        flex: 1,
        marginLeft: 1,
    },

    primaryButtonStyle: {
        height: 40,
        width: 40,
        marginHorizontal: 5,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: lightTheme.PRIMARY_COLOR,
    },
    primaryButtonTextStyle: {
        fontFamily: font.SEMI_BOLD,
        fontSize: 16,
        color: lightTheme.SECONDARY_BUTTON_COLOR

    },
});
