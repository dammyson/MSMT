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
import { getToken, showTopNotification, processResponse, baseUrl, imageUrl, getUserID } from '../../utilities';


export default class BankInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            bank_name:'',
            account_name:'',
            account_number:'',
            id_mode:'',
            id_number:''


        };
    }

    async componentDidMount() {
        this.getBankinformation()
    }



    async getBankinformation() {

        this.setState({ loading: true })
        fetch(baseUrl() + '/Clinician/getBankDetails', {
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
                console.warn(data)
                if (statusCode == 200) {

                    this.setState({
                        list_appointments: data.data
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


    async UpdateBankinformation() {

        this.setState({ loading: true })
        fetch(baseUrl() + '/Clinician/getBankDetails', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': 'Bearer ' + await getToken(),
            },body:  JSON.stringify({
                bankName:email,
                accountNumber:password,
                accountName:'',
                modeOfIdentification:'',
                identificationNumber:'',

            }),
        })
            .then(processResponse)
            .then(res => {
                this.setState({ loading: false })
                const { statusCode, data } = res
                console.warn(data)
                if (statusCode == 200) {

                    this.setState({
                        list_appointments: data.data
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

            <Container style={{ backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR }}>
                <StatusBar backgroundColor={lightTheme.PRIMARY_COLOR} barStyle="dark-content" />
                <Navbar left={left} title='Bank Information' bg='#101023' />
                <Content>

                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>
                            <View style={{ flex: 1, }}>


                                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20, justifyContent: 'flex-start', }}>
                                    <Text style={{ color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 13, }}>Bank Name</Text>
                                </View>
                                <View style={styles.textInputContainer}>

                                    <View style={styles.input}>
                                        <TextInput
                                            placeholder="Bank Name "
                                            placeholderTextColor={lightTheme.PRIMARY_LIGHT_TEXT_COLOR}
                                            returnKeyType="next"
                                            keyboardType='email-address'
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            defaultValue={this.state.email}
                                            style={{ flex: 1, fontSize: 16, color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: 'Poppins-SemiBold', }}
                                            onChangeText={(text) => this.validate(text)}
                                            onSubmitEditing={() => this.passwordInput.focus()}
                                        />
                                    </View>

                                </View>



                                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20, justifyContent: 'flex-start', }}>
                                    <Text style={{ color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 13, }}>Account Name</Text>
                                </View>
                                <View style={styles.textInputContainer}>

                                    <View style={styles.input}>
                                        <TextInput
                                            placeholder="mymail@yahoo.com "
                                            placeholderTextColor={lightTheme.PRIMARY_LIGHT_TEXT_COLOR}
                                            returnKeyType="next"
                                            keyboardType='email-address'
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            defaultValue={this.state.email}
                                            style={{ flex: 1, fontSize: 16, color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: 'Poppins-SemiBold', }}
                                            onChangeText={(text) => this.validate(text)}
                                            onSubmitEditing={() => this.passwordInput.focus()}
                                        />
                                    </View>

                                </View>


                                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20, justifyContent: 'flex-start', }}>
                                    <Text style={{ color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 13, }}>Account Number</Text>
                                </View>
                                <View style={styles.textInputContainer}>

                                    <View style={styles.input}>
                                        <TextInput
                                            placeholder=""
                                            placeholderTextColor={lightTheme.PRIMARY_LIGHT_TEXT_COLOR}
                                            returnKeyType="next"
                                            keyboardType='email-address'
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            defaultValue={this.state.email}
                                            style={{ flex: 1, fontSize: 16, color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: 'Poppins-SemiBold', }}
                                            onChangeText={(text) => this.validate(text)}
                                            onSubmitEditing={() => this.passwordInput.focus()}
                                        />
                                    </View>

                                </View>



                                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20, justifyContent: 'flex-start', }}>
                                    <Text style={{ color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 13, }}>Date of Birth</Text>
                                </View>
                                <View style={styles.textInputContainer}>

                                    <View style={styles.input}>
                                        <TextInput
                                            placeholder=" "
                                            placeholderTextColor={lightTheme.PRIMARY_LIGHT_TEXT_COLOR}
                                            returnKeyType="next"
                                            keyboardType='email-address'
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            defaultValue={this.state.email}
                                            style={{ flex: 1, fontSize: 16, color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: 'Poppins-SemiBold', }}
                                            onChangeText={(text) => this.validate(text)}
                                            onSubmitEditing={() => this.passwordInput.focus()}
                                        />
                                    </View>

                                </View>



                                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20, justifyContent: 'flex-start', }}>
                                    <Text style={{ color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 13, }}>Identification Mode of identificataion </Text>
                                    <Text style={{ fontFamily: font.REGULAR, fontSize: 13, color: '#A74343' }}>(International passport, national ID, etc)</Text>
                                </View>
                                <View style={styles.textInputContainer}>

                                    <View style={styles.input}>
                                        <TextInput
                                            placeholder=" "
                                            placeholderTextColor={lightTheme.PRIMARY_LIGHT_TEXT_COLOR}
                                            returnKeyType="next"
                                            keyboardType='email-address'
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            defaultValue={this.state.email}
                                            style={{ flex: 1, fontSize: 16, color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: 'Poppins-SemiBold', }}
                                            onChangeText={(text) => this.validate(text)}
                                            onSubmitEditing={() => this.passwordInput.focus()}
                                        />
                                    </View>

                                </View>




                            </View>
                            <View style={{ marginTop: 15, }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')} style={[buttonStyles.primaryButtonStyle, { height: 60 }]}>
                                    <Text style={[buttonStyles.primaryButtonTextStyle,]}>Update Changes</Text>
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
