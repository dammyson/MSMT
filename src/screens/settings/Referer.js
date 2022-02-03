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
import Navbar from '../../components/Navbar';
import { getToken, baseUrl, processResponse, showTopNotification } from '../../utilities';
import ActivityIndicator from '../../components/ActivityIndicator';

export default class Referer extends Component {
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
        this.getReferals()
    }



    async getReferals() {
        this.setState({ loading: true })
        fetch(baseUrl() + '/Referral/GetReferrals', {
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
                        list_doctor: data.data
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
                <ActivityIndicator message={'getting referals... '} />

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
                <Navbar left={left} title='Refer a Friend' bg='#101023' />
                <Content>

                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>
                            <View style={{ flex: 1, }}>
                                <View style={{ marginLeft: 20, marginTop: 40, marginRight: 10, marginBottom: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ margin: 2, marginLeft: 20, marginRight: 15 }}>
                                        <Image source={images.refer} style={styles.image_profile} />
                                    </View>
                                    <View style={{ justifyContent: 'center', }}>
                                        <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.BOLD, fontSize: 20, textAlign: 'center' }}>Get a Discount</Text>
                                        <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.REGULAR, fontSize: 13, textAlign: 'center', marginHorizontal: 20 }}>You and your friends earn cash reward when they signup and buy an idea with your referral link or code.</Text>
                                    </View>

                                </View>

                                <View style={{ marginHorizontal: 5, marginTop: 20 }}>
                                    <View style={{ marginHorizontal: 10, justifyContent: 'center', }}>
                                        <Text style={{ fontFamily: font.REGULAR, fontSize: 14, marginTop: 2, color: '#080256' }}>Your Referral Code</Text>
                                    </View>
                                    <View style={{ marginTop: 20, height: 50, backgroundColor: '#F2F3F2', marginLeft: 10, marginRight: 10, borderRadius: 10, justifyContent: 'center', borderColor: lightTheme.SMALL_BODY_TEXT_COLOR + '50', borderWidth: 0.6 }} >
                                        <TextInput
                                            style={{ height: 40, justifyContent: "flex-start", marginHorizontal: 15, flex: 1, fontSize: 15, fontFamily: font.BOLD }}
                                            underlineColorAndroid="transparent"
                                            placeholder="Input Note"
                                            placeholderTextColor={lightTheme.SUB_TEXT_COLOR}
                                            placeholderTextColor="gray"
                                            numberOfLines={5}
                                            defaultValue={'MSMT001'}
                                            multiline={true}
                                            onSubmitEditing={() => this.proceedAppointment()}
                                            onChangeText={text => this.setState({ note: text })}
                                        />
                                    </View>
                                </View>

                            </View>
                            <View style={{ marginTop: 15, }}>
                                <TouchableOpacity style={[buttonStyles.primaryButtonStyle, { height: 60 }]}>
                                    <Text style={[buttonStyles.primaryButtonTextStyle,]}>Share</Text>
                                </TouchableOpacity>
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
    user_box: {
        flex: 1,
        paddingTop: 10,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        backgroundColor: lightTheme.INPUT_BACKGROUND_COLOR,

    },
    multipleContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        flex: 6,
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
