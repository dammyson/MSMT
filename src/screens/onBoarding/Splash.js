import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  Animated,
  Easing,
  AsyncStorage
} from 'react-native';




export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }


  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      this.initPage();
    }, 4000);
  }




  initPage = async () => {
    this.props.navigation.navigate('Welcome');
  AsyncStorage.getItem('rem').then((value) => {
       if (value == 'login') {
          this.props.navigation.navigate('Auth');
       } else if (value == null) {
         this.props.navigation.navigate('Intro');
       }
       else {
         this.props.navigation.navigate('Intro');
       }
 
     }) 

  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

        <Image
          style={styles.logo}
          source={require('../../assets/images/logo.png')} />




      </View>
    );
  }
}


const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 120,
    justifyContent: 'center',
    resizeMode: 'contain'
  },

  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30
  },
});