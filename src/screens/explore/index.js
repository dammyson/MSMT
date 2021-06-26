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
import { getToken, baseUrl, processResponse, showTopNotification, placeholderImage } from '../../utilities';
import ActivityIndicator from '../../components/ActivityIndicator';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            list_doctor: []
        };
        this.arrayholder = [];
    }

    async componentDidMount() {
        this.getDoctors()
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
                console.warn(res)
                if (statusCode == 200) {

                    this.setState({
                      list_doctor: data.data
                    })
                    this.arrayholder = data.data;

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



    searchFilterFunction = search => {
        this.setState({ search });
        const newData = this.arrayholder.filter(item => {
          const itemData = `${item.fullName? item.fullName.toUpperCase(): ''.toUpperCase()}`;
          const textData = search.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
            list_doctor: newData,
        });
    
      };



    render() {

        if (this.state.loading) {
            return (
                <ActivityIndicator message={'getting doctors... '} />

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
                <Navbar left={left} title='Clinicians' bg='#101023' />
                <Content scrollEnabled={false}>

                    <View style={styles.backgroundImage}>
                        <View style={styles.mainbody}>





                            <View style={{ marginLeft: 20, marginTop: 10, marginRight: 10, flexDirection: 'row' }}>
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
                                            style={{ flex: 1, fontSize: 13, color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.REGULAR, }}
                                            onChangeText={this.searchFilterFunction}
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
                                    {this.renderItem(this.state.list_doctor)}
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
            let item = data[i]
            packages.push(
                <TouchableOpacity onPress={() => this.props.navigation.navigate('explore_details',  {clinician: item})} style={[{ paddingLeft: 10, marginTop: 10, paddingVertical: 10, paddingRight: 10, flexDirection: 'row', marginBottom: 5, },]}>
                    <View style={{ margin: 2, }}>
                        <Image source={{ uri: data[i].imageUrl == null || data[i].imageUrl ==  "" || data[i].imageUrl ==  "null" ?  placeholderImage() : data[i].imageUrl}} style={styles.image_profile} />
                    </View>
                    <View style={{ marginLeft: 10, justifyContent: 'center', flex: 1, }}>
                        <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 15, marginBottom: 2, marginTop: 2 }}>{data[i].fullName}</Text>
                        <Text style={{ color: lightTheme.PRIMARY_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 10, marginBottom: 2, marginTop: 2 }}>{data[i].address}</Text>
                        <View style={{ marginRight: 20, justifyContent: 'center', flexDirection: 'row', }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', }}>

                                <Icon
                                    name="star"
                                    color={'#FFB655'}
                                    size={15}
                                    type='antdesign'
                                />
                            </View>
                            <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontFamily: font.SEMI_BOLD, fontSize: 10, marginBottom: 2, marginTop: 2 }}>{data[i].rating}</Text>
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
                </TouchableOpacity>
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
