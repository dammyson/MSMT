// React native and others libraries imports
import React, { Component } from 'react';
import { FlatList, Dimensions, View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, Easing, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import { lightTheme } from '../theme/colors';
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default class SelectTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: new Animated.Value(0),
            merchant: 'ay345',
            show_from_picker: true,
        };

    }

    componentDidMount() {
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
        }).start();

    }





    searchFilterFunction = search => {
        this.setState({ search });
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.addressLine1.toUpperCase()} ${item.city.toUpperCase()}`;
            const textData = search.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            address_list: newData,
        });

    };

    render() {
        const { name, message, onPress, onClose } = this.props;
        return (
            <>
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        backgroundColor: '#00000040',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}

                >

                    <Animatable.View style={{ height: Dimensions.get('window').height / 2, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }} animation="fadeInUpBig" >

                        <View style={{ height: Dimensions.get('window').height / 1.5, width: Dimensions.get('window').width - 50, }} >
                            <DateTimePickerModal
                                isVisible={this.state.show_from_picker}
                                mode="time"
                                onConfirm={(date) => this._handleTimeSelect(date)}
                                onCancel={() => this.setState({ show_to_picker: false })}
                            />
                        </View>
                    </Animatable.View>

                </View>
            </>
        )
    }



    _handleTimeSelect = (date) => {
        const {Selected} = this.props
        this.setState({ show_to_picker: false, })

        Selected(date)

    }


}


SelectTime;

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        position: "absolute",
        top: 40,
        left: 30,
        bottom: 0,
        right: 0,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    body_top: {
        backgroundColor: lightTheme.PRIMARY_BUTTON_COLOR,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row'

    },

    body: {
        flex: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#fff'
    },

    textInputContainer: {
        marginRight: 25,
        marginLeft: 25,
    },
    input: {
        height: 65,
        borderColor: '#3E3E3E',
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        paddingLeft: 12
    },

    nameList: {
        fontSize: 12,
        color: '#272065',
        flex: 1,
        marginLeft: 15,
        marginBottom: 10,
        fontFamily: 'Proxima-nova-Regular',
    },
    numberList: {
        fontSize: 12,
        color: '#272065',
        flex: 1,
        marginLeft: 15,
        fontFamily: 'Proxima-nova-Regular',
    },
    modal: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "#fff"

    },
    search_input: {
        marginTop: 5,
        height: 40,
        marginBottom: 10,
        color: '#000',
        paddingHorizontal: 10,
        borderRadius: 10,
        marginLeft: 40,
        marginRight: 40,
        borderColor: '#000',
        borderWidth: 0.8,
        flexDirection: 'row'

    },
});

