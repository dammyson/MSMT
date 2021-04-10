/**
* This is the navbar component
* example of usage:
*   var left = (<Left><Button transparent><Icon name='menu' /></Button></Left>);
*   var right = (<Right><Button transparent><Icon name='menu' /></Button></Right>);
*   <Navbar left={left} right={right} title="My Navbar" />
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon } from 'native-base';
import { View, Text, TouchableOpacity  } from 'react-native';
import { lightTheme } from '../theme/colors';
import { font } from '../constants';
// Our custom files and classes import



export default class Navbar extends Component {
  render() {
    const { title, left, right, } = this.props
    return(
      <View style={{ backgroundColor: lightTheme.PRIMARY_COLOR }}>
        <View style={styles.header}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 15,
            marginLeft: 10,
          }}>
            <View style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center', }}>
            {left}
              </View>
            <View style={{ justifyContent: 'flex-start', alignItems: 'center',  flex:1, paddingRight:20 }}>
              <Text  numberOfLines={1} style={styles.title}>{title}</Text>
            </View>
            <View style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center', width:30}}>
            {right}
              </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  title: {
    marginTop: 2,
    marginBottom: 2,
    marginRight: 20,
    marginLeft: 20,
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '400',
    fontFamily:font.BOLD
  },
};

