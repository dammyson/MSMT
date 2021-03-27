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
    }, 1000);
  }




  initPage = async () => {
   /* AsyncStorage.getItem('rem').then((value) => {
      if (value == 'login') {
        this.props.navigation.navigate('Welcome');

      } else if (value == null) {
        this.props.navigation.navigate('Welcome');
      }
      else {
        this.props.navigation.navigate('Welcome');
      }

    }) */

  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#415c5a' barStyle="light-content" />

        
          <Text style={{ color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 20, marginBottom: 2, marginTop: 2}}>  NAME HERE</Text>
                
     
      </View>
    );
  }
}


const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#415c5a'
  },
 
  footer: {
    flex: 1,
justifyContent:'center',
alignItems:'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30
  },
});