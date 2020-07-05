import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';

// Styles
import styles from './Styles/LaunchScreenStyles';
import {CHANCES_GIVEN} from '../Lib/CommonConstants';

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  clickHandler = clickedCardValue => event => {
    const {
      id,
      value,
      status,
      createCurrentCard,
      decrementChances,
      renewChances,
      chancesPending,
      clearCurrentCard,
    } = this.props;

    console.log(clickedCardValue);

    if (chancesPending === CHANCES_GIVEN) {
      createCurrentCard({id, value, status});
      decrementChances();
    } else if (chancesPending === 0) {
      clearCurrentCard({id, value, status});
      renewChances();
    }
  };

  render() {
    const {id, value, status} = this.props;
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <Text style={styles.sectionText} onPress={this.clickHandler(value)}>
            Card : {value} {status}
          </Text>
        </ScrollView>
      </View>
    );
  }
}
