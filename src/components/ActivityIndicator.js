import React from 'react'
import { StyleSheet, Text, Dimensions, View,StatusBar } from 'react-native'
import PropTypes from 'prop-types';
import {
    SkypeIndicator,
} from 'react-native-indicators';

const width = Dimensions.get('window').width
import { lightTheme } from '../theme/colors';

const ActivityIndicator = ({ message, }) => {
    return (
        <View style={styles.backgroundImage}>
              <StatusBar backgroundColor="transparent" barStyle="dark-content" />
            <View style={styles.welcome}>
                <SkypeIndicator count={6} size={60} color={lightTheme.PRIMARY_COLOR} />
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
        position: "absolute",
    },
    welcome: {
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ActivityIndicator