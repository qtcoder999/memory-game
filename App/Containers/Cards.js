import React, {Component} from 'react';
import {ScrollView, Text, Image, View} from 'react-native';

// Styles
import styles from './Styles/LaunchScreenStyles';

export default class Card extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {value, status} = this.props;
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <Text style={styles.sectionText}>
            Card : {value} {status}
          </Text>
        </ScrollView>
      </View>
    );
  }
}
