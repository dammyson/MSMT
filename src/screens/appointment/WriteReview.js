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

export default class WriteReview extends Component {
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
            selected_symptoms: ['Migraine', 'Headache'],
            selected: { day: 'M', date: 3 }

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
                <Navbar left={left} title='Write a review' bg='#101023' />
                <Content>

                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>
                            <View style={{ marginLeft: 20, marginTop: 30, marginRight: 10, marginBottom: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ margin: 2, marginLeft: 20, marginRight: 15 }}>
                                    <Image source={images.user} style={styles.image_profile} />
                                </View>
                                <View style={{justifyContent: 'center', flex: 1 }}>

                                    <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 20, textAlign: 'center' }}>How was your Experience with
Dr. Johnson Jones Joseph?</Text>
                                    <View style={{ marginTop: 20, alignItems: 'center', }}>
                                        <View style={{ width: 150 }}>
                                            <StarRating
                                                disabled={false}
                                                maxStars={5}
                                                rating={this.state.starCount}
                                                selectedStar={(rating) => this.setState({ starCount: rating })}
                                                iconSet={'FontAwesome'}
                                                starSize={30}
                                                starStyle={{ borderColor: 'red' }}
                                                fullStarColor={lightTheme.YELLOW}
                                                emptyStarColor={lightTheme.YELLOW}
                                            />
                                        </View>
                                    </View>
                                </View>

                            </View>

                            <View style={{ marginHorizontal: 5, marginTop: 20 }}>
                                <View style={{ marginHorizontal: 10, justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: font.SEMI_BOLD, fontSize: 16, marginTop: 2, color: '#080256' }}>Write a comment</Text>
                                </View>
                                <View style={textInputStyles.textAreaContainer} >
                                    <TextInput
                                        style={textInputStyles.textArea}
                                        underlineColorAndroid="transparent"
                                        placeholder="Input Note"
                                        placeholderTextColor={lightTheme.SUB_TEXT_COLOR}
                                        placeholderTextColor="gray"
                                        numberOfLines={5}
                                        multiline={true}
                                        onSubmitEditing={() => this.proceedAppointment()}
                                        onChangeText={text => this.setState({ note: text })}
                                    />
                                </View>
                            </View>
                            <View style={{ marginHorizontal: 5, marginTop: 20 }}>
                                <View style={{ marginHorizontal: 10, justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: font.SEMI_BOLD, fontSize: 16, marginTop: 2, color: '#080256' }}>Would you recommend Dr. Johnson jones joseph to friends and family?</Text>
                                </View>
                                </View>

                                <View style={{ marginHorizontal: 10, justifyContent: 'center', }}>
                              {this.renderSymptom(times)}

                            </View>

                            <View style={{ marginTop: 15, }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')} style={buttonStyles.primaryButtonStyle}>
                                    <Text style={[buttonStyles.primaryButtonTextStyle]}>Proceed</Text>
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

const times = [
    {
        value: 'Yes',
    },
    {
        value: 'No',
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
