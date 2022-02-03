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
import { Container, Content } from 'native-base';
import { lightTheme } from '../../theme/colors';
import { font, fontSizes } from '../../constants';
import { buttonStyles } from '../../theme/ButtonStyle';
import { Icon } from 'react-native-elements';
import { textInputStyles } from '../../theme/TextInputStyle';


export default class SlectUserType extends Component {
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
            show_camera: false
        };
    }

    async componentDidMount() {

    }



    render() {

        return (

            <Container style={{ backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR }}>
                <StatusBar backgroundColor="transparent" barStyle="dark-content" />
                <Content>
                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>

                            <View style={{ marginLeft: 20, marginTop: 30, marginRight: 20, justifyContent: 'flex-start', marginBottom: 15, }}>
                                <Text style={{ color: lightTheme.PRIMARY_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 55, marginBottom: 2, marginTop: 2 }}>MSMT</Text>
                            </View>

                            <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'flex-start', marginBottom: 30, }}>
                                <Text style={[styles.textInputStyles, { fontFamily: font.REGULAR, }]}>Bringing Health Practitioners and Patients together on one platform</Text>
                            </View>


                            <View style={{ marginLeft: 20, marginTop: 30, marginRight: 20, flexDirection: 'row', marginBottom: 15, }}>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Reg', {url: 'https://mhealthdev.azurewebsites.net/User/reg_provider'})} style={styles.user_box}>
                                    <View style={{ alignItems: 'center', }}>
                                        <Image source={images.type_provider} style={{ margin: 20, }} />
                                        <Text style={[{ fontFamily: font.SEMI_BOLD, fontSize: 14, marginVertical: 5 }]}>Provider</Text>
                                    </View>
                                    <View style={{ alignItems: 'flex-start', }}>
                                        <View style={{ margin:15}}>
                                            <Icon
                                                name="ios-arrow-forward-circle-sharp"
                                                color={'#F3603F'}
                                                size={40}
                                                type='ionicon'
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Reg', {url: 'https://mhealthdev.azurewebsites.net/User/reg_member'})} style={styles.user_box}>
                                    <View style={{ alignItems: 'center', }}>
                                        <Image source={images.type_user} style={{ margin: 20, }} />
                                        <Text style={[{ fontFamily: font.SEMI_BOLD, fontSize: 14, marginVertical: 5 }]}>Member (Patient)</Text>
                                    </View>
                                    <View style={{ alignItems: 'flex-start', }}>
                                        <View style={{ margin:15}}>
                                            <Icon
                                                name="ios-arrow-forward-circle-sharp"
                                                color={'#F3603F'}
                                                size={40}
                                                type='ionicon'
                                            />
                                        </View>
                                    </View>
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
        height: Dimensions.get('window').height,
    },
    mainbody: {
        flex: 1,

        justifyContent: 'flex-start',
    },
    user_box: {
        flex: 1,
        paddingTop:10,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        backgroundColor: lightTheme.INPUT_BACKGROUND_COLOR,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5
    }

});
