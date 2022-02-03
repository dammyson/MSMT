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
import { getLogout , getUserName, getEmail} from '../../utilities';
import { getRole } from '../../utilities';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
            name: '',
            role:''
            
        };
    }

    async componentDidMount() {
       // console.warn( await getUserName())
        this.setState({
            name: await getUserName(), 
            email: await getEmail() 
        })
    }


    async componentWillMount() {
        this.setState({ role: await getRole(), 
        })
       
         
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
                <StatusBar backgroundColor={'#FFF'} barStyle="dark-content" />
                <Content>

                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>
                            <View style={{ marginLeft: 20, marginTop: 30, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <View style={{ margin: 2, marginRight: 15 }}>
                                    <Image source={images.user} style={styles.image_profile} />
                                </View>
                                <View style={{ marginRight: 20, justifyContent: 'center', flex: 1 }}>
                                    <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.BOLD, fontSize: 18, }}> {this.state.name} </Text>
                                    <Text style={{ color: lightTheme.SMALL_BODY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 10, }}>{this.state.email} </Text>

                                </View>

                            </View>


                           
                            <View style={{ marginLeft: 10, marginBottom: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <ScrollView showsVerticalScrollIndicator={false} style={{}}>
                                    {this.renderItem( this.state.role == "clinician"? doctors : users)}
                                </ScrollView>
                            </View>



                            <View style={{ marginLeft: 20, marginVertical: 10, marginRight: 10, }}>
                                <TouchableOpacity onPress={() => this.logout()} style={{ height: 60, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: '#E90000', borderRadius: 7 }}>
                                    <View style={{ marginRight: 20, justifyContent: 'center', flex: 1 }}>
                                        <Icon
                                            active
                                            name="keyboard-arrow-left"
                                            type='material'
                                            size={35}
                                            color='#FFF'
                                        />
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', flex: 1 }}>
                                        <Text style={[{ color: '#FFF', fontSize: 15, fontStyle: font.BOLD }]}>Log Out</Text>
                                    </View>

                                    <View style={{ justifyContent: 'center', flex: 1 }}>
                                        <Icon
                                            active
                                            name="keyboard-arrow-left"
                                            type='material'
                                            size={35}
                                            color='#E90000'
                                        />
                                    </View>
                                </TouchableOpacity>



                            </View>





                        </View>
                    </View>

                </Content>
            </Container>

        );
    }

  
    logout(){

        this.setState({ loading: true })
        getLogout()
        setTimeout(() => {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Welcome' }],
              });
                }, 1000);

    }


    renderItem(data) {
        let packages = [];
        for (var i = 0; i < data.length; i++) {
            let nna = i;
        
            packages.push(
                <>
                <TouchableOpacity onPress={() => this.props.navigation.navigate(data[nna].navigation)} style={[{ paddingLeft: 10, marginTop: 10, paddingBottom: 10, paddingRight: 10, flexDirection: 'row', marginBottom: 5, },]}>
                   
                    <View style={{ margin: 2, justifyContent:'center', borderRadius:4, backgroundColor:'#B7DFF550', height:40, width:40 }}>
                    <Icon
                            name={data[i].icon}
                            color={lightTheme.PRIMARY_TEXT_COLOR}
                            size={20}
                            type={data[i].icon_type}
                        />
                    </View>

                    <View style={{ marginLeft: 10, justifyContent: 'center', flex: 1, }}>
                        <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.BOLD, fontSize: 16, marginBottom: 2, marginTop: 2 }}>{data[i].title}</Text>
                      
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
                <View style={{ height: 0.7, backgroundColor: '#DADADA', marginVertical: 5 }} />
                </>
            );
        }
        return packages;
    }

    

}





const doctors = [
    {
        title: 'Edit Profile',
        icon: 'shopping-outline',
        icon_type: 'material-community',
        navigation: 'Account',
        tag:''
    },

    {
        title: 'User Account',
        icon: 'idcard',
        icon_type: 'antdesign',
        navigation: 'Account',
        tag:''
    },
    {
        title: 'My Sessions',
        icon: 'location',
        icon_type: 'evilicon',
        navigation: 'Session',
        tag:''
    },
    {
        title: 'Add Availability',
        icon: 'calendar',
        icon_type: 'evilicon',
        navigation: 'availability',
        tag:''
    },
    {
        title: 'Bank Information',
        icon: 'credit-card-alt',
        icon_type: 'font-awesome',
        navigation: 'BankInformation',
        tag:''
    },
    {
        title: 'Referrals',
        icon: 'ticket',
        icon_type: 'foundation',
        navigation: 'Referer',
        tag:''
    },
    {
        title: 'Notifications ',
        icon: 'notifications-none',
        icon_type: 'material',
        navigation: 'Notification',
        tag:''
    },
    {
        title: 'Help',
        icon: 'help-circle-outline',
        icon_type: 'material-community',
        navigation: '',
        tag:''
    },
    {
        title: 'About ',
        icon: 'information-outline',
        icon_type: 'material-community',
        navigation: '',
        tag:''
    }


];



const users = [
    {
        title: 'Edit Profile',
        icon: 'shopping-outline',
        icon_type: 'material-community',
        navigation: 'Account',
        tag:''
    },

    {
        title: 'User Account',
        icon: 'idcard',
        icon_type: 'antdesign',
        navigation: 'Account',
        tag:''
    },
    {
        title: 'My Sessions',
        icon: 'location',
        icon_type: 'evilicon',
        navigation: 'Session',
        tag:''
    },
  
    {
        title: 'Referrals',
        icon: 'ticket',
        icon_type: 'foundation',
        navigation: 'Referer',
        tag:''
    },
    {
        title: 'Notifications ',
        icon: 'notifications-none',
        icon_type: 'material',
        navigation: 'Notification',
        tag:''
    },
    {
        title: 'Help',
        icon: 'help-circle-outline',
        icon_type: 'material-community',
        navigation: '',
        tag:''
    },
    {
        title: 'About ',
        icon: 'information-outline',
        icon_type: 'material-community',
        navigation: '',
        tag:''
    }


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
