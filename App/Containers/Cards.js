import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';

// Styles
import styles from './Styles/LaunchScreenStyles';

export default class Card extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {id, value, status, clickHandler} = this.props;
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <Text
            style={styles.sectionText}
            onPress={clickHandler.bind(this, {id, value, status})}>
            Card : {value} {status}
          </Text>
        </ScrollView>
      </View>
    );
  }
}
