import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    Animated,
    Easing
} from 'react-native';
import * as images from '../../assets/images'
import { buttonStyles } from '../../theme/ButtonStyle';
import { font } from '../../constants';
import { lightTheme } from '../../theme/colors';
import * as Animatable from 'react-native-animatable';


export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: new Animated.Value(0),
        };
    }


    componentDidMount() {
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 7000,
            easing: Easing.linear,
        }).start();
    }

    render() {
        return (
            <ImageBackground
                source={images.welcome}
                style={{ flex: 1 }}
                resizeMode="cover"
            >
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <View style={styles.container}>
                    <View style={{ flex: 1 }}>

                    </View>
                    <Animatable.View
                        style={[styles.footer, {

                        }]}
                        animation="fadeInUpBig"
                    >
                        <View style={{}}>
                            <Text style={[styles.welcome_text]}>Welcome to MSMT</Text>
                            <Text style={[styles.title_text]}>Bringing Health Practitioners and Patients together on one platform</Text>
                            <TouchableOpacity onPress={()=>  this.props.navigation.navigate('user_type')} style={buttonStyles.primaryButtonStyle}>
                                <Text style={[buttonStyles.primaryButtonTextStyle]}>Get Started</Text>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                </View>

            </ImageBackground>
        );
    }
}


const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00000099'
    },
    welcome_text: {
        color: lightTheme.WHITE_COLOR,
        fontSize: 47,
        marginHorizontal: 25,
        textAlign: 'center',
        fontFamily: font.SEMI_BOLD
    },
    title_text: {
        color: lightTheme.WHITE_COLOR,
        fontSize: 17,
        marginHorizontal: 25,
        textAlign: 'center'
    }

});