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

export default class About extends Component {
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
                <Navbar left={left} title='Account' bg='#101023' />
                <Content>

                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>
                            <View style={{ flex: 1, }}>
                                <View style={{ marginLeft: 20, marginTop: 40, marginRight: 10, marginBottom: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ margin: 2, marginLeft: 20, marginRight: 15 }}>
                                        <Image source={images.information} style={styles.image_profile} />
                                    </View>
                                    <View style={{ justifyContent: 'center', }}>

                                        <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.REGULAR, fontSize: 13, textAlign: 'center', marginHorizontal: 20 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit nunc, vehicula nec erat eu, efficitur tincidunt arcu..</Text>
                                    </View>

                                </View>

                                <View style={styles.text_container}>
                                    <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR,marginLeft:1,  fontFamily: font.SEMI_BOLD, fontSize: 14, marginTop: 2 }}>Email</Text>
                                </View>

                                <View style={styles.text_container}>
                                    <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR,marginLeft:1,  fontFamily: font.SEMI_BOLD, fontSize: 14, marginTop: 2 }}>Blog</Text>
                                </View>
                                <View style={styles.text_container}>
                                    <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR,marginLeft:1,  fontFamily: font.SEMI_BOLD, fontSize: 14, marginTop: 2 }}>About MSMT</Text>
                                </View>
                                <View style={styles.text_container}>
                                    <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR,marginLeft:1,  fontFamily: font.SEMI_BOLD, fontSize: 14, marginTop: 2 }}>Contact Us</Text>
                                </View>
                            </View>

                        </View>
                    </View>


                </Content>
            </Container>

        );
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
        width: 100,
        height: 100,
        borderRadius: 150,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5
    },

    text_container: {
       justifyContent: 'center',
        marginRight: 20,
        marginLeft: 20,
        height: 45,
        marginBottom: 15,
        marginTop: 5,
        borderBottomWidth: 0.6,
        borderBottomColor: lightTheme.TEXT_PLACEHOLDER_COLOR,
        borderRadius: 10
    }

});
