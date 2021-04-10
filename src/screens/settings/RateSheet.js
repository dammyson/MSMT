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


export default class RateSheet extends Component {
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
                <Navbar left={left} title='Rate Sheet' bg='#101023' />
                <Content scrollEnabled={false}>
                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>
                            <View style={{ marginLeft: 10, flex:1, marginBottom: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <ScrollView showsVerticalScrollIndicator={false} style={{}}>
                                    {this.renderItem(doctors)}
                                </ScrollView>
                            </View>

                            <View style={{ marginTop: 15, }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')} style={[buttonStyles.primaryButtonStyle, {height:55}]}>
                                    <Text style={[buttonStyles.primaryButtonTextStyle,]}>Add New Billing Cost</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Content>
            </Container>

        );
    }



    renderItem(data) {
        let packages = [];
        for (var i = 0; i < data.length; i++) {
            packages.push(
                <>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('prescription_details')} style={[{ paddingLeft: 10, marginTop: 10, paddingVertical: 10, flexDirection: 'row', marginBottom: 5, },]}>
                    <View style={{ marginLeft: 10, justifyContent: 'center', flex: 1, }}>
                        <Text style={{ color: lightTheme.SMALL_BODY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 12, marginBottom: 2, marginTop: 2 }}>{data[i].name}</Text>
                        <Text style={{ color: lightTheme.PRIMARY_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 10, marginBottom: 2, marginTop: 2 }}>{'Counselling Assessment'}</Text>
                        <View style={{ marginRight: 20, justifyContent: 'center', flexDirection: 'row',  marginTop:5}}>

                            <Text style={{ color: lightTheme.SMALL_BODY_TEXT_COLOR, fontFamily: font.BOLD, fontSize: 16, marginBottom: 2, marginTop: 2 }}>NGN 900</Text>
                            <View style={{ flex: 1 }} />
                        </View>
                    </View>

                    <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center', }}>
                        <Icon
                            name="arrow-right"
                            color={lightTheme.PRIMARY_TEXT_COLOR}
                            size={15}
                            type='simple-line-icon'
                        />
                    </View>
                </TouchableOpacity>
                <View style={{ height: 0.5, backgroundColor: '#DADADA', marginVertical: 5 }} />
                </>
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
        height: Dimensions.get('window').height - 100,
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
