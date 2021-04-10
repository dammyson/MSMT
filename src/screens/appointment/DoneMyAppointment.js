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

export default class DoctorMyAppointment extends Component {
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
            multipleSelectedData: [],
            multipleSelectedDataLimited: [ ],
            multipleData: ["Headache", 'Mouth Bleeding', 'Coughing', 'Pain after Surgey', 'Cluster Headache'],
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
                <Navbar left={left} title='My Appointment' bg='#101023' />
                <Content>

                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>
                            <View style={{ marginLeft: 20, marginTop: 30, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>

                                <View style={{ marginRight: 20, justifyContent: 'center', flex: 1 }}>
                                    <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.BOLD, fontSize: 22, }}>Josephina </Text>
                                    <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.BOLD, fontSize: 22, }}>Ibrahim Abubakar</Text>
                                    <Text style={{ color: lightTheme.PRIMARY_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 10, }}>Head of Dental Care - Reddington Hospital</Text>
                                    <View style={{ width: 100 }}>
                                        <StarRating
                                            disabled={false}
                                            maxStars={5}
                                            rating={this.state.starCount}
                                            selectedStar={(rating) => this.setState({ starCount: rating })}
                                            iconSet={'FontAwesome'}
                                            starSize={20}
                                            starStyle={{ borderColor: 'red' }}
                                            fullStarColor={lightTheme.YELLOW}
                                            emptyStarColor={lightTheme.YELLOW}
                                        />
                                    </View>
                                </View>
                                <View style={{ margin: 2, marginLeft: 20, marginRight: 15 }}>
                                    <Image source={images.user} style={styles.image_profile} />
                                </View>
                            </View>

                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>

                                {this.renderSummaryDetails("500", 'PATIENTS', '#FFB655')}
                                {this.renderSummaryDetails("10yrs+", 'Experience', '#F3603F')}
                                {this.renderSummaryDetails("4.6", 'RATING', '#489E67')}

                            </View>


                            <View style={{ marginLeft: 20, marginVertical: 10, marginRight: 10, }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')} style={{height:70, justifyContent:'center', alignItems:'center', backgroundColor:'#4DC591', borderRadius:7}}>
                                    <Text style={[{ color: '#FFF', fontSize:15 ,fontStyle: font.BOLD }]}>WRITE A REVIEW</Text>
                                </TouchableOpacity>
                              


                            </View>



                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, marginBottom: 5, }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: font.BOLD, fontSize: 16, marginBottom: 2, marginTop: 2 }}>Symptoms</Text>
                                </View>

                                <View style={styles.multipleContainer}>
                                    {this.state.multipleData.map(interest => (
                                        <SelectMultipleButton
                                            key={interest}
                                            buttonViewStyle={{
                                                borderRadius: 4,
                                                height: 30,
                                                color:'#3D6DEB',
                                                backgroundColor:'#DEE0ED',
                                            }}
                                            textStyle={{
                                                fontSize: 14,
                                                marginHorizontal:25,
                                                color:'#3D6DEB'
                                            }}
                                            highLightStyle={{
                                                borderColor: '#DEE0ED',
                                                backgroundColor:'#DEE0ED',
                                                textColor: "#3D6DEB",
                                                borderTintColor: '#DEE0ED',
                                                backgroundTintColor: '#DEE0ED',
                                                textTintColor: '#DEE0ED'
                                            }}
                                            value={interest}
                                            selected={this.state.multipleSelectedData.includes(interest)}
                                            singleTap={valueTap =>
                                                this._singleTapMultipleSelectedButtons(interest)
                                            }
                                        />
                                    ))}
                                </View>

                            </View>

                            <View style={{ height: 0.5, backgroundColor: '#DADADA', marginVertical: 5 }} />
                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, marginBottom: 5, }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: font.BOLD, fontSize: 16, marginTop: 2 }}>Date & Time</Text>
                                </View>

                                <View style={{ marginRight: 10, justifyContent: 'center', flexDirection: 'row', marginBottom: 5, }}>
                                    <View style={{ flex: 2, justifyContent: 'center' }}>
                                        <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.REGULAR, fontSize: 14, marginBottom: 2, marginTop: 2 }}> 18th Tuesday, March</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>

                                        <View style={buttonStyles.appointmentOrangeButtonStyle}>
                                            <Text style={{ color: lightTheme.WHITE_COLOR, fontFamily: font.REGULAR, fontSize: 14, marginBottom: 2, marginTop: 2 }}>11:30 AM</Text>

                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{ height: 0.5, backgroundColor: '#DADADA', marginVertical: 5 }} />
                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, marginBottom: 5, }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: font.BOLD, fontSize: 16, marginBottom: 2, marginTop: 2 }}>Allergies</Text>
                                </View>

                                <View style={styles.multipleContainer}>
                                    {this.state.multipleData.map(interest => (
                                        <SelectMultipleButton
                                            key={interest}
                                            buttonViewStyle={{
                                                borderRadius: 4,
                                                height: 30,
                                                color:'#3D6DEB',
                                                backgroundColor:'#DEE0ED',
                                            }}
                                            textStyle={{
                                                fontSize: 14,
                                                marginHorizontal:25,
                                                color:'#3D6DEB'
                                            }}
                                            highLightStyle={{
                                                borderColor: '#DEE0ED',
                                                backgroundColor:'#DEE0ED',
                                                textColor: "#3D6DEB",
                                                borderTintColor: '#DEE0ED',
                                                backgroundTintColor: '#DEE0ED',
                                                textTintColor: '#DEE0ED'
                                            }}
                                            value={interest}
                                            selected={this.state.multipleSelectedData.includes(interest)}
                                            singleTap={valueTap =>
                                                this._singleTapMultipleSelectedButtons(interest)
                                            }
                                        />
                                    ))}
                                </View>

                            </View>

                        
                            <View style={{ height: 0.5, backgroundColor: '#DADADA', marginVertical: 5 }} />
                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: font.BOLD, fontSize: 16, marginBottom: 2, marginTop: 2 }}>Previous Diagnosis</Text>
                                    <Text style={{ color: lightTheme.SMALL_BODY_TEXT_COLOR, fontFamily: font.REGULAR, fontSize: 12, marginBottom: 2, marginTop: 2 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dignissim maximus augue, ut lobortis est viverra at. Fusce nec finibus massa. Sed ut augue ac justo mattis venenatis non eget nunc. Nunc commodo sollicitudin arcu ut blandit. Sed elementum augue ac nulla iaculis tristique. Proin ornare convallis massa, sed hendrerit urna egestas sed. Fusce ut magna id leo mattis pretium. Suspendisse accumsan magna nec justo vehicula varius.</Text>
                                </View>
                            </View>


                            <View style={{ height: 0.5, backgroundColor: '#DADADA', marginVertical: 5 }} />
                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: font.BOLD, fontSize: 16, marginBottom: 2, marginTop: 2 }}>Previous Meditation</Text>
                                    <Text style={{ color: lightTheme.SMALL_BODY_TEXT_COLOR, fontFamily: font.REGULAR, fontSize: 12, marginBottom: 2, marginTop: 2 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dignissim maximus augue, ut lobortis est viverra at. Fusce nec finibus massa. Sed ut augue ac justo mattis venenatis non eget nunc. Nunc commodo sollicitudin arcu ut blandit. Sed elementum augue ac nulla iaculis tristique. Proin ornare convallis massa, sed hendrerit urna egestas sed. Fusce ut magna id leo mattis pretium. Suspendisse accumsan magna nec justo vehicula varius.</Text>
                                </View>
                            </View>



                            <View style={{ height: 0.5, backgroundColor: '#DADADA', marginVertical: 5 }} />
                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: font.BOLD, fontSize: 16, marginBottom: 2, marginTop: 2 }}>Ongoing Meditation</Text>
                                    <Text style={{ color: lightTheme.SMALL_BODY_TEXT_COLOR, fontFamily: font.REGULAR, fontSize: 12, marginBottom: 2, marginTop: 2 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dignissim maximus augue, ut lobortis est viverra at. Fusce nec finibus massa. Sed ut augue ac justo mattis venenatis non eget nunc. Nunc commodo sollicitudin arcu ut blandit. Sed elementum augue ac nulla iaculis tristique. Proin ornare convallis massa, sed hendrerit urna egestas sed. Fusce ut magna id leo mattis pretium. Suspendisse accumsan magna nec justo vehicula varius.</Text>
                                </View>
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
                    <Text style={[{ fontFamily: font.EXTRA_BOLD, color: lightTheme.WHITE_COLOR, fontSize: 23, marginBottom: 2 }]}>{count}</Text>
                    <Text numberOfLines={1} style={[{ fontFamily: font.REGULAR, textTransform: 'uppercase', color: lightTheme.WHITE_COLOR, fontSize: 11, marginBottom: 15 }]}>{name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderReview(data) {
        let packages = [];
        for (var i = 0; i < 9; i++) {
            packages.push(
                <View style={{ marginRight: 20, justifyContent: 'center', flex: 1, marginTop: 10 }}>
                    <Text style={{ color: lightTheme.SMALL_BODY_TEXT_COLOR, fontFamily: font.BOLD, fontSize: 14, }}>Ibrahim Abubakar</Text>

                    <View style={{ width: 100 }}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.starCount}
                            selectedStar={(rating) => this.setState({ starCount: rating })}
                            iconSet={'FontAwesome'}
                            starSize={15}
                            starStyle={{ borderColor: 'red' }}
                            fullStarColor={lightTheme.YELLOW}
                            emptyStarColor={lightTheme.YELLOW}
                        />
                    </View>
                    <Text style={{ color: lightTheme.SMALL_BODY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 10, }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dignissim maximus augue, ut lobortis est viverra at. </Text>
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
            packages.push(
                <View style={[styles.doctor_box, { backgroundColor: data[i].bg }]}>
                    <Image source={data[i].image} style={{ width: Dimensions.get('window').width / 3.55, height: Dimensions.get('window').width / 4.5, borderRadius: 10, }} />
                    <View style={{ marginLeft: 10, flex: 1 }}>
                        <Text numberOfLines={2} style={[{ fontFamily: font.EXTRA_BOLD, color: '#344356', fontSize: 9, marginBottom: 8 }]}>{data[i].name}</Text>
                        <Text style={[{ fontFamily: font.REGULAR, color: lightTheme.TEXT_PLACEHOLDER_COLOR, fontSize: 8, marginBottom: 2 }]}>{data[i].job}</Text>
                    </View>
                </View>
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
