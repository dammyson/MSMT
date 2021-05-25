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

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            email: '',
            details:{},
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
        
        
        
           async getReferals(){
                this.setState({ loading: true })
                fetch(baseUrl() + '/Profile/getProfileDetail', {
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
                              details: data.data
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
        const {details} = this.state

        if (this.state.loading) {
            return (
                <ActivityIndicator message={'getting account... '} />

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
                <Navbar left={left} title='Account' bg='#101023' />
                <Content>

                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>
                            <View style={{flex:1,}}>
                            <View style={{ marginLeft: 20, marginTop: 20, marginRight: 10, marginBottom: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ margin: 2, marginLeft: 20, marginRight: 15 }}>
                                    <Image source={images.refer} style={styles.image_profile} />
                                </View>
                                <View style={{justifyContent: 'center', }}>
                               
                                    <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.REGULAR, fontSize: 13, textAlign: 'center', marginHorizontal:20 }}>Tap to change picture.</Text>
                                </View>

                            </View>


                            <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'flex-start',}}>
                                <Text style={{ color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR,fontFamily: font.SEMI_BOLD,fontSize: 13,marginTop: 2}}>Email</Text>
                            </View>
                            <View style={textInputStyles.textInputContainer}>

                                <View style={textInputStyles.input}>
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


                                <View style={textInputStyles.operation_icon}>
                                    {this.state.is_valide_mail ?
                                        <Animatable.View
                                            animation="bounceIn"
                                        >
                                            <Icon
                                                name="check-circle"
                                                color="green"
                                                size={20}
                                                type='feather'


                                            />
                                        </Animatable.View>
                                        : null}

                                </View>
                            </View>
                           

                            <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'flex-start',}}>
                                <Text style={{ color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR,fontFamily: font.SEMI_BOLD,fontSize: 13,marginTop: 2}}>Last Name</Text>
                            </View>
                            <View style={textInputStyles.textInputContainer}>

                                <View style={textInputStyles.input}>
                                    <TextInput
                                        placeholder="John"
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


                                <View style={textInputStyles.operation_icon}>
                                    {this.state.is_valide_mail ?
                                        <Animatable.View
                                            animation="bounceIn"
                                        >
                                            <Icon
                                                name="check-circle"
                                                color="green"
                                                size={20}
                                                type='feather'


                                            />
                                        </Animatable.View>
                                        : null}

                                </View>
                            </View>
                           

                            <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'flex-start',}}>
                                <Text style={{ color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR,fontFamily: font.SEMI_BOLD,fontSize: 13,marginTop: 2}}>First Name</Text>
                            </View>
                            <View style={textInputStyles.textInputContainer}>

                                <View style={textInputStyles.input}>
                                    <TextInput
                                        placeholder="Doe"
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


                                <View style={textInputStyles.operation_icon}>
                                    {this.state.is_valide_mail ?
                                        <Animatable.View
                                            animation="bounceIn"
                                        >
                                            <Icon
                                                name="check-circle"
                                                color="green"
                                                size={20}
                                                type='feather'


                                            />
                                        </Animatable.View>
                                        : null}

                                </View>
                            </View>
                           

                            <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'flex-start',}}>
                                <Text style={{ color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR,fontFamily: font.SEMI_BOLD,fontSize: 13,marginTop: 2}}>Gender</Text>
                            </View>
                            <View style={textInputStyles.textInputContainer}>

                                <View style={textInputStyles.input}>
                                    <TextInput
                                        placeholder="Male "
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


                                <View style={textInputStyles.operation_icon}>
                                    {this.state.is_valide_mail ?
                                        <Animatable.View
                                            animation="bounceIn"
                                        >
                                            <Icon
                                                name="check-circle"
                                                color="green"
                                                size={20}
                                                type='feather'


                                            />
                                        </Animatable.View>
                                        : null}

                                </View>
                            </View>
                           

                            <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'flex-start',}}>
                                <Text style={{ color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR,fontFamily: font.SEMI_BOLD,fontSize: 13,marginTop: 2}}>Date of Birth</Text>
                            </View>
                            <View style={textInputStyles.textInputContainer}>

                                <View style={textInputStyles.input}>
                                    <TextInput
                                        placeholder="August 30, 1985 "
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


                                <View style={textInputStyles.operation_icon}>
                                    {this.state.is_valide_mail ?
                                        <Animatable.View
                                            animation="bounceIn"
                                        >
                                            <Icon
                                                name="check-circle"
                                                color="green"
                                                size={20}
                                                type='feather'


                                            />
                                        </Animatable.View>
                                        : null}

                                </View>
                            </View>
                           

                            <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'flex-start',}}>
                                <Text style={{ color: lightTheme.PRIMARY_LIGHT_TEXT_COLOR,fontFamily: font.SEMI_BOLD,fontSize: 13,marginTop: 2}}>Postal Address</Text>
                            </View>
                            <View style={textInputStyles.textInputContainer}>

                                <View style={textInputStyles.input}>
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


                                <View style={textInputStyles.operation_icon}>
                                    {this.state.is_valide_mail ?
                                        <Animatable.View
                                            animation="bounceIn"
                                        >
                                            <Icon
                                                name="check-circle"
                                                color="green"
                                                size={20}
                                                type='feather'


                                            />
                                        </Animatable.View>
                                        : null}

                                </View>
                            </View>
                           
                           
                           
                            </View>
                            <View style={{ marginTop: 15, }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')} style={[buttonStyles.primaryButtonStyle, {height:60}]}>
                                    <Text style={[buttonStyles.primaryButtonTextStyle,]}>Share</Text>
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
            index =i
            vall = data[index].value
            packages.push(
                <View style={{ marginHorizontal: 10, marginVertical:5, flexDirection: 'row' , alignItems:'center'}}>
                 <TouchableOpacity onPress={() => this.selectSymptom(vall)}>
                 <Icon
                    active
                    name={ this.state.selected_symptoms.includes(data[i].value)? "check-box":"check-box-outline-blank"}
                    type='material'
                    size={35}
                    color={this.state.selected_symptoms.includes(data[i].value) ? "#FF7648" : lightTheme.SMALL_BODY_TEXT_COLOR}
                />
                </TouchableOpacity>
                <Text style={{ fontFamily: font.SEMI_BOLD, fontSize: 16, color: this.state.selected_symptoms.includes(data[i].value)? '#FF7648'  : '#080256' }}>{data[i].value}</Text>

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
