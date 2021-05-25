import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Image
} from 'react-native';
import { Icon } from 'react-native-elements';
import * as images from '../../assets/images'
import { lightTheme } from '../../theme/colors';
import { font } from '../../constants';



export default class StepFour extends React.Component {


  onSwipeLeft() {
    this.props.navigation.navigate("StepTwo")
  }

  render() {
    const { onNext, } = this.props;
    return (
      <ImageBackground
        source={images.intro_four}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <View style={{ height: height }}>

          <View style={styles.imageRegion}>
            <Image source={images.search} style={styles.imageStyle} />
          </View>


          <View style={styles.actionRegion}>


            <View style={{ marginTop: 20, marginHorizontal: 20, }}>
              <Text style={styles.titleText}> Behavioral Health </Text>
              <Text style={styles.bodyText}>Lorem ipsum dolor sit amet consecte adipiscing elit sed do eiusincidunt. </Text>
            </View>



          </View>
          <View style={{ height: 70, alignItems: 'flex-end', }}>
            <TouchableOpacity onPress={() => onNext()} style={styles.skipRegion}>
            <Icon
                        active
                        name="keyboard-arrow-right"
                        type='material'
                        size={35}
                        color='#FFF'
                    />

            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
  },
  imageRegion: {
    marginTop: 40,
    flex: 2,
    width: width,

  },
  imageStyle: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: height * 0.45
  },
  actionRegion: {
    flex: 1,
    marginTop: 20,

  },

  titleText: {
    fontSize: 26,
    color: lightTheme.WHITE_COLOR,
    fontFamily: font.SEMI_BOLD,
    textAlign:'center'
  },
  bodyText: {
    fontSize: 12,
    marginHorizontal:20,
    color: lightTheme.WHITE_COLOR,
    fontFamily: font.REGULAR,
    textAlign:'center'
  },

  signInText: {
    fontSize: 15,
    color: "red",
    fontFamily: 'Montserrat-Medium'
  },

  skipRegion: {
    padding:10,
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor:lightTheme.PRIMARY_COLOR,
    borderRadius:5
  },

  skipText: {
    fontSize: 15,
    color: "red",
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20
  },

  nextIconStyle: {
    color: "red",
    fontSize: 20,
    marginHorizontal: 8
  }
});
