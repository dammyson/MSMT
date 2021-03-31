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


export default class index extends Component {
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
                        name="ios-arrow-back"
                        type='ionicon'
                        color='#FFF'
                    />
                </Button>
            </Left>
        );
        return (

            <Container style={{ backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR }}>
                <StatusBar backgroundColor={lightTheme.PRIMARY_COLOR} barStyle="dark-content" />
                <Content scrollEnabled={false}>
                    <Navbar left={left} title='Doctor' bg='#101023' />
                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>





                            <View style={{ marginLeft: 20, marginTop: 10, marginRight: 10,  flexDirection: 'row' }}>
                                <View style={[textInputStyles.secondSearchTextInputContainer, { flex: 1 }]}>
                                    <View style={textInputStyles.operation_icon}>

                                        <Icon
                                            name="search"
                                            color={lightTheme.PRIMARY_COLOR}
                                            size={22}
                                            type='ionicon'
                                        />
                                    </View>
                                    <View style={textInputStyles.input}>
                                        <TextInput
                                            placeholder="Search For Doctors by Name..."
                                            placeholderTextColor={lightTheme.PRIMARY_LIGHT_TEXT_COLOR}
                                            returnKeyType="next"
                                            keyboardType='email-address'
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            defaultValue={this.state.email}
                                            style={{ flex: 1, fontSize: 16, color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, }}
                                            onChangeText={(text) => this.validate(text)}
                                            onSubmitEditing={() => this.passwordInput.focus()}
                                        />
                                    </View>
                                </View>

                                <View style={{ padding: 10, alignItems: 'center', transform: [{ rotate: '90deg' }], justifyContent: 'center', }}>

                                    <Icon
                                        name="git-compare-sharp"
                                        color={lightTheme.PRIMARY_TEXT_COLOR}
                                        size={20}
                                        type='ionicon'
                                    />
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



    renderItem(data) {
        let packages = [];
        for (var i = 0; i < data.length; i++) {
            packages.push(
                <View style={[{ paddingLeft: 10, marginTop: 10, paddingVertical:10, paddingRight: 10, flexDirection: 'row', marginBottom: 5, }, ]}>
                    <View style={{ margin: 2, }}>
                        <Image source={images.user} style={styles.image_profile} />
                    </View>
                    <View style={{marginLeft: 10, justifyContent: 'center', flex: 1, }}>
                        <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 15, marginBottom: 2, marginTop: 2 }}>{data[i].name}</Text>
                        <Text style={{ color: lightTheme.PRIMARY_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 10, marginBottom: 2, marginTop: 2 }}>{data[i].job}</Text>
                        <View style={{ marginRight: 20,  justifyContent: 'center', flexDirection: 'row', }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', }}>

                                <Icon
                                    name="star"
                                    color={'#FFB655'}
                                    size={15}
                                    type='antdesign'
                                />
                            </View>
                            <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 10, marginBottom: 2, marginTop: 2 }}>4.4</Text>
                            <View style={{ flex: 1 }} />
                            <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, textTransform: 'uppercase', fontFamily: font.SEMI_BOLD, fontSize: 10, marginBottom: 2, marginTop: 2 }}>25 Reviews</Text>

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
                </View>
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
        height: Dimensions.get('window').height,
    },
    mainbody: {
        flex: 1,
        paddingHorizontal: 5,
        justifyContent: 'flex-start',
    },
    image_profile: {
        width: 55,
        height: 55,
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
        width: Dimensions.get('window').width / 3.5,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        borderWidth: 0.6,
        borderColor: lightTheme.TEXT_PLACEHOLDER_COLOR,

    }

});
