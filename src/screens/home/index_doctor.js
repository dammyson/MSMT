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
import { ScrollView } from 'react-native';

import { getUserName } from '../../utilities';


export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            name: '',
            password: '',
            image1: '',
            image1_display: '',
            is_valide_mail: false,
            done: false,
            show_camera: false
        };
    }

    async componentDidMount() {
        this.setState({name: await getUserName()})
        
    }





    render() {

        return (

            <Container style={{ backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR }}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <Content>
                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>
                            <View style={{ marginLeft: 20, marginTop: 30, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <View style={{ margin: 2, marginLeft: 20, marginRight: 15 }}>
                                    <Image source={images.user} style={styles.image_profile} />
                                </View>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 18,  marginTop: 2 }}>Hello</Text>
                                    <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 18, marginBottom: 2,}}> </Text>
                                </View>
                            </View>


                            <View style={{ marginLeft: 20, marginVertical: 20, marginRight: 10, }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')} style={{height:70, paddingLeft:20,  justifyContent:'center', alignItems:'flex-start', backgroundColor:'#344356', borderRadius:7}}>
                                    <Text style={[{ color: '#FFF', fontSize:15 ,fontFamily: font.LIGHT }]}>Wallet Balance</Text>
                                    <Text style={[{ color: '#FFF', fontSize:22 ,fontFamily: font.BOLD }]}>NGN 10,000</Text>
                                </TouchableOpacity>
                              


                            </View>                          

                            <View style={{ marginLeft: 20, marginTop: 15, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                {this.renderSummaryDetails("13", 'Pending appointment', '#FFB655')}
                                {this.renderSummaryDetails("4k+", 'all  appointment', '#F3603F')}
                                {this.renderSummaryDetails("4k", 'completed sessions', '#489E67')}

                            </View>

                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: font.BOLD, fontSize: 16, marginBottom: 2, marginTop: 2, color: '#080256' }}>Upcoming Appointment</Text>
                                </View>
                            </View>
                            <View style={{ marginLeft: 10, marginBottom: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <ScrollView showsVerticalScrollIndicator={false} style={{}}>
                                    {this.renderItem(doctors)}
                                </ScrollView>
                            </View>


                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: font.BOLD, fontSize: 16, marginBottom: 2, marginTop: 2, color: '#080256' }}>My Sessions</Text>
                                </View>
                            </View>
                            <View style={{ marginLeft: 10, marginBottom: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <ScrollView showsVerticalScrollIndicator={false} style={{}}>
                                    {this.renderItem(doctors)}
                                </ScrollView>
                            </View>



                        </View>
                    </View>

                </Content>
            </Container>

        );
    }

    renderSummaryDetails(count, name, bg) {
        return (
            <TouchableOpacity style={[styles.user_box, { backgroundColor: bg }]}>
                <View style={{ marginLeft: 10, marginVertical: 15, }}>
                    <Text style={[{ fontFamily: font.EXTRA_BOLD, color: lightTheme.WHITE_COLOR, fontSize: 28, marginBottom: 2 }]}>{count}</Text>
                    <Text style={[{ fontFamily: font.REGULAR, textTransform: 'uppercase', color: lightTheme.WHITE_COLOR, fontSize: 11, marginBottom: 5 }]}>{name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderItem(data) {
        let packages = [];
        for (var i = 0; i < data.length; i++) {
            packages.push(
                <TouchableOpacity onPress={() => this.props.navigation.navigate('prescription_details')} style={[{ paddingLeft: 10, marginTop: 10, paddingVertical: 10,  flexDirection: 'row', marginBottom: 5, },]}>
                    <View style={{ margin: 2, }}>
                        <Image source={images.user} style={{ width: 50,height: 50, borderRadius: 150, shadowColor: 'gray', shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 1,elevation: 5}} />
                    </View>
                    <View style={{ marginLeft: 10, justifyContent: 'center', flex: 1, }}>
                        <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 15, marginBottom: 2, marginTop: 2 }}>{data[i].name}</Text>
                        <Text style={{ color: lightTheme.PRIMARY_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 10, marginBottom: 2, marginTop: 2 }}>{data[i].job}</Text>
                        <View style={{ marginRight: 20, justifyContent: 'center', flexDirection: 'row',  marginTop:5}}>

                            <Text style={{ color: lightTheme.SMALL_BODY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 10, marginBottom: 2, marginTop: 2 }}>18th Tuesday, March</Text>
                            <View style={{ flex: 1 }} />
                            <View style={{ justifyContent: 'center', borderRadius:5, backgroundColor:"#F3603F" }}>
                                <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, textTransform: 'uppercase', fontFamily: font.SEMI_BOLD, fontSize: 10, marginVertical: 3, marginHorizontal: 5 }}>11:30 AM</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center', }}>

                        <Icon
                            name="arrow-right"
                            color={lightTheme.PRIMARY_TEXT_COLOR}
                            size={20}
                            type='simple-line-icon'
                        />
                    </View>
                </TouchableOpacity>
            );
        }
        return packages;
    }



   


}


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
        width: 60,
        height: 60,
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
        width: Dimensions.get('window').width/3.5,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        borderWidth: 0.6,
        borderColor: lightTheme.TEXT_PLACEHOLDER_COLOR,

    }

});
