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

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            clinician: '',
           
        };
    }

    async componentDidMount() {
        const { clinician } = this.props.route.params;
        this.setState({ 
            clinician: clinician, 
        });
    }





    render() {
        const { clinician } = this.state
       
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
                <Navbar left={left} title='Doctor’s Profile' bg='#101023' />
                <Content>
                   
                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>
                            <View style={{ marginLeft: 20, marginTop: 30, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>

                                <View style={{ marginRight: 20, justifyContent: 'center', flex: 1 }}>
                                     <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.BOLD, fontSize: 22, }}>{clinician.fullName} </Text> 
                                    <Text style={{ color: lightTheme.PRIMARY_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 10, }}>{clinician.title}</Text>
                                    <View style={{ width: 100 }}>
                                        <StarRating
                                            disabled={false}
                                            maxStars={5}
                                            rating={clinician.rating}
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


                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10,  marginBottom: 5, }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('appointment', {clinician: clinician.id})} style={buttonStyles.appointmentButtonStyle}>
                                <Text style={[buttonStyles.primaryButtonTextStyle]}>Book an Appointment</Text>
                            </TouchableOpacity>
                            </View>


                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{  fontFamily: font.BOLD, fontSize: 16, marginBottom: 2, marginTop: 2 }}>About Me</Text>
                                    <Text style={{ color:lightTheme.SMALL_BODY_TEXT_COLOR, fontFamily: font.REGULAR, fontSize: 12, marginBottom: 2, marginTop: 2 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dignissim maximus augue, ut lobortis est viverra at. Fusce nec finibus massa. Sed ut augue ac justo mattis venenatis non eget nunc. Nunc commodo sollicitudin arcu ut blandit. Sed elementum augue ac nulla iaculis tristique. Proin ornare convallis massa, sed hendrerit urna egestas sed. Fusce ut magna id leo mattis pretium. Suspendisse accumsan magna nec justo vehicula varius.</Text>
                                </View>
                            </View>


                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{  fontFamily: font.BOLD, fontSize: 16, marginBottom: 2, marginTop: 2 }}>Working Time</Text>
                                    <Text style={{ color:lightTheme.SMALL_BODY_TEXT_COLOR, fontFamily: font.REGULAR, fontSize: 12, marginBottom: 2, marginTop: 2 }}> Mon - fri 9:00AM - 8:00PM.</Text>
                                </View>
                            </View>



                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <View style={{ marginRight: 20, justifyContent: 'center', }}>
                                    <Text style={{  fontFamily: font.BOLD, fontSize: 16, marginBottom: 2, marginTop: 2 }}>Reviews</Text>
                                    </View>
                            </View>

                            <View style={{ marginLeft: 20, marginTop: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                              
                            </View>



                            <View style={{ marginLeft: 20, marginTop: 25, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                                <ScrollView showsHorizontalScrollIndicator={false} style={{}} horizontal>
                                    {this.renderLongPackages(packagesa)}
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
                <View style={{ marginRight: 20, justifyContent: 'center', flex: 1, marginTop:10 }}>
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
