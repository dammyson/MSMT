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
const axios = require('axios');
import ActivityIndicator from '../../components/ActivityIndicator';
import { getToken, showTopNotification, processResponse, baseUrl, imageUrl, getUserID, getUserName, userPlaceholderImage, placeholderImage } from '../../utilities';


export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            numbers: {
                dermatologist: 0,
                generalPractitioner: 0,
                neurologist: 0,
                pediatricians: 0,
                radiologist: 0,
                therapist: 0,
            },
            is_valide_mail: false,
            list_doctor: [],
            show_camera: false
        };
    }

    async componentDidMount() {
        this.setState({ name: await getUserName() })
        this.getSummary();

    }



    async getSummary() {
        this.setState({ loading: true })
        showTopNotification("info", 'Fetching records', 2)
        fetch(baseUrl() + '/Clinician/getSpecialistStatistics', {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': 'Bearer ' + await getToken(),
            }
        })
            .then(processResponse)
            .then(res => {
                this.setState({ loading: false })
                this.getDoctors()
                const { data, statusCode } = res
                console.warn(data.data)
                if (statusCode == 200) {
                    this.setState({
                        numbers: data.data
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



    async getDoctors() {
        this.setState({ loading: true })
        fetch(baseUrl() + '/Clinician/getFeaturedDoctors', {
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
                        list_doctor: data.data
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
        const { numbers, list_doctor } = this.state
        return (

            <Container style={{ backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR }}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <Content>
                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>
                            <View style={{ marginLeft: 20, marginTop: 30, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <View style={{ margin: 2, marginLeft: 20, marginRight: 15 }}>
                                    <Image source={{uri: userPlaceholderImage()}} 
                                    style={styles.image_profile} />
                                </View>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 22, marginBottom: 2, marginTop: 2 }}>Hello</Text>
                                </View>
                            </View>



                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 10, }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{ color: '#080256', fontFamily: font.BOLD, fontSize: 35, marginBottom: 2, marginTop: 2 }}>What are you looking for?</Text>
                                </View>
                            </View>


                            <View style={{ marginLeft: 20, marginTop: 10, marginRight: 10, marginBottom: 5, }}>
                                <View style={textInputStyles.searchTextInputContainer}>
                                    <View style={textInputStyles.operation_icon}>

                                        <Icon
                                            name="search"
                                            color={lightTheme.PRIMARY_COLOR}
                                            size={30}
                                            type='ionicon'
                                        />
                                    </View>
                                    <View style={textInputStyles.input}>
                                        <TextInput
                                            placeholder="Search..."
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
                            </View>

                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{ color: '4C4F4D, 100%', fontFamily: font.BOLD, fontSize: 17, marginBottom: 2, marginTop: 2 }}>Specialist</Text>
                                </View>
                            </View>

                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>

                                {this.renderSummaryDetails(numbers.radiologist, 'RADIOLOGISTS', '#FFB655')}
                                {this.renderSummaryDetails(numbers.therapist, 'Therapists', '#F3603F')}
                                {this.renderSummaryDetails(numbers.neurologist, 'neurologist', '#489E67')}

                            </View>

                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 10, }}>

                                {this.renderSummaryDetails(numbers.generalPractitioner, 'General Practitioners', '#5383EC')}
                                {this.renderSummaryDetails(numbers.dermatologist, 'DERMATOLOGISTS', '#A74343')}
                                {this.renderSummaryDetails(numbers.pediatricians, 'PEDIATRICIANS', '#344356')}

                            </View>

                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{ color: '4C4F4D, 100%', fontFamily: font.BOLD, fontSize: 17, marginBottom: 2, marginTop: 2 }}>Packages of Services</Text>
                                </View>
                            </View>

                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <ScrollView showsHorizontalScrollIndicator={false} style={{}} horizontal>
                                    {this.renderPackages(packagesa)}
                                </ScrollView>
                            </View>


                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <ScrollView showsHorizontalScrollIndicator={false} style={{}} horizontal>
                                    {this.renderLongPackages(packagesa)}
                                </ScrollView>
                            </View>

                            {this.state.list_doctor.length > 0 ? 

                            <>
                                <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                    <View style={{ marginRight: 20, justifyContent: 'center', flex: 1 }}>
                                        <Text style={{ color: '4C4F4D, 100%', fontFamily: font.BOLD, fontSize: 17, marginBottom: 2, marginTop: 2 }}>Featured Doctors</Text>
                                    </View>

                                    <TouchableOpacity style={{ marginRight: 20, height: 45, backgroundColor: '#4DC59130', justifyContent: 'center', borderRadius: 10, }}>
                                        <Text style={{ color: '#4DC59180', fontFamily: font.BOLD, fontSize: 17, marginHorizontal: 10, marginBottom: 2, marginTop: 2 }}>See all</Text>
                                    </TouchableOpacity>
                                </View>


                                <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                    <ScrollView showsHorizontalScrollIndicator={false} style={{}} horizontal>
                                        {this.renderDoctors(list_doctor)}
                                    </ScrollView>
                                </View>

                            </>
                            : null }


                        </View>
                    </View>

                </Content>
            </Container>

        );
    }

    renderSummaryDetails(count, name, bg) {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Calendar')}  style={[styles.user_box, { backgroundColor: bg }]}>
                <View style={{ marginLeft: 10, marginVertical: 15, }}>
                    <Text style={[{ fontFamily: font.EXTRA_BOLD, color: lightTheme.WHITE_COLOR, fontSize: 28, marginBottom: 2 }]}>{count}</Text>
                    <Text numberOfLines={1} style={[{ fontFamily: font.REGULAR, textTransform: 'uppercase', color: lightTheme.WHITE_COLOR, fontSize: 11, marginBottom: 15 }]}>{name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderPackages(data) {
        let packages = [];
        for (var i = 0; i < data.length; i++) {
            packages.push(
                <View style={[styles.pack_box, { backgroundColor: data[i].bg }]}>
                    <View style={{ marginLeft: 10, marginVertical: 15, }}>
                        <Text numberOfLines={2} style={[{ fontFamily: font.EXTRA_BOLD, color: data[i].text_color, fontSize: 18, marginBottom: 2 }]}>{data[i].title}</Text>
                        <Text style={[{ fontFamily: font.REGULAR, textTransform: 'uppercase', color: lightTheme.PRIMARY_TEXT_COLOR, fontSize: 16, marginBottom: 15 }]}>{data[i].text}</Text>
                    </View>
                </View>
            );
        }
        return packages;
    }



    renderLongPackages(data) {
        let packages = [];
        for (var i = 0; i < data.length; i++) {
            packages.push(
                <View style={[styles.pack_long_box, { backgroundColor: data[i].bg }]}>
                    <View style={{ marginLeft: 10, marginVertical: 15, flex: 1 }}>
                        <Text numberOfLines={2} style={[{ fontFamily: font.EXTRA_BOLD, color: data[i].text_color, fontSize: 18, marginBottom: 2 }]}>{data[i].title}</Text>
                        <Text style={[{ fontFamily: font.REGULAR, textTransform: 'uppercase', color: lightTheme.PRIMARY_TEXT_COLOR, fontSize: 16, marginBottom: 15 }]}>{data[i].text}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginVertical: 15, justifyContent: 'center' }}>
                        <Icon
                            name="ios-arrow-forward-circle-outline"
                            color={data[i].text_color}
                            size={40}
                            type='ionicon'
                        />
                    </View>
                </View>
            );
        }
        return packages;
    }


    renderDoctors(data) {
        let packages = [];
        for (var i = 0; i < data.length; i++) {
            let item = data[i]
            packages.push(
                <TouchableOpacity onPress={() => this.props.navigation.navigate('explore_details',  {clinician: item})} style={[styles.doctor_box, { backgroundColor: data[i].bg }]}>
                    <Image source={{ uri: data[i].imageUrl == null || data[i].imageUrl ==  "" || data[i].imageUrl ==  "null" ?  placeholderImage() : data[i].imageUrl}}  style={{ width: Dimensions.get('window').width / 3.6, height: Dimensions.get('window').width / 4.5, borderRadius: 10, }} />
                    <View style={{ marginLeft: 10, flex: 1 }}>
                        <Text numberOfLines={2} style={[{ fontFamily: font.EXTRA_BOLD, color: '#344356', fontSize: 9, marginBottom: 8 }]}>{data[i].fullName}</Text>
                        <Text style={[{ fontFamily: font.REGULAR, color: lightTheme.TEXT_PLACEHOLDER_COLOR, fontSize: 8, marginBottom: 2 }]}>{data[i].title}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
        return packages;
    }

}


const packagesa = [
    {
        title: 'Cardio Screening \n          ',
        text: 'For the most complete assessment of the cardiovascular system.',
        bg: '#D3B0E025',
        text_color: "#A74343"

    },
    {
        title: 'General Practitioner & Surgeon',
        text: 'For the most complete assessment of the cardiovascular system.',
        bg: '#B7DFF525',
        text_color: "#F8A44C"

    },
];


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
