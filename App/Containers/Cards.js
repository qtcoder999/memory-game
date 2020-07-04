import React, {Component} from 'react';
import {ScrollView, Text, Image, View} from 'react-native';

// Styles
import styles from './Styles/LaunchScreenStyles';

export default class Card extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <Text style={styles.sectionText}>Card</Text>
        </ScrollView>
      </View>
    );
  }
}
