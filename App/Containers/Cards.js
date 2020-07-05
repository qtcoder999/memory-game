import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';

// Styles
import styles from './Styles/LaunchScreenStyles';
import {CHANCES_GIVEN} from '../Lib/CommonConstants';
import {isEmptyObject} from '../Lib/CommonUtils';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {freezeGameDuringTimeout: false};
  }

  clickHandler = () => event => {
    const {
      id,
      value: clickedCardValue,
      status,
      createCurrentCard,
      decrementChances,
      renewChances,
      chancesPending,
      clearCurrentCard,
      currentCard,
      changeStatusToClosed,
      changeStatusToOpen,
    } = this.props;

    console.log('Clicked Value', clickedCardValue);

    if (isEmptyObject(currentCard)) {
      console.log('red: reaching changeStatusToOpen(id);');
      createCurrentCard({id, value: clickedCardValue, status});
      changeStatusToOpen(id);
    }

    if (!isEmptyObject(currentCard)) {
      this.setState({freezeGameDuringTimeout: true});

      if (currentCard.value !== clickedCardValue) {
        changeStatusToOpen(id);
      } else {
        changeStatusToOpen(id);
        clearCurrentCard();
      }
    }
    if (currentCard.value && currentCard.value !== clickedCardValue) {
      setTimeout(() => {
        changeStatusToClosed(id);
      }, 1);
    }
  };

  render() {
    const {id, value, status, chancesPending} = this.props;
    const {freezeGameDuringTimeout} = this.state;

    // console.log('chancesPending in render', chancesPending);

    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <Text
            style={styles.sectionText}
            onPress={
              !freezeGameDuringTimeout
                ? this.clickHandler({id, value, status})
                : null
            }>
            Card {value} : {status}
          </Text>
        </ScrollView>
      </View>
    );
  }
}
