import React from 'react'
import { StyleSheet, Text, Dimensions, View,StatusBar } from 'react-native'
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

const width = Dimensions.get('window').width
import { lightTheme } from '../theme/colors';

const IsEmpty = ({ message, }) => {
    return (
        <View style={styles.backgroundImage}>
              <StatusBar backgroundColor={lightTheme.PRIMARY_COLOR } barStyle="light-content" />
            <View style={styles.welcome}>
            <Icon
                        active
                        name="hourglass-empty"
                        type='material'
                        size={55}
                        color={lightTheme.PRIMARY_COLOR}
                    />
                <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Regular', flex: 1, marginTop:20, color: lightTheme.PRIMARY_COLOR }}>{message}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    welcome: {
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default IsEmpty