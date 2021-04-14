// React native and others libraries imports
import React, { Component } from 'react';
import { FlatList, Dimensions, View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, Easing, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import { lightTheme } from '../theme/colors';


export default class SelectAddressType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: new Animated.Value(0),
            merchant: 'ay345',
            shippingmethod: [
                { id: 1, name: 'Home' },
                { id: 2, name: 'Office' },
                { id: 3, name: 'School' },
                { id: 1, name: 'Shop' },
                { id: 2, name: 'Church' },
                { id: 3, name: 'Mosque' },
                { id: 1, name: 'Home' },
                { id: 2, name: 'Office' },
                { id: 3, name: 'School' },
                { id: 1, name: 'Shop' },
                { id: 2, name: 'Church' },
                { id: 3, name: 'Mosque' },
                { id: 1, name: 'Home' },
                { id: 2, name: 'Office' },
                { id: 3, name: 'School' },
                { id: 1, name: 'Shop' },
                { id: 2, name: 'Church' },
                { id: 3, name: 'Mosque' },
            ],


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

                    <Animatable.View style={{ height: Dimensions.get('window').height / 2, alignItems: 'center', justifyContent: 'center', borderRadius:20 }} animation="fadeInUpBig" >

                        <View style={{ height: Dimensions.get('window').height / 1.5, width: Dimensions.get('window').width - 50, }} >
                            <View style={styles.body_top}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: 40 }}>
                                    <TouchableOpacity onPress={() => onClose()}>


                                    </TouchableOpacity>
                                </View>

                                <Text style={{ fontSize: 14, margin: 7, flex: 1, fontFamily: 'NunitoSans-Light', fontStyle: 'italic', color: '#fff', textAlign: 'center', marginRight: 10 }}>Select address type</Text>
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 25 }}>
                                    <TouchableOpacity onPress={() => onClose()}>
                                        <Icon
                                            name="closecircle"
                                            size={20}
                                            type='antdesign'
                                            color={lightTheme.PRIMARY_BUTTON_COLOR}
                                        />

                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.body}>
                                <View style={{ marginTop: 10, marginLeft: 30, marginRight: 30 }}>

                                </View>

                                <View style={{ paddingTop: 1, paddingBottom: 10, flex: 1, }}>
                                    <FlatList
                                        style={{ paddingBottom: 5 }}
                                        data={this.state.shippingmethod}
                                        renderItem={this.renderItem}
                                        keyExtractor={item => item.id}
                                        ItemSeparatorComponent={this.renderSeparator}
                                        ListHeaderComponent={this.renderHeader}
                                    />
                                </View>


                            </View>
                        </View>
                    </Animatable.View>

                </View>
            </>
        )
    }



    _handleCategorySelect = (index) => {
        console.warn(index)
        const { onSelect, } = this.props;
        onSelect(index);
    }
    renderItem = ({ item, }) => {
        return (
            <TouchableOpacity style={{ marginLeft: 20, marginRight: 20, marginBottom: 10, marginTop: 10, borderBottomColor: '#d1d1d1', borderBottomWidth: 0.5 }}
                onPress={() => this._handleCategorySelect(item)} underlayColor="red">
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, }}>
                        <Text style={styles.nameList}>{item.name}  </Text>

                    </View>
                </View>

            </TouchableOpacity>

        )

    }

}


SelectAddressType;

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

