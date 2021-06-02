import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, AsyncStorage, View } from 'react-native'
import Swiper from 'react-native-swiper'

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';


export default class Intro extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  render() {
    return (
      <Swiper style={styles.wrapper}
        index={this.state.index}
        onIndexChanged={(index) => this.onIndexChanged(index)}
        showsButtons={false}
        ref={(swiper) => { this.swiper = swiper; }}
        loop={false}
        showsPagination ={false}
      >
        <View style={styles.slide1}>
          <StepOne
            onNext={() => this.onSkip()}
          />
        </View>
        <View style={styles.slide2}>
          <StepTwo
            onNext={() => this.onSkip()} />
        </View>
        <View style={styles.slide3}>
          <StepThree
            onNext={() => this.onSkip()} />
        </View>
        <View style={styles.slide3}>
          <StepFour
            onNext={() => this.onFinish()} />
        </View>
      </Swiper>
    )
  }


  onIndexChanged(ind) {

    this.setState({ index: ind })
  }
  onSkip() {
    if (this.state.index > 2) {
      return
    } else {
      this.swiper.scrollBy(1, true);

    }

  }


  onFinish() {
    this.props.navigation.navigate('Welcome')
  }

 
}



const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})